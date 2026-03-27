---
title: '0.17: Onkyo, Panasonic, GTFS and config validation'
description: 'Another awesome 发布 ready to hit your homes. YAML can be hard for beginners and more experienced automators. So to help catch those pesky 错误 that sneak。'
---
# 0.17: Onkyo, Panasonic, GTFS and config validation

Another awesome 发布 ready to hit your homes. YAML can be hard for beginners and more experienced automators. So to help catch those pesky 错误 that sneak into your files we've been hard at work to introduce config validation! Especially huge thanks to [@jaharkes] for his hard work on this. Config validation is still in its early stages. More common platforms and components have been added but we didn't do everything yet.

When we encounter an invalid config we will now write a 警告 to your 日志. You can see those in the 前端 by clicking on the last developer tool. We're looking into options to make it more clear - it is a work in progress.

Another big thing is the addition of GTFS support. You probably don't know it, but GTFS is the standard that public transit companies all over the world use to distribute their schedule. This means that you can now have the time of the next bus/train/etc right in your 前端.

<img src='/home-assistant/images/supported_brands/onkyo.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/loop.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/panasonic.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

 - Config validation ([@balloob], [@jaharkes])
 - 传感器: [GTFS] support (public transit open standard) ([@robbiet480])
 - 摄像头: [树莓派] support added ([@LucaSoldi])
 - Z-Wave: improved startup reliability ([@srcLurker])
 - Media Player: [Onkyo receiver] now supported ([@danieljkemp])
 - 传感器: [Loop Energy] now supported ([@pavoni])
 - Thermostat: [Z-Wave] now supported ([@coteyr], [@turbokongen], [@luxus])
 - 传感器: [NZBGet] now supported ([@justyns])
 - Media Player: [Panasonic Viera TV] now supported ([@florianholzapfel])
 - Thermostats: Use whole degrees if 用户 uses Fahrenheit ([@JshWright])
 - 前端: more material love ([@balloob])

[@balloob]: https://github.com/balloob/
[@coteyr]: https://github.com/coteyr/
[@danieljkemp]: https://github.com/danieljkemp/
[@florianholzapfel]: https://github.com/florianholzapfel/
[@jaharkes]: https://github.com/jaharkes/
[@JshWright]: https://github.com/JshWright/
[@justyns]: https://github.com/justyns/
[@LucaSoldi]: https://github.com/LucaSoldi/
[@luxus]: https://github.com/luxus/
[@pavoni]: https://github.com/pavoni/
[@robbiet480]: https://github.com/robbiet480/
[@srcLurker]: https://github.com/srcLurker/
[@turbokongen]: https://github.com/turbokongen/
[GTFS]: /integrations/gtfs
[Loop Energy]: /integrations/loopenergy
[NZBGet]: /integrations/nzbget
[Onkyo receiver]: /integrations/onkyo
[Panasonic Viera TV]: /integrations/panasonic_viera
[树莓派]: /integrations/rpi_camera
[Z-Wave]: /integrations/zwave/#温控

### Backward-incompatible changes

As of now we are not aware of any backward-incompatible changes. However, it might be that Home Assistant will not start for you because of an invalid 配置. A common mistake that people are making is that they are still referring to `execute_service` in their 脚本 configs. This should be `service`.
