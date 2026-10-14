:::info
集成一般被鼓励将 events 作为 [event entities](/developers/core/entity/event.md) 发布，而不是直接在 event bus 上发出 events。这种方法通过让用户更容易浏览和识别所有可用的 events 来提升用户体验。
:::

一些 integrations 表示具有 events 的 devices 或 services，比如检测到运动或按下短暂按钮时。integration 可以通过在 Home Assistant 中将其作为 events 发出，向用户提供这些 events。

你的 integration 应该发出类型为 `<domain>_event` 的 events。例如，ZHA integration 发出 `zha_event` events。

如果该 event 与某个特定的 device/service 相关，应该进行正确的归属。方法是在 event data 中添加一个 `device_id` attribute，其中包含来自 device registry 的 device 标识符。

```
event_data = {
    "device_id": "my-device-id",
    "type": "motion_detected",
}
hass.bus.async_fire("mydomain_event", event_data)
```

如果一个 device 或 service 只发出 events，你需要 [手动在 device registry 中注册它](/developers/device_registry_index.md#manual-registration)。

## 让 events 对用户可用

一个 [Device trigger](/developers/device_automation_trigger.md) 可以根据 payload 附加到特定 event 上，并让该 event 对用户可用。有了 device trigger，用户就能看到该 device 的所有可用 events，并在 automations 中使用它。

## 不要做的事

与 event 相关的代码不应成为你 integration 的 entity logic 的一部分。你应该从 `__init__.py` 中的 `async_setup_entry` 内部启用将你的 integration events 转换为 Home Assistant events 的 logic。

Entity state 不应代表 events。例如，你不应该在 event 发生时创建一个持续 30 秒处于 `on` 状态的 binary sensor。
