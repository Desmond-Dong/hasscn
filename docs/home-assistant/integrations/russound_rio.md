---
title: Russound RIO
description: 有关如何将 Russound RIO 设备集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_release: 0.49
ha_iot_class: Local Push
ha_domain: russound_rio
ha_platforms:
  - diagnostics
  - media_player
  - number
  - switch
ha_codeowners:
  - '@noahhusby'
ha_config_flow: true
ha_integration_type: hub
ha_quality_scale: silver
ha_zeroconf: true
---

**Russound RIO** 集成允许您控制使用 RIO 协议的 Russound 设备。

该平台会自动发现所有已启用的分区和音源。每个分区都会作为一个媒体播放器设备添加，并将已启用的音源作为可选输入。如果所选音源会报告媒体信息，也会一并显示。此集成允许您直接在 Home Assistant 仪表板中浏览预设、控制各分区音量并播放广播电台。

## 支持的设备

此集成允许您连接以下控制器：

- Russound SMZ8
- Russound SMZ16-PRE
- Russound MBX-PRE
- Russound MBX-AMP
- Russound ACA-E5
- Russound MCA-C3
- Russound MCA-C5
- Russound MCA-66
- Russound MCA-88
- Russound MCA-88x
- Russound XSource
- Russound XZone4
- Russound XZone70V
- Russound XStream-X5


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: 可在 [Russound app](https://www.russound.com/russound-app) 中进入该设备并选择 `Settings` 来查找设备 IP 地址。如果您使用的是第三方 RS232 转 IP 适配器，请参阅其用户手册以查找 IP 地址。
Port:
    description: 设备端口。除 XZone4 使用 9621-9624 端口外，其他设备均使用 `9621`。如果使用 RS232 转 IP 适配器，端口可能不同。
```

## 数据更新

Russound RIO 设备会直接向 Home Assistant 推送数据，因此设备状态变化、媒体信息和播放状态都能即时更新。

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 可用配置实体

此集成提供了一些用于配置设备设置的实体，支持如下：

- Bass and Treble
- Balance
- Loudness
- Turn on volume

## 播放媒体

Russound RIO 支持使用 `media_player.play_media` 操作调出 AM/FM 和 Sirius XM 预设。

### 示例

Russound RIO 可以调出设备中为某个音源保存的任意预设。预设 ID 可以是 1-36。某些设备会按每组 6 个预设的 bank 进行显示。预设 ID 可以通过当前 bank 编号与预设编号组合计算。下面是使用 Bank 1、Preset 1 的示例：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.russound_deck
data:
  media_content_type: "preset"
  media_content_id: "1"
```

下面是使用 Bank 2、Preset 1 的示例：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.russound_deck
data:
  media_content_type: "preset"
  media_content_id: "7"
```


该操作只会影响某个分区当前正在使用的音源。如果您想在特定音源上调用预设，可以使用 `source_id,preset_id` 格式。例如，如果您想在 Source 1 上调用 Bank 2、Preset 2：
```yaml
action: media_player.play_media
target:
  entity_id: media_player.russound_deck
data:
  media_content_type: "preset"
  media_content_id: "1,8"
```

## 浏览媒体

Russound RIO 集成允许您在仪表板中浏览已保存的预设。

## 故障排除

### 获取当前状态有延迟

某些较老的 Russound 设备在向 Home Assistant 推送新状态前会有轻微延迟。
通常可以通过将设备升级到最新固件来解决。
