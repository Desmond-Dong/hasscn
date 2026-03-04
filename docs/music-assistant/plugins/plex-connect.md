---
title: Plex Connect 插件
description: Plex Connect 插件的功能和说明
---

# Plex Connect <img src="/assets/icons/plex-connect-icon.svg" alt="预览图片" style="width: 70px; float: right;" loading="lazy" />

Music Assistant 可以将 MA 播放器暴露给 Plex 客户端（如 Plexamp）进行发现和控制。

> [!NOTE]
> 此插件需要配置 Plex 音乐提供者。

## 功能

- 任何 MA 播放器都可以作为 Plex Connect 目标暴露，包括群组
- 播放器通过本地网络上的 GDM（Good Day Mate）广播自动被 Plex 客户端发现
- 标准播放控制：播放、暂停、跳过、快进
- 队列管理：添加曲目、重新排序、清除队列
- 访问 Plex 功能：Sonic Adventures、Radio、DJ、Mixes
- 播放状态、当前曲目、进度和队列实时同步
- 播放活动报告给 Plex 服务器
- 收听历史和 scrobble 在 Plex 仪表板中可见
- 支持 Plex 功能如"继续收听"

## 配置

要使每个播放器在 Plex 客户端中显示为 Plex Connect 目标，需要为每个播放器单独添加 Plex Connect 插件。通过导航到 MA 设置，然后选择提供者，然后点击"添加新提供者"来添加插件。

## 已知问题 / 说明

- 要使用 Plex Connect，所有设备必须连接到同一网络
- 时间线报告给 Plex 服务器是基于每个播放器完成的
