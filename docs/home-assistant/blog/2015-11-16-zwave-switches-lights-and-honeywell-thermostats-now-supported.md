---
title: '0.8: Honeywell Thermostats, Orvibo 开关 and Z-Wave 开关 and 灯光 '
description: Home Assistant 0.8 can now interact with Honeywell thermostats, Orvibo
  开关 and has improved Z-Wave support.
---
# 0.8: Honeywell Thermostats, Orvibo 开关 and Z-Wave 开关 and 灯光 

<img src='/home-assistant/images/screenshots/custom-icons.png' style='float: right;' />我们一直在努力准备这个最新发布。本次发布的一大亮点，是在前端引入了一套扩展图标集（感谢 [@happyleavesaoc] 提供创意和原型）。要开始自定义，请从 [Material Design Icons] 中选择任意图标，在名称前加上 `mdi:`，然后将其放入 `configuration.yaml` 中的 `customize` 部分：

```yaml
homeassistant:
  customize:
    switch.ac:
      icon: "mdi:air-conditioner"
```

#### Backward-incompatible changes

 - Any existing 区域 icon will have to be replaced with one from [Material Design Icons].
 - LimitlessLED 灯光 服务 require colors to be specified in RGB instead of XY.

#### Changes

<img src='/home-assistant/images/supported_brands/honeywell.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' height='50' /><img src='/home-assistant/images/supported_brands/orvibo.png' style='clear: right;  border:none; box-shadow: none; float: right; margin-bottom: 16px;' height='50' />

- Thermostat: [Honeywell](/home-assistant/integrations/honeywell/) now supported ([@sander76])
- 开关: [Orvibo](/home-assistant/integrations/orvibo) now supported ([@happyleavesaoc])
- 摄像头: [mjpeg 摄像头's](/home-assistant/integrations/mjpeg) now supported ([@ryanturner])
- 通知: Pushetta now supported ([@fabaff])
- 灯光: [MQTT](/home-assistant/integrations/light.mqtt/) now supported ([@hexxter])
- 灯光: [Z-Wave](/home-assistant/integrations/zwave/) now supported ([@leoc])
- 开关: [Z-Wave](/home-assistant/integrations/zwave/) now supported ([@leoc])
- New component [logger](/home-assistant/integrations/logger/) allows filtering logged data ([@badele])
- New component [updater](/home-assistant/integrations/updater/) will 通知 用户 if an 更新 for Home Assistant is available ([@rmkraus])
- 通知: [PushBullet](/home-assistant/integrations/pushbullet) now allows targeting contacts/channels/specific 设备 ([@tomduijf])
- 灯光: Allow controlling color temperature ([@tomduijf])
- 前端: about page added ([@balloob])
- 开关 RGB as the color unit used in 灯光 component ([@balloob])
- Re-安装 platform and component dependencies after a Home Assistant 版本 升级 ([@balloob])

[Material Design Icons]: https://pictogrammers.com/library/mdi/
[@sander76]: https://github.com/sander76
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@ryanturner]: https://github.com/ryanturner
[@fabaff]: https://github.com/fabaff
[@hexxter]: https://github.com/hexxter
[@leoc]: https://github.com/leoc
[@badele]: https://github.com/badele
[@rmkraus]: https://github.com/rmkraus
[@tomduijf]: https://github.com/tomduijf
[@balloob]: https://github.com/balloob
