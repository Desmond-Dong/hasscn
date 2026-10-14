Intents 可以从文本中识别，并通过 [conversation integration](https://www.home-assistant.io/integrations/conversation/) 发出。

有一个 API endpoint 可以接收一个输入句子并产生一个 [conversation response](#conversation-response)。一个 "conversation" 可以通过传递 Home Assistant 生成的 [conversation id](#conversation-id) 在多次输入和响应之间进行跟踪。

该 API 可通过 Rest API 和 Websocket API 访问。

可以将一个句子 POST 到 `/api/conversation/process`，例如：

```json
{
  "text": "turn on the lights in the living room",
  "language": "en"
}
```

或者通过 WebSocket API 发送，例如：

```json
{
  "type": "conversation/process",
  "text": "turn on the lights in the living room",
  "language": "en"
}
```

可用的输入字段如下：

| Name              | Type   | Description                                                                                 |
|-------------------|--------|---------------------------------------------------------------------------------------------|
| `text`            | string | 输入句子。                                                                                  |
| `language`        | string | 可选。输入句子的语言（默认为已配置的语言）。                                                |
| `agent_id`        | string | 可选。用于处理请求的 conversation agent（默认为 *home\_assistant*）。                        |
| `conversation_id` | string | 可选。用于 [跟踪 conversation](#conversation-id) 的唯一 id。由 Home Assistant 生成。        |

## 对话响应

`/api/conversation/process` 的 JSON response 包含有关所发出 intent 效果的信息，例如：

```json
{
  "continue_conversation": true,
  "response": {
    "response_type": "action_done",
    "language": "en",
    "data": {
      "success": [
        {
          "name": "Living Room",
          "type": "area",
          "id": "living_room"
        },
        {
          "name": "My Light",
          "type": "entity",
          "id": "light.my_light"
        }
      ],
      "failed": []
    },
    "speech": {
      "plain": {
        "speech": "Turned Living Room lights on"
      }
    }
  },
  "conversation_id": "<generated-id-from-ha>",
}
```

`"response"` object 中可用的属性如下：

| Name            | Type       | Description                                                                               |
| --------------- | ---------- | ----------------------------------------------------------------------------------------- |
| `response_type` | string     | `action_done`、`query_answer` 或 `error` 之一（见 [response types](#response-types)）。   |
| `data`          | dictionary | 每个 [response type](#response-types) 的相关 data。                                       |
| `language`      | string     | Intent 和 response 的语言。                                                               |
| `speech`        | dictionary | 可选。要向用户宣读的 response text（见 [speech](#speech)）。                              |

[Conversation id](#conversation-id) 会与 conversation response 一起返回。

如果 `continue_conversation` 设置为 `true`，conversation agent 期望用户进行后续交互。

## 响应类型

### 操作完成

该 intent 在 Home Assistant 中产生了一个 action，例如打开一个 light。Response 的 `data` 属性包含一个 `success` 列表和一个 `failed` 列表。这些列表中的每个条目都是被操作的 target，其格式如下：

| Name       | Type    | Description                                                                                     |
|------------|---------|-------------------------------------------------------------------------------------------------|
| `name`     | string  | 受影响 target 的名称。                                                                          |
| `type`     | string  | Target 类型。`area`、`floor`、`domain`、`device_class`、`device`、`entity` 或 `custom` 之一。  |
| `id`       | string  | 可选。Target 的 id。                                                                            |

`success` 列表包含成功操作的 targets（如 areas、floors 和 entities/devices），而 `failed` 列表包含失败的 targets：

```json
{
  "response": {
    "response_type": "action_done",
    "data": {
      "success": [
        (targets that succeeded)
      ],
      "failed": [
        (targets that failed)
      ]
    }
  }
}
```

一个 intent 可以有多个 targets，它们会叠加应用。Targets 必须从一般到具体排序：

* `floor`
  * 一个已注册的 floor，用于对多个 areas 进行分组
* `area`
  * 一个 [已注册的 area](https://developers.home-assistant.io/docs/area_registry_index/)
* `domain`
  * Home Assistant integration domain，如 "light"
* `device_class`
  * 某个 domain 的 device class，如 "cover" domain 的 "garage\_door"
* `device`
  * 一个 [已注册的 device](https://developers.home-assistant.io/docs/device_registry_index)
* `entity`
  * 一个 [Home Assistant entity](https://developers.home-assistant.io/docs/architecture/devices-and-services)
* `custom`
  * 一个自定义 target

大多数 intents 最终有 0、1 或 2 个 targets。目前只有当 device classes 参与时才会有 3 个 target。Target 组合示例：

* "关闭所有灯光"
  * 1 个 target：`domain:light`
* "打开厨房的灯光"
  * 2 个 targets：`area:kitchen`、`domain:light`
* "打开厨房的百叶窗"
  * 3 个 targets：`area:kitchen`、`domain:cover`、`device_class:blind`

### 查询回答

该 response 是对一个问题的回答，例如 "温度是多少？"。请参见 [speech](#speech) 属性以获取回答文本。

```json
{
  "response": {
    "response_type": "query_answer",
    "language": "en",
    "speech": {
      "plain": {
        "speech": "It is 65 degrees"
      }
    },
    "data": {
      "success": [
        {
          "name": "Ecobee",
          "type": "entity",
          "id": "climate.ecobee"
        }
      ],
      "failed": []
    }
  },
  "conversation_id": "<generated-id-from-ha>",
}
```

### 错误

在 intent 识别或处理过程中发生了错误。请查看 `data.code` 了解具体的错误类型，并查看 [speech](#speech) 属性以获取错误消息。

```json
{
  "response": {
    "response_type": "error",
    "language": "en",
    "data": {
      "code": "no_intent_match"
    },
    "speech": {
      "plain": {
        "speech": "Sorry, I didn't understand that"
      }
    }
  }
}
```

`data.code` 是一个 string，可以是以下之一：

* `no_intent_match` — 输入文本没有匹配到任何 intents。
* `no_valid_targets` — 所指向的 area、device 或 entity 不存在。
* `failed_to_handle` — 在处理 intent 时发生了意外的错误。
* `unknown` — 在 intent 处理范围之外发生了错误。

## 语音

向用户宣读的 response 在 response 的 `speech` 属性中提供。它既可以是纯文本（默认），也可以是 [SSML](https://www.w3.org/TR/speech-synthesis11/)。

对于纯文本 speech，response 会如下所示：

```json
{
  "response": {
    "response_type": "...",
    "speech": {
      "plain": {
        "speech": "...",
        "extra_data": null
      }
    }
  },
  "conversation_id": "<generated-id-from-ha>",
}
```

如果 speech 是 [SSML](https://www.w3.org/TR/speech-synthesis11/)，则会变为：

```json
{
  "response": {
    "response_type": "...",
    "speech": {
      "ssml": {
        "speech": "...",
        "extra_data": null
      }
    }
  },
  "conversation_id": "<generated-id-from-ha>",
}
```

## 对话 ID

如果回答的 conversation agent 支持，可以使用 Home Assistant 内部生成的唯一 id 来跟踪 conversations。要继续一个 conversation，请从 HTTP API response 中检索 `conversation_id`（与 [conversation response](#conversation-response) 一起返回），并将其添加到下一个输入句子中：

初始输入句子：

```json
{
  "text": "Initial input sentence."
}
```

JSON response 包含 conversation id：

```json
{
  "conversation_id": "<generated-id-from-ha>",
  "response": {
    (conversation response)
  }
}
```

使用下一个输入句子 POST：

```json
{
  "text": "Related input sentence.",
  "conversation_id": "<generated-id-from-ha>"
}
```

## 预加载 sentences

可以通过 WebSocket API 预加载某种语言的 sentences：

```json
{
  "type": "conversation/prepare",
  "language": "en"
}
```

可用的输入字段如下：

| Name       | Type   | Description                                                                    |
|------------|--------|--------------------------------------------------------------------------------|
| `language` | string | 可选。要加载的 sentences 的语言（默认为已配置的语言）。                        |
