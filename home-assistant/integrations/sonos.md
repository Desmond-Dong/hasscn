# Sonos

**Sonos** 集成允许你在 Home Assistant 中控制 [Sonos](https://www.sonos.com) 无线音箱，也支持 IKEA Symfonisk 音箱。

## 前提条件

要使此集成正常工作，你的 Sonos 系统必须启用 UPnP。在 Sonos 应用中，前往 **Account** > **Privacy and Security** > **UPnP** 并启用该设置。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 功能控制与传感器

音箱级控制会以 `number`、`select` 或 `switch` 实体提供。此外，还会提供多种 `sensor` 与 `binary_sensor` 实体。

### 可控功能

* **所有设备**：闹钟、低音（Bass）、高音（Treble）、响度（Loudness）、交叉淡入淡出（Crossfade）、状态灯（Status Light）、触控控制（Touch Controls）
* **家庭影院设备**：音频延迟（"Lip Sync"）、夜间模式（Night Sound）、语音增强（Speech Enhancement）、环绕启用（Surround Enabled）、环绕音乐音量（"Full/Ambient"）、环绕级别（"TV Level"）、音乐环绕级别
* **配对低音炮时**：低音炮启用、低音炮增益、低音炮分频频率（仅 Sonos Amp）

### 传感器

* **每个 Sonos 系统**：Sonos Favorites
* **带电池的设备**：电池电量、电源状态
* **家庭影院设备**：音频输入格式
* **支持语音的设备**：麦克风启用状态

### 选择实体

会创建以下选择（select）实体：

* **Dialog Level**\
  允许你在 **Sonos Arc Ultra** 回音壁上设置对白模式。可选项为 None、Low、Medium、High 或 Max。

### 电池支持说明

使用 S2 固件的 `Sonos Roam` 和 `Sonos Move` 设备可完整支持电池传感器。仍在使用 S1 固件的 `Sonos Move` 也受支持，但更新频率可能较低。

对于每个带电池的音箱，都会创建一个显示当前电量的 `sensor`，以及一个显示音箱电源状态的 `binary_sensor`。该 `binary_sensor` 会报告音箱当前是否由外部电源供电，其 `power_source` 属性会显示具体供电来源。该属性可能为 `BATTERY`，无线充电时为 `SONOS_CHARGING_RING`，或通过 USB 线充电时为 `USB_POWER`。请注意，即使使用通用 Qi 充电器，Roam 也会报告为 `SONOS_CHARGING_RING`。

:::note
电池传感器依赖变更事件，若变更事件不可用则更新会延迟。S1 的电池传感器**必须**依赖可用事件才能上报数据。更多信息见[高级用法](#advanced-use)。

:::

### 闹钟支持说明

Sonos 集成会为 Sonos 应用中设置的每个闹钟添加一个 `switch`。这些闹钟开关会自动检测、删除和分配，并带有多个可用于监控 Sonos 闹钟的属性。

### 麦克风支持说明

麦克风只能通过 Sonos 设备上的物理按键启用或禁用，无法在 Home Assistant 中控制。当前状态会由 `binary_sensor` 上报。

### Sonos Favorites 支持说明

收藏夹传感器会提供 Sonos 原生应用中保存到 My Sonos 的每个收藏项名称及其 `media_content_id` 值。该传感器适用于需要在自定义模板中访问收藏项的用户。对大多数用户，建议通过媒体浏览器和“播放媒体”脚本/自动化动作来访问收藏项。

调用 `media_player.play_media` 动作时，`media_content_type` 必须设为 "favorite\_item\_id"，`media_content_id` 必须设为收藏项的键值部分。

使用项目 ID 的动作示例：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos_speaker1
data:
  media_content_type: "favorite_item_id"
  media_content_id: "FV:2/31"
```

使用 Sonos 播放列表名称的示例：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos_speaker1
data:
  media_content_type: playlist
  media_content_id: stevie_wonder
```

模板示例：

```yaml
# 获取全部收藏名称列表（旧行为）
{{ state_attr("sensor.sonos_favorites", "items").values() | list }}

# 按位置获取特定收藏名称
{{ (state_attr("sensor.sonos_favorites", "items").values() | list)[3] }}

# 随机获取一个项目的 `media_content_id`
{{ state_attr("sensor.sonos_favorites", "items") | list | random }}

# 循环获取名称与 media_content_id
{% for media_id, name in state_attr("sensor.sonos_favorites", "items").items() %}
  {{ name, media_id }}
{% endfor %}
```

:::tip
Sonos 收藏夹传感器（`sensor.sonos_favorites`）默认禁用。你可以在 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 页面 Sonos 集成关联的实体列表中找到并启用它。

:::

## 播放媒体

在 `media_player.play_media` 动作中，Sonos 支持多种 `media_content_id` 格式，最常见的是 URI。例如，Spotify 和 Tidal 的分享链接都可直接使用。你也可以播放[托管在 Plex 服务器上的音乐](/home-assistant/integrations/plex.md#sonos-playback)。如果 Sonos 设备可直接访问 URI，也可使用本地或远程媒体文件的 HTTP/HTTPS 直链，但具体编码格式支持情况可能不同。

需要账号的音乐服务（如 Spotify）必须先在 Sonos 应用中完成配置。

将 `announce` 参数设为 `true` 后，你可以把 TTS（文本转语音）或音频文件当作提示音播放（例如门铃或警报）。使用 `announce` 时，系统会以叠加方式播放提供的媒体 URL，轻柔降低当前音乐音量，并在播放结束后自动恢复到原音量。你还可以在 `extra` 字典中传入可选的 `volume` 参数，以指定提示音音量。请注意，较老的 Sonos 硬件或旧版固件（"S1"）可能无法完整支持这些功能。此外，受限网络环境下请参阅[网络要求](#network-requirements)。

动作中还可添加可选参数 `enqueue`。如果为 `replace` 或未提供，则会替换当前队列并替换当前项目。若为 `add`，项目会追加到队列末尾。若为 `next`，项目会插入队列并在下一首播放。若为 `play`，项目会加入队列并立即播放。

### 示例：

下面是一个动作示例：通过 `announce` 功能及其关联的（可选）`volume` 参数，播放来自本地网络 Web 服务器（如 Home Assistant 内置 Web 服务器）的音频文件：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos
data:
  announce: true
  media_content_type: "music"
  media_content_id: "http://192.168.1.50:8123/local/sound_files/doorbell-front.mp3"
  extra:
    volume: 20
```

标准 `tts.<source>_say` 动作不直接接受 `volume` 参数。若要为 TTS 播报设置音量，可使用 TTS 媒体源 URL 并调用标准 `media_player.play_media` 动作：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos
data:
  announce: true
  media_content_id: >
    media-source://tts/cloud?message="I am very loud"
  media_content_type: "music"
  extra:
    volume: 80
```

Sonos 也可播放来自 Spotify 的音乐或播放列表。Spotify 的 URI 和 URL 都可直接使用。可选参数 `title` 可用于正确填充 `media_playlist` 属性。以下是使用播放列表 URI 的动作示例：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos
data:
  media_content_type: "playlist"
  media_content_id: "spotify:playlist:abcdefghij0123456789XY"
  enqueue: true
  extra:
    title: Example Playlist
```

使用 Spotify URL 的动作示例：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos
data:
  media_content_type: "music"
  media_content_id: "https://open.spotify.com/album/abcdefghij0123456789YZ"
```

你在家中运行了 [Plex Media Server](/home-assistant/integrations/plex.md#sonos-playback) 吗？Sonos 集成也能与其配合。以下示例会直接从你的 Plex 服务器播放音乐：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos
data:
  media_content_type: "music"
  media_content_id: >
    plex://{ "library_name": "Music", "artist_name": "M83", "album_name": "Hurry Up, We're Dreaming" }
```

#### Sonos 音乐资料库

如果你已经配置 Sonos 音乐资料库，就可以从中播放音乐。

播放 Beatles 的全部专辑。

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos
data:
  media_content_type: album
  media_content_id: A:ALBUMARTIST/Beatles
```

播放指定专辑：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos
data:
  media_content_type: album
  media_content_id: A:ALBUM/The Wall
  enqueue: replace
```

或者将指定艺术家的指定专辑加入队列。这在你有多个同名专辑时很有用。

```yaml
action: media_player.play_media
target:
  entity_id: media_player.sonos      
data:
  media_content_type: album
  media_content_id: A:ALBUMARTIST/Neil Young/Greatest Hits
  enqueue: add
```

播放某位作曲家的全部专辑。

```yaml
action: media_player.play_media
target:
  entity_id: media_player.porch
data:
  media_content_type: composer
  media_content_id: A:COMPOSER/Carlos Santana
  enqueue: play
```

按流派播放全部专辑。

```yaml
action: media_player.play_media
target:
  entity_id: media_player.porch
data:
  media_content_type: genre
  media_content_id: "A:GENRE/Classic%20Rock/"
  enqueue: play
```

通过标题播放已导入的播放列表。

```yaml
action: media_player.play_media
target:
  entity_id: media_player.porch
data:
  media_content_type: playlist
  media_content_id: S:/MyPlaylist
  enqueue: play
```

## 动作

除[标准媒体播放器动作](/home-assistant/integrations/media_player/index.md#actions)外，Sonos 集成还提供多种自定义动作。

### 动作：Snapshot

`sonos.snapshot` 动作用于对一个或多个音箱当前播放状态创建快照。如果你想播放门铃或通知音后恢复原播放内容，这个动作以及下一个动作会很有用。

:::note
播放队列不会被快照，恢复前必须保持不变。使用 `media_player.play_media` 是安全的，可用于播放通知音，包括 [TTS](/home-assistant/integrations/tts/index.md) 播报。

:::
| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 要创建快照的音箱。若要作用于所有 Sonos 设备，使用 `all`。 |
| `with_group` | 是 | 是否同时快照分组布局以及组内其他音箱状态，默认值为 true。 |

### 动作：Restore

`sonos.restore` 动作用于恢复先前为一个或多个音箱创建的快照。

:::note
播放队列不会被快照。若在已替换队列的音箱上执行 `sonos.restore`，将恢复播放位置，但位置对应的是新队列。

:::
:::note
云端队列无法重新启动。这包括在 Spotify 内启动的队列，以及由 Amazon Alexa 控制的队列。

:::
| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 需要恢复快照的 `entity_id` 字符串或列表。若要作用于所有 Sonos 设备，使用 `all`。 |
| `with_group` | 是 | 是否同时恢复分组布局及组内其他音箱状态，默认值为 true。 |

### 动作：Set sleep timer

`sonos.set_sleep_timer` 动作用于设置睡眠计时器。到达设定时间后，音箱会通过渐降音量至 0 的方式关闭。小技巧：若将 `sleep_time` 设为 0，音箱会立即开始渐降音量。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 要设置计时器的 `entity_id` 字符串或列表。 |
| `sleep_time` | 否 | 音箱开始渐降前等待的秒数（整数）。不得超过 86399（一天）。 |

### 动作：Clear sleep timer

`sonos.clear_sleep_timer` 动作用于清除音箱上已设置的睡眠计时器。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 要清除计时器的 `entity_id` 字符串或列表。必须是协调者音箱。 |

### 动作：Update alarm

`sonos.update_alarm` 动作用于更新现有 Sonos 闹钟。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 要更新闹钟的 `entity_id` 字符串或列表。必须是协调者音箱。 |
| `alarm_id` | 否 | Sonos 用于标识闹钟的整数 ID。 |
| `time` | 是 | 要设置的闹钟时间。 |
| `volume` | 是 | 闹钟音量，浮点数。 |
| `enabled` | 是 | 是否启用该闹钟，布尔值。 |
| `include_linked_zones` | 是 | 是否让闹钟在分组播放器上同时播放，布尔值。 |

### 动作：Play queue

`sonos.play_queue` 动作用于开始播放 Sonos 队列。

可强制开始播放队列，支持从其他流（如电台）切换到队列播放。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 要开始播放的 `entity_id` 字符串或列表。若目标为分组，必须是协调者。 |
| `queue_position` | 是 | 开始播放的队列歌曲位置，从 0 开始。 |

### 动作：Get queue

`sonos.get_queue` 动作会返回媒体播放器队列。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | `media_player` 实体 ID。 |

该脚本示例执行以下操作：获取队列、倒序循环，并删除包含 “holiday” 字样的媒体项。

```yaml
  - action: sonos.get_queue
    target:
      entity_id: media_player.living_room
    response_variable: queue
  - variables:
      queue_len: '{{ queue["media_player.living_room"] | length }}'
  - repeat:
      sequence:
        - variables:
            title: '{{ queue["media_player.living_room"][queue_len - repeat.index]["media_title"].lower() }}'
            album: '{{ queue["media_player.living_room"][queue_len - repeat.index]["media_album_name"].lower() }}'
            position: '{{ queue_len - repeat.index }}'
        - if:
            - '{{ "holiday" in title or "holiday" in album }}'
          then:
            - action: sonos.remove_from_queue
              target:
                entity_id: media_player.living_room
              data:
                queue_position: '{{position}}'
      until:
        - condition: template
          value_template: '{{queue_len == repeat.index}}'

```

### 动作：Remove from queue

`sonos.remove_from_queue` 动作用于从队列中移除项目。
| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 要从队列中移除项目的 `entity_id` 字符串或列表。若目标为分组，必须是协调者。 |
| `queue_position` | 是 | 要移除的队列位置。 |

```yaml
# 自动化示例：将刚播放过的歌曲从队列移除
alias: "Remove last played song from queue"
triggers:
  - trigger: state
    entity_id: media_player.kitchen
  - trigger: state
    entity_id: media_player.bathroom
  - trigger: state
    entity_id: media_player.move
conditions:
  - condition: and
    conditions:
      # 协调者
      - condition: template
        value_template: >
          {{ state_attr( trigger.entity_id , 'group_members')[0] ==  trigger.entity_id }}
      # 从一个队列位置切换到下一个队列位置
      - condition: template
        value_template: >
          {{ 'queue_position' in trigger.from_state.attributes and 'queue_position' in trigger.to_state.attributes }}
      # 位置前进
      - condition: template
        value_template: >
          {{ trigger.from_state.attributes.queue_position < trigger.to_state.attributes.queue_position }}
actions:
  - action: sonos.remove_from_queue
    target:
      entity_id: >
        {{ trigger.entity_id }}
    data:
      queue_position: >
        {{ trigger.from_state.attributes.queue_position }}
```

## Network requirements

为获得最佳体验，Sonos 设备必须能够通过 TCP 1400 端口回连到 Home Assistant 主机。这样推送更新才能正常工作。如果该端口被阻止或 Sonos 设备无法访问，集成会退回到轮询模式，更新更慢且效率更低。检测到该问题时，集成会提示你。

使用 `announce` 选项或 TTS 播放音频时，需要 Home Assistant 主机能够访问每台 Sonos 设备的 TCP 1443 端口。

若你的网络拓扑较复杂，可能需要额外配置来解决此问题，请参阅下方[高级用法](#advanced-use)。

## Advanced use

对于高级场景，可使用一些手动配置选项。通常仅在 Home Assistant 与 Sonos 不在同一子网、且网络结构较复杂时才需要。

你可以通过指定 Sonos IP 地址来禁用自动发现：

```yaml
# `configuration.yaml` 示例：手动指定 Sonos IP 地址
sonos:
  media_player:
    hosts:
      - 192.0.2.25
      - 192.0.2.26
      - 192.0.2.27
```

如果你的 Home Assistant 实例有多个 IP 地址，你可以通过 [Network](/home-assistant/integrations/network/index.md) 集成选择 Sonos 自动发现所使用的特定 IP 地址。通常仅在 Sonos 音箱位于默认网卡无法到达的网段时才需要这样做。

Sonos 音箱会尝试回连 Home Assistant 以发送变更事件。默认情况下，Home Assistant 会监听 1400 端口；如果该端口被占用，会尝试 1400 之后的 100 个端口。你还可以修改 Home Assistant 向 Sonos 音箱通告的 IP 地址。在 NAT 场景下（例如 Docker 未使用 `--net=host` 时）这会很有帮助：

```yaml
# `configuration.yaml` 示例：修改通告主机地址
sonos:
  media_player:
    advertise_addr: 192.0.2.1
```

## 移除此集成

此集成遵循标准移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 故障排查

### 配置集成时出现 403 错误

#### 症状

配置集成时出现以下错误：

```text
requests.exceptions.HTTPError: 403 Client Error: Forbidden for url: http://192.168.1.1:1400/DeviceProperties/Control
```

#### 说明

该错误表示你的 Sonos 系统未正确启用 UPnP。此集成需要通过 UPnP 与 Sonos 设备通信。

#### 解决方法

要解决此问题，请在 Sonos 系统中启用 UPnP：

1. 在手机或平板上打开 Sonos 应用。
2. 前往 **Account** > **Privacy and Security** > **UPnP**。
3. 启用 **UPnP** 设置。
4. 重新尝试配置该集成。
