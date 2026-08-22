---
title: "WebSocket API"
---

Home Assistant 在 `/api/websocket` 托管一个 WebSocket API。此 API 可用于将 Home Assistant 实例的信息流式传输到任何实现了 WebSockets 的客户端。我们维护一个 [JavaScript library](https://github.com/home-assistant/home-assistant-js-websocket)，在我们的 frontend 中使用它。

## 服务器 states

1. 客户端连接。
2. 开始认证阶段。
   - 服务器发送 `auth_required` 消息。
   - 客户端发送 `auth` 消息。
   - 如果 `auth` 消息正确：进入第 3 步。
   - 服务器发送 `auth_invalid`。进入第 6 步。
3. 发送 `auth_ok` 消息
4. 认证阶段结束。
5. 开始命令阶段。
   1. 客户端可以发送命令。
   2. 服务器可以发送之前命令的结果。
6. 客户端或服务器断开会话。

在命令阶段，客户端会给每条消息附加一个唯一的标识符。服务器会将此标识符添加到每条消息中，以便客户端可以将每条消息与其来源关联起来。

## 消息格式

每个 API 消息都是一个 JSON 序列化的对象，包含一个 `type` key。在认证阶段之后，消息还必须包含一个 `id`，一个调用者可以用来将消息与响应关联的整数。

auth 消息示例：

```json
{
  "type": "auth",
  "access_token": "ABCDEFGHIJKLMNOPQ"
}
```

```json
{
   "id": 5,
   "type":"event",
   "event":{
      "data":{},
      "event_type":"test_event",
      "time_fired":"2016-11-26T01:37:24.265429+00:00",
      "origin":"LOCAL"
   }
}
```

## 认证阶段

当客户端连接到服务器时，服务器会发出 `auth_required`。

```json
{
  "type": "auth_required",
  "ha_version": "2021.5.3"
}
```

客户端的第一条消息应该是一个 auth 消息。你可以使用 access token 进行授权。

```json
{
  "type": "auth",
  "access_token": "ABCDEFGH"
}
```

如果客户端提供了有效的认证，服务器通过发送 `auth_ok` 消息来完成认证阶段：

```json
{
  "type": "auth_ok",
  "ha_version": "2021.5.3"
}
```

如果数据不正确，服务器将以 `auth_invalid` 消息回复并断开会话。

```json
{
  "type": "auth_invalid",
  "message": "Invalid password"
}
```

## 功能启用阶段

支持需要启用的 features 的客户端，应作为第一条消息（`"id": 1`）发送以下形式的消息：

```
{
  "id": 1,
  "type": "supported_features",
  "features": { coalesce_messages: 1 }
}
```

目前唯一支持的 feature 是 'coalesce_messages'，其结果是消息以批量方式合并发送，而不是逐个发送。

## 命令阶段

在此阶段，客户端可以向服务器发送命令。服务器将对每个命令回复一个 `result` 消息，指示命令何时完成以及是否成功，并附带命令的 context。

```json
{
  "id": 6,
  "type": "result",
  "success": true,
  "result": {
    "context": {
      "id": "326ef27d19415c60c492fe330945f954",
      "parent_id": null,
      "user_id": "31ddb597e03147118cf8d2f8fbea5553"
    }
  }
}
```

## 订阅 events

命令 `subscribe_events` 将使你的客户端订阅 event bus。你可以监听所有 events 或特定 event 类型。如果你想监听多个 event 类型，你将需要发送多个 `subscribe_events` 命令。

```json
{
  "id": 18,
  "type": "subscribe_events",
  // 可选
  "event_type": "state_changed"
}
```

服务器将以 result 消息回复，以指示订阅已激活。

```json
{
  "id": 18,
  "type": "result",
  "success": true,
  "result": null
}
```

对于每个匹配的 event，服务器将发送一条类型为 `event` 的消息。消息中的 `id` 将指向 `listen_event` 命令的原始 `id`。

```json
{
   "id": 18,
   "type":"event",
   "event":{
      "data":{
         "entity_id":"light.bed_light",
         "new_state":{
            "entity_id":"light.bed_light",
            "last_changed":"2016-11-26T01:37:24.265390+00:00",
            "state":"on",
            "attributes":{
               "rgb_color":[
                  254,
                  208,
                  0
               ],
               "color_temp":380,
               "supported_features":147,
               "xy_color":[
                  0.5,
                  0.5
               ],
               "brightness":180,
               "white_value":200,
               "friendly_name":"Bed Light"
            },
            "last_updated":"2016-11-26T01:37:24.265390+00:00",
            "context": {
               "id": "326ef27d19415c60c492fe330945f954",
               "parent_id": null,
               "user_id": "31ddb597e03147118cf8d2f8fbea5553"
            }
         },
         "old_state":{
            "entity_id":"light.bed_light",
            "last_changed":"2016-11-26T01:37:10.466994+00:00",
            "state":"off",
            "attributes":{
               "supported_features":147,
               "friendly_name":"Bed Light"
            },
            "last_updated":"2016-11-26T01:37:10.466994+00:00",
            "context": {
               "id": "e4af5b117137425e97658041a0538441",
               "parent_id": null,
               "user_id": "31ddb597e03147118cf8d2f8fbea5553"
            }
         }
      },
      "event_type":"state_changed",
      "time_fired":"2016-11-26T01:37:24.265429+00:00",
      "origin":"LOCAL",
      "context": {
         "id": "326ef27d19415c60c492fe330945f954",
         "parent_id": null,
         "user_id": "31ddb597e03147118cf8d2f8fbea5553"
      }
   }
}
```

## 订阅 trigger

你也可以使用 `subscribe_trigger` 订阅一个或多个 triggers。这些与[自动化 triggers](https://www.home-assistant.io/docs/automation/trigger/)所使用的语法相同。你可以定义一个或一组 triggers。

```json
{
    "id": 2,
    "type": "subscribe_trigger",
    "trigger": {
        "platform": "state",
        "entity_id": "binary_sensor.motion_occupancy",
        "from": "off",
        "to":"on"
    }
}
```

作为响应，你将收到：

```json
{
 "id": 2,
 "type": "result",
 "success": true,
 "result": null
}
```

对于每个匹配的 trigger，服务器将发送一条类型为 `trigger` 的消息。消息中的 `id` 将指向 `subscribe_trigger` 命令的原始 `id`。注意，你的 variables 将根据所使用的 trigger 而不同。

```json
{
    "id": 2,
    "type": "event",
    "event": {
        "variables": {
            "trigger": {
                "id": "0",
                "idx": "0",
                "platform": "state",
                "entity_id": "binary_sensor.motion_occupancy",
                "from_state": {
                    "entity_id": "binary_sensor.motion_occupancy",
                    "state": "off",
                    "attributes": {
                        "device_class": "motion",
                        "friendly_name": "motion occupancy"
                    },
                    "last_changed": "2022-01-09T10:30:37.585143+00:00",
                    "last_updated": "2022-01-09T10:33:04.388104+00:00",
                    "context": {
                        "id": "90e30ad8e6d0c218840478d3c21dd754",
                        "parent_id": null,
                        "user_id": null
                    }
                },
                "to_state": {
                    "entity_id": "binary_sensor.motion_occupancy",
                    "state": "on",
                    "attributes": {
                        "device_class": "motion",
                        "friendly_name": "motion occupancy"
                    },
                    "last_changed": "2022-01-09T10:33:04.391956+00:00",
                    "last_updated": "2022-01-09T10:33:04.391956+00:00",
                    "context": {
                        "id": "9b263f9e4e899819a0515a97f6ddfb47",
                        "parent_id": null,
                        "user_id": null
                    }
                },
                "for": null,
                "attribute": null,
                "description": "state of binary_sensor.motion_occupancy"
            }
        },
        "context": {
            "id": "9b263f9e4e899819a0515a97f6ddfb47",
            "parent_id": null,
            "user_id": null
        }
    }
}
```

### 取消订阅 events

你可以取消之前创建的订阅。将原始订阅命令的 id 作为值传递给 subscription 字段。

```json
{
  "id": 19,
  "type": "unsubscribe_events",
  "subscription": 18
}
```

服务器将以 result 消息回复，以指示取消订阅成功。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": null
}
```

## 触发 event

这将在 Home Assistant event bus 上触发一个 event。

```json
{
  "id": 24,
  "type": "fire_event",
  "event_type": "mydomain_event",
  // 可选
  "event_data": {
    "device_id": "my-device-id",
    "type": "motion_detected"
  }
}
```

服务器将以 result 消息回复，以指示 event 触发成功。

```json
{
  "id": 24,
  "type": "result",
  "success": true,
  "result": {
    "context": {
      "id": "326ef27d19415c60c492fe330945f954",
      "parent_id": null,
      "user_id": "31ddb597e03147118cf8d2f8fbea5553"
    }
  }
}
```

## 调用 service action

这将在 Home Assistant 中调用一个 service action。目前没有任何返回值。如果客户端对由于调用而产生的已变化 entities 感兴趣，可以监听 `state_changed` events。

```json
{
  "id": 24,
  "type": "call_service",
  "domain": "light",
  "service": "turn_on",
  // 可选
  "service_data": {
    "color_name": "beige",
    "brightness": "101"
  }
  // 可选
  "target": {
    "entity_id": "light.kitchen"
  }
  // 对于返回 response data 的 service actions 必须包含
  "return_response": true
}
```

服务器将通过一条消息指示 action 已完成执行。

```json
{
  "id": 24,
  "type": "result",
  "success": true,
  "result": {
    "context": {
      "id": "326ef27d19415c60c492fe330945f954",
      "parent_id": null,
      "user_id": "31ddb597e03147118cf8d2f8fbea5553"
    },
    "response": null
  }
}
```

调用的 `result` 将始终包含一个 `response`，以应对支持响应的 service actions。当调用不支持响应的 action 时，`response` 的值将为 `null`。

## 获取 states

这将获取 Home Assistant 中所有当前 states 的 dump。

```json
{
  "id": 19,
  "type": "get_states"
}
```

服务器将以包含 states 的 result 消息回复。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": [ ... ]
}
```

## 获取 config

这将获取 Home Assistant 中当前 config 的 dump。

```json
{
  "id": 19,
  "type": "get_config"
}
```

服务器将以包含 config 的 result 消息回复。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": { ... }
}
```

## 获取 service actions

这将获取 Home Assistant 中当前 service actions 的 dump。

```json
{
  "id": 19,
  "type": "get_services"
}
```

服务器将以包含 service actions 的 result 消息回复。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": { ... }
}
```

