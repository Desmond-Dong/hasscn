---
title: Deako
description: 'Deako Smart Lighting 集成允许您从 Home Assistant 控制 Deako(https://deako.com) 设备。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: '2024.10'
ha_domain: deako
ha_config_flow: true
ha_platforms:
  - light
ha_codeowners:
  - '@sebirdman'
  - '@balake'
  - '@deakolights'
ha_zeroconf: true
ha_integration_type: integration
---
# Deako

**Deako Smart Lighting** 集成允许您从 Home Assistant 控制 [Deako](https://deako.com) 设备。

## 前提条件

要使此集成正常工作，您的设备必须在 Deako 应用中显示为**在线**。设备上线后，不再需要 Deako 应用。设备将在没有应用的情况下继续工作。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的设备

- 所有智能 Deako 设备

目前不支持的功能：

- Deako 群组
- Deako 场景