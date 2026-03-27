---
title: 热水器实体
description: '平台实体派生自homeassistant.components.waterheater.WaterHeaterEntity(https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/waterhe。'
sidebar_label: 热水器
---
# 热水器实体

平台实体派生自[`homeassistant.components.water_heater.WaterHeaterEntity`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/water_heater/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| --------------------- | ----------- | --------- | -----------
| `min_temp` | `float` | 110°F | 可设定的最低温度。
| `max_temp` | `float` | 140°F | 可设定的最高温度。
| `current_temperature` | `float` | `None` | 当前温度。
| `target_temperature` | `float` | `None` | 我们试图达到的温度。
| `target_temperature_high` | `float` | `None` | 我们试图达到的温度上限。
| `target_temperature_low` | `float` | `None` | 我们试图达到的温度下限。
| `target_temperature_step` | `float` | `None` | 可以增加或减少目标温度支持的步长。
| `temperature_unit` | `str` | `NotImplementedError` | `TEMP_CELSIUS`、`TEMP_FAHRENHEIT` 或 `TEMP_KELVIN` 之一。
| `current_operation` | `string` | `None` | 当前的操作模式。
| `operation_list` | `List[str]` | `None` | 可能的操作模式列表。
| `supported_features` | `List[str]` | `NotImplementedError` | 支持的功能列表。
| `is_away_mode_on` | `bool` | `None` | 离开模式的当前状态。

允许的操作模式是基本组件中指定的状态，并且 water_heater 组件的实现不能不同。

属性必须遵循 `temperature_unit` 中定义的单位。

## 状态

| 状态 | 说明
| ----- | -----------
| `STATE_ECO` | 节能模式，提供节能和快速加热。
| `STATE_ELECTRIC` | 仅电动模式，消耗最多的能源。
| `STATE_PERFORMANCE` | 高性能模式。
| `STATE_HIGH_DEMAND` | 满足热水器尺寸较小时的高要求。
| `STATE_HEAT_PUMP` | 加热速度最慢，但消耗的能量较少。
| `STATE_GAS` | 仅天然气模式，使用最多的能源。
| `STATE_OFF` | 热水器已关闭。

## 支持的功能

支持的功能通过使用 `WaterHeaterEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| -------------------- | ------------------------- |
| `TARGET_TEMPERATURE` | 温度可设定 |
| `OPERATION_MODE` | 运行模式可设定 |
| `AWAY_MODE` | 可设置离开模式 |
| `ON_OFF` | 可以打开或关闭 |

## 方法

### `set_temperature` 或 `async_set_temperature`

设置热水器应将水加热到的温度。

### `set_operation_mode` 或 `async_set_operation_mode`

设置热水器的运行模式。必须在操​​作列表中。

### `turn_away_mode_on` 或 `async_turn_away_mode_on`

将热水器设置为离开模式。

### `turn_away_mode_off` 或 `async_turn_away_mode_off`

将热水器设置回之前的运行模式。关闭离开模式。

### `turn_on` 或 `async_turn_on`

打开热水器。

### `turn_off` 或 `async_turn_off`

关闭热水器。