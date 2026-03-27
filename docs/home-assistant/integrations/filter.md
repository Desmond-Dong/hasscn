---
title: Filter
description: '过滤器集成使传感器能够处理其他实体的状态。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Helper
  - Sensor
  - Utility
ha_release: 0.65
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@dgomes'
ha_domain: filter
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Filter

**过滤器**集成使传感器能够处理其他实体的状态。

`filter` 将信号处理算法应用于传感器、先前和当前状态，并根据所选算法生成 `new state`。下图描绘了原始传感器和使用 [History Graph](/home-assistant/dashboards/history-graph/) 集成的同一传感器的滤光片传感器。

<p class='img'>
<img src='/home-assistant/images/screenshots/filter-sensor.png' />
</p>


:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
UI配置仅支持设置一个过滤器。对于需要多个过滤器的更高级配置，请使用 YAML 配置选项来配置您的过滤器传感器。

:::
有关这些配置选项的更多信息可以在 [YAML configuration](#yaml-configuration) 下找到

```yaml
姓名：
描述：传感器应具有的名称。
实体：
描述：提供输入的实体。仅支持 `sensor` 实体。
筛选：
描述：用于过滤数据的算法。可用的过滤器有“低通”、“异常值”、“范围”、“节流”、“时间节流”和“移动平均值（基于时间）”。
精确：
描述：定义过滤状态的精度。
窗户尺寸：
描述：先前状态的窗口大小。基于时间的过滤器需要一个时间段，而其他过滤器需要一个整数。
时间常数：
描述：与状态影响输出所需的时间量大致相关。
半径：
描述：从先前状态的中值开始的带半径。
类型：
描述：定义简单移动平均线的类型。
下限：
描述：过滤器范围的下限。
上限：
描述：过滤器范围的上限。
```

## YAML 配置

要在安装中启用过滤器传感器，请将以下内容添加到“`configuration.yaml`”文件中。
：：：提示
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: filter
    name: "filtered realistic humidity"
    entity_id: sensor.realistic_humidity
    filters:
      - filter: outlier
        window_size: 4
        radius: 4.0
      - filter: lowpass
        time_constant: 10
        precision: 2
  - platform: filter
    name: "filtered realistic temperature"
    entity_id: sensor.realistic_temperature
    filters:
      - filter: outlier
        window_size: 4
        radius: 2.0
      - filter: lowpass
        time_constant: 10
      - filter: time_simple_moving_average
        window_size: "00:05"
        precision: 2
```

过滤器可以链接并根据配置文件中存在的顺序应用。

```yaml
实体_id：
描述：要过滤的传感器的实体ID。
必填：真实
类型：字符串
姓名：
描述：在前端使用的名称。
必填：假
类型：字符串
唯一ID：
描述：唯一标识过滤器传感器的ID。将其设置为唯一值以允许通过 UI 进行自定义。
必填：假
类型：字符串
过滤器：
描述：要使用的过滤器。
必填：真实
类型：列表
键：
筛选：
描述：用于过滤数据的算法。可用的过滤器有 `lowpass`、`outlier`、`range`、`throttle`、`time_throttle` 和 `time_simple_moving_average`。
必填：真实
类型：字符串
精确：
描述：通过 round() 的参数定义过滤状态的精度。
必填：假
类型：整数
默认值：2
窗口大小：
描述：先前状态的窗口大小。基于时间的过滤器（例如 `time_simple_moving_average`）将需要一个时间段（时间大小），而其他过滤器（例如 `outlier`）将需要一个整数（状态数量大小）。时间段采用 _hh:mm_ 格式，并且必须加引号。
必填：假
类型：[整数，时间]
默认值：1
时间常数：
description: See [_lowpass_](#low-pass) filter.与状态影响输出所需的时间量大致相关。
必填：假
类型：整数
默认值：10
半径：
描述：参见 [_outlier_](#outlier) 过滤器。来自先前状态中值的带半径。
必填：假
类型： 浮动
默认值：2.0
类型：
描述：参见 [_time_simple_moving_average_](#time-simple-moving-average) 过滤器。定义简单移动平均线的类型。
必填：假
类型：字符串
默认值：最后一个
下限：
描述：参见 [_range_](#range) 过滤器。过滤器范围的下限。
必填：假
类型： 浮动
默认值：负无穷大
上限：
描述：参见 [_range_](#range) 过滤器。过滤器范围的上限。
必填：假
类型： 浮动
默认值：正无穷大
```

:::warning
当配置不是时间且值大于默认值 `1` 的 `window_size` 时，数据库必须在 Home Assistant 启动期间检查该实体的几乎每个存储状态。如果您修改了 [Recorder `purge_keep_days`](/home-assistant/integrations/recorder/#purge_keep_days) 值或在数据库中存储了筛选实体的许多状态，这可能会导致您的 Home Assistant 实例在启动期间响应不佳。

:::
## 过滤器

### 低通

低通滤波器 (`lowpass`) 是信号处理中最常见的滤波器之一，因为它通过缩短峰值和谷值来平滑数据。

附带的低通滤波器非常基本，基于 [exponential smoothing](https://en.wikipedia.org/wiki/Exponential_smoothing)，其中先前的数据点用新的数据点进行加权。

```python
B = 1.0 / time_constant
A = 1.0 - B
LowPass(state) = A * previous_state + B * state
```

### 异常值

离群值过滤器 (`outlier`) 是一种基本的带通过滤器，因为它会滤除特定范围之外的任何值。

包含的离群值过滤器将丢弃以先前值的中值为中心的范围之外的任何值，并将其替换为先前值的中值。如果在带内，则返回当前状态。

```python
distance = abs(state - median(previous_states))

if distance > radius:
    median(previous_states)
else:
    state
```

### 油门

Throttle 过滤器 (`throttle`) 将仅更新窗口中第一个状态的传感器状态。这意味着过滤器将跳过所有其他值。

要调整速率，您需要设置 window_size。要将传感器节流至 10%，`window_size` 应设置为 10，50% 应设置为 2。

当您有一个以非常高的速率产生状态的传感器时，此过滤器是相关的，您可能希望为了存储或可视化目的而降低该状态。

### 时间节流

时间节流过滤器 (`time_throttle`) 将仅更新窗口中第一个状态的传感器状态。这意味着过滤器将跳过所有其他值。

要调整速率，您需要设置 window_size。要将传感器节流至每分钟 1 个值，`window_size` 应设置为“00:01”。

当您的传感器以非常高的不稳定速率产生状态时，此过滤器是相关的，您可能希望将其降低到某个恒定速率以用于存储或可视化目的。

### 时间简单移动平均线

Time SMA 滤波器 (`time_simple_moving_average`) 基于 Andreas Eckner 的论文 [Algorithms for Unevenly Spaced Time Series: Moving Averages and Other Rolling Operators](http://www.eckner.com/papers/Algorithms%20for%20Unevenly%20Spaced%20Time%20Series.pdf)。

本文定义了简单移动平均线 (SMA) 的三种类型/版本：*最后*、*下一个* 和*线性*。目前仅实现了*last*。

如论文中所述，Theta 是 `window_size` 参数，可以使用时间符号表示（例如，“00:05”表示五分钟时间窗口）。

＃＃＃ 范围


范围过滤器 (`range`) 将传入数据限制在由下限和上限指定的范围内。

所有大于上限的值都将替换为上限，所有小于下限的值将替换为下限。
默认情况下，既没有上限也没有下限。

```python
if new_state > upper_bound:
    upper_bound
if new_state < lower_bound:
    lower_bound
new_state
```
