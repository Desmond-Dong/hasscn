# 0.37: Face detection, Coffee, Wink

这次没有统计数字，也没有各种数据总结。好吧，其实还是有一个数字：0.37。我们已经回到了双周发布的节奏上。除了若干组织层面的变化，这次发布也再次带来了不少酷炫的新功能和新集成。也请留意“Backward-incompatible changes”部分，因为其中还包含了一些针对特定平台和组件的重要改进。

### Governance

正如之前宣布的那样，新的 [Governance][gov] 要求开发者签署 CLA。[Code of Conduct][coc]、[Contributor License Agreement][cla]，以及合适的 [Licensing][license]，将帮助保护 Home Assistant 生态系统中的所有参与者，从用户、社区成员，到贡献者。

### Face recognition using the Microsoft Face API

[@pvizeli] 最近在图像处理集成方面持续高产，这一次带来的是 [Microsoft Face API][face]。这意味着你现在可以用想要识别的人来训练这个 API，并将摄像头拍摄的图像发送给它，作为自动化的另一个输入来源。

想在有人进门时播放一段专属音乐吗？现在已经可以了 😎

### Improved 摄像头 security

在 Stephen O'Conner 进行安全审计后，他发现我们用于生成摄像头视频流访问令牌的随机源其实有一定可预测性，理论上可能在 2.5 周内被暴力破解。本次发布已经包含修复：改为使用系统提供的随机数生成器，以获得更高的随机性，并且每 10 分钟轮换一次密钥，从而缩小暴力攻击可能成功的时间窗口。

虽然旧方法并不能说是不安全，但新方法显然安全得多。我们建议你升级到最新版本。

### New customization options

[@Andrey-git] 为 customize 功能加入了一些非常实用的新选项。你现在可以通过通配符为实体设置自定义内容，也可以针对某个特定 domain 进行自定义。

### Major Wink and HDMI-CEC improvements

[@w1ll1am23] 在修复 Wink 集成的大量错误和问题方面做了非常出色的工作。其中最大的改进是，现在它已经能够自动刷新认证令牌。这意味着，如果你已经在 `configuration.yaml` 中填写了邮箱地址和密码，就不再需要 `client_id`、`client_secret`，以及通过 [Wink][wink] 文档中生成器生成的令牌了。

新的 Wink 支持会导致所有二元传感器被重新命名，同时也会为那些在旧版本中未被发现或不受支持的设备创建新的传感器。

多亏了 [@konikvranik]，[HDMI-CEC][cec] 集成迎来了一次重大更新，并包含大量改进。这次更新会让 HDMI-CEC 更易于使用，也能带来更强的控制能力。

### First Coffee Maker supported

[@stu-gott] 为 Home Assistant 添加了首个咖啡机支持：[Mr. Coffee Smart Optimal Brew][coffee]。祝你冲煮愉快！

### All changes

#### New platforms/components

* Netatmo: [Netatmo][netatmo] 在场 support ([@gieljnssns])
* 传感器: [Amcrest][amcrest] 摄像头 传感器 ([@tchellomello])
* 通知: New [Discord][discord] 通知 component ([@Deinara])
* 设备 tracker: [Tado][tado] 设备 tracker support ([@jmvermeulen])
* 传感器: Add [Skybeacon][skybeacon] BLE temperature/humidity 传感器 ([@anpetrov])
* New [Zabbix][zabbix] component ([@Whytey])
* Media  player: New platform [Anthemav][anthem] Media player ([@nugget])
* 灯光: Add support for [Avion][avion] 蓝牙 dimmer 开关 ([@mjg59])
* 二元sensor: [Beaglebone Black][bb-bin] 二元sensor ([@MatoKafkac])
* 灯光: [Piglow][piglow] support ([@xarnze])
* [Face][face] recognition for 自动化 ([@pvizeli])
* 传感器: New [Washington 状态 DOT][wsdot] 传感器 ([@partofthething])
* Support for Wemo CoffeeMaker 设备 ([@stu-gott])
* 设备 tracker: [Sky hub][sky] support ([@alexmogavero])
* Support for [Lutron][lutron] RadioRA 2 ([@thecynic])
* TTS: Amazon [Polly TTS][polly] platform ([@robbiet480])
* 设备 tracker: Support for Linksys Access Points ([@lukas-hetzenecker])
* 通知: Make calls with [Twilio][twilio] ([@fakezeta])

