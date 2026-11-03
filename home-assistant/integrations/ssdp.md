# 简单服务发现协议（SSDP）

**简单服务发现协议（SSDP）**（UPnP 的一部分）集成会扫描网络中的受支持设备和服务。发现到的集成会显示在配置面板中集成页面的“已发现”部分。

集成可以通过在其 `manifest.json` 中添加 [SSDP 部分](https://developers.home-assistant.io/docs/creating_integration_manifest/#ssdp) 来选择加入自动发现。

## 配置

除非你在配置中禁用了或删除了 [`default_config:`](/home-assistant/integrations/default_config/index.md) 这一行，否则此集成默认处于启用状态。如果你这样做了，下面的示例展示了如何手动启用此集成：

```yaml
# configuration.yaml 配置示例
ssdp:
```

## 故障排除

### SSDP/UPnP 浏览器

**SSDP/UPnP 浏览器**会显示 Home Assistant 通过 SSDP（简单服务发现协议）发现的设备。SSDP 是 UPnP（通用即插即用）标准的核心组成部分。智能电视、媒体服务器和打印机等设备通常会使用 SSDP 在网络中广播自身信息。Home Assistant 会监听这些广播，以自动检测兼容设备。

要打开 SSDP/UPnP 浏览器，请前往：
[**Settings** > **System** > **Network** > **SSDP Browser**](https://my.home-assistant.io/redirect/config_ssdp/)

## 已发现的集成

以下集成可由 SSDP 集成自动发现：

* [Arcam FMJ Receivers](/home-assistant/integrations/arcam_fmj/index.md)
* [AVM FRITZ!Box Tools](/home-assistant/integrations/fritz/index.md)
* [AVM FRITZ!SmartHome](/home-assistant/integrations/fritzbox/index.md)
* [Axis](/home-assistant/integrations/axis/index.md)
* [Belkin WeMo](/home-assistant/integrations/wemo/index.md)
* [Control4](/home-assistant/integrations/control4/index.md)
* [deCONZ](/home-assistant/integrations/deconz/index.md)
* [Denon AVR Network Receivers](/home-assistant/integrations/denonavr/index.md)
* [Denon HEOS](/home-assistant/integrations/heos/index.md)
* [DirecTV](/home-assistant/integrations/directv/index.md)
* [DLNA Digital Media Renderer](/home-assistant/integrations/dlna_dmr/index.md)
* [DLNA Digital Media Server](/home-assistant/integrations/dlna_dms/index.md)
* [Frontier Silicon](/home-assistant/integrations/frontier_silicon/index.md)
* [Huawei LTE](/home-assistant/integrations/huawei_lte/index.md)
* [Hyperion](/home-assistant/integrations/hyperion/index.md)
* [Imeon Inverter](/home-assistant/integrations/imeon_inverter/index.md)
* [Kaleidescape](/home-assistant/integrations/kaleidescape/index.md)
* [Keenetic NDMS2 Router](/home-assistant/integrations/keenetic_ndms2/index.md)
* [Konnected.io](/home-assistant/integrations/konnected/index.md)
* [LaMetric](/home-assistant/integrations/lametric/index.md)
* [LG webOS TV](/home-assistant/integrations/webostv/index.md)
* [Linn / OpenHome](/home-assistant/integrations/openhome/index.md)
* [Logitech Harmony Hub](/home-assistant/integrations/harmony/index.md)
* [MusicCast](/home-assistant/integrations/yamaha_musiccast/index.md)
* [Nanoleaf](/home-assistant/integrations/nanoleaf/index.md)
* [NETGEAR](/home-assistant/integrations/netgear/index.md)
* [OctoPrint](/home-assistant/integrations/octoprint/index.md)
* [Onkyo](/home-assistant/integrations/onkyo/index.md)
* [Roku](/home-assistant/integrations/roku/index.md)
* [Samsung Smart TV](/home-assistant/integrations/samsungtv/index.md)
* [Samsung SyncThru Printer](/home-assistant/integrations/syncthru/index.md)
* [Sonos](/home-assistant/integrations/sonos/index.md)
* [Sony Bravia TV](/home-assistant/integrations/braviatv/index.md)
* [Sony Songpal](/home-assistant/integrations/songpal/index.md)
* [Synology DSM](/home-assistant/integrations/synology_dsm/index.md)
* [UniFi Network](/home-assistant/integrations/unifi/index.md)
* [UniFi Protect](/home-assistant/integrations/unifiprotect/index.md)
* [Universal Devices ISY/IoX](/home-assistant/integrations/isy994/index.md)
* [UPnP/IGD](/home-assistant/integrations/upnp/index.md)
* [WiLight](/home-assistant/integrations/wilight/index.md)
