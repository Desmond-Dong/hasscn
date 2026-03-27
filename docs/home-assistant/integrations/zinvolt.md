---
title: Zinvolt
description: 'Zinvolt 集成可让您在 Home Assistant 中监控 Zinvolt(https://zinvolt.com/) 电池。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Energy
  - Binary Sensor
  - Sensor
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: zinvolt
ha_platforms:
  - binary_sensor
  - number
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---
# Zinvolt

**Zinvolt** 集成可让您在 Home Assistant 中监控 [Zinvolt](https://zinvolt.com/) 电池。

## 前提条件

- 已迁移的 Zinvolt 账户


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Email:
    description: "您的 Zinvolt 账户邮箱"
Password:
    description: "您的 Zinvolt 账户密码"
```

## 支持的功能

### 实体

**Zinvolt** 集成提供以下实体。

#### 二进制传感器

- **Connected to grid**：电池是否已连接到电网。

#### 数值实体

- **Minimum charge level**：电池的最低充电百分比。
- **Maximum charge level**：电池的最高充电百分比。
- **Standby time**：电池在自动关闭前保持不活动状态的分钟数。
- **Maximum output**：电池的最大输出功率，单位为瓦。

#### 传感器

- **State of charge**：电池当前的电量百分比。

## 数据更新

此集成每 5 分钟对 Zinvolt 服务器进行一次 polls，以更新传感器数据。

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
