---
title: '0.29: 🎈 Async, SleepIQ, OpenALPR, EmonCMS, stocks, and plants'
description: Move to asynchronous, Support for SleepIQ, OpenALPR, and EmonCMS, and
  other goodies.
---
# 0.29: 🎈 Async, SleepIQ, OpenALPR, EmonCMS, stocks, and plants

两周前，也就是 9 月 17 日，是我们三周年纪念日。Home Assistant 在这三年里，已经从一个“日落时帮我开灯”的简单脚本，成长为一个超棒的开源项目，并拥有开源社区里最棒的社区成员。这个发布包含了由 **50** 位不同贡献者带来的新功能、问题修复和性能优化！我们在 GitHub 上的 Fork 数也突破了 1000，势头十足！

这是一次非常重大的发布，因为我们彻底重构了 Home Assistant 的内部实现。最初编写 Home Assistant 时，我还在摸索 Python 的各种细节，所以在这种包含大量并发任务的应用里，我采用了自己熟悉的方案：线程和锁。这个方案这些年一直很好用，但它的速度并没有达到我们想要的水平，尤其是在性能有限的硬件上。

这一切在 [@bbangert] 接手后发生了变化，他承担了把核心迁移到异步编程这一艰巨任务。他做得非常出色，我很高兴地告诉你：第一阶段迁移已经完成，并且已经包含在这个发布中！更棒的是，我们同时保留了简洁直观的 API。我们仍在持续把更多组件迁移到异步 API，所以你可以期待后续版本带来更多提速和更酷的新功能。

### SleepIQ and OpenALPR

现在我们支持两项很酷的新能力：床垫数据和车牌识别。[@technicalpickles] 创建了 [SleepIQ] 组件，让你可以监控床的传感器数据。[@pvizeli] 则加入了基于 [OpenALPR] 的车牌识别！这意味着你现在可以收到通知，知道停在你车道或车库里的到底是哪辆车。我也想借这个机会特别感谢 [@pvizeli]，他是社区里非常出色的一员。自从 6 月底加入以来，他一直在高效修复 bug 并添加实用功能（已经提交了 65 个 PR！）。

### 配置 validation

在 voluptuous 配置校验方面，我们也取得了很大进展。我们已经完全移除了旧版配置助手，并且在需要迁移的 346 个组件和平台中完成了 323 个！这也意味着部分组件的配置有轻微变化，请务必查看文末的 backward-incompatible changes 部分了解详情。感谢大家审阅 PR、测试改动并反馈问题。

### Delayed 发布

你可能已经注意到，这次发布延迟了 5 天。原因是 Python 解释器中一个罕见且难以复现的问题。非常、非常感谢这些投入了无数时间进行研究、调试和修复的朋友：[@bbangert]、[@turbokongen]、[@lwis]、[@kellerza]、[@technicalpickles]、[@pvizeli]、[@persandstrom] 和 [@joyrider3774]。能和你们一起建设 Home Assistant 社区，我非常感激。

### Hide 自动化 rules

