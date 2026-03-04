---
title: Snapcast Player Provider
description: Snapcast 播放器提供者详细信息
---

# Snapcast <img src="/assets/icons/snapcast-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 Snapcast，这是一个强大的同步多房间音频流式传输解决方案。Snapcast 可以在各种设备之间实现无缝播放，创造沉浸式音频体验。
无论是使用兼容 Snapcast 的扬声器还是 Raspberry Pi 等设备，都可以轻松享受同步音频播放。此组件由 <a href="https://github.com/Santiagosotoc" target="_blank" rel="noopener noreferrer">SantiagoSotoC</a> 贡献和维护。

MA 包含内置 Snapserver，但也可以使用外部服务器。下图显示了一种可能的输出组合。在图中，一个 Raspberry Pi 运行与 MA 和所有客户端通信的服务器。运行 Pi 的服务器也运行 Snapclient 并连接到一组扬声器。然后在另一个房间有另一个运行 Snapclient 的 Pi，一个运行 Snapdroid 的手机和一个运行 Snapweb 的笔记本电脑。

<img src="/assets/snapcast.png" alt="预览图片" style="width: 800px;"  loading="lazy" />

## 功能

- 所有 Snapcast 设备之间的同步播放
- 无损音频质量，支持 48kHz / 16 位 PCM 选项

## 设置

除了[单个播放器设置](/music-assistant/settings/individual-player/)外，Snapcast 提供者还有一个名为`内置 Snapserver 设置`的独特部分。可用设置有：

- <b>缓冲区大小。</b>（默认 1000ms）是在服务器上录制信号和在客户端上播放之间的总缓冲区大小（或更好的缓冲区持续时间）。这可以直接转化为音频信号的总延迟。如果按下播放或暂停或跳过曲目，由于此缓冲区，会注意到 1000ms 的延迟
- <b>块大小。</b>（默认 26ms）。服务器将连续从源读取此毫秒数到缓冲区，并将此缓冲区传递给编码器。编码后的缓冲区发送给客户端。某些编解码器具有更高的延迟，需要更多数据，例如 FLAC 需要约 26ms 的块，因此这是默认值
- <b>Snapserver 初始音量。</b> 新客户端的初始音量
- <b>向静音客户端发送音频。</b> 维护到静音客户端的流
- <b>Snapserver 默认传输编解码器。</b> 选项有 FLAC [默认]、OGG、OPUS 和 PCM

在`高级设置`部分有一个开关，允许使用外部 Snapcast 服务器以及以下设置：

- <b>Snapcast 服务器 IP。</b> 外部 Snapcast 服务器的 IP 地址（例如 `192.168.1.200`）
- <b>Snapcast 控制端口。</b> 可以访问外部 Snapcast 服务器的端口
- <b>空闲阈值流参数。</b>（默认 60000ms）流状态将在接收到这么多毫秒的静音后从播放切换到空闲

## 已知问题 / 说明

- Snapcast 提供者默认使用内置 Snapserver，尽管设置中的开关允许在需要时使用外部服务器。使用外部服务器时，必须输入服务器 IP 和端口
- Music Assistant 仅支持运行版本 0.27.0（或更新版本）的外部 Snapcast 服务器。如果使用外部服务器，可以通过使用命令 `snapserver -v` 启动来确认版本。请注意，版本 0.28.0 仅在 64 位操作系统上受支持。另请注意，版本 0.30.0 缺少 MA 所需的功能，无法使用
- 如果不使用外部服务器，则添加此提供者时将启动带有 Snapweb 选项的内置 Snapserver。启用后，服务器的工作是透明的，客户端出现在 MA UI 中
- 通过将浏览器或 Snapdroid 指向 `<YOUR_MA_IP_ADDRESS>:1780` 来创建客户端。浏览器标签页必须保持打开以维护流
- 所有客户端的客户端名称可以在 Snapweb 和 Snapdroid 中通过各自的 UI 调整。此外，可以在 MA 设置中重命名播放器
- 内置 Snapserver 只能接受来自 Music Assistant 的连接
- 如果需要调整客户端的延迟，必须从另一个界面如 Snapdroid 或 Snapweb 完成
- 如果静音播放器失去同步或在随后取消静音时出现不良的重新缓冲延迟，或在静音时关闭，请尝试打开`向静音客户端发送音频`选项
- 暂停已尽可能在 Snapcast 的限制内实现。MA 发出 STOP 和 RESUME 命令来实现暂停效果，但这意味着结果播放器状态永远不会变为暂停。
- 偶尔在流更改（暂停、跳过或搜索）后，Snapweb 可能会静音。可以通过在 Snapweb UI 中选择停止然后播放来解决此问题
- iOS 版 Snapcast 应用已损坏，因为它使用旧版本的 Snapclient。使用它会给此提供者带来问题
- 确保 Snapserver 主机上的端口 1704 和 1705 已打开。还要确保 4953 到 5153（含）之间的端口已打开
- 尝试默认 Snapcast 设置，然后根据需要进行更改