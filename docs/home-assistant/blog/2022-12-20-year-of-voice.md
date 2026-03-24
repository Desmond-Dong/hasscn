---
title: '2023：Home Assistant 的语音之年'
description: 我们在 2023 年的目标，是让用户能够用自己的语言控制 Home Assistant。
---

_**TL;DR**：我们在 2023 年的目标，是让用户能够用自己的语言控制 Home Assistant。Rhasspy 的创建者 Mike Hansen 已加入 Nabu Casa 来主导这项工作。我们会先从构建[覆盖各种语言的意图匹配语句集合](https://github.com/home-assistant/intents)开始。_

**更新：**

 - [语音之年 - 第 1 章](https://www.home-assistant.io/博客/2023/01/26/year-of-the-voice-chapter-1/)（2023 年 1 月 26 日）
 - [语音之年 - 第 2 章](/home-assistant/blog/2023/04/27/year-of-the-voice-chapter-2/)（2023 年 4 月 27 日）
 - [语音之年 - 第 3 章](/home-assistant/blog/2023/07/20/year-of-the-voice-chapter-3/)（2023 年 7 月 20 日）
 - [语音之年 - 第 4 章](/home-assistant/blog/2023/10/12/year-of-the-voice-chapter-4-wakewords/)（2023 年 10 月 12 日）
 - [语音 - 第 5 章](/home-assistant/blog/2023/12/13/year-of-the-voice-chapter-5/)（2023 年 12 月 13 日）
 - [语音 - 第 6 章](/home-assistant/blog/2024/02/21/voice-chapter-6/)（2024 年 2 月 21 日）
 - [语音 - 第 7 章](/home-assistant/blog/2024/06/26/voice-chapter-7/)（2024 年 6 月 26 日）
 - [语音 - 第 8 章](/home-assistant/blog/2024/12/19/voice-chapter-8-assist-in-the-home/)（2024 年 12 月 19 日）
 - [语音 - 第 9 章](/home-assistant/blog/2025/02/13/voice-chapter-9-speech-to-phrase/)（2025 年 2 月 13 日）

<hr>

通常来说，12 月是回顾过去的月份。不过，上个月我们在举办 [2022 Open Home 状态分享](https://www.youtube.com/watch?v=D936T1Ze8-4)时就已经做过这件事了。我们不仅回顾了过去，也宣布了明年的重点方向：2023 将会是语音之年。

<blockquote>我们在 2023 年的目标，是让用户能够用自己的语言控制 Home Assistant。</blockquote>

这是一个宏大而大胆的目标，但只要设定正确的边界，它就是可以实现的。摆在我们面前的工作，大致可以概括为：

<center><img src='/home-assistant/images/blog/2022-12-20-year-of-voice/voice-work.png' alt='支持语言数量乘以可实现动作数量' class='no-shadow' /></center>
<br>

我们的头号优先事项，是支持不同语言。现在已经有很多项目在尝试打造英文语音助手，但对我们来说，这远远不够。人们必须能够使用自己的语言说话，因为对于智能家居语音助手而言，这才是最容易使用、也是唯一真正可接受的语言。
<!--more-->

为了让前方的工作量保持在可控范围内，我们会限制可实现的动作数量，把重点放在与你的智能家居交互的基础能力上。不做网页搜索、不打电话，也不做语音小游戏，当然也不会有那些“顺便说一句”的额外内容。

我们会先从少量动作开始，并围绕这些动作建立语言模型。Home Assistant 的用户界面目前支持 62 种不同语言，而我们的目标是通过语音支持所有这些语言。我们认为，借助 Home Assistant 最强大的资产，也就是我们的社区，这个目标是可以实现的。

## 我们与语音助手的历史

如果你关注相关新闻，可能会觉得语音助手已经失败了。亚马逊预计[今年会在 Alexa 上亏损 100 亿美元](https://arstechnica.com/gadgets/2022/11/amazon-alexa-is-a-colossal-failure-on-pace-to-lose-10-billion-this-year/)，并且正在计划裁员。Google 也在削减[对 Google Assistant 的支持](https://arstechnica.com/gadgets/2022/10/report-google-doubles-down-on-pixel-hardware-cuts-google-assistant-support/)，以控制成本。事实是，语音作为“下一个计算平台”、作为能够带来数十亿美元新增收入的商业模式，确实失败了。但用户并没有抛弃它：大家依然会用语音助手来管理购物清单、设置计时器、播放音乐，以及控制家中的设备。语音失败的，是作为收入来源；它并没有辜负用户本身。

Home Assistant 一直对语音方向很感兴趣。早些年我们曾与 [Snips](https://snips.ai/) 合作，但后来它被收购并关闭了。我们也和斯坦福合作过他们的 [Almond/Genie 平台](/home-assistant/blog/2021/12/21/stanford-genie/)，但那是一个以研究为导向的项目，始终没有达到可投入生产的程度。当然，你也可以用 Home Assistant 把所有数据发送到 Google 和 Amazon 的云端，以利用它们的语音助手；但为了通过语音打开灯光，你本不该被迫放弃自己的隐私。

目前最有希望的项目是 [Rhasspy](https://rhasspy.readthedocs.io/en/latest/)，它由 [Mike Hansen](https://github.com/synesthesiam) 创建。这个项目允许人们构建自己的本地语音助手，也能与 Home Assistant 联动。Rhasspy 与其他开源语音项目不同的一点在于，Mike 关注的并不只是英语。他的目标是让它为所有人服务。而且这件事已经进展得很不错了，因为 Rhasspy 目前已经支持 16 种语言。

Home Assistant 希望把一个注重隐私、聚焦本地运行的智能家居带给每一个人。Mike 在 Rhasspy 上的思路与 Home Assistant 高度一致，因此我们很高兴地宣布：Mike 已加入 Nabu Casa，将全职投入 Home Assistant 的语音工作。

## 在开放中迭代

Home Assistant 更喜欢尽早把我们正在构建的东西交到用户手中。即使只是基础功能，也足以帮助用户发现哪些地方有效、哪些地方无效，从而让我们在必要时及时调整方向。

一个语音助手由很多不同部分组成：唤醒词检测、语音转文字、意图识别、意图执行、文字转语音。要让这些能力在每一种语言中都可用，是一项非常庞大的工作。而其中最重要的部分，是意图识别和意图执行。我们必须先能理解你的命令，然后把它真正执行出来。

我们已经开始在新的[意图仓库](https://github.com/home-assistant/intents)中收集这些命令语句。它很快就会为 Home Assistant 现有的[对话集成](/home-assistant/integrations/conversation)提供支持，让你能够通过我们的应用输入并说出命令。

对话集成目前通过 Home Assistant 中的服务调用对外开放，也同样可以[通过 API 供外部应用或脚本使用](https://开发者.home-assistant.io/docs/intent_conversation_api)。这使开发者能够尝试从各种来源发送命令，例如[Telegram 聊天机器人](https://github.com/frenck/home-assistant-config/tree/7c41afa541193e7c9fd4eab3acec2a00ed3c33e9/custom_components/telegram_bot_conversation)。

![Home Assistant 中对话窗口的截图](/home-assistant/images/blog/2022-12-20-year-of-voice/conversation.png)

## 你可以如何提供帮助

对于每一种语言，我们都在[意图仓库](https://github.com/home-assistant/intents)中收集控制智能家居的命令语句。每一句话都需要标注它所表达的意图。

例如这句话：`Turn on the bedroom lights`。如果把它写成 `Turn on the {area} lights`，它就变成了一条通用命令，可以打开某个特定区域中的所有灯光。接下来我们还需要收集它的其他各种表达方式。

我们已经创建了一种基于 YAML 的格式，用于[声明和测试](https://github.com/home-assistant/intents#intents-for-home-assistant)这些语句。下一步，我们需要你 🫵

对于每一种语言，我们都需要一位或多位语言负责人。语言负责人要负责审核对应语言的贡献，确保内容符合语法且表达自然。如果你想申请成为语言负责人，请在 [Discord](/home-assistant/join-chat/) 的 `#devs_voice` 频道加入我们，或者在[意图仓库](https://github.com/home-assistant/intents/issues)中提交 issue。

我们也需要愿意为自己语言补充语句的人，一起把这份语句集合完善起来。请查看意图仓库中的[入门说明](https://github.com/home-assistant/intents#contributing-sentences)。

