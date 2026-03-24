---
title: The future of YAML
description: A blog post answering the 'Is YAML going away?' question.
---

最近，社区里出现了不少评论和提问，讨论的是：越来越多集成开始支持通过前端配置，同时其中一些集成也移除了 YAML 支持。

这引发了很多疑问和观点，而这些都值得被正面回应。归根结底，大家最关心的是一个问题：

> _“Is YAML going away?”_

这个问题的答案是：_“**不会！**，但是……”_

我知道你可能不会喜欢这样带转折的回答，也许你更希望看到一个直接、明确、简单的“不会”。但现实情况确实要复杂一些。

这篇博文的目的，就是把这个问题讲得更清楚一些，让大家理解为什么事情会发展成现在这样，以及未来 Home Assistant 的配置方式会走向哪里。

## 通过 UI 启用配置

在讨论 YAML 之前，我们先来解释一下，为什么要引入这些 UI 配置功能。

过去几年里，Home Assistant 项目以惊人的速度增长。作为少数几个既能提供本地化家庭自动化平台、又把隐私放在优先位置的方案之一，它吸引了世界各地各种背景的用户关注。

在最初，Home Assistant 只是一个面向开发者和技术用户的小项目。随着大家对隐私的关注不断提升，以及家中 IoT 设备越来越普及，这个项目逐渐获得更广泛的关注，也吸引了大量并非技术型背景的新社区成员。

这当然是件好事，但也意味着我们必须做出调整，让它真正变得人人可用。我们希望每个人都能享受到我们一直以来所享受的乐趣，而不受经验水平限制。

基于这一点，让用户能够通过界面来管理自己的 Home Assistant 实例，就变得非常必要。这不仅是为了照顾技术经验较少的用户，因为这种方式本身也更方便，就连很多技术能力较强的用户也同样喜欢并偏好这种体验。

目标：_**让一切更简单。**_

而“让事情更简单”就是我们当前最重要的方向。

## 不向后兼容的变更

我们都不喜欢它们：每次新版本发布时那些不向后兼容的变更。每个人在看发布说明时，几乎都会先确认自己有没有被这些改动波及。

而通过 UI 配置的一个巨大优势就在于：这部分配置由 Home Assistant 替你管理，并负责处理升级与迁移。这样就几乎消除了踩到破坏性变更的可能，而这恰恰是大家都最讨厌的事情之一。

## 可分享性与安全性

This is a screenshot of one of the slides,
[showed during the 状态 of the Union 2019][yt]:

<p class='img'>
<img
  src='/home-assistant/images/blog/2020-04-14-the-future-of-yaml/sharing.png'
  alt='Presentation slide showed during the 状态 of the Union 2019'>
  Presentation slide showed during the 状态 of the Union 2019.
</p>

我们都喜欢分享自己的使用经验，也因此会分享部分配置。GitHub 上有[大量仓库][gh]，里面公开着人们家中的 Home Assistant 配置。

这很好！大家可以彼此交流思路，互相启发。

但这件事也有明显的另一面，那就是隐私与安全。很多内容其实并不适合公开分享，比如密码、敏感的个人信息，或者历史数据。

再举一个稍微技术一点的例子：有些集成使用 OAuth2 作为认证方式来接入像 Somfy 这样的服务，这种情况下甚至不需要存储用户名和密码。

## YAML 与 UI 并存

Home Assistant 正在朝着“YAML 配置”和“UI 配置”更清晰分离的方向前进。这一点已经在区域、Lovelace，以及最近引入的“助手”（也就是 YAML 中的 `input_*` 集成）上有所体现。

区域既可以通过 UI 配置，也可以通过 YAML 配置（甚至可以同时使用！）。Home Assistant 会同时加载这两种来源中的区域配置，而且两边的内容都可以在不重启 Home Assistant 的情况下动态修改。

未来，Home Assistant 会越来越多地采用这种模式。这样每个人都可以选择自己更喜欢的配置方式。

在这些场景下，YAML 支持其实是被扩展和增强了，比如加入了重新加载等能力，同时也移除了那些会干扰你 YAML 文件的部分。

## 我们仍然是一个开源项目

Home Assistant 是一个开源项目。它依赖贡献者不断加入精彩的集成、维护这些集成，并持续扩展它们的能力，让系统变得更强大。

这些贡献者都是利用自己的业余时间在做这些事情，我们所有人都应该对此心怀感激。正是他们的工作，才让 Home Assistant 能拥有今天的能力，也正是这些能力在帮你实现家庭自动化。

那么，那些移除了 YAML 支持的集成又该怎么看？

有些贡献者决定移除 YAML 支持，以减少自己的维护和支持负担。要同时维护两套能力，所需投入的精力可能会非常高，而且复杂度也不低。对此我们必须理解并接受，否则贡献者完全可能选择停止维护。

