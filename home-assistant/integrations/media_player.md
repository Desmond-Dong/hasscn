# Media player

与网络中的媒体播放器交互。

:::note Building block integration
This media player is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this media player building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the media player building block offers.
:::

## 媒体播放器的状态

媒体播放器可以具有以下状态：

* **Off**：媒体播放器已关闭，在打开之前不接受命令。
* **On**：媒体播放器已打开，但当前还不知道其详细状态。
* **Idle**：媒体播放器已打开并接受命令，但当前没有播放任何媒体，可能停留在空闲主界面。
* **Playing**：媒体播放器当前正在播放媒体。
* **Paused**：媒体播放器已有正在处理的媒体，但当前处于暂停状态。
* **Buffering**：媒体播放器正在准备开始播放媒体。
* **Unavailable**：该实体当前不可用。
* **Unknown**：状态暂时未知。

## 动作

### 媒体控制动作

可用动作：`turn_on`、`turn_off`、`toggle`、`volume_up`、`volume_down`、`volume_set`、`volume_mute`、`media_play_pause`、`media_play`、`media_pause`、`media_stop`、`media_next_track`、`media_previous_track`、`clear_playlist`、`shuffle_set`、`repeat_set`、`play_media`、`select_source`、`select_sound_mode`、`join`、`unjoin`

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | 是 | 指定某个媒体播放器。若要指定所有媒体播放器，请使用 `all`。 |

#### 动作：Volume mute

`media_player.volume_mute` 动作用于将媒体播放器静音或取消静音。

| 数据属性 | 可选 | 说明 |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            | 是 | 指定某个媒体播放器。若要指定所有媒体播放器，请使用 `all`。 |
| `is_volume_muted`      | 否 | 用 `true`/`false` 表示静音或取消静音 |

#### 动作：Volume set

`media_player.volume_set` 动作用于设置媒体播放器的音量级别。

| 数据属性 | 可选 | 说明 |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            | 是 | 指定某个媒体播放器。若要指定所有媒体播放器，请使用 `all`。 |
| `volume_level`         | 否 | 音量级别的浮点数，范围为 0..1 |

#### 动作：Media seek

`media_player.media_seek` 动作用于跳转到当前播放媒体中的指定位置。

| 数据属性 | 可选 | 说明 |
|------------------------|----------|--------------------------------------------------------|
| `entity_id`            | 是 | 指定某个媒体播放器。若要指定所有媒体播放器，请使用 `all`。 |
| `seek_position`        | 否 | 要跳转到的位置，格式取决于具体平台。 |

#### 动作：Play media

`media_player.play_media` 动作用于让媒体播放器播放媒体。

| 数据属性 | 可选 | 说明 |
| -----------------------| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | 是 | 指定某个媒体播放器。若要指定所有媒体播放器，请使用 `all`。 |
| `media_content_id`     | 否 | 媒体标识符，其格式取决于具体集成。例如，Sonos 和 Cast 可传入 URL，而 iTunes 只能传入播放列表 ID。 |
| `media_content_type`   | 否 | 媒体类型。必须是 `music`、`tvshow`、`video`、`episode`、`channel` 或 `playlist` 之一。例如，要播放音乐，应将 `media_content_type` 设为 `music`。 |
| `enqueue`              | 是 | 新媒体与当前队列的交互方式。必须是 `add`、`next`、`play`、`replace` 之一。如果媒体播放器不支持此功能，新媒体会直接播放，并忽略 `enqueue` 指令。 |
| `announce`             | 是 | 设为 `true` 时，请求媒体播放器临时停止当前播放来播报此媒体，然后恢复播放。如果媒体播放器不支持该功能，播报仍会播放，但不会在结束后恢复先前被中断的媒体。 |
| `extra`                | 是 | 要发送的额外字典数据，例如标题、缩略图。可用值见下文。 |

##### 额外字典数据

```yaml
title:
  type: string
  description: 媒体标题。
  required: false
thumb:
  type: string
  description: 缩略图 URL。
  required: false
current_time:
  type: float
  description: 从内容开头起经过的秒数。如果内容为直播且未指定位置，流会从直播位置开始。
  required: false
autoplay:
  type: boolean
  description: 媒体是否自动播放。
  default: true
  required: false
stream_type:
  type: string
  description: "描述媒体流类型，可为以下之一：`NONE`、`BUFFERED`、`LIVE`。"
  required: false
subtitles:
  type: string
  description: 要在 Chromecast 上显示的字幕文件 URL。
  required: false
subtitles_lang:
  type: string
  description: 字幕语言。
  required: false
subtitles_mime:
  type: string
  description: 字幕的 MIME 类型。
  required: false
subtitle_id:
  type: integer
  description: 要加载的字幕 ID。
  required: false
enqueue:
  type: boolean
  description: 若为 True，则将媒体加入队列而不是立即播放。
  default: false
  required: false
media_info:
  type: map
  description: 未在此明确列出的其他 MediaInformation 属性。
  required: false
metadata:
  type: map
  description: "媒体元数据对象，可为以下之一：`GenericMediaMetadata`、`MovieMediaMetadata`、`TvShowMediaMetadata`、`MusicTrackMediaMetadata`、`PhotoMediaMetadata`。"
  required: false
```

文档：

