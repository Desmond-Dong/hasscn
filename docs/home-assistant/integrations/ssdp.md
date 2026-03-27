---
title: 简单服务发现协议（SSDP）
description: '简单服务发现协议（SSDP）（UPnP 的一部分）集成会扫描网络中的受支持设备和服务。发现到的集成会显示在配置面板中集成页面的“已发现”部分。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Network
ha_iot_class: Local Push
ha_release: 0.94
ha_domain: ssdp
ha_quality_scale: internal
ha_integration_type: system
---
# 简单服务发现协议（SSDP）

**简单服务发现协议（SSDP）**（UPnP 的一部分）集成会扫描网络中的受支持设备和服务。发现到的集成会显示在配置面板中集成页面的“已发现”部分。

集成可以通过在其 `manifest.json` 中添加 [SSDP 部分](https://developers.home-assistant.io/docs/creating_integration_manifest/#ssdp) 来选择加入自动发现。

## 配置

除非你在配置中禁用了或删除了 [`default_config:`](/home-assistant/integrations/default_config/) 这一行，否则此集成默认处于启用状态。如果你这样做了，下面的示例展示了如何手动启用此集成：

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

 - [Arcam FMJ Receivers](/home-assistant/integrations/arcam_fmj/)
 - [AVM FRITZ!Box Tools](/home-assistant/integrations/fritz/)
 - [AVM FRITZ!SmartHome](/home-assistant/integrations/fritzbox/)
 - [Axis](/home-assistant/integrations/axis/)
 - [Belkin WeMo](/home-assistant/integrations/wemo/)
 - [Control4](/home-assistant/integrations/control4/)
 - [deCONZ](/home-assistant/integrations/deconz/)
 - [Denon AVR Network Receivers](/home-assistant/integrations/denonavr/)
 - [Denon HEOS](/home-assistant/integrations/heos/)
 - [DirecTV](/home-assistant/integrations/directv/)
 - [DLNA Digital Media Renderer](/home-assistant/integrations/dlna_dmr/)
 - [DLNA Digital Media Server](/home-assistant/integrations/dlna_dms/)
 - [Frontier Silicon](/home-assistant/integrations/frontier_silicon/)
 - [Huawei LTE](/home-assistant/integrations/huawei_lte/)
 - [Hyperion](/home-assistant/integrations/hyperion/)
 - [Imeon Inverter](/home-assistant/integrations/imeon_inverter/)
 - [Kaleidescape](/home-assistant/integrations/kaleidescape/)
 - [Keenetic NDMS2 Router](/home-assistant/integrations/keenetic_ndms2/)
 - [Konnected.io](/home-assistant/integrations/konnected/)
 - [LaMetric](/home-assistant/integrations/lametric/)
 - [LG webOS TV](/home-assistant/integrations/webostv/)
 - [Linn / OpenHome](/home-assistant/integrations/openhome/)
 - [Logitech Harmony Hub](/home-assistant/integrations/harmony/)
 - [MusicCast](/home-assistant/integrations/yamaha_musiccast/)
 - [Nanoleaf](/home-assistant/integrations/nanoleaf/)
 - [NETGEAR](/home-assistant/integrations/netgear/)
 - [OctoPrint](/home-assistant/integrations/octoprint/)
 - [Onkyo](/home-assistant/integrations/onkyo/)
 - [Roku](/home-assistant/integrations/roku/)
 - [Samsung Smart TV](/home-assistant/integrations/samsungtv/)
 - [Samsung SyncThru Printer](/home-assistant/integrations/syncthru/)
 - [Sonos](/home-assistant/integrations/sonos/)
 - [Sony Bravia TV](/home-assistant/integrations/braviatv/)
 - [Sony Songpal](/home-assistant/integrations/songpal/)
 - [Synology DSM](/home-assistant/integrations/synology_dsm/)
 - [UniFi Network](/home-assistant/integrations/unifi/)
 - [UniFi Protect](/home-assistant/integrations/unifiprotect/)
 - [Universal Devices ISY/IoX](/home-assistant/integrations/isy994/)
 - [UPnP/IGD](/home-assistant/integrations/upnp/)
 - [WiLight](/home-assistant/integrations/wilight/)
