---
title: A. O. Smith
description: 'A. O. Smith 集成允许您从 Home Assistant 控制兼容的 A. O. Smith iCOMM 启用的热水器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Water heater
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_domain: aosmith
ha_config_flow: true
ha_codeowners:
  - '@bdr99'
ha_platforms:
  - diagnostics
  - select
  - sensor
  - water_heater
ha_integration_type: hub
---
# A. O. Smith

**A. O. Smith** 集成允许您从 Home Assistant 控制兼容的 A. O. Smith iCOMM 启用的热水器。

在使用此集成之前，您的热水器必须连接到 Wi-Fi 网络并使用 A. O. Smith 移动应用程序（[iOS](https://apps.apple.com/app/id456489822)/[Android](https://play.google.com/store/apps/details?id=com.aosmith.warrantycheck)）链接到您的账户。

## 已知兼容型号

- EE9-40R55DV
- EE9-40H55DV
- EE9-50R55DV
- EE9-50H55DV
- EE12-50R55DVF
- EE12-50H55DVF
- EE12-55H55DVF
- HETF-50-100
- HPA10-40H45DV
- HPA10-50H45DV
- HPA10-66H45DV
- HPA10-80H45DV
- HPS10-50H45DV
- HPS10-66H45DV
- HPS10-80H45DV
- HPSX-50-DHPT
- HPSX-50-DHPT 2
- HPSX-66-DHPT
- HPSX-66-DHPT 2
- HPSX-80-DHPT
- HPSX-80-DHPT 2
- HPTA-40
- HPTA-50
- HPTA-66
- HPTA-80
- HPTS-50
- HPTS-66
- HPTS-80
- HPV10-50H01DV
- HPV10-66H01DV
- HPV10-80H01DV

可以使用 A. O. Smith 移动应用程序控制的热水器应该与此集成兼容。如果您的热水器未被集成检测到，但可以使用移动应用程序控制，请[在 GitHub 上提交问题](https://github.com/home-assistant/core/issues/new?template=bug_report.yml&integration_name=A.%20O.%20Smith&integration_link=https%3A%2F%2Fwww.home-assistant.io%2Fintegrations%2Faosmith)，以便添加支持。同样，如果您的热水器与此集成配合使用，但其型号未在此列出，请[提交文档问题](https://github.com/home-assistant/home-assistant.io/issues/new?template=feedback.yml&url=https%3A%2F%2Fwww.home-assistant.io%2Fintegrations%2Faosmith)，以便将其添加到列表中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 平台

### 热水器

热水器实体提供以下功能：
- 调整目标温度
- 更改运行模式
- 启用/禁用离开模式（将热水器设置为"度假"模式）

#### 运行模式

此表显示支持的运行模式。可用模式取决于您的具体热水器型号。

| A. O. Smith 应用程序中显示的模式 | Home Assistant 中显示的模式 | `water_heater.set_operation_mode` 动作的模式名称 |
| ---------------------------------- | -------------------------------- | ------------------------------------------------------ |
| Electric/Standard                  | Electric                         | `electric`                                             |
| Hybrid                             | Eco                              | `eco`                                                  |
| Heat Pump                          | Heat Pump                        | `heat_pump`                                            |
| Vacation                           | 不适用 - 使用离开模式              | 不适用 - 使用 `water_heater.set_away_mode`                 |

### 传感器

提供以下传感器实体：
- 热水可用量（百分比）
- 能耗

### 选择

如果您的热水器支持"Hot Water+"功能，将添加一个选择实体来控制 Hot Water+ 级别。

## 免责声明

此集成与 A. O. Smith 无关，也未经其认可。