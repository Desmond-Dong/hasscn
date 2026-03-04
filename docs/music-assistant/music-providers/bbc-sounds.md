---
title: "BBC Sounds"
---

# BBC Sounds 提供者 <img src="/assets/icons/bbcsounds-logo.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持从 BBC Sounds 流式传输。由 <a href="https://github.com/kieranhogg" target="_blank" rel="noopener noreferrer">Kieran Hogg</a> 贡献和维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体   | 否 |
| 支持的媒体类型 | 曲目、电台、播客 |
| 支持[推荐](/music-assistant/ui/#view-home) | 是 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | 有损，AAC-LC(320kbps) |
| 登录方式 | 无或密码 |

### 其他

- 流式传输 BBC 直播广播节目、播客系列和点播音频
- 访问您的个性化 BBC Sounds 内容*
- 保持您的 My Sounds 收听历史与 Music Assistant 活动同步*

*需要登录 BBC 账户

## 使用

您可以通过导航到 *浏览 > BBC Sounds* 访问主 Sounds 菜单。相关内容也将作为推荐项目显示在主页上，可用内容也可以通过搜索访问。

## 配置

提供者无需登录即可工作，但您将被限制使用 Sounds 内容的基本版本。

### 设置
- <b>用户名和密码。</b> BBC Sounds 账户是可选的，但如果不登录，某些仅限英国的内容可能无法使用
- <b>高级 - 显示本地电台。</b> 默认情况下，只列出全国性电台。启用此选项也将显示本地电台。
- <b>高级 - 首选流媒体格式。</b> 选项有 `HLS [默认]` 或 `MPEG-DASH`

## 已知问题 / 说明

当您是英国听众并登录您的 BBC 账户时，完整功能将被启用。BBC 一直在慢慢将非英国听众排除在其 Sounds 平台之外，更多详情<a href="https://www.bbc.co.uk/sounds/help/questions/listening-outside-the-uk/outside-uk-changes" target="_blank" rel="noopener noreferrer">此处</a>。此提供者目前允许国际听众通过 Sounds API 访问直播和回听广播，但这在未来可能会受到限制。

## 尚不支持

- 暂停和跳转直播广播
- 国际账户可能可以使用，但目前不受支持
- 国际菜单应该显示可用的播客，这尚未实现
- 显示电台和回听当前播放的歌曲已实现但尚未发布
- 对于已登录用户，通过媒体库访问您订阅的内容尚不支持，但已计划