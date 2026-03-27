---
title: "获取数据"
description: '你的集成需要从 API 获取数据并提供给 Home Assistant。这个 API 可能通过网络（本地或云端）、套接字、由 USB 设备暴露出来的串口等方式访问。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 获取数据

你的集成需要从 API 获取数据并提供给 Home Assistant。这个 API 可能通过网络（本地或云端）、套接字、由 USB 设备暴露出来的串口等方式访问。

## 推送与轮询

API 的形式多种多样，但在 Core 中通常分为两类：推送和轮询。

对于推送模式，我们订阅 API，并在新数据可用时收到通知，也就是由 API 主动把变更推送给我们。推送式 API 很理想，因为它消耗的资源更少：只有在状态变化时才会收到通知，而不需要反复重新拉取全部数据再找差异。由于实体可能被禁用，你应确保实体在 `async_added_to_hass` 回调中建立订阅，并在实体移除时取消订阅。

对于轮询模式，我们会按指定时间间隔从 API 获取最新数据。然后集成把这些数据提供给对应实体，再由实体写入 Home Assistant。

由于轮询非常常见，Home Assistant 默认假定实体是轮询型的。如果不是这样，请让 `Entity.should_poll` 返回 `False`。关闭轮询后，集成必须主动调用以下方法之一，通知 Home Assistant 该把实体状态写入状态机了：

- 如果你在异步函数中执行，并且不需要调用实体更新方法，请调用 `Entity.async_write_ha_state()`。这是一个异步安全的 callback，会在事件循环下一次让出执行权时把状态写入状态机。
- `Entity.schedule_update_ha_state()` 会调度实体更新。如果 `force_refresh` 设为 `True`，Home Assistant 会在写入状态前先调用实体的更新方法（`Entity.update()` 或 `Entity.async_update()`）。

## 轮询 API 端点

下面说明几种常见的 API 形态，以及在 Home Assistant 中的推荐集成方式。请注意，一个集成可能同时遇到多种情况。

### 协调式：单个 API 轮询全部实体数据

这种 API 往往提供一个方法，一次返回 Home Assistant 中所有实体的数据。在这种情况下，理想做法是只对这个端点做一次定期轮询，然后在有新数据时立即通知相关实体。

Home Assistant 提供了 `DataUpdateCoordinator` 类，帮助你以尽可能高效的方式管理这一流程。

使用 `DataUpdateCoordinator` 时，通常默认轮询得到的数据大部分时间是不变的。例如，你轮询一盏一周才开一次的灯，那么返回数据大多数时候都可能相同。默认行为是在每次数据更新后都回调监听器，即使数据没有变化也是如此。如果 API 返回的数据支持通过 Python 的 `__eq__` 判断是否变化，那么在创建 `DataUpdateCoordinator` 时可设置 `always_update=False`，以避免不必要的回调和状态写入。

