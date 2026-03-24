---
title: Climate
description: 关于如何在 Home Assistant 中设置气候控制设备的说明。
ha_category:
  - Climate
ha_release: 0.19
ha_quality_scale: internal
ha_domain: climate
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

**Climate** 集成允许您控制和监控 HVAC（供暖、通风和空调）设备及恒温器。

:::note Building block integration
This climate is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this climate building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the climate building block offers.
:::

## HVAC 实体的状态

HVAC 实体可以有以下状态，具体取决于特定的气候设备及其功能。

- **Off**：设备已关闭。
- **Heat**：设备设置为加热到目标温度。
- **Cool**：设备设置为制冷到目标温度。
- **Heat/Cool**：设备设置为加热/制冷到目标温度范围。
- **Auto**：设备设置为计划、学习行为或 AI 模式。
- **Dry**：设备设置为除湿/湿度模式。
- **Fan only**：设备仅开启风扇。不进行加热或制冷。
- **Unavailable**：实体当前不可用。
- **Unknown**：状态尚不清楚。

## 动作

### 气候控制动作

可用动作：`climate.set_aux_heat`、`climate.set_preset_mode`、`climate.set_temperature`、`climate.set_humidity`、`climate.set_fan_mode`、`climate.set_hvac_mode`、`climate.set_swing_mode`、`climate.set_swing_horizontal_mode`、`climate.turn_on`、`climate.turn_off`、`climate.toggle`

:::tip
并非所有气候动作都适用于您的平台。您可以在 [**设置** > **开发者工具** > **动作**](https://my.home-assistant.io/redirect/developer_call_service/) 下查看可用的气候动作。

:::
### 动作：设置辅助加热

`climate.set_aux_heat` 动作允许您打开/关闭气候设备的辅助加热器。

| 数据属性 | 必需 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。
| `aux_heat` | 是 | 辅助加热器的新值。

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_aux_heat
      target:
        entity_id: climate.kitchen
      data:
        aux_heat: true
```

### 动作：设置预设模式

`climate.set_preset_mode` 动作允许您设置气候设备的预设模式。离开模式将目标温度永久更改为反映气候设备设置为节能状态的温度。例如，这可用于模拟"度假模式"。

| 数据属性 | 必需 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。
| `preset_mode` | 是 | 预设模式的新值。

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_preset_mode
      target:
        entity_id: climate.kitchen
      data:
        preset_mode: "eco"
```

### 动作：设置温度

`climate.set_temperature` 动作允许您设置气候设备的目标温度。

| 数据属性 | 必需 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。
| `temperature` | 否 | 气候设备的新目标温度（通常称为*设定点*）。如果 `hvac_mode` 是 `heat_cool` 则不要使用。
| `target_temp_high` | 否 | 气候设备允许的最高温度。如果 `hvac_mode` 是 `heat_cool` 则必需。必须与 `target_temp_low` 一起使用。
| `target_temp_low` | 否 | 气候设备允许的最低温度。如果 `hvac_mode` 是 `heat_cool` 则必需。必须与 `target_temp_high` 一起使用。
| `hvac_mode` | 否 | 要将气候设备设置为的 HVAC 模式。如果未设置或设置错误，则默认为当前 HVAC 模式。

#### 自动化示例

```yaml
### 在加热模式下将温度设置为 24
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.kitchen
      data:
        temperature: 24
        hvac_mode: heat
```

```yaml
### 在 heat_cool 模式下将温度范围设置为 20 到 24
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.kitchen
      data:
        target_temp_high: 24
        target_temp_low: 20
        hvac_mode: heat_cool
```

### 动作：设置湿度

`climate.set_humidity` 动作允许您设置气候设备的目标湿度。

| 数据属性 | 必需 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。
| `humidity` | 是 | 气候设备的新目标湿度

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_humidity
      target:
        entity_id: climate.kitchen
      data:
        humidity: 60
```

### 动作：设置风扇模式

`climate.set_fan_mode` 动作允许您设置气候设备的风扇操作。

| 数据属性 | 必需 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。
| `fan_mode` | 是 | 风扇模式的新值

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_fan_mode
      target:
        entity_id: climate.kitchen
      data:
        fan_mode: "low"
```

### 动作：设置 HVAC 模式

`climate.set_hvac_mode` 动作允许您设置气候设备的 HVAC 模式。

| 数据属性 | 必需 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。
| `hvac_mode` | 是 | HVAC 模式的新值

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.kitchen
      data:
        hvac_mode: heat
```

### 动作：设置摆风模式

`climate.set_swing_mode` 动作允许您设置气候设备的摆风操作模式。

| 数据属性 | 必需 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。
| `swing_mode` | 是 | 摆风模式的新值：`off`、`horizontal`、`vertical` 或 `both`。

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_swing_mode
      target:
        entity_id: climate.kitchen
      data:
        swing_mode: both
```

### 动作：设置水平摆风模式

`climate.set_swing_horizontal_mode` 动作允许您设置气候设备的水平摆风操作模式。

| 数据属性          | 必需 | 描述                                                                                                                       |
| ----------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`             | 否      | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。 |
| `swing_horizontal_mode` | 是       | 水平摆风模式的新值。                                                                                               |

#### 自动化示例

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - action: climate.set_swing_horizontal_mode
      target:
        entity_id: climate.kitchen
      data:
        swing_horizontal_mode: on
```

### 动作：打开

`climate.turn_on` 动作允许您打开气候设备。仅当气候设备支持关闭时才支持此功能。

| 数据属性 | 必需 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。

### 动作：关闭

`climate.turn_off` 动作允许您关闭气候设备。仅当气候设备处于 HVAC 模式 `off` 时才支持此功能。

| 数据属性 | 必需 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。

### 动作：切换

`climate.toggle` 动作允许您切换气候设备。仅当气候设备支持打开和关闭时才支持此功能。

| 数据属性 | 必需 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 定义要控制的气候设备实体 ID 的字符串或字符串列表。要针对所有气候设备，使用 `all`。

## 属性

气候实体有额外的属性来表示恒温器的状态。

| 名称 | 描述 |
| ---- | ----------- |
| `hvac_action` | 当前状态：`heating` / `cooling` / `idle`。
| `fan_mode` | 风扇当前是开还是关：`on` / `off`。

可用的状态取决于您使用的恒温器。