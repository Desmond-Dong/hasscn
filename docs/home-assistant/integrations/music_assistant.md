---
title: Music Assistant
description: 关于如何将 Music Assistant 集成到 Home Assistant 的说明。

ha_category:
  - Media player
ha_release: 2024.12
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@music-assistant'
  - '@arturpragacz'
ha_domain: music_assistant
ha_platforms:
  - button
  - media_player
ha_zeroconf: true
ha_integration_type: service
ha_quality_scale: bronze
---

**Music Assistant**（MA）集成可让你将 Home Assistant 连接到 [Music Assistant Server](https://music-assistant.io/)。配置完成后，所有 [MA 播放器](https://music-assistant.io/player-support/) 都会显示为 Home Assistant 的 [媒体播放器实体](/home-assistant/integrations/media_player/)。通过这些媒体播放器，你可以控制媒体播放并查看当前正在播放的内容。

## 先决条件

安装此集成前，请确保你已经运行了 Music Assistant 服务器。有关安装 Music Assistant 服务器的说明，请参阅 [Music Assistant 文档](https://www.music-assistant.io/installation/)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 手动配置

在正常情况下，Home Assistant 会自动发现正在运行的 Music Assistant 服务器。如果你的 Home Assistant 或 Music Assistant 配置较为特殊，例如 Music Assistant 服务器作为远程 Docker 容器运行，或者自动发现无法正常工作，你可以手动指定 Music Assistant 服务器的 URL。

## 支持的功能

目前支持以下 Home Assistant 平台：

- [Media player](#media-player-entities)
- [Button](#favorite-current-song-button)


支持 Home Assistant 的全部 [媒体播放器控制操作](https://www.home-assistant.io/integrations/media_player/#media-control-actions)。

如果使用 `media_player.play_media`，请注意 `media_content_id` 载荷可以是以下任意一种：

- 曲目、艺人或专辑名称。例如 `Queen`
- 带有艺人名称的曲目或专辑。例如 `Queen - Innuendo`
- 流媒体提供商 URI。例如 `spotify://artist/12345`
- 流媒体提供商 URL。例如 `https://open.spotify.com/track/31cWPvM99ZHxMl3mdgiw4I`

如果使用 `media_player.browse_media`，则 `media_content_id` 载荷必须是类似 `library://artist/1`、`library://album/20` 或 `spotify://album/5zj4Ej0FrlJQaSo0d6cttH` 这样的 URI。该 URI 指向的项目类型必须是专辑或艺人。

例如，这些 URI 可以从下文介绍的 `get_library` 或 `search` 操作输出中获取，也可以通过 Home Assistant 的 `media_player.browse_media` 操作获得。

流媒体提供商 URL 可以从相应提供商的网页界面获取。

### 媒体播放器实体

Music Assistant 集成会为 MA 中所有可用的播放器和群组创建媒体播放器实体，其中也包括从 Home Assistant 导入的播放器。这样做是为了提供 Music Assistant 的完整功能。这些完整功能包括将当前播放队列从一个播放器转移到另一个播放器、在播报通知期间自动暂停播放，以及提供更丰富的媒体选择选项。这些实体会显示媒体信息、播放进度和播放控制。

### 收藏当前歌曲按钮

Music Assistant 集成会为每个播放器创建一个按钮实体，用于收藏当前歌曲。按下此按钮后，无论是手动操作还是通过自动化触发，都会将当前歌曲添加到 Music Assistant 收藏夹中。它既适用于本地存储的歌曲，也适用于来自流媒体提供商的曲目。对于 Spotify Connect、AirPlay 或电台等远程内容，只要外部来源提供了艺人和标题组合信息，并可选提供专辑信息，也同样可以使用。


## 操作

### 操作 `music_assistant.play_media`

使用更细粒度的控制选项在 Music Assistant 播放器上播放媒体。与 [`media_player.play_media`](https://www.home-assistant.io/integrations/media_player/#action-media_playerplay_media) 操作相比，此操作功能更强，因为它允许一次向队列中添加多个项目，允许更精确地指定要播放的媒体项目，比如指定某张专辑中的某一首曲目，还可以启用 Music Assistant 的电台模式，也就是使用与已加入队列内容相似的曲目自动填充播放队列。

- **数据属性**: `media_id`
  - **可选**: 否。
  - **说明**: 要播放项目的 URI 或名称。如果你想播放或加入队列多个项目，请指定一个列表。
  - **示例**: `spotify://playlist/aabbccddeeff`
- **数据属性**: `media_type`
  - **可选**: 是。
  - **说明**: 要播放的内容类型。可选 artist、album、track、playlist 或 radio。省略时会自动判断。
  - **示例**: `playlist`
- **数据属性**: `artist`
  - **可选**: 是。
  - **说明**: 当你在 Media ID 字段中按名称指定曲目或专辑时，可以用此艺人名称进一步限定结果。
  - **示例**: `Queen`
- **数据属性**: `album`
  - **可选**: 是。
  - **说明**: 当你在 Media ID 字段中按名称指定曲目时，可以用此专辑名称进一步限定结果。
  - **示例**: `News of the world`
- **数据属性**: `enqueue`
  - **可选**: 是。
  - **说明**: 内容是立即播放还是加入队列。可选项包括：
    - play: 立即播放
    - replace: 替换现有队列并立即播放
    - next: 添加到当前正在播放项目之后
    - replace_next: 替换当前正在播放项目之后的队列
    - add: 添加到队列末尾
  - **示例**: `replace`
- **数据属性**: `radio_mode`
  - **可选**: 是。
  - **说明**: 启用电台模式，根据所选内容自动生成播放列表。
  - **示例**: `true`

### 操作 `music_assistant.play_announcement`

在 Music Assistant 播放器上播放可通过 URL 访问的播报内容。对于以文本形式提供的播报内容，可使用 Home Assistant 的 [TTS](https://www.home-assistant.io/integrations/tts/) 操作。

- **数据属性**: `url`
  - **可选**: 否。
  - **说明**: 通知声音的 URL。
  - **示例**: `https://someremotesite.com/doorbell.mp3`
- **数据属性**: `use_pre_announce`
  - **可选**: 是。
  - **说明**: 使用预播报提示音。省略时使用播放器默认值。
  - **示例**: `true`
- **数据属性**: `pre_announce_url`
  - **可选**: 是。
  - **说明**: 预播报提示音的 URL。
  - **示例**: `https://someremotesite.com/chime.mp3`
- **数据属性**: `announce_volume`
  - **可选**: 是。
  - **说明**: 为播报使用强制音量。省略时使用播放器默认值。
  - **示例**: `75`

### 操作 `music_assistant.transfer_queue`

将播放器的队列转移到另一台播放器。这可以与存在传感器结合使用，让音乐跟随你在家中移动。

- **数据属性**: `source_player`
  - **可选**: 是。
  - **说明**: 要转移队列的源媒体播放器。省略时，将使用第一个正在播放的播放器。
  - **示例**: `media_player.kitchen_speaker`
- **数据属性**: `auto_play`
  - **可选**: 是。
  - **说明**: 在目标播放器上开始播放该队列。省略时使用默认行为。
  - **示例**: `true`

#### 示例

在此示例中，当厨房内的运动传感器被触发时，会将检测到的第一个正在播放的播放器队列转移到厨房。

```yaml
automation:
  - id: auto_queue_transfer_kitchen
    alias: Automatically Transfer Queue to Kitchen
    trigger:
      platform: state
      entity_id: binary_sensor.kitchen_motion_sensor_occupancy
      to: 'on'
    actions:
      action: music_assistant.transfer_queue
      target:
        entity_id: media_player.ma_kitchen_speaker
```

### 操作 `music_assistant.search`

在 Music Assistant 媒体库及所有提供商中执行全局搜索。这样可以通过程序访问所有音乐提供商的目录，也可用于构建一个 Home Assistant 仪表板，以便查找任意曲目并进行播放。

- **数据属性**: `config_entry_id`
  - **可选**: 否。
  - **说明**: 要执行搜索的 Music Assistant 实例。这样可支持同时运行多个服务器。该值可从图形界面编辑器中的下拉菜单获取。YAML 用户可以先在开发者工具的操作选项卡中从下拉菜单选择，再切换到 YAML 查看实际值。
  - **示例**: `Music Assistant`
- **数据属性**: `name`
  - **可选**: 否。
  - **说明**: 要搜索的名称或标题。
  - **示例**: `We Are The Champions`
- **数据属性**: `media_type`
  - **可选**: 是。
  - **说明**: 要搜索的内容类型。可选 artist、album、track、radio 或 playlist。省略时搜索所有类型。
  - **示例**: `playlist`
- **数据属性**: `artist`
  - **可选**: 是。
  - **说明**: 当你在 name 字段中指定曲目或专辑时，可以用此艺人名称进一步限定结果。
  - **示例**: `Queen`
- **数据属性**: `album`
  - **可选**: 是。
  - **说明**: 当你在 name 字段中指定曲目时，可以用此专辑名称进一步限定结果。
  - **示例**: `News of the world`
- **数据属性**: `limit`
  - **可选**: 是。
  - **说明**: 返回的最大项目数量（按每种媒体类型计算）。
  - **示例**: `10`
- **数据属性**: `library_only`
  - **可选**: 是。
  - **说明**: 仅包含位于媒体库中的结果。
  - **示例**: `true`
  
### 操作 `music_assistant.get_library`

在 Music Assistant 媒体库中执行本地搜索。这样可以通过程序访问媒体项目的简要信息，这些信息可用于创建播放队列。

- **数据属性**: `config_entry_id`
  - **可选**: 否。
  - **说明**: 要执行搜索的 Music Assistant 实例。这样可支持同时运行多个服务器。
  - **示例**: `Music Assistant`
- **数据属性**: `media_type`
  - **可选**: 否。
  - **说明**: 要搜索的内容类型。可选 artist、album、track、radio 或 playlist。
  - **示例**: `artist`
- **数据属性**: `favorite`
  - **可选**: 是。
  - **说明**: 选中后，仅返回已标记为收藏的项目。
  - **示例**: `false`
- **数据属性**: `limit`
  - **可选**: 是。
  - **说明**: 返回的最大项目数量。
  - **示例**: `25`
- **数据属性**: `offset`
  - **可选**: 是。
  - **说明**: 从列表中的哪个位置开始返回结果。
  - **示例**: `10`
- **数据属性**: `search`
  - **可选**: 是。
  - **说明**: 用于进一步筛选结果的字符串。
  - **示例**: `Home`
- **数据属性**: `order_by`
  - **可选**: 是。
  - **说明**: 按此字段对列表排序。可用排序选项可在 开发者工具 > 操作 > `music_assistant.get_library` 操作中查看。
  - **示例**: `year`
- **数据属性**: `album_artists_only`
  - **可选**: 是。
  - **说明**: 当 `media_type` 为 `artist` 时，此选项会将结果限制为仅专辑艺人。
  - **示例**: `true`
- **数据属性**: `album_type`
  - **可选**: 是。
  - **说明**: 当 `media_type` 为 `album` 时，此选项会根据所选的 album、single、compilation、EP 或 unknown 限制结果。
  - **示例**: `album`

#### 示例

此示例会开始播放十首随机曲目。

```yaml
script:
  create_random_queue:
    mode: single
    sequence:
      - action: music_assistant.get_library
        data:
          limit: 10
          media_type: track
          config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
          order_by: random
        response_variable: random_tracks
      - action: music_assistant.play_media
        data: 
          media_id: "{{ random_tracks['items'] | map(attribute='uri') | list }}" 
          media_type: track
          enqueue: replace
        target:
          entity_id: media_player.ma_kitchen_speaker
```

### 操作 `music_assistant.get_queue`

获取 Music Assistant 播放器队列的详细信息。这样可以通过程序访问队列中当前和下一个媒体项目的完整信息，这些信息可用于创建定制媒体仪表板。

- **数据属性**: `entity_id`
  - **可选**: 否。
  - **说明**: 持有待获取队列的播放器 `entity_id`。
  - **示例**: `media_player.kitchen_speaker`

#### 示例

此示例会将当前正在播放曲目的名称写入 [`input_text`](https://www.home-assistant.io/integrations/input_text/)，随后可在仪表板中使用。

```yaml
script:
  get_now_playing:
    mode: queued
    alias: "Get Now Playing Track Name"
    sequence:
      - action: music_assistant.get_queue
        data:
          entity_id: media_player.ma_kitchen_speaker
        response_variable: queue_info
      - action: input_text.set_value
        data:
          entity_id: input_text.now_playing 
          value: "{{ queue_info['media_player.ma_kitchen_speaker'].current_item.name }}" 
```
  
## 注意事项

- 添加到 Music Assistant 的任何 Home Assistant 播放器都会显示为重复项，因为系统会创建该播放器的 MA 版本。如果需要，你可以隐藏原始 HA 播放器。

## 支持的设备

此集成需要 Music Assistant 服务器版本 2.4 或更高版本。它可以连接以应用形式运行的 Music Assistant 服务器，也可以连接在独立 Docker 容器中运行的服务器。

Music Assistant 原生支持以及通过 [Home Assistant provider](https://www.music-assistant.io/player-support/ha/) 支持 [大量设备](https://www.music-assistant.io/player-support/)。安装 Home Assistant provider 后，任意 Home Assistant 媒体播放器都可以作为播放器出现在 Music Assistant 中，从而受益于 Music Assistant 提供的高级播放功能。一般来说，如果设备有原生的 Music Assistant provider，应优先使用该方式添加，而不是使用 HA 媒体播放器。各个 provider 的相关限制可在 [Music Assistant 文档](https://www.music-assistant.io/) 中对应的 Player Provider 页面查看。

## 已知限制

如果项目不在媒体库中，`get_queue` 操作返回的数据会受到部分限制，例如直接从 Spotify 选择播放的项目。收藏状态、露骨内容状态、上次播放时间、播放次数以及唱片封面 URL 等元数据，仅适用于位于 MA 媒体库中的项目。

电台模式仅适用于部分音乐提供商。如果你尝试在未关联到这些提供商的项目上启用电台模式，将显示错误。请查阅 [Music Assistant 文档](https://www.music-assistant.io/music-providers/#summary)，确认哪些提供商支持此功能。

## 故障排除

### 找不到 MA 操作

#### 症状：编辑器中未显示 Music Assistant 操作

当你尝试通过图形界面设置脚本或自动化时，找不到任何 MA 操作。

##### 说明

这通常意味着你可能安装了应用，但尚未安装集成。

##### 解决方法

前往[配置部分](https://www.home-assistant.io/integrations/music_assistant/#configuration)并安装该集成。

## 删除集成

此集成遵循标准的集成删除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

删除集成后，前往 [**Settings** > **Apps**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=music_assistant)，并从那里一并删除 **Music Assistant** 应用（如果已安装）。
