---
title: 'Home Assistant 0.42: Eddystone Beacons, Lockitron 门锁 and Total Connect
  alarm systems'
description: Tons of bug fixes, performance increasements and some cool new 集成.
---

<a href='/home-assistant/integrations/#added_in_current_version'><img src='/home-assistant/images/blog/2017-04-0.42/social.png' style='border: 0;box-shadow: none;'></a>

Home Assistant 0.42 来了。本次发布主要专注于打磨系统并修复大量错误。我们还升级到了最新版本的 HTTP 库，这应该会在文件和 API 的服务性能上带来明显提升。

在社交媒体方面，我们的 [Facebook 页面][hass-fb] 已经突破了 1000 个赞！另外，YouTube 频道 diyAutomate 也发布了许多很棒的 Home Assistant 入门视频，[快去看看吧！][diyAutomate]

我们也想借这个机会感谢 Austin Andrews，也就是 [Templarian]，感谢他带来的 [Material Design Icons][mli]。这也是 Home Assistant 如此美观的重要原因之一 🤗。

[hass-fb]: https://www.facebook.com/homeassistantio
[diyAutomate]: https://www.youtube.com/c/diyautomate
[mli]: https://pictogrammers.com/library/mdi/
[Templarian]: https://github.com/templarian

## 新集成

