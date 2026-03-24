---
title: AprilAire
description: 关于将 AprilAire 设备集成到 Home Assistant 的说明。
ha_category:
  - Climate
ha_iot_class: Local Push
ha_release: 2024.3
ha_domain: aprilaire
ha_codeowners:
  - '@chamberlain2007'
ha_config_flow: true
ha_platforms:
  - climate
  - humidifier
  - select
  - sensor
ha_integration_type: device
---

**AprilAire** 集成允许您控制 AprilAire 恒温器。

## 支持的型号

此集成支持 AprilAire [8800 系列家庭自动化 Wi-Fi 恒温器](https://www.aprilaire.com/whole-house-products/thermostats/home-automation)和 [6000 系列 Wi-Fi 区域控制设备](https://www.aprilaire.com/whole-house-products/zone-control)，它们支持将恒温器设置为自动化模式。已知有一些型号被宣传为支持家庭自动化，但不支持自动化模式，因此不受支持。

## 前提条件

为了连接到恒温器，您需要启用自动化模式。这涉及进入恒温器的承包商菜单并将连接类型更改为自动化。由于具体说明可能因型号而异，请参阅您特定型号的手册。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 关于设备限制的注意事项

由于恒温器的限制，一次只允许一个自动化连接到设备（AprilAire 应用程序不包括在此限制中，因为它使用单独的协议）。尝试同时多次连接到同一恒温器可能会导致各种问题，包括恒温器无响应和关闭。如果确实发生这种情况，重新启动恒温器应该可以恢复功能。