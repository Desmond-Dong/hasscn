---
title: 'ESP32-S3 上的设备唤醒词在这里 - 语音：第 6 章'
description: 本章介绍了设备唤醒词检测 (microWakeWord)、句子触发器的定制、控制设备的附加意图以及更好的错误消息。
---
**TL;DR:** 我们添加了设备上唤醒词检测 (microWakeWord)！它比在 Home Assistant 中处理唤醒词更快、更具可扩展性。我们将继续支持 Home Assistant 中的唤醒词处理。另外一个新功能是对语句的更多定制、控制更多设备的附加意图以及更好的错误消息和调试工具。

<p class='img'>
<lite-youtube videoid="NQIv3nsu7dE" videotitle="Voice - Chapter 6 Livestream"></lite-youtube>
观看完整的 Voice 第 6 章直播
</p>

2023 年的“语音年”为用户用自己的语言控制 Home Assistant 奠定了坚实的基础。

我们继续改进[协助]，包括：

- 更多自定义选项[句子触发器]
- 更好的错误消息和[调试工具]
- 用于控制阀门、吸尘器和媒体播放器的附加[意图]

哦，还有“一件事”：**在设备上，ESPHome 中的开源唤醒词检测！** 🥳🥳🥳

观看这段视频，了解在 [ESP32-S3-BOX-3] 上运行的新 [microWakeWord] 系统以及在 Home Assistant 内进行唤醒词检测的系统：

<p class='img'>
<lite-youtube videoid="oSKBWtBJyDE" videotitle="On-设备 wake word is here! Demonstrating microWakeWord on the ESP32-S3-BOX-3 in Home Assistant."></lite-youtube>
设备上与流式唤醒词
</p>

<!--more-->

## 微唤醒词

感谢 [Kevin Ahrendt] 创建的令人难以置信的 [microWakeWord]，ESPHome 现在可以像 [ESP32-S3-BOX-3] 一样在设备上执行唤醒词检测。
您可以[今天在 S3-BOX-3 上安装][s3-box-教程]来尝试一下。

回到[第 4 章]，我们使用 [openWakeWord] 添加了唤醒词检测。不幸的是，openWakeWord 太大，无法在 S3-BOX-3 等低功耗设备上运行。
因此，我们选择在 Home Assistant 内运行唤醒词检测。

<p><img src='/home-assistant/images/blog/2024-02-21-voice-chapter-6/challenge.png' class='no-shadow' /></p>

在 HA 中进行唤醒词检测允许像 [M5 ATOM Echo 开发套件][m5-教程] 这样的微型设备简单地传输音频并让所有处理在其他地方进行。这非常棒，因为它允许使用简单 ESP32 芯片的低功耗设备转变为语音助手，即使它们不具备检测唤醒词所需的功能。
缺点是添加更多语音助手需要 HA 中更多的 CPU 使用率以及更多的网络流量。

