---
title: "SoundCloud"
---

# SoundCloud 提供者 <img src="/assets/icons/soundcloud-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 Soundcloud。由 <a href="https://github.com/gieljnssns" target="_blank" rel="noopener noreferrer">gieljnssns</a> 贡献。由 <a href="https://github.com/robsonke" target="_blank" rel="noopener noreferrer">robsonke</a> 维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体 | 否 |
| 支持的媒体类型 | 艺术家、专辑、曲目、播放列表 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | 有损 AAC (256kbps) |
| 登录方式 | Cookie |

## 配置

需要完成两个字段才能使用此提供者，Client id 和 Authorization。要获取这些，请按以下步骤操作：

1. 删除您的 Soundcloud cookie。
2. 转到 <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer">Soundcloud</a>。
3. 打开`检查`工具（大多数浏览器按 F12）。
4. 转到检查终端中的`Network`页面。
5. 登录。
6. 搜索`auth`。
7. 在其中一个请求中，您会找到`client_id`
8. 对于 OAuth token，我们需要 soundcloud.com 域上的`oauth_token` cookie，前面加上"OAuth "

`client_id`：32 字节字母数字字符串
`oauth_token`：cookie 值内的字符串

### Client id
<img src="/assets/screenshots/soundcloud-clientid.jpg" alt="截图" style="width: 1005px; float: center;"  loading="lazy" />

### OAuth token
<img src="/assets/screenshots/soundcloud-token.jpg" alt="截图" style="width: 1005px; float: center;"  loading="lazy" />

音乐提供者配置步骤的示例片段（OAuth 和 client_id 不是真实的，请使用您的）：

```
client_id = 5Hvc9wa0Ejf092wj3f3920w3F920asuL
Authorization = OAuth 2-26432-21446-asdif2309fQ
```

## 已知问题 / 说明

- 从 Soundcloud 同步的艺术家实际上是 Soundcloud 用户。
- 如果艺术家 X 的歌曲由用户 Y 上传，则此歌曲在 Music Assistant 中属于艺术家 Y