## 获取 panels

这将获取 Home Assistant 中当前已注册 panels 的 dump。

```json
{
  "id": 19,
  "type": "get_panels"
}
```

服务器将以包含当前已注册 panels 的 result 消息回复。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": [ ... ]
}
```

## Ping 和 pong

API 支持接收来自客户端的 ping 并返回 pong。这作为心跳，以确保连接仍然存活：

```json
{
    "id": 19,
    "type": "ping"
}
```

如果连接仍然 active，服务器应尽快发送 pong 作为回应：

```json
{
    "id": 19,
    "type": "pong"
}
```

## 验证 config

此命令允许你验证 triggers、conditions 和 action configurations。`trigger`、`condition` 和 `action` keys 将被作为自动化的一部分进行验证（因此 triggers/conditions/actions 的列表也是允许的）。所有字段都是可选的，结果将只包含传入的 keys。

```json
{
  "id": 19,
  "type": "validate_config",
  "trigger": ...,
  "condition": ...,
  "action": ...
}
```

服务器将以验证结果回复。只有命令消息中同时包含的字段才会出现在响应中。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": {
    "trigger": {"valid": true, "error": null},
    "condition": {"valid": false, "error": "Invalid condition specified for data[0]"},
    "action": {"valid": true, "error": null}
  }
}
```

