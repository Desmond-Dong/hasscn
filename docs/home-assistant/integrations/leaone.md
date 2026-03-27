---
title: LeaOne
description: '将 LeaOne 健康设备集成到 Home Assistant。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_release: 2024.2
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: leaone
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---
# LeaOne

将 LeaOne 健康设备集成到 Home Assistant。

LeaOne 以 Xiaogui 和 BAGAIL 品牌生产蓝牙体重秤及其他健康设备。

## 支持的设备

- 蓝牙体重秤 TZC4（公制）
- 蓝牙体重秤 TZC4（英制）
- 蓝牙体重秤 QJ-J（公制）

由于 LeaOne 的蓝牙设计使用了非标准发现方式，因此 LeaOne 集成无法自动发现设备。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
