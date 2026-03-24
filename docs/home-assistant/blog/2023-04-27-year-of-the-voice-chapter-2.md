---
layout: post
title: "语音之年 - 第 2 章：聊起来"
description: "通过我们全新的语音助手功能和你的智能家居对话，并让它开口回应。"
date: 2023-04-27 00:00:00
date_formatted: "April 27, 2023"
author: Paulus Schoutsen
comments: true
categories: Assist
og_image: /images/blog/2023-04-27-year-of-the-voice-chapter-2/social.png
---


今年是 Home Assistant 的[语音之年][Year of the Voice]。我们在 2023 年的目标，是让用户可以用自己的语言控制 Home Assistant。今天我们发布第 2 章，这是实现这一目标过程中的第二个里程碑。

在[第 1 章][Chapter 1]中，我们聚焦于意图，也就是用户想做什么。到了今天，Home Assistant 社区已经把常见的智能家居命令和响应翻译成了[45 种语言][45 languages]，正逐步接近 Home Assistant 支持的 62 种语言。

在第 2 章里，我们从文本扩展到了音频，具体来说，就是把音频（语音）转成文本，再把文本转回语音。借助这些能力，[Home Assistant 的 Assist 功能][assist]现在已经可以提供完整的语音交互界面。

语音助手也离不开硬件，所以今天我们发布了 ESPHome 对 Assist 的支持；而且更进一步：我们还带来了“世界上最注重隐私的语音助手”。继续往下看，了解这到底是什么。

_如果你想观看这篇博客对应的视频介绍（包含现场演示），请查看[我们的直播回放][live-stream]_ 

<lite-youtube videoid="0YJzLIMrnGk" videotitle="World’s Most Private Voice Assistant"></lite-youtube>

[Year of the Voice]: https://www.home-assistant.io/blog/2022/12/20/year-of-voice/
[Chapter 1]: https://www.home-assistant.io/blog/2023/01/26/year-of-the-voice-chapter-1/
[45 languages]: https://ohf-voice.github.io/intents/
[live-stream]: https://youtube.com/live/Tk-pnm7FY7c?feature=share
[assist]: /voice_control/

<!--more-->

## 组合语音助手

新的 [Assist Pipeline integration] 让你可以在一个地方配置语音助手的全部组件。

对于语音命令来说，管线从音频开始。语音转文本系统先识别用户说了什么，再把文本交给对话代理。代理从文本中提取意图并由 Home Assistant 执行。比如说“打开灯”就会让你的灯亮起来 💡。管线最后一环是文字转语音，代理的响应会再说给你听。这可能是简单确认（“灯已打开”），也可能是问题答案，比如“现在有哪些灯是亮着的？”

<p class='img'>
<img src='/home-assistant/images/blog/2023-04-27-year-of-the-voice-chapter-2/assist-config.png'>
Home Assistant 中新的 Assist 配置界面截图。
</p>

通过新的语音助手设置页面，你可以创建多个助手，混搭不同语音服务。想要一个美式英语助手却用英式口音回应？没问题。想再建一个可以听懂荷兰语、德语或法语命令的助手？也可以。或者你想把 ChatGPT 混进来。你可以按需创建任意多个助手，并在 [Assist dialog] 以及 Home Assistant 的语音助手硬件上使用它们。

当你与多种服务交互时，出错的可能性也会变多。为了帮助你定位问题，我们在 Home Assistant 里为语音助手内建了完善的调试工具。每个语音助手最近 10 次交互都可以随时查看。

<p class='img'>
<img src='/home-assistant/images/blog/2023-04-27-year-of-the-voice-chapter-2/assist-debug.png'>
新的 Assist 调试工具截图。
</p>

[Assist Pipeline integration]: https://www.home-assistant.io/integrations/assist_pipeline/
[Assist dialog]: /voice_control/

## Home Assistant Cloud 驱动的语音助手

[Home Assistant Cloud][nc] 订阅除了端到端加密的远程连接，还包含先进的语音转文字与文字转语音服务。这让你的语音助手可以说 130 多种语言（包括秘鲁西班牙语这类方言），而且响应速度非常快。示例：

