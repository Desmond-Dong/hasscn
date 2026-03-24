---
title: inexogy
description: 关于如何在 Home Assistant 中集成 inexogy 智能电表的说明。
ha_category:
  - Energy
  - Sensor
ha_release: '2023.7'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@jpbede'
ha_domain: discovergy
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: platinum
---

**inexogy** 集成允许用户将其 [inexogy](https://inexogy.com/) 智能电表集成到 Home Assistant 中。
该集成使用 inexogy 的 [官方 REST API](https://api.inexogy.com/docs/#/)。

该集成在 Home Assistant 中支持以下电表类型：

- [电表](#electricity-meter)
- [燃气表](#gas-meter)

## 前提条件

对于此集成，您需要一个 inexogy 智能电表、一个 [inexogy 账户](https://my.inexogy.com/) 和您的凭据。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
```yaml
"Email address":
  description: "用于将 Home Assistant 连接到您的 inexogy 账户的电子邮件地址"
Password:
  description: "用于将 Home Assistant 连接到 inexogy 的账户密码"
```

## 电表

为当前有功功率用电量和历史总消耗量添加传感器实体。
默认情况下，各相特定电流有功功率用电量的传感器被禁用，但可以在实体设置中启用。

如果您有用于消耗和发电的双向电表，也会添加历史总发电量。

## 燃气表

为总燃气消耗量添加传感器实体。

## 提供的传感器

根据您的电表类型，不同的传感器可用：

### 电力 - 主要传感器
- `sensor.electricity_<street>_<number>_total_power`：当前功率消耗（瓦特）
- `sensor.electricity_<street>_<number>_total_consumption`：总能量消耗（kWh）
- `sensor.electricity_<street>_<number>_total_production`：总能量发电（kWh）（仅限双向电表）

### 电力 - 可选传感器（默认禁用）
- `sensor.electricity_<street>_<number>_phase_1_power`：相位 1 功率消耗（瓦特）
- `sensor.electricity_<street>_<number>_phase_2_power`：相位 2 功率消耗（瓦特）
- `sensor.electricity_<street>_<number>_phase_3_power`：相位 3 功率消耗（瓦特）
- `sensor.electricity_<street>_<number>_phase_1_voltage`：相位 1 电压（伏特）
- `sensor.electricity_<street>_<number>_phase_2_voltage`：相位 2 电压（伏特）
- `sensor.electricity_<street>_<number>_phase_3_voltage`：相位 3 电压（伏特）

### 燃气
- `sensor.gas_<street>_<number>_total_gas_consumption`：总燃气消耗（立方米）

## 数据更新

传感器每 30 秒更新一次。这会从 inexogy API 拉取最新可用数据。
请注意，这并不意味着电表数据本身每 30 秒都是新的。您的电表向 inexogy 发送新数据的频率取决于您的电表型号和测量概念。

## 用例和示例

### 能源仪表板

此集成提供的总消耗和发电传感器与 [Home Assistant 能源仪表板](/home-assistant/docs/energy/)完全兼容。

- `sensor.electricity_example_street_11_total_consumption`（总消耗）可以添加到"电网消耗"字段。
- `sensor.electricity_example_street_11_total_production`（总发电）可以添加到"返送到电网"字段。

### 自动化

您可以使用当前功率传感器（`sensor.electricity_example_street_11_total_power`）根据您的用电量触发自动化。

示例：当功率消耗在 5 分钟内超过 3000&nbsp;W 时发送通知。


```yaml
automation:
  - alias: 检测到高功率消耗
    trigger:
      - platform: numeric_state
        entity_id: sensor.electricity_example_street_11_total_power
        above: 3000
        for:
          minutes: 5
    actions:
      - action: notify.mobile_app_your_device
        data:
          message: "检测到高功率消耗：{{ states('sensor.electricity_example_street_11_total_power') }} W"
```


示例：当光伏发电不足时关闭高功率设备（适用于双向电表）。


```yaml
automation:
  - alias: 基于 PV 输出的消耗控制
    trigger:
      - platform: state
        entity_id: sensor.electricity_example_street_11_total_power
    condition:
      - condition: numeric_state
        entity_id: sensor.electricity_example_street_11_total_power
        above: 0  # 正值表示电网消耗
    actions:
      - action: switch.turn_off
        target:
          entity_id: switch.high_power_device
```


## 故障排除

### 无数据或传感器数据过时

如果您的传感器没有显示数据或数值过时，请检查以下内容：

1. **inexogy 门户**：登录 [inexogy 网络门户](https://my.inexogy.com/)并检查它是否显示来自您电表的当前数据。如果没有，可能是您的电表或与 inexogy 的连接存在问题。

2. **Home Assistant 日志**：检查 Home Assistant 日志中与 `inexogy` 集成相关的错误消息。身份验证错误（`Authentication failed`）意味着您的电子邮件地址或密码不正确。

3. **API 速率限制**：inexogy API 有速率限制。虽然该集成设计为在这些限制内运行，但频繁的 Home Assistant 重启或其他使用 API 的工具可能会导致临时阻止。

### 传感器缺失

- **发电传感器**：电力发电传感器仅适用于双向电表。如果您有这样的电表但看不到它，请在 inexogy 门户中检查您的数据。
- **相位传感器**：每相功率和电压传感器默认禁用，并非所有电表都可用。您可以在集成页面的"实体"下启用它们。

### 网络问题

如果您看到连接错误，请确保 Home Assistant 有稳定的互联网连接。该集成需要通过 HTTPS（端口 443）访问 `api.inexogy.com`。

## 移除集成

此集成遵循标准集成移除流程。不需要额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.