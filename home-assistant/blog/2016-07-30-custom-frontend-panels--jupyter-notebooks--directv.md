# 0.25: Custom 前端 面板, Jupyter notebooks, DirecTV.

When Home Assistant started the focus has always been on making a great developer experience. Allowing anyone to add support for their favorite 设备 to Home Assistant easily. This focus has been a great success since we now have 339 components and platforms!

Starting with this 发布, we are extending our extensibility to the 前端. Starting this 发布, any component can [add its own page to the 前端][custom-面板]. Examples of this today are the map, logbook and history. We are looking forward to all the crazy 面板 you'll come up with!

We have also seen an exciting trend of people starting to visualize their Internet of Things data using [Jupyter] Notebooks, which are a great way to create and share documents that contain code, visualizations, and explanatory text. In case you missed it, the [博客] post by [@kireyeu] shows an advanced usecase while our [Notebooks][jupyter-notebooks] in the [Home Assistant Notebooks repository][jupyter-repo] 遮盖 the basics.

This 发布 also includes a bunch of new 集成, among others three new media player platforms. This means that today Home Assistant can talk to 26 different media players!

The brand-new [iFrame 面板 component][iframe_panel] allows you to add other websites as pages in the Home Assistant 前端. They will show up in the 侧边栏 and can be used the same way as you open the 前端 in your browser but all within one view.

I would like to do a shoutout to [@fabianhjr]. He has started adding [typing] data ([PEP484]) to the Home Assistant 核心. This will help us identify issues before they are released.

<img src='/home-assistant/images/supported_brands/russound.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/jupyter.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='https://brands.home-assistant.io/directv/icon.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

* 前端: Support for [iFrame 面板][iframe_panel] to adding other sites to 侧边栏 ([@balloob])
* Allow components to register [custom 前端 面板][custom-面板] ([@balloob])
* Add example custom\_component react\_panel showing custom 面板 ([@balloob])
* 灯光: [MagicLight/Flux WiFi Color LED 灯光][flux] support ([@Danielhiversen])
* 脚本: Specify a delay [using 模板][脚本] ([@Teagan42])
* Media player: [Russound RNET][Russound] 集成 ([@laf])
* 遥控器: Option specifying custom timeout when calling Home Assistant API ([@n8henrie])
* Thermostat: 集成 of [KNX] thermostats ([@open-homeautomation])
* Thermostat: Support for HVAC mode of [Nest] 设备 ([@vladonemo])
* InfluxDB: Option to specify additional [tags] ([@open-homeautomation])
* Input slider: Support for float value ([@ngraziano])
* 模板: New [filters] (`timestamp_local` and `timestamp_utc`) ([@fabaff])
* 二元sensor - Wink: Water leak 传感器 support added ([@w1ll1am23])
* 传感器 - Tellduslive: Support for luminance of Fibaro Motion 传感器 ([@PetitCircuitLab])
* 开关 - RPi GPIO: Fix when inverted logic (@zeroDenial)
* Z-Wave: Rollershutter 更新 ([@turbokongen])
* RFXtrx: Fire events when receiving signals from 传感器 and tests added ([@Danielhiversen])
* 核心: Add [type][typing] checking using mypy to the 核心 ([@fabianhjr])
* 遥控器: Support for getting the [配置] through the Python API ([@fabaff])
* Media player: Support for [DirecTV] ([@cbulock])
* Use browser timezone for 前端 logbook and history dates ([@armills])
* 灯光: New support for [X10] 灯光 ([@fotoetienne])
* 传感器: Support for observing [IMAP] accounts ([@danieljkemp])
* Media Player: 集成 for [MPC-HC] (Media Player Classic - Home Cinema) mediaplayer ([@abcminiuser])
* 通知: `location` extension for [Telegram] and photo bug fixed ([@keatontaylor] and [@pvizeli])
* Groups: 门锁 状态 will now be properly grouped ([@jwl17330536])
* Media Player: Added tests for Sonos to improve code quality ([@americanwookie])
* 设备 Tracker: iCloud stability fixes ([@kellerza])
* 传感器: Speedtest with improved 错误 handling and 状态 restoring ([@nkgilley])
* Recorder: Stability fixes ([@kellerza])
* Qwikswitch: Stability fixes ([@kellerza])
* 灯光: [Hyperion] keeps now track of active color ([@schneefux])

### Hotfix 0.25.1 - August 1

* 灯光 - Z-Wave: Bring back delayed value 更新 behavior ([@jnewland])
* Recorder: Properly close session after execute ([@kellerza])
* Media Player - Kodi: No longer block startup if connecting to wrong port ([@shoekstra])
* Downgrade voluptuous to 0.8.9 as it blocked the 升级 for some ([@balloob])

### Hotfix 0.25.2 - August 2

* Hotfix to make sure Z-Wave 门锁 work again. Thanks to @tobiebooth for the quick fix.

### Backward-incompatible changes

* Google Voice SMS 通知 support was removed.

[@nkgilley]: https://github.com/nkgilley

[@abcminiuser]: https://github.com/abcminiuser

[@americanwookie]: https://github.com/americanwookie

[@armills]: https://github.com/armills

[@balloob]: https://github.com/balloob

[@cbulock]: https://github.com/cbulock

[@Danielhiversen]: https://github.com/Danielhiversen

[@danieljkemp]: https://github.com/danieljkemp

[@fabaff]: https://github.com/fabaff

[@fabianhjr]: https://github.com/fabianhjr

[@fotoetienne]: https://github.com/fotoetienne

[@jwl17330536]: https://github.com/jwl17330536

[@keatontaylor]: https://github.com/keatontaylor

[@kellerza]: https://github.com/kellerza

[@kireyeu]: https://github.com/kireyeu

[@laf]: https://github.com/laf

[@n8henrie]: https://github.com/n8henrie

[@ngraziano]: https://github.com/ngraziano

[@open-homeautomation]: https://github.com/open-homeautomation

[@PetitCircuitLab]: https://github.com/PetitCircuitLab

[@pvizeli]: https://github.com/pvizeli

[@schneefux]: https://github.com/schneefux

[@Teagan42]: https://github.com/Teagan42

[@turbokongen]: https://github.com/turbokongen

[@usul27]: https://github.com/usul27

[@vladonemo]: https://github.com/vladonemo

[@w1ll1am23]: https://github.com/w1ll1am23

[@jnewland]: https://github.com/jnewland

[@shoekstra]: https://github.com/shoekstra

[custom-面板]: /developers/frontend_creating_custom_panels/

[iframe_panel]: /integrations/panel_iframe/

[flux]: /integrations/flux_led

[脚本]: /getting-started/脚本/#delay

[Russound]: /integrations/russound_rnet

[tags]: /integrations/influxdb/

[filter]: /topics/templating/

[jupyter-notebooks]: /cookbook/#jupyter-notebooks

[jupyter-repo]: https://github.com/home-assistant/home-assistant-notebooks

[Jupyter]: http://jupyter.org/

[博客]: /博客/2016/07/23/internet-of-things-data-exploration-with-jupyter-notebooks/

[DirecTV]: /integrations/directv

[配置]: /developers/python_api/#get-配置

[X10]: /integrations/x10

[IMAP]: /integrations/imap

[typing]: https://docs.python.org/3/library/typing.html

[PEP484]: https://www.python.org/dev/peps/pep-0484/

[MPC-HC]: /integrations/mpchc

[Telegram]: /integrations/telegram

[KNX]: /integrations/温控.knx/

[Nest]: /integrations/nest/#温控

[filters]: /topics/templating/#home-assistant-模板-extensions

[Hyperion]: /integrations/hyperion
