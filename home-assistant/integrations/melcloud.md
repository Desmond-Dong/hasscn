# MELCloud

**MELCloud** 集成可将三菱电机支持 [MELCloud](https://www.melcloud.com/) 的设备接入 Home Assistant。

## 设备支持

* 风对风热泵，例如空调设备 - **支持**
* 风对水热泵 - **支持**
* 全热交换新风设备 - **不支持**
* 其他设备 - **不支持**

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 风对风设备

风对风热泵会提供 `climate` 和 `sensor` 平台。设备能力可能会限制可用的参数和传感器。

### Climate

可对 `climate` 平台实体控制以下参数：

* 电源（通过 HVAC 模式控制）
* 目标温度
* 运行模式（HVAC 模式）
* 风速
* 水平和垂直导风板位置

#### 状态属性

|Attribute|Description|Example|
|---------|-----------|-------|
|`vane_horizontal` |当前水平导风板位置或模式|`auto`|
|`vane_horizontal_positions` |可用的水平导风板位置和模式|`auto, split, swing`|
|`vane_vertical` |当前垂直导风板位置或模式|`auto`|
|`vane_vertical_positions` |可用的垂直导风板位置和模式|`auto, split, swing`|

#### 控制导风板

水平和垂直导风板位置可分别通过 `melcloud.set_vane_horizontal` 和 `melcloud.set_vane_vertical` 操作进行控制。

摆动模式也可用于控制垂直导风板位置。

### Sensor

`sensor` 平台实体提供以下属性：

* 室内温度
* 室外温度
* 能耗 - 总耗电量，单位为 kWh。**并非所有型号都支持。**
* 每日能耗 - 24 小时窗口内的耗电量，单位为 kWh。该读数会在 MELCloud 服务所在时区的午夜重置。精确时间需要通过持续观察传感器值，直到检测到重置为止。

## 风对水设备

风对水设备会提供 `water_heater`、`climate` 和 `sensor` 平台。

### Climate

风对水系统中的每个散热区都会提供一个 `climate` 平台实体。可控制以下参数：

* 目标室温

散热器需要通过本地 HMI 或 MELCloud 配置为室温控制模式。暂不支持供水温度模式和曲线模式。

部分风对水设备允许使用散热区进行制冷。由于缺少样本设备，此功能尚未实现。

无法通过 `climate` 实体打开或关闭整个系统。

#### 状态属性

|Attribute|Description|Example|
|---------|-----------|-------|
|`status` |当前运行状态|`idle`|

### Sensor

`sensor` 平台实体提供以下属性：

* 每个区域的室温
* 水箱水温
* 室外温度 - 精度为 1°C，每 1-2 小时轮询一次。
* 区域供水温度，每 1-2 小时轮询一次
* 区域回水温度，每 1-2 小时轮询一次

与风对风设备不同，风对水设备不会以易于访问的方式报告能耗数据。

### Water heater

可对 `water_heater` 平台实体控制以下参数：

* 电源 - 控制整个系统。
* 水箱目标温度
* 运行模式

#### 状态属性

|Attribute|Description|Example|
|---------|-----------|-------|
|`status` |当前运行状态|`heat`|
