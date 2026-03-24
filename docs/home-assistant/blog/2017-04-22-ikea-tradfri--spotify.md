---
title: 'Home Assistant 0.43: IKEA Trådfri, Spotify and our iOS app is live'
description: Another packed release. Three major cool new features and a ton of small
  ones.
---

<a href='/home-assistant/integrations/#added_in_current_version'><img src='/home-assistant/images/blog/2017-04-0.43/components.png' style='border: 0;box-shadow: none;'></a>

噢耶，0.43 来了，而且这会是一次非常重磅的发布。如果你一直有关注我们的社交媒体，可能已经注意到 [我们对全新的 IKEA Trådfri 产品线非常兴奋][ikea-博客]。因此，我们也很高兴地宣布，感谢 [@ggravlingen]、[@MartinHjelmare] 和我自己的努力，这将成为首个支持 IKEA 灯泡的版本。Home Assistant 会自动检测你网络中的网关，并在你按照说明完成设置后，让你控制这些灯光。

<p class='img'>
<img src='/home-assistant/images/blog/2017-04-tradfri/discovery.png' />
自动发现完成后，Home Assistant 会提示你完成与网关的配对。
</p>

如果你错过了另一条重磅消息：[ @robbiet480 ] 发布了 [我们 iOS 应用的首个版本][ios]！这个项目花了一年多时间，但它确实带来了许多让你的 iDevice 与 Home Assistant 配合工作的优秀方式。热烈祝贺 Robbie 正式发布！和我们的其他项目一样，这款应用也基于 APACHE 2 协议开源，欢迎贡献者加入。[来看看吧。][ios-source]

本次发布还要特别感谢 [@happyleavesaoc]，感谢他持续不断地为 Home Assistant 带来精彩贡献。他的第一次贡献可以追溯到 2015 年 10 月，从那以后，[@happyleavesaoc] 已经参与了许多平台和错误修复，包括这次发布中的 Spotify 平台。谢谢你，[@happyleavesaoc]，你很好地诠释了我们的社区为何如此出色。

新的 Spotify 集成基于全新的 Spotify Connect Playback API。它支持播放控制、专辑封面显示，以及切换当前控制的 Spotify 设备。

另外也别忘了，你还有整个周末的时间，可以为我们在 [获得 Thomas Krenn Award 2017][krenn] 后拿到的低功耗服务器赠送活动 [提交申请][application]。[快去报名吧！][application]

[ikea-博客]: /博客/2017/04/17/ikea-tradfri-internet-of-things-done-right/
[ios]: /博客/2017/04/15/ios/
[ios-source]: https://github.com/home-assistant/home-assistant-ios
[krenn]: /博客/2017/04/01/thomas-krenn-award/
[application]: https://community.home-assistant.io/c/contest-2017

## 新平台

