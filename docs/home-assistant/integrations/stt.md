---
title: Speech-to-text (STT)
description: '语音转文本（STT）实体允许其他集成或应用将语音数据流发送到 STT API，并返回文本结果。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: '0.102'
ha_codeowners:
  - '@home-assistant/core'
ha_domain: stt
ha_quality_scale: internal
ha_category: []
ha_integration_type: entity
related:
  - url: https://support.nabucasa.com/hc/articles/29718084245149
    title: Nabu Casa Cloud speech-to-text service
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Setting up a Nabu Casa Cloud voice assistant
  - docs: /voice_control/voice_remote_local_assistant/
    title: Setting up a local voice assistant
  - docs: /voice_control/builtin_sentences/
    title: Supported sentences to use with Assist
  - docs: /integrations/?cat=speech-to-text
    title: Integrations that use the speech-to-text integration
---
# Speech-to-text (STT)

语音转文本（STT）实体允许其他集成或应用将语音数据流发送到 STT API，并返回文本结果。

:::note Building block integration
This speech-to-text (stt) is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this speech-to-text (stt) building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the speech-to-text (stt) building block offers.
:::

## 语音转文本实体的状态

每个语音转文本实体都会记录其上一次被用来处理语音的时间戳。

此外，该实体还可以具有以下状态：

- **Unavailable**：实体当前不可用。
- **Unknown**：状态尚未知晓。
