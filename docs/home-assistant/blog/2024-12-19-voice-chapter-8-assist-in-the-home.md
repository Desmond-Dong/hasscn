---
title: 声音第 8 章 - 今天帮忙做家务
description: 您今天可以使用 Assist 执行的所有操作，以及我们的开发状态、限制以及您可以提供帮助的地方。
---
<img src='/home-assistant/images/blog/2024-12-voice-chapter-8/art.png' alt="Voice chapter 8 - Assist in the home today">

您可能已经读到，我们今天推出了[Home Assistant语音预览版](/home-assistant/voice-pe/)。 Home Assistant 的本土语音助手 [Assist](/home-assistant/voice_control/) 是过去几年开源软件进步的顶峰。一大群专注的开发人员一直在共同努力添加和完善其许多功能，如果您已经有一段时间没有尝试 Assist，您应该利用这次发布作为一个机会，重新加入并查看我们所取得的进展。

[Home Assistant语音预览版](/home-assistant/voice-pe/) 的推出是为了在这项工作的基础上发展，延续我们已经建立的势头，并加速我们的目标，即不仅匹配现有语音助手的功能，而且超越它们。我们进行了语音预览版（预览预览😉）的早期生产运行，我们试图将它们交给尽可能多的语言领导者和语音开发人员 - 仅在过去一个月，我们就已经看到了他们努力的成果，语言支持得到了改善！

我想在本语音章节中重点介绍您今天可以使用 Assist 完成的所有操作。我还想介绍一下我们的发展状况、局限性以及您的支持最有效的地方。

