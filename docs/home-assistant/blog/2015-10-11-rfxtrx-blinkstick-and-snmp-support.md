---
title: '0.7.5: Blinkstick, SNMP, Telegram'
description: Home Assistant 0.7.5 has been released with support for RFXtrx, Blinkstick,
  SNMP and Telegram.
---

我们发现了两个足够烦人的问题，因此决定发布 0.7.5：

- Home Assistant 安装包中未包含 CloudMQTT 证书
- 核心中的一个 bug 会在某些平台被重复加载时引发问题

这次发布也包含了一些新平台支持（因为新集成真的一直在来！）：

<img src='/home-assistant/images/supported_brands/blinkstick.png' style='border:none; box-shadow: none; float: right;' height='50' /><img src='https://brands.home-assistant.io/rfxtrx/logo.png' style='border:none; box-shadow: none; float: right; clear: right;' height='50' /><img src='/home-assistant/images/supported_brands/telegram.png' style='border:none; box-shadow: none; float: right; clear: right;' height='50' />

 - 灯光: [blinkstick platform](/home-assistant/integrations/blinksticklight) added ([@alanbowman](https://github.com/alanbowman))
 - 设备 Tracker: [SNMP platform](/home-assistant/integrations/snmp) added ([@tomduijf](https://github.com/tomduijf))
 - 灯光: [rfxtrx platform](/home-assistant/integrations/rfxtrx#灯光) added ([@badele](https://github.com/badele))
 - 开关: [rfxtrx platform](/home-assistant/integrations/rfxtrx#开关) added ([@badele](https://github.com/badele))
 - 通知: [telegram platform](/home-assistant/integrations/telegram) added ([@fabaff](https://github.com/fabaff))

此外，[@maddox](https://github.com/maddox) 扩展了媒体播放器功能，支持 `play media` 命令，该功能已在 [iTunes platform](/home-assistant/integrations/itunes) 中实现。
