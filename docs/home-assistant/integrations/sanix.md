---
title: Sanix
description: 'Sanix 集成可让您从 BIT Complex(https://bitcomplex.pl/) 生产的 Sanix 设备获取水位/污水液位传感器测量值。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Switch
ha_release: 2024.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@tomaszsluszniak'
ha_domain: sanix
ha_platforms:
  - sensor
ha_integration_type: device
---
# Sanix

**Sanix** 集成可让您从 [BIT Complex](https://bitcomplex.pl/) 生产的 Sanix 设备获取水位/污水液位传感器测量值。

## 前提条件

要设置此集成，请前往 [Sanix 控制台](https://sanix.bitcomplex.pl) 并登录您的账户。

并非任何人都能通过 API 获取您的数据。您需要使用 API 令牌进行身份验证。要获取 API 令牌，请在 [Sanix 控制台](https://sanix.bitcomplex.pl) 中进入 **Help** 页面，并在 **System version** 下复制您的 API 令牌。您需要在 Home Assistant 的设置过程中用到它。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 硬件支持

- Sanix S M25（固件版本 <b>3.10</b>）。
