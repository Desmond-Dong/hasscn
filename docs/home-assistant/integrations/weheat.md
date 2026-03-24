---
title: Weheat
description: 关于如何在 Home Assistant 中设置 Weheat 的说明。
ha_category:
  - Climate
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '2024.10'
ha_config_flow: true
ha_codeowners:
  - '@barryvdh'
ha_domain: weheat
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: hub
---

**Weheat** 集成可让您在 Home Assistant 中查看 [Weheat](https://www.weheat.nl/) 设备。

## 支持的设备

支持 Blackbird、Sparrow 和 Flint 热泵。

## 前提条件

- 您需要有 Weheat 账户、**username** 和 **password**
- 在 Home Assistant 中添加集成时，系统会提示您输入 **Name**、**Client ID** 和 **Client Secret**。
  - 名称可自行填写，ID 和 secret 可在[知识库](https://support.weheat.nl/s/article/Is-er-een-offici%C3%ABle-Home-Assistant-integratie)中找到。
- 在 Home Assistant 中设置集成期间，您会被重定向到 Weheat 登录提供方。请使用您的 **username** 和 **password** 登录。
  - 登录后，选择 **link account** 来关联账户。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 实体

### 传感器

Weheat 集成提供以下传感器：

- **Output power**：加入到水中的热功率，单位为瓦
- **Input power**：电功率，单位为瓦
- **COP**：上述两项功率测量值之间的性能系数
- **Water inlet temperature**：热泵进水温度，单位为 °C
- **Water outlet temperature**：热泵出水温度，单位为 °C
- **Water target temperature**：目标水温，单位为 °C
- **Central heating inlet temperature**：中央供暖进水温度，单位为 °C
- **Central heating flow**：中央供暖水泵的流量
- **Outside temperature**：室外温度，单位为 °C
- **Current room temperature**：当前室温，单位为 °C
- **Room temperature setpoint**：室温设定值，单位为 °C
- **Electricity used heating**：中央供暖模式下累计耗电量，单位为 kWh
- **Electricity used DHW**：生活热水模式下累计耗电量，单位为 kWh（可选）
- **Electricity used cooling**：制冷模式下累计耗电量，单位为 kWh
- **Electricity used defrost**：除霜模式下累计耗电量，单位为 kWh
- **Electricity used**：累计总耗电量，单位为 kWh
- **Energy output heating**：中央供暖模式下累计输出能量，单位为 kWh
- **Energy output DHW**：生活热水模式下累计输出能量，单位为 kWh（可选）
- **Energy output cooling**：制冷模式下累计输出能量，单位为 kWh。请注意，该能量值为负值，并会随着从房屋中移除能量而继续减小。
- **Energy output defrost**：除霜模式下累计输出能量，单位为 kWh。请注意，该能量值为负值，并会随着从房屋中移除能量而继续减小。
- **Energy output**：累计总输出能量，单位为 kWh
- **State**：当前热泵状态
- **DHW top temperature**：水箱顶部生活热水温度，单位为 °C（可选）
- **DHW bottom temperature**：水箱底部生活热水温度，单位为 °C（可选）
- **DHW pump flow**：生活热水水泵流量（可选）
- **Compressor RPM**：压缩机风扇转速。
- **Compressor percentage**：压缩机风扇百分比。某些型号可超过 100%。

根据型号或安装方式不同，还可能提供以下室内机状态：

- **Indoor unit water pump**
- **Indoor unit auxiliary water pump**
- **Indoor unit DHW valve or water pump**
- **Indoor unit gas boiler heating allowed** - 注意：即使当前未安装或未启用燃气锅炉，该状态也可能为 True。
- **Indoor unit electric heater**

## 数据更新

此集成会通过轮询获取数据。对于单台热泵，轮询间隔为 120 秒。随着热泵数量增加，该间隔会按比例增长，例如两台热泵时为 240 秒。此外，能量数据每 1800 秒从云端获取一次。

## 操作

此集成不提供任何操作。

## 已知限制

目前无法通过此集成控制热泵。

## 故障排除

如果没有发现任何设备，请确认您可以登录 [Weheat portal](https://portal.weheat.nl)，并且能在其中看到正确的热泵。如果门户中显示正常，请联系 Weheat 支持。

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