- MaryTTS 平台 ([@johanpalmqvist] - [#6988]) ([tts.marytts docs]) (new-platform)
- Telegram 机器人组件（包含 Webhook 和轮询平台） ([@sander76] - [#6913]) ([telegram_bot docs]) ([telegram_bot.polling docs]) ([telegram_bot.webhooks docs]) (breaking change) (new-platform)
- 支持 Neato 地图数据 ([@turbokongen] - [#6939]) ([neato docs]) ([摄像头.neato docs]) ([传感器.neato docs]) (new-platform)
- 支持 IKEA Trådfri ([@ggravlingen] - [#7074]) ([灯光.tradfri docs]) (new-platform)
- MQTT 摄像头 ([@MrMep] - [#7092]) ([摄像头.MQTT docs]) (new-platform)
- 支持 LIFX Cloud 场景 ([@amelchio] - [#7124]) ([场景.lifx_cloud docs]) (new-platform)
- Spotify 媒体播放器 ([@happyleavesaoc] - [#6980]) ([媒体播放器.spotify docs]) (new-platform)
- JSON MQTT 设备追踪器 ([@MrMep] - [#7055]) (new-platform)
- Opensky 传感器 ([@happyleavesaoc] - [#7061]) ([传感器.opensky docs]) (new-platform)
- Ping 二元传感器 ([@fabaff] - [#7052]) ([binary_sensor.ping docs]) (new-platform)
- myStrom WiFi 灯泡 ([@fabaff] - [#7161]) ([灯光.mystrom docs]) (new-platform)

<!--more-->
## 不向后兼容的变更

- 已从 `homeassistant.remote` 中移除弃用的类 ([@balloob] - [#7011])
- `min_max` 传感器现在使用不同的默认名称，并会忽略 `unknown` 状态 ([@micw] - [#6786])
- `telegram_webhooks` 已改造成新的 `telegram_bot` 组件，包含两个平台：Webhook 和轮询平台 ([@sander76] - [#6913]) ([telegram_bot docs])([telegram_bot.polling docs]) ([telegram_bot.webhooks docs])

```yaml
telegram_bot:
    platform: webhooks
    api_key : api_key_here
    allowed_chat_ids:
        - 123456
        - 456789
```

- Lutron_Caseta：现在不再需要在配置中填写用户名和密码。 ([@gurumitts] - [#7165]) ([lutron_caseta docs])
- mvglive：配置已更新，现已支持多个出发信息。 ([@mountainsandcode] - [#6953]) ([传感器.mvglive docs])

```yaml
sensor:
  - platform: mvglive
    nextdeparture:
     - station: Hauptbahnhof
       name: Hbf
       destinations: ['München Flughafen Terminal','Markt Schwaben']
       products: "S-Bahn"
       timeoffset: 2
     - station: Sendlinger Tor
       lines: ['U2','U8']
     - station: Scheidplatz
       products: ['U-Bahn']
       directions: "1"
```

## 如果你需要帮助
欢迎使用我们非常活跃的 [论坛][forum]，或者加入聊天频道 [discord][discord]。发布说明虽然也开放评论，但我们更推荐你使用前面的沟通渠道。谢谢。

## 反馈问题
如果你遇到了这次发布引入的问题，请到我们的 [问题追踪器][issue] 提交反馈，并确保填写问题模板中的所有字段。

## 发布 0.43.1 - April 25

- Zwave 遮盖 workaround for graber shades. ([@turbokongen] - [#7204]) ([遮盖.zwave docs]) (zwave.workaround docs)
- 升级 paho-MQTT to 1.2.3 ([@fabaff] - [#7214])
- Workround for wemo subscription bug. ([@pavoni] - [#7245]) ([wemo docs]) ([开关.wemo docs])
- Fix telegram webhooks ([@MartinHjelmare] - [#7236]) ([telegram_bot docs]) ([telegram_bot.webhooks docs])
- Work around bad content-type in Hook api response ([@KlaasH] - [#7267])
- Recorder: Check for ENTITY_ID key that contains None value ([@balloob] - [#7287]) ([recorder docs])

## 发布 0.43.2 - April 27

- 前端: Fix default date on history/logbook (@amelchio)
- 前端: Fix logbook ui (@balloob)
- 升级 pytradfri to 1.1 ([@balloob] - [#7290])
- 升级 python-telegram-bot to 5.3.1 ([@fabaff] - [#7311]) ([通知.telegram docs]) ([telegram_bot.polling docs]) ([telegram_bot.webhooks docs])
- 版本 bump of aioautomatic ([@armills] - [#7300])
- 版本 bump for automatic ([@armills] - [#7329])
- Fix breaking SSL in test HTML5 ([@balloob] - [#7310]) ([通知.html5 docs])
- Fix for building Python Open Z-Wave in Docker ([@balloob] - [#7337])

## All changes

- 更新 kodi for aiohttp2 ([@armills] - [#6967]) ([媒体播放器.kodi docs]) ([通知.kodi docs])
- Fix current_temperature is rounded ([@aufano] - [#6960]) ([温控 docs])
- Bugfix time and task coro ([@pvizeli] - [#6968])
- Initial import for HassIO ([@pvizeli] - [#6935])
- Preserve customize glob order. ([@andrey-git] - [#6963])
- Foscam 摄像头: Adding exception handling when fetching the 摄像头 图像 to avoid python exception 错误 when host is not reachable or rather any URL 错误 to 摄像头 ([@viswa-swami] - [#6964]) ([摄像头.foscam docs])
- 灯光.yeelight: catch i/o related exceptions from the 后端 lib ([@rytilahti] - [#6952])
- From Dusk till Dawn ([@BillyNate] - [#6857]) ([sun docs])
- Tests for zwave 服务 ([@armills] - [#6937]) ([zwave docs])
- Fix control+c quitting HASS ([@balloob] - [#6974])
- 更新 Emby for aiohttp v2 ([@mezz64] - [#6981])
- 开关.tplink: 升级 to the newest upstream 发布 which adds support for plugs using the newer communication protocol ([@rytilahti] - [#6979]) ([开关.tplink docs])
- 开关.tplink: bump pyhs100 版本 requirement ([@rytilahti] - [#6986])
- Add tests for ZWaveDeviceEntityValues 助手 ([@armills] - [#6978]) ([zwave docs])
- Bump Amcrest module to 1.1.8 ([@tchellomello] - [#6990])
- 更新 gstreamer ([@happyleavesaoc] - [#6987]) ([媒体播放器.gstreamer docs])
- Warn if start takes a long time. ([@balloob] - [#6975])
- 升级 to aiohttp 2.0.6 ([@balloob] - [#6992])
- Make discovery not block start ([@balloob] - [#6991])
- Downgrade aiohttp to 205 ([@balloob] - [#6994])
- Bump pywemo 版本. ([@pavoni] - [#7004])
- Fix Synology 摄像头 content type ([@balloob] - [#7010]) ([摄像头.synology docs])
- Fix two more instances of JSON parsing synology ([@balloob] - [#7014])
- Bump pyalarmdotcom to support new 版本 of aiohttp ([@Xorso] - [#7021])
- Fix US 状态 check (fixes #7015) ([@fabaff] - [#7017])
- Remove deprecated 遥控器 classes ([@balloob] - [#7011]) (breaking change)
- Replace 'vendor_id' with 'arch' (fixes #7003) ([@fabaff] - [#7023])
- more tests for slugify ([@micw] - [#7027])
- Additional ZWave coverage ([@armills] - [#7024]) ([zwave docs])
- bump ups 版本 ([@happyleavesaoc] - [#7033])
- 更新 usps 版本 ([@happyleavesaoc] - [#7035])
- 更新 fedex ([@happyleavesaoc] - [#7034])
- Google TTS can't read percent sign (#6971) ([@pezinek] - [#7030]) ([tts.google docs])
- Feature/min max improvements ([@micw] - [#6786]) (breaking change)
- 升级 psutil to 5.2.2 ([@fabaff] - [#7037]) ([传感器.systemmonitor docs])
- 升级 sendgrid to 4.0.0 ([@fabaff] - [#7038]) ([通知.sendgrid docs])
- Missing line name restriction added (fixes #7039) ([@DavidMStraub] - [#7040]) ([传感器.mvglive docs])
- Plug file leak on LIFX unregister ([@amelchio] - [#7031]) ([灯光.lifx docs])
- Make 核心 to look available 状态 of 设备 on servicecall ([@pvizeli] - [#7045])
- Remove 配置 sample ([@fabaff] - [#7048])
- Bugfix wait on start event ([@pvizeli] - [#7013])
- Bugfix slider ([@pvizeli] - [#7047]) ([input_slider docs])
- Add MaryTTS platform ([@johanpalmqvist] - [#6988]) ([tts.marytts docs]) (new-platform)
- Fix mysensors callback ([@MartinHjelmare] - [#7057]) ([mysensors docs]) ([device_tracker.mysensors docs])
- Constrain chardet to 2.3 ([@balloob] - [#7063])
- Fix/slugify with german umlaut ss ([@micw] - [#7029])
- Speed up aiohttp ([@balloob] - [#7064])
- 升级 netdisco to 1.0.0rc2 ([@balloob] - [#7008])
- Telegram bot component (incl. Webhook and polling platform) ([@sander76] - [#6913]) ([telegram_bot docs]) ([telegram_bot.polling docs]) ([telegram_bot.webhooks docs]) (breaking change) (new-platform)
- 升级 paho-MQTT to 1.2.2 ([@fabaff] - [#7066])
- Fix handling with register callbacks on added_to_hass ([@pvizeli] - [#7067])
- Lutron. Bugfix callback registration. ([@pvizeli] - [#7042])
- Adding AlarmDecoder platform ([@hawk259] - [#6900])
- Add communication data 属性 to Zwave node_entity ([@turbokongen] - [#6813]) ([zwave docs])
- Add product_name 属性 to zwave nodes. ([@andrey-git] - [#7071])
- Bump braviarc 版本 to 0.3.7 ([@robbiet480] - [#7078]) ([媒体播放器.braviatv docs])
- Fix account balance in fido 传感器 ([@titilambert] - [#7077]) ([传感器.fido docs])
- MQTT: Managing binary payloads ([@MrMep] - [#6976]) ([MQTT docs])
- Bump qnapstats library 版本 to 0.2.4 ([@colinodell] - [#7085]) ([传感器.qnap docs])
- Add support fo map data from Neato ([@turbokongen] - [#6939]) ([neato docs]) ([摄像头.neato docs]) ([传感器.neato docs]) (new-platform)
- Added initial support for IKEA Trådfri Gateway ([@ggravlingen] - [#7074]) ([灯光.tradfri docs]) (new-platform)
- Better Thread safety in zwave node_entity ([@andrey-git] - [#7087])
- Uber 版本 bump ([@armills] - [#7100]) (传感器.uber docs)
- No product ids configured should fetch all ids ([@armills] - [#7091])
- 升级 aiohttp to 2.0.7 ([@fabaff] - [#7106])
- 更新 file header, add const for defaults, and 更新 日志 messages ([@fabaff] - [#7110])
- 升级 speedtest-cli to 1.0.4 ([@fabaff] - [#7105]) ([传感器.speedtest docs])
- Remove globally disabled pylint issue and 更新 docstrings ([@fabaff] - [#7111])
- Use third-party lib aioautomatic for automatic ([@armills] - [#7126])
- 升级 chardet to 3.0.2 ([@fabaff] - [#7112])
- Send stderr of ping tracker to devnull ([@amelchio] - [#7096]) ([device_tracker.ping docs])
- Upgraded Amcrest module to 1.1.9 to support new firmware versions: ([@tchellomello] - [#7130])
- MQTT 摄像头 ([@MrMep] - [#7092]) ([摄像头.MQTT docs]) (new-platform)
- Bump 版本 to 0.43.0.dev0 ([@MartinHjelmare] - [#7132])
- Load zwave 面板 ([@balloob] - [#7127]) ([zwave docs])
- IKEA Trådfri Gateway: added support for RGB ([@ggravlingen] - [#7115]) ([灯光.tradfri docs])
- Make Trådfri discoverable ([@balloob] - [#7128])
- Make 版本 number optional and a string to fix identify issue introduced in iOS 1.0.1 ([@robbiet480] - [#7141])
- Fix for zwave RGB setting ([@armills] - [#7137])
- Replace rollershutter with 遮盖 in demo ([@robbiet480] - [#7140])
- Add 调试 logging to 自动化 initial 状态 ([@armills] - [#7068]) ([自动化 docs])
- Always return True/False from is_state and is_state_attr ([@amelchio] - [#7138])
- Add LIFX Cloud 场景 support ([@amelchio] - [#7124]) ([场景.lifx_cloud docs]) (new-platform)
- Fix LIFX 灯光 with disappearing names ([@amelchio] - [#7119]) ([灯光.lifx docs])
- lutron: fix typo that prevented callback registration ([@thecynic] - [#7148]) ([lutron docs])
- Fix HassIO timeout bug ([@pvizeli] - [#7155])
- small fix for random effect in order to use the whole rgb range. So 255 is not excluded anymore. ([@Mister-Espria] - [#7156]) ([灯光.flux_led docs]) ([灯光.yeelight docs])
- exposed content_type in rest_command ([@cmsimike] - [#7101])
- Add vera power meter. ([@pavoni] - [#7134]) ([vera docs]) ([传感器.vera docs])
- Add support for tradfri color temp ([@MartinHjelmare] - [#7153]) ([灯光.tradfri docs])
- Disable MQTT 摄像头 test ([@balloob] - [#7164])
- myStrom WiFi bulbs ([@fabaff] - [#7161])
- Fix #7026 adding a new wol parameter ([@titilambert] - [#7144]) ([开关.wake_on_lan docs])
- Add subscription 更新 for Wemo 开关, fix bug in Insight 开关, fix wemo motion bug, fix wemo discovery ([@pavoni] - [#7135]) ([wemo docs])
- 更新 neato.py ([@michaelarnauts] - [#7166]) ([neato docs])
- Keep track of already added players ([@molobrakos] - [#7149])
- Fix id 区域 mismatch ([@gurumitts] - [#7165]) ([lutron_caseta docs]) (breaking change)
- 升级 pytradfri to 1.0 ([@balloob] - [#7163])
- Value of 0 should not be considered `unknown`. ([@aequitas] - [#7139])
- 升级 netdisco ([@balloob] - [#7171])
- Added new 服务 to platform kodi ([@alexmogavero] - [#6426]) ([媒体播放器 docs]) ([媒体播放器.kodi docs])
- Suppress trackback and 升级 PyMata to 2.14 ([@fabaff] - [#7176]) ([arduino docs])
- Disable invalid-sequence-index ([@fabaff] - [#7177])
- 升级 mypy to 0.501 (was renamed from mypy-lang) ([@fabaff] - [#7117])
- Add 条件 for API failure ([@sytone] - [#7181])
- Add history to component priority list ([@balloob] - [#7173])
- Tweak Tradfri ([@balloob] - [#7172]) ([灯光.tradfri docs])
- MQTT 摄像头 test ([@MrMep] - [#7175])
- updated pylgtv module to fix problems with timeouts ([@hmn] - [#7184]) ([媒体播放器.webostv docs]) ([通知.webostv docs])
- Fix wemo discovery ([@balloob] - [#7183]) ([wemo docs]) ([灯光.wemo docs]) ([开关.wemo docs])
- Add Bose soundtouch discovery support and 升级 libsoundtouch library ([@CharlesBlonde] - [#7005])
- spotify media player ([@happyleavesaoc] - [#6980]) ([媒体播放器.spotify docs]) (new-platform)
- JSON MQTT 设备 tracker ([@MrMep] - [#7055]) (new-platform)
- opensky 传感器 ([@happyleavesaoc] - [#7061]) ([传感器.opensky docs]) (new-platform)
- Add ping 二元sensor ([@fabaff] - [#7052]) ([binary_sensor.ping docs]) (new-platform)
- Added 灯光.pwm component. ([@soldag] - [#7009])
- Fix for 错误 on missing preview on LG webos TV ([@masarliev] - [#6755]) ([媒体播放器.webostv docs])
- Fix auto discovery for Apple TV ([@postlund] - [#7188]) ([媒体播放器.apple_tv docs])
- Do not request artwork if not available ([@postlund] - [#7189]) ([媒体播放器.apple_tv docs])
- mvglive bug fixes and improvements ([@mountainsandcode] - [#6953]) ([传感器.mvglive docs]) (breaking change)
- 升级 py-cpuinfo to 3.2.0 ([@fabaff] - [#7190]) ([传感器.cpuspeed docs])
- Add support of input registers while querying modbus 传感器. ([@LvivEchoes] - [#7082]) ([modbus docs]) ([传感器.modbus docs])
- Add HassIO to discovery component ([@pvizeli] - [#7195])
- LIFX 灯光 effects ([@amelchio] - [#7145]) ([灯光.lifx docs])
- HassIO API v2 ([@pvizeli] - [#7201])
- Support xy_color with LIFX 灯光 ([@amelchio] - [#7208]) ([灯光.lifx docs])
- 更新 ios.py ([@biacz] - [#7160])
- Fix arwn platform to 更新 hass 状态 when events are received ([@sdague] - [#7202])
- Issue 6749 updated pylgtv to 0.1.6 to fix Thread leak in asyncio loop ([@hmn] - [#7199]) ([媒体播放器.webostv docs]) ([通知.webostv docs])

[#6426]: https://github.com/home-assistant/home-assistant/pull/6426
[#6755]: https://github.com/home-assistant/home-assistant/pull/6755
[#6786]: https://github.com/home-assistant/home-assistant/pull/6786
[#6813]: https://github.com/home-assistant/home-assistant/pull/6813
[#6857]: https://github.com/home-assistant/home-assistant/pull/6857
[#6900]: https://github.com/home-assistant/home-assistant/pull/6900
[#6913]: https://github.com/home-assistant/home-assistant/pull/6913
[#6935]: https://github.com/home-assistant/home-assistant/pull/6935
[#6937]: https://github.com/home-assistant/home-assistant/pull/6937
[#6939]: https://github.com/home-assistant/home-assistant/pull/6939
[#6952]: https://github.com/home-assistant/home-assistant/pull/6952
[#6953]: https://github.com/home-assistant/home-assistant/pull/6953
[#6960]: https://github.com/home-assistant/home-assistant/pull/6960
[#6963]: https://github.com/home-assistant/home-assistant/pull/6963
[#6964]: https://github.com/home-assistant/home-assistant/pull/6964
[#6966]: https://github.com/home-assistant/home-assistant/pull/6966
[#6967]: https://github.com/home-assistant/home-assistant/pull/6967
[#6968]: https://github.com/home-assistant/home-assistant/pull/6968
[#6974]: https://github.com/home-assistant/home-assistant/pull/6974
[#6975]: https://github.com/home-assistant/home-assistant/pull/6975
[#6976]: https://github.com/home-assistant/home-assistant/pull/6976
[#6978]: https://github.com/home-assistant/home-assistant/pull/6978
[#6979]: https://github.com/home-assistant/home-assistant/pull/6979
[#6980]: https://github.com/home-assistant/home-assistant/pull/6980
[#6981]: https://github.com/home-assistant/home-assistant/pull/6981
[#6986]: https://github.com/home-assistant/home-assistant/pull/6986
[#6987]: https://github.com/home-assistant/home-assistant/pull/6987
[#6988]: https://github.com/home-assistant/home-assistant/pull/6988
[#6990]: https://github.com/home-assistant/home-assistant/pull/6990
[#6991]: https://github.com/home-assistant/home-assistant/pull/6991
[#6992]: https://github.com/home-assistant/home-assistant/pull/6992
[#6994]: https://github.com/home-assistant/home-assistant/pull/6994
[#7004]: https://github.com/home-assistant/home-assistant/pull/7004
[#7005]: https://github.com/home-assistant/home-assistant/pull/7005
[#7008]: https://github.com/home-assistant/home-assistant/pull/7008
[#7009]: https://github.com/home-assistant/home-assistant/pull/7009
[#7010]: https://github.com/home-assistant/home-assistant/pull/7010
[#7011]: https://github.com/home-assistant/home-assistant/pull/7011
[#7013]: https://github.com/home-assistant/home-assistant/pull/7013
[#7014]: https://github.com/home-assistant/home-assistant/pull/7014
[#7017]: https://github.com/home-assistant/home-assistant/pull/7017
[#7021]: https://github.com/home-assistant/home-assistant/pull/7021
[#7023]: https://github.com/home-assistant/home-assistant/pull/7023
[#7024]: https://github.com/home-assistant/home-assistant/pull/7024
[#7027]: https://github.com/home-assistant/home-assistant/pull/7027
[#7029]: https://github.com/home-assistant/home-assistant/pull/7029
[#7030]: https://github.com/home-assistant/home-assistant/pull/7030
[#7031]: https://github.com/home-assistant/home-assistant/pull/7031
[#7033]: https://github.com/home-assistant/home-assistant/pull/7033
[#7034]: https://github.com/home-assistant/home-assistant/pull/7034
[#7035]: https://github.com/home-assistant/home-assistant/pull/7035
[#7037]: https://github.com/home-assistant/home-assistant/pull/7037
[#7038]: https://github.com/home-assistant/home-assistant/pull/7038
[#7040]: https://github.com/home-assistant/home-assistant/pull/7040
[#7042]: https://github.com/home-assistant/home-assistant/pull/7042
[#7045]: https://github.com/home-assistant/home-assistant/pull/7045
[#7047]: https://github.com/home-assistant/home-assistant/pull/7047
[#7048]: https://github.com/home-assistant/home-assistant/pull/7048
[#7052]: https://github.com/home-assistant/home-assistant/pull/7052
[#7055]: https://github.com/home-assistant/home-assistant/pull/7055
[#7057]: https://github.com/home-assistant/home-assistant/pull/7057
[#7061]: https://github.com/home-assistant/home-assistant/pull/7061
[#7063]: https://github.com/home-assistant/home-assistant/pull/7063
[#7064]: https://github.com/home-assistant/home-assistant/pull/7064
[#7066]: https://github.com/home-assistant/home-assistant/pull/7066
[#7067]: https://github.com/home-assistant/home-assistant/pull/7067
[#7068]: https://github.com/home-assistant/home-assistant/pull/7068
[#7071]: https://github.com/home-assistant/home-assistant/pull/7071
[#7074]: https://github.com/home-assistant/home-assistant/pull/7074
[#7077]: https://github.com/home-assistant/home-assistant/pull/7077
[#7078]: https://github.com/home-assistant/home-assistant/pull/7078
[#7082]: https://github.com/home-assistant/home-assistant/pull/7082
[#7085]: https://github.com/home-assistant/home-assistant/pull/7085
[#7087]: https://github.com/home-assistant/home-assistant/pull/7087
[#7091]: https://github.com/home-assistant/home-assistant/pull/7091
[#7092]: https://github.com/home-assistant/home-assistant/pull/7092
[#7096]: https://github.com/home-assistant/home-assistant/pull/7096
[#7100]: https://github.com/home-assistant/home-assistant/pull/7100
[#7101]: https://github.com/home-assistant/home-assistant/pull/7101
[#7105]: https://github.com/home-assistant/home-assistant/pull/7105
[#7106]: https://github.com/home-assistant/home-assistant/pull/7106
[#7110]: https://github.com/home-assistant/home-assistant/pull/7110
[#7111]: https://github.com/home-assistant/home-assistant/pull/7111
[#7112]: https://github.com/home-assistant/home-assistant/pull/7112
[#7115]: https://github.com/home-assistant/home-assistant/pull/7115
[#7117]: https://github.com/home-assistant/home-assistant/pull/7117
[#7119]: https://github.com/home-assistant/home-assistant/pull/7119
[#7124]: https://github.com/home-assistant/home-assistant/pull/7124
[#7126]: https://github.com/home-assistant/home-assistant/pull/7126
[#7127]: https://github.com/home-assistant/home-assistant/pull/7127
[#7128]: https://github.com/home-assistant/home-assistant/pull/7128
[#7130]: https://github.com/home-assistant/home-assistant/pull/7130
[#7132]: https://github.com/home-assistant/home-assistant/pull/7132
[#7134]: https://github.com/home-assistant/home-assistant/pull/7134
[#7135]: https://github.com/home-assistant/home-assistant/pull/7135
[#7137]: https://github.com/home-assistant/home-assistant/pull/7137
[#7138]: https://github.com/home-assistant/home-assistant/pull/7138
[#7139]: https://github.com/home-assistant/home-assistant/pull/7139
[#7140]: https://github.com/home-assistant/home-assistant/pull/7140
[#7141]: https://github.com/home-assistant/home-assistant/pull/7141
[#7144]: https://github.com/home-assistant/home-assistant/pull/7144
[#7145]: https://github.com/home-assistant/home-assistant/pull/7145
[#7148]: https://github.com/home-assistant/home-assistant/pull/7148
[#7149]: https://github.com/home-assistant/home-assistant/pull/7149
[#7153]: https://github.com/home-assistant/home-assistant/pull/7153
[#7155]: https://github.com/home-assistant/home-assistant/pull/7155
[#7156]: https://github.com/home-assistant/home-assistant/pull/7156
[#7160]: https://github.com/home-assistant/home-assistant/pull/7160
[#7161]: https://github.com/home-assistant/home-assistant/pull/7161
[#7163]: https://github.com/home-assistant/home-assistant/pull/7163
[#7164]: https://github.com/home-assistant/home-assistant/pull/7164
[#7165]: https://github.com/home-assistant/home-assistant/pull/7165
[#7166]: https://github.com/home-assistant/home-assistant/pull/7166
[#7171]: https://github.com/home-assistant/home-assistant/pull/7171
[#7172]: https://github.com/home-assistant/home-assistant/pull/7172
[#7173]: https://github.com/home-assistant/home-assistant/pull/7173
[#7175]: https://github.com/home-assistant/home-assistant/pull/7175
[#7176]: https://github.com/home-assistant/home-assistant/pull/7176
[#7177]: https://github.com/home-assistant/home-assistant/pull/7177
[#7181]: https://github.com/home-assistant/home-assistant/pull/7181
[#7183]: https://github.com/home-assistant/home-assistant/pull/7183
[#7184]: https://github.com/home-assistant/home-assistant/pull/7184
[#7188]: https://github.com/home-assistant/home-assistant/pull/7188
[#7189]: https://github.com/home-assistant/home-assistant/pull/7189
[#7190]: https://github.com/home-assistant/home-assistant/pull/7190
[#7195]: https://github.com/home-assistant/home-assistant/pull/7195
[#7199]: https://github.com/home-assistant/home-assistant/pull/7199
[#7201]: https://github.com/home-assistant/home-assistant/pull/7201
[#7202]: https://github.com/home-assistant/home-assistant/pull/7202
[#7208]: https://github.com/home-assistant/home-assistant/pull/7208
[@BillyNate]: https://github.com/BillyNate
[@CharlesBlonde]: https://github.com/CharlesBlonde
[@DavidMStraub]: https://github.com/DavidMStraub
[@JesseWebDotCom]: https://github.com/JesseWebDotCom
[@LvivEchoes]: https://github.com/LvivEchoes
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@Mister-Espria]: https://github.com/Mister-Espria
[@MrMep]: https://github.com/MrMep
[@Xorso]: https://github.com/Xorso
[@aequitas]: https://github.com/aequitas
[@alexmogavero]: https://github.com/alexmogavero
[@amelchio]: https://github.com/amelchio
[@andrey-git]: https://github.com/andrey-git
[@armills]: https://github.com/armills
[@aufano]: https://github.com/aufano
[@balloob]: https://github.com/balloob
[@biacz]: https://github.com/biacz
[@cmsimike]: https://github.com/cmsimike
[@colinodell]: https://github.com/colinodell
[@fabaff]: https://github.com/fabaff
[@ggravlingen]: https://github.com/ggravlingen
[@gurumitts]: https://github.com/gurumitts
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@hawk259]: https://github.com/hawk259
[@hmn]: https://github.com/hmn
[@johanpalmqvist]: https://github.com/johanpalmqvist
[@masarliev]: https://github.com/masarliev
[@mezz64]: https://github.com/mezz64
[@michaelarnauts]: https://github.com/michaelarnauts
[@micw]: https://github.com/micw
[@molobrakos]: https://github.com/molobrakos
[@mountainsandcode]: https://github.com/mountainsandcode
[@pavoni]: https://github.com/pavoni
[@pezinek]: https://github.com/pezinek
[@postlund]: https://github.com/postlund
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@rytilahti]: https://github.com/rytilahti
[@sander76]: https://github.com/sander76
[@sdague]: https://github.com/sdague
[@soldag]: https://github.com/soldag
[@sytone]: https://github.com/sytone
[@tchellomello]: https://github.com/tchellomello
[@thecynic]: https://github.com/thecynic
[@titilambert]: https://github.com/titilambert
[@turbokongen]: https://github.com/turbokongen
[@viswa-swami]: https://github.com/viswa-swami

[arduino docs]: /integrations/arduino/
[自动化 docs]: /integrations/自动化/
[binary_sensor.ping docs]: /integrations/ping#binary-传感器
[binary_sensor.wemo docs]: /integrations/wemo
[摄像头.foscam docs]: /integrations/foscam
[摄像头.MQTT docs]: /integrations/摄像头.MQTT/
[摄像头.neato docs]: /integrations/neato#摄像头
[摄像头.synology docs]: /integrations/synology
[温控 docs]: /integrations/温控/
[device_tracker.mysensors docs]: /integrations/device_tracker.mysensors/
[device_tracker.ping docs]: /integrations/ping
[hassio docs]: /integrations/hassio/
[input_slider docs]: /integrations/input_number
[灯光.flux_led docs]: /integrations/flux_led
[灯光.lifx docs]: /integrations/lifx
[灯光.lutron_caseta docs]: /integrations/lutron_caseta/
[灯光.mystrom docs]: /integrations/mystrom#灯光
[灯光.服务.yaml docs]: /integrations/灯光.服务.yaml/
[灯光.tradfri docs]: /integrations/tradfri
[灯光.wemo docs]: /integrations/wemo
[灯光.yeelight docs]: /integrations/yeelight
[lutron docs]: /integrations/lutron/
[lutron_caseta docs]: /integrations/lutron_caseta/
[媒体播放器 docs]: /integrations/媒体播放器/
[媒体播放器.apple_tv docs]: /integrations/apple_tv
[媒体播放器.braviatv docs]: /integrations/braviatv
[媒体播放器.gstreamer docs]: /integrations/gstreamer
[媒体播放器.kodi docs]: /integrations/kodi
[媒体播放器.spotify docs]: /integrations/spotify
[媒体播放器.webostv docs]: /integrations/webostv#media-player
[modbus docs]: /integrations/modbus/
[MQTT docs]: /integrations/MQTT/
[mysensors docs]: /integrations/mysensors/
[neato docs]: /integrations/neato/
[通知.kodi docs]: /integrations/kodi
[通知.sendgrid docs]: /integrations/sendgrid
[通知.webostv docs]: /integrations/webostv
[场景.lifx_cloud docs]: /integrations/lifx_cloud
[传感器.cpuspeed docs]: /integrations/cpuspeed
[传感器.crimereports docs]: /integrations/crimereports
[传感器.fido docs]: /integrations/fido
[传感器.modbus docs]: /integrations/传感器.modbus/
[传感器.mvglive docs]: /integrations/mvglive
[传感器.neato docs]: /integrations/neato/
[传感器.opensky docs]: /integrations/opensky
[传感器.qnap docs]: /integrations/qnap
[传感器.speedtest docs]: /integrations/speedtestdotnet
[传感器.systemmonitor docs]: /integrations/systemmonitor
[传感器.vera docs]: /integrations/vera#传感器
[sun docs]: /integrations/sun/
[开关.tplink docs]: /integrations/tplink
[开关.wake_on_lan docs]: /integrations/wake_on_lan#开关
[开关.wemo docs]: /integrations/wemo
[telegram_bot docs]: /integrations/telegram_bot/
[telegram_bot.polling docs]: /integrations/telegram_polling
[telegram_bot.webhooks docs]: /integrations/telegram_webhooks
[tts.google docs]: /integrations/google_translate
[tts.marytts docs]: /integrations/marytts
[vera docs]: /integrations/vera/
[wemo docs]: /integrations/wemo/
[zwave docs]: /integrations/zwave/
[zwave.node_entity docs]: /integrations/zwave.node_entity/
[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[#7204]: https://github.com/home-assistant/home-assistant/pull/7204
[#7214]: https://github.com/home-assistant/home-assistant/pull/7214
[#7236]: https://github.com/home-assistant/home-assistant/pull/7236
[#7245]: https://github.com/home-assistant/home-assistant/pull/7245
[#7267]: https://github.com/home-assistant/home-assistant/pull/7267
[#7287]: https://github.com/home-assistant/home-assistant/pull/7287
[@KlaasH]: https://github.com/KlaasH
[遮盖.zwave docs]: /integrations/zwave#遮盖
[recorder docs]: /integrations/recorder/
[开关.wemo docs]: /integrations/wemo
[telegram_bot docs]: /integrations/telegram_bot/
[telegram_bot.webhooks docs]: /integrations/telegram_webhooks
[wemo docs]: /integrations/wemo/
[#7271]: https://github.com/home-assistant/home-assistant/pull/7271
[#7282]: https://github.com/home-assistant/home-assistant/pull/7282
[#7290]: https://github.com/home-assistant/home-assistant/pull/7290
[#7300]: https://github.com/home-assistant/home-assistant/pull/7300
[#7310]: https://github.com/home-assistant/home-assistant/pull/7310
[#7311]: https://github.com/home-assistant/home-assistant/pull/7311
[#7323]: https://github.com/home-assistant/home-assistant/pull/7323
[#7324]: https://github.com/home-assistant/home-assistant/pull/7324
[#7329]: https://github.com/home-assistant/home-assistant/pull/7329
[#7337]: https://github.com/home-assistant/home-assistant/pull/7337
[hassio docs]: /integrations/hassio/
[通知.html5 docs]: /integrations/html5
[通知.telegram docs]: /integrations/telegram
[telegram_bot.polling docs]: /integrations/telegram_polling
[discord]: https://discord.gg/c5DvZ4e
