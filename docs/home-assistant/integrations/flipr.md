---
title: Flipr
description: 关于如何在 Home Assistant 中集成 Flipr 设备的说明。
ha_category:
  - Sensor
ha_release: 2021.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@cnico'
ha_domain: flipr
ha_platforms:
  - binary_sensor
  - select
  - sensor
  - switch
ha_integration_type: hub
---

Go flipr 公司销售智能泳池监控和管理设备。Flipr 和 Flipr Hub 设备通过 Wi-Fi 和 SigFox 将数据发布到云端。
此集成让您可以在 Home Assistant 上访问 Flipr 测量的信息，数据与供应商的智能手机应用程序相同。
此集成还让您可以访问 Flipr Hub 来控制您的泳池设备，如泵、加热器、灯光等。

目前 Home Assistant 支持以下设备类型：

- [Flipr](#flipr)
- [Hub](#hub)

## 前提条件

您需要使用该设备的独立应用程序来注册用户名和密码。

- [Google](https://play.google.com/store/apps/details?id=com.goflipr.flipr)
- [Apple](https://apps.apple.com/app/id1225898851)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Flipr

Flipr 定期将 pH、氯或温度等数据发送到云服务器，以监控您的泳池。

目前 Home Assistant 通过 **传感器** 和 **二元传感器** 支持以下信息：

## 实体

### 传感器

- **氯**：氯含量
- **pH**：水的 pH 值
- **水温**：水的温度
- **Red OX**：水的氧化还原电位，单位 mV
- **最后测量日期**：flipr 最后一次测量的日期
- **电池电量**：flipr 的电池电量百分比

### 二元传感器

- **pH 状态**：指示 pH 值是正常、过低还是过高
- **氯状态**：指示氯含量是正常、过低还是过高

## Hub

Hub 让您可以从 Home Assistant 控制您的设备（泵、加热器、灯光等）以及您可以想象的所有自动化。

- **打开/关闭** Hub 内部的开关，并自动将 Hub 设置为手动模式。
- **选择** Hub 的模式，包括自动、计划和手动。

## 动作

云端数据每 15 分钟轮询一次。如果您想强制刷新数据，可以使用 `homeassistant.update_entity` 动作。

## 提示

建议您使用以下传感器创建自己的卡片，其中 \[fliprid\] 是您的 flipr 的 ID：

- `sensor.flipr_[fliprid]_chlorine`
- `sensor.flipr_[fliprid]_ph`
- `sensor.flipr_[fliprid]_red_ox`
- `sensor.flipr_[fliprid]_water_temp`
- `sensor.flipr_[fliprid]_last_measured`
- `sensor.flipr_[fliprid]_battery_level`

将 `binary_sensor.flipr_[fliprid]_ph_status` 和 `binary_sensor.flipr_[fliprid]_chlorine_status` 保留为徽章。