---
title: Random
description: '随机（Random） 集成可简单地创建随机值或随机状态。如果您想测试自动化规则或运行交互式演示，它会很有用。每次轮询时，它都会生成一个新的状态。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Helper
  - Sensor
  - Utility
ha_iot_class: Calculated
ha_release: 0.32
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: random
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: helper
ha_config_flow: true
---
# Random

**随机（Random）** 集成可简单地创建随机值或随机状态。如果您想测试自动化规则或运行交互式演示，它会很有用。每次轮询时，它都会生成一个新的状态。


## 配置
配置随机辅助项的首选方式是通过用户界面：前往 **[Settings > Devices & services > Helpers](https://my.home-assistant.io/redirect/helpers/)**，选择添加按钮，然后选择 [**Random（随机）**](https://my.home-assistant.io/redirect/config_flow_start/?domain=random)。

若要通过用户界面添加辅助项，您的 "`configuration.yaml`" 中应包含 `default_config:`。除非您手动删除，否则它通常默认存在。如果您已从配置中移除了 `default_config:`，则必须先在 "`configuration.yaml`" 中添加 `random:`，之后才能使用 UI。

## 二进制传感器
随机二进制传感器会创建随机状态（`true`、1、`on` 或 `false`、0、`off`）。

### YAML 配置
要创建随机二进制传感器，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# configuration.yaml 示例条目
binary_sensor:
  - platform: random
```

```yaml
name:
  description: 在前端中使用的名称。
  required: false
  type: string
  default: 随机二进制传感器
```

## 传感器
随机传感器会在给定范围内生成随机传感器值（整数）。返回值服从[离散均匀分布](https://en.wikipedia.org/wiki/Discrete_uniform_distribution)，这意味着配置范围内的每个整数值被选中的概率相同。

### YAML 配置
要创建随机传感器，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: random
```

```yaml
name:
  description: 在前端中使用的名称。
  required: false
  type: string
  default: 随机传感器
minimum:
  description: 数值下限。
  required: false
  type: string
  default: 0
maximum:
  description: 数值上限。
  required: false
  type: integer
  default: 20
unit_of_measurement:
  description: 定义传感器的计量单位（如果有）。
  required: false
  type: string
```
