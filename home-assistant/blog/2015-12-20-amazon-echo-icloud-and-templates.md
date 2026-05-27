# 0.10: Amazon Echo, iCloud, Dweet.io, Twitch and templating support!

好了，Home Assistant 0.10 来了。这次有很多令人兴奋的变化，不过遗憾的是，我们也引入了不少向后不兼容的改动。特别感谢 Philip Lundrigan ([@philipbl])，他在推动迁移、让更多平台转向使用模板方面投入了大量精力。

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1Ke3mtWd_cQ" frameborder="0" allowfullscreen></iframe>
</div>

<img src='/home-assistant/images/supported_brands/icloud.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/heatmiser.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/dweet.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/amazon-echo.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/eliq.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

* 设备 tracker: [iCloud] platform added ([@xorso], [@kevinpanaro])
* 前端: Improved caching using 服务 workers if served over SSL ([@balloob])
* 传感器: [Twitch] platform added ([@happyleavesaoc])
* [模板] support ([@balloob], [@philipbl], [@fabaff])
* Thermostat: [Heatmiser] platform added ([@andylockran])
* 传感器: [Dweet.io] platform added ([@fabaff])
* [Alexa/Amazon echo] component added ([@balloob])
* 设备 Tracker: [FritzBox] platform added ([@deisi], [@caiuspb])
* 传感器: [Wink] now supports the Egg minders ([@w1ll1am23])
* 传感器: [ELIQ Online] platform added ([@molobrakos])
* 二元sensor: [REST] platform added ([@fabaff])
* 传感器: [Torque (OBD2)] platform added ([@happyleavesaoc])

[iCloud]: /integrations/icloud

[Twitch]: /integrations/twitch

[模板]: /topics/templating/

[Heatmiser]: /integrations/heatmiser/

[Dweet.io]: /integrations/dweet#传感器

[Alexa/Amazon echo]: /integrations/alexa/

[FritzBox]: /integrations/fritz

[Wink]: /integrations/wink#传感器

[ELIQ Online]: /integrations/eliqonline

[REST]: /integrations/binary_sensor.rest/

[Torque (OBD2)]: /integrations/torque

[@andylockran]: https://github.com/andylockran

[@balloob]: https://github.com/balloob

[@caiuspb]: https://github.com/caiuspb

[@deisi]: https://github.com/deisi

[@fabaff]: https://github.com/fabaff

[@happyleavesaoc]: https://github.com/happyleavesaoc

[@kevinpanaro]: https://github.com/kevinpanaro

[@molobrakos]: https://github.com/molobrakos

[@philipbl]: https://github.com/philipbl

[@w1ll1am23]: https://github.com/w1ll1am23

[@xorso]: https://github.com/xorso

<!--more-->

### 模板

这个发布引入了模板功能。你可以在数据被处理前先解析它，或者基于 Home Assistant 内部数据动态生成通知消息。通知组件和新的 Alexa/Amazon Echo 组件都使用了新的模板功能来渲染响应。我们还在应用的开发者工具区域新增了模板编辑器，这样你可以即时验证模板是否正常工作。

```text
The temperature at home is .
```

更多信息和示例可以在[模板文档][模板]中找到。

### Backward-incompatible changes

模板 will now be the only way to extract data from 'raw' sources like REST, CommandSensor or MQTT. This will replace any specific option that used to do this before. This means that `precision`, `factor`, `attribute` or `json_path` etc will no longer work.

Affected components and platforms:

* 传感器: [arest][传感器.arest]
* 传感器: [command\_sensor][传感器.command]
* 传感器: [rest][传感器.rest]
* 传感器: [MQTT][传感器.MQTT]
* 开关: [MQTT][开关.MQTT]
* rollershutter: MQTT
* 灯光: [MQTT][灯光.MQTT]
* binary\_sensor: [MQTT][binary_sensor.MQTT]
* 自动化: [numeric\_state][自动化-numeric-状态]

[传感器.arest]: /integrations/arest#传感器

[传感器.command]: /integrations/传感器.command_line/

[传感器.rest]: /integrations/rest

[传感器.MQTT]: /integrations/传感器.MQTT/

[开关.MQTT]: /integrations/开关.MQTT/

[灯光.MQTT]: /integrations/灯光.MQTT/

[binary_sensor.MQTT]: /integrations/binary_sensor.MQTT/

[自动化-numeric-状态]: /getting-started/自动化-触发器/#numeric-状态-触发器
