# Home Assistant 0.44：Zigbee、OpenCV 和 DLib

<a href='/home-assistant/integrations/#version/0.44'><img src='/home-assistant/images/blog/2017-05-0.44/components.png' style='border: 0;box-shadow: none;'></a>

这次发布带来了一些很棒的新集成。其中最大的一项，是由 [Russell Cloran][@rcloran] 带来的[原生 Zigbee 集成][zha docs]。这让 Home Assistant 可以原生控制 Philips Hue 灯光，而不再需要额外的网关！不过 IKEA Tradfri 灯光暂时还不支持，因为它实现的是不同的配置文件。

另一个很棒的新功能是由 [Teagan Glenn][@teagan42] 带来的 [OpenCV][opencv docs]。现在，你可以直接在 Home Assistant 中使用 OpenCV 的强大能力。如果 OpenCV 不是你的菜，也可以试试本次发布中由 [Pascal Vizeli][@pvizeli] 新增的 [DLib 集成][image_processing.dlib_face_identify docs]。

本次发布还包含了一个[新集成][rss_feed_template docs]，可以基于模板动态生成 RSS feed。这意味着你手机、平板或电脑上的任何 RSS 小组件，现在都可以用来展示 Home Assistant 的数据！

最后，对于在界面中使用配置面板的用户，我们修复了分组编辑器的问题。

祝你用得开心！

## 如果你需要帮助

欢迎使用我们非常活跃的 [论坛][forum]，或者加入聊天频道 [discord][discord]。发布说明虽然也开放评论，但我们更推荐你使用前面的沟通渠道。谢谢。

## 反馈问题

如果你遇到了这次发布引入的问题，请到我们的 [问题追踪器][issue] 提交反馈，并确保填写问题模板中的所有字段。

## 新集成

