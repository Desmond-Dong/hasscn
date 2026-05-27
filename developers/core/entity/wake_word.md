# 唤醒词检测实体

唤醒词检测实体允许其他集成或应用程序检测音频流中的唤醒词（也称为热词）。

唤醒词检测实体源自[`homeassistant.components.wake_word.WakeWordDetectionEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/wake_word/__init__.py)。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。
:::

| 名称 | 类型 | 默认值 | 说明 |
|----------------------|----------------|--------------|-----------------------------------------------------------------------------------------------------------------------------|
| supported\_wake\_words | list\[WakeWord] | **Required** | 支持的服务唤醒词：<ul><li>ww\_id - 唯一标识符</li><li>name - 人类可读的名称</li></ul> |

## 方法

### 处理音频流

处理音频流方法用于检测唤醒词。如果音频流在没有检测到的情况下结束，它必须返回 `DetectionResult` 或 `None`。

```python
class MyWakeWordDetectionEntity(WakeWordDetectionEntity):
    """Represent a Wake Word Detection entity."""

    async def async_process_audio_stream(
        self, stream: AsyncIterable[tuple[bytes, int]]
    ) -> DetectionResult | None:
        """Try to detect wake word(s) in an audio stream with timestamps.

        Audio must be 16Khz sample rate with 16-bit mono PCM samples.
        """
```

音频流由 `(timestamp, audio_chunk)` 形式的元组组成，其中：

* `timestamp` 是自音频流开始以来的毫秒数
* `audio_chunk` 是 16Khz 的 16 位签名单声道 PCM 样本块

如果检测到唤醒词，则返回 `DetectionResult`：

* `ww_id` - 检测到的唤醒词的唯一标识符
* `timestamp` - 检测发生时音频块的时间戳
* `queued_audio` - 将转发到语音到文本的可选音频块（见下文）

在[辅助管道](/developers/voice/pipelines.md) 中，音频流在唤醒词检测和语音转文本之间共享。这意味着在唤醒词检测**无法处理**期间通过语音转文本删除任何音频块，除非在 `DetectionResult` 的 `queued_audio` 中传回。
