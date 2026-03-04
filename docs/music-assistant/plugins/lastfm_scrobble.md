---
title: LastFM Scrobbler 插件
description: LastFM Scrobbler 插件的功能和说明
---

# LastFM Scrobbler <img src="/assets/icons/audioscrobbler-icon.svg" alt="预览图片" style="width: 126px; float: right;"  loading="lazy" />

Music Assistant 能够<a href="https://www.collinsdictionary.com/dictionary/english/scrobble" target="_blank" rel="noopener noreferrer">scrobble</a>到 <a href="https://www.last.fm/" target="_blank" rel="noopener noreferrer">LastFM</a> 或 <a href="https://libre.fm/" target="_blank" rel="noopener noreferrer">LibreFM</a>。由 <a href="https://github.com/wjzijderveld" target="_blank" rel="noopener noreferrer">Willem-Jan Zijderveld</a> 贡献和维护

## 功能

- 连接到 LastFM 或 LibreFM 并 scrobble 正在播放的歌曲
- 支持正在播放功能

## 配置

- 首先获取 API 凭据。对于 LastFM，请按照<a href="https://www.last.fm/api/authentication" target="_blank" rel="noopener noreferrer">此处</a>的前两步操作
- 输入您的凭据并单击`使用 LastFM 授权`，这将打开一个新标签页，其中 LastFM 需要通过单击"Yes, allow access"授予权限
- UI 将指示登录成功。确保单击 SAVE 以完成配置

### 设置

- <b>将版本附加到曲目名称。</b> 这将在发送到 Last.fm 时，将存储在 Music Assistant 数据库中的版本添加到曲目名称的末尾。如果 Musicbrainz ID 不可用于区分艺术家同名曲目，这可能很有用
- <b>为用户 scrobble。</b> 这允许选择哪个登录用户将被此提供者 scrobble。可以添加此提供者的多个实例

## 已知问题 / 说明

- 目前，歌曲只有在完全播放（90+%）后才会被 scrobble
- 注意避免双重 scrobbling。如果使用的音乐提供者也在内部进行 scrobbling，这是可能的。未来的改进是将可以配置哪些音乐提供者将被 scrobble
