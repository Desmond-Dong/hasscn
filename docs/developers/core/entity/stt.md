---
title: 语音转文本实体
description: '语音转文本 (STT) 实体允许其他集成或应用程序将语音数据流式传输到 STT API 并取回文本。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: 语音转文字
---
# 语音转文本实体

语音转文本 (STT) 实体允许其他集成或应用程序将语音数据流式传输到 STT API 并取回文本。

语音转文本实体源自[`homeassistant.components.stt.SpeechToTextEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/stt/__init__.py)。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| supported_languages | list[str] | **Required** | STT服务支持的语言。
| supported_formats | list[AudioFormats] | **Required** | STT服务支持的音频格式为wav或ogg。
| supported_codecs | list[AudioCodecs] | **Required** | STT 服务支持的音频编解码器、pcm 或 opus。
| supported_bit_rates | list[AudioBitRates] | **Required** | STT业务支持的音频码率：8、16、24或32。
| supported_sample_rates | list[AudioSampleRates] | **Required** | STT服务支持的音频采样率。
| supported_channels | list[AudioChannels] | **Required** | STT业务支持的音频通道1或2。

## 方法

### 处理音频流

处理音频流方法用于将音频发送到 STT 服务并获取文本。

```python
class MySpeechToTextEntity(SpeechToTextEntity):
    """Represent a Speech To Text entity."""

    async def async_process_audio_stream(self) -> None:
        """Process an audio stream to STT service.

        Only streaming content is allowed!
        """
```