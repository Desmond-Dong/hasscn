# Zero-configuration networking (zeroconf)

**Zero-configuration networking (zeroconf)** 集成会扫描网络中的受支持设备和服务。发现的集成会显示在配置面板中集成页面的“已发现”部分。它还会让 Home Assistant 可被网络中的其他服务发现。Zeroconf 有时也被称为 Bonjour、Rendezvous 和 Avahi。

集成可以通过在其 `manifest.json` 中添加 [Zeroconf 部分](https://developers.home-assistant.io/docs/creating_integration_manifest/#zeroconf) 或 [HomeKit 部分](https://developers.home-assistant.io/docs/creating_integration_manifest/#homekit) 来启用被发现功能。

## 配置

此集成默认处于启用状态，除非您在配置中禁用了或移除了 [`default_config:`](/home-assistant/integrations/default_config/index.md) 这一行。如果确实如此，而您又希望 Home Assistant 使用 zeroconf 和 HomeKit 来扫描集成，以下示例展示了如何手动启用此集成：

```yaml
# Example configuration.yaml entry
zeroconf:
```

## 网络接口与自动检测

Zeroconf 会根据 [Network](/home-assistant/integrations/network/index.md) 集成来选择在哪些接口上广播。

如果所选接口中有一个接口通过 Network 集成启用了 IPv6 地址，IPv6 将自动启用。

## 故障排除

### Zeroconf 浏览器

**Zeroconf 浏览器**会显示 Home Assistant 通过 Zeroconf（也称为 mDNS 或 Bonjour）发现的设备。这种方式允许设备在本地网络中通告自己的服务，而无需中心目录。Home Assistant 会主动使用 Zeroconf 搜索特定服务，任何匹配的设备都会显示在此浏览器中。

要打开 Zeroconf 浏览器，请前往：
[**Settings** > **System** > **Network** > **Zeroconf Browser**](https://my.home-assistant.io/redirect/config_zeroconf/)

### 依赖 Zeroconf 流量的集成没有响应

某些集成依赖 Zeroconf 流量才能工作，例如 [HomeKit](/home-assistant/integrations/homekit/index.md) 集成。
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

* [1-Wire](/home-assistant/integrations/onewire/index.md)
* [AirGradient](/home-assistant/integrations/airgradient/index.md)
* [Altruist](/home-assistant/integrations/altruist/index.md)
* [Android TV Remote](/home-assistant/integrations/androidtv_remote/index.md)
* [Apple TV](/home-assistant/integrations/apple_tv/index.md)
* [Awair](/home-assistant/integrations/awair/index.md)
* [Axis](/home-assistant/integrations/axis/index.md)
* [Bang & Olufsen](/home-assistant/integrations/bang_olufsen/index.md)
* [Big Ass Fans](/home-assistant/integrations/baf/index.md)
* [BleBox devices](/home-assistant/integrations/blebox/index.md)
* [Bluesound](/home-assistant/integrations/bluesound/index.md)
* [Bond](/home-assistant/integrations/bond/index.md)
* [Bosch SHC](/home-assistant/integrations/bosch_shc/index.md)
* [Bose SoundTouch](/home-assistant/integrations/soundtouch/index.md)
* [Brother Printer](/home-assistant/integrations/brother/index.md)
* [BSB-Lan](/home-assistant/integrations/bsblan/index.md)
* [Cambridge Audio](/home-assistant/integrations/cambridge_audio/index.md)
* [Daikin AC](/home-assistant/integrations/daikin/index.md)
* [Deako](/home-assistant/integrations/deako/index.md)
* [Denon HEOS](/home-assistant/integrations/heos/index.md)
* [Devialet](/home-assistant/integrations/devialet/index.md)
* [devolo Home Control](/home-assistant/integrations/devolo_home_control/index.md)
* [devolo Home Network](/home-assistant/integrations/devolo_home_network/index.md)
* [DoorBird](/home-assistant/integrations/doorbird/index.md)
* [Droplet](/home-assistant/integrations/droplet/index.md)
* [ecobee](/home-assistant/integrations/ecobee/index.md)
* [EHEIM Digital](/home-assistant/integrations/eheimdigital/index.md)
* [Elexa Guardian](/home-assistant/integrations/guardian/index.md)
* [Elgato Light](/home-assistant/integrations/elgato/index.md)
* [Elmax](/home-assistant/integrations/elmax/index.md)
* [Enphase Envoy](/home-assistant/integrations/enphase_envoy/index.md)
* [ESPHome](/home-assistant/integrations/esphome/index.md)
* [Freebox](/home-assistant/integrations/freebox/index.md)
* [Google Cast](/home-assistant/integrations/cast/index.md)
* [Home Connect](/home-assistant/integrations/home_connect/index.md)
* [HomeKit Bridge](/home-assistant/integrations/homekit/index.md)
* [HomeKit Device](/home-assistant/integrations/homekit_controller/index.md)
* [HomeWizard Energy](/home-assistant/integrations/homewizard/index.md)
* [Hunter Douglas PowerView](/home-assistant/integrations/hunterdouglas_powerview/index.md)
* [Internet Printing Protocol (IPP)](/home-assistant/integrations/ipp/index.md)
* [IOmeter](/home-assistant/integrations/iometer/index.md)
* [iRobot Roomba and Braava](/home-assistant/integrations/roomba/index.md)
* [Kodi](/home-assistant/integrations/kodi/index.md)
* [Lektrico Charging Station](/home-assistant/integrations/lektrico/index.md)
* [LinkPlay](/home-assistant/integrations/linkplay/index.md)
* [LOOKin](/home-assistant/integrations/lookin/index.md)
* [LOQED Touch Smart Lock](/home-assistant/integrations/loqed/index.md)
* [Lutron Caséta](/home-assistant/integrations/lutron_caseta/index.md)
* [Matter](/home-assistant/integrations/matter/index.md)
* [Miele](/home-assistant/integrations/miele/index.md)
* [Modern Forms](/home-assistant/integrations/modern_forms/index.md)
* [Music Assistant](/home-assistant/integrations/music_assistant/index.md)
* [Nanoleaf](/home-assistant/integrations/nanoleaf/index.md)
* [Nettigo Air Monitor](/home-assistant/integrations/nam/index.md)
* [Network UPS Tools (NUT)](/home-assistant/integrations/nut/index.md)
* [OctoPrint](/home-assistant/integrations/octoprint/index.md)
* [Overkiz](/home-assistant/integrations/overkiz/index.md)
* [OwnTone](/home-assistant/integrations/forked_daapd/index.md)
* [Peblar](/home-assistant/integrations/peblar/index.md)
* [Philips Hue](/home-assistant/integrations/hue/index.md)
* [Philips TV](/home-assistant/integrations/philips_js/index.md)
* [Plex Media Server](/home-assistant/integrations/plex/index.md)
* [Plugwise](/home-assistant/integrations/plugwise/index.md)
* [Powerfox](/home-assistant/integrations/powerfox/index.md)
* [Pure Energie](/home-assistant/integrations/pure_energie/index.md)
* [Rabbit Air](/home-assistant/integrations/rabbitair/index.md)
* [Rachio](/home-assistant/integrations/rachio/index.md)
* [RainMachine](/home-assistant/integrations/rainmachine/index.md)
* [ROMY Vacuum Cleaner](/home-assistant/integrations/romy/index.md)
* [Russound RIO](/home-assistant/integrations/russound_rio/index.md)
* [Samsung Smart TV](/home-assistant/integrations/samsungtv/index.md)
* [Shelly](/home-assistant/integrations/shelly/index.md)
* [Slide Local](/home-assistant/integrations/slide_local/index.md)
* [Smappee](/home-assistant/integrations/smappee/index.md)
* [SMLIGHT SLZB](/home-assistant/integrations/smlight/index.md)
* [Sonos](/home-assistant/integrations/sonos/index.md)
* [Synology DSM](/home-assistant/integrations/synology_dsm/index.md)
* [System Bridge](/home-assistant/integrations/system_bridge/index.md)
* [Tailwind](/home-assistant/integrations/tailwind/index.md)
* [TechnoVE](/home-assistant/integrations/technove/index.md)
* [Thread](/home-assistant/integrations/thread/index.md)
* [Vegetronix VegeHub](/home-assistant/integrations/vegehub/index.md)
* [VIZIO SmartCast](/home-assistant/integrations/vizio/index.md)
* [Vogel's MotionMount](/home-assistant/integrations/motionmount/index.md)
* [Volumio](/home-assistant/integrations/volumio/index.md)
* [WLED](/home-assistant/integrations/wled/index.md)
* [Wyoming Protocol](/home-assistant/integrations/wyoming/index.md)
* [Xiaomi Gateway (Aqara)](/home-assistant/integrations/xiaomi_aqara/index.md)
* [Xiaomi Home](/home-assistant/integrations/xiaomi_miio/index.md)
* [Yeelight](/home-assistant/integrations/yeelight/index.md)
* [Zigbee Home Automation](/home-assistant/integrations/zha/index.md)
* [Z-Wave](/home-assistant/integrations/zwave_js/index.md)
* [Z-Wave.Me](/home-assistant/integrations/zwave_me/index.md)
