---
title: "Assist 管道"
---

[Assist 管道](https://www.home-assistant.io/integrations/assist_pipeline) 集成负责运行语音助手的常见步骤：

1. 唤醒词检测
2. 语音转文本
3. 意图识别
4. 文本转语音

管道通过 WebSocket API 运行：

```json
{
  "type": "assist_pipeline/run",
  "start_stage": "stt",
  "end_stage": "tts",
  "input": {
    "sample_rate": 16000,
  }
}
```

可用的输入字段如下：

| Name              | Type   | Description                                                                                                                                                                                                                                                                                    |
|-------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `start_stage`     | enum   | 必填。要运行的第一个阶段。可选值为 `wake_word`、`stt`、`intent`、`tts`。                                                                                                                                                                                                                        |
| `end_stage`       | enum   | 必填。要运行的最后一个阶段。可选值为 `stt`、`intent`、`tts`。                                                                                                                                                                                                                                |
| `input`           | dict   | 取决于 `start_stage`：<ul><li>仅 `wake_word`：<ul><li>`timeout` - 唤醒词检测超时前的秒数（int，默认：3）</li><li>`noise_suppression_level` - 降噪级别（int，0 = 禁用，4 = 最大）</li><li>`auto_gain_dbfs` - 自动增益（int，0 = 禁用，31 = 最大）</li><li>`volume_multiplier` - 固定音量放大倍数（float，1.0 = 不变，2.0 = 音量加倍）</li></ul></li><li>`wake_word` 和 `stt`：<ul><li>`sample_rate` - 输入音频的采样率（int，赫兹）</li><li>`wake_word_phrase` - 检测到的唤醒词（例如 `okay nabu`），用于避免多个设备同时被唤醒</li></ul></li><li>`intent` 和 `tts`：<ul><li>`text` - 输入文本（string）</li></ul></li></ul> |
| `pipeline`        | string | 可选。管道的 ID（使用 `assist_pipeline/pipeline/list` 获取名称）。                                                                                                                                                                                                               |
| `conversation_id` | string | 可选。[对话的唯一 ID](/developers/intent_conversation_api)。                                                                                                                                                                                                         |
| `device_id`         | string | 可选。启动该管道的设备在 Home Assistant 设备注册表中的设备 ID。                                                                                                                                                                                                                           |
| `timeout`         | number | 可选。管道超时前的秒数（默认：300）。                                                                                                                                                                                                                           |

## 事件

在管道运行过程中，它会通过 WebSocket 连接回传事件。
可发出的事件如下：

| Name           | Description                  | Emitted    | Attributes                                                                                                                                                                                                                                                              |
|----------------|------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `run-start`    | 管道运行开始                 | always     | `pipeline` - 管道 ID<br />`language` - 管道使用的语言<br />`runner_data` - 额外的 WebSocket 数据：<ul><li>`stt_binary_handler_id` 是发送语音数据时使用的前缀。</li><li>`timeout` 是整个管道的最大运行时间。</li></ul><br />`tts_output` - TTS 输出数据<ul><li>`token` - 生成音频的 token</li><li>`url` - 生成音频的 URL</li><li>`mime_type` - 生成音频的 MIME 类型</li><li>`stream_response` - TTS 是否可以在响应生成过程中进行流式输出。</li></ul> |
| `run-end`      | 管道运行结束                 | always     |                                                                                                                                                                                                                                                                         |
| `wake_word-start`   | 唤醒词检测开始               | audio only | `engine`: 使用的唤醒引擎<br />`metadata`: 输入音频<br />`timeout`: 唤醒词超时前的秒数元数据                                                                                                                                                                                                     |
| `wake_word-end`     | 唤醒词检测结束               | audio only | `wake_word_output` - 检测结果数据：<ul><li>`wake_word_id` 是检测到的唤醒词 id</li><li>`timestamp` 是相对于音频流开始时间的检测时间（毫秒，可选）</li></ul>                                                                             |
| `stt-start`    | 语音转文本开始               | audio only | `engine`: 使用的 STT 引擎<br />`metadata`: 输入音频元数据                                                                                                                                                                                                      |
| `stt-vad-start`    | 语音指令开始                | audio only | `timestamp`: 相对于音频流开始时间的时间（毫秒）
| `stt-vad-end`    | 语音指令结束                | audio only | `timestamp`: 相对于音频流开始时间的时间（毫秒）
| `stt-end`      | 语音转文本结束               | audio only | `stt_output` - 包含 `text` 的对象，即检测到的文本。                                                                                                                                                                                                                   |
| `intent-start` | 意图识别开始              | always     | `engine` - 使用的 [Agent](/developers/intent_conversation_api) 引擎<br />`language`: 处理语言。<br /> `intent_input` - 发送给代理的输入文本                                                                                                                         |
| `intent-progress`   | 意图识别的中间更新        | 取决于对话代理     | `chat_log_delta` - 可选，来自[聊天记录](/developers/core/entity/conversation)的增量对象 <br /> `tts_start_streaming` - 可选，如果 TTS 流式输出已开始则为 `true`                                                                                                                                                                          |
| `intent-end`   | 意图识别结束              | always     | `intent_output` - [对话响应](/developers/intent_conversation_api)                                                                                                                                                                          |
| `tts-start`    | 文本转语音开始               | audio only | `engine` - 使用的 TTS 引擎<br />`language`: 输出语言。<br />`voice`: 输出语音。<br />`tts_input`: 要朗读的文本。                                                                                                                                              |
| `tts-end`      | 文本转语音结束               | audio only | `token` - 生成音频的 token<br />`url` - 生成音频的 URL<br />`mime_type` - 生成音频的 MIME 类型<br />                                                                                                                   |
| `error`        | 管道发生错误                 | on error   | `code` - 错误代码（[见下文](#error-codes)）<br />`message` - 错误消息                                                                                                                                                                                                                      |

## 错误代码

以下代码会在管道的 `error` 事件中返回：

* `wake-engine-missing` - 未安装唤醒词引擎
* `wake-provider-missing` - 配置的唤醒词提供方不可用
* `wake-stream-failed` - 唤醒词检测期间发生意外错误
* `wake-word-timeout` - 在超时时间内未检测到唤醒词
* `stt-provider-missing` - 配置的 speech-to-text 提供方不可用
* `stt-provider-unsupported-metadata` - speech-to-text 提供方不支持该音频格式（采样率等）
* `stt-stream-failed` - speech-to-text 期间发生意外错误
* `stt-no-text-recognized` - speech-to-text 未返回转录文本
* `intent-not-supported` - 配置的对话代理不可用
* `intent-failed` - 意图识别期间发生意外错误
* `tts-not-supported` - 配置的 text-to-speech 提供方不可用，或其选项不受支持
* `tts-failed` - text-to-speech 期间发生意外错误


## 发送语音数据

当以 `stt` 作为运行的第一个阶段启动管道，并收到 `stt-start` 事件后，就可以通过 WebSocket 连接以二进制数据形式发送语音数据。音频应在可用后立即发送，每个数据块前面都要加上一个表示 `stt_binary_handler_id` 的字节。

例如，如果 `stt_binary_handler_id` 为 `1`，音频块为 `a1b2c3`，那么消息应为（十六进制）：

```
stt_binary_handler_id
||
01a1b2c3
  ||||||
   audio
```

要表示语音数据发送结束，请发送一条仅包含 `stt_binary_handler_id` 单个字节的二进制消息。

## 唤醒词检测

当 `start_stage` 设置为 `wake_word` 时，在检测到唤醒词之前，管道不会运行。客户端应使用本地语音活动检测器（VAD）仅在检测到人声时开始流式传输，以避免不必要的音频流。

对于 `wake_word`，`input` 对象应包含一个 `timeout` 浮点值。这表示在唤醒词检测期间，静音持续多少秒后管道会超时（错误代码 `wake-word-timeout`）。
如果 Home Assistant 的内部 VAD 检测到足够多的语音，超时时间会持续被重置。

### 音频增强

当 `start_stage` 设置为 `wake_word` 时，`input` 对象中可使用以下设置：

* `noise_suppression_level` - 降噪级别（0 = 禁用，4 = 最大）
* `auto_gain_dbfs` - 自动增益控制（0 = 禁用，31 = 最大）
* `volume_multiplier` - 音频样本乘以固定倍数（1.0 = 不变，2.0 = 音量加倍）

如果你设备的麦克风声音偏小，推荐设置为：

* `noise_suppression_level` - 2
* `auto_gain_dbfs` - 31
* `volume_multiplier` - 2.0

提高 `noise_suppression_level` 或 `volume_multiplier` 可能会导致音频失真。
