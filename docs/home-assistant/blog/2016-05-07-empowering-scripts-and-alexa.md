---
title: '0.19: Empowering 脚本 and Alexa'
description: The new release of Home Assistant includes a lot of upgrades to how we
  handle 脚本 and make them available in a wide range of new components including
  自动化 and alexa.
---
# 0.19: Empowering 脚本 and Alexa

这次发布很重磅。到目前为止，我们的自动化和脚本一直比较静态。从今天开始，它们会变得更动态一些。

**脚本** 现在可用于自动化，也可用于响应 Alexa/Amazon Echo。这两个组件现在都会暴露可在脚本模板中使用的数据（包括 `from_state`！）。你还可以通过向脚本服务传递数据，把变量传给脚本实体。

```yaml
automation:
  trigger:
    platform: mqtt
    topic: some/notify/topic
  action:
    service: notify.notify
    data:
      message: 

automation 2:
  trigger:
    platform: state
    entity_id: light.hue
  action:
    service: notify.notify
    data:
      message:  is now 
```

**实体命名空间（Entity namespaces）** 允许你控制特定平台生成的实体 ID。例如，你可以通过下面的配置把 `light.living_room` 变成 `light.holiday_home_living_room`：

```yaml
light:
  platform: hue
  entity_namespace: holiday_home
```

 - 自动化: allow [脚本 syntax] for 动作 ([@balloob])
 - 自动化: expose [`trigger` variable][触发器-variable] to 脚本 模板 ([@balloob])
 - 脚本: allow passing variables for 脚本 模板 in the [脚本 服务 calls] ([@balloob])
 - Alexa/Amazon Echo: allow [脚本 syntax] for 动作 ([@balloob])
 - Alexa/Amazon Echo: [expose intent variables] to 脚本 模板 ([@balloob])
 - 脚本 syntax: [条件 now supported] to interrupt execution ([@balloob])
 - 自动化: use [new 条件 syntax] ([@balloob])
 - 脚本 syntax: two new 条件 [`and`][con-and] and [`or`][con-or] to combine 条件 ([@balloob])
 - Any platform: Allow setting [实体 namespace] to prefix entity_ids. ([@balloob])
 - 开关: [树莓派 generic 433 Mhz GPIO adapters][rpi-rf] now supported ([@milaq])
 - Z-Wave: use more sane defaults ([@danieljkemp])
 - Media Player: [Snapcast] now supports picking a source ([@happyleavesaoc])
 - MySensors: major cleanup ([@MartinHjelmare])
 - 二元sensor: [Command line 传感器] now supports classes ([@fabaff])
 - MQTT: [allow client key 认证] ([@timharton])
 - 传感器: [Forecast.io] now supports minutely, hourly and daily summaries ([@aceat64])
 - Media Player: [Pioneer AVR] now supported ([@kylehendricks])
 - 开关: [Acer Projectors] now supported ([@deisi])
 - New [HVAC component] added with Z-Wave support ([@turbokongen])
 - Support added for [OctoPrint] ([@w1ll1am23])
 - 配置.yaml can now refer to environment variables using `!env_var` ([@bah2830])
 - 门锁: [Z-Wave][门锁.zwave] now supported ([@devdelay])
 - New [Dweet component] to export data ([@fabaff])
 - Media Player now supports stop command + initial kodi support ([@hmronline])
 - Zigbee: push updates now supported ([@flyte])
 - Wink 设备 with battery level will now show these ([@w1ll1am23])
 - 模板: new [`as_timestamp`] method now available ([@srcLurker])
 - API: Add [`/api/discovery_info`] with basic instance info ([@robbiet480])
 - 传感器: [Google Maps travel time] added ([@Danielhiversen])
 - HTTP: Allow adding [CORS headers] ([@robbiet480])
 - 传感器: [Fitbit] support added ([@robbiet480])
 - Bug fixes and tweaks by [@turbokongen], [@danieljkemp], [@Danielhiversen], [@TheRealLink], [@persandstrom], [@sander76], [@fabaff], [@ishults], [@Bart274], [@robbiet480], [@Cinntax], [@blackdog70], [@gwendalg], [@JshWright], [@kylehendricks], [@bradsk88], [@shaftoe], [@molobrakos], [@bah2830], [@nkgilley]

