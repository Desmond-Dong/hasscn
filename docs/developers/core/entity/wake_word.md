---
title: 唤醒词检测实体
sidebar_label: Wake word detection
---

Wake word detection 实体允许其他集成或应用程序在音频流中检测唤醒词（也称为 hotwords）。

Wake word detection 实体派生自 [`homeassistant.components.wake_word.WakeWordDetectionEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/wake_word/__init__.py)。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。
:::

所有实体共有的属性（如 `icon`、`name` 等）适用。

## 方法

### 获取支持的唤醒词

返回实体支持的唤醒词。每个 `WakeWord` 都有一个 `id`（唯一标识符）、一个 `name`（人类可读的名称）和一个可选的 `phrase`。

```python
class MyWakeWordDetectionEntity(WakeWordDetectionEntity):
    """Represent a Wake Word Detection entity."""

    async def get_supported_wake_words(self) -> list[WakeWord]:
        """Return a list of supported wake words."""
```

### 处理音频流

处理音频流方法用于检测唤醒词。它必须返回一个 `DetectionResult`，或者如果音频流在没有检测到的情况下结束则返回 `None`。

```python
class MyWakeWordDetectionEntity(WakeWordDetectionEntity):
    """Represent a Wake Word Detection entity."""

    async def _async_process_audio_stream(
        self, stream: AsyncIterable[tuple[bytes, int]], wake_word_id: str | None
    ) -> DetectionResult | None:
        """Try to detect wake word(s) in an audio stream with timestamps.

        Audio must be 16Khz sample rate with 16-bit mono PCM samples.
        """
```

音频流由形如 `(audio_chunk, timestamp)` 的元组组成，其中：

- `audio_chunk` 是一块 16 位有符号单声道 PCM 采样，采样率为 16Khz
- `timestamp` 是自音频流开始以来的毫秒数

如果检测到唤醒词，将返回一个 `DetectionResult`，包含：

- `wake_word_id` - 检测到的唤醒词的唯一标识符
- `timestamp` - 检测发生时音频块的 timestamp
- `queued_audio` - 将转发到 speech-to-text 的可选音频块（见下文）

在 [Assist pipeline](/developers/voice/pipelines) 中，音频流在 wake word detection 和 speech-to-text 之间共享。这意味着在 wake word detection 期间移除的任何音频块**无法**由 speech-to-text 处理，除非通过 `DetectionResult` 的 `queued_audio` 传回。
