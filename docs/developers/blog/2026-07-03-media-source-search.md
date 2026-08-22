---
author: Josef Zweck
authorURL: https://github.com/zweckj
authorImageURL: https://avatars.githubusercontent.com/u/24647999?s=96&v=4
title: "Media sources 现在可以搜索"
---

Media sources 现在可以实现搜索。通过在你的 `MediaSource` 中添加 `async_search_media` 方法，用户可以直接从 media browser 中搜索你的媒体。

```python
from homeassistant.components.media_player import SearchMedia, SearchMediaQuery

async def async_search_media(
    self, item: MediaSourceItem, query: SearchMediaQuery
) -> SearchMedia:
    """Search media."""
    results = [...]  # list of BrowseMediaSource items
    return SearchMedia(result=results)
```

要告诉 media browser 哪些 items 可以搜索，请在浏览时返回的 `BrowseMediaSource` items（通常是目录）上将 `can_search` flag 设置为 `True`。其他集成可以通过新的 `media_source.async_search_media` helper 触发搜索。

更多信息，请参阅[更新后的文档](/developers/core/platform/media_source#searching-media)。
