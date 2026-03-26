---
title: 媒体播放器实体
sidebar_label: 媒体播放器
---

:::info 不完整
此条目不完整。欢迎贡献。
:::
媒体播放器实体控制媒体播放器。  平台实体派生自[`homeassistant.components.media_player.MediaPlayerEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/media_player/__init__.py)。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ------------------------------- | ----------------------------------------------- | ------- | -----------
| app_id | <code>str &#124; None</code> | `None` | 当前运行的应用程序的ID。
| app_name | <code>str &#124; None</code> | `None` | 当前运行的应用程序的名称。
| device_class | <code>MediaPlayerDeviceClass &#124; None</code> | `None` | 媒体播放器的类型。
| group_members | <code>list[str] &#124; None</code> | `None` | 当前分组在一起以进行同步播放的播放器实体的动态列表。如果平台有定义组领导者的概念，则领导者应该是该列表中的第一个元素。
| is_volume_muted | <code>bool &#124; None</code> | `None` | `True` 如果音量当前处于静音状态。
| media_album_artist | <code>str &#124; None</code> | `None` | 当前播放媒体的专辑艺术家，仅限音乐曲目。
| media_album_name | <code>str &#124; None</code> | `None` | 当前播放媒体的专辑名称，仅音乐曲目。
| media_artist | <code>str &#124; None</code> | `None` | 仅当前播放媒体、音乐曲目的艺术家。
| media_channel | <code>str &#124; None</code> | `None` | 当前正在播放的频道。
| media_content_id | <code>str &#124; None</code> | `None` | 当前播放媒体的内容 ID。
| media_content_type | <code>MediaType &#124; str &#124; None</code> | `None` | 当前播放媒体的内容类型。
| media_duration | <code>int &#124; None</code> | `None` | 当前播放媒体的持续时间（以秒为单位）。
| media_episode | <code>str &#124; None</code> | `None` | 当前播放媒体的剧集，仅限电视节目。
| media_image_hash | <code>str &#124; None</code> | `None` | 媒体图像的哈希值，如果 `media_image_url` 不是 `None`，则默认为 `media_image_url` 的 SHA256。
| media_image_remotely_accessible | <code>bool &#124; None</code> | `False` | `True`（如果可以在家庭网络外部访问属性 `media_image_url`）。
| media_image_url | <code>str &#124; None</code> | `None` | 当前播放媒体的图片URL。
| media_playlist | <code>str &#124; None</code> | `None` | 当前播放的播放列表的标题。
| media_position | <code>int &#124; None</code> | `None` | 当前播放媒体的位置（以秒为单位）。
| media_position_updated_at | <code>datetime &#124; None</code> | `None` | `_attr_media_position` 上次更新的时间戳。应通过调用 `homeassistant.util.dt.utcnow()` 设置时间戳。
| media_season | <code>str &#124; None</code> | `None` | 当前播放的媒体季，仅限电视节目。
| media_series_title | <code>str &#124; None</code> | `None` | 当前播放媒体、电视节目的系列标题。
| media_title | <code>str &#124; None</code> | `None` | 当前播放媒体的标题。
| media_track | <code>int &#124; None</code> | `None` | 当前播放媒体的曲目编号，仅限音乐曲目。
| repeat | <code>RepeatMode &#124; str &#124; None</code> | `None` | 当前重复模式。
| shuffle | <code>bool &#124; None</code> | `None` | 如果启用随机播放，则为 `True`。
| sound_mode | <code>str &#124; None</code> | `None` | 媒体播放器当前的声音模式。
| sound_mode_list | <code>list[str] &#124; None</code> | `None` | 可用声音模式的动态列表。
| source | <code>str &#124; None</code> | `None` | 当前为媒体播放器选择的输入源。
| source_list | <code>list[str] &#124; None</code> | `None` | 媒体播放器可能的输入源列表。 （此列表应包含人类可读的名称，适合前端显示）。
| state | <code>MediaPlayerState &#124; None</code> | `None` | 媒体播放器的状态。
| volume_level | <code>float &#124; None</code> | `None` | 媒体播放器的音量级别在 (0..1) 范围内。
| volume_step | <code>float &#124; None</code> | 0.1 | 用于 `volume_up` 和 `volume_down` 维修操作的音量步骤。

## 支持的功能

支持的功能通过使用 `MediaPlayerEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| ------------------- | ------------------------------------------------------------------ |
| `BROWSE_MEDIA` | 实体允许浏览媒体。 |
| `CLEAR_PLAYLIST` | 实体允许清除活动播放列表。 |
| `GROUPING` | 实体可以与其他播放器分组进行同步播放。 |
| `MEDIA_ANNOUNCE` | 实体支持 `play_media` 操作的公告参数。 |
| `MEDIA_ENQUEUE` | 实体支持 `play_media` 操作的入队参数。 |
| `NEXT_TRACK` | 实体允许跳到下一个媒体轨道。 |
| `PAUSE` | 实体允许暂停媒体播放。 |
| `PLAY` | 实体允许播放/恢复媒体播放。 |
| `PLAY_MEDIA` | 实体允许播放媒体源。 |
| `PREVIOUS_TRACK` | 实体允许返回到先前的媒体轨道。 |
| `REPEAT_SET` | 实体允许设置重复。 |
| `SEARCH_MEDIA` | 实体允许搜索媒体。 |
| `SEEK` | 实体允许在媒体播放期间寻找位置。 |
| `SELECT_SOUND_MODE` | 实体允许选择声音模式。 |
| `SELECT_SOURCE` | 实体允许选择源/输入。 |
| `SHUFFLE_SET` | 实体允许随机播放活动播放列表。 |
| `STOP` | 实体允许停止媒体播放。 |
| `TURN_OFF` | 实体可以被关闭。 |
| `TURN_ON` | 实体能够被打开。 |
| `VOLUME_MUTE` | 实体音量可以静音。 |
| `VOLUME_SET` | 实体音量可以设置为特定级别。 |
| `VOLUME_STEP` | 实体音量可以上下调节。 |

## 状态

媒体播放器的状态是通过使用 `MediaPlayerState` 枚举中的值来定义的，并且可以采用以下可能的值。

| 值 | 说明 |
|-------------|---------------------------------------------------------------------------------------------------------------------|
| `OFF` | 实体已关闭并且在打开之前不接受命令。 |
| `ON` | 实体已打开，但目前尚不清楚其状态的详细信息。 |
| `IDLE` | 实体已打开并接受命令，但当前未播放任何媒体。可能在某个空闲的主屏幕上。 |
| `PLAYING` | 实体当前正在播放媒体。 |
| `PAUSED` | 实体具有活动媒体且当前已暂停 |
| `BUFFERING` | 实体正准备开始播放某些媒体 |

:::note

媒体播放器在待机状态下无法控制的情况很常见。如果 Home Assistant 可以使用其他协议或方法打开设备，即使用于控制设备的主通道当前不可用，它也应显示为 `off`。如果 Home Assistant 无法打开设备，则应显示为 `unavailable`。有关更多详细信息，请参阅[实体不可用的异常](/developers/core/integration-quality-scale/rules/entity-unavailable#Exceptions)。

:::

## 方法

### 播放媒体

告诉媒体播放器播放媒体。使用以下方法实现它：

```python
class MyMediaPlayer(MediaPlayerEntity):

    def play_media(
        self,
        media_type: str,
        media_id: str,
        enqueue: MediaPlayerEnqueue | None = None,
        announce: bool | None = None, **kwargs: Any
    ) -> None:
        """Play a piece of media."""

    async def async_play_media(
        self,
        media_type: str,
        media_id: str,
        enqueue: MediaPlayerEnqueue | None = None,
        announce: bool | None = None, **kwargs: Any
    ) -> None:
        """Play a piece of media."""

```

`enqueue` 属性是字符串枚举 `MediaPlayerEnqueue`：

 - `add`：将给定媒体项添加到队列末尾
 - `next`：接下来播放给定的媒体项目，保持队列
 - `play`：立即播放给定的媒体项目，保持队列
 - `replace`：立即播放给定的媒体项目，清除队列

当 `announce` 布尔属性设置为 `true` 时，媒体播放器应尝试暂停当前音乐，向用户宣布媒体，然后恢复音乐。

### 浏览媒体

如果媒体播放器支持浏览媒体，则应实现以下方法：

```python
class MyMediaPlayer(MediaPlayerEntity):

    async def async_browse_media(
        self, media_content_type: str | None = None, media_content_id: str | None = None
    ) -> BrowseMedia:
        """Implement the websocket media browsing helper."""
        return await media_source.async_browse_media(
            self.hass,
            media_content_id,
            content_filter=lambda item: item.media_content_type.startswith("audio/"),
        )
```

如果媒体播放器还允许从 URL 播放媒体，您还可以添加对浏览的支持
Home Assistant 媒体源。这些来源可以通过任何集成来提供。示例提供
文本转语音和本地媒体。

```python
from homeassistant.components import media_source
from homeassistant.components.media_player.browse_media import (
    async_process_play_media_url,
)

class MyMediaPlayer(MediaPlayerEntity):

    async def async_browse_media(
        self, media_content_type: str | None = None, media_content_id: str | None = None
    ) -> BrowseMedia:
        """Implement the websocket media browsing helper."""
        # If your media player has no own media sources to browse, route all browse commands
        # to the media source integration.
        return await media_source.async_browse_media(
            self.hass,
            media_content_id,
            # This allows filtering content. In this case it will only show audio sources.
            content_filter=lambda item: item.media_content_type.startswith("audio/"),
        )

    async def async_play_media(
        self,
        media_type: str,
        media_id: str,
        enqueue: MediaPlayerEnqueue | None = None,
        announce: bool | None = None, **kwargs: Any
    ) -> None:
        """Play a piece of media."""
        if media_source.is_media_source_id(media_id):
            media_type = MediaType.MUSIC
            play_item = await media_source.async_resolve_media(self.hass, media_id, self.entity_id)
            # play_item returns a relative URL if it has to be resolved on the Home Assistant host
            # This call will turn it into a full URL
            media_id = async_process_play_media_url(self.hass, play_item.url)

        # Replace this with calling your media player play media function.
        await self._media_player.play_url(media_id)
```

### 搜索媒体

如果媒体播放器支持搜索媒体，则应实现以下方法：

```python
class MyMediaPlayer(MediaPlayerEntity):

    async def async_search_media(
        self,
        query: SearchMediaQuery,
    ) -> SearchMedia:
        """Search the media player."""
        # search for the requested media on your library client.
        result = await my_client.search(query=query.search_query)
        return SearchMedia(result=result)
```

SearchMediaQuery 是一个具有以下属性的数据类：

| 属性 | 类型 | 默认值 | 说明 |
|-----------------------|---------------------------------------|-------------|------------------------------------|
| `search_query` | `str` | *required* | 搜索字符串或查询。 |
| `media_content_type` | `MediaType \ | str \ | 无` | `None` | The content type to search inside. |
| `media_content_id` | `str \ | None` | `None` | The content ID to search inside. |
| `media_filter_classes` | `list[MediaClass] \ | None` | `None` | List of media classes to filter. |

### 选择声音模式

可选。切换媒体播放器的声音模式。

```python
class MyMediaPlayer(MediaPlayerEntity):
    # Implement one of these methods.

    def select_sound_mode(self, sound_mode):
        """Switch the sound mode of the entity."""

    def async_select_sound_mode(self, sound_mode):
        """Switch the sound mode of the entity."""
```

### 选择来源

可选。切换媒体播放器的选定输入源。

```python
class MyMediaPlayer(MediaPlayerEntity):
    # Implement one of these methods.

    def select_source(self, source):
        """Select input source."""

    def async_select_source(self, source):
        """Select input source."""
```

### 媒体类型

必需的。返回 MediaType 枚举中与媒体类型匹配的值之一

| 常量 |
|-------|
| MediaType.MUSIC |
| MediaType.TVSHOW |
| MediaType.MOVIE |
| MediaType.VIDEO |
| MediaType.EPISODE |
| MediaType.CHANNEL |
| MediaType.PLAYLIST |
| MediaType.IMAGE |
| MediaType.URL |
| MediaType.GAME |
| MediaType.APP |

```python
class MyMediaPlayer(MediaPlayerEntity):
    # Implement the following method.

    @property
    def media_content_type(self):
    """Content type of current playing media."""
```

:::info
如果集成提供的处理不映射到定义的常量，则在 `play_media` 服务操作中使用集成名称作为 `media_content_type` 也是可以接受的。
:::

### 可用设备类别

可选。这是什么类型的媒体设备。它可能会映射为 Google 设备类型。

| 值 | 说明
| ----- | -----------
| tv | 设备是电视类型设备。
| speaker | 设备是扬声器或立体声类型的设备。
| receiver | 设备是音频视频接收器类型的设备，将音频输出到扬声器并将视频输出到某些显示器。

### 媒体浏览器的代理专辑封面

可选。如果您的媒体播放器只能从内部网络访问，则需要通过Home Assistant代理专辑封面，以便能够在外出时或通过移动应用程序工作。

要通过 Home Assistant 代理图像，请将 `BrowseMedia` 项目的 `thumbnail` 属性设置为 `self.get_browse_image_url(media_content_type, media_content_id, media_image_id=None)` 方法生成的 url。然后浏览器将获取此 url，这将导致对 `async_get_browse_image(media_content_type, media_content_id, media_image_id=None)` 的调用。

:::info
如果 Web 请求源自网络外部，则仅对缩略图使用代理。您可以使用从 `homeassistant.helpers.network` 导入的 `is_local_request(hass)` 进行测试。
:::

在 `async_get_browse_image` 中，使用 `self._async_fetch_image(url)` 从本地网络获取图像。不要使用 `self._async_fetch_image_from_cache(url)`，它只能用于当前播放的艺术作品。

:::info
不要将 URL 作为 `media_image_id` 传递。这可能允许攻击者从本地网络获取任何数据。
:::

```python
class MyMediaPlayer(MediaPlayerEntity):

    # Implement the following method.
    async def async_get_browse_image(self, media_content_type, media_content_id, media_image_id=None):
    """Serve album art. Returns (content, content_type)."""
    image_url = ...
    return await self._async_fetch_image(image_url)
```

### 将玩家实体分组在一起

可选。如果您的播放器支持将播放器实体分组在一起以进行同步播放（由 `SUPPORT_GROUPING` 指示），则需要定义一种加入方法和一种取消加入方法。

```python
class MyMediaPlayer(MediaPlayerEntity):
    # Implement one of these join methods:

    def join_players(self, group_members):
        """Join `group_members` as a player group with the current player."""

    async def async_join_players(self, group_members):
        """Join `group_members` as a player group with the current player."""

    # Implement one of these unjoin methods:

    def unjoin_player(self):
        """Remove this player from any group."""

    async def async_unjoin_player(self):
        """Remove this player from any group."""
```