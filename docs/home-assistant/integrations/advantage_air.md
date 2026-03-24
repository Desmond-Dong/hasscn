---
title: Advantage Air
description: 关于将 Advantage Air 空调控制器集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Light
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 0.117
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: advantage_air
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - diagnostics
  - light
  - select
  - sensor
  - switch
  - update
ha_integration_type: hub
---

**Advantage Air** integration 允许您将 [Advantage Air](https://www.advantageair.com.au/) 空调控制器集成到 Home Assistant 中。

## 前提条件

运行 [MyPlace](https://play.google.com/store/apps/details?id=com.air.advantage.myair5)、[e-zone](https://play.google.com/store/apps/details?id=com.air.advantage.ezone) 或 [zone10e](https://play.google.com/store/apps/details?id=com.air.advantage.zone10) 的壁挂式 Android 平板电脑必须有静态 IP，您将在 Home Assistant 的集成页面中输入该 IP。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 实体

### 气候

集成将为每个发现的空调系统和每个温度控制区域创建一个气候实体。主气候实体将为其支持的每种 [MyComfort](https://www.advantageair.com.au/wp-content/uploads/2019/10/MyComfort.pdf) 温度模式提供一个预设。

- MyZone（默认）- 使用 MyZone 选择平台选择用于温度控制的区域。将其设置为"Inactive"将使用回风口的温度。e-zone 系统不支持任何 MyComfort 温度模式，因此将始终处于 MyZone 预设状态，MyZone 设置为"Inactive"。
- MyTemp - 使用主气候实体在制冷、制热和关闭之间切换。使用区域气候实体设置每个区域的所需温度。
- MyAuto - 使用所有区域的平均温度进行温度控制。设置为制热/制冷模式时，您可以分别调整制热和制冷目标温度，MyAir 系统将根据需要在制热和制冷之间自动切换。

### 遮盖

集成将为每个非温度控制的空调区域创建一个遮盖实体，允许您手动调整开度，从 0% 到 100%，以 5% 为增量。

使用 MyPlace 时，任何百叶窗和/或车库门都将创建为遮盖实体。

### 传感器

集成将为各种方面创建传感器实体：

- 空气过滤器传感器显示是否需要更换。
- 将为"定时开机"和"定时关机"功能创建两个传感器实体。使用 `advantage_air.set_time_to` 动作更改这些设置。
- 每个温度控制区域将有一个传感器显示温度（默认禁用）以及风门开度。
- 每个带有无线温度或运动传感器的区域将有一个报告其无线 RSSI 的传感器。

### 二值传感器

集成将为每个带有运动传感器的区域创建一个二值传感器。

### 开关

集成将创建开关实体来切换 MyFan/ezFan 设置、切换空调新风模式以及切换 MySleep$aver（如果您的硬件支持）。

使用 MyPlace 时，任何继电器都将创建为开关实体。

### 选择器

MyZone 选择实体允许您更改用于"MyZone"功能的区域。将其设置为"Inactive"以使用回风口温度。

### 更新

更新平台显示控制器应用是否需要更新。

### 灯光

使用 MyLights 或 MyPlace 时，将为每盏灯创建灯光实体。

## 动作

### 动作：设置定时

`advantage_air.set_time_to` 动作用于使用相关传感器实体设置开/关定时器。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | `sensor.[name]_time_to_on` 或 `sensor.[name]_time_to_off`
| `minutes` | 否 | `0` 到 `720` 之间的分钟数。