## 从 target 提取

此命令允许你从一个或多个 targets 中提取 entities、devices 和 areas。

```json
{
  "id": 19,
  "type": "extract_from_target",
  "target": {
    "entity_id": ["group.kitchen"],
    "device_id": ["device_abc123"],
    "area_id": ["kitchen"],
    "label_id": ["smart_lights"]
  },
  // 可选：将 group entities 展开为成员（默认：false）
  "expand_group": true
}
```

target 参数的结构与服务调用 targets 相同。

服务器将以从 target 中提取的信息回复：

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": {
    "referenced_entities": ["light.kitchen", "switch.kitchen", "light.living_room", "switch.bedroom"],
    "referenced_devices": ["device_abc123", "device_def456"],
    "referenced_areas": ["kitchen", "living_room"],
    "missing_devices": [],
    "missing_areas": [],
    "missing_floors": [],
    "missing_labels": []
  }
}
```

响应包括：
- `referenced_entities`: 将被目标的所有 entity IDs（包括来自 devices/areas/labels 的 entities）
- `referenced_devices`: 被引用的所有 device IDs
- `referenced_areas`: 被引用的所有 area IDs
- `missing_devices`: 不存在的 device IDs
- `missing_areas`: 不存在的 area IDs
- `missing_floors`: 不存在的 floor IDs
- `missing_labels`: 不存在的 label IDs

当 `expand_group` 设为 `true` 时，group entities 将被展开以包含其 member entities，而不是 group entity 本身。

## 获取 target 的 triggers/conditions/services

`get_triggers_for_target`、`get_conditions_for_target` 和 `get_services_for_target` 命令允许你获取 target 中 entities 的所有适用 triggers、conditions 和 services。这三个命令共享相同的输入和输出格式。

```json
{
  "id": 20,
  "type": "get_triggers_for_target",
  "target": {
    "entity_id": ["light.kitchen", "light.living_room"],
    "device_id": ["device_abc123"],
    "area_id": ["bedroom"],
    "label_id": ["smart_lights"]
  },
  // 可选：将 group entities 展开为成员（默认：true）
  "expand_group": true
}
```

target 参数的结构与服务调用 targets 相同。

服务器将以适用于 target 中任何 entity 的一组 trigger/condition/service 标识符回复，格式为 `domain.trigger_name`：

```json
{
  "id": 20,
  "type": "result",
  "success": true,
  "result": [
    "homeassistant.event",
    "homeassistant.state",
    "light.turned_on",
    "light.turned_off",
    "light.toggle"
  ]
}
```

当 `expand_group` 设为 `true`（默认）时，group entities 将被展开以包含其 member entities，适用于任何 member 的 triggers 将包含在结果中。否则，仅包含适用于 group entities 本身的 triggers。

## 获取用于显示的 Entity Registry entries

`config/entity_registry/list_for_display` 返回一个轻量级、经过优化的 entity registry entries 列表，适合在 UI 中显示。仅包含已启用（非禁用）的 entities。

响应以紧凑格式包含 entity data，使用简写属性 key 以最小化带宽并提高性能。

### 使用场景

此 endpoint 设计用于：
- 在 UI 中显示 entities 列表
- 仪表板和 UI 组件的实时 entity 更新
- 面向移动客户端的带宽高效数据传输
- 在 device management 界面中渲染 entity 信息

### 请求

```json
{
  "id": 1,
  "type": "config/entity_registry/list_for_display"
}
```

### 响应

```json
{
  "id": 1,
  "type": "result",
  "success": true,
  "result": {
    "entity_categories": {
      0: "config",
      1: "diagnostic"
    },
    "entities": [
      {
        "ei": "light.living_room",
        "pl": "hue",
        "ai": "living_room",
        "di": "abc123def456",
        "en": "Living Room",
        "hn": true
      },
      {
        "ei": "switch.setting",
        "pl": "esphome",
        "di": "cde83923",
        "en": "Setting for something",
        "hn": true,
        "ec": 0
      }
    ]
  }
}
```

### 响应属性

#### 根对象

| Name | Type | Description |
|------|------|-------------|
| `id` | int | 请求 ID 的 echo |
| `type` | string | 始终为 `"result"` |
| `success` | boolean | 成功响应时始终为 `true` |
| `result` | object | 包含 `entity_categories` 和 `entities` 的实际 response data |

#### Entity 类别映射

| Name | Type | Description |
|------|------|-------------|
| `entity_categories` | object[number, string] | 将数值索引映射到 entity category 字符串，用于解码 entities 中的 `ec` 属性。允许 UI 将 category 索引解释回人类可读的名称。 |

### 实体

#### 过滤与行为

- **排除禁用的 entities**：仅包含 `disabled_by = null` 的 entities。禁用的 entities（由 user、integration、device、config entry 或 system 禁用）会被过滤掉。
- **属性简写**：属性 key 被简写，以最小化 JSON payload 大小，从而提高性能。
- **类型转换**：Sets（如 `labels`）被转换为列表以进行 JSON 序列化。
- **Category 编码**：Entity categories 以数值索引形式发送，而不是字符串，以减小数据量。使用 `entity_categories` 映射在 UI 上解码它们。
- **条件属性**：可选属性仅在具有有意义的值（非 null、非空或 true）时才包含在响应中。

#### Entity 属性

`entities` 数组中的每个 entity 对象使用简写的属性名称以提高性能：

| Name | Type | Required | Description | Source |
|------|------|----------|-------------|--------|
| `ei` | string | Yes | Entity ID - entity 的唯一标识符（例如 `"light.living_room"`） | `RegistryEntry.entity_id` |
| `pl` | string | Yes | Platform - 创建该 entity 的集成（例如 `"hue"`、`"mqtt"`） | `RegistryEntry.platform` |
| `ai` | string | No | Area ID - 该 entity 分配的 area | `RegistryEntry.area_id`（仅当非 `null` 时） |
| `lb` | array[string] | No | Labels - 分配给该 entity 的 label IDs 列表，用于组织 | `RegistryEntry.labels`（转换为列表，仅当非空时） |
| `di` | string | No | Device ID - 该 entity 所属的 device | `RegistryEntry.device_id`（仅当非 `null` 时） |
| `ic` | string | No | Icon - 用户设置的自定义 icon（覆盖 state icon，因此如果设置了此项，不要使用 state 中的 attribute 值），icons 格式为 `"prefix:icon-name"`，例如：`"mdi:lightbulb-on"` | `RegistryEntry.icon`（仅当非 `null` 时） |
| `tk` | string | No | Translation Key - 用于从集成翻译 entity 名称的 key | `RegistryEntry.translation_key`（仅当非 `null` 时） |
| `ec` | integer | No | Entity Category（index）- 在 `entity_categories` 映射中的数值索引 | `RegistryEntry.entity_category`（仅当非 `null` 时） |
| `hb` | boolean | No | Hidden By - 如果 entity 被 user 或 integration 隐藏则存在（true） | `RegistryEntry.hidden_by`（仅当非 `null` 时以 true 出现） |
| `hn` | boolean | No | Has Entity Name - 如果 entity 使用集成提供的名称则存在（true） | `RegistryEntry.has_entity_name`（仅当为 `true` 时以 true 出现） |
| `en` | string | No | Entity Name - entity 的显示名称（优先用户自定义） | 用户设置的 `RegistryEntry.name` 或回退到 `RegistryEntry.original_name`（仅当任一被设置时） |
| `dp` | integer | No | Display Precision - 显示值的 sensor 特定精度。用户配置的 `display_precision` 优先；回退到集成提供的 `suggested_display_precision` | `RegistryEntry.options["sensor"]["display_precision"]`（首选）或 `RegistryEntry.options["sensor"]["suggested_display_precision"]`（仅 sensor domain，仅当设置时） |

## 管理已暴露的 entities

这些命令管理哪些 entities 暴露给 voice assistants（Assist 对应 `conversation`，Alexa 对应 `cloud.alexa`，Google Assistant 对应 `cloud.google_assistant`）。

### 列出已暴露的 entities

返回所有 assistants 中所有 entities 的暴露状态。

```json
{
  "id": 18,
  "type": "homeassistant/expose_entity/list"
}
```

服务器将以 entity IDs 到各 assistant 的暴露状态映射回复：

```json
{
  "id": 18,
  "type": "result",
  "success": true,
  "result": {
    "exposed_entities": {
      "light.living_room": {
        "conversation": true,
        "cloud.alexa": false,
        "cloud.google_assistant": false
      },
      "sensor.temperature": {
        "conversation": true
      }
    }
  }
}
```

只有被明确暴露或未暴露的 entities 才会出现在结果中。响应中未出现的 entities 尚未配置，并使用默认的暴露设置。

### 暴露或未暴露 entities

将一个或多个 entities 暴露或未暴露给一个或多个 voice assistants。更改立即生效，无需重启 Home Assistant。

```json
{
  "id": 19,
  "type": "homeassistant/expose_entity",
  "assistants": ["conversation"],
  "entity_ids": ["light.living_room", "sensor.temperature"],
  "should_expose": true
}
```

| Field | Type | Description |
|-------|------|-------------|
| `assistants` | array[string] | assistant 标识符列表：`"conversation"`、`"cloud.alexa"`、`"cloud.google_assistant"` |
| `entity_ids` | array[string] | 要暴露或未暴露的 entity IDs 列表 |
| `should_expose` | boolean | 暴露为 `true`，未暴露为 `false` |

服务器将以 result 消息回复：

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": null
}
```

