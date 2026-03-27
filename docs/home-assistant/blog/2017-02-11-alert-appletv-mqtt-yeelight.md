---
title: '0.38：Alert、Apple TV、MQTT discovery，以及 Yeelight'
description: '又到了周六，也就意味着又一次发布！。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# 0.38：Alert、Apple TV、MQTT discovery，以及 Yeelight

又到了周六，也就意味着又一次发布！

### 核心更新
- 感谢 [@pvizeli]，现在所有核心组件都已改写为异步实现。所有实体组件也都已从同步代码迁移到异步代码！

- 现在，当你使用 `homeassistant.restart` 服务重启 Home Assistant 时，系统会先检查你的配置。如果配置无效，重启将会失败。

### 重写后的前端
前端已经被完全重写，重点优化了速度以及断线后的恢复能力。即使在最慢的手机上，它现在也应该运行得非常流畅。前端现在还改用了新的 [WebSockets API][websocket-api]，取代了原先的 [EventStream API][event-stream-api]。

### 自定义状态卡片 UI
一个很棒的新功能是，你现在可以在前端中创建[自定义状态卡片][custom-ui-卡片]。你可以为灯光、传感器、门锁等编写自己的状态卡片。

### MQTT discovery
MQTT 现在支持 [discovery][MQTT-discovery]，这与我们的 [`discovery`][discovery] 组件不同。和 HTTP 传感器及 HTTP 二元传感器类似，MQTT discovery 允许设备主动向 Home Assistant 宣告自己的存在，因此无需手动配置。

### Alert 组件
如果你把前门忘记开着，那么新的 [`alert`][alert] 组件可以按指定间隔反复向你发送通知，提醒你这件事。

### Yeelight
[`yeelight`][yeelight] 组件已经迁移到更稳定、功能也更完整的 [python-yeelight][python-yeelight] 后端，现在同时支持白光灯泡和 RGB 灯泡。该组件还支持过渡效果，并且可以配置为在设置变更时将配置保存到灯泡中。如果你目前在使用 Yeelight 的自定义组件，我们建议你切换回内置版本，并将遇到的问题反馈到我们的 [issue tracker][issue]。

### Apple TV
[Apple TV][apple-tv] 现在已成为受支持的 [`media_player`][media-player]！它几乎支持所有媒体播放器功能，包括实时显示播放状态和封面图。

### All changes
#### New platforms/components

- 传感器: Support for monitoring [OpenEVSE][openevse] chargers ([@miniconfig])
- Voice command [API.AI][apiai] ([@adrianlzt])
- [Alert][alert] Component ([@rmkraus])
- [Rflink][rflink] 433Mhz gateway platform and components ([@aequitas])
- 门锁: Support for [Nuki.io][nuki] smart 门锁 ([@pschmitt])
- 传感器: [QNAP][qnap] 传感器 ([@colinodell])
- 开关: Add support for FRITZ!DECT wireless 开关 based on fritzhome ([@BastianPoe])
- 传感器: Add [moon][moon] 传感器 ([@fabaff])
- Media player: Support for the Orange Livebox Play TV appliance ([@pschmitt])
- Media player: [Apple TV][apple-tv] support ([@postlund])
- MQTT: [MQTT discovery][MQTT-discovery] support ([@balloob], [@fabaff])
- 通知: [Mailgun][mailgun] 通知 服务 ([@pschmitt])
- 图像 Processing: Support [Microsoft Face detection][face-detect] ([@pvizeli])

#### Improvements

