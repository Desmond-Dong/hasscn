# 0.30: More Async, HASSbian, Digital Ocean, statistics, REST

没错，只过了九天我们就发布了 0.30。别担心，我们会尽量保持常规发布节奏，不会变成天天发版。

你可能已经知道了：[树莓派 图像][pi-图像] 现已可用。对于 Hassbian，[@Landrash] 将 Home Assistant 所需的关键部分整合成了一个易用的树莓派设备镜像。Hassbian 还很年轻，我们非常期待收到你的[反馈][hassbian-forum]、[问题报告][hassbian-forum]和[改进建议][hassbian-forum]，一起把它做得更好。

目前开发资源的很大一部分，仍然投入在继续把 Home Assistant 往异步编程方向推进。这项工作非常耗时，也会伴随一些段错误，以及在特定传感器组合下出现实例不稳定的问题。但它带来的回报，是未来明显的性能提升。

为了减少测试运行时间，[@balloob] 做了很多优化。目前我们临时排除了 RFXtrx 测试，这让你的 Pull Request 所需测试时间大约减半。

### 文档

现在所有配置示例都尽量精简。这可以帮助初学者和新用户避免困惑，因为他们看到的是“必需项”，而不是包含所有可选项的完整样例。如果你的 `configuration.yaml` 中某个条目有问题，错误消息会提供一个指向文档的 URL。

<p class='img'>
  <img src='/home-assistant/images/screenshots/config-validation-url.png' />
</p>

[Hacktoberfest] 一开始，文档相关的 Pull Request 就大量涌入。向所有参与者致以衷心感谢！我们还要特别给 [@hillaryfraley] 发一块“虚拟小饼干”。她目前已经提交了大约十几个 Pull Request，不仅修复了拼写错误，还补全了完整章节。[Hacktoberfest] 仍在进行中，我们也期待收到更多 Pull Request。

### Statistics

我们想通过 [statistics 传感器][stats-传感器] 介绍一个全新传感器，它和 [模板 传感器][模板-传感器] 或 [trend 传感器][trend-传感器] 有些类似。这个传感器会读取另一个传感器的值，并对数据进行统计分析。它会基于一组样本计算平均值、最小值/最大值、总和、标准差和方差，这些结果都可以用于你的自动化规则。如果数据源是二元传感器，它还会统计状态变化次数。

<p class='img'>
  <img src='/home-assistant/images/screenshots/history-line-graphs.png' />
</p>

由于这些结果是实时计算的，如果你想做更深入的历史分析，仍然需要使用数据库中的数据。你可以查看最新的 [notebook]，了解如何对 Home Assistant 数据库做统计分析。

### REST! We don't...

我们在 RESTful API 相关实现上投入了很多工作。[@w1ll1am23] 扩展了 [aREST] 平台，现在可以显示某个 aREST 单元是否可用。aREST 实现也已经纳入配置检查范围。更多细节请查看 Backward-incompatible changes 部分。

[REST 传感器][rest-传感器] 现在支持 HTTP 认证（basic 和 digest）以及自定义请求头。这让你可以访问受保护的资源。下面这个示例传感器会访问 GitHub 并获取最新发布号，同时绕过未认证请求的速率限制。

```yaml
sensor
  - platform: rest
    resource: https://api.github.com/repos/home-assistant/home-assistant/releases/latest
    username: YOUR_GITHUB_USERNAME
    password: YOUR_GITHUB_ACCESS_TOKEN
    authentication: basic
    value_template: ""
    headers:
      Accept: application/vnd.github.v3+json
      Content-Type: application/json
      User-Agent: Home Assistant REST sensor
```

### Misc

* GitHub 在最近一次更新中发布了 review 功能。你在审阅开放 Pull Request 时，可以更灵活地管理评论。
* 感谢 [@robbiet480]，我们现在启用了 [mention-bot]。当你创建新的 Pull Request 时，它会帮助你识别潜在审阅者。
* [Home Assistant Community Forum][forum] 现在新增了一个名为“安装”的版块。

### All changes

<img src='/home-assistant/images/supported_brands/digital_ocean.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/volvo.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/dark_sky.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/vasttrafik.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

* 核心: A lot of stuff is now async ([@balloob])
* Nest: Support for operation modes ([@jawilson])
* Z-Wave: Massive 更新 for command classes and 设备 classes  ([@turbokongen])
* Digital Ocean: New [开关][do-开关] to control and [二元sensor][do-bin-传感器] to monitor droplets ([@fabaff])
* 遮盖: Support for [MySensors 遮盖][mysensors-遮盖] ([@OttoWinter])
* Wink: Support for oAuth2 and relay 传感器 ([@w1ll1am23])
* 传感器: [Forecast][darksky] 更新 interval is now configurable ([@KlaasH])
* 核心: Failed login attempts are reported as persistent 通知 ([@fabaff])
* 温控: Temperature convert now available in the 温控 object ([@pvizeli])
* 通知: 更新 to accept a list ([@robbiet480])
* 设备 tracker: Support for tracking of your [Volvo] ([@molobrakos])
* 开关: Flux improvements ([@jawilson])
* InfluxDB: Time-out for connections ([@simonszu])
* 传感器: New MySensors types available ([@MartinHjelmare])
* 开关: [ANEL PwrCtrl][pwrctrl-开关] 设备 are now supported ([@mweinelt])
* 前端: Path of the 配置 file now visible on the 前端 ([@justweb1])
* Homematic:  Extended 设备 support (RF, IP and wired 设备) ([@pvizeli], [@danielperna84])
* 传感器: New 传感器 for [statistical analysis][stats-传感器] ([@fabaff])
* 传感器: Support for headers and HTTP 认证 for [REST 传感器][rest-传感器] ([@fabaff])
* 设备 tracker: Support for encrypted Owntracks payload ([@molobrakos])
* Tests: Improvement of the HTML5 通知 tests ([@capellini])
* Wink: Support for Wink Smoke and CO detectors ([@w1ll1am23])
* 传感器: [TED5000][ted5000] 传感器 was included ([@gwendalg])
* 传感器: Support for [Västtrafik][vasttrafik] public transport ([@persandstrom])
* 通知: Pushetta no longer sends message on start up ([@Danielhiversen])
* 传感器: [Forecast.io][forecast] 传感器 was replaced by [Dark Sky][darksky] ([@fabaff])
* 设备 Tracker: The `known_device.yaml` file is now validated ([@kellerza])
* Minor features and bug fixes by [@tchellomello], [@pavoni], [@fabaff], [@pvizeli], [@lwis], [@turbokongen], [@Danielhiversen], [@persandstrom], [@balloob], [@robbiet480], [@sam-io], [@bbangert], and you if you are missing here.

