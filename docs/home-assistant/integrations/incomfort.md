---
title: Intergas gateway
description: '此集成可将 Home Assistant 与您的 Intergas 网关连接起来，包括锅炉以及连接到该网关的所有房间温控器。 该集成使用 incomfort-client(https://pypi.org/project/incomfort-client/) 库。'
ha_category:
  - Binary sensor
  - Climate
  - Sensor
  - Water heater
ha_release: 0.93
ha_iot_class: Local Polling
ha_codeowners:
  - '@jbouwh'
ha_domain: incomfort
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - sensor
  - water_heater
ha_integration_type: hub
ha_config_flow: true
ha_dhcp: true
ha_quality_scale: platinum
---
# Intergas gateway

此集成可将 Home Assistant 与您的 Intergas 网关连接起来，包括锅炉以及连接到该网关的所有房间温控器。
该集成使用 [incomfort-client](https://pypi.org/project/incomfort-client/) 库。

### 支持的设备

Intergas Gateway 可连接基于 OpenTherm 标准的温控器，例如 [Comfort Touch Thermostat](https://www.intergas-verwarming.nl/en/consumer/products/comfort-touch-thermostat/)。温控器和 LAN2RF 网关通常会成套出售。该网关适用于 2014 年起生产的 Intergas Kombi Kompakt HRE 和 HReco 设备。如果 Comfort Touch 温控器与该网关一起使用，则还可搭配 2017 年起生产的 Intergas Kombi Kompakt HRE、HReco 或 Xtreme 设备使用。

### 锅炉

锅炉会表示为一个 **Water heater** 设备。它会报告锅炉的 `state` 和 `current_temperature`。该网关不提供直接控制锅炉或更改其配置的方法。

请注意，`current_temperature` 会根据锅炉当前运行模式，在 CV（循环供暖）温度和生活热水温度之间切换。如果锅炉当前既不在循环也不在供水，则会上报两者中较高的那个值。

### 房间

所有房间温控器（可能有 0 个、1 个或 2 个）都会表示为 **Climate** 设备。它们会报告温控器的目标 `temperature` 和 `current_temperature`，并允许更改目标温度。这类似于使用温控器/网关配套的 Comfort Touch 应用来修改目标温度覆盖值。请注意，当温控器时间表进入新的设定点后，所有覆盖值都会被重置。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
host:
    description: "Intergas 网关的主机名或 IP 地址。"
    required: true
    type: string
username:
    description: "用于登录网关的用户名。大多数情况下为 `admin`。"
    required: false
    type: string
password:
    description: "用于登录网关的密码，通常印在网关底部；某些旧设备则为 `intergas`。"
    required: false
    type: string
```

该网关不必与 HA 位于同一网络中，但必须能通过 80 端口 / HTTP 访问。

以上配置稍后也可以通过
[**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/),
选择 "Intergas gateway"，再选择 `[mdi:dots-vertical]` 并选择 **Reconfigure** 来调整。

:::important
某些较旧的房间温控器在手动修改设定点时，可能会上报错误的设定值。如果您遇到这种情况，可以启用 `Legacy setpoint handling` 选项。


:::
## Options

To define options for Intergas gateway, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Intergas gateway are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

### 用于诊断的传感器

请注意，**所有** 传感器默认均为禁用状态。

- **Sensors**
  - Boiler Pressure：表示锅炉压力。
  - Boiler Temperature：表示中央供暖温度。
  - Boiler Tap temperature：表示生活热水温度。
- **Binary sensors**
  - Boiler Burner：表示燃烧器是否开启。
  - Boiler Fault：表示是否存在故障。故障代码会作为属性提供。
  - Boiler Hot water tap：表示热水龙头是否正在使用。
  - Boiler Pump：表示中央供暖循环泵是否正在运行。

## 故障排除

如果设置较旧型号网关失败，请尝试将 `username` 和 `password` 字段留空。

## 数据更新

Intergas 网关每 30 秒从网关获取一次状态数据。当温控器上的目标温度发生变化时，Home Assistant 中 climate 实体上的设定点可能需要一些时间才会更新。

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 自动化

如果您想在 CV 压力过低或过高时发送警报，可以参考以下示例：


```yaml
- alias: "Low CV Pressure Alert"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.boiler_pressure
      below: 1.0
  actions:
    - action: notify.pushbullet_notifier
      data:
        title: "Warning: Low CH Pressure"
        message: >-
          {{ trigger.to_state.attributes.friendly_name }}
          is low, {{ trigger.to_state.state }} bar.
```


其他属性可通过各设备的属性查看。
