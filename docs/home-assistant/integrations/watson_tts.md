---
title: IBM Watson TTS
description: 关于如何在 Home Assistant 中设置 IBM Watson TTS 的说明。
ha_category:
  - Text-to-speech
ha_release: 0.94
ha_iot_class: Cloud Push
ha_codeowners:
  - '@rutkai'
ha_domain: watson_tts
ha_platforms:
  - tts
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**IBM Watson TTS** 文本转语音集成可与 [IBM Watson Cloud](https://www.ibm.com/watson/services/text-to-speech/) 配合使用，生成语音输出。
Watson 是 IBM Cloud 提供的付费服务，但也有一个不错的[免费层级](https://www.ibm.com/cloud/watson-text-to-speech/pricing)，每月提供 10000 个免费字符。

## 设置

有关支持的格式和语音，请参阅 [IBM Cloud 说明页面](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices#languageVoices)。

开始之前，请阅读[入门教程](https://cloud.ibm.com/docs/services/text-to-speech?topic=text-to-speech-gettingStarted#gettingStarted)。

## 配置

要配置 Watson TTS，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
tts:
  - platform: watson_tts
    watson_apikey: YOUR_GENERATED_APIKEY
```

在 IBM Cloud 控制台生成凭据后，您可以获取这些令牌：

<p class='img'>
  <img src='/home-assistant/images/screenshots/watson_tts_screen.png' />
</p>

```yaml
watson_url:
  description: "服务连接使用的端点。"
  required: false
  type: string
  default: "`https://api.us-south.text-to-speech.watson.cloud.ibm.com`"
watson_apikey:
  description: "您在 IBM Cloud 管理控制台中生成的 apikey。"
  required: true
  type: string
voice:
  description: 要使用的语音名称。
  required: false
  type: string
  default: en-US_AllisonV3Voice
output_format:
  description: "覆盖默认输出格式。支持格式：`audio/flac`、`audio/mp3`、`audio/mpeg`、`audio/ogg`、`audio/ogg;codecs=opus`、`audio/ogg;codecs=vorbis`、`audio/wav`"
  required: false
  type: string
  default: audio/mp3
```

## 用法

向所有 `media_player` 设备实体播报：

```yaml
- action: tts.watson_tts_say
  data:
    message: "Hello from Watson"
```

or

```yaml
- action: tts.watson_tts_say
  data:
    message: >
      <speak>
          Hello from Watson
      </speak>
```

向 `media_player.living_room` 设备实体播报：

```yaml
- action: tts.watson_tts_say
  target:
    entity_id: media_player.living_room
  data:
    message: >
      <speak>
          Hello from Watson
      </speak>
```

带停顿的播报：

```yaml
- action: tts.watson_tts_say
  data:
    message: >
      <speak>
          Hello from
          <break time=".9s" />
          Watson
      </speak>
```

您也可以为消息指定语音：

```yaml
- action: tts.watson_tts_say
  data:
    message: "Hello from Watson"
  options:
    voice: en-US_EmilyV3Voice
```
