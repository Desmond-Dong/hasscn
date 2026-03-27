---
title: Bluetooth
description: '蓝牙集成将检测附近的蓝牙设备。发现的设备将显示在配置面板集成页面的已发现部分。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Utility
ha_iot_class: Local Push
ha_release: 2022.8
ha_domain: bluetooth
ha_quality_scale: internal
ha_codeowners:
  - '@bdraco'
ha_integration_type: integration
ha_config_flow: true
ha_platforms:
  - diagnostics
related:
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /integrations/default_config/
    title: Default config
  - url: https://esphome.io/projects/?type=bluetooth
    title: Bluetooth proxy page
---
# Bluetooth

**蓝牙**集成将检测附近的蓝牙设备。发现的设备将显示在配置面板集成页面的已发现部分。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 开始之前

在许多情况下，使用 ESP32 蓝牙代理比直接连接适配器或卡是更好的方法，因为 Linux 内核更新之前曾破坏过蓝牙功能，而且蓝牙驱动对 Linux 上较新适配器的支持通常落后于其他操作系统。蓝牙代理对于虚拟化实例的用户尤其有用，因为 USB 直通可能会导致额外的问题。更多信息可在下面的远程适配器部分找到，或访问 ESPhome 的[蓝牙代理页面](https://esphome.io/projects/?type=bluetooth)。

假设蓝牙代理不适合您的使用场景。在使用本地适配器时，请考虑使用 Home Assistant 操作系统，因为它包含其他操作系统中未解决的蓝牙问题的补丁。

## 配置

虽然此集成是 [`default_config:`](/home-assistant/integrations/default_config/) 的一部分，用于启用蓝牙适配器的自动发现，但它只有在设置配置流程或手动添加到您的 "`configuration.yaml`" 文件后才会启用。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
bluetooth:
```

## Linux 系统要求

要在 Linux 系统上使蓝牙功能正常工作：

- Home Assistant 必须能够访问 [D-Bus](https://en.wikipedia.org/wiki/D-Bus) 套接字。
- 蓝牙适配器必须可被 D-Bus 访问，并运行 [BlueZ](http://www.bluez.org/) >= 5.43。强烈建议使用 BlueZ >= 5.63，因为旧版本已被报告不可靠。
- D-Bus 实现应该是 [dbus-broker](https://github.com/bus1/dbus-broker)。
- 主机系统应运行 Linux 内核 5.15.62 或更高版本。

### 按安装方法的附加要求

- Home Assistant 操作系统：升级到 Home Assistant OS 版本 9.0 或更高版本。所有蓝牙要求都会自动配置。
- Home Assistant 容器：主机系统必须运行 BlueZ，并且 D-Bus 套接字必须可从容器**内部**的 Home Assistant 访问。需要额外配置（见下文）。

### 容器的附加详情

<details>
<summary>蓝牙的容器配置</summary>


:::note
您只需要为 Home Assistant 容器安装执行这些配置步骤。Home Assistant 操作系统会自动处理所有蓝牙配置。

:::
Home Assistant 容器需要特定配置才能访问蓝牙适配器。

**所需权限：**

在容器配置中添加以下 Linux 权限以启用完整的蓝牙管理：

**Docker Compose:**
```yaml
cap_add:
  - NET_ADMIN
  - NET_RAW
volumes:
  - /run/dbus:/run/dbus:ro
```

**Docker run:**
```bash
docker run --cap-add=NET_ADMIN --cap-add=NET_RAW -v /run/dbus:/run/dbus:ro ...
```

**D-Bus 套接字：**

对于大多数系统，D-Bus 套接字位于 `/run/dbus`。您需要使该套接字在容器中可用，以便 Home Assistant 连接到 D-Bus 并访问蓝牙适配器。如果主机系统上的 D-Bus 套接字位于 `/var/run/dbus`，请改用 `-v /var/run/dbus:/run/dbus:ro`。

**缺少这些权限会发生什么：**

如果缺少 `NET_ADMIN` 和 `NET_RAW` 权限：
- 您的蓝牙将以降级模式运行，功能有限
- 自动适配器恢复不可用——当适配器停止响应时无法重置
- 连接参数和管理 API 命令将失败
- 原始广播数据将缺失，导致设备更新不可靠
- 日志中将出现错误："Missing required permissions for Bluetooth management"


</details>

<details>
<summary>从 dbus-daemon 切换到 dbus-broker</summary>


按照[说明](https://github.com/bus1/dbus-broker/wiki)切换到 dbus-broker。


</details>

<details>
<summary>安装 BlueZ</summary>


在基于 Debian 的主机系统上，`sudo apt-get -y install bluez` 命令将安装 BlueZ。


</details>

## 安装 USB 蓝牙适配器

某些系统可能没有蓝牙，需要 USB 适配器。首次安装适配器可能需要多次重启才能完全识别设备。

如果您遇到蓝牙连接不稳定，在蓝牙适配器和 Home Assistant 服务器之间安装一条短的 USB 延长线可能会提高可靠性。

对于开发和测试，此蓝牙集成的开发者主要使用 [Feasycom FSC-BP119](https://www.feasycom.com/datasheet/fsc-bp119.pdf) (CSR8510A10) 📶。

### 已知可工作的高性能适配器

#### 剑桥硅无线电 (CSR) 适配器

- ANNE PRO CSR 4.0 (CSR8510A10)
- Avantree BTDG-40S (CSR8510A10)
- DIGITUS DN-30210-1 (CSR8510A10)
- Enbiawit BT403 (CSR8510A10)
- Feasycom FSC-BP119 (CSR8510A10) 📶
- Gold Touch E-USB-BT4 (CSR8510A10)
- HIDEEZ BT0015-01 (CSR8510A10)
- Maxesla CSR 4.0 (CSR8510A10)
- Nuu You BT40 (CSR8510A10)
- ORICO BTA-403 (CSR8510A10)
- ORICO BTA-409 (CSR8510A10)
- Panda Wireless PBU40 (CSR8510A10)
- PlanexCOMM BT-Micro4 (CSR8510A10)
- QGOO BT-06A (CSR8510A10)
- ROCKETEK BT4Y (CSR8510A10)
- SABRENT BT-UB40 (CSR8510A10)
- Sena UD100-G03 (CSR8510A10) 📶
- StarTech USBBT1EDR4 (CSR8510A10)
- Techkey PBT06H (CSR8510A10)
- TRENDnet TBW-106UB (CSR8510A10)
- TRENDnet TBW-107UB (CSR8510A10)
- UGREEN CM109 (CSR8510A10)
- Warmstor WBT-AD01 (CSR8510A10)
- WAVLINK WL-BT4001 (CSR8510A10)

📶 表示外置天线

大多数这些适配器可以同时保持五 (5) 个连接。

这些适配器通常提供最快的连接时间，不需要额外的驱动程序或补丁文件。

#### 博通 (BCM) 适配器

:::warning
这些适配器可能需要 <a href="https://github.com/winterheart/broadcom-bt-firmware">https://github.com/winterheart/broadcom-bt-firmware</a> 提供的额外补丁文件才能稳定运行。
  
目前没有支持的方法在使用 Home Assistant 操作系统时安装这些补丁文件。

:::
<details>
<summary>博通 (BCM) 适配器</summary>

  
- ASUS USB-BT400 (BCM20702A0)
- Cable Matters 604002-BLK (BCM20702A0)
- GMYLE 3340 (BCM20702A0)
- IOGEAR GBU521W6 (BCM20702A0)
- INSIGNIA NS-PCY5BMA (BCM20702A0)
- Kinivo BTD-400 (BCM20702A0)
- LM Technologies LM506 (BCM20702A1)
- LM Technologies LM1010 (BCM20702A0) 📶
- Plugable USB-BT4LE (BCM20702A0)
- SoundBot SB342 (BCM20702A0)
- StarTech USBBT2EDR4 (BCM20702A0)
- Targus ACB10US1 (BCM20702A0)


</details>

📶 表示外置天线

大多数这些适配器可以同时保持七 (7) 个连接。

#### Cypress 适配器

- Raspberry Pi 3B+ (CYW43455)
- Raspberry Pi 4B (CYW43455)

这些适配器通过 UART 总线连接，可能会限制其性能。

#### 高性能判定方法

性能主要由芯片和适配器的 Linux 驱动程序组合决定。一些使用相同芯片的供应商性能不可接受，被列为不支持。

适配器要被标记为高性能，必须满足以下要求：

- 在约 1 秒或更短时间内建立连接
- 每秒至少处理一次来自设备的广播而不丢失数据
- 95% 的连接尝试在两次内成功
- 满足上述要求，使用 Home Assistant 2022.11.1 或更高版本以及 Home Assistant 操作系统 9.3 或更高版本
- 必须能够同时保持五 (5) 个连接

性能测试使用以下硬件：

- 在 BlueZ 缓存 GATT 服务后与 Nanoleaf A19 灯泡 NL45-0800 建立活动连接
- 来自 Oral-B iO 系列 8 的广播
- 仅外部适配器：运行 Home Assistant 操作系统 9.3 的 Home Assistant Blue，配有 USB 延长线。

### 已知可工作的适配器

:::note
已知可工作的适配器列出了不满足高性能要求但通常可以工作的适配器。这些适配器的性能差异很大，可能需要长达三十秒或更长时间才能建立连接。这些适配器也可能错过广播，如按钮按下或温度更新。

:::
#### Realtek RTL8761BU 适配器

:::warning
这些适配器没有复位引脚。当它们停止响应时，内核目前无法自动重置它们，可能需要物理拔出并重新插入才能恢复操作。

:::
<details>
<summary>Realtek RTL8761BU 适配器</summary>


- ASUS USB-BT500 (RTL8761BU)
- Avantree DG45 (RTL8761BU)
- COMCAST CF-B03 (RTL8761BU)
- COMCAST CF-B05 (RTL8761BU) 📶
- EDUP LOVE EP-B3536 (RTL8761BU) 📶
- ISEKIE KW-B3519 (RTL8761BU)
- Maxuni BT-501 (RTL8761BU)
- MPOW BH45A (RTL8761BU)
- Plugable USB-BT5 (RTL8761BU)
- StarTech USBA-BLUETOOTH-V5-C2 (RTL8761BU)
- SUMEE BT501 (RTL8761BU)
- UGREEN CM390 (RTL8761BU)
- XDO BT802 (RTL8761BU) 📶
- ZEXMTE BT-505 (RTL8761BU) 📶
- ZEXMTE BT-DG54 (RTL8761BU) 📶
- ZEXMTE Z01 (RTL8761BU) 📶
- ZETSAGE BH451A (RTL8761BU) 📶


</details>

📶 表示外置天线

### 不支持的适配器

<details>
<summary>不支持的适配器</summary>


- Alfa AWUS036EACS (RTL8821CU) - 频繁连接失败和掉线
- BASEUS BR8651A01 BA04 - 广播掉线
- Belkin F8T003 ver 2. - 设置和添加失败
- Bluegiga BLED112 - USB ID `2458:0001` 尚无可用的驱动程序
- EDIMAX EW-7611ULB (RTL8723BU) - 频繁连接失败和掉线
- EDUP EP-AC1661 (RTL8821CU) - 频繁连接失败和掉线
- eppfun AK3040G (ATS2851) - USB ID `10d7:b012` 尚无可用的驱动程序
- eppfun AK3040A (ATS2851) - USB ID `10d7:b012` 尚无可用的驱动程序
- KOAMTAC KBD 401G (CSR8510A10) - 适配器不稳定并掉线
- TRIPP-LITE CU885A/U261-001-BT4 (CSR8510A10) - 适配器不稳定并掉线
- QUMOX Bluetooth 5.0 (Barrot 8041A02) - 没有可工作的驱动程序
- UGREEEN CM591 (ATS2851) - USB ID `10d7:b012` 尚无可用的驱动程序
- UGREEEN CM749 (Barrot chipset) 📶 - USB ID `33fa:0010` 尚无可用的驱动程序
- tp-link UB400 (CSR4) - 有活动连接时频繁连接失败
- tp-link UB500 (RTL8761BU) - 有活动连接时频繁连接失败
- USB ID 为 `0a12:0001` 的 CSR 4.0 克隆版 - 不可恢复的驱动程序故障：这些克隆版插入时通常会在系统日志中显示类似 `CSR: Unbranded CSR clone detected; adding workarounds and force-suspending once...` 的消息。
  - 多个标记为 CSR 4.0 的无品牌适配器
  - 5 CORE CSR 4.0


</details>

📶 表示外置天线

## 多个适配器

蓝牙集成采用自动故障转移和连接路径逻辑来实现高可用性。

仅 Linux 系统支持多个本地蓝牙适配器。将适配器放置得相距足够远以减少干扰。

已知以下方法可以添加多个适配器：

- [远程适配器（蓝牙代理）](#远程适配器蓝牙代理)
- 长 USB 延长线
- USB-以太网扩展器
- [USB/IP](https://usbip.sourceforge.net/)

遵循[库作者最佳实践](https://developers.home-assistant.io/docs/bluetooth/?_highlight=Best+practices#best-practices-for-library-authors)的集成将自动通过信号最好的适配器连接，如果一个适配器不可用，则故障转移到活动适配器。

## 被动扫描

如果主机系统运行启用了实验功能的 BlueZ 5.63 或更高版本，可以在选项流程中为每个适配器启用 Linux 上的被动扫描。此功能在 Home Assistant 操作系统 9.4 及更高版本中可用。

许多集成需要主动扫描，在被动扫描时可能无法工作。

## 选项

1. 在 Home Assistant 中，前往 [**设置** > **蓝牙**](https://my.home-assistant.io/redirect/config_bluetooth/)。
2. 选择 **适配器**。
3. 在感兴趣的适配器上，选择齿轮图标 `[mdi:cog-outline]`，然后选择您的选项。
   - 并非所有适配器都有选项。如果您没有看到齿轮图标，说明您的适配器不支持选项。

## 远程适配器（蓝牙代理）

蓝牙集成支持从外部适配器接收不需要活动连接的设备和传感器的广播数据，以及建立活动连接。远程扫描器的数量仅受主机系统性能的限制。

在添加多个远程适配器以增加范围或可用连接槽时，请将它们分开足够远以避免相互干扰。

对于蓝牙代理的开发和测试，Home Assistant 蓝牙集成团队主要使用 [Olimex ESP32-POE-ISO-EA](https://www.olimex.com/Products/IoT/ESP32/ESP32-POE-ISO/open-source-hardware) 配合 [Olimex BOX-ESP32-POE-ISO-EA-F](https://www.olimex.com/Products/IoT/ESP32/BOX-ESP32-POE-ISO/)。这些设备与 [ESPHome 现成项目](https://esphome.io/projects/)兼容。

:::tip
- `-EA` 变体比标准非 `EA` 型号提供显著更好的射频性能。
- 如果 `ESP32-POE-ISO-EA` 缺货，`ESP32-POE-ISO-EA-IND` 是一个不错的替代品。
- `ESP32-POE-ISO-WROVER-EA` 型号**不推荐**，因为它使用不同的引脚配置，与 ESPHome 现成项目不兼容。

:::
支持以下远程适配器：

- [ESPHome](https://esphome.io/projects/?type=bluetooth)
  - 蓝牙广播监听：ESPHome ESP32 设备，固件 2022.8.2 或更高版本
  - 蓝牙广播捆绑：ESPHome ESP32 设备，固件 2023.6.0 或更高版本
  - 单个活动连接：ESPHome ESP32 设备，固件 2022.9.3 或更高版本
  - 多个活动连接：ESPHome ESP32 设备，固件 2022.11.0 或更高版本
- [Shelly](/home-assistant/integrations/shelly/)
  - 蓝牙广播监听：Shelly Gen2+ 设备
  - 蓝牙广播捆绑：Shelly Gen2+ 设备
  - 单个活动连接：不支持
  - 多个活动连接：不支持

蓝牙广播捆绑减少了 Home Assistant 和代理之间的流量，显著提高了性能，并减少了共享无线电的设备的蓝牙和 WiFi 竞争空中时间的情况。

## 故障排除

### 广播监视器

配置蓝牙后，[Bluetooth Advertisement Monitor](https://my.home-assistant.io/redirect/bluetooth_advertisement_monitor/) 将允许您查看范围内正在广播的设备。

### 连接监视器

配置蓝牙后，[Bluetooth Connection Monitor](https://my.home-assistant.io/redirect/bluetooth_connection_monitor/) 将允许您查看当前连接的设备。

### 改善连接时间

连接时间和性能因蓝牙适配器和干扰而异很大。

:::warning
当切换到性能更好的适配器时，请禁用旧的、性能较差的适配器。在建立连接时会考虑最佳信号和可用连接槽，性能将受限于信号最好的、性能最差的适配器到达远程设备的能力。

:::
以下适配器按性能从最佳到最差排列：

- 运行 ESPHome 2023.6.0 或更高版本并启用[被动扫描](https://esphome.io/components/esp32_ble_tracker/#configuration-variables)的[以太网连接蓝牙代理](#远程适配器蓝牙代理)
- 启用[被动扫描](#被动扫描)的 [USB 高性能适配器](#已知可工作的高性能适配器)
- 运行 ESPHome 2023.6.0 或更高版本并启用[被动扫描](https://esphome.io/components/esp32_ble_tracker/#configuration-variables)的 [Wi-Fi 连接蓝牙代理](#远程适配器蓝牙代理)
- 运行 ESPHome 2023.6.0 或更高版本并启用[主动扫描](https://esphome.io/components/esp32_ble_tracker/#configuration-variables)的[以太网连接蓝牙代理](#远程适配器蓝牙代理)
- 启用主动扫描的 [USB 高性能适配器](#已知可工作的高性能适配器)
- 运行 ESPHome 2023.6.0 或更高版本并启用[主动扫描](https://esphome.io/components/esp32_ble_tracker/#configuration-variables)的 [Wi-Fi 连接蓝牙代理](#远程适配器蓝牙代理)
- 启用[被动扫描](#被动扫描)的[板载高性能适配器](#cypress-based-adapters)
- 启用主动扫描的[板载高性能适配器](#cypress-based-adapters)
- 启用[被动扫描](#被动扫描)的[已知可工作的适配器](#已知可工作的适配器)
- 启用主动扫描的[已知可工作的适配器](#已知可工作的适配器)

### 需要独占使用蓝牙适配器的集成

虽然较新的集成可以共享蓝牙适配器，但一些旧集成需要独占使用适配器。启用此集成可能会阻止尚未更新使用新方法的集成正常工作。

删除此集成的配置条目将释放适配器的控制权，并允许另一个集成获得蓝牙适配器的独占使用权。如果您手动将 `bluetooth:` 添加到您的 "`configuration.yaml`"，您还必须删除它以防止配置被重新创建。如果您需要继续使用旧集成，请考虑在 Linux 系统上添加第二个蓝牙适配器，因为将来会有更多集成转而使用蓝牙集成。

### 蓝牙与其他设备的干扰

无线电干扰源可能导致传输/接收丢失或连接问题，并表现出诸如发送和接收蓝牙消息时出错/失败等症状，这可能导致性能显著下降。以下是一些基本但重要的提示，用于获得良好的设置起点，以实现更好的信号质量、覆盖范围和扩展范围。

遵循以下所有优化提示应该能显著改善蓝牙无线电适配器的接收。以下见解描述了如何解决低功耗 2.4 GHz 数字无线电的已知限制。它可以解决或避免许多由干扰或蓝牙无线电适配器或设备放置不当引起的已知问题。

计算机、外设和设备会产生[电磁干扰（也称为 EMI/EMI/RMI）](https://en.wikipedia.org/wiki/Electromagnetic_interference)，这可能会干扰 2.4 GHz 无线电频段频率上的信号传输，并降低与蓝牙适配器/设备的无线通信。

例如，未屏蔽的 USB 3 端口及其电缆是出了名的影响 2.4 GHz 无线电接收的因素。请使用足够屏蔽的长 USB 延长线将蓝牙适配器放置在尽可能远离任何潜在 EMI/EMI/RMI 源的地方。

#### 应该能改善大多数蓝牙设置的简单操作和常见的干扰原因

- 蓝牙适配器硬件：
  - 旧/过时的蓝牙适配器硬件或糟糕的蓝牙适配器天线导致性能不佳：
    - 购买并使用基于较新/现代芯片硬件的支持蓝牙 USB 适配器。
      - 考虑购买带有外置天线的蓝牙适配器。
      - 虽然旧适配器可能可以工作，但它们可能有陈旧的硬件或旧固件，无法可靠运行。
  - 蓝牙适配器上的蓝牙适配器固件差或过时：
    - 更新蓝牙适配器上的蓝牙芯片固件到最新版本。如果制造商或芯片制造商提供固件，更新通常很简单。
- 蓝牙适配器对 RFI 敏感，可能非常容易受到各种 EMI/EMF 干扰：
  - 蓝牙适配器放置不当或蓝牙适配器天线方向错误：
    - 使用长 USB 延长线将蓝牙适配器放置在远离干扰和障碍物的地方。
      - 确保 USB 延长线足够屏蔽（粗电缆通常有此功能）。
        - USB 延长线使蓝牙适配器/天线的方向更容易调整。
    - 尝试蓝牙适配器或其天线的不同物理位置和方向：
      - 蓝牙适配器的最佳位置是尽可能靠近房子的中央。
      - 尝试将蓝牙适配器放置在远离墙壁、天花板和地板的地方。
      - 尝试适配器外置天线的不同方向（或整个蓝牙适配器）。
  - USB 3.0 端口/计算机/外设是 RFI/EMI/EMF 干扰的已知原因。（参见参考 [1](https://www.usb.org/sites/default/files/327216.pdf) 和 [2](https://www.unit3compliance.co.uk/2-4ghz-intra-system-or-self-platform-interference-demonstration/)）。
    - 确保只将蓝牙 USB 适配器连接到 USB 2.0 端口（而不是 USB 3.x 端口）。
      - 如果您的计算机只有 USB 3.x 端口，则通过有源 USB 2.0 集线器连接适配器：
        - USB 2.0 集线器将把 USB 3.0 转换为 USB 2.0 端口，避免 USB 3.0 EMF。
          - 使用外部电源的 USB 2.0 集线器将确保满足电源要求。
    - 通过添加全金属外壳/底盘/机箱来屏蔽任何未屏蔽的计算机/外设/设备。
      - 单板计算机和 USB 3.x 硬盘驱动器是 EMF/EMI/RFI 的已知来源。
        - 请注意，金属外壳可能会降低内置/内置蓝牙适配器的性能。
      - 另外，请确保为任何此类外设/设备使用足够屏蔽的 USB 电缆。
  - 来自 Wi-Fi 路由器和 Wi-Fi 接入点或其他设备的 2.4 GHz RF 干扰 (RFI)：
    - 虽然蓝牙设计为与 Wi-Fi 共存，但其较强的信号可能会产生干扰。
      - 为了安全起见，请尝试将蓝牙适配器远离 Wi-Fi 接入点。
    - 将蓝牙适配器远离电线/电缆、电源和家用电器。

## 已发现的集成

以下集成会被蓝牙集成自动发现：

 - [Acaia](/home-assistant/integrations/acaia/)
 - [Airthings BLE](/home-assistant/integrations/airthings_ble/)
 - [Aranet](/home-assistant/integrations/aranet/)
 - [BlueMaestro](/home-assistant/integrations/bluemaestro/)
 - [BTHome](/home-assistant/integrations/bthome/)
 - [Dormakaba dKey](/home-assistant/integrations/dormakaba_dkey/)
 - [eQ-3 Bluetooth Smart Thermostats](/home-assistant/integrations/eq3btsmart/)
 - [EufyLife](/home-assistant/integrations/eufylife_ble/)
 - [Fjäråskupan](/home-assistant/integrations/fjaraskupan/)
 - [Gardena Bluetooth](/home-assistant/integrations/gardena_bluetooth/)
 - [Govee Bluetooth](/home-assistant/integrations/govee_ble/)
 - [HomeKit Device](/home-assistant/integrations/homekit_controller/)
 - [Husqvarna Automower BLE](/home-assistant/integrations/husqvarna_automower_ble/)
 - [iBeacon Tracker](/home-assistant/integrations/ibeacon/)
 - [IKEA Idasen Desk](/home-assistant/integrations/idasen_desk/)
 - [Improv via BLE](/home-assistant/integrations/improv_ble/)
 - [INKBIRD](/home-assistant/integrations/inkbird/)
 - [IronOS](/home-assistant/integrations/iron_os/)
 - [Kegtron](/home-assistant/integrations/kegtron/)
 - [Keymitt MicroBot Push](/home-assistant/integrations/keymitt_ble/)
 - [Kuler Sky](/home-assistant/integrations/kulersky/)
 - [La Marzocco](/home-assistant/integrations/lamarzocco/)
 - [LD2410 BLE](/home-assistant/integrations/ld2410_ble/)
 - [LED BLE](/home-assistant/integrations/led_ble/)
 - [Medcom Bluetooth](/home-assistant/integrations/medcom_ble/)
 - [Melnor Bluetooth](/home-assistant/integrations/melnor/)
 - [Moat](/home-assistant/integrations/moat/)
 - [Mopeka](/home-assistant/integrations/mopeka/)
 - [Motionblinds Bluetooth](/home-assistant/integrations/motionblinds_ble/)
 - [Oral-B](/home-assistant/integrations/oralb/)
 - [Probe Plus](/home-assistant/integrations/probe_plus/)
 - [Qingping](/home-assistant/integrations/qingping/)
 - [RAPT Bluetooth](/home-assistant/integrations/rapt_ble/)
 - [Ruuvi BLE](/home-assistant/integrations/ruuvitag_ble/)
 - [Sensirion BLE](/home-assistant/integrations/sensirion_ble/)
 - [SensorPro](/home-assistant/integrations/sensorpro/)
 - [SensorPush](/home-assistant/integrations/sensorpush/)
 - [Snooz](/home-assistant/integrations/snooz/)
 - [SwitchBot Bluetooth](/home-assistant/integrations/switchbot/)
 - [ThermoBeacon](/home-assistant/integrations/thermobeacon/)
 - [ThermoPro](/home-assistant/integrations/thermopro/)
 - [Tilt Hydrometer BLE](/home-assistant/integrations/tilt_ble/)
 - [Xiaomi BLE](/home-assistant/integrations/xiaomi_ble/)
 - [Yale Access Bluetooth](/home-assistant/integrations/yalexs_ble/)