---
title: Efergy
description: 关于如何在 Home Assistant 中集成 Efergy 设备的说明。
ha_category:
  - Energy
ha_release: pre 0.7
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: efergy
ha_platforms:
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: hub
---

将您的 [Efergy](https://efergy.com) 电表信息集成到 Home Assistant 中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 设置

获取应用程序令牌：

1. 登录您的 Efergy 账户
2. 进入设置页面
3. 点击应用程序令牌
4. 点击"添加令牌"

## 集成实体

将创建以下传感器：

- **用电功率**：显示功耗的聚合瞬时值。还将为连接到家庭的每个传感器创建一个实体。如果只检测到一个传感器，它将默认禁用。
- **日用电量**：显示当天的能耗。（默认禁用）
- **周用电量**：显示本周的能耗。（默认禁用）
- **月用电量**：显示本月的能耗。
- **年用电量**：显示今年的能耗。（默认禁用）
- **能源预算**：显示本月设置的预算当前状态。
- **日费用**：显示当天的消耗费用。（默认禁用）
- **周费用**：显示本周的消耗费用。（默认禁用）
- **月费用**：显示本月的消耗费用。
- **年费用**：显示今年的消耗费用。（默认禁用）