```python
"""Example integration using DataUpdateCoordinator."""

from datetime import timedelta
import logging

import async_timeout

from homeassistant.components.light import LightEntity
from homeassistant.core import callback
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers.update_coordinator import (
    CoordinatorEntity,
    DataUpdateCoordinator,
    UpdateFailed,
)

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass, config_entry, async_add_entities):
    """Config entry example."""
    # assuming API object stored here by __init__.py
    my_api = hass.data[DOMAIN][config_entry.entry_id]
    coordinator = MyCoordinator(hass, config_entry, my_api)

    # Fetch initial data so we have data when entities subscribe
    #
    # If the refresh fails, async_config_entry_first_refresh will
    # raise ConfigEntryNotReady and setup will try again later
    #
    # If you do not want to retry setup on failure, use
    # coordinator.async_refresh() instead
    #
    await coordinator.async_config_entry_first_refresh()

    async_add_entities(
        MyEntity(coordinator, idx) for idx, ent in enumerate(coordinator.data)
    )


class MyCoordinator(DataUpdateCoordinator):
    """My custom coordinator."""

    def __init__(self, hass, config_entry, my_api):
        """Initialize my coordinator."""
        super().__init__(
            hass,
            _LOGGER,
            # Name of the data. For logging purposes.
            name="My sensor",
            config_entry=config_entry,
            # Polling interval. Will only be polled if there are subscribers.
            update_interval=timedelta(seconds=30),
            # Set always_update to `False` if the data returned from the
            # api can be compared via `__eq__` to avoid duplicate updates
            # being dispatched to listeners
            always_update=True
        )
        self.my_api = my_api
        self._device: MyDevice | None = None

    async def _async_setup(self):
        """Set up the coordinator

        This is the place to set up your coordinator,
        or to load data, that only needs to be loaded once.

        This method will be called automatically during
        coordinator.async_config_entry_first_refresh.
        """
        self._device = await self.my_api.get_device()

    async def _async_update_data(self):
        """Fetch data from API endpoint.

        This is the place to pre-process the data to lookup tables
        so entities can quickly look up their data.
        """
        try:
            # Note: asyncio.TimeoutError and aiohttp.ClientError are already
            # handled by the data update coordinator.
            async with async_timeout.timeout(10):
                # Grab active context variables to limit data required to be fetched from API
                # Note: using context is not required if there is no need or ability to limit
                # data retrieved from API.
                listening_idx = set(self.async_contexts())
                return await self.my_api.fetch_data(listening_idx)
        except ApiAuthError as err:
            # Raising ConfigEntryAuthFailed will cancel future updates
            # and start a config flow with SOURCE_REAUTH (async_step_reauth)
            raise ConfigEntryAuthFailed from err
        except ApiError as err:
            raise UpdateFailed(f"Error communicating with API: {err}")
        except ApiRateLimited as err:
            # If the API is providing backoff signals, these can be honored via the retry_after parameter
            raise UpdateFailed(retry_after=60)


class MyEntity(CoordinatorEntity, LightEntity):
    """An entity using CoordinatorEntity.

    The CoordinatorEntity class provides:
      should_poll
      async_update
      async_added_to_hass
      available

    """

    def __init__(self, coordinator, idx):
        """Pass coordinator to CoordinatorEntity."""
        super().__init__(coordinator, context=idx)
        self.idx = idx

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle updated data from the coordinator."""
        self._attr_is_on = self.coordinator.data[self.idx]["state"]
        self.async_write_ha_state()

    async def async_turn_on(self, **kwargs):
        """Turn the light on.

        Example method how to request data updates.
        """
        # Do the turning on.
        # ...

        # Update the data
        await self.coordinator.async_request_refresh()
```

### 对每个实体单独轮询

有些 API 会为每个设备提供单独的端点。有时无法把一个 API 设备精确映射到单个实体；如果你会从同一个设备端点创建多个实体，请参考上一节。

如果你可以把一个设备端点精确映射到单个实体，那么就可以在 `Entity.update()` 或 `Entity.async_update()` 中获取该实体的数据。确保轮询设置为 `True`，Home Assistant 就会定期调用这个方法。

如果你的实体需要在首次写入 Home Assistant 之前先获取数据，请给 `add_entities` 传入 `update_before_add=True`，例如：`add_entities([MyEntity()], update_before_add=True)`。

你可以通过在平台中定义 `SCAN_INTERVAL` 常量来控制集成的轮询间隔。不要把它设得太低，否则会消耗 Home Assistant 资源、压垮托管 API 的设备，或者导致你被云 API 限流。允许的最小值是 5 秒。

```python
from datetime import timedelta

SCAN_INTERVAL = timedelta(seconds=5)
```

## 推送 API 端点

如果你的 API 端点是推送式的，仍然可以在需要时使用数据更新协调器。做法是：创建 coordinator 时，不向构造函数传入轮询相关的 `update_method` 和 `update_interval` 参数。

当新数据到达时，调用 `coordinator.async_set_updated_data(data)` 将数据传递给实体。如果这个方法用于原本带轮询的 coordinator，它还会重置下一次轮询的计时。

## 请求并行度

:::info
这是一个高级主题。
:::

Home Assistant 内置了并发控制逻辑，用于确保某个集成不会压垮 API，也不会耗尽 Home Assistant 的可用资源。它的核心就是限制并行请求数量。该机制会在服务调用和实体更新期间自动生效。

Home Assistant 通过为每个集成维护一个 [`asyncio.Semaphore`](https://docs.python.org/3/library/asyncio-sync.html#asyncio.Semaphore) 来控制并行更新（即调用 `update()`）的数量。例如，如果 semaphore 只允许 1 个并发连接，那么更新和服务调用在已有请求进行时就会等待。如果这个值为 0，则由集成本身负责在需要时限制并行请求数。

平台的默认并行请求数，取决于添加到 Home Assistant 的第一个实体：如果实体定义了 `async_update`，默认值为 0；否则为 1。这是一个历史遗留决策。

平台可以通过在平台文件中（例如 `rflink/light.py`）定义 `PARALLEL_UPDATES` 常量来覆盖这个默认值。
