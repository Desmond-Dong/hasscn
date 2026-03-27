---
title: Pico TTS
description: 'Pico TTS 集成使用 Pico TTS 库(https://github.com/naggety/picotts) 以自然的语音朗读文本。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Text-to-speech
ha_iot_class: Local Push
ha_release: 0.36
ha_domain: picotts
ha_platforms:
  - tts
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Pico TTS

**Pico TTS** 集成使用 [Pico TTS 库](https://github.com/naggety/picotts) 以自然的语音朗读文本。

Pico TTS 是一个强大的开源引擎，可在本地运行（不依赖云端），因此即使没有互联网连接也能工作。

## 配置

要启用 Pico 文本转语音，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 配置示例
tts:
  - platform: picotts
```

```yaml
language:
  description: "要使用的语言。支持的语言有 `en-US`、`en-GB`、`de-DE`、`es-ES`、`fr-FR` 和 `it-IT`。"
  required: false
  type: string
  default: "`en-US`"
```

## 完整配置示例

下面的配置示例展示了一个配置项可能的写法：

```yaml
# `configuration.yaml` 配置示例
tts:
  - platform: picotts
    language: "fr-FR"
```
