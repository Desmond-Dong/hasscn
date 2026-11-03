# Siren

**Siren** 集成用于控制和监控警号/提示音设备。

:::note Building block integration
This siren is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this siren building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the siren building block offers.
:::

## 警号实体的状态

警号实体的状态可以是 **On** 或 **Off**。

此外，该实体还可以具有以下状态：

* **Unavailable**：实体当前不可用。
* **Unknown**：状态尚未知晓。

## 操作

### 警号操作

可用操作：`siren.turn_on`、`siren.turn_off`、`siren.toggle`

### 操作：打开

`siren.turn_on` 操作用于打开警号。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 指向要控制的警号 `entity_id` 的字符串或字符串列表。 |

根据设备是否支持，您还可以向该操作传入三个可选输入参数。更多详情请查看对应设备集成的文档。

| 参数名 | 输入类型 | 说明 |
|---------------- |-------------------------|-------------------------------------------------------------------------------------|
| `tone`          | `string` 或 `integer`   | 当 `available_tones` 属性是一个映射时，可以使用键或值。 |
| `duration`      | `integer`               |  |
| `volume_level`  | `0` 到 `1` 之间的 `float` |  |

### 操作：关闭

`siren.turn_off` 操作用于关闭警号。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 指向要控制的警号 `entity_id` 的字符串或字符串列表。 |

### 操作：切换

`siren.toggle` 操作用于切换警号的开/关状态。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 指向要控制的警号 `entity_id` 的字符串或字符串列表。 |
