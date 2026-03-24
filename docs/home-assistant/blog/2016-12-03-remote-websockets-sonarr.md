---
title: '0.34：全新的遥控器组件、WebSocket、Sonarr，以及 GPSLogger'
description: HomeMatic、Tellstick、HTTP 组件等都迎来了重大改进。
---

来吧……0.34。我们就叫它“圣诞老人”发布吧。鲁道夫比预期跑得更快，雪橇上装满了各种好东西。当然，还有 [@pvizeli] 和 [@balloob] 在异步编程上的更多工作、新组件、新平台、重大改进，以及更多内容。

### GPSLogger

借助 [@dainok] 的工作，你可以在 Android 设备上启用地理定位功能，并通过 [GPSLogger](https://github.com/mendhak/gpslogger/releases) 应用使用 GPS 或 WiFi 网络进行位置追踪。GPSLogger 支持多种定位来源：被动模式会直接使用 Android 最近一次已知位置，不会主动启用 GPS 传感器，也不会扫描 WiFi 网络。

### 遥控器组件

由 [@iandday] 打造的全新 [`remote`][遥控器] 组件，将简化各种遥控控制单元的集成。这个发布已经包含了首个 [Harmony][harmony] 平台。

### HomeMatic

[HomeMatic][homematic] 组件迎来了一些值得一提的更新：

- 新增服务
  - `reconnect`：无需重启 Home Assistant，即可重新连接到你的 CCU/Homegear。
  - `set_dev_value`：即使某个设备尚未被 Home Assistant 原生支持，也可以手动控制。
- 支持多个 HomeMatic 主机
- 支持 HomeMatic Wired（大多数设备）和 HomeMatic IP（部分设备）
- 各种改进与修复，尤其是 HM-Sec-Key（KeyMatic）相关内容

支持多主机是因为现在允许将无线、有线和 IP 设备进行混合配置。这一变化的代价是此次更新会带来不兼容变更（同时 `set_value` 服务也已重命名）。不过，新增的能力和可能性是值得的。

### WebSocket API

这个发布包含了由 [@balloob] 开发的全新 [websockets][websockets] API，为下一代 Home Assistant 前端提供基础支持。当前前端已经部分迁移到该 API，未来还会继续推进。

## All changes

- New 服务 and improved 设备 support for [HomeMatic][homematic] ([@pvizeli], [@danielperna84])
- 设备 tracker: New support for [GPSLogger][gpslogger] ([@dainok])
- 传感器: Support for [Sonarr][sonarr] ([@hborawski])
- 传感器: [World Air Quality Index][waqi] 传感器 ([@valentinalexeev], [@fabaff])
- 传感器: Support for [Dutch Smart Meter Requirements][dsmr] ([@aequitas])
- 开关: Hook support by hooksmarthome.com ([@dasos])
- 摄像头: 集成 for [Nest 摄像头][nest-cam] ([@technicalpickles])
- 灯光: Support for 灯光 effects ([@Diaoul])
- 传感器: New [Threshold][threshold] 传感器 ([@fabaff])
- Media player: New [DuneHD][dunehd] 集成([@valentinalexeev])
- Media player: Controlling support for [Philips TVs][philips] ([@aequitas])
- 摄像头: Support for [Amcrest][amcrest] 摄像头 ([@tchellomello])
- 传感器: Monitoring support for [Network UPS Tools (NUT)][nut] ([@mezz64])

- Mediap player - Denon: Source selection support ([@Gilles95])
- 传感器 - MinMax: Precision now configurable ([@exxamalte])
- Tellstick: Massive [improvement][tellstick] ([@magicus])
- 灯光 - Osram: New requirement ([@tfriedel])
- 传感器 - Systemmonitor: Support for removable network adapters ([@mnoorenberghe])
- LiteJet: New 触发器 option ([@joncar])
- Media player - Bose: Add Bose SoundTouch 设备 support ([@CharlesBlonde])
- HTTP: Re-organisation and [websockets] support ([@balloob])
- HTTP: Advanced [IP filtering][filtering] ([@vkorn])
- 传感器 - KNX: Fix unit of mesaurement ([@cyberjunky])
- 温控: New precision properties ([@sdague])
- 传感器 - TEMPer: Reset [设备][temper] on address change ([@vemek])
- 核心: Color names now follow w3.org recommandations ([@srcLurker])
- Updater: Robustness improvements ([@balloob]])
- Media player - MPD: Reconnect to daemon ([@janLo])
- 设备 tracker: Fall-back for MAC address lookup ([@aequitas])
- 传感器 - Efergy: Get the amount of [energy consumed][efergy] ([@gonzalezcalleja])
- Zeroconf: Fix for IPv6 support ([@rcloran])
- Minor and not so minor features and bug fixes by [@turbokongen], [@sdague], [@pvizeli], [@fabaff], [@chapple], [@mweinelt], [@Khabi], [@balloob], [@mnestor], [@kellerza], [@Morrisai],
[@michaelarnauts], [@tchellomello], [@lwis], [@bjarniivarsson], [@danielperna84], [@LinuxChristian], [@MartinHjelmare], [@dethpickle], [@jnewland], [@lichtteil], [@brandonweeks], [@partofthething], [@mnoorenberghe], [@bah2830], and [@albertoarias].

