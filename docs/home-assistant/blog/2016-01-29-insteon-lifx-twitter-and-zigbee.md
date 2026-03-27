---
title: '0.12：Insteon、LIFX、Twitter 和 Zigbee'
description: '又一个冲刺阶段结束了，而且我们看起来丝毫没有放慢脚步。0.12 带来了许多新的组件、平台，以及界面组织方面的改进。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
  自动化变得更简单。
---
又一个冲刺阶段结束了，而且我们看起来丝毫没有放慢脚步。0.12 带来了许多新的组件、平台，以及界面组织方面的改进。

我想特别感谢 @ @ PH0 @ @，因为几乎每次发布中都有他的贡献。他不断为新平台增加支持，或提升现有组件和平台的可靠性。请继续保持！

这次发布还包含了一个被频繁请求的功能：能够在前端中使用不同标签页来组织实体。请查看[演示][the demo]了解它的实际效果，并阅读 @ @ PH0 @ @ 的入门指南以获取更多信息。

@ @ PH0 @ @
@ @ PH0 @ @ @ @ @ PH1 @ @ @ @ PH2 @ @
中的新视图示例前端。@ @ PH0 @ @了解更多。@ @ PH1 @ @
@ @ PH0 @ @

@ @ PH0 @ @ @ @ @ PH1 @ @ @ @ PH2 @ @ @ @ PH3 @ @

 -二元传感器： [command传感器]已添加([@ Bart274])
 - [Nest]支持扩展到包括传感器和二元传感器（ [@ joshughes] ）
 -灯光: [LIFX]平台已添加([@ TangoAlpha])
 -通知: [Twitter]平台已添加([@ HydrelioxGitHub])
 -传感器: [模板]平台已添加([@ pavoni])
 -开关: [Wink]平台现在支持警报器([@ w1ll1am23])
 - [Insteon HUB]支持已添加([@ FreekingDean])
 - [Statsd]组件已添加（ [@ michaelkuty] ）
 - 灯光: [Rfxtrx] platform now supports dimming ([@turbokongen])
 - Time scheduling (including [time 自动化]) now works with intervals (ie. `/5`) ([@kennedyshead])
 - 传感器: [onewire] support added ([@deisi])
 - [Zigbee] support added ([@flyte])
 - 设备 Tracker: [OwnTracks] can now track iBeacons ([@pavoni])
 - 通知: Google Voice SMS platform added ([@w1ll1am23])
 - 切换 服务 added to `homeassistant`, `switch`, `light` and `media_player` ([@rmkraus])
 - [Thermostat] 服务 added to control 风扇 ([@auchter])
 - Improved Python 自动化: Event 助手 are now also available as decorators for custom components ([@rmkraus])
 - 前端: support added for tabs to show [different views][group] of your house ([@balloob])
 - Bugfixes by [@molobrakos], [@MartinHjelmare], [@pavoni], [@trollkarlen], [@zmrow], [@maddox], [@persandstrom], [@happyleavesaoc], [@balloob], [@fabaff], [@stefan-jonasson], [@haraldnagel].

[the demo]: /demo/
[command 传感器]: /integrations/command_line/
[Insteon hub]: /integrations/insteon/
[LIFX]: /integrations/lifx
[Nest]: /integrations/nest/
[onewire]: /integrations/onewire
[OwnTracks]: /integrations/owntracks
[Rfxtrx]: /integrations/rfxtrx#灯光
[Statsd]: /integrations/statsd/
[模板]: /integrations/模板
[Thermostat]: /integrations/温控/
[time 自动化]: /getting-started/自动化-触发器/#time-触发器
[Twitter]: /integrations/twitter
[Wink]: /integrations/wink/
[Zigbee]: /integrations/Zigbee/
[group]: /integrations/group/
[@auchter]: https://github.com/auchter
[@balloob]: https://github.com/balloob
[@Bart274]: https://github.com/Bart274
[@deisi]: https://github.com/deisi
[@fabaff]: https://github.com/fabaff
[@flyte]: https://github.com/flyte
[@FreekingDean]: https://github.com/FreekingDean
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@haraldnagel]: https://github.com/haraldnagel
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@joshughes]: https://github.com/joshughes
[@kennedyshead]: https://github.com/kennedyshead
[@maddox]: https://github.com/maddox
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@michaelkuty]: https://github.com/michaelkuty
[@molobrakos]: https://github.com/molobrakos
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@rmkraus]: https://github.com/rmkraus
[@stefan-jonasson]: https://github.com/stefan-jonasson
[@TangoAlpha]: https://github.com/TangoAlpha
[@trollkarlen]: https://github.com/trollkarlen
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@zmrow]: https://github.com/zmrow

# # #向后不兼容的更改
 - Nest config has moved from thermostat to the [Nest component][Nest].
 - 实体 IDs for Z-Wave 设备 are now generated in a deterministic way causing all IDs to change starting this 发布. This is a one time change. [(Changed again in 0.31)](/home-assistant/blog/2016/10/22/flash-briefing-updater-hacktoberfest/)
