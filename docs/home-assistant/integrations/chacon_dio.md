---
title: Chacon DiO
description: 关于如何在 Home Assistant 中集成 Chacon Dio 设备的说明。
ha_category:
  - Cover
  - Switch
ha_release: 2024.8
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@cnico'
ha_domain: chacon_dio
ha_platforms:
  - cover
  - switch
ha_integration_type: integration
---

[Chacon Dio 设备](https://chacon.com/) 是可以通过 RF 433 MHz 或 Wi-Fi 控制的智能家居设备。
此集成让您可以使用 Wi-Fi 连接，使 Home Assistant 可以列出您的 Chacon Dio 设备并实时与它们交互，就像厂商的智能手机应用程序一样。

目前在 Home Assistant 中支持以下设备类型：

- [遮盖](#cover)
- [开关](#switch)

## 前提条件

您需要使用该设备的独立应用程序来注册用户名和密码。

- [Google](https://play.google.com/store/apps/details?id=com.chacon.dioone)
- [Apple](https://apps.apple.com/app/id1493503504)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 遮盖

遮盖平台将 Chacon Dio 设备集成到 Home Assistant 中以管理遮盖（如 REV-SHUTTER 型号），可以控制以下内容：

- 获取遮盖的**状态**（是否连接、位置和当前运动）
- **打开/关闭/停止**遮盖
- **设置位置**（0-100%）

## 开关

开关平台将 Chacon Dio 设备集成到 Home Assistant 中以管理开关（如 REV-SWITCH 型号），可以控制以下内容：

- 获取开关的**状态**（是否连接和开/关状态）
- **打开/关闭**开关

## 动作

在极少数情况下，如 Wi-Fi 中断，您可能需要手动更新设备状态。您可以使用 `homeassistant.update_entity` 动作手动刷新设备状态。

## 提示

您可以使用[分组集成](/home-assistant/integrations/group)按应用程序建议的方式对实体进行分组（例如一楼的所有遮盖）。
您可以使用任何遮盖卡片来获得遮盖的特定显示。