### 发布 0.34.1 - December 4

This 发布 has a bunch of bug fixes including a big one: emulated_hue will now work with Google Home! We usually reserve patch releases for small bug fixes but we considered this more impactful bug fix so important that we're including it now instead of having people wait two weeks.

To make the fix backwards compatible (it is a patch 发布 after all) you will have to add two new 配置 option to emulated_hue to have it work with Google Home:

```yaml
emulated_hue:
  type: google_home
  # This is important. Sadly, Google Home will not work with other ports.
  listen_port: 80
```

We are working on a better solution for 0.35.

- Fix emulated_hue with Google Home ([@balloob])
- Fix Sonos invalid config 错误 ([@pvizeli])
- Fix Synology DSM doing I/O inside event loop ([@balloob])
- Fix Nest 摄像头 issues ([@technicalpickles])
- Fix occasional hangs in Homematic ([@pvizeli])
- Revert TP-Link 升级 to fix issues ([@mweinelt])
- Fix CORS ([@balloob])

### 发布 0.34.2 - December 5

- Fix Nest interpreting Celsius as Fahrenheit and converting it ([@balloob])
- Fix Nest 传感器 platforms throwing 错误 ([@technicalpickles])
- 前端 will now always show persistent_notification and configurator 实体 even if not part of the active view ([@balloob])
- Fixed media player 卡片 taking up unnecessary space ([@balloob])

### 发布 0.34.3 - December 6

 - Fix Hook connections ([@dasos])
 - Fix random websocket connections ([@balloob])
 - Fix Google Home sometimes not finding our emulated_hue ([@jawilson])
 - Fix EnOcean config validation ([@rubund])

### 发布 0.34.4 - December 7

 - Fix InfluxDB without 认证 ([@balloob])
 - Fix Kodi without 认证 ([@balloob])
 - Fix incorrect caching of /api/error_log ([@armills])
 - Fix incorrect ordering of 服务 calls which could cause delays between turning on multiple 实体 ([@balloob])
 - Fix Nest 温控 temperature issues ([@technicalpickles])

### 发布 0.34.5 - December 12

 - Fix Nest 传感器 doing I/O inside event loop ([@balloob])
 - Fix Nest 版本 bump not triggering re-安装 ([@EarthlingRich])
 - Fix Nest 摄像头 without activity 区域 ([@technicalpickles])
 - Fix Plex doing I/O inside event loop ([@balloob])

### Backward-incompatible changes

- The [HomeMatic][homematic] component now uses a different syntax for hosts and the `set_value` 服务 has been renamed.
- All [RFXtrx][rfxtrx] 传感器 will get a new 实体 ID.
- The 前端 now uses websockets. If you run a server in front of Home Assistant, you will have to 更新 your config (example [nginx][nginx])
- [Nest][nest] contains changes which will require your attention.

### If you need help...

...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The 发布 notes have comments enabled but it's preferred if you use these communication channels. Thanks.

### Reporting Issues

