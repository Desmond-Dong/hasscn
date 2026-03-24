---
title: 与 Home Assistant 对话 - 让系统运行起来
---

本节将帮助你设置 Assist，也就是 Home Assistant 的语音助手。

Assist 允许你使用自然语言控制 Home Assistant。它建立在开放语音基础之上，并由社区提供的知识驱动。

试用 Assist 最简单的方法是在我们的配套应用中。在仪表盘右上角查找 Assist 图标 <img src='/home-assistant/images/assist/assist-icon.svg' alt='Assist 图标' style='height: 32px' class='no-shadow'>。

开始使用 Assist 最简单的方法是使用我们推荐的语音助手硬件，[Home Assistant Voice Preview Edition](/home-assistant/voice-pe/)。

与 Home Assistant 的其他核心功能一样，Assist 可以个性化和扩展以满足您的需求。

- 它可以本地工作，也可以利用当今最强大的 LLM。
- 它可以在您的手机、平板电脑或其他自定义语音设备上工作。

<lite-youtube videoid="XF53wUbeLxA" videotitle="Home Assistant 中的语音功能"></lite-youtube>

## 入门

当您配置为 Home Assistant 制作的语音助手硬件时，它将使用向导帮助您配置系统并开始使用语音。

我们推荐的语音助手硬件是 [Home Assistant Voice Preview Edition](/home-assistant/voice-pe/)。

如果您的硬件不支持我们的向导，也不用担心。这里有两份详细指南，取决于您打算如何处理语音（本地处理，或使用 Home Assistant Cloud 语音服务）：

- [我计划在本地处理语音](/home-assistant/voice_control/voice_remote_local_assistant/)
- [我计划使用 Home Assistant Cloud](/home-assistant/voice_control/voice_remote_cloud_assistant/)（推荐，因为最简单）

## 扩展和实验

一旦您的设置启动运行并且您遵循了[最佳实践](/home-assistant/voice_control/best_practices)，请查看我们为[扩展您的 Assist 设置](/home-assistant/voice_control/expanding_assist)发现的所有可能性，并进一步尝试不同的设置，如[唤醒词](/home-assistant/voice_control/about_wake_word/)。您想与超级马里奥对话吗？或者其他人物？如果您想让 Assist 以有趣的方式回应，您可以创建一个具有 [AI 个性](/home-assistant/voice_control/assist_create_open_ai_personality/)的语音助手。

为了进一步完善您的设置，请尝试构建其他语音助手卫星设备，以便通过唤醒词将 Assist 添加到家中的各个房间：

- 在您的 Android 手机上[启用唤醒词检测](/home-assistant/voice_control/android/#using-wake-word-detection-on-android)，即使手机处于锁定状态，也能通过说出 “Hey Jarvis” 或 “Hey Nabu” 免提激活 Assist。

- 您可以使用 [ESPHome](https://www.esphome.io/components/voice_assistant/) 基于廉价的 ESP32 微控制器创建您自己的出色语音助手卫星设备，就像 [@piitaya](https://github.com/piitaya) 用他的 3D 打印 R5 机器人所做的那样。按照我们的教程[只需 13 美元就能创建一个](/home-assistant/voice_control/thirteen-usd-voice-remote/)。

- 另一个语音卫星替代方案是实验性的 [Linux-Voice-Assistant](https://github.com/OHF-Voice/linux-voice-assistant) 项目。它允许您在任何能够处理本地设备端音频处理的 x64 或 ARM64 硬件上，构建基于 Linux 的语音助手智能音箱。这种方式在自定义方面提供了更高的灵活性。由于它运行在完整的 Linux 系统上，您还可以获得显著更多的本地计算资源，用于同一卫星设备上的附加功能和其他集成。

- 如果您对不会一直监听的语音助手感兴趣，请考虑在模拟电话上使用 Assist。它只会在您拿起听筒时监听，而且回复只有您自己能听到。按照我们的教程创建您自己的[模拟电话语音助手](/home-assistant/voice_control/worlds-most-private-voice-assistant/)。

## 支持的语言和句子

Assist 的目标是支持比其他语音助手更多的语言，但这项工作仍在进行中，我们需要您的帮助。

Assist 已经支持广泛的[语言](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages)。使用[内置句子](/home-assistant/voice_control/builtin_sentences)控制实体和区域，或[创建您自己的句子](/home-assistant/voice_control/custom_sentences/)。

Assist 没有理解您的句子？[贡献它们](/home-assistant/voice_control/contribute-voice)。

_Assist 在 Home Assistant 2023.2 中引入。_
