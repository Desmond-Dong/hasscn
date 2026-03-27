---
title: '0.24: SQLAlchemy, KNX, Join by Joaoapps, and SimpliSafe.'
description: This new release of Home Assistant contains support for KNX, Join by
  Joaoapps, and SimpliSafe. As of now our new database 后端 is SQLAlchemy which
  gives you more flexibility for storing your data.
---
# 0.24: SQLAlchemy, KNX, Join by Joaoapps, and SimpliSafe.

It's time for Home Assistant 0.24 and it's full of new 集成 for your Home. It contains some structural changes to our history which requires 动作 from your end, so please keep reading.

[MapQuest] discontinued their free and direct tile access by Monday, July 11, 2016. With [CARTO] we found a very cool and suitable solution. They allow us to use their tile for the map. Thank you, [CARTO].

[Roy Hooper][@rhooper] did an amazing job migrating the history support from being tied to SQLite to use the ORM SQLAlchemy instead. This means that you can now use **any** SQL 后端 for the history. So besides SQLite you can now databases like MySQL or PostgreSQL. However, this does require that you 安装 [SQLAlchemy] and run a command to migrate your existing history over. We tried to make the process as seamless as possible by introducing a new command line 脚本: 

```bash
pip3 install SQLAlchemy
hass --script db_migrator --config /path/to/config
```

You can omit the `--config` option if you use the default 配置 directory. Run the 脚本 with `--help` to get more options.

<img src='/home-assistant/images/supported_brands/joaoapps_join.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='https://brands.home-assistant.io/knx/logo.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/tp-link.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

- Config: Improved support for storing [secrets][secrets] ([@kellerza])
- 传感器: Support for Yahoo! 天气 ([@pvizeli])
- Add 脚本 to command line to expose advanced options ([@balloob])
- 报警: [SimpliSafe][simplisafe] is now supported ([@w1ll1am23]) 
- 核心: 开关 to SQLAlchemy for the Recorder component ([@rhooper])
- Support for [Join by Joaoapps][join-joaoapps] added incl. [Join 通知][join-通知] ([@nkgilley])
- Media Player: [Plex] will no longer spam the 日志 if server goes offline ([@dale3h])
- 传感器: [APCUPSd 传感器][apcupsd-传感器] now supports names, icons and units ([@dale3h])
- 门锁: [Verisure] 实体 will now use name instead of serial number for 实体 id ([@turbokongen])
- [StatsD] can now also export 属性 ([@bah2830])
- Support for [KNX] added ([@usul27])
- 开关: [TPLink] HS100/HS110 now supported ([@GadgetReactor])
- Stability fixes for [RFXtrx] ([@Danielhiversen])
- Tweaks to [Z-Wave] ([@turbokongen])
- 灯光: [Brightness] now clamped to 0-255 ([@keatontaylor])
- Thermostat: [Radiotherm] HVAC mode now supported ([@danieljkemp])
- 传感器: [Google Travel] times can now use dynamic locations for start/end ([@bah2830])
- 通知: Allow sending photos to [Telegram] ([@pvizeli])
- 前端: Improve loading times ([@balloob])
- 前端: Fix stream not reconnecting after standby ([@balloob])
- 前端: Wait up to two seconds for new 状态 before resetting 切换 after toggling 状态 ([@balloob])

### Hotfix 0.24.1 - July 21

Quick hot fix after we found a bug in the migrator where it wouldn't work with a database in a non-standard location. Thanks to [@n8henrie] and [@AlucardZero].

### Backward-incompatible changes

- Migrating existing databases (see above).
- The [APCUPSd 传感器][apcupsd-传感器] was updated. This will need that you modify your `configuration.yaml` file.
- 实体 IDs of Verisure 门锁 will change. This is a one time change but should improve readability.

[@bah2830]: https://github.com/bah2830/
[@balloob]: https://github.com/balloob/
[@dale3h]: https://github.com/dale3h/
[@danieljkemp]: https://github.com/danieljkemp
[@GadgetReactor]: https://github.com/GadgetReactor
[@keatontaylor]: https://github.com/keatontaylor
[@kellerza]: https://github.com/kellerza/
[@nkgilley]: https://github.com/nkgilley
[@pvizeli]: https://github.com/pvizeli/
[@rhooper]: https://github.com/rhooper/
[@turbokongen]: https://github.com/turbokongen/
[@usul27]: https://github.com/usul27
[@w1ll1am23]: https://github.com/w1ll1am23/
[@n8henrie]: https://github.com/n8henrie/
[@AlucardZero]: https://github.com/AlucardZero/
[@Danielhiversen]: https://github.com/danielhiversen

[apcupsd-传感器]: /integrations/apcupsd#传感器
[Brightness]: /integrations/灯光/
[CARTO]: https://carto.com/
[Google Travel]: /integrations/google_travel_time
[imap-传感器]: /component/传感器.imap/
[join-joaoapps]: /integrations/joaoapps_join/
[join-通知]: /integrations/joaoapps_join
[KNX]: /integrations/knx/
[MapQuest]: https://www.mapquest.com/
[Plex]: /integrations/plex#media-player
[Radiotherm]: /integrations/radiotherm/
[recorder]: /integrations/recorder/
[secrets]: /topics/secrets/
[simplisafe]: /integrations/simplisafe
[SQLAlchemy]: http://www.sqlalchemy.org/
[StatsD]: /integrations/statsd/
[Telegram]: /integrations/telegram
[TPLink]: /integrations/tplink
[Verisure]: /integrations/verisure
[Z-Wave]: /integrations/zwave/
[RFXtrx]: /integrations/rfxtrx/
