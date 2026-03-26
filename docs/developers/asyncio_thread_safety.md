---
title: "asyncio 的线程安全"
---

使用 asyncio 开发时必须特别注意线程安全，因为几乎所有 asyncio 对象都不是线程安全的。如果你刚开始接触 asyncio，建议先阅读 Python 文档中的[使用 asyncio 开发](https://docs.python.org/3/library/asyncio-dev.html)，以避开常见陷阱。

在同一个代码库里同时处理异步和非异步代码时，Home Assistant 有一套约定。最重要的是：

- 是否能直接在事件循环中运行某个函数，取决于它是否用 `@callback` 装饰，以明确表明它不会阻塞，可以安全地在事件循环线程中执行；详见[使用异步](/developers/asyncio_working_with_async)。
- 从线程调用函数时，大多数 API 同时提供同步版和异步版。异步 API 一般以前缀 `async_` 命名。例如，从事件循环以外的线程触发事件时，应使用 `hass.bus.fire`，而不是 `hass.bus.async_fire`。

:::tip
开发时请务必启用 [`asyncio` 调试模式](https://docs.python.org/3/library/asyncio-dev.html#debug-mode) 和 [Home Assistant 的调试模式](https://www.home-assistant.io/integrations/homeassistant/#debug)。这样可以自动发现许多线程安全错误。
:::

## 解决线程安全错误

如果你来到这个页面，很可能是因为 Home Assistant 检测并报告了线程安全问题。从 2024.5.0 开始，Home Assistant 可以检测、报告并阻止一部分非线程安全操作，以避免系统卡死。这类错误可能导致意外重启或未定义行为，因为它们可能破坏 asyncio 的内部状态。下面是一些修复建议。

## 确保代码运行在正确的线程中

### 接收 callback 的内置 helper

使用 Home Assistant 的内置 helper（例如 `event.async_track_state_change_event` 或 `event.track_state_change_event`）时，必须根据代码所在的线程选择正确的 API。如果代码运行在事件循环线程中，请使用异步版本。

在下面的示例中，所有代码都运行在事件循环线程中。当 `async_track_state_change_event` 触发时，`async_update_event_state_callback` 也会在事件循环线程中执行，因为它使用了 `@callback` 装饰器。如果缺少 `@callback`，`async_update_event_state_callback` 会被放到 executor 中运行，进而导致对 `async_write_ha_state` 的非线程安全调用。

```python
    async def async_added_to_hass(self) -> None:
        """Entity has been added to hass."""
        self.async_on_remove(
            async_track_state_change_event(
                self.hass,
                ["light.other"],
                self.async_update_event_state_callback,
            )
        )

    @callback
    def async_update_event_state_callback(self, event: Event[EventStateChangedData]) -> None:
        """Call when entity state changes."""
        new_state = event.data["new_state"]
        if new_state is None or new_state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
            return
        self.async_write_ha_state()
```

### 具体 API 调用

你可能需要从事件循环线程之外调用某个异步 API。在大多数情况下，可以使用 `hass.add_job` 安全地从其他线程调度异步调用。有些 helper 还提供了专门的同步 API。下面列出的是最常见的情况。

#### hass.async_create_task

如果是在事件循环线程之外创建任务，请改用 `hass.create_task`。

#### hass.bus.async_fire

如果是在事件循环线程之外触发事件，请改用 `hass.bus.fire`。

#### hass.services.async_register

如果是在事件循环线程之外注册服务，请改用 `hass.services.register`。

#### hass.services.async_remove

如果是在事件循环线程之外移除服务，请改用 `hass.services.remove`。

#### async_write_ha_state

如果是在事件循环线程之外更新实体状态，请改用 `self.schedule_update_ha_state`。

#### hass.config_entries.async_update_entry

更新配置条目必须在事件循环线程中完成。这个操作没有同步 API。如果调用方在其它线程中运行，可使用 `hass.add_job` 在事件循环中调度调用 `hass.config_entries.async_update_entry` 的函数。

#### async_dispatcher_send

如果是在事件循环线程之外调用 dispatcher，请改用 `dispatcher_send`。

#### async_render_to_info

模板必须在事件循环线程中渲染。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `async_render_to_info` 的函数。

#### area_registry.async_create

对 area registry 的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `area_registry.async_create` 的函数。

#### area_registry.async_delete

对 area registry 的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `area_registry.async_delete` 的函数。

#### area_registry.async_update

对 area registry 的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `area_registry.async_update` 的函数。

#### category_registry.async_create

对 category registry 的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `category_registry.async_create` 的函数。

#### category_registry.async_delete

对 category registry 的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `category_registry.async_delete` 的函数。

#### category_registry.async_update

对 category registry 的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `category_registry.async_update` 的函数。

#### device_registry.async_update_device

对设备注册表的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `device_registry.async_update_device` 的函数。

#### device_registry.async_remove_device

对设备注册表的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `device_registry.async_remove_device` 的函数。

#### entity_registry.async_get_or_create

对实体注册表的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `entity_registry.async_get_or_create` 的函数。

#### entity_registry.async_remove

对实体注册表的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事件循环中调度调用 `entity_registry.async_remove` 的函数。

#### entity_registry.async_update_entity

对实体注册表的修改必须在事件循环线程中完成。这个操作没有同步 API。请使用 `hass.add_job` 在事
