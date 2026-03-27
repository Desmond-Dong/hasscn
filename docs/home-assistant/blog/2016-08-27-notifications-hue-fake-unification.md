---
title: '0.27 is here to break eggs and take names: 通知, Hue fakery, safety
  and unification come to Home Assistant'
description: '本周的博客文章只能用一个标签来形容：。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
  and checking, 遮盖, 温控 and 风扇.
---
# 0.27 is here to break eggs and take names: 通知, Hue fakery, safety

本周的博客文章只能用一个标签来形容：

## #Amazing

<sup>或者 <sup>也许是<sup>#supersized</sup></sup></sup>

继续往下看，看看这周我们为你准备了哪些 **#Amazing** 的内容 😄！一定要读到最后，因为我在文末给坚持看到最后的你留了个小礼物 :)

不过先来点铺垫……

## 一些例行说明

Paulus ([@balloob]) 这周在欧洲度假，所以这篇发布博客要由我 Robbie ([@robbiet480]) 来代班。别担心，Paulus 很快就会回来继续“拆解”你们的 pull request 😈。

特别感谢这周发布期间几位超棒的助手，他们一直在我身后盯着我，确保我没有遗漏任何细节：[@Teagan42]、[@infamy] 和 [@fabaff]。

接下来，让我们颁发一些……

## 奖杯时刻

Paulus ([@balloob]) 在 [0.26 博客文章](/home-assistant/blog/2016/08/13/foursquare-fast-com-ffmpeg-gpsd/) 里秀了 50 万页面浏览量，我总得想办法“反超”一下。所以过去两周，我和整个开发社区都拼了一把，把满满的热情投入 Home Assistant，最终在这次发布里给大家带来的不是 1 个，而是 6 个 **#Amazing** 里程碑。截至 0.27，我们已经达成：

