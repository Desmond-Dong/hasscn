---
title: 'Home Assistant 0.40: Turn any Android phone into an IP Webcam'
description: Big startup performance increase and tons of bug fixes for MQTT, Z-Wave.
---

<a href='/home-assistant/integrations/#added_in_current_version'><img src='/home-assistant/images/blog/2017-03-0.40/social.png' style='border: 0;box-shadow: none;'></a>

这么快就来到 0.40 版本了！本次版本的重点主要放在性能提升和错误修复上。非常感谢 [@pvizeli] 推动了这项工作。现在启动速度已经非常快。我们也继续为会拖慢 Home Assistant 的组件和平台加入警告提示。

有些人把我们最近新增的警告理解成是 0.39 引入了这些问题。其实并不是这样，这些平台和组件出现异常已经有一段时间了，只是我们现在加入了警告机制，方便追踪真正的原因。

在继续介绍这次发布的改进之前，我想先感谢 Home Assistant 社区里几位对项目成功至关重要的人。特别感谢 [@dale3h]、[@CCOSTAN]、[@skalavala]、[@rrubin0]、[@brahmafear]、[@bassclarinetl2] 和 [@torn8o]！他们都活跃在我们的 [主聊天室][main chat channel] 中，帮助新用户上手，也在老用户遇到问题时伸出援手。没有你们的努力，就不会有今天的 Home Assistant！🙇

我们社区到底有多棒，也能从这些数字中看出来。通过销售[我们的 T 恤][hass-shirt]，我们已经一起为 [EFF] 筹集了超过 700 美元！你们真的太厉害了！另一个值得一提的数字是，这次发布让 Home Assistant 的集成总数突破了 600 个。再次感谢大家！

## Z-Wave 现在是线程安全的

[@andrey-git] 花了很多时间来提升 Z-Wave 的性能。它现在应该不会再拖慢 Home Assistant，也不会再因为计时器不同步而触发警告。

## 关于 0.39 中 MQTT 内存不足错误的更新

