---
title: "Sendspin"
---

# Sendspin-audio 提供商 <img src="/assets/icons/sendspin-icon.svg" alt="Preview image" style="width: 70px; float: right;"  loading="lazy" />

<a href="https://www.sendspin-audio.com/" target="_blank" rel="noopener noreferrer">Sendspin-audio</a> 是由 <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener noreferrer">Open Home Foundation</a> 开发的音频播放、控制和同步协议。它是 **Music Assistant 内置的原生播放协议**，提供跨多个客户端的同步音频播放，具有采样精确的时序。

由于 Sendspin **免许可且开源**，任何人都可以使用该协议构建应用、设备和集成。规范可在 <a href="https://github.com/Sendspin/spec" target="_blank" rel="noopener noreferrer">github.com/Sendspin/spec</a> 获取。

> [!CAUTION]
> **技术预览**
>
> Sendspin 及其在 Music Assistant 中的实现目前处于 **技术预览** 阶段。虽然功能正常，但协议和实现可能会更改。
    
## 功能

- **同步多房间音频**：所有连接设备上的采样精确播放
- **自动发现**：Music Assistant 自动检测您网络上的 Sendspin 设备
- **每播放器 DSP**：每个设备的独立均衡器和音量设置
- **双向控制**：客户端可以控制播放（播放、暂停、跳过等）
- **实时元数据**：所有设备上的音轨信息、艺术作品和播放进度

## 配置

Sendspin 提供商是 **内置且始终启用的**。开始使用无需配置选项。

当客户端连接时，单个 Sendspin 播放器将自动出现，标准[播放器设置](/music-assistant/settings/player-provider/)适用。


## 已知问题 / 注意事项

- Sendspin 提供商默认添加
- Web 播放器自动出现在播放器列表中

### 限制

- **技术预览**：协议仍在发展中
- **网络要求**：对于直接连接，设备必须与 Music Assistant 在同一网络上
- **WebRTC 要求**：对于通过 WebRTC 进行远程访问，Home Assistant Cloud (Nabucasa) 提供最佳的 TURN 服务器支持，用于通过防火墙进行可靠连接

### 规范合规性和偏差

此实现与 <a href="https://github.com/Sendspin/spec" target="_blank" rel="noopener noreferrer">github.com/Sendspin/spec</a> 的规范之间存在一些差距。两者都可能更改。已知偏差包括：

- 尚不支持通过 `stream/request-format` 进行播放器格式更改
- 从不使用 `paused` `playback_state` - 只向客户端发送 `playing` 和 `stopped`
- 当播放停止、跳到下一首音轨或搜索时，所有流立即结束。在暂停、搜索或加载下一首音轨期间，艺术作品也会被清除
- 多服务器支持消息已实现但未完全利用 - 每个网络只支持单个服务器
- 仅支持 16 位音频格式

## 支持的客户端

多种客户端类型可以通过 Sendspin 连接到 Music Assistant：

| 客户端 | 描述 |
|--------|-------------|
| **Web 浏览器** | 内置 Music Assistant Web 播放器使用 Sendspin 进行本地播放 |
| **[Google Cast (Sendspin 模式)](/music-assistant/player-support/google-cast/)** | Chromecast 设备的实验性 Sendspin 模式 |
| **<a href="https://esphome.github.io/home-assistant-voice-pe-alpha/" target="_blank" rel="noopener noreferrer">Home Assistant Voice PE</a>** | Home Assistant Voice Preview Edition 的 Alpha 固件 |
| **<a href="https://www.sendspin-audio.com/code/" target="_blank" rel="noopener noreferrer"> 各种 Sendspin 客户端</a>** | 各种平台的客户端正在变得可用 |

## 工作原理

### 自动发现

本地网络上的 Sendspin 设备通过 mDNS 自动发现，并将出现在 Music Assistant 中。无需手动配置。

### Web 播放器

Music Assistant 前端中的内置 Web 播放器使用 Sendspin 进行音频播放。在本地网络上时，Web 播放器将尝试使用直接 WebSocket 连接以获得最佳性能；否则回退到 WebRTC。

同步延迟可以在 **设置 → 用户界面 → Sendspin 同步延迟** 下调整。此值根据平台自动选择，但可能需要手动调整。

#### 编解码器支持

使用的音频编解码器取决于连接和平台：

- **本地连接**（在同一网络上）：桌面浏览器和 Android 使用 FLAC（无损）。iOS、iPadOS 和 Safari 使用 Opus。
- **远程连接**（通过 WebRTC）：所有浏览器使用 Opus。

> [!NOTE]
> Android 上的 Firefox 不支持远程（WebRTC）播放。

### 连接方式

Sendspin 支持两种连接方式：

1. **直接 WebSocket**：由与 Music Assistant 在同一本地网络上的客户端自动使用，包括 Web 播放器和硬件设备。
2. **WebRTC**：用于不在本地网络时的远程访问。跨网络和通过防火墙工作。当直接连接不可能时，Web 播放器回退到此方法。

