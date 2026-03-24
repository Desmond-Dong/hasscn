---
title: Panasonic Blu-Ray Player
description: 有关如何将松下蓝光播放器集成到家庭助理中的说明。
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 0.83
ha_domain: panasonic_bluray
ha_platforms:
  - media_player
ha_integration_type: integration
ha_quality_scale: legacy
---

**Panasonic Blu-Ray Player** 集成可让您控制松下蓝光播放器。请注意，设备必须与 Home Assistant 位于同一子网中；如果从不同子网建立连接，将会返回错误。

## 支持的型号

目前已知支持以下型号：

- DMP-BDT120
- DMP-BDT220
- DMP-BDT221
- DMP-BDT320
- DMP-BDT500
- DMP-BBT01

以下较新的型号目前支持一组有限的状态命令：

- DP-UB420
- DP-UB820
- DP-UB9000
 
如果您的型号不在列表中，您仍然可以尝试使用。如果一切正常，请将其添加到 [GitHub](https://github.com/home-assistant/home-assistant.io/blob/current/source/_integrations/panasonic_bluray.markdown) 上的列表中。

## 配置

配置示例：

```yaml
media_player:
  - platform: panasonic_bluray
    host: 192.168.0.10
```

```yaml
host:
  description: 松下蓝光设备的 IP 地址，例如 `192.168.0.10`。
  required: true
  type: string
name:
  description: 您想为松下蓝光设备指定的名称。
  required: false
  default: Panasonic Blu-Ray
  type: string
```

## 支持的功能

- 这些设备支持播放、暂停、停止，以及开机和关机操作。它们还会报告当前状态、媒体时长和当前播放位置。
