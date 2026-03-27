---
title: '0.18: Bluetooth, LG WebOS TVs and Roombas.'
description: 'It''s time for 0.18. This 发布 cycle is 2 days shorter than usual as I''ll be traveling to Europe. This also means that it can take some more time before you。'
---
# 0.18: Bluetooth, LG WebOS TVs and Roombas.

It's time for 0.18. This 发布 cycle is 2 days shorter than usual as I'll be traveling to Europe. This also means that it can take some more time before you get feedback on PRs.

Since the last 发布 we have moved all Home Assistant source code etc into its own [organization on GitHub](https://github.com/home-assistant). We're growing up! This sadly did cause us to have to move all Docker 图像. Check the backward-incompatible changes section for more info.

<a href='/home-assistant/demo/'><img src='/home-assistant/images/blog/2016-04-release-18/media_player.png' style='box-shadow: none; border: 0;' /></a>

<img src='/home-assistant/images/supported_brands/bluetooth.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/webos.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/rss.gif' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/eq3.gif' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/thinkingcleaner.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Media Player: redesign in the UI! ([@DesignFirst], [@balloob])
- New component: [Zeroconf] for Home Assistant discovery ([@robbiet480])
- Garage door: [MQTT] now supported ([@joelash])
- Thermostat: [Homematic platform] now supports Max! 设备 ([@bimbar])
- New component Thinkingcleaner ([开关][开关.thinkingcleaner]/[传感器][传感器.thinkingcleaner]) to integrate your Roomba into Home Assistant ([@TheRealLink])
- New component: [upnp] to automatically open a upnp port on your router for Home Assistant ([@robbiet480])
- Thermostat: [EQ3 蓝牙 Smart Thermostats] now supported ([@bimbar])
- New component [Feedreader] will track RSS feeds ([@shaftoe])
- 设备 Tracker: [蓝牙 tracking platform] added ([@vmulpuru])
- Media Player: [LG WebOS TVs][媒体播放器.lg] now supported ([@TheRealLink])
- 通知: [LG WebOS TVs][通知.lg] now supported ([@TheRealLink])
- HTTP: Use constant time comparison for auth ([@JshWright])
- Config and 服务 validations ([@jaharkes], [@Danielhiversen])
- MySensors: 实体 IDs will more clearly differentiate between node ID and child ID ([@oeysteinhansen])
- MySensors: Add support for [ethernet gateway][mysensors] ([@MartinHjelmare])
- Media player: [Plex] will now monitor the server and add clients as they pop up ([@infamy])
- 核心: We now use iso8601 for datetimes ([@balloob]).
- Media Player: [MPD] now supports 服务 to play playlists ([@Cinntax])
- Z-Wave should be a little bit more stable ([@Turbokongen])
- Media Player: [Sonos] will now only add visible 设备 ([@jpmossin])
- 灯光: [Wink] will now allow controlling the colors ([@bradsk88])

[@balloob]: https://github.com/balloob/
[@bimbar]: https://github.com/bimbar/
[@bradsk88]: https://github.com/bradsk88/
[@Cinntax]: https://github.com/Cinntax/
[@Danielhiversen]: https://github.com/Danielhiversen/
[@DesignFirst]: https://github.com/DesignFirst/
[@infamy]: https://github.com/infamy/
[@jaharkes]: https://github.com/jaharkes/
[@joelash]: https://github.com/joelash/
[@jpmossin]: https://github.com/jpmossin/
[@JshWright]: https://github.com/JshWright/
[@MartinHjelmare]: https://github.com/MartinHjelmare/
[@oeysteinhansen]: https://github.com/oeysteinhansen/
[@robbiet480]: https://github.com/robbiet480/
[@shaftoe]: https://github.com/shaftoe/
[@TheRealLink]: https://github.com/TheRealLink/
[@Turbokongen]: https://github.com/Turbokongen/
[@vmulpuru]: https://github.com/vmulpuru/
[蓝牙 tracking platform]: /integrations/bluetooth_tracker
[EQ3 蓝牙 Smart Thermostats]: /integrations/eq3btsmart/
[mysensors]: /integrations/mysensors/
[Feedreader]: /integrations/feedreader/
[Homematic platform]: /integrations/homematic/
[媒体播放器.lg]: /integrations/webostv#media-player
[通知.lg]: /integrations/webostv
[MPD]: /integrations/mpd
[MQTT]: /integrations/遮盖.MQTT/
[Plex]: /integrations/plex#media-player
[Sonos]: /integrations/sonos
[传感器.Thinkingcleaner]: /integrations/thinkingcleaner#传感器
[开关.Thinkingcleaner]: /integrations/thinkingcleaner#开关
[upnp]: /integrations/upnp/
[Wink]: /integrations/wink#灯光
[Zeroconf]: /integrations/zeroconf/

### Backward-incompatible changes
- We have migrated our datetime format to be iso8601. This will only impact you if you are consuming the date times from the API directly. You can ignore this if you are just using Home Assistant via 配置 and the 前端.
- The constant `TEMP_CELCIUS` is now correctly called `TEMP_CELSIUS`. Old one is deprecated and will eventually be removed.
- The location of the Docker 图像 has changed. There was no possibility for us to keep maintaining the old 图像 (as it was bound to the GitHub repo under my name) or to make a redirect. So if you are using the Home Assistant Docker 图像,  change it to run `homeassistant/home-assistant:latest` for the latest 发布 and `homeassistant/home-assistant:dev` for the latest dev 版本.
- MySensors received two big changes that will cause you to 更新 your configs. See [component page][mysensors] for new example config.
  1. All MySensors 实体 IDs are different! There was an 错误 in the naming that caused MySensors to append node ID and child ID instead of separating them with an underscore. This has been fixed but will cause all your MySensors 实体 IDs to change. This is a one time breaking change.
  2. The second change is that we now support the TCP ethernet gateway. This is causing a slight change to the config format: you have to change `port:` under `gateways` to `device:`.
