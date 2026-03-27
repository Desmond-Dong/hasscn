---
title: MaryTTS
description: 'MaryTTS 集成使用 MaryTTS(https://marytts.github.io/) 文字转语音引擎，以自然语音朗读文本。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Text-to-speech
ha_iot_class: Local Push
ha_release: 0.43
ha_domain: marytts
ha_platforms:
  - tts
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# MaryTTS

**MaryTTS** 集成使用 [MaryTTS](https://marytts.github.io/) 文字转语音引擎，以自然语音朗读文本。

## 配置

要启用 MaryTTS 文字转语音，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
tts:
  - platform: marytts
```

```yaml
host:
  description: MaryTTS 服务器的主机名或 IP 地址。
  required: false
  type: string
  default: localhost
port:
  description: MaryTTS 服务器端口。
  required: false
  type: integer
  default: 59125
codec:
  description: "音频编解码格式。支持的编码有 `AIFF_FILE`、`AU_FILE` 和 `WAVE_FILE`。"
  required: false
  type: string
  default: "`WAVE_FILE`"
voice:
  description: 发声语音。
  required: false
  type: string
  default: "`cmu-slt-hsmm`"
language:
  description: "要使用的语言。支持的语言包括 `de`、`en_GB`、`en_US`、`fr`、`it`、`lb`、`ru`、`sv`、`te` 和 `tr`。"
  required: false
  type: string
  default: "`en_US`"
effect:
  description: "要应用到语音输出上的效果字典。"
  required: false
  type: map
```

详情请参阅[文档](https://marytts.github.io/documentation/index.html)。

## 语音效果

有关不同效果的更多信息，请查看您的 MaryTTS 安装实例中的演示页面（`http://localhost:59125/`）。

您可以在其中了解每种效果，并即时测试它们。

## 完整配置示例

包含可选变量的完整配置示例：

```yaml
# Example configuration.yaml entry
tts:
  - platform: marytts
    host: "localhost"
    port: 59125
    codec: "WAVE_FILE"
    voice: "cmu-slt-hsmm"
    language: "en_US"
    effect:
      Volume: "amount:2.0;"
      TractScaler: "amount:1.5;"
      F0Scale: "f0Scale:2.0;"
      F0Add: "f0Add:50.0;"
      Rate: "durScale:1.5;"
      Robot: "amount:100.0;"
      Whisper: "amount:100.0;"
      Stadium: "amount:100.0"
      Chorus: "delay1:466;amp1:0.54;delay2:600;amp2:-0.10;delay3:250;amp3:0.30"
      FIRFilter: "type:3;fc1:500.0;fc2:2000.0"
      JetPilot: ""
```
