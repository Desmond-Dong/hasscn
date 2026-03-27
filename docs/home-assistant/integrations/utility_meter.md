---
title: Utility Meter
description: 'Utility Meter 集成可用于跟踪各种公共事业消耗（如电、燃气、水、供暖）。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Helper
  - Sensor
ha_release: 0.87
ha_iot_class: Local Push
ha_quality_scale: internal
ha_config_flow: true
ha_codeowners:
  - '@dgomes'
ha_domain: utility_meter
ha_platforms:
  - diagnostics
  - select
  - sensor
ha_integration_type: helper
---
# Utility Meter

**Utility Meter** 集成可用于跟踪各种公共事业消耗（如电、燃气、水、供暖）。

从使用角度看，公用事业计量通常按周期（一般为每月）运行以用于计费。该传感器会跟踪来源传感器的值，并按配置周期自动重置计量值。每次重置时，会在属性中保存上一个计量值，便于比较（例如“这个月花费比上个月多还是少？”）或估算账单（例如通过模板传感器将计量值乘以单价）。

一些服务商会根据时间、资源可用性等提供不同费率。Utility Meter 允许你定义多个费率并分别统计用量。定义费率后，会新增一个实体显示当前费率。要切换费率，需要执行一个动作，通常通过自动化完成，触发条件可以是时间或其他外部来源（例如 REST 传感器）。

:::note
此集成创建的传感器是持久化的，因此 Home Assistant 重启后数值会保留。每个传感器的第一个周期都不完整；按日统计的传感器会在启用集成后的第二天开始准确。按月统计的传感器会在添加到 Home Assistant 后下个月 1 日开始提供准确数据。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
```yaml
Name:
  description: 传感器名称。之后可再次修改。
Input sensor:
  description: 提供公用事业读数（电、水、燃气、供暖）的传感器实体。
Meter reset cycle:
  description: >
    计数器重置频率。如果提供的重置周期不符合你的场景，
    可考虑使用下方 YAML 配置，支持创建 CRON 风格模式。
Meter reset offset:
  description: >
    周期重置发生在每个周期开始时。此选项可按天偏移
    这些开始时间。如果你需要更细粒度偏移，
    可考虑使用下方 YAML 配置。
Supported tariffs:
  description: >
    支持的费率列表。若只需单一费率可留空。
Net consumption:
  description: >
    若希望将来源视为净计量器，请启用。
    启用后计数器可为正值或负值。
Delta values:
  description: >
    若来源值表示自上次读取以来的增量而非绝对值，请启用。
    启用后，收到的新值会原样加入 utility meter，
    而不是计算新旧值的_差值_后再累加。
Periodically resetting:
  description: >
    如果来源传感器状态预期会重置为 0（例如开机就重置的智能插座），请启用。
    若禁用（例如来源传感器是设备生命周期内从不重置的家庭公用事业计量器），
    utility meter 会累加新值与上一个有效值之间的_差值_，
    这可避免来源传感器短暂不可用后恢复时丢失读数。
Sensor always available:
  description: >
    启用后，即使来源实体不可用或未知，传感器也始终可用并显示最后一次累计值。
    你需要了解：当来源实体不可用时，utility meter 传感器会保持最后累计值，
    直到来源实体恢复为有效状态才会继续更新。
```

如果重置周期和重置偏移对你的场景限制较大，
可使用下方 YAML 配置。它支持 CRON 风格模式，
可提供更高灵活性。

## YAML 配置

你也可以改用 YAML 手动配置此集成。要在系统中启用 Utility Meter 传感器，
请将以下内容添加到 `configuration.yaml` 文件：

```yaml
# Example configuration.yaml entry
utility_meter:
  energy:
    source: sensor.energy_in_kwh
    cycle: monthly
```

