---
title: 'Almond 与 Ada：以隐私为核心的语音助手'
description: 认识 Almond（注重隐私的虚拟助手）和 Ada（由 Home Assistant 驱动的语音助手）。
---

太长不看版：

- 与 [Almond](https://almond.stanford.edu/) 合作，已在 Home Assistant 0.102 提供。
- 推出 [Ada](https://github.com/home-assistant/ada)，由 Home Assistant 集成驱动的语音助手，可作为 Hass.io 插件使用。
- 为 Home Assistant Cloud 订阅用户提供新的语音转文本和文本转语音 Beta 服务。

---

语音助手是与你的家交互的绝佳方式：你可以快速提问、设置计时器、控制设备。助手越了解你、你的家和家里的其他成员，就越能帮到你。

现有的虚拟助手确实好用，但有个大问题：它们把数据存放在云端，不提供可供其他公司构建产品的 API，而且背后的公司核心业务往往是构建用户画像，用于广告投放和商品推荐。

我们家庭系统的底座，应该是数据本地化并提供开放 API 的系统。创新来自不同背景的人不断尝试各种实验，直到找到真正可行的方向。这不应该交给单一公司决定。

最近我们与[斯坦福大学开放虚拟助手实验室](https://oval.cs.stanford.edu/)取得了联系。过去四年里，他们一直在开发名为 Almond 的虚拟助手。它与 Home Assistant 非常契合。

<!--more-->

## Almond

[Almond](https://almond.stanford.edu/) 是一个开源、注重隐私的虚拟助手。借助 Almond，你可以在家中运行语音助手，让它播报新闻或控制家居。它由斯坦福开发的先进神经网络 [LUInet](https://almond.stanford.edu/doc/genie-intro.md) 驱动。现在它已经可以与 Home Assistant 协同工作。

Almond 团队已经更新了 Almond，使其能够识别 Home Assistant 中不同类型的设备并进行控制。相应地，我们也升级了 Home Assistant 的 conversation 集成来支持 Almond，让用户可以直接在前端与 Almond 对话。

<p class='img'><img src='/home-assistant/images/blog/2019-11-voice-assistant/almond.png' alt='Home Assistant 中 Almond 集成的截图。'>Home Assistant 中 Almond 集成的截图。</p>

从 Home Assistant 0.102 开始，用户已经可以使用 Almond。它需要 Almond Server，你可以自行安装、使用新的 Almond Hass.io 插件，或者直接使用由斯坦福托管的云端版本 Almond Web。默认情况下，Almond Server 会使用云端 LUInet，但也可以本地运行。

Almond 的设计使得即使 LUInet 运行在云端，你的隐私仍能在很大程度上得到保护。这是因为 LUInet 只负责把文本转换为程序结构，具体细节由本地的 Almond Server 填充。比如，LUInet 会把“回家时打开灯”转成 Almond Server 能理解的代码。只有 Almond Server 知道用户家里有哪些灯、如何控制它们，以及这句话的上下文。

### Almond 与 Google/Alexa 的对比

你可能会问，Almond 是否已经和 Alexa 或 Google 一样好？答案是还没有，但这并不影响方向。

如果你希望家里的助手了解你的一切，那它就必须重视隐私，必须是开放的。这一点没有妥协空间。

Almond 当然还有提升空间。但它是开源的，我们会与 Home Assistant 社区和 Almond 团队一起把它做得更好。你现在就可以参与：

Almond 正在收集你希望用于控制家中设备的句子。我们已有基础语料，但越多越好。你可以通过[这个表单](https://docs.google.com/forms/d/e/1FAIpQLSeStJfjvueNAiueRVmP47XALRaJlx7tttzJjRfVjX4J546-uA/viewform)提交句子。

你也可以在[训练控制台](https://almond.stanford.edu/developers/train)中直接帮助训练 LUInet，教它如何理解句子。

## Ada

Almond 还不是完整答案。Almond 只处理文本输入并输出文本，不负责语音转文本输入，也不负责文本转语音播报。这些能力不在 Almond 范畴内，但它们在 Home Assistant 范畴内。Home Assistant 早已有多个后端的文本转语音集成，而在 0.102 中，我们又补上了新的语音转文本集成。

现在，我们几乎拼齐了 Home Assistant 内置语音助手所需的全部组件，因此决定推出一个新项目：[Ada](https://github.com/home-assistant/ada)。Ada 集成了唤醒词检测，并把数据路由到各个集成，从而提供完整的语音助手体验。

<a href='/home-assistant/images/blog/2019-11-voice-assistant/概述.svg'><img src='/home-assistant/images/blog/2019-11-voice-assistant/overview.svg' alt='Architectural 概述 of how all pieces fit together.' style='border: 0;box-shadow: none;'></a>

Ada 仍处于非常早期阶段。我们会持续改进它。如果你在这个领域有经验并愿意参与，欢迎联系我们。

Ada 也提供 [Hass.io](http://hass.io) 插件。这意味着你可以把麦克风和音箱接到树莓派上，把 Hass.io 变成完整、注重隐私的语音助手。

为了让系统更容易接入语音转文本和文本转语音集成，Nabu Casa 推出了新的 Beta 服务：基于 Azure Cognitive Services，为 Home Assistant Cloud 订阅用户提供语音转文本与文本转语音能力。

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/8VFZiHcjp78" frameborder="0" allowfullscreen></iframe>
</div>

## 如果部分功能在云端运行，虚拟助手还能保持隐私吗？

在 Home Assistant，我们重视隐私和本地控制。我们希望提供在没有互联网时依然可用的家庭自动化，并且它足够快速、可靠。

但我们也希望隐私方案具备可及性。用户不应必须在家部署大型服务器才能获得隐私保护。隐私不该是少数人才拥有的特权。

在当前方案下，一部分能力仍运行在云端，但家庭数据和控制仍留在本地。当更快的技术更普及时，或出现新项目可协助本地化时，我们会把更多能力迁回本地。

我们不想等到所有组件都 100% 本地化后才开始整合。我们需要现在就开始建设自己想要的未来。

## 接下来做什么？

通过 Almond 和 Ada，我们已经搭好了构建语音助手的基础模块。接下来就是使用它、改进它，并把你的创意用法分享出来，给我们惊喜。

我们在论坛新增了一个版块，用于讨论[语音配置方案](https://community.home-assistant.io/c/configuration/voice-assistant)。

## Bonus

我还快速做了一个原型，让你可以通过 Telegram Bot 与 Almond 对话！它以[自定义组件](https://gist.github.com/balloob/d59cae89d19a14bcec99ce1bde05bd44)形式提供。

<p class='img'><img src='/home-assistant/images/blog/2019-11-voice-assistant/telegram.png' style='max-width: 300px' alt='通过 Telegram 与 Almond 对话的截图。'>通过 Telegram 与 Almond 对话的截图。</p>
