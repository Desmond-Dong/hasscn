---
title: "WebSocket API"
description: 'Home Assistant 在 /api/websocket 提供 WebSocket API。任何实现了 WebSocket 的客户端都可以通过它从 Home Assistant 实例持续接收信息。我们维护了一个用于前端的 JavaScript library(https://github.com/hom。'
---
# WebSocket API

Home Assistant 在 `/api/websocket` 提供 WebSocket API。任何实现了 WebSocket 的客户端都可以通过它从 Home Assistant 实例持续接收信息。我们维护了一个用于前端的 [JavaScript library](https://github.com/home-assistant/home-assistant-js-websocket)。

## 服务器状态

1. 客户端连接。
1. 认证阶段开始。
    - 服务器发送 `auth_required` 消息。
    - 客户端发送 `auth` 消息。
    - 如果 `auth` 消息正确：进入步骤 3。
    - 服务器发送 `auth_invalid`。进入步骤 6。
1. 发送 `auth_ok` 消息
1. 认证阶段结束。
1. 命令阶段开始。
    1. 客户端可以发送命令。
    1. 服务器可以发送之前命令的结果。
1. 客户端或服务器断开会话。

在命令阶段，客户端需要为每条消息附加唯一标识符。服务器会在返回消息中带上该标识符，以便客户端将消息与原始请求对应起来。

## 消息格式

每条 API 消息都是一个序列化后的 JSON 对象，且包含 `type` 键。认证阶段结束后，消息还必须包含 `id`，这是一个整数，调用方可用它将消息与响应关联起来。

认证消息示例：

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

当客户端连接到服务器时，服务器会发送 `auth_required`。

```json
{
  "type": "auth_required",
  "ha_version": "2021.5.3"
}
```

客户端发送的第一条消息应为认证消息。你可以使用访问令牌完成认证。

```json
{
  "type": "auth",
  "access_token": "ABCDEFGH"
}
```

如果客户端提供了有效的认证信息，服务器会发送 `auth_ok` 消息，表示认证阶段完成：

```json
{
  "type": "auth_ok",
  "ha_version": "2021.5.3"
}
```

如果认证数据不正确，服务器会回复 `auth_invalid` 消息并断开会话。

```json
{
  "type": "auth_invalid",
  "message": "Invalid password"
}
```

## 功能启用阶段

支持某些需显式启用功能的客户端，应将如下消息作为第一条命令消息发送（`"id": 1`）：

```
{
  "id": 1,
  "type": "supported_features",
  "features": { coalesce_messages: 1 }
}
```

目前唯一支持的功能是 `coalesce_messages`，启用后消息会以批量合并的方式发送，而不是逐条发送。

## 命令阶段

在这一阶段，客户端可以向服务器发送命令。服务器会针对每条命令返回一个 `result` 消息，说明命令是否执行完成、是否成功，以及该命令对应的上下文。

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

## 订阅事件

`subscribe_events` 命令可让客户端订阅事件总线。你既可以监听所有事件，也可以只监听某个特定事件类型。若要监听多个事件类型，则需要发送多条 `subscribe_events` 命令。

```json
{
  "id": 18,
  "type": "subscribe_events",
  // Optional
  "event_type": "state_changed"
}
```

服务器会返回一个结果消息，表示订阅已生效。

```json
{
  "id": 18,
  "type": "result",
  "success": true,
  "result": null
}
```

每当有事件匹配时，服务器都会发送一条 `event` 类型的消息。消息中的 `id` 会指向原始 `listen_event` 命令的 `id`。

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

## 订阅触发器

你还可以通过 `subscribe_trigger` 订阅一个或多个触发器。这里使用的语法与 [automation triggers](https://www.home-assistant.io/docs/automation/trigger/) 相同。你可以定义单个触发器，也可以传入一个触发器列表。

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

响应如下：

```json
{
 "id": 2,
 "type": "result",
 "success": true,
 "result": null
}
```

每当有触发器匹配时，服务器都会发送一条 `trigger` 类型的消息。消息中的 `id` 会指向原始 `subscribe_trigger` 命令的 `id`。请注意，返回的变量内容会随着所使用的触发器不同而变化。

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

### 取消订阅事件

你可以取消之前创建的订阅。只需把原始订阅命令的 id 作为 `subscription` 字段的值传入。

```json
{
  "id": 19,
  "type": "unsubscribe_events",
  "subscription": 18
}
```

服务器会返回一个结果消息，表示取消订阅成功。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": null
}
```

## 触发事件

这会在 Home Assistant 事件总线上触发一个事件。

```json
{
  "id": 24,
  "type": "fire_event",
  "event_type": "mydomain_event",
  // Optional
  "event_data": {
    "device_id": "my-device-id",
    "type": "motion_detected"
  }
}
```

服务器会返回一个结果消息，表示事件已成功触发。

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

## 调用服务动作

这会调用 Home Assistant 中的服务动作。当前没有直接返回值；如果客户端关心调用后哪些实体发生了变化，可以监听 `state_changed` 事件。

```json
{
  "id": 24,
  "type": "call_service",
  "domain": "light",
  "service": "turn_on",
  // Optional
  "service_data": {
    "color_name": "beige",
    "brightness": "101"
  }
  // Optional
  "target": {
    "entity_id": "light.kitchen"
  }
  // Must be included for service actions that return response data
  "return_response": true
}
```

服务器会通过一条消息表示该动作已执行完成。

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

调用结果中的 `result` 始终会包含 `response` 字段，以兼容支持返回值的服务动作；如果调用的动作不支持返回值，则 `response` 为 `null`。

## 获取状态

这会获取 Home Assistant 当前所有状态的完整快照。

```json
{
  "id": 19,
  "type": "get_states"
}
```

服务器会返回一条包含这些状态的 `result` 消息。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": [ ... ]
}
```

## 获取配置

这会获取 Home Assistant 当前配置的完整快照。

```json
{
  "id": 19,
  "type": "get_config"
}
```

服务器会返回一条包含该配置的 `result` 消息。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": { ... }
}
```

## 获取服务动作

这会获取 Home Assistant 当前服务动作的完整列表。

```json
{
  "id": 19,
  "type": "get_services"
}
```

服务器会返回一条包含这些服务动作的 `result` 消息。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": { ... }
}
```

