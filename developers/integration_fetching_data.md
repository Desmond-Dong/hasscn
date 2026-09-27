你的 integration 需要从 API 获取 data，以便提供给 Home Assistant。这个 API 可能通过 web（本地或云端）、sockets、通过 USB 设备暴露的 serial ports 等方式提供。

## Push vs poll

APIs 有各种形式，但核心上分为两类：push 和 poll。

使用 push 时，我们订阅一个 API，当有新的 data 可用时，API 会通知我们。它把变更推送给我们。Push APIs 非常好，因为它们消耗的资源更少。当发生变更时，我们可以收到变更通知，而不必重新获取所有 data 并找出变更。由于 entities 可以被禁用，你应该确保你的 entity 在 `async_added_to_hass` callback 内部订阅，并在移除时取消订阅。

使用 polling 时，我们会按指定的时间间隔从 API 获取最新的 data。你的 integration 然后将这些数据提供给它的 entity，并写入 Home Assistant。

由于 polling 非常常见，Home Assistant 默认假设你的 entity 是基于 polling 的。如果不是，请从 `Entity.should_poll` property 返回 `False`。当你禁用 polling 时，你的 integration 将负责调用其中一个方法，通知 Home Assistant 是时候将 entity state 写入 Home Assistant：

* 如果你在一个 async function 内部执行，且不需要调用你的 entity update method，请调用 `Entity.async_write_ha_state()`。这是一个 async callback，会在不将控制权让出给 event loop 的情况下，将 state 写入 state machine。
* `Entity.schedule_update_ha_state(force_refresh=False)` / `Entity.async_schedule_update_ha_state(force_refresh=False)` 会安排一次 entity 更新。如果将 `force_refresh` 设置为 `True`，Home Assistant 会在写入 state 之前先调用你的 entity update method（`update()` / `async_update()`）。

## Polling API endpoints

我们将解释几种不同的 API 类型以及集成到 Home Assistant 的最佳方式。注意，有些 integrations 会遇到下面几种类型的组合。

### 为所有 entities 协调、单次 API poll 获取 data

这个 API 将有一个单一的方法，用于获取你在 Home Assistant 中所有 entities 的 data。在这种情况下，我们希望在该 endpoint 上进行单次周期性 poll，然后尽快让 entities 知道有新的 data 可用。

Home Assistant 提供了一个 `DataUpdateCoordinator` 类来帮助你尽可能高效地管理这一点。

使用 `DataUpdateCoordinator` 时，被 poll 的 data 通常预期保持基本不变。例如，如果你 poll 一个每周只开一次灯的 light，其 data 在绝大多数时间里可能是相同的。默认行为是每当 data 更新时就回调 listeners，即使 data 没有变化。如果从 API 返回的 data 可以通过 Python 的 `__eq__` method 比较变更，请在创建 `DataUpdateCoordinator` 时将 `always_update` 设置为 `False`，以避免不必要的 callbacks 和对 state machine 的写入。

```python
"""Example integration using DataUpdateCoordinator."""

import asyncio
from datetime import timedelta
import logging

from homeassistant.components.light import LightEntity
from homeassistant.core import callback
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers.update_coordinator import (
    CoordinatorEntity,
    DataUpdateCoordinator,
    UpdateFailed,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass, config_entry, async_add_entities):
    """Config entry example."""
    # assuming API object stored as runtime_data by __init__.py
    my_api = config_entry.runtime_data
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
            async with asyncio.timeout(10):
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

### 每个独立 entity 单独 poll

有些 API 会为每个 device 提供一个 endpoint。有时无法将一个 API device 映射到一个单一的 entity。如果你从一个 API device endpoint 创建了多个 entities，请参阅上一节。

如果你可以将一个 device endpoint 精确映射到一个单一 entity，你可以在 `update()` / `async_update()` method 中获取该 entity 的 data。请确保 polling 设置为 `True`，Home Assistant 会定期调用此 method。

如果你的 entities 在首次写入 Home Assistant 之前需要获取 data，请将 `update_before_add=True` 传递给 `add_entities` method：`add_entities([MyEntity()], update_before_add=True)`。

你可以通过在 platform 中定义一个 `SCAN_INTERVAL` constant 来控制 integration 的 polling interval。注意不要将此值设置得太低。它会占用 Home Assistant 的资源，可能压垮承载 API 的 device，或被 cloud APIs 封禁。允许的最小值是 5 秒。

```python
from datetime import timedelta

SCAN_INTERVAL = timedelta(seconds=5)
```

## Pushing API endpoints

如果你的 API endpoint 是 push data 的，你仍然可以使用 data update coordinator。做法是不要将 polling 参数 `update_method` 和 `update_interval` 传递给构造函数。

当新的 data 到达时，使用 `coordinator.async_set_updated_data(data)` 将 data 传递给 entities。如果在 poll 的 coordinator 上使用此 method，它会重置到下一次 poll data 的时间。

## Request parallelism

:::info
Home Assistant 会自动管理 request parallelism；大多数 integrations 无需更改此处描述的任何内容。
:::

Home Assistant 有内置的 logic，确保 integrations 不会 hammer APIs 并耗尽 Home Assistant 的所有可用资源。这个 logic 围绕限制并行请求的数量构建。这个 logic 会在 service action 调用和 entity 更新期间自动使用。

Home Assistant 通过为每个 integration 维护一个 [semaphore](https://docs.python.org/3/library/asyncio-sync.html#asyncio.Semaphore) 来控制并行更新（对 `update()` 的调用）的数量。例如，如果 semaphore 允许 1 个并行连接，那么当有一个正在进行时，updates 和 service action 调用会等待。如果该值为 0，integration 本身负责在必要时限制并行请求的数量。

平台并行请求的默认值由添加的到 Home Assistant 的第一个 entity 决定。如果 entity 定义了 `async_update` method，则为 0，否则为 1。（这是一个遗留决策）

Platforms 可以通过在它们的 platform（如 `rflink/light.py`）中定义 `PARALLEL_UPDATES` constant 来覆盖默认值。
