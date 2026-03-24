---
title: '0.21: Improved Web and support for EnOcean, LIRC and Osram Lightify'
description: This new release of Home Assistant is lightning fast with the new web
  stack and progressive web application. On top of that a handful of new components
  and platforms for EnOcean, LIRC and Osram Lightify support.
---

现在到了发布 0.21 的时候了，这个版本包含了大量核心改进：我们用标准化的 WSGI 栈替换了自研的 HTTP 栈。这将提升性能、速度与安全性，也会让未来开发高级 HTTP 功能变得更加轻松。

这项工作由非常出色的 Josh Wright 主导。自从他开始参与以来，他的专业知识、严格标准以及对安全的坚持，持续推动 Home Assistant 显著进步。让我们为 Josh 喝彩！

好了，来看本次更新内容：

<img src='/home-assistant/images/supported_brands/enocean.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/osramlightify.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/home-assistant/images/supported_brands/lirc.gif' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

 - New HTTP stack based on WSGI ([@JshWright], [@balloob])
 - 前端: lots of performance improvements ([@balloob])
 - Initial support for EnOcean [灯光][en-灯光], [传感器][en-传感器] and [开关][en-开关] added ([@rubund])
 - 灯光: [Osram Lightify] is now supported ([@olimpiurob])
 - 灯光: [Insteon Hub] now supports brightness ([@wkonkel])
 - Add support for adding HA as Windows 10 tile ([@fabaff])
 - 条件: [time 条件] can now cross midnight ([@jaharkes])
 - 模板 based 传感器 should now throw less 警告 ([@Bart274])
 - New [LIRC component] allows receiving IR commands ([@partofthething])
 - The [Feedreader] component will now persist data to disk to prevent duplicate events ([@shaftoe])
 - Sun: azimuth 属性 added ([@fabaff])
 - New [Flux like 开关 platform] to change 灯光 intensity in the evening ([@nkgilley])
 - We no longer crash if you live in a part of the world where the sun never sets ([@balloob])
 - Rollershutter: [RFXTRX] now supported ([@jacobtomlinson])
 - 开关: [模板 开关] can now execute 脚本 ([@kellerza])
 - Z-Wave: automatically heal the network at midnight ([@infamy])
 - 传感器: [DTE Energy Bridge] now supported ([@kylehendricks])
 - Media Player: [Kodi] now supports different 关闭 commands ([@armills])

### Backward-incompatible changes

 - Our work in the WSGI stack is not fully done yet. We still have a minor issues where retrieving the 错误 日志 in the about screen can raise an encoding 错误
 - The API used to incorrectly accept a JSON body with form-url-encoded headers. Our cURL examples on the website used to be wrong and have [been updated].
 - Make sure your 配置.yaml file contains `frontend:` to serve the 前端

### Hotfixes 0.21.1 and 0.21.2

We released two hotfixes to address some issues that couldn't wait till the next 发布.

##### 0.21.1 - June 12

 - Add eventlet to base requirements to resolve some 安装 issues ([@balloob])
 - GTFS will filter out routes in the wrong direction ([@imrehg])
 - Recover from rare 错误 条件 from LIRC ([@partofthething])
 - Z-Wave autoheal will no longer raise exception ([@balloob])
 - Alexa will now execute the 脚本 before making reply ([@balloob])
 - Fix MJPEG 摄像头 streaming ([@stjohnjohnson])
 - Fix 前端 in older browsers ([@balloob])
 - Fix history in more info dialog being cut off ([@balloob])

##### 0.21.2 - June 15

 - Fix input_select calling the set_option 服务 again when changed ([@persandstrom])
 - Fix more info dialog not being able to open on Safari ([@balloob])
 - Add support for OPTIONS HTTP command to get CORS working ([@JshWright])

[@stjohnjohnson]: https://github.com/stjohnjohnson
[@imrehg]: https://github.com/imrehg
[@persandstrom]: https://github.com/persandstrom
[@armills]: https://github.com/armills
[@balloob]: https://github.com/balloob
[@Bart274]: https://github.com/Bart274
[@fabaff]: https://github.com/fabaff
[@infamy]: https://github.com/infamy
[@jacobtomlinson]: https://github.com/jacobtomlinson
[@jaharkes]: https://github.com/jaharkes
[@JshWright]: https://github.com/JshWright
[@kellerza]: https://github.com/kellerza
[@kylehendricks]: https://github.com/kylehendricks
[@nkgilley]: https://github.com/nkgilley
[@olimpiurob]: https://github.com/olimpiurob
[@partofthething]: https://github.com/partofthething
[@rubund]: https://github.com/rubund
[@shaftoe]: https://github.com/shaftoe
[@wkonkel]: https://github.com/wkonkel
[DTE Energy Bridge]: /integrations/dte_energy_bridge
[en-灯光]: /integrations/enocean#灯光
[en-传感器]: /integrations/enocean#传感器
[en-开关]: /integrations/enocean#开关
[Feedreader]: /integrations/feedreader/
[Flux like 开关 platform]: /integrations/flux
[Insteon Hub]: /integrations/insteon/
[Kodi]: /integrations/kodi
[LIRC component]: /integrations/lirc/
[Osram Lightify]: /integrations/osramlightify
[RFXTRX]: /integrations/rfxtrx/
[模板 开关]: /integrations/开关.模板/
[time 条件]: /getting-started/脚本-条件/#time-条件
[been updated]: /developers/rest_api/