<audio preload controls src="/home-assistant/images/assist/ha_cloud.mp3"></audio>

作为订阅用户，你可以直接开始在 Home Assistant 中使用语音功能，无需额外硬件或软件。

除了为语音助手提供高质量的语音转文字和文字转语音，你也会直接支持 Home Assistant 的持续开发。

[今天就加入 Home Assistant Cloud][nc]

[nc]: https://www.nabucasa.com

## 完全本地的语音助手

在 Home Assistant，你可以确定两件事：一定会有多种选择，而且其中一定会有本地方案。语音助手也不例外。

### Piper：我们全新的高质量本地文字转语音模型

为了让高质量文字转语音可以本地运行，我们不得不打造自己的文字转语音系统，并把它优化到可以在 Raspberry Pi 4 上运行。它叫 Piper。

<img style='width: 100%' src='/home-assistant/images/assist/piper-logo.svg' alt='Piper logo' class='no-shadow'>

Piper 使用[现代机器学习算法][mm-algo]生成更自然的语音，同时仍能保持较快生成速度。在 Raspberry Pi 4 上，Piper 生成 2 秒音频只需约 1 秒处理时间。更强的 CPU（例如 Intel Core i5）在同样时间内可生成 17 秒音频。示例：

<audio preload controls src="/home-assistant/images/assist/piper.wav"></audio>

_更多示例可见 [Piper 网站][piper-samples]_ 

Home Assistant 现在提供了一个 [包含 Piper 的 add-on](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_piper)，支持[18 种语言、40 多种声音][piper-samples]，包括：加泰罗尼亚语、丹麦语、德语、英语、西班牙语、芬兰语、法语、希腊语、意大利语、哈萨克语、尼泊尔语、荷兰语、挪威语、波兰语、巴西葡萄牙语、乌克兰语、越南语和中文。Piper 的声音基于[开放音频数据集][open-audio]训练，其中很多来自[志愿者朗读的免费有声书][audiobook]。如果你有兴趣贡献自己的声音，[欢迎联系我们][contact]。

