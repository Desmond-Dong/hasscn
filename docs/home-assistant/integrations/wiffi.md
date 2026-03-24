---
title: Wiffi
description: 支持 stall.biz 的 WIFFI 设备，例如 Weatherman、Rainyman 等...
ha_category:
  - DIY
ha_release: '0.110'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mampfes'
ha_domain: wiffi
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: hub
---

**Wiffi** 集成可让您将 [STALL WIFFI](https://stall.biz) 设备直接连接到 Home Assistant。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 配置 WIFFI 设备

1. 将“CCU-IP Adresse myCCUIP”设置为 Home Assistant 的 IP 地址。
2. 使用 `send_json` 参数，将 JSON 报文的端口设置为已配置的服务器端口。

Home Assistant 会在配置的端口上打开 TCP 服务器套接字，并监听来自 STALL WIFFI 设备的传入报文。新设备的实体会自动添加。