## 错误处理

如果发生错误，`result` 消息中的 `success` key 将被设为 `false`。它将包含一个 `error` key，其中包含一个带有两个 key 的对象：`code` 和 `message`。

```json
{
   "id": 12,
   "type":"result",
   "success": false,
   "error": {
      "code": "invalid_format",
      "message": "Message incorrectly formatted: expected str for dictionary value @ data['event_type']. Got 100"
   }
}
```

### 在调用 service actions 和翻译期间的错误处理

下面的 JSON 展示了一个错误响应的示例。如果处理了 `HomeAssistantError` 错误（或 `HomeAssistantError` 的子类），如果设置了翻译信息，将被添加到响应中。

在处理 `ServiceValidationError`（`service_validation_error`）时，仅在 debug 级别向日志打印堆栈跟踪。

```json
{
   "id": 24,
   "type":"result",
   "success": false,
   "error": {
      "code": "service_validation_error",
      "message": "Option 'custom' is not a supported mode.",
      "translation_key": "unsupported_mode",
      "translation_domain": "kitchen_sink",
      "translation_placeholders": {
        "mode": "custom"
      }
   }
}
```

[阅读更多](/developers/core/platform/raising_exceptions) 关于抛出 exceptions 或 [exceptions 的本地化](/developers/internationalization/core#exceptions)。