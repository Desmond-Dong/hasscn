---
title: Lektrico Charging Station
description: 关于如何将 Lektrico 充电站与 Home Assistant 集成的说明。
ha_category:
  - Sensor
ha_release: '2024.10'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@lektrico'
ha_domain: lektrico
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - number
  - select
  - sensor
  - switch
ha_integration_type: device
---

**Lektrico Charging Station** 集成可将您的 [Lektrico Charging Station](https://lektri.co) 接入 Home Assistant，并让您对其进行监控。

Lektrico Charging Station 设备会作为传感器添加到 Home Assistant 中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 二进制传感器

库中可用的二进制传感器：

### 充电器

| 条件 | 说明 |
| :---------------- | :----------------------------------- |
| state_e_activated | 电动车错误 |
| overtemp          | 温度过高 |
| critical_temp     | 临界高温 |
| overcurrent       | 过流 |
| meter_fault       | 电表故障 |
| undervoltage      | 欠压 |
| overvoltage       | 过压 |
| rcd_error         | <abbr title="residual current device">RCD</abbr> 错误 |
| cp_diode_failure  | 电动车通信错误 |
| contactor_failure | 接触器故障 |

## 传感器

库中可用的传感器：

### 单相充电器

| 条件 | 单位 | 说明 |
| :------------------ | :--- | :-------------------------------------------------------- |
| state               |      | 充电器状态。 |
| charging_time       | s    | 表示当前充电会话时长。 |
| power               | kW   | 当前瞬时功率。 |
| energy              | kWh  | 当前充电会话的总充电量。 |
| temperature         | °C   | 电路板温度。 |
| lifetime_energy     | kWh  | 自安装以来的总充电量。 |
| installation_current| A    | 由软件限制的电流值 [A]。 |
| limit_reason        |      | 电流限制原因。 |
| voltage             | V    | 测量电压。 |
| current             | A    | 测量电流。 |

### 三相充电器

| 条件 | 单位 | 说明 |
| :------------------ | :--- | :-------------------------------------------------------- |
| state               |      | 充电器状态。 |
| charging_time       | s    | 表示当前充电会话时长。 |
| power               | kW   | 当前瞬时功率。 |
| energy              | kWh  | 当前充电会话的总充电量。 |
| temperature         | °C   | 电路板温度。 |
| lifetime_energy     | kWh  | 自安装以来的总充电量。 |
| installation_current| A    | 由软件限制的电流值 [A]。 |
| limit_reason        |      | 电流限制原因。 |
| voltage_l1          | V    | L1 相测量电压。 |
| voltage_l2          | V    | L2 相测量电压。 |
| voltage_l3          | V    | L3 相测量电压。 |
| current_l1          | A    | L1 相测量电流。 |
| current_l2          | A    | L2 相测量电流。 |
| current_l3          | A    | L3 相测量电流。 |

### 单相电表

| 条件 | 单位 | 说明 |
| :------------------ | :--- | :-------------------------------------------------------- |
| breaker_current     | A    | 主断路器电流。 |
| power               | kW   | 测得有功功率。 |
| pf                  |      | 功率因数。 |

### 三相电表

| 条件 | 单位 | 说明 |
| :------------------ | :--- | :-------------------------------------------------------- |
| breaker_current     | A    | 主断路器电流。 |
| power_l1            | kW   | L1 相测得有功功率。 |
| power_l2            | kW   | L2 相测得有功功率。 |
| power_l3            | kW   | L3 相测得有功功率。 |
| pf_l1               |      | L1 相功率因数。 |
| pf_l2               |      | L2 相功率因数。 |
| pf_l3               |      | L3 相功率因数。 |

## 按钮

库中可用的按钮：

### 充电器

| 按钮 | 说明 |
| :------------------------- | :--------------------------------- |
| charge_start               | 命令充电器开始充电。 |
| charge_stop                | 命令充电器停止充电。 |
| charging_schedule_override | 命令充电器在下一次充电会话中覆盖充电计划。 |
| reboot                     | 重启充电器。 |

### 电表

| 按钮 | 说明 |
| :------------------ | :--------------------------------- |
| reboot              | 重启电表。 |

## 数值

库中可用的数值实体：

### 充电器

| 数值 | 单位 | 范围 | 说明 |
| :----------------- | :--- | :------ | :---------------------------------------- |
| led_max_brightness | %    | 0 - 100 | 设置充电器 LED 亮度。 |
| dynamic_limit      | A    | 0 - 32  | 设置允许的最大充电电流。 |

## 选择项

库中可用的选择项：

### 电表

| 选择项 | 说明 |
| :------------------ | :-------------------------------------- |
| lb_mode             | 选择电表的负载均衡模式。可选项为 **Disabled**、**Power**、**Hybrid** 和 **Green**。 |

## 开关

库中可用的开关：

### 单相充电器

| 开关 | 说明 |
| :------------------ | :-------------------------------------- |
| authentication      | 允许选择充电器是自动开始充电，还是需要认证后才能充电。 |
| lock                | 允许选择充电器是否锁定。充电器锁定后将无法充电。 |

### 三相充电器

| 开关 | 说明 |
| :------------------ | :-------------------------------------- |
| authentication      | 允许选择充电器是自动开始充电，还是需要认证后才能充电。 |
| lock                | 允许选择充电器是否锁定。充电器锁定后将无法充电。 |
| force_single_phase  | 允许将三相充电器切换为单相模式或三相模式。 |