输入 microWakeWord。在听完 Paulus Schoutsen（Home Assistant 创始人）在 [Self Hosted](https://selfhosted.show/) 播客上的采访后，Kevin Ahrendt 创建了一个基于 [Google 的 Inception 神经网络](https://towardsdatascience.com/a-simple-guide-to-the-versions-of-the-inception-network-7fc52b863202) 的模型。作为 [ESPHome] 的现有贡献者，Kevin 能够让这个新模型在 S3-BOX-3 内的 ESP32-S3 芯片上运行！ _（它也适用于现已停产的 S3-BOX 和 S3-BOX-Lite）_

Kevin 为 microWakeWord 的推出训练了【三个模型】（https://github.com/esphome/micro-wake-word-models/tree/main/models）：

*“好吧，纳布”
*“嘿贾维斯”
*“Alexa”

您现在可以按照 [ESP32-S3-BOX 教程][s3-box-教程] 自行尝试这些内容。更改默认的“okay nabu”唤醒词将需要调整您的 [ESPHome 配置](https://beta.esphome.io/components/micro_wake_word.html) 并重新编译固件，这可能需要很长时间，并且需要具有超过 2GB RAM 的计算机。

我们感谢 Kevin 开发 microWakeWord，并使其成为开放之家的一部分！

## 句子炎症反应向 Assist 添加自定义句子就像向自动化添加 [sentence 煽][sentence 煽] 一样简单。这使您可以用任何您想要的句子来破坏Home Assistant中的任何动作。

现在，借助 HA 2024.2 中的新 [对话响应] 动作，您还可以自定义口头或打印回给您的响应。使用[模板](/home-assistant/docs/automation/templating/#sentence)，您的回复可以参考您家的当前状态。

<p><img src='/home-assistant/images/blog/2024-02-21-voice-chapter-6/assist-custom-response-editor.png' class='no-shadow' /></p>

你也可以在你的句子中参考[通配符](/home-assistant/docs/automation/trigger/#sentence-wildcards)。例如，句子：

```text
play {album} by {artist}
```

可以得到这样的回应：

```text
Playing  by 
```

除了调用媒体服务之外。

您现在可以通过单击此处在我们的自动化编辑器中尝试句子触发器和自定义对话响应：
[![打开您的 Home Assistant 实例并显示您的自动化。](https://my.home-assistant.io/badges/automation.svg)](https://my.home-assistant.io/redirect/automation/)

## 改进的错误和调试

帮助用户非常熟悉“抱歉，我听不懂”这句话。给出此通用错误消息的原因有多种，例如：

* 该句子与任何已知的[明白]不匹配(https://github.com/home-assistant/intents)
* 设备/区域名称不匹配
* 某个区域没有任何特定类型的设备（灯光、视线等）

从HA 2024.2开始，协助为众多情况提供不同的错误消息。

<img class="no-shadow" src='/home-assistant/images/blog/2024-02/assist-errors.png' alt='Screenshot showing the new 错误 Assist will return in case the intention is understood, but something else is missing.'>

现在，如果您遇到错误，将知道从哪里开始查找！首先要检查的是您的设备是否[暴露于协助](/home-assistant/voice_control/voice_remote_expose_devices/)。某些类型的设备（例如灯光）默认是公开的。其他的，如门锁，则不能且必须手动暴露。

一旦您的设备公开，请确保您添加适当的[别名](/home-assistant/voice_control/aliases)，以便准确地协助您将如何引用它们。设备和区域知道有多个别名，甚至可以使用多种，因此可以满足每个人的语言偏好。

如果出现问题，请参阅[辅助调试工具][调试工具]也得到了改进。使用该工具，您可以帮助如何解释句子，包括任何缺失的部分。

<p><img src='/home-assistant/images/blog/2024-02-21-voice-chapter-6/debug_tool.png' class='no-shadow' /></p>

[![打开您的 Home Assistant 实例并显示您的辅助开发者工具。](https://my.home-assistant.io/badges/developer_assist.svg)](https://my.home-assistant.io/redirect/developer_assist/)

我们的社区 [语言领导者](https://开发者.home-assistant.io/docs/voice/language-leaders) 正在努力翻译协助的句子。如果您对添加新句子有建议，请在 [意图存储库](https://github.com/home-assistant/intents) 上创建问题或给我们发邮件至 voice@nabucasa.com

## 谢谢

感谢 Home Assistant 社区订阅 [Home Assistant Cloud][nabucasa] 以支持 Home Assistant、ESPHome 和其他项目的语音和开发。

感谢我们的语言领导者将句子支持所有各种语言。

<p class='img'>
<img src='/home-assistant/images/blog/2024-02-21-voice-chapter-6/ha-support.png' alt="Thank you for supporting the Home Assistant project">
</p>[声音之年]：/博客/2022/12/20/year-of-voice/
[Assist]: /voice_control/
[exposed]: /voice_control/voice_remote_expose_devices/
[alias]: /voice_control/aliases
[wyoming]: https://github.com/rhasspy/wyoming
[openWakeWord]: https://github.com/dscripka/openWakeWord
[Piper]: https://github.com/rhasspy/piper/
[wyoming-satellite]: https://github.com/rhasspy/wyoming-satellite
[s3-box-教程]: /voice_control/s3_box_voice_assistant/
[ESP32-S3-BOX-3]: https://www.espressif.com/en/news/ESP32-S3-BOX-3
[ESPHome]: https://esphome.io
[nabucasa]: https://www.nabucasa.com
[sentence 触发器]: /docs/automation/触发器/#sentence-触发器
[conversation response]: /docs/scripts/#respond-to-a-conversation
[microWakeWord]: https://github.com/kahrendt/microWakeWord
[Kevin Ahrendt]: https://www.kevinahrendt.com/
[debugging tools]: /voice_control/troubleshooting/#test-a-sentence-per-language-without-voice-without-executing-commands
[intents]: https://开发者.home-assistant.io/docs/intent_builtin
[Chapter 4]: /博客/2023/10/12/year-of-the-voice-chapter-4-wakewords/
[m5-教程]: /voice_control/thirteen-usd-voice-remote/