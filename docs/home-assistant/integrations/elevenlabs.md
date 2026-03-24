---
title: ElevenLabs
description: 关于如何为 Home Assistant 设置 ElevenLabs 文字转语音的说明。
ha_category:
  - Text-to-speech
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_domain: elevenlabs
ha_platforms:
  - stt
  - tts
ha_config_flow: true
ha_integration_type: service
ha_codeowners:
  - '@sorgfresser'
---

**ElevenLabs** 集成添加了对 [ElevenLabs](https://elevenlabs.io/) 的支持，作为文字转语音来使用自然声音朗读文本，以及语音转文字来将语音转换为文本。

## 前提条件

- 您需要一个 ElevenLabs 账户才能使用此集成。免费账户足以满足基本使用。
- 对于自定义声音或更多配额，您需要订阅。
- 您需要从 ElevenLabs 网站获取 API 密钥。
- 您的 API 密钥需要以下权限：
  - 文字转语音
  - 语音转文字
  - 声音（只读）
  - 模型（只读）


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 文字转语音

有关可以使用哪些语言的概述，请查看[支持语言的完整列表](https://elevenlabs.io/languages)。

有关可以使用哪些声音的描述，请查看您的 VoiceLab 声音。

要查看可用的模型及其优势，请查看[模型文档](https://elevenlabs.io/docs/speech-synthesis/models)。

### 语音转文字

支持语言的概述可在[支持语言的完整列表](https://elevenlabs.io/docs/capabilities/speech-to-text#supported-languages)中找到。

模型及其功能的列表可在[模型文档](https://elevenlabs.io/docs/capabilities/speech-to-text#models)中确定。

## 动作 speak

`tts.speak` 动作是使用 TTS 的现代方式。添加 `speak` 动作，选择您的 ElevenLabs TTS 实体（默认命名为 ElevenLabs），选择要发送 TTS 音频的媒体播放器实体或组，然后输入要朗读的消息。

有关 `speak` 的更多选项，请参阅主要 [TTS](/home-assistant/integrations/tts/#service-speak) 构建块页面上的 Speak 部分。

在 YAML 中，您的动作将如下所示：

```yaml
action: tts.speak
target:
  entity_id: tts.elevenlabs
data:
  media_player_entity_id: media_player.giant_tv
  message: Hello, can you hear me now?
  options:
    voice: <voice-id>
    model: <model-id>
```

### 配置

以下设置可以在集成的选项和 `tts.speak` 服务的 `options` 参数中配置。

```yaml
voice:
  description: "要使用的 ElevenLabs 声音的声音 ID。将覆盖实体的默认声音！"
  required: false
  type: string
model:
  description: "要使用的文字转语音模型的模型 ID。将覆盖实体的默认模型！"
  required: false
  type: string
Speech-to-text model:
  description: "要使用的语音转文字模型的模型 ID。将覆盖实体的默认模型！"
  required: false
  type: string
Auto-detect language:
  description: "语音转文字是否应自动检测所说的语言，覆盖语音助手中选择的语言！"
  required: false
  type: boolean
  default: false
```

有关在 Home Assistant 中使用文字转语音的更多信息及其提供的所有选项的更多详细信息，请参阅 [TTS 文档](/home-assistant/integrations/tts/)。

有关在 Home Assistant 中使用语音转文字的更多信息及其提供的所有选项的更多详细信息，请参阅 [STT 文档](/home-assistant/integrations/stt/)。

## 移除集成

此集成遵循标准集成移除流程。不需要额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.