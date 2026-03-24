---
title: Music Assistant 的下一首大热单曲
description: Spotify Connect、Assist 流式播放、播客、有声书、Apple Music、
  完整均衡器，还有更多！
---

<p><img src='/home-assistant/images/blog/2025-03-music-assistant/art.jpg' alt="Music Assistants next big hit" class='no-shadow' /></p>

在过去几个月里，[Music Assistant](https://www.music-assistant.io/) 凭借新功能、更高稳定性，以及不断壮大的贡献者阵容，一直在持续进化。如果你[还不了解 Music Assistant](/home-assistant/blog/2024/05/09/music-assistant-2/#what-is-music-assistant)，它可以把主流音频流媒体服务和本地文件中的媒体库整合到一起，并让你在最流行的智能音箱上播放。自从[我们上次更新](/home-assistant/blog/2024/05/09/music-assistant-2/)以来，Music Assistant 已经历了几次重大发布，而最近这个 2.4 版本也许就是它的“白金唱片” 💿，带来了大量新功能。如果你错过了最近几次更新，下面就是最值得关注的新增内容。

**目录**
- [为 Assist 优化](#say-my-name)
- [外部音频与 Spotify Connect](#across-the-universe)
- [播客与有声书](#radio-ga-ga)
- [更多播放器与提供商](#new-sensation)
- [均衡器控制与功能](#all-about-that-bass)
- [Home Assistant 改进](#master-of-puppets)
- [更稳定的流式播放](#d-d-dont-dont-stop-the-beat)
- [今天就用上 Music Assistant 2.4！](#drop-it-like-its-hot)

<!--more-->

### "Say My Name"
<h4 style="margin-top: -1em; opacity: .67;">为 Assist 优化</h4>
<p class="img"><img src='/home-assistant/images/blog/2025-03-music-assistant/voice_ma.jpg' alt="audiobooks page"/>我们本来应该把它叫做 Hi-Fi 版</p>

最近这个版本为 [Assist](/home-assistant/voice_control/) 设备，比如 [Home Assistant Voice Preview Edition](/home-assistant/voice-pe/)，带来了很棒的进展。我们一直在与 [ESPHome](https://esphome.io/) 团队紧密合作，以确保音频流式播放体验尽可能优秀，这也让 Assist 设备变成了非常能打的媒体播放器。社区甚至还加入了一些很棒的功能，让你可以[通过语音完整控制媒体播放器](https://github.com/music-assistant/voice-support)，包括选择歌曲、艺术家等。Voice Preview Edition 配备了高质量 DAC，可以通过 3.5mm 接口提供非常干净的音频输出，让你向连接的音箱串流无损音频（这台 59 美元的设备，某种程度上甚至让我那些昂贵的 Hi-Fi 设备相形见绌！）。

### "Across the Universe"
<h4 style="margin-top: -1em; opacity: .67;">外部音频与 Spotify Connect</h4>
<p class="img"><img src='/home-assistant/images/blog/2025-03-music-assistant/spotify_connect.jpg' alt="Spotify Connect on a Voice PE"/>Voice Preview Edition 上的 Spotify Connect</p>

最新版本中的另一项功能是支持“外部音频源”，这类音源既可以由播放器本身提供（源控制），也可以通过插件提供。首个实现这项能力的插件是 Spotify Connect。这是让 Spotify 与 Music Assistant 配合使用最简单的方式，而且可以在任何播放器上启用。这样一来，任何受 Music Assistant 支持的设备，也就变成了支持 Spotify Connect 的设备（可以确认，Voice Preview Edition 在这方面表现非常棒）。[开始使用](https://www.music-assistant.io/plugins/spotify-connect/)的方法是进入 Music Assistant 设置，添加 Spotify Connect 插件，选择你希望它使用的设备，然后你就会在 Spotify 中看到这个设备作为一个播放器。只要注意，Spotify Connect 需要 Premium 账号才能使用。

我们也计划在未来加入更多类似插件（AirPlay，谁不想要呢？）。我们还在努力让整个设置流程变得更简单，尤其是对于使用 Voice Preview Edition 的人来说，他们可能不需要 Music Assistant 的全部功能，但仍希望拥有这种简单的投放能力。

### "Radio Ga Ga"
<h4 style="margin-top: -1em; opacity: .67;">播客与有声书</h4>

<p class="img"><img src='/home-assistant/images/blog/2025-03-music-assistant/audiobooks.png' alt="audiobooks page"/>整本书的进度会被记录下来，章节也会清晰展示</p>

你的媒体库现在更丰富了！Music Assistant 现在原生支持播客和有声书。播客方面，新增了多个提供商，包括 [Subsonic](https://www.music-assistant.io/music-providers/subsonic/)、[YouTube](https://www.music-assistant.io/music-providers/youtube-music/) 和 [RSS feed](https://www.music-assistant.io/music-providers/podcastfeed/)。有声书则可通过两个全新提供商加入：[Audible](https://www.music-assistant.io/music-providers/audible/) 和 [Audiobookshelf](https://www.music-assistant.io/music-providers/audiobookshelf/)，也可以直接从本地文件导入。有声书播放会把整本书显示为一条统一的进度条，并用点标出每一章的位置（即使一本书分散在多个文件中也是如此），方便你真正掌握自己的收听进度。整个核心也已调整，以便更好地记录你在任何媒体中的进度，因此你总能从上次停下来的地方继续播放。

<p class="img"><img src='/home-assistant/images/blog/2025-03-music-assistant/continue.png' alt="Continue listening section"/>首页上的“继续收听”部分会带你回到上次中断的位置</p>

### "New Sensation"
<h4 style="margin-top: -1em; opacity: .67;">更多播放器与提供商</h4>

就在上一篇博客发布后不久，我们加入了 [Apple Music](https://www.music-assistant.io/music-providers/apple-music/) 支持，这是评论区里呼声最高的新增功能之一。我们也加入了其他几个新提供商，包括 [iBroadcast](https://www.music-assistant.io/music-providers/ibroadcast/) 和 [SiriusXM](https://www.music-assistant.io/music-providers/siriusxm/)。在硬件支持方面，我们新增了对 [Bluesound](https://www.music-assistant.io/player-support/bluesound/) 播放器的支持。如果你有特别喜欢的提供商或播放器，并希望它出现在 Music Assistant 中，可以去[提交需求](https://github.com/orgs/music-assistant/discussions?discussions_q=sort%3Atop)——或者更进一步，[加入我们一起开发它](https://github.com/music-assistant/server)！

### "All About That Bass"
<h4 style="margin-top: -1em; opacity: .67;">均衡器控制与功能</h4>

<p class="img"><img src='/home-assistant/images/blog/2025-03-music-assistant/eq.png' alt="PEQ page"/>为你的音箱打造自己的 EQ 设置，或导入现成预设</p>

当我们发布 2.0 时，设备只有基础的低音和高音控制，但随着新的[可配置 DSP](https://www.music-assistant.io/audiopipeline/)（数字信号处理器）上线，你现在可以以前所未有的方式精细调校音频。这包括输入和输出增益，以及强大的[参数均衡器](https://www.music-assistant.io/dsp/parametriceq/)，而且可以按播放器分别应用 📈。你还可以点击音质指示图标，方便地查看完整音频处理链。

<p><img src='/home-assistant/images/blog/2025-03-music-assistant/audio_path.png' alt="Music Assistants next big hit" class='no-shadow' /></p>

另一个实用新增功能是“[别让音乐停下](https://www.music-assistant.io/usage/#:~:text=Don%27t%20Stop%20The%20Music%20(DSTM))”模式，它会在播放队列结束后继续从你的媒体库中挑选相似歌曲播放。还有另一种让音乐不停的方法，那就是使用许多主流操作系统内置的锁屏和小组件控制，它们现在也可以控制 Music Assistant 了。

### "Master of Puppets"
<h4 style="margin-top: -1em; opacity: .67;">Home Assistant 改进</h4>

Home Assistant 从一开始就是为了与 Music Assistant 无缝配合而设计的，而且这种体验还在持续变好。在 [Home Assistant 2024.12 发布](/home-assistant/blog/2024/12/04/release-202412/#new-integrations) 中，我们送给社区一份圣诞礼物——Music Assistant 从 HACS 迁移为原生集成（[如果你还没迁移，请尽快完成](https://www.music-assistant.io/integrations/migrate/)）。

现在，很多人会先把所有播放器添加到 Music Assistant 中，再把 Music Assistant 集成进 Home Assistant，这样就不需要逐个单独添加设备。最近这个版本还增加了把任何播放器控制（包括音量和开关机）委托给 Home Assistant 实体的能力。两者配合还有其他好处，比如 Music Assistant 可以在公告后[恢复音频播放](https://www.music-assistant.io/integrations/announcements/)，或者使用 Assist 来查找并播放歌曲（[无论是否结合 LLM](https://github.com/music-assistant/voice-support)）。

### "D-D-Don't Don't Stop the Beat"
<h4 style="margin-top: -1em; opacity: .67;">更稳定的流式播放</h4>

每次发布最重要的目标之一，就是提升所有提供商和播放器上的流式播放稳定性。随着每个版本推进，我们都在持续改进稳定性，而自上一篇文章以来，也有大量新用户加入，他们帮助我们发现并修复了不少问题。几乎所有提供商都在稳定性、速度和质量方面获得了提升。就在接下来的补丁版本 2.4.3 中，我们还改进了较慢网络连接下的流媒体性能。目标很简单：让音乐永不停歇。

## "Praise You" - 🙏

非常感谢每一位为这个版本做出贡献的人——无论是代码、测试，还是反馈。正是有了你们的支持，Music Assistant 才能持续进化，成为你在各类播放器上管理音乐的终极工具。

## "Drop It Like It's Hot"
<h3 style="margin-top: -1em; opacity: .67;">今天就用上 Music Assistant 2.4！</h3>

如果你还没有更新，现在正是时候！如果你还没开始使用，也可以把 Music Assistant 安装为 Home Assistant 附加组件，

[<img src='https://my.home-assistant.io/badges/supervisor_addon.svg' style='border: 0;box-shadow: none;' alt="!Open your Home Assistant instance and show the 仪表盘 of an add-on.">](https://my.home-assistant.io/redirect/supervisor_addon/?addon=d5369777_music_assistant)

想进一步了解如何开始使用 Music Assistant，可以阅读[文档](https://www.music-assistant.io/installation/)。

如果你有反馈，或者想参与贡献，欢迎加入我们不断壮大的 GitHub 和 Discord 社区！

祝你听得开心！
