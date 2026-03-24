---
title: '0.7.6: Amazon FireTV, Radiotherm thermostats'
description: Home Assistant 0.7.6 has been released with lots of squashed bugs and
  support for Amazon FireTV and Radiotherm thermostats.
---

经过两周的努力，我很高兴宣布 Home Assistant v0.7.6 正式发布。本次发布主要聚焦于 bug、测试覆盖率和文档，而且这三方面都超出预期。我们修复了大量问题，[测试覆盖率提升到 85%](https://coveralls.io/builds/3946399)，同时也感谢 [@fabaff](https://github.com/fabaff) 和我一起完成了网站[组件版块](/home-assistant/integrations/)的全面改版。

#### Changes

<img src='/home-assistant/images/supported_brands/radiotherm.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px;' height='50' /><img src='/home-assistant/images/supported_brands/firetv.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px; clear: right;' height='50' /><img src='/home-assistant/images/supported_brands/locative.png' style='border:none; box-shadow: none; float: right; margin-bottom: 16px; clear: right;' height='50' />

 - 设备 tracker: Newer [TP-Link routers](/home-assistant/integrations/tplink) now supported ([@mKeRix](https://github.com/mKeRix))
 - 报警 Control 面板: [Manual 报警](/home-assistant/integrations/manual) added ([@sfam](https://github.com/sfam))
 - Thermostat: [Radiotherm](/home-assistant/integrations/radiotherm/) now supported ([@toddeye](https://github.com/toddeye))
 - Media Player: [Amazon FireTV](/home-assistant/integrations/androidtv) now supported ([@happyleavesaoc](https://github.com/happyleavesaoc))
 - 设备 Tracker: [Geofancy](/home-assistant/integrations/locative) now supported (@wind-rider)
 - New component [Shell Command](/home-assistant/integrations/shell_command/) can expose shell commands as 服务 ([@balloob](https://github.com/balloob))
 - [脚本](/home-assistant/integrations/script/) can now be customized using `customize` key in `configuration.yaml` ([@balloob](https://github.com/balloob))
 - 灯光: [Hyperion](/home-assistant/integrations/hyperion) now supported (@MakeMeASandwich)
 - 传感器: [aRest](/home-assistant/integrations/arest#sensor) can now also read out pins ([@balloob](https://github.com/balloob))
 - 传感器: [Forecast.io](/home-assistant/integrations/darksky) now supports specifying units in `configuration.yaml` ([@balloob](https://github.com/balloob))
 - Thermostat: Heat Control has been completely rewritten ([@balloob](https://github.com/balloob))
 - 开关: [Rest](/home-assistant/integrations/switch.rest/) now supported ([@bachp](https://github.com/bachp))
 - Media Player: [Plex](/home-assistant/integrations/plex#media-player) can now be auto discovered and 配置 itself ([@tomduijf](https://github.com/tomduijf))
 - [Downloader](/home-assistant/integrations/downloader/) will now treat relative paths based on config dir ([@tomduijf](https://github.com/tomduijf))
 - Line Charts will use interpolation for 传感器 data and show current and target temperature for thermostats ([@balloob](https://github.com/balloob))
 - 设备 Tracker: [OpenWRT via ubus](/home-assistant/integrations/ubus) now supported ([@krzynio](https://github.com/krzynio))

<!--more-->

#### Backward-incompatible changes

As part of this 发布 we did some cleanup which introduced backwards incompatible changes:

**Heat Control thermostat no longer includes scheduling features.**
This feature has been removed completely. Use the [automation component](/home-assistant/getting-started/automation/) instead to control target temperature.

**Config changed for calling a 服务 from a 脚本.**
`execute_service:` has been replaced with `service:`. See [component page](/home-assistant/integrations/script/) for example. The old method will continue working for some time.

**场景 can no longer be turned off.**
It is no longer possible to turn a 场景 off after it has been activated. The way it worked was unpredictable and causes a lot of confusion.

**Downloader treats relative paths now relative to the config dir instead of the current working dir.**
This makes more sense as most people run Home Assistant as a daemon
