---
title: '0.32：Hacktoberfest、InfluxDB 传感器、错误报告，以及天气'
description: '又过了两周，我们很高兴为你带来 Home Assistant 0.32。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# 0.32：Hacktoberfest、InfluxDB 传感器、错误报告，以及天气

又过了两周，我们很高兴为你带来 Home Assistant 0.32。

### Hacktoberfest
[Hacktoberfest] 现已结束。在将近 30,000 个参与仓库中，Home Assistant 拿到了第 2 和第 3 名，总共合并了 528 个拉取请求，平均每天 17 个！感谢所有贡献者，也感谢审核团队。没有你们，这一切都不可能实现 👏。

### 改进的错误报告
这个发布改进了配置校验出错时的报告方式。感谢 [@kellerza]，现在当这类问题发生时，你会在界面中看到一条持久通知。

### 异步化
这个发布包含了首批异步传感器和摄像头平台。[@pvizeli] 和 [@fabaff] 将大多数“内部”传感器迁移到了异步编程。希望你会喜欢这次带来的速度提升。

[@balloob] 和 [@pvizeli] 也在核心本身的改进上投入了大量工作。

### 天气组件

很长一段时间以来，我们一直有一批[天气传感器][天气-传感器]，现在情况更好了：我们有了新的[天气组件][天气-component]。抱歉，目前还没有太多可说的细节。接下来的计划是创建天气 UI 元素，并进一步完善初始实现。

### All changes

<img src='/home-assistant/images/supported_brands/icloud.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/influxdb.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/emby.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/synology.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/garadget.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/yeelight.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/philips.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='https://brands.home-assistant.io/androidtv/logo.png' srcset='https://brands.home-assistant.io/androidtv/logo@2x.png 2x' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/currencylayer.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/influxdb.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- 遮盖: New [garadget] platform ([@JasonCarter80])
- Media player: New support for [Emby][emby-media] ([@mezz64])
- [LiteJet][litejet] 开关 and 灯光 support ([@joncar])
- 灯光: [Yeelight][yeelight] WiFi bulbs are now supported ([@HydrelioxGitHub])
- Media player: [Philips TVs][philips_player] with jointSPACE API re now supported ([@danielperna84])
- 传感器: Support for [Synology DSM][synologydsm] ([@StaticCube])
- 传感器: Monitoring support for [Dovado routers][dovado-传感器] ([@molobrakos])
- 传感器: Support for monitoring [printers][cups-传感器] ([@fabaff])
- Add mochad component ([@mtreinish])
- 通知: Added support for [Android TV/FireTV](/home-assistant/integrations/nfandroidtv) - 传感器: New finance platform [CurrencyLayer][currencylayer] ([@arsaboo])
- 传感器: Support for [InfluxDB 传感器][influx-传感器] ([@bestlibre])
- 传感器: New support [HDDTemp 传感器][hddtemp-传感器] ([@fabaff])
([@danielperna84])
- Media player: [Sonos] improvements incl. timer setting functionality ([@bjarniivarsson], [@americanwookie])
- Media player: Discovery support for [Yamaha] ([@sdague])
- Config: Exclude dirs/files prefixed with . ([@lwis])
- HTTP: Migrate WSGI to asyncio ([@balloob])
- Configurator: Support for `entity_picture` ([@armills])
- 核心: 配置 validation 错误 prints line numbers ([@persandstrom])
- Zoneminder: SSL/TLS support ([@Khabi])
- 摄像头: Improvements to [RPi 摄像头][rpi-摄像头] ([@postlund])
- [ThingSpeak][thingspeak] component ([@simonszu])
- 核心: New property `hass.data`  to store internal data ([@balloob])
- 开关: Templating and configurable timeout for [REST][rest-开关] ([@aa755])
- 传感器: New [random number][random-传感器] 传感器 ([@fabaff])
- Pilight: `send_delay` feature ([@janLo])
- Config: Improvements for `known_devices` ([@kellerza])
- 设备 tracker: New discovered event ([@lwis])
- 设备 tracker: Improvements and new features for the Volvo on Call platform ([@molobrakos])
- 温控: Use unit of measurement from a Vera 设备 ([@pavoni])
- 设备 tracker: [iCloud][icloud] improvements ([@Bart274])
- Minor features and bug fixes by [@fabaff], [@kellerza], [@robbiet480], [@balloob], [@DavidLP], [@Bart274], [@sdague], [@mtreinish], [@Khabi], [@bbesset], [@bestlibre], [@pvizeli], [@turbokongen], [@devdelay], [@molobrakos], [@postlund], [@wokar], [@armills], [@arsaboo], [@hartmms], [@nsideras], @tbeckha, and [@kirichkov].

### 发布 0.32.1 - November 6

We've added a 警告 to 0.32 to catch platforms accidentally slowing down Home Assistant. Our aim is to fix these quickly when reported, so here is 0.32.1 with all reported platforms fixed.

 - Fix Sonos doing I/O inside the event loop ([@pvizeli])
 - Fix Radiotherm doing I/O inside the event loop ([@balloob])
 - Fix 摄像头 MJPEG streams when using HTTP 1.0 ([@balloob])

