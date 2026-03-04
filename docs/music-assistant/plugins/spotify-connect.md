---
title: Spotify Connect 插件
description: Spotify Connect 插件的功能和说明
---

# Spotify Connect <img src="/assets/icons/spotify-connect-icon.png" alt="预览图片" style="float: right;" loading="lazy" />

Music Assistant 可以为任何 MA 播放器添加 <a href="https://connect.spotify.com/" target="_blank" rel="noopener noreferrer">Spotify Connect</a> 支持。

> [!NOTE]
> 此插件仍处于早期开发阶段。功能有限，可能存在 bug

## 功能

- 任何 MA 播放器都可以被暴露，包括群组

## 配置

要使每个播放器在 Spotify 应用中显示为 Spotify Connect 目标，需要在 MA 提供者设置中为每个播放器单独添加 Spotify Connect 提供者。

> [!NOTE]
> 不建议尝试配置 Home Assistant 播放器。仅使用原生 Music Assistant 播放器

## 已知问题 / 说明

- 要使用 Spotify Connect，所有设备必须连接到同一网络。请参阅 <a href="https://support.spotify.com/us/article/spotify-connect/" target="_blank" rel="noopener noreferrer">Spotify Connect 支持文章</a> 了解更多信息（注意：该文章中提到的从不同 WiFi 网络访问设备的功能不受支持）
- 如果设备本身不支持公告功能，则当向正在通过 Spotify Connect 流式传输的播放器发送公告时，播放将被中断。目前这意味着公告功能仅适用于 Voice PE 设备（及其衍生设备）和 Sonos S2 设备
- 由于将 Spotify Connect 音频流转发给 MA 播放器的通用 <a href="https://github.com/orgs/music-assistant/discussions/419#discussioncomment-12237246" target="_blank" rel="noopener noreferrer">缓冲特性</a>，从 Spotify 应用发送命令时会有延迟（0.5 到 5 秒之间）。元数据也可能提前显示
- 不支持使用 HA 媒体播放器作为 `已连接的 Music Assistant 播放器`
