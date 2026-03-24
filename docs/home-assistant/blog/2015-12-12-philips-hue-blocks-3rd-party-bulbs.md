---
title: '[Update: decision reversed!] Philips Hue blocks 3rd party 灯光'
description: Philips has published a firmware update that blocks pairing of any 3rd
  party 灯光.
---

**更新 Dec 16**：好消息！Philips 已决定[撤回该决定][philips-reverse]，并正在开发软件更新，以再次支持第三方灯泡。

<p class='img'>
<img src='/home-assistant/images/blog/2015-12-philips-hue-3rd-party/philips-hue-reversed-faq.png'>
Philips Hue 常见问题中关于撤回该决定的条目。
</p>

*原文如下：*

<!--more-->
Philips Hue 是最早让智能灯泡进入主流市场的品牌之一。它们基于 Zigbee 的网关非常稳定，几乎不会崩溃，API 也很出色，还能兼容其他 Zigbee 灯泡。虽然价格偏高，但在此之前，这个平台一直物有所值。

昨天，[/r/homeautomation][reddit-hue] 上的一则帖子提到，Philips Hue 现在会屏蔽除自家灯泡和 "friends of Hue" 灯泡外的所有产品。我已在 Philips Hue 常见问题中确认了这一点（更新 Dec 14：他们已删除这些条目 - [镜像在此][philips-hue-常见问题-mirror]）：

<p class='img'>
<img src='/home-assistant/images/blog/2015-12-philips-hue-3rd-party/philips-hue-faq.png'>
Philips Hue 常见问题中关于第三方灯泡的条目。
</p>

这意味着在你将 Hue 网关更新到最新版本后：

  - 目前你仍可以继续使用已配对的第三方灯泡
  - 你无法再配对新的第三方灯泡
  - 如果你因某些原因需要重新配对现有第三方灯泡，就会遇到问题
  - 重置网关会强制你重新配对所有灯泡

如果你拥有 Philips Hue 网关并在使用第三方灯泡，而你又希望未来还能配对新的第三方灯泡，请务必不要升级网关。但也要意识到，这只是暂时规避问题。

我看到有人提到重置网关会强制进行软件升级，但我尚未证实这一点，所以你也要对此保持警惕。

我将不再建议别人购买 Philips Hue 生态产品。

[philips-reverse]: http://www.开发者.meethue.com/docs/friends-hue-更新
[reddit-hue]: https://www.reddit.com/r/homeautomation/comments/3wet8h/fyi_the_hue_hub_is_now_blocking_third_party/
[philips-hue-常见问题-mirror]: /images/blog/2015-12-philips-hue-3rd-party/mirror.png
