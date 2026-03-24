---
title: LinkPlay
description: 使用 LinkPlay 集成连接和控制您的 LinkPlay 媒体播放器
ha_category:
  - Media player
ha_domain: linkplay
ha_zeroconf: true
ha_integration_type: hub
ha_release: 2024.8
ha_codeowners:
  - '@Velleman'
ha_config_flow: true
ha_platforms:
  - button
  - diagnostics
  - media_player
  - select
ha_iot_class: Local Polling
---

Home Assistant 的 **LinkPlay** 集成可让您控制多种基于 LinkPlay 协议的媒体播放器。该集成支持通过 [Zeroconf](/home-assistant/integrations/zeroconf) 在本地网络中自动发现设备。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 功能

### 媒体播放器

媒体播放器实体提供了媒体播放器集成中的完整控制与播放功能，另外还提供：

- **预设播放**：使用 `linkplay.play_preset` 操作播放设备上配置的 LinkPlay 预设。
- **多房间**：将多个 LinkPlay 设备组合成多房间系统。使用 `media_player.join` 和 `media_player.unjoin` 操作。

### 按钮

按钮实体提供设备上的一些额外 LinkPlay 功能：

- **时间同步**：将设备内部时钟与 Home Assistant 当前时间同步。
- **重启设备**：重启设备，方便进行故障排除和维护。

## 操作

除了[标准媒体播放器操作](/home-assistant/integrations/media_player/#actions)外，LinkPlay 集成还提供多种自定义操作。

### 操作：播放预设

`linkplay.play_preset` 操作用于在 LinkPlay 媒体播放器上播放预设。

:::note
4stream 等配套应用允许保存音乐预设（例如 Spotify 播放列表）。您可以使用此操作开始播放这些预设。

:::
| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | 目标扬声器。若要针对所有 LinkPlay 设备，请使用 `all`。 |
| `preset_number` | no | 要播放的预设编号。 |
