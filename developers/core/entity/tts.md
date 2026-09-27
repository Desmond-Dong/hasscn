Text-to-speech (TTS) 实体使 Home Assistant 能够对你说话。

Text-to-speech 实体派生自 [`homeassistant.components.tts.TextToSpeechEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/tts/__init__.py)。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。
:::

| 名称 | 类型 | 默认值 | 描述
| ---- | ---- | ------- | -----------
| supported\_languages | list\[str] | **必填** | TTS 服务支持的语言。
| default\_language | str | **必填** | TTS 服务的默认语言。
| supported\_options | list\[str] | None | TTS 服务支持的选项，如 voice、emotions。
| default\_options | Mapping\[str, Any] | None | TTS 服务的默认选项。

## 方法

### 获取支持的语音

此方法用于返回 TTS 服务某个语言支持的语音列表。

```python
class MyTextToSpeechEntity(TextToSpeechEntity):
    """Represent a Text To Speech entity."""

    @callback
    def async_get_supported_voices(self, language: str) -> list[Voice] | None:
        """Return a list of supported voices for a language."""
```

### 一次性生成 TTS 音频

此方法以消息和语言作为输入，返回 TTS 音频。可以作为同步或异步实现，必须实现。

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

### 以消息流式方式生成 TTS 音频

大型语言模型以块的形式生成文本。TTS 服务可以接收文本消息流，并以块的形式返回音频。

此方法是可选项。当未实现时，TTS 服务将使用最终消息调用一次性方法。

```python
class MyTextToSpeechEntity(TextToSpeechEntity):
    """Represent a Text To Speech entity."""

    async def async_stream_tts_audio(
        self, request: TTSAudioRequest
    ) -> TTSAudioResponse:
        """Generate speech from an incoming message."""
```

`TTSAudioRequest` 和 `TTSAudioResponse` 对象的定义如下：

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
