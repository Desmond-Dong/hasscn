---
title: Watts Vision +
description: 'The Watts Vision + integration enables seamless control of your heating zones directly from Home Assistant. 本页属于 Home Assistant 中文文档。'
ha_category:
  - Climate
  - Switch
ha_release: '2026.1'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@theobld-ww'
  - '@devender-verma-ww'
  - '@ssi-spyro'
ha_domain: watts
ha_config_flow: true
ha_platforms:
  - climate
  - diagnostics
  - switch
ha_integration_type: hub
ha_quality_scale: platinum
---
# Watts Vision +

The **Watts Vision +** integration enables seamless control of your heating zones directly from Home Assistant.

[Watts Vision +](https://www.watts.eu/en/products/eu/smart-home-and-controls/vision-wireless) is a smart heating management system that allows remote control of individual home heating zones. It offers precise room temperature regulation, programmable schedules, and energy consumption monitoring through connected thermostats and actuators.

This integration uses the official Watts Vision + API to provide control over your heating zones. You can adjust temperatures, switch between heating modes, and monitor the current status of each thermostat in your home.

## 先决条件

Before setting up the integration, make sure you have:

1. A Watts Vision + account created via the Vision + mobile app.
2. At least one Watts Vision + gateway connected to the internet and linked to your account.
3. At least one sub-device paired with your gateway.

:::note
The integration uses OAuth2 authentication. You will be redirected to the Watts Vision + login page to authenticate with your account credentials. Make sure you have set up a Watts Vision + account through their mobile app before configuring this integration.

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的设备

The integration supports the following Watts Vision + devices:

### 网关

- BT-CT03-RF
- BT-ST03-RF

### 子设备

- BT-DP02-RF
- BT-D03-RF
- BT-A02-RF
- BT-A03-RF
- BT-TH02-RF
- PR03-RF
- PR03-RF16
- BT-WR03-RF
- BT-WR02-RF

## 支持的功能

The integration provides the following Home Assistant entities:

### 气候实体

The integration creates a climate entity for each thermostat device in your Watts Vision + system. Each climate entity provides:

- **Current temperature**: Current ambient room temperature
- **Target temperature**: Set the desired temperature for the room
- **HVAC modes**:
  - **Heat**: Manual comfort or eco mode
  - **Off**: Turn off heating for the zone
  - **Auto**: Follow programmed schedule
- **Temperature range**: The min/max temperature limits configured for the device

#### 气候实体属性

Each climate entity exposes additional attributes:

- **Thermostat mode**: Current operating mode of the thermostat
- **Device type**: Type of thermostat device
- **Room name**: Name of the room as configured in the Watts Vision + app
- **Temperature unit**: Temperature unit (°C or °F)
- **Available thermostat modes**: List of supported modes for the device

### 开关实体

The integration creates a switch entity for each compatible switch device in your Watts Vision + system. Each switch entity provides:

- On and off control: Toggle the device on or off
- State reporting: View the current state of the device

### 共享功能

All Watts Vision + devices share common functionality:

- **Device information**: Manufacturer (Watts), model information, and device identification
- **Availability**: Entities show as unavailable when devices are offline or communication fails

## 数据更新

The Watts Vision + integration polls data from the cloud API every 30 seconds. After sending commands (temperature changes, mode changes, or switch operations), the integration waits 7 seconds before refreshing to allow the device to process the change.

## 使用场景

Watts Vision+ supports a wide range of heating systems, including underfloor heating and cooling. By integrating with Home Assistant, the Watts Vision ecosystem becomes fully interoperable with other IoT devices from any brand in your connected home, unlocking powerful automation possibilities.

This integration enables you to:

- **Create weather-responsive heating schedules**: Build advanced automations that adjust heating based on outdoor temperature, weather forecasts, cloud coverage, and other meteorological data for optimal comfort and energy efficiency.
- **Integrate with your entire smart home ecosystem**: Coordinate your Watts heating system with lighting, blinds, air quality sensors, and other smart devices
- **Optimize energy consumption intelligently**: Automatically adjust heating based on real-time electricity rates, solar panel production, or time-of-use tariffs to minimize costs while maintaining comfort.
- **Implement presence-based heating control**: Combine with occupancy sensors, door/window contacts, or presence detection to heat only occupied rooms and automatically reduce temperatures when rooms are empty or windows are open.
- **Design sophisticated heating programs**: Go beyond basic schedules by creating personalized heating programs that adapt to your lifestyle, seasonal changes, and specific room requirements.
- **Monitor and analyze heating patterns**: Track energy consumption, temperature trends, and system performance over time to identify optimization opportunities.

## 自动化示例

<details>
<summary>家中无人时降低温度</summary>


```yaml
alias: "Eco mode when away"
description: "当房子空着时，将所有恒温器设置为环保模式"
triggers:
  - platform: state
    entity_id: group.family
    from: "home"
    to: "not_home"
    for:
      minutes: 10
actions:
  - action: climate.set_hvac_mode
    target:
      entity_id: 
        - climate.living_room
        - climate.bedroom
        - climate.office
    data:
      hvac_mode: "heat"
  - action: climate.set_temperature
    target:
      entity_id: 
        - climate.living_room
        - climate.bedroom
        - climate.office
    data:
      temperature: 18
```


</details>

## 故障排除

### 设备显示为不可用

#### 现象：气候实体显示为“Unavailable”

When viewing your Watts Vision + climate entities, they show as "Unavailable" in Home Assistant.

##### 说明

This indicates that Home Assistant cannot communicate with your devices through the Watts Vision + cloud API. This is typically caused by connectivity issues between your gateway and the Watts cloud service.

##### 解决方法

To resolve this issue, try the following steps:

1. Check the gateway status in the Watts Vision + app:
   - Open the Watts Vision + mobile app.
   - Verify that the gateway does not appear as offline.
   - If the gateway shows as offline, this confirms the connectivity issue.
2. Check the WiFi connection and pairing status of your Watts Vision + gateway:
   - In the Watts Vision + app, go to the gateway settings.
   - Navigate to the WiFi settings.
   - Verify that the status shows **2/2** and is displayed in **green**.
   - If the status is not 2/2 or not green, the gateway is not properly connected and paired to the cloud.
3. Restart the gateway:
   - Unplug the gateway from power.
   - Wait 10 seconds.
   - Plug it back in and wait for it to reconnect.
4. Reload the integration in Home Assistant:
   - Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
   - Find the Watts Vision + integration.
   - Select the three-dot menu and choose **Reload**.

### 新增或移除的设备未在 Home Assistant 中反映

#### 现象：新增或移除的设备不会立即显示

After adding a new device through the Watts Vision + app or removing an existing device, the change is not immediately visible in Home Assistant.

##### 说明

The Home Assistant integration polls new devices every 15 minutes, so it can take up to 15 minutes to see the new devices.

##### 解决方法

Device additions or removals can take up to **15 minutes** to be reflected in Home Assistant. To ensure the change is processed:

1. Wait for up to 15 minutes after making the change in the Watts Vision + app.
2. If the device still doesn't appear or disappear after 15 minutes, try reloading the integration:
   - Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
   - Find the Watts Vision + integration.
   - Select the three-dot menu and choose **Reload**.

## 删除集成

This integration follows standard integration removal.
### 从 Home Assistant 中删除集成实例

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
