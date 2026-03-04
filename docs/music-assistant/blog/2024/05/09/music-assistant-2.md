---
head:
  - tag: meta
    attrs:
      property: og:image
      content: /images/blog/2024/05/09/music-assistant-2/art.jpg
  - tag: meta
    attrs:
      property: og:image:alt
      content: "Music Assistant 2.0：您的音乐，您的播放器"

title: "Music Assistant 2.0：您的音乐，您的播放器"
description: "将多个音乐库连接到几乎任何智能扬声器。"
cover:
  image: /public/images/blog/2024/05/09/music-assistant-2/art.jpg
  alt: 'Music Assistant 2.0：您的音乐，您的播放器'
excerpt: "今天，正好五年前，我，Marcel，开始开发 Music Assistant。最初只是一个快速脚本，用于同步我的播放列表以便在流媒体提供商之间切换，如今已发展成为一个独立的项目。\n\nMusic Assistant 是我所说的"音乐库管理器"——它让您完全控制在自己的播放器上播放您的音乐。就像 Home Assistant 集中所有设备和服务协同工作一样，Music Assistant 对您的音乐源和智能音频播放设备做同样的事情。"
date: 2024-05-09T00:00:00.000Z
authors:
  - marcel
tags:
  - release
  - announcement
---

今天，正好五年前，我，Marcel，开始开发 [Music Assistant](https://music-assistant.io/)。最初只是一个快速脚本，用于同步我的播放列表以便在流媒体提供商之间切换，如今已发展成为一个独立的项目。

Music Assistant 是我所说的"音乐库管理器"——它让您完全控制在自己的播放器上播放您的音乐。就像 Home Assistant 集中所有设备和服务协同工作一样，Music Assistant 对您的音乐源和智能音频播放设备做同样的事情。

只想直接体验 Music Assistant 而不阅读它是什么（是的，我们了解您！）：

<a href="https://my.home-assistant.io/redirect/supervisor_addon?addon=d5369777_music_assistant&amp;repository_url=https%3A%2F%2Fgithub.com%2Fmusic-assistant%2Fhome-assistant-addon" class="my badge" target="_blank"><img src="https://my.home-assistant.io/badges/supervisor_addon.svg"></a>

<!--more-->

## 彩虹连接
<h3 style="margin-top: -0.25rem; opacity: .67;">什么是 Music Assistant？</h3>

**您的音乐，您的播放器。** 点击即播。应该就这么简单。

<p class="img"><img src='/images/blog/2024/05/09/music-assistant-2/how-it-works.jpg'/>从来源到 Music Assistant 再到扬声器</p>

#### 随处连接和播放
Music Assistant 允许您快速连接一些<a href="https://music-assistant.io/music-providers/">最受欢迎的流媒体提供商</a>，如 Spotify 和 Tidal，以及您的本地媒体文件。导入您喜欢的音轨、艺术家、专辑和播放列表，全部显示正确的艺术作品。

它支持最普遍的<a href="https://music-assistant.io/player-support/">流媒体协议和设备</a>，如 Airplay、Cast 和 DLNA，让您几乎可以在任何设备上播放媒体——如果旧扬声器不支持新服务，Music Assistant 可以让它重获新生。

[了解更多...](#freedom-of-choice)

#### 统一音乐库与高级功能
您的本地和云端库将无缝合并。如果您在多个地方有同一音轨，它会出现一次，同时帮助您找到最高质量的版本。您甚至可以拥有来自同一提供商的多个帐户，让家里的每个人都可以在一个地方拥有自己的播放列表。

它可以分组支持的播放器进行同步播放。它还支持高级播放功能，如淡入淡出和音量标准化——无论设备是否支持这些功能。

[了解更多...](#come-together)

#### 为 Home Assistant 而生
将其与 Home Assistant 集成连接——自动化和语音控制让整个体验更加强大。

[了解更多...](#we-are-family)

## 开始
<h3 style="margin-top: -0.25rem; opacity: .67;">如何安装 Music Assistant</h3>

经过多年的开发和与精彩社区的测试，我们终于可以说这已准备好供日常使用。

<p class="img"><img src='/images/blog/2024/05/09/music-assistant-2/start-me-up.png'/></p>

虽然 Music Assistant 是一个 HA 插件，但它可以通过 [HACS](https://hacs.xyz/) 从头到尾安装。您只需安装集成，它会自动为您安装和管理插件。该集成允许您通过自动化和语音控制来控制您的设备。

<a href="https://my.home-assistant.io/redirect/supervisor_addon?addon=d5369777_music_assistant&amp;repository_url=https%3A%2F%2Fgithub.com%2Fmusic-assistant%2Fhome-assistant-addon" class="my badge" target="_blank"><img src="https://my.home-assistant.io/badges/supervisor_addon.svg"></a>

_Music Assistant 作为 <a href="https://www.home-assistant.io/addons">Home Assistant 插件</a>分发——我们通过第三方应用程序轻松扩展您的 Home Assistant 安装的方式。要将其安装为 Docker 容器，请遵循 <a href="https://music-assistant.io/installation/#tertiary-installation-method-docker-image">MA 安装说明</a>。_

## 对抗权力
<h3 style="margin-top: -0.25rem; opacity: .67;">为什么选择 Music Assistant？</h3>

我开发 Music Assistant 是出于对主流可用选项的沮丧；

*   您购买了一个一体化生态系统（如 Sonos），然后由该生态系统决定现在和将来支持哪些音乐来源。
    
*   您选择了一个音乐流媒体提供商，然后由该流媒体提供商决定您在哪里/如何播放他们的音乐。
    
*   您想在流媒体提供商之间切换，并保留精心策划的播放列表，无论您想用哪个提供商播放。
    
*   您仍然拥有精心录制为本地存储上的高质量文件的 CD 音乐收藏，您想播放它们，甚至可能与流媒体提供商的选择混合播放。
    
*   或者您可能属于不想订阅的用户类别，拥有精心策划的本地媒体收藏，想在这些闪亮的新播放设备上播放。
    
当我们为音乐或设备付费时，我们不应该受到任意限制。我们正在慢慢进入一个有更高围墙花园和更多供应商锁定的世界，是时候夺回控制权了。

<p class="img"><img src='/images/blog/2024/05/09/music-assistant-2/fight-the-power.jpg'/><i>Google Home 上的 Tidal</i></p>

我花了很长时间和不少钱寻找现有解决方案来填补这些空白。它们要么昂贵、封闭，要么缺乏家庭认可因素——或者兼而有之。

## 选择自由
<h3 style="margin-top: -0.25rem; opacity: .67;">连接任何来源并在任何地方播放</h3>

Music Assistant 连接到您喜爱的流媒体提供商和本地音乐文件，让您可以在过去20年几乎任何连接的播放设备上播放它们。它基本上是音乐协议 A 向扬声器/播放器协议 B 的翻译器。

<p class="img"><img src='/images/blog/2024/05/09/music-assistant-2/freedom-of-choice.png'/></p>

例如，我在客厅有一个传统放大器+扬声器设置，允许高质量音乐播放，我可以坐下来听到每一个细节。我还有一个非常嘈杂厨房里的 Sonos 扬声器和一些只能接受 Airplay 的 DIY 扬声器。我可以将音乐播放到所有这些扬声器，而不受限于任何单一生态系统。

有些人可能会说，防止所有这些沮丧的最好方法是购买像 Sonos 这样为您处理一切的生态系统。虽然我是 Sonos 的忠实粉丝（我会向朋友和家人推荐它们以方便使用），但我并不喜欢随之而来的供应商锁定。如果 Sonos 或流媒体服务决定分道扬镳，我不必被锁定在我的音乐之外。此外，他们并不生产每个价位的扬声器，这意味着您无法获得市场上新的更高保真或更实惠硬件的优势。

## 聚在一起
<h3 style="margin-top: -0.25rem; opacity: .67;">将所有音乐统一在一个库中</h3>

在同一个界面中，我可以将我孩子的音乐流式传输到他们的扬声器，也可以将我的 Hi-Res 收藏流式传输到我的高保真设置。这是一个一体化界面。需要五个不同的应用程序才能在房子的多个部分进行播放或切换谁连接以访问他们的播放列表的日子已经一去不复返了。

<p class="img"><img src='/images/blog/2024/05/09/music-assistant-2/come-together.png'/></p>

当您在 Music Assistant 中搜索时，它会搜索您所有的库。您添加的每个流媒体服务或本地文件都可供选择播放。

## 我们是一家人
<h3 style="margin-top: -0.25rem; opacity: .67;">为 Home Assistant 而生</h3>

Music Assistant 一直与 Home Assistant 密切相关（更多内容见下文）。我现在甚至在 [Nabu Casa](https://www.nabucasa.com/) 工作，部分原因是我在 Music Assistant 上的工作（但现在我是 Matter 负责人）。

<p class="img"><img src='/images/blog/2024/05/09/music-assistant-2/we-are-family.png'/></p>

由于这种紧密联系，Home Assistant 与 Music Assistant 无缝链接，解锁了几项高级功能。MA 播放器暴露给 HA，可以通过仪表板、自动化和脚本进行控制。这允许 HA 用户控制他们的音乐播放器并访问 MA 强大的音乐搜索功能。播放器可以提供 TTS（文本转语音）公告，并可以由 Home Assistant 连接的语音助手控制。

## 唱片说明

所以，我[正好五年前](<https://github.com/music-assistant/server/commit/75adea9721fa1f1b7225515087c81edd979fcc8f>)开始开发 Music Assistant，起初是为了个人使用。它始于一个学习练习——多亏了它，我学习了 asyncio Python 编程以及 Vue 前端框架。我把项目放在 GitHub 上只是为了托管代码，但并不是真的打算让其他人使用。

在某个时候，我很清楚有真正的需求，我发布了一些关于如何安装它的信息，这获得了一些关注。2022年6月，我们发布了 Music Assistant 1.0 版本，它还很不完善但已经适合许多用户使用。我们甚至组织了一场由 Home Assistant 主办的直播"[Let's get Loud](https://www.youtube.com/watch?v=SEH-DxOsywg)"，以推广 [ESPHome 的音频支持](https://esphome.io/components/media_player/i2s_audio.html)以及结合这三个开源项目可以构建的超酷东西。

1.0 版本不是我们希望的一切。它有一些结构性错误，特别是作为 Home Assistant 中的自定义组件运行。HA 的创建是为了给您自动化家庭的最佳体验；它从未针对实时音频流进行优化。最重要的是，在某个时候，两个项目的依赖关系冲突得如此严重，以至于 Music Assistant 在 HA 的2023年3月版本中完全停止工作。

在初始版本1.0发布六个月后，项目开始看起来快要消亡了，所以我决定重新开始，回到绘图板。MA 的引擎需要成为自己的独立组件，负责为您提供最佳的音乐流体验（其中音频质量和延迟非常重要），HA 端应该负责自动化您的房子和音乐。

于是，Music Assistant 服务器诞生了。它是一个独立的应用程序，您可以在 docker（或 Home Assistant 插件）中运行，所有这些都通过 HACS 集成连接到 HA。项目被分成了多个独立的部分。

Music Assistant 服务器有自己的 Web 界面，一个用 Vue 编写的现代界面。多亏了 HA 的插件系统，这个 Web 界面可以从 HA 安全访问。Web 界面是一个渐进式 Web 应用程序（PWA），所以您也可以直接访问它并[在您的设备上安装它](https://support.google.com/chrome/answer/9658361?hl=en-GB&co=GENIE.Platform=Desktop)。我们还有一个（实验性的）[桌面应用](https://music-assistant.io/companion-app/)。

在过去的一年里，我们与大量测试人员一起迭代这个项目。所以，虽然技术上这是一个 2.0 版本，但对我来说，这是第一个真正的版本，因为这终于让人感觉良好并且有了正确的基础。同样很棒的是我们吸引了项目的贡献者，帮助创建和维护音乐集成的人，同时提供支持或翻译。更令人兴奋的是，有一些非常大的功能和流媒体服务即将推出。我真诚地感谢所有帮助完成此版本的人。

