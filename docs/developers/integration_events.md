---
title: "射击事件"
description: '通常鼓励 集成 将事件发布为事件 实体(/developers/core/entity/event)反而。这种方法使用户更容易浏览和识别所有可用事件，从而增强了用户体验。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 射击事件

:::info 
通常鼓励 集成 将事件发布为[事件 实体](/developers/core/entity/event)反而。这种方法使用户更容易浏览和识别所有可用事件，从而增强了用户体验。
:::

一些 集成 代表 设备 或具有事件的服务，例如检测到运动或按下瞬时按钮时。 集成 可以通过将它们作为 Home Assistant 中的事件触发来向用户提供这些。

您的 集成 应触发 `<domain>_event` 类型的事件。例如，ZHA 集成 触发 `zha_event` 事件。

如果事件与特定 device/service 相关，则应正确归因。通过将 `device_id` 属性添加到包含设备注册表中设备标识符的事件数据来执行此操作。

```
event_data = {
    "device_id": "my-device-id",
    "type": "motion_detected",
}
hass.bus.async_fire("mydomain_event", event_data)
```

如果 设备 或服务仅触发事件，您需要[手动将其注册到设备注册表中](/developers/device_registry_index#manual-registration).

## 让用户可以访问事件

一个[设备触发器](/developers/device_automation_trigger)可以根据有效负载附加到特定事件，并使用户可以访问该事件。通过 设备 触发器，用户将能够查看 设备 的所有可用事件并在自动化中使用它。

## 不该做什么

事件相关代码不应成为 集成 的 实体 逻辑的一部分。您想要启用将 集成 事件从 `async_setup_entry` 内部 `__init__.py` 内部转换为 Home Assistant 事件的逻辑。

实体 状态不应代表事件。例如，当事件发生时，您不希望二进制传感器为 `on` 持续 30 秒。
