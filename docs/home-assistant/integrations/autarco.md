---
title: Autarco
description: 'Autarco 集成允许您从 Autarco(https://www.autarco.com) 的云 API 收集数据并在 Home Assistant 中使用。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Energy
  - Sensor
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: autarco
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: hub
ha_quality_scale: silver
---
# Autarco

**Autarco** 集成允许您从 [Autarco](https://www.autarco.com) 的云 API 收集数据并在 Home Assistant 中使用。

Autarco 是一家荷兰公司，提供太阳能电池板、逆变器和电池。他们拥有自己的云平台，您可以在其中监控系统的性能。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 配置参数

```yaml
Email:
  description: 您 Autarco 账户的电子邮件地址。
Password:
  description: 您 Autarco 账户的密码。
```

## 数据更新

集成将每 5 分钟轮询 Autarco 来更新其信息。这确保 Home Assistant 中的数据是最新的。

## 动作

此集成不提供额外的动作。

## 支持的功能

Autarco 平台主要提供可在您的[能源仪表板](/home-assistant/energy)中使用的传感器。

### 太阳能

了解您的站点产生多少太阳能。

- 功率输出 (W)
- 今日发电量 (kWh)
- 本月发电量 (kWh)
- 总发电量 (kWh)

### 逆变器

了解逆变器产生多少能量。集成将为链接到您账户的每个逆变器创建一个设备。

- AC 输出功率 (W)
- AC 输出总能量 (kWh)

### 电池

如果您的系统连接了电池，您可以监控电池状态并查看它充电或放电的能量。

- 功率流向 (W) - 正值表示充电，负值表示放电
- 电量状态 (%)
- 今日放电能量 (kWh)
- 本月放电能量 (kWh)
- 总放电能量 (kWh)
- 今日充电能量 (kWh)
- 本月充电能量 (kWh)
- 总充电能量 (kWh)

## 已知限制

集成不显示关于您的自给自足或 CO2 节省的数据。

## 故障排除

此集成没有常见问题。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.