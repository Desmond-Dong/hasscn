---
title: '0.22: Pandora, BT Home Hub 5 and local file 摄像头.'
description: This new release of Home Assistant has been mainly about stabilizing
  our last release which included a lot of core improvements. We're all stable now
  and set for a bright future.
---
# 0.22: Pandora, BT Home Hub 5 and local file 摄像头.

现在到了 0.22 发布的时间。这个发布周期相当艰难，我们不得不为核心改进连续推出两个热修复。不过现在看起来一切都稳定下来了，很多人反馈他们的安装体验比以往更快，偶发的小问题也不再出现。

我们知道新的 Web 栈在 ARM 平台上安装 Home Assistant 时带来了一些问题，很遗憾这包括树莓派和群晖 NAS 系统。我们正在努力提供更好的解决方案。对于树莓派，All-in-One 安装器会帮你处理好所有细节。我们也在更新[独立树莓派安装指南][standalone 树莓派 安装 guide]。

这次发布里有两项很酷的内容值得特别提一下。第一项是对 Pandora 的支持，它基于名为 pianobar 的命令行播放器。这意味着运行 Home Assistant 的机器可以直接连接音箱，为你的家播放音乐。

<p class='img'>
<img src='/home-assistant/images/screenshots/pandora_player.png' />
</p>

另一项很棒的新增功能是本地文件摄像头。它看起来很基础，但可以让你用喜欢的第三方绘图工具生成图像，并直接显示在 Home Assistant 仪表盘中。我们很期待看到你用它做出什么！

<img src='/home-assistant/images/supported_brands/pandora.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/bt.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

- Media Player: [Pandora] media player now supported ([@partofthething])
- 设备 Tracker: [BT Home Hub 5] now supported ([@lwis])
- 摄像头: New [local file] platform shows any 图像 as 摄像头 ([@Landrash])
- Add [Sonos] snapshot and 恢复 服务 ([@dansullivan86])
- 设备 Tracker: [AsusWRT] in Access Point mode now supported ([@linjef])
- 设备 Tracker: [AsusWRT] login using public key now supported ([@mtreinish])
- 设备 Tracker: [AsusWRT] protocol to use is now auto detected ([@persandstrom])
- 摄像头: [Netatmo] now supported ([@jabesq])
- API 文档 added  in [Swagger.yaml format] ([@wind-rider])
- Media Player: [Cast] 设备 can now be stopped ([@michaelarnauts])
- MySensors: [IR 开关 设备] and 服务 now supported ([@MartinHjelmare])
- Bloomsky: [Voltage 传感器] now supported ([@arsaboo])
- 传感器: New [Plex 传感器] monitors friends streaming from your Plex server ([@nkgilley])
- Component [shell command] can now use 模板 to render arguments ([@partofthething])
- Rollershutter: [Wink] is now supported ([@philk])
- Alexa: Updated [文档][alexa] to show how to call 脚本 and 场景 (@acockburn)
- 传感器: [SNMP] is now supported ([@fabaff])
- 传感器: Support for Swiss hydrological data ([@fabaff])

### Breaking change

- The new Netatmo support caused us to change how Netatmo are configured. It's now done via its own component.

```yaml
netatmo:
    api_key: API_KEY
    secret_key: SECRET_KEY
    username: username
    password: password
```

### Hotfix 0.22.1 - June 20

- Insteon Hub 灯光 will load again

[@acockburn]: https://github.com/acockburn/
[@arsaboo]: https://github.com/arsaboo/
[@dansullivan86]: https://github.com/dansullivan86/
[@jabesq]: https://github.com/jabesq/
[@Landrash]: https://github.com/Landrash/
[@linjef]: https://github.com/linjef/
[@lwis]: https://github.com/lwis/
[@MartinHjelmare]: https://github.com/MartinHjelmare/
[@michaelarnauts]: https://github.com/michaelarnauts/
[@mtreinish]: https://github.com/mtreinish/
[@nkgilley]: https://github.com/nkgilley/
[@partofthething]: https://github.com/partofthething/
[@persandstrom]: https://github.com/persandstrom/
[@philk]: https://github.com/philk/
[@wind-rider]: https://github.com/wind/
[@fabaff]: https://github.com/fabaff/
[AsusWRT]: /integrations/asuswrt
[BT Home Hub 5]: /integrations/bt_home_hub_5
[Cast]: /integrations/cast
[IR 开关 设备]: /integrations/mysensors/
[local file]: /integrations/local_file
[Netatmo]: /integrations/netatmo/
[Pandora]: /integrations/pandora
[shell command]: /integrations/shell_command/
[Sonos]: /integrations/sonos
[Wink]: /integrations/wink/#遮盖
[alexa]: /integrations/alexa/#working-with-场景
[Plex 传感器]: /integrations/plex#传感器
[Swagger.yaml format]: https://github.com/home-assistant/home-assistant/blob/dev/docs/swagger.yaml
[standalone 树莓派 安装 guide]: /getting-started/安装-raspberry-pi/
[Voltage 传感器]: /integrations/bloomsky/#传感器
[SNMP]: /integrations/snmp#传感器
