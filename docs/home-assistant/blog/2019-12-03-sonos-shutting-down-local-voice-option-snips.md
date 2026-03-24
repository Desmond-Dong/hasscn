---
title: Sonos 关闭本地语音方案 Snips
description: 收购 Snips 后，Sonos 决定关闭本地语音控制的构建入口。
---

又到了一年中的这个时间：外面很冷，屋里温暖，大家和家人朋友共度时光，同时也是一些大公司放弃本地可访问技术的时候（[2015](/home-assistant/blog/2015/12/12/philips-hue-blocks-3rd-party-bulbs/)、[2018](/home-assistant/blog/2018/12/17/logitech-harmony-removes-local-api/)）。

2019 年 11 月 20 日，Sonos [宣布](https://investors.sonos.com/news-and-events/investor-news/latest-news/2019/Sonos-Announces-Acquisition-of-Snips/default.aspx)其在当月早些时候收购了 Snips。Snips 曾是很多人在家中实现本地语音控制的热门方案。

在收购发生的同一个月，Snips 宣布将关闭面向用户的控制台。这个控制台允许用户使用自定义句子和意图来训练系统。关闭后，你将无法再对本地 Snips 系统做任何修改。

<p class='img'>
  <img src='/home-assistant/images/blog/2019-12-sonos-shutting-down-snips/snips-post-1.png' alt='Screenshot of the post to announce shutting it down.'>
  来自 <a href="https://forum.snips.ai/t/important-message-regarding-the-snips-console/4145">Snips 论坛</a> 的公告。
</p>

更糟的是，看起来他们并非完全关闭控制台，而是仅关闭了公开访问。他们有能力继续支持用户，却选择不这么做。而且他们后来还编辑了论坛公告，似乎不希望大家注意到这一点。

<p class='img'>
  <img src='/home-assistant/images/blog/2019-12-sonos-shutting-down-snips/post-history-screenshot.png' alt='Edit history shows they removed the word public access.'>
  公告编辑历史显示，他们删除了 “public access to” 这几个词。
</p>

由 Snips 驱动的语音控制，也许会出现在未来的 Sonos 设备中。但 Sonos 本身并不对很多人友好。根据 Sonos CEO Patrick Spence 在接受 [Variety 采访](https://variety.com/2019/digital/news/sonos-snips-acquisition-q4-2019-earnings-1203410771/)时的说法，自定义能力也会消失：

<blockquote>
“我们并不是在打造一个‘什么都能问’的助手，”Spence 说道。“这次收购的目标，是做一个更聚焦音乐场景的产品。”
</blockquote>

## Sonos 的糟糕决定

这是 Sonos 的一个糟糕决定。这不是 Sonos 对 Google 对 Amazon 的三方竞争，也不只是智能音箱之争，而是关于我们家中音频系统是否可以本地运行、是否具备隐私。

Snips 被拿掉后，本地语音控制就少了一个选项。这些用户接下来会寻找替代方案，而其中很可能包含云端方案。

技术领域常常走向“赢家通吃”。Sonos 这次又一次在客观上帮了竞争对手，[再次如此](https://jpmens.net/2018/09/11/upset-at-sonos/)。

## 本地化家庭真正需要什么

音频是家庭体验中的关键部分。我们希望播放音乐、接收事件提醒（比如门铃），并能用语音控制设备。要做到这一点，系统就应该本地运行，并提供开放 API。

Sonos 本可以成为这样的系统。他们有出色且协同良好的硬件，但他们把 API 控制得过于封闭，使用户无法在其之上进行构建。

这其实是一个选择题。他们可以继续向公众开放 Snips 控制台，开放现代本地 API，并拥抱重视本地控制的社区。但他们选择了相反的方向。

所以 Sonos，你们为什么要这样做？
