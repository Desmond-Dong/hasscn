---
title: '0.14: Steam, D-Link smart plugs and Neurio Energy 传感器'
description: '又过去了两周，也就意味着 0.14 发布时间到了！。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# 0.14: Steam, D-Link smart plugs and Neurio Energy 传感器

又过去了两周，也就意味着 0.14 发布时间到了！

<img src='/home-assistant/images/supported_brands/neurio.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/dlink.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/steam.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='90' />

  - 通知: 新增 [Command line platform][通知.command_line] ([@stefan-jonasson])
  - 传感器: 新增对 [Verisure] 鼠标探测器的支持 ([@turbokongen])
  - 核心: 实体现在可以声明其状态表示是否被认为是准确的 ([@balloob])
  - 传感器: 新增 [TCP][传感器.tcp] 平台 ([@flyte])
  - 二元传感器: 新增 [TCP][binary_sensor.tcp] 平台 ([@flyte])
  - 传感器: 新增 [Neurio energy 传感器] 支持 ([@infamy])
  - 二元传感器: 新增 [nx584] 支持 ([@kk7ds])
  - 改进并澄清了 CI 测试流程 ([@sdague])
  - 自动化: 状态 [触发器] 和 [条件] 现在支持可选 `for` 参数，仅在状态持续一段时间未变化时触发 ([@pavoni], [@stefan-jonasson])
  - 传感器: 新增 [Nest] 天气数据 ([@w1ll1am23])
  - 设备 Tracker: 新增 [Ubiquiti Unifi] 支持 ([@kk7ds])
  - 二元传感器: 新增 [MySensors] 支持 ([@MartinHjelmare])
  - 二元传感器: 新增 [Bloomsky] 支持 ([@balloob])
  - 二元传感器: 新增 [Z-Wave] 支持 ([@tpatja])
  - 开关: 新增 [D-Link smart plugs] 支持 ([@LinuxChristian])
  - 脚本: 新增切换支持 ([@Andythigpen])
  - 灯光: 新增 [Wemo] 支持 ([@jaharkes])
  - 卷帘门: 新增 Command line 平台 ([@t30])
  - 传感器: 新增 [Steam] 支持 ([@GreenTurtwig])
  - 二元传感器: 新增 [Wink] 支持 ([@w1ll1am23])
  - 演示示例已更新 ([@kfgoode])
  - 前端: 为摄像头新增 UI ([@balloob])

<p class='img'>
  <img src='/home-assistant/images/blog/2016-02-release-14/screenshot-webcam.png'>
  摄像头画面现在直接嵌入在前端中。
</p>

### 向后不兼容的变更
  - 组件: Simple 报警已移除，但仍可在 cookbook 中使用。
  - 脚本: 对已开启的 [脚本] 再次执行开启操作时，现在不会执行任何操作，不再跳过当前延迟。
  - Wemo 开关现在必须通过主 [Wemo component] 进行设置。
  - [开关][开关.cmd]、[传感器][传感器.cmd] 和 [binary_sensor][binary_sensor.cmd] 的 Command line 平台已重命名为 `command_line`。
  - rfxtrx 传感器实体 ID 将发生一次性调整，以迁移到稳定格式。详情请参见 [the docs][传感器.rfxtrx]。

[传感器.rfxtrx]: /integrations/rfxtrx#传感器
[通知.command_line]: /integrations/通知.command_line/
[Verisure]: /integrations/verisure
[binary_sensor.tcp]: /integrations/tcp#binary-传感器
[传感器.tcp]: /integrations/tcp#传感器
[Neurio energy 传感器]: /integrations/neurio_energy
[nx584]: /integrations/nx584#binary-传感器
[触发器]: /getting-started/自动化-触发器/#状态-触发器
[条件]: /getting-started/自动化-条件/#状态-条件
[Nest]: /integrations/nest#传感器
[Ubiquiti Unifi]: /integrations/unifi
[MySensors]: /integrations/binary_sensor.mysensors/
[Bloomsky]: /integrations/bloomsky#binary-传感器
[Z-Wave]: /integrations/zwave
[D-Link smart plugs]: /integrations/dlink
[Wemo]: /integrations/wemo
[Steam]: /integrations/steam_online
[Wink]: /integrations/wink#binary-传感器
[脚本]: /integrations/脚本/
[Wemo component]: /integrations/wemo/
[开关.cmd]: /integrations/开关.command_line/
[传感器.cmd]: /integrations/传感器.command_line/
[binary_sensor.cmd]: /integrations/command_line

[@stefan-jonasson]: https://github.com/stefan-jonasson
[@turbokongen]: https://github.com/turbokongen
[@balloob]: https://github.com/balloob
[@flyte]: https://github.com/flyte
[@infamy]: https://github.com/infamy
[@kk7ds]: https://github.com/kk7ds
[@sdague]: https://github.com/sdague
[@pavoni]: https://github.com/pavoni
[@w1ll1am23]: https://github.com/w1ll1am23
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@tpatja]: https://github.com/tpatja
[@LinuxChristian]: https://github.com/LinuxChristian
[@Andythigpen]: https://github.com/Andythigpen
[@jaharkes]: https://github.com/jaharkes
[@t30]: https://github.com/t30
[@GreenTurtwig]: https://github.com/GreenTurtwig
[@kfgoode]: https://github.com/kfgoode
