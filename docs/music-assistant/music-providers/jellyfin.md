---
title: Music Assistant Jellyfin Provider
description: 使用 Jellyfin 音乐提供者的文档
---

# Jellyfin 提供者 <img src="/assets/icons/jellyfin-logo.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持按照 Jellyfin 规范工作的音乐服务器。此组件由 <a href="https://github.com/lokiberra" target="_blank" rel="noopener noreferrer">lokiberra</a> 贡献。

> [!CAUTION]
> 请注意，此提供者目前没有专门的开发者。问题可能需要更长时间才能解决，因为将基于尽力而为的原则进行维护。考虑直接与 MA 共享您的音乐。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体 | 是 |
| 支持的媒体类型 | 艺术家、专辑、曲目、播放列表 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | 无损 FLAC (192 kHz, 24 bit) |
| 登录方式 | 密码 |

### 其他

- 从 Jellyfin 服务器上的"音乐"库中搜索

## 配置：
您需要向 Music Assistant 提供以下信息：

- <b>服务器。</b> 例如，https://music.domain.tld/ 或 http://192.168.1.4:8096/（对于本地服务器）
- <b>用户名。</b> Music Assistant 用于访问服务器的账户用户名
- <b>密码。</b> 账户密码

> [!NOTE]
> 建议使用 IP 地址而不是域名，以避免 IPv6 名称解析失败时出现问题。

### 设置

- <b>高级 - 验证 SSL。</b> 启用以验证 SSL/TLS 连接的证书。默认开启。

## 尚不支持：
- 专辑类型元数据

## 已知问题 / 说明
- 此提供者使用 <a href="https://github.com/jellyfin/jellyfin-apiclient-python" target="_blank" rel="noopener noreferrer">Jellyfin ApiClient</a> 与服务器通信。如果 Music Assistant 中某些功能无法正常工作，请尝试使用该库与您的服务器交互（能否 ping 通？能否获取艺术家和专辑？能否搜索？）