- 开关 - Pilight: Validation no longer rejects alphanumeric IDs ([@DavidLP])
- 设备 tracker - ASUSWrt: Fixes `ip neigh` regex to handle the possible IPv6 "router" flag ([@kylehendricks])
- 灯光 - MySensors: Fix mysensors RGB and W 灯光 打开 ([@MartinHjelmare])
- 灯光 - Yeelight: new yeelight 后端 lib, new features ([@rytilahti])
- 温控 - Eq3btsmart: Cleanup modes & available, bump 版本 requirement ([@rytilahti])
- 传感器 - SMA: Handle units correctly ([@kellerza])
- MQTT eventstream: Prevent infinite loop in cross configured MQTT event streams ([@aequitas])
- 灯光 - [Hue][hue]: Fix lightgroups not syncing 状态 ([@tboyce1])
- Dvice tracker - Owntracks: Fix OwnTracks 状态 names ([@tboyce1])
- Wink: Wink AC and additional 传感器 support ([@w1ll1am23])
- Modbus: Modbus write_register accept list ([@benvm])
- 设备 tracker - Ping: Add 设备 detected by ping as SOURCE_TYPE_ROUTER instead of GPS ([@michaelarnauts])
- 温控 - Ecobee: Cleanup 温控 and ecobee ([@Duoxilian])
- 传感器 - Miflora: Allow specification of 蓝牙 adapter ([@Danielhiversen])
- 传感器 - [Systemmonitor][systemmonitor]: Add average load to systemmonitor ([@eagleamon])
- 传感器 - [Openweathermap][owm]: Add wind bearing ([@fabaff])
- 通知 - Facebook: Allow to use data for enhanced messages ([@adrianlzt])
- 灯光 - Hyperion: Change CONF_DEFAULT_COLOR CV type ([@Joeboyc2])
- Mysensors: Fix validation of serial port on windows ([@MartinHjelmare])
- 通知 - Webostv: Store the key file in the 配置 directory ([@pschmitt])
- TTS: TTS ID3 support ([@robbiet480])
- 开关 - Broadlink: Add send packet 服务 ([@Yannic-HAW])
- Wink: Add support for position on Wink 遮盖 ([@albertoarias])
- 灯光 - Flux: Make brightness display work for RGB 设备. ([@aequitas])
- Media player - Roku: Fix 属性 错误 for 媒体播放器/roku ([@tchellomello])
- 灯光 - MQTT 模板: Fix brightness slider for MQTT 模板 灯光 ([@ray0711])
- 模板: Add `min` and `max` Jinja2 [filters][filters] ([@sbidoul])
- 设备 tracker - Skyhub: Improve Sky Hub 错误 handling ([@alexmogavero])
- 通知 - SMTP: Add 错误 checking to the MIMEImage encoding ([@stratosmacker])
- 灯光 - MQTT: Check for command topics when determining the capabilities of an MQTT 灯光 ([@herm])
- 核心: Check config before restarting ([@andrey-git])
- 灯光 - [Hue][hue]: Fix groups with same names (@tboyce1)
- 模板: Add icon_template to 模板 传感器 (@tboyce1)
- Recorder: Refactoring, scoping, and better handling of SQLAlchemy Sessions ([@kellerza])
- 灯光 - Flux: Add support for fluxled discovery. ([@aequitas])
- Media player - AppleTV: Add discovery support to Apple TV ([@postlund])
- 传感器 - 模板: Improve 警告 message in 模板 rendering ([@Danielhiversen])
- 灯光 - Demo: Add available property and typing hints ([@rytilahti])
- 传感器 - ARWN: Enhancements to [ARWN][arwn] platform ([@sdague])
- 风扇 - ISY994: Change medium 状态 for filtering ([@Teagan42])
- 温控 - Ecobee: Support away_mode as permanent hold and hold_mode as temporary hold. ([@Duoxilian])
- Tellduslive: Don't throw exception if connection to server is lost ([@molobrakos])
- Zoneminder: Refactoring and JSON decode 错误 handling ([@pschmitt])
- 图像 processing: Cleanup Base face class add support for microsoft face detect ([@pvizeli])

Bugfixes: [@balloob], [@fabaff], [@pvizeli], [@mnoorenberghe] [@Danielhiversen], [@armills], [@tchellomello], [@aequitas], [@mathewpeterson], [@molobrakos], [@michaelarnauts], [@jabesq], [@turbokongen], [@JshWright], [@andriej], [@jawilson], [@andrey-git], [@nodinosaur], [@konikvranik], and you if you are missing here.

### 发布 0.38.1 - February 12

- Fix logbook ordering ([@balloob])
- Fix AppleTV conflicting dependency breaking websockets ([@balloob])

### 发布 0.38.2 - February 12

- Validate config will now respect custom config location ([@balloob])
- Fix Nuki 门锁 on Python 3.4 ([@pschmitt])
- Fix login issues for myusps ([@happyleavesaoc])
- Fix hdmi_cec with new customize ([@andrey-git])
- Fix MQTT discovery ([@fabaff])
- Fix Z-Wave thermostat units ([@turbokongen])

### 发布 0.38.3 - February 15

- Sonos: fix losing favorite sources on disconnect ([@pvizeli])
- Google 日历: fix timeMin losing events ([@happyleavesaoc])
- Fix Wink PubNub subscription ([@w1ll1am23])
- Z-Wave: getter not to ignore label ([@andrey-git])
- Moon: remove unit of measurement ([@fabaff])
- MySensors: add 版本 requirement to 通知 and 设备 tracker ([@MartinHjelmare])

### 发布 0.38.4 - February 21

 - Discovery: flux_led discovery led to problems on systems and has been removed ([@bazwilliams])
 - Hidden 设备 are no longer visible on views ([@balloob])

