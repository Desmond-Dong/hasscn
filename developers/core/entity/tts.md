# 文本转语音实体

文本转语音 (TTS) 实体使 Home Assistant 能够与您对话。

文本转语音实体源自[`homeassistant.components.tts.TextToSpeechEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/tts/__init__.py)。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| supported\_languages | list\[str] | **Required** | TTS 服务支持的语言。
| default\_language | str | **Required** | TTS 服务的默认语言。
| supported\_options | list\[str] | None | TTS 服务支持的语音、情感等选项。
| default\_options | Mapping\[str, Any] | None | TTS 服务的默认选项。

## 方法

### 获取支持的声音

该方法用于返回TTS服务的语言支持的语音列表。

```python
class MyTextToSpeechEntity(TextToSpeechEntity):
    """Represent a Text To Speech entity."""

    @callback
    def async_get_supported_voices(self, language: str) -> list[str] | None:
        """Return a list of supported voices for a language."""
```

### 1-shot 生成 TTS 音频

此方法将消息和语言作为输入并返回 TTS 音频。它可以实现为同步或异步，并且是强制实现的。

```python
class MyTextToSpeechEntity(TextToSpeechEntity):
    """Represent a Text To Speech entity."""

    def get_tts_audio(
        self, message: str, language: str, options: dict[str, Any]
    ) -> TtsAudioType:
        """Load tts audio file from the engine."""

    async def async_get_tts_audio(
        self, message: str, language: str, options: dict[str, Any]
    ) -> TtsAudioType:
        """Load tts audio file from the engine."""
```

### 生成带有消息流的 TTS 音频

大型语言模型生成块文本。可以使用文本消息流调用 TTS 服务，TTS 服务将以块的形式返回音频。

此方法是可选的。如果未实现，TTS 服务将使用最终消息调用 1-shot 方法。

```python
class MyTextToSpeechEntity(TextToSpeechEntity):
    """Represent a Text To Speech entity."""

    async def async_stream_tts_audio(
        self, request: TTSAudioRequest
    ) -> TTSAudioResponse:
        """Generate speech from an incoming message."""
```

`TTSAudioRequest`和`TTSAudioResponse`对象的定义如下：

```python
@dataclass
class TTSAudioRequest:
    """Request to get TTS audio."""

    language: str
    options: dict[str, Any]
    message_gen: AsyncGenerator[str]


@dataclass
class TTSAudioResponse:
    """Response containing TTS audio stream."""

    extension: str
    data_gen: AsyncGenerator[bytes]
```