[脚本 syntax]: /getting-started/脚本/
[触发器-variable]: /getting-started/自动化-templating/#available-触发器-data
[脚本 服务 calls]: /integrations/脚本/#passing-parameters-in-服务-calls
[expose intent variables]: /integrations/alexa/#configuring-home-assistant
[条件 now supported]: /getting-started/脚本-条件/
[new 条件 syntax]: /getting-started/脚本-条件/
[con-and]: /getting-started/脚本-条件/#and-条件
[con-or]: /getting-started/脚本-条件/#or-条件
[实体 namespace]: /topics/platform_options/#实体-namespace
[rpi-rf]: /integrations/rpi_rf
[Forecast.io]: /integrations/darksky
[Snapcast]: /integrations/snapcast
[Command line 传感器]: /integrations/传感器.command_line/
[allow client key 认证]: /integrations/MQTT/
[Pioneer AVR]: /integrations/pioneer
[Acer Projectors]: /integrations/acer_projector
[HVAC component]: /integrations/温控/
[OctoPrint]: /integrations/octoprint/
[Z-Wave]: /integrations/zwave/
[门锁]: /integrations/门锁/
[门锁.zwave]: /integrations/zwave#门锁
[Dweet component]: /integrations/dweet/
[`as_timestamp`]: /topics/templating/#home-assistant-模板-extensions
[Google Maps travel time]: /integrations/google_travel_time
[CORS headers]: /integrations/http/
[Fitbit]: /integrations/fitbit
[@balloob]: https://github.com/balloob/
[@milaq]: https://github.com/milaq/
[@danieljkemp]: https://github.com/danieljkemp/
[@happyleavesaoc]: https://github.com/happyleavesaoc/
[@MartinHjelmare]: https://github.com/MartinHjelmare/
[@fabaff]: https://github.com/fabaff/
[@timharton]: https://github.com/timharton/
[@aceat64]: https://github.com/aceat64/
[@kylehendricks]: https://github.com/kylehendricks/
[@deisi]: https://github.com/deisi/
[@turbokongen]: https://github.com/turbokongen/
[@w1ll1am23]: https://github.com/w1ll1am23/
[@bah2830]: https://github.com/bah2830/
[@devdelay]: https://github.com/devdelay/
[@hmronline]: https://github.com/hmronline/
[@flyte]: https://github.com/flyte/
[@srcLurker]: https://github.com/srcLurker/
[@robbiet480]: https://github.com/robbiet480/
[@Danielhiversen]: https://github.com/Danielhiversen/
[@TheRealLink]: https://github.com/TheRealLink/
[@persandstrom]: https://github.com/persandstrom/
[@sander76]: https://github.com/sander76/
[@ishults]: https://github.com/ishults/
[@Bart274]: https://github.com/Bart274/
[@Cinntax]: https://github.com/Cinntax/
[@blackdog70]: https://github.com/blackdog70/
[@gwendalg]: https://github.com/gwendalg/
[@JshWright]: https://github.com/JshWright/
[@bradsk88]: https://github.com/bradsk88/
[@shaftoe]: https://github.com/shaftoe/
[@molobrakos]: https://github.com/molobrakos/
[@nkgilley]: https://github.com/nkgilley/

### Deprecations
 - 条件 in 自动化 should now specify which 条件 to use with `condition:` instead of `platform:`. For example `condition: state`.
 - RFXtrx has a new config format.

Old RFXtrx config format:

```yaml
  devices:
    123efab1:
      name: My DI.0 light device
      packetid: 1b2200000890efab1213f60
```

New RFXtrx config format:

```yaml
  devices:
    1b2200000890efab1213f60:
      name: My DI.0 light device
```
