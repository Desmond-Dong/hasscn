---
title: Zero-configuration networking (zeroconf)
description: 'Zero-configuration networking (zeroconf) 集成会扫描网络中的受支持设备和服务。发现的集成会显示在配置面板中集成页面的“已发现”部分。它还会让 Home Assistant 可被网络中的其他服务发现。Zeroconf 有时也被称为 Bonjour、Rendezvous。'
ha_category:
  - Network
ha_release: 0.18
ha_quality_scale: internal
ha_codeowners:
  - '@bdraco'
ha_domain: zeroconf
ha_iot_class: Local Push
ha_integration_type: system
---
# Zero-configuration networking (zeroconf)

**Zero-configuration networking (zeroconf)** 集成会扫描网络中的受支持设备和服务。发现的集成会显示在配置面板中集成页面的“已发现”部分。它还会让 Home Assistant 可被网络中的其他服务发现。Zeroconf 有时也被称为 Bonjour、Rendezvous 和 Avahi。

集成可以通过在其 `manifest.json` 中添加 [Zeroconf 部分](https://developers.home-assistant.io/docs/creating_integration_manifest/#zeroconf) 或 [HomeKit 部分](https://developers.home-assistant.io/docs/creating_integration_manifest/#homekit) 来启用被发现功能。

## 配置

此集成默认处于启用状态，除非您在配置中禁用了或移除了 [`default_config:`](/home-assistant/integrations/default_config/) 这一行。如果确实如此，而您又希望 Home Assistant 使用 zeroconf 和 HomeKit 来扫描集成，以下示例展示了如何手动启用此集成：

```yaml
# Example configuration.yaml entry
zeroconf:
```

## 网络接口与自动检测

Zeroconf 会根据 [Network](/home-assistant/integrations/network/) 集成来选择在哪些接口上广播。

如果所选接口中有一个接口通过 Network 集成启用了 IPv6 地址，IPv6 将自动启用。

## 故障排除

### Zeroconf 浏览器

**Zeroconf 浏览器**会显示 Home Assistant 通过 Zeroconf（也称为 mDNS 或 Bonjour）发现的设备。这种方式允许设备在本地网络中通告自己的服务，而无需中心目录。Home Assistant 会主动使用 Zeroconf 搜索特定服务，任何匹配的设备都会显示在此浏览器中。

要打开 Zeroconf 浏览器，请前往：
[**Settings** > **System** > **Network** > **Zeroconf Browser**](https://my.home-assistant.io/redirect/config_zeroconf/)

### 依赖 Zeroconf 流量的集成没有响应

某些集成依赖 Zeroconf 流量才能工作，例如 [HomeKit](/home-assistant/integrations/homekit/) 集成。
如果宿主设备配置不正确，这些集成将无法响应来自其他设备的流量。

#### 使用 macvtap 适配器的 Libvirt 虚拟机

默认情况下，libvirt 创建的 macvtap 适配器不允许虚拟机接收 Zeroconf 或组播流量。

要让虚拟机接收这类流量，请在适配器的 XML 中添加 `trustGuestRxFilters="yes"` 设置。例如：

```xml
<interface type="direct" trustGuestRxFilters="yes">
  <mac address="xx:xx:xx:xx:xx:xx"/>
  <source dev="eno1" mode="bridge"/>
  <model type="virtio"/>
  <link state="up"/>
  <address type="pci" domain="0x0000" bus="0x01" slot="0x00" function="0x0"/>
</interface>
```

这仅适用于 `virtio` 网络适配器类型，并且出于安全原因默认处于禁用状态。有关更多详细信息，请参阅 [libvirt 文档](https://libvirt.org/formatdomain.html#elementsNICS)。

## 已发现的集成

以下集成会由 `zeroconf` 集成自动发现：

 - [1-Wire](/home-assistant/integrations/onewire/)
 - [AirGradient](/home-assistant/integrations/airgradient/)
 - [Altruist](/home-assistant/integrations/altruist/)
 - [Android TV Remote](/home-assistant/integrations/androidtv_remote/)
 - [Apple TV](/home-assistant/integrations/apple_tv/)
 - [Awair](/home-assistant/integrations/awair/)
 - [Axis](/home-assistant/integrations/axis/)
 - [Bang & Olufsen](/home-assistant/integrations/bang_olufsen/)
 - [Big Ass Fans](/home-assistant/integrations/baf/)
 - [BleBox devices](/home-assistant/integrations/blebox/)
 - [Bluesound](/home-assistant/integrations/bluesound/)
 - [Bond](/home-assistant/integrations/bond/)
 - [Bosch SHC](/home-assistant/integrations/bosch_shc/)
 - [Bose SoundTouch](/home-assistant/integrations/soundtouch/)
 - [Brother Printer](/home-assistant/integrations/brother/)
 - [BSB-Lan](/home-assistant/integrations/bsblan/)
 - [Cambridge Audio](/home-assistant/integrations/cambridge_audio/)
 - [Daikin AC](/home-assistant/integrations/daikin/)
 - [Deako](/home-assistant/integrations/deako/)
 - [Denon HEOS](/home-assistant/integrations/heos/)
 - [Devialet](/home-assistant/integrations/devialet/)
 - [devolo Home Control](/home-assistant/integrations/devolo_home_control/)
 - [devolo Home Network](/home-assistant/integrations/devolo_home_network/)
 - [DoorBird](/home-assistant/integrations/doorbird/)
 - [Droplet](/home-assistant/integrations/droplet/)
 - [ecobee](/home-assistant/integrations/ecobee/)
 - [EHEIM Digital](/home-assistant/integrations/eheimdigital/)
 - [Elexa Guardian](/home-assistant/integrations/guardian/)
 - [Elgato Light](/home-assistant/integrations/elgato/)
 - [Elmax](/home-assistant/integrations/elmax/)
 - [Enphase Envoy](/home-assistant/integrations/enphase_envoy/)
 - [ESPHome](/home-assistant/integrations/esphome/)
 - [Freebox](/home-assistant/integrations/freebox/)
 - [Google Cast](/home-assistant/integrations/cast/)
 - [Home Connect](/home-assistant/integrations/home_connect/)
 - [HomeKit Bridge](/home-assistant/integrations/homekit/)
 - [HomeKit Device](/home-assistant/integrations/homekit_controller/)
 - [HomeWizard Energy](/home-assistant/integrations/homewizard/)
 - [Hunter Douglas PowerView](/home-assistant/integrations/hunterdouglas_powerview/)
 - [Internet Printing Protocol (IPP)](/home-assistant/integrations/ipp/)
 - [IOmeter](/home-assistant/integrations/iometer/)
 - [iRobot Roomba and Braava](/home-assistant/integrations/roomba/)
 - [Kodi](/home-assistant/integrations/kodi/)
 - [Lektrico Charging Station](/home-assistant/integrations/lektrico/)
 - [LinkPlay](/home-assistant/integrations/linkplay/)
 - [LOOKin](/home-assistant/integrations/lookin/)
 - [LOQED Touch Smart Lock](/home-assistant/integrations/loqed/)
 - [Lutron Caséta](/home-assistant/integrations/lutron_caseta/)
 - [Matter](/home-assistant/integrations/matter/)
 - [Miele](/home-assistant/integrations/miele/)
 - [Modern Forms](/home-assistant/integrations/modern_forms/)
 - [Music Assistant](/home-assistant/integrations/music_assistant/)
 - [Nanoleaf](/home-assistant/integrations/nanoleaf/)
 - [Nettigo Air Monitor](/home-assistant/integrations/nam/)
 - [Network UPS Tools (NUT)](/home-assistant/integrations/nut/)
 - [OctoPrint](/home-assistant/integrations/octoprint/)
 - [Overkiz](/home-assistant/integrations/overkiz/)
 - [OwnTone](/home-assistant/integrations/forked_daapd/)
 - [Peblar](/home-assistant/integrations/peblar/)
 - [Philips Hue](/home-assistant/integrations/hue/)
 - [Philips TV](/home-assistant/integrations/philips_js/)
 - [Plex Media Server](/home-assistant/integrations/plex/)
 - [Plugwise](/home-assistant/integrations/plugwise/)
 - [Powerfox](/home-assistant/integrations/powerfox/)
 - [Pure Energie](/home-assistant/integrations/pure_energie/)
 - [Rabbit Air](/home-assistant/integrations/rabbitair/)
 - [Rachio](/home-assistant/integrations/rachio/)
 - [RainMachine](/home-assistant/integrations/rainmachine/)
 - [ROMY Vacuum Cleaner](/home-assistant/integrations/romy/)
 - [Russound RIO](/home-assistant/integrations/russound_rio/)
 - [Samsung Smart TV](/home-assistant/integrations/samsungtv/)
 - [Shelly](/home-assistant/integrations/shelly/)
 - [Slide Local](/home-assistant/integrations/slide_local/)
 - [Smappee](/home-assistant/integrations/smappee/)
 - [SMLIGHT SLZB](/home-assistant/integrations/smlight/)
 - [Sonos](/home-assistant/integrations/sonos/)
 - [Synology DSM](/home-assistant/integrations/synology_dsm/)
 - [System Bridge](/home-assistant/integrations/system_bridge/)
 - [Tailwind](/home-assistant/integrations/tailwind/)
 - [TechnoVE](/home-assistant/integrations/technove/)
 - [Thread](/home-assistant/integrations/thread/)
 - [Vegetronix VegeHub](/home-assistant/integrations/vegehub/)
 - [VIZIO SmartCast](/home-assistant/integrations/vizio/)
 - [Vogel's MotionMount](/home-assistant/integrations/motionmount/)
 - [Volumio](/home-assistant/integrations/volumio/)
 - [WLED](/home-assistant/integrations/wled/)
 - [Wyoming Protocol](/home-assistant/integrations/wyoming/)
 - [Xiaomi Gateway (Aqara)](/home-assistant/integrations/xiaomi_aqara/)
 - [Xiaomi Home](/home-assistant/integrations/xiaomi_miio/)
 - [Yeelight](/home-assistant/integrations/yeelight/)
 - [Zigbee Home Automation](/home-assistant/integrations/zha/)
 - [Z-Wave](/home-assistant/integrations/zwave_js/)
 - [Z-Wave.Me](/home-assistant/integrations/zwave_me/)
