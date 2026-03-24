---
title: Proximity
description: 有关如何在 Home Assistant 中设置接近监控的说明。
ha_category:
  - Automation
  - Presence detection
ha_release: 0.13
ha_quality_scale: internal
ha_domain: proximity
ha_iot_class: Calculated
ha_integration_type: integration
ha_codeowners:
  - '@mib1185'
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
---

**Proximity** 集成可让您监控设备或人员与特定[区域](/home-assistant/integrations/zone/)的接近程度以及移动方向。

当您希望基于特定区域之外的位置执行自动化时，此集成可减少所需的自动化规则数量。基于[区域](/home-assistant/docs/automation/trigger#zone-trigger)和[状态](/home-assistant/docs/automation/trigger#state-trigger)的触发器也能实现类似控制，但如果还要考虑移动方向等因素，规则数量会呈指数增长。

其使用示例包括：

- 在您接近家时提高恒温器温度
- 离家越远越降低温度


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
添加 **Proximity** 集成时，系统会提示您定义**容差距离**。容差距离必须以米（m）为单位，用于过滤 GPS 坐标的小幅变化（_由 GPS 精度误差导致_），以便计算移动方向。

:::
## Sensors

将会创建以下传感器实体。

### Distance

对于每个被跟踪的[设备](/home-assistant/integrations/device_tracker/)或[人员](/home-assistant/integrations/person/)，都会创建一个传感器，以您在 [Home Assistant 单位制](/home-assistant/docs/configuration/basic)中选择的单位显示其到监控区域边界的距离。当被跟踪的人员或设备进入监控区域时，距离会设为 0。

### Direction of travel

对于每个被跟踪的设备或人员，都会创建一个传感器，显示其朝向或远离监控区域的移动方向。可能的状态有：

- `arrived`
- `away_from`
- `stationary`
- `towards`
- `unknown`

:::important
要计算被跟踪设备或人员的距离和移动方向，必须为其提供地理位置。

:::
### Nearest device

会创建一个传感器，用于显示距离监控区域最近（_距离最短_）的设备或人员。如果有多个设备或人员处于相同的最近距离，该传感器会全部显示。

### Nearest distance

此传感器显示距离监控区域最近的设备或人员的距离。单位取决于您的 [Home Assistant 单位制](/home-assistant/docs/configuration/basic)设置。当被跟踪的人员或设备进入监控区域时，距离会设为 0。

### Nearest Direction of travel

此传感器显示距离监控区域最近的设备或人员的移动方向。可能的状态有：

- `arrived`
- `away_from`
- `stationary`
- `towards`
- `unknown`

### Video tutorial

这份全面的视频教程讲解了如何使用 Proximity 集成，根据您是在离开还是进入住宅周边区域，自动调整家中的供暖。

<lite-youtube videoid="0ojMz1s3Y84" videotitle="Mastering Geofencing in Home Assistant with Proximity and Presence Detection: An Ultimate Guide" posterquality="maxresdefault"></lite-youtube>
