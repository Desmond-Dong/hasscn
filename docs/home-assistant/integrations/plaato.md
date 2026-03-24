---
title: Plaato
description: 有关如何在 Home Assistant 中集成 Plaato Airlock 和 Keg 传感器的说明。
ha_release: 0.95
ha_category:
  - Sensor
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@JohNan'
ha_domain: plaato
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: hub
---

此集成可将 [Plaato](https://www.plaato.io/) Airlock 和 Keg 接入 Home Assistant。

### Plaato Airlock

这是面向啤酒酿造者的工具，可提供对发酵过程的独特洞察。
通过此集成，您可在 Home Assistant 中查看全部发酵数据。

### Plaato Keg

这是首个一体化系统，可跟踪酒桶的重要状态，包括：

- 酒桶内啤酒余量
- 出酒状态
- 温度

## 配置

要配置 Plaato 设备，您需要在 Home Assistant 前端的集成面板中完成设置。

您可以选择两种方式：webhook 和 `auth_token`。目前 webhook 仅适用于 Airlock。

### 认证令牌

要查询 API，需要 `auth_token`，可按[此说明](https://intercom.help/plaato/en/articles/5004720-auth_token)获取。

### Webhook（仅 Airlock）

配置步骤会提供用于 PLAATO 手机应用的 webhook URL。请将其粘贴到配置中的“Webhook”选项卡。
更多信息请参阅[此处](https://intercom.help/plaato/en/articles/5004719-webhook-plaato-airlock)。

该传感器平台并非由 Plaato 制作，不是官方产品，也并非由 Plaato 开发或支持。
