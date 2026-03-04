---
title: "我想流式传输到"
---

## 我的本地 HA 设备

安装 <a href="https://github.com/pssc/ha-addon-squeezelite" target="_blank" rel="noopener noreferrer">squeezelite 应用</a>，然后可以通过音频连接从 HA 主机流式传输到您的扬声器或放大器。

<details>
<summary>此选项的故障排除步骤</summary>
<div>
某些问题（单独列在下面）可能会影响此解决方案，以下设置应避免所有这些问题：

  * 在 SqueezeLite 应用上启用"显示未使用的配置选项"，然后设置：
    * build：**pa**（PortAudio）或 **alsa**
    * options：`-a 150ms`（目标延迟，实验找到最佳值）
  * 确保在 Music Assistant 播放器*高级设置*中的*输出格式*设置为**除 WAV 外**的任何格式。

### 切换音轨时音频太快或太慢（采样率错误）

PulseAudio 版本的 SqueezeLite 有一个已知问题，在切换音轨时<a href="https://github.com/ralph-irving/squeezelite/issues/177" target="_blank" rel="noopener noreferrer">以错误的采样率播放音频</a>。

如果遇到此问题，请在 SqueezeLite 设置中启用"显示未使用的配置选项"，并将 *build* 类型更改为 **pa**（PortAudio）或 **alsa**。

### 切换音轨时初始音频被吞掉或卡顿

PulseAudio 版本的 SqueezeLite 也有已知的<a href="https://github.com/ralph-irving/squeezelite/issues/155" target="_blank" rel="noopener noreferrer">切换音轨时的同步问题</a>。

如果遇到此问题，同样如上所述，将 *build* 类型更改为 **pa**（PortAudio）或 **alsa**。

### "直升机噪音" / 播放被切断

如果听到"<a href="https://github.com/pssc/ha-addon-squeezelite/issues/1" target="_blank" rel="noopener noreferrer">直升机噪音</a>"，则将目标延迟调整为更高的值。

为此，启用"显示未使用的配置选项"并在使用 ALSA 或 PA（PortAudio）*build* 时将 `-a 150ms` 添加到 *options* 文本字段。可能需要实验更高或更低的值。

### 某些音轨播放时是静电噪音而不是音频

这是<a href="https://github.com/music-assistant/support/issues/4163" target="_blank" rel="noopener noreferrer">Music Assistant 的一个问题</a>，影响所有不使用 `i16` 采样格式（如 24/32 位音频）的音轨，当使用 **WAV** *输出编解码器*流式传输时。

遇到此问题时，在 Music Assistant 播放器*高级设置*中将*输出格式*更改为 **FLAC**（或任何其他非 WAV 格式）。

或者，在 SqueezeLite 应用中启用"显示未使用的配置选项"并在 *options* 字段中添加 `-W` 也可以解决此问题。
</div>
</details>

## 我的随机连接设备

### 流式传输到 Squeezelite 兼容客户端

将任何 <a href="https://sourceforge.net/projects/lmsclients/files/squeezelite/" target="_blank" rel="noopener noreferrer">Squeezelite 兼容应用程序</a>（即 <a href="https://en.wikipedia.org/wiki/Squeezelite" target="_blank" rel="noopener noreferrer">Squeezelite 软件客户端</a>，有时也称为"Squeeze Lite"应用）安装到您的移动设备或其他设备，然后 MA 应该能够流式传输到它。

如果您在本地网络上有 Squeezelite 兼容客户端，MA 将能够自动检测并流式传输到它们（这通过 Squeezelite 兼容性工作，无需您添加任何特定配置或凭据）。请注意，Squeezelite 客户端通常没有自己的用户界面，因此必须通过 Music Assistant 进行控制。

请参阅<a href="https://github.com/orgs/music-assistant/discussions/1123#discussioncomment-6652948" target="_blank" rel="noopener noreferrer">这里</a>了解如何在 Windows 上运行 squeezelite 的示例

[Music Assistant Companion App](/music-assistant/companion-app/) 也可以配置为运行 squeezelite 客户端，这将允许播放到运行它的设备。

## 我的基于 ESP32 的设备

如果硬件至少有 4MB 闪存和 4MB PSRAM，它将能够直接运行 squeezelite。使用 <a href="https://github.com/sle118/squeezelite-esp32" target="_blank" rel="noopener noreferrer">Squeezelite ESP32 固件</a>。一个带有扬声器端子的预制解决方案是 <a href="https://www.tindie.com/products/sonocotta/louder-esp32/" target="_blank" rel="noopener noreferrer">Louder ESP32</a>

