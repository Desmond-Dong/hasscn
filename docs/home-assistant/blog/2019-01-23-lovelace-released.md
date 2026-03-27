---
title: Lovelace UI released!
description: After 8 months of development, we're proud to release our brand new Lovelace
  UI.
---
# Lovelace UI released!

Today we're happy to announce that our new Lovelace UI, which has been in beta for the last 8 months, is becoming the new default interface of [Home Assistant 0.86](/home-assistant/blog/2019/01/23/release-86/). With Lovelace we're taking a new approach to building 用户 interfaces for Home Assistant. We're no longer storing the look and feel of your UI in your 配置.yaml, requiring restarts for changes. With Lovelace we're keeping the UI concerns in the UI<sup>1</sup>, unlocking a whole new set of features:

 - [24 卡片](/home-assistant/dashboards/alarm-panel/) to place and 配置 as you like.
 - UI Editor. A 配置 UI to manage your Lovelace UI including live preview when editing 卡片.
 - Fast. Using a static config allows us to build up the UI once.
 - Customizable.
   - 卡片 have numerous options to 配置 how your data is presented.
   - Themes; even at a per 卡片 basis.
   - Ability to override names and icons of 实体.
   - Custom 卡片 from our amazing community are fully supported.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/XY3R0xI45wA" frameborder="0" allowfullscreen></iframe>
</div>

In case you're reading this and want to give it a try right now: we've updated [the Home Assistant demo](https://demo.home-assistant.io). It now features multiple Lovelace 配置 examples. The demo is fully interactive, including the 配置 UI (accessible via the menu in the top right). You can also access it by updating to Home Assistant 0.86.

For a deep dive into all the new features, check out the [latest episode of the Home Assistant podcast](https://hasspodcast.io/ha042/), featuring an interview with [Zack Arnett][@zsarnett] from the Lovelace team.

For an 概述 of all the different features, check out the [Lovelace 文档](/home-assistant/dashboards/).

<sup>1</sup>: If you prefer to write your 仪表盘 config in YAML, Home Assistant also includes an optional [YAML mode](/home-assistant/dashboards/yaml-mode/).

## Migrating to Lovelace

You have to do… nothing! If not configured, Lovelace will use the same algorithm to built-up the UI as the old UI did.

## History

With Lovelace we've built a foundation that not only provides a lean and sleek interface, but will also allow us to add many new exciting features in the future. The main difference with the old UI is that we no longer store any UI concerns in the 状态 machine.

When Home Assistant was started, I came up with an algorithm that would automatically organize the available 实体 in badges, 卡片 and tabs; and then show that on the screen. 用户 demanded more influence; so over time, we've added a bunch of components and features of the 后端 whose main or sole purpose were to influence how the algorithm in the UI shows and organizes 实体.

As this kept growing, I realized that we were on the wrong path. It was impossible to get an algorithm that would fulfill all needs and the 后端 shouldn't be aware of anything in the 前端. It should just deliver the 实体 and the 前端 should figure out how to display things together with the 用户.

At the same time as this was happening, we also had some discussions about the development of the 前端. 用户 wanted more control on what is shown, when it's shown and how it's shown. Eventually, [@andrey-git] came up with Custom UI for the old interface. This allowed 用户 to do whatever they wanted. However, it was limited to power 用户.

Lovelace was built [from the start](https://github.com/home-assistant/architecture/issues/14) to tackle these problems. The initial 版本 completely dropped the algorithm and required 用户 to add each 卡片 to their 配置. We went from a fully automatic UI to nothing. We launched it under the nomer "experimental UI" and it quickly gained traction. People loved the control and the ability to inject custom 卡片 or 实体 rows at will.

The enthusiasm was great among our power 用户, however by switching away from an automatic UI, we were no longer beginner-friendly. A new 用户 would open Home Assistant and they would see a blank, unconfigured UI. We realized that this had to be solved if we were to make Lovelace the default.

To solve this, we re-introduced our automatic algorithm. However, this time the algorithm generates a Lovelace 配置. If a 用户 doesn't like the automatic 配置, they can take control and 配置 it to their liking. When you take control, the automatic generated 配置 will no longer be updated by Home Assistant, allowing the 用户 to change each detail.

To make configuring your UI as easy as possible, Lovelace UI allows (custom) 卡片 to include a config editor. This way the 用户 will be able to quickly edit a 卡片 while a live preview shows how the changes look. If a 卡片 does not include an editor (yet), the 用户 will be presented with a text editor in the browser.

Because of the ease to customize and share customizations, we've already seen a big community get 创建 around Lovelace. They are very active in the #Lovelace channel on [our chat](/home-assistant/join-chat/), and work is shared on [ShareTheLove.io](https://sharethelove.io/) and the [Lovelace section on Awesome HA](https://www.awesome-ha.com/#Lovelace-ui).

## Credits

Lovelace UI has been 8 months in the making and it has been a big undertaking. We've worked hard and are proud of being able to ship this first 版本. Lovelace UI would not have been possible without the following current and former members of the Lovelace team:

 - [@balloob] / Paulus Schoutsen
 - [@bramkragten] / Bram Kragten
 - [@c727]
 - [@ciotlosm] / Marius Ciotloș
 - [@iantrich] / Ian Richardson
 - [@jeradM] / Jerad Meisner
 - [@thomasloven] / Thomas Lovén
 - [@zsarnett] / Zack Arnett

I also want to thank the community for adopting this so eagerly, building a ton of helpful tooling and examples and helping one another to create beautiful UIs for their homes.

## Old UI

The transition to Lovelace should be painless for most 用户. If you are encountering issues, please [let us know](https://github.com/home-assistant/home-assistant-polymer/issues). For the time being, you will be able to still change back to the old 用户 interface on a per-设备 basis by going to the info developer tool and following the instructions.

[@andrey-git]: https://github.com/andrey-git
[@balloob]: https://github.com/balloob
[@bramkragten]: https://github.com/bramkragten
[@c727]: https://github.com/c727
[@ciotlosm]: https://github.com/ciotlosm
[@iantrich]: https://github.com/iantrich
[@jeradM]: https://github.com/jeradM
[@thomasloven]: https://github.com/thomasloven
[@zsarnett]: https://github.com/zsarnett
