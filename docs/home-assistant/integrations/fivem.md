---
title: FiveM
description: 'FiveM 允许玩家与其他玩家在线玩 Rockstar Games(https://www.rockstargames.com) 的游戏 Grand Theft Auto V(https://www.rockstargames.com/V)。 FiveM 添加了对自定义资源的支持。'
ha_release: 2022.3
ha_category:
  - Binary sensor
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Sander0542'
ha_domain: fivem
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: service
---
# FiveM

FiveM 允许玩家与其他玩家在线玩 [Rockstar Games](https://www.rockstargames.com) 的游戏 [Grand Theft Auto V](https://www.rockstargames.com/V)。 FiveM 添加了对自定义资源的支持。 FiveM 集成允许您从 Home Assistant 中的 FiveM 服务器检索信息。


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 二进制传感器

此集成为来自 FiveM 服务器的以下信息提供了二进制传感器：

- 连接状态

## 传感器

此集成为 FiveM 服务器提供以下信息的传感器：

- 在线玩家数量（玩家名称可在状态属性中找到）
- 最大玩家人数
- 资源数量（资源名称在状态属性中可用）
