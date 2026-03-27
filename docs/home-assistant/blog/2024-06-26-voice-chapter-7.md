---
title: 语音第 7 章 - 增强的唤醒词和计时器
description: '本章可能是迄今为止功能最丰富的章节之一，带来了人们强烈要求的计时器功能和对唤醒词的重大改进，以及甚至超越了大型科技公司的语音助手的实验技术。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# 语音第 7 章 - 增强的唤醒词和计时器

本章可能是迄今为止功能最丰富的章节之一，带来了人们强烈要求的计时器功能和对唤醒词的重大改进，以及甚至超越了大型科技公司的语音助手的实验技术。

<lite-youtube videoid="nLLO4u2Tbbo" videotitle="Voice - Chapter 7 live stream"></lite-youtube>

欢迎来到今天的菜单上的《声音》第七章：

- [microWakeWord 的大事](#big-things-for-microwakeword)
- [计时器来了！](#timers-are-here)
- [定时器控制装置](#timers-control-devices)
- [人工智能控制](#ai-in-control)
- [用脚本扩展法学硕士](#expand-an-llm-with-脚本)
- [增强媒体控制](#enhanced-media-control)
- [更轻松地更新语音助手](#easier-updates-for-your-voice-assistant)

<!--more-->

## microWakeWord 的大事

今年年初，唤醒词检测只能在 Home Assistant 本身上运行。语音设备会将所有音频传递给Home Assistant，Home Assistant会侦听支持的唤醒词，例如“Hey Jarvis”或“Okay Nabu”。  这样做的缺点是，您的设备（假设是树莓派）只能支持少数语音卫星，并且响应总是会出现延迟。我们知道在设备上运行唤醒词检测的好处，但缺乏良好的开源选项。

前数学教授[Kevin Ahrendt](https://github.com/kahrendt)接下了这个任务，并在业余时间创作了[microWakeWord](https://github.com/kahrendt/microWakeWord)。它是一个经过优化的唤醒词引擎，可在微控制器上快速可靠地运行。它是为 ESPHome 制作的，但可以在 Apache 2.0 开源许可证下独立使用。再也没有人需要为唤醒词付费了。

在我们的[第 6 章直播](https://www.youtube.com/live/NQIv3nsu7dE?si=9RZy-LpcRLiMjGg3&t=863) 中，我们深入探讨了如何在如此精简的硬件上进行语音处理（我们谈论的是 90 年代末 PC 级别的 RAM 和 CPU 功率）。正是在最后一章中，我们推出了 [v1 of microWakeWord](/home-assistant/blog/2024/02/21/voice-chapter-6/)，当时它只能在 ESP32-S3 芯片上运行。从那时起发生了很多事情，这一切都*棒*。

### microWakeWord 和 Kevin 加入 <!-- omit in toc --> 团队

我们很自豪地宣布 microWakeWord 已成为 [Open Home Foundation](https://www.openhomefoundation.org/) (OHF) 的合作伙伴。该基金会拥有并支持 Home Assistant、ESPHome 和我们的文本转语音引擎 Piper。合作伙伴地位将 microWakeWord 视为 Open Home 的一项重要技术。

Home Assistant云背后的公司 Nabu Casa 没有投资者，其唯一目的是为开放家庭基金会服务。它赚到的钱用于聘请开发人员从事Home Assistant和其他开放家庭项目。他们一直是语音开发的推动力量，正在构建自己的[基于 ESPHome 的语音硬件](/home-assistant/blog/2024/06/12/roadmap-2024h1/#current-priority-2-make-assist-easier-to-start-with)，让任何人都能享受注重隐私的语音助手。

Kevin 的贡献对于我们的 Voice 工作来说非常有价值。这就是为什么我们非常兴奋地宣布 Kevin 加入 Nabu Casa，他最初将专注于 ESPHome 中的 microWakeWord 和语音处理。

为了支持 Home Assistant、ESPHome、语音助手等方面的这项工作，请考虑订阅 [Home Assistant Cloud](https://www.nabucasa.com/)。

### 3x 唤醒词和 2x 准确度 <!-- omit in toc -->Kevin 一直在努力改进 microWakeWord，我们很高兴宣布版本 2，该版本将包含在下一个 ESPHome 版本中。它的运行速度更快并且准确性更高。

<p class='img'><lite-youtube videoid="LbS3Udx36H8" videotitle="Multiple wake words on a single esp32 设备"></lite-youtube>
13 美元 Atom Echo 在设备上运行两个唤醒词！</p>

当我们说新模型更快时，我们的意思是快得多。它现在不仅可以在普通的 ESP32 芯片上运行，这些芯片现在还可以**同时运行三个唤醒字**！我们尚未将此功能添加到Home Assistant中，但希望能够控制您的荷兰语和英语语音助手，每个语音助手都有自己的唤醒词。

新的性能并不以牺牲准确性为代价——事实恰恰相反。 **新模型的性能是 microWakeWord v1 的两倍**，特别是当您利用其[语音活动检测](https://en.wikipedia.org/wiki/Voice_activity_detection) 功能时。我们很乐意将我们的模型与商业竞争对手进行比较，但大多数公司认为“每小时错误接受”是商业秘密并且没有公布。

<img src='/home-assistant/images/blog/2024-06-voice-chapter-7/mWW-v1-vs-v2.png' style='border: 0;box-shadow: none;' alt="Picovoice benchmark microWakeWord v1 vs v2">

上图给出了 Picovoice 基准测试的结果，该基准使用了 24 小时内来自真实说话者的数百个唤醒词样本，并混合了真实的背景噪音。不包含唤醒词的英语口语句子被分层以测试错误接受，即。当唤醒词实际上未被说出时触发。我们可以提高模型的置信度，这使得它不太可能出现错误故障，但也不太可能接受唤醒词。总体而言，v2 的性能优于 v1，并且在良好的情况下，它的性能几乎是 v1 的两倍！

microWakeWord 的下一步是提高非英语母语人士的准确性。这需要我们收集世界各地人们说出唤醒词的录音。我们正在开发一个网站，让任何人都可以直接通过手机轻松参与。

## 计时器来了！

询问，您就会收到 - 今年 2 月[我们询问了我们的社区](https://community.home-assistant.io/t/poll-what-do-you-use-your-voice-assistant-for-what-do-you-expect-it-to-do-multiple-selections/693669) 他们希望从语音助手获得什么功能，除了控制设备和响应唤醒词之外，计时器是第三大需求的功能。这只是[我们的路线图](/home-assistant/blog/2024/06/12/roadmap-2024h1/) 如何帮助我们发现差距并构建解决方案的示例之一。

首先是重要的一点：**是的，你可以有多个计时器**。这些短暂的计时器允许在一段时间后提醒用户一些事情。例如，如果您正在煮鸡蛋，您可以设置一个计时器来提醒您将鸡蛋取出。每个计时器都有一个持续时间，以及一个可选的名称。

用户可以使用语音来创建、取消、暂停、恢复和更改计时器的持续时间：

 - “创建一个 5 分钟的计时器”
 - “为披萨创建 15 分钟计时器”
 - “取消我的计时器”
 - “在我的 5 分钟计时器上添加 2 分钟”
 - “从我的披萨计时器中减去 3 分钟”

当您为计时器命名时，可以更轻松地区分多个运行时间，因为您现在可以按名称或持续时间引用它（“取消披萨计时器”或“取消 15 分钟计时器”）。<p class='img'><lite-youtube videoid="v3mNdTsX4J0" videotitle="Voice timers with countdown text and loading bar"></lite-youtube>在 S3 Box 上运行的计时器，带有倒计时文本和加载栏！</p>

定时器现已在连接到最新版本 Home Assistant 的 ESPHome 和怀俄明州语音卫星上提供。如果您使用我们为 Atom Echo 开发套件或 ESP32-S3 Box 3 提供的固件，请更新到最新版本以获得计时器支持。

## 定时器控制设备

在开发计时器时，我们想：为什么要限制我们的用户在时钟滴答作响后只播放蜂鸣声。如果任何命令可以定时延迟执行怎么办？

<p class='img'><lite-youtube videoid="rgf5t3vn7TQ" videotitle="Using timers to control 设备"></lite-youtube>A 定时器控制灯光 </p>

这就是为什么在此发布中，用户现在可以允许**任何语音命令**在定时延迟后执行：“10 分钟内关闭灯光”。当时间到时，语音命令的文本将由听到延迟命令的同一个语音助手处理。请注意，与常规语音计时器不同，这些延迟命令无法取消或修改。

 - 5 分钟内关闭灯光
 - 10 分钟后暂停电视
 - 5分钟内打开百叶窗

大型语言模型 (LLM) 还能够创建延迟命令，例如说“我今晚要早点睡觉”，可能会导致 LLM 向自己发送延迟命令以更快地开始就寝程序。

## 人工智能掌控

说到法学硕士，我们的 Home Assistant 2024.6 更新允许 [AI 代理控制您的设备](/home-assistant/blog/2024/06/05/release-20246/#voice--assist)。这是我们在[最近的博客](/home-assistant/blog/2024/06/07/ai-agents-for-the-smart-home/) 中概述的更广泛的人工智能战略的一部分。它将是未来智能家居的重要组成部分，而Home Assistant因其注重隐私和选择而将成为AI的最佳平台。我们知道它并不适合所有人，也没有准备好大规模采用，但我们正在提供它来进行试验。立即在您的语音硬件上尝试一下，[Google AI](/home-assistant/integrations/google_generative_ai_conversation/) 和 [OpenAI](/home-assistant/integrations/openai_conversation/) 目前都可以使用设备控制。

## 用脚本扩展法学硕士

为了更轻松地扩展法学硕士可以做的事情，Home Assistant 2024.7（下周发布）将允许法学硕士访问批准的脚本。这可以让您精确控制法学硕士在特定情况下将做什么，同时保留人工智能所擅长的灵活性和自然语言处理。

<img src='/home-assistant/images/blog/2024-06-voice-chapter-7/voice-script.png' alt="Exposing voice 脚本 to Assist in Home Assistant Voice 设置" class='no-shadow'>

例如，告诉法学硕士对话代理您要离开家可能会导致一些意外行为，例如关闭您想要继续打开的设备。要解决此问题，请创建一个完全符合您要求的“离开家”脚本并将其公开给 Assist。您还可以在脚本中添加字段，这有助于进一步指导 LLM，例如为离家的短途或长途旅行提供不同的行为。现在，当您说“我要出去几分钟”时，使用脚本它会门锁门，但不会关闭空调。

## 增强的媒体控制Assist 现在可以通过“暂停”、“恢复”、“下一个”和“将音量设置为 100%”等简单命令来控制媒体播放器。虽然表面上很简单，但背后隐藏着很多复杂性。考虑一个有两个媒体播放器的客厅：一个暂停的智能扬声器和一台正在播放的电视。如果用户说“暂停”，电视将暂停，因为它是当前正在播放的唯一媒体播放器。但是，如果用户随后说“恢复”，Assist 只会恢复电视，因为它是最后一个暂停的媒体播放器。

<p class='img'><lite-youtube videoid="pFmwY-k5IcU" videotitle="Demo of media player commands of Home Assistant Assist"></lite-youtube>动作媒体控制</p>

媒体播放器可以按名称（“暂停电视”）或按区域（“恢复厨房里的音乐”）来定位。如果未提供，则语音卫星的区域和楼层用于确定要定位的媒体播放器。因此，“暂停”将查找在当前区域中播放的媒体播放器，然后是当前楼层。

## 更轻松地更新语音助手

我们的语音卫星由 ESPHome 提供支持，ESPHome 是我们的开源框架，用于制作各种私有、安全、可靠的智能家居设备。我们定期在更新中改进我们的语音功能，我们希望我们的用户能够轻松访问这些新功能。

在最新版本的 ESPHome 中，我们引入了[无线更新](https://esphome.io/changelog/2024.6.0.html#ota-platforms)。在我们即将发布 Home Assistant 2024.7 版本之后，构建[现成语音卫星项目](https://esphome.io/projects/?type=voice)（例如 Atom Echo 或 S3 Box）的用户将能够直接从 Home Assistant 更新设备，而无需 ESPHome 附加组件。这些设备可以直接从网络下载其固件，无需构建。

*如果你一直坚持到最后，请不要忘记查看[第7章直播](https://www.youtube.com/watch?v=nLLO4u2Tbbo)以获取更多关于语音的信息！*