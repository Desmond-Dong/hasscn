---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "单位系统相关变更汇总"
---

过去几个月，受支持的单位系统以及数值传感器受其影响的方式发生了许多变化。本博客文章旨在总结这些变更。

- 对于 device class 为 `distance`、`gas`、`precipitation`、`precipitation_intensity`、`speed`、`volume`、`water`、`weight` 或 `wind_speed` 的传感器，其 state 使用的单位受单位系统影响并会自动转换。
  - 集成可以通过设置 entity 属性 `suggested_unit_of_measurement` 来覆盖单位系统规则。
  - 为避免 breaking change，传感器的单位仅在该传感器首次添加到 Home Assistant 时，根据单位系统规则自动转换。这意味着用户系统中已有的传感器不会受到新的单位转换规则的影响。
  - 如果用户在偏好设置中更改单位系统，用户系统中已有的传感器的单位不会受到单位系统变更的影响。
  - 在大多数情况下，集成不再需要进行任何单位转换，因为现在会自动处理。
  - 在大多数情况下，现有实现单位转换的集成特定代码可以被移除，因为在移除自定义代码后，传感器的 state 会自动转换。有关此机制的详细信息，请参见 [core PR #83228](https://github.com/home-assistant/core/pull/83228)。注意：这仅适用于具有 `unique_id` 的传感器。
  - 允许用户为集成选择传感器单位的自定义 option flow 在大多数情况下也可以被移除。用户可以改为通过 frontend 的 entity settings 覆盖传感器的单位，如果根据所选单位系统的自动转换不符合用户喜好。注意：这仅适用于具有 `unique_id` 的传感器。
- 温度传感器的行为基本保持不变；温度传感器的 state 单位始终反映单位系统，除非：
  - 用户已通过 frontend 的 entity settings 覆盖了单位。
  - 温度传感器具有非 None 的 `suggested_unit_of_measurement` 属性。
- `IMPERIAL_SYSTEM` 单位系统已弃用，并由 `US_CUSTOMARY_SYSTEM` 替代。此外，单位系统的 `is_metric` 和 `name` 属性也已弃用，不应再使用。有关这些变更的更多详情请参见[此博客文章](/developers/blog/2022-10-14-deprecate-unit-system)。
- 单位转换工具已经过重构和移动，unit converter 现在作为 `homeassistant/util/unit_conversion` 中的静态类提供。有关这些变更的更多详情请参见[此博客文章](/developers/blog/2022-09-28-deprecate-conversion-utilities)。