### Backward-incompatible changes
- The support for [LG webOS Smart TVs][webostv] was improved. This requires you to move `$HOME/.pylgtv` to `$HASS_CONFIG_DIR/webostv.conf` or Home Assistant will need to be paired with the TV again.
- 图像 processing events have been renamed: `identify_face` has become `image_processing.detect_face`, `found_plate` has become `image_processing.found_plate`
- The [FFmpeg 二元sensor][ffmpeg-bin] change the platform name from `ffmpeg` to `ffmpeg_noise` and `ffmpeg_motion`. Also all FFmpeg-related 服务 are moved from a platform implementation to a the [FFmpeg components][ffmpeg] and were rename from `binary_sensor.ffmpeg_xy` to `ffmpeg.xy`.
- The 前端 核心 changes have caused all custom 面板 to break. Docs have not been updated yet. The gist is that you have to use `this.hass.entities`, `this.hass.callService` and `this.hass.callApi`.

### If you need help...
...don't hesitate to use our very active [forums][forum] or join us for a little [chat][discord]. The 发布 notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### Reporting Issues
Experiencing issues introduced by this 发布? Please report them in our [issue tracker][issue]. Make sure to fill in all fields of the issue 模板.

[@bazwilliams]: https://github.com/bazwilliams
[@acambitsis]: https://github.com/acambitsis
[@adrianlzt]: https://github.com/adrianlzt
[@aequitas]: https://github.com/aequitas
[@albertoarias]: https://github.com/albertoarias
[@alexmogavero]: https://github.com/alexmogavero
[@andrey-git]: https://github.com/andrey-git
[@andriej]: https://github.com/andriej
[@armills]: https://github.com/armills
[@balloob]: https://github.com/balloob
[@BastianPoe]: https://github.com/BastianPoe
[@benvm]: https://github.com/benvm
[@colinodell]: https://github.com/colinodell
[@Danielhiversen]: https://github.com/Danielhiversen
[@DavidLP]: https://github.com/DavidLP
[@Duoxilian]: https://github.com/Duoxilian
[@eagleamon]: https://github.com/eagleamon
[@fabaff]: https://github.com/fabaff
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@herm]: https://github.com/herm
[@jabesq]: https://github.com/jabesq
[@jawilson]: https://github.com/jawilson
[@Joeboyc2]: https://github.com/Joeboyc2
[@JshWright]: https://github.com/JshWright
[@kellerza]: https://github.com/kellerza
[@konikvranik]: https://github.com/konikvranik
[@kylehendricks]: https://github.com/kylehendricks
[@LinuxChristian]: https://github.com/LinuxChristian
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@mathewpeterson]: https://github.com/mathewpeterson
[@michaelarnauts]: https://github.com/michaelarnauts
[@miniconfig]: https://github.com/miniconfig
[@mnoorenberghe]: https://github.com/mnoorenberghe
[@molobrakos]: https://github.com/molobrakos
[@nodinosaur]: https://github.com/nodinosaur
[@postlund]: https://github.com/postlund
[@pschmitt]: https://github.com/pschmitt
[@pvizeli]: https://github.com/pvizeli
[@ray0711]: https://github.com/ray0711
[@rmkraus]: https://github.com/rmkraus
[@robbiet480]: https://github.com/robbiet480
[@rytilahti]: https://github.com/rytilahti
[@sbidoul]: https://github.com/sbidoul
[@sdague]: https://github.com/sdague
[@stratosmacker]: https://github.com/stratosmacker
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@turbokongen]: https://github.com/turbokongen
[@valentinalexeev]: https://github.com/valentinalexeev
[@w1ll1am23]: https://github.com/w1ll1am23
[@Yannic-HAW]: https://github.com/Yannic-HAW

[alert]: /integrations/alert/
[apiai]: /integrations/dialogflow
[apple-tv]: /integrations/apple_tv
[arwn]: /integrations/arwn
[custom-ui-卡片]: /developers/frontend_creating_custom_ui
[discovery]: /integrations/discovery/
[face-detect]: /integrations/microsoft_face_detect
[ffmpeg-bin]: /integrations/ffmpeg_motion
[ffmpeg]: /integrations/ffmpeg/
[filters]: /topics/templating/#home-assistant-模板-extensions
[hue]: /integrations/hue
[mailgun]: /integrations/mailgun
[media-player]: /integrations/媒体播放器/
[moon]: /integrations/moon
[MQTT-discovery]: /integrations/MQTT/#discovery
[nuki]: /integrations/nuki
[openevse]: /integrations/openevse
[owm]: /integrations/openweathermap#传感器
[python-yeelight]: https://gitlab.com/stavros/python-yeelight
[qnap]: /integrations/qnap
[rflink]: /integrations/rflink/
[systemmonitor]: /integrations/systemmonitor
[webostv]: /integrations/webostv#media-player
[yeelight]: /integrations/yeelight

[event-stream-api]: /developers/server_sent_events/
[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[websocket-api]: /developers/websocket_api/
[discord]: https://discord.gg/c5DvZ4e