### 发布 0.30.1 - October 8

* 设备 Tracker `known_devices.yaml` validation is now more accepting ([@kellerza])
* Handle X10 灯光 numbers greater than 9 ([@mtl010957])
* Fix command line 遮盖 without a 模板 ([@roidayan])

### 发布 0.30.2 - October 12

* Handle Volvo's with dashes in their name ([@molobrakos])
* Fix some html5 push 通知 配置 options were discarded after first use ([@T3m3z])
* Fix Homematic 设备 name with autodiscovery ([@pvizeli])
* Make 'pin' optional for Zigbee 设备 config ([@flyte])
* Fix when sending a 通知 to a 服务 with target attached (i.e., `notify.html5_unnamed_device_2`) the target was not submitted to the platform as a list causing iteration over every character in the string. ([@robbiet480])
* Fix for Slack targets ([@fabaff])
* Fix for Pushover targets ([@Nixon506E])

### Backward-incompatible changes

* All deprecated 条件 options from `automation` have been removed (deprecated since May and have printed 警告 to your console):
  * `use_trigger_values` is gone. You have to copy your 触发器 to 条件 and adjust for the correct config.
  * `condition_type` is gone. Use `condition: or` instead.
  * To specify the type of a 条件, use `condition:` instead of `platform:`.
* The [Forecast.io][forecast] was renamed to [Dark Sky][darksky]. Replace your `- platform: forecast` with `- platform: darksky`.
* The [aREST][arest] 配置 between the [传感器][arest-传感器] and the [开关][arest-开关] platform was aligned.

### If you need help...

...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The 发布 notes have comments enabled but it's preferred if you the former communication channels. Thanks.

[@balloob]: https://github.com/balloob

[@bbangert]: https://github.com/bbangert

[@capellini]: https://github.com/capellini

[@Danielhiversen]: https://github.com/Danielhiversen

[@danielperna84]: https://github.com/danielperna84

[@fabaff]: https://github.com/fabaff

[@gwendalg]: https://github.com/gwendalg

[@hillaryfraley]: https://github.com/hillaryfraley

[@jawilson]: https://github.com/jawilson

[@justweb1]: https://github.com/justweb1

[@kellerza]: https://github.com/kellerza

[@KlaasH]: https://github.com/KlaasH

[@Landrash]: https://github.com/Landrash

[@lwis]: https://github.com/lwis

[@MartinHjelmare]: https://github.com/MartinHjelmare

[@molobrakos]: https://github.com/molobrakos

[@mweinelt]: https://github.com/mweinelt

[@OttoWinter]: https://github.com/OttoWinter

[@pavoni]: https://github.com/pavoni

[@persandstrom]: https://github.com/persandstrom

[@pvizeli]: https://github.com/pvizeli

[@robbiet480]: https://github.com/robbiet480

[@sam-io]: https://github.com/sam-io

[@simonszu]: https://github.com/simonszu

[@tchellomello]: https://github.com/tchellomello

[@turbokongen]: https://github.com/turbokongen

[@w1ll1am23]: https://github.com/w1ll1am23

[@mtl010957]: https://github.com/mtl010957

[@roidayan]: https://github.com/roidayan

[@T3m3z]: https://github.com/T3m3z

[@flyte]: https://github.com/flyte

[@Nixon506E]: https://github.com/Nixon506E

[arest]: https://arest.io/

[arest-传感器]: /integrations/arest#传感器

[arest-开关]: /integrations/arest#开关

[darksky]: /integrations/darksky

[do-bin-传感器]: /integrations/digital_ocean#binary-传感器

[do-开关]: /integrations/digital_ocean#开关

[forecast]: /integrations/darksky

[forum]: https://community.home-assistant.io/

[Hacktoberfest]: /博客/2016/10/02/hacktoberfest/

[hassbian-forum]: https://community.home-assistant.io/c/installation/hassbian

[mention-bot]: https://github.com/mention-bot

[mysensors-遮盖]: /integrations/遮盖.mysensors/

[notebook]: https://nbviewer.jupyter.org/github/home-assistant/home-assistant-notebooks/blob/master/other/database-statistics.ipynb

[pi-图像]: /博客/2016/10/01/we-have-raspberry-图像-now/

[pwrctrl-开关]: /integrations/anel_pwrctrl

[rest-传感器]: /integrations/rest

[stats-传感器]: /integrations/statistics

[ted5000]: /integrations/ted5000

[模板-传感器]: /integrations/模板

[trend-传感器]: /integrations/trend

[vasttrafik]: /integrations/vasttrafik

[Volvo]: /integrations/volvooncall