```yaml
source:
  description: 提供公用事业读数（电、水、燃气、供暖）的传感器实体 ID。
  required: true
  type: string
name:
  description: GUI 中显示的友好名称。
  required: false
  type: string
unique_id:
    description: 唯一标识 utility_meter 的 ID。设置唯一值后可在 UI 中自定义。
    required: false
    type: string
cycle:
  description: 重置计数器的频率。可选值为 `quarter-hourly`、`hourly`、`daily`、`weekly`、`monthly`、`bimonthly`、`quarterly` 和 `yearly`。`bimonthly` 表示每两个月重置一次。
  required: false
  type: string
offset:
  description: "周期重置发生在每个周期开始时（0 分钟、0:00、周一、每月 1 日、1 月）。此选项允许偏移这些开始时间。支持格式：`offset: 'HH:MM:SS'`、`offset: 'HH:MM'` 和时间段字典（见下方示例）。"
  required: false
  default: 0
  type: time
  type: integer
cron:
  description: 该选项与 `cycle` 和 `offset` *互斥*。它提供高级方式定义计数器何时重置。语法基于常见的 [crontab 语法](https://crontab.guru)，并扩展支持更高级调度。详见 [croniter](https://github.com/kiorky/croniter) 库。
  required: true
  type: string
delta_values:
  description: 若来源值是自上次读取以来的增量而非绝对值，请设为 True。启用后，收到的新值会原样加入 utility meter，而不是累加新旧值的_差值_。例如来源传感器返回 "1"、"0.5"、"0.75" 时应启用；若返回 "1"、"1.5"、"2.25" 则不应启用。
  required: false
  default: false
  type: boolean
net_consumption:
  description: 如果希望将来源视为净计量器，请设为 True。启用后计数器可为正值或负值。
  required: false
  default: false
  type: boolean
tariffs:
  description: utility meter 支持的费率列表。
  required: false
  default: []
  type: list
periodically_resetting:
  description: 如果来源传感器状态预期会重置为 0（例如开机就重置的智能插座），请启用。若禁用（例如来源传感器是设备生命周期内从不重置的家庭公用事业计量器），utility meter 会累加新值与上一个有效值的_差值_，避免来源传感器从不可用恢复后丢失读数。
  required: false
  default: true
  type: boolean
always_available:
  description: 启用后，即使来源实体不可用或未知，传感器也始终可用并显示最后一次累计值。
  required: false
  default: false
  type: boolean
```

:::important
使用 `offset` 配置参数时，定义的周期不得超过 28 天。

:::
### 时间段字典示例

```yaml
offset:
  # At least one of these must be specified:
  days: 1
  hours: 0
  minutes: 0
```

## 动作

部分动作仅在已配置费率时可用。

### 动作：Reset

`utility_meter.reset` 动作会重置 Utility Meter。所有按费率跟踪的传感器都会被重置为 0。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | 指向 utility_meter 的 `entity_id` 字符串或字符串列表。

### 动作：Calibrate

`utility_meter.calibrate` 动作用于校准 Utility Meter，通过修改指定传感器的值实现。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | 指向 utility_meter 的 `entity_id` 字符串或字符串列表。
| `value` | no | Number | 用于校准传感器的值 |

## 高级配置

以下配置示例中，2 个 utility_meter（`daily_energy` 和 `monthly_energy`）分别跟踪每日和每月能耗。

两者都跟踪同一个持续更新能耗的传感器（`sensor.energy`）。

将创建 4 个不同传感器：每个 utility meter 对应 2 个费率传感器。
会自动创建 `sensor.daily_energy_peak`、`sensor.daily_energy_offpeak`、`sensor.monthly_energy_peak` 和 `sensor.monthly_energy_offpeak`，用于在给定周期内跟踪各费率下的消耗。

`select.daily_energy` 和 `select.monthly_energy` 这两个选择实体会跟踪当前费率，并允许切换费率。

