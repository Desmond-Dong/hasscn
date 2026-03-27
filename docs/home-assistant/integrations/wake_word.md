---
title: Wake-word detection
description: '唤醒词检测实体可让其他集成或应用在流式音频中检测唤醒词。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Voice
ha_release: '2023.9'
ha_codeowners:
  - '@home-assistant/core'
  - '@synesthesiam'
ha_domain: wake_word
ha_integration_type: entity
ha_quality_scale: internal
---
# Wake-word detection

唤醒词检测实体可让其他集成或应用在流式音频中检测唤醒词。

唤醒词检测实体无法手动实现，但可以由 [Wyoming](/home-assistant/integrations/wyoming) 等集成提供。[Assist Pipelines](https://developers.home-assistant.io/docs/voice/pipelines/) 中的 API 可将唤醒词检测作为 [Assist](/home-assistant/voice_control/) 的一部分启用。

:::note Building block integration
This wake-word detection is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this wake-word detection building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the wake-word detection building block offers.
:::

## 唤醒词检测实体的状态

唤醒词检测实体的状态是一个时间戳，用于显示上次检测到唤醒词的日期和时间。

<p class='img'>
<img src='/home-assistant/images/integrations/wake_word/state_wake-word.png' alt='Screenshot showing the state of a wake word detection entity in the developer tools' />
在开发者工具中显示唤醒词检测实体状态的屏幕截图。
</p>

此外，实体还可能具有以下状态：

- **Unavailable**：实体当前不可用。
- **Unknown**：状态尚未知晓。
