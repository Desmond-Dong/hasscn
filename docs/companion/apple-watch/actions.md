---
title: "（旧版）iOS 操作"
id: "watch-actions"
---

:::info 继续之前
您可以通过将脚本/场景添加到手表[配置](/companion/apple-watch/#home)来直接运行脚本和激活场景。
iOS 操作将不再获得未来支持。请迁移到其他解决方案，如 **脚本** 小部件或 Apple Watch 配置。
:::

从 Apple Watch 触发的操作将以与 iPhone 上触发的操作相同的方式传送到 Home Assistant 事件总线，使用 `ios.action_fired` 事件，但事件的负载会略有不同以阐明事件的来源。Apple Watch 触发的操作将把 `triggerSource` 键设置为 `watch`。

在 Apple Watch 上触发的事件的 `ios.action_fired` 负载示例：

```json
{
    "event_type": "ios.action_fired",
    "data": {
        "sourceDeviceID": "my_iphone",
        "actionID": "09CEA437-4585-4A97-B946-79D2C8B3145A",
        "sourceDevicePermanentID": "BCEE1730-E6BE-453B-B9E5-9601FA182C64",
        "actionName": "MyActionName",
        "triggerSource": "watch",
        "sourceDeviceName": "My iPhone"
    },
    "origin": "REMOTE",
    "time_fired": "2020-06-13T14:40:43.009700+00:00",
    "context": {
        "id": "d2f58b921b2f41809af9fce444416aab",
        "parent_id": null,
        "user_id": "3831508509fe4124abaf1d144c2e8ca4"
    }
}
```