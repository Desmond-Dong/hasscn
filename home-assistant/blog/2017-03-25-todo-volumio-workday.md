# Home Assistant 0.41: Tado, Volumio, Workday, improved Plex

欢迎来到 0.41。在过去两周里，发生了很多事情，不只是代码层面，Home Assistant 的社区层面也同样热闹。[Paulus][@balloob] 接受了 [OpenSourceCraft] 的[采访][interview]，[Fabian][@fabaff] 在 [Chemnitzer Linux Tage][clt] 上举办了[工作坊][workshop]，而且我们现在已经是一个获奖的开源项目了（我会在另一篇博客文章里专门介绍这件事）。

## Plex

[@JesseWebDotCom] 对 [Plex][plex] 媒体播放器平台进行了大幅改进，包括更好的元数据支持、新的配置选项，以及更完善的控制能力和对不可控客户端的处理。

## 组件概览

[Components][components] 概览页面现在支持搜索和筛选功能，可以更快找到你需要的组件或平台。再次感谢 [@bdurrer] 的贡献。

## 更新日志

从 0.40 开始启用的新更新日志格式，会附上对应的 pull request 链接。发布说明不会覆盖所有改动，但我们认为这个补充能让你更容易查到每项变更的详细信息。

## 新平台与组件

* 新增 [Tado][tado] 温控设备支持 ([@wmalgadey])
* 新增 [Volumio][volumio] 媒体播放器 ([@jslove])
* 新增 [Workday][workday] 传感器 ([@BastianPoe])

## 不向后兼容的变更

