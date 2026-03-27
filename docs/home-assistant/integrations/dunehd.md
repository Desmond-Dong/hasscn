---
title: Dune HD
description: 'Dune HD 集成允许您从 Home Assistant 控制 Dune HD 媒体播放器(https://dune-hd.com/eng/products/fullhdmediaplayers)。支持基于 Dune 发布的官方 IP 协议(https://dune-hd.com/support/ipcon。'
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 0.34
ha_domain: dunehd
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: device
---
# Dune HD

**Dune HD** 集成允许您从 Home Assistant 控制 [Dune HD 媒体播放器](https://dune-hd.com/eng/products/full_hd_media_players)。支持基于 Dune 发布的官方 [IP 协议](https://dune-hd.com/support/ip_control/dune_ip_control_overview.txt)。

支持固件版本 110127_2105_beta 或更高版本的设备。某些功能可能取决于协议版本（音量/静音控制仅从版本 2 开始可用）。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::