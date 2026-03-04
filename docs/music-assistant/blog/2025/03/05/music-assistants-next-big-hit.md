---
title: "Music Assistant 的下一个大热门"
description: "Spotify Connect、Assist 流媒体、播客、有声读物、Apple Music、完整 EQ 等等！"
---

在过去的几个月里，[Music Assistant](https://www.music-assistant.io/) 一直在完美演绎新功能、更高的稳定性和越来越多的贡献者，他们不断推动项目向前发展。如果您[不熟悉 Music Assistant](/music-assistant/blog/2024/05/09/music-assistant-2/#what-is-music-assistant)，它允许您合并来自主要音频流媒体提供商和本地文件的库，让您在最流行的智能扬声器上播放它们。自我们[上次更新](/music-assistant/blog/2024/05/09/music-assistant-2/)以来，Music Assistant 有几个大版本发布，但我们最近的版本可能是我们的白金唱片 💿，2.4 版本带来了许多新功能。如果您错过了最近的几次更新，以下是最大的新增内容。

**目录**
- [为 Assist 优化](#say-my-name)
- [外部音频和 Spotify Connect](#across-the-universe)
- [播客和有声读物](#radio-ga-ga)
- [更多播放器和提供商](#new-sensation)
- [均衡器控制和功能](#all-about-that-bass)
- [Home Assistant 改进](#master-of-puppets)
- [更稳定的流媒体](#d-d-dont-dont-stop-the-beat)
- [获取 Music Assistant 2.4！](#drop-it-like-its-hot)

<!--more-->

### "Say My Name"
<h4 style="margin-top: -0.25em; opacity: .67;">为 Assist 优化</h4>
<p class="img"><img src='/images/blog/2025/03/05/music-assistants-next-big-hit/voice_ma.jpg' alt="audiobooks page"/>我们应该称之为 Hi-Fi 版</p>

最近的版本对 [Assist](https://www.home-assistant.io/voice_control/) 设备（如 [Home Assistant Voice Preview Edition](https://www.home-assistant.io/voice-pe/)）有一些重大改进。我们一直与 [ESPHome](https://esphome.io/) 团队密切合作，确保最佳的音频流体验，这帮助使 Assist 设备成为非常有能力的媒体播放器。社区甚至添加了一些很棒的功能来完全[用语音控制您的媒体播放器](https://github.com/music-assistant/voice-support)，包括选择歌曲、艺术家等。Voice Preview Edition 具有高质量的 DAC，可从其 3.5mm 插孔提供非常干净的音频播放，允许您将无损音频流式传输到连接的扬声器（这款 59 美元的设备让我一些昂贵的高保真设备黯然失色！）。

### "Across the Universe"
<h4 style="margin-top: -0.25em; opacity: .67;">外部音频和 Spotify Connect</h4>
<p class="img"><img src='/images/blog/2025/03/05/music-assistants-next-big-hit/spotify_connect.jpg' alt="Spotify Connect on a Voice PE"/>Voice Preview Edition 上的 Spotify Connect</p>

最新版本的另一个功能是支持"外部音频源"，可以由播放器本身（源控制）或插件提供。第一个提供此功能的插件是 Spotify Connect。这是在 Music Assistant 中使用 Spotify 的最简单方法，可以在任何播放器上启用。这使得任何 Music Assistant 支持的设备都成为 Spotify Connect 支持的设备（可以确认，Voice Preview Edition 非常适合这个）。[开始使用](https://www.music-assistant.io/plugins/spotify-connect/)请转到 Music Assistant 设置，添加 Spotify Connect 插件，选择您希望它使用的设备，在 Spotify 中您将看到该设备作为播放器。请注意，Spotify Connect 需要 Premium 帐户才能工作。

我们的目标是在未来添加更多这样的插件（AirPlay，有人吗？）。我们也在努力使整个设置过程变得超级简单，特别是对于那些使用 Voice Preview Edition 的用户，他们可能不需要每一个 Music Assistant 功能，但仍然想要这种简单的投射功能。

### "Radio Ga Ga"
<h4 style="margin-top: -0.25em; opacity: .67;">播客和有声读物</h4>

<p class="img"><img src='/images/blog/2025/03/05/music-assistants-next-big-hit/audiobooks.png' alt="audiobooks page"/>整本书的进度被跟踪，章节清晰显示</p>

您的库变得更大了！Music Assistant 现在原生支持播客和有声读物。对于播客，添加了多个提供商，包括 [Subsonic](https://www.music-assistant.io/music-providers/subsonic/)、[YouTube](https://www.music-assistant.io/music-providers/youtube-music/) 和 [RSS feeds](https://www.music-assistant.io/music-providers/podcastfeed/)。有声读物可以通过两个全新的提供商添加：[Audible](https://www.music-assistant.io/music-providers/audible/) 和 [Audiobookshelf](https://www.music-assistant.io/music-providers/audiobookshelf/)，或直接从本地文件导入。有声读物播放将整本书显示为一个带有显示每个章节的圆点的条（即使书被分成多个文件），让您真正跟踪进度。整个核心已调整以更好地跟踪您在任何媒体中的进度，因此您将始终从离开的地方继续。

<p class="img"><img src='/images/blog/2025/03/05/music-assistants-next-big-hit/continue.png' alt="Continue listening section"/>主页上的"继续收听"部分带您回到离开的地方</p>

### "New Sensation"
<h4 style="margin-top: -0.25em; opacity: .67;">更多播放器和提供商</h4>

在我们上篇博文后不久，我们添加了对 [Apple Music](https://www.music-assistant.io/music-providers/apple-music/) 的支持，这是评论中最受要求的添加之一。还添加了其他几个新提供商，包括 [iBroadcast](https://www.music-assistant.io/music-providers/ibroadcast/) 和 [SiriusXM](https://www.music-assistant.io/music-providers/siriusxm/)。对于新硬件支持，我们添加了对 [Bluesound](https://www.music-assistant.io/player-support/bluesound/) 播放器的支持。如果您有一个您喜欢的提供商或播放器并希望在 Music Assistant 中看到它，[请求它](https://github.com/orgs/music-assistant/discussions?discussions_q=sort%3Atop)---或者更好的是[加入我们一起开发它](https://github.com/music-assistant/server)！

### "All About That Bass"
<h4 style="margin-top: -0.25em; opacity: .67;">均衡器控制和功能</h4>

<p class="img"><img src='/images/blog/2025/03/05/music-assistants-next-big-hit/eq.png' alt="PEQ page"/>制作您自己的 EQ 设置或导入为您扬声器预制的设置</p>

当我们发布 2.0 时，设备有基本的低音和高音控制，但通过我们新的[可配置 DSP](https://www.music-assistant.io/audiopipeline/)（数字信号处理器），您现在可以像从未有过那样微调您的音频。这包括输入和输出增益，以及可以应用于每个播放器的强大[参数均衡器](https://www.music-assistant.io/dsp/parametriceq/) 📈。您可以通过单击质量指示器图标方便地查看整个音频管道。

<p><img src='/images/blog/2025/03/05/music-assistants-next-big-hit/audio_path.png' alt="Music Assistants next big hit" class='no-shadow' /></p>

另一个添加的有用功能是"[不要停止音乐](https://www.music-assistant.io/usage/#:~:text=Don%27t%20Stop%20The%20Music%20(DSTM))"模式，即使队列完成后也能保持音乐播放，从您的库中播放相似的歌曲。另一种保持音乐播放的方式是通过许多流行操作系统中内置的锁屏和小部件控制，现在可以控制 Music Assistant。

### "Master of Puppets"
<h4 style="margin-top: -0.25em; opacity: .67;">Home Assistant 改进</h4>

Home Assistant 一直设计为与 Music Assistant 无缝协作，而且只会变得更好。在 [Home Assistant 2024.12 版本](https://www.home-assistant.io/blog/2024/12/04/release-202412/#new-integrations)中，我们给社区送了一份圣诞礼物——Music Assistant 从 HACS 移至成为原生集成（[如果您还没有，请迁移](https://www.music-assistant.io/integration/migrate/)）。

许多人现在先将所有播放器添加到 Music Assistant，然后将 Music Assistant 与 Home Assistant 集成，无需单独添加每个设备。最近的版本添加了将任何播放器控制（包括音量或开/关）外包给 Home Assistant 实体的能力。一起使用它们还有其他好处，比如 Music Assistant 在公告后[恢复音频播放](https://www.music-assistant.io/integration/announcements/)或使用 Assist 查找和播放歌曲（[有或没有 LLM](https://github.com/music-assistant/voice-support)）。

### "D-D-Don't Don't Stop the Beat"
<h4 style="margin-top: -0.25em; opacity: .67;">更稳定的流媒体</h4>

每个版本的最大目标之一是提高所有提供商和播放器的流媒体稳定性。每个版本我们都在提高稳定性，自上次帖子以来，我们迎来了大量新用户，他们一直在发现和帮助修复错误。几乎每个提供商都有不错的改进，帮助稳定性、速度和质量。就在下一个补丁版本 2.4.3 中，我们改进了较慢网络连接上的流媒体性能。目标是音乐永不停歇。

## "Praise You" - 🙏

非常感谢所有为这个版本做出贡献的人——无论是通过代码、测试还是反馈。您的支持使 Music Assistant 不断演变成管理您音乐的终极工具，在您的播放器上。

## "Drop It Like It's Hot"
<h3 style="margin-top: -0.25em; opacity: .67;">立即获取 Music Assistant 2.4！</h3>

如果您还没有更新，现在就是时候！如果您还没有使用它，您可以将 Music Assistant 安装为 Home Assistant 插件，

[<img src='https://my.home-assistant.io/badges/supervisor_addon.svg' style='border: 0;box-shadow: none;' alt="!Open your Home Assistant instance and show the dashboard of an add-on.">](https://my.home-assistant.io/redirect/supervisor_addon/?addon=d5369777_music_assistant)

有关 Music Assistant 入门的更多信息，[阅读文档](https://www.music-assistant.io/installation/)。

有反馈或想贡献？在 GitHub 和 Discord 上加入我们不断壮大的社区！

祝您聆听愉快！

