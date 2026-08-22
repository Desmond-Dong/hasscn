---
author: Paulus Schoutsen
authorURL: https://twitter.com/balloob
authorImageURL: /img/profile/paulus.jpg
authorTwitter: balloob
title: TTS say service 使用 media source IDs
---

从 Home Assistant 2022.5 开始，TTS say service 将把 media content ID 设置为 media source URI。这些需要在 media player 内部通过 media source integration 来解析。

此前，TTS integration 会将 media content ID 设置为指向 Home Assistant 的 URL，media players 无需额外操作。

Media players 需要支持 media source integration，详见[此处文档](/developers/core/entity/media-player#browse-media)。
