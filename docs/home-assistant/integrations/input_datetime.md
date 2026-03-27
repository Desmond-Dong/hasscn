---
title: Input Datetime
description: 'Input Datetime 集成允许您定义可通过前端控制的日期和时间值，并可在自动化和模板中使用。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Automation
  - Helper
ha_release: 0.55
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_datetime
ha_integration_type: helper
---
# Input Datetime

**Input Datetime** 集成允许您定义可通过前端控制的日期和时间值，并可在自动化和模板中使用。

配置输入日期时间的首选方式是通过用户界面：前往 **[Settings > Devices & services > Helpers](https://my.home-assistant.io/redirect/helpers/)**。选择添加按钮，然后选择 **[Date and/or time](https://my.home-assistant.io/redirect/config_flow_start/?domain=input_datetime)** 选项。

要通过用户界面添加 **[Helpers](https://my.home-assistant.io/redirect/helpers/)**，您的 "`configuration.yaml`" 中应包含 `default_config:`。除非您手动删除，否则默认情况下它已经存在。
如果您已从配置中移除了 `default_config:`，则必须先将 `input_datetime:` 添加到您的 "`configuration.yaml`" 中，然后才能使用 UI。

`input_datetime` 也可以通过 YAML 配置。要向您的安装中添加三个日期时间输入（一个同时包含日期和时间，另外两个分别仅包含日期或时间），请将以下内容添加到您的 "`configuration.yaml`" 中：

```yaml
# configuration.yaml 示例条目
input_datetime:
  both_date_and_time:
    name: Input with both date and time
    has_date: true
    has_time: true
  only_date:
    name: Input with only date
    has_date: true
    has_time: false
  only_time:
    name: Input with only time
    has_date: false
    has_time: true
```

```yaml
  input_datetime:
    description: 日期时间输入的别名。允许多个条目。
    required: true
    type: map
    keys:
      name:
        description: 日期时间输入的友好名称。
        required: false
        type: string
      has_time:
        description: 如果输入应包含时间，则设为 `true`。`has_time` 和 `has_date` 至少要定义其中一个。
        required: false
        type: boolean
        default: false
      has_date:
        description: 如果输入应包含日期，则设为 `true`。`has_time` 和 `has_date` 至少要定义其中一个。
        required: false
        type: boolean
        default: false
      icon:
        description: 在前端输入元素前显示的图标。
        required: false
        type: icon
      initial:
        description: 根据 `has_time` 和 `has_date` 设置此输入的初始值。
        required: false
        type: [datetime, time, date]
        default: <today> 00:00 | 00:00 | <today>
```

### 属性

日期时间输入实体的状态会导出多个属性，这些属性在自动化和模板中非常有用。

| Attribute                  | Description                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `has_time`                 | 如果此实体包含时间，则为 `true`。                                                            |
| `has_date`                 | 如果此实体包含日期，则为 `true`。                                                            |
| `year`<br>`month`<br>`day` | 日期中的年、月、日。<br>（仅在 `has_date: true` 时可用）                                     |
| `timestamp`                | 表示输入中所保存时间的时间戳。<br>（仅在 `has_time: true` 时可用）                           |

### 恢复状态

如果您为 `initial` 设置了有效值，此集成启动时会使用该值作为状态。否则，它会恢复 Home Assistant 停止前的状态。

### 操作

可用操作：`input_datetime.set_datetime` 和 `input_datetime.reload`。

#### input_datetime.set_datetime

| Data attribute | Format String       | Description                                                                      |
| -------------- | ------------------- | -------------------------------------------------------------------------------- |
| `date`         | `%Y-%m-%d`          | 可用于动态设置日期。                                                             |
| `time`         | `%H:%M:%S`          | 可用于动态设置时间。                                                             |
| `datetime`     | `%Y-%m-%d %H:%M:%S` | 可用于动态同时设置日期和时间。                                                   |
| `timestamp`    | N/A                 | 可用于通过 UNIX 时间戳动态同时设置日期和时间。                                  |

要在同一次调用中同时设置日期和时间，可以一起使用 `date` 和 `time`，也可以单独使用 `datetime` 或 `timestamp`。使用 `datetime` 或 `timestamp` 的好处是可以通过一个模板同时设置两者。

#### input_datetime.reload

`input_datetime.reload` 操作允许在不重启 Home Assistant 本体的情况下重新加载 `input_datetime` 配置。

## 示例

以下示例展示了如何在自动化中将 `input_datetime` 用作触发器：

```yaml
# configuration.yaml 示例条目
# 在指定时间打开卧室灯。
automation:
  triggers:
    - trigger: time
      at: input_datetime.bedroom_alarm_clock_time
  actions:
    - action: light.turn_on
      target:
        entity_id: light.bedroom
```

要动态设置 `input_datetime`，您可以调用 `input_datetime.set_datetime`。`date`、`time` 和/或 `datetime` 的值必须符合指定格式，调用才会成功。（请参阅上方操作说明。）
如果您有一个 `datetime` 对象，可以使用其 `timestamp` 方法；如果您已经有时间戳，则可以直接使用它。


```yaml
# 将时间设为 05:30:00
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    time: "05:30:00"
# 将时间设为 datetime 对象中的时间
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    time: "{{ now().strftime('%H:%M:%S') }}"
# 将日期设为 2020-08-24
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    date: "2020-08-24"
# 将日期设为 datetime 对象中的日期
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    date: "{{ now().strftime('%Y-%m-%d') }}"
# 将日期和时间设为 2020-08-25 05:30:00
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    datetime: "2020-08-25 05:30:00"
# 将日期和时间设为 datetime 对象中的值
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    datetime: "{{ now().strftime('%Y-%m-%d %H:%M:%S') }}"
# 通过 UNIX 时间戳设置日期和/或时间
# 无论 input_datetime 仅包含日期、仅包含时间，
# 还是同时包含两者，都可以这样使用
- action: input_datetime.set_datetime
  target:
    entity_id: input_datetime.XXX
  data:
    timestamp: "{{ now().timestamp() }}"
```