如果 ESP32 设备上有其他固件且已被 Home Assistant 发现，请使用 <a href="https://music-assistant.io/integration/installation/" target="_blank" rel="noopener noreferrer">Home Assistant Player Provider</a> 将 HA 媒体播放器实体暴露给 MA。如果暴露的播放器运行的是 ESPHOME，请考虑在播放器设置中将输出编解码器更改为 `MP3 (lossy)`（如果还不是默认值），因为这可能是播放器所能处理的全部。

还有一个 <a href="https://github.com/jorgenkraghjakobsen/snapclient" target="_blank" rel="noopener noreferrer">Snapclient 移植版本</a>也可以使用。

## 我的蓝牙扬声器

如果您有闲置的 Raspberry Pi（任何型号），<a href="https://www.picoreplayer.org" target="_blank" rel="noopener noreferrer">PiCoreplayer</a> 是一个优秀的解决方案，也可以连接到蓝牙扬声器。要使用 piCorePlayer 流式传输到您的蓝牙设备，请遵循以下最佳实践以确保高保真音频和稳定连接：

* 强烈建议为您的 Raspberry Pi 使用有线以太网连接而不是 Wi-Fi。在大多数 Raspberry Pi 型号上，蓝牙和 Wi-Fi 无线电共享同一个芯片和天线；同时使用两者通常会导致严重的音频"卡顿"、断连和范围缩小。通过使用以太网，您可以消除这种射频干扰，为您的音乐数据提供专用、干净的管道，使其能够不间断地到达蓝牙发射器。

* 虽然使用 Raspberry Pi 的内置蓝牙适配器或基本 USB 适配器也可以工作，但这些选项有几个缺点。标准适配器完全依赖 Pi 的软件编码音频，这可能会将您限制在较低质量的编解码器，如 <a href="https://en.wikipedia.org/wiki/SBC_(codec" target="_blank" rel="noopener noreferrer">SBC</a>) 或标准 <a href="https://en.wikipedia.org/wiki/AptX" target="_blank" rel="noopener noreferrer">aptX</a>。此外，旧 Pi 型号上的处理开销可能导致延迟（音频延迟），内置天线众所周知地弱——特别是如果 Pi 安装在金属或厚塑料外壳中，这可能会严重降低信号强度。

* 高性能音频的最佳选择是使用专用蓝牙音频发射器，如 <a href="https://www.sennheiser-hearing.com/p/btd-700/" target="_blank" rel="noopener noreferrer">Sennheiser BTD 700</a> 或 <a href="https://uk.creative.com/p/speakers/creative-bt-w6" target="_blank" rel="noopener noreferrer">Creative BT-W6</a>。这些设备作为"无驱动"外部 USB 声卡，将音频编码的繁重工作——特别是高清编解码器如 <a href="https://www.aptx.com/aptx-adaptive" target="_blank" rel="noopener noreferrer">aptX Adaptive</a> 和 aptX HD——卸载到适配器自己的专用处理器。这使得即使是旧的 Raspberry Pi 1 也能提供与现代高端耳机能力匹配的现代高分辨率无线音频，同时提供更稳定的连接和用于简化设置的物理配对按钮。

如果在 piCorePlayer 中使用 USB 适配器，则需要调整 `Squeezelite Settings` 页面上的一些设置。将 `Audio Output` 设置为 `USB Audio` 并保存。在必要的重启后，导航回该设置页面，点击 `Card Control`，然后在 `Raspberry Pi Built-in Audio` 部分通过取消勾选框禁用内置音频。

## 我的浏览器

<img src="/assets/label-easiest-noshadow.png" alt="easiest label" style="width: 64px;"  loading="lazy" />
播放到内置 Sendspin Web 播放器。

<img src="/assets/label-intermediate-noshadow.png" alt="easiest label" style="width: 64px;"  loading="lazy" />
使用 [Snapserver](/music-assistant/player-support/snapcast/) 和 Snapweb 选项。如果您在 MA 中启用了 Snapcast 提供商，内置服务器将在 MA 服务器的 IP 地址上的端口 1780 上可访问，您也可以使用已作为播放器提供商添加到 MA 的外部服务器。

