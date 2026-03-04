---
title: "iTunes Podcast Search"
---

# iTunes Podcast Search 提供者 <img src="/assets/icons/itunes-podcast-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 <a href="https://podcasts.apple.com/us/browse" target="_blank" rel="noopener noreferrer">iTunes 播客搜索</a>。由 <a href="https://github.com/fmunkes" target="_blank" rel="noopener noreferrer">Fabian Munkes</a> 贡献和维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体 | 否 |
| 支持的媒体类型 | 播客 |
| 支持[推荐](/music-assistant/ui/#view-home) | 是 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | 有损，可变质量 |
| 登录方式 | 无 |

### 其他

- 通过 iTunes API 搜索播客

## 配置

- 配置您的国家
- 指定要检索的最大剧集数（使用 0 表示全部）
- 可选择禁用显式结果

## 已知问题 / 说明

- 搜索结果可能包含视频播客，因为无法过滤它们
- 如果希望将播客作为 MA 媒体库的一部分，您必须添加它或将其标记为收藏。提供者仅用于搜索
- 如果播客没有出现在搜索结果中，但已知在 Apple Podcast 上免费提供，这可能是因为允许内容创作者在 Apple Podcast 源中隐藏 RSS 源。没有源 URL，提供者无法访问媒体信息（如果是这种情况，MA 日志中会出现 INFO 日志消息）。一种解决方案是尝试在网络上搜索您特定播客的 RSS 源 URL。如果存在，请使用 <a href="https://www.music-assistant.io/music-providers/podcastfeed/" target="_blank" rel="noopener noreferrer">Podcast RSS Feed</a> 手动将其添加到 MA。另一个选择是尝试在其他播客提供者之一上找到它。