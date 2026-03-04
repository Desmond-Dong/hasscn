---
title: "Plex"
---

# Plex 提供者 <img src="/assets/icons/plex-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持使用 Plex（音乐库）。由 <a href="https://github.com/micha91" target="_blank" rel="noopener noreferrer">micha91</a> 贡献，由 <a href="https://github.com/anatosun" target="_blank" rel="noopener noreferrer">anatosun</a> 维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体 | 是 |
| 支持的媒体类型 | 艺术家、专辑、曲目、播放列表 |
| 支持[推荐](/music-assistant/ui/#view-home) | 是 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | 无损 FLAC (192 kHz, 24 bit) |
| 登录方式 | 密码 |

### 其他

- 搜索 Plex 服务器

## 配置

<a href="/assets/screenshots/plex/plex-config-opts.png" target="_blank"><img src="/assets/screenshots/plex/plex-config-opts.png" alt="预览图片" loading="lazy" /></a>

- 单击`使用 Plex GDM 发现本地服务器`按钮，这**应该**发现您的本地服务器并预填充`local_server_ip`和`local_server_port`字段
- 如果 GDM 发现失败，上述两个字段将被填充为**"Discovery failed.... "**。在这种情况下，请添加您服务器的 IP 地址（不带任何 http:// 前缀），以及您暴露它的端口（通常是 32400）
- 如果需要，选择`SSL (HTTPS)`开关。如果启用此设置，高级设置中的一个选项将被激活，需要验证证书（默认开启）
- 如果您通过 MYPLEX.TV 登录 Plex，请单击`在 MYPLEX.TV 上验证`按钮，这可能会触发您浏览器的`弹出窗口`检测，所以请注意这一点，像平常一样验证 Plex
- 如果您已将 Plex 配置为允许本地连接无需验证（见下文），请单击`本地验证`按钮
- 选择您想使用的音乐库
- 保存设置

## Plex 配置

- 如果您想允许 Music Assistant 无需验证即可连接到 Plex，请转到您的 Plex 配置，Settings / Network。在标记为`允许无需验证的 IP 地址和网络列表`的字段中输入运行 Music Assistant 的计算机的 IP 地址，然后`Save Changes`

## 已知问题 / 说明

- Plex 提供者始终绑定到一个用户账户和一个库
- 如果您有多个库，您需要多次添加 Plex 提供者
- 如果您有多个 Plex 账户，它们有自己的播放列表，您也可以将它们添加为单独的提供者实例

