---
author: Martin Hjelmare
authorURL: https://github.com/MartinHjelmare
authorTwitter: MartinHjelmare
title: "选择支持手动移除设备"
---

在 Home Assistant Core 2022.3 版本中，[Erik Montnemery](https://github.com/emontnemery) 添加了[支持](https://github.com/home-assistant/core/pull/66188)，允许任何集成选择（opt in）在 Home Assistant 界面的设备页面上显示"删除设备"按钮。

请参阅我们的[开发者文档](/developers/device_registry_index#removing-devices)了解如何在集成中实现此功能。

到目前为止，已有五个集成选择加入了此功能：

- [Google Cast](https://github.com/home-assistant/core/pull/66808)
- [MQTT](https://github.com/home-assistant/core/pull/66766)
- [MySensors](https://github.com/home-assistant/core/pull/67128)
- [RFXCOM RFXtrx](https://github.com/home-assistant/core/pull/58252)
- [Tasmota](https://github.com/home-assistant/core/pull/66811)

## 为什么需要这个功能？

在此功能添加之前，建议集成自动清理 config entry 中的过时设备。但并非所有集成都能自动确定设备是否应被移除，因此在某些情况下仍需要一种让用户自行选择的手动选项。

为满足此需求，一些集成实现了一个集成特定的 websocket command 并附带前端支持，以允许手动移除设备。有了这个新功能，集成不再需要添加任何 websocket 或前端代码，只需实现后端回调函数即可支持手动设备移除。

Happy days!
