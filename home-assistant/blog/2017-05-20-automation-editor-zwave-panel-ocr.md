# Home Assistant 0.45: Automation editor, Z-Wave panel, OCR

<a href='/home-assistant/integrations/#版本/0.45'><img src='/home-assistant/images/blog/2017-05-0.45/components.png' style='border: 0;box-shadow: none;'></a>

欢迎来到 Home Assistant 又一次精彩发布！虽然一些贡献者和用户此时正齐聚 PyCon US 2017，我们仍然带来了一次相当出色的版本更新。

本次发布的第一个亮点，是许多人一直在期待的功能：自动化编辑器。它目前仍处于实验阶段，很多内容还在持续完善中，但已经可以使用。你现在可以创建新的自动化，也可以编辑现有自动化。如果你是从全新配置开始，那已经可以直接使用；否则，请先查看[这些说明](/home-assistant/docs/automation/editor/index.md)，让你的自动化做好在 UI 中编辑的准备。

<p class='img'>
  <img src='/home-assistant/images/blog/2017-05-0.45/trigger.png' />
</p>

想看看新版本的实际效果，可以观看来自 [BRUHautomation](http://www.bruhautomation.com/) 的 [Ben](https://twitter.com/BRUHautomation) 制作的这个[视频](https://youtu.be/0j_hWdCTip4)。

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/0j_hWdCTip4" frameborder="0" allowfullscreen></iframe>
</div>

由于编辑器仍是实验功能，目前还有一些限制。现在仅支持 Chrome 和 Chromium，并不是所有触发器和动作都已支持，条件也暂时还不支持。不过基础已经搭好了，所以如果你想参与贡献，非常欢迎加入。

在 Z-Wave 方面，这次也有很多进展。最大的更新来自 [@turbokongen] 对 Z-Wave 面板的大幅扩展。你现在可以直接修改配置参数并管理自己的设备。

<p class='img'>
  <img src='/home-assistant/images/blog/2017-05-0.45/zwave.png' />
</p>
感谢 Python Open Z-Wave 团队的努力，我们现在可以按需直接从 PyPI 安装它，不再需要你自己预先编译。这也有助于确保系统使用的 Python Open Z-Wave 版本与代码预期一致。

:::warning

如果你在 Open Z-Wave 的 `options.xml` 中设置了安全密钥，请把 `options.xml` 复制到 Home Assistant 配置目录中。只有保存在这里的选项才会被持久化。

:::

此外，[@armills] 还主导了相关工作，为 Z-Wave 实现了完整的测试覆盖。感谢所有辛苦付出。

本次发布还带来了两个能让非智能设备稍微“聪明”一些的集成：[`file` 传感器][传感器.file docs] 和 [`seven_segments` OCR 图像处理平台][image_processing.seven_segments docs]。前者可以直接读取由日志程序或类似工具生成的纯文本文件；后者则能从包含七段数码管显示的截图中提取数值。

<p class='img'>
  <img src='/home-assistant/images/blog/2017-05-0.45/power-meter.png' />
</p>

最后，我们的 Docker 镜像现在已经基于 Python 3.6。这个版本比 Python 3.5 更快，占用内存也更少，确实很棒。

如果你正在使用我们的[实验性 Hass.io 镜像][hass.io]，那么这次在面板服务方式上有一项破坏性变更。如果你已经有现有安装，请务必先把 supervisor 更新到最新版本，再升级 Home Assistant。如果你打算重新刷入新的 Hass.io 镜像，请确保只使用[安装页面][hass.io-安装]中提供的全新 0.8 镜像。

[hass.io]: https://community.home-assistant.io/t/introducing-hass-io/17296

[hass.io-安装]: /hassio/installation/

## 新集成

* 新增 raspihats 组件 ([@florincosta] - [#7392]) ([raspihats docs]) (new-platform)
* 新增 Datadog 组件 ([@nunofgs] - [#7158]) ([datadog docs]) (new-platform)
* 新增自动化配置面板支持 ([@balloob] - [#7509]) ([config.自动化 docs]) (new-platform)
* 新增 Z-Wave 面板 API ([@turbokongen] - [#7456]) ([zwave docs]) ([zwave.api docs]) (new-platform)
* 新增 myStrom 按钮支持 ([@fabaff] - [#7099]) ([binary\_sensor.mystrom docs][binary_sensor.mystrom docs]) (new-platform)
* 新增 PiFace Digital I/O 模块支持 ([@basschipper] - [#7494]) ([rpi\_pfio docs][rpi_pfio docs]) ([binary\_sensor.rpi\_pfio docs][binary_sensor.rpi_pfio docs]) ([开关.rpi\_pfio docs][开关.rpi_pfio docs]) (new-platform)
* 新增 raspihats 二元传感器 ([@florincosta] - [#7508]) ([binary\_sensor.raspihats docs][binary_sensor.raspihats docs]) (new-platform)
* 新增 Lutron Serena 窗帘支持 ([@gurumitts] - [#7565]) ([lutron\_caseta docs][lutron_caseta docs]) ([遮盖.lutron\_caseta docs][遮盖.lutron_caseta docs]) (new-platform)
* 在传感器和遥控器平台新增 Kira 组件 ([@stu-gott] - [#7479]) ([kira docs]) ([遥控器.kira docs]) ([传感器.kira docs]) (new-platform)
* 新增 File 传感器 ([@fabaff] - [#7569]) ([传感器.file docs]) (new-platform)
* 新增 Seven segments OCR 图像处理平台 ([@fabaff] - [#7632]) ([image\_processing.seven\_segments docs][image_processing.seven_segments docs]) (new-platform)
* 新增 Axis 组件 ([@Kane610] - [#7381]) ([axis docs]) (new-platform)

## 发布 0.45.1 - May 22

* Fix telegram chats ([@azogue] - [#7689]) ([通知.telegram docs]) ([telegram\_bot docs][telegram_bot docs])
* Fix playback control of web streams ([@cgtobi] - [#7683]) ([媒体播放器.volumio docs])
* device\_tracker.ubus: Handle empty results ([@tobygray] - [#7673]) ([device\_tracker.ubus docs][device_tracker.ubus docs])
* Allow fetching hass.io 面板 without auth ([@balloob] - [#7714]) ([hassio docs])

## 如果你需要帮助

欢迎使用我们非常活跃的 [论坛][forum]，或者加入聊天频道 [discord][discord]。发布说明虽然也开放评论，但我们更推荐你使用前面的沟通渠道。谢谢。

## 反馈问题

如果你遇到了这次发布引入的问题，请到我们的 [问题追踪器][issue] 提交反馈，并确保填写问题模板中的所有字段。

## 不向后兼容的变更

* PyPI Openzwave ([@JshWright] - [#7415]) ([zwave docs]) (breaking change)
* Remove listening to `homeassistant_start` with event 自动化 ([@balloob] - [#7474]) ([自动化.event docs]) (breaking change)

<!--more-->

## All changes

* Add hass to rfxtrx object ([@danielhiversen] - [#6844])
* Add new raspihats component ([@florincosta] - [#7392]) ([raspihats docs]) (new-platform)
* 传感器.envirophat: add missing requirement ([@imrehg] - [#7451]) ([传感器.envirophat docs])
* PyPI Openzwave ([@JshWright] - [#7415]) ([zwave docs]) (breaking change)
* Add datadog component ([@nunofgs] - [#7158])
* Add tests for deprecation 助手 ([@armills] - [#7452])
* Forecasts for 天气 underground ([@pezinek] - [#7062]) ([传感器.wunderground docs])
* 传感器.envirophat: add missing requirement ([@imrehg] - [#7451]) ([传感器.envirophat docs])
* 开关 russound, pymysensors, and pocketcasts to pypi ([@andrey-git] - [#7449])
* 升级 pymysensors to 0.10.0 ([@MartinHjelmare] - [#7469])
* 升级 Dockerfile to Python 3.6 ([@balloob] - [#7471])
* Test only dependencies ([@balloob] - [#7472])
* 更新 to pyunifi 2.12 ([@finish06] - [#7468]) ([device\_tracker.unifi docs][device_tracker.unifi docs])
* Remove listening to homeassistant\_start with event 自动化 ([@balloob] - [#7474]) ([自动化.event docs]) (breaking change)
* Fix plant MIN\_TEMPERATURE, MAX\_TEMPERATURE validation ([@frog32] - [#7476]) ([plant docs])
* Forecasts for 天气 underground ([@pezinek] - [#7062]) ([传感器.wunderground docs])
* 升级 pymysensors to 0.10.0 ([@MartinHjelmare] - [#7469])
* Fix plant MIN\_TEMPERATURE, MAX\_TEMPERATURE validation ([@frog32] - [#7476]) ([plant docs])
* 更新 to pyunifi 2.12 ([@finish06] - [#7468]) ([device\_tracker.unifi docs][device_tracker.unifi docs])
* Uses pypi for deps ([@gurumitts] - [#7485]) ([lutron\_caseta docs][lutron_caseta docs])
* 0.44.2 ([@balloob] - [#7488])
* LIFX: avoid out-of-bounds hue aborting the colorloop effect ([@amelchio] - [#7495])
* 升级 async\_timeout to 1.2.1 ([@fabaff] - [#7490])
* Prevent printing of packets. ([@aequitas] - [#7492]) ([rflink docs])
* 升级 beautifulsoup4 to 4.6.0 ([@fabaff] - [#7491]) ([传感器.scrape docs])
* 开关 onkyo to pypi ([@andrey-git] - [#7497]) ([媒体播放器.onkyo docs])
* Fixed potential AttributeError when checking for deleted sources ([@scarface-4711] - [#7502]) ([媒体播放器.denonavr docs])
* Refactor sun component for correctness ([@armills] - [#7295])
* new source only forces "play" if the current 状态 is "playing" ([@abmantis] - [#7506]) ([媒体播放器.spotify docs])
* Correct retrieval of spotify shuffle 状态 ([@andersonshatch] - [#7505]) ([媒体播放器.spotify docs])
* Fix sonos sleep timer ([@frog32] - [#7503]) ([媒体播放器.sonos docs])
* Add support for 自动化 config 面板 ([@balloob] - [#7509]) (\[自动化 docs]) ([config.自动化 docs]) ([config docs]) (new-platform)
* Zwave 面板 api ([@turbokongen] - [#7456]) ([zwave docs]) ([zwave.api docs]) (new-platform)
* 更新 Docker dev environment to python3.6 ([@frog32] - [#7520])
* 开关 basicmodem and python-roku to pypi ([@andrey-git] - [#7514]) ([媒体播放器.roku docs]) ([传感器.modem\_callerid docs][传感器.modem_callerid docs])
* 传感器.envirophat: do not set up platform if hardware is not attached ([@imrehg] - [#7438]) ([传感器.envirophat docs])
* Telegram Bot enhancements with callback queries and new 通知 服务 ([@azogue] - [#7454]) ([telegram\_bot docs][telegram_bot docs]) ([通知.telegram docs]) ([telegram\_bot.polling docs][telegram_bot.polling docs]) ([telegram\_bot.服务.yaml docs][telegram_bot.服务.yaml docs]) ([telegram\_bot.webhooks docs][telegram_bot.webhooks docs])
* Add 密码 parameter to uvc component ([@nunofgs] - [#7499]) ([摄像头.uvc docs])
* Don't interact with hass directly ([@fabaff] - [#7099]) ([binary\_sensor.mystrom docs][binary_sensor.mystrom docs]) (new-platform)
* Support for the PiFace Digital I/O module ([@basschipper] - [#7494]) ([rpi\_pfio docs][rpi_pfio docs]) ([binary\_sensor.rpi\_pfio docs][binary_sensor.rpi_pfio docs]) ([开关.rpi\_pfio docs][开关.rpi_pfio docs]) (new-platform)
* 升级 limitlessled to 1.0.7 ([@corneyl] - [#7525]) ([灯光.limitlessled docs])
* 更新 docstrings and 日志 messages ([@fabaff] - [#7526]) ([灯光.blinksticklight docs]) ([灯光.enocean docs]) ([灯光.flux\_led docs][灯光.flux_led docs]) ([灯光.insteon\_local docs][灯光.insteon_local docs]) ([灯光.insteon\_plm docs][灯光.insteon_plm docs]) ([灯光.isy994 docs]) ([灯光.limitlessled docs]) ([灯光.mystrom docs])
* Try to request current\_location Automatic scope ([@armills] - [#7447])
* Add myStrom 二元sensor ([@fabaff] - [#7530])
* Add not-context-manager ([@fabaff] - [#7523])
* Threadsafe configurator ([@Kane610] - [#7536]) ([configurator docs])
* Fix for #7459 ([@deftdawg] - [#7544]) ([alexa docs])
* 升级 sendgrid to 4.1.0 ([@fabaff] - [#7538]) ([通知.sendgrid docs])
* Automatic 版本 bump ([@armills] - [#7555])
* 升级 dweepy to 0.3.0 ([@fabaff] - [#7550]) ([dweet docs]) ([传感器.dweet docs])
* Add SSL support to NZBGet 传感器 ([@tboyce021] - [#7553]) ([传感器.nzbget docs])
* Do not 安装 all dependencies in dev mode ([@balloob] - [#7548])
* Hide proximity updates in logbook ([@armills] - [#7549]) ([logbook docs])
* Only 安装 tox in dev mode ([@balloob] - [#7557])
* Support adding different server locations for Microsoft face component ([@tsvi] - [#7532]) ([microsoft\_face docs][microsoft_face docs])
* Treat swing and 风扇 level as optional in Sensibo 温控. ([@andrey-git] - [#7560]) ([温控.sensibo docs])
* LIFX: add lifx\_set\_state 服务 call ([@amelchio] - [#7552]) ([灯光.lifx docs])
* Add raspihats 二元sensor ([@florincosta] - [#7508]) ([binary\_sensor.raspihats docs][binary_sensor.raspihats docs]) (new-platform)
* 更新 pywebpush to 1.0.0 ([@perosb] - [#7561]) ([通知.html5 docs])
* Initialize sun with correct values. ([@aequitas] - [#7559]) ([sun docs])
* Comment RasPi specific requirements ([@Juggels] - [#7562]) ([传感器.envirophat docs])
* 更新 netdisco ([@balloob] - [#7563])
* Support lutron serena shades ([@gurumitts] - [#7565]) ([lutron\_caseta docs][lutron_caseta docs]) ([遮盖.lutron\_caseta docs][遮盖.lutron_caseta docs]) (new-platform)
* Tests for zwave discovery logic ([@armills] - [#7566])
* Tests for zwave 设置 features ([@armills] - [#7570])
* Blink 版本 bump ([@fronzbot] - [#7571]) ([blink docs]) ([传感器.blink docs])
* Fix systematic 警告 in influxdb 传感器 ([@bestlibre] - [#7541]) ([传感器.influxdb docs])
* Fix Kodi specific 服务 registry and add descriptions ([@azogue] - [#7551]) ([媒体播放器.kodi docs])
* Add Kira component to 传感器 and 遥控器 platforms ([@stu-gott] - [#7479]) ([kira docs]) ([遥控器.kira docs]) ([传感器.kira docs]) (new-platform)
* Add tests for zwave network events ([@armills] - [#7573])
* Additional Wink 门锁 features ([@w1ll1am23] - [#7445])
* Websocket\_api: avoid parallel drain ([@balloob] - [#7576]) ([websocket\_api docs][websocket_api docs])
* Remove more test requirements ([@balloob] - [#7574])
* 摄像头.zoneminder: Handle old versions of zoneminder ([@mnoorenberghe] - [#7589]) ([摄像头.zoneminder docs])
* Pass additional arguments to tox in test\_docker ([@frog32] - [#7591])
* Fix websocket api reaching queue ([@balloob] - [#7590]) ([websocket\_api docs][websocket_api docs])
* SMTP 通知 enhancements: full HTML emails and custom `product_name` in email headers ([@azogue] - [#7533]) ([通知.smtp docs])
* 自动化 状态 Change For timer 属性 fix ([@armills] - [#7584]) ([自动化.状态 docs])
* Add posibility to specify snmp protocol 版本 ([@jhemzal] - [#7564]) ([传感器.snmp docs])
* Add sonos 报警 clock 更新 服务 ([@frog32] - [#7521]) ([媒体播放器.sonos docs])
* Fix handling of single 用户 ([@mezz64] - [#7587]) ([eight\_sleep docs][eight_sleep docs])
* File 传感器 ([@fabaff] - [#7569]) ([传感器.file docs]) (new-platform)
* Make miflora monitored\_conditions parameter optional ([@frog32] - [#7598]) ([传感器.miflora docs])
* Force 自动化 ids to always be a string ([@balloob] - [#7612]) (\[自动化 docs])
* 更新 Docker base 图像 to python 3.6 ([@pschmitt] - [#7613])
* Add Content-type: 图像/jpeg for 摄像头 proxy ([@olekenneth] - [#7581]) ([摄像头 docs])
* Fix typo and 更新 style to match the other platforms ([@fabaff] - [#7621]) ([image\_processing.opencv docs][image_processing.opencv docs])
* Bump pyvera - fixes issue with % in brightness levels. ([@pavoni] - [#7622]) ([vera docs])
* Add kelvin/brightness\_pct alternatives to 灯光.turn\_on ([@amelchio] - [#7596]) ([灯光.lifx docs]) ([灯光 docs])
* Add support for disabling tradfri groups ([@cnrd] - [#7593]) ([tradfri docs]) ([灯光.tradfri docs])
* 更新 docstrings and comments ([@fabaff] - [#7626]) ([image\_processing.openalpr\_cloud docs][image_processing.openalpr_cloud docs]) ([image\_processing.openalpr\_local docs][image_processing.openalpr_local docs])
* 升级 Sphinx to 1.6.1 ([@fabaff] - [#7624])
* 更新 docstrings ([@fabaff] - [#7630]) ([image\_processing docs][image_processing docs]) ([image\_processing.dlib\_face\_detect docs][image_processing.dlib_face_detect docs]) ([image\_processing.dlib\_face\_identify docs][image_processing.dlib_face_identify docs]) ([image\_processing.microsoft\_face\_detect docs][image_processing.microsoft_face_detect docs]) ([image\_processing.microsoft\_face\_identify docs][image_processing.microsoft_face_identify docs]) ([image\_processing.opencv docs][image_processing.opencv docs])
* Kodi specific 服务 to call Kodi API methods ([@azogue] - [#7603]) ([媒体播放器.kodi docs])
* Updated limitlessled requirement to v1.0.8 ([@corneyl] - [#7629])
* Osram lightify Removed wrong assignment ([@commento] - [#7615]) ([灯光.osramlightify docs])
* Updated dependency ([@danielperna84] - [#7638]) ([homematic docs])
* Seven segments OCR 图像 processing ([@fabaff] - [#7632]) ([image\_processing.seven\_segments docs][image_processing.seven_segments docs]) ([image\_processing docs][image_processing docs]) (new-platform)
* Abort tests when instances leaked ([@balloob] - [#7623])
* Coerce color\_temp to int even when passed in as kelvin ([@amelchio] - [#7640]) ([灯光 docs])
* Fix 自动化 failing to 设置 if no 自动化 specified ([@balloob] - [#7647]) (\[自动化 docs])

[#6844]: https://github.com/home-assistant/home-assistant/pull/6844

[#7062]: https://github.com/home-assistant/home-assistant/pull/7062

[#7099]: https://github.com/home-assistant/home-assistant/pull/7099

[#7158]: https://github.com/home-assistant/home-assistant/pull/7158

[#7295]: https://github.com/home-assistant/home-assistant/pull/7295

[#7381]: https://github.com/home-assistant/home-assistant/pull/7381

[#7392]: https://github.com/home-assistant/home-assistant/pull/7392

[#7415]: https://github.com/home-assistant/home-assistant/pull/7415

[#7438]: https://github.com/home-assistant/home-assistant/pull/7438

[#7445]: https://github.com/home-assistant/home-assistant/pull/7445

[#7447]: https://github.com/home-assistant/home-assistant/pull/7447

[#7449]: https://github.com/home-assistant/home-assistant/pull/7449

[#7451]: https://github.com/home-assistant/home-assistant/pull/7451

[#7452]: https://github.com/home-assistant/home-assistant/pull/7452

[#7454]: https://github.com/home-assistant/home-assistant/pull/7454

[#7456]: https://github.com/home-assistant/home-assistant/pull/7456

[#7468]: https://github.com/home-assistant/home-assistant/pull/7468

[#7469]: https://github.com/home-assistant/home-assistant/pull/7469

[#7471]: https://github.com/home-assistant/home-assistant/pull/7471

[#7472]: https://github.com/home-assistant/home-assistant/pull/7472

[#7474]: https://github.com/home-assistant/home-assistant/pull/7474

[#7476]: https://github.com/home-assistant/home-assistant/pull/7476

[#7479]: https://github.com/home-assistant/home-assistant/pull/7479

[#7485]: https://github.com/home-assistant/home-assistant/pull/7485

[#7488]: https://github.com/home-assistant/home-assistant/pull/7488

[#7490]: https://github.com/home-assistant/home-assistant/pull/7490

[#7491]: https://github.com/home-assistant/home-assistant/pull/7491

[#7492]: https://github.com/home-assistant/home-assistant/pull/7492

[#7494]: https://github.com/home-assistant/home-assistant/pull/7494

[#7495]: https://github.com/home-assistant/home-assistant/pull/7495

[#7497]: https://github.com/home-assistant/home-assistant/pull/7497

[#7499]: https://github.com/home-assistant/home-assistant/pull/7499

[#7502]: https://github.com/home-assistant/home-assistant/pull/7502

[#7503]: https://github.com/home-assistant/home-assistant/pull/7503

[#7505]: https://github.com/home-assistant/home-assistant/pull/7505

[#7506]: https://github.com/home-assistant/home-assistant/pull/7506

[#7508]: https://github.com/home-assistant/home-assistant/pull/7508

[#7509]: https://github.com/home-assistant/home-assistant/pull/7509

[#7514]: https://github.com/home-assistant/home-assistant/pull/7514

[#7520]: https://github.com/home-assistant/home-assistant/pull/7520

[#7521]: https://github.com/home-assistant/home-assistant/pull/7521

[#7523]: https://github.com/home-assistant/home-assistant/pull/7523

[#7525]: https://github.com/home-assistant/home-assistant/pull/7525

[#7526]: https://github.com/home-assistant/home-assistant/pull/7526

[#7530]: https://github.com/home-assistant/home-assistant/pull/7530

[#7532]: https://github.com/home-assistant/home-assistant/pull/7532

[#7533]: https://github.com/home-assistant/home-assistant/pull/7533

[#7536]: https://github.com/home-assistant/home-assistant/pull/7536

[#7538]: https://github.com/home-assistant/home-assistant/pull/7538

[#7541]: https://github.com/home-assistant/home-assistant/pull/7541

[#7544]: https://github.com/home-assistant/home-assistant/pull/7544

[#7548]: https://github.com/home-assistant/home-assistant/pull/7548

[#7549]: https://github.com/home-assistant/home-assistant/pull/7549

[#7550]: https://github.com/home-assistant/home-assistant/pull/7550

[#7551]: https://github.com/home-assistant/home-assistant/pull/7551

[#7552]: https://github.com/home-assistant/home-assistant/pull/7552

[#7553]: https://github.com/home-assistant/home-assistant/pull/7553

[#7555]: https://github.com/home-assistant/home-assistant/pull/7555

[#7557]: https://github.com/home-assistant/home-assistant/pull/7557

[#7559]: https://github.com/home-assistant/home-assistant/pull/7559

[#7560]: https://github.com/home-assistant/home-assistant/pull/7560

[#7561]: https://github.com/home-assistant/home-assistant/pull/7561

[#7562]: https://github.com/home-assistant/home-assistant/pull/7562

[#7563]: https://github.com/home-assistant/home-assistant/pull/7563

[#7564]: https://github.com/home-assistant/home-assistant/pull/7564

[#7565]: https://github.com/home-assistant/home-assistant/pull/7565

[#7566]: https://github.com/home-assistant/home-assistant/pull/7566

[#7569]: https://github.com/home-assistant/home-assistant/pull/7569

[#7570]: https://github.com/home-assistant/home-assistant/pull/7570

[#7571]: https://github.com/home-assistant/home-assistant/pull/7571

[#7573]: https://github.com/home-assistant/home-assistant/pull/7573

[#7574]: https://github.com/home-assistant/home-assistant/pull/7574

[#7576]: https://github.com/home-assistant/home-assistant/pull/7576

[#7581]: https://github.com/home-assistant/home-assistant/pull/7581

[#7584]: https://github.com/home-assistant/home-assistant/pull/7584

[#7587]: https://github.com/home-assistant/home-assistant/pull/7587

[#7589]: https://github.com/home-assistant/home-assistant/pull/7589

[#7590]: https://github.com/home-assistant/home-assistant/pull/7590

[#7591]: https://github.com/home-assistant/home-assistant/pull/7591

[#7593]: https://github.com/home-assistant/home-assistant/pull/7593

[#7596]: https://github.com/home-assistant/home-assistant/pull/7596

[#7598]: https://github.com/home-assistant/home-assistant/pull/7598

[#7603]: https://github.com/home-assistant/home-assistant/pull/7603

[#7612]: https://github.com/home-assistant/home-assistant/pull/7612

[#7613]: https://github.com/home-assistant/home-assistant/pull/7613

[#7615]: https://github.com/home-assistant/home-assistant/pull/7615

[#7621]: https://github.com/home-assistant/home-assistant/pull/7621

[#7622]: https://github.com/home-assistant/home-assistant/pull/7622

[#7623]: https://github.com/home-assistant/home-assistant/pull/7623

[#7624]: https://github.com/home-assistant/home-assistant/pull/7624

[#7626]: https://github.com/home-assistant/home-assistant/pull/7626

[#7629]: https://github.com/home-assistant/home-assistant/pull/7629

[#7630]: https://github.com/home-assistant/home-assistant/pull/7630

[#7632]: https://github.com/home-assistant/home-assistant/pull/7632

[#7638]: https://github.com/home-assistant/home-assistant/pull/7638

[#7640]: https://github.com/home-assistant/home-assistant/pull/7640

[#7647]: https://github.com/home-assistant/home-assistant/pull/7647

[@JshWright]: https://github.com/JshWright

[@Juggels]: https://github.com/Juggels

[@Kane610]: https://github.com/Kane610

[@MartinHjelmare]: https://github.com/MartinHjelmare

[@abmantis]: https://github.com/abmantis

[@aequitas]: https://github.com/aequitas

[@amelchio]: https://github.com/amelchio

[@andersonshatch]: https://github.com/andersonshatch

[@andrey-git]: https://github.com/andrey-git

[@armills]: https://github.com/armills

[@azogue]: https://github.com/azogue

[@balloob]: https://github.com/balloob

[@basschipper]: https://github.com/basschipper

[@bestlibre]: https://github.com/bestlibre

[@cnrd]: https://github.com/cnrd

[@commento]: https://github.com/commento

[@corneyl]: https://github.com/corneyl

[@cribbstechnologies]: https://github.com/cribbstechnologies

[@danielhiversen]: https://github.com/danielhiversen

[@danielperna84]: https://github.com/danielperna84

[@fabaff]: https://github.com/fabaff

[@finish06]: https://github.com/finish06

[@florincosta]: https://github.com/florincosta

[@frog32]: https://github.com/frog32

[@fronzbot]: https://github.com/fronzbot

[@gurumitts]: https://github.com/gurumitts

[@imrehg]: https://github.com/imrehg

[@jhemzal]: https://github.com/jhemzal

[@jminardi]: https://github.com/jminardi

[@deftdawg]: https://github.com/deftdawg

[@mezz64]: https://github.com/mezz64

[@mnoorenberghe]: https://github.com/mnoorenberghe

[@nunofgs]: https://github.com/nunofgs

[@olekenneth]: https://github.com/olekenneth

[@pavoni]: https://github.com/pavoni

[@perosb]: https://github.com/perosb

[@pezinek]: https://github.com/pezinek

[@pschmitt]: https://github.com/pschmitt

[@robbiet480]: https://github.com/robbiet480

[@scarface-4711]: https://github.com/scarface-4711

[@stu-gott]: https://github.com/stu-gott

[@tboyce021]: https://github.com/tboyce021

[@tsvi]: https://github.com/tsvi

[@turbokongen]: https://github.com/turbokongen

[@w1ll1am23]: https://github.com/w1ll1am23

[alexa docs]: /integrations/alexa/

[axis docs]: /integrations/axis/

[config.自动化 docs]: /docs/自动化/editor/

[自动化.event docs]: /docs/配置/events/

[自动化.状态 docs]: /docs/配置/state_object/

[binary_sensor.mystrom docs]: /integrations/mystrom#binary-传感器

[binary_sensor.raspihats docs]: /integrations/raspihats#binary-传感器

[binary_sensor.rpi_pfio docs]: /integrations/rpi_pfio#binary-传感器

[blink docs]: /integrations/blink/

[摄像头 docs]: /integrations/摄像头

[摄像头.uvc docs]: /integrations/uvc

[摄像头.zoneminder docs]: /integrations/zoneminder#摄像头

[温控.sensibo docs]: /integrations/sensibo

[config docs]: /integrations/config

[configurator docs]: /integrations/configurator/

[遮盖.lutron_caseta docs]: /integrations/lutron_caseta/

[datadog docs]: /integrations/datadog/

[device_tracker.unifi docs]: /integrations/unifi

[dweet docs]: /integrations/dweet/

[eight_sleep docs]: /integrations/eight_sleep/

[homematic docs]: /integrations/homematic/

[image_processing docs]: /integrations/image_processing

[image_processing.dlib_face_detect docs]: /integrations/dlib_face_detect

[image_processing.dlib_face_identify docs]: /integrations/dlib_face_identify

[image_processing.microsoft_face_detect docs]: /integrations/microsoft_face_detect

[image_processing.microsoft_face_identify docs]: /integrations/microsoft_face_identify

[image_processing.openalpr_cloud docs]: /integrations/openalpr_cloud

[image_processing.openalpr_local docs]: /integrations/openalpr_local

[image_processing.opencv docs]: /integrations/opencv

[image_processing.seven_segments docs]: /integrations/seven_segments

[kira docs]: /integrations/kira/

[灯光 docs]: /integrations/灯光

[灯光.blinksticklight docs]: /integrations/blinksticklight

[灯光.enocean docs]: /integrations/enocean#灯光

[灯光.flux_led docs]: /integrations/flux_led

[灯光.insteon_local docs]: /integrations/insteon/

[灯光.insteon_plm docs]: /integrations/insteon/

[灯光.isy994 docs]: /integrations/isy994

[灯光.lifx docs]: /integrations/lifx

[灯光.limitlessled docs]: /integrations/limitlessled

[灯光.mystrom docs]: /integrations/mystrom#灯光

[灯光.osramlightify docs]: /integrations/osramlightify

[灯光.tradfri docs]: /integrations/tradfri

[logbook docs]: /integrations/logbook/

[lutron_caseta docs]: /integrations/lutron_caseta/

[媒体播放器.denonavr docs]: /integrations/denonavr/

[媒体播放器.kodi docs]: /integrations/kodi

[媒体播放器.onkyo docs]: /integrations/onkyo

[媒体播放器.roku docs]: /integrations/roku#media-player

[媒体播放器.sonos docs]: /integrations/sonos

[媒体播放器.spotify docs]: /integrations/spotify

[microsoft_face docs]: /integrations/microsoft_face/

[通知.html5 docs]: /integrations/html5

[通知.sendgrid docs]: /integrations/sendgrid

[通知.smtp docs]: /integrations/smtp

[通知.telegram docs]: /integrations/telegram

[plant docs]: /integrations/plant/

[raspihats docs]: /integrations/raspihats/

[遥控器.kira docs]: /integrations/kira

[rflink docs]: /integrations/rflink/

[rpi_pfio docs]: /integrations/rpi_pfio/

[传感器.blink docs]: /integrations/blink

[传感器.dweet docs]: /integrations/dweet#传感器

[传感器.envirophat docs]: /integrations/envirophat

[传感器.file docs]: /integrations/file#传感器

[传感器.influxdb docs]: /integrations/influxdb#传感器

[传感器.kira docs]: /integrations/kira

[传感器.miflora docs]: /integrations/miflora

[传感器.modem_callerid docs]: /integrations/modem_callerid

[传感器.nzbget docs]: /integrations/nzbget

[传感器.scrape docs]: /integrations/scrape

[传感器.snmp docs]: /integrations/snmp#传感器

[传感器.wunderground docs]: /integrations/wunderground

[sun docs]: /integrations/sun/

[开关.rpi_pfio docs]: /integrations/rpi_pfio#开关

[telegram_bot docs]: /integrations/telegram_bot/

[telegram_bot.polling docs]: /integrations/telegram_polling

[telegram_bot.服务.yaml docs]: /integrations/telegram_bot/#通知-服务

[telegram_bot.webhooks docs]: /integrations/telegram_webhooks

[tradfri docs]: /integrations/tradfri/

[vera docs]: /integrations/vera/

[websocket_api docs]: /integrations/websocket_api/

[zwave docs]: /integrations/zwave/

[zwave.api docs]: /integrations/zwave/

[forum]: https://community.home-assistant.io/

[issue]: https://github.com/home-assistant/home-assistant/issues

[#7673]: https://github.com/home-assistant/home-assistant/pull/7673

[#7683]: https://github.com/home-assistant/home-assistant/pull/7683

[#7689]: https://github.com/home-assistant/home-assistant/pull/7689

[#7714]: https://github.com/home-assistant/home-assistant/pull/7714

[@cgtobi]: https://github.com/cgtobi

[@tobygray]: https://github.com/tobygray

[device_tracker.ubus docs]: /integrations/ubus

[hassio docs]: /integrations/hassio/

[媒体播放器.volumio docs]: /integrations/volumio

[telegram_bot docs]: /integrations/telegram_bot/

[discord]: https://discord.gg/c5DvZ4e
