---
title: Fan
description: 关于如何在 Home Assistant 中设置风扇设备的说明。
ha_category:
  - Fan
ha_release: 0.27
ha_quality_scale: internal
ha_domain: fan
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

**Fan** 集成允许您控制和监控风扇设备。

:::note Building block integration
This fan is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this fan building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the fan building block offers.
:::

## 风扇实体的状态

风扇实体的状态可以是 **开** 或 **关**。

此外，实体可以具有以下状态：

- **不可用**：实体当前不可用。
- **未知**：状态尚未知。

## 操作

### 风扇控制操作

可用操作：
`fan.set_percentage`、`fan.set_preset_mode`、`fan.set_direction`、`fan.oscillate`、`fan.turn_on`、`fan.turn_off`、`fan.toggle`、`fan.increase_speed`、`fan.decrease_speed`

:::note
并非所有风扇操作都可能适用于您的平台。您可以在 [**设置** > **开发者工具** > **操作**](https://my.home-assistant.io/redirect/developer_services/) 下检查您的风扇有哪些可用操作。


:::
### 操作：设置百分比

`fan.set_percentage` 操作允许您为风扇设备设置速度百分比。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 定义要控制的风扇设备实体 ID 的字符串或字符串列表。要定位所有风扇设备，请使用 `all`。
| `percentage` | 否 | 百分比速度设置

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.kitchen
      data:
        percentage: 33
```

### 操作：设置预设模式

`fan.set_preset_mode` 操作允许您为风扇设备设置预设模式。可用的预设模式由向 Home Assistant 提供风扇实体的集成定义。例如，ESPHome [Speed Fan](https://esphome.io/components/fan/speed/) 组件默认提供三种可用预设：`Low`、`Medium` 和 `High`。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 定义要控制的风扇设备实体 ID 的字符串或字符串列表。要定位所有风扇设备，请使用 `all`。
| `preset_mode` | 否 | 预设模式

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: fan.set_preset_mode
      target:
        entity_id: fan.kitchen
      data:
        preset_mode: auto
```

### 操作：设置方向

`fan.set_direction` 操作允许您设置风扇设备的旋转方向。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 定义要控制的风扇设备实体 ID 的字符串或字符串列表。要定位所有风扇设备，请使用 `all`。
| `direction` | 否 | 旋转方向。`forward` 或 `reverse`

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: fan.set_direction
      target:
        entity_id: fan.kitchen
      data:
        direction: forward
```

### 操作：摆动

`fan.oscillate` 操作允许您设置风扇设备的摆动。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 定义要控制的风扇设备实体 ID 的字符串或字符串列表。要定位所有风扇设备，请使用 `all`。
| `oscillating` | 否 | 开启/关闭摆动的标志。`True` 或 `False`。

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: fan.oscillate
      target:
        entity_id: fan.kitchen
      data:
        oscillating: True
```

### 操作：打开

`fan.turn_on` 操作允许您打开风扇设备。这仅在风扇设备支持关闭时才支持。请参阅 `fan.turn_off` 下的类似示例。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 定义要控制的风扇设备实体 ID 的字符串或字符串列表。要定位所有风扇设备，请使用 `all`。
| `percentage` | 是 | 百分比速度设置
| `preset_mode` | 是 | 预设模式

### 操作：关闭

`fan.turn_off` 操作允许您关闭风扇设备。这仅在风扇设备支持打开时才支持。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 定义要控制的风扇设备实体 ID 的字符串或字符串列表。要定位所有风扇设备，请使用 `all`。


#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.kitchen
      data:
        speed: low
```

### 操作 `fan.increase_speed`

增加风扇设备的速度。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 定义要控制的风扇设备实体 ID 的字符串或字符串列表。要定位所有风扇设备，请使用 `all`。
| `percentage_step` | 是 | 按百分比增加速度。应在 0..100 之间。

#### 自动化示例

```yaml
automation:
  triggers:
  - trigger: device
    device_id: 097cd9f706a86e9163acb64ba7d630da
    domain: lutron_caseta
    type: press
    subtype: raise
  actions:
  - action: fan.increase_speed
    target:
      entity_id: fan.dining_room_fan_by_front_door
```

### 操作 `fan.decrease_speed`

降低风扇设备的速度。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 定义要控制的风扇设备实体 ID 的字符串或字符串列表。要定位所有风扇设备，请使用 `all`。
| `percentage_step` | 是 | 按百分比降低速度。应在 0..100 之间。

#### 自动化示例

```yaml
automation:
  triggers:
  - trigger: device
    device_id: 097cd9f706a86e9163acb64ba7d630da
    domain: lutron_caseta
    type: press
    subtype: lower
  actions:
  - action: fan.decrease_speed
    target:
      entity_id: fan.dining_room_fan_by_front_door
```