＃＃＃ 目录- [今天在家帮忙](#assist-in-the-home-today)
  - [辅助的起源](#origins-of-assist)
  - [命令](#commands)
  - [定时器](#timers)
  - [暴露设备和别名](#exposing-devices-and-aliases)
  - [房间背景](#room-context)
  - [唤醒词](#wake-words)
- [语音处理](#speech-processing)
  - [语言支持](#language-support)
  - [文字转语音](#text-to-speech)
  - [语音转文字](#speech-to-text)
  - [人工智能与辅助](#ai-and-assist)
- [结论](#conclusion)

<!--more-->

## 今天帮忙做家务

### 协助的起源

<p class='img'><img src='/home-assistant/images/blog/2024-12-voice-chapter-8/assist.png' style='border: 0;box-shadow: none;' alt="Early Assist being used in chat">通过聊天协助的早期版本 - 事情已经取得了长足的进步</p>

Home Assistant的语音控制比大多数人想象的要早，我们今天使用的一些基础工作[早在 2017 年就已添加](/home-assistant/blog/2017/07/29/release-50/)。当我们重新集中精力并宣布 2023 年为[声音年](/home-assistant/blog/2022/12/20/year-of-voice/) 时，重大转折点出现了。这是为了集中发展并寻找我们的社区可以产生最大影响的领域。在语音年期间，[Assist](/home-assistant/voice_control/) 被添加到语音中，改进了意图，添加了语言，创建了唤醒词，并且我们为运行语音建立了出色的本地和云选项。在“声音之年”之后不久，添加了更多功能，包括集成人工智能、计时器，甚至更好的唤醒词。语音年已经开始，语音预览版将继续保持势头。

### 命令[Assist](/home-assistant/voice_control/) 是允许Home Assistant将命令（“打开灯光”）转变为动作（`light.turn_on`）的底层技术。命令，或者我们称之为“意图”，允许您控制智能家居的几乎每个方面，包括开、关、播放、暂停、下一个、打开、关闭等等。我们还希望为您提供有用的信息，例如时间、天气、温度等。最后，还有许多其他有用的杂项，例如将商品添加到购物清单和设置计时器。如果您有兴趣，这里有一个[完整列表](https://开发者.home-assistant.io/docs/intent_builtin/)。

### 计时器

<div style="text-align: center;">
  <video src="/home-assistant/images/blog/2024-12-voice-chapter-8/timer.webm"
         autoplay muted loop playsinline>
    您的浏览器不支持视频标签。
  </video>
</div>

当我们[询问我们的社区](https://community.home-assistant.io/t/poll-what-do-you-use-your-voice-assistant-for-what-do-you-expect-it-to-do-multiple-selections/693669) 时，计时器是最需要的功能。您不仅可以设置定时器、暂停、增加、减少或取消，还可以将命令设置为[设定时间后启动](/home-assistant/blog/2024/06/26/voice-chapter-7/#timers-control-devices)，例如“15分钟后关闭电视”。您也可以只说“停止”而不用唤醒词，以使计时器的警报静音。在我们的语音预览版中，当您设置计时器时，LED 环会倒计时最后几秒，并在完成后闪烁。

### 暴露设备和别名这使我们与其他语音助手不同：我们允许您向语音助手公开和有效隐藏设备。例如，您可以选择不暴露门锁，而只暴露知道门是否关闭的传感器。它让您掌控语音在家中的功能。我们还引入了别名，允许您为设备指定多个名称，从而使您可以更自然地使用 Assist 说话。

### 房间背景

如果您告诉辅助硬件它位于哪个房间并确保其他设备按房间组织，您可以发出“关闭灯光”之类的命令，并且无需指定任何内容，它将关闭您所在房间的灯光。此功能也适用于媒体播放器（播放/暂停/下一个）和计时器。

### 唤醒词

<p class='img'><img src='/home-assistant/images/blog/2024-12-voice-chapter-8/wake-word.webp' style="max-width: 100%; height: auto; display: inline-block;" alt="Timer animation video"><br>我们的社区正在捐赠少量时间来使用我们的工具改进唤醒词 <a href="/home-assistant/blog/2024/10/24/wake-word-collective/" target="_blank"></a>.</br></a>唤醒词是启动语音助手聆听并开始处理命令的独特短语。唤醒词最初必须通过 openWakeWord 之类的附加组件在 Home Assistant 上进行处理，这意味着 Assist 硬件需要不断地将音频流传输到 Home Assistant。语音年之后不久，[microWakeWord](/home-assistant/blog/2024/02/21/voice-chapter-6/#microwakeword) 发布，它在设备上带来了唤醒字处理，以实现更快的响应。由于我们的社区使用我们的[快速而简单的工具](/home-assistant/blog/2024/10/24/wake-word-collective/) 捐赠他们的声音样本，它正在快速改进。唤醒词列表越来越多，设备上的选项包括“Okay Nabu”（默认且最可靠）、“Hey Jarvis”和“Hey Mycroft”。这两个唤醒词引擎都是由 Home Assistant 社区构建的，并且是开源的，为世界提供了两个伟大的免费和开放的唤醒词引擎！

## 语音处理

<p class='img'><img src='/home-assistant/images/blog/2024-12-voice-chapter-8/voice-pipeline.png' alt="Timer animation video">Assistance 管道的所有荣耀</a>Assist 无法理解口语，需要一些东西来获取音频并将其转换为文本 - 所有这些统称为 Assist 管道。这种语音处理实际上是 CPU 密集型的，因此它不可能发生在语音助手硬件上，有时您的Home Assistant系统甚至无法处理它。我们迈出的重要一步是向[Home Assistant云](/home-assistant/cloud/)添加语音转文本和文本转语音功能，这允许低功耗Home Assistant硬件将语音处理卸载到云端。 Home Assistant Cloud 不会存储或使用这些数据进行训练 - 云不会比我们的云更私密。它也是最准确、最省电的语音处理方式。我们在本地语音处理、构建附加组件和用于与Home Assistant对话的新协议方面投入了大量精力，但它们非常依赖社区的语言支持。

### 语言支持

<p class='img'><img src='/home-assistant/images/blog/2024-12-voice-chapter-8/language-support.png' style='border: 0;box-shadow: none;' alt="Our language checker">查看 <a href="/home-assistant/voice-pe/#language-support" target="_blank"> 我们的检查器是否支持您的语言</a>.</p>

Assist 旨在支持比其他语音助手更多的语言，这对我们的社区来说是一项艰巨的任务 - 我们需要更多帮助。语言支持的第一步是获得正确的命令（意图），我们现在有[超过 25 种主要语言](https://ohf-voice.github.io/intents/) 可供使用。借助我们的 [Wake Word Collective 工具](https://ohf-voice.github.io/wake-word-collective/)，我们的唤醒词也能更好地理解不同的口音。

### 文本转语音我们构建了自己的文本转语音系统 [Piper](/home-assistant/integrations/piper/)，它现在支持 30 多种语言。它是一种快速、本地神经网络驱动的文本转语音系统，听起来很棒，并且可以在低功耗硬件上运行（它针对 Pi4 进行了优化！）。它是根据我们社区的声音构建的，如果您看不到您的母语，请[添加您的声音](https://github.com/rhasspy/piper/blob/master/TRAINING.md)！

### 语音转文字

有一个领域比其他领域更阻碍我们其他语言的支持，那就是本地语音到文本。构建完整的语音到文本模型需要大量的计算资源和 TB 级的样本，目前这超出了我们的能力范围。我们使用 [Whisper](/home-assistant/integrations/whisper/) 进行本地语音到文本处理，这是 OpenAI 的一个开源项目，我们很感激它的存在。对于某些语言来说，它工作得很好，不需要大量的系统资源即可运行良好，但对于其他语言，您需要一个非常强大的系统才能获得可接受的结果。我们认为，只有大约 15 种语言可以在合理的硬件（Intel N100 或更好）上本地运行 - 这就是为什么在您开始梦想完美的全本地设置之前，我们建议检查[语言支持](/home-assistant/voice-pe/#language-support)。

我们一直在寻找低功率硬件的新解决方案，现在正在构建另一种使用不太复杂的句子识别的工具。这甚至可以在树莓派 4 上运行，但它只能识别预定义的句子，所以如果你放弃脚本，你可能需要调用人工智能来帮助 Assist 了解你的需求。我们的语言领导者正在努力整合所需的翻译，但如果您想了解更多信息，请访问 [Rhasspy Speech](https://github.com/rhasspy/rhasspy-speech)。一般来说，即使您的语言受支持，您也几乎总能从 Home Assistant Cloud 获得更好的结果。使用免费试用看看什么最适合您。此外，您可以同时使用两者，我们知道有人在互联网关闭时使用自动化将辅助管道切换到全本地设置。

### 人工智能和辅助

<p class='img'><lite-youtube videoid="vThoxRIxHyI" videotitle="Assist working with AI"></lite-youtube>我们默认的本地对话代理与 AI 混合，非常适合自然语言和速度</p>

我们轻松击败竞争对手的另一个方面是将人工智能集成到我们的语音助手中。您可以从一些最大的云 AI 提供商中进行选择，例如 ChatGPT、Google Gemini 和 Claude（需要付费帐户）。如果您拥有具有足够 VRAM 的现代图形处理器，您还可以通过 [Ollama](https://ollama.com/) 在本地运行它，从而允许您构建最强大的离线语音设置。

我们的意图（Assist 的内置句子）在理解大多数命令方面变得越来越好，但人工智能以自然语言处理命令，这意味着如果你得到的设备名称稍有偏差，它仍然可以弄清楚事情。它还提供了询问内置意图之外的能力。例如，如果你告诉它“这里有点冷”，它可能会提高恒温器的温度，但它可能会放弃任何家庭控制，只是告诉你穿上夹克 - 结果尚未一致。更有用的是它能够获取多个传感器并提供上下文。例如，您可以要求它提供空气质量报告，它可以检查二氧化碳水平并告诉您打开它观察到的关闭的窗户。所有这些都是实验性的，让人工智能控制你的家并不适合所有人，但重要的是你有选择。

＃＃ 结论在过去的几个月里，Assist 发生了许多新的创新和改进，这说明了拥有良好的硬件来构建我们的软件的力量。语音预览版是当今最好的开放式语音硬件，即使今天只有几百人拥有它，它也产生了显着的变化。无论是编写代码、改进语言支持、制作蓝图，甚至只是报告错误。我们将把它交付给成千上万的人，这将改变游戏规则——这就是为什么我们宣布开放语音助手的时代已经到来。

在评论部分，我们总是有几个人说，“但我不使用语音，改进（这个或那个）怎么样”。好消息是，Assist 和 Home Assistant 的其他功能的改进已经同步进行（请查看 [我们的路线图](/home-assistant/blog/2024/11/15/roadmap-2024h2/) 以全面了解我们的优先事项）。最后，我们的开发只有一小部分用于语音，而我们的预算就是亚马逊语音团队可能花在披萨派对上的钱😆。一个很大的副作用是我们用语音解决的问题正在使 Home Assistant 的其他部分受益，例如，我们的 AI 集成是由语音驱动的。

我们确实认为语音是全面的智能家居生态系统不可或缺的一部分。这对于提高所有家庭成员的家庭控制的可访问性尤其重要。该领域需要有真正的选择，最重要的是那些可以让您完全控制和在隐私方面有真正选择的选择。

### Home Assistant 语音预览现已在零售商处发售，<!-- omit in toc --><div style="text-align: center; margin-bottom: 20px;">
  <img src="/home-assistant/images/blog/2024-12-voice-chapter-8/vpe-packaging.png"
       alt="Voice Preview Edition with packaging">
</div>

<div style="text-align: center; margin-bottom: 20px;">
  <a href="/home-assistant/voice-pe/">
    <img src="/home-assistant/images/blog/2024-12-voice-chapter-8/buy-now.png"
         style="border: 0; box-shadow: none;"
         alt="buy now">
  </a>
</div>