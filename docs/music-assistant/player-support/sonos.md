---
title: "Sonos"
---

# Sonos <img src="/assets/icons/sonos-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 Sonos 设备。有两个提供者可用。"Sonos S1"用于 S1 设备，"Sonos"用于 S2。

## 功能

- Music Assistant 自动检测 Sonos 设备
- 同一系列（S1 或 S2）的 Sonos 设备在分组时会同步播放
- Sonos 设备可以选择性地与 AirPlay 设备分组

### AirPlay 功能

在 Sonos 播放器的设置中有一个选项可以`启用 AirPlay`。

如果该功能被禁用（正常 Sonos 播放），则使用 Sonos API 将音频流式传输到 Sonos 扬声器。音频将在该扬声器以及与其链接的任何扬声器上播放。

但是，许多 Sonos 设备支持 AirPlay 1 <a href="https://en.wikipedia.org/wiki/Remote_Audio_Output_Protocol" target="_blank" rel="noopener noreferrer">RAOP</a> 协议，这在 Music Assistant 中启用了非常有用的功能。

为了使用 Sonos 设备的 AirPlay 功能，还必须通过 MA 设置添加 AirPlay 提供者。这将创建 Sonos 设备的 AirPlay 版本。然后可以隐藏（不禁用）这些设备以删除重复的播放器（在 AirPlay 播放器设置中将`在用户界面中隐藏此播放器`设置为`始终`）。

如果随后选择了`启用 AirPlay`选项，播放命令将被重定向到 AirPlay 播放器，这意味着将使用 AirPlay 协议在该 Sonos 扬声器上播放音频。其他 Sonos 播放器可以与此播放器同步，此外还可以将任何支持 AirPlay 的扬声器/播放器与 Sonos 扬声器的 AirPlay 播放器分组。这意味着可以将相同的音频完美同步播放到 AirPlay 和 Sonos 扬声器的组合。

> [!NOTE]
> **注意**
>
> 您也可以通过绕过整个 Sonos 集成并仅使用所有 Sonos 扬声器的 AirPlay 等效设备来实现这一点，但这不是最佳选择，因为并非所有 Sonos 扬声器都具有 AirPlay 功能，并且使用 AirPlay 协议同步播放器会由于流重新启动而引入短暂的静音。

## 设置

有关 MA UI 中显示的设置信息，请参阅[播放器提供者设置](/music-assistant/settings/player-provider/)和[单个播放器设置](/music-assistant/settings/individual-player/)页面。

## 已知问题 / 说明

- 已报告 Sonos Arc 和 Unifi 网络设备存在问题。如果您遇到问题，请确保已启用多播 DNS 和 IGMP 侦听
- 已报告 `Sonos Connect Amp` 和 `Play:1` 上播放无法开始的问题。如果遇到这种情况，请在[单个播放器设置](/music-assistant/settings/individual-player/)中将`启用队列流模式`设置为开启
- S1 和 S2 设备不能在同一同步组中分组。S1 和 S2 设备可以通过通用组分组，但不会同步播放
- 同时使用 Sonos HA 集成和 MA Sonos S1 播放器提供者可能会导致问题。无法在同一主机上运行 HA 提供者和 Sonos S1 提供者，此外这些扬声器不喜欢来自太多源的太多请求。因此建议仅使用 MA Sonos S1 播放器提供者
- 将 Sonos 设备与 AirPlay 设备同步需要在 Sonos 播放器上启用一个选项
- Sonos 已从以下型号中移除 RAOP 支持：ERA 100、ERA 300、Move 2 和 Arc Ultra。因此，（从 Music Assistant）AirPlay 流式传输到这些设备是不可能的
- Sonos 固件更改导致当输出编解码器为无损（即 FLAC 或 WAV）时交叉淡入淡出不起作用。用户可以禁用交叉淡入淡出、切换到 MP3 编解码器或使用 AirPlay 模式

