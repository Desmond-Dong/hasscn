media source platform 允许集成为 Home Assistant 暴露可浏览和可播放的媒体。Media sources 出现在 media browser UI 中，让用户可以浏览层级化的媒体库并在 media player 设备上播放内容。

## 实现媒体源

要添加 media source 支持，请在集成目录中创建 `media_source.py` 文件。无需更改 `manifest.json`——Home Assistant 通过 integration platform 机制自动发现 `media_source.py` 模块。

该模块必须定义一个 `async_get_media_source` 函数，返回你的 `MediaSource` 子类实例：

```python
from homeassistant.components.media_player import BrowseError, MediaClass, MediaType
from homeassistant.components.media_source import (
    BrowseMediaSource,
    MediaSource,
    MediaSourceItem,
    PlayMedia,
    Unresolvable,
)
from homeassistant.core import HomeAssistant

from .const import DOMAIN


async def async_get_media_source(hass: HomeAssistant) -> MyMediaSource:
    """Set up my media source."""
    return MyMediaSource(hass)


class MyMediaSource(MediaSource):
    """Provide media from my integration."""

    name = "My Service"

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the media source."""
        super().__init__(DOMAIN)
        self.hass = hass

    async def async_resolve_media(self, item: MediaSourceItem) -> PlayMedia:
        """Resolve a media item to a playable URL."""
        ...

    async def async_browse_media(self, item: MediaSourceItem) -> BrowseMediaSource:
        """Browse media."""
        ...
```

## `MediaSource` 基类

你的 media source 必须继承 `MediaSource` 并实现 `async_resolve_media` 和 `async_browse_media`。可以可选地实现 `async_search_media` 以允许用户搜索你的媒体。

