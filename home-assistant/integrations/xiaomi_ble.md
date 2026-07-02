# Xiaomi BLE

此集成可接入使用 Xiaomi Mijia BLE MiBeacon 协议的设备，以及 MiScales 和 MiFora 植物传感器所实现的 BLE 协议。此集成不支持 Xiaomi BLE Mesh 设备。它会监听设备自行发出的蓝牙广播，因此无需通过轮询唤醒设备，就能跟踪最新的传感器数值或事件（`HHCCJCY01` 除外，见下方说明）。这种方式有助于延长电池寿命。

启用并正常运行 [Bluetooth](/home-assistant/integrations/bluetooth.md) 集成后，此集成会自动发现设备。实体会在首次接收到对应数值后添加。这意味着如果某些数值的广播间隔较长（例如电池电量），对应实体可能会稍后才出现。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 加密

某些设备会使用 AES 加密来保护其广播的传感器数值。

* MiBeacon v2/v3 使用未认证的 AES，密钥为 24 个十六进制字符（12 字节）
* MiBeacon v4/v5 使用已认证的 AES，密钥为 32 个十六进制字符（16 字节）

这个密钥称为 bindkey 或 beaconkey。

获取设备 bindkey 的方式有以下几种：

* 对于 v4 和 v5 设备，你可以提供绑定该设备的小米云账号登录凭据。Home Assistant 会从你的账号中导入相应的 bind key。
* 使用 [token extractor](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor) 工具从小米云提取密钥。
* 自行设置。pvvx 提供的 [Telink Flasher](https://pvvx.github.io/ATC_MiThermometer/TelinkMiFlasher.html) 可为其支持的设备生成新的 bindkey（`LYWSD03MMC`、`MJWSD05MMC`、`MHO-C401`、`CGG1` 和 `CGDK2`）。这个在线刷机工具还支持上传替代固件，相较原厂固件有一些改进，例如更快的传感器更新。请注意，新 bind key 可用于 Home Assistant，但设备一旦通过 TeLink flasher 应用激活，Mi Home 应用将不再识别该传感器。若要重新在 Xiaomi Mi Home 应用中使用该传感器，需要先将设备移除，再重新添加。
* atc1441 提供的另一款 [Telink Flasher](https://atc1441.github.io/Temp_universal_mi_activate.html) 也可以生成新的 bind key，并且相比 pvvx 的 Telink Flasher 支持更多小米设备。
* Yeelight 遥控器（`YLYK01YL`）和调光器（`YLKG07YL` 与 `YLKG08YL`）可能使用 V2/V3 MiBeacon 加密，不过较新的设备似乎配备的是 V4/V5 加密。对于 V2/V3 MiBeacon 加密，无法通过上述方法确定 bindkey。获取这些设备 bindkey 的说明可参见 [BLE monitor FAQ](https://custom-components.github.io/ble_monitor/faq#how-to-get-the-mibeacon-v2v3-encryption-key)。

## 设备

### 植物传感器：Flower Care / MiFlora (`HHCCJCY01`)

`HHCCJCY01` 也称为 MiFlora 或 “Flower Care”，通常应能被自动发现。不过，如果固件版本过旧，它不会发送正确的 BLE 信标，因此需要通过应用进行更新。目前已确认可用的最低固件版本为 `3.2.1`（更低的 `3.x` 版本也可能可用）。

Flower Care 固件更新步骤：

* 安装 HHCC 官方的 “Flower Care” 应用：
  * [Google Play](https://play.google.com/store/apps/details?id=com.huahuacaocao.flowercare)（需要位置和存储权限）
  * [Apple App Store](https://apps.apple.com/app/id1095274672)
* 将运行该应用的设备放在距离植物传感器 10 厘米以内
* 在应用的设备标签页中，点击右上角的 “+” 按钮
* 将植物传感器添加到应用中，并任选一种植物
* 等待传感器同步完成，随后应会出现请求更新固件的对话框（这可能需要几分钟）
* 可通过选择植物 -> 三点菜单 -> Hardware settings -> Hardware update 来查看已安装版本和最新固件版本
* 此集成正常运行后，就不再需要 Flower Care 账号和应用

另请注意，植物传感器的电池电量只能通过连接到设备并读取特征值来获取，而其他传感器数据则是被动广播的。为了避免过度耗电，系统每天只会连接一次设备。此外，连接设备还要求设备具备良好的信号强度。
