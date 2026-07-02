# 对话 API

可以通过[对话集成](https://www.home-assistant.io/integrations/conversation/)从文本中识别意图并触发它们。

这里提供了一个 API 端点，用于接收输入语句并生成[对话响应](#conversation-response)。通过传递由 Home Assistant 生成的[对话 ID](#conversation-id)，可以在多次输入与响应之间跟踪一次“对话”。

该 API 可通过 Rest API 和 Websocket API 使用。

可以像下面这样将一句话通过 POST 发送到 `/api/conversation/process`：

```json
{
  "text": "turn on the lights in the living room",
  "language": "en"
}
```

或者通过 WebSocket API 发送，如下所示：

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
| `text`            | string | 输入语句。                                                                                  |
| `language`        | string | 可选。输入语句的语言（默认为已配置语言）。                                                  |
| `agent_id`        | string | 可选。处理该请求的对话代理（默认为 *home\_assistant*）。                                     |
| `conversation_id` | string | 可选。用于[跟踪对话](#conversation-id)的唯一 ID。由 Home Assistant 生成。                    |

## 对话响应 {#conversation-response}

`/api/conversation/process` 返回的 JSON 响应包含已触发意图的执行结果信息，例如：

```json
{
  "continue_conversation": true,
  "response": {
    "response_type": "action_done",
    "language": "en",
    "data": {
      "targets": [
        {
          "type": "area",
          "name": "Living Room",
          "id": "living_room"
        },
        {
          "type": "domain",
          "name": "light",
          "id": "light"
        }
      ],
      "success": [
        {
          "type": "entity",
          "name": "My Light",
          "id": "light.my_light"
        }
      ],
      "failed": [],
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

`"response"` 对象中可用的属性如下：

| Name            | Type       | Description                                                                               |
| --------------- | ---------- | ----------------------------------------------------------------------------------------- |
| `response_type` | string     | `action_done`、`query_answer` 或 `error` 之一（见[响应类型](#response-types)）。            |
| `data`          | dictionary | 与各[响应类型](#response_types)相关的数据。                                                |
| `language`      | string     | 意图和响应所使用的语言。                                                                   |
| `speech`        | dictionary | 可选。要对用户播报的响应文本（见[语音](#speech)）。                                        |

[对话 ID](#conversation-id) 会与对话响应一并返回。

如果 `continue_conversation` 为 true，则表示对话代理预期用户继续跟进输入。

## 响应类型

### 动作已完成

该意图在 Home Assistant 中产生了一个动作，例如打开灯。响应中的 `data` 属性包含一个 `targets` 列表，其中每个 target 的形式如下：

| Name       | Type    | Description                                                                            |
|------------|---------|----------------------------------------------------------------------------------------|
| `type`     | string  | 目标类型，可为 `area`、`domain`、`device_class`、`device`、`entity` 或 `custom`。       |
| `name`     | string  | 被影响目标的名称。                                                                      |
| `id`       | string  | 可选。目标的 ID。                                                                       |

还会包含另外两个 target 列表，其中包含执行 `success` 或 `failed` 的设备或实体：

```json
{
  "response": {
    "response_type": "action_done",
    "data": {
      "targets": [
        (area or domain)
      ],
      "success": [
        (entities/devices that succeeded)
      ],
      "failed": [
        (entities/devices that failed)
      ]
    }
  }
}
```

一个意图可以包含多个 target，它们会叠加应用。target 必须按从一般到具体的顺序排列：

* `area`
  * 一个[已注册区域](https://developers.home-assistant.io/docs/area_registry_index/)
* `domain`
  * Home Assistant 集成 domain，例如 "light"
* `device_class`
  * 某个 domain 的设备类别，例如 "cover" domain 下的 "garage\_door"
* `device`
  * 一个[已注册设备](https://developers.home-assistant.io/docs/device_registry_index)
* `entity`
  * 一个 [Home Assistant 实体](https://developers.home-assistant.io/docs/architecture/devices-and-services)
* `custom`
  * 自定义 target

大多数意图最终会得到 0、1 或 2 个 target。当前只有在涉及设备类别时才会出现 3 个 target。target 组合示例如下：

* "Turn off all lights"
  * 1 个 target：`domain:light`
* "Turn on the kitchen lights"
  * 2 个 target：`area:kitchen`、`domain:light`
* "Open the kitchen blinds"
  * 3 个 target：`area:kitchen`、`domain:cover`、`device_class:blind`

### 查询回答

该响应是对问题的回答，例如“what is the temperature?”。回答文本见 [speech](#speech) 属性。

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
      "targets": [
        {
          "type": "domain",
          "name": "climate",
          "id": "climate"
        }
      ],
      "success": [
        {
          "type": "entity",
          "name": "Ecobee",
          "id": "climate.ecobee"
        }
      ],
      "failed": [],
    }
  },
  "conversation_id": "<generated-id-from-ha>",
}
```

### 错误

在意图识别或处理期间发生了错误。具体错误类型请参见 `data.code`，错误消息请参见 [speech](#speech) 属性。

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

`data.code` 是一个字符串，可取值如下：

* `no_intent_match` - 输入文本未匹配到任何意图。
* `no_valid_targets` - 指定的区域、设备或实体不存在。
* `failed_to_handle` - 处理该意图时发生意外错误。
* `unknown` - 在意图处理范围之外发生了错误。

## 语音

对用户播报的响应通过响应中的 `speech` 属性提供。它可以是纯文本（默认），也可以是 [SSML](https://www.w3.org/TR/speech-synthesis11/)。

对于纯文本语音，响应如下所示：

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

如果语音使用 [SSML](https://www.w3.org/TR/speech-synthesis11/)，则会是下面这样：

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

## 对话 ID {#conversation-id}

如果响应的对话代理支持，对话可以通过 Home Assistant 内部生成的唯一 ID 来跟踪。要继续一段对话，请从 HTTP API 响应中获取 `conversation_id`（与[对话响应](#conversation-response)一起返回），并将其添加到下一条输入语句中：

初始输入语句：

```json
{
  "text": "Initial input sentence."
}
```

JSON 响应包含对话 ID：

```json
{
  "conversation_id": "<generated-id-from-ha>",
  "response": {
    (conversation response)
  }
}
```

使用下一条输入语句发起 POST：

```json
{
  "text": "Related input sentence.",
  "conversation_id": "<generated-id-from-ha>"
}
```

## 预加载句子

可以使用 WebSocket API 预加载某种语言的句子：

```json
{
  "type": "conversation/prepare",
  "language": "en"
}
```

可用的输入字段如下：

| Name       | Type   | Description                                                                    |
|------------|--------|--------------------------------------------------------------------------------|
| `language` | string | 可选。要加载的句子语言（默认为已配置语言）。                                   |
