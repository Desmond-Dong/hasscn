---
title: DLNA/UPnP 提供者
description: DLNA/UPnP 播放器提供者的描述
---

# DLNA/UPnP <img src="/assets/icons/dlna-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持基于 uPnP/DLNA 的设备。这是一个（某种程度上）通用的标准，用于将音频流式传输到支持的设备。由于制造商对此协议的实现非常不一致，某些播放器会工作得很好，而其他播放器则根本无法工作或需要变通方法。除此之外，如果您有一个可以工作的设备，您可以享受快速的本地控制、无损音频支持以及在许多情况下播放媒体的元数据。

> [!WARNING]
> **重要**
>
> 由于制造商对 DLNA 协议的实现不完整，最可能有效的配置是开启队列流模式。如果在确保启用此选项后仍有问题，请尝试每种不同的流配置文件

## 功能

- DLNA 设备在 Music Assistant 中自动检测

## 设置

有关 MA UI 中看到的设置的信息，请参阅[播放器提供者设置](/music-assistant/settings/player-provider/)和[单个播放器设置](/music-assistant/settings/individual-player/)页面。

## 已知问题 / 说明

- 某些设备需要特殊变通方法才能启用播放。如果播放不工作，请查看 Music Assistant 日志以获取线索，并在提供这些日志的情况下报告问题。不幸的是，由于解决这些问题的困难，它们的优先级较低。如果您的设备支持不同的协议，请使用该协议而不是提出问题
- 如果未找到您的设备，请尝试打开选项`允许网络扫描进行发现`。请注意，发现播放器可能需要长达 5 分钟（这也适用于设备重新打开时）
- DLNA 扬声器不支持音频交叉淡入淡出。如果需要交叉淡入淡出和/或完全无间隙支持，必须在播放器设置中启用[队列流模式](/music-assistant/faq/tech-info/#track-queueing)。启用流模式可能会解决播放问题，但可能会带来禁用实际物理按钮和/或设备本身显示元数据的副作用
- 可以通过[通用组](/music-assistant/faq/groups/#universal-groups)对 DLNA 播放器进行分组，尽管它们可能不会同步播放
- 虽然 Sonos 设备严格来说也基于 DLNA，但它们在此基础上创建了自己的额外层，如交叉淡入淡出支持和许多其他好东西。因此建议在 Music Assistant 中使用 Sonos 播放器提供者而不是 DLNA 提供者。MA 默认禁用任何发现的 Sonos DLNA 设备
- 为了支持更多的播放器，提供了不同的流配置文件。如果播放器不工作、在流中间停止或有其他播放问题，请更改播放器设置`用于发送音频的 HTTP 配置文件`并尝试每个选项直到播放器工作
- 某些播放器（例如 JRiver Media Center）不支持 FLAC 流。如果播放命令失败或没有声音，请尝试将`用于将音频流式传输到播放器的输出编解码器`（在播放器设置的高级设置下）更改为其他选项之一
