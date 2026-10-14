:::info 未完成
此条目尚不完整。欢迎贡献。
:::
Media player entity 控制 media player。从 [`homeassistant.components.media_player.MediaPlayerEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/media_player/__init__.py) 派生 platform entity。

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name                            | Type                                            | Default | Description
| ------------------------------- | ----------------------------------------------- | ------- | -----------
| app\_id                          | `str \| None`                    | `None`  | 当前运行的 app 的 ID。
| app\_name                        | `str \| None`                    | `None`  | 当前运行的 app 的名称。
| device\_class                    | `MediaPlayerDeviceClass \| None` | `None`  | Media player 的类型。
| group\_members                   | `list[str] \| None`              | `None`  | 当前分组进行同步播放的 player entities 动态列表。如果 platform 有定义 group leader 的概念，leader 应是该列表的第一个元素。
| is\_volume\_muted                 | `bool \| None`                   | `None`  | 如果 volume 当前已 muted，则为 `True`。
| media\_album\_artist              | `str \| None`                    | `None`  | 当前播放 media 的 album artist，仅限 music track。
| media\_album\_name                | `str \| None`                    | `None`  | 当前播放 media 的 album name，仅限 music track。
| media\_artist                    | `str \| None`                    | `None`  | 当前播放 media 的 artist，仅限 music track。
| media\_channel                   | `str \| None`                    | `None`  | 当前播放的 channel。
| media\_content\_id                | `str \| None`                    | `None`  | 当前播放 media 的 content ID。
| media\_content\_type              | `MediaType \| str \| None`   | `None`  | 当前播放 media 的 content type。
| media\_duration                  | `int \| None`                    | `None`  | 当前播放 media 的 duration（秒）。
| media\_episode                   | `str \| None`                    | `None`  | 当前播放 media 的 episode，仅限 TV show。
| media\_image\_hash                | `str \| None`                    | `None`  | Media image 的 hash，如果 `media_image_url` 不为 `None`，默认为 `media_image_url` 的 SHA256。
| media\_image\_remotely\_accessible | `bool \| None`                   | `False` | 如果 property `media_image_url` 可以在 home network 外部访问，则为 `True`。
| media\_image\_url                 | `str \| None`                    | `None`  | 当前播放 media 的 image URL。
| media\_playlist                  | `str \| None`                    | `None`  | 当前播放的 Playlist 的 title。
| media\_position                  | `int \| None`                    | `None`  | 当前播放 media 的 position（秒）。
| media\_position\_updated\_at       | `datetime \| None`               | `None`  | `_attr_media_position` 上次更新的时间戳。时间戳应通过调用 `homeassistant.util.dt.utcnow()` 设置。
| media\_season                    | `str \| None`                    | `None`  | 当前播放 media 的 season，仅限 TV show。
| media\_series\_title              | `str \| None`                    | `None`  | 当前播放 media 的 series title，仅限 TV show。
| media\_title                     | `str \| None`                    | `None`  | 当前播放 media 的 title。
| media\_track                     | `int \| None`                    | `None`  | 当前播放 media 的 track number，仅限 music track。
| repeat                          | `RepeatMode \| str \| None`  | `None`  | 当前的 repeat mode。
| shuffle                         | `bool \| None`                   | `None`  | 如果 shuffle 已启用，则为 `True`。
| sound\_mode                      | `str \| None`                    | `None`  | Media player 当前的 sound mode。
| sound\_mode\_list                 | `list[str] \| None`              | `None`  | 可用 sound modes 的动态列表。
| source                          | `str \| None`                    | `None`  | Media player 当前选择的 input source。
| source\_list                     | `list[str] \| None`              | `None`  | Media player 可能的 input sources 列表。（该列表应包含适合 frontend 显示的 human readable names）。
| state                           | `MediaPlayerState \| None`       | `None`  | Media player 的 state。
| volume\_level                    | `float \| None`                  | `None`  | Media player 的 volume level，范围（0..1）。
| volume\_step                     | `float \| None`                  | 0.1     | 用于 `volume_up` 和 `volume_down` service actions 的 volume step。

## 支持的功能

Supported features 通过使用 `MediaPlayerEntityFeature` enum 中的值来定义，
并使用按位或（`|`）运算符组合。

| Value               | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `BROWSE_MEDIA`      | Entity 允许浏览 media。                                      |
| `CLEAR_PLAYLIST`    | Entity 允许清除 active playlist。                        |
| `GROUPING`          | Entity 可以与其他 players 分组进行同步播放。 |
| `MEDIA_ANNOUNCE`    | Entity 支持 `play_media` action 的 announce 参数。      |
| `MEDIA_ENQUEUE`     | Entity 支持 `play_media` action 的 enqueue 参数。       |
| `NEXT_TRACK`        | Entity 允许跳过到下一个 media track。                    |
| `PAUSE`             | Entity 允许暂停 media 的播放。                       |
| `PLAY`              | Entity 允许播放/恢复 media 的播放。                  |
| `PLAY_MEDIA`        | Entity 允许播放 media sources。                               |
| `PREVIOUS_TRACK`    | Entity 允许返回到上一个 media track。            |
| `REPEAT_SET`        | Entity 允许设置 repeat。                                      |
| `SEARCH_MEDIA`      | Entity 允许搜索 media。                                 |
| `SEEK`              | Entity 允许在 media 播放期间 seek position。           |
| `SELECT_SOUND_MODE` | Entity 允许选择 sound mode。                              |
| `SELECT_SOURCE`     | Entity 允许选择 source/input。                            |
| `SHUFFLE_SET`       | Entity 允许 shuffle active playlist。                       |
| `STOP`              | Entity 允许停止 media 的播放。                      |
| `TURN_OFF`          | Entity 可以关闭。                                   |
| `TURN_ON`           | Entity 可以开启。                                    |
| `VOLUME_MUTE`       | Entity 的 volume 可以 muted。                                        |
| `VOLUME_SET`        | Entity 的 volume 可以设为特定 levels。                       |
| `VOLUME_STEP`       | Entity 的 volume 可以上下调整。                         |

## 状态

设置 state 应在 `state` property 中返回一个 `MediaPlayerState` 枚举值。Resulting state 值是 enum 成员名称的小写版本（例如，`MediaPlayerState.PLAYING` 结果为 state `playing`）。

| Value       | Description                                                                                                         |
|-------------|---------------------------------------------------------------------------------------------------------------------|
| `OFF`       | Entity 已关闭，在开启之前不接受 commands。                                                 |
| `ON`        | Entity 已开启，但当前未知其 state 的详细信息。                                               |
| `IDLE`      | Entity 已开启并接收 commands，但当前未播放任何 media。可能处于某个 idle home screen。 |
| `PLAYING`   | Entity 当前正在播放 media。                                                                                  |
| `PAUSED`    | Entity 有 active media，且当前已 paused                                                                |
| `BUFFERING` | Entity 正在准备开始播放某些 media                                                                 |

:::note

Media players 在 standby state 时通常无法控制。如果 Home Assistant 可以使用其他 protocol 或 method 开启 device，即使用于控制 device 的主要 channel 当前不可用，也应显示为 `off`。如果 Home Assistant 没有方法开启 device，应显示为 `unavailable`。更多详情请见 [entity-unavailable Exceptions](/developers/core/integration-quality-scale/rules/entity-unavailable.md#exceptions)。

:::

## 方法

### 播放媒体

通知 media player 播放 media。使用以下方法实现：

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

`enqueue` attribute 是字符串 enum `MediaPlayerEnqueue`：

* `add`：将给定 media item 添加到队列末尾
* `next`：接下来播放给定的 media item，保留队列
* `play`：立即播放给定的 media item，保留队列
* `replace`：立即播放给定的 media item，清除队列

当 `announce` 布尔 attribute 设为 `true` 时，media player 应尝试暂停当前 music，向用户 announce media，然后恢复 music。

### 浏览媒体

如果 media player 支持浏览 media，应实现以下 method：

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

如果 media player 也允许从 URL 播放 media，还可以添加对浏览
Home Assistant media sources 的支持。这些 sources 可以由任何集成提供。示例包括
text-to-speech 和 local media。

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
        # 如果 media player 没有自己的 media sources 可供浏览，将所有 browse commands
        # 路由到 media source 集成。
        return await media_source.async_browse_media(
            self.hass,
            media_content_id,
            # 这允许过滤 content。在本例中，它只显示 audio sources。
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
            # play_item 在需要在 Home Assistant host 上解析时返回 relative URL
            # 此调用会将其转换为完整 URL
            media_id = async_process_play_media_url(self.hass, play_item.url)

        # 用调用 media player 播放 media 函数替换此处。
        await self._media_player.play_url(media_id)
```

### 搜索媒体

如果 media player 支持搜索 media，应实现以下 method：

```python
class MyMediaPlayer(MediaPlayerEntity):

    async def async_search_media(
        self,
        query: SearchMediaQuery,
    ) -> SearchMedia:
        """Search the media player."""
        # 在 library client 上搜索请求的 media。
        result = await my_client.search(query=query.search_query)
        return SearchMedia(result=result)
```

SearchMediaQuery 是一个具有以下 properties 的 dataclass：

| Attribute             | Type                                  | Default     | Description                        |
|-----------------------|---------------------------------------|-------------|------------------------------------|
| `search_query`        | `str`                                 | *必需*  | 搜索字符串或 query。        |
| `media_content_type`  | `MediaType \| str \| None`            | `None`      | 要搜索的 content type。 |
| `media_content_id`    | `str \| None`                         | `None`      | 要搜索的 content ID。   |
| `media_filter_classes`| `list[MediaClass] \| None`            | `None`      | 要过滤的 media classes 列表。   |

### 选择 sound mode

可选。切换 media player 的 sound mode。

```python
class MyMediaPlayer(MediaPlayerEntity):
    # 实现以下方法之一。

    def select_sound_mode(self, sound_mode: str) -> None:
        """Switch the sound mode of the entity."""

    async def async_select_sound_mode(self, sound_mode: str) -> None:
        """Switch the sound mode of the entity."""
```

### 选择来源

可选。切换 media player 选择的 input source。

```python
class MyMediaPlayer(MediaPlayerEntity):
    # 实现以下方法之一。

    def select_source(self, source: str) -> None:
        """Select input source."""

    async def async_select_source(self, source: str) -> None:
        """Select input source."""
```

### 媒体类型

必需。返回与 mediatype 匹配的 MediaType enum 值之一。

| CONST |
|-------|
|MediaType.MUSIC|
|MediaType.TVSHOW|
|MediaType.MOVIE|
|MediaType.VIDEO|
|MediaType.EPISODE|
|MediaType.CHANNEL|
|MediaType.PLAYLIST|
|MediaType.IMAGE|
|MediaType.URL|
|MediaType.GAME|
|MediaType.APP|

```python
class MyMediaPlayer(MediaPlayerEntity):
    # 实现以下方法。

    @property
    def media_content_type(self) -> MediaType | str | None:
        """Content type of current playing media."""
```

:::info
在 `play_media` service action 中，使用集成名称作为 `media_content_type` 也是可接受的，前提是集成提供了不映射到已定义常量的处理。
:::

### 可用的设备类型

可选。这是什么类型的 media device。它可能会映射到 Google device types。

| Value | Description
| ----- | -----------
| projector | Device 是 projector 类型的 device。
| receiver | Device 是 audio video receiver 类型的 device，接收 audio 并输出到 speakers，video 输出到某个 display。
| speaker | Device 是 speakers 或 stereo 类型的 device。
| tv | Device 是 television 类型的 device。

### 为 media browser 代理 album art

可选。如果 media player 只能从 internal network 访问，则需要通过 Home Assistant 代理 album art，以便在离开 home 或通过 mobile app 时能够正常工作。

要通过 Home Assistant 代理 image，请将 `BrowseMedia` item 的 `thumbnail` property 设为由 `self.get_browse_image_url(media_content_type, media_content_id, media_image_id=None)` method 生成的 URL。然后浏览器将获取此 URL，从而导致调用 `async_get_browse_image(media_content_type, media_content_id, media_image_id=None)`。

:::info
仅当 web request 源自网络外部时才使用代理 thumbnail。可以使用从 `homeassistant.helpers.network` 导入的 `is_local_request(hass)` 进行测试。
:::

在 `async_get_browse_image` 中，使用 `self._async_fetch_image(url)` 从 local network 获取 image。不要使用 `self._async_fetch_image_from_cache(url)`，它只应用于当前播放的 artwork。

:::info
不要将 URL 作为 `media_image_id` 传入。这可能允许攻击者从 local network 获取任何数据。
:::

```python
class MyMediaPlayer(MediaPlayerEntity):

    # 实现以下方法。
    async def async_get_browse_image(
        self,
        media_content_type: str,
        media_content_id: str,
        media_image_id: str | None = None,
    ) -> tuple[bytes | None, str | None]:
        """Serve album art. Returns (content, content_type)."""
        image_url = ...
        return await self._async_fetch_image(image_url)
```

### 将 player entities 分组在一起

可选。如果 player 支持将 player entities 分组进行同步播放（由 `MediaPlayerEntityFeature.GROUPING` 指示），则需要定义一个 join method 和一个 unjoin method。

```python
class MyMediaPlayer(MediaPlayerEntity):
    # 实现以下 join methods 之一：

    def join_players(self, group_members: list[str]) -> None:
        """Join `group_members` as a player group with the current player."""

    async def async_join_players(self, group_members: list[str]) -> None:
        """Join `group_members` as a player group with the current player."""

    # 实现以下 unjoin methods 之一：

    def unjoin_player(self) -> None:
        """Remove this player from any group."""

    async def async_unjoin_player(self) -> None:
        """Remove this player from any group."""
```
