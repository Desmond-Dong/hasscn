---
title: "Google Cast"
---

# Google Cast <img src="/assets/icons/chromecast-logo.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 完全支持基于 Google Cast 的设备。这包括 Google 自己的硬件如 Google Nest 扬声器，但还有许多其他品牌也内置了"Chromecast"支持，如 Harman Kardon、JBL、Canton 等。

## 功能

- Music Assistant 自动检测 Cast 扬声器
- Music Assistant 支持播放到在 Google Home 应用中创建的 Cast 组
- 使用 Google Cast 组时，该组中的播放器可以实现完美同步
- 设备上的任何物理控制按钮以及语音控制都应该受支持
- Cast 扬声器可以与其他 Sendspin 客户端同步（实验性）

## 设置

除了[单个播放器设置](/music-assistant/settings/individual-player/)外，Google Cast 提供者还有一些独特的设置，如下所示：

- <b>启用实验性 Sendspin 模式</b>。启用后，Music Assistant 将使用 Sendspin 协议进行同步音频流式传输，而不是标准的 Chromecast 协议。这允许将 Chromecast 设备与其他 Sendspin 兼容播放器分组，以实现多房间同步播放。启用后，将出现一个名为"PlayerName (Sendspin)"的新播放器 - 在与其他 Sendspin 客户端创建组时使用此 Sendspin 播放器，而不是原始 Chromecast 播放器
- <b>Sendspin 同步延迟。</b> 以毫秒为单位的静态延迟，用于调整音频同步。正值延迟播放，负值提前播放。使用此选项补偿设备特定的音频延迟
- <b>Sendspin 编解码器。</b> 选择 Sendspin 流式传输的音频编解码器。选项有 FLAC（默认）、PCM 和 Opus。请注意，Opus 不能在 Cast 设备上原生工作，需要软件解码，这对 Google Cast Audio 设备来说可能 CPU 密集度过高。
- <b>使用 Music Assistant Cast 应用。</b> 默认开启，启用使用特殊的 MA Cast Receiver 应用在 Cast 设备上播放媒体。它已优化以提供更好的元数据，并为未来扩展做准备。如果播放遇到问题，请尝试禁用此选项。

## 已知问题 / 说明

- Cast 扬声器不支持音频交叉淡入淡出。如果您想要交叉淡入淡出和/或完全无缝支持，请在播放器的高级设置中启用"[流模式](/music-assistant/faq/tech-info/#track-queueing)"。启用流模式可能会解决播放问题，但可能会带来禁用实际物理按钮和/或设备本身显示元数据的副作用
- 如果您的 Chromecast 扬声器没有自动检测到或随机不可用，请确保您的启用 Cast 的扬声器与您的 Music Assistant 服务器在同一网络/子网上。此外，确保多播流量（更具体地说是 mDNS）可以自由传输，因为那用于发现播放器
- 重新启用已禁用的扬声器后，可能需要一段时间才能重新发现扬声器，可以通过重启 Music Assistant 来加速此过程
- 可以通过[通用组](/music-assistant/faq/groups/#universal-groups)分组 Cast 播放器，尽管它们可能不会同步播放
- 电视/视频设备（不是 AV 适配器）默认禁用
- 仅包含立体声对的 Cast 组将不起作用
- 已报告电池供电设备存在问题。在单个播放器设置中最可能的可行配置是：队列流模式开启（通用设置），HTTP 配置文件 2 和输出编解码器 MP3（高级设置）