## 获取面板

这会获取 Home Assistant 当前已注册面板的完整列表。

```json
{
  "id": 19,
  "type": "get_panels"
}
```

服务器会返回一条包含当前已注册面板的 `result` 消息。

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": [ ... ]
}
```

## Ping 与 Pong

该 API 支持接收客户端发来的 ping 并返回 pong，可作为心跳机制以确认连接仍然有效：

```json
{
    "id": 19,
    "type": "ping"
}
```

如果连接仍然活跃，服务器必须尽快返回 pong：

```json
{
    "id": 19,
    "type": "pong"
}
```

## 验证配置

该命令可用于验证触发器、条件和动作配置。`trigger`、`condition` 和 `action` 这些键会按自动化中的写法进行校验（因此也允许传入触发器/条件/动作列表）。所有字段都是可选的，结果中只会包含传入的键。

```json
{
  "id": 19,
  "type": "validate_config",
  "trigger": ...,
  "condition": ...,
  "action": ...
}
```

服务器会返回校验结果。响应中只会包含命令消息里实际传入的字段。

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

## 从目标提取

该命令可用于从一个或多个 target 中提取实体、设备和区域。

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
  // Optional: expand group entities to their members (default: false)
  "expand_group": true
}
```

`target` 参数遵循与服务调用 target 相同的结构。

服务器会返回从 target 中提取出的信息：

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
- `referenced_entities`：将被 target 命中的所有实体 ID（包括来自设备/区域/标签的实体）
- `referenced_devices`：所有被引用的设备 ID
- `referenced_areas`：所有被引用的区域 ID
- `missing_devices`：不存在的设备 ID
- `missing_areas`：不存在的区域 ID
- `missing_floors`：不存在的楼层 ID
- `missing_labels`：不存在的标签 ID

当 `expand_group` 设为 `true` 时，组实体会展开为其成员实体，而不是组实体本身。

## 获取目标的 triggers/conditions/services

