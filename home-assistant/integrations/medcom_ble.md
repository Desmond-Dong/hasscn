# Medcom Bluetooth

将 International Medcom 支持蓝牙的辐射监测仪集成到 Home Assistant 中。

[International Medcom](https://medcom.com/) 是一家美国公司，生产用于专业环境、家庭与办公室以及全球社区项目的辐射检测仪器。

此集成通过蓝牙低功耗接口支持 Medcom [Inspector BLE](https://medcom.com/product/inspector-ble/)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

启用且正常运行 [Bluetooth](/home-assistant/integrations/bluetooth.md) 集成后，Medcom Bluetooth 集成会自动发现设备。它会将检测到的每个 Inspector 设备以其蓝牙 MAC 地址作为序列号列出。

为了限制 Home Assistant 端蓝牙无线电的负载，此集成每 5 分钟才轮询一次读数，这对于持续的背景监测来说应已足够。Inspector BLE 的电池在持续使用情况下通常可以使用数月后才需要更换。

## 支持的设备

* Medcom Inspector BLE

## 传感器

此集成会为每个检测到的 Inspector BLE 设备添加一个每分钟计数（"CPM"）传感器。如果您希望将该 CPM 读数转换为其他单位，可参阅 Inspector BLE 手册；这可以通过自定义 [template sensor](/home-assistant/integrations/template.md) 实现。
