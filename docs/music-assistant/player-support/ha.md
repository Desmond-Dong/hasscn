---
title: 播放器支持 - Home Assistant 播放器
description: 在 Music Assistant 中使用 HA 媒体播放器实体的功能和说明
---

# Home Assistant <img src="/assets/icons/ha-logo.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持播放到 Home Assistant 中的媒体播放器实体。

> [!CAUTION]
> **请注意**
>
> 此播放器提供者依赖于上游 HA 集成，这些集成不一定是为了音乐播放而编写或优化的。因此，如果有任何方式可以使用 MA 提供者，您需要这样做。HA 提供者的问题将在资源允许的情况下得到解决。

## 功能

- HA 中可用的所有媒体播放器实体（没有专门的 MA 提供者）都将在 MA 中可用
- 所有可以在 HA 中分组的媒体播放器类型都可以通过[播放器列表](/music-assistant/ui/#player-list)或 <a href="https://www.home-assistant.io/integrations/media_player/#action-media_playerjoin" target="_blank" rel="noopener noreferrer">HA 操作</a>在 MA 中分组

## 配置

在添加播放器提供者之前，必须安装[插件](/music-assistant/ha-plugin/)。下图显示了成功安装的样子

!<a href="/assets/screenshots/plugin-provider.png" target="_blank"><img src="/assets/screenshots/plugin-provider.png" alt="截图" loading="lazy" style="max-width: 100%;" /></a>

- 在 MA 设置中选择添加播放器提供者，然后选择 HOME ASSISTANT MEDIA PLAYERS
- 在提供者设置中，选择要使用哪些播放器。这些可以随时更改。

> [!NOTE]
> 这些播放器的功能很可能有限。如果 MA 中存在原生播放器提供者，请始终优先选择，因为那已优化。

## 设置

有关 MA UI 中看到的设置的信息，请参阅[播放器提供者设置](/music-assistant/settings/player-provider/)和[单个播放器设置](/music-assistant/settings/individual-player/)页面。

## 已知问题 / 说明

- 此播放器提供者默认不启用，必须通过 MA 设置添加，但在可用之前必须设置 Home Assistant 插件提供者
- 只有支持 `play_media` 的播放器才能使用，其他播放器将被过滤掉
- MA 播放器将被过滤掉
- 此播放器类型与其他任何类型之间的同步是不可能的
- 为了支持更多的播放器，提供了不同的流配置文件。如果播放器不工作、在流中间停止或有其他播放问题，请更改播放器设置`用于发送音频的 HTTP 配置文件`并尝试每个选项直到播放器工作
- 如果没有向播放器发送元数据，您可以尝试启用选项`尝试将元数据注入流中`
- 基于 ESPHome 的媒体播放器通常不建议用于播放音乐。短音频公告或可能的网络电台可能可以工作，但它真的不适合在 MA 播放音乐。提示：您可能需要在播放器设置中启用"固定内容长度" HTTP 配置文件。话虽如此，更强大的基于 ESPHome 的播放器如 HA Voice PE 工作良好，支持 FLAC 并有其他优化。
- 经常报告 HA 集成 `VLC Telnet` 和 `MPD` 存在问题。如果可能，避免使用这些集成提供的播放器