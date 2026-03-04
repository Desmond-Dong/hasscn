---
title: "分享"
id: 'sharing'
---

此功能将在以下应用版本中可用：

| <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> | <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android |
| ----------------------------- | --------------------------------------- |
| 2020.7                        | 2.5.0                                   |


伴侣应用允许您从任何支持分享功能的应用程序分享到您的 Home Assistant 服务器。应用将触发一个 `mobile_app.share` 事件，并提供一些事件数据供您进行自动化。

两个应用都会根据分享来源的应用提供 `url` 或 `text` 的事件数据。iOS 用户将获得 `entered` 的事件数据，其中包含分享时发送的任何文本。Android 用户将获得 `caller` 的事件数据，其中包含分享事件来源的应用。

Android 应用的事件数据示例：

```json
{
    "event_type": "mobile_app.share",
    "data": {
        "caller": "android-app://com.android.chrome",
        "subject": "网页标题",
        "url": "https://www.example.xom",
        "text": "TEXT",
        "device_id": "DEVICE_ID"
    },
    "origin": "REMOTE",
    "time_fired": "2020-09-25T01:06:48.512587+00:00",
    "context": {
        "id": "ID",
        "parent_id": null,
        "user_id": "USER_ID"
    }
}
```

iOS 应用的事件数据示例：

```json
{
    "event_type": "mobile_app.share",
    "data": {
        "entered": "我输入的文本",
        "sourceDeviceID": "iphone_11_pro_debug",
        "sourceDeviceName": "iPhone 11 Pro",
        "sourceDevicePermanentID": "DEVICE_ID",
        "text": "Home Assistant automations system into multiple areas of iOS ",
        "url": "https://www.example.com"
    },
    "origin": "REMOTE",
    "time_fired": "2020-09-25T01:07:48.926946+00:00",
    "context": {
        "id": "ID",
        "parent_id": null,
        "user_id": "USER_ID"
    }
}
```
