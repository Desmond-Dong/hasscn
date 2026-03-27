---
title: '0.28: 重新加载 自动化 and groups, API documentation, car tracking, Pi-Hole
  stats'
description: No Home Assistant 重启 for reloading 自动化 and groups, Automatic
  car tracking, Pi-Hole and battery details, and bugfixes for 温控 and 遮盖
---
# 0.28: 重新加载 自动化 and groups, API documentation, car tracking, Pi-Hole

由于我们的发布周期非常短，很快就到了 0.28。现在可以正式宣布了：我们在 GitHub 上达到了 4000 星！这真的很棒。虽然可能没有 0.27 那次那么“炸裂”，但依然非常令人兴奋。

### 重载 自动化 rules

这个发布在 [自动化] 和 [group] 的处理上带来了重大改进。你现在可以调用新的重载服务，在不重启 Home Assistant 的情况下重新加载它们。自动化还可以直接在前端进行控制。

<p class='img'>
  <img src='/home-assistant/images/screenshots/automation-switches.png' />
</p>

### 树莓派 安装 guide
单板计算机一直是运行 Home Assistant 的热门选择。为此，我们重写了面向树莓派设备的[安装文档][rpi]，帮助你尽快上手。[@Landrash] 牵头完成了这项工作，[@kellerza] 和 [@MartinHjelmare] 也提供了帮助。

### 温控 and  遮盖
这个发布包含了大量 bug 修复，会显著改善你在 `climate` 和 `cover` 平台上的使用体验。两周前，我们刚完成 Home Assistant 历史上规模最大的实现合并。感谢 [@turbokongen]、[@pvizeli]、[@djbanks]、[@danielperna84] 和其他贡献者，代码和前端两侧的改进仍在持续推进。

### API 文档
[Home Assistant API 文档](https://dev-docs.home-assistant.io/en/dev/) 是对现有用户文档的一个重要补充。它的主要受众不是终端用户，而是那些想了解代码细节、但不想直接在 GitHub 上翻代码的开发者。

### 配置 validation
配置校验工作仍在进行中，目前大约完成了 80%。这意味着我们很可能会在下一期发布说明里继续聊这个话题。为了统一各组件和平台的配置方式，我们不得不引入一些不兼容变更。请查看 Backward-incompatible changes 部分，确认你是否需要更新配置，或者直接查看日志中的配置校验错误。感谢 [@kellerza]、[@fabaff]、[@Teagan42] 和 [@pvizeli] 的付出！

### All changes

<img src='/home-assistant/images/supported_brands/xbox-live.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='https://brands.home-assistant.io/automatic/icon.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/pi_hole.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- 灯光: Added bitfield to Flux LED since we are supporting effects ([@tchellomello])
- 设备 tracker: [Owntracks] waypoint import ([@pavoni])
- 温控: A lot of bugfix ([@turbokongen], [@pvizeli], [@djbanks])
- 通知: Improvement of the title handling ([@lwis])
- RFXtrx: 传感器 cleanup ([@turbokongen])
- 设备 tracker: Fix for BLE 设备 tracker ([@open-homeautomation])
- 设备 tracker: Allow 'None' MAC addresses to be loaded from `known_devices` file ([@kellerza])
- 遮盖: Bugfixes ([@turbokongen], [@danielperna84])
- 传感器: Support for displaying details about [crypto currencies][Coinmarketcap] ([@fabaff])
- 设备 tracker: Support for automatic to track your vehicles ([@Teagan42])
- Devie tracker: Add exclude option to [Nmap] 设备 tracker ([@danieljkemp])
- 设备 tracker: Improved login 错误 for Asus 设备 tracker ([@kellerza])
- 传感器: Support for displaying the status of [Xbox] Live accounts ([@mKerix])
- 通知: Adding `link_names` for sending Slack message ([@salt-lick])
- 二元sensor: Add the occupancy 传感器 class ([@robbiet480])
- 风扇: Add supoort for [MQTT 风扇][MQTT-风扇] ([@robbiet480])
- Docs: Add Sphinx API doc generation ([@bbangert])
- 核心: Allow reloading 自动化 without 重启 ([@balloob])
- 传感器: Added scale and offset to the [Temper] 传感器 ([@mKerix])
- 传感器: New support for [Trend] 传感器 ([@pavoni])
- 设备 tracker: Keep looking for new BLE 设备 ([@Bart274])
- 开关: Added 设备 状态 属性 and support for legacy firmware for D-Link 开关 ([@LinuxChristian])
- 传感器: Improve 1-Wire 设备 family detection ([@Ardetus])
- Modbus: 更新 to be Thread safe ([@persandstrom])
- 摄像头: FFMpeg is abale to get the 图像 ([@pvizeli])
- 核心: 重载 groups without 重启 ([@balloob])
- 核心: Fix remove listener ([@balloob])
- 传感器: Support for monitoring your [battery] on a Linux host ([@fabaff])
- 核心: Add support for complex 模板 structures to `data_template` ([@pvizeli])
- `check_config`: Improve yaml fault tolerance and handle border cases ([@kellerza])
- 核心: Add additional [模板] for custom date formats ([@lwis])
- 传感器: Support for getting stats from Pi-Hole systems ([@fabaff])
- Modbus: New `write_registers` [Modbus] 服务 ([@persandstrom])
- 设备 tracker: Fix TP-Link Archer C7 long passwords ([@snikch])

### Hotfix 0.28.1 - September 12

- Fix: Simplisafe 报警 control 面板 accept any string for code ([@tchellomello])
- Fix: Z-Wave would sometimes not detect all thermostats ([@turbokongen])
- Fix: Automatic 设备 tracker when 2 or more cars are tracked ([@teagan42])
- Fix: Group ordering is now based on config again ([@balloob], [@kellerza])

### Hotfix 0.28.2 - September 13

- 灯光 - pilight: Fix send RF code ([@DavidLP])
- Recorder: Fix specifying SQLite ([@pvizeli])
- Wink: Fix garage door detection ([@turbokongen])
- 温控 - Ecobee: Fix inverted high and low temperatures ([@turbokongen])
- Allow changing 遮盖 using 场景 ([@nvella])
- 设备 tracker - Automatic: Fix polling ([@teagan42])

### Backward-incompatible changes

- [OpenweatherMap] 实体 IDs are now like `sensor.owm_temperature`. Previously they were like `sensor.weather_temperature`. Apologies for this change, but we needed to make OpenWeatherMap more generic now that we have many 天气 platforms.
- Updates of 配置 variables due to 配置 check or alignment with other platforms. Please 更新 your 配置 entries according to the 文档:
  - [OctoPrint] component
  - mFi platform ([开关][mfi-开关] and [传感器][mfi-传感器])
  - NX584 报警 Control 面板
  - Mediaplayer platforms [FireTV], [Kodi] and [MPD]
  - [开关][command-line-开关] and the [遮盖][command-line-遮盖] `command_line` platforms
- Custom components extending `BaseNotificationService` need to be aware that `kwargs.get(ATTR_TITLE)` will now return `None` if a title has not been set, and will need to specify `kwargs.get(ATTR_TITLE, ATTR_TITLE_DEFAULT)` if they always require a title.

### If you need help...
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e).

