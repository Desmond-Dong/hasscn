---
title: "单个播放器设置"
---

# 单个播放器设置 <img src="/assets/icons/settings-players-icon.png" alt="Preview image" style="width: 70px; float: right;"  loading="lazy" />

单个播放器设置通常相当广泛。下图显示了各个部分的典型标题，下面的小节将对它们进行扩展。群组有相同的部分，但可用的设置较少。并非所有播放器都列出了所有设置。可以参考[播放器汇总表](/music-assistant/player-support/)来识别特定播放器类型应有的一些功能，否则请访问播放器的设置页面。

!<a href="/assets/screenshots/individual-player-settings.png" target="_blank"><img src="/assets/screenshots/individual-player-settings.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

## 通用设置

- <b>图标。</b> UI 的某些部分使用 material design 图标，这可以按播放器配置
- <b>启用队列流模式</b>（并非所有提供商都可用）。这可以用于不支持无缝播放和/或淡入淡出的播放器，或者如果播放器在音轨之间过渡有问题。请参阅播放器提供商页面了解启用此选项的优缺点
- <b>在 UI 中隐藏此播放器。</b> 此设置确定何时不在[播放器列表](/music-assistant/ui/#player-list)中显示播放器。选项有 `不可用时`、`群组活动时`、`同步时`、`始终` 和 `关闭时`
- <b>动态成员</b>切换。此设置适用于[同步群组和通用群组](/music-assistant/faq/groups/)。启用后，可以添加和删除这些群组类型的成员
- <b>群组成员。</b> 对于群组播放器类型，群组的成员在此字段中配置

## 音频

- <b>启用智能淡入淡出。</b> 此下拉菜单启用音轨之间的淡入淡出过渡功能。淡入淡出持续时间由下面的滑块设置。可用选项有 `禁用 [默认]`、`智能淡入淡出` 或 `标准淡入淡出`。智能淡入淡出自动分析每首音轨的节奏和节拍，创建无缝、音乐对齐的歌曲过渡。它调整 BPM、对齐强拍并应用基于 EQ 的混音以获得更平滑的淡入淡出——如果分析失败则回退到标准淡入淡出。标准淡入淡出使用简单的音量淡入淡出平滑地将一首歌的结尾与下一首的开始重叠。
- <b>淡入淡出持续时间。</b> 当在[音频部分](#audio)启用淡入淡出时，此滑块启用。默认设置为 8 秒
- <b>启用音量标准化。</b> 此设置通常应保持启用，以避免来自不同来源的音轨之间音量水平不同。在[技术信息页面](/music-assistant/faq/tech-info/#volume-normalization)阅读更多相关内容。目标级别在[高级设置](#advanced-settings)中设置
- <b>启用限制以防止削波。</b> 此设置通常应保持启用，以防止音轨中过大的峰值导致音频失真
- <b>输出通道模式。</b> 此设置允许选择发送到播放器的通道。选项有 `立体声`、`左`、`右` 或 `单声道`
- <b>DSP 设置。</b> 进入 DSP 设置视图的按钮在此部分。视图的功能在下面描述

### DSP 设置

所有提供商都可以选择对音频流应用 <a href="https://en.wikipedia.org/wiki/Digital_signal_processing" target="_blank" rel="noopener noreferrer">数字信号处理</a>（DSP）滤波器。DSP 让您使用各种滤波器塑造和优化音频。使用它来根据房间的声学特性定制声音，补偿扬声器特性，并根据个人喜好微调频率平衡。

DSP 选项位于每个播放器的 MA 设置中，这意味着每个播放器都有自己独立可配置的 DSP 设置。

AirPlay、Squeezelite 和通用群组的播放使用单个播放器 DSP 设置。对于所有其他群组类型，DSP 将被禁用。

DSP 路径包括一个用于初始增益控制的输入前置放大器，随后是可以在输入和输出之间添加的可选音频滤波器（如果需要可以多次添加）。以下滤波器可用：

- [参数均衡器](/music-assistant/dsp/parametriceq/)
- [音调控制](/music-assistant/dsp/tonecontrols/)

路径以输出阶段结束，提供增益控制和限制器（默认启用）以防止信号削波。

DSP 设置可以通过切换开关启用和禁用，允许轻松进行 <a href="https://www.youtube.com/watch?v=KefGjPYyIO4" target="_blank" rel="noopener noreferrer">A-B 测试</a>

DSP 设置左侧的线条按顺序表示从音频文件（顶部）到播放器（底部）的音频路径。

线上的点表示改变信号的组件。没有点表示该特定组件已被禁用。

使用视图顶部的图标，可以重新排序、禁用/启用或删除其他滤波器。

!<a href="/assets/screenshots/dsp.jpg" target="_blank"><img src="/assets/screenshots/dsp.jpg" alt="DSP image" loading="lazy" style="max-width: 100%;" /></a>

## 公告配置

有许多可配置选项用于控制发送到 MA 播放器的公告音量。这些都可以通过选择每个字段旁边的此图标 !<a href="/assets/icons/question-mark.png" target="_blank"><img src="/assets/icons/question-mark.png" alt="image" loading="lazy" style="max-width: 100%;" /></a> 的帮助很好地描述。当选择 `绝对音量` 选项时，`最大` 和 `最小音量` 级别框不适用。

!<a href="/assets/screenshots/announcements-settings.png" target="_blank"><img src="/assets/screenshots/announcements-settings.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

## 播放器控制

每个播放器都有许多选项可用于控制 MA UI 中电源、音量和静音控制的行为。默认情况下，如果设备支持这些控制，则使用该原生行为，或者如果不支持该控制，则它在 UI 中被禁用（设置将指示 NONE）。也可以通过将设置更改为 NONE 手动禁用控制。

可以将其他 HA 实体映射到 MA 播放器控制。为了使此成为选项，HA 实体需要首先通过 [HA 插件](/music-assistant/ha-plugin/)中的设置暴露给 MA。

**电源** 如果播放器不支持电源但希望播放器具有开和关状态，则可以使用 FAKE 选项，它将模拟开/关功能。

**静音** 有一个 FAKE 选项，它将在命令静音和取消静音时将音量设置为零并恢复它。

## 提供商特定设置

具有独特设置的提供商有：

- [AirPlay](/music-assistant/player-support/airplay/#settings)
- [Squeezelite](/music-assistant/player-support/squeezelite/#settings)
- [Google Cast](/music-assistant/player-support/google-cast/#settings)

## 高级设置

- <b>[音量标准化](/music-assistant/faq/tech-info/#volume-normalization)的目标级别</b>。-17 的默认设置通常不应更改。如果设置得太高，可能会导致削波。音量标准化在[音频](#audio)部分启用和禁用
- <b>将此播放器暴露给 Home Assistant</b>。如果禁用，播放器将不会导入到 HA
- <b>此播放器支持的采样率。</b> 此设置在播放器发现时自动设置，但可以手动设置播放器支持的采样率和位深。不支持采样率的内容将被重采样
- <b>用于向播放器流式传输音频的输出编解码器。</b> 默认为 FLAC，但其他选项有 MP3、AAC 或 WAV。
- <b>用于发送音频的 HTTP 配置文件。</b> 这被认为是非常高级的设置，仅应在需要时调整。例如，如果播放器在流中间停止或存在其他播放相关问题，请尝试不同的选项。默认值因播放器类型而异
- <b>尝试将元数据注入流（ICY）。</b> 启用此选项尝试向播放器提供元数据，可用于显示音轨信息，即使启用了流模式。并非所有播放器都正确支持此功能，因此，如果播放有问题，请尝试禁用此设置。
- <b>音频同步延迟校正</b>。请参阅[播放器汇总表](/music-assistant/player-support/)以识别哪些类型支持同步校正

此部分还有选项 `自动播放（开机时恢复）`，如果播放器队列中有项目，将自动开始播放。

