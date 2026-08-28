# Switch

**Switch** 集成管理开关实体的状态，并允许您控制它们。

* 为每个开关维护一个状态，并维护一个组合状态 `all_switches`。
* 注册 `switch.turn_on`、`switch.turn_off` 和 `switch.toggle` 操作用于控制开关。

:::note Building block integration
This switch is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this switch building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the switch building block offers.
:::

## 开关实体的状态

开关实体的状态可以是 **On** 或 **Off**。

此外，该实体还可以具有以下状态：

* **Unavailable**：实体当前不可用。
* **Unknown**：状态尚未知晓。

## 设备类别

A device class is a measurement categorization in Home Assistant. It influences how the entity is represented in the [dashboard](/home-assistant/dashboards/index.md). This can be modified in the [customize section](/home-assistant/docs/configuration/customizing-devices/index.md). For example, different states may be represented by different icons, colors, or text.

开关支持以下设备类别：

* **None**：通用开关。这是默认值，无需设置。
* **outlet**：电源插座开关。
* **switch**：通用开关。

## 使用操作

在前端中打开 **Settings**，选择 **Developer tools**，点击 **Actions**。在 **Action** 下拉菜单中，从可用操作列表里选择 `switch.turn_on` 或 `switch.turn_off`。在 Entity 下拉菜单中，选择或输入您想操作的实体 ID。这会在 **data** 字段中填入类似下面示例的内容。然后选择 **Perform action**。

```json
{"entity_id":"switch.livingroom_pin2"}
```

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | 否       | 指向开关 `entity_id` 的字符串或字符串列表。若要作用于所有开关，请将 `entity_id` 设为 `all`。 |
