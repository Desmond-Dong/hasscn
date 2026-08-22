我们正在改进和标准化实体命名。这将允许我们在未来的 UI 中以正确的上下文展示实体，同时从代码库中移除一些容易出错的实体名称魔法处理。

简要说明如下：

* 设备保持现有的名称，例如 "Dishwasher"。
* 实体将拥有自己的名称（不含 device、area）。或者，它们可以选择将名称设置为 `None`（在这种情况下它们继承设备名称）。
* 设备、Area 和实体名称都以大写字母开头，其余单词为小写（除非是品牌名称/专有名词/缩写）。
* 每个已迁移以遵循这些规则的实体应将 [`has_entity_name`](https://developers.home-assistant.io/docs/core/entity#entity-naming) 属性设置为 `True`。

在迁移期间，我们使用 `has_entity_name` 属性来创建"向后兼容"的 friendly names。未来，我们可以为未设置此属性的实体显示 deprecation warnings，之后完全移除它。

前端也将为此进行调整。它将能够以多种方式展示实体/设备，选择最适合上下文的方式。

### 示例

以下示例说明了设备和实体应如何按照新建议命名（类型：实体名称 / state 对象的 `friendly_name` / `entity_id`）。
开发者只需设置设备名称和实体名称，`friendly_name` 和 `entity_id` 会自动生成。

* 设备: Dishwasher
  * 开关: `None` / Dishwasher / `switch.dishwasher`
  * 传感器: Power usage / Dishwasher Power usage / `sensor.dishwasher_power_usage`
* 设备: Laundry machine
  * 开关: `None` / Laundry machine / `switch.laundry_machine`
  * 传感器: Power usage / Laundry machine Power usage / `sensor.laundry_machine_power_usage`

## 背景

Home Assistant 将用户的家庭建模为三个层次：

* Area（例如 Living Room）
* Device（例如 Switch）
* Entity（例如 Power usage）

Home Assistant 中的 entities 是设备提供的数据点，可以表示特定的控制（设备的开关、设备的灯光）。

由于 Home Assistant 在其存在的头几年中只有 entities，因此 Home Assistant 中的许多功能都是围绕 entities 构建的，最主要的就是 UI。

假设你有 2 个名为 Dishwasher 和 Laundry Machine 的 Shelly 开关，它们都报告 power usage。两个设备都有一个 switch entity 和一个 power sensor。之前的设备和实体看起来是这样的（类型：实体名称 / state 对象 `friendly_name` / `entity_id`）：

* 设备: Dishwasher
  * 开关: Dishwasher Switch / Dishwasher Switch / `switch.dishwasher_switch`
  * 传感器: Dishwasher Power usage / Dishwasher Power usage / `sensor.dishwasher_power_usage`
* 设备: Laundry machine
  * 开关: Laundry machine Switch / Laundry machine Switch / `switch.laundry_machine_switch`
  * 传感器: Laundry machine Power usage / Laundry machine Power usage / `sensor.laundry_machine_power_usage`

### 为什么这是个问题？

设备名称没有单一的事实来源，因为实体名称中包含了设备名称。

因为我们将设备名称包含在实体名称中"解决"了 UI 和 `entity_id` 的问题，我们现在将这个解决方案应用到了所有使用实体的地方，不得不围绕这个解决方案进行变通处理。

这种命名方案使得将 UI 从长实体列表迁移到 area->device->entity 的分层视图变得不必要地困难。
