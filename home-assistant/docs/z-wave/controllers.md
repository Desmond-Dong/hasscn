# Z-Wave 适配器

要在 Home Assistant 中使用 Z-Wave，您需要一个兼容的 Z-Wave 适配器。

## 推荐的 Z-Wave 适配器

The [Home Assistant Connect ZWA-2](/home-assistant/connect/zwa-2/) is an 800 series Z-Wave adapter specifically developed to work with Home Assistant.

## 其他受支持的 Z-Wave 适配器

本节列出了已确认可与 Z-Wave JS 搭配使用的设备。

如果您刚开始接触 Z-Wave，以下建议会很有帮助：

* Use an [800 series adapter](#800-series-usb-adapters) (with firmware updated to ≥ 7.23.2).
  * The 800 series adapters are the most future-proof and offer the best RF performance.
* Opt for a USB connection, not a module.
  * Passing a module through Docker is more complicated than passing a USB connector through.

### 800 系列 USB 适配器

在将 Z-Wave 800 系列适配器连接到 Home Assistant 之前，请确保适配器使用兼容的固件和 SDK 版本。某些 800 系列 Z-Wave 适配器存在缺陷，会影响网状网络的稳定性，甚至导致适配器无响应。

请将 800 系列适配器的固件升级到推荐版本。

* 由于目前没有已知完全修复问题的固件版本，建议按照以下标准选择固件：
  * prefer SDK versions 7.23.x and newer
  * SDK versions 7.22.x are okay
  * SDK versions 7.17.2 to 7.19.x are okay
  * avoid SDK versions before 7.17.2
  * avoid SDK versions 7.20 to 7.21.3

* **注意**：SDK 版本不必与固件版本一致。
  * 如果您不确定某个固件基于哪个 SDK 版本，请联系设备制造商。

#### 受支持的 800 系列适配器列表

如果使用上文提到的 SDK 和固件版本，以下 800 系列 USB 适配器已被报告可与 Home Assistant 一起使用。

* [Home Assistant Connect ZWA-2](/home-assistant/connect/zwa-2/) (officially recommended adapter)
* HomeSeer SmartStick G8
* Zooz 800 Series Z-Wave Long Range S2 Stick (ZST39 LR)

### 700 系列 USB 适配器

通常不建议使用 700 系列 USB 适配器。

在将 Z-Wave 700 系列适配器连接到 Home Assistant 之前，请确保适配器使用兼容的固件和 SDK 版本。某些 700 系列 Z-Wave 适配器存在缺陷，会影响网状网络的稳定性，甚至导致适配器无响应。

请将 700 系列适配器的固件升级到推荐版本：

* 由于目前没有已知完全修复问题的固件版本，建议按照以下标准选择固件：
  * prefer SDK versions 7.17.2 to 7.18.x or 7.21.6 and newer
  * SDK versions 7.19.x are okay
  * avoid SDK versions before 7.17.2
  * avoid SDK versions 7.20 to 7.21.5
* **注意**：SDK 版本不必与固件版本一致。
  * 如果您不确定某个固件基于哪个 SDK 版本，请联系设备制造商。
* 如需升级固件，请查找适用于您系统的说明。
  * 如果您使用 Linux，可参考 [kpine 提供的升级说明](https://github.com/kpine/zwave-js-server-Docker/wiki/700-series-Controller-Firmware-Updates-\(Linux\))。

#### 受支持的 700 系列 USB 适配器列表

如果使用上文提到的 SDK 和固件版本，以下 700 系列 USB 适配器已被报告可与 Home Assistant 一起使用：

* Aeotec Z-Stick 7 USB stick (ZWA010) (the EU 版本 is not recommended due to RF performance issues)
* HomeSeer SmartStick+ G3
* HomeSeer Z-NET G3
* Silicon Labs UZB-7 USB Stick (Silabs SLUSB7000A / SLUSB001A)
* Zooz S2 Stick 700 (ZST10 700)
* Z-Wave.Me Z-Station

### 500 系列 USB 适配器

以下 500 系列 USB 适配器已被报告可与 Home Assistant 一起使用：

* Aeotec Z-Stick Gen5 (see note below)
* Everspring USB stick - Gen 5
* GoControl HUSBZB-1 stick
* Sigma Designs UZB stick
* Vision USB stick - Gen5
* Z-Wave.Me UZB1 stick (see Aeotec Z-Stick note below)
* HomeSeer SmartStick+ G2
* HomeSeer Z-NET G2

### 树莓派 HAT 适配器

* Aeotec Z-Pi 7 树莓派 HAT/Shield (ZWA025, 700 series)
* Z-Wave.Me RaZberry 7 (ZME\_RAZBERRY7, 700 series)
* Z-Wave.Me RaZberry 7 Pro (ZMEERAZBERRY7\_PRO or ZMEURAZBERRY7\_PRO, 700 series)
* Z-Wave.Me Razberry 2 (500 series)
* Z-Wave.Me Razberry 1 (300 series)

## 第三方集线器

为了获得最佳体验，建议直接将适配器连接到 Home Assistant。如果这不适合您，也可以使用支持 Z-Wave 的集线器。Home Assistant 支持以下带有 Z-Wave 支持的第三方集线器：

* [Vera](/home-assistant/integrations/vera/index.md)
* [Fibaro](/home-assistant/integrations/fibaro/index.md)
* [SmartThings](/home-assistant/integrations/smartthings/index.md)
* [Z-Wave.Me Z-Way](/home-assistant/integrations/zwave_me.md)

## 适配器说明

### Aeotec Z-Stick

:::note

已知 Aeotec Z-Stick 及其某些变体（例如 Z-Wave.Me UZB1）由于其[不符合规范的行为](https://forums.raspberrypi.com/viewtopic.php?f=28\&t=245031#p1502030)，会与 Linux 内核存在兼容性问题。通过 USB 集线器连接这些适配器，可以作为一种临时解决方法，在某些情况下减轻这一问题。

:::

您的 Z-Wave 适配器插入系统后轮流点亮黄色、蓝色和红色 LED，这属于正常现象。
