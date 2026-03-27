---
title: The Things Network
description: 'The Things Network 集成允许您在 Home Assistant 中与 The Things Network(https://www.thethingsnetwork.org) 交互。这个由社区驱动的开放网络支持 LoRaWAN(https://www.lora-alliance.org/)。'
ha_category:
  - Hub
  - Sensor
ha_release: 0.55
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@angelnu'
ha_domain: thethingsnetwork
ha_platforms:
  - sensor
ha_integration_type: hub
ha_config_flow: true
---
# The Things Network

**The Things Network** 集成允许您在 Home Assistant 中与 [The Things Network](https://www.thethingsnetwork.org) 交互。这个由社区驱动的开放网络支持 [LoRaWAN](https://www.lora-alliance.org/)，可实现低带宽（每条消息 51 字节）的远距离通信（约 5 到 15 公里）。[网关](https://www.thethingsnetwork.org/docs/gateways/) 会将从传感器接收到的数据传输到 The Things Network。

The Things Network 支持多种集成方式来提供数据：

| The Things Network Integration | Home Assistant platform |
|---|---|
| [MQTT](https://www.thethingsindustries.com/docs/integrations/mqtt) | [`MQTT`](/home-assistant/integrations/mqtt) |
| [Storage](https://www.thethingsindustries.com/docs/integrations/storage) | [`thethingsnetwork`](#setup) |
| [HTTP](https://www.thethingsindustries.com/docs/integrations/webhooks) | |

Home Assistant 目前支持以下设备类型：

- [Prerequisites](#prerequisites)
- [Sensor](#sensor)


## 前提条件


1. 访问 [The Things Network Console](https://console.thethingsnetwork.org/) 网站，使用 The Things Network 凭据登录，并在 **Applications** 中选择您的应用。
   - **Application ID** 用于标识您的数据范围。

   ![Application overview](/home-assistant/images/integrations/thethingsnetwork/applications.png)

2. 在 integrations 菜单下启用 storage 集成：

   ![Storage Integration](/home-assistant/images/integrations/thethingsnetwork/storage_integration.png)

3. 确保您的设备已配置 [Uplink Payload Formatter](https://www.thethingsindustries.com/docs/integrations/payload-formatters/)。

   ![Payload Formatters](/home-assistant/images/integrations/thethingsnetwork/payload_formatters.png)

4. 您需要 API 密钥才能读取应用中的数据。
   - 所需的最小权限为 `Read Application Traffic (uplink and downlink)`。

   ![API keys](/home-assistant/images/integrations/thethingsnetwork/apis_key.png)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::


## 传感器

所有由 The Things Network 解码的上行消息（包括 `decoded_payload` 条目）都会由此集成处理。`decoded_payload` 中的每个字段都会作为一个 Home Assistant 传感器实体添加。
