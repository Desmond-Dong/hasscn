---
title: "Apple Music"
---

# Apple Music 提供者 <img src="/assets/icons/apple-music.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 <a href="https://music.apple.com/" target="_blank" rel="noopener noreferrer">Apple Music</a>！由 <a href="https://github.com/MarvinSchenkel" target="_blank" rel="noopener noreferrer">MarvinSchenkel</a> 贡献和维护。

> [!NOTE]
> - 添加此音乐提供者需要付费订阅。
> - Apple 不正式支持音频播放，使用风险自负。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 否 |
| 自托管本地媒体   | 否 |
| 支持的媒体类型 | 艺术家、专辑、曲目、播放列表 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 是 |
| 最高流媒体质量 | [有损 AAC (256kbps)](#known-issues--notes) |
| 登录方式 | Cookie |

### 其他

- 搜索 Apple Music 目录

## 配置

可以通过使用 Apple Music 验证您的 Music Assistant 实例来自动检索所需的令牌。

单击**使用 Apple Music 验证**按钮，然后在弹出窗口中使用您的 Apple ID 登录并授权 Music Assistant 访问您的 Apple Music 媒体库。

<a href="/assets/screenshots/apple-music-auth-0.png" target="_blank"><img src="/assets/screenshots/apple-music-auth-0.png" alt="预览图片" loading="lazy" /></a>

> [!NOTE]
> 此令牌将过期，需要在 180 天后手动重新验证。
    
### 设置

- <b>手动 Music User Token。</b> 如果正常验证流程不可用，则可以在此处手动添加令牌

<details>
<summary>手动令牌检索说明</summary>
<div>

需要通过浏览器检索令牌。说明是以 Chrome 编写的：

1. 导航到 <a href="https://music.apple.com/" target="_blank" rel="noopener noreferrer">https://music.apple.com/</a>
2. 转到 View > Developer > Developer Tools。将打开一个新的侧窗口。
3. 单击"Application"选项卡。您可能需要展开窗口或单击 `>>` 按钮

   <a href="/assets/screenshots/apple-music-auth-1.jpg" target="_blank"><img src="/assets/screenshots/apple-music-auth-1.jpg" alt="预览图片" loading="lazy" /></a>

4. 在 Storage > Cookies 下，单击"https://music.apple.com"并找到名为"media-user-token"的条目
5. 单击它并复制 cookie 值，并在 Music Assistant 中将其用作 Music user token

   <a href="/assets/screenshots/apple-music-auth-2.jpg" target="_blank"><img src="/assets/screenshots/apple-music-auth-2.jpg" alt="预览图片" loading="lazy" /></a>

6. 目前，为了使回调工作，在设置此提供者时必须通过暴露的 Web 服务器端口访问 MA。如果 MA 已作为应用安装，则必须按照[核心设置](/music-assistant/settings/core/#webserver-frontend-and-api)中的说明手动暴露端口。因此，设置此提供者时的 URL 必须是 `http://<YOUR_MA_IP>:8095`。成功配置后，如果需要，可以再次禁用 Web 服务器端口。

**注意：** 请注意 "Expires / Max-Age" 列。令牌将在该日期过期，Music Assistant 中的 Apple Music 将停止工作。然后必须重复上述过程以获取新令牌。

</div>
</details>
    
## 已知问题 / 说明
- 由于 Apple 的专有加密（FairPlay），不支持歌曲的无损和杜比全景声版本
- 由于 API 限制，收藏项目只会同步回 Apple Music 的专辑、播放列表和曲目
- 由于缺乏官方 API，曲目之间的转换可能需要长达 5 秒

## 尚不支持
- 媒体库交互，例如从 Music Assistant 内向您的 Apple Music 媒体库添加和删除项目