---
title: Derivative
description: 'Derivative（Wikipedia(https://en.wikipedia.org/wiki/Derivative)）集成会创建一个传感器，用于估算另一个传感器（即 源传感器）所提供数值的导数。导数传感器会在 源传感器 发生变化时更新。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Energy
  - Helper
  - Sensor
  - Utility
ha_release: 0.105
ha_iot_class: Calculated
ha_qa_scale: internal
ha_codeowners:
  - '@afaucogney'
  - '@karwosts'
ha_domain: derivative
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: helper
ha_quality_scale: internal
---
# Derivative

Derivative（[Wikipedia](https://en.wikipedia.org/wiki/Derivative)）集成会创建一个传感器，用于估算另一个传感器（即 **源传感器**）所提供数值的导数。导数传感器会在 **源传感器** 发生变化时更新。

对于断电后会重置为零、并且需要“非负导数”的传感器，比如路由器中的带宽计数器或雨量计，您现在可以直接使用此集成。请确保输入传感器具有 `total_increasing` state class，因为这对于集成正确处理重置、并避免在导数传感器中记录异常大变化是必需的。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
```yaml
Name:
  description: 传感器应使用的名称。您之后仍可再次修改。
Input sensor:
  description: 提供数值读数、用于计算导数的实体。
Precision:
  description: 将计算出的导数值四舍五入到最多 N 位小数。
Time window:
  description: 计算导数所使用的时间窗口。该窗口内的导数会使用按时间加权的简单移动平均算法（SMA）进行平均。例如，这对于输出离散数值的传感器，或用于过滤短时噪声非常有用。默认情况下，导数会在相邻两次更新之间计算，不进行平滑处理。
Metric Prefix:
  description: 为导数结果添加的公制单位前缀（[Wikipedia](https://en.wikipedia.org/wiki/Unit_prefix)）。
Time unit:
  description: 导数的 SI 时间单位。如果设置了此参数，测量单位将设置为 **x/y**，其中 **x** 是源传感器的单位，**y** 是此参数的值。
Max sub-interval:
  description: 通常，导数会在源传感器每次更新时计算。如果为此选项指定了一个时间，那么当源传感器在这段时间内没有更新时，也会重新计算导数。
```

## YAML 配置

或者，您也可以通过 YAML 手动配置和设置此集成。要在您的安装中启用 Derivative 传感器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# `configuration.yaml` 示例条目
sensor:
  - platform: derivative
    source: sensor.current_speed
```

```yaml
source:
  description: 提供数值读数的传感器实体 ID。
  required: true
  type: string
name:
  description: 在前端中使用的名称。
  required: false
  default: source entity ID derivative
  type: string
unique_id:
  description: 唯一标识该导数传感器的 ID。将其设置为唯一值可允许通过 UI 进行自定义。
  required: false
  type: string  
round:
  description: 将计算出的导数值四舍五入到最多 N 位小数。
  required: false
  default: 3
  type: integer
unit_prefix:
  description: 为导数结果添加的公制单位前缀（[Wikipedia](https://en.wikipedia.org/wiki/Unit_prefix)）。可用符号包括 `n` (1e-9)、`µ` (1e-6)、`m` (1e-3)、`k` (1e3)、`M` (1e6)、`G` (1e9)、`T` (1e12)。
  required: false
  default: None
  type: string
unit_time:
  description: 导数的 SI 时间单位。可用单位包括 `s`、`min`、`h`、`d`。如果设置了此参数，属性 **unit_of_measurement** 将被设置为 `x/y` 的形式，其中 `x` 是通过 **source** 参数指定的传感器单位，`y` 是这里给出的值。
  required: false
  default: h
  type: string
unit:
  description: 导数要使用的测量单位。这会覆盖上述自动设置的 **unit_of_measurement**。
  required: false
  type: string
time_window:
  description: 计算导数所使用的时间窗口。该窗口内的导数会通过按时间加权的简单移动平均算法进行平均。例如，这对于输出离散数值的传感器，或用于过滤短时噪声非常有用。默认情况下，导数会在相邻两次更新之间计算，不进行平滑处理。
  default: 0
  required: false
  type: time
max_sub_interval:
  description: 通常，导数会在源传感器每次更新时计算。如果为此选项指定了一个时间，那么当源传感器在这段时间内没有更新时，也会重新计算导数。
  required: false
  type: time
  default: 0
```

## 温度示例

例如，您有一个温度传感器 `sensor.temperature`，它每隔几秒输出一个值，但会四舍五入到最接近的 0.5。
这意味着连续两次输出值可能相同（因此导数 `Δy/Δx=0`，因为 `Δy=0`）。
但是，温度实际上可能仍在随时间变化。
为了捕捉这种变化，您应该使用 `time_window`，这样瞬时跳变不会导致过高的导数，并且在下一次传感器更新后，导数也不会直接变为零。
下面是一个使用 `time_window` 的 YAML 配置示例：

```yaml
sensor:
  - platform: derivative
    source: sensor.temperature
    name: Temperature change per hour
    round: 1
    unit_time: h # the resulting "unit_of_measurement" will be °C/h if the sensor.temperate has set °C as its unit
    time_window: "00:30:00"  # we look at the change over the last half hour
```
