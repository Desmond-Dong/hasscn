---
title: EnergyFlip
description: 关于如何将 EnergyFlip 与 Home Assistant 集成的说明。
ha_category:
  - Energy
  - Sensor
ha_release: 2021.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@dennisschroer'
ha_domain: huisbaasje
ha_platforms:
  - sensor
ha_integration_type: device
---

**EnergyFlip**（前身为 Huisbaasje）集成允许您跟踪安装在能源表上的监控设备收集的能耗。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

此集成提供以下传感器：

- 当前功率使用量
- 从电网获取的当前功率消耗，包括正常时段和低谷时段
- 返回到电网的当前功率，包括正常时段和低谷时段
- 今日总用电量
- 当前燃气使用量
- 今日总用气量