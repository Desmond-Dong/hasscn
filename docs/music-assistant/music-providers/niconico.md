---
title: "Nico Nico Video"
---

# Nico Nico 提供者 <img src="/assets/icons/niconico-logo.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 [Nico Nico Video](https://www.nicovideo.jp/)，一个类似 YouTube 的日本视频分享网站，以其覆盖在视频上的屏幕滚动评论而闻名。由 <a href="https://github.com/Shi-553" target="_blank" rel="noopener noreferrer">柴田 Shi-553</a> 贡献和维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体 | 否 |
| 支持的媒体类型 | 艺术家、专辑、曲目、播放列表 |
| 支持[推荐](/music-assistant/ui/#view-home) | 是 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 是 |
| 最高流媒体质量 | 有损，AAC（最高约 576 kbps） |
| 登录方式 | Cookie 或密码+MFA |

### 其他

- 允许搜索、播放和媒体库集成
- 关键词搜索曲目、播放列表（Mylist）和专辑（Series）
- 基于历史和关注活动的推荐
- 媒体库支持
    - 播放列表：您自己的 Mylist（读/写）
    - 艺术家：您关注的艺术家

## 配置

Music Assistant 支持 Niconico 上的无登录播放和搜索。
登录可启用个人功能，如推荐、Mylist 读/写和观看历史。

有两种验证方式可用：
- Cookie（user_session）
- 电子邮件 + 密码（+ MFA）

### Cookie 验证（user_session）

以 Chrome 为例：

1. 导航到 https://www.nicovideo.jp/
2. 转到 View > Developer > Developer Tools。将打开一个新的侧窗口。
3. 单击"Application"选项卡。您可能需要展开窗口或单击 >> 按钮
 <a href="/assets/screenshots/niconico-auth1.png" target="_blank"><img src="/assets/screenshots/niconico-auth1.png" alt="预览图片" loading="lazy" /></a>
4. 在 Storage > Cookies 下，单击"https://www.nicovideo.jp"并找到名为"user_session"的条目
 <a href="/assets/screenshots/niconico-auth2.png" target="_blank"><img src="/assets/screenshots/niconico-auth2.png" alt="预览图片" loading="lazy" /></a>
5. 单击它并复制 cookie 值，在 Music Assistant 中将其用作"User Session"
    - 请注意"Expires / Max-Age"列。会话将在该日期过期，个人功能将变得不可用。然后必须重复上述过程以获取新的会话

### 电子邮件 + 密码（+ MFA）

提供您的 Niconico 账户电子邮件和密码（以及 MFA，如果需要）。

- 每 30 天自动重新登录以刷新会话 cookie
- 某些环境可能不支持电子邮件登录。在这种情况下，请使用 cookie 验证

## 已知问题 / 说明

- 如果您将专辑分配给曲目，将不会使用曲目特定的缩略图

## 尚不支持

- 无

