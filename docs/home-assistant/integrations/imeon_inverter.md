---
title: Imeon Inverter
description: 'Imeon Inverter 集成会在 Home Assistant 中轮询 Imeon(https://imeon-energy.com/) 太阳能逆变器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 2025.5
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Imeon-Energy'
ha_domain: imeon_inverter
related:
  - url: https://imeon-energy.com/
  - title: Imeon Energy website
ha_integration_type: device
ha_quality_scale: bronze
ha_platforms:
  - select
  - sensor
ha_ssdp: true
---
# Imeon Inverter

**Imeon Inverter** 集成会在 Home Assistant 中轮询 [Imeon](https://imeon-energy.com/) 太阳能逆变器。

## 先决条件

- Imeon 逆变器必须已连接到本地网络。
- [OS One](https://imeon-energy.com/os-one/) 版本必须为 **1.8.1.4** 或更高。
- 必须在 Imeon 逆变器的 OS One 面板中启用 *ModuleAPI* 应用。
   - 要执行此操作，请进入 **OS One** > **Applications**，将鼠标悬停在 *ModuleAPI* 上，然后选择 **Activate**。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

本文档概述了 Imeon Inverter 集成中可用的传感器，并说明它们的功能、单位和用途。

### Battery sensors

| Sensor key         | Description                                      | Unit |
| ------------------ | ------------------------------------------------ | ---- |
| `battery_power`    | Power currently used or supplied by the battery. | W    |
| `battery_soc`      | State of charge of the battery.                  | %    |
| `battery_status`   | Current status of the battery.                   | —    |
| `battery_stored`   | Power stored in the battery.                     | W    |
| `battery_consumed` | Power consumed from the battery.                 | W    |

### Grid sensors

| Sensor key        | Description                   | Unit |
| ----------------- | ----------------------------- | ---- |
| `grid_current_l1` | Current on grid line 1.       | A    |
| `grid_current_l2` | Current on grid line 2.       | A    |
| `grid_current_l3` | Current on grid line 3.       | A    |
| `grid_frequency`  | Frequency of the grid supply. | Hz   |
| `grid_voltage_l1` | Voltage on grid line 1.       | V    |
| `grid_voltage_l2` | Voltage on grid line 2.       | V    |
| `grid_voltage_l3` | Voltage on grid line 3.       | V    |

### AC input sensors

| Sensor key          | Description            | Unit |
| ------------------- | ---------------------- | ---- |
| `input_power_l1`    | Power input on line 1. | W    |
| `input_power_l2`    | Power input on line 2. | W    |
| `input_power_l3`    | Power input on line 3. | W    |
| `input_power_total` | Total power input.     | W    |

### Inverter settings sensors

| Sensor key                        | Description                           | Unit |
| --------------------------------- | ------------------------------------- | ---- |
| `inverter_charging_current_limit` | Charging current limit of inverter.   | A    |
| `inverter_injection_power_limit`  | Power injection limit of inverter.    | W    |
| `manager_inverter_state`          | Current state of the inverter (enum). | —    |

### Inverter setting select

| Select key              | Description                                   | Unit |
| ----------------------- | --------------------------------------------- | ---- |
| `manager_inverter_mode` | View or change the inverter operating mode.   | —    |

### Meter sensors

| Sensor key    | Description                      | Unit |
| ------------- | -------------------------------- | ---- |
| `meter_power` | Current measured power by meter. | W    |

### AC output sensors

| Sensor key           | Description               | Unit |
| -------------------- | ------------------------- | ---- |
| `output_current_l1`  | Output current on line 1. | A    |
| `output_current_l2`  | Output current on line 2. | A    |
| `output_current_l3`  | Output current on line 3. | A    |
| `output_frequency`   | Frequency of the output.  | Hz   |
| `output_power_l1`    | Output power on line 1.   | W    |
| `output_power_l2`    | Output power on line 2.   | W    |
| `output_power_l3`    | Output power on line 3.   | W    |
| `output_power_total` | Total output power.       | W    |
| `output_voltage_l1`  | Output voltage on line 1. | V    |
| `output_voltage_l2`  | Output voltage on line 2. | V    |
| `output_voltage_l3`  | Output voltage on line 3. | V    |

### Solar panel sensors

| Sensor key       | Description                     | Unit |
| ---------------- | ------------------------------- | ---- |
| `pv_consumed`    | Power from PV consumed locally. | W    |
| `pv_injected`    | Power from PV injected to grid. | W    |
| `pv_power_1`     | Power from PV string 1.         | W    |
| `pv_power_2`     | Power from PV string 2.         | W    |
| `pv_power_total` | Total PV power production.      | W    |

### Temperature sensors

| Sensor key                   | Description                        | Unit |
| ---------------------------- | ---------------------------------- | ---- |
| `temp_air_temperature`       | Ambient air temperature.           | °C   |
| `temp_component_temperature` | Temperature of inverter component. | °C   |

### Monitoring sensors (last 24 hours)

| Sensor key                    | Description                  | Unit |
| ----------------------------- | ---------------------------- | ---- |
| `monitoring_self_produced`    | Power self-produced.         | W    |
| `monitoring_self_consumption` | Self-consumption percentage. | %    |
| `monitoring_self_sufficiency` | Self-sufficiency percentage. | %    |

### Monitoring sensors (instant minute data)

| Sensor key                               | Description                  | Unit |
| ---------------------------------------- | ---------------------------- | ---- |
| `monitoring_minute_building_consumption` | Building power consumption.  | W    |
| `monitoring_minute_grid_consumption`     | Grid power consumption.      | W    |
| `monitoring_minute_grid_injection`       | Power injected to grid.      | W    |
| `monitoring_minute_grid_power_flow`      | Net power flow to/from grid. | W    |
| `monitoring_minute_solar_production`     | Solar production power.      | W    |

### Timeline sensor

| Sensor key          | Description              | Unit |
| ------------------- | ------------------------ | ---- |
| `timeline_type_msg` | Current timeline status. | —    |

### Daily energy counters (made for the Home Assistant energy panel)

| Sensor key                    | Description                         | Unit |
| ----------------------------- | ----------------------------------- | ---- |
| `energy_pv`                   | Energy produced by PV today.        | Wh   |
| `energy_grid_injected`        | Energy injected to grid today.      | Wh   |
| `energy_grid_consumed`        | Energy consumed from grid today.    | Wh   |
| `energy_building_consumption` | Energy building consumption today.  | Wh   |
| `energy_battery_stored`       | Energy stored in battery today.     | Wh   |
| `energy_battery_consumed`     | Energy consumed from battery today. | Wh   |

### Forecast

| Sensor key                      | Description                                             | Unit |
| ------------------------------- | ------------------------------------------------------- | ---- |
| `forecast_cons_remaining_today` | Forecast of the remaining energy consumption for today. | Wh   |
| `forecast_prod_remaining_today` | Forecast of the remaining energy production for today.  | Wh   |

## 故障排除

### 什么是我的域名？

域名是 Home Assistant 为您的逆变器分配的内部名称。它基于您最初为设备设置的名称，但会进行格式化处理，以避免内部问题。

- 例如，名称 `Imeon Inverter number 57` 会生成域名 `imeon_inverter_number_57`。
- 如果您仍然找不到该域名，请检查该设备下实体的内部名称。每个变量名称的格式都是 `DOMAIN_variable-name`，例如 `neo_110_inverter_software_version` 表示域名是 `neo_110`。

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
