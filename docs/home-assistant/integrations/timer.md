---
title: Timer
description: '计时器（Timer） 集成旨在简化基于（动态）时长的自动化。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Automation
  - Helper
ha_release: 0.57
ha_quality_scale: internal
ha_domain: timer
ha_integration_type: helper
---
# Timer

**计时器（Timer）** 集成旨在简化基于（动态）时长的自动化。

当计时器结束或被取消时，会触发相应事件。这样您就可以区分：一个计时器是因为设定时长已到而从 `active` 切换到 `idle`，还是因为被取消而切换。要在自动化中控制计时器，可以使用下文列出的操作。当对一个已在运行的计时器调用 `start` 操作时，它会重置剩余时长并重新开始，而不会触发 canceled 或 finished 事件。例如，这让您很容易创建由运动触发的定时灯光。启动计时器通常会触发 started 事件；如果计时器原本处于暂停状态，则会触发 restarted 事件。

:::note
如果配置了 `restore` 选项，计时器会在 Home Assistant 启动和重启后恢复到正确的状态和剩余时间。

但是，如果计时器在 Home Assistant 未运行期间到期，那么使用 `timer.finished` 事件的自动化在启动时**不会**被补触发。

:::
## 配置

配置计时器辅助项的首选方式是通过用户界面：前往 **[Settings > Devices & services > Helpers](https://my.home-assistant.io/redirect/helpers/)**，点击添加按钮，然后选择 [**Timer（计时器）**](https://my.home-assistant.io/redirect/config_flow_start/?domain=timer)。

若要通过用户界面添加 Helpers，您的 `configuration.yaml` 中应包含 `default_config:`；除非您手动删除了它，否则默认应该已经存在。如果您移除了 `default_config:`，则必须先在 `configuration.yaml` 中添加 `timer:`，之后才能使用 UI。

计时器也可以通过 `configuration.yaml` 配置：
要在您的安装中添加计时器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
timer:
  laundry:
    duration: "00:01:00"
```

```yaml
"[alias]":
  description: 计时器别名。允许多个条目。
  required: true
  type: map
  keys:
    name:
      description: 计时器的友好名称。
      required: false
      type: string
    duration:
      description: Home Assistant 启动时的初始时长，单位可为秒或 `00:00:00` 格式。
      required: false
      type: [integer, time]
      default: 0
    icon:
      description: 为状态卡片设置自定义图标。
      required: false
      type: icon
    restore:
      description: 为 true 时，处于活动或暂停状态的计时器会在 Home Assistant 启动和重启后恢复到正确状态和时间。
      required: false
      type: boolean
      default: false
```

可从 [Material Design Icons](https://pictogrammers.com/library/mdi/) 中选择图标用于计时器，并在名称前加上 `mdi:`。例如：`mdi:car`、`mdi:ambulance` 或 `mdi:motorbike`。

## 可能的状态

| 状态 | 说明 |
| ----- | ----------- |
| `idle` | 计时器空闲，因为计时已结束、被取消，或从未启动 |
| `active` | 计时器正在运行，因为它被（重新）启动了 |
| `paused` | 计时器已暂停 |

## 事件

| 事件 | 说明 |
| --------------- | ----------- |
| `timer.cancelled` | 当计时器被取消时触发 |
| `timer.finished` | 当计时器完成时触发，并在事件数据中包含 `finished_at` 日期/时间。`finished_at` 通常应为当前时间，或前几秒内的时间。 |
| `timer.started` | 当计时器启动时触发 |
| `timer.restarted` | 当计时器重新启动时触发 |
| `timer.paused` | 当计时器暂停时触发 |

## 操作

### 操作：Start

`timer.start` 操作用于以指定时长启动或重新启动计时器。如果未提供时长，它会用初始值重新启动，或继续一个已暂停的计时器并使用其剩余时长。如果提供了新的时长，这个时长会一直生效到计时器结束或被取消，此后时长会恢复为原始配置值。时长可写为秒数，也可写成更易读的 `01:23:45` 格式。
您也可以使用 `entity_id: all`，这样所有活动中的计时器都会被启动。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id`            | 否 | 要执行操作的实体名称，例如 `timer.timer0`。 |
| `duration`             | 是 | 计时结束前的时长，可为秒数或 `01:23:45` 格式。 |

### 操作：Change

`timer.change` 操作用于更改正在运行中的计时器。它会基于给定的时长调整当前计时器。您也可以使用 `entity_id: all`，这样所有活动中的计时器都会被修改。您不能将时长延长到超出 `timer.start` 所设定的上限。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |
| `duration`             |      no  | Duration in seconds or `00:00:00` to add or subtract from the running timer. |

### 操作：Pause

`timer.pause` 操作用于暂停正在运行的计时器。暂停后会保留剩余时长，以便后续继续运行。要恢复计时器，请在不传入 `duration` 的情况下调用 `timer.start`。您也可以使用 `entity_id: all`，这样所有活动中的计时器都会被暂停。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

### 操作：Cancel

`timer.cancel` 操作用于取消一个正在运行或已暂停的计时器。它会将时长重置为最近一次已知的初始值，但不会触发 `timer.finished` 事件。您也可以使用 `entity_id: all`，这样所有活动和暂停状态的计时器都会被取消。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

### 操作：Finish

`timer.finish` 操作用于提前手动结束一个正在运行或已暂停的计时器。您也可以使用 `entity_id: all`，这样所有活动和暂停状态的计时器都会被结束。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

### 操作：Reload

`timer.reload` 操作用于重新加载 `timer` 配置，而无需重启 Home Assistant。本操作不接受任何数据属性。

### 使用操作

前往 [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_services/)，选择 `timer.start` 操作，然后点击 **Fill Example Data** 按钮。接着修改 `entity_id` 和 `duration`，再点击 **Perform action**。

## 示例

将名为 `test` 的计时器设置为 30 秒。

```yaml
# Example configuration.yaml entry
timer:
  test:
    duration: "00:00:30"
```

### 从前端控制计时器

```yaml
# Example automations.yaml entry
- alias: "Timerswitch"
  id: "Timerstart"
  # 当开关 pumprun 被设为 on 时启动计时器。
  triggers:
  - trigger: state
    entity_id: switch.pumprun
    to: "on"
  actions:
  - action: timer.start
    target:
      entity_id: timer.test

# 当计时器结束、时间耗尽时，发送另一条消息
- alias: "Timerstop"
  id: "Timerstop"
  triggers:
  - trigger: event
    event_type: timer.finished
    event_data:
      entity_id: timer.test
  actions:
  - action: notify.nma
    data:
      message: "Timer stop"
```

### 手动控制计时器

借助 [`script`](/home-assistant/integrations/script/) 集成，您可以手动控制计时器（`timer` 配置示例见上文）。

```yaml
script:
  start_timer:
    alias: "Start timer"
    sequence:
      - action: timer.start
        target:
          entity_id: timer.test
  pause_timer:
    alias: "Pause timer"
    sequence:
      - action: timer.pause
        target:
          entity_id: timer.test
  cancel_timer:
    alias: "Cancel timer"
    sequence:
      - action: timer.cancel
        target:
          entity_id: timer.test
  finish_timer:
    alias: "Finish timer"
    sequence:
      - action: timer.finish
        target:
          entity_id: timer.test
```
