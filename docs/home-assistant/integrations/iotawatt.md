---
title: IoTaWatt
description: 关于如何将 IoTaWatt 集成到 Home Assistant 的说明。
ha_release: 2021.9
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: iotawatt
ha_codeowners:
  - '@gtdiehl'
  - '@jyavenard'
ha_platforms:
  - sensor
ha_integration_type: device
---

这是用于 [IoTaWatt](https://www.iotawatt.com/) 开源 Wi-Fi 电力监测器的集成。它会收集电流互感器夹（输入 CT）以及 IoTaWatt 上定义的所有输出数据，并在 Home Assistant 中创建对应的传感器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 能源管理与传感器可用性

您可以直接在 Home Assistant 能源仪表板中使用这些能量传感器。

IoTaWatt **Inputs** 可作为传感器使用，并显示在 Home Assistant 中的 IoTaWatt 设备页面上。

您在 IoTaWatt 设备中创建的任何 **Outputs** 也会作为传感器提供，可用于能源仪表板和模板。不过，由于 Home Assistant 关于唯一命名的策略，它们不会列在 IoTaWatt 设备页面上。当您配置能源仪表板，或创建模板与辅助工具时，开始输入已定义的 IoTaWatt 输出名称，Home Assistant 会提示补全对应的传感器名称。

## 发电系统

如果您有太阳能板等发电系统，请按照以下说明操作：

### 配置 IoTaWatt

您需要为用电、上网回馈和发电分别配置 IoTaWatt 输出传感器。

例如：

| Name | Unit | Formula |
| - | - | - |
| MainsConsumption|Watts|`(Main_In_Red + Main_In_White + Main_In_Blue) max 0` |
| MainsExport|Watts|`((Main_In_Red + Main_In_White + Main_In_Blue) min 0) abs` |
| Solar|Watts|`((Solar_Red max 0) + (Solar_White max 0) + (Solar_Blue max 0))` |

请将 `(Main_In_Red + Main_In_White + Main_In_Blue)` 替换为适合您主电源输入的正确公式。

#### 使用太阳能净计量系统

IoTaWatt 团队建议太阳能输入读数应为正值。您可以通过调整 CT 传感器方向，或在 IoTaWatt 的输入设置中勾选 `Reverse` 来实现。

将 `(Main_In_Red + Main_In_White + Main_In_Blue)` 替换为 `(Main_In_Red + Main_In_White + Main_In_Blue - Solar)`。

如果您有两个名为 `Solar1` 和 `Solar2` 的太阳能传感器，则应使用：
`(Main_In_Red + Main_In_White + Main_In_Blue - Solar1 - Solar2)`

### 配置能源管理

可使用以下 IoTaWatt 输出：

在电网消耗设置中，选择 `MainsConsumption.wh`
在回馈电网设置中，选择 `MainsExport.wh`
在太阳能发电设置中，选择 `Solar.wh`
