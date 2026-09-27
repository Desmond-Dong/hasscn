# 0.35：文本转语音、VLC、Flic，以及 Netdata

GitHub 上 5000 颗星、我们的 [聊天室][discord] 里有 2000 人、每月页面浏览量超过 100 万。2016 年接近尾声时，我们很难想象比这更好的状态了。这感觉就像提前收到的圣诞礼物！而我们提前送给你的礼物是 0.35。它不是一个包装精美的单件礼物，而是一个 0.35 礼盒里装着好几个小惊喜。

这将是 2016 年的最后一个发布，因为开发者们要去享受应得的假期了。我们 2017 年再见！

## 文本转语音

随着 [@pvizeli] 开发的 [text-to-speech][tts] 组件加入，Home Assistant 又迈上了一个新台阶。文本转语音组件可以接收任意文本，并在支持媒体播放的播放器上朗读出来。我们已经在 Sonos、Chromecast 和 Google Home 上完成测试。

<https://www.youtube.com/watch?v=Ke0QuoJ4tRM>

## 征集 HASSbian（我们的树莓派镜像）协助者

为了让 Home Assistant 更易用，我们计划扩展 HASSbian（我们的树莓派镜像）开箱即用的能力。你可能已经知道，这个镜像目前由 [@Landrash] 维护。不过他也投入了大量时间在文档改进和许多其他事务上。

所以，如果你熟悉 Linux，并且愿意为开源贡献力量，欢迎加入[开发者聊天频道][discord-devs]，并尝试处理[我们当前开放的问题](https://github.com/home-assistant/pi-gen/issues)之一。

## VLC 媒体播放器、Broadlink 和 GPSLogger

你现在可以控制 [VLC media player][vlc-media]，并通过已连接的扬声器播放声音。

Broadlink [开关][bl-开关] 平台允许你控制 Broadlink RM2 Pro 和 RM mini IR+RF 设备。Broadlink [传感器][bl-传感器] 平台则新增了对 Broadlink RM2 和 A1 设备的支持。

[GPSLogger](/home-assistant/integrations/gpslogger.md) 现在还支持速度、方向、海拔、定位来源和活动状态等属性。

## All changes

* Media player: Support for Sharp [AquaosTV][aquostv] ([@titilambert])

* Media player: [VLC][vlc-media] support ([@Danielhiversen])

* 开关: Digital Loggers relay([@dethpickle])

* 传感器: Support for [Netdata][netdata] ([@fabaff], [@ezar])

* 传感器: Support 天气 条件 from Austrian [ZAMG][zamg] ([@mjl])

* Verisure: Add Verisure smartcam capture 服务 ([@turbokongen])

* 二元sensor: [Flic][flic] 按钮 support added ([@soldag])

* 传感器: Support for [Sense HAT][sensehat] ([@farminf])

* 二元sensor: [Hikvision][hikvision] 二元sensor support ([@mezz64])

* [Text-to-speech][tts] support ([@pvizeli])

* 传感器: Support for Broadlink [传感器][bl-传感器] ([@Danielhiversen])

* 开关: Broadlink [开关][bl-开关] supported now ([@Danielhiversen])

* Media player: Add `source_list` to universal media player ([@danieljkemp])

* 二元sensor: Support improvement for Wink ([@w1ll1am23])

* 传感器: More features for DSMR ([@aequitas])

* 自动化: Parse payload as JSON ([@balloob])

* Mediap player - Cast: New progress indicator ([@balloob])

* 设备 tracker: New 属性 ([@balloob], [@Danielhiversen])

* 二元sensor - netatmo: Add support for tags ([@jabesq])

* 温控: Add `away_mode` for RadioThermostat ([@trisk])

* 设备 tracker - nmap: Make scan option configurable ([@Danielhiversen])

* 温控 - Ecobee: Add SmartAway option ([@devdelay])

* 灯光 - Hue: Add support for Hue LightGroups ([@michaelarnauts])

* Media player - Emby: New support for trailer and media position ([@mezz64])

* 摄像头 - Amcrest: Support for resolution ([@tchellomello])

* Media player - Kodi: Authentification fixed and 风扇 art ([@balloob], [@joopert])

* Minor and not so minor features and bug fixes by [@pvizeli], [@jminn], [@magicus], [@teodoc], [@fabaff], [@technicalpickles], [@balloob], [@lukas-hetzenecker], [@rubund], [@dasos], [@trisk], [@armills], [@auduny], [@lwis], [@nkgilley], [@janLo], [@keatontaylor], [@stefan-jonasson], [@Jypy], [@jawilson], [@DavidLP], [@molobrakos], [@jabesq], [@joerocklin], [@kellerza], [@kirichkov], [@r-jordan] and [@danielperna84].

### 发布 0.35.1 - December 18

Some issues have been reported with TTS that will be addressed by 0.35.1. The TTS component had issues linking the media player to the right media file if you were using Docker or SSL certificates. This can be fixed by exposing to your HTTP config what URL you use for hosting Home Assistant:

```yaml
http:
  base_url: example.duckdns.org
```

* Fix exit hanging on OS X with async logging ([@balloob])
* Fix text-to-speech clearing cache ([@pvizeli])
* Allow setting a base API url in HTTP component ([@balloob])
* Fix occasional 错误 in 自动化 ([@pvizeli])

### 发布 0.35.2 - December 19

* When base url specified, do not combine it with `server_port` ([@balloob])

### 发布 0.35.3 - December 23

* Fix issue with voicerrs and post api ([@pvizeli])
* Fix async component 更新 on 服务 calls ([@pvizeli])
* Fix async 日志 handle do not close ([@pvizeli])
* Fix nest component with various KeyError exceptions ([@technicalpickles])

### If you need help...

...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat][discord]. The 发布 notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### Reporting Issues

