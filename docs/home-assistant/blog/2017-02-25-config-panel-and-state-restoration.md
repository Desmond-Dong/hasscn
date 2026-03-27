---
title: '0.39：配置面板、状态恢复与改进后的文档'
description: '0.39 来了，这次发布带来了一些非常棒的新功能！。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# 0.39：配置面板、状态恢复与改进后的文档

0.39 来了，这次发布带来了一些非常棒的新功能！

<a href='/home-assistant/integrations/#added_in_current_version'><img src='/home-assistant/images/blog/2017-02-0.39/social.png' style='border: 0;box-shadow: none;'></a>

## T 恤

首先，如果你还没看到这个消息：[我们现在有 T 恤了][t-shirt]，而且真的很好看。所有 T 恤收益都将捐赠给 Electronic Frontier Foundation。仅仅前三天，大家就已经筹集了 400 美元！我还在等 Teespring 回复，所以欧盟商店的消息也请继续关注。

## 配置面板

没错，你没看错。我们现在有配置面板了。这只是许多小步骤中的第一步。先打好基础很重要，这样我们之后才能持续迭代。

作为起点，我们先提供了三个简单的配置面板：

  - 核心：允许你验证配置、重新加载核心 / group / 自动化配置，以及重启或停止 Home Assistant
  - Group：允许你重命名组、在 group 和 view 之间切换类型，以及重新排列实体
  - Z-Wave：允许你设置设备专属的配置选项

<p class='img'>
  <img src='/home-assistant/images/blog/2017-02-0.39/config.png'>
  新配置面板的截图。
</p>

出于安全考虑，配置面板默认不会启用，你需要在配置文件中手动激活。只需在 `configuration.yaml` 中加入以下内容：

```yaml
config:
```

要使用我们的配置面板，你需要按照它预期的结构来整理 groups 和 Z-Wave 设备配置。这是有意为之，因为我们不打算构建一套同时兼容扩展配置钩子和配置面板的系统。两者只能二选一。

要在配置中启用这些功能，请先在配置目录中创建空文件 `groups.yaml` 和 `zwave_device_config.yaml`，然后在配置中加入以下条目：

```yaml
group: !include groups.yaml

zwave:
  device_config: !include zwave_device_config.yaml
```

_请注意，这是首次发布。有些功能还会缺失，也可能还有一些地方没有完全正常工作。_

## 重新整理后的文档

感谢 [Fabian][@fabaff]，我们现在有了一套重新整理过的优秀文档。它已经完美了吗？还没有。但我们已经越来越接近了。我们特别强调让树莓派成为入门流程的核心重点。其他安装说明依然保留，只是不再作为主要入门路径的一部分。

## 状态恢复

你是否曾因为某些 input 组件或集成在重启后丢失状态而感到烦恼？现在不用担心了。[Johann][@kellerza] 已经为 Home Assistant 加入了状态恢复的基础能力。首个版本先支持 `input_select` 和 `input_boolean` 组件，未来我们还会把这项能力扩展到更多集成中。

## `customize` 与 Z-Wave “customize” 的不兼容变更

在几个版本之前，我们为 `customize` 引入了一种新写法。它变成了一个列表，允许通过不同方式将配置匹配到实体。

后来我们意识到，这让事情走进了一条必须尽快退出的岔路。它不仅让配置变得不必要地复杂，也挡住了配置面板的发展道路。而谁会不喜欢配置面板呢？

因此，从这次发布开始，我们不得不做出一些不兼容变更来修正这个问题。今天稍晚我们还会发布一个在线工具，帮助你把配置转换为新格式。