`get_triggers_for_target`、`get_conditions_for_target` 和 `get_services_for_target` 命令可用于获取指定 target 下实体可用的所有触发器、条件和服务。三者共用相同的输入与输出格式。

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
  // Optional: expand group entities to their members (default: true)
  "expand_group": true
}
```

`target` 参数遵循与服务调用 target 相同的结构。

服务器会返回适用于该 target 任一实体的触发器/条件/服务标识符集合，格式为 `domain.trigger_name`：

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

当 `expand_group` 设为 `true`（默认值）时，组实体会展开为其成员实体，适用于任一成员的触发器都会包含在结果中。否则，结果中只会包含适用于组实体本身的触发器。

## 获取用于显示的实体注册表条目

`config/entity_registry/list_for_display` 会返回一个轻量、优化过的实体注册表条目列表，适合在 UI 中展示。只包含已启用（未禁用）的实体。

响应会以紧凑格式返回实体数据，使用短属性键以减少带宽占用并提升性能。

### 使用场景

该端点适用于：
- 在 UI 中显示实体列表
- 为仪表板和 UI 组件提供实体实时更新
- 面向移动端的高带宽效率数据传输
- 在设备管理界面中渲染实体信息

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

| 名称 | 类型 | 说明 |
|------|------|-------------|
| `id` | int | 请求 ID 的回显 |
| `type` | string | 始终为 `"result"` |
| `success` | boolean | 成功响应时始终为 `true` |
| `result` | object | 实际响应数据，包含 `entity_categories` 和 `entities` |

#### 实体分类映射

| 名称 | 类型 | 说明 |
|------|------|-------------|
| `entity_categories` | object[number, string] | 将数字索引映射到实体分类字符串，用于解码实体中的 `ec` 属性，方便 UI 将分类索引还原为可读名称。 |

### 实体

#### 过滤与行为

- **排除已禁用实体**：只包含 `disabled_by = null` 的实体。被用户、集成、设备、配置条目（config entry）或系统禁用的实体都会被过滤掉。
- **属性名缩写**：属性键会使用缩写，以减小 JSON 负载并提升性能。
- **类型转换**：集合（如 `labels`）会转换为列表，以便进行 JSON 序列化。
- **分类编码**：实体分类会以数字索引而不是字符串发送，以减少数据量。UI 可通过 `entity_categories` 映射进行解码。
- **条件性属性**：可选属性只有在具有实际值时才会包含在响应中（非 `null`、非空，或为 `true`）。

#### 实体属性

`entities` 数组中的每个实体对象都会使用缩写属性名，以提升性能：

| 名称 | 类型 | 必填 | 说明 | 来源 |
|------|------|------|------|------|
| `ei` | string | 是 | 实体 ID - 实体的唯一标识符（例如 `"light.living_room"`） | `RegistryEntry.entity_id` |
| `pl` | string | 是 | 平台 - 创建该实体的集成（例如 `"hue"`、`"mqtt"`） | `RegistryEntry.platform` |
| `ai` | string | 否 | 区域 ID - 该实体所属的区域 | `RegistryEntry.area_id`（仅当不为 `null` 时） |
| `lb` | array[string] | 否 | 标签 - 为便于组织而分配给该实体的标签 ID 列表 | `RegistryEntry.labels`（会转换为列表，且仅在非空时包含） |
| `di` | string | 否 | 设备 ID - 该实体所属的设备 | `RegistryEntry.device_id`（仅当不为 `null` 时） |
| `ic` | string | 否 | 图标 - 用户设置的自定义图标（会覆盖状态图标，因此如果设置了该值，就不要使用状态中的属性值）；图标格式为 `"prefix:icon-name"`，例如 `"mdi:lightbulb-on"` | `RegistryEntry.icon`（仅当不为 `null` 时） |
| `tk` | string | 否 | 翻译键 - 用于翻译集成提供的实体名称 | `RegistryEntry.translation_key`（仅当不为 `null` 时） |
| `ec` | integer | 否 | 实体分类（索引）- 指向 `entity_categories` 映射中的数字索引 | `RegistryEntry.entity_category`（仅当不为 `null` 时） |
| `hb` | boolean | 否 | 隐藏来源 - 如果实体被用户或集成隐藏，则该字段会出现并为 `true` | `RegistryEntry.hidden_by`（仅当不为 `null` 时，以 `true` 形式出现） |
| `hn` | boolean | 否 | 具有实体名称 - 如果实体使用集成提供的名称，则该字段会出现并为 `true` | `RegistryEntry.has_entity_name`（仅当值为 `true` 时出现） |
| `en` | string | 否 | 实体名称 - 实体的显示名称（优先使用用户自定义名称） | 用户设置的 `RegistryEntry.name`，或回退到 `RegistryEntry.original_name`（任一存在时才包含） |
| `dp` | integer | 否 | 显示精度 - 传感器显示值时使用的精度。优先使用用户配置的 `display_precision`；否则回退到集成提供的 `suggested_display_precision` | `RegistryEntry.options["sensor"]["display_precision"]`（优先）或 `RegistryEntry.options["sensor"]["suggested_display_precision"]`（仅限 sensor 域，且仅在已设置时） |


## 管理暴露的实体

这些命令用于管理哪些实体会暴露给语音助手（voice assistants），包括 Assist 的 `conversation`、Alexa 的 `cloud.alexa` 以及 Google Assistant 的 `cloud.google_assistant`。

### 列出已暴露实体

Returns the exposure status of all entities across all assistants.

```json
{
  "id": 18,
  "type": "homeassistant/expose_entity/list"
}
```

The server will respond with a mapping of entity IDs to their exposure status per assistant:

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

Only entities that have been explicitly exposed or unexposed will appear in the result. Entities not present in the response have not been configured and use the default exposure setting.

### 暴露或取消暴露实体

Expose or unexpose one or more entities to one or more voice assistants. Changes take effect immediately without requiring a Home Assistant restart.

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
| `assistants` | array[string] | List of assistant identifiers: `"conversation"`, `"cloud.alexa"`, `"cloud.google_assistant"` |
| `entity_ids` | array[string] | List of entity IDs to expose or unexpose |
| `should_expose` | boolean | `true` to expose, `false` to unexpose |

The server will respond with a result message:

```json
{
  "id": 19,
  "type": "result",
  "success": true,
  "result": null
}
```

## 错误处理

如果发生错误，`result` 消息中的 `success` 键会被设为 `false`。同时会包含一个 `error` 键，其值为一个对象，包含 `code` 和 `message` 两个键。

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

### 错误处理 during service action calls and translations

The JSON below shows an example of an error response. If `HomeAssistantError` error (or a subclass of `HomeAssistantError`) is handled, translation information, if set, will be added to the response. 

When handling `ServiceValidationError` (`service_validation_error`) a stack trace is printed to the logs at debug level only.

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

[Read more](/developers/core/platform/raising_exceptions) about raising exceptions or and the [localization of exceptions](/developers/internationalization/core#exceptions).