* [Google 开发者文档 MediaData](https://developers.google.com/cast/docs/reference/messages#MediaData)
* [Google 开发者文档 MediaInformation](https://developers.google.com/cast/docs/reference/web_receiver/cast.framework.messages.MediaInformation)

设置标题和图片后调用媒体播放器动作的示例：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.chromecast
data:
  media_content_type: music
  media_content_id: "https://fake-home-assistant.io.stream/aac"
  extra:
    thumb: "https://brands.home-assistant.io/_/homeassistant/logo.png"
    title: HomeAssistantRadio
```

#### 动作：Select source

`media_player.select_source` 动作用于为媒体播放器选择输入源。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | 是 | 指定某个媒体播放器。若要指定所有媒体播放器，请使用 `all`。 |
| `source`               | 否 | 要切换到的输入源名称，取决于具体平台。 |

#### 动作：Select sound mode

`media_player.select_sound_mode` 动作用于为媒体播放器选择声音模式。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | 是 | 指定某个媒体播放器，例如 `media_player.marantz` |
| `sound_mode`           | 否 | 要切换到的声音模式名称，取决于具体平台。 |

#### 动作：Shuffle set

`media_player.shuffle_set` 动作用于启用或禁用媒体播放器的随机播放模式。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | 是 | 指定某个媒体播放器，例如 `media_player.spotify` |
| `shuffle`              | 否 | 用 `true`/`false` 表示启用或禁用随机播放 |

#### 动作：Repeat set

`media_player.repeat_set` 动作用于设置媒体播放器的重复播放模式。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | 是 | 指定某个媒体播放器，例如 `media_player.kitchen` |
| `repeat`               | 否 | 使用 `off`、`all` 或 `one` 设置重复模式 |

#### 动作：Join

`media_player.join` 动作用于将多个媒体播放器编组，以实现同步播放。仅适用于支持多房间音频的系统。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | 是 | 其播放将扩展到 `group_members` 中指定播放器的媒体播放器实体。 |
| `group_members`        | 否 | 要与 `entity_id` 的播放同步的播放器实体。 |

#### 动作：Unjoin

`media_player.unjoin` 动作用于将媒体播放器从任意播放器分组中移除。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | 是 | 将该媒体播放器从任何播放器分组中移除。 |

#### 动作：Browse media

`media_player.browse_media` 动作用于访问集成提供的媒体树浏览功能，类似于通过媒体播放器界面浏览媒体。常见用途包括需要浏览媒体库并按特定分类查找媒体的自动化。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------- |
| `media_content_type`   | 是 | 要浏览的媒体类型，例如 music、playlist、video。具体取决于集成。 |
| `media_content_id`   | 是 | 要浏览的内容 ID。具体取决于集成。内容 ID 为空时会返回浏览树的顶层。 |

该动作会返回一个媒体树对象，可存储到响应变量中供后续自动化步骤使用。返回内容包括：

| 字段 | 说明 |
|-------|-------------|
| `title` | 当前层级的显示名称 |
| `media_class` | 当前项的类型（例如 directory、music、video） |
| `media_content_type` | 内容类型标识符 |
| `media_content_id` | 集成特定的内容 ID |
| `children_media_class` | `children` 数组中项目的类型 |
| `children` | 具有类似属性的子项数组 |

浏览树的根节点。

注意：以下示例展示的是 Sonos 设备返回的响应。不同媒体播放器集成的结构和内容类型可能不同。媒体内容 ID 通常经过 URL 编码。

```yaml
  # Get the top of the browse tree
  - action: media_player.browse_media
    target:
      entity_id: media_player.living_room
    response_variable: top_level
```

```yaml
# 简化后的响应示例
media_player.living_room:
  title: Sonos
  media_class: directory
  media_content_type: root
  media_content_id: ""
  # children_media_class 表示 children 数组中的所有项目都是目录
  children_media_class: directory
  children:
    - title: Favorites
      media_class: directory
      media_content_type: favorites
      media_content_id: ""
    - title: Music Library
      media_class: directory
      media_content_type: library
      media_content_id: ""
```

使用 Sonos 集成浏览特定艺人的示例：

注意：此示例演示如何浏览某位艺人的专辑。`media_content_id` 的格式（`A:ALBUMARTIST/artist_name`）是 Sonos 特有的。请注意，响应中专辑名里的特殊字符经过了 URL 编码（例如空格会显示为 `%20`）。

```yaml
  - action: media_player.browse_media
    target:
      entity_id: media_player.living_room
    data:
      media_content_id: A:ALBUMARTIST/Beatles
      media_content_type: album
    response_variable: albums
```

```yaml
# 简化后的响应示例
media_player.living_room:
  title: Beatles
  media_class: album
  media_content_type: album
  media_content_id: A:ALBUMARTIST/Beatles
  children_media_class: directory
  children:
    - title: A Hard Day's Night
      media_class: album
      media_content_type: album
      media_content_id: A:ALBUMARTIST/Beatles/A%20Hard%20Day's%20Night
    - title: Abbey Road
      media_class: album
      media_content_type: album
      media_content_id: A:ALBUMARTIST/Beatles/Abbey%20Road
```

## 设备类别

A device class is a measurement categorization in Home Assistant. It influences how the entity is represented in the [dashboard](/home-assistant/dashboards/index.md). This can be modified in the [customize section](/home-assistant/docs/configuration/customizing-devices/index.md). For example, different states may be represented by different icons, colors, or text.

下图展示了代表媒体播放器实体设备类别的不同图标：

<p class='img'>
<img src='/home-assistant/images/screenshots/device_class_media_player_icons.png' alt='Screenshot showing different icons representing device classes of the media player entity' />
媒体播放器实体不同设备类别图标示例。
</p>

媒体播放器支持以下设备类别：

* `tv`：设备是电视类型设备。
* `speaker`：设备是扬声器或音响类型设备。
* `receiver`：设备是音视频接收器类型设备，接收音频并输出到扬声器，同时将视频输出到显示设备。