### 发布 0.32.2 - November 7

 - Move Honeywell I/O out of the event loop ([@balloob])
 - Use sequential updates for non-async 实体 to prevent race 条件 ([@pvizeli])
 - Fix setting temperature in Celsius on Radiotherm CT50 thermostats ([@andyat])
 - Fix PiLight config validation ([@DavidLP])

### 发布 0.32.3 - November 11

 - Fix OpenWeather 天气 platform doing I/O in event loop ([@lwis])
 - Fix 报警.com doing I/O in event loop ([@jnewland])
 - Fix Tellstick doing I/O in event loop ([@balloob])
 - Fix KNX doing I/O in event loop ([@balloob])
 - Increase 警告 threshold for catching platforms that do I/O ([@balloob])
 - Change pilight systemcode validation ([@janLo])
 - Fix Yamaha discovering already configured receivers ([@sdague])
 - Fix Sonos from installing dependency each time HA was started ([@pvizeli])
 - Fix Synology 摄像头 SSL and 错误 handling ([@pvizeli])
 - Fix Panasonic Viera doing I/O in event loop ([@balloob])
 - Improve generic 摄像头 错误 handling ([@kellerza])
 - 灯光 - Flux Led 灯光: allow specifying mode if 灯光 does not support white mode ([@DanielHiversen])
 - Fix Rest 开关 default 模板 ([@pvizeli])

### 发布 0.32.4 - November 15

 - Fix 设备 tracker from crashing HASS when a new 设备 was discovered ([@balloob])
 - HTTP: Fix X-Forwarded-For feature ([@mweinelt])

### Misc

Our website has now an additional category called "Ecosystem". This will become the place where tools, apps, and other 助手 for the Home Assistant ecosystem can store their 文档 or guides.

- [iOS](/home-assistant/ecosystem/ios/)
- SceneGen

### Backward-incompatible changes

- The Yahoo Finance platform supports now multiple stock. Please adjust your 配置.
- Deprecated components `garage_door`, `rollershutter`, `thermostat`, and `hvac` have been removed.
- The minimum Python 版本 on Windows has been bumped to Python 3.5.
- The Insteon Hub 集成 has been disabled due to a [request from Insteon][req-insteon].

### If you need help...

...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The 发布 notes have comments enabled but it's preferred if you the former communication channels. Thanks.

[@mweinelt]: https://github.com/mweinelt
[@aa755]: https://github.com/aa755
[@americanwookie]: https://github.com/americanwookie
[@armills]: https://github.com/armills
[@andyat]: https://github.com/andyat
[@arsaboo]: https://github.com/arsaboo
[@balloob]: https://github.com/balloob
[@Bart274]: https://github.com/Bart274
[@bbesset]: https://github.com/bbesset
[@bestlibre]: https://github.com/bestlibre
[@bjarniivarsson]: https://github.com/bjarniivarsson
[@danielperna84]: https://github.com/danielperna84
[@DavidLP]: https://github.com/DavidLP
[@devdelay]: https://github.com/devdelay
[@fabaff]: https://github.com/fabaff
[@hartmms]: https://github.com/hartmms
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@janLo]: https://github.com/janLo
[@JasonCarter80]: https://github.com/JasonCarter80
[@joncar]: https://github.com/joncar
[@kellerza]: https://github.com/kellerza
[@Khabi]: https://github.com/Khabi
[@kirichkov]: https://github.com/kirichkov
[@lwis]: https://github.com/lwis
[@mezz64]: https://github.com/mezz64
[@molobrakos]: https://github.com/molobrakos
[@mtreinish]:  https://github.com/mtreinish
[@nsideras]: https://github.com/nsideras
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@postlund]: https://github.com/postlund
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@sdague]: https://github.com/sdague
[@simonszu]: https://github.com/simonszu
[@StaticCube]: https://github.com/StaticCube
[@tchellomello]: https://github.com/tchellomello
[@turbokongen]: https://github.com/turbokongen
[@wokar]: https://github.com/wokar
[@jnewland]: https://github.com/jnewland
[@DanielHiversen]: https://github.com/DanielHiversen

[currencylayer]: /integrations/currencylayer
[mochat]: /integrations/mochat/
[firetv]: /integrations/通知.firetv/
[Yamaha]: /integrations/yamaha
[hddtemp-传感器]: /integrations/hddtemp
[Sonos]: /integrations/sonos
[天气-传感器]: /integrations/#天气
[rpi-摄像头]: /integrations/rpi_camera
[rest-开关]: /integrations/开关.rest/
[emby-media]: /integrations/emby
[random-传感器]: /integrations/random#传感器
[yeelight]: /integrations/yeelight
[influx-传感器]: /integrations/influxdb#传感器
[天气-component]: /integrations/天气/
[cups-传感器]: /integrations/cups
[litejet]: /integrations/litejet/
[garadget]: /integrations/garadget/
[philips_player]: /integrations/philips_js
[icloud]: /integrations/icloud
[synologydsm]: /integrations/synologydsm
[dovado-传感器]: /integrations/dovado#传感器
[ios]: /ecosystem/ios/
[Hacktoberfest]: https://hacktoberfest.digitalocean.com/
[req-insteon]: https://github.com/home-assistant/home-assistant/issues/3811
[updater]: /博客/2016/10/25/explaining-the-updater/
[thingspeak]: /integrations/thingspeak/
