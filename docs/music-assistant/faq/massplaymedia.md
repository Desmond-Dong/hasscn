---
title: "播放媒体操作"
---

# MA play_media 操作

此操作允许您精确选择要播放的媒体。通过 HA GUI 或 YAML 创建您的服务调用或自动化

您可以结合媒体类型使用名称

!<a href="/assets/screenshots/service-call/play1.png" target="_blank"><img src="/assets/screenshots/service-call/play1.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

或仅使用 URI

!<a href="/assets/screenshots/service-call/play2.png" target="_blank"><img src="/assets/screenshots/service-call/play2.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

或库 ID 结合媒体 ID

!<a href="/assets/screenshots/service-call/play3.png" target="_blank"><img src="/assets/screenshots/service-call/play3.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

或用艺术家名称定义的音轨，建议使用媒体类型但可选

!<a href="/assets/screenshots/service-call/play4.png" target="_blank"><img src="/assets/screenshots/service-call/play4.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

您也可以有项目列表

!<a href="/assets/screenshots/service-call/play5.png" target="_blank"><img src="/assets/screenshots/service-call/play5.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

或 URI 列表，甚至可以来自不同的音乐提供商

!<a href="/assets/screenshots/service-call/play6.png" target="_blank"><img src="/assets/screenshots/service-call/play6.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

> [!NOTE]
> 常规 `media_player.play_media` 服务调用也接受上述所有内容，但不能接受多个项目

> [!NOTE]
> 添加多个项目时，它们必须以连字符开头，如上图所示

还有其他选项。当选择支持它的实体时，入队选项将出现。

!<a href="/assets/screenshots/service-call/play7.png" target="_blank"><img src="/assets/screenshots/service-call/play7.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

> [!CAUTION]
> **电台模式**
>
> 如果启用电台模式，您只能使用专辑、艺术家、音轨或播放列表 media_type。只有在有支持动态音轨的提供商可用时（例如 Apple、Deezer、Spotify、Subsonic、Tidal 和 YTM），才能使用电台模式。

