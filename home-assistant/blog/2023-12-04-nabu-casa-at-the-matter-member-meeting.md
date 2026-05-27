# Nabu Casa 参加 Matter 成员大会

一句话总结：我们在日内瓦的 Matter 成员大会上代表了 Home Assistant、我们的社区以及 Open Home 愿景。我们将在 1 月举办一场 Matter 直播，向你更新我们的进展并回答你的问题。欢迎在下方评论区留下你的问题！

两周前，我和 Marcel van der Veldt、Stefan Agner 一起前往日内瓦，在 Connectivity Standards Alliance（CSA，连接标准联盟）成员大会上代表 Home Assistant、我们的社区以及 Open Home 愿景。这是一场非常重要的会议，来自世界各地的公司会在这里讨论并决定 Matter 标准及其落地实施方式。

*(Matter 是一项新的智能家居标准，承诺让每个人的智能家居设备都能跨平台、跨生态系统互相协作，同时保持本地运行和隐私保护。它由 CSA 负责开发，而 CSA 也是 Zigbee 的负责组织。)*

<p class='img'>
<img src="/home-assistant/images/blog/2023-11-matter-member-meeting/matter-image.jpg">
Stefan 和 Marcel
</p>

我们之所以能够参加，是因为 [Nabu Casa](https://www.nabucasa.com) 是 CSA 的成员。这项费用来自你的 Home Assistant Cloud 订阅收入（谢谢你！）。加入 CSA，能确保我们获取官方技术文档和支持，从而把 Matter 更好地构建进 Home Assistant。它也让我们在 CSA 内部拥有发声权，可以用来为 Home Assistant 用户的利益以及我们的 Open Home 愿景发声。

<!--more-->

我们很喜欢参加这类活动，也喜欢听到遇见的人分享各种精彩故事。在与 CSA 中负责 Matter 的工程师交流时，我们发现其中很多人自己家里就运行着 Home Assistant，而且还是这个项目的热情支持者！与设备制造商交流后，我们也意识到，Home Assistant 正被当作测试平台使用，因为我们的 Matter 服务器最灵活。这是一件很棒的事，因为这会提高 Matter 设备在 Home Assistant 中良好运行的概率，毕竟这些设备已经在上面实现并测试过了。

我们参与 Matter 的开发，也意味着我们会定期与其他公司的工程师保持联系。当前市面上最受欢迎的 Matter 设备之一，Eve Energy Plug，带有自定义的能耗计量支持，而这项功能目前尚未被 Matter 标准正式支持。过去，你只能在 Eve 自家的应用中查看能耗数据。现在，我们已经与 Eve 合作，因此可以通过自定义 Matter 集群读取这些插座的测量数据，并在 Home Assistant 中展示出来！这项功能会在 Home Assistant 12 月版本中提供。如果你拥有 Eve Energy Plug，这就是我们送给你的提前圣诞礼物。

## Home Assistant 与 Matter

我们不只是加入了 CSA；我们还有专门的开发者在努力确保 Matter 成为 Home Assistant 中的一等公民。在我们看来，由于 Matter 协议具有本地运行的特性，它非常适合 Home Assistant 用户。我们的目标，是让 Home Assistant 成为一个在 CSA 注册并获得官方认证的 Matter 控制器。

为了进一步分享我们在 Matter 方面持续推进的进展，我们将在 1 月举办一场直播。直播会完整更新 Matter 的当前状态，并深入介绍我们的后续计划。具体日期我们会很快公布。

我们不希望这只是我们单方面聊 Matter 的一场直播。我们知道你对 Matter 有很多问题，也有很多地方还不够清楚，或者希望我们帮你理解。所以请在下方评论区留下你最想问的问题！
