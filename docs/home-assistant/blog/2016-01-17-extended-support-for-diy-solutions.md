---
title: '0.11：扩展 DIY 方案支持'
description: '2016 年 1 月，我们火力全开！@ @ PH0 @ @github-ha 在 GitHub 上已经突破 2500 星（发布时为 2596 星）。此外，还有 20 位 @ @ PH1 @ @发布-pr 贡献者参与了这次发布，持续改进并扩展 Home Assistant。'
  和 MySensors 自制家庭自动化组件的支持。
---
2016 年 1 月，我们火力全开！[@ @ PH0 @ @][github-ha] 在 GitHub 上已经突破 2500 星（发布时为 2596 星）。此外，还有 20 位 [@ @ PH1 @ @][发布-pr] 贡献者参与了这次发布，持续改进并扩展 Home Assistant。项目仍在不断成长，我很期待 2016 年接下来会带来什么。

[github-ha]: https://github.com/home-assistant/home-assistant/
[发布-pr]: https://github.com/home-assistant/home-assistant/pull/883#partial-users-participants

@ @ PH1 @ @ @ @ @ PH2 @ @ @ @ PH3 @ @ @ @ PH4 @ @ @ PH5 @ @ @ @ PH6 @ @

 - [MySensors]已改进并添加开关支持(@ @ PH0 @ @)
 - RPi GPIO的全重构。现在包括@ @ PH0 @ @和@ @ PH1 @ @ （ [@ sfam] ）
 -传感器: [YR]平台已添加([@ danielhiversen])
 -设备 跟踪器： Geofancy平台已重命名为[Locative] ([@ philipbl])
 -自动化:添加[sun条件] ([@ philipbl])
 -开关: [COMMAND_SWITCH]现在可以轮询状态(@ @ PH0 @ @)
 -开关: [wemo]现在使用订阅状态而不是投票（ @ @ PH0 @ @ ）
 - [Telldus Live]支持已添加（ [@ molobrakos] ）
 - [Vera]现在使用订阅状态而不是轮询（ [@ pavoni] ）
 -新[模板 助手method] @ @ PH0 @ @已添加([@ andythigpen])
 - 设备 tracker: [OwnTracks]过渡事件现在受支持([@ xifle])
 -灯光: [Philips Hue]平台现在支持多个集线器([@ rhooper])
 -通知: [免费移动]平台已添加([@ HydrelioxGitHub])
 -新的[MQTT Eventstream]组件，用于通过MQTT连接两个Home Assistant实例（ [@ moonshot] ）
 -媒体播放器： [Cast]巨大的稳定性改进（ [@ rmkraus] ）
 -媒体播放器： [Universal media player]添加到组合多个媒体播放器（ [@ rmkraus] ）
 -传感器: [Netatmo]平台已添加([@ HydrelioxGitHub])
 -报警 控制面板：已添加[报警.com]平台（ [@ Xorso] ）
 -温控器： [Proliphix]平台已添加([@ sdague])
 -新组件[input_boolean]将允许自定义自动化([@ balloob])
 -支持服务通过[Amazon Echo] ([@ balloob])拨打电话

[MySensors]: /integrations/mysensors/
[Locative]: /integrations/locative
[sun 条件]: /getting-started/自动化-条件/#sun-条件
[command_switch]: /integrations/开关.command_line/
[wemo]: /integrations/wemo
[Telldus Live]: /integrations/tellduslive/
[Vera]: /integrations/vera/
[模板 助手 method]: /topics/templating/#home-assistant-模板-extensions
[OwnTracks]: /integrations/owntracks
[Philips Hue]: /integrations/hue
[Free Mobile]: /integrations/free_mobile
[MQTT Eventstream]: /integrations/mqtt_eventstream/
[Cast]: /integrations/cast
[Universal media player]: /integrations/universal
[Netatmo]: /integrations/netatmo#传感器
[Proliphix]: /integrations/proliphix/
[rpi-bs]: /integrations/rpi_gpio#binary-传感器
[rpi-s]: /integrations/rpi_gpio#开关
[input_boolean]: /integrations/input_boolean/
[MySensors 传感器 platform]: /integrations/传感器.mysensors/
[Amazon Echo]: /integrations/alexa/

# # #向后不兼容的更改
 - @ @ PH1 @ @已移至@ @ PH0 @ @组件。
 - [传感器MySensors平台]现在需要配置[MySensors]组件。
 - Geofancy平台已重命名为[Locative]。

[@MartinHjelmare]: https://github.com/MartinHjelmare
[@danielhiversen]: https://github.com/danielhiversen
[@philipbl]: https://github.com/philipbl
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@pavoni]: https://github.com/pavoni
[@molobrakos]: https://github.com/molobrakos
[@andythigpen]: https://github.com/andythigpen
[@xifle]: https://github.com/xifle
[@rhooper]: https://github.com/rhooper
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@moonshot]: https://github.com/moonshot
[@rmkraus]: https://github.com/rmkraus
[@Xorso]: https://github.com/Xorso
[@sdague]: https://github.com/sdague
[@balloob]: https://github.com/balloob
[@sfam]: https://github.com/sfam
