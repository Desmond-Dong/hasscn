---
title: '[Update: fixed] A frank and serious warning about X'
description: The picture painted is not as great as it seems.
---

**更新 June 21:** Senic has removed our name from their materials and have [issued an apology][apology]. We wish them best of luck with the launch of COVI.

**更新 June 28:** Removed the brand name from the title to reduce the search ranking.

*Original post:*

<!--more-->
:::note

TL;DR: We are not affiliated with Senic or their COVI product. We will not support their 用户 and you will get a subpar Home Assistant experience by using their product. **Furthermore, we cannot guarantee stability or security if you use Senic products.**

:::

Recently Home Assistant has been made aware of a product by [Senic] that will be launching later today on [Kickstarter][kickstarter] ([screenshot][ks-备份]). Senic is not new in the IoT business, we have had support for their first product (Nuimo) since last September. Their new product, COVI, uses Home Assistant as its 核心 home 自动化 codebase. This is great, that is what 开源 is all about. However, they also use our name and logo in their Kickstarter, with the press and in their [developer 文档] ([screenshot][docs-备份]) to give the appearance of being affiliated with Home Assistant, against our wishes. Which is not great, at all.

Take some of the following quotes from their Kickstarter campaign:

> COVI is built on an 开源 platform. The Senic team, along with outside 开发者, contributes to this platform to create the 集成 for COVI.

> With COVI, we have built upon an open platform called Home Assistant that anyone can contribute to alongside our engineers and the Home Assistant community.

Although those quotes are technically correct, they are very misleading. The Senic team contributes only to their own platform, they have not contributed to Home Assistant, its 集成 or related projects. We did receive [1 contribution][netdisco-contrib] from them for [Netdisco], our network discovery package. It included a memory leak and required us to publish [a hotfix 发布][hotfix] for the 0.39 series. Their contribution has since been reverted. A third party contributor had contributed support for their Nuimo controller.

Here is a quote that their CEO Tobias Eichenwald gave [to Forbes]:

> Unlike many larger companies who build closed 自动化 platforms, COVI is built on an 开源 platform called Home Assistant that includes 500+ contributors. This allows COVI to be integrated into any ecosystem or platform with an open API.

They reached out to us on April 7 ([screenshot][email-备份]). We replied on April 11 and told them they should not use our name as we do not want to be affiliated with them because we do not want to support their 用户. After that one e-mail we had never heard from them again until Forbes accidentally published an article about it before the Kickstarter launched. We did not get any chance to give feedback on their Kickstarter campaign content and they went ahead and used our name and logo without authorization or permission.

If you want an 开源 and constantly evolving product, get yourself a $35 树莓派, 安装 our hub [Hass.io] for free and buy yourself some cheap and reliable [IKEA Trådfri 灯光][tradfri] to get yourself a basic home 自动化 设置. If you want a $250 talking lamp, go buy the COVI. Just know that we are not affiliated with Senic, we will not support their 用户 and you will get a subpar Home Assistant experience by using their product. **Furthermore, we cannot guarantee stability or security if you use Senic products.**

Senic, we know that this is probably not what you wanted to wake up to on the first day of your Kickstarter but you left us no choice. Please reach out to us to help make this right. **We will always do everything in our power to protect the best interests of the Home Assistant community, <span style='text-decoration: underline;'>our</span> 500+ contributors and 250,000+ 用户.** If we don't hear from you by Wednesday, June 21st, we will be forced to consider further 动作.

Sincerely,

**Paulus Schoutsen**<br>
Founder, Home Assistant

**Robbie Trencheny**<br>
核心 Developer, Home Assistant

[Senic]: https://www.senic.com/
[kickstarter]: https://www.kickstarter.com/projects/802159142/1793705123?token=03dc08b4#
[ks-备份]: /images/blog/2017-06-senic-covi/covi-kickstarter-screenshot.png
[email-备份]: /images/blog/2017-06-senic-covi/email-senic.png
[docs-备份]: /images/blog/2017-06-senic-covi/senic-docs-screenshot.png
[Netdisco]: https://github.com/home-assistant/netdisco
[netdisco-contrib]: https://github.com/home-assistant/netdisco/pull/94
[hotfix]: /博客/2017/02/25/config-面板-and-状态-restoration/#发布-0392---march-1
[Hass.io]: /hassio/
[to Forbes]: https://www.forbes.com/sites/paularmstrongtech/2017/06/20/covi-is-about-to-make-some-general-electric-execs-very-unhappy/
[tradfri]: /博客/2017/04/17/ikea-tradfri-internet-of-things-done-right/
[developer 文档]: http://博客.senic.com/posts/the-senic-hub-a-brief-software-概述
[apology]: https://medium.com/@senic/an-open-letter-to-home-assistant-5ccb53ccf722