* [Kodi notifier][kodi] 平台已迁移到 async，并与 Kodi 媒体播放器平台的配置保持一致 ([#6497])。
* [Music Player Daemon][mpd]（MPD）平台中的 `location` 已替换为 `name` ([#6553])。
* 事件装饰器已被移除 ([#6634])。
* [Emby 媒体播放器][emby] 平台已调整，以避免名称冲突 ([#6664])。
* 多处功率和能量单位已更新，这项变更主要影响 `switch` 平台 ([#6212])。
* 如果设置为 `auto`，[MQTT][MQTT] 将自动使用内置证书 ([#6707])。
* [Android IP Webcam][android] 的自动发现功能已移除 ([#6528])。
* 前端现在改用 [Shadow DOM][shadow]，这可能会影响你的自定义面板 ([#228](https://github.com/home-assistant/home-assistant-polymer/issues/228))。

## 如果你需要帮助

欢迎使用我们非常活跃的 [论坛][forum]，或者加入聊天频道 [discord][discord]。发布说明虽然也开放评论，但我们更推荐你使用前面的沟通渠道。谢谢。

## 反馈问题

如果你遇到了这次发布引入的问题，请到我们的 [问题追踪器][issue] 提交反馈，并确保填写问题模板中的所有字段。

<!--more-->

## All changes

* Bugfix android 摄像头 autodiscovery 设置 ([@pvizeli] - [#6510])
* Insteon lib ([@craigjmidwinter] - [#6505])
* 更新 to Pyunifi2.0 ([@finish06] - [#6490])
* Insteon lib ([@craigjmidwinter] - [#6505])
* Don't allow sending to invalid iOS targets ([@robbiet480] - [#6115])
* Bugfix rpi\_rf cleanup ([@pvizeli] - [#6513])
* Include LICENSE.md in tarball ([@bachp] - [#6514])
* Android webcam better 错误 handling / pump library 0.4 ([@pvizeli] - [#6518])
* Fix mysensors gateway windows 设置 ([@MartinHjelmare] - [#6500])
* 更新 前端 ([@balloob])
* Remove mint finance 传感器 ([@balloob] - [#6522])
* Append vera 设备 id to 实体 id - but not name. ([@pavoni] - [#6523])
* Force 更新 support for MQTT 传感器 ([@vrnagy] - [#6492])
* Wink 场景(shortcut) support ([@w1ll1am23] - [#6147])
* Add type 配置 in history\_stats ([@bokub] - [#6430])
* Discovery is a dict rather than an array. ([@pavoni] - [#6525])
* Fix colortemp conversion for osramlightify ([@amelchio] - [#6516])
* 更新 Kodi notifier to async ([@armills] - [#6497]) (Breaking Change)
* Fix mysensors gateway windows 设置 ([@MartinHjelmare] - [#6500])
* Fix colortemp conversion for osramlightify ([@amelchio] - [#6516])
* Remove mint finance 传感器 ([@balloob] - [#6522])
* Append vera 设备 id to 实体 id - but not name. ([@pavoni] - [#6523])
* Discovery is a dict rather than an array. ([@pavoni] - [#6525])
* 版本 bump to 0.41.0.dev0 ([@lwis])
* Simplify Android IP webcam discovery ([@balloob] - [#6528])
* Fix gen\_requirements\_all.py 脚本 for Windows. ([@siebert] - [#6547])
* Fix wake\_on\_lan ping with None as host ([@iamtpage] - [#6532])
* Be able to select MQTT:tls\_version for Python ([@dennisdegreef] - [#6442])
* ZWave 二元sensor tests ([@armills] - [#6555])
* Refactor zwave discovery to 实体 schema ([@armills] - [#6445])
* Revert "Refactor zwave discovery to 实体 schema (#6445)" ([@balloob] - [#6564])
* Upgraded blinkpy 版本, increased Throttle time for 摄像头 ([@fronzbot] - [#6561])
* Don't start the push updater if the Apple TV is 'off' ([@jnewland] - [#6552])
* Bump voc 版本 (fixes heater bug) ([@molobrakos])
* Remove dispatcher 摄像头 ([@pvizeli] - [#6579])
* Fix for the case of zwave value used in several 设备. ([@andrey-git] - [#6577])
* Fix hydroquebec ([@titilambert] - [#6574])
* 升级 async\_timeout to 1.2.0 ([@fabaff] - [#6590])
* 升级 pyasn1 to 0.2.3 ([@fabaff] - [#6588])
* 升级 sqlalchemy to 1.1.6 ([@fabaff] - [#6591])
* 升级 psutil to 5.2.0 ([@fabaff] - [#6585])
* 升级 Sphinx to 1.5.3 ([@fabaff] - [#6587])
* 更新 pyecobee 版本 to 0.0.7 ([@dale3h] - [#6593])
* 更新 SMA solar 传感器 to work with the new add\_devices callback ([@kellerza] - [#6602])
* Fix link ([@fabaff] - [#6612])
* 升级 py-cpuinfo to 0.2.7 ([@fabaff] - [#6610])
* 升级 googlemaps to 2.4.6 ([@fabaff] - [#6611])
* 错误 handling when connection refused ([@molobrakos] - [#6614])
* Prevent 实体 running multiple updates simultaneously ([@pvizeli] - [#6511])
* Add configurable timeout option to 通知/smtp ([@hawk259] - [#6609])
* Define db for SHOW DIAGNOSTICS query since some 用户 will not have a… ([@tflack] - [#6566])
* 遮盖 myq fix 更新 pymyq ([@arraylabs] - [#6595])
* 更新 mpd.py ([@yeralin] - [#6553]) (Breaking Change)
* 升级 to dsmr\_parser 0.8, supporting protocol 3 and 5. ([@aequitas] - [#6600])
* Add "Refactor zwave discovery to 实体 schema" ([@balloob] - [#6565])
* Tests for ZWave 温控 ([@armills] - [#6629])
* Correctly flag Kodi media types ([@armills] - [#6628])
* Use sqlite's WAL mode to avoid `database is locked` 错误 ([@n8henrie] - [#6519])
* Remove event decorators ([@balloob] - [#6634]) (Breaking Change)
* Deprecate event forwarding ([@balloob])
* 升级 aiohttp to 1.3.4 ([@pvizeli] - [#6643])
* Kodi extra 属性 for tvshow and music media ([@mvillarejo] - [#6622])
* Add ZWave 遮盖 tests ([@armills] - [#6648])
* Kodi: Fix episode media type classification ([@armills] - [#6645])
* Move LIFX to aiolifx for driving the bulbs ([@amelchio] - [#6584])
* Fix #6534 ([@deisi] - [#6598])
* self.loop.create\_task -> self.add\_job ([@balloob] - [#6632])
* Bugfix RFLINK remove group ([@pvizeli] - [#6580])
* 版本 bump to 0.40.1 ([@balloob])
* Fix wake\_on\_lan ping with None as host ([@iamtpage] - [#6532])
* Don't start the push updater if the Apple TV is 'off' ([@jnewland] - [#6552])
* Fix for the case of zwave value used in several 设备. ([@andrey-git] - [#6577])
* Fix hydroquebec ([@titilambert] - [#6574])
* 更新 pyecobee 版本 to 0.0.7 ([@dale3h] - [#6593])
* 更新 SMA solar 传感器 to work with the new add\_devices callback ([@kellerza] - [#6602])
* Since knx\_2\_float can't handle 0, bypass converting 0 value from knx to float ([@goofz] - [#6626])
* Bugfix RFLINK remove group ([@pvizeli] - [#6580])
* Added workday 传感器 ([@BastianPoe] - [#6599])
* Add test for Z-Wave 开关 ([@turbokongen] - [#6619])
* 升级 python-digitalocean to 1.11 ([@fabaff] - [#6653])
* Add Zwave 传感器 test ([@turbokongen] - [#6640])
* round output values ([@joe248] - [#6657])
* Support for non-clients, NVidia shield, dynamic grouping, extra metad ([@JesseWebDotCom] - [#6054])
* 升级 astral to 1.4 ([@fabaff] - [#6332])
* 升级 aiohttp to 1.3.5 ([@fabaff] - [#6660])
* Check if droplet exists ([@fabaff] - [#6663])
* Corrected help text for refresh\_node ([@sebk-666] - [#6659])
* Add configurable timeout option to 摄像头.synology ([@hawk259] - [#6655])
* Pump Android ip webcam to 0.6 ([@pvizeli] - [#6665])
* add latitude and longitude 配置 to darksky 传感器 ([@RickyTaterSalad] - [#6191])
* Refactor Neurio to add Daily Power 传感器 ([@mezz64] - [#6662])
* Added support for multiple efergy 传感器 in the same household. ([@miniconfig] - [#6630])
* Add new 媒体播放器 platform: Volumio Media Player ([@jslove] - [#6556])
* Phone book lookup support for Fritz!Box call monitor ([@DavidMStraub] - [#6474])
* 更新 Emby component to async ([@mezz64] - [#6664])
* Fix hass 脚本 execution on Windows (#4977). ([@matrixx567] - [#6601])
* Fixed Show All Controls feature ([@JesseWebDotCom])
* 更新 Torque component to match recent API. ([@tylercrumpton] - [#6671])
* Rflink: added support for 灯光 with 切换 type ([@martinfrancois] - [#6521])
* 升级 distro to 1.0.3 ([@fabaff] - [#6693])
* Fix longitude ([@mezz64] - [#6697])
* Bump PyChromecast to 0.8.1 ([@balloob] - [#6702])
* Kodi use websocket loop task 创建 by library ([@armills] - [#6703])
* Fix Kodi when websocket is disabled ([@armills] - [#6706])
* Revise power and energy units and property names. ([@pavoni] - [#6212]) (Breaking Change)
* automatically use bundled certificate it set to auto ([@printzlau] - [#6707]) (Breaking Change)
* 更新 前端 ([@balloob])
* Add zwave 灯光 tests ([@armills] - [#6710])
* restore\_state: do not crash if domain not defined ([@balloob] - [#6714])
* Fix for issue: luci returns 403 invalid token when rebooted #6715 ([@fbradyirl] - [#6717])
* Don't warn if octoprint completion is null ([@jawilson] - [#6719])
* ZWave 传感器 tests ([@armills] - [#6721])
* ZWave 开关 tests ([@armills] - [#6722])
* 更新 前端 ([@balloob])
* Fix LIFX unregister races ([@amelchio] - [#6723])
* Do not 日志 警告 on rest\_command if no 错误 ([@balloob] - [#6713])
* 摄像头.zoneminder: Show recording 状态 ([@mnoorenberghe] - [#6686])
* ZWave 门锁 Tests ([@armills] - [#6730])
* Tado 温控 设备 ([@wmalgadey] - [#6572])
* 版本 bump to 0.40.2 ([@balloob])
* Bump PyChromecast to 0.8.1 ([@balloob] - [#6702])
* Constrain 核心 dependencies to 核心 versions ([@balloob] - [#6738])
* 更新 constraints ([@balloob])
* Adds Support for Lutron Caseta 设备. ([@gurumitts] - [#6631])
* Add 传感器 for Lyft time and price (based on Uber 传感器) ([@drkp] - [#6711])
* Add zwave per-node 实体. ([@andrey-git] - [#6690])
* 版本 bump to 0.41 ([@balloob])

[#6054]: https://github.com/home-assistant/home-assistant/pull/6054

[#6115]: https://github.com/home-assistant/home-assistant/pull/6115

[#6147]: https://github.com/home-assistant/home-assistant/pull/6147

[#6191]: https://github.com/home-assistant/home-assistant/pull/6191

[#6212]: https://github.com/home-assistant/home-assistant/pull/6212

[#6332]: https://github.com/home-assistant/home-assistant/pull/6332

[#6430]: https://github.com/home-assistant/home-assistant/pull/6430

[#6442]: https://github.com/home-assistant/home-assistant/pull/6442

[#6445]: https://github.com/home-assistant/home-assistant/pull/6445

[#6474]: https://github.com/home-assistant/home-assistant/pull/6474

[#6490]: https://github.com/home-assistant/home-assistant/pull/6490

[#6492]: https://github.com/home-assistant/home-assistant/pull/6492

[#6497]: https://github.com/home-assistant/home-assistant/pull/6497

[#6500]: https://github.com/home-assistant/home-assistant/pull/6500

[#6505]: https://github.com/home-assistant/home-assistant/pull/6505

[#6510]: https://github.com/home-assistant/home-assistant/pull/6510

[#6511]: https://github.com/home-assistant/home-assistant/pull/6511

[#6513]: https://github.com/home-assistant/home-assistant/pull/6513

[#6514]: https://github.com/home-assistant/home-assistant/pull/6514

[#6516]: https://github.com/home-assistant/home-assistant/pull/6516

[#6518]: https://github.com/home-assistant/home-assistant/pull/6518

[#6519]: https://github.com/home-assistant/home-assistant/pull/6519

[#6521]: https://github.com/home-assistant/home-assistant/pull/6521

[#6522]: https://github.com/home-assistant/home-assistant/pull/6522

[#6523]: https://github.com/home-assistant/home-assistant/pull/6523

[#6525]: https://github.com/home-assistant/home-assistant/pull/6525

[#6528]: https://github.com/home-assistant/home-assistant/pull/6528

[#6532]: https://github.com/home-assistant/home-assistant/pull/6532

[#6547]: https://github.com/home-assistant/home-assistant/pull/6547

[#6552]: https://github.com/home-assistant/home-assistant/pull/6552

[#6553]: https://github.com/home-assistant/home-assistant/pull/6553

[#6555]: https://github.com/home-assistant/home-assistant/pull/6555

[#6556]: https://github.com/home-assistant/home-assistant/pull/6556

[#6561]: https://github.com/home-assistant/home-assistant/pull/6561

[#6564]: https://github.com/home-assistant/home-assistant/pull/6564

[#6565]: https://github.com/home-assistant/home-assistant/pull/6565

[#6566]: https://github.com/home-assistant/home-assistant/pull/6566

[#6572]: https://github.com/home-assistant/home-assistant/pull/6572

[#6574]: https://github.com/home-assistant/home-assistant/pull/6574

[#6577]: https://github.com/home-assistant/home-assistant/pull/6577

[#6579]: https://github.com/home-assistant/home-assistant/pull/6579

[#6580]: https://github.com/home-assistant/home-assistant/pull/6580

[#6584]: https://github.com/home-assistant/home-assistant/pull/6584

[#6585]: https://github.com/home-assistant/home-assistant/pull/6585

[#6587]: https://github.com/home-assistant/home-assistant/pull/6587

[#6588]: https://github.com/home-assistant/home-assistant/pull/6588

[#6590]: https://github.com/home-assistant/home-assistant/pull/6590

[#6591]: https://github.com/home-assistant/home-assistant/pull/6591

[#6593]: https://github.com/home-assistant/home-assistant/pull/6593

[#6595]: https://github.com/home-assistant/home-assistant/pull/6595

[#6598]: https://github.com/home-assistant/home-assistant/pull/6598

[#6599]: https://github.com/home-assistant/home-assistant/pull/6599

[#6600]: https://github.com/home-assistant/home-assistant/pull/6600

[#6601]: https://github.com/home-assistant/home-assistant/pull/6601

[#6602]: https://github.com/home-assistant/home-assistant/pull/6602

[#6609]: https://github.com/home-assistant/home-assistant/pull/6609

[#6610]: https://github.com/home-assistant/home-assistant/pull/6610

[#6611]: https://github.com/home-assistant/home-assistant/pull/6611

[#6612]: https://github.com/home-assistant/home-assistant/pull/6612

[#6614]: https://github.com/home-assistant/home-assistant/pull/6614

[#6619]: https://github.com/home-assistant/home-assistant/pull/6619

[#6622]: https://github.com/home-assistant/home-assistant/pull/6622

[#6626]: https://github.com/home-assistant/home-assistant/pull/6626

[#6628]: https://github.com/home-assistant/home-assistant/pull/6628

[#6629]: https://github.com/home-assistant/home-assistant/pull/6629

[#6630]: https://github.com/home-assistant/home-assistant/pull/6630

[#6631]: https://github.com/home-assistant/home-assistant/pull/6631

[#6632]: https://github.com/home-assistant/home-assistant/pull/6632

[#6634]: https://github.com/home-assistant/home-assistant/pull/6634

[#6640]: https://github.com/home-assistant/home-assistant/pull/6640

[#6643]: https://github.com/home-assistant/home-assistant/pull/6643

[#6645]: https://github.com/home-assistant/home-assistant/pull/6645

[#6648]: https://github.com/home-assistant/home-assistant/pull/6648

[#6653]: https://github.com/home-assistant/home-assistant/pull/6653

[#6655]: https://github.com/home-assistant/home-assistant/pull/6655

[#6657]: https://github.com/home-assistant/home-assistant/pull/6657

[#6659]: https://github.com/home-assistant/home-assistant/pull/6659

[#6660]: https://github.com/home-assistant/home-assistant/pull/6660

[#6662]: https://github.com/home-assistant/home-assistant/pull/6662

[#6663]: https://github.com/home-assistant/home-assistant/pull/6663

[#6664]: https://github.com/home-assistant/home-assistant/pull/6664

[#6665]: https://github.com/home-assistant/home-assistant/pull/6665

[#6671]: https://github.com/home-assistant/home-assistant/pull/6671

[#6686]: https://github.com/home-assistant/home-assistant/pull/6686

[#6690]: https://github.com/home-assistant/home-assistant/pull/6690

[#6693]: https://github.com/home-assistant/home-assistant/pull/6693

[#6697]: https://github.com/home-assistant/home-assistant/pull/6697

[#6702]: https://github.com/home-assistant/home-assistant/pull/6702

[#6703]: https://github.com/home-assistant/home-assistant/pull/6703

[#6706]: https://github.com/home-assistant/home-assistant/pull/6706

[#6707]: https://github.com/home-assistant/home-assistant/pull/6707

[#6710]: https://github.com/home-assistant/home-assistant/pull/6710

[#6711]: https://github.com/home-assistant/home-assistant/pull/6711

[#6713]: https://github.com/home-assistant/home-assistant/pull/6713

[#6714]: https://github.com/home-assistant/home-assistant/pull/6714

[#6717]: https://github.com/home-assistant/home-assistant/pull/6717

[#6719]: https://github.com/home-assistant/home-assistant/pull/6719

[#6721]: https://github.com/home-assistant/home-assistant/pull/6721

[#6722]: https://github.com/home-assistant/home-assistant/pull/6722

[#6723]: https://github.com/home-assistant/home-assistant/pull/6723

[#6730]: https://github.com/home-assistant/home-assistant/pull/6730

[#6738]: https://github.com/home-assistant/home-assistant/pull/6738

[#6664]: https://github.com/home-assistant/home-assistant/pull/6664

[@BastianPoe]: https://github.com/BastianPoe

[@DavidMStraub]: https://github.com/DavidMStraub

[@JesseWebDotCom]: https://github.com/JesseWebDotCom

[@MartinHjelmare]: https://github.com/MartinHjelmare

[@RickyTaterSalad]: https://github.com/RickyTaterSalad

[@aequitas]: https://github.com/aequitas

[@amelchio]: https://github.com/amelchio

[@andrey-git]: https://github.com/andrey-git

[@armills]: https://github.com/armills

[@arraylabs]: https://github.com/arraylabs

[@bachp]: https://github.com/bachp

[@balloob]: https://github.com/balloob

[@bokub]: https://github.com/bokub

[@dale3h]: https://github.com/dale3h

[@deisi]: https://github.com/deisi

[@dennisdegreef]: https://github.com/dennisdegreef

[@drkp]: https://github.com/drkp

[@fabaff]: https://github.com/fabaff

[@fbradyirl]: https://github.com/fbradyirl

[@finish06]: https://github.com/finish06

[@fronzbot]: https://github.com/fronzbot

[@goofz]: https://github.com/goofz

[@gurumitts]: https://github.com/gurumitts

[@hawk259]: https://github.com/hawk259

[@iamtpage]: https://github.com/iamtpage

[@jawilson]: https://github.com/jawilson

[@jnewland]: https://github.com/jnewland

[@joe248]: https://github.com/joe248

[@jslove]: https://github.com/jslove

[@kellerza]: https://github.com/kellerza

[@lwis]: https://github.com/lwis

[@martinfrancois]: https://github.com/martinfrancois

[@matrixx567]: https://github.com/matrixx567

[@mezz64]: https://github.com/mezz64

[@miniconfig]: https://github.com/miniconfig

[@mnoorenberghe]: https://github.com/mnoorenberghe

[@molobrakos]: https://github.com/molobrakos

[@mvillarejo]: https://github.com/mvillarejo

[@n8henrie]: https://github.com/n8henrie

[@pavoni]: https://github.com/pavoni

[@printzlau]: https://github.com/printzlau

[@pvizeli]: https://github.com/pvizeli

[@robbiet480]: https://github.com/robbiet480

[@sebk-666]: https://github.com/sebk-666

[@siebert]: https://github.com/siebert

[@tflack]: https://github.com/tflack

[@titilambert]: https://github.com/titilambert

[@turbokongen]: https://github.com/turbokongen

[@tylercrumpton]: https://github.com/tylercrumpton

[@vrnagy]: https://github.com/vrnagy

[@w1ll1am23]: https://github.com/w1ll1am23

[@craigjmidwinter]: https://github.com/craigjmidwinter

[@wmalgadey]: https://github.com/wmalgadey

[@yeralin]: https://github.com/yeralin

[components]: /integrations/index.md

[kodi]: /integrations/kodi

[mpd]: /integrations/mpd

[emby]: /integrations/emby

[MQTT]: /docs/MQTT/

[plex]: /integrations/plex#media-player

[tado]: /integrations/tado

[volumio]: /integrations/volumio/

[workday]: /integrations/workday

[android]: /integrations/android_ip_webcam/

[shadow]: https://www.w3.org/TR/shadow-dom/

[forum]: https://community.home-assistant.io/

[issue]: https://github.com/home-assistant/home-assistant/issues

[discord]: https://discord.gg/c5DvZ4e

[@bdurrer]: https://github.com/bdurrer

[interview]: /博客/2017/03/23/opensourcecraft-interview-with-founder-paulus-schoutsen/

[OpenSourceCraft]: http://codepop.com/open-sourcecraft

[clt]: https://chemnitzer.linux-tage.de/2017/en/

[workshop]: https://github.com/home-assistant/home-assistant-assets/tree/master/german/2017-clt-workshop
