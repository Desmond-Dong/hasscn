---
title: VBAN Receiver 插件
description: VBAN Receiver 插件的功能和说明
---

# VBAN Receiver <img src="/assets/icons/vban-icon.svg" alt="预览图片" style="width: 126px; float: right;" loading="lazy" />

Music Assistant 可以作为 VBAN 协议（通过 UDP 传输 PCM 音频）接收器。由 <a href="https://github.com/sprocket-9" target="_blank" rel="noopener noreferrer">sprocket-9</a> 贡献和维护。

VBAN 通常用于在本地网络上的设备之间路由音频。在 Music Assistant 中，VBAN Receiver 插件充当基于网络的辅助输入，允许将外部音频源作为标准 MA 流媒体源接入。典型用例包括传输系统音频、来自单个应用程序的音频，或从远程机器上的声卡输入（如麦克风或线路输入）捕获的音频。有关兼容的发送器实现示例，请参阅 [下方的 VBAN 发送器部分](#vban-发送器)。

## 功能

VBAN 是来自 <a href="https://vb-audio.com/Voicemeeter/vban.htm" target="_blank" rel="noopener noreferrer">VB-Audio</a> 的音频 over IP 协议，使用 UDP 在本地网络上传输高质量的原生 PCM 音频。

## 配置

该插件支持多实例，因此请确保每个插件实例在各自独立的 UDP 端口上监听，并配置为与 VBAN 发送器设置的流参数相匹配。

### 设置

VBAN Receiver 插件提供了几个配置选项，用于定义它如何连接和接收来自远程 VBAN 发送器的音频。这些设置确保正确的通信、格式兼容性和可靠的播放性能。

可用设置包括：

- <b>接收器：UDP 端口。</b> 定义 VBAN 接收器监听传入连接的 UDP 端口。确保远程 VBAN 发送器可以通过指定的 IP 地址和 UDP 端口访问服务器
- <b>发送器：VBAN 流名称。</b> 指定来自远程 VBAN 发送器的预期 VBAN 流名称。此值必须与发送器上配置的会话名称匹配；否则，音频流将失败。名称最多限于 16 个 ASCII 字符
- <b>发送器：VBAN 发送器主机名/IP 地址。</b> 设置远程 VBAN 发送器设备的主机名或 IP 地址
- <b>PCM 音频格式。</b> 定义来自远程发送器的预期 VBAN PCM 音频格式。这必须与发送器上配置的格式完全匹配，以确保成功进行音频流传输
- <b>PCM 采样率。</b> 设置来自发送器的预期 VBAN PCM 采样率。这必须与发送器的配置匹配，以保持正确的同步和播放
- <b>通道。</b> 指定要接收的音频通道数（即 1 或 2）

在高级部分：

- <b>接收器：绑定到 IP/接口。</b> 确定 VBAN 接收器应绑定到哪个网络接口或 IP 地址。使用 `0.0.0.0` 监听所有可用接口（默认）。这是一个高级选项，通常在标准设置中不需要调整
- <b>接收器：VBAN 队列策略。</b> 配置接收器内部数据包队列满时的行为。此设置定义在高负载条件下如何处理数据包溢出。选项包括 `清除整个队列`、`清除队列中最旧的一半` 和 `删除单个最旧的队列条目`
- <b>接收器：VBAN 数据包队列大小。</b> 定义处理前可以排队的最大数据包数。此设置可以在处理能力有限的系统上增加，但通常不需要修改

## 已知问题 / 说明

- 要收听插件音频，请导航到所需播放器的"正在播放"视图，然后在右上角的菜单中，选择"源"，并选择所需的 VBAN Receiver
- 虽然 VBAN 专为实时音频传输而设计，但此插件的主要目标是将远程系统音频路由到 MA，而不是实现实时播放。该插件充当中介，将从 VBAN 发送器传入的数据包直接转发给 MA 进行处理。由于 MA 经过优化，可以以最小的延迟处理来自插件的音频，因此总体延迟应保持较低。但是，MA 支持的各种播放器所采用的音频缓冲机制也会导致总延迟，从而导致最终音频输出中出现轻微但不可避免的延迟。
- 该插件使用无连接的 UDP 数据包传输音频，使网络质量成为影响性能的重要因素。有线与无线连接的使用、数据包丢失、网络延迟和抖动等因素都会影响音频可靠性。由于 UDP 不支持丢失数据包的重传，网络条件恶化可能导致播放中断或出现伪影。
- 如果 VBAN 发送器设备在有限的处理能力或高系统负载下运行，性能也可能受到影响，因为这可能会延迟数据包传输并导致音频断断续续或不一致。
- 此插件仅支持 VBAN AUDIO 子协议类型，不支持任何其他 VBAN 子协议。

## VBAN 发送器

### VB-Audio Windows 应用程序
大多数 <a href="https://vb-audio.com/index.htm" target="_blank" rel="noopener noreferrer">Voicemeeter 应用程序</a>（来自 VBAN 协议的创建者）都具有 VBAN 发送器功能，"最简单"的是 Voicemeeter Banana。这些音频混音器应用程序功能齐全，相当复杂，配置高度依赖于系统。文档和 Youtube 视频是了解如何配置它们的更好信息来源，而不是这里可以提供的。基本上，这些应用程序将安装许多 Voicemeeter 系统音频设备。Voicemeeter 输入设备被选为默认输出设备以通过 VBAN 路由整个系统音频，或者在音量混音器中选作应用程序的输出。

基本提示：

* 确保以管理员身份运行安装程序。
* 在 Hardware Out 部分，将 A1 输出设备配置为 MME 设备。
* 在某些情况下，可能需要禁用网卡上的省电功能。

按 VBAN 按钮配置传出流：
* IP 地址设置为：MA 服务器 IP
* 流名称、采样率和音频格式 - 在 VBAN Receiver 插件设置中镜像这些设置
* UDP 端口 - 帮助文档显示该应用程序曾经允许在此处设置 VBAN Receiver 的 UDP 端口，但现在不再是这样，默认为端口 6980，因此在 VBAN Receiver 插件设置中使用此端口。
* 按"On"启动流。

如果 Voicemeeter VBAN 部分的传出 VBAN 流旁边出现错误编号/红灯，这是**发送端问题，不是接收端/MA 端问题**。混音器配置中可能有问题。

## Pipewire
Pipewire 系统具有 <a href="https://docs.pipewire.org/page_module_vban_send.html" target="_blank" rel="noopener noreferrer">vban-send</a> 模块，可创建系统音频接收器。发送到接收器的任何音频都会转换为 VBAN 数据包并发送到目标 ip:port 的 VBAN Receiver，该目标需要设置为 MA 服务器的 IP 地址和 VBAN Receiver 插件中的监听端口。

`~/.config/pipewire/pipewire.conf.d/01-vban.conf`

```
{
	name = libpipewire-module-vban-send
	args = {
		source.ip = 0.0.0.0
		destination.ip = 127.0.0.1 # MA 服务器 IP
		destination.port = 6980 # VBAN Receiver 插件监听端口
		sess.name = "Network AUX" # 在 VBAN Receiver 插件中匹配
		audio.format = "S16LE" # 在 VBAN Receiver 插件中匹配
		audio.rate = 44100 # 在 VBAN Receiver 插件中匹配
		audio.channels = 2 # 在 VBAN Receiver 插件中匹配
		stream.props = {
			media.class = "Audio/Sink"
			node.name = "vban-sender-ma"
			node.description = "VBAN sender for MA"
		}
	}
}
```

在桌面环境中，该接收器在声音管理器 UI 中可用作音频输出，用于将整个系统或每个应用程序的音频路由到该接收器。

在无头环境中，<a href="https://docs.pipewire.org/page_man_pw-link_1.html" target="_blank" rel="noopener noreferrer">pw-link</a> 命令将通过端口 ID 将音频输出端口链接到 vban-sender-ma 输入端口。这些链接只是临时的，需要在重新启动或 pipewire 重启时重新创建，此时端口 ID 可能已更改。使用 Wireplumber 会话管理器和 lua 脚本可以实现使用节点属性而非端口 ID 的动态链接：

有关示例，请参阅 <a href="https://bennett.dev/auto-link-pipewire-ports-wireplumber/" target="_blank" rel="noopener noreferrer">此指南</a>、<a href="https://github.com/bennetthardwick/dotfiles/blob/master/.config/wireplumber/scripts/auto-connect-ports.lua" target="_blank" rel="noopener noreferrer">此 GitHub 脚本</a> 和 <a href="https://franks-reich.net/posts/creating_pipewire_links_with_wireplumber/" target="_blank" rel="noopener noreferrer">此文</a>。