从 0.28 开始，[automation rules](/home-assistant/blog/2016/09/10/notify-group-重载-api-pihole/#重载-automation-rules) 就已经可以直接在前端重新加载。
### All changes

<img src='/home-assistant/images/supported_brands/emoncms.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/sleepiq.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' /><img src='/home-assistant/images/supported_brands/openalpr.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='100' />

- Convert 核心 from Thread-based to be async-based ([@bbangert], [@balloob])
- New [SleepIQ] support ([@technicalpickles])
- 遮盖: [Vera] is now supported ([@pavoni])
- 温控: Vera [温控] 设备 are now supported ([@robjohnson189])
- 温控: [MySensors] is now supported ([@kaustubhphatak])
- Control Home Assistant with [keyboard shortcuts][keyboard_remote] ([@deisi])
- More voluptuous config validations ([@fabaff], [@kellerza], [@balloob])
- New Nuimo controller support added ([@gross1989])
- 传感器: BOM 天气 component ([@tinglis1])
- 自动化: Option added to hide 实体 ([@milaq])
- 传感器: [Emoncms] feeds now supported ([@joyrider])
- 传感器: Mi Flora [plant] 传感器 now supported ([@open-homeautomation])
- Logbook: Allow [filtering] 实体 and hide hidden 实体 ([@wokar])
- 通知: [Kodi] support added ([@chrom3])
- 通知: Support for [Simplepush] added ([@fabaff])
- 传感器: [KNX] 传感器 now supported ([@daBONDi])
- [Wink] improvements ([@w1ll1am23])
- [ISY] improvements ([@Teagan42])
- Link to relevant docs in config validation 错误 messages ([@fabaff])
- Greatly improve the performance of 模板 ([@balloob], [@pvizeli])
- 通知 - [Slack]: Support for username/icon ([@Khabi])
- MQTT 房间 detection: Away [timeout] now supported ([@mKeRix])
- 温控: [Nest] can now control the 风扇 ([@jawilson])
- Modbus: Major cleanup for [Modbus] 开关 and 传感器 ([@persandstrom])
- HTTP: Allow [passwordless] logins from whitelisted IP addresses ([@Danielhiversen])
- 传感器: Yahoo! Finance stocks now supported ([@tchellomello])
- 传感器: Set value based on incoming [email] ([@sam-io])
- 灯光: White value now supported (@mxtra, [@MartinHjelmare])
- [InfluxDB] now allows attaching extra data ([@lwis])
- [OpenALPR] support ([@pvizeli])
- Minor features and bug fixes by [@fabaff], [@w1ll1am23], [@turbokongen], [@clach04], [@mKeRix], [@pvizeli], [@DavidLP], [@nvella], [@Teagan42], [@ericwclymer], [@wokar], [@kellerza], [@nkgilley], [@jawilson], [@Danielhiversen], [@ej81], [@danieljkemp], [@balloob], [@philhawthorne], [@LinuxChristian], [@milas], [@simonszu], [@Cinntax], [@irvingwa], [@sytone], [@kk7ds], [@robbiet480].

### Hotfix 0.29.1 - September 29

- Fix typo in Nest 温控 platform. [We are still experiencing issues with Nest.][nest-issues] ([@tchellomello])

### Hotfix 0.29.2 - September 29

 - InfluxDB config fix ([@fabaff], reported by [@lwis])
 - Netatmo config fix ([@jabesq])

### Hotfix 0.29.3 - September 29

 - Hue config fix ([@pvizeli])

### Hotfix 0.29.4 - September 30

 - Alexa config fix ([@balloob], reported by [@lwis])
 - Envisalink discovery fix ([@cinntax])
 - Acer Projector config fix ([@pvizeli])

### Hotfix 0.29.5 - September 30

 - Fix 温控 Nest platform ([@tchellomello], [@jawilson])

### Hotfix 0.29.6 - October 1

 - Fix segmentation fault ([@bbangert]) 🎉
 - Fix nested 模板 in `data_template` would incorrectly get cached ([@balloob])

### Hotfix 0.29.7 - October 5

 - Fix handling SIGTERM and SIGHUP signals (fixes Systemd 重启 issues) ([@pvizeli])

### Backward-incompatible changes

 - The 模板 methods `now` and `utcnow` have been changed from variables to methods. To get the current time replace `now` with `now()`.
 - `yahooweather` default name is now `yweather`. Also min and max temperature are now correctly called `Temperature Min` and `Temperature Max`.
 - `ffmpeg` is now a component for manage some things central. All `ffmpeg_bin` options have moved to this compoment from platforms.
 - Config has changed for [X10] 灯光.
 - For Wink, make sure your config only contains the access token as in the [docs][Wink].
 - Nest 传感器 'mode' has been renamed to 'operation_mode'

### If you need help...
...don't hesitate to use our [Forum](https://community.home-assistant.io/) or join us for a little [chat](https://discord.gg/c5DvZ4e). The 发布 notes have comments enabled but it's preferred if you the former communication channels. Thanks.

[nest-issues]: https://github.com/home-assistant/home-assistant/issues/3574
[@jabesq]: https://github.com/jabesq
[@joyrider3774]: https://github.com/joyrider3774
[@balloob]: https://github.com/balloob
[@bbangert]: https://github.com/bbangert
[@chrom3]: https://github.com/chrom3
[@Cinntax]: https://github.com/Cinntax
[@clach04]: https://github.com/clach04
[@daBONDi]: https://github.com/daBONDi
[@Danielhiversen]: https://github.com/Danielhiversen
[@danieljkemp]: https://github.com/danieljkemp
[@DavidLP]: https://github.com/DavidLP
[@deisi]: https://github.com/deisi
[@ej81]: https://github.com/ej81
[@ericwclymer]: https://github.com/ericwclymer
[@fabaff]: https://github.com/fabaff
[@gross1989]: https://github.com/gross1989
[@irvingwa]: https://github.com/irvingwa
[@jawilson]: https://github.com/jawilson
[@joyrider]: https://github.com/joyrider
[@kaustubhphatak]: https://github.com/kaustubhphatak
[@kellerza]: https://github.com/kellerza
[@Khabi]: https://github.com/Khabi
[@kk7ds]: https://github.com/kk7ds
[@LinuxChristian]: https://github.com/LinuxChristian
[@lwis]: https://github.com/lwis
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@milaq]: https://github.com/milaq
[@milas]: https://github.com/milas
[@mKerix]: https://github.com/mKerix
[@nkgilley]: https://github.com/nkgilley
[@nvella]: https://github.com/nvella
[@open-homeautomation]: https://github.com/open-homeautomation
[@pavoni]: https://github.com/pavoni
[@persandstrom]: https://github.com/persandstrom
[@philhawthorne]: https://github.com/philhawthorne
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@robjohnson189]: https://github.com/robjohnson189
[@sam-io]: https://github.com/sam-io
[@simonszu]: https://github.com/simonszu
[@sytone]: https://github.com/sytone
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@technicalpickles]: https://github.com/technicalpickles
[@tinglis1]: https://github.com/tinglis1
[@turbokongen]: https://github.com/turbokongen
[@w1ll1am23]: https://github.com/w1ll1am23
[@wokar]: https://github.com/wokar

[温控]: /integrations/vera
[email]: /integrations/imap_email_content/
[Emoncms]: /integrations/emoncms
[filtering]: /integrations/logbook/
[InfluxDB]: /integrations/influxdb/
[ISY]: /integrations/isy994/
[KNX]: /integrations/传感器.knx/
[Kodi]: /integrations/kodi
[Modbus]: /integrations/modbus/
[Nest]: /integrations/nest/
[OpenALPR]: /integrations/openalpr_local/
[passwordless]: /integrations/http/
[Simplepush]: /integrations/simplepush
[Slack]: /integrations/slack
[SleepIQ]: /integrations/sleepiq/
[timeout]: /integrations/mqtt_room
[Vera]: /integrations/vera
[Wink]: /integrations/wink/
[plant]: /integrations/miflora
[MySensors]: /integrations/温控.mysensors/
[keyboard_remote]: /integrations/keyboard_remote
[X10]: /integrations/x10