- Lockitron 门锁 ([@aarya123] - [#6805])
- Met Office 天气和传感器组件 ([@jacobtomlinson] - [#6742])
- Total Connect 报警系统 ([@craigjmidwinter] - [#6887])
- Eddystone Beacon 温度传感器 ([@citruz] - [#6789])
- CrimeReports.com 集成，可显示美国某个位置周边的犯罪信息 ([@happyleavesaoc] - [#6966])
- Ring 门铃进一步完成集成，新增二元传感器支持 ([@tchellomello] - [#6520])

<!--more-->
## 不向后兼容的变更

- 我们之前错误地把名为 `default_view` 的分组当成默认视图。请确保在这些分组的配置中加入 `view: true`。[#251 (前端)](https://github.com/home-assistant/home-assistant-polymer/pull/251)
- 上一个发布带来了重构后的 LIFX 平台。我们在发布后才发现，这个版本无法在 Windows 上运行。因此我们把旧版 LIFX 实现以 `lifx_legacy` 的形式重新加入了回来。
- 我们为数据库新增了索引，以加快历史视图的速度。首次启动可能会持续几分钟。迁移进行时请不要关闭系统。[#6688]
- Z-Wave 遮盖的变通方案已移除，请改用设备配置。[#6832]

```yaml
zwave:
  device_config:
    cover.my_cover:
      invert_openclose_buttons: true
```

- 如果你为 automation、input_boolean、input_slider 或 input_select 设置了初始状态，它将覆盖之前恢复的状态。[#6911] [#6924]
- 为统一参数，Z-Wave 重命名节点服务的参数已从 `entity_id` 改为 `node_id`。[#6938]
- 自动化现在会在 Home Assistant 完成启动后初始化。这意味着监听 `homeassistant_start` 事件的方式已被弃用，请改用新的 `homeassistant` 自动化平台。[#6936]

```yaml
automation:
  trigger:
    platform: homeassistant
    event: start
  action:
    service: light.turn_on
```

- Ring 组件已将认证信息迁移到独立的 `ring` 组件中。[#6520]

```yaml
ring:
    username: !secret ring_username
    password: !secret ring_password

binary_sensor:
  - platform: ring
    monitored_conditions:
      - ding
      - motion

sensor:
  - platform: ring
    monitored_conditions:
      - battery
      - last_activity
      - last_ding
      - last_motion
      - volume
```

## 如果你需要帮助
欢迎使用我们非常活跃的 [论坛][forum]，或者加入聊天频道 [discord][discord]。发布说明虽然也开放评论，但我们更推荐你使用前面的沟通渠道。谢谢。

## 反馈问题
如果你遇到了这次发布引入的问题，请到我们的 [问题追踪器][issue] 提交反馈，并确保填写问题模板中的所有字段。

## 发布 0.42.1 - April 9

- 升级 aiohttp to 2.0.6
- Make discovery not cause startup 警告

## 发布 0.42.1 - April 9

 - Revert 升级 to aiothttp 2.0.6

## 发布 0.42.3 - April 11

- Fix Synology 摄像头 content type ([@balloob] - [#7010])
- Fix two more instances of JSON parsing synology ([@balloob] - [#7014])
- Bump pyalarmdotcom to support new 版本 of aiohttp ([@Xorso] - [#7021])
- Fix US 状态 check (fixes #7015) ([@fabaff] - [#7017])
- Plug file leak on LIFX unregister ([@amelchio] - [#7031])
- Bugfix wait on start event ([@pvizeli] - [#7013])

## 发布 0.42.4 - April 17

- 版本 bump to 0.42.4 ([@balloob])
- Fix mysensors callback ([@MartinHjelmare] - [#7057])
- 升级 aiohttp to 2.0.7 ([@fabaff] - [#7106])
- Make 版本 number optional and a string to fix identify issue introduced in iOS 1.0.1 ([@robbiet480] - [#7141])
- Fix for zwave RGB setting ([@armills] - [#7137])

## All changes

- Flux led 更新 lib ([@danielhiversen] - [#6763])
- Adding expire_after to MQTT 传感器 to expire outdated values ([@micw] - [#6708])
- New indexes for 状态 and recording_runs tables ([@m00dawg] - [#6688]) (breaking change)
- Fix flaky 模板 test ([@armills] - [#6768])
- Repair zwave 传感器 coverage ([@armills] - [#6764])
- 版本 bump to 0.42.0.dev0 ([@balloob])
- current temp could be none ([@turbokongen] - [#6759])
- Typing 错误 and 更新 test ([@turbokongen] - [#6757])
- Wink Aros Fixes ([@geekofweek] - [#6726])
- 升级 pydroid-ipcam to 0.7 ([@fabaff] - [#6772])
- 升级 psutil to 5.2.1 ([@fabaff] - [#6771])
- 升级 sleekxmpp to 1.3.2 ([@fabaff] - [#6773])
- Tests for zwave workaround detection ([@armills] - [#6761])
- Bugfix 自动化 fire on bootstrap ([@pvizeli] - [#6770])
- Homematic Fixes ([@danielperna84] - [#6769])
- Fix wink 警报器 ([@w1ll1am23] - [#6775])
- Fix bridge-led support in limitlessled.py ([@quadportnick] - [#6776])
- Wrong info in discovery schema ([@turbokongen] - [#6779])
- 开关.tplink: 升级 to the newest upstream 发布 which adds support for plugs using the newer communication protocol ([@rytilahti] - [#6790])
- Add 开关 to MQTT discovery ([@fabaff] - [#6733])
- 更新 docstrings ([@fabaff] - [#6795])
- Add optional unit of measurement ([@fabaff] - [#6796])
- 升级 zeroconf to 0.19.0 ([@fabaff] - [#6792])
- 升级 pysnmp to 4.3.5 ([@fabaff] - [#6793])
- Platform for Munich public transport departure times ([@DavidMStraub] - [#6704])
- Use string formatting and remove already global disabled pylint issue ([@fabaff] - [#6801])
- Fix typo and 更新 name ([@fabaff] - [#6809])
- 升级 matrix-client to 0.0.6 ([@fabaff] - [#6808])
- Make get_snmp_data more robust ([@tantecky] - [#6798])
- Add NVR support to Hikvision 二元sensor ([@mezz64] - [#6807])
- 更新 Insight parameters using the subscription data. ([@pavoni] - [#6782])
- fix WOL in Docker/jail ([@goto100] - [#6810])
- Allow to monitor Windows hosts ([@fabaff] - [#6803])
- 灯光/hue: use 设备 class for on/off 设备 like the osram lightify plug ([@jannau] - [#6817])
- [开关.wemo] Fix mW to kW conversion. ([@lwis] - [#6826])
- yeelight: adjust supported features on 更新() ([@rytilahti] - [#6799])
- Updated pubnubsub-handler 版本 ([@w1ll1am23] - [#6829])
- Remove zwave 遮盖 invert workaround. Use config instead. ([@andrey-git] - [#6832]) (breaking change)
- history_stats: Fix schema, as `state` can be arbitrary string ([@leppa] - [#6753])
- Rflink group commands ([@aequitas] - [#5969])
- Updating 报警.com Component for async and no Selenium ([@Xorso] - [#6752])
- Add voluptuous config validation to 场景 ([@MartinHjelmare] - [#6830])
- 集成 with lockitron ([@aarya123] - [#6805]) (new-platform)
- [开关.wemo] Fix today_energy_kwh calculation. ([@lwis] - [#6846])
- Locative tests to use aiohttp test utils ([@balloob] - [#6838])
- Convert Alexa tests to use aiohttp test utils ([@balloob] - [#6839])
- Handle initial event after 实体 is instantiated. ([@aequitas] - [#6760])
- Lifx legacy ([@amelchio] - [#6847]) (new-platform)
- aiohttp 2 ([@balloob] - [#6835])
- Fix 配置 设置 ([@bdurrer] - [#6853])
- Add option to disable automatic add for 灯光 and 传感器. ([@aequitas] - [#6852])
- 更新 aioHTTP to 2.0.5 ([@pvizeli] - [#6856])
- use change 灯光 level to avoid variable ramp speeds ([@craigjmidwinter] - [#6860])
- Handle aiohttp task cancellation better ([@balloob] - [#6862])
- Introduced Ring 二元sensor and refactored Ring component ([@tchellomello] - [#6520]) (breaking change) (new-platform)
- 升级 sendgrid to 3.6.5 ([@fabaff] - [#6866])
- 升级 sphinx-autodoc-typehints to 1.2.0 ([@fabaff] - [#6865])
- Added Met Office 天气 and 传感器 components ([@jacobtomlinson] - [#6742]) (new-platform)
- 升级 speedtest-cli to 1.0.3 ([@fabaff] - [#6867])
- Bumped amcrest module to 1.1.5 ([@tchellomello] - [#6872])
- 升级 pytz to 2017.02 ([@fabaff] - [#6875])
- 升级 aiohttp_cors to 0.5.2 ([@fabaff] - [#6874])
- 升级 sqlalchemy to 1.1.8 ([@fabaff] - [#6873])
- added support for Fibaro FGR-222 (similar to FGRM-222) ([@ChristianKuehnel] - [#6890])
- Fluxled ([@danielhiversen] - [#6892])
- Fix Tado 温控 set off mode ([@wmalgadey] - [#6848])
- Fox UMP volume set ([@danieljkemp] - [#6904])
- Move examples out ([@balloob] - [#6908])
- 更新 README.rst ([@balloob])
- Makes amcrest.传感器 to handle properly the scan_interval option. ([@tchellomello] - [#6885])
- Make 传感器.ring to handle scan_interval option as expected. ([@tchellomello] - [#6886])
- Eliminate needless async_add_job invocation of async_add_devices ([@nugget] - [#6864])
- Onkyo 更新 ([@danieljkemp] - [#6906])
- Fix for #6691 Neato Connection 错误 handling ([@turbokongen] - [#6731])
- Adds support for the PlugInDimmer hardware ([@gurumitts] - [#6915])
- Support for zwave 灯光 transitions ([@armills] - [#6868])
- Bump pyHik library 版本 to support more 摄像头 ([@mezz64] - [#6921])
- 更新 vera 遮盖 refresh logic ([@pavoni] - [#6897])
- 更新 前端 ([@balloob])
- 自动化: initial 状态 > 恢复 状态 ([@balloob] - [#6911]) (breaking change)
- 升级 flux_led to 0.17 ([@danielhiversen] - [#6929])
- 升级 paho-MQTT to 1.2.1 ([@fabaff] - [#6928])
- 升级 distro to 1.0.4 ([@fabaff] - [#6926])
- 升级 Sphinx to 1.5.4 ([@fabaff] - [#6927])
- Allow token 认证 for 'hook' 开关 component ([@KlaasH] - [#6922])
- WIP - Fix bug in 状态 handling in Vera 开关 and 灯光 ([@pavoni] - [#6931])
- total connect 报警 support ([@craigjmidwinter] - [#6887]) (new-platform)
- Initial 状态 over 恢复 状态 ([@balloob] - [#6924]) (breaking change)
- Eddystone Beacon Temperature 传感器 ([@citruz] - [#6789]) (new-platform)
- Add android ip webcam support for aiohttp2 ([@pvizeli] - [#6940])
- Bump pywemo 版本. Fixes Osram/Sylvania Lightify tunable white bulbs. ([@pavoni] - [#6946])
- Clean artifacts after running Ring tests. ([@tchellomello] - [#6944])
- Rename zwave nodes by node ID instead of 实体 ID ([@armills] - [#6938]) (breaking change)
- Report proper features in mqtt_json 灯光 ([@jawilson] - [#6941])
- Add multi phone numbers support ([@titilambert] - [#6605])
- 升级 Sphinx to 1.5.5 ([@fabaff] - [#6947])
- 升级 py-cpuinfo to 3.0.0 ([@fabaff] - [#6948])
- Fix 自动化 listening to HOMEASSISTANT_START ([@balloob] - [#6936]) (breaking change)
- Fix startup of sonos / snapshot handling / 错误 handling ([@pvizeli] - [#6945])
- 升级 mysensors dep and callbacks ([@MartinHjelmare] - [#6950])
- Added average temperature for the day before and the current period ([@diogos88] - [#6883])
- 升级 sqlalchemy to 1.1.9 ([@fabaff] - [#6955])
- 更新 for 0.42 ([@fabaff])
- Initial import for HassIO ([@pvizeli] - [#6935]) (new-platform)
- 灯光.yeelight: catch i/o related exceptions from the 后端 lib ([@rytilahti] - [#6952])
- Fix current_temperature is rounded ([@aufano] - [#6960])
- Preserve customize glob order. ([@andrey-git] - [#6963])
- Foscam 摄像头: Adding exception handling when fetching the 摄像头 图像 to avoid python exception 错误 when host is not reachable or rather any URL 错误 to 摄像头 ([@viswa-swami] - [#6964])
- Crime Reports 传感器 ([@happyleavesaoc] - [#6966]) (new-platform)
- 更新 kodi for aiohttp2 ([@armills] - [#6967])
- Bugfix time and task coro ([@pvizeli] - [#6968])
- Fix control+c quitting HASS ([@balloob] - [#6974])
- 更新 Emby for aiohttp v2 ([@mezz64] - [#6981])
- 开关.tplink: bump pyhs100 版本 requirement ([@rytilahti] - [#6986])
- Warn if start takes a long time. ([@balloob] - [#6975])
- Bump Amcrest module to 1.1.8 ([@tchellomello] - [#6990])

[#5969]: https://github.com/home-assistant/home-assistant/pull/5969
[#6520]: https://github.com/home-assistant/home-assistant/pull/6520
[#6605]: https://github.com/home-assistant/home-assistant/pull/6605
[#6688]: https://github.com/home-assistant/home-assistant/pull/6688
[#6704]: https://github.com/home-assistant/home-assistant/pull/6704
[#6708]: https://github.com/home-assistant/home-assistant/pull/6708
[#6726]: https://github.com/home-assistant/home-assistant/pull/6726
[#6731]: https://github.com/home-assistant/home-assistant/pull/6731
[#6733]: https://github.com/home-assistant/home-assistant/pull/6733
[#6742]: https://github.com/home-assistant/home-assistant/pull/6742
[#6752]: https://github.com/home-assistant/home-assistant/pull/6752
[#6753]: https://github.com/home-assistant/home-assistant/pull/6753
[#6757]: https://github.com/home-assistant/home-assistant/pull/6757
[#6759]: https://github.com/home-assistant/home-assistant/pull/6759
[#6760]: https://github.com/home-assistant/home-assistant/pull/6760
[#6761]: https://github.com/home-assistant/home-assistant/pull/6761
[#6763]: https://github.com/home-assistant/home-assistant/pull/6763
[#6764]: https://github.com/home-assistant/home-assistant/pull/6764
[#6768]: https://github.com/home-assistant/home-assistant/pull/6768
[#6769]: https://github.com/home-assistant/home-assistant/pull/6769
[#6770]: https://github.com/home-assistant/home-assistant/pull/6770
[#6771]: https://github.com/home-assistant/home-assistant/pull/6771
[#6772]: https://github.com/home-assistant/home-assistant/pull/6772
[#6773]: https://github.com/home-assistant/home-assistant/pull/6773
[#6775]: https://github.com/home-assistant/home-assistant/pull/6775
[#6776]: https://github.com/home-assistant/home-assistant/pull/6776
[#6779]: https://github.com/home-assistant/home-assistant/pull/6779
[#6782]: https://github.com/home-assistant/home-assistant/pull/6782
[#6789]: https://github.com/home-assistant/home-assistant/pull/6789
[#6790]: https://github.com/home-assistant/home-assistant/pull/6790
[#6792]: https://github.com/home-assistant/home-assistant/pull/6792
[#6793]: https://github.com/home-assistant/home-assistant/pull/6793
[#6795]: https://github.com/home-assistant/home-assistant/pull/6795
[#6796]: https://github.com/home-assistant/home-assistant/pull/6796
[#6798]: https://github.com/home-assistant/home-assistant/pull/6798
[#6799]: https://github.com/home-assistant/home-assistant/pull/6799
[#6801]: https://github.com/home-assistant/home-assistant/pull/6801
[#6803]: https://github.com/home-assistant/home-assistant/pull/6803
[#6805]: https://github.com/home-assistant/home-assistant/pull/6805
[#6807]: https://github.com/home-assistant/home-assistant/pull/6807
[#6808]: https://github.com/home-assistant/home-assistant/pull/6808
[#6809]: https://github.com/home-assistant/home-assistant/pull/6809
[#6810]: https://github.com/home-assistant/home-assistant/pull/6810
[#6817]: https://github.com/home-assistant/home-assistant/pull/6817
[#6826]: https://github.com/home-assistant/home-assistant/pull/6826
[#6829]: https://github.com/home-assistant/home-assistant/pull/6829
[#6830]: https://github.com/home-assistant/home-assistant/pull/6830
[#6832]: https://github.com/home-assistant/home-assistant/pull/6832
[#6835]: https://github.com/home-assistant/home-assistant/pull/6835
[#6838]: https://github.com/home-assistant/home-assistant/pull/6838
[#6839]: https://github.com/home-assistant/home-assistant/pull/6839
[#6846]: https://github.com/home-assistant/home-assistant/pull/6846
[#6847]: https://github.com/home-assistant/home-assistant/pull/6847
[#6848]: https://github.com/home-assistant/home-assistant/pull/6848
[#6852]: https://github.com/home-assistant/home-assistant/pull/6852
[#6853]: https://github.com/home-assistant/home-assistant/pull/6853
[#6856]: https://github.com/home-assistant/home-assistant/pull/6856
[#6860]: https://github.com/home-assistant/home-assistant/pull/6860
[#6862]: https://github.com/home-assistant/home-assistant/pull/6862
[#6864]: https://github.com/home-assistant/home-assistant/pull/6864
[#6865]: https://github.com/home-assistant/home-assistant/pull/6865
[#6866]: https://github.com/home-assistant/home-assistant/pull/6866
[#6867]: https://github.com/home-assistant/home-assistant/pull/6867
[#6868]: https://github.com/home-assistant/home-assistant/pull/6868
[#6872]: https://github.com/home-assistant/home-assistant/pull/6872
[#6873]: https://github.com/home-assistant/home-assistant/pull/6873
[#6874]: https://github.com/home-assistant/home-assistant/pull/6874
[#6875]: https://github.com/home-assistant/home-assistant/pull/6875
[#6883]: https://github.com/home-assistant/home-assistant/pull/6883
[#6885]: https://github.com/home-assistant/home-assistant/pull/6885
[#6886]: https://github.com/home-assistant/home-assistant/pull/6886
[#6887]: https://github.com/home-assistant/home-assistant/pull/6887
[#6890]: https://github.com/home-assistant/home-assistant/pull/6890
[#6892]: https://github.com/home-assistant/home-assistant/pull/6892
[#6897]: https://github.com/home-assistant/home-assistant/pull/6897
[#6904]: https://github.com/home-assistant/home-assistant/pull/6904
[#6906]: https://github.com/home-assistant/home-assistant/pull/6906
[#6908]: https://github.com/home-assistant/home-assistant/pull/6908
[#6911]: https://github.com/home-assistant/home-assistant/pull/6911
[#6915]: https://github.com/home-assistant/home-assistant/pull/6915
[#6921]: https://github.com/home-assistant/home-assistant/pull/6921
[#6922]: https://github.com/home-assistant/home-assistant/pull/6922
[#6924]: https://github.com/home-assistant/home-assistant/pull/6924
[#6926]: https://github.com/home-assistant/home-assistant/pull/6926
[#6927]: https://github.com/home-assistant/home-assistant/pull/6927
[#6928]: https://github.com/home-assistant/home-assistant/pull/6928
[#6929]: https://github.com/home-assistant/home-assistant/pull/6929
[#6931]: https://github.com/home-assistant/home-assistant/pull/6931
[#6935]: https://github.com/home-assistant/home-assistant/pull/6935
[#6936]: https://github.com/home-assistant/home-assistant/pull/6936
[#6938]: https://github.com/home-assistant/home-assistant/pull/6938
[#6940]: https://github.com/home-assistant/home-assistant/pull/6940
[#6941]: https://github.com/home-assistant/home-assistant/pull/6941
[#6944]: https://github.com/home-assistant/home-assistant/pull/6944
[#6945]: https://github.com/home-assistant/home-assistant/pull/6945
[#6946]: https://github.com/home-assistant/home-assistant/pull/6946
[#6947]: https://github.com/home-assistant/home-assistant/pull/6947
[#6948]: https://github.com/home-assistant/home-assistant/pull/6948
[#6950]: https://github.com/home-assistant/home-assistant/pull/6950
[#6952]: https://github.com/home-assistant/home-assistant/pull/6952
[#6955]: https://github.com/home-assistant/home-assistant/pull/6955
[#6960]: https://github.com/home-assistant/home-assistant/pull/6960
[#6963]: https://github.com/home-assistant/home-assistant/pull/6963
[#6964]: https://github.com/home-assistant/home-assistant/pull/6964
[#6966]: https://github.com/home-assistant/home-assistant/pull/6966
[#6967]: https://github.com/home-assistant/home-assistant/pull/6967
[#6968]: https://github.com/home-assistant/home-assistant/pull/6968
[#6974]: https://github.com/home-assistant/home-assistant/pull/6974
[#6975]: https://github.com/home-assistant/home-assistant/pull/6975
[#6981]: https://github.com/home-assistant/home-assistant/pull/6981
[#6986]: https://github.com/home-assistant/home-assistant/pull/6986
[#6990]: https://github.com/home-assistant/home-assistant/pull/6990
[#7010]: https://github.com/home-assistant/home-assistant/pull/7010
[#7013]: https://github.com/home-assistant/home-assistant/pull/7013
[#7014]: https://github.com/home-assistant/home-assistant/pull/7014
[#7017]: https://github.com/home-assistant/home-assistant/pull/7017
[#7021]: https://github.com/home-assistant/home-assistant/pull/7021
[#7031]: https://github.com/home-assistant/home-assistant/pull/7031
[@Xorso]: https://github.com/Xorso
[@amelchio]: https://github.com/amelchio
[@balloob]: https://github.com/balloob
[@fabaff]: https://github.com/fabaff
[@pvizeli]: https://github.com/pvizeli
[@ChristianKuehnel]: https://github.com/ChristianKuehnel
[@DavidMStraub]: https://github.com/DavidMStraub
[@KlaasH]: https://github.com/KlaasH
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@aarya123]: https://github.com/aarya123
[@aequitas]: https://github.com/aequitas
[@andrey-git]: https://github.com/andrey-git
[@armills]: https://github.com/armills
[@aufano]: https://github.com/aufano
[@bdurrer]: https://github.com/bdurrer
[@citruz]: https://github.com/citruz
[@danielhiversen]: https://github.com/danielhiversen
[@danieljkemp]: https://github.com/danieljkemp
[@danielperna84]: https://github.com/danielperna84
[@diogos88]: https://github.com/diogos88
[@geekofweek]: https://github.com/geekofweek
[@goto100]: https://github.com/goto100
[@gurumitts]: https://github.com/gurumitts
[@happyleavesaoc]: https://github.com/happyleavesaoc
[@jacobtomlinson]: https://github.com/jacobtomlinson
[@jannau]: https://github.com/jannau
[@jawilson]: https://github.com/jawilson
[@leppa]: https://github.com/leppa
[@lwis]: https://github.com/lwis
[@m00dawg]: https://github.com/m00dawg
[@mezz64]: https://github.com/mezz64
[@micw]: https://github.com/micw
[@nugget]: https://github.com/nugget
[@pavoni]: https://github.com/pavoni
[@quadportnick]: https://github.com/quadportnick
[@rytilahti]: https://github.com/rytilahti
[@tantecky]: https://github.com/tantecky
[@tchellomello]: https://github.com/tchellomello
[@titilambert]: https://github.com/titilambert
[@turbokongen]: https://github.com/turbokongen
[@viswa-swami]: https://github.com/viswa-swami
[@w1ll1am23]: https://github.com/w1ll1am23
[@craigjmidwinter]: https://github.com/craigjmidwinter
[@wmalgadey]: https://github.com/wmalgadey
[forum]: https://community.home-assistant.io/
[issue]: https://github.com/home-assistant/home-assistant/issues
[#7057]: https://github.com/home-assistant/home-assistant/pull/7057
[#7106]: https://github.com/home-assistant/home-assistant/pull/7106
[#7137]: https://github.com/home-assistant/home-assistant/pull/7137
[#7141]: https://github.com/home-assistant/home-assistant/pull/7141
[@robbiet480]: https://github.com/robbiet480
[discord]: https://discord.gg/c5DvZ4e
