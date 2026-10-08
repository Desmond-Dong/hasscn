# 事件

Home Assistant 的核心是事件总线。事件总线允许任何集成触发或监听事件。

<a id="events-and-state-changes"></a>

## 事件与状态变化

所有实体都会产生状态变化事件。每次实体状态发生变化时，都会产生一个状态变化事件。状态变化事件只是事件总线上的一种事件类型，但还有其他类型的事件，例如用于各种集成之间协调的[内置事件](#builtin-events-core)。

### 状态变化事件与事件实体

不要将状态变化事件与[事件实体](/home-assistant/integrations/event/index.md)混淆。事件实体是一种特殊类型的实体，它本身会产生事件状态变化，就像所有其他实体一样。

任何状态变化都会在事件总线上作为 `state_changed` 事件发布，包含实体的先前状态和新状态。

## 通用字段

所有事件都共享这些基本字段。

| 字段         | 描述                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `event_type` | 事件类型。示例：`call_service`。                                                                                                        |
| `origin`     | 事件来源。`REMOTE`（来自 API，如 webhook）或 `LOCAL`（其他所有情况）。                                                                    |
| `time_fired` | 事件触发时间。示例：`2022-01-28T12:19:53.736380+00:00`。                                                                                 |
| `context`    | 包含[上下文](https://data.home-assistant.io/docs/context/)的字典。示例：`{ 'id': '123', "parent_id": null, 'user_id': 'abc'}`。              |

此外，所有事件都包含一个 `data` 字典，其中包含特定于事件的信息。这些信息在下面进行描述。

<a id="builtin-events-core"></a>

## 内置事件（核心）

### `call_service`

当执行服务动作时触发此事件。

| 字段              | 描述                                                            |
| ----------------- | ---------------------------------------------------------------- |
| `domain`          | 动作的域。示例：`light`。                                        |
| `service`         | 执行的服务动作。示例：`turn_on`。                                 |
| `service_data`    | 包含调用参数的字典。示例：`{ 'brightness': 120 }`。               |
| `service_call_id` | 包含唯一调用 ID 的字符串。示例：`23123-4`。                       |

### `component_loaded`

当新集成被加载并初始化时触发此事件。

请注意，虽然 Home Assistant 启动时会为每个加载的集成触发此事件，但 Home Assistant 的自动化引擎是最后启动的。因此，此事件不能用于在启动期间运行自动化，因为它会错过这些事件。

| 字段        | 描述                                                                 |
| ----------- | --------------------------------------------------------------------- |
| `component` | 刚刚初始化的集成的域。示例：`light`。                                  |

### `core_config_updated`

当核心配置更新时触发此事件，例如位置发生更改时。

它不包含额外数据。

### `data_entry_flow_progressed`

当数据录入流程发生变化时触发此事件，前端使用它来重新加载流程状态。

| 字段       | 描述                 |
| ---------- | -------------------- |
| `handler`  | 流程处理程序。         |
| `flow_id`  | 流程标识符。           |

### `homeassistant_start`、`homeassistant_started`

这些事件在 Home Assistant 启动期间按以下顺序触发：

1. `homeassistant_start`
2. `homeassistant_started`

这些事件不包含额外数据。

如果您想在 Home Assistant 启动事件上触发自动化，我们建议使用特殊的 [Home Assistant 触发器](/home-assistant/docs/automation/trigger/index.md#home-assistant-triggers)，而不是监听这些事件。

### `homeassistant_stop`、`homeassistant_final_write`、`homeassistant_close`

这些事件在 Home Assistant 关闭期间按以下顺序触发：

1. `homeassistant_stop`
2. `homeassistant_final_write`
3. `homeassistant_close`

这些事件不包含额外数据。

请注意，`homeassistant_final_write` 和 `homeassistant_close` 不能与自动化一起使用，因为当它们被触发时，自动化引擎已经停止了。

如果您想在 Home Assistant 停止事件上触发自动化，我们建议使用特殊的 [Home Assistant 触发器](/home-assistant/docs/automation/trigger/index.md#home-assistant-triggers)，而不是监听这些事件。

### `logbook_entry`

| 字段        | 描述                                         |
| ----------- | -------------------------------------------- |
| `name`      | 实体名称。示例：`Kitchen light`。             |
| `message`   | 消息。示例：`was turned on`。                 |
| `domain`    | 可选，条目的域。示例：`light`。               |
| `entity_id` | 可选，被记录实体的标识符。                     |

### `service_registered`

当在 Home Assistant 中注册新的服务动作时触发此事件。

| 字段      | 描述                                                              |
| --------- | ------------------------------------------------------------------ |
| `domain`  | 提供此动作的集成的域。示例：`light`。                              |
| `service` | 服务动作的名称。示例：`turn_on`。                                  |

### `service_removed`

当从 Home Assistant 中移除服务动作时触发此事件。

| 字段      | 描述                                                              |
| --------- | ------------------------------------------------------------------ |
| `domain`  | 提供此动作的集成的域。示例：`light`。                              |
| `service` | 服务动作的名称。示例：`turn_on`。                                  |

### `state_changed`

当状态发生变化时触发此事件。它包含实体标识符以及实体的 `new_state` 和 `old_state`，它们都是[状态对象](/home-assistant/docs/configuration/state_object/index.md)。

| 字段        | 描述                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------- |
| `entity_id` | 发生变化的实体的标识符。示例：`light.kitchen`。                                               |
| `old_state` | 实体变化前的先前状态。如果状态是首次设置，则省略。                                             |
| `new_state` | 实体的新状态。如果状态已被移除，则省略。                                                       |

### `themes_updated`

当主题被设置或重新加载后触发此事件。它不包含额外数据。

### `user_added`

当添加用户时触发此事件。

| 字段      | 描述                     |
| --------- | ------------------------ |
| `user_id` | 新用户的标识符。           |

### `user_removed`

当移除用户时触发此事件。

| 字段      | 描述                     |
| --------- | ------------------------ |
| `user_id` | 被移除用户的标识符。       |

## 内置事件（默认集成）

### `automation_reloaded`

集成：[`automation`](/home-assistant/integrations/automation/index.md)

当自动化被重新加载并可能发生变化时触发此事件。

此事件不包含额外数据。

### `automation_triggered`

集成：[`automation`](/home-assistant/integrations/automation/index.md)

当自动化被触发时触发此事件。

| 字段        | 描述                       |
| ----------- | -------------------------- |
| `name`      | 自动化的名称。               |
| `entity_id` | 自动化的标识符。             |

### `scene_reloaded`

集成：[`homeassistant`](/home-assistant/integrations/homeassistant/index.md)

当场景被重新加载并可能发生变化时触发此事件。

此事件不包含额外数据。

### `script_started`

集成：[`script`](/home-assistant/integrations/script/index.md)

当脚本运行时触发此事件。脚本可以由用户调用或由自动化触发。由此产生的变化可以被追踪，因为所有相关事件将与此事件共享相同的上下文。

| 字段        | 描述                            |
| ----------- | -------------------------------- |
| `name`      | 运行的脚本的名称。               |
| `entity_id` | 运行的脚本的标识符。             |
