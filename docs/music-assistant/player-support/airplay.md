---
title: "AirPlay"
---

# AirPlay <img src="/assets/icons/airplay-logo.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持基于 AirPlay 的设备，包括支持 <a href="https://en.wikipedia.org/wiki/Remote_Audio_Output_Protocol" target="_blank" rel="noopener noreferrer">RAOP</a> 和 <a href="https://en.wikipedia.org/wiki/AirPlay" target="_blank" rel="noopener noreferrer">AirPlay2</a>。这包括 Apple 设备如 Homepod，也包括非常广泛的第三方设备如接收器和智能扬声器。由于 AirPlay 使用无损、时间戳流式传输，它是无损多房间播放的一个非常有趣的协议。

## 功能

- Music Assistant 自动检测 AirPlay 设备，即插即用
- AirPlay 设备将同步播放
- 音频质量为无损 44.1 kHz/16 位 PCM，可选压缩为（无损）ALAC
- 播放器设置允许配置立体声扬声器对

## 设置

Airplay 提供者有一个设置`启用延迟加入`，可用于允许播放器加入现有的 AirPlay 流而不是重新启动整个流。这可能不适用于所有情况，因此如果出现不同步播放等问题，请禁用此选项。另请注意，延迟加入的播放器可能需要几秒钟才能追上。

对于需要使用 PIN 配对才能使用的设备（例如 Apple TV），存在对 AirPlay 1 (RAOP) 协议的支持。选择`开始 AIRPLAY 配对过程`按钮注册 PIN，成功后，单击`保存`按钮保存授权密钥。

除了[单个播放器设置](/music-assistant/settings/individual-player/)外，AirPlay 提供者的单个播放器还有一个名为`AirPlay 特定设置`的独特部分。可用设置有：

- <b>用于流式传输的 AirPlay 版本。</b> 大多数设备默认为 AirPlay 1 (RAOP)。已知 AirPlay 1 实现不佳或仅支持 AirPlay 2 的设备将默认为 AirPlay 2。
- <b>设备密码。</b> 如果设备需要密码才能播放，则在此添加

AirPlay 1 (RAOP) 特定设置有：

- <b>启用加密。</b> 如果播放器需要，启用加密通信。仅限 AirPlay 1。
- <b>启用压缩。</b> 启用以通过将音频作为（无损）ALAC 发送来节省一些带宽
- <b>音频缓冲区。</b> 播放器应保持的缓冲区量（以毫秒为单位）以吸收网络吞吐量抖动。如果遇到音频中断，请尝试增加此值。默认值为 1000
- <b>忽略设备本身发送的音量报告。</b> AirPlay 协议允许设备报告自己的音量级别。对于某些设备，这不可靠，可能导致意外的音量变化。启用此选项以忽略这些报告

## 已知问题 / 说明

- Music Assistant 实现 <a href="https://en.wikipedia.org/wiki/Remote_Audio_Output_Protocol" target="_blank" rel="noopener noreferrer">RAOP</a> 和 <a href="https://en.wikipedia.org/wiki/AirPlay" target="_blank" rel="noopener noreferrer">AirPlay2</a>。大多数设备默认为 RAOP，因为 AirPlay 2 设备默认应该向后兼容。如果设备对 AirPlay 1 的实现不佳和/或仅支持没有 RAOP 的 AirPlay 2，则可能适用于 AirPlay2。
- 虽然相信已修复，但使用 Shairport 和 AirPlay 2 时已报告问题。如果遇到问题，请尝试禁用 AirPlay 2
- 由于删除了 RAOP 支持，无法播放到 Macbooks
- Apple TV 将被发现但需要配对。在播放器设置中有一个配对按钮，将在 Apple TV 的屏幕上显示代码
- 三星似乎以不完全向后兼容的方式实现了 AirPlay 2。一切似乎正常，更改音量、显示歌曲信息，您可以按预期控制三星设备，但是没有声音。类似应用程序如 Roon 和任何基于 slimproto 的应用程序的用户有同样的问题
- 某些设备（如 Kodi 或某些第三方 AirPlay 接收器）需要加密。如果没有声音，可以在高级播放器设置中启用加密
- 如果没有声音，还可以在高级播放器设置中尝试打开和关闭压缩
- 可以为需要密码的设备在高级设置中设置设备密码
- 如果您发现播放器在仍然开机时变为不可用，则可能没有发送其保活消息。可以为每个播放器配置超时。一些用户报告他们需要将其设置为长达一小时
- 已报告 Apple Homekit 会干扰播放。如果遇到问题，请从 Apple Homekit 中删除设备或尝试更改 Homekit (iOS) 的首选项部分中`AirPlay（扬声器和电视）`的设置。
  - 在此部分中，特别检查是否未选择`仅此家庭中的人`。选择此选项时，MusicAssistant 无法在 HomePod 上播放音频（不在提供者的高级设置中设置适当的密码）。改为选择`同一网络上的所有人`选项。
- 如果 AirPlay 设备错误地响应更改音量命令或随机更改音量，请尝试在播放器的 AirPlay 特定设置中选择`忽略设备发送的音量报告`选项
- AirPlay 2 实现是新的，尚未经过广泛测试。已知尚不支持基于 PIN 的配对。可能还有其他尚未已知的问题。