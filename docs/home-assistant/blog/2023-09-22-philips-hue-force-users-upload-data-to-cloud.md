---
title: '[10 月 2 日更新：数据共享将变为可选] Philips Hue 将强制用户把数据上传到 Hue 云端'
description: 想要控制你的灯光，你很快就必须创建账户，并与 Hue 云端共享你的数据。
---

**10 月 2 日更新：** 在与 [The Verge 的对话](https://www.theverge.com/2023/9/28/23892761/philips-hue-app-account-changes)中，Philips Hue 宣布他们将更新隐私政策，使与 Philips Hue 共享使用数据变为需要用户同意的可选项。

_原文发布如下_

今天要说的是 Signify 旗下的 Philips Hue。他们很快就会开始强制所有用户创建账户，并将用户数据上传到他们的云端。目前，Signify 表示你仍然可以像现在一样在本地控制你的 Hue 灯光，但我们不知道未来这是否会发生变化。而他们的隐私政策允许他们存储这些数据，并与合作伙伴共享。

上周我写过，当年摆弄第一代 Philips Hue 网关及其本地 API，是如何让我在 2013 年[开始打造 Home Assistant](/home-assistant/blog/2023/09/17/10-years-home-assistant/)的。它们在我的智能家居里一直扮演着重要角色，也曾是[我们 Open Home 愿景](/home-assistant/blog/2021/12/23/the-open-home/)的榜样。没错，它们价格不低，但一直很可靠，提供本地 API，可以完全离线使用，而且你也不需要把自己的数据共享到云端。

但事情正在变糟。现在，当你打开 Philips Hue 应用时，会看到一条新提示：_很快，你将必须登录。_

<p class='img'>
<img src='/home-assistant/images/blog/2023-09-hue-upload-user-data-cloud/hue-screenshot-account.png'>
左：新的提示告知用户很快需要登录。<br>
右：选择“了解更多”后显示的界面
</p>

<!--more-->
当你创建 Hue 账户后，就可以在离家时通过他们的移动应用控制你的灯光。这个功能之所以可行，是因为你的数据会被上传到 Hue 云端，从而让移动应用能够访问。根据他们的隐私政策，他们可以存储这些数据，并与合作伙伴共享。

创建 Hue 账户一直以来都是一个可选项，而且始终只是可选。许多 Home Assistant 用户之所以购买 Hue 设备，就是因为他们可以选择不创建账户，从而保持自己的隐私。

**所以，今天你仍然可以通过不创建账户来选择不与 Signify 共享你的信息。但这个选择很快就会被拿走，所有用户都将不得不与 Philips Hue 共享他们的数据。**

## 核实这条消息

我不想虚张声势，所以我决定向 Signify 核实上面的说法。遗憾的是，他们确认了：

<p class='img'>
<img src='/home-assistant/images/blog/2023-09-hue-upload-user-data-cloud/tweet-confirm-account.png'>
与 Philips Hue 的 Twitter 对话（来源：<a href='https://twitter.com/home_assistant/status/1704662981219348702'>Twitter</a>）
</p>

他们提到的政策，是他们的[隐私政策](https://www.philips-hue.com/en-us/support/legal/privacy-policy)（2023 年 4 月版本，[下载版本](https://www.philips-hue.com/en-us/support/legal/privacy-policy?origin=13_care-engagement-response_twitter_11374728903&linkId=236485638#versionhistory)）。其中写明，只要账户仍处于活跃状态，用户数据就会被存储，并且会与合作伙伴共享。我没有找到针对非活跃用户的数据政策。

> WHAT TYPES OF DATA DO WE COLLECT ABOUT YOU?
>
> [...]
>
> If you connect a product, this will form part of your Philips Hue Account.
>
> [...]
>
> HOW LONG DO WE KEEP YOUR DATA?
>
> [...]
>
> Do you have an account with us? In this case, we will keep your data while your account is active or for as long as needed to provide the product functionalities to you.

当被问到是什么推动了这项变更时，答案还是老一套：安全。可是 Signify，你知道什么能让用户数据更安全么？那就是别把这些数据统统上传到你们的云端。只要允许智能家居通过本地 API 或 Matter 与 Hue 通信就好了。

<p class='img'>
<img src='/home-assistant/images/blog/2023-09-hue-upload-user-data-cloud/hue-tweet-lie-security.png'>
来源：<a href='https://twitter.com/tweethue/status/1704590580355854398'>Twitter</a>
</p>

## 现在还不算太晚

目前，Philips Hue 只是在他们的应用里宣布这项变更，用户还没有被强制交出全部数据。我们已经私下联系过 Signify，希望让他们注意到这个问题，但他们尚未回应。

作为用户，我们鼓励你联系 [Signify 支持团队](https://www.philips-hue.com/en-us/support/contact-form)，表达你的担忧。

亲爱的 Signify，请重新考虑这个决定，不要继续推进。你们以前也曾经[撤回过错误决定](/home-assistant/blog/2015/12/12/philips-hue-blocks-3rd-party-bulbs/)。人们在乎隐私，强制账户制度会在长期内伤害品牌形象。这件事带来的代价，并不值得那一点收益。