不幸的是，这类变动会带来不向后兼容的问题，也常常引来一些非常打击人的评论，不仅指向具体贡献者，也指向整个项目。这对所有人都没有好处，因为它会让贡献者失去动力，甚至更糟——不再愿意实现新功能，或者不敢再推动必要的破坏性调整。

这会阻碍项目目标推进，拖慢创新速度，也会增加失去贡献者和维护者的风险。最终，受损的会是所有人。

## YAML 的未来

在有了上面的背景之后，我们再回到核心问题：YAML 的未来到底是什么？

As of today, [ADR-0010][adr] (Architectural Decision Record) has been approved
that 状态:

- Any new 集成 that communicates with 设备 and/or 服务, must use
  配置 via the UI. 配置 via YAML is only allowed in very rare
  cases, which will be determined on a case by case basis.
- Existing 集成 that communicate with 设备 and/or 服务, are
  allowed and encouraged to implement 配置 via the UI
  and remove YAML support.
- We will no longer accept any changes to the YAML 配置 for existing
  集成 that communicate with 设备 and/or 服务.

那么，最终还有哪些内容会继续保留 YAML 支持？

All other 集成 that do not communicate with a 设备 and/or 服务,
are configured via YAML or via Storage Collections (these enable both YAML and
UI capabilities used by, e.g., Lovelace and 区域).
Examples of these other 集成:

- 集成 that integrate transports. These 集成 allow 用户 to
  define their own protocol, e.g., MQTT, serial, GPIO.
- 集成 that process Home Assistant data and make this available to
  other 集成, e.g., 模板, stats, derivative, utility meter.
- 集成 that provide 自动化, e.g., 自动化,
  device_sun_light_trigger, alert.
- 集成 that help controlling 设备 and 服务, e.g., 脚本, 场景.
- 集成 that expose Home Assistant data to other 服务, e.g.,
  Google Assistant, HomeKit.

这个 ADR 的目的，就是消除大家的困惑和疑问。它建立在我们已经提出的目标之上（也就是在 State of the Union 中讲过的方向），同时也为贡献者提供了明确的工作准则。它让整件事变得更清晰了。

## 常见误解澄清

In the raised concerns and comments across the community, some comments have
been found multiple times. Please note, these are not exact quotes, as we don’t
want to address anybody personally.

- _“Making 备份 became harder!”_

  Using the Home Assistant snapshot feature, this is not an issue. However,
  if you do manual 备份 on a system that runs just 核心, you need to make
  sure to back up the `.storage` folder as well
  (which hopefully you're already doing). Otherwise, there is no difference.

- _“It is harder to test my 配置 if 集成 does not support YAML”._

  YAML 配置 testing is often done to see if a specific YAML
  配置 is still valid against (newer versions of) Home Assistant.
  With 集成 set up via the UI, this is not a concern,
  since Home Assistant ensures the data structure is compatible between
  versions and migrates it for you.

- _“I like to use a private git repository where I store all my data in,
  including my sensitive data, since it is not public.
  Without YAML this is not possible.”_

  This is actually not true, the `.storage` folder contains all Home Assistant
  managed 配置 files in JSON format, which in those cases,
  can be stored and versioned in a git repository.

## YAML 会消失吗？

**No**!

不会。至少对于那些适合公开分享的内容，它不会消失；对于当前仍无法通过 UI 提供的高级功能，它也依然会保留。我们的目标并不是淘汰 YAML，而是打造出世界上最好、同时又人人都能轻松使用的家庭自动化平台。让不同经验层次的用户都能享受这项共同热爱的爱好，并把精力放在最重要的事情上：自动化我们的家。

最后附上 State of the Union 2019 的 YouTube 录播，已从相关讨论的时间点开始：

<div class='videoWrapper'>
  <iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/tc17q1Zn0Xs?start=1809&end=2030"
    frameborder="0"
    allowfullscreen
    ></iframe>
</div>

## Home Assistant Podcast 特别节目

Home Assistant Podcast 也推出了一期特别节目。
在这一期中，[Phil][phil] 和 [Rohan][rohan] 与 [Paulus][balloob]
一起聊了这篇博文中公布的这些变化。

[点击这里收听 Podcast][podcast]

[adr]: https://github.com/home-assistant/architecture/blob/master/adr/0010-integrations-configuration.md
[balloob]: https://twitter.com/balloob
[gh]: https://github.com/topics/home-assistant-config
[phil]: https://twitter.com/philhawthorne
[podcast]: https://hasspodcast.io/x001/
[rohan]: https://twitter.com/rohank9
[yt]: https://youtu.be/tc17q1Zn0Xs?t=1809
