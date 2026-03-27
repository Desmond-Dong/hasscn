---
title: Ruuvi Gateway
description: '此集成通过 /history 端点poll 将 Ruuvi Gateway(https://ruuvi.com/gateway/) 设备接入为采用轮询方式的 BLE 远程扫描器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_release: '2023.2'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@akx'
ha_domain: ruuvi_gateway
ha_dhcp: true
ha_integration_type: device
---
# Ruuvi Gateway

此集成通过 [`/history` 端点][poll] 将 [Ruuvi Gateway](https://ruuvi.com/gateway/) 设备接入为采用轮询方式的 BLE 远程扫描器。

## 设置

请确保在 Ruuvi Gateway 设备上[启用 Bearer Token 认证][poll]，并记下该令牌。

您也可能希望启用对 _所有_ BLE beacon 的扫描（而不仅仅是 RuuviTag）；请在 Cloud Options 设置页面中选择 “Use Ruuvi Cloud or/and a custom server and configure more settings”，然后在 “Bluetooth Scanning” 页面中选择 “All (including third party beacons)”。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

[poll]: https://docs.ruuvi.com/gw-examples/polling-mode
