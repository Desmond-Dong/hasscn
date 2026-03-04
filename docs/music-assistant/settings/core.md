---
title: "System Settings"
---

# MA 系统设置 <img src="/assets/icons/settings-core-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

核心服务器设置使用典型默认值，应该适用于大多数用户。但是，每个核心控制器都有可用的设置，这些设置概述如下。所有控制器在高级部分都有日志级别设置。HA 插件和 docker 版本的服务器之间设置可能略有不同。

!<a href="/assets/screenshots/settings-core.png" target="_blank"><img src="/assets/screenshots/settings-core.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

## 缓存

- 有一个按钮可用于清除 Music Assistant 使用的缓存。不要经常使用此按钮，因为它会增加 [API 使用量](/music-assistant/usage/#online-metadata-sources)并减慢 MA 体验

## 元数据

- <b>语言。</b> 元数据的首选语言。如果所选语言不可用，则使用英语
- <b>启用从在线元数据提供者检索元数据。</b> 启用查找本地不可用的信息。MA 不修改任何现有元数据，而是补充它

## 音乐

- <b>高级 - 重置媒体库数据库。</b> 选择此按钮将擦除 MA 数据库。这是一个破坏性的不可逆操作！只有在确认数据库损坏时才应使用此功能。存储在数据库中的所有媒体库项目（包括播放列表）都将丢失，需要重新创建。重新扫描音乐提供者将使用这些提供者上包含的信息重建数据库。不要经常使用此功能。对于单个项目的问题，请使用从媒体库中删除菜单选项

## 播放器

- 目前除了日志级别外没有可用的设置

## 播放器队列

播放或排队项目时的行为由此部分中的设置决定。

!<a href="/assets/screenshots/settings-player-queues.png" target="_blank"><img src="/assets/screenshots/settings-player-queues.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

## 流

此部分中的所有设置都应被视为高级设置，在大多数情况下不需要调整。网络设置复杂的用户会在此部分找到有用的设置。如果 MA 似乎设置正确但没有播放，请检查此部分中的设置。

### 流服务器音频设置

<b>允许（内存中）缓冲（曲目）音频。</b> 默认情况下，Music Assistant 在流式传输音频时尽可能节省资源，特别是考虑到 Raspberry Pi 等低端设备。这意味着默认情况下禁用音频缓冲以减少内存使用。启用此选项允许在内存中缓冲音频，这可以（大幅）提高播放（和跳转）性能，但代价是增加内存使用。如果您在具有足够内存的设备上运行 Music Assistant，强烈建议启用此选项。

此部分包含影响 MA [音量标准化](/music-assistant/faq/tech-info/#volume-normalization)功能的设置。此功能默认启用，设置也可在[单个播放器](/music-assistant/settings/individual-player/#audio)上使用。通过在设置 UI 中为每个选项选择 !<a href="/assets/icons/question-mark.png" target="_blank"><img src="/assets/icons/question-mark.png" alt="问号" loading="lazy" style="max-width: 100%;" /></a> 图标，可以获得这些设置的详细在线帮助。

!<a href="/assets/screenshots/settings-streamserver-audio.png" target="_blank"><img src="/assets/screenshots/settings-streamserver-audio.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

### 流服务器高级设置

- <b>发布的 IP 地址</b>和<b>TCP 端口</b>通常会自动填充。如果播放有问题，请确认显示的 IP 地址可以被本地网络上的播放器访问。端口必须可用
- <b>绑定到 IP/接口。</b> 在复杂的网络设置中使用，以在特定接口上启动流服务器

- <b>SmartFades 日志级别。</b> Smart Fades 混音器和分析器的特定日志级别

## Web 服务器

- <b>允许用户自助注册。</b> 允许用户通过 Home Assistant OAuth 创建账户
- <b>基础 URL。</b> 在网络上访问此 Web 服务器的基础 URL。在高级场景中覆盖此设置，例如，您在反向代理后面运行 Web 服务器
- <b>TCP 端口。</b> Web 服务器运行的端口。如果更改此设置，请确保同时更改基础 URL 端口
- <b>启用 SSL/TLS。</b> 启用后会显示两个额外字段，用于添加 `SSL 证书`和 `SSL 私钥`（两者都必须是 PEM 格式）
- <b>高级 - 绑定到 IP/接口。</b> 在此特定接口上启动 Web 服务器。有关更多信息，请参阅 MA UI 中此设置的帮助

## 服务器日志

这将打开一个视图，可以在其中看到 Music Assistant 日志的尾部或下载完整日志。

