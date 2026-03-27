---
title: '2019 State of the Union：回顾'
description: ING 接待了 150 位 Home Assistant 社区成员，共同了解 Home Assistant 的方向与原因。
---
# 2019 State of the Union：回顾

2019 年 11 月 13 日，150 位 Home Assistant 社区成员齐聚阿姆斯特丹 [ING](https://www.ing.com)，参加 Home Assistant 2019 State of the Union。

当晚，Home Assistant 创始人 Paulus Schoutsen 与 hass.io 创始人 Pascal Vizeli 分享了 Home Assistant 在做什么、为什么这样做，以及接下来的计划。

活动视频如下（从 7:12 开始）：

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/tc17q1Zn0Xs?start=437" frameborder="0" allowfullscreen></iframe>
</div>

## 致谢

这次 State of the Union 的顺利举办，离不开以下伙伴投入的时间与精力：

- [ING](https://www.ing.com) 再次提供场地 ❤️
- Erik-Jan Riemers 负责组织工作，表现太棒了 ⭐️
- Frenck 负责直播管理
- Arjan Vroege 协助团队执行

## 发布内容

### 我们是全球第 10 大开源项目

GitHub 发布了 [State of the Octoverse](https://octoverse.github.com/#top-and-trending-projects)，按贡献者数量统计，Home Assistant 在过去一年位列第十。

这一成绩尤其难得，因为榜单上其他项目大多与大型商业公司相关，或由其维护。

<p class='img'><img src='/home-assistant/images/blog/2019-11-state-of-the-union/octoverse.png' alt='全球前 10 大开源项目。'>全球前 10 大开源项目。</p>

### 全球各地的 Home Assistant ❤️

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AsPqrAxSMbU" frameborder="0" allowfullscreen></iframe>
</div>

### 场景能力增强

在 Home Assistant 0.102 中，我们上线了新的场景编辑器，并新增两个场景服务：`scene.apply` 与 `scene.create`。前者可直接应用一个未预先定义的场景，后者可即时创建场景。

### iOS 应用

[@robbiet480](https://github.com/robbiet480) 已将全新升级版 iOS 应用提交至 App Store，很快就会发布。

[源代码](https://github.com/home-assistant/home-assistant-ios)

### Android 应用

我们已经发布新的 Android 应用！[点此下载。](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) 它由 [@CedrickFlocon](https://github.com/CedrickFlocon) 主导开发，也有越来越多贡献者加入，太棒了！

[源代码](https://github.com/home-assistant/home-assistant-android/)

### OAuth2 账号关联

我们让集成在 Home Assistant 中使用 OAuth2 账号关联变得更简单。该能力从 Home Assistant 0.102 开始可用，Somfy 是首个接入伙伴。

它通过 Home Assistant Cloud 提供的小型云服务运行，对所有用户免费开放，不需要云账户。

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/y0SECWUVR-M" frameborder="0" allowfullscreen></iframe>
</div>

如果你想为集成增加 OAuth2 账号关联，请查看[更新后的开发者文档](https://开发者.home-assistant.io/docs/en/config_entries_config_flow_handler.html#configuration-via-oauth2)。

### 与 Almond 合作：保护隐私的虚拟助手

我们与斯坦福开放虚拟助手实验室合作，把 [Almond](https://almond.stanford.edu/) 带给 Home Assistant 用户。Almond 已完成与 Home Assistant 集成的升级，用户现在可以通过 Lovelace UI 与 Almond 对话。

你可以独立运行它、以 hass.io 插件方式运行，或者使用斯坦福托管的云端版本。

<p class='img'><img src='/home-assistant/images/blog/2019-11-state-of-the-union/almond.png' alt='Almond 的简要说明。'>Almond 的简要说明。</p>

更多信息请查看[公告博客](/home-assistant/blog/2019/11/20/privacy-focused-voice-assistant/)。

### Ada：由 Home Assistant 驱动的语音助手

我们介绍了一个新项目 Ada。Ada 是一个语音助手，它把全部处理流程交给 Home Assistant 中的语音转文本（新能力）、对话和文本转语音集成。你可以为每个集成选择自己的服务提供方。

你可以独立运行它，也可以作为 hass.io 插件运行。

更多信息请查看[公告博客](/home-assistant/blog/2019/11/20/privacy-focused-voice-assistant/)。

[源代码](https://github.com/home-assistant/ada)。

<p class='img'><img src='/home-assistant/images/blog/2019-11-state-of-the-union/ada.png' alt='Ada 的架构概览。'>Ada 的架构概览。</p>

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8VFZiHcjp78" frameborder="0" allowfullscreen></iframe>
</div>

### Home Assistant Cloud 语音服务

Nabu Casa 推出了新的 Beta 服务：基于 Azure Cognitive Services，为 Home Assistant Cloud 订阅用户提供语音转文本与文本转语音服务。这让你更容易开始使用 Ada，也能把语音通知发送到家里的音箱。

### Z-Wave

我们一直在与 Open Z-Wave 开发者合作推进新方案，以便迁移到 Open Z-Wave 1.6，并在未来更容易保持更新。

我们预计很快会发布 MVP。该工作由 [@cgarwood](https://github.com/cgarwood) 推动。

[源代码](https://github.com/cgarwood/python-openzwave-MQTT)

### Frenck 加入 Nabu Casa

Frenck 将作为第四位员工加入 Nabu Casa，全职投入 Home Assistant。

_“如果要描述我的理想工作，那就是成为一名全职开源开发者；把自己的时间和知识投入到开源软件方案的创造与创新中，让世界变得更好；让地球上的每个人都能免费享受这些成果。”_ &nbsp;&nbsp;&nbsp;–&nbsp;Franck&nbsp;Nijhof&nbsp;(Frenck)&nbsp;on&nbsp;[frenck.dev](https://frenck.dev/donate/)

### 用语音创建自动化

我们已经可以利用 Almond 的神经网络，**让用户通过自然语言生成自动化**。这意味着你现在只要告诉 Home Assistant“我回家时打开灯”，系统就会把它转换成对应的 Home Assistant 自动化。

[源代码](https://github.com/NabuCasa/thingtalk-hass-generator/)。

<p class='img'>
<img src='/home-assistant/images/blog/2019-11-0.102/thingtalk-automation.png' alt='Screenshot of the create 自动化 dialog.'></a>
创建自动化对话框截图。
</p>

### 传递热爱 ❤️

Home Assistant 就是社区，社区就是 Home Assistant。欢迎帮助我们传播这份热爱，在 YouTube、博客和其他媒体上帮助他人、分享知识。
