---
title: Statistics
description: 'Statistics 集成会监视源传感器的状态，并提供其近期历史的聚合统计特征。这个集成在自动化中很有用，例如：在浴室热水澡后空气湿度恢复平稳时触发操作，或在一天内冲泡咖啡次数过多时触发提醒。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Helper
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: '0.30'
ha_quality_scale: internal
ha_codeowners:
  - '@ThomDietrich'
  - '@gjohansson-ST'
ha_domain: statistics
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
---
# Statistics

**Statistics** 集成会监视源传感器的状态，并提供其近期历史的聚合统计特征。这个集成在自动化中很有用，例如：在浴室热水澡后空气湿度恢复平稳时触发操作，或在一天内冲泡咖啡次数过多时触发提醒。

统计传感器可以使用数值型传感器或 `binary_sensor` 作为输入。配置中必须包含要考虑的时间范围和/或最近状态变化的数量。详情请参阅下面的配置部分。

如果 [`recorder`](/home-assistant/integrations/recorder/) 集成正在运行，平台启动时会从数据库中读取历史传感器数据，因此在重启后可立即获得数据。如果 [`recorder`](/home-assistant/integrations/recorder/) 集成*未*运行，传感器开始输出数据可能需要一些时间，因为某些统计特征的计算需要不止一个源传感器值。

:::tip
`Statistics` 集成不同于 Long-term statistics。

:::
统计传感器内部有一个缓冲区，用于存储各种函数（例如 `average_step`）计算所需的值。每当有新值加入缓冲区，或有元素被移除时，传感器都会更新。这既可能由源传感器状态变化触发（实际数值可能变化，也可能不变），也可能由旧值过期触发（在指定了 `max_age` 的情况下）。这意味着，当数值长期不变时，缓冲区中可能会保存一连串相同的值。

当使用基于时间的缓冲区（即提供 `max_age`）时，建议缓冲区中至少包含足够数量、并覆盖整个时间范围的值。对于变化不大的传感器，可以通过使用带时间触发器的模板传感器作为输入来实现这一点。如果输入值没有覆盖大部分时间范围，计算结果可能会出乎意料。
例如：如果想知道某个开关在过去 5 分钟内是否被使用过，可以使用 `count_on`。但如果读取不够频繁，缓冲区里只有一个“Off”值（哪怕它是一秒前才出现的），结果也会是 0，即便该传感器在过去五分钟的大部分时间里其实都是“On”。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

