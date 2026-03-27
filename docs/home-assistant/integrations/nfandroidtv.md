---
title: Notifications for Android TV / Fire TV
description: 'Android TV 通知(https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) 和 Fire TV 通知(https://www.amazon.com/Christian-Fee。'

ha_category:
  - Notifications
ha_release: 0.32
ha_config_flow: true
ha_domain: nfandroidtv
ha_iot_class: Local Push
ha_platforms:
  - notify
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
---
# Notifications for Android TV / Fire TV

[Android TV 通知](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) 和 [Fire TV 通知](https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK) 的通知集成。您可以使用此集成将通知发送到您的 Android TV 设备。包含消息内容的叠加层将显示可配置的秒数，然后再次消失。还支持发送图像（例如安全摄像头）和自定义图标。图标本质上与图像相同（支持 Android TV 支持的任何图像格式），但图标显示得较小且位于通知左侧，而图像则较大且位于通知上方。

这些通知在您的 Android TV 设备的全局范围内。无论哪个应用程序正在运行，它们都会显示。

设置此功能时请注意，有两个应用程序：一个用于您的智能手机发送通知（此平台不需要），另一个用于您的 Android TV 设备接收通知。 Android TV 设备商店中提供的应用程序是显示从 Home Assistant 发送的通知所需的应用程序。应用内购买仅适用于Android智能手机客户端，因此从Home Assistant推送通知时没有任何限制。

## Configuration

To add the **Notifications for Android TV / Fire TV** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nfandroidtv)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nfandroidtv).
- From the list, select **Notifications for Android TV / Fire TV**.
- Follow the instructions on screen to complete the setup.

</details>

## Actions

### Action: Notify

`notify.[name_of_your_tv]` 操作会向您的 Android TV 发送通知。可以在通知操作的数据字段内指定以下选项：

```yaml
duration:
  description: The duration in seconds for which the notification will be displayed.
  default: 5
  type: integer
fontsize:
  description: "Has to be one of: `small`, `medium`, `large` or `max`."
  default: medium
  type: string
position:
  description: "Has to be one of: `bottom-right`, `bottom-left`, `top-right`, `top-left` or `center`."
  default: bottom-right
  type: string
color:
  description: "Has to be one of: `grey`, `black`, `indigo`, `green`, `red`, `cyan`, `teal`, `amber` or `pink`."
  default: "`grey`"
  type: string
transparency:
  description: "Has to be one of: `0%`, `25%`, `50%`, `75%` or `100%`."
  default: 25%
  type: string
timeout:
  description: The timeout in seconds for trying to send the notification to the device.
  default: 5
  type: integer
interrupt:
  description: If set to true, 1, on etc., the notification is interactive and can be dismissed or selected to display more details. Depending on the running app (e.g., Netflix), this may stop playback.
  default: false
  type: boolean
```

这是一个完全自定义的 YAML，您可以在“data”内部使用来测试最终通知的外观（要在操作中使用它，请查看本页末尾的示例）：

```yaml
fontsize: "large"
position: "center"
duration: 2
transparency: "0%"
color: "red"
interrupt: 1
```

## 发送图像和图标的操作数据

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `image`                |      yes | Groups the attributes for image upload. It can take a `url` or `path`. It is optional unless you use authentication options. Then, either `url` or `path` has to be provided. |
| `icon`                 |      yes | Groups the attributes for icon upload.  It can take a `url` or `path`. It is optional unless you use authentication options. Then, either `url` or `path` has to be provided.  |
| `path`                 |      yes | Local path of an image file. Is placed inside `image`, `icon`, or both.
| `url`                  |      yes | URL of an image file. Is placed inside `image`, `icon` or both.
| `username`             |      yes | Username if the URL requires authentication. Is placed inside `image`, `icon` or both`.
| `password`             |      yes | Password if the URL requires authentication. Is placed inside `image`, `icon` or both.
| `auth`                 |      yes | If set to `digest` HTTP-Digest-Authentication is used. If missing, HTTP-BASIC-Authentication is used and is placed inside `image`, `icon` or both.

图像和图标的操作数据示例：

```yaml
# If your urls do not require extra authentication
icon: "http://[url to image file]"
image: "http://[url to image file]"

# 大多数情况下的路径
图标：“/您/路径/位置”
图片：“/你/路径/位置”
# 或者也可以
图标：
  路径：“/您/路径/位置”
图片：
  路径：“/您/路径/位置”

# If your urls require extra authentication
image:
  url: "http://[url to image file]"
  username: "optional user, if necessary" # Optional
  password: "optional password, if necessary" # Optional 
  auth: "digest" # Optional
icon:
  url: "http://[url to image file]"
  username: "optional user, if necessary" # Optional
  password: "optional password, if necessary" # Optional
  auth: "digest" # Optional
```

具有操作、完整配置的自动化示例：


```yaml
action: notify.living_room_tv
data:
  title: "Thanks for the water!"
  message: "Nigel is {{ states('sensor.nigel_moisture') }}% moisture"
  data:
    duration: 4
    position: "bottom-left"
    fontsize: "medium"
    transparency: "75%"
    color: "teal"
    interrupt: 0
```


Please note that `path` is validated against the `allowlist_external_dirs` in the `configuration.yaml`.
