---
title: Rainforest Eagle
description: '此集成可接入 Rainforest Automation 的 Eagle 3(https://www.rainforestautomation.com/rfa-z114-eagle-200-2/)、Eagle-200 和 Legacy Eagle(https://rainforestautomation.co。'
ha_category:
  - Energy
  - Sensor
ha_release: 0.97
ha_iot_class: Local Polling
ha_codeowners:
  - '@gtdiehl'
  - '@jcalbert'
  - '@hastarin'
ha_domain: rainforest_eagle
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_dhcp: true
ha_integration_type: device
---
# Rainforest Eagle

此集成可接入 Rainforest Automation 的 [Eagle 3](https://www.rainforestautomation.com/rfa-z114-eagle-200-2/)、Eagle-200 和 [Legacy Eagle](https://rainforestautomation.com/support/rfa-z109-eagle-support/) 能源网关的能耗与电价数据。这些设备通过 Zigbee Energy Profile 与智能电表连接。因此，它们不会接入您常规的 Zigbee 网络（甚至不需要系统中存在 Zigbee 网络），但通常需要由公用事业公司完成配置，也就是将其接入您的电表。之后，您再将 Eagle 连接到家庭网络，即可通过设备的本地 API 获取能耗数据。只有在电表本身提供价格信息时，价格数据才会包含在内。如果您是在应用中选择了电价套餐，则价格数据将不可用。

由于 Eagle 3 使用与 Eagle 200 相同的 API，Home Assistant 会将您的 Eagle 3 设置为 “Eagle 200”。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
