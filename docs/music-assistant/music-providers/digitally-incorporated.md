---
title: "DI.fm Network"
---

# DI.fm Network 提供者 <img src="/assets/icons/difm-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 DI.fm 广播网络，包括 <a href="https://www.di.fm" target="_blank" rel="noopener noreferrer">DI.fm</a>、<a href="https://www.radiotunes.com" target="_blank" rel="noopener noreferrer">Radiotunes</a>、<a href="https://www.zenradio.com" target="_blank" rel="noopener noreferrer">Zen Radio</a>、<a href="https://www.jazzradio.com" target="_blank" rel="noopener noreferrer">Jazz Radio</a>、<a href="https://www.classicalradio.com" target="_blank" rel="noopener noreferrer">Classical Radio</a> 和 <a href="https://www.rockradio.com" target="_blank" rel="noopener noreferrer">Rock Radio</a>。由 <a href="https://github.com/benklop" target="_blank" rel="noopener noreferrer">Ben</a> 贡献和维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 否 |
| 自托管本地媒体 | 否 |
| 支持的媒体类型 | 电台 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | 有损 MP3 (320kbps) |
| 登录方式 | API Key |

### 其他

- 一个订阅即可使用所有六个网络，提供者允许选择希望订阅的网络
- 来自六个网络的数百个精选广播流可用
- 提供频道封面图片、类型信息和详细的频道描述

## 配置

- 在配置中，您需要添加 API 密钥并选择所需的网络

> [!NOTE]
> 此提供者需要高级订阅和"收听密钥"，可从网络中任何站点的设置面板获取。所有站点的密钥相同，订阅一个即可访问所有。

> [!CAUTION]
> 请考虑此提供者的同步/导入选项。保留 MA 默认的`导入到媒体库并标记为收藏`将导致所有选定网络的所有电台被添加到 MA 媒体库，这可能不是您想要的。

## 已知问题 / 说明

- 一个网络一次只支持一个流。如果尝试播放流并在 30 秒后停止播放，这表示网络中已经有另一个流正在播放。当前播放的流媒体客户端可以在网络中任何成员的设置页面上找到

## 尚不支持

API 中有更多元数据可用，但尚未公开。