Experiencing issues introduced by this 发布? Please report them in our [issue tracker](https://github.com/home-assistant/home-assistant/issues). Make sure to fill in all fields of the issue 模板.

[@r-jordan]: https://github.com/r-jordan

[@aequitas]: https://github.com/aequitas

[@armills]: https://github.com/armills

[@auduny]: https://github.com/auduny

[@balloob]: https://github.com/balloob

[@Danielhiversen]: https://github.com/Danielhiversen

[@danieljkemp]: https://github.com/danieljkemp

[@danielperna84]: https://github.com/danielperna84

[@dasos]: https://github.com/dasos

[@DavidLP]: https://github.com/DavidLP

[@dethpickle]: https://github.com/dethpickle

[@devdelay]: https://github.com/devdelay

[@ezar]: https://github.com/ezar

[@fabaff]: https://github.com/fabaff

[@farminf]: https://github.com/farminf

[@jabesq]: https://github.com/jabesq

[@janLo]: https://github.com/janLo

[@jawilson]: https://github.com/jawilson

[@jminn]: https://github.com/jminn

[@joerocklin]: https://github.com/joerocklin

[@joopert]: https://github.com/joopert

[@Jypy]: https://github.com/Jypy

[@keatontaylor]: https://github.com/keatontaylor

[@kellerza]: https://github.com/kellerza

[@kirichkov]: https://github.com/kirichkov

[@Landrash]: https://github.com/Landrash

[@lukas-hetzenecker]: https://github.com/lukas-hetzenecker

[@lwis]: https://github.com/lwis

[@magicus]: https://github.com/magicus

[@MartinHjelmare]: https://github.com/MartinHjelmare

[@mezz64]: https://github.com/mezz64

[@michaelarnauts]: https://github.com/michaelarnauts

[@mjl]: https://github.com/mjl

[@molobrakos]: https://github.com/molobrakos

[@nkgilley]: https://github.com/nkgilley

[@pvizeli]: https://github.com/pvizeli

[@rubund]: https://github.com/rubund

[@soldag]: https://github.com/soldag

[@stefan-jonasson]: https://github.com/stefan-jonasson

[@tchellomello]: https://github.com/tchellomello

[@technicalpickles]: https://github.com/technicalpickles

[@teodoc]: https://github.com/teodoc

[@titilambert]: https://github.com/titilambert

[@trisk]: https://github.com/trisk

[@turbokongen]: https://github.com/turbokongen

[@w1ll1am23]: https://github.com/w1ll1am23

[vlc-media]: /integrations/vlc

[aquostv]: /integrations/aquostv

[digitalloggers]: /integrations/digitalloggers

[netdata]: /integrations/netdata

[bl-传感器]: /integrations/broadlink#传感器

[bl-开关]: /integrations/broadlink#开关

[hikvision]: /integrations/hikvision

[zamg]: /integrations/zamg#传感器

[flic]: /integrations/flic

[sensehat]: /integrations/sensehat/

[tts]: /integrations/tts/

[discord]: https://discord.gg/c5DvZ4e

[discord-devs]: https://discord.gg/8X8DTH4