在 0.39 中，MQTT 在部分树莓派上开始引发“Out of Memory”错误。我们已经确认，这与设备使用了较旧的固件有关。如果你也遇到了这个问题，请[使用 `rpi-update` 升级固件](https://github.com/Hexxeh/rpi-update#installing)。

## 把任意 Android 手机变成 IP 摄像头

借助 [@robbiet480] 和 [@pvizeli] 新增的 [IP Webcam](/home-assistant/integrations/android_ip_webcam/) 支持，你现在可以把任何一台 Android 手机改造成多功能 IP 摄像头。你可以做到下面这些事情：

  - 接入 Android 设备的摄像头
  - 在检测到运动时提供二元传感器
  - 通过传感器暴露设备上的各类传感器信息，包括气压、声音、电池和光照
  - 控制设备功能，比如 GPS、夜视和摄像头闪光灯

<p class='img'>
<img src='/home-assistant/images/blog/2017-03-0.40/ipwebcam.png' />
IP Webcam 集成所提供各项功能的截图。
</p>

## 其他亮点

  - 新增基于 Zamg 数据的奥地利天气支持 ([@Zac-HD])
  - 新增 Ring.com 可视门铃集成 ([@tchellomello])
  - 新增 Blink 家庭安防摄像头支持 ([@fronzbot])
  - Apple TV 改为主动向 Home Assistant 推送数据，不再需要轮询 ([@postlund])

## 不向后兼容的变更

- Vera 实体 ID 已发生变化。这是一次性迁移，用于切换到可避免未来冲突的新模型。
- Twilio 通知平台现在必须通过 `twilio` 组件进行配置。

```yaml
twilio:
  account_sid: "abc"
  auth_token: "xyz"
```

- 如果你正在使用 async 自定义组件，传入的 `async_add_devices` 方法现在是回调函数，而不再是协程函数。

### 如果你需要帮助
欢迎使用我们非常活跃的 [论坛][forum]，或者加入聊天频道 [discord][discord]。发布说明虽然也开放评论，但我们更推荐你使用前面的沟通渠道。谢谢。

### 反馈问题
如果你遇到了这次发布引入的问题，请到我们的 [问题追踪器][issue] 提交反馈，并确保填写问题模板中的所有字段。

### 发布 0.40.1 - March 16

- Fix wake_on_lan ping with None as host ([@iamtpage] - [#6532])
- Don't start the push updater if the Apple TV is 'off' ([@jnewland] - [#6552])
- Fix for the case of zwave value used in several 设备. ([@andrey-git] - [#6577])
- Fix hydroquebec ([@titilambert] - [#6574])
- 更新 pyecobee 版本 to 0.0.7 ([@dale3h] - [#6593])
- 更新 SMA solar 传感器 to work with the new add_devices callback ([@kellerza] - [#6602])
- since knx_2_float can't handle 0, bypass converting 0 value from knx to float ([@goofz] - [#6626])
- Fix Osram Lightify colors ([@deisi] - [#6598])
- Bugfix RFLINK remove group ([@pvizeli] - [#6580])

### 发布 0.40.2 - 3 月 22 日

这是一个用于修复依赖问题的热修复版本。关于这个问题的更多细节，请查看[这篇博客文章](/home-assistant/blog/2017/03/22/broken-dependencies/)。

- Prevent dependencies that are 已安装 on demand from installing different versions of 核心 dependencies ([@balloob] - [#6738])
- 升级 PyChromecast to silent some benign 错误 ([@balloob] - [#6702])

<!--more-->

## All changes

- Cleanup run_callback_threadsafe ([@pvizeli])
- Use H2 headers to split up the different sections ([@colinodell])
- Refactory of envisalink ([@pvizeli])
- Create zwave 设备 on OZW Thread and only add them during discovery ([@andrey-git])
- Bugfix 恢复 startup 状态 ([@kellerza])
- Random test fixes ([@balloob])
- Remove automatically reloading group config ([@balloob])
- Default config to 设置 group editor ([@balloob])
- minor broadlink fix ([@danielhiversen])
- 更新 Yeelight Sunflower 灯光 platform to 0.0.6 (@lindsaymarkwawrd)
- Some zwave cleanup ([@andrey-git])
- 传感器.speedtest: provide a default icon ([@molobrakos])
- Test the temperature returned by RM2 ([@aronsky])
- Zamg 天气 ([@Zac-HD])
- Fix reporting on bad login ([@balloob])
- Move MQTT from eventbus to dispatcher / add unsub for dispatcher ([@pvizeli])
- 更新 flake8 and pylint to latest ([@andrey-git])
- Fix link ([@fabaff])
- Make glob preserve order ([@andrey-git])
- 更新 regex ([@fabaff])
- Fix recorder async ([@balloob])
- Fix livebox-play interactions for Python < 3.6 ([@pschmitt])
- Ensure we properly close HASS instances. ([@balloob])
- Add 服务 to change 日志 levels ([@postlund])
- Move ffmpeg to dispatcher from hass.data 实体 store. ([@pvizeli])
- Feature/reorg recorder ([@balloob])
- Bugfix MQTT socket 错误 ([@pvizeli])
- 通知 ciscospark ([@shenning00])
- Config fix ([@balloob])
- Bugfix MQTT paho client to speend time ([@pvizeli])
- Properly report features for each hue bulb type ([@jawilson])
- Local file 摄像头 now supports yet inexisting files. ([@jjmontesl])
- 灯光.transition now supports float instead of int in order to be able to perform faster transitions ([@BillyNate])
- Fix for OSRAM 灯光 connected to hue bridge ([@groth-its])
- Add support for MAX!Cube thermostats and window shutter 传感器 ([@BastianPoe])
- Analog modem callerid support ([@vroomfonde1])
- [传感器.dnsip] New 传感器: DNS IP ([@danielperna84])
- 更新 library 版本 for Yeelight Sunflower 灯光 platform (fix for packaging problem with 0.0.7) (@lindsaymarkwawrd)
- Prevent duplicate names on Vera 设备 by appending the 设备 id ([@arjenfvellinga])
- Add temperature support for MH-Z19 CO2 传感器. ([@andrey-git])
- improve history_stats accuracy ([@bokub])
- Updated pyitachip2ir ([@alanfischer])
- Influx fix ([@open-homeautomation])
- Fix 切换 and media_play_pause post async ([@armills])
- Migrate 日历 设置 to async. ([@pvizeli])
- Frontier silicon ([@zhelev])
- Bootstrap / Component 设置 async ([@pvizeli])
- Convert kpH and mpH to kph and mph ([@ericgingras])
- Rollback netdisco to 0.8.2 to resolve #6165 ([@deftdawg])
- 日志 错误 when loading yaml ([@kellerza])
- Bootstrap tweaks tests ([@balloob])
- Telegram webhooks new text event ([@scipioni])
- Cleanup component track_point_in_utc_time usage ([@pvizeli])
- Discovery fix ([@balloob])
- Test against 3.6-dev ([@balloob])
- Bugfix Zigbee / Move from eventbus to dispatcher ([@pvizeli])
- Bump netdisco to 0.9.1 ([@balloob])
- 传感器.dovado: compute 状态 in 更新 ([@molobrakos])
- Fix mysensors callback race ([@MartinHjelmare])
- 升级 TwitterAPI to 2.4.5 ([@fabaff])
- 升级 py-cpuinfo to 0.2.6 ([@fabaff])
- 模板 传感器 change flow / add 恢复 ([@pvizeli])
- Zwave optimize value_added ([@andrey-git])
- 更新 Vagrant provision.sh ([@shaftoe])
- 更新 Adafruit_Python_DHT to support new raspberry kernel ([@masarliev])
- Add fallback for name if userdevicename isn't set using old serialnumber logic ([@reedriley])
- Improve Honeywell US 温控 component ([@titilambert])
- 模板 binary_sensor change flow / add 恢复 ([@pvizeli])
- Additional support for ecobee hold mode ([@Duoxilian])
- 更新 Formulas in Convert XY to RGB ([@dramamoose])
- Use dynamic ports for test instances ([@armills])
- Added support for multiple codes executed in a row ([@martinfrancois])
- Use push updates in Apple TV ([@postlund])
- Fix command sudo not found 错误 in dev Dockerfile ([@jawilson])
- Fix 日历 认证 text, and handle 日历 events without summaries. ([@alanfischer])
- Move dispatcher out of init. ([@pvizeli])
- Zwave: Add remove/replace failed node 服务. ([@andrey-git])
- 模板 开关 change flow / add 恢复 ([@pvizeli])
- Bump limitlessled dependency to 1.0.5. ([@janLo])
- snmp: 升级 pysnmp to 4.3.4 ([@milaq])
- Bugfix new async_add_devices function ([@pvizeli])
- 恢复 for input_slider ([@pvizeli])
- Added IPv4 data collector ([@open-homeautomation])
- Return None instead of raising ValueException from as_timestamp 模板 function. ([@jjmontesl])
- [recorder] Catch more startup 错误 #6179 ([@kellerza])
- twilio component ([@happyleavesaoc])
- Add Z-Wave battery level as a 传感器. ([@andrey-git])
- OwnTrack Async ([@pvizeli])
- Fix possibility that have multiple topic subscribe MQTT ([@pvizeli])
- Migrate MQTT tracker and arwn 传感器 to async / cleanup owntrack ([@pvizeli])
- Z-Wave prevent I/O event loop ([@balloob])
- 更新 pwaqi to 3.0 to use public API ([@valentinalexeev])
- 更新 Hikvision 二元sensor to latest library, remove pyDispatcher ([@mezz64])
- Don't initialize components which have already been discovered ([@colinodell])
- Comed Hourly Pricing 传感器 ([@joe248])
- Add multi contracts support for Hydroquebec ([@titilambert])
- Add Zwave refresh 服务 ([@andrey-git])
- Add keep-alive feature to the generic thermostat ([@aronsky])
- Fix wake_on_lan for German 版本 of Windows 10 (#6397) ([@siebert])
- flux led lib ([@danielhiversen])
- Cleanup async handling ([@pvizeli])
- 恢复 for 自动化 实体 ([@kellerza])
- Fix tests no internet ([@balloob])
- Prevent more I/O in apns ([@balloob])
- 恢复 flow on device_tracker platform ([@pvizeli])
- 开关.tplink: catch exceptions coming from pyHS100 to avoid flooding the 日志 when the plug is not available ([@rytilahti])
- Added 传感器 to support Ring.com 设备 ([@tchellomello])
- Split bootstrap into bs + 设置 ([@balloob])
- Tweak recorder/restore_state ([@balloob])
- Fix unnecessary 警告 for ip bans.yaml ([@balloob])
- Better restore_state 警告 ([@balloob])
- Set new color before turning LIFX bulbs on ([@amelchio])
- Don't 日志 username and 密码 in 摄像头 URL ([@ishults])
- Ignore deleted mails in IMAP unread count (#6394) ([@amelchio])
- Delay zwave updates for 100ms to group them. ([@andrey-git])
- Rename _scheduled_update to _update_scheduled ([@andrey-git])
- Revert "Use dynamic port allocation for tests" ([@armills])
- Tado device_tracker exception when mobile 设备 has geofencing enabled but location is currently unknown. ([@jmvermeulen])
- Add a Z-Wave workaround to do full refresh on 更新 ([@andrey-git])
- Use bundled certificates if port matches mqtts ([@dennisdegreef])
- Bugfix samsungtv discovery ([@pvizeli])
- Added unittest for Ring 传感器 ([@tchellomello])
- Shorten recorder connection init ([@balloob])
- KWB Easyfire support ([@bimbar])
- Bumped 版本 number for supporting lib ([@bazwilliams])
- Send a logo with webostv 通知 ([@andersonshatch])
- 升级 netdisco to 0.9.2 ([@balloob])
- Allow testing against uvloop ([@balloob])
- fix issue ([@appzer])
- Remove connection status 状态. ([@aequitas])
- Support for Blink 摄像头 System ([@fronzbot])
- Add 警告 for slow platforms/components ([@balloob])
- Fix wake_on_lan ping for Linux. ([@siebert])
- Add support for remove 服务 / 重载 脚本 support ([@pvizeli])
- Expand MQTT 灯光 ([@robbiet480])
- Allow configurable 条件 for Pi-Hole 传感器 ([@colinodell])
- Improved iCloud 2FA support. ([@reedriley])
- 更新 pymyq requirement ([@arraylabs])
- Not always assume manufacturername is present ([@balloob])
- Add first pass at Z-Wave 灯光 tests ([@balloob])
- Bugfix MQTT socket memory 错误 ([@pvizeli])
- Increase upper limit on 灯光 transitions ([@amelchio])
- Bugfix android 摄像头 autodiscovery 设置 ([@pvizeli])
- 更新 to Pyunifi2.0 ([@finish06])
- Insteon lib ([@craigjmidwinter])
- Bugfix rpi_rf cleanup ([@pvizeli])
- Android webcam better 错误 handling / pump library 0.4 ([@pvizeli])

[@BastianPoe]: https://github.com/BastianPoe
[@BillyNate]: https://github.com/BillyNate
[@Duoxilian]: https://github.com/Duoxilian
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@Zac-HD]: https://github.com/Zac-HD
[@aequitas]: https://github.com/aequitas
[@alanfischer]: https://github.com/alanfischer
[@amelchio]: https://github.com/amelchio
[@andersonshatch]: https://github.com/andersonshatch
[@andrey-git]: https://github.com/andrey-git
[@appzer]: https://github.com/appzer
[@arjenfvellinga]: https://github.com/arjenfvellinga
[@armills]: https://github.com/armills
[@aronsky]: https://github.com/aronsky
[@arraylabs]: https://github.com/arraylabs
[@balloob]: https://github.com/balloob
[@bazwilliams]: https://github.com/bazwilliams
[@bimbar]: https://github.com/bimbar
[@bokub]: https://github.com/bokub
[@colinodell]: https://github.com/colinodell
[@danielhiversen]: https://github.com/danielhiversen
[@danielperna84]: https://github.com/danielperna84
[@dennisdegreef]: https://github.com/dennisdegreef
[@dramamoose]: https://github.com/dramamoose
[@fabaff]: https://github.com/fabaff
[@finish06]: https://github.com/finish06
[@fronzbot]: https://github.com/fronzbot
[@groth-its]: https://github.com/groth-its
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@ishults]: https://github.com/ishults
[@janLo]: https://github.com/janLo
[@jawilson]: https://github.com/jawilson
[@jjmontesl]: https://github.com/jjmontesl
[@jmvermeulen]: https://github.com/jmvermeulen
[@joe248]: https://github.com/joe248
[@deftdawg]: https://github.com/deftdawg
[@kellerza]: https://github.com/kellerza
[@martinfrancois]: https://github.com/martinfrancois
[@masarliev]: https://github.com/masarliev
[@mezz64]: https://github.com/mezz64
[@milaq]: https://github.com/milaq
[@molobrakos]: https://github.com/molobrakos
[@open-homeautomation]: https://github.com/open-homeautomation
[@postlund]: https://github.com/postlund
[@pschmitt]: https://github.com/pschmitt
[@pvizeli]: https://github.com/pvizeli
[@reedriley]: https://github.com/reedriley
[@robbiet480]: https://github.com/robbiet480
[@rytilahti]: https://github.com/rytilahti
[@scipioni]: https://github.com/scipioni
[@shaftoe]: https://github.com/shaftoe
[@shenning00]: https://github.com/shenning00
[@siebert]: https://github.com/siebert
[@tchellomello]: https://github.com/tchellomello
[@titilambert]: https://github.com/titilambert
[@valentinalexeev]: https://github.com/valentinalexeev
[@vroomfonde1]: https://github.com/vroomfonde1
[@craigjmidwinter]: https://github.com/craigjmidwinter
[@zhelev]: https://github.com/zhelev
[main chat channel]: https://discord.gg/c5DvZ4e
[@dale3h]: https://github.com/dale3h
[@CCOSTAN]: https://github.com/CCOSTAN
[@skalavala]: https://github.com/skalavala
[@rrubin0]: https://github.com/rrubin0
[@brahmafear]: https://github.com/brahmafear
[@bassclarinetl2]: https://github.com/bassclarinetl2
[@torn8o]: https://github.com/torn8o
[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[EFF]: https://www.eff.org
[hass-shirt]: /博客/2017/02/22/home-assistant-tshirts-have-arrived/
[#6532]: https://github.com/home-assistant/home-assistant/pull/6532
[#6552]: https://github.com/home-assistant/home-assistant/pull/6552
[#6574]: https://github.com/home-assistant/home-assistant/pull/6574
[#6577]: https://github.com/home-assistant/home-assistant/pull/6577
[#6580]: https://github.com/home-assistant/home-assistant/pull/6580
[#6593]: https://github.com/home-assistant/home-assistant/pull/6593
[#6598]: https://github.com/home-assistant/home-assistant/pull/6598
[#6602]: https://github.com/home-assistant/home-assistant/pull/6602
[#6626]: https://github.com/home-assistant/home-assistant/pull/6626
[@deisi]: https://github.com/deisi
[@goofz]: https://github.com/goofz
[@iamtpage]: https://github.com/iamtpage
[@jnewland]: https://github.com/jnewland
[#6702]: https://github.com/home-assistant/home-assistant/pull/6702
[#6738]: https://github.com/home-assistant/home-assistant/pull/6738
[discord]: https://discord.gg/c5DvZ4e
