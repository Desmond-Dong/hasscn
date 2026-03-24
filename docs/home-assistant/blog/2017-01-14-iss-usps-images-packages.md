---
title: '0.36: ISS, USPS, 图像 processing, Insteon'
description: Track packages, space stations, TrackR 设备, Xiaomi, and UPC connect
  boxes
---

欢迎来到 2017，也欢迎来到 0.36。我们很高兴宣布今年的首个版本发布。虽然我们仍在继续将部分内容迁移到 async，但 0.36 主要聚焦于新功能和大量错误修复。

### Packages
[Packages][packages] 提供了一种全新的方式，用来将不同组件的配置部分组织在一起。通过 packages，你可以使用任意 `!include` 指令来引入不同组件，或者配置中的不同部分。

### InfluxDB export
[InfluxDB][influx] 组件此前在很多不同的使用场景下都会引发问题。[@titilambert] 改进了我们的 InfluxDB 导出功能。你可能需要运行这个[迁移脚本](/home-assistant/integrations/influxdb/#migration-脚本)，来更新你的 InfluxDB 数据库。

```bash
$ hass --script influxdb_migrator \
    -H IP_INFLUXDB_HOST -u INFLUXDB_USERNAME -p INFLUXDB_PASSWORD \
    -d INFLUXDB_DB_NAME
```

### International Space Station (ISS)
不，很遗憾，我们这次还不会飞向太空。`iss` 传感器可以追踪国际空间站的位置，并提供一些相关详情。

### Insteon local
由于一些问题，Insteon 支持曾在一段时间前被移除。现在，借助 `insteon_local` 组件，对 [Insteon][insteon] 的支持又回来了，并且可以让你在本地控制 Insteon 设置。

### 图像 processing
新的[图像处理组件][图像]目前已经可以配合[车牌识别][plates]使用。不过，这也为后续集成人脸识别、运动检测或手势控制等功能铺平了道路。

## All changes

- 传感器: Support for HydroQuebec ([@titilambert])
- 传感器: Tracking the [ISS][iss] ([@HydrelioxGitHub])
- 传感器: USPS deliveries tracking ([@happyleavesaoc])
- 设备 tracker: New [ping-based][ping] tracker ([@michaelarnauts])
- TTS: Support for [Pico][pico] ([@doudz])
- 开关: [BeagleBone Black][beaglebone] GPIO are supported now ([@MatoKafkac])
- 灯光: New support for [Tikteck][tik] 蓝牙 bulbs ([@mjg59])
- 开关: Support for customised [Kankun SP3 WiFi][kankun] 开关 ([@webworxshop])
- Insteon local: Local [insteon][insteon] support([@craigjmidwinter])
- `rest_command`: Support for using [REST][rest] ([@pvizeli])
- 传感器: Show details of the [Dublin RTPI][dublin] information ([@ttroy50])
- 灯光: [Zengge 蓝牙][zengge] bulbs ([@mjg59])
- 风扇: Wink support for [风扇][wink-风扇] ([@w1ll1am23])
- 设备 tracker: New [TrackR][trackr] 设备 tracker support ([@w1ll1am23])
- 设备 tracker: Support for [Xiaomi router][xiaomi] ([@RiRomain])
- 传感器: New [SMA Solar Webconnect][sma] 传感器 ([@kellerza])
- 通知: [Lannouncer][lannouncer] TTS support ([@michaelarnauts])
- 图像 processing: Support for [图像 processing][图像] ([@pvizeli])
- 设备 tracker: [UPC][upc] Connect box platform support ([@pvizeli])
- 天气: Australian BOM (Bureau of Meteorology) support ([@Zac-HD])
- 通知: Support for [MySensors][mysensors] 通知 ([@MartinHjelmare])
- TTS: New [Yandex SpeechKit TTS][yandex] 集成 ([@lupin-de-mid])
- 通知: [Facebook Messenger][facebook] support ([@gopalkildoliya])

- 传感器 - sonarr: Add `urlbase` to [Sonarr][] ([@quadportnick])
- 开关 - broadlink: Support for [SP][bl-开关] 设备 ([@Danielhiversen])
- Homematic: Support for HMIP-PSM or HMWIOSwitch ([@danielperna84], [@pvizeli])
- 灯光 - flux: Ledenet protocol support by Flux LED ([@bah2830])
- 设备 tracker: Support for longer intervals ([@partofthething])
- ISY994: 天气 传感器 added ([@rmkraus])
- InfluxDB: Improvements to avoid issues with storing details ([@titilambert])
- 灯光 - Yeelight: Auto discovery support and color temperature feature for [Yeelight][yeelight] ([@jjensn])
- Media player - SqueezeBox: 开关 to JSON-RPC ([@dasos])
- 脚本: Support for `last_triggered` ([@Danielhiversen])
- Media player: Support for `SUPPORT_PLAY` flag ([@armills])
- Docker: `ffmpeg` is now included by default ([@colinodell])
- Minor and not so minor features and bug fixes by [@balloob], [@pvizeli], [@fabaff], [@mezz64], [@andrey-git], [@aequitas], [@abmantis], [@turbokongen], [@jabesq], [@michaelarnauts], [@kellerza], [@titilambert], [@btorresgil], [@henworth], [@armills], [@mjg59], [@Giannie], [@n8henrie], [@magicus], [@florianholzapfel], [@MrMep], [@bah2830], [@happyleavesaoc], [@lwis], [@glance-], [@markferry], and [@nikdoof].

### 发布 0.36.1 - January 17

 - Fix load_yaml default value ([@balloob])
 - Fix discovery of flux_led ([@Danielhiversen])
 - Fix Python Nest dependency re-安装 ([@Danielhiversen])
 - Make USPS to use absolute path to save cookie ([@tchellomello])
 - Fix UPC_connect cookies ([@pvizeli])
 - Fix Eq3bt import issues ([@rytilahti])
 - Fix 蓝牙 and Volvo trackers ([@pvizeli])
 - Fix lannouncer 通知 platform ([@mKeRix])

### Backward-incompatible changes

- [APNS][apns] 服务 was moved to the `notify` domain. Use `notify.apns_NOTIFIER_NAME` instead of `apns.NOTIFIER_NAME`.
- [InfluxDB][influx] component has a new [schema](/home-assistant/integrations/influxdb/#data-migration) to store values in the InfluxDB database. You may require to run the [`influxdb_migrator`](/home-assistant/integrations/influxdb/#migration-脚本) 脚本.
  You have to note:
  - There will not be any tags/fields named time anymore.
  - All numeric fields (int/float/bool) will be stored as float inside influx db.
  - All string fields corresponding to 状态 属性 will be renamed as FIELDNAME_str, where FIELDNAME is the 状态 属性, to avoid type conflicts.
  - All string fields corresponding to a 状态 will be renamed as 状态 (former value).
  - Fields named value will always be stored as float.
  - Fields named 状态 will always be stored as string.
- TTS cache files use now the language abbreviation as part of the name. If you want to use the cache, it need to be renamed or cleared, new 创建. E. g. `HASH_PLATFORM.xxx` -> `HASH_LANG_PLATFORM.xxx`.

### If you need help...
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The 发布 notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### Reporting Issues
Experiencing issues introduced by this 发布? Please report them in our [issue tracker](https://github.com/home-assistant/home-assistant/issues). Make sure to fill in all fields of the issue 模板.

[@tchellomello]: https://github.com/tchellomello
[@rytilahti]: https://github.com/rytilahti
[@mKeRix]: https://github.com/mKeRix
[@abmantis]: https://github.com/abmantis
[@aequitas]: https://github.com/aequitas
[@andrey-git]: https://github.com/andrey-git
[@armills]: https://github.com/armills
[@bah2830]: https://github.com/bah2830
[@balloob]: https://github.com/balloob
[@brandonweeks]: https://github.com/brandonweeks
[@btorresgil]: https://github.com/btorresgil
[@colinodell]: https://github.com/colinodell
[@Danielhiversen]: https://github.com/Danielhiversen
[@danieljkemp]: https://github.com/danieljkemp
[@danielperna84]: https://github.com/danielperna84
[@dasos]: https://github.com/dasos
[@DavidLP]: https://github.com/DavidLP
[@doudz]: https://github.com/doudz
[@eieste]: https://github.com/eieste
[@fabaff]: https://github.com/fabaff
[@florianholzapfel]: https://github.com/florianholzapfel
[@Giannie]: https://github.com/Giannie
[@glance-]: https://github.com/glance-
[@gopalkildoliya]: https://github.com/gopalkildoliya
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@henworth]: https://github.com/henworth
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@jabesq]: https://github.com/jabesq
[@jjensn]: https://github.com/jjensn
[@kellerza]: https://github.com/kellerza
[@kk7ds]: https://github.com/kk7ds
[@lupin-de-mid]: https://github.com/lupin-de-mid
[@lwis]: https://github.com/lwis
[@magicus]: https://github.com/magicus
[@markferry]: https://github.com/markferry
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@MatoKafkac]: https://github.com/MatoKafkac
[@mezz64]: https://github.com/mezz64
[@michaelarnauts]: https://github.com/michaelarnauts
[@mjg59]: https://github.com/mjg59
[@MrMep]: https://github.com/MrMep
[@n8henrie]: https://github.com/n8henrie
[@nikdoof]: https://github.com/nikdoof
[@partofthething]: https://github.com/partofthething
[@pvizeli]: https://github.com/pvizeli
[@quadportnick]: https://github.com/quadportnick
[@RiRomain]: https://github.com/RiRomain
[@rmkraus]: https://github.com/rmkraus
[@scmmmh]: https://github.com/scmmmh
[@technicalpickles]: https://github.com/technicalpickles
[@titilambert]: https://github.com/titilambert
[@ttroy50]: https://github.com/ttroy50
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@craigjmidwinter]: https://github.com/craigjmidwinter
[@webworxshop]: https://github.com/webworxshop
[@Zac-HD]: https://github.com/Zac-HD

[apns]: /integrations/apns
[beaglebone]: /integrations/bbb_gpio/
[bl-开关]: /integrations/broadlink#开关
[dublin]: /integrations/dublin_bus_transport/
[facebook]: /integrations/facebook
[图像]: /integrations/image_processing/
[influx]: /integrations/influxdb/
[insteon]: /integrations/insteon/
[iss]: /integrations/iss
[kankun]: /integrations/kankun
[lannouncer]: /integrations/lannouncer
[mysensors]: /integrations/通知.mysensors/
[packages]: /topics/packages/
[pico]: /integrations/picotts
[ping]: /integrations/ping
[plates]: /integrations/openalpr_local/
[rest]: /integrations/rest_command/
[sma]: /integrations/sma#传感器
[sonarr]: /integrations/sonarr
[tik]: /integrations/tikteck
[trackr]: /integrations/trackr
[upc]: /integrations/upc_connect
[usps]: /integrations/usps#传感器
[wink-风扇]: /integrations/wink#风扇
[xiaomi]: /integrations/device_tracker.xiaomi/
[yandex]: /integrations/yandextts
[yeelight]: /integrations/yeelight
[zengge]: /integrations/zengge
