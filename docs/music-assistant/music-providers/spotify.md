---
title: "Spotify"
---

# Spotify 提供者 <img src="/assets/icons/spotify-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 完全支持 Spotify 媒体列表和播放。

> [!NOTE]
> 此音乐提供者需要 Spotify Premium 账户。免费账户无法使用。

> [!NOTE]
> Spotify 已向第三方产品明确表示不会支持无损音频。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 否 |
| 自托管本地媒体 | 否 |
| 支持的媒体类型 | 艺术家、专辑、曲目、播放列表、播客、有声读物 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 是 |
| 最高流媒体质量 | 有损，OGG Vorbis (320kbps) |
| 登录方式 | OAuth |

### 其他

- 可以搜索 Spotify 目录
- 您 Spotify 媒体库中的项目（包括喜欢的歌曲播放列表）将添加到 Music Assistant 的媒体库
- 从 Spotify 中的项目添加到 Music Assistant 媒体库也会将其添加到 Spotify "您的媒体库"
- 在 Music Assistant 中将项目标记为收藏也会将其添加到 MA 媒体库和 Spotify "您的媒体库"
- 可以添加多个 Spotify 账户。将显示所有账户的所有播放列表。如果选择播放列表进行播放，将使用该 Spotify 账户

## 配置
- Spotify 提供者只能从与 MA 服务器位于同一子网的设备进行配置（而不是通过 VPN）
- 配置使用 OAuth 回调完成。单击使用 SPOTIFY 验证按钮将打开一个新选项卡，您可以在其中授予 MA 访问登录账户的权限
- 完成初始验证后，视图底部将出现一个名为`开发者令牌`的新选项。添加个人 Client ID 是有利的，因为这会加快对 Spotify API 的访问速度，并应该消除速率限制。<a href="https://developer.spotify.com/documentation/web-api/concepts/apps" target="_blank" rel="noopener noreferrer">此处</a>说明了如何获取 Client ID。在各种字段中输入信息时，唯一必填项是 REDIRECT URL，必须设置为 `https://music-assistant.io/callback`。使用个人 Client ID 是可选的，但如果不提供，可能会在日志中看到速率限制和流媒体错误
- 如果添加了个人 Client ID，则单击大按钮验证开发者会话
- 最后必须在 Spotify 设置页面上按保存按钮。如果使用的设备在此之前杀死了 MA 前端，则提供者设置将失败（如果发生这种情况，请使用不同的设备，通常是非移动设备）

### 设置

请参阅[媒体库导入控制](/music-assistant/music-providers/#library-import-control)设置。

## 已知问题 / 说明

- 由于 Spotify API 的限制，仅支持 Spotify Premium 账户（包括 Duo 和 Family）。免费账户无法使用
- 首次保存提供者时，会检查账户内的有声读物支持。如果检查成功，则在重新访问提供者设置时会看到其他与有声读物相关的选项
- 添加开发者令牌后，会为单个 Spotify 提供者创建两个会话，MA 会适当地路由请求。例如，播放列表通过 MA 全局令牌请求（受速率限制但允许播放列表检索），而其他项目通过开发者令牌检索。默认情况下使用开发者令牌进行搜索，否则会非常慢。播放和浏览播放列表通过全局令牌路由到源提供者（当添加多个 Spotify 账户时很有用）
- Spotify API 不支持提供建议