#### Improvements

* 脚本: Fix 脚本 发布 ([@balloob])
* 摄像头 - Amcrest: Add support for direct MJPEG streams from Amcrest 摄像头 ([@colinodell])
* 传感器 - Miflora: Removing throttle decorator ([@freol35241])
* 通知 - Lannouncer: Fix `get_service` method ([@mKeRix])
* 传感器 - WAQI: Add station parameter to waqi 传感器 ([@whhsw])
* 传感器 - USPS: Absolute path to save cookie used by USPS 传感器 ([@tchellomello])
* Nest: Fix python-nest 发布 number ([@Danielhiversen])
* Keyboard 遥控器: Improve support ([@MrMep])
* 设备 tracker - VolvoOnCall: Fix timedelta ([@pvizeli])
* 温控 - eq3btsmart: Expose away 属性 ([@rytilahti])
* 遥控器: Reserve a test port for broken API to fix race ([@armills])
* 温控 - Ecobee: Made target temperature sensitive to auto mode ([@Duoxilian])
* 配置: Fix load\_yaml default value ([@balloob])
* 通知 - Facebook: Fix encoding 错误 ([@Danielhiversen])
* Emulated\_hue: Add `upnp_bind_multicast` option, default type to Google, and persist emulated hue IDs ([@hoopty], [@balloob])
* Docker: 安装 phantomjs in Docker 容器 ([@jnewland])
* Media player - MPD: Add listing and selection of available MPD playlists ([@partofthething])
* Media player - Denon AVR: Denon improvements ([@glance-])
* 灯光 - x10.py: Improved x10 状态 monitoring ([@martst])
* 传感器 - DSMR: TCP, reconnecting and V4 CRC support ([@aequitas])
* Media player - Yamaha.py: Fix Yamaha doing I/O in event loop ([@balloob])
* 设备 tracker UPC: Make upc more robust ([@pvizeli])
* 温控 - Generic thermostat: 更新 ([@MrMep])
* 设备 tracker - Xiaomi.py: Xiaomi Mi Router token refresh ([@RiRomain])
* 摄像头 - MJPEG: Support still 图像 for thumbmail ([@pvizeli])
* 传感器 - ZAMG: Updated valid station id list ([@HerrHofrat])
* 灯光 - ISY994: Not overwrite `state_attributes` ([@rmkraus])[emul-hue]
* 灯光 - Zwave: Use only supported features for 设备 ([@turbokongen])
* Media player - Kodi: Support for volume stepping ([@armills])
* Media player- roku: Use `is_screensaver`, 更新 IDLE 状态, and use 设备 name ([@robbiet480], [@xhostplus])
* 开关 - HDMI-CEC: Support for 设备 and commands ([@konikvranik])
* 门锁 - Zwave: Improvements to Zwave 门锁 platform ([@turbokongen])
* TTS: Invalidate broken file cache entries ([@stu-gott])
* 灯光 - Hue: Improvements ([@robbiet480])
* TTS - YandexTTS: Added speed and emotion to Yandex TTS ([@lupin-de-mid])
* 灯光 - tellstick.py: Tellstick 灯光 fix ([@stefan-jonasson])
* 开关 - insteon\_local.py: only check for 设备 when not defined in config ([@craigjmidwinter])
* 通知 - Twitter: Allow direct messaging to 用户 ([@fabaff])
* 风扇 - MQTT: Don't set a speed when 风扇 turns on ([@robbiet480])
* Config: Allow easier customization of whole domain, 实体 lists, globs ([@andrey-git])
* 传感器 - Homematic: 更新 设备 support ([@danielperna84])
* 二元sensor - ISS: Add location to 属性 and option to show position on the map ([@fabaff])
* Media player - Kodi: Add SSL 配置 option ([@ecksun])
* 传感器 - WAQI: Add missing particle value ([@fabaff])
* Wink: Support for python-wink 1.0.0 ([@w1ll1am23])
* 二元sensor - RPi GPIO: Add a small sleep before reading the 传感器 ([@snagytx])
* 传感器 - USPS: Add name to 配置 ([@happyleavesaoc])
* 传感器 - Miflora: Remove throttle decorator from miflora platform ([@freol35241])
* 设备 tracker - asuswrt.py: Add IPv6 support when parsing neighbors ([@leppa])
* iOS: Discover 通知.ios when iOS component loads ([@robbiet480])
* Homematic: Add MAX shutter contact class ([@jannau])
* 传感器 - Darksky: Added forecast support ([@nordlead2005])
* 开关 - Pilight: Implement echo config option ([@janLo])
* 核心: Support customize in packages ([@kellerza])
* 开关 - Flux: Allow disabling setting the brightness ([@rytilahti])
* Media player - Sonos: Add `is_coordinator`, set coordinator after join/unjoin, and no empty 图像 ([@pvizeli], [@andrey-git], [@robbiet480])
* 温控: Hold mode ([@Duoxilian])
* 开关 - TPlink: No longer doing I/O in event bus ([@balloob])
* 灯光 - Insteon local: Improve Insteon 配置 ([@craigjmidwinter])
* Emulated Hue: Emulated Hue "host-ip" fails to bind when running in Docker without `--net=host` ([@jeremydk])
* 温控 - EQ3 BT smart: Add reporting for availability ([@rytilahti])

