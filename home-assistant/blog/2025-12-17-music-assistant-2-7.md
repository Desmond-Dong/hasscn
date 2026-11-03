# Music Assistant 2.7 - 接管整个音浪

<img src='/home-assistant/images/blog/2025-12-music-assistant-2-7/art.webp' style='border: 0;box-shadow: none;' alt="Music Assistant is taking over the airwaves">

过去几个月里，我们一直在幕后忙着“编曲”，为这次盛大的高潮做准备。今天，[Music Assistant](https://www.music-assistant.io/) 迎来了迄今最大的一次更新，节奏终于彻底落下。随着 **2.7 版本** 到来，Music Assistant 将拥有一次全面视觉翻新、一系列重量级新功能与内容提供方，以及一套我们自己亲手打造的全新流媒体协议。

当然，你也完全可以不读后面内容，直接更新然后亲自体验这些新东西，但那你可能会错过一些隐藏曲目。事实上，这篇博客甚至还无法覆盖全部更新内容（真的就有这么多），所以如果我们漏掉了你喜欢的内容，欢迎去评论区尽情赞美它！<!--more-->

### 目录

* [Marvin 加入团队](#with-a-little-help-from-my-friends)
* [视觉焕新](#everything-in-its-right-place)
* [用户与登录](#bulletproof)
* [远程音乐串流](#around-the-world)
* [介绍 Sendspin](#spin-me-right-round)
* [AirPlay 增强](#aeroplane)
* [歌词支持](#sing)
* [智能淡入淡出](#smooth-operator)
* [以及更多内容](#all-the-small-things)
* [加入这场音频革命](#rebel-yell)

## “With a Little Help from My Friends”

**Marvin 加入团队**

Music Assistant 终于迎来了 Open Home Foundation 内第一位全职员工。不是我！我的本职工作是领导基金会的 [Ecosystems 部门](https://www.openhomefoundation.org/structure/)（负责基金会中除 Home Assistant 本体之外的所有软件项目）。[Marvin](https://github.com/MarvinSchenkel) 将在新的一年正式加入基金会，全职投入 Music Assistant，负责项目的日常推进。过去三年里，Marvin 一直在为这个项目做贡献，参与了项目中各种不同部分，尤其包括 Apple Music 和 YouTube 提供方相关工作。

别担心，我对自己的音频系统依然非常痴迷，还会继续折腾这个我珍爱的“小副业” 😁。

## “Everything in Its Right Place”

**视觉焕新**

<p class="img">
    <img src="/home-assistant/images/blog/2025-12-music-assistant-2-7/overhaul.webp" alt="Screenshot of the Music Assistant app with an overhauled user interface">
    一次实至名归的视觉刷新
</p>

Music Assistant 加入基金会之后，收获的不只是一个更好的“开放家庭”归宿；它也拥有了更清晰的发展方向和更多专业支持。过去有人觉得 Music Assistant 在 UI 与 UX 上还有欠缺，而在 2.7 版本中，我们终于开始对它进行一次大幅改造，让它看起来能和你的音乐一样出色！

这还只是一个长期过程的开始，所以未来每一次更新你都可以期待更多打磨。你最先注意到的，可能是左侧现在可折叠的导航栏——它看起来是不是有点像另一个 Assistant 😉。整体交互现在更直观，特别是对新用户更友好。设置页面也通过面包屑导航变得更容易浏览。

本次改版的最大明星，是全新的内置播放器，它允许你直接在当前浏览器里试听音乐，帮你挑选下一首歌。非常适合先确认一下接下来那首歌是否适合全家一起听，再把它一键推送到家里的每一个音箱。

## “Bulletproof”

**用户与登录**

<p class="img">
    <img src="/home-assistant/images/blog/2025-12-music-assistant-2-7/login.webp" alt="Screenshot of the Music Assistant app with it's new login functionality">
    全家都能拥有自己的用户档案！
</p>

我们这次实现的许多新功能，如果没有某种登录与认证机制，其实根本不可能完成。这也是社区呼声很高的一项能力，因为即便是在家里，安全也不能被忽视。我们知道，偶尔登录一次可能有点麻烦，所以我们尽量把这一过程做得不打扰人，甚至实现了使用 Home Assistant 登录作为“单点登录”的方式。

现在，你可以为不同用户配置各自的资料和音乐内容提供方了。终于不用再让四个 Tidal 账号同时堆在播放列表页里，挤得乱七八糟。你甚至还可以指定谁能使用哪些音箱；是时候和孩子们在你绩效评估时用办公室音箱放 Demon Hunters 的日子说再见了 😅。在设置中，前往 User Management 部分，就可以新增和编辑这些用户。

## “Around the world”

**远程音乐串流**

<p class="img">
    <img src="/home-assistant/images/blog/2025-12-music-assistant-2-7/flow.webp" alt="Diagram of how Music Assistant handles remote music streaming">
    无论何地，无论何时
</p>

在新登录体系支持下实现的一项重要功能，就是远程音乐串流——没错，这意味着只要能联网，你就能随时随地使用 Music Assistant。我们已经创建了一个[全新的 Web 应用](https://app.music-assistant.io/)，让你在外出时也能远程连接。

它利用了 Home Assistant Cloud 内置的多媒体流能力（WebRTC），帮助把音频从你的 Music Assistant 服务器路由到你所在的任意位置。使用此功能并**不需要**订阅 [Home Assistant Cloud](/home-assistant/cloud/index.md)；在这里要特别感谢 Nabu Casa，免费向我们的用户提供了这些基础设施。而 Home Assistant Cloud 订阅者则还能获得更强的路由能力，在更多环境下改善串流体验。同时，这项订阅也支持了 Music Assistant 的全职开发 🙏。

这种连接是点对点且端到端加密的，也就是说，没人会知道你是不是正在听 ABBA 😊。我不会说它已经足以完全替代你当前的音乐流媒体服务，但它确实是个在朋友家播放自己 FLAC 收藏的绝佳办法。你甚至可以同时打开两个 Web 应用实例，把同一音频串流到两台设备上，而且它们还会保持同步……*但这到底是怎么做到的？*

## “Spin me right round”

**介绍 Sendspin**

一段时间以来，Music Assistant 团队一直在寻找一种最适合的方式，把音频、专辑封面以及其他音乐可视化内容发送到我们家中的各种设备上。市面上确实有一些项目在音频流传输方面做得很酷，但没有哪个能完全满足我们的需求。所以，当它还不存在时，那就只能自己动手造了。

于是，**Sendspin** 诞生了。这是一种全新的多媒体流与同步协议。它完全开源，而且可免费使用。Sendspin 不仅可以传输高保真音频，还能传输专辑封面和可视化数据，并根据每台设备的能力自动适配。想象一下：电子纸屏幕展示专辑封面，多台音箱同步播放，智能灯光随节奏律动。

目前，使用它的最佳方式是在浏览器中，或者在运行测试版固件的 [Home Assistant Voice Preview Edition](/home-assistant/voice-pe/) 上。我们还构建了实验性支持，让 Sendspin 可以在支持 Google Cast 的音箱上运行（也正在研究如何让它在支持 AirPlay 的音箱上工作），从而为大量硬件打开大门。

特别感谢 Open Home Foundation 的 [Maxim](https://github.com/maximmaxim345) 和 [Kevin](https://github.com/kahrendt)，他们在让 Sendspin 成为现实这件事上起到了真正“不可或缺”的作用。尽管它今天已经能做出不少令人印象深刻的事情，但这仍然只是一个技术预览。因此，这次公告其实也是我们向所有**开发者和 DIY 音频爱好者发出的公开召唤**——[我们需要你一起来构建和测试它](https://www.sendspin-audio.com/)。规范已经在那里了，现在就开始基于它动手吧！

生活中最好的东西都值得分享，而你的音乐也理应像我们热爱的自由软件一样自由开放。那就转起唱片 💿，落下唱针，把音乐送到你整个家里吧。

## “Aeroplane”

**AirPlay 增强**

我们最近已经加入了对外部音频输入源的支持，第一个就是 Spotify Connect。这让你可以把 Spotify app 中的音频传到 Music Assistant 服务器，再由它分发到你家里的所有音箱上，即便这些音箱本身不支持 Spotify Connect。现在，我们又进一步加入了将 AirPlay 音频送入 Music Assistant 的能力，接下来你就能把它再发送到家中的任意位置。

我们现在也支持把 AirPlay 2 音箱作为播放器提供方使用，这意味着你可以在所有支持 AirPlay 2 的音箱（比如 HomePods）之间实现完美同步播放。我们建议你仔细阅读文档中的限制说明，因为并不是所有 AirPlay 2 设备都一样靠谱 🤦‍♂️。

## “Sing”

**歌词支持**

<p class="img">
    <img src="/home-assistant/images/blog/2025-12-music-assistant-2-7/lyrics.webp" alt="Screenshot of the Music Assistant player with lyrics alongside album art">
    是时候开启卡拉 OK 模式了！
</p>

以后再也不用靠猜来听懂 Kurt 在《Smells Like Teen Spirit》里到底唱了什么了。从 Music Assistant 2.6 开始，你已经可以看到当前播放歌曲的歌词。如果歌词提供方支持，还能实现逐句时间同步，效果就更像卡拉 OK。打开播放队列菜单后，你会看到“lyrics”标签页（只有当歌曲名、歌手和专辑能正确匹配到歌词提供方时，这个标签页才会显示）。我们最初支持的是 LRCLIB，之后又加入了 Tidal 歌词同步、Genius 歌词以及本地 LRC 文件。

## “Smooth operator”

**智能淡入淡出**

<p class="img">
    <img src="/home-assistant/images/blog/2025-12-music-assistant-2-7/crossfade.webp" alt="Screenshot of the Music Assistant app showing the smart fades setting">
    让你的播放列表无缝衔接
</p>

现在，Music Assistant 可以成为你家里的私人 DJ，在不同歌曲之间进行自然衔接，而且和真正的 DJ 不同，它永远会接你的点歌 😎。这次更新新增了 *Smart fading*，它会考虑每首歌的 BPM，使歌曲之间的 crossfade 听起来更自然。启用方式也很简单：进入你想设置的播放器，向下滚动到 Audio 部分，然后选择“Enable Smart Fades”。

## “All the small things”

**以及更多内容**

这些更新其实一点都不“小”，但我实在写不下了，所以这里快速列一下剩余热榜：

* 现在加入了 DSP 预设，让你能快速保存并应用自定义配置。
* 通过新增 scrobbling，你现在可以追踪并分享自己的收听历史，支持 LastFM、ListenBrainz 和 Subsonic。
* 新增了多个播放器提供方，包括 Yamaha MusicCast，以及运行 Media Assistant 的 Roku 设备。
* 新增 VBAN 作为输入提供方。
* 新增的电台和播客提供方包括 Radio Paradise、Podcast Index、BBC Sounds、gPodder、iTunes Podcasts、Dl.fm 和 ARD Audiothek。
* 没法跟着 Phish 一起巡演？好在新增的 Phish.in 提供方能帮到你。如果你想听更多现场演出，还有 Nugs.net。
* 另一个很有意思的“音频杂货铺”是 Internet Archive，现在也能作为一个内容提供方添加进来。
* 日本最大的流媒体平台之一 Niconico 现在也加入为音频提供方了 ㊗️。

## “Rebel yell”

**加入音频革命**

<p class="img">
    <img src="/home-assistant/images/blog/2025-12-music-assistant-2-7/playing.webp" alt="Google Nest Hub playing Music Assistant alongside a Home Assistant Voice Preview Edition">
    Music Assistant 现在也兼容 Cast！
</p>

你的音乐，你的播放器——是时候重新夺回对音乐以及播放设备的掌控权了。如果你还不熟悉 Music Assistant，可以先看看[这里的入门指南](https://www.music-assistant.io/)。虽然我们对这次的新功能非常兴奋，但我们可完全没有打算按下暂停键。欢迎在评论区或 [Discord](https://discord.com/invite/kaVm8hGpne) 告诉我们你的想法。
