---
author: Paulus Schoutsen
authorURL: https://github.com/balloob
authorImageURL: https://avatars.githubusercontent.com/u/1444314?v=4
title: "BrowseMediaSource：domain 现在是必需的"
---

`media_source` 集成中的 `BrowseMediaSource` class 已加强限制。`domain` 参数现在是一个必需的 `str`，而不是 `str | None`，特殊的"列出所有 media source"的 root node 已移动到它自己的 class `RootBrowseMediaSource` 中。

以前，`domain` 之所以可选，只是为了表示一种边界情况：在浏览 `media-source://` 且未选择特定 source 时返回的顶层 node。这使得类型提示对 99% 的情况来说具有误导性——每个实际的 media source 都有一个 domain——并且增加了一个消费者需要考虑的 `None` 分支。将 root 拆分到单独的 class 中移除了该分支。

## 变更内容

- `BrowseMediaSource.__init__` 现在需要 `domain: str`。
- 新的 `RootBrowseMediaSource` class 表示列出所有可用 media sources 的 root browse node。它硬编码 `domain=None` 和 `identifier=None`，并使用 `media-source://` 作为其 content ID。
- `media_source.async_browse_media()` 和 `MediaSourceItem.async_browse()` 现在返回 `BrowseMediaSource | RootBrowseMediaSource`。

## 对自定义集成的影响

大多数集成无需任何更改。如果你实现了 `media_source.py` platform，你已经在向 `BrowseMediaSource` 传递自己的 `domain`——这将继续工作。

你只有在以下情况下才需要采取行动：

- **你将 `domain=None` 传递给 `BrowseMediaSource`。** 这不再被允许。改为设置你的集成 domain。
- **你调用 `media_source.async_browse_media()` 并为结果添加了类型注解。** 将类型提示更新为 `BrowseMediaSource | RootBrowseMediaSource`，或者在使用 domain 特定属性之前用 `isinstance()` 进行收窄：

  ```python
  from homeassistant.components.media_source import (
      BrowseMediaSource,
      async_browse_media,
  )

  result = await async_browse_media(hass, media_content_id)
  if isinstance(result, BrowseMediaSource):
      # 在这里 result.domain 保证是 str
      ...
  ```

更多详情，请参阅更新后的 [media source platform 文档](/developers/core/platform/media_source)。
