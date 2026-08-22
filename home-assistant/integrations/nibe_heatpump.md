# Nibe Heat Pump

The **Nibe Heat Pump** integration allows you to control and monitor [Nibe Heat Pumps](https://www.nibe.eu/en-eu/products/heat-pumps) in Home Assistant.

Supported devices:

* F1145/F1245
* F1155/F1255
* S1155/S1255
* F1345
* F1355
* S2125
* S320/S325
* S330/S332
* F370
* F470
* F730
* S735
* F750
* S1156
* S1255
* S1256
* SMO40
* SMOS40
* VVM225/VVM320/VVM325
* VVM310/VVM500

## Configuration

To add the **Nibe Heat Pump** device to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nibe_heatpump)

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nibe_heatpump).
* From the list, select **Nibe Heat Pump**.
* Follow the instructions on screen to complete the setup.

</details>

## Connection Methods

为了与泵进行通信，根据硬件的不同，可以使用几种不同的连接方法。目前支持以下方法。

* [连接方法](#connection-methods)
  * [使用 NibeGw 的 UDP 网关](#udp-gateway-using-nibegw)
    * [ESPHome](#esphome)
    * [Arduino](#arduino)
    * [树莓派 / Linux](#raspberry-pi--linux)
  * [Modbus 连接](#modbus-connection)
    * [TCP/IP](#tcpip)
    * [RCU](#rcu)

### UDP Gateway using NibeGw

热泵有一个 RS485 接口，用于与扩展设备进行通信。这可用于通过模拟 Nibe MODBUS40 附件与泵通信。

由于如果附件没有响应，泵将进入错误状态，因此运行网关软件的专用硬件是更好的选择。

这可以使用带有 RS485 帽子的 Raspberry Pi、带有 RS485 支持的 Arduino 或带有 RS485 转换器的 ESP32 来构建。

#### ESPHome

ESPHome 基础硬件解决方案也运行良好，并且可以很好地集成到 Home Assistant 中。

* [主页](https://github.com/elupus/esphome-nibe)

#### Arduino

OpenHAB 社区已使用 Arduino uno + RS485 和以太网扩展板对基于 Arduino 的解决方案进行了测试。还支持 ProDiNo 上网板。 ProDiNo 板上有一个以太网和 RS-485 端口。

* [OpenHAB 的文档](https://www.openhab.org/addons/bindings/nibeheatpump/#arduino)
* [OpenHAB Contrib 中的源代码](https://github.com/openhab/openhab-addons/tree/main/bundles/org.openhab.binding.nibeheatpump/contrib/NibeGW/Arduino/NibeGW)

#### Raspberry Pi / Linux

还提供用于运行 Nibe Gateway 软件的标准 Linux 应用程序。

* [OpenHAB 的文档](https://www.openhab.org/addons/bindings/nibeheatpump/#raspberry-pi-or-other-linux-unix-based-boards)
* [OpenHAB Contrib 中的源代码](https://github.com/openhab/openhab-addons/tree/main/bundles/org.openhab.binding.nibeheatpump/contrib/NibeGW/RasPi)

### Modbus Connection

Home Assistant 支持通过 TCP 或 RCU 等连接通过 Modbus 连接到 Nibe 热泵。连接到 Home Assistant 内的泵时，必须指定 Modbus 连接字符串。

#### TCP/IP

较新的 S 系列泵公开了一个内置 TCP Modbus 服务器，可用于与泵进行通信。要启用对此集成的支持，泵必须连接到您的本地网络和网络（5.2 - 网络设置），并且必须启用 Modbus (7.5.9 - Modbus TCP/IP)。有关泵中 Modbus 支持的更多详细信息，请参阅 Nibe 文档 [M12676EN](https://www.nibe.eu/download/18.3db69dc1795e0d992c5722/1622634529178/Modbus%20S-series%20EN%20M12676EN-1.pdf)。

* `tcp://[IP 或主机名]`
* `tcp://[IP 或主机名]:502`

#### RCU

如果您的系统配备了 MODBUS40 附件，则可用于控制您的泵。要将 Home Assistant 连接到 MODBUS40 配件，需要一个 RS485 USB 加密狗，它可以本地连接到您的 Home Assistant 系统，或者通过 [ser2net](https://linux.die.net/man/8/ser2net) 公开的单独计算机上

* `serial://[DEVICE PATH]` 用于直接本地连接
* `rfc2217://[IP OR HOSTNAME]:[PORT]` 用于 [ser2net](https://linux.die.net/man/8/ser2net) 类型代理

:::note
Support for RCU-based communication is currently untested.

:::