* Pushbullet 通知 传感器 ([@jotunacorn] - [#7182]) ([传感器.pushbullet docs])
* 新增 HTTPS 证书到期传感器 ([@fabfurnari] - [#7272]) ([传感器.cert\_expiry docs][传感器.cert_expiry docs])
* RSS feed 模板 ([@micw] - [#7032]) ([rss\_feed\_template docs][rss_feed_template docs])
* 新增 Zigbee Home Automation 支持 ([@rcloran] - [#6263]) ([zha docs]) ([binary\_sensor.zha docs][binary_sensor.zha docs]) ([灯光.zha docs]) ([传感器.zha docs]) ([开关.zha docs])
* 新增树莓派上的 Blinkt! 灯光支持 ([@imrehg] - [#7377]) ([灯光.blinkt docs])
* Plant 自动化 ([@ChristianKuehnel] - [#7131]) ([plant docs])
* 新增 Eight Sleep 组件 ([@mezz64] - [#7275]) ([eight\_sleep docs][eight_sleep docs]) ([binary\_sensor.eight\_sleep docs][binary_sensor.eight_sleep docs]) ([传感器.eight\_sleep docs][传感器.eight_sleep docs])
* OpenGarage support ([@swbradshaw] - [#7338]) ([遮盖.opengarage docs])
* Add Sensibo 温控 platform ([@andrey-git] - [#7379]) ([温控 docs])
* Pilight 二元sensor components ([@zeltom] - [#6774]) ([binary\_sensor.pilight docs][binary_sensor.pilight docs])
* Opencv ([@Teagan42] - [#7261]) ([opencv docs]) ([image\_processing.opencv docs][image_processing.opencv docs])
* Enviro pHAT ([@imrehg] - [#7427]) ([传感器.envirophat docs])
* 新增基于 dlib 的人脸识别支持 ([@pvizeli] - [#7421]) ([image\_processing.dlib\_face\_detect docs][image_processing.dlib_face_detect docs]) ([image\_processing.dlib\_face\_identify docs][image_processing.dlib_face_identify docs])

## 发布 0.44.2 - May 8

* Fix opening 插件 in Hass.io store that are not 已安装 ([@balloob])

## 发布 0.44.1 - May 7

* Fix opening 插件 in Hass.io store that are not 已安装 ([@balloob])
* 传感器.envirophat: add missing requirement ([@imrehg] - [#7451]) ([传感器.envirophat docs])
* Forecasts for 天气 underground ([@pezinek] - [#7062]) ([传感器.wunderground docs])
* 升级 pymysensors to 0.10.0 ([@MartinHjelmare] - [#7469])
* Fix plant MIN\_TEMPERATURE, MAX\_TEMPERATURE validation ([@frog32] - [#7476]) ([plant docs])
* 更新 to pyunifi 2.12 ([@finish06] - [#7468]) ([device\_tracker.unifi docs][device_tracker.unifi docs])
* MQTT 遮盖: Fixed status reporting for range with non-zero base ([@cribbstechnologies])

<!--more-->

## 不向后兼容的变更

* Python Open Z-Wave 发布了一个修复字符串处理问题的新版本，但这项修复并不向后兼容。我们已经同步更新代码，因此你需要在使用本次发布时升级到最新版 Python Open Z-Wave。你也可以再等一个版本，因为下个版本我们将加入 Python Open Z-Wave 的自动安装功能。 ([@keatontaylor] - [#7266]) ([温控.zwave docs]) (breaking change)
* InfluxDB 中用于屏蔽域的配置方式已更新，以支持更多功能。 ([@janLo] - [#7264]) (breaking change)

```yaml
# New format
influxdb:
  exclude:
    entities:
       - entity.id1
       - entity.id2
    domains:
       - automation
  include:
    entities:
       - entity.id3
       - entity.id4
```

* Automatic 设备追踪器已从轮询改为 WebSocket 推送。这需要你在 Automatic 账户中进行调整，具体请参阅文档说明。 ([@armills] - [#7404]) (breaking change)
* LimitlessLED 的色温范围已反转，以便与其他灯光平台保持一致。若要维持之前的颜色效果，你需要把 `light.turn_on` 调用中的 `color_temp` 改为 `654 - 原值`，例如 280 需要改为 374。 ([@amelchio] - [#7359]) (breaking change)
* Joao apps 现在要求所有命令都必须设置 API 密钥。 ([@nkgilley] - [#7443]) ([joaoapps\_join docs][joaoapps_join docs]) ([通知.joaoapps\_join docs][通知.joaoapps_join docs]) (breaking change)

## All changes

* LIFX 灯光 effects ([@amelchio] - [#7145]) ([灯光.lifx docs])
* HassIO API v2 ([@pvizeli] - [#7201])
* Capture and 日志 pip 安装 错误 output ([@postlund] - [#7200])
* Support xy\_color with LIFX 灯光 ([@amelchio] - [#7208]) ([灯光.lifx docs])
* 更新 ios.py ([@biacz] - [#7160])
* Fix arwn platform to 更新 hass 状态 when events are received ([@sdague] - [#7202])
* Issue 6749 updated pylgtv to 0.1.6 to fix Thread leak in asyncio loop ([@hmn] - [#7199]) ([媒体播放器.webostv docs]) ([通知.webostv docs])
* tradfri: Improve color temp support detection ([@balloob] - [#7211])
* Fix tradfri 灯光 ([@MartinHjelmare] - [#7212])
* Bump 版本 to 0.44.0.dev0 ([@fabaff] - [#7217])
* Pushbullet 通知 传感器 ([@jotunacorn] - [#7182]) ([传感器.pushbullet docs]) (new-platform)
* Zwave 遮盖 workaround for graber shades. ([@turbokongen] - [#7204]) ([遮盖.zwave docs])
* Fixed typo and clarified details for Lifx effects ([@arsaboo] - [#7226])
* Remove superfluous comments and 更新 ordering ([@fabaff] - [#7227]) ([maxcube docs]) ([binary\_sensor.maxcube docs][binary_sensor.maxcube docs]) ([温控.maxcube docs])
* lyft 传感器: re-enable Prime Time rate 属性 ([@drkp] - [#6982]) ([传感器.lyft docs])
* Bump a couple of dependencies ([@mjg59] - [#7231]) ([灯光.avion docs]) ([灯光.decora docs])
* Refactor lyft 传感器 更新 ([@armills] - [#7233]) ([传感器.lyft docs])
* LIFX: avoid "Unable to remove unknown listener" 警告 ([@amelchio] - [#7235]) ([灯光.lifx docs])
* 升级 pygatt to 3.1.1 ([@fabaff] - [#7220])
* 升级 mutagen to 1.37.0 ([@fabaff] - [#7216])
* 升级 speedtest-cli to 1.0.5 ([@fabaff] - [#7215])
* 升级 paho-MQTT to 1.2.3 ([@fabaff] - [#7214])
* 升级 aiohttp\_cors to 0.5.3 ([@fabaff] - [#7213])
* Use consts and string formatting ([@fabaff] - [#7243]) (通知.instapush docs)
* Pushed to 版本 0.4.0 of denonavr which also includes experimental support for Marantz receivers ([@scarface-4711] - [#7250])
* Add notice regarding submission of analytics ([@craftyguy] - [#7263])
* Iterating the dictionary directly ([@fabaff] - [#7251])
* Don't use len(SEQUENCE) as 条件 value ([@fabaff] - [#7249])
* Workround for wemo subscription bug. ([@pavoni] - [#7245]) ([wemo docs]) ([开关.wemo docs])
* Fix telegram webhooks ([@MartinHjelmare] - [#7236]) ([telegram\_bot docs][telegram_bot docs]) ([telegram\_bot.webhooks docs][telegram_bot.webhooks docs])
* Work around bad content-type in Hook api response ([@KlaasH] - [#7267])
* Rfxtrx 升级 lib 0.18 ([@danielhiversen] - [#7273]) ([rfxtrx docs])
* WIP: HassIO allow to access to 容器 日志. ([@pvizeli] - [#7271])
* 更新 aiolifx ([@amelchio] - [#7279]) ([灯光.lifx docs])
* Refactor matrix 通知 服务 ([@Cadair] - [#7122]) ([通知.matrix docs])
* Add support for Ukrainian Language in Google TTS ([@LvivEchoes] - [#7278])
* Add https certificate expiry 传感器 ([@fabfurnari] - [#7272]) ([传感器.cert\_expiry docs][传感器.cert_expiry docs]) (new-platform)
* Fix telegram\_polling no first\_name or last\_name ([@darookee] - [#7281]) ([telegram\_bot docs][telegram_bot docs])
* Add 脚本 to import 状态 events to InfluxDB ([@janLo] - [#7254])
* Fix HassIO bug with supervisor 更新 & 日志 ([@pvizeli] - [#7282])
* Updating ping 二元sensor with Windows support ([@patrickeasters] - [#7253]) ([binary\_sensor.ping docs][binary_sensor.ping docs])
* Fixes utf-8 encoding no longer required by python-openzwave0.3.3 ([@keatontaylor] - [#7266]) ([温控.zwave docs]) (breaking change)
* Recorder: Check for ENTITY\_ID key that contains None value ([@balloob] - [#7287]) ([recorder docs])
* 升级 pytradfri to 1.1 ([@balloob] - [#7290])
* Adding group control to tradfri 灯光 component ([@cyberjunky] - [#7248]) ([灯光.tradfri docs])
* Feature/rss feed 模板 ([@micw] - [#7032]) ([rss\_feed\_template docs][rss_feed_template docs]) (new-platform)
* Add support for Zigbee Home 自动化 ([@rcloran] - [#6263]) ([zha docs]) ([binary\_sensor.zha docs][binary_sensor.zha docs]) ([灯光.zha docs]) ([传感器.zha docs]) ([开关.zha docs]) (new-platform)
* Added 场景 controller support to the vera component, along with proper polling when a vera 设备 needs it ([@alanfischer] - [#7234]) ([vera docs]) ([传感器.vera docs])
* Don't stack up 错误 messages, fix link, and ordering ([@fabaff] - [#7291]) ([传感器.cert\_expiry docs][传感器.cert_expiry docs])
* Fix breaking SSL in test HTML5 ([@balloob] - [#7310]) ([通知.html5 docs])
* 升级 pyhomematic, extend 设备 support ([@danielperna84] - [#7303])
* Issue 7218 更新 pylgtv to 0.1.7 ([@hmn] - [#7302]) ([媒体播放器.webostv docs]) ([通知.webostv docs])
* 版本 bump of aioautomatic ([@armills] - [#7300])
* 升级 python-telegram-bot to 5.3.1 ([@fabaff] - [#7311]) ([通知.telegram docs]) ([telegram\_bot.polling docs][telegram_bot.polling docs]) ([telegram\_bot.webhooks docs][telegram_bot.webhooks docs])
* Disable Open Z-Wave in Docker ([@balloob] - [#7315])
* LIFX: use white 灯光 when setting a specific temperature ([@amelchio] - [#7256]) ([灯光.lifx docs])
* Allow InfluxDB to blacklist domains ([@janLo] - [#7264]) (breaking change)
* Hassio api v3 ([@balloob] - [#7323])
* 更新 前端 ([@balloob] - [#7324])
* Reduce color\_xy\_brightness\_to\_hsv to color\_xy\_to\_hs ([@amelchio] - [#7320]) ([灯光.hue docs]) ([灯光.lifx docs])
* Fix broken Docker build ([@turbokongen] - [#7316])
* Re-enable Open Z-Wave in Dockerfile ([@balloob] - [#7325])
* 版本 bump for automatic ([@armills] - [#7329])
* Right fix for Python Open Z-Wave in Docker ([@balloob] - [#7337])
* Use four-digits year ([@fabaff] - [#7336])
* Allow multiple recipients for SMTP 通知 ([@amelchio] - [#7319]) ([通知.smtp docs])
* Add auxheat to ecobee 温控 ([@titilambert] - [#6562]) ([温控.ecobee docs])
* Properly return self.\_unit\_of\_measurement in the unit\_of\_measurement function ([@robbiet480] - [#7341]) ([传感器.ios docs])
* Multiple changes (typo, ordering, docstrings, timeouts) ([@fabaff] - [#7343]) ([遮盖.garadget docs])
* 升级 Flux led lb to 0.19 ([@danielhiversen] - [#7352]) ([灯光.flux\_led docs][灯光.flux_led docs])
* Add 调试 logging to pyvera events. ([@pavoni] - [#7364]) ([vera docs])
* 升级 xmltodict to 0.11.0 ([@fabaff] - [#7355])
* 升级 speedtest-cli to 1.0.6 ([@fabaff] - [#7354]) ([传感器.speedtest docs])
* Remove global limit on white 灯光 temperature ([@amelchio] - [#7206]) ([灯光 docs]) ([灯光.hue docs]) ([灯光.zwave docs]) ([开关.flux docs])
* Remove 状态 property from alarmdecoder 二元sensor ([@balloob] - [#7370]) ([binary\_sensor.alarmdecoder docs][binary_sensor.alarmdecoder docs])
* Remove 二元sensor platforms implementing 状态 property ([@balloob] - [#7371]) ([binary\_sensor.octoprint docs][binary_sensor.octoprint docs]) ([binary\_sensor.workday docs][binary_sensor.workday docs])
* Feature/add mikrotik 设备 tracker ([@LvivEchoes] - [#7366])
* Netdisco now returns a dictionary while it used to be a tuple, fixed ([@JasonCarter80] - [#7350])
* Create knx.py ([@onsmam] - [#7356])
* 灯光.sensehat: plugin to control the 8x8 LED matrix on a Sense hat ([@imrehg] - [#7365])
* 更新 docstrings ([@fabaff] - [#7361]) ([ecobee docs]) ([enocean docs]) ([zha docs])
* Flux 开关: avoid updates when off ([@amelchio] - [#7363]) ([开关.flux docs])
* Zoneminder: Fixed undefined index 错误 ([@bah2830] - [#7340])
* optimize 遥控器 calls and apps on webostv 媒体播放器 ([@hmn] - [#7191]) ([媒体播放器.webostv docs])
* binary\_sensor.workday: fix handling of 状态 vs provinces ([@drkp] - [#7162]) ([binary\_sensor.workday docs][binary_sensor.workday docs])
* 升级 voluptuous to 0.10.5 ([@fabaff] - [#7107])
* Remove ordered\_dict validator ([@balloob] - [#7375])
* 灯光.blinkt: add support for Blinkt! 灯光 on 树莓派 ([@imrehg] - [#7377]) ([灯光.blinkt docs]) (new-platform)
* improve handling of flux\_led 灯光 in RGBW mode ([@wuub] - [#7221])
* Plant (replacement for MiGardener) ([@ChristianKuehnel] - [#7131]) ([plant docs]) (new-platform)
* Add support for shuffle toggling on Spotify component. ([@abmantis] - [#7339]) ([媒体播放器 docs]) ([媒体播放器.spotify docs])
* 升级 Ring to 0.1.4 ([@tchellomello] - [#7386])
* Updated docstrings ([@arsaboo] - [#7383]) ([摄像头.netatmo docs])
* Fix impulse events, added 错误 event for Homegear ([@danielperna84] - [#7349]) ([homematic docs])
* Fix YAML dump ([@balloob] - [#7388])
* Migrate updater to aiohttp ([@balloob] - [#7387]) ([updater docs])
* Remove path whitelisting for hassio ([@balloob] - [#7399])
* Add Eight sleep component ([@mezz64] - [#7275]) ([eight\_sleep docs][eight_sleep docs]) ([binary\_sensor.eight\_sleep docs][binary_sensor.eight_sleep docs]) ([传感器.eight\_sleep docs][传感器.eight_sleep docs]) (new-platform)
* OpenGarage support ([@swbradshaw] - [#7338]) ([遮盖.opengarage docs]) (new-platform)
* Clean up requirements ([@andrey-git] - [#7391]) ([传感器.dht docs]) ([传感器.thinkingcleaner docs]) ([开关.thinkingcleaner docs])
* correct MQTT subscription filter ([@amigian74] - [#7269]) ([MQTT docs])
* 更新 docstrings ([@fabaff] - [#7374])
* 灯光.blinkt: 更新 brightness control logic ([@imrehg] - [#7389])
* 更新 docstrings ([@fabaff] - [#7405])
* 更新 LIFX default color for breathe/pulse effects ([@amelchio] - [#7407])
* LIFX: Add transition option to colorloop effect ([@amelchio] - [#7410])
* 灯光.sensehat: brightness control logic 更新 ([@imrehg] - [#7409]) ([灯光.sensehat docs])
* Add Sensibo 温控 platform ([@andrey-git] - [#7379]) ([温控 docs]) (new-platform)
* Pilight 二元sensor components ([@zeltom] - [#6774]) ([binary\_sensor.pilight docs][binary_sensor.pilight docs]) (new-platform)
* applx suggested fix from issue #6573 ([@wokar] - [#7390]) ([传感器.zamg docs])
* remove charset if set in content type header ([@hmn] - [#7411]) ([媒体播放器 docs])
* Convert automatic 设备 tracker to push updates ([@armills] - [#7404]) (breaking change)
* 灯光.piglow 更新 ([@imrehg] - [#7408]) ([灯光.piglow docs])
* Opencv ([@Teagan42] - [#7261]) ([opencv docs]) ([image\_processing.opencv docs][image_processing.opencv docs]) (new-platform)
* Fixed extra R in variable name. ([@cyberplant] - [#7418])
* 更新 docstrings ([@fabaff] - [#7420])
* ps - fix opencv ([@balloob] - [#7419])
* Comment out opencv-python that is not installable on arm ([@andrey-git] - [#7426])
* Reverse limitlessled color\_temp range ([@amelchio] - [#7359]) (breaking change)
* Guard against no content type ([@balloob] - [#7432]) ([媒体播放器 docs])
* wsock.send\_json is a coroutine ([@balloob] - [#7433])
* ps - fix websocket yielding pt2 ([@balloob] - [#7434])
* 升级 temperusb to 1.5.3 ([@fabaff] - [#7428])
* 更新 for pypi ([@nkgilley] - [#7430])
* Add new 传感器: Enviro pHAT ([@imrehg] - [#7427]) ([传感器.envirophat docs]) (new-platform)
* Added osramlightify groups. ([@deisi] - [#7376]) ([灯光.osramlightify docs])
* Add support for face recognition with dlib ([@pvizeli] - [#7421]) ([image\_processing.dlib\_face\_detect docs][image_processing.dlib_face_detect docs]) ([image\_processing.dlib\_face\_identify docs][image_processing.dlib_face_identify docs]) ([image\_processing.microsoft\_face\_detect docs][image_processing.microsoft_face_detect docs]) (new-platform)
* Replace pymailgun with pymailgunner ([@pschmitt] - [#7436]) ([通知.mailgun docs])
* Suppress 日志 when octorpint goes offline ([@w1ll1am23] - [#7441]) ([octoprint docs])
* 更新 join ([@nkgilley] - [#7443]) ([joaoapps\_join docs][joaoapps_join docs]) ([通知.joaoapps\_join docs][通知.joaoapps_join docs]) (breaking change)
* Bump pyvera 版本 - handle malformed json replies in poll Thread. ([@pavoni] - [#7440]) ([vera docs])
* Fix for broken virtual keys ([@danielperna84] - [#7439]) ([homematic docs])
* Get new token to keep pubnub updates working ([@w1ll1am23] - [#7437]) ([wink docs])
* Add hass to rfxtrx object ([@danielhiversen] - [#6844])
* 传感器.envirophat: add missing requirement ([@imrehg] - [#7451]) ([传感器.envirophat docs])

[#6263]: https://github.com/home-assistant/home-assistant/pull/6263

[#6562]: https://github.com/home-assistant/home-assistant/pull/6562

[#6774]: https://github.com/home-assistant/home-assistant/pull/6774

[#6844]: https://github.com/home-assistant/home-assistant/pull/6844

[#6982]: https://github.com/home-assistant/home-assistant/pull/6982

[#7032]: https://github.com/home-assistant/home-assistant/pull/7032

[#7107]: https://github.com/home-assistant/home-assistant/pull/7107

[#7122]: https://github.com/home-assistant/home-assistant/pull/7122

[#7131]: https://github.com/home-assistant/home-assistant/pull/7131

[#7145]: https://github.com/home-assistant/home-assistant/pull/7145

[#7160]: https://github.com/home-assistant/home-assistant/pull/7160

[#7162]: https://github.com/home-assistant/home-assistant/pull/7162

[#7182]: https://github.com/home-assistant/home-assistant/pull/7182

[#7191]: https://github.com/home-assistant/home-assistant/pull/7191

[#7199]: https://github.com/home-assistant/home-assistant/pull/7199

[#7200]: https://github.com/home-assistant/home-assistant/pull/7200

[#7201]: https://github.com/home-assistant/home-assistant/pull/7201

[#7202]: https://github.com/home-assistant/home-assistant/pull/7202

[#7204]: https://github.com/home-assistant/home-assistant/pull/7204

[#7206]: https://github.com/home-assistant/home-assistant/pull/7206

[#7208]: https://github.com/home-assistant/home-assistant/pull/7208

[#7211]: https://github.com/home-assistant/home-assistant/pull/7211

[#7212]: https://github.com/home-assistant/home-assistant/pull/7212

[#7213]: https://github.com/home-assistant/home-assistant/pull/7213

[#7214]: https://github.com/home-assistant/home-assistant/pull/7214

[#7215]: https://github.com/home-assistant/home-assistant/pull/7215

[#7216]: https://github.com/home-assistant/home-assistant/pull/7216

[#7217]: https://github.com/home-assistant/home-assistant/pull/7217

[#7220]: https://github.com/home-assistant/home-assistant/pull/7220

[#7221]: https://github.com/home-assistant/home-assistant/pull/7221

[#7226]: https://github.com/home-assistant/home-assistant/pull/7226

[#7227]: https://github.com/home-assistant/home-assistant/pull/7227

[#7231]: https://github.com/home-assistant/home-assistant/pull/7231

[#7233]: https://github.com/home-assistant/home-assistant/pull/7233

[#7234]: https://github.com/home-assistant/home-assistant/pull/7234

[#7235]: https://github.com/home-assistant/home-assistant/pull/7235

[#7236]: https://github.com/home-assistant/home-assistant/pull/7236

[#7243]: https://github.com/home-assistant/home-assistant/pull/7243

[#7245]: https://github.com/home-assistant/home-assistant/pull/7245

[#7248]: https://github.com/home-assistant/home-assistant/pull/7248

[#7249]: https://github.com/home-assistant/home-assistant/pull/7249

[#7250]: https://github.com/home-assistant/home-assistant/pull/7250

[#7251]: https://github.com/home-assistant/home-assistant/pull/7251

[#7253]: https://github.com/home-assistant/home-assistant/pull/7253

[#7254]: https://github.com/home-assistant/home-assistant/pull/7254

[#7256]: https://github.com/home-assistant/home-assistant/pull/7256

[#7261]: https://github.com/home-assistant/home-assistant/pull/7261

[#7263]: https://github.com/home-assistant/home-assistant/pull/7263

[#7264]: https://github.com/home-assistant/home-assistant/pull/7264

[#7266]: https://github.com/home-assistant/home-assistant/pull/7266

[#7267]: https://github.com/home-assistant/home-assistant/pull/7267

[#7269]: https://github.com/home-assistant/home-assistant/pull/7269

[#7271]: https://github.com/home-assistant/home-assistant/pull/7271

[#7272]: https://github.com/home-assistant/home-assistant/pull/7272

[#7273]: https://github.com/home-assistant/home-assistant/pull/7273

[#7275]: https://github.com/home-assistant/home-assistant/pull/7275

[#7278]: https://github.com/home-assistant/home-assistant/pull/7278

[#7279]: https://github.com/home-assistant/home-assistant/pull/7279

[#7281]: https://github.com/home-assistant/home-assistant/pull/7281

[#7282]: https://github.com/home-assistant/home-assistant/pull/7282

[#7287]: https://github.com/home-assistant/home-assistant/pull/7287

[#7290]: https://github.com/home-assistant/home-assistant/pull/7290

[#7291]: https://github.com/home-assistant/home-assistant/pull/7291

[#7300]: https://github.com/home-assistant/home-assistant/pull/7300

[#7302]: https://github.com/home-assistant/home-assistant/pull/7302

[#7303]: https://github.com/home-assistant/home-assistant/pull/7303

[#7310]: https://github.com/home-assistant/home-assistant/pull/7310

[#7311]: https://github.com/home-assistant/home-assistant/pull/7311

[#7315]: https://github.com/home-assistant/home-assistant/pull/7315

[#7316]: https://github.com/home-assistant/home-assistant/pull/7316

[#7319]: https://github.com/home-assistant/home-assistant/pull/7319

[#7320]: https://github.com/home-assistant/home-assistant/pull/7320

[#7323]: https://github.com/home-assistant/home-assistant/pull/7323

[#7324]: https://github.com/home-assistant/home-assistant/pull/7324

[#7325]: https://github.com/home-assistant/home-assistant/pull/7325

[#7329]: https://github.com/home-assistant/home-assistant/pull/7329

[#7336]: https://github.com/home-assistant/home-assistant/pull/7336

[#7337]: https://github.com/home-assistant/home-assistant/pull/7337

[#7338]: https://github.com/home-assistant/home-assistant/pull/7338

[#7339]: https://github.com/home-assistant/home-assistant/pull/7339

[#7340]: https://github.com/home-assistant/home-assistant/pull/7340

[#7341]: https://github.com/home-assistant/home-assistant/pull/7341

[#7343]: https://github.com/home-assistant/home-assistant/pull/7343

[#7349]: https://github.com/home-assistant/home-assistant/pull/7349

[#7350]: https://github.com/home-assistant/home-assistant/pull/7350

[#7352]: https://github.com/home-assistant/home-assistant/pull/7352

[#7354]: https://github.com/home-assistant/home-assistant/pull/7354

[#7355]: https://github.com/home-assistant/home-assistant/pull/7355

[#7356]: https://github.com/home-assistant/home-assistant/pull/7356

[#7359]: https://github.com/home-assistant/home-assistant/pull/7359

[#7361]: https://github.com/home-assistant/home-assistant/pull/7361

[#7363]: https://github.com/home-assistant/home-assistant/pull/7363

[#7364]: https://github.com/home-assistant/home-assistant/pull/7364

[#7365]: https://github.com/home-assistant/home-assistant/pull/7365

[#7366]: https://github.com/home-assistant/home-assistant/pull/7366

[#7370]: https://github.com/home-assistant/home-assistant/pull/7370

[#7371]: https://github.com/home-assistant/home-assistant/pull/7371

[#7374]: https://github.com/home-assistant/home-assistant/pull/7374

[#7375]: https://github.com/home-assistant/home-assistant/pull/7375

[#7376]: https://github.com/home-assistant/home-assistant/pull/7376

[#7377]: https://github.com/home-assistant/home-assistant/pull/7377

[#7379]: https://github.com/home-assistant/home-assistant/pull/7379

[#7383]: https://github.com/home-assistant/home-assistant/pull/7383

[#7386]: https://github.com/home-assistant/home-assistant/pull/7386

[#7387]: https://github.com/home-assistant/home-assistant/pull/7387

[#7388]: https://github.com/home-assistant/home-assistant/pull/7388

[#7389]: https://github.com/home-assistant/home-assistant/pull/7389

[#7390]: https://github.com/home-assistant/home-assistant/pull/7390

[#7391]: https://github.com/home-assistant/home-assistant/pull/7391

[#7399]: https://github.com/home-assistant/home-assistant/pull/7399

[#7404]: https://github.com/home-assistant/home-assistant/pull/7404

[#7405]: https://github.com/home-assistant/home-assistant/pull/7405

[#7407]: https://github.com/home-assistant/home-assistant/pull/7407

[#7408]: https://github.com/home-assistant/home-assistant/pull/7408

[#7409]: https://github.com/home-assistant/home-assistant/pull/7409

[#7410]: https://github.com/home-assistant/home-assistant/pull/7410

[#7411]: https://github.com/home-assistant/home-assistant/pull/7411

[#7418]: https://github.com/home-assistant/home-assistant/pull/7418

[#7419]: https://github.com/home-assistant/home-assistant/pull/7419

[#7420]: https://github.com/home-assistant/home-assistant/pull/7420

[#7421]: https://github.com/home-assistant/home-assistant/pull/7421

[#7426]: https://github.com/home-assistant/home-assistant/pull/7426

[#7427]: https://github.com/home-assistant/home-assistant/pull/7427

[#7428]: https://github.com/home-assistant/home-assistant/pull/7428

[#7430]: https://github.com/home-assistant/home-assistant/pull/7430

[#7432]: https://github.com/home-assistant/home-assistant/pull/7432

[#7433]: https://github.com/home-assistant/home-assistant/pull/7433

[#7434]: https://github.com/home-assistant/home-assistant/pull/7434

[#7436]: https://github.com/home-assistant/home-assistant/pull/7436

[#7437]: https://github.com/home-assistant/home-assistant/pull/7437

[#7439]: https://github.com/home-assistant/home-assistant/pull/7439

[#7440]: https://github.com/home-assistant/home-assistant/pull/7440

[#7441]: https://github.com/home-assistant/home-assistant/pull/7441

[#7443]: https://github.com/home-assistant/home-assistant/pull/7443

[#7451]: https://github.com/home-assistant/home-assistant/pull/7451

[@Cadair]: https://github.com/Cadair

[@ChristianKuehnel]: https://github.com/ChristianKuehnel

[@JasonCarter80]: https://github.com/JasonCarter80

[@JshWright]: https://github.com/JshWright

[@KlaasH]: https://github.com/KlaasH

[@LvivEchoes]: https://github.com/LvivEchoes

[@MartinHjelmare]: https://github.com/MartinHjelmare

[@Teagan42]: https://github.com/Teagan42

[@abmantis]: https://github.com/abmantis

[@alanfischer]: https://github.com/alanfischer

[@amelchio]: https://github.com/amelchio

[@amigian74]: https://github.com/amigian74

[@andrey-git]: https://github.com/andrey-git

[@armills]: https://github.com/armills

[@arsaboo]: https://github.com/arsaboo

[@bah2830]: https://github.com/bah2830

[@balloob]: https://github.com/balloob

[@biacz]: https://github.com/biacz

[@craftyguy]: https://github.com/craftyguy

[@cribbstechnologies]: https://github.com/cribbstechnologies

[@cyberjunky]: https://github.com/cyberjunky

[@cyberplant]: https://github.com/cyberplant

[@danielhiversen]: https://github.com/danielhiversen

[@danielperna84]: https://github.com/danielperna84

[@darookee]: https://github.com/darookee

[@deisi]: https://github.com/deisi

[@drkp]: https://github.com/drkp

[@fabaff]: https://github.com/fabaff

[@fabfurnari]: https://github.com/fabfurnari

[@hmn]: https://github.com/hmn

[@imrehg]: https://github.com/imrehg

[@janLo]: https://github.com/janLo

[@jotunacorn]: https://github.com/jotunacorn

[@keatontaylor]: https://github.com/keatontaylor

[@mezz64]: https://github.com/mezz64

[@micw]: https://github.com/micw

[@mjg59]: https://github.com/mjg59

[@nkgilley]: https://github.com/nkgilley

[@onsmam]: https://github.com/onsmam

[@patrickeasters]: https://github.com/patrickeasters

[@pavoni]: https://github.com/pavoni

[@postlund]: https://github.com/postlund

[@pschmitt]: https://github.com/pschmitt

[@pvizeli]: https://github.com/pvizeli

[@rcloran]: https://github.com/rcloran

[@robbiet480]: https://github.com/robbiet480

[@scarface-4711]: https://github.com/scarface-4711

[@sdague]: https://github.com/sdague

[@swbradshaw]: https://github.com/swbradshaw

[@tchellomello]: https://github.com/tchellomello

[@titilambert]: https://github.com/titilambert

[@turbokongen]: https://github.com/turbokongen

[@w1ll1am23]: https://github.com/w1ll1am23

[@wokar]: https://github.com/wokar

[@wuub]: https://github.com/wuub

[@zeltom]: https://github.com/zeltom

[binary_sensor.alarmdecoder docs]: /integrations/alarmdecoder

[binary_sensor.eight_sleep docs]: /integrations/eight_sleep

[binary_sensor.maxcube docs]: /integrations/maxcube

[binary_sensor.octoprint docs]: /integrations/octoprint#binary-传感器

[binary_sensor.pilight docs]: /integrations/pilight#binary-传感器

[binary_sensor.ping docs]: /integrations/ping#binary-传感器

[binary_sensor.workday docs]: /integrations/workday

[binary_sensor.zha docs]: /integrations/zha

[摄像头.netatmo docs]: /integrations/netatmo#摄像头

[温控 docs]: /integrations/温控/

[温控.ecobee docs]: /integrations/ecobee

[温控.maxcube docs]: /integrations/maxcube

[温控.zwave docs]: /integrations/zwave#温控

[遮盖.garadget docs]: /integrations/garadget

[遮盖.opengarage docs]: /integrations/opengarage

[遮盖.zwave docs]: /integrations/zwave#遮盖

[device_tracker.zha docs]: /integrations/device_tracker.zha/

[ecobee docs]: /integrations/ecobee/

[eight_sleep docs]: /integrations/eight_sleep/

[enocean docs]: /integrations/enocean/

[homematic docs]: /integrations/homematic/

[image_processing.dlib_face_detect docs]: /integrations/dlib_face_detect

[image_processing.dlib_face_identify docs]: /integrations/dlib_face_identify

[image_processing.microsoft_face_detect docs]: /integrations/microsoft_face_detect

[image_processing.opencv docs]: /integrations/opencv

[joaoapps_join docs]: /integrations/joaoapps_join/

[灯光 docs]: /integrations/灯光/

[灯光.avion docs]: /integrations/avion

[灯光.blinkt docs]: /integrations/blinkt

[灯光.decora docs]: /integrations/decora

[灯光.flux_led docs]: /integrations/flux_led

[灯光.hue docs]: /integrations/hue

[灯光.lifx docs]: /integrations/lifx

[灯光.osramlightify docs]: /integrations/osramlightify

[灯光.piglow docs]: /integrations/piglow

[灯光.sensehat docs]: /integrations/sensehat#灯光

[灯光.tradfri docs]: /integrations/tradfri

[灯光.zha docs]: /integrations/zha

[灯光.zwave docs]: /integrations/zwave

[maxcube docs]: /integrations/maxcube/

[媒体播放器 docs]: /integrations/媒体播放器/

[媒体播放器.spotify docs]: /integrations/spotify

[媒体播放器.webostv docs]: /integrations/webostv#media-player

[MQTT docs]: /integrations/MQTT/

[通知.html5 docs]: /integrations/html5

[通知.joaoapps_join docs]: /integrations/joaoapps_join

[通知.mailgun docs]: /integrations/mailgun

[通知.matrix docs]: /integrations/matrix/#通知

[通知.smtp docs]: /integrations/smtp

[通知.telegram docs]: /integrations/telegram

[通知.webostv docs]: /integrations/webostv

[octoprint docs]: /integrations/octoprint/

[opencv docs]: /integrations/opencv/

[plant docs]: /integrations/plant/

[recorder docs]: /integrations/recorder/

[rfxtrx docs]: /integrations/rfxtrx/

[rss_feed_template docs]: /integrations/rss_feed_template/

[传感器.cert_expiry docs]: /integrations/cert_expiry

[传感器.dht docs]: /integrations/dht

[传感器.eight_sleep docs]: /integrations/eight_sleep

[传感器.envirophat docs]: /integrations/envirophat

[传感器.ios docs]: /integrations/传感器.ios/

[传感器.lyft docs]: /integrations/lyft

[传感器.pushbullet docs]: /integrations/pushbullet#传感器

[传感器.speedtest docs]: /integrations/speedtestdotnet

[传感器.thinkingcleaner docs]: /integrations/thinkingcleaner#传感器

[传感器.vera docs]: /integrations/vera#传感器

[传感器.zamg docs]: /integrations/zamg#传感器

[传感器.zha docs]: /integrations/zha

[开关.flux docs]: /integrations/flux

[开关.thinkingcleaner docs]: /integrations/thinkingcleaner#开关

[开关.wemo docs]: /integrations/wemo

[开关.zha docs]: /integrations/zha

[telegram_bot docs]: /integrations/telegram_bot/

[telegram_bot.polling docs]: /integrations/telegram_polling

[telegram_bot.webhooks docs]: /integrations/telegram_webhooks

[updater docs]: /integrations/updater/

[vera docs]: /integrations/vera/

[wemo docs]: /integrations/wemo/

[wink docs]: /integrations/wink/

[zha docs]: /integrations/zha/

[forum]: https://community.home-assistant.io/

[issue]: https://github.com/home-assistant/home-assistant/issues

[#7062]: https://github.com/home-assistant/home-assistant/pull/7062

[#7468]: https://github.com/home-assistant/home-assistant/pull/7468

[#7469]: https://github.com/home-assistant/home-assistant/pull/7469

[#7476]: https://github.com/home-assistant/home-assistant/pull/7476

[@finish06]: https://github.com/finish06

[@frog32]: https://github.com/frog32

[@pezinek]: https://github.com/pezinek

[device_tracker.unifi docs]: /integrations/unifi

[传感器.wunderground docs]: /integrations/wunderground

[discord]: https://discord.gg/c5DvZ4e
