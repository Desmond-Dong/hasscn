---
title: SolaX Power
description: 'SolaX Power 集成将 Home Assistant 连接到 Solax 太阳能逆变器。Solax 逆变器可以连接到家庭 Wi-Fi 网络并提供 REST API。此集成可获取诸如光伏发电功率、电池电量与功率，以及回馈到电网中的电量等信息。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Energy
  - Sensor
ha_release: 0.94
ha_iot_class: Local Polling
ha_codeowners:
  - '@squishykid'
  - '@Darsstar'
ha_domain: solax
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
---
# SolaX Power

**SolaX Power** 集成将 Home Assistant 连接到 Solax 太阳能逆变器。Solax 逆变器可以连接到家庭 Wi-Fi 网络并提供 REST API。此集成可获取诸如光伏发电功率、电池电量与功率，以及回馈到电网中的电量等信息。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 可选模板传感器

如果您希望汇总多个面板的数值，或查看房屋总用电功率，可以使用 [template platform](/home-assistant/integrations/template)。


```yaml
# template platform 的 configuration.yaml 示例条目
template:
- sensor
  - name: Total PV power
    unit_of_measurement: "W"
    state: "{{ (states('sensor.pv1_power') | float(default=0)) + (states('sensor.pv2_power') | float(default=0)) }}"
  - name: Load power
    unit_of_measurement: "W"
    state: "{{ (states('sensor.power_now') | float(default=0)) - (states('sensor.exported_power') | float(default=0)) }}"
```


### 配置能源仪表板

通常，您至少需要在能源仪表板中配置来自逆变器的 3 个传感器：

- 用于 **Grid Consumption** 的耗电传感器（单位为 kWh）。
- 用于 **Return to grid** 的回馈电量传感器（单位为 kWh），例如太阳能面板发出的、未被自用而回送电网的电量。
- 用于 **Solar production** 的并网发电量传感器（单位为 kWh）。
