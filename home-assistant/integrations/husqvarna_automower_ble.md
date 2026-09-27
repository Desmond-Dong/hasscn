# Husqvarna Automower BLE

**Husqvarna Automower BLE** 集成通过本地蓝牙连接与 Husqvarna Automower 割草机通信。这使您无需账号、云端或网络连接即可连接并控制 Automower。

此集成基于 [AutoMower-BLE](https://github.com/alistair23/AutoMower-BLE)，这是一个非官方、通过逆向工程实现的 Husqvarna Automower Connect BLE 库。

### Prerequisites

1. 设置 [Bluetooth 控制器](https://www.home-assistant.io/integrations/bluetooth/)。ESPHome 蓝牙代理效果很好，并且可以将设备部署在靠近割草机的位置。
2. 让割草机进入配对模式。不同机型进入方式不同。以 305 为例，割草机通电后前 3 分钟会进入配对模式。添加集成时请确保割草机处于配对模式。每个 BLE 控制器只需执行一次（因此更换 ESPHome 设备后需要修复）。
3. 在 Home Assistant 中手动添加集成时，您需要输入割草机的 BLE MAC 地址。您可以在 ESPHome 日志、Android 手机或其他方式中获取该地址。

配对可能需要尝试几次。即使使用官方 Android 应用，首次配对也可能不容易成功。如果遇到问题，请重启割草机后重试。割草机必须完成“配对”，仅“连接”是不够的。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