| Method | Description |
|---|---|
| `async_resolve_media(item)` | 将 `MediaSourceItem` 解析为包含可播放 URL 和 MIME type 的 `PlayMedia`。如果项目无法解析，抛出 `Unresolvable`。 |
| `async_browse_media(item)` | 返回表示给定项目处可浏览结构的 `BrowseMediaSource`。如果浏览失败，抛出 `BrowseError`。 |
| `async_search_media(item, query)` | 可选。返回给定 `SearchMediaQuery` 的 `SearchMedia` 结果。请参阅 [搜索媒体](#searching-media)。 |

将类属性 `name` 设置为你 source 的人类可读名称。如果未设置，则默认为集成 domain。

## 浏览媒体

`async_browse_media` 方法接收一个 `MediaSourceItem` 并必须返回 `BrowseMediaSource` 树。当 `item.identifier` 为空时，返回媒体层级的根。对于非空 identifiers，返回该项目下的子项。

```python
async def async_browse_media(self, item: MediaSourceItem) -> BrowseMediaSource:
    """Browse media."""
    if item.identifier:
        raise BrowseError("Unknown item")

    children = [
        BrowseMediaSource(
            domain=DOMAIN,
            identifier=entity.entity_id,
            media_class=MediaClass.VIDEO,
            media_content_type=entity.content_type,
            title=entity.name,
            thumbnail=f"/api/my_proxy/{entity.entity_id}",
            can_play=True,
            can_expand=False,
        )
        for entity in self.hass.data[DATA_COMPONENT].entities
    ]

    return BrowseMediaSource(
        domain=DOMAIN,
        identifier=None,
        media_class=MediaClass.APP,
        media_content_type="",
        title="My Service",
        can_play=False,
        can_expand=True,
        children_media_class=MediaClass.VIDEO,
        children=children,
    )
```

### `BrowseMediaSource`

`BrowseMediaSource` 扩展了 media player 的 `BrowseMedia`，并自动从 `domain` 和 `identifier` 构造 `media_content_id`。

| Parameter | Type | Description |
|---|---|---|
| `domain` | `str` | 你的集成 domain。 |
| `identifier` | `str \| None` | 项目特定的标识符。根项目使用 `None`。 |
| `media_class` | `MediaClass` | 媒体类型（例如 `MediaClass.APP`、`MediaClass.DIRECTORY`、`MediaClass.MUSIC`、`MediaClass.VIDEO`、`MediaClass.IMAGE`）。 |
| `media_content_type` | `MediaType \| str` | 内容的 MIME type 或媒体类型（例如 `"audio/mpeg"`）。 |
| `title` | `str` | 向用户显示的标题。 |
| `can_play` | `bool` | 项目是否可以直接播放。 |
| `can_expand` | `bool` | 项目是否可以进一步浏览（有子项）。 |
| `can_search` | `bool` | 项目是否可以被搜索。当为 `True` 时，media browser 会为此项目显示搜索栏。默认为 `False`。请参阅 [搜索媒体](#searching-media)。 |
| `search_media_classes` | `list[MediaClass] \| None` | 可选的 media class 列表，作为此项目的搜索过滤器。设置后，media browser 允许用户将搜索范围缩小到这些 class，它们随后作为 `SearchMediaQuery` 中的 `media_filter_classes` 传回。默认为 `None`。请参阅 [搜索媒体](#searching-media)。 |
| `children` | `list[BrowseMediaSource] \| None` | 子项。仅在浏览的父项目上设置。 |
| `children_media_class` | `MediaClass \| None` | 子项的 media class。未设置时自动计算。 |
| `thumbnail` | `str \| None` | 缩略图片的 URL。 |
| `not_shown` | `int` | 未包含的子项数量（例如，被过滤掉）。默认为 `0`。 |

### 分层浏览

对于深层媒体层级，使用 identifier 编码路径。一种常见的模式是在 identifier 内使用 `/` 作为分隔符：

```python
async def async_browse_media(self, item: MediaSourceItem) -> BrowseMediaSource:
    """Browse media."""
    category, _, sub_id = (item.identifier or "").partition("/")

    if category == "albums" and sub_id:
        return await self._async_browse_album(sub_id)

    if category == "albums":
        return await self._async_browse_albums()

    # 根
    return BrowseMediaSource(
        domain=DOMAIN,
        identifier=None,
        media_class=MediaClass.APP,
        media_content_type="",
        title="My Service",
        can_play=False,
        can_expand=True,
        children=[
            BrowseMediaSource(
                domain=DOMAIN,
                identifier="albums",
                media_class=MediaClass.DIRECTORY,
                media_content_type=MediaType.MUSIC,
                title="Albums",
                can_play=False,
                can_expand=True,
            ),
        ],
    )
```

## 搜索媒体

搜索是可选的。实现 `async_search_media` 以允许用户从 media browser 搜索你的 media source。它接收正在搜索的 `MediaSourceItem`（搜索开始的位置）和一个 `SearchMediaQuery`，并返回 `SearchMedia` 结果：

```python
from homeassistant.components.media_player import SearchMedia, SearchMediaQuery

async def async_search_media(
    self, item: MediaSourceItem, query: SearchMediaQuery
) -> SearchMedia:
    """Search media."""
    tracks = await self.api.search(query.search_query)

    results = [
        BrowseMediaSource(
            domain=DOMAIN,
            identifier=track.id,
            media_class=MediaClass.MUSIC,
            media_content_type=track.mime_type,
            title=track.title,
            can_play=True,
            can_expand=False,
        )
        for track in tracks
    ]

    return SearchMedia(result=results)
```

`item` 参数告诉你搜索从哪里开始，因此你可以将结果范围限定为该部分层级。当 `query.media_filter_classes` 被设置时，仅返回 `media_class` 在列表中的项目。

### `SearchMediaQuery`

传递给 `async_search_media` 的 `SearchMediaQuery` 具有以下属性：

| Attribute | Type | Default | Description |
|---|---|---|---|
| `search_query` | `str` | *必需* | 用户输入的搜索字符串。 |
| `media_content_type` | `MediaType \| str \| None` | `None` | 要搜索的内容类型。 |
| `media_content_id` | `str \| None` | `None` | 要搜索的内容 ID。 |
| `media_filter_classes` | `list[MediaClass] \| None` | `None` | 设置后，仅返回 `media_class` 在此列表中的项目。 |

### `SearchMedia`

`SearchMedia` 包装匹配项目列表。

| Field | Type | Description |
|---|---|---|
| `result` | `Sequence[BrowseMedia]` | 与查询匹配的项目。 |

### 宣传搜索支持

media browser 仅为宣传了搜索的项目显示搜索栏。将 `can_search=True` 设置在 `async_browse_media()` 返回的 `BrowseMediaSource` 项目上，以在浏览时支持搜索：

```python
async def async_browse_media(self, item: MediaSourceItem) -> BrowseMediaSource:
    """Browse media."""

    return BrowseMediaSource(
        domain=DOMAIN,
        identifier=item.identifier,
        media_class=MediaClass.APP,
        media_content_type="",
        title="My Service",
        can_play=False,
        can_expand=True,
        can_search=True,
        children=[BrowseMediaSource(...), BrowseMediaSource(...)],
    )
```

如果只想在特定路径启用搜索支持，可以在浏览时基于当前 `MediaSourceItem`（通常是可浏览的目录）将 `can_search=True` 设置在 `async_browse_media()` 返回的 `BrowseMediaSource` 项目上：

```python
async def async_browse_media(self, item: MediaSourceItem) -> BrowseMediaSource:
    """Browse media."""

    can_search = False
    # 根节点的 item.identifier 将为 None
    if item.identifier:
        can_search = is_searchable(item.identifier)

    return BrowseMediaSource(
        domain=DOMAIN,
        identifier=item.identifier,
        media_class=MediaClass.APP,
        media_content_type="",
        title="My Service",
        can_play=False,
        can_expand=True,
        can_search=can_search,
        children=[BrowseMediaSource(...), BrowseMediaSource(...)],
    )
```

### 宣传搜索过滤器

要让用户缩小搜索范围，在可搜索项目上将 `search_media_classes` 设置为该位置有意义的 `MediaClass` 值列表。media browser 将这些作为过滤器选项提供，用户选择的 class 作为 [`SearchMediaQuery`](#searchmediaquery) 中的 `media_filter_classes` 传回。在 `async_search_media` 中遵循该列表，仅返回 `media_class` 被包含的项目：

```python
from homeassistant.components.media_player import MediaClass

async def async_browse_media(self, item: MediaSourceItem) -> BrowseMediaSource:
    """Browse media."""

    return BrowseMediaSource(
        domain=DOMAIN,
        identifier=item.identifier,
        media_class=MediaClass.APP,
        media_content_type="",
        title="My Service",
        can_play=False,
        can_expand=True,
        can_search=True,
        search_media_classes=[MediaClass.ALBUM, MediaClass.ARTIST, MediaClass.TRACK],
        children=[BrowseMediaSource(...), BrowseMediaSource(...)],
    )
```

## 解析媒体

`async_resolve_media` 方法将媒体项目解析为可播放 URL。它接收一个 `MediaSourceItem` 并返回 `PlayMedia` 实例：

```python
async def async_resolve_media(self, item: MediaSourceItem) -> PlayMedia:
    """Resolve a media item to a playable URL."""
    track = await self.api.get_track(item.identifier)

    if not track:
        raise Unresolvable(f"Could not resolve: {item.identifier}")

    return PlayMedia(track.stream_url, track.mime_type)
```

### `PlayMedia`

| Field | Type | Description |
|---|---|---|
| `url` | `str` | 要播放的 URL。可以是绝对 URL 或由 Home Assistant 提供的相对路径。 |
| `mime_type` | `str` | 媒体的 MIME type（例如 `"audio/mpeg"`、`"video/mp4"`、`"image/jpeg"`）。 |
| `path` | `Path \| None` | 可选的本地文件系统路径。仅用于本地文件源。 |

### `MediaSourceItem`

传递给这两个方法的 `MediaSourceItem` 具有以下属性：

| Attribute | Type | Description |
|---|---|---|
| `domain` | `str \| None` | 你的集成 domain。 |
| `identifier` | `str` | URI 中的项目标识符。 |
| `target_media_player` | `str \| None` | 将播放媒体的 media player 的 entity ID。可用于自定义解析的 URL。 |

## URI 方案

Media sources 使用 `media-source://` URI scheme：

```
media-source://domain/identifier
```

例如：

* `media-source://radio_browser/popular` — radio\_browser 的 "popular" 类别
* `media-source://tts/message` — TTS 消息

使用 `generate_media_source_id` helper 构造 URI：

```python
from homeassistant.components.media_source import generate_media_source_id

media_id = generate_media_source_id(DOMAIN, "my_track_123")
# 返回: "media-source://my_integration/my_track_123"
```

使用 `is_media_source_id` 检查字符串是否为有效的 media source URI：

```python
from homeassistant.components.media_source import is_media_source_id

if is_media_source_id(media_content_id):
    # 作为 media source 处理
    ...
```

## 错误处理

出错时抛出适当的异常：

| Exception | 何时抛出 |
|---|---|
| `Unresolvable` | 在 `async_resolve_media` 中，当媒体项目无法解析为可播放 URL 时。 |
| `BrowseError` | 在 `async_browse_media` 中，当无法获取媒体结构时，或在 `async_search_media` 中搜索失败时。 |

两个异常都支持 translations：

```python
raise Unresolvable(
    translation_domain=DOMAIN,
    translation_key="item_not_found",
    translation_placeholders={"item": item.identifier},
)
```

## 在其他集成中使用媒体源

其他集成（如 media players）可以使用 media source helpers 浏览和解析媒体：

```python
from homeassistant.components.media_player import SearchMediaQuery
from homeassistant.components.media_source import (
    async_browse_media,
    async_resolve_media,
    async_search_media,
    is_media_source_id,
)

# 浏览 media sources
result = await async_browse_media(hass, "media-source://my_domain")

# 搜索 media source
search_result = await async_search_media(
    hass,
    "media-source://my_domain",
    SearchMediaQuery(search_query="jazz"),
)

# 将媒体项目解析为可播放 URL
play_media = await async_resolve_media(
    hass,
    "media-source://my_domain/track_123",
    target_media_player="media_player.living_room",
)
```
