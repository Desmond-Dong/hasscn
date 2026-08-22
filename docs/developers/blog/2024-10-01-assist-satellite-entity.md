---
author: Michael Hansen
authorURL: https://github.com/synesthesiam
authorImageURL: /img/profile/mike_hansen.png
authorTwitter: rhasspy
title: "介绍 Assist satellite 实体"
---

用户通常通过远程语音 satellite 与 [Assist](https://www.home-assistant.io/voice_control/) 进行交互，例如运行 ESPHome 的 [ESP32-S3-BOX-3](https://www.home-assistant.io/voice_control/s3_box_voice_assistant/)、运行 VoIP 的[模拟电话](https://www.home-assistant.io/voice_control/worlds-most-private-voice-assistant/)等。管理这些 satellite 的集成使用了临时的 `binary_sensor` 和 `select` 实体，以允许用户配置 satellite 的[pipeline](/developers/voice/pipelines)、基于 pipeline state 进行自动化等。

新的 [`AssistSatelliteEntity`](/developers/core/entity/assist-satellite) 提供了一个表示语音 satellite 的 entity。它的 state 会跟随底层的 Assist pipeline，从而便于自动化。此外：

* 新增了一个 [announce action](https://home-assistant.io/integrations/assist_satellite#action-assist_satelliteannounce)，可用于在支持的设备上进行广播。
* 还新增了几个 [websocket 命令](/developers/core/entity/assist-satellite#websocket-api)，提供了一种统一的方式来获取和设置设备上的活动唤醒词。

`esphome` 和 `voip` 集成已经迁移到使用 `AssistSatelliteEntity`，`wyoming` 集成将紧随其后。