Bugfix: [@balloob], [@fabaff], [@freol35241], [@pvizeli], [@Danielhiversen], [@tdickman], [@armills], [@rytilahti], [@EarthlingRich], [@asbach], [@happyleavesaoc], [@robbiet480], [@colinodell], [@joopert], [@dale3h], [@pavoni], [@jaharkes], [@MartinHjelmare], [@mezz64], [@jabesq], and you if you are missing in this list.

### 发布 0.37.1 - February 2

* Do not reject alphanumeric IDs for PiLight ([@DavidLP])
* Fix broken Hue discovery ([@DanielHiversen])
* Fix Amcrest ([@tchellomello])
* Fix Telldus Live dim level 错误 on startup ([@molobrakos])
* Fix Sonos group coordinators ([@pvizeli])
* UPC Connect: Parse XML outside event loop ([@pvizeli])
* Fix Netatmo SSL issue with VPN URL ([@jabesq])
* Homematic: Fix bug with UNREACH 设备 状态/恢复 and variables not updating ([@pvizeli])
* Sonos: Prevent duplicate entries in favorite list ([@pvizeli])
* Fix Schlage Connect deadbolt 集成 via Z-Wave ([@turbokongen])
* Prevent infinite loop in crossconfigured MQTT event streams ([@aequitas])
* Fix Hue lightgroups failing on startup (@tboyce1)

### Backward-incompatible changes

* A **major** breaking change in the [`emulated_hue`][emul-hue] component means that unless you set `type: alexa` before starting up the newer Home Assistant 版本 you will lose all 设备 that Alexa has discovered and will need to re-add them as well as create new groups.
* The platform of the [ISS][iss] 集成 was change to `binary_sensor`. Please check the platform 文档.
* The [Roku][roku] media uses now a new format for the 实体 IDs.
* [OpenALPR][openalpr] is no longer a component. It's now a platform for [图像 processing][图像].
* Due to massive improvements of the [Wink][wink] 集成, the names of your 二元sensor will change and new 设备 can show up.
* The [MySensors][mysensors] component now requires all persistence file paths to be set if any is set by the 用户. This is to avoid name conflicts for the paths. If no path is set Home Assistant will set all paths for you.
* The [Sonos][sonos] 服务 `sonos_group_players` was removed. Use now `sonos_join` for this function.
* TTS cache have change for the last time. Files use now also an option hash as part of the name. If you want to use the cache, it need to be renamed or cleared, new 创建. E. g. `HASH_LANG_PLATFORM.xxx` -> `HASH_LANG_OPTIONS_PLATFORM.xxx`, replace *OPTIONS* with `-` on exiting platforms.

### If you need help...

...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The 发布 notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### Reporting Issues

