---
title: Microsoft Text-to-Speech (TTS)
description: 'Microsoft text-to-speech 集成使用 Microsoft Speech Service 的 TTS 引擎(https://learn.microsoft.com/azure/cognitive-services/speech-service/text-to-speech)。'
ha_category:
  - Text-to-speech
ha_iot_class: Cloud Push
ha_release: 0.57
ha_domain: microsoft
ha_platforms:
  - tts
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Microsoft Text-to-Speech (TTS)

**Microsoft text-to-speech** 集成使用 [Microsoft Speech Service 的 TTS 引擎](https://learn.microsoft.com/azure/cognitive-services/speech-service/text-to-speech)，以自然语音朗读文本。此集成使用 Cognitive Services 提供的一部分 API，即 Microsoft Speech API。要使此集成正常工作，您需要一个免费的 API 密钥。您可以使用自己的 [Azure 订阅](https://azure.microsoft.com) 创建一个 [Azure Speech 资源](https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices)。

## 配置

要启用 Microsoft 文字转语音，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
tts:
  - platform: microsoft
    api_key: YOUR_API_KEY
```

```yaml
api_key:
  description: 您的 API 密钥。
  required: true
  type: string
language:
  description: 要使用的语言。请注意，如果您将语言设置为默认值以外的其他语言，还需要同时指定匹配的语音类型。支持的语言请查看[可用语言列表](https://github.com/home-assistant/core/blob/dev/homeassistant/generated/microsoft_tts.py)。
  required: false
  type: string
  default: "`en-us`"
gender:
  description: 您希望使用的语音性别。可接受的值为 `Female` 和 `Male`。
  required: false
  type: string
  default: "`Female`"
type:
  description: "您想使用的语音类型。可接受的值列在文档中的服务名称映射表里：[参阅文档](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-support?tabs=tts)。"
  required: false
  type: string
  default: "`JennyNeural`"
rate:
  description: "以百分比调整语速。示例值：`25`、`50`。"
  required: false
  type: integer
  default: 0
volume:
  description: "以百分比调整输出音量。示例值：`-20`、`70`。"
  required: false
  type: integer
  default: 0
pitch:
  description: "调整输出音高。示例值：`high`。"
  required: false
  type: string
  default: "`default`"
contour:
  description: "以百分比调整输出音高轮廓。此设置会覆盖 `pitch`。其作用请参阅 [W3 SSML 规范](https://www.w3.org/TR/speech-synthesis/#pitch_contour)。示例值：`(0%, -1st) (100%, +10st)`。"
  required: false
  type: string
region:
  description: "您的 API 终端节点所在区域。请参阅[文档](https://learn.microsoft.com/azure/cognitive-services/speech-service/regions)。"
  required: false
  type: string
  default: "`eastus`"
```

:::important
如果您将语言设置为默认 `en-us` 以外的其他值，则还需要指定与之匹配的语音类型。

:::
## 完整配置示例

包含可选变量的完整配置示例：

```yaml
# Example configuration.yaml entry
tts:
  - platform: microsoft
    api_key: YOUR_API_KEY
    language: en-gb
    gender: Male
    type: RyanNeural
    rate: 20
    volume: -50
    pitch: high
    contour: (0%, -1st) (100%, +10st)
    region: eastus
```
