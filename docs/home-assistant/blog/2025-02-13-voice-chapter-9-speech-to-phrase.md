---
title: Speech-to-Phrase 把语音真正带回家中 - Voice 第 9 章
description: 这个新工具为低端硬件带来了快速、本地的语音处理能力，
  同时也带来一些实用的新语音和 AI 功能
---

<lite-youtube videoid="k6VvzDSI8RU" videotitle="Voice Chapter 9 - Speech-to-Phrase"></lite-youtube>

**欢迎来到 Voice 第 9 章 🎉 这是我们持续已久的[系列文章](https://www.home-assistant.io/博客/categories/assist/)之一，记录开放语音的发展过程。**

在 12 月底推出 [Home Assistant Voice Preview Edition](/home-assistant/voice-pe/) 后，我们到现在还很兴奋。它在官宣后 23 分钟内就售罄了——太夸张了！我们一直在努力补货，让它在[所有分销商渠道](/home-assistant/voice-pe#buy)持续有货。

今天，我们带来了很多很酷的新内容，用来提升你在使用 Voice PE 或其他 Assist 卫星设备时的体验。其中包括几乎可以在任何 Home Assistant 系统上运行的、完全本地离线的语音控制。

- [人人可用的语音](#voice-for-the-masses)
- [构建开放语音生态系统](#building-an-open-voice-ecosystem)
- [大型语言模型改进](#large-language-model-improvements)
- [扩展语音能力](#expanding-voice-capabilities)
- [Home Assistant 主动给家里打电话：模拟电话回来了！](#home-assistant-phones-home-analog-phones-are-back)
- [Wyoming 改进](#wyoming-improvements)
- [🫵 帮我们把语音选择权带给更多人！](#-help-us-bring-choice-to-voice)
<!--more-->

Dragon NaturallySpeaking 是一款在 1997 年推出的热门语音识别程序。运行这款软件至少需要 133 MHz 的 Pentium 处理器、32 MB 内存，以及 Windows 95 或更高版本。将近三十年过去了，语音转文本已经强大得多，但所需资源也高出了几个数量级。

语音处理领域正在飞速发展，出现了很多惊人的技术，但对于价格低于 100 美元的设备来说，要真正受益于这些技术，目前仍不现实。当然并非完全不能实现，但在树莓派 4 上运行我们之前推荐的语音转文本工具 [Whisper](https://github.com/openai/whisper)，至少需要 5 秒钟才能把你的语音转成文字，而且成功率还不稳定。这也是为什么我们最终建议至少使用 Intel N100，才能让语音助手完全本地运行。说实话，这有点扎心。我们的自愿分析数据显示，[超过 50% 的 Home Assistant OS 用户](https://analytics.home-assistant.io/)都在使用像 [Home Assistant Green](/home-assistant/green) 或树莓派这样实惠、低功耗的设备运行他们的家。

更重要的是，Whisper 的发展很大程度上掌握在 OpenAI 手中，因为我们没有足够资源为这个工具添加语言支持。我们当然可以给 Home Assistant 加入各种语言，但如果语音处理链中的任何一个环节不支持某种语言，那整套语音功能对这种语言来说就不可用。因此，许多使用人数很多的语言此前都无法享受本地语音控制。

这让很多用户如果不额外购买硬件或服务，就无法用语音控制自己的智能家居。而今天，随着语音处理链中一个关键新组件的发布，这一切要改变了。

## 人人可用的语音

<img src='/home-assistant/images/blog/2025-02-voice-chapter-9/stp-logo.jpg' style='border: 0;box-shadow: none;' alt="Speech-to-Phrase logo">

[Speech-to-Phrase](https://github.com/OHF-voice/speech-to-phrase) 基于一种以今天标准来看已经相当老、甚至接近“古老”的语音技术。与其把几乎任何语音都转写成文本，它更擅长处理一组预训练短语。Speech-to-Phrase 会根据你 Home Assistant 服务器中的设备、区域和句子触发器，自动生成短语并微调模型——全程 100% 本地离线完成。

**结果就是：** 在 Home Assistant Green 或树莓派 4 上，语音可以在 1 秒内完成转写。树莓派 5 则更快，单条指令只需 150 毫秒，速度提升达到 7 倍！

速度极快的同时，也带来了一些限制。Speech-to-Phrase 只支持 Assist 语音命令的一个子集，而像购物清单、给计时器命名、广播消息这种更开放的功能默认无法直接使用。严格来说，凡是需要接受随机词汇（通配符）的命令都无法工作。也正因为如此，Speech-to-Phrase 主要面向家庭控制，而不是 LLM。

最重要的家庭控制命令都已支持，包括开关灯、调整亮度和颜色、获取天气、设置计时器，以及控制媒体播放器。[自定义句子](/home-assistant/docs/automation/trigger/#sentence-触发器) 也可以用来触发当前命令集尚未覆盖的功能，我们相信社区一定会想出很多聪明的新玩法。

<img src='/home-assistant/images/blog/2025-02-voice-chapter-9/green-pe.png' style='border: 0;box-shadow: none;' alt="Green and Voice PE join forces">
<p align="center"><em>开始体验语音所需的一切</em></p>

Speech-to-Phrase 首发支持英语、法语、德语、荷兰语、西班牙语和意大利语，覆盖了近 70% 的 Home Assistant 用户。很棒吧。与目前可用的本地语音转文本工具不同，为 Speech-to-Phrase 添加新语言要容易得多。这意味着未来版本会支持更多语言，而且[我们也非常希望你能帮忙](/home-assistant/voice_control/contribute-voice)！

我们正在更新 Voice 向导，把 Speech-to-Phrase 纳入其中。在那之前，你需要手动安装附加组件：

[<img src='https://my.home-assistant.io/badges/supervisor_addon.svg' style='border: 0;box-shadow: none;' alt="!Open your Home Assistant instance and show the 仪表盘 of an add-on.">](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_speech-to-phrase)

## 构建开放语音生态系统

当我们发布 Home Assistant Voice Preview Edition 时，我们发布的不只是一个产品，而是一个生态系统。我们把所有部分都开源，并确保 Home Assistant 内置的语音体验不会绑定到某一个单独产品上。任何为 Open Home 生态构建的语音助手，都可以利用这套成果。你自己 DIY 的设备也一样！

随着下周发布的 ESPHome 2025.2，任何基于 ESPHome 的语音助手都将支持发送[广播](/home-assistant/blog/2025/02/05/release-20252/#new-broadcast-intent)（下文会详细介绍），并且也能使用我们的全新语音向导，帮助新用户确保他们拥有开始使用所需的一切。

这也包括我们在“语音之年”开发过程中使用的 [$13 Atom Echo](/home-assistant/voice_control/thirteen-usd-voice-remote/) 和 ESP32-S3-Box-3 设备的更新。

<p class='img'><lite-youtube videoid="HMqXHN0KBQM" videotitle="New broadcast feature in 动作 with Atom and Box 3"></lite-youtube>Atom 和 Box 3 上的全新广播功能演示</p>

## 大型语言模型改进

我们的目标是让 Home Assistant 成为[智能家居中尝试 AI 的最佳场所](/home-assistant/blog/2024/06/07/ai-agents-for-the-smart-home/)。我们支持大量本地和云端模型，也一直在不断改进人们与这些模型互动的方式。我们始终在运行 [benchmarks](https://github.com/allenporter/home-assistant-datasets/tree/main/reports)，以追踪表现最好的模型，并确保我们的改动确实带来更好的体验。

如果你已经设置了 [Assist](/home-assistant/voice_control/)——Home Assistant 的内置语音助手——并把它配置为使用 LLM，你最近可能已经注意到一些新功能。其中一个重大变化是新的“[优先在本地处理命令](/home-assistant/blog/2024/12/04/release-202412/#let-your-voice-assistant-fall-back-to-an-llm-based-agent)”设置，它会先尝试使用内置对话代理处理命令，再决定是否发送给 LLM。我们发现很多简单命令都被送到了 LLM，这样不仅会拖慢速度，还会浪费 token。如果 Home Assistant 能理解命令（例如打开灯），它就会直接执行所需动作；只有在无法理解命令时（例如询问现在空气质量如何），才会转交给你选择的 LLM。

加入这些功能后，我们意识到 LLM 也需要理解那些由本地处理的命令。现在，[对话历史会与 LLM 共享](/home-assistant/blog/2025/02/05/release-20252/#shared-history-between-the-default-conversation-agent-and-its-llm-based-fallback)。这意味着你可以继续追问与最近命令相关的问题，而不管最初处理请求的是哪个代理。

<img src='/home-assistant/images/blog/2025-02-voice-chapter-9/shared-history.png' style='border: 0;box-shadow: none;' alt="Speech-to-Phrase logo">
<p align="center"><em>左：未共享对话。右：共享对话后，GPT 能理解上下文。</em></p>

### 通过流式输出缩短首字等待时间<!-- omit in toc -->

在尝试更大模型，或者在较慢硬件上运行时，LLM 往往会显得很迟缓。它们通常要等整段回复全部生成完毕后才会显示结果，这在回复较长内容时会让人等待得非常烦躁（如果你让它讲一个长篇童话故事，你真的要等很久）。

在 Home Assistant 2025.3 中，我们引入了让 LLM 将响应流式输出到聊天界面的支持，这样用户在内容生成过程中就可以开始阅读。一个额外的好处是，命令执行也更快了：命令一到就会立即执行，而不用等整条消息完成。

流式输出将首先支持 Ollama 和 OpenAI。

### Model Context Protocol 让 Home Assistant 接入每一个 AI<!-- omit in toc -->

2024 年 11 月，Anthropic 发布了 [Model Context Protocol](https://modelcontextprotocol.io/introduction)（MCP）。这是一种新协议，允许 LLM 控制外部服务。在本次发布中，由 [Allen Porter](https://github.com/allenporter) 贡献，Home Assistant 也能说 MCP 了。

借助新的 Model Context Protocol [集成](/home-assistant/integrations/mcp)，Home Assistant 可以接入外部 MCP 服务器，并把它们的工具提供给 Home Assistant 所连接的 LLM 使用（无论是语音助手还是自动化中）。现在已经有[相当丰富的 MCP 服务器集合](https://github.com/punkpeye/awesome-mcp-servers)，包括一些相当狂野的用途，比如抓取网站（[教程](https://gist.github.com/allenporter/b0e9946feb2ab60901c4f467ac1ba6f9)）、访问文件服务器，甚至是 BlueSky。

通过新的 Model Context Protocol [服务器集成](/home-assistant/integrations/mcp_server)，Home Assistant 的 LLM 工具也可以被其他 AI 应用使用，比如 Claude 桌面应用（[教程](https://modelcontextprotocol.io/quickstart/user)）。如果具备代理能力的 AI 真正普及开来，你的智能家居也已经准备好融入其中。

谢谢 Allen！

## 扩展语音能力

我们持续增强 Home Assistant 内置对话代理的能力。随着最新发布，我们解锁了两个新功能：

#### “广播一下，晚饭好了”<!-- omit in toc -->

新的 [broadcast](/home-assistant/blog/2025/02/05/release-20252/#new-broadcast-intent) 功能可以让你快速向家中的其他 Assist 卫星设备发送消息。这样你就可以宣布晚饭好了，或者广播一下孩子们之间的“战况” 😅。

#### “把温度设为 19 度”<!-- omit in toc -->

以前 Assist 只能告诉你当前温度，而现在它还能帮你调整暖通空调系统的温度。非常适合你裹着毯子窝在沙发上时，舒舒服服地改一下温度。

## Home Assistant 主动给家里打电话：模拟电话回来了！

两年前，我们介绍了[世界上最私密的语音助手](/home-assistant/voice_control/worlds-most-private-voice-assistant/)：一部模拟电话！用户拿起电话就能和智能家居对话，而且只有用户自己能听到回复。今天新增的有趣功能是，Home Assistant 现在也能**主动打电话给你的模拟电话了！**

模拟电话非常适合你想通知某个房间而不是整栋房子的时候。比如洗衣完成时，你可以通知客厅里的人，但不打扰正在办公室工作的人。而且，因为用户必须拿起听筒才能接到电话，所以你也能知道这条通知是否真的被收到。

<p class='img'><lite-youtube videoid="TaoNY1gINWc" videotitle="Have your Home Assistant give you a call"></lite-youtube>让你的 Home Assistant 给你打个电话</p>

如果你把 LLM 用作语音助手，还可以通过电话开启一段对话。你可以提供开场白，并借助一个新的“额外系统提示词”选项，为 LLM 增加额外上下文来理解用户的回应。例如：

- 额外系统上下文：garage door 遮盖.garage_door 已打开 30 分钟。我们询问用户是否需要关闭
- Assistant：需要关闭车库门吗？
- User：好啊

感谢 [JaminH](https://github.com/jaminh) 的贡献。

## Wyoming 改进

Wyoming 是我们用来连接构建语音助手所需各个组件的标准。Home Assistant 2025.3 将为 Wyoming 卫星设备加入公告支持，让它们也能使用新的广播功能。

我们还新增了一个 microWakeWord 附加组件（它使用的正是 Voice PE 上运行的同款唤醒词引擎！），可以作为 openWakeWord 的替代方案使用。随着我们从 [Wake Word Collective](https://ohf-voice.github.io/wake-word-collective/) 收集到更多真实世界样本，microWakeWord 中附带的模型也会不断重新训练和改进。

## 🫵 帮我们把语音选择权带给更多人！

我们之前说过，现在还要再说一遍——开放语音的时代已经开始，加入的人越多，它就会变得越好。Home Assistant 提供了多种开始使用语音控制的方式，无论是[自己动手搭建](/home-assistant/voice_control/#expand-and-experiment) Assist 硬件，还是入手 [Home Assistant Voice Preview Edition](/home-assistant/voice-pe/)。每次更新，你都会看到新功能，也能提前体验语音的未来。

特别感谢所有语言负责人和贡献者，正是你们在帮助塑造家庭中的开放语音！参与的方式有很多，从翻译、分享语音样本，到构建新功能——想了解更多，可以查看[如何参与贡献](/home-assistant/voice_control/contribute-voice)。另一个支持开发的好方法是订阅 [Home Assistant Cloud](/home-assistant/cloud/)，它会帮助资助支撑语音能力的 Open Home 项目。
