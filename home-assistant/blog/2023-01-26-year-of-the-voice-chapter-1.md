# 语音之年 - 第 1 章：Assist

今年是 Home Assistant 的[语音之年](https://www.home-assistant.io/blog/2022/12/20/year-of-voice/)。我们在 2023 年的目标，是让用户可以用自己的语言控制 Home Assistant。今天，在 2023 年开始后的第一个月，我们开启第一章。

在 Home Assistant，我们相信技术应该拿来探索和尝试，项目也应该尽快可用。然后我们就能和社区一起持续迭代、不断打磨。所以今天，我们带来了支持 22 种语言的基础体验，让你可以用自然语言与 Home Assistant 交互。哦对了，我们在路上还做了一些很有趣的东西，也会一并发布。

*如果你想观看这篇博客对应的视频介绍（包含现场演示），请查看[我们的直播回放](https://www.youtube.com/live/ixgNT3RETPg)。*

## 意图

语音助手的核心，是能够理解一句话背后的意图。用户到底想做什么？为了提取这些意图，我们创建了自己的模板句子匹配格式和意图识别器，名为 [Hassil](https://github.com/home-assistant/hassil)。

这个新格式已经用于我们的新项目 [Home Assistant Intents](https://github.com/home-assistant/intents)。这个项目的目标，是收集尽可能多语言的家庭自动化句子。项目启动仅一个月，就有 112 人参与贡献。现在项目已支持[22 种语言，另有 14 种正在进行中](https://ohf-voice.github.io/intents/)。

## Assist

我们为 Home Assistant 增加了一个新功能：<img src='/home-assistant/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'> Assist。它让用户可以通过自然语言控制 Home Assistant。它由 Hassil 和 Home Assistant Intents 项目中的句子数据驱动。

<!--more-->

我们希望 Assist 尽可能让更多人都能用上。为此，我们让它不需要额外硬件就能运行 - 只要更新到 Home Assistant 2023.2 就可以开始使用！通过智能算法与“暴力堆数据”（我们正在收集大量句子）的结合，我们做出了一个能够覆盖大多数常见表达的系统。未来也可能会加入更强大的、AI 驱动的意图识别器，作为可选功能。

Assist 在 Home Assistant 2023.2 中默认启用。点击仪表盘右上角新的 Assist 图标 <img src='/home-assistant/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'> 即可使用。

[Assist 文档。](https://www.home-assistant.io/voice_control/)

<img src="/home-assistant/images/blog/2023-01-26-year-of-the-voice-chapter-1/assist-dialog.png" alt="Screenshot of the Assist dialog" class='no-shadow' />

## Android Wear 上的 Assist

我们希望使用 Assist 尽可能简单。为此，我们在 Android Wear 应用中新增了一个磁贴。你只需从表盘轻轻一滑，就会看到 Assist 按钮，并可以发送语音命令。

[Android Wear 上的 Assist 文档。](https://www.home-assistant.io/voice_control/android/)

*该磁贴可在 [Home Assistant Companion for Android 2023.1.1](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android\&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1\&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1) 中使用。*

<lite-youtube videoid="Dr_ZCbt8w5k" videotitle="Assist on Android Wear"></lite-youtube>

## 通过 Siri 与 Apple Shortcuts 使用 Assist

在 Apple 设备上，我们通过集成 Siri 实现了完全免手动操作的体验。这依赖 Home Assistant 应用中的一个新 Apple 快捷指令动作，叫做 Assist。这个快捷动作也可以从 Mac 任务栏、iPhone 主屏幕或 Apple Watch 表盘组件中手动触发。我们准备了两个开箱即用的快捷指令，你可以在文档中一键导入，快速启用这些能力。

[通过 Siri 与 Apple Shortcuts 使用 Assist 的文档。](https://www.home-assistant.io/voice_control/apple/)

*Assist 快捷指令可在 [Home Assistant Companion for iOS 2023.2](https://apps.apple.com/us/app/home-assistant/id1099568401?itsct=apps_box_badge\&itscg=30200) 中使用。Mac 版本正在等待审核。*

<lite-youtube videoid="sQ7X7jz1SrA" videotitle="Assist on Apple HomePod"></lite-youtube>

## 自定义句子

在 Home Assistant，我们相信每个家都独一无二，也相信[技术应当适应你，而不是你去适应技术](https://www.home-assistant.io/blog/2016/01/19/perfect-home-automation/)。因此我们在架构上就支持用户进行深度自定义。Assist 也不例外。

* 你是《权力的游戏》粉丝，想让每次回复都变成 "hodor"？
* 你想用一句 "Hocus pocus living room" 来打开客厅灯？
* 你想用自定义句子触发派对模式脚本？

Assist 支持自定义句子、响应和意图，让你不仅能实现上面这些玩法，还能做更多。我们设计的自定义句子格式也便于与社区共享。

阅读[文档](https://www.home-assistant.io/voice_control/custom_sentences)了解如何开始。

*我们计划在未来版本中加入图形界面，用于自定义和导入句子。*

## 自定义 Assist 引擎

默认情况下，Assist 由我们自己的意图识别器驱动。它在本地运行，但主要用于设备控制。也许你想进行更广泛的问答，或者你在找一个会“自由发挥”回答内容的对话式 AI。针对这些场景，Assist 支持[替换处理交互的引擎](https://developers.home-assistant.io/docs/core/conversation/custom_agent)。

Home Assistant 2023.2 内置了两个可选 Assist 引擎：Google Assistant 和 OpenAI GPT-3。

如果你的 Home Assistant 实例已连接到 Google Assistant，那么 Google Assistant 引擎就可以控制你的设备。

所有与 Assist 交互的方式都可以继续使用，因为它们并不绑定具体引擎。所以如果你一直想在 HomePod 上使用 Google Assistant，现在可以了 🤭

<lite-youtube videoid="orgTMVy0TrI" videotitle="Google Assistant on Apple HomePod"></lite-youtube>

OpenAI GPT-3 Assist 引擎会用 GPT-3 处理你的所有交互，它和著名的 ChatGPT 属于同一家族。它不能控制你的家，也不能[帮你做家庭自动化](/home-assistant/blog/2023/01/23/help-others-leave-ai-at-the-dor/)。它给出的回答不一定都准确，但确实很好玩！

*我们计划在未来版本中支持配置多个 Assist 引擎来处理交互。*

## 接下来是什么

在语音之年第 1 章里，我们专注把意图识别能力构建进 Home Assistant，同时借助 Google 和 Apple 完成更难的部分（语音识别）。这让我们能以最快速度把可用成果交给社区体验。

我们会继续收集各语言的家庭自动化句子（[任何人都可以帮忙！](https://developers.home-assistant.io/docs/voice/intent-recognition/)）。相关更新会随 Home Assistant 的每个主要版本一起发布。

下一步是将语音转文字和文字转语音集成到 Assist 中。我们暂时还没有确定发布时间，请持续关注！

## 致谢

以上内容的实现，离不开很多人的努力。

**技术：**
[Mike Hansen](https://github.com/synesthesiam), [Paulus Schoutsen](https://github.com/balloob), [Daniel Shokouhi](https://github.com/dshokouhi), [Zac West](https://github.com/zacwest), [Rosemary Orchard](https://github.com/rosemaryorchard), [Tronikos](https://github.com/tronikos)

**语言负责人：**
[@AalianKhan](https://github.com/AalianKhan), [@Ahmed-farag36](https://github.com/Ahmed-farag36), [@alpdmrel](https://github.com/alpdmrel), [@arunshekher](https://github.com/arunshekher), [@auanasgheps](https://github.com/auanasgheps), [@benjaminlecouteux](https://github.com/benjaminlecouteux), [@bluefoxlee](https://github.com/bluefoxlee), [@cibernox](https://github.com/cibernox), [@cvladan](https://github.com/cvladan), [@davefx](https://github.com/davefx), [@dinhchinh82](https://github.com/dinhchinh82), [@dsimop](https://github.com/dsimop), [@duhow](https://github.com/duhow), [@easterapps](https://github.com/easterapps), [@ErnestStaug](https://github.com/ErnestStaug), [@fadamsen](https://github.com/fadamsen), [@flexy2dd](https://github.com/flexy2dd), [@gabimarchidan](https://github.com/gabimarchidan), [@haim-b](https://github.com/haim-b), [@halecivo](https://github.com/halecivo), [@HepoH3](https://github.com/HepoH3), [@hertzg](https://github.com/hertzg), [@hristo-atanasov](https://github.com/hristo-atanasov), [@huusissa](https://github.com/huusissa), [@joaorgoncalves](https://github.com/joaorgoncalves), [@larsdunemark](https://github.com/larsdunemark), [@leranp](https://github.com/leranp), [@LubosKadasi](https://github.com/LubosKadasi), [@makstech](https://github.com/makstech), [@mojikosu](https://github.com/mojikosu), [@MTrab](https://github.com/MTrab), [@nagyrobi](https://github.com/nagyrobi), [@schizza](https://github.com/schizza), [@Scorpoon](https://github.com/Scorpoon), [@skynetua](https://github.com/skynetua), [@spuljko](https://github.com/spuljko), [@tetele](https://github.com/tetele), [@TheFes](https://github.com/TheFes), [@Uriziel01](https://github.com/Uriziel01), [@xraver](https://github.com/xraver), [@zubir2k](https://github.com/zubir2k)

**语音社区：**
[@Alexivia](https://github.com/Alexivia), [@Atalonica](https://github.com/Atalonica), [@AwesomeGuy000](https://github.com/AwesomeGuy000), [@BossNeo](https://github.com/BossNeo), [@CedricFinance](https://github.com/CedricFinance), [@Davidsoff](https://github.com/Davidsoff), [@EmilZackrisson](https://github.com/EmilZackrisson), [@FragMenthor](https://github.com/FragMenthor), [@InfiniteBed](https://github.com/InfiniteBed), [@Kalma-House](https://github.com/Kalma-House), [@Licmeth](https://github.com/Licmeth), [@Marlo461](https://github.com/Marlo461), [@N3rdix](https://github.com/N3rdix), [@Nismonx](https://github.com/Nismonx), [@Robin-St](https://github.com/Robin-St), [@TaQuangTien](https://github.com/TaQuangTien), [@ThomDietrich](https://github.com/ThomDietrich), [@TomaszPilch](https://github.com/TomaszPilch), [@Wojciechgc](https://github.com/Wojciechgc), [@alessandroias](https://github.com/alessandroias), [@bemble](https://github.com/bemble), [@berendhaan](https://github.com/berendhaan), [@dejan2101](https://github.com/dejan2101), [@dependabot\[@bot\]](https://github.com/dependabot[@bot]), [@dobromir-hristov](https://github.com/dobromir-hristov), [@frenck](https://github.com/frenck), [@hugovsky](https://github.com/hugovsky), [@iddiek](https://github.com/iddiek), [@jfisbein](https://github.com/jfisbein), [@jharrvis](https://github.com/jharrvis), [@jorclaret](https://github.com/jorclaret), [@kamildoleglo](https://github.com/kamildoleglo), [@kblin](https://github.com/kblin), [@khymmera](https://github.com/khymmera), [@kroimon](https://github.com/kroimon), [@lellky](https://github.com/lellky), [@ludeeus](https://github.com/ludeeus), [@lukahra](https://github.com/lukahra), [@lunmay](https://github.com/lunmay), [@mardito](https://github.com/mardito), [@martindybal](https://github.com/martindybal), [@mib1185](https://github.com/mib1185), [@michaelmior](https://github.com/michaelmior), [@orrc](https://github.com/orrc), [@pckahrs](https://github.com/pckahrs), [@piitaya](https://github.com/piitaya), [@pmentis](https://github.com/pmentis), [@poltalashka](https://github.com/poltalashka), [@rPonuganti](https://github.com/rPonuganti), [@rechin304](https://github.com/rechin304), [@relust](https://github.com/relust), [@rickydg](https://github.com/rickydg), [@rpochot](https://github.com/rpochot), [@rrakso](https://github.com/rrakso), [@rumbu13](https://github.com/rumbu13), [@sanyatuning](https://github.com/sanyatuning), [@tasmin](https://github.com/tasmin), [@thecode](https://github.com/thecode), [@waltlillyman](https://github.com/waltlillyman), [@witold-gren](https://github.com/witold-gren), [@x15pa3ck15x](https://github.com/x15pa3ck15x), [@yuvalabou](https://github.com/yuvalabou)
