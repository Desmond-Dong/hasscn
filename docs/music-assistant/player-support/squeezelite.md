---
title: "Squeezelite"
---

# Squeezelite <img src="/assets/icons/slim-icon.svg" alt="Preview image" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 部分模拟 Logitech Media Server（现在作为 <a href="https://lyrion.org" target="_blank" rel="noopener noreferrer">Lyrion Music Server</a> 维护，又名 LMS），并以 <a href="https://github.com/ralph-irving/squeezelite" target="_blank" rel="noopener noreferrer">Squeezelite</a> 客户端的播放器提供商支持形式完全实现了 <a href="https://lyrion.org/reference/slimproto-protocol/"  target="_blank" rel="noopener noreferrer">SlimProto 协议</a>。

这意味着可以直接使用 Music Assistant 使用 Squeezelite 客户端播放器软件和硬件，以及从这些 Squeezelite 客户端播放器控制 Music Assistant（以及其他 slimproto 模拟器如 SqueezeSlave、SoftSqueeze 和 SqueezePlay）。

Squeezelite 客户端可用于从桌面操作系统到 <a href="https://www.picoreplayer.org">Raspberry Pi</a> 和 <a href="https://github.com/sle118/squeezelite-esp32" target="_blank" rel="noopener noreferrer">基于 ESP32 的设备</a> 的硬件。还支持一些旧版 <a href="https://lyrion.org/players-and-controllers/hardware-comparison/" target="_blank" rel="noopener noreferrer">原始 Logitech 品牌 Squeezebox 系列硬件播放器（以前称为 SlimDevices）</a>，如 Squeezebox Duet 和 Squeezebox Radio。

## 功能

- Squeezelite 客户端设备由 Music Assistant 自动检测
- [群组](/music-assistant/faq/groups/)播放使用单个播放器 [DSP 设置](/music-assistant/settings/individual-player/#dsp-settings)
- Squeezelite 客户端设备按钮支持
  - 设备上的任何物理控制按钮都应受支持，只要未启用[流模式](/music-assistant/faq/tech-info/#track-queueing)

## 设置

除了[单个播放器设置](/music-assistant/settings/individual-player/)外，Squeezelite 提供商在高级部分还有一个独特设置和一个独特的预设部分

- <b>高级 - 启用显示支持。</b> 某些 Squeezelite 硬件有显示屏，此设置启用支持。启用后，会提供第二个选项来选择 `可视化类型`
- <b>预设。</b> 真正的 Squeezebox 硬件或基于 jive(lite) 的模拟器支持预设。此部分允许将[播放列表](/music-assistant/usage/#playlists)或广播电台分配给这些预设

## 已知问题 / 注意事项

- MA 中此提供商的重点是支持软件 Squeezelite 客户端（如 <a href="https://www.picoreplayer.org/" target="_blank" rel="noopener noreferrer">piCorePlayer</a>）的使用。旧的原始 Squeezebox 硬件据报道可以工作，尽管分组有报告问题。MA 核心团队无法投入资源使这些设备比现在工作得更好。但是，欢迎向 <a href="https://github.com/home-assistant-libs/aioslimproto" target="_blank" rel="noopener noreferrer">aioslimproto 库</a>和/或 MA 中的 squeezelite 提供商提交 PR 以增强支持
- 在与 MA 相同的服务器上运行 LMS 且启用 MA Squeezelite 提供商可能会产生不良影响。Slimproto 使用的端口的默认设置为 3483。可以在此提供商的设置中更改，但非默认端口不适用于较旧的硬件 squeezebox 播放器。
- 确保您没有在 Home Assistant 中运行"slimproto"（Squeezebox 播放器）集成
- 通常不要使用队列流模式，除非使用过渡有问题的旧 Squeezebox 硬件播放器。启用队列流模式可能会解决播放问题，但可能会带来禁用实际物理按钮和/或设备本身元数据显示的副作用
- Squeezelite 设备没有原生静音功能。如果需要，可以使用"假静音"控制选项，这可以在每个单独播放器的 `播放器控制` 部分找到
- Squeezelite 群组使用 96 kHz / 24 位的固定输出格式

