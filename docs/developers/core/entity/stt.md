---
title: 语音转文字实体
sidebar_label: Speech-to-text
---

Speech-to-text (STT) 实体允许其他集成或应用程序向 STT API 流式传输语音数据并获取文本。

Speech-to-text 实体派生自 [`homeassistant.components.stt.SpeechToTextEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/stt/__init__.py)。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。
:::

| 名称 | 类型 | 默认值 | 描述
| ---- | ---- | ------- | -----------
| supported_languages | list[str] | **必填** | STT 服务支持的语言。
| supported_formats | list[AudioFormats] | **必填** | STT 服务支持的音频格式，wav 或 ogg。
| supported_codecs | list[AudioCodecs] | **必填** | STT 服务支持的音频编解码器，pcm 或 opus。
| supported_bit_rates | list[AudioBitRates] | **必填** | STT 服务支持的音频比特率，8、16、24 或 32。
| supported_sample_rates | list[AudioSampleRates] | **必填** | STT 服务支持的音频采样率。
| supported_channels | list[AudioChannels] | **必填** | STT 服务支持的音频声道，1 或 2。

## 方法

### 处理音频流

处理音频流方法用于向 STT 服务发送音频并获取文本。

```python
class MySpeechToTextEntity(SpeechToTextEntity):
    """Represent a Speech To Text entity."""

    async def async_process_audio_stream(
        self, metadata: SpeechMetadata, stream: AsyncIterable[bytes]
    ) -> SpeechResult:
        """Process an audio stream to STT service.

        Only streaming content is allowed!
        """
```