## 我的 Android 手机

<img src="/assets/label-easiest-noshadow.png" alt="easiest label" style="width: 64px;"  loading="lazy" />
播放到内置 Sendspin Web 播放器。

<img src="/assets/label-intermediate-noshadow.png" alt="intermediate label" style="width: 64px;"  loading="lazy" />
使用 <a href="https://play.google.com/store/apps/details?id=de.badaix.snapcast" target="_blank" rel="noopener noreferrer">Snapcast 应用</a>和 [Snapserver 提供商](/music-assistant/player-support/snapcast/)

## Music Assistant

您可以使用 <a href="http://www.darkice.org/" target="_blank" rel="noopener noreferrer">Darkcast</a> 捕获和 <a href="https://www.icecast.org/" target="_blank" rel="noopener noreferrer">Icecast</a> 构建一个解决方案，将您的模拟音频设备（如黑胶唱片机）的音频数字化并作为网络广播流（URL）流式传输，您可以将其作为广播电台添加到 Music Assistant 中。

对于这样的项目，您需要一个提供音频输入和数字化的音频捕获和 ADC（模数转换器）设备。例如，您可以使用 <a href="https://www.behringer.com/catalog.html?catalog=Category&category=C-BEHRINGER-AUDIOINTERFACES-USBAUDIOINTERFACES" target="_blank" rel="noopener noreferrer">Behringer</a> 或 <a href="https://www.ikmultimedia.com/products/irigstream/" target="_blank" rel="noopener noreferrer">IK Multimedia</a> 的 USB 音频设备接口适配器，或带有 ADC 的 <a href="https://www.hifiberry.com/blog/need-some-input/" target="_blank" rel="noopener noreferrer">HiFiBerry 板</a>。

您可以在这里找到通用教程 <a href="https://maker.pro/raspberry-pi/projects/how-to-build-an-internet-radio-station-with-raspberry-pi-darkice-and-icecast" target="_blank" rel="noopener noreferrer">这里</a>，对于那些喜欢分步指南的人，请看<a href="https://github.com/quebulm/Raspberry-Pi-Vinyl-Streamer" target="_blank" rel="noopener noreferrer">这里</a>和<a href="https://github.com/gieljnssns/darkice-libaacplus-rpi-guide/blob/master/README.md" target="_blank" rel="noopener noreferrer">这里</a>（第一个还为 Raspberry Pi 3 / Raspberry Pi Zero 2 W 提供了预配置的 Linux 设备镜像）。

## 网络广播

您可以间接流式传输到只接受 URL 的设备，如网络广播。为此，您需要运行 Home Assistant 并执行以下操作：

- 安装 https://github.com/Poeschl-HomeAssistant-Addons/mpd（这将创建一个 mpd media_player 实体）
- 在 mpd 应用中启用 httpd_output（允许网络流媒体）
- 在 Music Assistant 中使用 HA 媒体播放器插件并选择 mpd 作为输出

感谢 <a href="https://github.com/mrueg" target="_blank" rel="noopener noreferrer">Manuel Rüger</a>，他在<a href="https://github.com/orgs/music-assistant/discussions/2410#discussioncomment-10885780" target="_blank" rel="noopener noreferrer">这里</a>向我们展示了

## 我还未购买的设备！

Music Assistant 中可用播放器提供商的能力汇总[可在此处找到](/music-assistant/player-support/)。

一般而言，应该给您带来最少到无设置困难的协议/设备是：

- 任何支持 <a href="https://en.wikipedia.org/wiki/AirPlay" target="_blank" rel="noopener noreferrer">AirPlay</a> 的设备/扬声器
- 任何支持 <a href="https://en.wikipedia.org/wiki/Google_Cast" target="_blank" rel="noopener noreferrer">Google Cast 协议</a> 的设备/扬声器（也称为 cast builtin）
- <a href="https://en.wikipedia.org/wiki/Squeezebox_(network_music_player" target="_blank" rel="noopener noreferrer">Squeezebox 硬件</a>)
- 基于 <a href="https://sourceforge.net/projects/lmsclients/files/squeezelite/" target="_blank" rel="noopener noreferrer">Squeezelite</a> 的播放器
- <a href="https://www.sonos.com/en-us/home" target="_blank" rel="noopener noreferrer">Sonos</a>