有关这些配置选项的更多信息，请参阅 [YAML 配置](#yaml-configuration)。

```yaml
Name:
  description: 传感器名称。
Entity:
  description: 提供输入的实体。支持数值型 `sensor` 和 `binary_sensor`。
State_characteristic:
  description: 可选择的统计特征列表。
Sampling size:
  description: 存储的源传感器测量值最大数量。
Max age:
  description: 存储的源传感器测量值的最大保留时间。
Keep last sample:
  description: 定义是否无论 `Max age` 设置如何，都保留最近一次采样值。
Percentile:
  description: 仅在与 `percentile` 特征配合使用时相关。必须是 1 到 99 之间的值。
Precision:
  description: 定义计算后传感器值的小数位数。
```

## 特征

配置参数 `state_characteristic` 可使用以下统计特征。请特别注意正确设置 `sampling_size` 和/或 `max_age`，因为大多数特征都会直接受到这些设置影响。

### 数值型源传感器

对于 `sensor` 类型的源传感器，支持以下 `state_characteristic`：

| 状态特征 | 说明 |
| -------------------- | ----------- |
| `average_linear` | 在考虑测量值之间时间间隔的基础上，计算存储测量值的平均值。每对测量值之间使用线性插值。适用于更新频繁但非周期性的源传感器，且测量值表示连续变化行为的情况（例如用电量）。警告：这不会计算 `max_age` 定义的完整区间内的精确平均值，只会考虑缓冲区中第一个值与最后一个值之间的区间。 |
| `average_step` | 在考虑测量值之间时间间隔的基础上，计算存储测量值的平均值。使用 LOCF（last observation carried forward，加权沿用上一个观测值），即认为两个测量之间保持旧值不变。与线性方法相比，这更符合 Home Assistant 处理恒定值的方式，也更适合处于稳定档位切换的传感器（例如加热档位为 1、2 或 3）。警告：这不会计算 `max_age` 定义的完整区间内的精确平均值，只会考虑缓冲区中第一个值与最后一个值之间的区间。 |
| `average_timeless` | 存储测量值的平均值。该方法假设所有测量间隔相等，因此忽略时间，仅计算简单平均值。等同于 `mean`。 |
| `change_sample` | 每个样本的平均变化量。用最新值与最旧值之差除以其间样本数（n-1）。 |
| `change_second` | 每秒的平均变化量。用最新值与最旧值之差除以两者之间的秒数。 |
| `change` | 最新值与最旧值之间的差值。 |
| `count` | 存储的源传感器读数数量。该数量受 `sampling_size` 限制，在 `max_age` 范围内也可能较少。 |
| `datetime_newest` | 最新测量值的时间戳。 |
| `datetime_oldest` | 最旧测量值的时间戳。 |
| `datetime_value_max` | 数值最大的测量值对应的时间戳。 |
| `datetime_value_min` | 数值最小的测量值对应的时间戳。 |
| `distance_95_percent_of_values` | 基于假定正态分布标准差得出的统计指标。95% 的存储值会落在返回范围大小对应的区间内。 |
| `distance_99_percent_of_values` | 基于假定正态分布标准差得出的统计指标。99% 的存储值会落在返回范围大小对应的区间内。 |
| `distance_absolute` | 测量值极值之间的差值或“离散范围”。等于 `value_max - value_min`。 |
| `mean` | 所有测量值的平均值。请注意，它不考虑测量之间不均匀的时间间隔。 |
| `mean_circular` | 角度测量值（如风向）的[圆均值](https://en.wikipedia.org/wiki/Circular_mean)。假定测量值以角度表示（如 180° 或 -90°），输出为正角度（0-360°）的平均值。 |
| `median` | 所有测量值的[中位数](https://en.wikipedia.org/wiki/Mode_(statistics)#Comparison_of_mean,_median_and_mode)。 |
| `noisiness` | 简化版信噪比。数值越高表示源传感器变化越快，数值越低表示源传感器越稳定。计算方法为：相邻测量值之间绝对变化量之和除以区间数量。 |
| `percentile` | [百分位数](https://en.wikipedia.org/wiki/Percentile) 会将所有被考虑的源传感器测量值分布范围划分为 100 个等概率连续区间。该特征计算某一百分比以下的数值。例如第 20 百分位表示有 20% 的测量值低于该值。需要额外配置参数 `percentile`，见下文。 |
| `standard_deviation` | 所有测量值在假定正态分布下的[标准差](https://en.wikipedia.org/wiki/Standard_deviation)。 |
| `sum` | 在给定时间范围和采样数量限制内，所有源传感器测量值的数学和。 |
| `sum_differences` | 在给定时间范围和采样数量限制内，相邻源传感器测量值差值的数学和。 |
| `sum_differences_nonnegative` | 在给定时间范围和采样数量限制内，相邻源传感器测量值中非负差值的数学和。该特征假定源传感器值只会递增，但偶尔可能被重置为零。如果某个值小于前一个值，函数会假定前一个值之后发生了归零。 |
| `total` | 在给定时间范围和采样数量限制内，所有源传感器测量值的数学和。等同于 `sum`。 |
| `value_max` | 测量值中的最大值。 |
| `value_min` | 测量值中的最小值。 |
| `variance` | 所有测量值在假定正态分布下的[方差](https://en.wikipedia.org/wiki/Variance)。 |

### 二进制源传感器

对于 `binary_sensor` 类型的源传感器，支持以下 `state_characteristic`：

| 状态特征 | 说明 |
| -------------------- | ----------- |
| `average_step` | 在所有存储测量值中，二进制源传感器处于“开启”状态所占的时间百分比。例如：如果一小时内检测到 6 分钟运动，则 `average_step` 为 10%。 |
| `average_timeless` | 在存储测量值中，二进制源传感器为“开启”的比例。忽略开/关状态持续时间。例如：如果一小时内只检测到一次运动，则 `average_timeless` 为 33.3%（假设存储值为“关闭”、“开启”、“关闭”）。等同于 `mean`。 |
| `count` | 存储的源传感器读数数量。 |
| `count_on` | 存储值中为“开启”的源传感器读数数量。请注意，默认情况下只会记录状态变化，除非源传感器的 `force_update` 属性设为 `true`。 |
| `count_off` | 存储值中为“关闭”的源传感器读数数量。请注意，默认情况下只会记录状态变化，除非源传感器的 `force_update` 属性设为 `true`。 |
| `datetime_newest` | 最新测量值的时间戳。 |
| `datetime_oldest` | 最旧测量值的时间戳。 |
| `mean` | 存储测量值中二进制源传感器为“开启”的比例。忽略开/关状态持续时间。例如：如果一小时内只检测到一次运动，则 `average_timeless` 为 33.3%（假设存储值为“关闭”、“开启”、“关闭”）。 |

## 属性

统计传感器会提供以下属性，以反映其内部状态。

| 属性 | 说明 |
| --------- | ----------- |
| `age_coverage_ratio` | 仅在定义了 `max_age` 时存在。表示被考虑的源传感器测量值（时间范围 `max_age`）在最旧值与最新值之间覆盖配置时间范围的比例（0.0-1.0）。较低的数值可能表示配置限制与源传感器行为不匹配。值为 1.0 表示至少有两个值覆盖了完整时间范围；值为 0 表示只考虑了一个测量值。若没有存储测量值，传感器会变为 `unknown`。 |
| `buffer_usage_ratio` | 仅在定义了 `sampling_size` 时存在。表示配置缓冲区大小中已被存储的源传感器测量值使用的比例（0.0-1.0）。较低的数值可能表示配置限制与源传感器行为不匹配。值为 1.0 表示缓冲区已满，值为 0 表示缓冲区为空。 |
| `source_value_valid` | `true`/`false`，表示源传感器是否为统计传感器提供有效值（基于最近一次接收到的值判断）。 |

## YAML 配置

可通过在 `configuration.yaml` 中添加类似以下示例的内容来定义统计传感器：

```yaml
sensor:
  - platform: statistics
    name: "Bathroom humidity mean over last 24 hours"
    entity_id: sensor.bathroom_humidity
    state_characteristic: mean
    max_age:
      hours: 24

  - platform: statistics
    entity_id: binary_sensor.movement
    state_characteristic: count_on
    sampling_size: 100

  - platform: statistics
    name: "Bathroom humidity change over 5 minutes"
    entity_id: sensor.bathroom_humidity
    state_characteristic: change
    max_age:
      minutes: 5
    sampling_size: 50
    precision: 1
```

```yaml
entity_id:
  description: 要监视并计算统计特征的源传感器。仅支持 [sensors](/home-assistant/integrations/sensor/) 和 [binary sensors](/home-assistant/integrations/binary_sensor/)。
  required: true
  type: string
name:
  description: 新统计传感器的名称。
  required: false
  default: Stats
  type: string
state_characteristic:
  description: 作为统计传感器状态值使用的特征（见上表）。
  required: true
  type: string
sampling_size:
  description: 存储的源传感器测量值最大数量。如果样本主要由 `max_age` 控制，请确保此值设置得足够大，或干脆省略。统计传感器必须定义 `sampling_size`、`max_age` 或两者之一。
  required: false
  type: integer
max_age:
  description: 存储的源传感器测量值最大保留时间。将其设置为某个时间段后，更旧的值会被丢弃。如果省略，则考虑的源传感器测量值数量仅受 `sampling_size` 限制。请根据使用场景合理设置这两个参数。若源传感器在该时间范围内未更新，传感器值将变为 `unknown`。统计传感器必须定义 `sampling_size`、`max_age` 或两者之一。
  required: false
  type: time
keep_last_sample:
  description: 定义是否无论 `max_age` 设置如何，都保留最近一次采样值。
  required: false
  default: false
  type: boolean
percentile:
  description: 仅在与 `percentile` 特征配合使用时相关。必须是 1 到 99 之间的值。该值定义要计算的百分位数。第 25 百分位也称第一四分位数，第 50 百分位即中位数。
  required: false
  default: 50
  type: integer
precision:
  description: 定义计算后传感器值的小数位数。
  required: false
  default: 2
  type: integer
unique_id:
  description: 唯一标识统计传感器的 ID。将其设置为唯一值后，可通过 UI 进行自定义。如果修改了已配置传感器的 `state_characteristic`，请同时修改 `unique_id`，以便从全新的 recorder 历史开始。
  required: false
  type: string
```

### 关于 `max_age` 和 `sampling_size` 的重要说明

如果同时给出 `max_age` 和 `sampling_size`，则被考虑的样本是 `max_age` 时间窗口内、但最多只取最近的 `sampling_size` 个样本。若使用较长的 `max_age`，请务必将 `sampling_size` 设置得足够大（例如：如果 `max_age` 为 1 小时，而某传感器每分钟产生一个测量值，则 `sampling_size` 至少应为 60，才能使用该时间范围内的全部样本）。

如果只设置了 `sampling_size`，则没有时间限制。如果只设置了 `max_age`，则被考虑的样本数量不受限制。
