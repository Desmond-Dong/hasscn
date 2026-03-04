---
title: "Music Assistant 2.7 - 占领电波"
description: "全新视觉改版、新功能和提供商，以及自建流媒体协议，这是我们最大的更新！"
---

过去几个月我们一直在幕后精心谱曲，积累到宏大的高潮。今天，节拍终于在 [Music Assistant](https://www.music-assistant.io/) 最大的更新上落下。通过 **2.7 版本**，Music Assistant 正在全新亮相——全新视觉改版、排行榜级别的新功能和提供商阵容，以及我们自己*打造*的全新流媒体协议。

当然，您可以随时更新并体验所有精彩的新功能而无需阅读其余内容，但您可能会错过一些深度内容。事实上，我们甚至无法在这篇博文中涵盖所有内容（确实有那么多），所以请在评论中为您喜欢的任何我们遗漏的内容唱赞歌！

<!--more-->

## "With a Little Help from My Friends"

**Marvin 加入团队**

Music Assistant 在 Open Home Foundation 获得了第一位全职员工。不，不是我！我的日常工作是领导基金会的[Ecosystems 部门](https://www.openhomefoundation.org/structure/)（包括基金会除 Home Assistant 本身外的所有软件项目）。[Marvin](https://github.com/MarvinSchenkel) 将在新年加入基金会，全职从事 Music Assistant 工作，领导项目的日常运营。Marvin 已经为项目贡献了三年，从事项目的各个部分，特别是 Apple Music 和 YouTube 提供商。

不用担心，我对我的音频设置非常着迷，仍然会在我这个小项目上捣鼓 😁。

## "Everything in Its Right Place"

**视觉改版**

<p class="img">
    <img src="/images/blog/2025/12/17/music-assistant-2-7/overhaul.webp" alt="Screenshot of the Music Assistant app with an overhauled user interface">
    应得的视觉刷新
</p>

Music Assistant 加入基金会给了我们远不止一个美好的*开放之家*；它给了项目更清晰的方向和一些专业帮助。有些人觉得 Music Assistant 不足的一个领域是其 UI 和 UX，在 2.7 版本中，我们正在开始对其进行重大改版的过程，让它看起来和您的音乐听起来一样好！

这只是一个大过程的开始，所以期望每次更新都带来更多打磨。您可能首先注意到的是屏幕左侧可折叠的导航栏，看起来很像另一个 Assistant 😉。现在它更加直观，特别是对于新用户。设置页面也通过面包屑导航变得更加易于浏览。

最大的明星是新的内置播放器，它让您可以在用于寻找下一首音轨的浏览器上收听音乐。非常适合在将歌曲发送到家中的每个扬声器之前检查下一首歌是否适合全家。

## "Bulletproof"

**用户和登录**

<p class="img">
    <img src="/images/blog/2025/12/17/music-assistant-2-7/login.webp" alt="Screenshot of the Music Assistant app with it's new login functionality">
    全家人的用户档案！
</p>

我们实现的许多新功能都需要某种形式的登录和认证。这是一个备受请求的功能，因为即使在家中的安全性也不应被忽视。我们知道偶尔登录可能是一个小麻烦，但我们尽量让它不显眼，甚至实现了使用您的 Home Assistant 登录作为"单点登录"的方式。

您现在可以拥有不同的用户档案及其自己的音乐提供商。不再需要将四个 Tidal 帐户全部堆在一起，混乱播放列表标签。您甚至可以分配谁有权访问每个扬声器；告别孩子们在您的绩效评估期间在办公室扬声器上播放 Demon Hunters 😅。在设置中，只需转到用户管理部分，您可以在那里添加和编辑新用户。

## "Around the world"

**远程音乐流媒体**

<p class="img">
    <img src="/images/blog/2025/12/17/music-assistant-2-7/flow.webp" alt="Diagram of how Music Assistant handles remote music streaming">
    无论何地，无论何时
</p>

通过我们新的登录界面实现的一个功能是远程音乐流媒体——是的，没错，Music Assistant 可以在您可以连接互联网的任何地方使用。我们创建了一个[新 Web 应用](https://app.music-assistant.io/)，允许您在外出时进行远程连接。

它使用 Home Assistant Cloud 的内置多媒体流功能（WebRTC）帮助将音频从您的 Music Assistant 服务器路由到您所在的任何地方。使用此功能不需要 [Home Assistant Cloud 订阅](https://www.home-assistant.io/cloud/)；非常感谢 Nabu Casa 免费向我们的用户提供他们的基础设施。Home Assistant Cloud 订阅者可以获得更强大的路由，改善更多地方的流媒体。此订阅还支持 Music Assistant 的全职开发 🙏。

此连接是点对点和端到端加密的，意味着没有人会知道您在听 ABBA 😊。我不会说它准备好替代您当前的音乐流媒体服务，但这是让您朋友的家里播放 FLAC 的好方法。您甚至可以打开两个 Web 应用实例并将其流式传输到两个设备，它们将同步……*但这怎么可能呢？*

## "Spin me right round"

**介绍 Sendspin**

一段时间以来，Music Assistant 团队一直在寻找将音频、专辑封面和其他音乐可视化流式传输到我们家中设备的最佳方式。有几个项目正在做一些很酷的音频流媒体工作，但没有一个适合我们的需求。所以，当它不存在时，是时候开始构建了。

介绍 **Sendspin**，一种新的多媒体流媒体和同步协议。它是完全开源和免费使用的。Sendspin 可以流式传输高保真音频、专辑封面和可视化数据，自动适应每个设备的能力。想象一下电子纸显示器展示专辑封面，同时多个扬声器同步播放，智能灯光随着节奏脉动。

目前使用它的最佳方式是通过浏览器或运行测试版固件的 [Home Assistant Voice Preview Edition](https://www.home-assistant.io/voice-pe/)。我们构建了在支持 Google Cast 的扬声器上使用 Sendspin 的实验性功能（我们也正在寻求对支持 AirPlay 的扬声器做同样的事情），这将允许 Sendspin 与许多不同的硬件一起工作。

非常感谢 Open Home Foundation 的 [Maxim](https://github.com/maximmaxim345) 和 [Kevin](https://github.com/kahrendt)，他们对于让 Sendspin 成为现实*功不可没*。尽管它今天可以做一些令人印象深刻的事情，但它非常像一个技术预览，此公告是我们**向所有开发者和 DIY 音频爱好者的号召**——[我们需要您的帮助来构建和测试这个](https://www.sendspin-audio.com/)。这是规范，开始用它构建吧！

生活中所有最好的东西都是用来分享的，您的音乐应该像我们喜爱的软件一样自由和开放。所以转动那张唱片 💿，放下唱针，将那音乐发送到您的整个家。

## "Aeroplane"

**AirPlay 新增功能**

我们最近添加了对外部音频源的支持，第一个是 Spotify Connect。这允许您从 Spotify 应用将音频流式传输到您的 Music Assistant 服务器，然后可以将其发送到所有扬声器，即使它们不支持 Spotify Connect。我们现在添加了将 AirPlay 音频发送到 Music Assistant 的功能，然后您可以将其发送到家中的任何地方。

我们现在也支持 AirPlay 2 扬声器作为播放器提供商，这意味着所有支持 AirPlay 2 的扬声器（如 HomePods）上完美同步的音频。我们建议阅读文档中的限制，因为并非所有 AirPlay 2 设备都是平等的 🤦‍♂️。

## "Sing"

**歌词支持**

<p class="img">
    <img src="/images/blog/2025/12/17/music-assistant-2-7/lyrics.webp" alt="Screenshot of the Music Assistant player with lyrics alongside album art">
    卡拉OK时间到了！
</p>

再也不用猜测 Kurt 在 Smells Like Teen Spirit 中说了什么。从 Music Assistant 2.6 开始，您现在可以看到正在播放歌曲的歌词。如果歌词提供商支持，有能力让这些词时间同步，使其更像卡拉OK。打开队列菜单时可以找到歌词，它将在"歌词"标签中（只有当曲名、艺术家和专辑与歌词提供商匹配时，此标签才会出现）。我们从 LRCLIB 支持开始，但此后添加了 Tidal 歌词同步、Genius 歌词和本地 LRC 文件。

## "Smooth operator"

**智能淡入淡出**

<p class="img">
    <img src="/images/blog/2025/12/17/music-assistant-2-7/crossfade.webp" alt="Screenshot of the Music Assistant app showing the smart fades setting">
    让您的播放列表无缝衔接
</p>

Music Assistant 现在是您的个人室内 DJ，完美地将一首歌混入下一首，而且不像 DJ 它总是接受您的点歌 😎。此最新更新添加了*智能淡入淡出*，它考虑每首歌的 BPM，使歌曲之间的淡入淡出听起来更自然。要打开它，转到您选择的播放器，向下滚动到音频部分，选择"启用智能淡入淡出"。

## "All the small things"

**以及更多**

这些更新都不是*小事*，但我的空间快用完了，所以这里是热门100榜单的其余部分：

- 现在有 DSP 预设，允许您快速保存和应用自定义配置。
- 跟踪和分享您的收听历史，添加了 scrobbling，支持 LastFM、ListenBrainz 和 Subsonic。
- 添加了几个新的播放器提供商，包括 Yamaha MusicCast 和运行 Media Assistant 的 Roku 设备。
- 添加了 VBAN 作为新的输入提供商。
- 新的广播和播客提供商包括 Radio Paradise、Podcast Index、BBC Sounds、gPodder、iTunes Podcasts、Dl.fm 和 ARD Audiothek。
- 不能跟随 Phish 巡演？幸运的是，新的 Phish.in 提供商能满足您的需求。如果您在寻找更多现场音乐，还有 Nugs.net。
- 另一个很酷的音频大杂烩是 Internet Archive，现在可以添加为提供商。
- 日本最大的流媒体平台之一 Niconico 已添加为音频提供商 ㊗️。

## "Rebel yell"

**加入音频革命**

<p class="img">
    <img src="/images/blog/2025/12/17/music-assistant-2-7/playing.webp" alt="Google Nest Hub playing Music Assistant alongside a Home Assistant Voice Preview Edition">
    Music Assistant 也支持 Cast！
</p>

您的音乐，您的播放器——是时候夺回对您音乐和想要播放它的设备的控制权了。如果您是 Music Assistant 新手，请查看如何[从这里开始](https://www.music-assistant.io/)。虽然我们对这些新功能感到兴奋，但我们并没有暂停。我们很乐意在评论中或 [Discord](https://discord.com/invite/kaVm8hGpne) 上听到您的反馈。

