# System Log

**System Log** 集成会存储 Home Assistant 中所有已记录的错误和警告信息。要查看日志，请前往 [**Settings** > **System** > **Logs**](https://my.home-assistant.io/redirect/logs/)（可查看精简日志和完整原始日志）。为了避免日志数据过多影响 Home Assistant，精简日志仅保存最近 50 条错误和警告。更早的条目会自动从精简日志中丢弃；完整原始日志会保留全部记录。你可以使用 `max_entries` 参数调整精简日志的保存条目数。

## 配置

此集成会由 `frontend` 自动加载（如果你使用前端，则无需执行任何操作）。如果你不使用前端，或想修改参数，请将以下内容添加到 `configuration.yaml` 文件：

```yaml
system_log:
  max_entries: MAX_ENTRIES
```

```yaml
max_entries:
  description: 精简日志中保存的条目数（更早条目会被丢弃）。
  required: false
  type: integer
  default: 50
fire_event:
  description: 是否触发事件（作为触发器使用时必须启用）。
  required: false
  type: string
  default: false
```

## 动作

### 动作：Clear

`system_log.clear` 动作用于手动清空系统日志。

### 动作：Write

`system_log.write` 动作用于写入日志条目。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ------------------------------------------------------------------------------ |
| `message`              | no       | 要写入日志的消息 |
| `level`                | yes      | 日志级别：`debug`、`info`、`warning`、`error`、`critical`。默认值为 `error` |
| `logger`               | yes      | 记录该消息的 logger 名称。默认值为 `system_log.external` |

## 事件

错误和警告会作为 `system_log_event` 事件发布，因此你可以编写自动化，在出现警告或错误时触发。每个事件包含以下信息：

| Field | Description |
| ----------- | --------------------------------------------------------------------------- |
| `level` | 严重程度，为 `WARNING` 或 `ERROR` |
| `source` | 触发错误的文件，例如 `core.py` 或 `media_player/yamaha.py` |
| `exception` | 若可用则为完整堆栈跟踪，否则为空字符串 |
| `message` | 错误的描述性信息，例如 `Error handling request` |
| `name` | 集成名称，例如 `homeassistant.components.device_tracker` |
| `timestamp` | 双精度 Unix 时间戳，例如 `1517241010.237416` |

你可以在 [Home Assistant 日志](/home-assistant/integrations/logger/index.md#viewing-logs)中查看这些事件的实时示例。例如：

```text
2019-02-14 16:20:35 ERROR (MainThread) [homeassistant.loader] Unable to find integration system_healt
2019-02-14 16:20:36 ERROR (MainThread) [homeassistant.components.device_tracker] Error setting up platform google_maps
Traceback (most recent call last):
  File "/home/fab/Documents/repos/ha/home-assistant/homeassistant/integrations/device_tracker/__init__.py", line 184, in
[...]
```

从这段日志中可以轻松提取消息（`Unable to find integration system_healt`）、名称（`homeassistant.loader`）和级别（`ERROR`）。同时还会显示精确时间戳，以及是否包含堆栈跟踪。

## 示例

以下是一些基于 `system_log` 事件的示例。要使这些示例生效，`fire_event` 必须设置为 `true`。

### 统计警告数量

以下示例会创建一个 `counter`，每次记录警告时递增：

```yaml
counter:
  warning_counter:
    name: Warnings
    icon: mdi:alert

automation:
  - alias: "Count warnings"
    triggers:
      - trigger: event
        event_type: system_log_event
        event_data:
          level: WARNING
    actions:
      - action: counter.increment
        target:
          entity_id: counter.warning_counter
```

### 条件消息

以下自动化会在记录到包含单词 `action` 的错误或警告时创建一个持久通知：

```yaml
automation:
  - alias: "Create notifications for 'action' errors"
    triggers:
      - trigger: event
        event_type: system_log_event
    conditions:
      - condition: template
        value_template: '{{ "action" in trigger.event.data.message[0] }}'
    actions:
      - action: persistent_notification.create
        data:
          title: "Something bad happened"
          message: "{{ trigger.event.data.message[0] }}"
```

### 写入日志

以下自动化会在门被打开时创建一条新的日志记录：

```yaml
automation:
  - alias: "Log door opened"
    triggers:
      - trigger: state
        entity_id: binary_sensor.door
        from: "off"
        to: "on"
    actions:
      - action: system_log.write
        data:
          message: "Door opened!"
          level: info
```
