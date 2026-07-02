# Binary sensor

二值传感器与其他[传感器](/home-assistant/integrations/sensor.md)类似，它们监控不同实体的状态和条件。二值传感器的不同之处在于它们只能返回两个互斥值中的一个。例如，窗户的二值传感器可能报告 `open` 或 `closed` 值，开关报告 `on` 或 `off`，条件报告 `true` 或 `false`。

这种*非此即彼*的约束使这些传感器成为二值的。它们本质上是数字的，而模拟传感器（如温度和重量传感器）则返回一个范围的值。

当您添加设备集成时，某些二值传感器会自动创建。例如，添加 [ecobee 集成](/home-assistant/integrations/ecobee/index.md) 将创建一个二值传感器来检测房间占用情况。其他二值传感器可以使用[模板集成](/home-assistant/integrations/template/index.md)或使用[输入布尔助手](/home-assistant/integrations/input_boolean.md)手动创建。

:::note Building block integration
This binary sensor is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this binary sensor building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the binary sensor building block offers.
:::

## 二值传感器的状态

二值传感器可以有两种状态：**on** 或 **off**。然而，在前端界面中，它们可能不被称为 **on** 或 **off**，而是使用更有意义的替代术语。例如，热/冷、锁定/解锁。**on** 或 **off** 状态的含义取决于设备类别。

此外，实体还可以有以下状态：

* **不可用**：实体当前不可用。
* **未知**：状态尚未知。

### 设备类别

A device class is a measurement categorization in Home Assistant. It influences how the entity is represented in the [dashboard](/home-assistant/dashboards/index.md). This can be modified in the [customize section](/home-assistant/docs/configuration/customizing-devices/index.md). For example, different states may be represented by different icons, colors, or text.

截图显示了二值传感器不同设备类别的一些示例：

![二值传感器列表](/home-assistant/images/screenshots/binary_sensor_classes_icons.png)

各种设备类别图标在 `on` 和 `off` 状态下的示例。此示例中的 on 图像在实体卡片配置中指定了 `state_color: true` 以接收图标着色。

二值传感器支持以下设备类别：

* **None**：通用开/关。这是默认值，不需要设置。
* **battery**：`on` 表示电量低，`off` 表示正常
* **battery\_charging**：`on` 表示正在充电，`off` 表示未充电
* **carbon\_monoxide**：`on` 表示检测到一氧化碳，`off` 表示无一氧化碳（正常）
* **cold**：`on` 表示冷，`off` 表示正常
* **connectivity**：`on` 表示已连接，`off` 表示已断开
* **door**：`on` 表示开启，`off` 表示关闭
* **garage\_door**：`on` 表示开启，`off` 表示关闭
* **gas**：`on` 表示检测到气体，`off` 表示无气体（正常）
* **heat**：`on` 表示热，`off` 表示正常
* **light**：`on` 表示检测到光线，`off` 表示无光线
* **lock**：`on` 表示开启（解锁），`off` 表示关闭（锁定）
* **moisture**：`on` 表示检测到湿气（潮湿），`off` 表示无湿气（干燥）
* **motion**：`on` 表示检测到运动，`off` 表示无运动（正常）
* **moving**：`on` 表示移动中，`off` 表示未移动（停止）
* **occupancy**：`on` 表示有人占用（检测到），`off` 表示无人占用（正常）
* **opening**：`on` 表示开启，`off` 表示关闭
* **plug**：`on` 表示设备已插入，`off` 表示设备已拔出
* **power**：`on` 表示检测到电源，`off` 表示无电源
* **presence**：`on` 表示在家，`off` 表示离开
* **problem**：`on` 表示检测到问题，`off` 表示无问题（正常）
* **running**：`on` 表示运行中，`off` 表示未运行
* **safety**：`on` 表示不安全，`off` 表示安全
* **smoke**：`on` 表示检测到烟雾，`off` 表示无烟雾（正常）
* **sound**：`on` 表示检测到声音，`off` 表示无声音（正常）
* **tamper**：`on` 表示检测到篡改，`off` 表示无篡改（正常）
* **update**：`on` 表示有可用更新，`off` 表示已是最新
* **vibration**：`on` 表示检测到振动，`off` 表示无振动（正常）
* **window**：`on` 表示开启，`off` 表示关闭

作为对比，这里是模拟传感器的[设备类别](https://www.home-assistant.io/integrations/sensor#device-class)。
