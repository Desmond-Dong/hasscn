Modbus 是一种基于轮询的通信协议，通过串口和 TCP 进行通信。它广泛用于智能家居，适用于太阳能逆变器、电能表以及其他已经进入我们家庭的工业设备。

## 编写 Modbus 库

我们要求每个集成都实现一个库，用于处理设备特定的通信。为了帮助构建这些库，我们维护了 [`modbus-connection`](https://home-assistant-libs.github.io/modbus-connection/) 这个 Python 包。

`modbus-connection` 提供：

* 基于两个流行的 Modbus 库 [pymodbus](https://github.com/pymodbus-dev/pymodbus) 和 [tmodbus](https://github.com/wlcrs/tmodbus) 之上的通用、与后端无关的接口，因此你可以不修改代码就切换后端。
* 一个设备建模框架，将设备数据映射为带类型的 Python 属性，并以尽可能少的请求次数读取数据（[Trovis 示例](https://github.com/Tom-Bom-badil/trovis-modbus/blob/main/src/trovis_modbus/heating_circuit.py)）。
* 一个 `pytest` 插件，使库的测试更加便捷。

如需了解该模式的完整示例，请参阅 [trovis-modbus](https://github.com/Tom-Bom-badil/trovis-modbus)（一个基于 `modbus-connection` 构建的设备库）以及 [trovis-modbus-hass](https://github.com/Tom-Bom-badil/trovis-modbus-hass)（使用该库的 Home Assistant 集成）。