```yaml
utility_meter:
  daily_energy:
    source: sensor.energy
    name: Daily Energy
    cycle: daily
    tariffs:
      - peak
      - offpeak
  monthly_energy:
    source: sensor.energy
    name: Monthly Energy
    cycle: monthly
    tariffs:
      - peak
      - offpeak
```

假设你的电力供应商费率按时间划分如下：

- *peak*：9:00 到 21:00
- *offpeak*：21:00 到次日 9:00

可以使用基于时间的自动化：


```yaml
automation:
  triggers:
    - trigger: time
      at: "09:00:00"
      variables:
        tariff: "peak"
    - trigger: time
      at: "21:00:00"
      variables:
        tariff: "offpeak"
  actions:
    - action: select.select_option
      target:
        entity_id: select.daily_energy
      data:
        option: "{{ tariff }}"
    - action: select.select_option
      target:
        entity_id: select.monthly_energy
      data:
        option: "{{ tariff }}"
```


假设你的服务商计费周期是“每月最后一天偏移”：

- 每月最后一天 17:00 切换周期

可以使用基于 cron（扩展语法支持“每月最后一天”）的 utility meter：

```yaml
utility_meter:
  monthly_energy:
    source: sensor.energy
    name: Monthly Energy
    cron: "0 17 L * *"
```

## 面向 DSMR 用户的高级配置

当你使用 [DSMR 集成](/home-assistant/integrations/dsmr) 获取公用事业计量数据时，每个费率（高峰和低谷）都有独立传感器，燃气消耗也有独立传感器。计量器会自动切换费率，因此通常不需要自动化。但在这种情况下，你需要额外配置多个 `utility_meter` 实例。

如果你想为每个费率创建每日和每月传感器，需要分别跟踪以下传感器：

- `sensor.energy_consumption_tarif_1`：费率 1 用电（例如低谷）
- `sensor.energy_consumption_tarif_2`：费率 2 用电（例如高峰）
- `sensor.gas_consumption`：燃气消耗

因此，要跟踪每个传感器的每日与每月用量，需要在 `utility_meter` 下配置 6 个条目。

```yaml
utility_meter:
  daily_energy_offpeak:
    source: sensor.energy_consumption_tarif_1
    name: Daily Energy (Offpeak)
    cycle: daily
  daily_energy_peak:
    source: sensor.energy_consumption_tarif_2
    name: Daily Energy (Peak)
    cycle: daily
  daily_gas:
    source: sensor.gas_consumption
    name: Daily Gas
    cycle: daily
  monthly_energy_offpeak:
    source: sensor.energy_consumption_tarif_1
    name: Monthly Energy (Offpeak)
    cycle: monthly
  monthly_energy_peak:
    source: sensor.energy_consumption_tarif_2
    name: Monthly Energy (Peak)
    cycle: monthly
  monthly_gas:
    source: sensor.gas_consumption
    name: Monthly Gas
    cycle: monthly
```

此外，你还可以添加模板传感器来计算每日与每月总用量。请注意，在以下示例中，
我们使用 `is_number()` [函数](/home-assistant/docs/configuration/templating/#numeric-functions-and-filters)
验证传感器返回值是否为数值。若结果为 false，则返回 `None`。


```yaml
template:
  - sensor:
    - name: 'Daily Energy Total'
      device_class: energy
      unit_of_measurement: kWh
      state: >
        {% if is_number(states('sensor.daily_energy_offpeak')) and is_number(states('sensor.daily_energy_peak')) %}
          {{ states('sensor.daily_energy_offpeak') | float + states('sensor.daily_energy_peak') | float }}
        {% else %}
          None
        {% endif %}

    - name: 'Monthly Energy Total'
      device_class: energy
      unit_of_measurement: kWh
      state: >
        {% if is_number(states('sensor.monthly_energy_offpeak')) and is_number(states('sensor.monthly_energy_peak')) %}
          {{ states('sensor.monthly_energy_offpeak') | float + states('sensor.monthly_energy_peak') | float }}
        {% else %}
          None
        {% endif %}
```


