---
title: 自动化模板
description: '自动化支持模板(/home-assistant/docs/configuration/templating/)的高级功能，就像脚本一样。除了脚本可用的 Home Assistant 模板扩展(/home-assistant/docs/configuration/templating/home-assistan。'
---
# 自动化模板

自动化支持[模板](/home-assistant/docs/configuration/templating/)的高级功能，就像脚本一样。除了脚本可用的 [Home Assistant 模板扩展](/home-assistant/docs/configuration/templating/#home-assistant-template-extensions)之外，自动化还可以使用 `trigger` 和 `this` 模板变量。

模板中使用变量的示例：

- `this.name` 是从此触发器执行的自动化的名称
- `trigger.platform` 是触发器对象的类型，如 `calendar`

## 可用的状态数据

模板变量 `this` 是一个对象，包含触发动作时该自动化的[状态](/home-assistant/docs/configuration/state_object)，可用于评估活动自动化配置中声明的 [`trigger_variables`](/home-assistant/docs/automation/trigger/#触发器变量)。状态对象还包含上下文数据，可用于识别引发状态变化或触发执行的用户。请注意，`this` 在动作执行期间不会改变。

## 可用的触发器数据

模板变量 `trigger` 是一个对象，包含有关哪个触发器触发了自动化的详细信息。`platform` 属性包含其事件触发自动化的触发器的名称。

模板可以使用这些数据来修改自动化执行的操作或消息中显示的内容。例如，您可以创建一个可由多个传感器触发的自动化，然后使用传感器的位置来指定要激活的灯；或者您可以发送包含触发它的传感器的友好名称的通知。

每种[触发器](/home-assistant/docs/automation/trigger/#事件触发器)平台都包含该触发器特有的附加数据。

### 全部

来自所有平台的触发器都将包含以下属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 触发器对象类型。 |
| `trigger.alias` | 触发器的别名。 |
| `trigger.id` | [触发器的 `id`](/home-assistant/docs/automation/trigger/#触发器-id)。 |
| `trigger.idx` | 触发器的索引。（第一个触发器 idx 为 `0`。） |

### 日历

以下是[日历触发器](/home-assistant/docs/automation/trigger/#日历触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform`                   | 固定值：`calendar` |
| `trigger.event`                      | 触发事件类型，`start`（开始）或 `end`（结束）。 |
| `trigger.calendar_event`             | 匹配的日历事件对象。 |
| `trigger.calendar_event.summary`     | 日历事件的标题或摘要。 |
| `trigger.calendar_event.start`       | 日历事件开始日期或日期时间的字符串表示，例如 `2022-04-10` 或 `2022-04-10 11:30:00-07:00` |
| `trigger.calendar_event.end`         | 日历事件结束日期或日期时间的字符串表示（UTC），例如 `2022-04-11` 或 `2022-04-10 11:45:00-07:00` |
| `trigger.calendar_event.all_day`     | 指示事件是否持续全天。 |
| `trigger.calendar_event.description` | 日历事件的详细描述（如果有）。 |
| `trigger.calendar_event.location`    | 日历事件的位置信息（如果有）。 |
| `trigger.offset`                     | 事件偏移量的时间差对象（如果有）。 |

### 设备

以下是[设备触发器](/home-assistant/docs/automation/trigger/#设备触发器)可用的属性。

继承自[事件](#事件)或[状态](#状态)模板变量，具体取决于为设备选择的触发器类型。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`device` |

### 事件

每当实体状态更改或发生与配置的 event_type 匹配的事件时，[事件](/home-assistant/docs/configuration/events/)触发器就会触发。

以下是[事件触发器](/home-assistant/docs/automation/trigger/#事件触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform`       | 固定值：`event` |
| `trigger.event`          | 匹配的事件对象。 |
| `trigger.event.event_type` | 事件类型。 |
| `trigger.event.data`     | 可选的事件数据。 |

### 地理定位

以下是[地理位置触发器](/home-assistant/docs/automation/trigger/#地理位置触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`geo_location` |
| `trigger.event` | 触发事件类型，`enter`（进入）或 `leave`（离开）。 |
| `trigger.source` | 创建触发事件的地理定位平台。 |
| `trigger.zone` | 区域的状态对象。 |

### Home Assistant

对于自动化，推荐使用 Home Assistant 触发器，而不是 [homeassistant_start 或 homeassistant_stop 事件](/home-assistant/docs/configuration/events/#homeassistant_start-homeassistant_started)。

以下是 [Home Assistant 触发器](/home-assistant/docs/automation/trigger/#home-assistant-触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`homeassistant` |
| `trigger.event` | 触发事件类型，`start`（启动）或 `shutdown`（关闭）。 |

### MQTT

以下是 [MQTT 触发器](/home-assistant/docs/automation/trigger/#mqtt-触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`MQTT` |
| `trigger.topic` | 接收负载的主题。 |
| `trigger.payload` | 负载。 |
| `trigger.payload_json` | JSON 解析负载的字典。 |
| `trigger.qos` | 负载的 QOS。 |

### 数值状态

以下是[数值状态触发器](/home-assistant/docs/automation/trigger/#数值状态触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`numeric_state` |
| `trigger.entity_id` | 我们观察的实体 ID。 |
| `trigger.below` | 低于阈值（如果有）。 |
| `trigger.above` | 高于阈值（如果有）。 |
| `trigger.from_state` | 实体的先前[状态对象] |
| `trigger.to_state` | 触发触发器的新[状态对象]。 |
| `trigger.for` | 状态满足高于/低于条件的时间长度的时间差对象（如果有）。 |

### 语句

以下是[语句触发器](/home-assistant/docs/automation/trigger/#语句触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`conversation` |
| `trigger.sentence` | 匹配的语句文本。 |
| `trigger.slots`    | 匹配的槽位值的对象。 |
| `trigger.details`  | 按名称匹配的槽位详细信息的对象，例如[通配符](/home-assistant/docs/automation/trigger/#sentence-wildcards)。每个详细信息包含：<ul><li>`name` - 槽位名称</li><li>`text` - 匹配的文本</li><li>`value` - 输出值（参见[列表](/home-assistant/docs/voice/intent-recognition/template-sentence-syntax/#lists)）</li></ul> |
| `trigger.device_id` | 捕获命令的设备 ID（如果有）。 |
| `trigger.satellite_id` | 捕获命令的卫星实体 ID（如果有）。 |

### 状态

以下是[状态触发器](/home-assistant/docs/automation/trigger/#状态触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`state` |
| `trigger.entity_id` | 我们观察的实体 ID。 |
| `trigger.from_state` | 实体的先前[状态对象]。 |
| `trigger.to_state` | 触发触发器的新[状态对象]。 |
| `trigger.for` | 状态已保持该状态的时间长度的时间差对象（如果有）。 |

### 太阳

以下是[太阳触发器](/home-assistant/docs/automation/trigger/#太阳触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`sun` |
| `trigger.event` | 刚刚发生的事件：`sunset`（日落）或 `sunrise`（日出）。 |
| `trigger.offset` | 事件偏移量的时间差对象（如果有）。 |

### 标签

以下是[标签触发器](/home-assistant/docs/automation/trigger/#tag-trigger)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`tag` |
| `trigger.tag_id` | 捕获的标签 ID。 |
| `trigger.device_id` | 捕获标签的可选设备 ID。 |

### 模板

以下是[模板触发器](/home-assistant/docs/automation/trigger/#模板触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`template` |
| `trigger.entity_id` | 导致变化的实体 ID。 |
| `trigger.from_state` | 导致变化的实体的先前[状态对象]。 |
| `trigger.to_state` | 导致模板变化的实体的新[状态对象]。 |
| `trigger.for` | 状态已保持该状态的时间长度的时间差对象（如果有）。 |

### 时间

以下是[时间触发器](/home-assistant/docs/automation/trigger/#time-trigger)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`time` |
| `trigger.now` | 触发时间触发器的 DateTime 对象。 |

### 时间模式

以下是[时间模式触发器](/home-assistant/docs/automation/trigger/#时间模式触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`time_pattern` |
| `trigger.now` | 触发时间模式触发器的 DateTime 对象。 |

### 持久通知

以下是[持久通知触发器](/home-assistant/docs/automation/trigger/#持久通知触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`persistent_notification` |
| `trigger.update_type` | 持久通知更新的类型：`added`（添加）、`removed`（移除）、`current`（当前）或 `updated`（更新）。 |
| `trigger.notification` | 触发持久通知触发器的通知对象。 |
| `trigger.notification.notification_id` | 通知 ID。 |
| `trigger.notification.title` | 通知的标题。 |
| `trigger.notification.message` | 通知的消息。 |
| `trigger.notification.created_at` | 指示通知创建时间的 DateTime 对象。 |

### Webhook

以下是 [Webhook 触发器](/home-assistant/docs/automation/trigger/#webhook-触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`webhook` |
| `trigger.webhook_id` | 被触发的 webhook ID。 |
| `trigger.json` | 请求的 JSON 数据（如果是 JSON 内容类型）作为映射。 |
| `trigger.data` | 请求的表单数据（如果是表单数据内容类型）。 |
| `trigger.query` | 请求的 URL 查询参数（如果提供）。 |

### 区域

以下是[区域触发器](/home-assistant/docs/automation/trigger/#区域触发器)可用的属性。

| 模板变量 | 数据 |
| ---- | ---- |
| `trigger.platform` | 固定值：`zone` |
| `trigger.entity_id` | 我们正在观察的实体 ID。 |
| `trigger.from_state` | 实体的先前[状态对象]。 |
| `trigger.to_state` | 实体的新[状态对象]。 |
| `trigger.zone` | 区域的状态对象。 |
| `trigger.event` | 触发器观察到的事件：`enter`（进入）或 `leave`（离开）。 |

## 示例

```yaml
# 示例 configuration.yaml 条目
automation:
  triggers:
    - trigger: state
      entity_id: device_tracker.paulus
      id: paulus_device
  actions:
    - action: notify.notify
      data:
        message: >
          Paulus 的状态刚刚从 {{ trigger.from_state.state }}
          变为 {{ trigger.to_state.state }}
          
          此次触发来自 {{ trigger.id }}

automation 2:
  triggers:
    - trigger: mqtt
      topic: "/notify/+"
  actions:
    - action: >
        notify.{{ trigger.topic.split('/')[-1] }}
      data:
        message: "{{ trigger.payload }}"

automation 3:
  triggers:
    # 多个实体，您希望对它们执行相同的操作。
    - trigger: state
      entity_id:
        - light.bedroom_closet
        - light.kiddos_closet
        - light.linen_closet
      to: "on"
      # 当有人让这些灯中的任何一个开着 10 分钟时触发。
      for: "00:10:00"
  actions:
    - action: light.turn_off
      target:
        # 关闭触发自动化的任何实体。
        entity_id: "{{ trigger.entity_id }}"

automation 4:
  triggers:
    # 当 Home Assistant 扫描 NFC 标签时...
    - trigger: event
      event_type: tag_scanned
      # ...由特定人员扫描
      context:
        user_id:
          - 06cbf6deafc54cf0b2ffa49552a396ba
          - 2df8a2a6e0be4d5d962aad2d39ed4c9c
  conditions:
    # 检查 NFC 标签（ID）是否是前门的那个
    - condition: template
      value_template: "{{ trigger.event.data.tag_id == 'front_door' }}"
  actions:
    # 关闭各种灯
    - action: light.turn_off
      target:
        entity_id:
          - light.kitchen
          - light.bedroom
          - light.living_room
```

[state object]: /docs/configuration/state_object/
