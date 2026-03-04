---
title: Listenbrainz Scrobbler 插件
description: Listenbrainz Scrobbler 插件的功能和说明
---

# Listenbrainz Scrobbler <img src="/assets/icons/listenbrainz-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 能够<a href="https://www.collinsdictionary.com/dictionary/english/scrobble" target="_blank" rel="noopener noreferrer">scrobble</a>到 <a href="https://listenbrainz.org" target="_blank" rel="noopener noreferrer">Listenbrainz</a>。由 <a href="https://github.com/ijc" target="_blank" rel="noopener noreferrer">Ian Campbell</a> 贡献和维护

## 功能

- 连接到 Listenbrainz 并 scrobble 正在播放的歌曲
- 支持正在播放功能

## 配置

- 从 https://listenbrainz.org/settings/ 获取您的用户令牌

### 设置

- <b>将版本附加到曲目名称。</b> 这将在发送到 Last.fm 时，将存储在 Music Assistant 数据库中的版本添加到曲目名称的末尾。如果 Musicbrainz ID 不可用于区分艺术家同名曲目，这可能很有用
- <b>为用户 scrobble。</b> 这允许选择哪个登录用户将被此提供者 scrobble。可以添加此提供者的多个实例

## 已知问题 / 说明

- 目前，歌曲只有在完全播放（90+%）后才会被 scrobble
- 注意避免双重 scrobbling。如果使用的音乐提供者也在内部进行 scrobbling，这是可能的。未来的改进是将可以配置哪些音乐提供者将被 scrobble
