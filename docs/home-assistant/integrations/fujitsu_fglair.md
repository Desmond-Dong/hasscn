---
title: FGLair
description: 控制使用 FGLair 应用的富士通热泵或空调
ha_category:
  - Climate
ha_release: 2024.9
ha_domain: fujitsu_fglair
ha_integration_type: hub
ha_codeowners:
  - '@crevetor'
ha_config_flow: true
ha_platforms:
  - climate
  - sensor
ha_iot_class: Cloud Polling
---

**FGLair** 集成为使用 FGLair 应用程序的富士通热泵和空调提供支持。
要了解适合您的热泵的应用程序，请查看 [the Fujitsu FGLair FAQ](https://www.fujitsu-general.com/global/support/faq/airstage-mobile/0127.html)。

## 支持的设备

此集成支持与 FGlair 应用程序和其他外部集成配合使用的一部分设备。

如果您的设备名称（在 FGlair 应用程序的 **设置 > 固件信息** 中可见）以 AC-UTY 开头，则此集成不支持您的设备。

应支持名称以 AP-WA、AP-WB、AP-WC、AP-WD 或 AP-WF 开头的设备。

## 先决条件

首先，在使用此集成之前在 FGLair 应用程序中设置您的设备。
要配置此集成，您将需要用于连接到 FGLair 应用程序的凭据（登录名和密码）。


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

＃＃ 气候

此集成支持以下功能（如果设备支持）：

- [`set_hvac_mode`](/home-assistant/integrations/climate/#action-climateset_hvac_mode)
- [`target temperature`](/home-assistant/integrations/climate#action-climateset_temperature)
- [`turn on/off`](/home-assistant/integrations/climate#action-climateturn_on)
- [`fan mode`](/home-assistant/integrations/climate#action-climateset_fan_mode)
- [`swing mode`](/home-assistant/integrations/climate#action-climateset_swing_mode)

## 室外温度

在支持它的设备上，这种集成将暴露一个温度传感器，报告设备正在感测的外部温度。