[@DavidLP]: https://github.com/DavidLP
[@nvella]: https://github.com/nvella
[@Ardetus]: https://github.com/Ardetus
[@arsaboo]: https://github.com/arsaboo
[@auchter]: https://github.com/auchter
[@balloob]: https://github.com/balloob
[@Bart274]: https://github.com/Bart274
[@bbangert]: https://github.com/bbangert
[@danieljkemp]: https://github.com/danieljkemp
[@danielperna84]: https://github.com/danielperna84
[@djbanks]: https://github.com/djbanks
[@fabaff]: https://github.com/fabaff
[@infamy]: https://github.com/infamy
[@jnewland]: https://github.com/jnewland
[@kellerza]: https://github.com/kellerza
[@Landrash]: https://github.com/Landrash
[@LinuxChristian]: https://github.com/LinuxChristian
[@lwis]: https://github.com/lwis
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@mKerix]: https://github.com/mKerix
[@nkgilley]: https://github.com/nkgilley
[@open-homeautomation]: https://github.com/open-homeautomation
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@salt-lick]: https://github.com/salt-lick
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@technicalpickles]: https://github.com/technicalpickles
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@snikch]: https://github.com/snikch

[modbus]: /integrations/modbus/
[rpi]: /getting-started/安装-raspberry-pi/
[MPD]: /integrations/mpd
[Coinmarketcap]: /integrations/coinmarketcap
[模板]: /topics/templating/
[battery]: /integrations/linux_battery
[group]: /integrations/group/
[自动化]: /integrations/自动化/
[Temper]: /integrations/temper
[MQTT-风扇]: /integrations/风扇.MQTT/
[Xbox]: /integrations/xbox_live
[Nmap]: /integrations/nmap_tracker
[Owntracks]: /integrations/owntracks
[OpenweatherMap]: /integrations/openweathermap#传感器
[OctoPrint]: /integrations/octoprint/
[mfi-开关]: /integrations/mfi#开关
[mfi-传感器]: /integrations/mfi#传感器
[FireTV]: /integrations/androidtv
[Kodi]: /integrations/kodi
[command-line-开关]: /integrations/开关.command_line/
[command-line-遮盖]: /integrations/遮盖.command_line/
