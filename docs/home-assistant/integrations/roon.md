---
title: RoonLabs music player
description: 'Roon 集成允许您通过 Home Assistant 控制 RoonLabs(https://roonlabs.com/) 音乐播放器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Media player
ha_release: 0.115
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@pavoni'
ha_domain: roon
ha_platforms:
  - event
  - media_player
ha_integration_type: hub
---
# RoonLabs music player

**Roon** 集成允许您通过 Home Assistant 控制 [RoonLabs](https://roonlabs.com/) 音乐播放器。

此集成使用 Roon Core，它是运行在您网络中某台设备上的 Roon 应用。借助 Roon Core，Home Assistant 可以控制您网络中的所有 Roon 音乐播放器。

## 配置

1. 在 Home Assistant 前端中，前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)。选择 **Roon** 集成，然后点击 **Configure**。
2. Home Assistant 会尝试查找您的 Roon Core；如果成功，会显示 `Authorize HomeAssistant in Roon`。选择 **Submit**，然后跳到第 4 步。
3. 如果未能自动找到 Roon Core，请在提示时输入运行 Roon Core 的设备的 `Hostname` 或 `IP address`，然后选择 **Submit**。
4. Home Assistant 随后会联系您的 Roon Core 并请求授权。您需要在 Roon 应用中启用该扩展。前往 **Settings**，再进入 **Extensions**。在那里您会看到一条 Home Assistant 条目以及旁边的按钮。点击 **Enable**。
5. 然后，Roon Core 会向 Home Assistant 提供您的媒体播放器详情。
6. 之后，您可以在 Home Assistant 中为每个音乐播放器选择所在区域，并将其添加到系统中。

## 操作

### 操作：播放媒体

`media_player.play_media` 操作用于在 Roon 播放器上播放媒体。Roon 使用基于其媒体浏览层级的路径来指定要播放的内容。您可以通过媒体浏览器找到该路径，或参考下方示例。如果 Roon 无法解析该路径，日志中会显示错误，并指出它无法跟进到路径的哪一部分以及当时可用的选项。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------------------------------- |
| `entity_id`            | 是      | 指定某个媒体播放器。若要作用于所有媒体播放器，请使用 `all`。 |
| `media_content_id`     | 否       | 指定要播放媒体内容的路径，见下方示例。 |
| `media_content_type`   | 否       | 仅支持 `music` |

例如，要播放 Neil Young 的专辑 Harvest，您应将 `media_content_id` 设为 `Library/Artists/Neil Young/Harvest`；要播放 BBC Radio 4，则应将 `media_content_id` 设为 `My Live Radio/BBC Radio 4`。

### 操作：转移播放

`roon.transfer` 操作用于将播放从一个播放器转移到另一个播放器。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------- |
| `entity_id`            | 是      | 源播放器的 ID。 |
| `transfer_id`          | 否       | 目标播放器的 ID。 |

## 通过 Home Assistant 控制 Roon 端点音量

对于未完全集成到 Roon 的媒体播放器，可以借助 Home Assistant 实现音量控制操作。这样一来，原生 Roon 应用就能通过 Home Assistant 自动化来调整端点音量。

例如，如果您有一台音量可由 Home Assistant 控制的功放（比如通过某个集成或红外发射器），那么就可以让 Roon 应用借助这些方式来调节音量。

### 在 Roon 中配置

第一步是告诉 Roon 使用 Home Assistant 来执行音量变更。您需要在 Roon 应用中完成这项设置。首先选择要控制的区域；点击齿轮图标进入 Zone Setup，然后选择 Device Setup。

![Roon volume options](/home-assistant/images/integrations/roon/roon_volume_options.png)

其中一个选项是 Volume Control。除了普通的 Roon 选项（例如 DSP Volume）外，您还会看到一组选项，名称格式为 Home Assistant: *Zone Name*。请选择与当前配置区域相对应的选项。

之后，Roon 的音量控制将显示加减按钮，而不是音量滑块。

### 在 Home Assistant 中编写自动化

现在，在 Roon 中点击加减按钮，就可以触发 Home Assistant 中与该 `media_player` 对应的音量控制实体自动化。

在该自动化中，您可以使用 Home Assistant 操作来实现 `volume_up` 和 `volume_down`。

下面是一个使用红外发射器控制 `media_player_study` 的自动化示例：

```yaml
alias: "Roon Study Volume"
mode: queued
triggers:
  - trigger: state
    entity_id:
      - event.study_roon_volume
actions:
  - choose:
      - conditions:
          - condition: state
            entity_id: event.study_roon_volume
            attribute: event_type
            state: volume_up
        sequence:
          - action: remote.send_command
            data:
              num_repeats: 1
              delay_secs: 0.4
              hold_secs: 0
              device: amplifier
              command: volume_up
            target:
              entity_id: remote.ir_blaster
      - conditions:
          - condition: state
            entity_id: event.study_roon_volume
            attribute: event_type
            state: volume_down
        sequence:
          - action: remote.send_command
            data:
              num_repeats: 1
              delay_secs: 0.4
              hold_secs: 0
              device: amplifier
              command: volume_down
            target:
              entity_id: remote.ir_blaster
```
