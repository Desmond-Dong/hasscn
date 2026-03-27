---
title: Hypontech Cloud
description: 'Hypontech Cloud 集成允许您通过 Hypontech Cloud(https://www.hypon.cloud) 平台监控 Hypontech 太阳能逆变器系统，并将数据集成到您的 Home Assistant 安装中。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Energy
  - Sensor
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jcisio'
ha_domain: hypontech
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---
# Hypontech Cloud

**Hypontech Cloud** 集成允许您通过 [Hypontech Cloud](https://www.hypon.cloud) 平台监控 Hypontech 太阳能逆变器系统，并将数据集成到您的 Home Assistant 安装中。

## 支持的设备

此集成支持连接到 Hypontech Cloud 平台的所有 Hypontech 逆变器和微型逆变器。

## 前提条件

要使用此集成，您需要：

- 可访问您太阳能逆变器系统的 Hypontech Cloud 账户
- 您的 Hypontech Cloud 用户名和密码


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

要设置集成，您需要以下信息：

```yaml
Username:
  description: "您的 Hypontech Cloud 账户用户名。"
Password:
  description: "您的 Hypontech Cloud 账户密码。"
```

## 支持的功能

### 传感器

该集成为每个位置（例如：阳台、花园、家、办公室）提供一个 **电站** 设备和一个 **概览**（聚合）设备。每个设备都有以下传感器：

- **功率** (W)：太阳能系统的当前发电功率
- **今日发电量** (kWh)：今日总发电量
- **累计发电量** (kWh)：安装以来的总发电量

所有传感器每分钟更新一次。

## 数据更新

该集成每 60 秒从 Hypontech Cloud 轮询一次数据。

## 动作

此集成不提供额外的动作。

## 已知限制

- 该集成目前将您账户中所有逆变器的聚合数据显示为单个"概览"设备。
- 尚不支持单个逆变器数据。

## 移除集成

可以按照以下步骤移除此集成：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.