- Travis 构建次数达到 [10,000](https://travis-ci.org/home-assistant/home-assistant/builds/154660811)（恭喜 [@BluGeni]）
- Issues 和 pull requests 总数达到 [3,000](https://github.com/home-assistant/home-assistant/pull/3000)（感谢 [@kellerza]！）
- 仅 pull requests 就达到 [2,000](https://github.com/home-assistant/home-assistant/pull/2991)（[@fabaff] 太强了！！）
- GitHub forks 达到 900！

另外，

- 我们离 GitHub 4,000 stars 已经非常接近！
- [我现在按提交数排第 5 位贡献者了！！！](https://github.com/home-assistant/home-assistant/graphs/contributors) 等等，这句怎么混进来的 😳……

好消息说完了，下面进入本周发布内容。**#Amazing** 列车继续发车，终于来到你们 _真正_ 关心的部分。

## 0.27

这次发布虽然 **#Amazing**，但要做出一份漂亮的煎蛋卷（当然是用家庭自动化来做），总得先打碎几颗蛋（现在你明白标题梗了吧！）。因此，一些平台和组件引入了向后不兼容的改动。请务必阅读下方的 [Backward-incompatible changes](#backward-incompatible-changes) 章节。

### Hue 网关模拟

感谢 [@mgbowen]，我们现在把此前由 [@blocke] 的 [ha-local-echo](https://github.com/blocke/ha-local-echo) 提供的能力[直接内置到了 Home Assistant](/home-assistant/integrations/emulated_hue/)！这意味着，如果你的设备与 Home Assistant 的集成缺失或体验不佳（说的就是你，Amazon Echo），现在可以通过让 Home Assistant 伪装成 Hue 网关，获得更好的使用体验。我之前个人用过 [@auchter] 的 [Haaska](https://github.com/auchter/haaska)，但感觉响应偏慢，有时甚至会完全失效。借助新的 [`emulated_hue`](/home-assistant/integrations/emulated_hue/) 组件，你可以通过 Amazon Echo 对实体进行本地控制。

### 通知改进

在 0.27 中，通知系统迎来了一些非常棒的升级，由我 [@robbiet480] 带来。

#### HTML5 推送通知

本次发布为桌面端和 Android 设备上的 Chrome/Firefox/Opera 新增了 [HTML5] 推送通知支持。这意味着即使你没有在手机浏览器里打开 Home Assistant，也能把通知发送到手机上。使用 Chrome 时，你甚至可以在通知里加入 2 个操作按钮，这样就能直接在手机锁屏界面控制 Home Assistant，例如触发报警或解锁前门，全程无需离开通知。再次感谢我（[@robbiet480]）和 Paulus（[@balloob]）在这项功能上的努力！

<p class='img'>
  <img src='/home-assistant/images/screenshots/html5-notify.png' />
</p>

#### 通知分组

新的通知 `group` 平台可以把多个通知平台和 `target` 合并为一个通知服务，从而显著减少重复的自动化逻辑。更多信息请查看[文档](/home-assistant/integrations/notify.group/)。

#### 不再需要 `target`

对于支持该能力的平台（从新的 HTML5 平台开始），所有可用的 `target` 都会被暴露为独立服务，因此你不再需要记住该用哪个 `target`。请注意，现有服务仍然保留，所以如果你愿意，依旧可以继续使用 `target`。

### 重启 Home Assistant 前先校验配置

你是否遇到过为了测试配置改动而重启 Home Assistant，结果才发现配置校验报错？现在不用了！[@kellerza] 新增了一个命令行脚本，可以像真正启动 Home Assistant 一样对配置进行校验。

```bash
hass --script check_config
```

### 配置校验

这次发布重点推进了各平台配置校验的完善，帮助你更容易写对配置。感谢 [@fabaff]、[@pavoni]、[@pvizeli]、[@nkgilley] 的辛苦付出，你们太棒了！

<p class='img'>
  <img src='/home-assistant/images/screenshots/config-validation.png' />
</p>

### FFMpeg 动作/噪声检测

现在你可以使用 [FFMpeg] 监控视频流并检测动作，这得益于 [@pvizeli] 带来的新二元传感器平台。

### 组件整理 - Thermostat 与 HVAC 合并为温控，Rollershutter 与 Garage Door 合并为遮盖

随着项目快速增长，我们积累了一些功能高度重叠的组件。[@turbokongen] 承担了这项不轻松的合并工作。Thermostat 和 HVAC 平台现已合并到新的温控组件下；Rollershutter 和 Garage Door 平台现已合并到新的遮盖组件下。你只需替换组件名称即可轻松升级，比如把 `thermostat` 替换为 `climate`。旧组件已被弃用，并将在不久后移除。

### 全新的 `fan` 组件

随着新的 `climate` 组件到来，我（[@robbiet480]）和 [@Teagan42] 认为我们还需要一个更简单、专注控制风扇的组件。目前它已经支持控制 Insteon 风扇。MQTT 支持会在 0.28.0 中加入。我原本想在 0.27.0 前完成，但写这篇博客花了太久 😢。

### All changes

<img src='/home-assistant/images/supported_brands/html5.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/mqtt.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/hewlett_packard_enterprise.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/wunderground.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Merge thermostat and HVAC components into new [温控] component ([@turbokongen])
- Merge rollershutter and garage door components into new [遮盖] component ([@turbokongen])
- 报警 Control 面板 - Manual: Allow returning to previous 状态 after [触发器] ([@tobiebooth])
- 传感器 - DHT: Allow range [checking] ([@open-homeautomation])
- 灯光 实体 will now [expose] their features ([@shmuelzon])
- 传感器: Monitor HP ILO 传感器 on [HP] servers ([@Juggels])
- 传感器: Monitor [Fritzbox] Calls ([@DavidMStraub])
- 通知: LlamaLab [Automate] is now supported ([@danielperna84])
- 传感器: Serial [CO2] 传感器 now supported ([@open-homeautomation])
- 传感器: MQTT 房间 [在场] detection ([@mKerix])
- 通知: New group platform allows [grouping] 通知 targets across platforms ([@robbiet480])
- [HTML5] push 通知 ([@robbiet480], [@balloob])
- 天气: [Wunderground] now supported ([@arsaboo], [@Teagan42])
- New check config 脚本 to test validity before restarting HA ([@kellerza])
- 二元sensor: Allow [monitoring] a 摄像头 feed using FFMpeg ([@pvizeli])
- 遮盖: Z-Wave platform now supports [positions] ([@nunofgs])
- 设备 tracker: allow using [Gravatar] for 实体 picture ([@robbiet480])
- 通知: platforms with known targets will expose them as standalone 服务 ([@robbiet480])
- 摄像头: [MJPEG] and [Generic] 摄像头's can now authenticate using digest auth ([@meatz])
- 天气: Forecast.io now can show daily temp/precip [forecast] values ([@DavidMStraub])
- Media Player: WebOS TV now allows [customizing][webos] the sources ([@roidayan])
- 设备 tracker: Allow tracking 设备 using [蓝牙] Low-Energy ([@open-homeautomation])
- 通知: Ensure [Slack] messages appear as correct 用户 ([@technicalpickles])
- YAML: [Secrets] will look for values in all parents folders up to the config root folder ([@Teagan42])
- 摄像头: Generic 摄像头 now supports [模板] support ([@balloob])
- Slack: Allow sending [attachments] ([@technicalpickles])
- 设备 Tracking: TP-Link Archer C7 5 GHz 设备 will now also be [found] ([@dpford])
- Z-Wave: New rename [node] 服务 added ([@jnewland])
- Wink: [Bug] fixes ([@w1ll1am23])
- Homematic: new 设备 and controller variable [support] ([@danielperna84], [@pvizeli], [@mcdeck])
- Allow emulating a [Hue] bridge to control 实体 ([@mgbowen])
- New [风扇][风扇] component ([@Teagan42], [@robbiet480])

### Backward-incompatible changes
- Ecobee3 occupancy 传感器 have moved from 传感器 platform to 二元sensor platform.
- Forecast.io 实体 IDs are now like `sensor.forecastio_temperature`. Previously they were like `sensor.weather_temperature`. Apologies for this change, but we needed to make Forecast.io more generic now that we have many 天气 platforms.
- The [Loop Energy][Loop] 传感器 配置 format changed slightly, please reformat based on the revised 文档.
- The 配置 for the [SABnzbd] 传感器 has slightly changed. The prefix `type:` is no longer required for monitored variables.
- The [IMAP] 传感器 now uses `username` instead of `user`.
- The [NZBGet] 传感器 has had so many changes I can't list them all. Please refer to the 文档 for more info.

### Deprecations
- Using the `thermostat` and `hvac` components has been deprecated. Please migrate to the new `climate` component. (just change the component name, the 配置 are compatible)
- Using the `rollershutter` and `garage_door` components have also been deprecated. Please migrate to the new `cover` component. (just change the component name, the 配置 are compatible)

## 收尾

感谢大家一路看到这里。Paulus（[@balloob]）不在的这段时间，我会接手他不少工作；不过就像我说的，不用担心，他会在 0.28.0 发布前很早就回归。希望这篇风格比较轻松的博客没有和我们平常的风格反差太大——我有不少内容是在凌晨 2 点、连续清醒快 20 小时后写的，所以整个人有点飘，哈哈哈 😴。

另外，一如既往感谢所有代码贡献者、文档贡献者，最要感谢的是每一位用户！如果没有你们的热情，这个项目可能至今也只是 Paulus（@balloob）在家里控制灯光用的一段脚本。

欢迎在 [Discord](https://discord.gg/c5DvZ4e)、我的 [Twitter](https://twitter.com/robbie)，或者 [Home Assistant Twitter](https://twitter.com/home_assistant) 告诉我你对这篇博客和本次发布的看法。对了，我们还有一个全新的 [Facebook page](https://www.facebook.com/homeassistantio)，非常欢迎你去点个赞！侧边栏就有方便的 Facebook 点赞和 Twitter 关注按钮。

我差点忘了给你这个坚持读到最后的 🎁：一块 🍪！希望你吃得开心、身体健康 😄。

我们很快在 Discord 和你的 pull request 评论区再聊！

-- Robbie

（P.S. 那些直接滚到最底下来拿礼物的人：你们可不像其他人一样“堂堂正正”赢得它哦 😄）

## Hotfix 0.27.1 - August 30

- Migrate APCUPSd to voluptuous ([@fabaff])
- Ecobee operation mode fix ([@turbokongen])
- 更新 ha-ffmpeg 版本 to 0.9 ([@pvizeli])
- 设备 tracker component & platform validation. No more home_range. ([@kellerza])
- Added option to use effect:random for Flux Led 灯光 bulbs ([@tchellomello])
- Use voluptuous for smtp ([@pvizeli])
- 升级 sendgrid to 3.2.10 ([@fabaff])
- 升级 TwitterAPI to 2.4.2 ([@fabaff])
- Fix bug in wemo discovery caused by voluptuous addition. ([@pavoni])
- Bug fix for asuswrt device_tracker. ([@Danielhiversen])
- Remove units for humidity in Wundeground 传感器 ([@arsaboo])
- Fix 媒体播放器 descriptions and select_source ([@MartinHjelmare])
- Allow 用户 to 配置 server id to perform speed test against ([@Teagan42])
- Bug fix for asuswrt device_tracker. ([@Danielhiversen])
- More Ecobee operation mode fixes ([@turbokongen])
- Map Modes to setpoint indexes ([@turbokongen])
- fix voluptuous and 遮盖 autodiscovery ([@pvizeli])
- Fixes wrong statevalue and problem with zwave setpoint ([@turbokongen])

## Hotfix 0.27.2 - September 3
### home-assistant

- Ble fix ([#3019](https://github.com/home-assistant/home-assistant/pull/3019)) - ([@open-homeautomation](https://github.com/open-homeautomation))
- Reset insteon hub ([#3062](https://github.com/home-assistant/home-assistant/pull/3062)) - ([@Teagan42](https://github.com/Teagan42))
- Host should be optional for apcupsd component ([#3072](https://github.com/home-assistant/home-assistant/pull/3072)) - ([@Danielhiversen](https://github.com/Danielhiversen))
- Zwave 温控 Bugfix: if some setpoints have different units, we should fetch the o… ([#3078](https://github.com/home-assistant/home-assistant/pull/3078)) - ([@turbokongen](https://github.com/turbokongen))
- Bugfix  unit fix ([#3083](https://github.com/home-assistant/home-assistant/pull/3083)) - ([@turbokongen](https://github.com/turbokongen))
- Ecobee humidity slider ([#3088](https://github.com/home-assistant/home-assistant/pull/3088)) - ([@turbokongen](https://github.com/turbokongen))
- Zwave 温控 Bugfix: If 设备 was off target temp was null. Default to Heating setpoint ([#3091](https://github.com/home-assistant/home-assistant/pull/3091)) - ([@turbokongen](https://github.com/turbokongen))
- 温控 and 遮盖 bugfix ([#3097](https://github.com/home-assistant/home-assistant/pull/3097)) - ([@turbokongen](https://github.com/turbokongen))
- Add missing docstrings (fix PEP257 issues) ([#3098](https://github.com/home-assistant/home-assistant/pull/3098)) - ([@fabaff](https://github.com/fabaff))
- Allow None MAC to be loaded from known_devices ([#3102](https://github.com/home-assistant/home-assistant/pull/3102)) - ([@kellerza](https://github.com/kellerza))
- fix homematic 温控 implementation ([#3114](https://github.com/home-assistant/home-assistant/pull/3114)) - ([@pvizeli](https://github.com/pvizeli))
- Fixed Homematic 遮盖 ([#3116](https://github.com/home-assistant/home-assistant/pull/3116)) - ([@danielperna84](https://github.com/danielperna84))
- Bugfix. 温控 and covermqt ([#3130](https://github.com/home-assistant/home-assistant/pull/3130)) - ([@turbokongen](https://github.com/turbokongen))

### home-assistant-polymer

- Fix missing 属性 on the 温控 and HVAC more info 卡片 ([7e455e2](https://github.com/home-assistant/home-assistant-polymer/commit/7e455e2be1cb7cc4f55628b063019bea548a3182)) - ([@robbiet480](https://github.com/robbiet480))
- Add a default icon for the 风扇 component ([#101](https://github.com/home-assistant/home-assistant-polymer/pull/101)) - ([@robbiet480](https://github.com/robbiet480))

[@arsaboo]: https://github.com/arsaboo
[@auchter]: https://github.com/auchter
[@balloob]: https://github.com/balloob
[@blocke]: https://github.com/blocke
[@BluGeni]: https://github.com/BluGeni
[@Danielhiversen]: https://github.com/Danielhiversen
[@danielperna84]: https://github.com/danielperna84
[@DavidMStraub]: https://github.com/DavidMStraub
[@dpford]: https://github.com/dpford
[@fabaff]: https://github.com/fabaff
[@infamy]: https://github.com/infamy
[@jnewland]: https://github.com/jnewland
[@Juggels]: https://github.com/Juggels
[@kellerza]: https://github.com/kellerza
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@mcdeck]: https://github.com/mcdeck
[@meatz]: https://github.com/meatz
[@mgbowen]: https://github.com/mgbowen
[@mKerix]: https://github.com/mKerix
[@nkgilley]: https://github.com/nkgilley
[@nunofgs]: https://github.com/nunofgs
[@open-homeautomation]: https://github.com/open-homeautomation
[@pavoni]: https://github.com/pavoni
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@roidayan]: https://github.com/roidayan
[@shmuelzon]: https://github.com/shmuelzon
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@technicalpickles]: https://github.com/technicalpickles
[@tobiebooth]: https://github.com/tobiebooth
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23

[checking]: /integrations/dht
[FFMpeg]: /integrations/ffmpeg_motion
[温控]: /integrations/温控/
[NZBGet]: /integrations/nzbget
[SABnzbd]: /integrations/sabnzbd
[HP]: /integrations/hp_ilo
[Fritzbox]: /integrations/fritzbox#sensor_callmonitor/
[webos]: /integrations/webostv#media-player
[HTML5]: /integrations/html5
[Gravatar]: /integrations/device_tracker/
[Loop]: /integrations/loopenergy
[遮盖]: /integrations/遮盖/
[温控]: /integrations/温控/
[expose]: /integrations/灯光/
[Automate]: /integrations/llamalab_automate
[Secrets]: /topics/secrets/
[触发器]: /integrations/manual
[CO2]: /integrations/mhz19
[在场]: /integrations/mqtt_room
[grouping]: /integrations/通知.group/
[Wunderground]: /integrations/wunderground
[monitoring]: /integrations/ffmpeg_motion
[MJPEG]: /integrations/mjpeg
[Generic]: /integrations/generic_ip_camera
[positions]: /integrations/zwave#遮盖
[forecast]: /integrations/darksky
[蓝牙]: /integrations/bluetooth_le_tracker
[Slack]: /integrations/slack
[模板]: /integrations/generic_ip_camera
[Bug]: /integrations/wink/
[support]: /integrations/homematic/
[node]: /integrations/zwave/
[found]: /integrations/tplink
[attachments]: /integrations/slack
[Hue]: /integrations/emulated_hue/
[风扇]: /integrations/风扇/
[IMAP]: /integrations/imap
