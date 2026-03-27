---
title: '0.16: Embedded MQTT broker, Uber, Yamaha receivers and Growl'
description: '各位派对玩家，0.16 来了！这次发布最大的亮点是，我们通过可启动内置 MQTT 服务器 hbMQTT，彻底降低了 MQTT 的上手门槛。只要在配置中加入 mqtt:，代理服务就会启动并连接到 Home Assistant。 本页属于 Home Assistant 中文博客与更新记录。'
---
# 0.16: Embedded MQTT broker, Uber, Yamaha receivers and Growl

各位派对玩家，0.16 来了！这次发布最大的亮点是，我们通过可启动内置 MQTT 服务器 [hbMQTT]，彻底降低了 MQTT 的上手门槛。只要在配置中加入 `mqtt:`，代理服务就会启动并连接到 Home Assistant。

此外，这次发布还包含了大量很酷的新功能、错误修复，以及 Vera 和 Tellstick 组件的重写（详见文末“不向后兼容的更改”部分）。

尽情享受吧。

<img src='/home-assistant/images/supported_brands/message_bird.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/pulseaudio.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/uber.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/gntp.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/yamaha.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

 - 设备 Tracker - [OwnTracks]: Allow entry into passive 区域 using iBeacons ([@pavoni])
 - Tellstick: rewrite to [component][Tellstick] to address concurrency issues ([@stefan-jonasson])
 - Z-Wave: add [服务][Z-Wave] to heal and soft reset network ([@srcLurker])
 - New component [input_slider] added ([@persandstrom])
 - 灯光 - [Hue]: Option added to ignore unreachable property ([@maddox])
 - 通知: [MessageBird] support added ([@florianholzapfel])
 - HTTP: Failed login attempts are now logged ([@fabaff])
 - Vera: rewrite to [component][Vera] to simplify code and organize for reusability ([@pavoni])
 - Discovery: support for Squeezebox (Logitech media) server added ([@jaharkes])
 - Discovery: fix uPNP discovery crashing some routers ([@jaharkes])
 - 开关: [Wake on LAN] platform added ([@joopert])
 - 服务 for thermostats, 通知 and media player will now validate passed in parameters ([@MartinHjelmare])
 - 开关 - [Arduino]: support for default 状态 and negate port functionality (@tilutza)
 - 开关: [PulseAudio loopback] now supported ([@Cinntax])
 - 传感器: Uber now supported ([@robbiet480])
 - 通知: [Growl (GNTP)] now supported ([@robbiet480])
 - Media Player: [Yamaha receivers] now supported ([@aoakeson])

[hbMQTT]: https://github.com/beerfactory/hbmqtt
[@aoakeson]: https://github.com/aoakeson
[@balloob]: https://github.com/balloob
[@Cinntax]: https://github.com/Cinntax
[@fabaff]: https://github.com/fabaff
[@florianholzapfel]: https://github.com/florianholzapfel
[@jaharkes]: https://github.com/jaharkes
[@joopert]: https://github.com/joopert
[@maddox]: https://github.com/maddox
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@robbiet480]: https://github.com/robbiet480
[@srcLurker]: https://github.com/srcLurker
[@stefan-jonasson]: https://github.com/stefan-jonasson
[Arduino]: /integrations/arduino#开关
[Discovery]: /integrations/discovery/
[Growl (GNTP)]: /integrations/gntp
[Hue]: /integrations/hue
[input_slider]: /integrations/input_number
[MessageBird]: /integrations/message_bird
[OwnTracks]: /integrations/owntracks
[PulseAudio loopback]: /integrations/pulseaudio_loopback
[Tellstick]: /integrations/tellstick/
[Vera]: /integrations/vera/
[Wake on LAN]: /integrations/wake_on_lan#开关
[Z-Wave]: /integrations/zwave/#服务
[Yamaha receivers]: /integrations/yamaha

### Backward-incompatible changes
 - 自动化: support for old deprecated config has been removed

 - Tellstick 配置 has changed

```yaml
tellstick:
  signal_repetitions: X
```

- Vera 配置 has changed

```yaml
vera:
  vera_controller_url: http://192.168.1.161:3480/
  # Optional to exclude devices - this is a list of vera device ids
  exclude: [ 13, 14, 16, 20, 23, 72, 73, 74, 75, 76, 77, 78, 88, 89, 99]
  # Optional to import switches as lights - this is a list of vera device ids
  lights: [15, 17, 19, 21, 22, 24, 26, 43, 64, 70, 87]
```
