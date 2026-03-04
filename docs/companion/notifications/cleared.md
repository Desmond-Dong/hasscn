---
title: "通知清除"
id: "notification-cleared"
---

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

当通知被清除时，Android 会通知伴侣应用此事件。除了确保组被取消外，应用还会向您的 Home Assistant 实例发送 `mobile_app_notification_cleared` 事件。此事件将包含发送到设备的所有通知数据。此事件将在每个被清除的通知上触发。如果您手动从通知状态栏滑动清除，或点击"全部清除"按钮，则视为通知已清除。如果点击通知打开应用，则不会发送事件。

示例事件数据：

```json
{
    "event_type": "mobile_app_notification_cleared",
    "data": {
        "message": "test",
        "device_id": "DEVICE_ID"
    },
    "origin": "REMOTE",
    "time_fired": "2020-10-06T05:36:12.864583+00:00",
    "context": {
        "id": "ID",
        "parent_id": null,
        "user_id": "USER_ID"
    }
}
```