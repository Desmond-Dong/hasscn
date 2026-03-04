---
title: Player Support
description: 与所有播放器提供者相关的信息
---

# 播放器提供者

> [!NOTE]
> 播放器（设备）通过添加其关联的播放器提供者添加到 Music Assistant。播放器提供者是通过导航到 MA 设置，然后提供者，然后单击添加新提供者来添加的

有关特定播放器提供者的信息，请参阅本文档中的相关部分。有关可能设置的描述，请参阅[播放器提供者设置](/music-assistant/settings/player-provider/)和[单个播放器设置](/music-assistant/settings/individual-player/)页面。当启用播放器提供者时，支持该协议的设备将被 Music Assistant 自动发现。下表总结了播放器功能。请注意，DLNA 和 HA 播放器可能由于所需标准的实现不佳而受到影响。如果这些播放器类型不能很好地工作，并且设备支持其他协议，请使用其他协议。

<a href="/assets/player-provider-summary.png" target="_blank"><img src="/assets/player-provider-summary.png" alt="预览图片" loading="lazy" /></a>

如果设备支持多种协议，则将看到该设备的多个播放器。在[单个播放器设置](/music-assistant/settings/individual-player/)中，您可以禁用或隐藏任何不使用的播放器。

播放器只有在不可用或禁用时才能删除。如果播放器有问题，删除播放器可能很有用。变得或仍然可用的已删除播放器将重新被发现，并在 MA 重启或播放器提供者重新加载时返回列表。

!<a href="/assets/screenshots/player-disable.png" target="_blank"><img src="/assets/screenshots/player-disable.png" alt="预览图片" loading="lazy" style="max-width: 100%;" /></a> 

> [!NOTE]
> 如果任何播放器在歌曲之间没有转换，请检查播放器是否有 QUEUE FLOW MODE 选项。如果没有，请尝试启用它。

## 音频质量

音频质量是开发原生 MA 播放器的主要原因。这些播放器提供最高质量的播放体验。HA 播放器应该可以工作，可能工作得很好，但也可能是为了实现文本转语音等基本目标而编写的。因此，如果有 MA 播放器和 HA 集成可用，您应该始终选择 MA 播放器。

采样率高于 48kHz 或位深高于 16 被认为是高分辨率（Hi Res）

