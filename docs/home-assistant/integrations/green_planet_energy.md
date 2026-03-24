---
title: Green Planet Energy
description: 关于如何将 Green Planet Energy 动态电价集成到 Home Assistant 的说明。
ha_category:
  - Energy
  - Sensor
ha_release: 2026.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@petschni'
ha_domain: green_planet_energy
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

**Green Planet Energy** 集成提供来自德国可再生能源供应商 Green Planet Energy 的实时电价数据。它会获取每小时电价，并提供多种用于能源优化和监控的传感器。它还会将价格可视化，方便您调整用电习惯并将用电转移到更便宜的时段。

## 前提条件

您无需拥有 Green Planet Energy 账户即可使用此集成。不过，只有当您是其动态电价套餐客户时，此集成通常才更有意义。设置时不需要额外信息。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

**Green Planet Energy** 集成提供以下传感器。

### 当前价格

- **Current price**：当前电价，单位为 EUR/kWh

### 统计

- **Highest price today**：当天的最高电价
- **Lowest price day**：白天时段（6:00-18:00）的最低电价
- **Lowest price night**：夜间时段（18:00-6:00）的最低电价

## 删除集成

此集成遵循标准的集成删除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 免责声明

此插件由第三方提供，并非 Green Planet Energy eG 官方提供。
