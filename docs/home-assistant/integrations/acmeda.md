---
title: Rollease Acmeda Automate
description: 'Rollease Acmeda Automate integration 允许您通过 Rollease Acmeda Automate 中心控制和监控遮盖物。该集成直接与本地网络上的中心通信，而不是通过云端或 RS-485 连接。设备以遮盖物的形式进行监控和控制，以及用于监控电池状态的传感器。'
ha_category:
  - Cover
  - Hub
ha_iot_class: Local Push
ha_release: 0.111
ha_config_flow: true
ha_codeowners:
  - '@atmurray'
ha_domain: acmeda
ha_platforms:
  - cover
  - sensor
ha_integration_type: integration
---
# Rollease Acmeda Automate

**Rollease Acmeda Automate** integration 允许您通过 Rollease Acmeda Automate 中心控制和监控遮盖物。该集成直接与本地网络上的中心通信，而不是通过云端或 RS-485 连接。设备以遮盖物的形式进行监控和控制，以及用于监控电池状态的传感器。

## 支持的设备

- Automate Pulse Hub v1


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 多个中心

多个中心可通过发现功能透明工作，因此您无需做任何特殊设置。

## 注意事项

如果中心的 IP 地址发生变化，您需要重新将其注册到 Home Assistant。为避免这种情况，您可以在路由器上为中心设置 DHCP 保留，使其始终具有相同的 IP 地址。

该集成有以下限制：

- 不支持同时具有位置和倾斜功能的遮盖物。
- 该集成不使用在中心配置的房间和场景，请使用 Home Assistant 中的等效功能。