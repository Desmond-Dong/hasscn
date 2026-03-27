---
title: DROP
description: 'DROP 集成通过本地 MQTT API 与 DROP 智能水系统(https://dropconnect.com) 设备通信。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Select
  - Sensor
  - Switch
ha_config_flow: true
ha_codeowners:
  - '@ChandlerSystems'
  - '@pfrazer'
ha_domain: drop_connect
ha_iot_class: Local Push
ha_mqtt: true
ha_release: '2024.1'
ha_platforms:
  - binary_sensor
  - select
  - sensor
  - switch
ha_integration_type: hub
---
# DROP

**DROP** 集成通过本地 MQTT API 与 [DROP 智能水系统](https://dropconnect.com) 设备通信。

### 支持的设备

Home Assistant 目前支持以下 DROP 产品：

- **DROP Hub**：集中显示系统状态并提供控制功能。
- **Leak Detector**：报告家中检测到的漏水情况。
- **Softener**：通过降低水硬度来改善水质，并集成断水功能。
- **Filter**：通过去除污染物来改善水质，并集成断水功能。
- **Protection Valve**：支持慢速漏水检测的自动断水阀。
- **Pump Controller**：FSG 压力开关的智能替代方案。
- **RO Filter**：反渗透饮用水过滤设备。
- **Salt Sensor**：当软水器盐水箱中的盐位过低时发出提醒。
- **Alert**：同时监测集水坑中的水位和排水泵的供电情况。

### 前提条件

要在 Home Assistant 中使用 DROP，您必须先配置好 [MQTT](/home-assistant/integrations/mqtt/) 平台。

要启用 DROP 集成，请使用 DROP Connect 应用将您的 DROP Hub 连接到 MQTT broker：

- 启动 DROP Connect 应用并连接到您的 DROP Hub。
- 在 **System** > **Advanced** 页面中的 **Hub Network Settings** 部分，点按 **Configure MQTT**。
- 输入 MQTT broker 地址、端口号、用户名和密码。
- 选择 **Connect**，并确认 DROP Hub 已连接到 MQTT broker。

DROP Hub 连接到 MQTT broker 后，Home Assistant 应会发现您的 DROP 系统中的设备。

<details>
<summary>手动配置步骤</summary>


- 打开您的 Home Assistant 实例。
- 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
- 设置新发现的设备。


</details>

:::important
DROP Hub 使用的 MQTT broker 地址和端口必须与 Home Assistant MQTT 集成中配置的值相同。

:::
