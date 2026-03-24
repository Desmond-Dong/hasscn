---
title: Joaoapps Join
description: 关于如何在 Home Assistant 中集成 Joaoapps 的 Join 服务的说明。
ha_category:
  - Hub
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.24
ha_domain: joaoapps_join
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Joaoapps Join** 集成公开了来自 [Join](https://joaoapps.com/join) 的操作。在 Home Assistant 中，Joaoapps Join 的功能分为两个部分：Join 集成，以及 Joaoapps Join 通知平台。通知平台允许您向 Joaoapps Join 设备发送消息，而集成则让您访问 Joaoapps Join 提供的其他特殊功能。如有疑问，可以参考其所基于的 [API 文档](https://joaoapps.com/join/api/)。

在 "`configuration.yaml`" 文件中，您需要提供 API 密钥，以及目标设备的设备 ID 或名称。您可以在[这里](https://joinjoaomgcd.appspot.com/)找到您的设备 ID 和 API 密钥。

要进行设置，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
notify:
  - platform: joaoapps_join
    api_key: YOUR_API_KEY
    device_id: DEVICE_ID
    device_ids: DEVICE_ID_1,DEVICE_ID_2
    device_names: DEVICE_1_NAME,DEVICE_2_NAME
    name: NAME
joaoapps_join:
  - name: NAME_OF_GROUP
    device_id: GROUP.GROUP_NAME
    api_key: YOUR_API_KEY
```

```yaml
api_key:
  description: Join 的 API 密钥。
  required: true
  type: string
device_id:
  description: 您的设备或组的 ID。
  required: false
  type: string
device_ids:
  description: 以逗号分隔的设备 ID 或组列表。
  required: false
  type: string
device_names:
  description: 以逗号分隔的设备名称列表。
  required: false
  type: string
name:
  description: name 参数是可选的，但如果您想使用多个通知平台，则需要提供。该平台将公开为 `notify.<name>` 操作。如果未提供，名称默认为 `notify`。更多信息请参阅 [Notifications 集成](/home-assistant/integrations/notify)。
  required: false
  type: string
```

只使用 `device_id`、`device_ids` 或 `device_names` 其中之一，它将决定通知接收者。

```yaml
# configuration.yaml 示例条目
notify:
  - platform: joaoapps_join
    api_key: YOUR_API_KEY
    device_id: DEVICE_ID1
    name: NAME1
  - platform: joaoapps_join
    api_key: YOUR_API_KEY
    device_id: DEVICE_ID2
    name: NAME2
```

通知操作有多个可选参数：`icon`、`smallicon`、`image`、`sound`、`url`、`notification_id`、`category`、`tts`、`tts_language` 和 `vibration`。
您可以像这样使用它们：

```yaml
message: Hello from Home Assistant!
title: Home Assistant
data:
  icon: https://goo.gl/xeetdy
  smallicon: https://goo.gl/xeetdy
  vibration: 0,65,706,86,657,95,668,100
  image: https://www.home-assistant.io/images/favicon-192x192-full.png
  sound: https://goo.gl/asasde.mp3
  url: https://home-assistant.io
  notification_id: hass-notification
  category: Custom Notification Category
  tts: Notification from Home Assistant
  tts_language: english
  actions:
    Netflix:
    Tweet:
      - Tweet from HASS!
    Sleep:
```

`joaoapps_join` 集成公开的操作可与下述操作数据一起使用：

| Action                       | Data                                                               |
| ---------------------------- | ------------------------------------------------------------------ |
| joaoapps_join/ring           |                                                                    |
| joaoapps_join/send_sms       | `{"number":"5553334444", "message":"Hello!"}`                      |
| joaoapps_join/send_tasker    | `{"command":"test"}`                                               |
| joaoapps_join/send_url       | `{"url":"http://google.com"}`                                      |
| joaoapps_join/send_wallpaper | `{"url":"http://www.planwallpaper.com/static/images/ZhGEqAP.jpg"}` |
| joaoapps_join/send_file      | `{"url":"http://download.thinkbroadband.com/5MB.zip"}`             |
