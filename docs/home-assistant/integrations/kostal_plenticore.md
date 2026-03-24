---
title: Kostal Plenticore Solar Inverter
description: 关于如何在 Home Assistant 中集成 Kostal Plenticore 太阳能逆变器的说明。
ha_category:
  - Energy
ha_release: 2021.5
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@stegm'
ha_domain: kostal_plenticore
ha_platforms:
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: device
---

**Kostal Plenticore** 集成可让您从 [Kostal Plenticore](https://www.kostal-solar-electric.com/) 太阳能逆变器获取数据，并将其接入 Home Assistant。它还允许您修改逆变器的部分设置值。

此集成使用 REST API 接口，而该接口也同样由内置 Web UI 使用，因此密码相同。

## 安装人员访问权限

此集成支持使用 Master key 和 Service Code 的安装人员级别访问权限。这样可以访问将来新增的、通常仅限认证安装人员使用的设置。

:::warning
使用安装人员凭据时：

- 仅应在您完全理解相关影响时使用
- 可能会使保修失效
- 如果设置错误，可能会损坏设备
- 必须极其谨慎地使用


:::
要启用安装人员访问权限，请在添加集成时将 Master Key 填写为密码，并在配置中填写 Service Code。

有关如何获取安装人员凭据的信息，请查阅设备文档或联系认证安装人员。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

默认情况下，此集成会禁用大多数传感器。您可以在 *Entity* 页面中启用它们。传感器分为两组，一组用于过程数据，一组用于设置值。

:::note
Plenticore 逆变器还提供更多数据端点，其中一些也取决于固件版本。如果您发现缺少某些过程数据值，请附带必要信息提交 issue，或直接提交 pull request。

:::
### 过程数据传感器

库中可用的传感器如下：

| Name                    | Unit | Description   |
|-------------------------|------|:-------------------------------------------|
| Inverter State          |      | State of the inverter. |
| Solar Power             | W    | Sum of all DC strings (including battery). |
| Grid Power              | W    | Power from (+)/to (-) the grid. |
| Home Power from Battery | W    | Power from the battery for home consumption. |
| Home Power from Grid    | W    | Power from the grid for home consumption. |
| Home Power from PV      | W    | Power from the PV for home consumption. |
| Home Power              | W    | Power used for home consumption. |
| AC Power                | W    | Output power of the inverter. |
| DC1 Power               | W    | Power of string 1. |
| DC2 Power               | W    | Power of string 2. |
| DC3 Power               | W    | Power of string 3. |
| DC1 Voltage             | V    | Voltage of string 1. |
| DC2 Voltage             | V    | Voltage of string 2. |
| DC3 Voltage             | V    | Voltage of string 3. |
| DC1 Current             | A    | Current of string 1. |
| DC2 Current             | A    | Current of string 2. |
| DC3 Current             | A    | Current of string 3. |
| PV to Battery Power     | W    | Power used to charge the battery. |
| Energy Manager State    |      | State of the energy manager. |
| Battery Cycles          |      | Number of full charge/discharge cycles. |
| Battery Power           | W    | Power from (+)/to (-) the battery. |
| Battery SoC             | %    | SoC of the Battery. |
| Autarky Day             | %    | Autarky of the current day. |
| Autarky Month           | %    | Autarky of the current month. |
| Autarky Year            | %    | Autarky of the current year. |
| Autarky Total           | %    | Autarky total. |
| Own Consumption Rate Day | %    | Own consumption rate of the current day. |
| Own Consumption Rate Month | %    | Own consumption rate of the current month. |
| Own Consumption Rate Year | %    | Own consumption rate of the current year. |
| Own Consumption Rate Total | %    | Own consumption rate total. |
| Home Consumption Day    | kWh  | Home energy consumption of the current day. |
| Home Consumption Month  | kWh  | Home energy consumption of the current month. |
| Home Consumption Year   | kWh  | Home energy consumption of the current year. |
| Home Consumption Total  | kWh  | Home energy consumption total. |
| Home Consumption from Battery Day    | kWh  | Home energy consumption from the battery of the current day. |
| Home Consumption from Battery Month  | kWh  | Home energy consumption from the battery of the current month. |
| Home Consumption from Battery Year   | kWh  | Home energy consumption from the battery of the current year. |
| Home Consumption from Battery Total  | kWh  | Home energy consumption from the battery total. |
| Home Consumption from Grid Day    | kWh  | Home energy consumption from the Grid of the current day. |
| Home Consumption from Grid Month  | kWh  | Home energy consumption from the Grid of the current month. |
| Home Consumption from Grid Year   | kWh  | Home energy consumption from the Grid of the current year. |
| Home Consumption from Grid Total  | kWh  | Home energy consumption from the Grid total. |
| Home Consumption from PV Day    | kWh  | Home energy consumption from the PV of the current day. |
| Home Consumption from PV Month  | kWh  | Home energy consumption from the PV of the current month. |
| Home Consumption from PV Year   | kWh  | Home energy consumption from the PV of the current year. |
| Home Consumption from PV Total  | kWh  | Home energy consumption from the PV total. |
| Energy PV1 Day          | kWh  | Energy of PV string 1 of the current day. |
| Energy PV1 Month        | kWh  | Energy of PV string 1 of the current month. |
| Energy PV1 Year         | kWh  | Energy of PV string 1 of the current year. |
| Energy PV1 Total        | kWh  | Energy of PV string 1 total. |
| Energy PV2 Day          | kWh  | Energy of PV string 2 of the current day. |
| Energy PV2 Month        | kWh  | Energy of PV string 2 of the current month. |
| Energy PV2 Year         | kWh  | Energy of PV string 2 of the current year. |
| Energy PV2 Total        | kWh  | Energy of PV string 2 total. |
| Energy PV3 Day          | kWh  | Energy of PV string 3 of the current day. |
| Energy PV3 Month        | kWh  | Energy of PV string 3 of the current month. |
| Energy PV3 Year         | kWh  | Energy of PV string 3 of the current year. |
| Energy PV3 Total        | kWh  | Energy of PV string 3 total. |
| Energy Yield Day        | kWh  | Energy yield of the current day. |
| Energy Yield Month      | kWh  | Energy yield of the current month. |
| Energy Yield Year       | kWh  | Energy yield of the current year. |
| Energy Yield Total      | kWh  | Energy yield total. |
| Energy Discharge to Grid Day    | kWh  | Energy discharged from battery to the Grid of the current day. |
| Energy Discharge to Grid Month  | kWh  | Energy discharged from battery to the Grid of the current month. |
| Energy Discharge to Grid Year   | kWh  | Energy discharged from battery to the Grid of the current year. |
| Energy Discharge to Grid Total  | kWh  | Energy discharged from battery to the Grid total. |
| Battery Charge from Grid Day    | kWh  | Energy charged to the battery from the Grid of the current day. |
| Battery Charge from Grid Month  | kWh  | Energy charged to the battery from the Grid of the current month. |
| Battery Charge from Grid Year   | kWh  | Energy charged to the battery from the Grid of the current year. |
| Battery Charge from Grid Total  | kWh  | Energy charged to the battery from the Grid total. |
| Battery Charge from PV Day    | kWh  | Energy to the battery on the DC side charged by PV during the current day. |
| Battery Charge from PV Month  | kWh  | Energy to the battery on the DC side charged by PV during the current month. |
| Battery Charge from PV Year   | kWh  | Energy to the battery on the DC side charged by PV during the current year. |
| Battery Charge from PV Total  | kWh  | Energy to the battery on the DC side charged by PV  total. |
| Battery Discharge Day | kWh | Energy from the battery on the DC side discharged during the current day. |
| Battery Discharge Month | kWh | Energy from PV on DC-side used to charge the battery of the current month. |
| Battery Discharge Year | kWh | Energy from PV on DC-side used to charge the battery of the current year. |
| Battery Discharge Total | kWh | Energy from PV on DC-side used to charge the battery total. |
| Energy to Grid Day | kWh | Energy fed into the grid for the current day. |
| Energy to Grid Month | kWh | Energy fed into the grid for the current month. |
| Energy to Grid Year | kWh | Energy fed into the grid for the current year. |
| Energy to Grid Total | kWh | Energy fed into the grid in total, since the system was installed. |
| Sum power of all PV DC inputs | W | Total sum of power provided by all PV inputs together. |

:::note
逆变器本身不会直接提供馈入电网的能量数据，但 `pykoplenti` 库会通过虚拟过程数据提供这些信息。

:::
#### 能源仪表板配置

以下传感器可用于 [energy dashboard](/home-assistant/docs/energy/)：

| Energy dashboard | Sensor |
|------------------|:-------|
| Grid consumption | Home Consumption from Grid Total |
| Solar production | Energy PV1 Total, Energy PV2 Total, Energy PV3 Total |
| Battery systems  | Battery Discharge Total, Battery Charge from PV Total |

:::note
部分能量是在 DC 侧测量，部分则在 AC 侧测量，因此由于 DC 与 AC 之间的损耗，数值可能会有轻微差异。

:::
### 配置实体

以下实体可用于设备配置：

| Name                         | Unit | Domain | Description   |
|------------------------------|------|--------|:--------------|
| Battery min home consumption | W    | Number | Min. home consumption power for battery |
| Battery min Soc              | %    | Number | Min. SoC of battery |
| Battery dynamic SoC          |      | Select | Dynamic SoC |
| Battery smart control        |      | Switch | Enable smart battery control |
| Battery strategy             |      | Switch | Battery strategy |
| Shadow management            |      | Switch | PV string shadow management |

如果您使用安装人员访问权限进行连接，还可以访问以下传感器：

| Name                    | Unit | Domain | Description   |
|-------------------------|------|--------|:--------------|
| Battery manual charge   |      | Switch | Force the battery to charge from AC |

:::note
设置值变化较少，因此这些传感器仅每 5 分钟轮询一次。

:::
#### 电池策略

该传感器默认开启，对应 Kostal Plenticore Plus 文档中的 “Automatically” 模式。此模式建议用于降雪较少的地区。

关闭该传感器则对应 “Automatically economical” 模式。在这种模式下，逆变器会自动控制电池充电，但当 PV 能量长时间不足以为电池充电时，会关闭电池。此模式建议用于降雪较多的地区。

#### 电池智能控制

电池智能控制传感器会显示为一个名为 “battery charging / usage mode” 的选择字段，包含以下三个选项：

- **None**：只要有多余的 PV 能量，就立即给电池充电。
- **Battery:SmartBatteryControl:Enable**：优化电网馈入和电池充电。这一设置适用于电网馈入受限的情况，例如被限制为 Plenticore Plus 峰值功率的 70%。
- **Battery:TimeControl:Enable**：可在不同时间段（电价时段）灵活配置电池充电和放电。详细设置必须在 Kostal Plenticore Plus 逆变器的 Web 前端中完成。此选项会启用按时间控制的电池使用模式。

#### 电池手动充电

电池手动充电传感器允许您强制将电池充到 100%，不受 PV 发电量或家庭用电情况影响。
该设置仅在使用安装人员访问权限时可用，因此也应以与安装人员访问权限相同的谨慎程度使用。

更多信息请参阅 [安装人员访问权限](#installer-access)。

#### 阴影管理

阴影管理开关会根据支持的 DC 串自动创建。

## 数值

以下 Number 实体可用。这些值也可以在 Home Assistant 中直接更改。

| Name                    | Unit | RW | Description   |
|-------------------------|------|----|:--------------|
| Battery min home Ccnsumption | W    | RW | Min. home consumption power for battery. |
| Battery min SoC         | %    | RW | Min. SoC of battery. |

## 诊断

以下诊断传感器可用。

| Name                    | Data Type | Description   |
|-------------------------|-----------|:-------------------------------------------|
| Active errors           | Integer   | Count of currently active errors. |
