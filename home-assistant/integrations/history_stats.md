# History Stats

**History stats** 集成使用 [`history`](/home-assistant/integrations/history/index.md) 集成中的数据，为其他集成或平台提供快速统计信息。

它可以在自定义时间段内跟踪某个实体处于特定状态的时长。

您可以跟踪的内容示例：

* 这周您在家的时长
* 昨天灯处于开启状态的时长
* 今天您看电视的时长

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

有关这些配置选项的更多信息和示例，请参阅 [YAML configuration](#yaml-configuration)。

```yaml
Name:
  description: 传感器应使用的名称。
Entity:
  description: 提供输入数据的实体。
State:
  description: 输入实体中哪些状态会被纳入统计。
Type:
  description: 可选 `time`、`ratio` 或 `count`。
Start:
  description: 统计开始时间（timestamp 或 datetime）。可为模板。
End:
  description: 统计结束时间（timestamp 或 datetime）。可为模板。
Duration:
  description: 统计持续时间。
State class:
  description: 传感器的 [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes)。
```

## YAML 配置

若要启用历史统计传感器，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: history_stats
    name: Lamp ON today
    entity_id: light.my_lamp
    state: "on"
    type: time
    start: "{{ today_at() }}"
    end: "{{ now() }}"
```

```yaml
entity_id:
  description: 您要跟踪的实体。
  required: true
  type: string
unique_id:
  description: 唯一标识该实体的 ID。将其设置为唯一值后，可通过 UI 进行自定义。
  required: false
  type: string
state:
  description: 您要跟踪的状态。
  required: true
  type: [list, string]
name:
  description: 在前端显示的名称。请注意，Home Assistant 会用它来生成传感器的 `object_id`，因此建议选择一个唯一值；前端显示名称可通过 [customization](/home-assistant/docs/configuration/customizing-devices/#friendly_name) 或 [Dashboards](/home-assistant/dashboards/entities/#name) 再行修改。
  required: false
  default: unnamed statistics
  type: string
type:
  description: "The type of sensor: `time`, `ratio`, or `count`."
  required: false
  default: time
  type: string
start:
  description: 统计开始时间（timestamp 或 datetime）。
  required: false
  type: template
end:
  description: 统计结束时间（timestamp 或 datetime）。
  required: false
  type: template
duration:
  description: 统计持续时间。
  required: false
  type: time
state_class:
  description: "传感器的 [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes)。可为 `null`、`measurement` 或 `total_increasing`（`ratio` 类型不允许使用）。"
  required: false
  default: measurement
  type: string
```

:::note
您必须在 `start`、`end` 和 `duration` 中**恰好提供 2 个**。 <br/>
您可以使用 [template extensions](/home-assistant/docs/configuration/templating/index.md#home-assistant-template-extensions)（例如 `now()` 或 `as_timestamp()`）来处理动态日期，如下方示例所示。
:::

## 传感器类型

根据您选择的传感器类型，`history_stats` 集成可以显示不同的值：

* **time**：默认值，即跟踪时长，单位为小时
* **ratio**：跟踪时长占整个统计周期的比例，以百分比表示
* **count**：在统计时间段内，被跟踪实体匹配配置状态的次数。这里统计的是“处于某状态”的次数（例如某灯在这段时间内有多少次处于 `on` 状态），而不是状态切换次数（例如某灯被*打开*了多少次）。区别在于：如果实体在时间段开始时就已经处于目标状态，这种情况也会被此类型计入。如果 `state` 选项提供的是状态列表，则这些定义状态之间的切换会被视为同一事件的一部分，不会增加计数。

:::note
对于使用非滑动时间段（例如每小时重置，而不是始终统计最近 60 分钟）的 **time** 或 **count** 传感器，可将 `state_class` 设为 `total_increasing`，以生成跟踪 `sum` 的统计数据。这在模拟具有固定重置周期的 `utility_meter` helper 行为时非常有用。
:::

## 时间周期

`history_stats` 集成会在一个精确的时间周期内执行统计。您应始终提供以下三项中的 2 项：

* 周期开始时间（`start` 变量）
* 周期结束时间（`end` 变量）
* 周期持续时长（`duration` 变量）

由于 `start` 和 `end` 变量既可以是 datetime，也可以是 timestamp，因此您几乎可以配置任何想要的时间周期。

### Duration

当时间周期是固定长度时，可使用 duration 变量。支持多种 duration 语法，如下所示。

```yaml
# 6 hours
duration: "06:00"
```

```yaml
# 1 minute, 30 seconds
duration: "00:01:30"
```

```yaml
# 2 hours and 30 minutes
duration:
  # supports seconds, minutes, hours, days
  hours: 2
  minutes: 30
```

:::note
如果 duration 超过了 `recorder` 集成保存历史记录的天数（`purge_keep_days`），那么历史统计传感器将无法获取覆盖整个持续时间所需的全部信息。例如，如果 `purge_keep_days` 设置为 7，则持续时间为 30 天的历史统计传感器只能基于最近 7 天的历史记录进行计算。
:::

:::note
历史统计传感器会在源实体状态发生变化时更新；如果源实体没有变化，则每分钟更新一次。在使用不能被 1 分钟整除的固定 duration 时，请注意这一点。
:::

### 视频教程

此视频教程介绍了如何使用 history stats。它还展示了如何创建每日柱状图，用于可视化诸如占用情况或某个房间灯光开启时长之类的信息。

<lite-youtube videoid="BMlU4SynQBY" videotitle="How To Master Graphs to Monitor Occupancy and Device Usage in Home Assistant" posterquality="maxresdefault"></lite-youtube>

### 示例

以下是一些可用时间周期的示例，以及在 `configuration.yaml` 中应如何编写：

**Today**：从当天 00:00 开始，到当前时刻结束。

```yaml
    start: "{{ today_at('00:00') }}"
    end: "{{ now() }}"
    state_class: total_increasing
```

**Yesterday**：到今天 00:00 结束，持续 24 小时。

```yaml
    end: "{{ today_at('00:00') }}"
    duration:
      hours: 24
```

**This morning (6AM - 11AM)**：今天 6 点开始，持续 5 小时。

```yaml
    start: "{{ today_at('06:00') }}"
    duration:
      hours: 5
```

**Current week**：从本周一 00:00 开始，到当前时刻结束。

这里，本周一可通过“今天 00:00 减去当前 weekday”得到（weekday 在周一为 0，在周日为 6）。

```yaml
    start: "{{ today_at('00:00') - timedelta(days=now().weekday()) }}"
    end: "{{ now() }}"
```

**Current month**：从本月第一天 00:00 开始，到当前时刻结束。

```yaml
    start: "{{ today_at('00:00').replace(day=1) }}"
    end: "{{ now() }}"
```

**Previous month**：从上个月第一天 00:00 开始，到本月第一天结束。

```yaml
    start: "{{ (today_at('00:00').replace(day=1) - timedelta(days=1)).replace(day=1) }}"
    end: "{{ today_at('00:00').replace(day=1) }}"
```

**Next 4 pm**：持续 24 小时，从上一个下午 4 点到下一个下午 4 点。如果今天还没到下午 4 点，则表示昨天 4 点到今天 4 点；如果今天已经过了下午 4 点，则表示今天 4 点到明天 4 点。若要更改起始时间，请相应调整这 8 小时缓冲值，以匹配下一个午夜。

```yaml
    end: "{{ (now() + timedelta(hours=8)).replace(hour=16, minute=0, second=0, microsecond=0) }}"
    duration:
        hours: 24
```

**Last 30 days**：到今天 00:00 结束，持续 30 天。这个比较直接。

```yaml
    end: "{{ today_at('00:00') }}"
    duration:
      days: 30
```

**All your history**：从 timestamp = 0 开始，到当前时刻结束。

```yaml
    start: "{{ 0 }}"
    end: "{{ now() }}"
```

:::tip
Home Assistant UI 中的 `/developer-tools/template` 页面可以帮助您检查 `start`、`end` 或 `duration` 的值是否正确。如果您想确认时间周期是否设置正确，只需点击对应组件，其 `from` 和 `to` 属性会以易读格式显示该周期的起止时间。
:::