Experiencing issues introduced by this 发布? Please report them in our [issue tracker](https://github.com/home-assistant/home-assistant/issues). Make sure to fill in all fields of the issue 模板.

[@EarthlingRich]: https://github.com/EarthlingRich
[@armills]: https://github.com/armills
[@jawilson]: https://github.com/jawilson
[@rubund]: https://github.com/rubund
[@aequitas]: https://github.com/aequitas
[@albertoarias]: https://github.com/albertoarias
[@bah2830]: https://github.com/bah2830
[@balloob]: https://github.com/balloob
[@bjarniivarsson]: https://github.com/bjarniivarsson
[@brandonweeks]: https://github.com/brandonweeks
[@cawilliamson]: https://github.com/cawilliamson
[@chapple]: https://github.com/chapple
[@CharlesBlonde]: https://github.com/CharlesBlonde
[@cyberjunky]: https://github.com/cyberjunky
[@dainok]: https://github.com/dainok
[@danielperna84]: https://github.com/danielperna84
[@dasos]: https://github.com/dasos
[@dethpickle]: https://github.com/dethpickle
[@Diaoul]: https://github.com/Diaoul
[@exxamalte]: https://github.com/exxamalte
[@fabaff]: https://github.com/fabaff
[@Gilles95]: https://github.com/Gilles95
[@gonzalezcalleja]: https://github.com/gonzalezcalleja
[@hartmms]: https://github.com/hartmms
[@hborawski]: https://github.com/hborawski
[@iandday]: https://github.com/iandday
[@janLo]: https://github.com/janLo
[@jnewland]: https://github.com/jnewland
[@joncar]: https://github.com/joncar
[@kellerza]: https://github.com/kellerza
[@Khabi]: https://github.com/Khabi
[@lichtteil]: https://github.com/lichtteil
[@LinuxChristian]: https://github.com/LinuxChristian
[@lwis]: https://github.com/lwis
[@magicus]: https://github.com/magicus
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@mezz64]: https://github.com/mezz64
[@mezz64]: https://github.com/mezz64
[@michaelarnauts]: https://github.com/michaelarnauts
[@mnestor]: https://github.com/mnestor
[@mnoorenberghe]: https://github.com/mnoorenberghe
[@molobrakos]: https://github.com/molobrakos
[@Morrisai]: https://github.com/Morrisai
[@mtreinish]:  https://github.com/mtreinish
[@mweinelt]: https://github.com/mweinelt
[@nsideras]: https://github.com/nsideras
[@partofthething]: https://github.com/partofthething
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@postlund]: https://github.com/postlund
[@pvizeli]: https://github.com/pvizeli
[@rcloran]: https://github.com/rcloran
[@sdague]: https://github.com/sdague
[@skyval]: https://github.com/skyval
[@srcLurker]: https://github.com/srcLurker
[@tchellomello]: https://github.com/tchellomello
[@technicalpickles]: https://github.com/technicalpickles
[@tfriedel]: https://github.com/tfriedel
[@turbokongen]: https://github.com/turbokongen
[@valentinalexeev]: https://github.com/valentinalexeev
[@vemek]: https://github.com/vemek
[@vkorn]: https://github.com/vkorn

[amcrest]: /integrations/amcrest
[boradlink]: /integrations/broadlink#传感器
[dsmr]: /integrations/dsmr
[dunehd]: /integrations/dunehd
[efergy]: /integrations/efergy
[filtering]: /integrations/http/
[gpslogger]: /integrations/gpslogger
[harmony]: /integrations/harmony
[homematic]: /integrations/homematic/
[nest-cam]: /integrations/nest#摄像头
[nest]: /integrations/nest/
[nginx]: /docs/ecosystem/nginx
[nut]: /integrations/nut
[philips]: /integrations/philips_js
[遥控器]: /integrations/遥控器/
[rfxtrx]: /integrations/rfxtrx/
[sonarr]: /integrations/sonarr
[tellstick]: /integrations/tellstick/
[temper]: /integrations/temper
[threshold]: /integrations/threshold
[websockets]: /developers/websocket_api/
[waqi]: /integrations/waqi
