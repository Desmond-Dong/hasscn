---
title: "ARD Audiothek"
---

# ARD Audiothek 提供者 <img src="/assets/icons/ard-audiothek.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持从 <a href="https://www.ardaudiothek.de/" target="_blank" rel="noopener noreferrer">ARD Audiothek</a> 流式传输。由 <a href="https://github.com/jfeil" target="_blank" rel="noopener noreferrer">Jan Feil</a> 贡献和维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体   | 否 |
| 支持的媒体类型 | 电台、播客 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | 有损，可变质量 |
| 登录方式 | 密码 |

### 其他

- 进度报告和获取
- 用订阅的播客填充媒体库
- 在定期提供者同步时更新播放日志

## 配置

- 如果需要同步，请登录 ARD Audiothek 应用

### 设置
- <b>ARD 账户的电子邮件地址。</b>
- <b>ARD 账户的密码。</b>
- <b>流的最大比特率（0 表示无限制）</b> 定义最大流比特率
- <b>播客剧集标记为已完全播放所需的百分比</b> 配置在将播客记录为已完全播放之前必须播放多少剧集（这仅用于 Music Assistant 内的可视化）

## 已知问题 / 说明

- 无

## 尚不支持

- 不支持订阅管理
- 未实现播客推荐
- 对于电台流：不显示当前播放的歌曲