你也可以将 [Piper 作为独立 Docker 容器运行](https://hub.docker.com/r/rhasspy/wyoming-piper)。

[mm-algo]: https://github.com/jaywalnut310/vits/
[piper-samples]: https://rhasspy.github.io/piper-samples
[open-audio]: http://www.openslr.org/
[audiobook]: https://librivox.org/
[contact]: mailto:voice@nabucasa.com

### 使用 OpenAI Whisper 进行本地语音转文字

[Whisper] 是 OpenAI 开源的本地语音转文字模型。自 2022 年发布以来，开源社区通过 [whisper.cpp] 和 [faster-whisper] 等项目持续优化，让 Whisper 可以在性能更弱的硬件上运行。不到一年的进展，Whisper 已经能够在小型服务器和单板计算机上为[数十种语言][whisper-lang]提供语音转文字能力！

Home Assistant 现在也提供了 [使用 faster-whisper 的 add-on](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_whisper)。在 Raspberry Pi 4 上，语音命令处理大约需要 7 秒，并占用约 200 MB 内存。Intel Core i5 或更强的 CPU 可以实现亚秒级响应，并运行更大（也更准确）的 Whisper 模型。

你也可以将 [Whisper 作为独立 Docker 容器运行](https://hub.docker.com/r/rhasspy/wyoming-whisper)。

[Whisper]: https://github.com/openai/whisper
[whisper-lang]: https://github.com/openai/whisper#available-models-and-languages
[whisper.cpp]: https://github.com/ggerganov/whisper.cpp
[faster-whisper]: https://github.com/guillaumekln/faster-whisper/

## Wyoming：语音助手的胶水层

语音助手有很多共通能力，比如语音转文字、意图识别和文字转语音。我们创建了 [Wyoming protocol][Wyoming]，用一小组标准消息来对接语音服务，并支持流式音频传输。

Wyoming 让开发者可以专注语音服务核心，而不必绑定某个网络栈（比如 HTTP 或 MQTT）。这个协议与即将到来的 [Rhasspy 3.0][Rhasspy] 兼容，因此两个项目可以共享语音服务。

通过 Wyoming，我们希望启动一个更具互操作性的开放语音生态，让不同项目和平台之间共享组件变得容易。想尝试新语音技术的开发者和研究者，只需实现一小组消息，就可以和其他语音助手项目集成。

前面提到的 Whisper 与 Piper add-on，都是通过新的 [Wyoming integration] 集成到 Home Assistant 中。Wyoming 服务也可以运行在其他机器上，并照样接入 Home Assistant。

[Wyoming]: https://github.com/rhasspy/rhasspy3/blob/master/docs/wyoming.md
[Rhasspy]: https://github.com/rhasspy/rhasspy3/
[Wyoming integration]: https://www.home-assistant.io/integrations/wyoming/

## ESPHome 驱动的语音助手

[ESPHome] 是我们面向微控制器的软件。你无需编程，只要在 YAML 文件里定义传感器如何连接。ESPHome 会读取该文件并生成、安装固件，让这些数据可被 Home Assistant 使用。

今天，我们发布了使用 ESPHome 构建语音助手的支持。给 ESPHome 设备接上麦克风，你就可以用语音控制智能家居；再加上扬声器，家也会开口回应你。

<lite-youtube videoid="w6QxGdxVMJs" videotitle="$13 voice assistant for Home Assistant"></lite-youtube>

我们一直重点围绕 [M5STACK ATOM Echo][atom-echo] 测试和开发。这款设备只要 13 美元，自带麦克风和扬声器，放在一个小巧盒子里。我们还做了教程，让你直接在浏览器里把它变成语音助手！

[教程：为 Home Assistant 制作一个 13 美元语音助手。](https://www.home-assistant.io/voice_control/thirteen-usd-voice-remote/)

[ESPHome Voice Assistant 文档。](https://esphome.io/components/voice_assistant.html)

[ESPHome]: https://esphome.io
[atom-echo]: https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit

## 世界上最注重隐私的语音助手

如果让你设计一个“世界上最注重隐私的语音助手”，它该有什么功能？首先，它不该一直监听，而应该只在你准备说话时才开始监听。其次，它回复时应该只有你能听到。这听起来是不是有点熟悉……🤔

电话！不，不是你口袋里那块毫无个性的矩形屏幕，而是模拟电话。它们曾经靠着卷线和独特造型统治地球。模拟电话的人机界面直到今天都很能打：拿起听筒就能听、能说，放下听筒就结束。

借助 Home Assistant 全新的 [Voice-over-IP integration][voip]，你现在可以用“老式”电话控制你的智能家居！

<lite-youtube videoid="0YJzLIMrnGk" videotitle="World’s Most Private Voice Assistant"></lite-youtube>

配置离线自动拨号后，你一拿起电话，它就会自动呼叫 Home Assistant。说出你的语音命令或问题，再听系统回应。只要你愿意，对话可以一直继续：继续提问、继续下命令，或者直接挂断。你还可以给每个 VoIP 适配器分配一个专属语音助手/管线，为不同语言设置专用电话。

我们初期重点支持的是 [Grandstream HT801 Voice-over-IP 盒子][ht801]。它兼容任何 RJ11 接口电话，并可直接连接 Home Assistant，不需要额外服务器。

[教程：打造你自己的“世界上最注重隐私的语音助手”](https://www.home-assistant.io/voice_control/worlds-most-private-voice-assistant/)


<p class='img'>
<lite-youtube videoid="eLx8_NAqptk" videotitle="World’s Most Private Voice Assistant meets ChatGPT"></lite-youtube>
通过 OpenAI integration 让你的语音助手更有个性。
</p>

[voip]: https://www.home-assistant.io/integrations/voip/
[ht801]: https://www.amazon.com/dp/B06XW1BQHC

_本页部分链接为联盟链接，通过这些链接购买将支持 Home Assistant 项目。_
