---
title: 移除 MyQ 集成
description: '简而言之： MyQ 集成将于 2023 年 12 月 6 日随 Home Assistant 2023.12 版本一同移除。MyQ 的所有者 Chamberlain Group 已公开表示，他们会继续阻止 MyQ 集成这类第三方应用访问。对于当前的 MyQ 用户，我们推荐使用 ratgdo。'
---
# 移除 MyQ 集成

**简而言之：** MyQ 集成将于 2023 年 12 月 6 日随 Home Assistant 2023.12 版本一同移除。MyQ 的所有者 Chamberlain Group 已公开表示，他们会继续阻止 MyQ 集成这类第三方应用访问。对于当前的 MyQ 用户，我们推荐使用 [ratgdo]，这是一种可直接连接到你的 MyQ 车库门开门器并支持本地控制的设备。

如果你拥有 Chamberlain 或 Liftmaster 的车库门开门器，那你大概率对 MyQ 并不陌生。它是 Chamberlain Group 旗下的云端智能家居品牌，最知名的产品就是智能车库设备。对于 Home Assistant 用户来说，MyQ 也是目前问题最多的集成之一。过去几个月里，MyQ 车库门开门器集成一直处于[不断修补](https://community.home-assistant.io/t/the-current-state-of-myq-from-the-codeowner/630623)的状态：坏掉、修复、再坏掉。其直接原因就是 MyQ 持续采取措施，阻止第三方访问。

<!--more-->
上个月，Chamberlain Group 的 CTO Dan Phillips 针对此事发布了一则[声明](https://chamberlaingroup.com/press/a-message-about-our-decision-to-prevent-unauthorized-usage-of-myq)：

> Chamberlain Group 最近决定阻止第三方应用对我们 myQ 生态系统的未授权使用。做出这一决定，是为了让我们能够继续为超过 1000 万用户以及信任我们的授权合作伙伴提供尽可能好的体验。我们理解这会影响一小部分用户，但从长远来看，这将提升 myQ 的性能和可靠性，并让所有用户受益。

这里所说的 _“未授权使用”_，显然指的是 2017 年 2 月加入 Home Assistant 的 MyQ 集成。我们已经通过多种方式联系 Chamberlain Group，希望双方能达成共识，但始终没有收到正式回复。我们只能认为，Chamberlain Group 已经做出了决定，并将强迫客户只能使用 MyQ 官方应用，或其授权合作伙伴的应用。

你也许会想，Home Assistant 能不能成为他们的授权合作伙伴？在他们的合作伙伴计划里，合作公司需要向 Chamberlain Group 支付费用，才有资格让 MyQ 用户控制自己的车库门。我们愿意与 Chamberlain Group 合作，但 Home Assistant 是一个开源项目，我们无法支付这种合作费用。这不仅在财务上不可行，也违背了我们的价值观。MyQ 用户应当能够以任何自己想要的方式，访问自己花钱买来的设备和自己拥有的数据，而不应该要求某个第三方再额外付费。

因此，正如 MyQ 集成维护者 [Lash-L](https://github.com/Lash-L) 所说：

> 我们正在和 MyQ 玩一场猫鼠游戏，而现在看来，猫赢了。

一旦一家公司决定与自己的客户为敌，我们唯一能赢的方法，就是彻底不参与这场游戏。不要购买那些如此对待客户的公司的产品或服务。也请告诉你的朋友，不要和这种公司打交道。请选择那些能在本地运行、不会因为管理层想增加收入而突然失效的产品。

如果 Chamberlain Group 继续阻止第三方访问，我们就无法继续绕过这些限制，因此 MyQ 集成将于 2023 年 12 月 6 日发布的 Home Assistant 2023.12 中被移除。事情走到这一步，我们感到非常失望，也真诚希望 Chamberlain Group 愿意重新考虑自己的立场。如果 Chamberlain Group 愿意为了他们客户的利益与我们合作，我们也非常乐意欢迎这个集成重新回归。

目前，如果你是 MyQ 用户，那恐怕你就是 Chamberlain Group 不愿服务的那“一小部分用户”。我们建议购买 [ratgdo]。

Ratgdo 是一个完全本地、基于 ESPHome 的解决方案，兼容 MyQ 的 security+ 协议，只需连接三根线就可以安装到现有 MyQ 系统上。它提供与 MyQ 相同的车库门控制能力，甚至还增加了 MyQ 没有的功能，比如运动事件、灯光控制，以及禁用有线遥控器。

[ratgdo]: https://paulwieland.github.io/ratgdo/