Experiencing issues introduced by this 发布? Please report them in our [issue tracker](https://github.com/home-assistant/home-assistant/issues). Make sure to fill in all fields of the issue 模板.

[@DavidLP]: https://github.com/DavidLP

[@molobrakos]: https://github.com/molobrakos

[@MrMep]: https://github.com/MrMep

[@joopert]: https://github.com/joopert

[@armills]: https://github.com/armills

[@janLo]: https://github.com/janLo

[@happyleavesaoc]: https://github.com/happyleavesaoc

[@danielperna84]: https://github.com/danielperna84

[@lukas-hetzenecker]: https://github.com/lukas-hetzenecker

[@robbiet480]: https://github.com/robbiet480

[@mjg59]: https://github.com/mjg59

[@turbokongen]: https://github.com/turbokongen

[@whhsw]: https://github.com/whhsw

[@jabesq]: https://github.com/jabesq

[@asbach]: https://github.com/asbach

[@stefan-jonasson]: https://github.com/stefan-jonasson

[@fabaff]: https://github.com/fabaff

[@RiRomain]: https://github.com/RiRomain

[@freol35241]: https://github.com/freol35241

[@jmvermeulen]: https://github.com/jmvermeulen

[@thecynic]: https://github.com/thecynic

[@aequitas]: https://github.com/aequitas

[@balloob]: https://github.com/balloob

[@konikvranik]: https://github.com/konikvranik

[@jeremydk]: https://github.com/jeremydk

[@alexmogavero]: https://github.com/alexmogavero

[@Duoxilian]: https://github.com/Duoxilian

[@nugget]: https://github.com/nugget

[@mezz64]: https://github.com/mezz64

[@pavoni]: https://github.com/pavoni

[@MartinHjelmare]: https://github.com/MartinHjelmare

[@EarthlingRich]: https://github.com/EarthlingRich

[@andrey-git]: https://github.com/andrey-git

[@kellerza]: https://github.com/kellerza

[@dale3h]: https://github.com/dale3h

[@Deinara]: https://github.com/Deinara

[@jaharkes]: https://github.com/jaharkes

[@tchellomello]: https://github.com/tchellomello

[@jannau]: https://github.com/jannau

[@glance-]: https://github.com/glance-

[@w1ll1am23]: https://github.com/w1ll1am23

[@ecksun]: https://github.com/ecksun

[@nordlead2005]: https://github.com/nordlead2005

[@rytilahti]: https://github.com/rytilahti

[@rmkraus]: https://github.com/rmkraus

[@pvizeli]: https://github.com/pvizeli

[@anpetrov]: https://github.com/anpetrov

[@partofthething]: https://github.com/partofthething

[@craigjmidwinter]: https://github.com/craigjmidwinter

[@Danielhiversen]: https://github.com/Danielhiversen

[@colinodell]: https://github.com/colinodell

[@hoopty]: https://github.com/hoopty

[@martst]: https://github.com/martst

[@Whytey]: https://github.com/Whytey

[@MatoKafkac]: https://github.com/MatoKafkac

[@stu-gott]: https://github.com/stu-gott

[@jnewland]: https://github.com/jnewland

[@tdickman]: https://github.com/tdickman

[@xarnze]: https://github.com/xarnze

[@snagytx]: https://github.com/snagytx

[@gieljnssns]: https://github.com/gieljnssns

[@leppa]: https://github.com/leppa

[@lupin-de-mid]: https://github.com/lupin-de-mid

[@HerrHofrat]: https://github.com/HerrHofrat

[@xhostplus]: https://github.com/xhostplus

[@mKeRix]: https://github.com/mKeRix

[@fakezeta]: https://github.com/fakezeta

[amcrest]: /integrations/amcrest/#binary_sensors

[discord]: /integrations/discord

[tado]: /integrations/tado

[sky]: /integrations/sky_hub

[zabbix]: /integrations/zabbix/

[avion]: /integrations/avion

[anthem]: /integrations/anthemav

[bb-bin]: /integrations/bbb_gpio#binary-传感器

[piglow]: /integrations/piglow

[wsdot]: /integrations/wsdot

[skybeacon]: /integrations/skybeacon

[lutron]: /integrations/lutron/

[polly]: /integrations/amazon_polly

[emul-hue]: /integrations/emulated_hue/

[netatmo]: /integrations/netatmo/

[face]: /integrations/microsoft_face/

[iss]: /integrations/iss

[roku]: /integrations/roku#media-player

[openalpr]: /integrations/index.md#图像-processing

[图像]: /integrations/image_processing/

[emul_hue]: https://github.com/home-assistant/home-assistant/pull/5549

[coc]: /developers/code_of_conduct/

[cla]: /developers/cla/

[gov]: /博客/2017/01/21/home-assistant-governance/

[license]: /developers/license/

[wink]: /integrations/wink/

[coffee]: /integrations/wemo

[cec]: /integrations/hdmi_cec/

[mysensors]: /integrations/mysensors/

[sonos]: /integrations/sonos

[twilio]: /integrations/twilio_call
