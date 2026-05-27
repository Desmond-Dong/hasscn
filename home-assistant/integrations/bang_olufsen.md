# Bang & Olufsen

**Bang & Olufsen** 集成允许通过 Home Assistant 控制某些 [Bang & Olufsen](https://www.bang-olufsen.com/) 设备的部分功能。

## 兼容设备

已测试且\_应该\_无故障工作的设备：

* [Beoconnect Core](https://www.bang-olufsen.com/en/dk/accessories/beoconnect-core)
* [Beolab 8](https://www.bang-olufsen.com/en/dk/speakers/beolab-8)
* [Beolab 28](https://www.bang-olufsen.com/en/dk/speakers/beolab-28)
* [Beosound 2 3rd gen](https://www.bang-olufsen.com/en/dk/speakers/beosound-2)
* [Beosound A5](https://www.bang-olufsen.com/en/dk/speakers/beosound-a5)
* [Beosound A9 5th gen](https://www.bang-olufsen.com/en/dk/speakers/beosound-a9)
* [Beosound Balance](https://www.bang-olufsen.com/en/dk/speakers/beosound-balance)
* [Beosound Emerge](https://www.bang-olufsen.com/en/dk/speakers/beosound-emerge)
* [Beosound Level](https://www.bang-olufsen.com/en/dk/speakers/beosound-level)
* [Beosound Premiere](https://www.bang-olufsen.com/en/dk/soundbars/beosound-premiere)
* [Beosound Theatre](https://www.bang-olufsen.com/en/dk/soundbars/beosound-theatre)
* [Beoremote One](https://www.bang-olufsen.com/en/dk/accessories/beoremote-one) 通过配对设备

以及任何其他基于 [Mozart](https://support.bang-olufsen.com/hc/en-us/articles/24766979863441-Which-platform-is-my-Connected-Audio-product-based-on) 的产品。这意味着所有在 2020 年之后推出的 [Connected Speakers](https://www.bang-olufsen.com/en/dk/story/connected-speakers)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
IP Address:
  description: 您设备的 IP 地址。可以通过 [Bang & Olufsen 应用程序](https://www.bang-olufsen.com/en/dk/story/apps) 导航到设备并选择 `Settings` → `About` → `IP address` 找到。
Device model:
  description: 您的 Bang & Olufsen 设备的型号名称。用于确定设备的某些功能。如果设备尚不在列表中，请选择与您的产品类似的产品。
```

## 数据更新

**Bang & Olufsen** 集成使用 [Mozart API](https://bang-olufsen.github.io/mozart-open-api)，这是一个本地 REST API，具有 WebSocket 通知通道，可提供媒体元数据、播放进度、音量等的即时状态信息。唯一的例外是重复和随机播放控件，它们每 30 秒轮询一次。

## 支持的功能

目前，对于每个添加的物理设备，会创建一个设备，包括一个 `media_player` 实体和（如果可用）`event` 实体。

### 媒体播放器

通过媒体播放器实体可以使用许多功能：

* 查看当前元数据、进度、音量等。
* 控制下一首/上一首、播放/暂停、随机/重复设置、音量、声音模式、音频和视频源等。
* 通过 [play\_media 动作](#play_media-actions) 播放各种媒体。
* 通过 [Beolink](https://support.bang-olufsen.com/hc/en-us/articles/4411572883089-What-is-Beolink-Multiroom) 控制多房间音频：
  * 使用 Home Assistant media\_player 分组控制。
  * 通过媒体播放器属性监控当前 [Beolink 状态](#beolink)。
  * 对于更高级的用法，已定义 [自定义 Beolink 服务](#custom-actions)：
    * 连接或扩展到 Home Assistant 中不可用的 [ASE](https://support.bang-olufsen.com/hc/en-us/articles/24766979863441-Which-platform-is-my-Connected-Audio-product-based-on) 产品。
    * 将会话扩展到所有发现的设备。
    * 连接到、扩展到或取消扩展设备。
    * 将所有连接的 Beolink 设备设置为待机。

### 事件

#### Mozart 设备控件

为设备上每个可用的物理控件创建事件实体。这些控件通常有自己的行为，因此将它们用于自动化并不总是理想的。
可用的事件实体：

* 蓝牙（Beosound Premiere 上不可用）
* 麦克风
* 下一首
* 播放/暂停
* 收藏 1
* 收藏 2
* 收藏 3
* 收藏 4
* 上一首
* 音量

所有这些事件实体都支持以下事件类型：

* 短按释放
* 长按
* 长按释放
* 超长按
* 超长按释放

##### 按钮变体

许多设备具有相同的按钮布局，但并非所有设备都如此。以下是差异：

* [Beoconnect Core](https://www.bang-olufsen.com/en/dk/accessories/beoconnect-core) 不支持设备控件。
* [Beosound A9 5th gen](https://www.bang-olufsen.com/en/dk/speakers/beosound-a9) 和 [Beosound Premiere](https://www.bang-olufsen.com/en/dk/soundbars/beosound-premiere) 没有蓝牙或麦克风按钮
* [Beosound A5](https://www.bang-olufsen.com/en/dk/speakers/beosound-a5) 没有麦克风按钮

#### Beoremote One

为每个配对的 Beoremote One 通过其配对的 Mozart 设备创建一个 Home Assistant 设备。为遥控器上每个兼容按键创建事件实体。这些事件实体默认禁用。

Beoremote One 设备在检测到时自动添加。

##### 触发事件

有 4 种不同类型的按键事件：

* 控制功能
* 控制键
* 灯光功能
* 灯光键

可以通过在 `Control` 或 `Light` 高亮显示时按 `Right` 键访问功能，并可以通过按 `Select` 触发。

可以通过在 `Control` 或 `Light` 高亮显示时按 `Select` 键触发按键，然后按其中一个兼容按键。也可以跳过 `Select` 按，只需在所需子菜单高亮显示时按其中一个兼容按键即可。

每个触发器有两种不同的事件状态：

* key\_press
* key\_release

总共，每个遥控器有 90 个不同的遥控按键事件实体。

##### 配置灯光和控制功能

Beoremote One 上有许多功能可用。这些功能作为 **Light** 子菜单的 `function` 1-17 和 **Control** 子菜单的 1-27 可用。

默认情况下只启用这些功能的子集。按照以下步骤更改 **Control** 和 **Light** 子菜单的设置：

* 按上并选择当前选择的配对设备的名称。这将显示配对设备的列表。
* 选择 **Beovision**
* 导航到 **Settings** > **Advanced** > **Light menu** / **Control menu**。
  * 使用 **Show** 设置更改可见的功能。
  * 使用 **Rename** 设置重命名可见的功能。
  * 使用 **Move** 设置重新排序可见的功能。

功能名称对 Mozart 设备不可用，因此启用 [调试日志](#diagnostics-and-troubleshooting) 并触发功能以查看哪些功能 ID 与遥控器上的哪些功能相关联。

### 传感器

#### Mozart 电池电量

具有内置电池的 Mozart 设备，如 [Beosound A5](https://www.bang-olufsen.com/en/dk/speakers/beosound-a5) 和 [Beosound Level](https://www.bang-olufsen.com/en/dk/speakers/beosound-level)，将有电池电量传感器。

#### Beoremote One 电池电量

任何配对的 Beoremote One 遥控器都将有关联的电池电量传感器。来自遥控器的电池电量报告目前不太准确，但仍可使用。

### 二值传感器

#### Mozart 电池充电

具有内置电池的 Mozart 设备，如 [Beosound A5](https://www.bang-olufsen.com/en/dk/speakers/beosound-a5) 和 [Beosound Level](https://www.bang-olufsen.com/en/dk/speakers/beosound-level)，有电池充电二值传感器。

## 限制

目前，Mozart 平台的某些功能通过 [公共 API](https://github.com/bang-olufsen/mozart-open-api) 不可用。有些可能稍后可用，但在此之前，可以使用 [Bang & Olufsen 应用程序](https://www.bang-olufsen.com/en/dk/story/apps) 配置这些设置和功能：

* 创建定时器和闹钟
* 检索详细的闹钟和定时器信息

以及更高级的以应用为中心的功能，如：

* 创建预设
* 创建聆听位置
* 创建声音模式
* 创建立体声对
* 调整特定声音设置
* 配对遥控器

### Beoremote One

多个遥控器可以配对到同一个 Mozart 设备，并且仍然创建为 Home Assistant 设备和事件实体。这些遥控器将触发相同的 WebSocket 通知，这意味着按下遥控器 A 也会触发遥控器 B 的关联事件实体。

这有利于能够使用遥控器 B 触发映射到遥控器 A 的自动化，但也意味着每个 Mozart 设备\_仅\_支持单个遥控器提供的 90 个事件实体。

## 动作

### play\_media 动作

Bang & Olufsen 集成支持 `media_player.play_media` 动作中的不同播放类型：从 URL 播放、激活收藏、从本地文件播放、播放广播电台、激活 Deezer flow 和 Deezer 播放列表、专辑、曲目，以及作为叠加播放文件和文本转语音（TTS）。

#### play\_media 示例

从 URL 播放 [DR P1](https://www.dr.dk/lyd/p1)：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: url
  media_content_id: http://live-icy.dr.dk/A/A03H.mp3
```

激活第一个收藏：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: favourite
  media_content_id: 1
```

播放本地文件：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_id: media-source://media_source/local/example.mp3
  media_content_type: music
```

播放广播电台：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_id: 1234567890123456
  media_content_type: radio
```

播放 Deezer flow。可选定义 Deezer 用户 ID：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: deezer
  media_content_id: flow
  extra:
    id: 1234567890
```

播放 Deezer 播放列表。可选定义播放列表的起始位置：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: deezer
  media_content_id: playlist:1234567890
  extra:
    start_from: 123
```

播放 Deezer 专辑。可选定义专辑的起始位置：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: deezer
  media_content_id: album:1234567890
  extra:
    start_from: 123
```

播放 Deezer 曲目：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: deezer
  media_content_id: 1234567890
```

播放 Tidal 播放列表。可选定义播放列表的起始位置：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: tidal
  media_content_id: playlist:01234567-89ab-cdfe-0123-456789abcdef
  extra:
    start_from: 123
```

播放 Tidal 专辑。可选定义专辑的起始位置：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: tidal
  media_content_id: album:123456789
  extra:
    start_from: 123
```

播放 Tidal 曲目：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: tidal
  media_content_id: 123456789
```

##### 叠加

中断当前播放的媒体以播放音频消息。

要使用 Bang & Olufsen 云 TTS，请使用 `overlay_tts` 作为 `media_content_type`，并在 `media_content_id` 字段中输入消息。
Bang & Olufsen 云 TTS 消息每天限制 100 条唯一消息，并缓存 24 小时。

可用的额外键：

| 数据属性            | 可选 | 描述                                                                                       |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `overlay_absolute_volume` | 是      | 为叠加指定绝对音量。                                                       |
| `overlay_offset_volume`   | 是      | 指定要添加到当前音量级别的音量偏移。                                  |
| `overlay_tts_language`    | 是      | 指定用于文本转语音的语言。使用 BCP 47 标准。默认值为"en-us"。 |

###### 示例：

以绝对音量作为叠加播放本地文件：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: music
  media_content_id: media-source://media_source/local/doorbell.mp3
  announce: true
  extra:
    overlay_absolute_volume: 60
```

以偏移音量播放 Bang & Olufsen 云 TTS 消息（因为 TTS 消息可能很安静）：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: overlay_tts
  media_content_id: This is a test
  announce: true
  extra:
    overlay_offset_volume: 10
```

以本地语言播放 Bang & Olufsen 云 TTS 消息：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.beosound_balance_12345678
data:
  media_content_type: overlay_tts
  media_content_id: Dette er en test
  announce: true
  extra:
    overlay_tts_language: da-dk
```

### 自定义动作

Bang & Olufsen 集成还支持 Beolink 的不同自定义动作。

[Beolink](https://support.bang-olufsen.com/hc/en-us/articles/4411572883089-What-is-Beolink-Multiroom) 是 Bang & Olufsen 的高级多房间音频解决方案。此集成支持 Home Assistant 的 `media_player` 分组，但为了充分利用 Beolink，例如能够加入未添加到 Home Assistant 的传统设备，已定义自定义动作。

尝试执行无效的 Beolink 动作将导致 Home Assistant 错误或设备发出可听错误指示。

#### `bang_olufsen.beolink_join`

加入 Beolink 体验。

| 动作数据属性 | 可选 | 描述                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `beolink_jid`         | 是      | 手动指定要加入的 Beolink JID。                                                                                                                                                                                                                                                                                                                |
| `source_id`           | 是      | 指定要加入的源，行为因硬件平台而异。源名称前缀为平台名称的只能在连接到该平台时使用。例如，"ASE Beoradio" 只能在加入 ASE 设备时使用，而"ASE / Mozart Deezer" 可以与 ASE 或 Mozart 设备一起使用。需要定义的 Beolink JID。 |

##### 加入当前活动的 beolink 体验或播放兼容源的设备

```yaml
action: bang_olufsen.beolink_join
target:
  entity_id: media_player.beosound_balance_12345678
```

重复调用将循环遍历可用设备。

也可以通过使用空的 `group_members` 列表调用 `media_player.join` 动作来触发：

```yaml
action: media_player.join
target:
  entity_id: media_player.beosound_balance_12345678
data:
  group_members:
```

##### 加入特定的活动 beolink 体验

```yaml
action: bang_olufsen.beolink_join
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jid: 1111.2222222.33333333@products.bang-olufsen.com
```

##### 在 Beolink Converter NL/ML 上加入"radio"源

```yaml
action: bang_olufsen.beolink_join
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jid: 1111.2222222.33333333@products.bang-olufsen.com
  source_id: radio
```

只有有限选择的 `source_id` 可用。下表显示哪些 `source_id` 可以在哪些硬件平台上加入：

| 硬件平台       | 兼容的 source\_ids                      |
| ----------------------- | ------------------------------------------ |
| ASE                     | `beoradio`                                 |
| ASE 和 Mozart          | `deezer`、`spotify`                        |
| Mozart                  | `tidal`                                    |
| Beolink Converter NL/ML | `radio`、`tp1`、`tp2`、`cd`、`aux_a`、`ph` |

#### `bang_olufsen.beolink_expand`

扩展当前 Beolink 体验。

| 动作数据属性 | 可选 | 描述                                                      |
| --------------------- | -------- | ---------------------------------------------------------------- |
| `all_discovered`      | 是      | 将 Beolink 体验扩展到所有发现的设备。             |
| `beolink_jids`        | 是      | 指定哪些 Beolink JID 将加入当前 Beolink 体验。 |

##### 将活动的 Beolink 体验扩展到定义设备发现的所有其他设备

```yaml
action: bang_olufsen.beolink_expand
target:
  entity_id: media_player.beosound_balance_12345678
data:
  all_discovered: true
```

##### 将活动的 Beolink 体验扩展到特定设备

```yaml
action: bang_olufsen.beolink_expand
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jids:
    - 1111.2222222.33333333@products.bang-olufsen.com
```

也可以通过在 `group_members` 中使用此集成的 `media_player` 实体的 entity\_id 调用 `media_player.join` 动作来触发：

```yaml
action: media_player.join
target:
  entity_id: media_player.beosound_balance_12345678
data:
  group_members:
    - media_player.beosound_balance_33333333
```

##### 将活动的 Beolink 体验扩展到特定设备

```yaml
action: bang_olufsen.beolink_expand
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jids:
    - 1111.2222222.33333333@products.bang-olufsen.com
    - 4444.5555555.66666666@products.bang-olufsen.com
```

也可以通过在 `group_members` 中使用此集成的 `media_player` 实体的 entity\_id 调用 `media_player.join` 动作来触发：

```yaml
action: media_player.join
target:
  entity_id: media_player.beosound_balance_12345678
data:
  group_members:
    - media_player.beosound_balance_33333333
    - media_player.beosound_balance_66666666
```

#### `bang_olufsen.beolink_unexpand`

从当前 Beolink 体验中取消扩展。

| 动作数据属性 | 可选 | 描述                                                            |
| --------------------- | -------- | ---------------------------------------------------------------------- |
| `beolink_jids`        | 否       | 指定哪些 Beolink JID 将从当前 Beolink 体验中离开。 |

##### 从活动的 Beolink 体验中移除设备

```yaml
action: bang_olufsen.beolink_unexpand
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jids:
    - 1111.2222222.33333333@products.bang-olufsen.com
```

##### 从活动的 Beolink 体验中移除设备

```yaml
action: bang_olufsen.beolink_unexpand
target:
  entity_id: media_player.beosound_balance_12345678
data:
  beolink_jids:
    - 1111.2222222.33333333@products.bang-olufsen.com
    - 4444.5555555.66666666@products.bang-olufsen.com
```

#### `bang_olufsen.beolink_leave`

离开 Beolink 体验。

##### 动作用法示例

```yaml
action: bang_olufsen.beolink_leave
target:
  entity_id: media_player.beosound_balance_12345678
```

与调用 `media_player.unjoin` 动作相同：

```yaml
action: media_player.unjoin
target:
  entity_id: media_player.beosound_balance_12345678
```

#### `bang_olufsen.beolink_allstandby`

将所有连接的 Beolink 设备设置为待机。

##### 动作用法示例

```yaml
action: bang_olufsen.beolink_allstandby
target:
  entity_id: media_player.beosound_balance_12345678
```

## 自动化

从设备接收的 WebSocket 通知在 Home Assistant 中作为事件触发。可以通过监听 `bang_olufsen_websocket_event` 事件类型来接收这些事件，其中 `device_id` 或 `serial_number` 可用于区分设备。

### 获取 Deezer URI

要查找 Deezer 播放列表、专辑 URI 和 Deezer flow 的用户 ID，必须访问 Deezer 网站。导航到专辑时，URL 将类似于：<https://www.deezer.com/en/album/ALBUM_ID>，这需要转换为：`album:ALBUM_ID`，播放列表也一样，格式为：`playlist:PLAYLIST_ID`。

可以通过在 Web 浏览器中选择活动用户，在 <https://www.deezer.com/en/profile/USER_ID> 找到 Deezer 用户 ID。

此外，可以在 `media_player` 实体的 `media_content_id` 属性中找到当前播放曲目的 Deezer ID。

### 获取 Tidal URI

Tidal 播放列表、专辑 URI 和曲目 ID 可通过 Tidal 网站获取。导航到专辑时，URL 将类似于 <https://listen.tidal.com/album/ALBUM_ID/>，这需要转换为 `album:ALBUM_ID`。播放列表也一样，格式为 `playlist:PLAYLIST_ID`。可以通过分享曲目并选择 `Copy track link` 方法找到单个曲目，这应该产生格式为 <https://tidal.com/browse/track/TRACK_ID?u> 的链接，可以通过提取曲目 id `TRACK_ID` 来播放。

此外，可以在 `media_player` 实体的 `media_content_id` 属性中找到当前播放曲目的 Tidal ID。

### 获取 B\&O 广播电台 ID

可以在 `media_player` 实体的 `media_content_id` 属性中找到当前播放电台的广播电台 ID。

### Beolink

发现的设备和活动 Beolink 体验中的设备在 media\_player 实体的属性中可用。设备由其友好名称和 JID 表示，用于连接设备。

```yaml
beolink:
  self: 当前设备
  leader: Beolink 主设备（如果可用）
  listeners: Beolink 监听器（如果可用）
  peers: Beolink 对等设备（如果可用）
```

## 诊断和故障排除

**Bang & Olufsen** 集成支持 [Home Assistant 调试日志和诊断](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)。
所有接收到的 WebSocket 事件都通过调试日志提供，诊断中提供以下内容：

* 配置条目
* Mozart 设备
  * WebSocket 连接状态
  * 媒体播放器状态
  * 按钮事件状态（如果可用）
  * 电池电量传感器（如果可用）
  * 电池充电二值传感器（如果可用）
* Beoremote One 遥控器（如果可用）
  * 按键事件状态（如果可用）
  * 整体状态
  * 电池电量传感器（如果可用）

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
