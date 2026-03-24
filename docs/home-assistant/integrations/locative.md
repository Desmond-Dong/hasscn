---
title: Locative
description: 关于如何使用 Locative 在 Home Assistant 中跟踪设备的说明。
ha_category:
  - Presence detection
ha_release: 0.86
ha_iot_class: Local Push
ha_domain: locative
ha_platforms:
  - device_tracker
ha_config_flow: true
ha_integration_type: integration
---

此集成可让您使用 [Locative](https://www.locative.app/) 进行存在检测。Locative 是一个适用于 [iOS](https://apps.apple.com/app/id725198453) 的开源应用，允许您在进入或离开地理围栏时发送 `GET` 或 `POST` 请求。您可以将其与 Home Assistant 配合使用，以更新您的位置。

请在智能手机上安装：

- [iOS](https://apps.apple.com/app/id725198453)

要配置 Locative，您必须通过配置界面的集成面板进行设置。您需要将应用配置为向集成在设置过程中提供的 webhook URL 发送 POST 请求。这样，当您进入或离开地理围栏时，Locative 就会向该 URL 发送相应请求，从而更新 Home Assistant。您无法在 Locative 中指定设备名称，因此需要在 `dev-state` 菜单中查找 Locative 首次发送 `GET` 请求后创建的新设备。如果您过去或当前也在使用 OwnTracks，则需要将 OwnTracks 设置中使用的设备名称更新为 Locative 生成的名称。

<p class='img'>
  <img src='/home-assistant/images/screenshots/locative.png'/>
</p>

当您进入地理围栏时，Home Assistant 中的位置名称会被设置为 Locative 中该地理围栏的名称。当您离开地理围栏时，Home Assistant 中的位置名称会被设置为 `not home`。
