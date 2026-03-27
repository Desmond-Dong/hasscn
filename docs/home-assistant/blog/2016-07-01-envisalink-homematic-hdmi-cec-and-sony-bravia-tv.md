---
title: '0.23: Envisalink, Homematic, HDMI-CEC and Sony Bravia TV'
description: This new release of Home Assistant contains support for Envisalink, Homematic,
  Sony Bravia TV and HDMI-CEC. Additionally was the Wink support improved and CherryPy
  is the new WSGI server.
---
# 0.23: Envisalink, Homematic, HDMI-CEC and Sony Bravia TV

It's time for Home Assistant 0.23 and it's full of goodies. It's also the 发布 that bumps us over a 1000 tests and to 94% test coverage! Also our 安装 issues on the 树莓派 and Synology have been resolved.

This 发布 brings support for two new ecosystems: [Envisalink] and [Homematic]. We can now also control your TV via HDMI using [HDMI-CEC] (which works on the Pi!) and another cool feature is the [persistent 通知] which allow you to add a 通知 to the 前端 till dismissed.

[Wink] support has been dramatically improved by migrating to the PubNub API. This allows Wink to push changes from their system to Home Assistant. This change came just in time as somehow our Wink 集成 was causing a lot of requests to their servers. Thanks to Wink for letting us know so we could solve it instead of blocking us.

On the config side, you can now [store your passwords][secrets] in your OS keyring or just in a standalone file. We also got a new 服务 to 重载 the 核心 config so no reboots needed anymore after changing customize 设置!

<img src='/home-assistant/images/supported_brands/bravia.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/eyezon.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/homematic.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/openexchangerates.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

- Support for [Envisalink] added ([报警 control 面板][envi-报警], [二元sensor][envi-binary-传感器], [传感器][envi-传感器]) ([@cinntax])
- Support for [Homematic] added ([二元sensor][hm-binary-传感器], [灯光][hm-灯光], [rollershutter][hm-rollershutter], [传感器][hm-传感器], [开关][hm-开关]) ([@pvizeli], [@danielperna84])
- New [HDMI-CEC] component ([@happyleavesaoc], [@lukas-hetzenecker])
- Major rewrite of [Wink] which now pushes changes to Home Assistant ([@w1ll1am23])
- 核心: new add [重载 核心 config 服务] ([@balloob])
- Support for [persistent 通知] added ([@fabaff], [@balloob])
- Garage door: [Z-Wave][zwave-garage-door] support added ([@turbokongen])
- Rollershutter: [Z-Wave][zwave-rollershutter] support added ([@turbokongen])
- Media Player: [Sony Bravia TV] now supported ([@aparraga])
- 传感器: [Fixer.io] now supported ([@fabaff])
- Garage door: Control any garage door using [树莓派 GPIO pins] ([@kellerza])
- 传感器: [OpenExchangeRates] support added ([@arsaboo])
- 通知: [Pushover] now supports target 设备, sound, URL and priority ([@dale3h])
- 传感器: [Netatmo] now supports wind, battery and radio signals ([@Jypy])
- 日志 successful and failed login attemps ([@fabaff])
- Config: allow [extracting account info][secrets] into OS keyring or separate YAML file ([@kellerza])
- 核心: add option to not filter out duplicate 状态 per 实体 ([@philipbl])
- HTTP: Follow Mozilla SSL recommendations ([@danieljkemp], [@AlucardZero])
- 灯光: [Z-Wave colorbulb][zwave-灯光] support added ([@armills])
- 核心: new elevation config option added ([@balloob])
- 传感器: [OneWire] support extended with support for DS18S20, DS1822, DS1825 and DS28EA00 temperature 传感器 + support for bus masters which use fuse to mount 设备 tree. ([@Ardetus])
- 门锁: [Vera] now supported ([@rhooper])
- HTTP: Migrate to CherryPy WSGI server to fix 安装 and runtime problems ([@balloob])

### Backward-incompatible changes

- Homematic thermostat 配置 has changed and now depends on the new [Homematic] component.

### Hotfix 0.23.1 - July 2

- Bump PyVera to 0.2.13 to fix traceback and pyvera Thread dying related to bug ([@rhooper])
- HTTP - SSL: Check for OP_NO_COMPRESSION support before trying to use it ([@AlucardZero])
- Wink: Downgraded pubnub to work around pycryptodome conflicts ([@w1ll1am23])

### 常见问题

- `elevation: ` was introduced to the 配置 for 天气/sunrise data. For existing [配置][elevation] add the value shown in the 警告 `[homeassistant.config] Incomplete core config. Auto detected elevation: 665` to your `configuration.yaml` file.

[@AlucardZero]: https://github.com/AlucardZero/
[@aparraga]: https://github.com/aparraga/
[@Ardetus]: https://github.com/Ardetus/
[@armills]: https://github.com/armills/
[@arsaboo]: https://github.com/arsaboo/
[@balloob]: https://github.com/balloob/
[@cinntax]: https://github.com/cinntax/
[@dale3h]: https://github.com/dale3h/
[@danieljkemp]: https://github.com/danieljkemp/
[@danielperna84]: https://github.com/danielperna84/
[@fabaff]: https://github.com/fabaff/
[@happyleavesaoc]: https://github.com/happyleavesaoc/
[@Jypy]: https://github.com/Jypy/
[@kellerza]: https://github.com/kellerza/
[@lukas-hetzenecker]: https://github.com/lukas-hetzenecker/
[@philipbl]: https://github.com/philipbl/
[@pvizeli]: https://github.com/pvizeli/
[@rhooper]: https://github.com/rhooper/
[@turbokongen]: https://github.com/turbokongen/
[@w1ll1am23]: https://github.com/w1ll1am23/
[envi-报警]: /integrations/envisalink
[envi-binary-传感器]: /integrations/envisalink
[envi-传感器]: /integrations/envisalink
[Envisalink]: /integrations/envisalink/
[HDMI-CEC]: /integrations/hdmi_cec/
[hm-binary-传感器]: /integrations/homematic
[hm-灯光]: /integrations/homematic
[hm-rollershutter]: /integrations/homematic/
[hm-传感器]: /integrations/homematic
[hm-开关]: /integrations/homematic
[Homematic]: /integrations/homematic/
[Netatmo]: /integrations/netatmo#传感器
[OneWire]: /integrations/onewire
[OpenExchangeRates]: /integrations/openexchangerates
[Pushover]: /integrations/pushover
[secrets]: /topics/secrets/
[Vera]: /integrations/vera
[Wink]: /integrations/wink/
[zwave-garage-door]: /integrations/zwave/#遮盖
[zwave-灯光]: /integrations/zwave
[zwave-rollershutter]: /integrations/zwave/#遮盖
[Fixer.io]: /integrations/fixer
[persistent 通知]: /integrations/persistent_notification/
[重载 核心 config 服务]: /getting-started/customizing-设备/#reloading-customize
[Sony Bravia TV]: /integrations/braviatv
[树莓派 GPIO pins]: /integrations/rpi_gpio/#遥控器-raspberry-pi-遮盖
[elevation]: /getting-started/basic/
