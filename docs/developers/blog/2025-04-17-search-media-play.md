---
author: Josef Zweck
authorURL: https://github.com/zweckj
authorImageURL: https://avatars.githubusercontent.com/u/24647999?v=4
title: "在 media player 中搜索"
---

media player 现在可以允许用户搜索 media，只需添加 `MediaEntityFeature.SEARCH_MEDIA` 并实现 `async_search_media`。用户可以通过搜索查询和一组 `MediaClasses` 来过滤搜索结果。更多信息请参阅[更新的文档](/developers/core/entity/media-player#search-media)。