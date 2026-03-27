---
title: '0.33：全新的日历组件、Wink 恒温器，以及 Cisco IOS'
description: '这次发布我们主要专注于完成异步升级，并在这个过程中修复了大量问题。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# 0.33：全新的日历组件、Wink 恒温器，以及 Cisco IOS

这次发布我们主要专注于完成异步升级，并在这个过程中修复了大量问题。

不过，没有新功能的新版本总少了点意思，这次当然也不例外。这个发布包含了由 [@mnestor] 开发的全新日历组件。它现在支持 Google 日历，你可以基于日历事件来创建自动化！

### Changes

- New [日历 component][google] including Google support ([@mnestor])
- Final 核心 升级 for async ([@pvizeli])
-  [Neato] refactor + 传感器 support ([@turbokongen])
- 设备 Tracker: [Swisscom Internet-Box][swisscom] now supported ([@betrisey])
- 设备 Tracker - Locative: [Map support][locative] added ([@danijelst])
-  [Emulated Hue] will now sent request info as variables to 脚本 that get called ([@bah2830])
- Wink: [Thermostats][wink-温控] are now supported ([@w1ll1am23])
- 灯光: New [MQTT 模板][MQTT-模板] platform for custom communication ([@Diaoul])
-  [Wake on Lan 开关] can now 配置 a custom OFF 脚本 ([@Chris-V])
- 设备 Tracker: [Cisco IOS][cisco] now supported ([@fbradyirl])
- 传感器: Support for [PVOutput][pvoutput] snesor ([@fabaff])
- 传感器: Show count of connected clients to the [API stream][api-stream] ([@balloob])
- Fix platforms from doing I/O in the event loop ([@balloob], [@pvizeli], [@lwis], [@kellerza])
- 开关 - [TP Link]: Add daily consumption ([@gonzalezcalleja])
- 模板: Add new `strptime` [模板 function] for parsing times ([@lwis])
-  [HTTP] component: Fix X-Forwarded-For parsing ([@mweinelt])
- 开关 - [Command Line]: Use configured object_id for 实体 IDs ([@n8henrie])
-  [MQTT] now supports birth and last will messages ([@bestlibre])
- Better handling of accented characters in slugify ([@magicus])
- 报警 Control 面板 - [Envisalink]: Add new keypress 服务 ([@jnimmo])
- 灯光 - [Hue]: Add 服务 to activate 场景 defined in Hue app ([@sdague])

### 发布 0.33.1 - November 20

 - Fix Z-Wave 灯光 ([@turbokongen])

### 发布 0.33.2 - November 22

 - Fix 设备 Tracker init ([@pvizeli])
 - Fix Discovery init ([@pvizeli])
 - Fix TP-Link 开关 ([@mweinelt])
 - Fix Zwave 灯光 naming & configurable refresh ([@jchapple])
 - Neato fixes ([@turbokongen])
 - Fix 'Unknown' status for Nest Protect 设备 ([@Khabi])

### 发布 0.33.3 - November 23

 - 更新 Yr.no 实体 every hour ([@kellerza])
 - Bump Netdisco to 0.7.7 (fixes discovery on Synology)
 - Fix discovery race 条件 (most obvious in Wemo) ([@balloob])

### 发布 0.33.4 - November 24

 - Set executor pool size to 10 (as intended) ([@pvizeli])

This should fix occasional performance problems that some people have reported.

### Backward-incompatible changes

 - We have included a fix that impacts how we generate 实体 ids. This only impacts 设备 with accented characters. Instead of being stripped out, they are now replaced with the non-accented 版本. So now `Tèst Mörê` will become `test_more` instead of `tst_mr`.
 - Command line 开关 will now use the specified object ID for their 实体 ID instead of basing it off the name.

### Reporting issues

Experiencing issues introduced by this 发布? Please report them in our [issue tracker]. Make sure to fill in all fields of the issue 模板.

[issue tracker]: https://github.com/home-assistant/home-assistant/issues
[@bah2830]: https://github.com/bah2830
[@balloob]: https://github.com/balloob
[@bestlibre]: https://github.com/bestlibre
[@betrisey]: https://github.com/betrisey
[@Chris-V]: https://github.com/Chris-V
[@danijelst]: https://github.com/danijelst
[@Diaoul]: https://github.com/Diaoul
[@fabaff]: https://github.com/fabaff
[@fbradyirl]: https://github.com/fbradyirl
[@gonzalezcalleja]: https://github.com/
[@jnimmo]: https://github.com/jnimmo
[@kellerza]: https://github.com/kellerza
[@lwis]: https://github.com/lwis
[@magicus]: https://github.com/magicus
[@mnestor]: https://github.com/mnestor
[@mweinelt]: https://github.com/mweinelt
[@n8henrie]: https://github.com/n8henrie
[@pvizeli]: https://github.com/pvizeli
[@sdague]: https://github.com/sdague
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@jchapple]: https://github.com/jchapple
[@Khabi]: https://github.com/Khabi

[api-stream]: /integrations/传感器.websocket_api
[cisco]: /integrations/cisco_ios
[Command Line]: /integrations/开关.command_line/
[Envisalink]: /integrations/envisalink/
[google]: /integrations/日历.google/
[Hue]: /integrations/hue
[locative]: /integrations/locative
[MQTT-模板]: /integrations/灯光.MQTT
[MQTT-will]: /integrations/MQTT/
[pvoutput]: /integrations/pvoutput
[swisscom]: /integrations/swisscom
[TP Link]: /integrations/tplink
[wink-温控]: /integrations/wink#温控
[neato]: /integrations/neato/
[Emulated Hue]: /integrations/emulated_hue/
[Wake on Lan 开关]: /integrations/wake_on_lan#开关
[模板 function]: /topics/templating/#home-assistant-模板-extensions
[HTTP]: /integrations/http/
[MQTT]: /integrations/MQTT/
