---
title: Bryant Evolution
description: 'Bryant Evolution 集成允许您控制 Bryant Evolution HVAC 系统。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Climate
featured: false
ha_release: 2024.8
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: bryant_evolution
ha_platforms:
  - climate
ha_integration_type: device
ha_codeowners:
  - '@danielsmyers'
---
# Bryant Evolution

**Bryant Evolution** 集成允许您控制 Bryant Evolution HVAC 系统。

## 前提条件

- 需要将系统访问模块连接到 HVAC 系统（例如 Bryant SYSTXBBRCT01）。

安装步骤：

1. 将系统访问模块连接到运行 Home Assistant 的设备，例如使用 RS-232 转 USB 适配器。
2. 在 Home Assistant 中安装 Bryant Evolution 集成，传递设备连接的串口名称（例如 `/dev/ttyUSB0`）


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::