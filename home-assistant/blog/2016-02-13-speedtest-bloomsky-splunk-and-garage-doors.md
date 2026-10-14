# 0.13: Speedtest.net, Bloomsky, Splunk and Garage Doors

0.13 的重点是测试覆盖率，特别感谢 [@rmkraus] 在这方面付出的努力。很高兴宣布，我们在核心和重要组件上达到了 90% 的测试覆盖率。这是项目的一个重要里程碑。

<p class='img'>
  <img src='/home-assistant/images/blog/2016-02-release-13/input_select__input_boolean__weblink.png'>
  新增的 [input_select] 和 weblink 组件示例。
</p>

我们不仅大幅提升了测试覆盖率，还吸引了许多新开发者贡献了各种组件和平台：

<img src='/home-assistant/images/supported_brands/speedtest.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='70' /><img src='/home-assistant/images/supported_brands/apcupsd.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/splunk.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/bloomsky.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/ubiquiti.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/networx.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/samsung.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

* 核心: 新增可重启 Home Assistant 的服务 ([@rmkraus])
* 核心: 允许设备上报为不可用状态 ([@MartinHjelmare])
* 核心: 允许在平台内和配置中覆盖轮询间隔 ([@balloob])
* 前端: 新增 [default view] 支持，用于替代显示全部视图 ([@balloob])
* 组件: 新增 [apcupsd] 组件 ([@flyte])
* 组件: 新增将日志数据发送到 [Splunk] 的组件 ([@miniconfig])
* 组件: 新增 [garage door] 组件，包含 [Wink] 支持 ([@xrolfex])
* 组件: 新增 [input\_select][input_select] 组件 ([@balloob])
* 组件: 新增 [proximity] 组件，用于追踪离某个位置最近的人 ([@nickwaring], [@Bart274] )
* 组件: 新增 [Bloomsky 天气 Station] 支持 ([@haraldnagel])
* 组件: 新增将统计数据推送到 [graphite] 的支持 ([@kk7ds])
* 组件: 新增 [SCSGate] 设备支持 ([@flavio])
* 组件: 新增 weblink 组件，可链接到其他页面 ([@MagnusKnutas])
* 组件: 新增对 Ubiquiti mFI [传感器][mfi.传感器] 和 [switchable 设备][mfi.开关] 的支持 ([@kk7ds])
* 报警控制面板: 新增 [Caddx/GE/Interlogix NetworX][nx584] 支持 ([@kk7ds])
* 摄像头: [MJPEG] 摄像头现在显示真实视频流，而非 2fps 流 ([@stjohnjohnson])
* 摄像头: 新增 [Unifi video 摄像头][unifi] 支持 ([@kk7ds])
* 设备 Tracker: [Aruba] 平台现改用 SSH，而非 telnet ([@carlosmgr])
* 历史: 为温控器显示正确的图表 ([@sdague])
* 灯光: 新增 [MySensors] 支持 ([@MartinHjelmare])
* 门锁: 新增 [Verisure] 支持 ([@turbokongen])
* 媒体播放器: 新增 [Samsung TV] 支持 ([@stefan-jonasson])
* 媒体播放器: 新增 [Snapcast] 支持 ([@happyleavesaoc])
* MQTT: 允许在 [publish 服务][MQTT-publish] 中使用模板 ([@flyte])
* 通知: 新增 [REST] 支持 ([@Theb-1])
* 传感器: 新增 [Speedtest.net] 支持 ([@nkgilley])
* 开关: 新增 [模板] 平台 ([@pavoni])
* 温控器: 新增对美国地区 [Honeywell] 的支持 ([@kk7ds])
* Z-Wave: 允许 [configuring polling][zwave-polling] 并 [support 场景][zwave-场景] ([@lukas-hetzenecker])
* 由 [@persandstrom]、[@fabaff]、[@balloob]、[@pavoni]、[@philipbl]、[@MartinHjelmare]、[@rmkraus]、[@molobrakos]、[@lukas-hetzenecker]、[@TangoAlpha]、[@deisi]、[@Danielhiversen]、[@roqeer]、[@jaharkes] 带来多项 Bug 修复与改进

[@rmkraus]: https://github.com/rmkraus/

[@MartinHjelmare]: https://github.com/MartinHjelmare/

[@balloob]: https://github.com/balloob/

[@flyte]: https://github.com/flyte/

[@miniconfig]: https://github.com/miniconfig/

[@xrolfex]: https://github.com/xrolfex/

[@nickwaring]: https://github.com/nickwaring/

[@Bart274]: https://github.com/Bart274/

[@haraldnagel]: https://github.com/haraldnagel/

[@kk7ds]: https://github.com/kk7ds/

[@flavio]: https://github.com/flavio/

[@MagnusKnutas]: https://github.com/MagnusKnutas/

[@stjohnjohnson]: https://github.com/stjohnjohnson/

[@carlosmgr]: https://github.com/carlosmgr/

[@sdague]: https://github.com/sdague/

[@turbokongen]: https://github.com/turbokongen/

[@stefan-jonasson]: https://github.com/stefan-jonasson/

[@happyleavesaoc]: https://github.com/happyleavesaoc/

[@Theb-1]: https://github.com/Theb-1/

[@nkgilley]: https://github.com/nkgilley/

[@pavoni]: https://github.com/pavoni/

[@lukas-hetzenecker]: https://github.com/lukas-hetzenecker/

[@persandstrom]: https://github.com/persandstrom/

[@fabaff]: https://github.com/fabaff/

[@philipbl]: https://github.com/philipbl/

[@molobrakos]: https://github.com/molobrakos/

[@TangoAlpha]: https://github.com/TangoAlpha/

[@deisi]: https://github.com/deisi/

[@Danielhiversen]: https://github.com/Danielhiversen/

[@roqeer]: https://github.com/roqeer/

[@jaharkes]: https://github.com/jaharkes/

[default view]: /integrations/group/

[apcupsd]: /integrations/apcupsd/

[Splunk]: /integrations/splunk/

[garage door]: /integrations/遮盖/

[Wink]: /integrations/wink/#遮盖

[input_select]: /integrations/input_select/

[proximity]: /integrations/proximity/

[Bloomsky 天气 Station]: /integrations/bloomsky/

[graphite]: /integrations/graphite/

[SCSGate]: /integrations/scsgate/

[mfi.开关]: /integrations/mfi#开关

[mfi.传感器]: /integrations/mfi#传感器

[nx584]: /integrations/nx584

[MJPEG]: /integrations/mjpeg

[unifi]: /integrations/uvc

[Aruba]: /integrations/aruba

[History]: /integrations/history/

[MySensors]: /integrations/灯光.mysensors/

[Verisure]: /integrations/verisure

[Speedtest.net]: /integrations/speedtestdotnet

[Samsung TV]: /integrations/samsungtv

[Snapcast]: /integrations/snapcast

[MQTT-publish]: /integrations/MQTT/#publish-服务

[REST]: /integrations/通知.rest/

[模板]: /integrations/模板/#开关

[Honeywell]: /integrations/honeywell/

[zwave-polling]: /integrations/zwave/#配置

[zwave-场景]: /integrations/zwave/#events