[**更新：在线工具可以在这里找到。**](https://jsfiddle.net/balloob/d2e56q6f/74/)

#### Customize 已恢复为原始配置格式

旧版 customize 回来了。按域名匹配或使用 glob 匹配的选项现在已经被拆分到各自独立的配置项中。现在它看起来会像这样：

```yaml
homeassistant:
  customize:
    light.kitchen:
      hidden: true
  customize_domain:
    light:
      icon: mdi:home
  customize_glob:
    "light.kitchen_*":
      icon: mid:description
```

#### Z-Wave customize 现已改为设备配置

你是否也曾疑惑，为什么 Z-Wave 的 customize 会叫 customize？是的，我们也是这么想的。所以在将它迁移到新的配置格式时，我们也顺便把名称升级了：

```yaml
zwave:
  device_config:
    light.kitchen:
      ignored: true
  device_config_domain:
    light:
      polling_intensity: 2
  device_config_glob:
    "light.kitchen_*":
      polling_intensity: 0
```

## 速度提升

最后还要特别感谢 [Pascal][@pvizeli]。他一直在持续改进整个 Home Assistant 中各个组件和平台的性能。

<!--more-->

## All changes

#### New platforms/components

- [Telegram] webhooks ([@scipioni])
- Added [Openhome][openhome] support ([@bazwilliams])
- UPS 传感器 ([@happyleavesaoc])
- FEDex 传感器 ([@happyleavesaoc])
- [Gstreamer][gstreamer] media player ([@happyleavesaoc])
- [iTach 遥控器][itach] Platform ([@alanfischer])
- [myq] 遮盖 component ([@arraylabs])
- Support for the [Open Energy Monitor Thermostat][oemt] ([@Cadair])
- Added Fritzbox [Netmonitor][netmonitor] ([@PetePriority])
- Add platform for [Yeelight Sunflower 灯光][sunflowers] ([@lindsaymarkward])
- Support for [Pocket Casts][pocket] ([@molobrakos])
- [VolvoOnCall][volvo] component with support for 传感器, heater and 门锁 ([@molobrakos])
- Add [pushsafer.com][pushsafer] 通知 服务 ([@appzer])
- [Websocket push][kodi] 通知 for Kodi ([@armills])
- New component 'insteon_plm' and related platforms ([@nugget])
- Add [aurora][aurora] 传感器 ([@walkerdb])
- Add [Ebox][ebox] 传感器 platform ([@titilambert])
- Mediaplayer [clementine][clementine] 遥控器 ([@jjmontesl])
- Add [Fido][fido] 传感器 ([@titilambert])
- Add [History Statistics][history_stats] 传感器 platform ([@bokub])

#### Improvements

- Tellduslive: Don't throw exception if connection to server is lost ([@molobrakos])
- 核心: Convert config.components to a set ([@balloob])
- Media Player - Apple TV: Handle connection 错误 when connecting to Apple TVs, re-use aiohttp session , add fake support for 打开/off ([@postlund])
- Zoneminder: Refactoring and JSON decode 错误 handling ([@pschmitt])
- Recorder: Add tests for full schema migration, limit to session scope ([@armills])
- 设备 tracker - Tado: Add support for multiple 设备 to Tado 设备 tracker ([@markoudev])
- Z-Wave: Fix zwave 助手 getter not to fail on some None results. ([@andrey-git])
- 核心: `sensor_class` migrate to `device_class` ([@armills])
- 传感器 - Amcrest: Avoid traceback for Amcrest 摄像头/firmware that does not have the software_information API call ([@tchellomello])
- Media Player - MPD: Adds play URL support to mpd ([@jjmontesl])
- Logbook: Component set add using OR ([@kellerza])
- Config: Add config component and hassbian example 面板 ([@balloob])
- Proximity: Fixed proximity 区域 incorrectly using name instead of 区域 setting ([@jjmontesl])
- Z-Wave: Add device_class support to 遮盖 component ([@armills])
- Config: Add check_config API ([@balloob])
- Media player: Add media_image to 媒体播放器 component ([@postlund])
- 传感器- Vasttrafik.py: vasttrafik: 更新 token on read 错误 ([@persandstrom])
- Z-Wave.py: force_update zwave 传感器 ([@andrey-git])
- 核心: Two stage shutdown ([@pvizeli])
- Z-Wave: Rename customize to device_config ([@balloob])
- Thingspeak: Use the correct API key ([@fabaff])
- 门锁 - Nuki: Reduce battery drain on Nuki 门锁 ([@pschmitt])
- 通知 - Webostv: Only try to pair 通知.webostv when not paired ([@andersonshatch])
- KNX: Fix slow status updates from the knx bus ([@keerts])
- HDMI-CEC: HDMI_CEC customization [Breaking change] ([@balloob], [@andrey-git])
- 传感器 - Moon: Remove unit of measurement ([@fabaff])
- Z-Wave: Add initial Z-Wave config 面板 ([@balloob])
- History: Allow printing the number of 状态 returned by history and time it took to extract and add day ([@andrey-git])
- MQTT: Enable 传感器 for discovery ([@fabaff])
- 灯光 - Limitlessled: Added limitlessled support for bridge v6 and RGBWW bulbs. ([@soldag])
- Config - Hassbian: 更新 hassbian component with real output ([@balloob])
- Media Player -Sonos: Bugfix sonos favorite_source after lost connection ([@pvizeli])
- 传感器 - SenseHAT: Add flag to declare if SenseHAT is attached  ([@nodinosaur])
- RFLink: Reconnect robustness, expose connection 状态. ([@aequitas])
- Media player - CMUS: Remove IO from properties ([@armills])
- 灯光 - Litejet: 灯光 should have the option to dim in the UI. ([@joncar])
- 灯光 - Hue: Add effect_list to hue 灯光 ([@armills])
- Meida player - Liveboxplaytv: 更新 liveboxplaytv and catch connection 错误 ([@pschmitt])
- Llight - Lifx: Fix colortemp conversion for lifx 灯光 ([@kitcorey])
- 灯光 - Flux_LED: 更新 FLUX_LED by adding Effects ([@dramamoose])
- 报警 control 面板 - Simplisafe: SimpliSafe updates ([@w1ll1am23])
- 遮盖 Add supported_features to 遮盖 component ([@armills])
- Wink: Added tamper detection to Wink 设备. ([@w1ll1am23])
- 传感器 - onewire: Add support for aliased owfs 传感器 ([@normakm])
- 天气: Forecast ([@Tommatheussen])
- 设备 tracker - ASUSwrt: Added support for alternate SSH ports in AsusWRT ([@swbradshaw])
- Zoneminder: Add 摄像头 mjpeg stream support ([@mnoorenberghe])
- 恢复: Restore_state 助手 to 恢复 实体 状态 from the DB on startup ([@kellerza])
- 传感器 - Darksky: Add 'entity_picture' to Darksky component ([@aronsky])
- Media Player - Samsungtv: Add support for waking up Samsung TVs over the network ([@justin8])
- MQTT: Convert MQTT platforms to async ([@pvizeli])
- tests/integrations/device_tracker/test_init.py: 恢复 for device_tracker ([@kellerza])
- Discovery: Make it possible to ignore platforms in discovery ([@postlund])
- 图像 processing: Add `device_class` ([@pvizeli])

### 发布 0.39.1 - February 27

 - Add workaround for Paho out of memory issues ([@pvizeli])
 - When an 错误 occurs while storing group config, fail instead of wiping config. ([@balloob])

### 发布 0.39.2 - March 1

 - Move Zigbee from eventbus to dispatcher ([@pvizeli])
 - Fix discovery taking up all memory and cpu ([@balloob] + [@tomusher])

### 发布 0.39.3 - March 4

 - Prevent discovered 服务 and 设备 to be handled twice (@colinodell)

#### Backward-incompatible changes

 - VolvoOnCall has been extended with more features and had to be converted to a component
 - Limitlessled support for Bridge v6 and RGBWW bulbs require 用户 to specify `version` and `port
 - hdmi_cec config now requires users to set the types in the hdmi_cec config instead of using `customize`:

```yaml
hdmi_cec:
  types:
    hdmi_cec.hdmi_5: media_player
```

#### Bugfixes:

[@pvizeli], [@LinuxChristian], [@molobrakos], [@balloob], [@rytilahti], [@fabaff], [@andrey-git], [@aequitas], [@konikvranik], [@Danielhiversen], [@colinodell], [@pschmitt], [@bachp], [@bachp],[@w1ll1am23], [@valentinalexeev], [@robbiet480], [@MartinHjelmare], [@happyleavesaoc], [@tdickman], [@arraylabs], [@lwis], [@titilambert]

### If you need help...
...don't hesitate to use our very active [forums][forum] or join us for a little [chat][discord]. The release notes have comments enabled but it's preferred if you use the former communication channels. Thanks.

### Reporting Issues
Experiencing issues introduced by this release? Please report them in our [issue tracker][issue]. Make sure to fill in all fields of the issue 模板.

[@tomusher]: https://github.com/tomusher
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@nugget]: https://github.com/nugget
[@PetePriority]: https://github.com/PetePriority
[@dramamoose]: https://github.com/dramamoose
[@fabaff]: https://github.com/fabaff
[@joncar]: https://github.com/joncar
[@alanfischer]: https://github.com/alanfischer
[@LinuxChristian]: https://github.com/LinuxChristian
[@justin8]: https://github.com/justin8
[@jjmontesl]: https://github.com/jjmontesl
[@tdickman]: https://github.com/tdickman
[@Danielhiversen]: https://github.com/Danielhiversen
[@pavoni]: https://github.com/pavoni
[@Tommatheussen]: https://github.com/Tommatheussen
[@pvizeli]: https://github.com/pvizeli
[@keerts]: https://github.com/keerts
[@arraylabs]: https://github.com/arraylabs
[@soldag]: https://github.com/soldag
[@walkerdb]: https://github.com/walkerdb
[@kellerza]: https://github.com/kellerza
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@bazwilliams]: https://github.com/bazwilliams
[@appzer]: https://github.com/appzer
[@tchellomello]: https://github.com/tchellomello
[@aronsky]: https://github.com/aronsky
[@swbradshaw]: https://github.com/swbradshaw
[@colinodell]: https://github.com/colinodell
[@nodinosaur]: https://github.com/nodinosaur
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@bokub]: https://github.com/bokub
[@markoudev]: https://github.com/markoudev
[@titilambert]: https://github.com/titilambert
[@aequitas]: https://github.com/aequitas
[@mnoorenberghe]: https://github.com/mnoorenberghe
[@Cadair]: https://github.com/Cadair
[@postlund]: https://github.com/postlund
[@konikvranik]: https://github.com/konikvranik
[@scipioni]: https://github.com/scipioni
[@andrey-git]: https://github.com/andrey-git
[@persandstrom]: https://github.com/persandstrom
[@lwis]: https://github.com/lwis
[@balloob]: https://github.com/balloob
[@bachp]: https://github.com/bachp
[@robbiet480]: https://github.com/robbiet480
[@lindsaymarkward]: https://github.com/lindsaymarkward
[@valentinalexeev]: https://github.com/valentinalexeev
[@armills]: https://github.com/armills
[@molobrakos]: https://github.com/molobrakos
[@normakm]: https://github.com/normakm
[@rytilahti]: https://github.com/rytilahti
[@pschmitt]: https://github.com/pschmitt
[@kitcorey]: https://github.com/kitcorey
[@andersonshatch]: https://github.com/andersonshatch

[telegram]: /integrations/telegram_webhooks/
[pushsafer]: /integrations/pushsafer
[openhome]: /integrations/openhome
[ups]: /integrations/ups
[fido]: /integrations/fido
[gstreamer]: /integrations/gstreamer
[clementine]: /integrations/clementine
[ebox]: /integrations/ebox
[aurora]: /integrations/aurora
[netmonitor]: /integrations/fritzbox#sensor_netmonitor/
[itach]: /integrations/itach
[sunflowers]: /integrations/yeelightsunflower/
[kodi]: /integrations/kodi
[myq]: /integrations/myq
[oemt]: /integrations/oem
[volvo]: /integrations/volvooncall/
[pocket]: /integrations/pocketcasts
[config]: /integrations/config/
[history_stats]: /integrations/history_stats

[docs]: /docs/
[getting-started]: /getting-started/
[docs-issue]: https://github.com/home-assistant/home-assistant.io/issues/1603

[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[t-shirt]: /blog/2017/02/22/home-assistant-tshirts-have-arrived/
[discord]: https://discord.gg/c5DvZ4e
