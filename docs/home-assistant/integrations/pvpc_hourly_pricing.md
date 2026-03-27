---
title: 西班牙每小时电价（PVPC）
description: '此集成使用官方 API 从 <https://www.esios.ree.es/en/pvpc 获取西班牙每小时电价。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Energy
ha_release: '0.108'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@azogue'
ha_domain: pvpc_hourly_pricing
ha_platforms:
  - sensor
ha_integration_type: service
---
# 西班牙每小时电价（PVPC）

此集成使用官方 API 从 <https://www.esios.ree.es/en/pvpc> 获取西班牙每小时电价。

具体来说，它会显示当前的__有效能源计费价格（FEU）__，单位为 €/kWh。这个价格是适用于签约功率不超过 15 kW、并采用 PVPC（小型消费者自愿价格）方案的用户电费账单中的按小时能源价格。

该价格包含接入费中的能源项、附加费用以及发电成本，但不包含税费。除休达和梅利利亚两座城市外，无论时区如何，西班牙全境的每小时电价和能源时段都相同；这两座城市的价格会略有不同。

<iframe src="https://www.esios.ree.es/en/embed/active-energy-invoicing-price-pvpc" width="100%" height="608"></iframe>

更多信息请参见 <https://www.cnmc.es/en/> 和 <https://www.omie.es/en/>。

## 配置

要配置 PVPC 每小时电价，请在配置页面中的集成面板里进行设置。

为价格传感器设置一个名称（默认为 `sensor.pvpc`），然后根据你在西班牙的地理位置，选择以下两种可用电价之一：

- `2.0TD`，适用于西班牙本土、巴利阿里群岛和加那利群岛。
- `2.0TD (Ceuta/Melilla)`，适用于休达和梅利利亚。

你还需要为新版 2.0TD 电价适用的两个功率时段设置签约功率（单位为 kW）（一个用于 P1/P2，另一个用于谷时段 P3），这样可用电功率就会显示为传感器属性。

如果你在 2021-06-01 电价变更后没有做任何调整，那么这两个功率值通常相同，并且与现有合同中的功率一致。

如果你想通过 ESIOS API 获取额外的价格传感器，比如**自发自用剩余电量**的价格，或公开市场电价（如果你的供应商按此价格指数计费，这会很有用），你必须通过发送邮件至 [consultasios@ree.es](mailto:consultasios@ree.es?subject=Personal%20token%20request) 来**申请个人令牌**。
然后，为此集成启用 API Token 选项。

你可以将此集成设置 2 次，每个地理区域各设置一次。要这样做，请在 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 中通过集成面板再次添加它们。
你可以随时在集成选项中更改配置。

:::note
该传感器提供的是每小时用电价格，但可变能源费用只是电费账单构成因素之一：

- 签约功率的固定费用
- 已消耗电量的固定费用
- 已消耗电量的可变费用（即传感器的值）
- 其他固定支出，例如电表租赁费
- 适用的各类税费

:::