我们不认为大多数人能听到 CD 质量以上采样率的差异，因此强烈推荐 AirPlay。它有良好的同步协议，在消费设备中广泛实现。对于大多数人来说，他们应该考虑自己已经拥有的设备并适应它（除非是 DLNA，由于某些设备的怪癖，考虑更改），以及他们的预算。

请注意，许多 Sonos 设备可以与 AirPlay 设备同步，这是 AirPlay 的另一个优点。

最后，如果计划分组播放器并希望使用 DSP 设置，请查看 [DSP 设置描述](/music-assistant/settings/individual-player/#dsp-settings)中哪些协议在这种情况下支持 DSP。

下表是可能解决方案的非详尽列表：

| 设备或软件	          | 价格# | 支持的协议              |+功放^| 优缺点 |
|------------------------------------------------|--------|----------------------------------|------|---------------|
|<a href="https://www.picoreplayer.org/" target="_blank" rel="noopener noreferrer">PiCorePlayer*</a> (DIY) |$	     |Squeezelite, AirPlay          	  |  Y	   |优点：便宜，可在 RPi 1 上运行，支持蓝牙流媒体<br>缺点：需要一些技术知识来安装免费软件|
|<a href="https://www.wiimhome.com/wiimpro/overview" target="_blank" rel="noopener noreferrer">WiiM Pro</a>|$$      |Squeezelite, AirPlay, Google Cast Audio, DLNA| Y |优点：设置简单，多功能<br>缺点：有更便宜的选择，Cast 需要应用才能有同步群组|
|<a href="https://www.wiimhome.com/wiimmini/overview" target="_blank" rel="noopener noreferrer">WiiM Mini</a>|$	   |AirPlay, DLNA	                    | Y      | 如 WiiM Pro |
|<a href="https://www.fiio.com/sr11" target="_blank" rel="noopener noreferrer">FiiO SR 11</a>              |$$	     |AirPlay	                          | Y	     | 如 WiiM Pro |
|<a href="https://sonocotta.com/louder-esp32/" target="_blank" rel="noopener noreferrer">Louder ESP32</a> (DIY) | $ |Squeezelite, AirPlay, Snapcast	  | N	     |优点：便宜<br>缺点：需要一些技术知识来安装软件|
|<a href="https://www.home-assistant.io/voice-pe/" target="_blank" rel="noopener noreferrer">Home Assistant (HA) Voice PE</a>|$ |Home Assistant 集成 |Y	 |优点：全本地语音控制和播放设备，支持强大<br>缺点：也需要 HA|
|放大器/接收器 + Cast	                       |$$$	     |Google Cast      	                | N	     |优点：设置简单，放大更强，高质量音频<br>缺点：昂贵，Cast 需要应用才能有同步群组|
|放大器/接收器 + AirPlay	                     |$$$	     |  AirPlay	                        | N	     | 优点：设置简单，放大更强，高质量音频<br>缺点：昂贵 |
|<a href="https://www.sonos.com/en-us/shop" target="_blank" rel="noopener noreferrer">Sonos</a><br><a href="https://www.ikea.com/us/en/cat/wi-fi-speakers-46194/" target="_blank" rel="noopener noreferrer">Ikea Symfonisk</a>|$$ → $$$	|Sonos（许多设备也支持 AirPlay）| Y/N~ |优点：设置简单，高质量音频<br>缺点：根据设备可能受限于 Sonos 生态系统|
|<a href="https://www.bluesound.com/usa/all-products" target="_blank" rel="noopener noreferrer">Bluesound 产品</a>| $$$ |Bluesound, AirPlay	      |Y/N~    |优点：设置简单，卓越的音质<br>缺点：昂贵 |

\# 价格：$ <100美元；$$ 101-250美元；$$$ >250美元

^ 设备需要单独的放大器吗？除非设备可以驱动扬声器以质量声音填满房间，否则这将是肯定的。

~ 取决于产品

\* 如果您想从 Pi 获得更好的音质，可以添加 <a href="https://www.hifiberry.com/docs/hardware/comparison-of-hifiberry-cards-for-audio-recording/" target="_blank" rel="noopener noreferrer">HiFiBerry</a> 或 <a href="https://sonocotta.com/raspberry-pi-media-center-hats/" target="_blank" rel="noopener noreferrer">Raspberry PI Media Center Hat</a>

(DIY) 设备需要软件安装和/或额外硬件（如电源、外壳）

