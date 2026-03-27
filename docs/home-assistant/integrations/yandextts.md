---
title: Yandex TTS
description: 'Yandex TTS 集成使用 Yandex SpeechKit(https://tech.yandex.com/speechkit/) 文本转语音引擎，以自然语音朗读文本。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Text-to-speech
ha_release: 0.36
ha_iot_class: Cloud Push
ha_domain: yandextts
ha_platforms:
  - tts
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Yandex TTS

**Yandex TTS** 集成使用 [Yandex SpeechKit](https://tech.yandex.com/speechkit/) 文本转语音引擎，以自然语音朗读文本。

:::important
此集成仅适用于旧版 API 密钥。对于新版 API 密钥，无法使用此集成。

:::
## 配置

要启用 Yandex SpeechKit 文本转语音，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
tts:
  - platform: yandextts
    api_key: THE_API_KEY
```

```yaml
api_key:
  description: 用于此服务的 API 密钥。
  required: true
  type: string
language:
  description: "要使用的语言。支持的语言有 `en-US`、`ru-RU`、`uk-UK` 和 `tr-TR`。"
  required: false
  type: string
  default: "`en-US`"
codec:
  description: "音频编解码格式。支持 `mp3`、`wav` 和 `opus`。"
  required: false
  type: string
  default: "`mp3`"
voice:
  description: "说话人语音。支持的女声有 `jane`、`oksana`、`alyss`、`omazh`、`silaerkan`、`nastya`、`sasha`、`tanya`、`tatyana_abramova`、`voicesearch` 和 `zombie`。男声有 `zahar`、`ermil`、`levitan`、`ermilov`、`kolya`、`kostya`、`nick`、`erkanyavas`、`zhenya`、`anton_samokhvalov`、`ermil_with_tuning`、`robot`、`dude` 和 `smoky`。"
  required: false
  type: string
  default: "`zahar`"
emotion:
  description: "说话人的情感语调。支持 `good`（友好）、`evil`（愤怒）和 `neutral`。"
  required: false
  type: string
  default: "`neutral`"
speed:
  description: 语速。最高为 `3`，最低为 `0.1`
  required: false
  type: float
  default: "`1`"
```

详情请参阅 [API 文档](https://tech.yandex.com/speechkit/cloud/doc/guide/concepts/tts-http-request-docpage/)。英文版文档似乎已经过时。您可以通过[电子邮件](https://tech.yandex.com/speechkit/cloud/)或[在线方式](https://developer.tech.yandex.ru/)申请 API 密钥。

## 完整配置示例

下面的示例展示了配置项的写法：

```yaml
# Example configuration.yaml entry
tts:
  - platform: yandextts
    api_key: YOUR_API_KEY
    language: "ru-RU"
    codec: mp3
    voice: oksana
    emotion: evil
    speed: 2
```
