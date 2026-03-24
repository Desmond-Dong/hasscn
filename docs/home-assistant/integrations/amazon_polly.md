---
title: Amazon Polly
description: 关于在 Home Assistant 中设置 Amazon Polly 的说明。
ha_category:
  - Text-to-speech
ha_release: 0.37
ha_domain: amazon_polly
ha_iot_class: Cloud Push
ha_platforms:
  - tts
ha_integration_type: integration
ha_codeowners:
  - '@jschlyter'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Amazon Polly** 集成与 [Amazon Polly](https://aws.amazon.com/polly/) 配合使用来创建语音输出。
Polly 是通过 Amazon Web Services 提供的付费服务。前 12 个月有[免费套餐](https://aws.amazon.com/polly/pricing/)，之后按每百万字符收费。

## 设置

有关更多信息，请阅读 [AWS 关于安全凭证的通用参考](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html)以获取所需的详细信息。此外，请查看关于配置文件的 [boto3 文档](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#shared-credentials-file)以及可用区域的 [AWS 区域和终端节点参考](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints)。

可用语音列在 [Amazon 文档](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html)中。

## 配置

要开始使用，请将以下内容添加到您的 "`configuration.yaml`" 文件中（Amazon Polly 示例）。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
tts:
  - platform: amazon_polly
    aws_access_key_id: AWS_ACCESS_KEY_ID
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY
```

```yaml
aws_access_key_id:
  description: "您的 AWS 访问密钥 ID。如果提供，您还必须提供 `aws_secret_access_key` 且**不得**提供 `profile_name`。"
  required: true
  type: string
aws_secret_access_key:
  description: "您的 AWS 秘密访问密钥。如果提供，您还必须提供 `aws_access_key_id` 且**不得**提供 `profile_name`。"
  required: true
  type: string
profile_name:
  description: 凭证配置文件名称。如果提供，您**不得**提供 `aws_access_key_id` 或 `aws_secret_access_key`。
  required: false
  type: string
region_name:
  description: 要连接的区域标识符。
  required: false
  type: string
  default: us-east-1
text_type:
  description: "默认情况下将消息解释为 `text` 还是 [`ssml`](https://docs.aws.amazon.com/polly/latest/dg/ssml.html)。"
  required: false
  type: string
  default: text
voice:
  description: 默认用于生成语音的[语音名称/ID](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html)。 
  required: false
  type: string
output_format:
  description: "覆盖默认输出格式。可以是 `mp3`、`ogg_vorbis` 或 `pcm`。"
  required: false
  type: string
  default: mp3
sample_rate:
  description: "覆盖默认采样率。可能的值有：8000、16000、22050、24000。"
  required: false
  type: string
  default:  MP3 和 Ogg Vorbis 为 22050，pcm 为 16000
engine:
  description: "覆盖默认引擎。可以是 [`standard`](https://docs.aws.amazon.com/polly/latest/dg/standard-voices.html)、[`neural`](https://docs.aws.amazon.com/polly/latest/dg/neural-voices.html)、[`long-form`](https://docs.aws.amazon.com/polly/latest/dg/long-form-voices.html) 或 [`generative`](https://docs.aws.amazon.com/polly/latest/dg/generative-voices.html) 之一。请参阅 Amazon 文档了解兼容的区域和语音。"
  required: false
  type: string
  default: standard  
```

## 用法

对所有 `media_player` 设备实体播报：

```yaml
- action: tts.amazon_polly_say
  data:
    message: "<speak>来自 Amazon Polly 的问候</speak>"
```

或者

```yaml
- action: tts.amazon_polly_say
  data:
    message: >
      <speak>
          来自 Amazon Polly 的问候
      </speak>
```

对 `media_player.living_room` 设备实体播报：

```yaml
- action: tts.amazon_polly_say
  target:
    entity_id: media_player.living_room
    message: >
      <speak>
          来自 Amazon Polly 的问候
      </speak>
```

带停顿地播报：

```yaml
- action: tts.amazon_polly_say
  data:
    message: >
      <speak>
          来自
          <break time=".9s" />
          Amazon Polly
      </speak>
```

使用特定语音和引擎作为选项：

```yaml
- action: tts.amazon_polly_say
  data:
    message: "来自 Amazon Polly 的问候"
    entity_id: media_player.living_room
    language: en-GB
    options:
      voice: Amy
      engine: generative
```

## 高级用法

Amazon Polly 支持带口音的双语语音，您可能会觉得自己喜欢的语音需要更慢或更快一些。如果语速是问题，Amazon Polly 支持通过 SSML 标签进行调整。首先，请在配置中启用 SSML：

```yaml
  - platform: amazon_polly
    ...
    text_type: ssml
    ...
```

注意：您现在需要将所有新的和以前的 TTS 输入包含在 `<speak></speak>` 标签内。要在自动化中使用 SSML，您可以按照以下步骤操作，例如：

```yaml
action: tts.amazon_polly_say
data:
  cache: true
  entity_id: media_player.mpd
  message: >-
    <speak> <prosody rate="75%">나는  <prosody rate="75%">천천히</prosody> <lang
    xml:lang="fr-FR">parle</lang>.하고 있다식기세척!</speak>
  language: ko-KR
```
