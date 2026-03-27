---
title: Zigbee Home Automation
description: 'Zigbee 家庭自动化 (ZHA) integration 允许您使用称为Zigbee 协调器 的众多兼容硬件适配器之一将许多现成的 Zigbee-based devices(https://csa-iot.org/csa-iotproducts/) 直接无线连接到 Home Assistant。'
ha_category:
  - Alarm
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Device tracker
  - Fan
  - Hub
  - Light
  - Lock
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
  - Update
ha_release: 0.44
ha_iot_class: Local Polling
featured: true
ha_config_flow: true
ha_codeowners:
  - '@dmulcahey'
  - '@adminiuga'
  - '@puddly'
  - '@TheJulianJES'
ha_domain: zha
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - climate
  - cover
  - device_tracker
  - diagnostics
  - fan
  - light
  - lock
  - number
  - select
  - sensor
  - siren
  - switch
  - update
ha_zeroconf: true
ha_integration_type: hub
---
# Zigbee Home Automation

**Zigbee 家庭自动化** (ZHA) integration 允许您使用称为_Zigbee 协调器_ 的众多兼容硬件适配器之一将许多现成的 [Zigbee-based devices](https://csa-iot.org/csa-iot_products/) 直接无线连接到 Home Assistant。

此 integration 目前支持 Home Assistant 中的以下设备类型：

- [Alarm control panel](/home-assistant/integrations/alarm_control_panel/)
- [Binary sensor](/home-assistant/integrations/binary_sensor/)
- [Button](/home-assistant/integrations/button/)
- [Climate](/home-assistant/integrations/climate/)（测试版）
- [Cover](/home-assistant/integrations/cover/)
- [Device tracker](/home-assistant/integrations/device_tracker/)
- [Fan](/home-assistant/integrations/fan/)
- [Light](/home-assistant/integrations/light/)
- [Lock](/home-assistant/integrations/lock/)
- [Number](/home-assistant/integrations/number/)（即模拟输入/输出）
- [Select](/home-assistant/integrations/select/)
- [Sensor](/home-assistant/integrations/sensor/)
- [Siren](/home-assistant/integrations/siren/)
- [Switch](/home-assistant/integrations/switch/)
- [Update](/home-assistant/integrations/update/)

## 简介

ZHA 集成是一种独立于硬件的 Zigbee 网关实现，可以取代大多数专有的 Zigbee 网关（或网桥、集线器或控制器）。 ZHA 创建一个 Zigbee 网络，您可以向其中添加大多数基于 Zigbee 的设备。

ZHA 使用名为 [zigpy](https://github.com/zigpy/zigpy) 的开源 Python 库，因此任何与 zigpy 兼容的协调器都可以与 ZHA 一起使用。在购买 Zigbee 设备之前查看 [compatible hardware](#compatible-hardware) 建议。

### Zigbee 术语说明 {#zigbee-terms}

- **Zigbee 网络**：具有使用低带宽通信协议的低功耗数字无线电的设备的网状网络。
- **Zigbee 协调器**：硬件无线电适配器（通常是 USB 适配器），可直接插入运行 Home Assistant 安装的同一台计算机。
- **Zigbee 路由器设备**：始终由主电源 (AC) 供电的硬件设备，例如插座或风扇。
- **Zigbee 终端设备**：通常由电池供电 (DC) 的硬件设备，例如遥控器或运动传感器。
- **Zigbee组**：两个或多个相同类型的Zigbee设备的集合，与Home Assistant的[Groups](/home-assistant/integrations/group/)不同。

### Zigbee 基本概念 {#zigbee-concepts}

- Zigbee 网络可以有**只有一个** Zigbee 协调器，
- Zigbee 协调器可以连接多个 **Zigbee 路由器** 或 **Zigbee 终端设备**，
- 每个 Zigbee 路由器设备可以连接多个 **Zigbee 终端设备**，
- Zigbee 设备只能连接到单个 Zigbee 网络，
- Zigbee 网络在很大程度上依赖于拥有多个 [Zigbee Router devices](#using-router-devices-to-add-more-devices) 来扩大覆盖范围并增加设备容量。
- 路由器设备有助于将消息传递到 Zigbee 网络中的其他附近设备，因此可以扩大范围并增加可添加的设备数量。

## 兼容的硬件

该集成的独立于硬件的设计为不同制造商提供的许多 Zigbee 协调器提供支持，只要协调器与 [zigpy](https://github.com/zigpy/zigpy) 库兼容即可。

### 推荐的 Zigbee 无线电适配器和模块

- 使用 EZSP 协议的基于 Silicon Labs EmberZNet 的无线电（通过用于 zigpy 的 [bellows](https://github.com/zigpy/bellows) 库）
  - [Home Assistant Connect ZBT-2](/home-assistant/connect/zbt-2/)（基于 EFR32MG24 的 USB 适配器）
  - [Home Assistant Connect ZBT-1](/home-assistant/connectzbt1/)（基于 EFR32MG21 的 USB 加密狗）
  - [Home Assistant Yellow](/home-assistant/yellow/) 具有集成 MGM210P 无线电，基于 EFR32MG21
  - [ITead SONOFF Zigbee 3.0 USB Dongle Plus Model "ZBDongle-E" (EFR32MG21 variant)](https://itead.cc/product/zigbee-3-0-usb-dongle/)
  - [SMLIGHT SLZB-07](https://smlight.tech/product/slzb-07/)（基于 EFR32MG21 的 USB 加密狗）
- 基于 Texas Instruments 的无线电（通过用于 zigpy 的 [zigpy-znp](https://github.com/zigpy/zigpy-znp) 库）
  - [CC2652P/CC2652R/CC2652RB USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/guide/adapters/)
  - [CC1352P/CC1352R USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/guide/adapters/)
- dresden elektronik 基于 deCONZ 的 Zigbee 无线电（通过用于 zigpy 的 [zigpy-deconz](https://github.com/zigpy/zigpy-deconz) 库）
  - [ConBee III (a.k.a. ConBee 3) USB adapter from dresden elektronik](https://phoscon.de/conbee3)

### 其他支持但不推荐的 Zigbee 无线电适配器或模块

支持以下硬件，但_不推荐_。每个部分均注明了具体型号和详细信息。

<details>
<summary>不推荐的硬件列表</summary>


:::caution
- **不建议**通过**串行代理服务器**_（也称为串行到IP桥或Ser2Net远程适配器）_运行协调器：
  
  - **无线网络**，
  - **WAN**，或
  - **VPN**

- 协调器需要与其串行端口接口建立稳定的本地连接，且与主机上运行的 Zigbee 网关应用程序的通信不会中断。
- 协调器使用的串行协议没有足够的稳健性、弹性或容错能力来处理不稳定连接上可能发生的数据包丢失和延迟延迟。

:::
**基于 Silicon Labs EmberZNet 的无线电，使用使用 EZSP 协议的传统硬件（通过用于 zigpy 的 [bellows](https://github.com/zigpy/bellows) 库）**

- [Elelabs Zigbee USB Adapter](https://elelabs.com/products/elelabs-usb-adapter.html)/POPP ZB 棒
  - 建议[upgrade the EmberZNet NCP application firmware](https://github.com/Elelabs/elelabs-zigbee-ezsp-utility)
- [Elelabs Zigbee Raspberry Pi Shield](https://elelabs.com/products/elelabs-zigbee-shield.html)
  - 建议[upgrade the EmberZNet NCP application firmware](https://github.com/Elelabs/elelabs-zigbee-ezsp-utility)
- [ITead Sonoff ZBBridge](https://itead.cc/product/sonoff-zbbridge/)
  - 注：[WiFi-based bridges are not recommended for ZHA with EZSP radios](https://github.com/home-assistant/home-assistant.io/issues/17170)。
  - 这些首先需要使用 [Tasmota firmware and Silabs EmberZNet NCP EZSP UART Host firmware to use as Serial-to-IP adapter](https://www.digiblur.com/2020/07/how-to-use-sonoff-zigbee-bridge-with.html) 进行闪存
- [Nortek GoControl QuickStick Combo Model HUSBZB-1 (Z-Wave & Zigbee Ember 3581 USB Adapter)](https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/)
  - 建议[upgrade the EmberZNet NCP application firmware](https://github.com/walthowd/husbzb-firmware)
- [Bitron Video/Smabit BV AV2010/10 USB-Stick](https://manuals.smabit.eu/len/av2010_10.html) 与 Silicon Labs Ember 3587
- Telegesis ETRX357USB/ETRX357USB-LR/ETRX357USB-LRS+8M
  - 这些首先需要是 [flashed with other EmberZNet firmware](https://github.com/walthowd/husbzb-firmware)**基于德州仪器 (Texas Instruments) 的无线电使用传统硬件（通过用于 zigpy 的 [zigpy-znp](https://github.com/zigpy/zigpy-znp) 库）**

- [CC2538 USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/information/supported_adapters)
  - 不再推荐这样做，因为它只能运行已弃用（旧的/寿命终止）的固件。
- [CC2530/CC2531 USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/information/supported_adapters)
  - 不再推荐这样做，因为它使用已弃用的硬件和非常旧的、报废的固件。
  - 如果 Zigbee 网络有超过 15-20 个设备，这将无法正常工作。

**基于 deCONZ 的 dresden elektronik 使用传统硬件的 Zigbee 无线电（通过用于 zigpy 的 [zigpy-deconz](https://github.com/zigpy/zigpy-deconz) 库）**

- [ConBee II (a.k.a. ConBee 2) USB adapter from dresden elektronik](https://phoscon.de/conbee2)
- [RaspBee II (a.k.a. RaspBee 2) Raspberry Pi Shield from dresden elektronik](https://phoscon.de/raspbee2)
- [ConBee USB adapter from dresden elektronik](https://phoscon.de/conbee)
- [RaspBee Raspberry Pi Shield from dresden elektronik](https://phoscon.de/raspbee)

**基于 Digi XBee Zigbee 的无线电（通过用于 zigpy 的 [zigpy-xbee](https://github.com/zigpy/zigpy-xbee) 库）**

- [Digi XBee Series 3 (xbee3-24)](https://www.digi.com/products/embedded-systems/digi-xbee/rf-modules/2-4-ghz-rf-modules/xbee3-zigbee-3) 和 [Digi XBee Series S2C](https://www.digi.com/products/embedded-systems/digi-xbee/rf-modules/2-4-ghz-rf-modules/xbee-zigbee) 模块
  - 建议[upgrade XBee Series 3 and S2C to newest firmware using XCTU](https://www.digi.com/resources/documentation/Digidocs/90002002/Default.htm#Tasks/t_load_zb_firmware.htm)
- [Digi XBee Series 2 (S2)](https://www.digi.com/support/productdetail?pid=3430) 模块
  - 这些首先需要是 [flashed with Zigbee Coordinator API firmware](https://www.digi.com/support/productdetail?pid=3430)

**基于 ZiGate 的无线电（通过用于 zigpy 的 [zigpy-zigate](https://github.com/zigpy/zigpy-zigate) 库，并且需要固件 3.1d 或更高版本）**

- [ZiGate USB](https://zigate.fr/produit/zigate-usb/)
- [ZiGate USB-DIN](https://zigate.fr/produit/zigatev2-usb-din/)
- [PiZiGate (ZiGate Raspberry Pi module)](https://zigate.fr/produit/pizigatev2/)
- [ZiGate-Ethernet (Ethernet gateway board for PiZiGate)](https://zigate.fr/produit/zigate-ethernet/)
- [ZiGate + WiFi Pack](https://zigate.fr/produit/zigatev2-pack-wifi/)


</details>

如果您发现有机会改进此信息，请参阅有关如何 [add support for new and unsupported devices](#how-to-add-support-for-new-and-unsupported-devices) 的部分。

## 配置要求

:::important
在继续配置之前，请务必连接兼容的无线电模块并重新启动 Home Assistant。

:::
一旦配置了 Zigbee 协调器，ZHA 将自动创建 Zigbee 网络；然后您可以添加兼容的设备。

强烈建议您查看 [Zigbee interference avoidance and network range/coverage optimization](#zigbee-interference-avoidance-and-network-rangecoverage-optimization) 的指南。

## 配置

To add the **Zigbee Home Automation** hub to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=zha)

Zigbee Home Automation can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>手动配置步骤</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=zha).
- From the list, select **Zigbee Home Automation**.
- Follow the instructions on screen to complete the setup.

</details>

1. 在弹出对话框中，从系统上检测到的选项中选择 **串行设备路径**。
    - 选择您的收音机所连接的收音机。
2. 选择**提交**。
3. 提交后，integration 将尝试自动检测无线电类型。
4. 如果不成功，您需要手动设置无线电类型： 
    - 选择您的**无线电类型**：
        - **ezsp**：Silicon Labs EmberZNet 协议（例如，Home Assistant ZBT-1 或 ZBT-2、Elelabs、HUSBZB-1、Telegesis）
        - **deCONZ**：dresden elektronik deCONZ 协议（例如 ConBee I/II、RaspBee I/II）
        - **znp**：德州仪器（例如，CC253x、CC26x2、CC13x2）
        - **zigate**：ZiGate 串行协议（例如，ZiGate USB-TTL、PiZiGate、ZiGate WiFi）
        - **xbee**：Digi XBee ZB 协调器固件协议（例如，Digi XBee 系列 2、2C、3）
    - 选择**提交**以继续下一步。
5. 输入**串口设备路径**：
    - 大多数设备至少需要串行设备路径，例如 `/dev/ttyUSB0`，但建议使用 `/dev/serial/by-id` 文件夹中的设备路径（例如，`/dev/serial/by-id/usb-Silicon_Labs_HubZ_Smart_Home_Controller_C0F003D3-if01-port0`）。
    - 可用设备路径列表可在 [Settings > System > Hardware](https://my.home-assistant.io/redirect/hardware/) > **点菜单** > **所有硬件** 中找到。
6. 设置**端口速度**（不适用于所有无线电）。
7. 设置**数据流控制**（不适用于所有无线电）。
8. 按**提交**。
    - 如果不成功，弹出窗口中将显示错误。 
    - 如果 Home Assistant 无法访问 USB 设备或者您的设备不是最新的，则可能会出现错误。 
    - 请参阅下面的 [Troubleshooting](#troubleshooting) 了解更多信息。

### ZiGate 或 Sonoff ZBridge 设备配置 {#zigate-or-sonoff-zbridge-devices}

如果您使用 ZiGate 或 Sonoff ZBridge 设备，则需要 `usb_path` 的额外配置。

<details>
<summary>额外的 ZBBridge 配置</summary>


- ZiGate USB TTL 或 DIN：`/dev/ttyUSB0` 或 `auto` 自动发现 zigate
- PiZgate：`pizigate:/dev/ttyS0`
- Wifi Zigate：`socket://[IP]:[PORT]` — 例如 `socket://192.168.1.10:9999`
- Sonoff ZBridge：`socket://[IP]:[PORT]` — 例如 `socket://192.168.1.11:8888`


</details>

### 全局选项

配置 ZHA 后，有一些全局选项可用。要访问这些设置，请转至 [**Settings** > **Zigbee**](https://my.home-assistant.io/redirect/config_zha/) 并选择 **选项**。

选项如下：

```yaml
加入时识别：
  描述：“当新设备加入网络时，它会执行识别过程（例如闪烁），以便您可以找到它。如果您批量添加许多设备并且不需要视觉反馈，或者特定设备的识别行为具有破坏性（例如发出蜂鸣声的警报器），请关闭此功能。默认值：`on`。”
光转换时间：
  描述：“更改灯光状态时使用的默认过渡时间（以秒为单位）。设置为 `0` 以禁用过渡。如果您希望默认情况下所有灯光淡入和淡出，而不必在每个自动化上设置过渡，请增加此值（例如，设置为 `1` 或 `2`）。默认值：`0`。”
平滑过渡上电：
  描述：“对于较旧的非 Zigbee 3。0 灯，这允许从关闭状态平滑过渡到新颜色或亮度级别，而无需首先显示旧颜色。如果您有较旧的灯泡（例如较旧的IKEA或Philips灯泡），在打开过渡时会短暂闪烁以前的颜色，请启用此功能。仅在绝对必要时才启用此选项。如果同时打开多个灯，可能会导致暂时的网络拥塞。默认值：`off`。”
防止滑块在过渡期间跳跃：
  描述：“防止亮度滑块在灯光转换时跳转到中间值。这可以避免在使用过渡效果打开灯光时 UI 中出现令人困惑的视觉闪烁。如果您正在调试灯光行为并希望在过渡期间查看实际的中间亮度值，请禁用此功能。默认值：`on`。”
假设组的状态：
  描述：“当你打开ZHA组灯时，所有组成员都会乐观地更新到`on`状态，而不是等待被轮询。如果组中有不可靠的灯泡有时不响应，请禁用此功能，以便 UI 反映实际状态而不是假设状态。默认值：`on`。”
考虑在以下情况后主电源供电设备不可用：
  描述：“经过一段时间（以秒为单位），没有活动的主电源供电设备将被视为不可用。设置为 `0` 以禁用。如果您希望在插头或灯泡断电时更快地进行检测，请降低此值（例如，设置为 `3600`（1 小时））。默认值：`7200`（2 小时）。”
考虑电池供电设备在以下情况后不可用：
  描述：“经过一段时间（以秒为单位），没有活动的电池供电设备被视为不可用。设置为 `0` 以禁用。对于仅在触发时报告的休眠传感器（例如门或温度传感器），请提高此值，以防止它们反复变得不可用。如果您希望在电池电量耗尽时更快收到通知，请将其降低。默认值：`21600`（6 小时）。”
启动时刷新主电源供电设备状态：
  描述：“当 ZHA 启动时，轮询主电源供电的设备以刷新其状态。如果您的网络很大并且启动轮询导致拥塞，或者您的设备在重新启动后重新连接速度很慢，请禁用此功能。默认值：`on`。”
```

###关于网络信息

网络信息页面提供有关 Zigbee 网络和协调器的详细信息。要打开它，请转至 [**Settings** > **Zigbee**](https://my.home-assistant.io/redirect/config_zha/) 并选择 **网络信息**。

显示以下信息：

- **通道**：网络当前使用的 Zigbee 通道。有效频道为 11–26（全部位于 2.4 GHz 频段）。这是您唯一可以更改的字段。要编辑它，请选择铅笔 `[mdi:edit]` 图标。
- **PAN ID**：Zigbee 网络的 16 位个人局域网标识符。该值唯一标识附近 Zigbee 网络中的网络。
- **扩展 PAN ID**：PAN ID 的 64 位扩展版本。该值用于唯一标识更长距离和更多设备的网络。
- **协调器 IEEE**：Zigbee 协调器的 IEEE 802.15.4 硬件地址（MAC 地址）。该地址对于协调器硬件来说是固定且唯一的。
- **无线电类型**：协调器使用的 Zigbee 无线电堆栈。常见值为 `ezsp` (Silicon Labs)、`znp` (Texas Instruments)、`deconz` (ConBee/RaspBee)、`zigate` 和 `xbee`。
- **串行端口**：协调器连接到的串行设备的路径，例如网络连接适配器的 `/dev/ttyUSB0` 或 `socket://` URL。
- **波特率**：串行连接的通信速度，以每秒位数为单位（例如，`115200`）。该字段仅在直接串行连接时显示，对于基于网络/套接字（以太网）适配器则隐藏。

### 定义要使用的 Zigbee 通道

:::important
最佳实践是**不要更改 ZHA 默认值的 Zigbee 通道**。

:::
B64PMTEXP64B
**在更改现有网络上的 Zigbee 通道之前**，请查看本页上的以下部分：

- [Best practices to avoid pairing/connection difficulties](#best-practices-to-avoid-pairingconnection-difficulties)
- [Zigbee interference avoidance and network range/coverage optimization](#zigbee-interference-avoidance-and-network-rangecoverage-optimization)

这些部分都提供了有关提高 Zigbee 网络性能的有用建议。

:::
#### 更改 Zigbee 通道

1. 转至 [**Settings** > **Zigbee**](https://my.home-assistant.io/redirect/config_zha/)。
2. 选择**网络信息**。
3. 要编辑 Zigbee 通道，请选择铅笔 `[mdi:edit]`。
4. 从下拉菜单中选择所需的 Zigbee 通道。- **智能**：扫描所有频道，然后选择最佳频道，优先选择 `15`、`20`、`25` 而非所有其他频道。
     - 这是一次性操作。如果检测到干扰，它不会连续监视信道并更改信道。
     - 这很可能是最好的选择。仅当您有特定原因时才更改它。

    ![Changing the Zigbee channel](/home-assistant/images/integrations/zha/zha-change-channel.png)

5. 要确认，请选择 **更改频道**。
6. 所有设备重新连接到新通道可能需要长达一个小时的时间。
   - 要检查状态，请查看 [visualization of the Zigbee network topology](#visualization-of-the-zigbee-network-topology-and-device-links)。
   - 要加快此过程，请重新启动 Zigbee 终端设备。

#### Zigbee 通道故障排除 {#zigbee-channel-troubleshooting}

除其他事项外，上述相关故障排除部分将告诉您，如果您遇到 Wi-Fi 和 Zigbee 之间频率重叠的问题，那么通常最好首先尝试在 Wi-Fi 路由器或所有 Wi-Fi 接入点上更改和设置静态 Wi-Fi 通道（而不是仅仅更改为另一个 Zigbee 通道）。

MetaGeek 支持有一篇关于 [Zigbee and WiFi coexistence](https://support.metageek.com/hc/en-us/articles/203845040-ZigBee-and-WiFi-Coexistence) 通道选择的很好的参考文章。

#### 关于 Zigbee 通道

Zigbee 规范标准将 2.4 GHz ISM 无线电频段划分为 16 个 Zigbee 通道（即 Zigbee 的不同无线电频率）。为了使所有 Zigbee 设备能够进行通信，它们必须支持在 Zigbee 协调器上设置的相同 Zigbee 通道（即 Zigbee 射频）作为用于其 Zigbee 网络的通道。并非所有 Zigbee 设备都支持所有 Zigbee 通道。通道支持通常取决于硬件和固件的寿命以及设备的额定功率。

一般建议仅使用通道 15、20 或 25，以避免与 Zigbee 设备的互操作性问题。不仅因为 Wi-Fi 网络对其他通道上的 Zigbee 网络产生过多干扰的可能性较小，而且还因为并非所有 Zigbee 设备都支持所有通道。

### 修改设备类型

由于并非所有设备制造商都遵循 Zigbee 标准，有时设备可能会被错误分类。例如，开关可以归类为灯。

要更正设备类型（也称为域），请将以下内容添加到 B64PNDI=P64B 并重新启动 Home Assistant：

B64元创方==P64B

`{ieee}` 是设备硬件地址，在查看_设备信息_时可以从 Home Assistant UI 读取。从设备信息中，您可以通过查看_Zigbee设备签名_找到`{endpoint_id}`。

### Zigbee 设备 OTA 固件更新 {#zigbee-device-firmware-ota-updates}

ZHA 集成能够执行 Zigbee 设备的 OTA（无线）固件更新。该功能默认启用。由于它在 Home Assistant 中使用标准 [Update](/home-assistant/integrations/update/) 实体，因此如果特定设备有可用的 OTA 固件更新，用户将收到 UI 通知，并可以选择启动更新或忽略该设备的特定更新。

要查看设备的 OTA 更新，该设备必须支持 OTA 更新，并且设备的固件映像必须由制造商公开提供。 ZHA 目前仅包括少数公开提供这些更新的制造商的 OTA 提供商。

**包括的制造商：**

- IKEA
- 伊诺维利
- 朗德万斯/欧司朗
- 索诺夫/iTead
- 第三现实

:::warning
在更新设备之前，您应该查找是否有任何缺点，或者是否需要安装可用的更新。某些固件更新可能会破坏您可能使用的功能（例如IKEA设备的组绑定）。某些更新可能还需要对 ZHA 进行更改。在极少数情况下，您甚至可以通过安装固件更新来使设备变砖。

:::
#### 高级 OTA 配置

少数制造商默认启用 OTA，目前包括 Ledvance、Sonoff、Inovelli 和 ThirdReality。支持其他制造商，但默认情况下禁用，因为他们的更新可能会更改或删除设备功能，可能需要您重新配置设备，或者由社区贡献并且可能经过最低限度的测试。

有关其他 OTA 提供商的更多信息，请参阅 [zigpy documentation for OTA configuration](https://github.com/zigpy/zigpy/wiki/OTA-Configuration)。

## 添加设备

:::tip
添加设备时，请查看此页面上的以下部分：

- [Best practices to avoid pairing/connection difficulties](#best-practices-to-avoid-pairingconnection-difficulties)
- [Zigbee interference avoidance and network range/coverage optimization](#zigbee-interference-avoidance-and-network-rangecoverage-optimization)

这些部分都提供了有关提高 Zigbee 网络性能的有用建议。

:::
**添加新的 Zigbee 设备：**

1. 转至 [**Settings** > **Zigbee**](https://my.home-assistant.io/redirect/config_zha/)。
2.要开始扫描新设备，请在屏幕右下角选择“**添加设备**”。
3. 根据制造商提供的设备说明将 Zigbee 设备重置为出厂默认设置（例如，打开/关闭灯最多 10 次；开关通常具有重置按钮/引脚）。设备可能需要几秒钟的时间才会出现。您可以单击 **显示日志** 以获取更详细的输出。
4. 找到设备后，它将出现在该页面上，并自动添加到您的设备中。您可以选择更改其名称并将其添加到区域（您可以稍后更改）。您可以再次搜索以添加其他设备，也可以返回到已添加的设备列表。

### 使用路由器设备添加更多设备

大多数市电供电设备（例如 Zigbee 网络中的许多始终供电的墙壁插头或灯泡）将自动充当 Zigbee 路由器设备（有时也称为 Zigbee“信号中继器”或“范围扩展器”）。

由于 Zigbee 应使用 [wireless mesh network](https://en.wikipedia.org/wiki/Wireless_mesh_network) 才能发挥作用，因此您需要添加 Zigbee 路由器设备以增加 Zigbee 网络中可使用的 Zigbee 设备的数量，包括可添加的设备总数以及网络的总范围和覆盖范围。一些 Zigbee 路由器设备在路由和转发 Zigbee 信号和消息方面比其他一些设备做得更好。您的设置不应让 Zigbee 路由器设备（例如灯泡）经常关闭。  Zigbee 路由器设备应始终可用。

所有 Zigbee 协调器固件都只允许您直接连接一定数量的设备。设置该限制有两个原因：首先，不要使 Zigbee 协调器过载，其次，鼓励您的 Zigbee 网络快速开始使用“[mesh networking](https://en.wikipedia.org/wiki/Mesh_networking)”拓扑，而不仅仅是“[star network](https://en.wikipedia.org/wiki/Star_network)”拓扑。

Zigbee 网络上可以拥有的 Zigbee 设备总数取决于几个因素。 Zigbee 协调器硬件及其固件仅在具有大量设备的 Zigbee 网络中发挥更大的作用。更重要的是直接连接的设备（“直接子设备”）的数量与连接到 Zigbee 协调器的路由器的数量。 ZHA integration 所依赖的 Zigpy 库的上限为 32 个直接子级，但您仍然可以通过 Zigbee 路由器设备通过路由间接连接总共数百个 Zigbee 设备。

在此理论示例中，基于 CC2652 的 Zigbee 协调器具有三个 CC2530 Zigbee 路由器设备，总共限制为 77 个设备：

- 协调器：32 个 Zigbee 终端设备 - 3 个路由器 = 29
- 路由器一：+ 16 个设备
- 路由器二：+ 16 个设备
- 路由器三：+ 16 个设备
- 设备总数限制 = **77 台设备**

实际上，您可能需要添加比本示例更多的 Zigbee 路由器设备，才能扩展网络覆盖范围以覆盖那么多设备。

### 通过 USB 或 Zeroconf 发现

某些设备可以自动发现，这可以简化 ZHA 设置过程。以下设备已经过发现测试，并提供快速设置体验。

<details>
<summary>通过 USB 发现的设备</summary>


- **比特龙**
  - [Bitron Video/SMaBiT BV AV2010/10](https://manuals.smabit.eu/len/av2010_10.html)
    - 标识符：`10C4:8B34`
- **康蜂**
  - [ConBee II](https://phoscon.de/conbee2)
    - 标识符：`1CF1:0030`
  - [ConBee III](https://phoscon.de/conbee3)
    - 标识符：`0403:6015`
- **IT领导**
  - [ITead SONOFF Zigbee 3.0 USB Dongle Plus V2 Model "ZBDongle-E" (EFR32MG21 variant)](https://itead.cc/product/zigbee-3-0-usb-dongle/)
    - 标识符：`1A86:55D4`
  - [ITead SONOFF Zigbee 3.0 USB Dongle Plus Model "ZBDongle-P" (CC2652P variant)](https://itead.cc/product/sonoff-zigbee-3-0-usb-dongle-plus)
    - 标识符：`10C4:EA60`
- **诺泰克**
  - [Nortek HUSBZB-1](https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/)
    - 标识符：`10C4:8A2A`
- **slae.sh**
  - [slae.sh CC2652RB development stick](https://slae.sh/projects/cc2652/)
    - 标识符：`10C4:EA60`
- **小光**
  - [SMLIGHT SLZB-07](https://smlight.tech/product/slzb-07/)
    - 标识符：`10C4:EA60`
- **管**
  - [Tube’s EFR32 Pro Ethernet/Serial Coordinator](https://www.tubeszb.com/)
    - 标识符：`10C4:EA60`
- **ZigStar**
  - [ZigStar Stick (CC2652 + CH340B variant)](https://zig-star.com/projects/zigbee-stick-v4/)
    - 标识符：`1A86:7523`
  - [ZigStar Coordinators](https://zig-star.com/)
    - 标识符：`1A86:7523`


</details>

<details>
<summary>通过 Zeroconf 发现的设备</summary>


- **鳕鱼.m**
  - [cod.m Zigbee Coordinator](https://docs.codm.de/zigbee/coordinator/)
    - 标识符：`czc._tcp.local.`
- **小光**
  - [SMLIGHT SLZB-06 POE Zigbee LAN WiFi USB Adapter](https://smlight.tech/product/slzb-06/)
    - 标识符：`slzb-06.local.`
- **管**
  - [Tube's CC2652P2 USB-powered Zigbee to Ethernet Serial Coordinator](https://www.tubeszb.com/)
    - 标识符：`tube_zb_gw_cc2652p2.local.`
  - [Tube's CC2652P2 PoE-powered Zigbee to Ethernet Serial Coordinator](https://www.tubeszb.com/)
    - 标识符：`tube_zb_gw_cc2652p2_poe.local.`
  - [Tube's EFR32 Based Zigbee to Ethernet Serial Coordinator](https://www.tubeszb.com/)
    - 标识符：`tube_zb_gw_efr32.local.`
- **XZG**
  - [XZG - Universal Firmware for Zigbee Gateway](https://xzg.xyzroe.cc/)
    - 标识符：`xzg.local.`
- **ZigStar**
  - [ZigStar UZG Universal Zigbee Gateway (UZG-01)](https://uzg.zig-star.com)
    - 标识符：`uzg-01._tcp.local.`
  - [ZigStar LAN/POE Coordinators](https://zig-star.com/projects/zigbee-gw-lan/)
    - 标识符：`zigstargw.local.`


</details>

[Compatible hardware](#compatible-hardware) 部分中的其他设备可能是可发现的，但是上面仅列出了已确认可发现的设备。

## 行动

### 行动：许可`zha.permit` 操作打开网络以加入新设备。

要将新设备添加到网络，请单击 **开发人员工具** 中的 **操作** 选项卡，然后在 **操作** 下拉框中键入 `zha.permit`。接下来，按照设备说明进行添加、扫描或执行恢复出厂设置。

|数据|可选|描述 |
| ---------- | -------- | ------------------------------------------------------------------------------------------ |
| `duration` | `duration` |是的 |允许新设备加入的时间，默认60s |
| `ieee` | `ieee` |是的 |现有设备的 IEEE 地址，通过该地址添加新设备 |

要使用安装代码（ZB3 设备）加入新设备，请使用以下数据属性（必须仅使用参数
来自同一组：

|数据|参数组 |描述 |
| -------------- | ---------------- | ---------------------------------------------------------------------------------- |
| `src_ieee` |安装代码 |加入 ZB3 设备的 IEEE 地址。与 `install_code` 一起使用 |
| `install_code` | `install_code` |安装代码 |安装加入设备的代码。与 `src_ieee` 一起使用 |
| `qr_code` | `qr_code` |二维码 |包含加入 ZB3 设备的 IEEE 和安装代码的二维码 |

:::note
目前 `qr_code` 支持以下二维码安装代码：
    - 阿卡拉
    - 博世
    - 意识
    - 照亮

:::
### 操作：删除

`zha.remove` 操作从网络中删除现有设备。您可以在 Zigbee 设备的设备卡上找到设备的 IEEE 地址。 IEEE 地址数据参数格式的示例是 `00:0d::6f:00:05:7d:2d:34`。

|数据|可选|描述 |
| ------ | -------- | ------------------------------------------------ |
| `ieee` | `ieee` |没有|要删除的设备的 IEEE 地址 |

### 操作：设置锁定用户代码

`zha.set_lock_user_code` 操作在 Zigbee 锁上设置锁定代码。

|数据|可选|描述 |
| ----------- | -------- | -------------------------------------------------------------------------------------- |
| `code_slot` | `code_slot` |没有|哪个锁码槽存放密码。例如。 1-32 适用于 Kwikset 954 |
| `user_code` | `user_code` |没有|在锁上设置的代码。例如。 Kwikset 接受长度为 4-8 位的数字 |

### 操作：清除锁定用户代码

`zha.clear_lock_user_code` 操作清除 Zigbee 锁的锁定代码。

|数据|可选|描述 |
| ----------- | -------- | -------------------------------------- |
| `code_slot` | `code_slot` |没有|清除哪个锁码槽 |

### 操作：启用锁定用户代码

`zha.enable_lock_user_code` 操作启用 Zigbee 锁上的锁码。

|数据|可选|描述 |
| ----------- | -------- | ------------------------------------------ |
| `code_slot` | `code_slot` |没有|启用哪个锁码槽 |

### 操作：禁用锁定用户代码

`zha.disable_lock_user_code` 操作禁用 Zigbee 锁上的锁定代码。

|数据|可选|描述 |
| ----------- | -------- | ------------------------------------------- |
| `code_slot` | `code_slot` |没有|禁用哪个锁码槽 |

## Zigbee 分组与设备绑定 {#zigbee-groups-and-binding-devices}

ZHA 支持创建 Zigbee 组（与 Home Assistant 的 [Group](/home-assistant/integrations/group/) 集成不同），以及设备之间的绑定。组和设备绑定可以彼此独立设置，但也可以组合使用（例如将一个设备绑定到另一组设备）。

### 团体

Zigbee 组是两个或多个 Zigbee 灯、开关或风扇的集合。然后可以仅使用一个命令/实体来控制 Zigbee 组。

:::note
虽然使用本机 Zigbee 组而不是 Home Assistant 的 [Group](/home-assistant/integrations/group/) 集成可以提高视觉响应能力，但如果重复发出，发出的广播命令可能会淹没 Zigbee 网络。

:::
#### 创建 Zigbee 组

1. 转至 [**Settings** > **Zigbee**](https://my.home-assistant.io/redirect/config_zha/)。
2. 选择 **组** 并选择 **创建组** 按钮。
3. 输入组的名称。
4. 选择要包含在组中的设备：
    - 在创建组实体之前，必须至少将两个设备添加到 Zigbee 组。
    - 该组应由相同设备类型的产品组成（所有灯、所有开关或所有风扇）。
5.要确认，请选择“**创建组**”。
   - 您现在可以使用单个命令或实体控制组中的所有设备。例如，您可以向仪表板添加一个开关来打开/关闭组中的所有灯。

### 绑定

绑定 Zigbee 设备将一个设备的端点附加到另一设备（或组）的端点。

绑定设备之间发送的命令绕过 ZHA（即使 ZHA 或 Home Assistant 未工作）并直接控制目标设备。绑定设备还可以实现更快的响应时间和更流畅的控制。

绑定设备前，请注意以下事项：

- ZHA 默认将遥控器绑定到 Zigbee 协调器，以便将点击事件转发到 Home Assistant。
- 部分遥控器只能绑定单个目标；您可能需要先将遥控器与协调器解除绑定，然后再将其绑定到另一个目标。
- 所有遥控器对于可以绑定的设备数量都有一定的上限。
- 并非所有设备都支持绑定，有的只支持绑定组，有的只支持设备；请参阅设备制造商或社区的文档来确认功能。

#### 管理 Zigbee 设备的绑定

:::note
**本节仅概述如何管理一般绑定。它不会涵盖所有用例。**

先决条件和步骤可能会有所不同，具体取决于设备类型、制造商和您所需的最终结果。

:::
1. 转至 [**Settings** > **Zigbee**](https://my.home-assistant.io/redirect/config_zha/)。
2. 选择**设备**，然后选择您要管理绑定的设备。
3. 在 **重新配置** 按钮旁边的三点 `[mdi:dots-vertical]` 菜单中，选择 **管理 Zigbee 设备**。
4. 在弹出的对话框中，选择“**绑定**”选项卡。
5. 从 **可绑定设备**（或 **可绑定组**）列表中选择设备。
6. 如果遥控器是电池供电或低功耗的，请在发送命令之前按下按钮将其唤醒。
7. 确认**绑定**或**取消绑定**操作：
    - 要绑定设备，请选择**绑定**（或**绑定组**）。
    - 要取消绑定设备，请选择**取消绑定**（或**取消绑定组**）。

## 备份和迁移

ZHA integration 执行 Zigbee 网络的自动备份，允许您从备份恢复/恢复网络或迁移到不同的 Zigbee 协调器（无线电适配器）。

恢复 Home Assistant 备份后，您可以重新配置 ZHA 或迁移到新的 Zigbee 协调器，而不会丢失任何设置或已连接的设备。如果您当前的无线电出现故障或者您想要迁移到新的无线电适配器类型/型号，这会很有帮助。

还可以从 **网络设置** 下的配置页面创建手动备份。

### 迁移到 ZHA 内的新 Zigbee 适配器

ZHA 支持在基于 Silicon Labs、Texas Instruments 或 ConBee/RaspBee 芯片的不同 Zigbee 适配器之间迁移 Zigbee 网络（如果备份是从 ZHA 内部进行的）。

#### 先决条件

迁移前请确认您满足以下要求：

- 之前的适配器用于 ZHA integration，而不用于 deCONZ 或 Zigbee2MQTT。
- 无线电类型是以下之一：
  - ezsp _(Silicon Labs EmberZNet)_
  - znp _（德州仪器 Z-Stack ZNP）_
  - deCONZ _（德累斯顿电子公司的 ConBee/RaspBee）_
    - 确保它运行的是 [firmware 0x26700700 (from 2021-08-18)](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Firmware-Changelog) 或更高版本。

<details>
<summary>在 ZHA 中迁移到新的 Zigbee 适配器：</summary>


:::important
您将无法控制现有的 Zigbee 设备，直到它们在迁移后加入网络。 **这可能需要几分钟。**

如果某些现有设备在一段时间后没有恢复正常功能，请尝试重新启动它们以尝试重新加入网络。

:::
1. 转至 [**Settings** > **Zigbee**](https://my.home-assistant.io/redirect/config_zha/)。
2. 选择**迁移**。
3. 插入新的 Zigbee 适配器。
   - 尽量减少干扰：
     - 使用 USB 延长线。
     - 使用 USB 2.0 端口或供电的 USB 2.0 集线器。
     - 让 Zigbee 适配器远离 USB 3.0 设备。
     - [video](https://support.nabucasa.com/hc/articles/26124431414557) 显示了干扰的影响。
4. ZHA 重新配置开始。选择**提交**。
   - 将执行自动备份。
5. 在“**迁移或更改适配器设置**”下，选择“**迁移到新适配器**”。
6. 从串行端口列表中选择新的 Zigbee 适配器，然后选择 **提交**。
7. 选择用于迁移的备份：
   - **选项 1**：要使用在此迁移期间创建的备份，请选择 **自动迁移（推荐）**。
     - 这是完成迁移的最快方法。
   - **选项 2**：要恢复特定的较旧备份，请选择 **高级迁移**。- 这将让您选择您选择的备份。
8. 在极少数情况下，新无线电需要覆盖 IEEE 地址（唯一的 MAC 地址），您将看到 **覆盖无线电 IEEE 地址** 的提示。
   - 选中 **永久替换无线电 IEEE 地址** 框，然后单击 **提交**。
   - 要成功完成迁移过程，需要选择此选项。
   - 覆盖 IEEE 地址可能需要一段时间。
   - 新旧 Zigbee 适配器现在都具有相同的 Zigbee IEEE 地址。
   - 除非更改其 Zigbee IEEE 地址，否则不应在同一区域操作旧适配器。
   - 如果您不从旧的 Zigbee 适配器迁移 Zigbee IEEE 地址，则必须重新连接许多设备才能保持它们正常工作。
9. 迁移过程现已完成。
   - 旧适配器正在重置。
   - 对于 Z-Wave 和 Zigbee 组合适配器（例如 HUSBZB-1 适配器），仅重置 Zigbee 无线电部分。
   - **信息**：在设备重新加入网络之前，您将无法控制它们。
     - 通常，他们会在一小时内重新加入。
     - 您也许可以通过重新启动设备来加速该过程。
10. 现在您可以卸下旧的 Zigbee 适配器。


</details>

## 故障排除

:::note
为了帮助解决任何问题或兼容性问题，请通过调试日志将错误报告为问题。

:::
### 限制

ZHA 限制列表可能并不详尽。

<details>
<summary>ZHA 的限制列表：</summary>


**ZHA 仅支持将单个专用 Zigbee 协调器连接到单个 Zigbee 网络：**

- Zigbee 协调器不能已被任何其他应用程序连接或使用。
- 当前或之前连接到另一个 Zigbee 实施的设备需要重置为其出厂默认设置，然后才能与 ZHA 配对/加入。
- 有关重置步骤，请参阅每个设备制造商的文档。

**一台 Zigbee 设备只能连接到一个 Zigbee 协调器（只能连接一个 Zigbee 网关）：**

- 这是 Zigbee 协议规范中的限制，由 [CSA (Connectivity Standards Alliance)](https://csa-iot.org/all-solutions/zigbee/) 管理，适用于所有 Zigbee 实现而不仅仅是 ZHA 实现。

**支持通过 `zha.permit` 操作通过“安装代码”或“QR 代码”调试 Zigbee 3.0 设备：**

- 到目前为止，这仅针对 ZHA 中的“ezsp”（Silicon Labs EmberZNet）或“znp”（德州仪器）无线电类型实现。
- 其他无线电类型在各自的 [radio libraries for zigpy](https://github.com/zigpy/) 或制造商的固件命令/API 中缺少支持。

**ZHA 目前_不_支持只能使用的设备：**

- ZGP（“Zigbee 绿色能源”）配置文件：
  - 这用于一些无电池自供电或能量收集设备（例如Philips Hue Click、Philips Hue Tap 和一些“Friends of Hue”合作开关）。
- ZSE（“Zigbee 智能能源”）简介：
  - 这是由于“Zigbee SE”规范不是标准 Zigbee 3.0 规范的一部分，因此未在大多数常用 Zigbee 协调器无线电适配器和模块的 Zigbee 协议栈中实现。


</details>

### 了解支持哪些设备

Home Assistant 的 ZHA integration 支持 [CSA (Connectivity Standards Alliance, formerly the Zigbee Alliance)](https://csa-iot.org/all-solutions/zigbee/) 定义的所有标准 Zigbee 设备类型。

**因此，没有可与 ZHA integration 开箱即用的设备的官方兼容性列表。**

:::tip
查看 [blakadder's unofficial Zigbee Device Compatibility Repository](https://zigbee.blakadder.com)。

此非官方列表包含独立社区成员针对多种家庭自动化网关/网桥/集线器软件（包括 ZHA、Zigbee2MQTT 和 Tasmota/Zigbee2Tasmota 等开源 Zigbee 实现）的报告_（或特定于设备的配对技巧）_。

任何人都可以通过向网站提交设备兼容性信息来帮助维护该网站。

:::
并非所有硬件制造商都完全遵守该标准。这可以包括：

- 实现独特（但非标准）的功能，
- 未显示 Home Assistant integration 概述中的所有预期实体。
- 在 Home Assistant 中根本不显示任何实体。

开发人员（甚至高级用户）可以通过在自定义设备处理程序中添加转换/翻译代码来解决此类互操作性问题。有关详细信息，请参阅 [How to add support for new and unsupported devices](#how-to-add-support-for-new-and-unsupported-devices)。

:::note
**如果设备根本无法加入/配对**，请查看本页上的以下部分：

- [Best practices to avoid pairing/connection difficulties](#best-practices-to-avoid-pairingconnection-difficulties)
- [Zigbee interference avoidance and network range/coverage optimization](#zigbee-interference-avoidance-and-network-rangecoverage-optimization)

这些部分都提供了有关提高 Zigbee 网络性能的有用建议。

:::
### 如何添加对新设备和不受支持的设备的支持

如果您的 Zigbee 设备与 ZHA integration 成功配对/加入，但未显示所有预期实体：

1. 尝试多次重新配对/重新加入设备。
2. 查看故障排除部分。
3、在Home Assistant [community forum or Discord chat server](https://www.home-assistant.io/help/)中搜索类似情况。
4. 还没工作？您可能需要一个自定义设备处理程序。该处理程序将具有异常处理代码来解决特定于设备的问题。

#### ZHA 设备处理器 {#zha-device-handlers}
对于不遵循 CSA ZCL（Zigbee 集群库）中定义的标准的设备，ZHA integration 依赖于名为“[ZHA Device Handlers (also known as "zha-quirk")](https://github.com/zigpy/zha-device-handlers)”的项目。

该项目包含称为“quirks”的特定于设备的 Python 脚本，可以通过实现自定义 Zigbee 配置的动态转换或通过为特定设备实现制造商特定的功能来解决合规性和互操作性问题。

其他 Zigbee 网关解决方案具有类似的概念，即为非标准设备使用自定义处理程序/转换器，例如使用 [zigbee-herdsman converters](https://www.zigbee2mqtt.io/advanced/support-new-devices/01_support_new_devices.html) 的 Zigbee2MQTT（和 IoBroker）。

如果您不想自己创建“怪癖”，则可以将“设备支持请求”作为新问题提交给 [ZHA Device Handlers project repository on GitHub](https://github.com/zigpy/zha-device-handlers/issues)。

<details>
<summary>提交新的设备支持请求：</summary>


:::note
如果没有设备支持请求，志愿者开发人员社区可能不会意识到您的特定 Zigbee 设备无法在 ZHA 中正常工作。

请注意，该项目依赖于志愿者；提交新设备支持请求并不能保证有人会为 ZHA 开发自定义怪癖。 


:::
1.登录GitHub.com（需要有账号）
2. 转到[ZHA Device Handlers project issues page](https://github.com/zigpy/zha-device-handlers/issues)
3. 选择 **新问题** 并按照说明进行操作。
    - 新设备支持请求需要设备签名+诊断信息。
    - 您可能还需要积极帮助进一步测试或向志愿开发人员提供更多信息。


</details>


### 避免配对/连接困难的最佳实践

如果您在配对设备时遇到问题，请验证您是否遵循最佳实践以避免配对/连接问题：

1、减少网络干扰：
    - 检查您的设置和环境是否已优化以避免干扰。
    - 避免干扰本身就是一个极其重要的话题。查看下面单独部分中有关 Zigbee 干扰避免和网络范围/覆盖范围优化的提示。
2. 加强你的网络：
    - 检查您是否有足够的 Zigbee 路由器设备（Zigbee 信号中继器或范围扩展器）。
    - 如果没有，您应该添加额外的电源供电设备作为 Zigbee 路由器。
    - 在添加电池供电的设备之前，首先尝试使用主电源供电的设备。 
      -“弱”Zigbee 网络网格可能会阻止某些设备配对（例如距离 Zigbee 路由器或协调器太远的设备）。 
    - 还需要 Zigbee 路由器设备来增加可连接到 Zigbee 网状网络的设备数量上限。
    - 某些 Zigbee 设备不完全兼容所有品牌的 Zigbee 路由器设备。 
      - 已知Xiaomi/Aqara 设备无法与 Centralite、General Electrics、Iris、Ledvance/OSRAM、LIGHTIFY/Sylvania、Orvibo、PEQ、Securifi 和 SmartThings/Samsung 的 Zigbee 路由器设备配合使用。 
    - 使用市电供电设备 IKEA 和 Nue/3A Home 或基于 Texas Instruments CC253x/CC26x2 和 XBee 系列 2/3 Zigbee 无线电的专用 DIY 路由设备通常可以获得更好的结果。
3. 规划您的配对：
    - 尝试在您打算使用 Zigbee 设备的地方进行配对：
      - 如果您打算以后移动 Zigbee 协调器的位置，请避免在 Zigbee 协调器旁边配对。
      - 将协调器旁边的设备配对并稍后移动可能会导致连接性能下降。
    - 如果您要添加的设备之前已与另一个网络配对，您可能需要手动将设备恢复出厂设置才能添加/配对。
    - 已知某些电池供电的 Zigbee 设备如果电池电压较低，会出现配对问题。
      - 有些人报告更换新收到的Xiaomi/Aqara 设备上的电池解决了配对问题。
4.要有耐心：
    - 某些 Zigbee 设备的配对可能需要多次或重复尝试。- 某些设备（例如Xiaomi/Aqara 的设备）可能不完全符合 Zigbee 标准，因此可能需要 10-20 分钟或更长时间的多次配对尝试。

### Zigbee 干扰规避与网络覆盖优化 {#zigbee-interference-avoidance-and-network-rangecoverage-optimization}

无线电干扰源可能会导致连接问题、发送和接收 Zigbee 消息/信号的错误以及性能的显着下降。实施一些良好的做法可以作为实现更好的信号质量和接收、改善覆盖范围和扩大范围的起点。

了解低功耗/低带宽 2.4 GHz 数字无线电的已知限制非常重要，以避免因 Zigbee 无线电适配器或设备的干扰或放置不当而导致问题。

所有电气设备/电器，尤其是计算机和计算机外围设备，都会产生 EMI/EMF/RMI（引起 [electromagnetic interference](https://en.wikipedia.org/wiki/Electromagnetic_interference) 的电磁场）。这通常称为“射频干扰”或“信号噪声”，它会干扰 2.4 GHz 无线电的信号传输。它可能会部分降低甚至完全干扰 Zigbee 适配器和设备之间的无线通信。

现实世界的干扰源示例包括：

- 来自 USB 3.x 端口的信号噪声， 
- 非屏蔽 USB 3.x 设备，
- 非屏蔽 USB 3.x 外围电缆 
    - 众所周知，这些会影响低功率/低带宽设备的 2.4 GHz 无线电接收。
    - 您应始终将 Zigbee 适配器放置在远离任何潜在 EMI/EMI/RMI 源的位置，最好使用足够长的屏蔽 USB 延长线连接到 USB 2.0 端口。

Zigbee 依赖于 [mesh networking](https://en.wikipedia.org/wiki/Mesh_networking) 的概念，大多数主电源供电设备都是“Zigbee 路由器”，充当信号中继器和范围扩展器。总的来说，它们通过中间设备的 Zigbee 网络网格传递数据消息来长距离传输数据，以到达更远的 Zigbee 设备。 

:::tip
要拥有一个健康的 Zigbee 网络，您需要许多彼此相对靠近的 Zigbee 路由器设备，以实现良好的覆盖范围和范围。

:::
#### 优化 Zigbee 协调器无线电硬件的操作

性能不可靠的常见根本原因通常是过时的 Zigbee 协调器无线电适配器硬件，受到过时芯片、不良天线设计或旧/有缺陷的固件的限制。您可以通过使用良好的 Zigbee 协调器无线电适配器并对其进行维护来改进大多数 Zigbee 设置。

- 购买并使用基于更新/现代芯片硬件的受支持的 Zigbee 协调器 USB 适配器。
  - 考虑使用带有外部天线的 Zigbee 协调器 USB 适配器，以获得更大的灵活性。

- 在现有无线电适配器上更新到更高版本的 Zigbee 协调器固件。
  - 大多数制造商通常提供简单的固件更新指南。

- 尝试 Zigbee 协调器及其天线的不同物理放置和方向。
  - Zigbee 适配器的最佳放置位置是尽可能靠近房子的中间。
  - 尝试将 Zigbee 协调器放置在距离墙壁、天花板和地板一定距离的位置。
  - 尝试 Zigbee 协调器适配器或其天线的不同方向。

虽然使用较旧的 Zigbee 协调器无线电适配器硬件可能可行，但使用过时的硬件和/或旧固件可能会妨碍可靠的操作。如果设备出现问题，在进一步排除故障之前升级 Zigbee 协调器固件通常也是一个好主意。

#### 避免或解决 EMI/EMF/RMI 干扰的措施

由于所有 Zigbee 协调器无线电适配器对所有类型的 EMI/EMF/RMI 都非常敏感/敏感，因此您应该始终尝试优化 Zigbee 协调器的放置并避免已知的干扰源。

- 使用长 USB 延长线并将 Zigbee 协调器放置在远离干扰和障碍物的地方。
  - 确保 USB 延长线有足够的屏蔽（较粗的电缆通常具有更好的屏蔽）。
  - 将 Zigbee 协调器放置在远离电线/电缆、电源和家用电器的地方。
  - 延长线还可以更轻松地尝试适配器/天线的不同方向。

- 避免使用 USB 3.0 端口/计算机/外围设备，因为它们是 RFI/EMI/EMF 干扰的已知罪魁祸首。 （参见参考号 [1](https://www.usb.org/sites/default/files/327216.pdf) 和 [2](https://www.unit3compliance.co.uk/2-4ghz-intra-system-or-self-platform-interference-demonstration/)）。
  - 确保仅将 Zigbee USB 适配器连接到 USB 2.0 端口（而不是 USB 3.x 端口）。
  - 如果计算机只有 USB 3。x 端口，然后购买 Zigbee 协调器并通过供电的 USB 2.0 集线器连接。

- 通过添加全金属外壳/机箱/外壳来屏蔽任何未屏蔽的计算机/外围设备/设备。
  - 对所有外部外围设备/设备使用屏蔽 USB 电缆，尤其是 USB 3.x 外围设备。
  - 请注意，金属外壳可能会降低内部/内置 Zigbee 协调器的性能。

- 避免使用 Wi-Fi 路由器和 Wi-Fi 接入点，或者更改 Wi-Fi 通道或 Zigbee 通道。
  - 将 Zigbee 协调器放置在远离任何 Wi-Fi 接入点和所有其他 WiFi 来源的地方。
  - Wi-Fi 频率范围可能与 Zigbee 重叠，请参阅上面有关定义 Zigbee 通道使用的部分。

### 通过 OTA 升级 Zigbee 设备固件时出现问题

在升级任何 OTA 固件之前，建议在设备中安装新电池。 OTA 固件更新非常耗电，某些设备在开始升级之前会检查最低电池电量。如果电池电量太低，这些设备可能会拒绝启动更新过程。但是，并非所有设备固件都包含此检查。

如果 Zigbee 终端设备（即电池供电产品）上没有启动 Zigbee 固件升级，请注意，您通常需要“唤醒设备”（例如触发状态更改或按下按钮（如果可用）），以便设备唤醒并能够接收启动 OTA 升级的命令。原因是电池供电的产品被称为“休眠设备”，因此它们通常处于休眠状态，并且仅在设备状态改变时才接收命令。

如果升级仍然无法开始，请尝试通过断开电源/电池几秒钟来手动重新启动设备，然后重试；然后再次确保在发送更新请求之前通过触发状态更改或按下设备上的按钮来激活设备。有时，通过重复按下按钮或触发状态更改，直到您在用户界面中看到第一条“正在更新...”消息，尝试保持设备唤醒也有帮助。

请注意，每个设备的 Zigbee 设备的 OTAU（空中升级）通常需要大约 10 分钟，如果需要更长的时间，则 Zigbee 固件升级无法启动、花费很长时间甚至失败的另一个常见原因是接收不良或没有稳定的 Zigbee 网络网格。采取行动尝试优化您的 Zigbee 网络，避免射频干扰并添加许多 Zigbee 路由器设备（中继器/扩展器）以扩展范围和覆盖范围。尝试遵循故障排除下的 [Zigbee interference avoidance and network range/coverage optimization)](#zigbee-interference-avoidance-and-network-rangecoverage-optimization) 部分中的所有最佳实践提示。

### Zigbee 网络拓扑与设备链路可视化 {#visualization-of-the-zigbee-network-topology-and-device-links}

要可视化 Zigbee 网络拓扑中的设备链接，请转至 [**Settings** > **Zigbee**](https://my.home-assistant.io/redirect/config_zha/) 并选择 **显示地图**。

网络可视化可以帮助识别连接较差的设备（即链路上的值较低）。您需要查看 ZHA 日志以查找故障排除所需的更多详细信息。

该可视化显示配对设备之间的多跳连接及其报告的接收信号强度指示器 (RSSI) 和链路质量指示 (LQI) 的累积值。

报告这些值的确切方法取决于每个设备上使用的 Zigbee 网络堆栈。当消息通过网状网络矩阵传播时，LQI 值可以在每一步进行修改。

#### 为什么 Zigbee 网络拓扑图中缺少某些链路

Zigbee 网络可视化图中 Zigbee 终端设备（通常是电池供电设备）之间的链接缺失很常见。如果设备仍在报告状态更改，那么它们通常不是设备故障的迹象。这种情况发生在休眠的 Zigbee 终端设备上，并不意味着该设备不再连接。

某些终端设备（例如Xiaomi门传感器）会长时间休眠，导致父 Zigbee 路由器通过称为路由器子老化的功能将它们从子表中删除。由于使用子老化并将其从子表中删除是 Zigbee 3.0 的一项功能，因此这种情况并不总是发生，因为并非所有 Zigbee 路由器设备都使用子老化。

这就是导致设备显示缺失链接的原因。即使设备不再位于子表中，终端设备仍然可以通过父 Zigbee 路由器进行通信。

#### 如何解释 RSSI 和 LQI 值解释 RSSI 和 LQI 值可能很复杂，因为网络健康状况和通信质量的指标是由设备本身提供的，并且每个设备可以通过不同的方式获取结果。除非您自己是 Zigbee 专家或受到专家的指导，否则请忽略这些值。它们可能会产生误导。 

:::note
重要的是不要自行判断 RSSI 或 LQI 值。在对被丢弃的 Zigbee 消息进行故障排除时，您必须解释 RSSI 和 LQI 的组合。

:::
<details>
<summary>关于 RSSI（接收信号强度指示）</summary>

RSSI（接收信号强度指示器）值是两个设备之间的原始信号强度的指示器值。 

RSSI 值是负数，采用 -dBm 格式，范围为 0 到 -100 功率比（以 1 毫瓦为参考的测量功率的分贝）。较低的负值表示干扰较少且信号良好。 

该值是端点设备和来自该设备的第一跳之间的测量值。它可能不一定向 Zigbee 协调器显示信号强度，但可能向最近的 Zigbee 路由器设备显示信号强度。

一般来说：
- 值 -60 及以上（即 -50、-40 等）表示信号较强且丢失消息的风险非常低。
- -80 及以下的值（即 -85、-90 等）表示环境“嘈杂”，您可能会面临丢失消息的风险。


</details>

<details>
<summary>关于 LQI（链路质量指标）</summary>


LQI（链路质量指数）值在刻度上显示为正数，但对于 Zigbee 来说很难解释，并且不像用于故障排除的单独指标那么有用。 

这是由于 Zigbee 和 IEEE 802.15.4 规范未标准化如何执行 LQI 测量。 Zigbee 设备提供的 LQI 值并不是使用所有设备制造商和 Zigbee 堆栈的统一标准来测量的，并且 LQI 通常只是最后一跳链路质量的度量，这并不总是有用的信息。

理论上，LQI 值越高越好，LQI 值越低越差。根据您的设备，这可能并不总是反映现实。一个好的做法是仅将 LQI 与其他类型的指标或数据点一起包含在内，而不是作为独立指标。

特定于供应商的示例：

- 基于 Silicon Labs EmberZNet 堆栈的 Zigbee 设备使用正数显示 LQI，其中值越高越好，值越低越差。 
- Texas Instruments Z-Stack 根据原始接收信号强度指数 (RSSI) 计算每个接收数据包的 LQI，方法是在无线电定义的最小和最大 RF 功率级别之间进行线性缩放，实际上提供基于接收信号强度的 LQI 值。 
  - 如果您处于同一频率范围内存在干扰的嘈杂环境中，这可能会产生误导，因为即使真实的链路质量下降，RSSI 值也可能显示为增加。
- 其他制造商和 Zigbee 堆栈以另一种方式测量和计算 LQI 值。


</details>
 
### 报告问题

有关报告问题的地点和方式的更多详细信息，请参阅 [Reporting issues page](/home-assistant/help/reporting_issues/)。

在问题跟踪器上报告与 ZHA 集成相关的潜在错误时，除了标准问题模板要求的信息之外，请始终提供以下 ZHA/Zigbee 特定信息：

1. 问题的调试日志，请参阅 [debug logging](#debug-logging)。
2. 所使用的 Zigbee 无线电（Zigbee 协调器适配器）的确切型号和固件。
3. 如果问题与特定 Zigbee 设备相关，请提供 **Zigbee 设备签名** 和 **诊断** 信息。
     - 转至 [**Settings** > **Zigbee**](https://my.home-assistant.io/redirect/config_zha/)。
        1. 选择 **设备**，然后从列表中选择您的设备。
        2. 在 **重新配置** 按钮旁边的三点 `[mdi:dots-vertical]` 菜单中，选择 **下载诊断**。
        3. 在 **重新配置** 按钮旁边的三点 `[mdi:dots-vertical]` 菜单中，选择 **管理 Zigbee 设备**。
        4. 打开**签名**选项卡并复制签名。

:::tip
要进行故障排除，请阅读本页的以下部分。它们提供有关提高 Zigbee 网络性能的信息。

- [Best practices to avoid pairing/connection difficulties](#best-practices-to-avoid-pairingconnection-difficulties)
- [Zigbee interference avoidance and network range/coverage optimization](#zigbee-interference-avoidance-and-network-rangecoverage-optimization)

:::
### 调试日志记录

要启用 ZHA integration 和无线电库的调试日志记录，请将以下 [logger](/home-assistant/integrations/logger/) 配置添加到 B64PODc=P64B：

```yaml
logger:
  default: info
  logs:
    homeassistant.core: debug
    homeassistant.components.zha: debug
    bellows.zigbee.application: debug
    bellows.ezsp: debug
    zigpy: debug
    zigpy_deconz.zigbee.application: debug
    zigpy_deconz.api: debug
    zigpy_xbee.zigbee.application: debug
    zigpy_xbee.api: debug
    zigpy_zigate: debug
    zigpy_znp: debug
    zhaquirks: debug
```

### 添加之前已添加到另一个桥的 Philips Hue 灯泡在 ZHA 中搜索以添加 Zigbee 设备时，之前已与另一个网桥/网关配对的 Philips Hue 灯泡将不会显示。 **灯泡必须恢复至出厂默认设置**。

:::important
**您必须将设备恢复出厂设置。**

- 简单地从旧桥/网关中“删除”它们是不够的。
- 使用此方法时，请确保附近没有其他刚刚打开电源的 Hue 灯泡，否则您将面临在此过程中重置它们的风险。


:::
可以使用以下重置方法（取决于灯泡版本）：

- **Zigbee 遥控器：**
  - 下面概述了 _Philips Hue 调光器开关_ 或 _Lutron Connected Bulb Remote_ 的步骤。
  - 遥控器不必与您之前的桥配对。
- **通过 Android 应用程序蓝牙：**
  - 较新的Philips Hue 灯泡可以使用官方 Android 应用程序通过蓝牙重置。
  - 即使灯泡已经与桥接器配对，这也是一个选项。
- **Hue Thief 命令行工具**：
  - 高级用户可以使用名为 [Hue Thief](https://github.com/vanviegen/hue-thief/) 的第三方工具。
  - 这需要基于 EZSP 的 Zigbee USB 记忆棒。

#### 使用 Zigbee 遥控器恢复出厂设置

各代遥控器的图标或按钮名称可能有所不同。用于重置的遥控器不必与您之前的桥配对。

<details>
<summary>使用遥控器重置：</summary>


1. 确定稍后将使用哪些按钮来执行重置（根据遥控器品牌）：
   - **Philips Hue 调光开关**：
     - 使用 **(I)/(ON)** 和 **(O)/(OFF)** 按钮。
     - 按钮标签或图标可能因 Hue 遥控器的代次而异。
   - **路创连接灯泡遥控器：**
     - 使用 **第二个（向上箭头）** 和 **第四个（指示灯关闭）** 按钮。
2. 打开要重置的 Hue 灯泡。
   - **重要的是灯泡_刚刚_通电。**
3. 将遥控器靠近灯泡，距离小于 10 厘米（约 4 英寸）。
4. 按住第一步中标识的两个按钮，并在灯泡开始闪烁后继续按住它们。
   - 当灯泡闪烁时，预计再按住按钮约 10 秒钟。
   - **路创连接灯泡遥控器：** 遥控器上的绿色 LED 也应开始缓慢闪烁。
5. 灯泡关闭后松开两个按钮。
   - **路创连接灯泡遥控器：** 当遥控器上的绿色 LED 停止闪烁后，您可以松开按钮。
6. 灯泡将立即重新亮起，表示恢复出厂设置已完成。
   - 按照 [adding devices](#adding-devices) 的正常步骤，灯泡现已准备好与 ZHA 配对。

:::tip
Philips Hue 调光器开关遥控器左上方的绿灯表示您的灯泡已成功重置为出厂默认设置。

:::

</details>

如果您无法使用上述方法重置灯泡，请将其从 Hue Bridge 中取出（如果 Hue Bridge 重新发现了它），然后重试该过程。

### ZHA 与 Home Assistant 容器启动问题 {#zha-home-assistant-or-home-assistant-container-startup-issues}

在 Linux 主机上，ZHA 在 HA 启动或重新启动期间可能无法启动，因为主机的调制解调器管理器服务正在声明 Zigbee USB 设备。要解决此问题，请禁用主机系统上的调制解调器管理器。

要从 Debian/Ubuntu 主机删除调制解调器管理器，请运行以下命令：

```bash
sudo apt-get purge modemmanager
```

### 无法连接到 USB 设备并使用 Docker

如果您使用 Docker 并且无法连接，您很可能需要将设备从主机转发到 Docker 实例。这可以通过将设备映射添加到启动字符串的末尾或最好使用 Docker compose 来实现。

#### Docker Compose {#docker-compose}

为您的平台安装 Docker-Compose (Linux - `sudo apt-get install docker-compose`)。

使用以下数据创建 `docker-compose.yml`：

```yaml
version: '2'
services:
  homeassistant:
    # customizable name
    container_name: home-assistant

    # must be image for your platform, this is the rpi3 variant
    image: homeassistant/raspberrypi3-homeassistant
    volumes:
      - <DIRECTORY HOLDING HOME ASSISTANT CONFIG FILES>:/config
      - /etc/localtime:/etc/localtime:ro
    devices:
      # your usb device forwarding to the docker image
      - /dev/ttyUSB0:/dev/ttyUSB0
    restart: always
    network_mode: host
```

### EZSP 错误与其他日志信息 {#ezsp-errors-and-other-log-messages}

#### NCP 进入失败状态 {#ncp-entered-failed-state}

当您在正常操作期间在日志中看到 `NCP entered failed state. Requesting APP controller restart` 时，表示 ZHA 与 Silabs EmberZNet Zigbee 协调器的串行接口之间的通信中断。

Silicon Labs EmberZNet Zigbee 协调器适配器使用的 EZSP（EmberZNet 串行协议）接口需要与串行端口的稳定连接；因此，不建议使用 Wi-Fi、WAN、VPN 等连接。

### Zigbee 3.0 支持情况 {#zigbee-30-support}

某些协调器可能不支持支持 Zigbee 3.0 的固件，但它们仍然可以完全满足您的需求。

:::note
硬件制造商应该向他们提供此类固件。如果您的协调器附带较旧的固件版本，您可以手动升级固件。

:::
