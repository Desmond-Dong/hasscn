# 帮助我们在一分钟内改善语音质量

<img src='/home-assistant/images/blog/2024-10-wake-word-collective/art.jpg' alt="Help us improve voice">

请给我们一分钟的时间，[发出你的声音](https://ohf-voice.github.io/wake-word-collective/) 来改进我们以社区为导向、注重隐私的语音助手，我们将共同打破大型科技公司对家庭语音控制的束缚。

当您使用 Home Assistant Assist 时，我们绝不会不情愿地获取您的数据以改进其功能；这就是我们今天寻求您帮助的原因（更多内容请参见下文）。

具体来说，我们正在尝试改进唤醒词引擎，该引擎可以“唤醒”设备以侦听更多命令。我们的开源 [microWakeWord](https://github.com/kahrendt/microWakeWord) 引擎是令人难以置信的轻量级代码，但需要使用真实声音进行培训才能改进。每个人的声音都是独一无二的，我们需要来自世界各地的各种性别、年龄和口音的人说出这个唤醒词的录音。因此，让整个家庭以及朋友和家人都参与进来。

[**今天就帮助我们**](https://ohf-voice.github.io/wake-word-collective/)

<!--more-->

## 你的声音，你的选择

隐私是我们所做一切的核心，这也是我们打造开放、本地和私密语音助手的动力。几年前，几家大型科技公司之间开始了语音助手军备竞赛，他们出售非常便宜的语音硬件，这一切都是因为他们想要你的数据。他们使用这些语音数据来快速提高他们的语音功能（谁知道还有什么），但[以牺牲您的隐私为代价](https://www.bbc.co.uk/news/technology-47893082)。

我们永远不会使用这些策略来改进 Home Assistant。我们做了一些令智能家居行业新颖且令人困惑的事情 - 我们明确请求您的帮助。例如，Home Assistant 有[选择加入统计](https://analytics.home-assistant.io/)；这些确实帮助我们关注人们正在使用的东西，并投入资源以产生最大的影响。当您[选择加入时，它确实有帮助](/home-assistant/integrations/analytics/index.md)，但如果您不这样做，我们完全理解 - 这是您的家和您的数据。我们对语音也做了同样的事情，明确寻求帮助，并且希望您能帮助提高其唤醒词功能。

大型科技公司可能认为的弱点实际上是我们最大的优势——隐私赋予我们的用户权力，让他们不必担心被算法跟踪或分类。

## microWakeWord 走向全球

microWakeWord 是一个非常轻量级的唤醒词引擎，可以在 ESP32 级设备上运行。这使得语音助手能够聆听特定的短语，例如“Okay Nabu”，并忽略所有其他噪音和语音，直到听到该短语。在设备上运行它可以显着加快一切速度，消除从连续流音频到运行唤醒词软件的更强大设备的滞后。在设备上运行它的缺点是需要大量的培训才能获得良好的结果。

几个月前，我们在 Open Home Foundation 时事通讯中推广了此 Wake Word Collective 工具的早期版本（[如果您还没有订阅，请订阅](https://newsletter.openhomefoundation.org/)）。仅从这封电子邮件中，我们就收到了涵盖 30 种不同语言的 5,800 多个样本。虽然 microWakeWord 过去只擅长识别“Okay Nabu”的英语发音，但现在它在识别不同口音方面的效率要高出许多倍。我们的测试显示，我们基于此数据训练的模型错误地拒绝了 5% 的样本，而之前的模型拒绝了 18%，这表明您的样本正在发挥作用！我们仍然需要来自世界不同地区更多不同类型的声音。如果您或您的家人在使用 Assist 时发现它仍然难以醒来听您的命令，那么这是向该项目发出您的声音的绝佳机会。

## 它是如何工作的

在开始录制之前，您将填写您最习惯使用的语言，以便我们能够训练特定于语言的唤醒词模型，从而更好地检测发音的细微差异。您还必须阅读并同意 [Wake Word Collective 条款](https://ohf-voice.github.io/wake-word-collective/terms.html)。除其他外，这解释了这些录音将在知识共享 CC0 公共领域奉献下公开提供。我们为了所有人的利益而公开开展我们的研究，这就是为什么这些研究将向公众开放。

<img src='/home-assistant/images/blog/2024-10-wake-word-collective/demo.gif' alt="Animation showing how to use the wake word collective tool">

接下来，它解释说你只需要说几次“好吧，Nabu”两个词。  您需要放下手机、平板电脑或笔记本电脑，然后在房间里走动，每当屏幕上的圆圈变成绿色时就说出唤醒词。从房间各处采集样本可以更好地反映语音助手的真实使用情况。不用担心背景噪音；这对于训练很有用。

我说过这只需要一分钟，但您可能已经阅读本文更长时间了，所以继续[录音](https://ohf-voice.github.io/wake-word-collective/)。
