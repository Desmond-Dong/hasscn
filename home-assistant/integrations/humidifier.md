# Humidifier

**Humidifier** 集成用于控制和监控加湿器、除湿机和湿度控制设备。

:::note Building block integration
This humidifier is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this humidifier building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the humidifier building block offers.
:::

## The state of a humidifier entity

加湿器实体的状态可以是 **On** 或 **Off**。

此外，实体还可能具有以下状态：

* **Unavailable**：实体当前不可用。
* **Unknown**：当前状态未知。

## Device class

A device class is a measurement categorization in Home Assistant. It influences how the entity is represented in the [dashboard](/home-assistant/dashboards/index.md). This can be modified in the [customize section](/home-assistant/docs/configuration/customizing-devices/index.md). For example, different states may be represented by different icons, colors, or text.

下图展示了不同加湿器设备类别在文本和 UI 上的差异：

<p class='img'>
<img src='/home-assistant/images/screenshots/humidifier_device_class.png' />
加湿器设备类别。
</p>

加湿器支持以下设备类别：

* **Humidifier**：增加周围空气湿度。
* **Dehumidifier**：降低周围空气湿度。

## Actions

### Humidifier actions

可用动作：`humidifier.set_mode`、`humidifier.set_humidity`、`humidifier.turn_on`、`humidifier.turn_off`、`humidifier.toggle`

:::tip
并非所有加湿器动作都在您的平台可用。请在 [Developer tools](/home-assistant/docs/tools/dev-tools/index.md) 的 **Actions** 页面确认 Home Assistant 已启用的可用动作。

:::

### Action: Set mode

`humidifier.set_mode` 动作用于设置加湿器设备模式。仅当设备支持多种工作模式时，此动作才可用。可用模式列表和各模式下功能取决于具体设备。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的加湿器设备 `entity_id` 的字符串或字符串列表。
| `mode` | no  | 新模式。

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: humidifier.set_mode
      target:
        entity_id: humidifier.bedroom
      data:
        mode: "eco"
```

### Action: Set humidity

`humidifier.set_humidity` 动作用于设置加湿器设备的目标湿度。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的加湿器设备 `entity_id` 的字符串或字符串列表。
| `humidity` | no  | 加湿器设备的新目标湿度

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: humidifier.set_humidity
      target:
        entity_id: humidifier.bedroom
      data:
        humidity: 60
```

### Action: Turn on

`humidifier.turn_on` 动作用于开启加湿器设备。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的加湿器设备 `entity_id` 的字符串或字符串列表。

### Action: Turn off

`humidifier.turn_off` 动作用于关闭加湿器设备。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的加湿器设备 `entity_id` 的字符串或字符串列表。

### Action: Toggle

`humidifier.toggle` 动作用于切换加湿器设备开/关状态。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的加湿器设备 `entity_id` 的字符串或字符串列表。
