---
title: "Asyncio 中的线程安全"
---

使用 asyncio 开发需要仔细关注线程安全，因为几乎所有 asyncio 对象都不是线程安全的。如果你刚刚开始使用 asyncio，请查阅 Python 关于 [使用 asyncio 开发](https://docs.python.org/3/library/asyncio-dev.html) 的文档，以获取避免陷阱的提示。

Home Assistant 有一些在同一个代码库中处理 async 和非 async 代码的约定。主要要点如下：

- 从 helper 调用函数时如何运行取决于它是否使用了 `@callback` 修饰，以表明它不会阻塞且在 event loop 中运行是安全的；更多详情请参见 [处理 Async](asyncio_working_with_async.md)。
- 大多数 API 在从线程调用函数时都有同步和异步版本。async API 以 `async_` 为前缀。例如，在从 event loop 之外的线程触发 event 时，使用 `hass.bus.fire` 而不是 `hass.bus.async_fire`。

:::tip
开发期间务必启用 [`asyncio` debug mode](https://docs.python.org/3/library/asyncio-dev.html#debug-mode) 和 [Home Assistant 内置的 debug mode](https://www.home-assistant.io/integrations/homeassistant/#debug)，因为许多线程安全错误可以自动检测。
:::

## 解决线程安全错误

你可能到达此页面是因为 Home Assistant 检测到并报告了线程安全错误。从版本 2024.5.0 开始，Home Assistant 可以检测、报告并阻止一些非线程安全操作，以防止系统不稳定。在 Home Assistant 能够检测这些错误之前，它们可能导致意外重启或未定义行为，因为它们会破坏内部 asyncio 状态。以下是纠正非线程操作的一些提示。

## 确保代码在正确的线程中运行

### 接受 callback 的内置 helper

使用 Home Assistant 的内置 helper（如 `event.async_track_state_change_event` 或 `event.track_state_change_event`）时，重要的是根据代码运行在哪个线程来调用正确的 API。如果代码运行在 event loop 之外的线程中，请使用非 `async` 版本。

在下面的示例中，所有内容都将在 event loop 线程中运行，当 `async_track_state_change_event` 触发时，`async_update_event_state_callback` 也将在 event loop 线程中运行，因为它使用了 `@callback` 修饰。如果缺少 `@callback` 修饰器，`async_update_event_state_callback` 将在 executor 中运行，从而对 `async_write_ha_state` 进行非线程安全调用。

```python

    async def async_added_to_hass(self) -> None:
        """Entity 已被添加到 hass。"""
        self.async_on_remove(
            async_track_state_change_event(
                self.hass,
                ["light.other"],
                self.async_update_event_state_callback,
            )
        )

    @callback
    def async_update_event_state_callback(self, event: Event[EventStateChangedData]) -> None:
        """Entity 状态更改时调用。"""
        new_state = event.data["new_state"]
        if new_state is None or new_state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
            return
        self.async_write_ha_state()

```

### 特定 API 调用

你可能会发现需要从 event loop 线程之外的线程调用其中一个 async API 调用。在大多数情况下，`hass.add_job` 可以安全地从其他线程调用 async API。一些 helper 有特定的同步 API 用于从其他线程调用。下面是常用的 async API 及其从其他线程调用的方法的列表。

#### hass.async_create_task

在从 event loop 线程之外的线程创建任务时，请改用 `hass.create_task`

#### hass.bus.async_fire

在从 event loop 线程之外的线程触发 event 时，请改用 `hass.bus.fire`

#### hass.services.async_register

在从 event loop 线程之外的线程注册 service action 时，请改用 `hass.services.register`

#### hass.services.async_remove

在从 event loop 线程之外的线程移除 service action 时，请改用 `hass.services.remove`

#### async_write_ha_state

在从 event loop 线程之外的线程写入 entity 状态时，请改用 `self.schedule_update_ha_state`

#### hass.config_entries.async_update_entry

更新 config entry 必须在 event loop 线程中完成。没有同步的 API 来更新 config entry。如果调用函数在另一个线程中运行不是错误，请使用 `hass.add_job` 在 event loop 中调度一个调用 `hass.config_entries.async_update_entry` 的函数。

#### async_dispatcher_send

在从 event loop 线程之外的线程调用 dispatcher 时，请改用 `dispatcher_send`。

#### async_render_to_info

模板必须在 event loop 线程中渲染。没有同步的 API 来渲染模板。使用 `hass.add_job` 在 event loop 中调度一个调用 `async_render_to_info` 的函数。

#### area_registry.async_create

区域注册表必须在 event loop 线程中修改。区域注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `area_registry.async_create` 的函数。

#### area_registry.async_delete

区域注册表必须在 event loop 线程中修改。区域注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `area_registry.async_delete` 的函数。

#### area_registry.async_update

区域注册表必须在 event loop 线程中修改。区域注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `area_registry.async_update` 的函数。

#### category_registry.async_create

分类注册表必须在 event loop 线程中修改。分类注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `category_registry.async_create` 的函数。

#### category_registry.async_delete

分类注册表必须在 event loop 线程中修改。分类注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `category_registry.async_delete` 的函数。

#### category_registry.async_update

分类注册表必须在 event loop 线程中修改。分类注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `category_registry.async_update` 的函数。

#### device_registry.async_update_device

设备注册表必须在 event loop 线程中修改。设备注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `device_registry.async_update_device` 的函数。

#### device_registry.async_remove_device

设备注册表必须在 event loop 线程中修改。设备注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `device_registry.async_remove_device` 的函数。

#### entity_registry.async_get_or_create

Entity 注册表必须在 event loop 线程中修改。Entity 注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `entity_registry.async_get_or_create` 的函数。

#### entity_registry.async_remove

Entity 注册表必须在 event loop 线程中修改。Entity 注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `entity_registry.async_remove` 的函数。

#### entity_registry.async_update_entity

Entity 注册表必须在 event loop 线程中修改。Entity 注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `entity_registry.async_update_entity` 的函数。

#### floor_registry.async_create

楼层注册表必须在 event loop 线程中修改。楼层注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `floor_registry.async_create` 的函数。

#### floor_registry.async_delete

楼层注册表必须在 event loop 线程中修改。楼层注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `floor_registry.async_delete` 的函数。

#### floor_registry.async_update

楼层注册表必须在 event loop 线程中修改。楼层注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `floor_registry.async_update` 的函数。

#### issue_registry.async_get_or_create

问题注册表必须在 event loop 线程中修改。请改用 `issue_registry.create_issue`。

#### issue_registry.async_delete

问题注册表必须在 event loop 线程中修改。请改用 `issue_registry.delete_issue`。

#### issue_registry.async_ignore

问题注册表必须在 event loop 线程中修改。问题注册表没有同步的 API 来忽略 issue。使用 `hass.add_job` 在 event loop 中调度一个调用 `issue_registry.async_ignore_issue` 的函数。

#### label_registry.async_create

标签注册表必须在 event loop 线程中修改。标签注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `label_registry.async_create` 的函数。

#### label_registry.async_delete

标签注册表必须在 event loop 线程中修改。标签注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `label_registry.async_delete` 的函数。

#### label_registry.async_update

标签注册表必须在 event loop 线程中修改。标签注册表没有同步的 API。使用 `hass.add_job` 在 event loop 中调度一个调用 `label_registry.async_update` 的函数。
