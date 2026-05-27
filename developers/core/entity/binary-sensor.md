# 二进制传感器实体

二元传感器是只能有两种状态的传感器。平台实体派生自[`homeassistant.components.binary_sensor.BinarySensorEntity`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/binary_sensor/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| is\_on | <code>bool | None</code> | `None` | **必需的**。二进制传感器当前打开或关闭。
| device\_class | <code>BinarySensorDeviceClass | None</code> | `None` | 二进制传感器的类型。

### 可用设备类别

| 常量 | 说明
| ----- | -----------
| `BinarySensorDeviceClass.BATTERY` | 亮表示低，灭表示正常。
| `BinarySensorDeviceClass.BATTERY_CHARGING` | 亮表示正在充电，灭表示未充电。
| `BinarySensorDeviceClass.CO` | 亮起表示检测到一氧化碳，熄灭表示未检测到一氧化碳（清除）。
| `BinarySensorDeviceClass.COLD` | 亮表示冷，灭表示正常。
| `BinarySensorDeviceClass.CONNECTIVITY` | 亮表示已连接，灭表示已断开。
| `BinarySensorDeviceClass.DOOR` | On 表示打开，Off 表示关闭。
| `BinarySensorDeviceClass.GARAGE_DOOR` | On 表示打开，Off 表示关闭。
| `BinarySensorDeviceClass.GAS` | 亮起表示检测到气体，熄灭表示没有气体（清除）。
| `BinarySensorDeviceClass.HEAT` | 亮表示热，灭表示正常。
| `BinarySensorDeviceClass.LIGHT` | 亮表示检测到光，灭表示未检测到光。
| `BinarySensorDeviceClass.LOCK` | On 表示打开（解锁），Off 表示关闭（锁定）。
| `BinarySensorDeviceClass.MOISTURE` | 开表示湿，关表示干。
| `BinarySensorDeviceClass.MOTION` | 亮起表示检测到运动，关闭表示没有运动（清除）。
| `BinarySensorDeviceClass.MOVING` | On 表示移动，Off 表示不移动（停止）。
| `BinarySensorDeviceClass.OCCUPANCY` | 亮表示已占用，灭表示未占用（清除）。
| `BinarySensorDeviceClass.OPENING` | On 表示打开，Off 表示关闭。
| `BinarySensorDeviceClass.PLUG` | 亮起表示已插入，熄灭表示已拔出插头。
| `BinarySensorDeviceClass.POWER` | 亮表示检测到电源，灭表示未通电。
| `BinarySensorDeviceClass.PRESENCE` | On 表示回家，Off 表示外出。
| `BinarySensorDeviceClass.PROBLEM` | 亮起表示检测到问题，熄灭表示没有问题（正常）。
| `BinarySensorDeviceClass.RUNNING` | 亮表示正在运行，灭表示未运行。
| `BinarySensorDeviceClass.SAFETY` | 开表示不安全，关表示安全。
| `BinarySensorDeviceClass.SMOKE` | 亮起表示检测到烟雾，熄灭表示没有烟雾（清除）。
| `BinarySensorDeviceClass.SOUND` | 亮起表示检测到声音，熄灭表示没有声音（清晰）。
| `BinarySensorDeviceClass.TAMPER` | 亮表示检测到篡改，灭表示未篡改（清除）
| `BinarySensorDeviceClass.UPDATE` | 亮起表示有更新，熄灭表示是最新的。应避免使用此设备类，请考虑使用 [`update`](/developers/core/entity/update.md) 实体。
| `BinarySensorDeviceClass.VIBRATION` | 亮表示检测到振动，灭表示无振动。
| `BinarySensorDeviceClass.WINDOW` | On 表示打开，Off 表示关闭。
