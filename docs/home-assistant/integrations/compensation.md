---
title: Compensation
description: 'Compensation 集成消费来自其他传感器的状态。它将补偿值作为状态导出到单独的实体中，并将以下值作为属性导出：entityid 和 coefficients。单个多项式（默认为线性）拟合到提供的所有数据点。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Sensor
  - Utility
ha_iot_class: Calculated
ha_release: '2021.5'
ha_codeowners:
  - '@Petro31'
ha_domain: compensation
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---
# Compensation

**Compensation** 集成消费来自其他传感器的状态。它将补偿值作为状态导出到单独的实体中，并将以下值作为属性导出：`entity_id` 和 `coefficients`。单个多项式（默认为线性）拟合到提供的所有数据点。

## 配置

要启用补偿传感器，请将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
compensation:
  media_player_db_volume:
    source: media_player.yamaha_receiver
    attribute: volume_level
    unit_of_measurement: dB
    data_points:
      - [0.2, -80.0]
      - [1.0, 0.0]

  media_player_zone_2_db_volume:
    source: media_player.yamaha_receiver_zone_2
    attribute: volume_level
    unit_of_measurement: dB
    # 确保当源传感器值小于 0.2 时，传感器值不会低于 -80.0
    lower_limit: true
    # 确保当源传感器值大于 1.0 时，传感器值不会高于 0.0
    upper_limit: true
    data_points:
      - [0.2, -80.0]
      - [1.0, 0.0]
```

```yaml
attribute:
  description: 要监控/补偿的源属性。省略时，将使用源的状态值。
  required: false
  type: string
data_points:
  description: "数据点转换的集合，格式为 `[未补偿值, 补偿值]`。例如，`[1.0, 2.1]`。所需数据点数量等于多项式 `degree` + 1。例如，线性补偿（`degree: 1`）至少需要 2 个数据点。"
  required: true
  type: list
degree:
  description: "多项式的次数。例如，线性补偿 (y = x + 3) 有 1 次，二次补偿 (y = x<sup>2</sup> + x + 3) 有 2 次，等等。"
  required: false
  default: 1
  type: integer
device_class:
  description: 设置[设备类](/home-assistant/integrations/sensor#device-class)，更改前端显示的设备状态和图标。
  required: false
  type: string
lower_limit:
  description: "为传感器启用下限。下限由数据集合 (`data_points`) 中最小的 `未补偿值` 定义。例如，如果最小的 `未补偿值` 是 `1.0`，配对的 `补偿值` 是 `0.0`，则任何小于 `1.0` 的 `source` 状态将产生 `0.0` 的补偿状态。"
  required: false
  type: boolean
  default: false
name:
  description: 前端使用的名称。
  required: false
  type: string
precision:
  description: 通过 round() 的参数定义计算值的精度。
  required: false
  default: 2
  type: integer
source:
  description: 要监控/补偿的实体。
  required: true
  type: string
state_class:
  description: 传感器的 [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes)。
  required: false
  type: string
unique_id:
  description: 唯一标识此传感器的 ID。将其设置为唯一值以允许通过 UI 进行自定义。
  required: false
  type: string
unit_of_measurement:
  description: 定义传感器的测量单位（如果有）。
  required: false
  type: string
upper_limit:
  description: "为传感器启用上限。上限由数据集合 (`data_points`) 中最大的 `未补偿值` 定义。例如，如果最大的 `未补偿值` 是 `5.0`，配对的 `补偿值` 是 `10.0`，则任何大于 `5.0` 的 `source` 状态将产生 `10.0` 的补偿状态。"
  required: false
  type: boolean
  default: false
```