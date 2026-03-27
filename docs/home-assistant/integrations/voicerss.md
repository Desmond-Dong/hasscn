---
title: VoiceRSS
description: 'VoiceRSS 集成使用 VoiceRSS(http://www.voicerss.org/) 文本转语音引擎，以自然的语音朗读文本。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Text-to-speech
ha_iot_class: Cloud Push
ha_release: 0.35
ha_domain: voicerss
ha_platforms:
  - tts
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# VoiceRSS

**VoiceRSS** 集成使用 [VoiceRSS](http://www.voicerss.org/) 文本转语音引擎，以自然的语音朗读文本。

## Configuration

要启用 VoiceRSS 文本转语音，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例
tts:
  - platform: voicerss
    api_key: YOUR_API_KEY
```

```yaml
api_key:
  description: VoiceRSS 的 API 密钥。
  required: true
  type: string
language:
  description: 要使用的语言。
  required: false
  type: string
  default: "`en-us`"
codec:
  description: 音频编解码器。
  required: false
  type: string
  default: mp3
format:
  description: 音频采样格式。
  required: false
  type: string
  default: 8khz_8bit_mono
```

允许使用的取值请参阅 [VoiceRSS API 文档](http://www.voicerss.org/api/)。

## 完整配置示例

下面的示例展示了配置项可能的写法：

```yaml
# configuration.yaml 示例
tts:
  - platform: voicerss
    api_key: YOUR_API_KEY
    language: "de-de"
    codec: mp3
    format: "8khz_8bit_mono"
```

请注意，某些 `media_player` 需要特定格式。例如，Sonos 需要使用 `44khz_16bit_stereo` 格式。
