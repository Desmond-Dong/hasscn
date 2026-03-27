---
title: SimpleFin
description: 'SimpleFIN(http://simplefin.org) 允许用户共享只读财务数据。这是一项付费服务，但价格相当便宜（每月 1.50 美元）。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Finance
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2024.8
ha_codeowners:
  - '@scottg489'
  - '@jeeftor'
ha_domain: simplefin
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: service
---
# SimpleFin

[SimpleFIN](http://simplefin.org) 允许用户共享只读财务数据。这是一项付费服务，但价格相当便宜（每月 1.50 美元）。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::


## 设置指南

在 SimpleFIN 界面中，您可以创建 **Claim Token**，这是一种一次性令牌，可兑换为 **Access URL**。配置此集成时，您可以填写 **Claim Token** 或 **Access URL** 中的任意一种。

### 账户与设备

每个 `account` 都会在 Home Assistant 中设置为一个设备，并包含以下传感器：

|Sensor|Description|
|-------|---------------|
|Age| 显示 SimpleFin API 获取数据的时间 |
|Balance|账户余额|
|Problem| 指示账户同步是否可能存在问题的二进制传感器 |
