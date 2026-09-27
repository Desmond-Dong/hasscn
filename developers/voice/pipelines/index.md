[Assist 流水线](https://www.home-assistant.io/integrations/assist_pipeline) 集成执行语音助手的常见步骤：

1. 唤醒词检测
2. 语音转文字
3. 意图识别
4. 文字转语音

流水线通过 WebSocket API 运行：

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

[示例代码](https://github.com/OHF-Voice/websocket-voice-assistant)

以下输入字段可用：

| 名称              | 类型   | 描述                                                                                                                                                                                                                                                                                    |
|-------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `start_stage`     | enum   | 必填。第一个要运行的 stage。可选值为 `wake_word`、`stt`、`intent`、`tts`。                                                                                                                                                                                                                        |
| `end_stage`       | enum   | 必填。最后一个要运行的 stage。可选值为 `stt`、`intent`、`tts`。                                                                                                                                                                                                                                |
| `input`           | dict   | 取决于 `start_stage`：<ul><li>仅 `wake_word`：<ul><li>`timeout` - 唤醒词检测超时前的秒数（int，默认：3）</li><li>`noise_suppression_level` - 噪音抑制量（int，0 = 禁用，4 = 最大）</li><li>`auto_gain_dbfs` - 自动增益（int，0 = 禁用，31 = 最大）</li><li>`volume_multiplier` - 固定音量放大（float，1.0 = 不变，2.0 = 两倍）</li></ul></li><li>`wake_word` 和 `stt`：<ul><li>`sample_rate` - 传入音频的采样率（int，赫兹）</li><li>`wake_word_phrase` - 检测到的唤醒词（例如 "okay nabu"），用于避免多个设备被唤醒</li></ul></li><li>`intent` 和 `tts`：<ul><li>`text` - 输入文本（string）</li></ul></li></ul> |
| `pipeline`        | string | 可选。流水线的 ID（使用 `assist_pipeline/pipeline/list` 获取名称）。                                                                                                                                                                                                               |
| `conversation_id` | string | 可选。[对话的唯一 ID](/developers/intent_conversation_api.md#conversation-id)。                                                                                                                                                                                                         |
| `device_id`         | string | 可选。从 Home Assistant 设备注册表中获取的设备 ID，表示启动流水线的设备。                                                                                                                                                                                                                           |
| `timeout`         | number | 可选。流水线超时前的秒数（默认：300）。                                                                                                                                                                                                                           |

## 事件

流水线运行过程中，会通过 WebSocket 连接发出事件。
可能发出的事件如下：

| 名称           | 描述                  | 发出时机    | 属性                                                                                                                                                                                                                                                              |
|----------------|------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `run-start`    | 流水线运行开始        | 总是     | `pipeline` - 流水线 ID<br />`language` - 流水线使用的语言<br />`runner_data` - 额外 WebSocket 数据：<ul><li>`stt_binary_handler_id` 是发送语音数据的前缀。</li><li>`timeout` 是整个流水线的最大运行时间。</li></ul><br />`tts_output` - TTS 输出数据<ul><li>`token` - 生成音频的 Token</li><li>`url` - 生成音频的 URL</li><li>`mime_type` - 生成音频的 MIME 类型</li><li>`stream_response` - TTS 在生成响应时是否可流式传输。</li></ul> |
| `run-end`      | 流水线运行结束          | 总是     |                                                                                                                                                                                                                                                                         |
| `wake_word-start`   | 唤醒词检测开始 | 仅音频 | `engine`: 使用的唤醒引擎<br />`metadata`: 传入音频<br />`timeout`: 唤醒词超时前的秒数                                                                                                                                                                                                     |
| `wake_word-end`     | 唤醒词检测结束   | 仅音频 | `wake_word_output` - 检测结果数据：<ul><li>`wake_word_id` 是检测到的唤醒词 ID</li><li>`timestamp` 是相对于音频流开始的检测时间（毫秒，可选）</li></ul>                                                                             |
| `stt-start`    | 语音转文字开始      | 仅音频 | `engine`: 使用的 STT 引擎<br />`metadata`: 传入音频元数据                                                                                                                                                                                                      |
| `stt-vad-start`    | 语音指令开始      | 仅音频 | `timestamp`: 相对于音频流开始的时间（毫秒）
| `stt-vad-end`    | 语音指令结束      | 仅音频 | `timestamp`: 相对于音频流开始的时间（毫秒）
| `stt-end`      | 语音转文字结束        | 仅音频 | `stt_output` - 包含检测到的文本 `text` 的对象。                                                                                                                                                                                                                   |
| `intent-start` | 意图识别开始  | 总是     | `engine` - [代理](/developers/intent_conversation_api.md) 引擎<br />`language`: 处理语言。<br /> `intent_input` - 输入到代理的文本                                                                                                                         |
| `intent-progress`   | 意图识别的中间更新    | 取决于对话代理     | `chat_log_delta` - 可选，来自[聊天日志](/developers/core/entity/conversation.md#chat-log)的 delta 对象 <br /> `tts_start_streaming` - 可选，如果 TTS 流式传输已开始则为 True                                                                                                                                                                          |
| `intent-end`   | 意图识别结束    | 总是     | `intent_output` - [对话响应](/developers/intent_conversation_api.md#conversation-response)                                                                                                                                                                          |
| `tts-start`    | 文字转语音开始      | 仅音频 | `engine` - 使用的 TTS 引擎<br />`language`: 输出语言。<br />`voice`: 输出语音。<br />`tts_input`: 要朗读的文本。                                                                                                                                              |
| `tts-end`      | 文字转语音结束        | 仅音频 | `token` - 生成音频的 Token<br />`url` - 生成音频的 URL<br />`mime_type` - 生成音频的 MIME 类型<br />                                                                                                                   |
| `error`        | 流水线错误            | 出错时   | `code` - 错误代码（[见下文](#error-codes)）<br />`message` - 错误消息                                                                                                                                                                                                                      |

## 错误代码

流水线 `error` 事件返回以下代码：

* `wake-engine-missing` - 未安装唤醒词引擎
* `wake-provider-missing` - 配置的唤醒词 provider 不可用
* `wake-stream-failed` - 唤醒词检测期间出现意外错误
* `wake-word-timeout` - 超时前未检测到唤醒词
* `stt-provider-missing` - 配置的语音转文字 provider 不可用
* `stt-provider-unsupported-metadata` - 语音转文字 provider 不支持音频格式（采样率等）
* `stt-stream-failed` - 语音转文字期间出现意外错误
* `stt-no-text-recognized` - 语音转文字未返回转录文本
* `intent-not-supported` - 配置的对话代理不可用
* `intent-failed` - 意图识别期间出现意外错误
* `tts-not-supported` - 配置的文字转语音 provider 不可用或不支持选项
* `tts-failed` - 文字转语音期间出现意外错误

## 发送语音数据

以 `stt` 作为第一个 stage 启动流水线并收到 `stt-start` 事件后，可以通过 WebSocket 连接以二进制数据发送语音数据。音频应尽快发送，每个数据块前面带一个字节作为 `stt_binary_handler_id` 前缀。

例如，如果 `stt_binary_handler_id` 为 `1` 且音频块为 `a1b2c3`，消息为（十六进制）：

```
stt_binary_handler_id
||
01a1b2c3
  ||||||
    audio
```

要指示语音数据发送结束，发送一个包含单个字节的二进制消息，该字节为 `stt_binary_handler_id`。

## 唤醒词检测

当 `start_stage` 设置为 `wake_word` 时，流水线将不会运行，直到检测到唤醒词。客户端应避免不必要的音频流传输，使用本地语音活动检测器（VAD）仅在检测到人类语音时才开始流传输。

对于 `wake_word`，`input` 对象应包含一个 `timeout` 浮点值。这是流水线在唤醒词检测期间超时的静默秒数（错误代码 `wake-word-timeout`）。
如果 Home Assistant 的内部 VAD 检测到足够多的语音，超时将持续重置。

### 音频增强

当 `start_stage` 设置为 `wake_word` 时，以下设置作为 `input` 对象的一部分可用：

* `noise_suppression_level` - 噪音抑制级别（0 = 禁用，4 = 最大）
* `auto_gain_dbfs` - 自动增益控制（0 = 禁用，31 = 最大）
* `volume_multiplier` - 音频样本乘以常数（1.0 = 不变，2.0 = 两倍响）

如果你的设备麦克风音量较小，推荐设置如下：

* `noise_suppression_level` - 2
* `auto_gain_dbfs` - 31
* `volume_multiplier` - 2.0

增加 `noise_suppression_level` 或 `volume_multiplier` 可能导致音频失真。
