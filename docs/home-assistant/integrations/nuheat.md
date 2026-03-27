---
title: NuHeat
description: 'The NuHeat integration lets control your connected NuHeat Signature(https://www.nuheat.com/products/thermostats/signature-thermostat) floor heating。'

ha_category:
  - Climate
ha_release: 0.61
ha_iot_class: Cloud Polling
ha_domain: nuheat
ha_config_flow: true
ha_dhcp: true
ha_platforms:
  - climate
ha_integration_type: device
ha_codeowners:
  - '@tstabrawa'
---
# NuHeat

The **NuHeat** integration lets control your connected [NuHeat Signature](https://www.nuheat.com/products/thermostats/signature-thermostat) floor heating thermostats from [NuHeat](https://www.nuheat.com/).

Home Assistant 目前支持以下设备类型：

- Climate

## Prerequisites

首先，您需要通过登录 [MyNuHeat.com](https://mynuheat.com/) 并选择您的恒温器来获取恒温器的数字序列号或 ID。

## Configuration

To add the **NuHeat** device to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nuheat)

NuHeat can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nuheat).
- From the list, select **NuHeat**.
- Follow the instructions on screen to complete the setup.

</details>

## Concepts

NuHeat 恒温器支持以下关键概念。

“目标温度”是设备试图达到的温度。目标温度要么由编程到恒温器中的时间表确定（“自动模式”），要么可以被覆盖。当家庭助理设置目标温度时，恒温器将保持该温度，直到恢复计划。

## Attributes

NuHeat 恒温器提供以下属性：“名称”、“温度单位”、“当前温度”、“目标温度”、“当前保持模式”、“当前操作”、“操作列表”、“最小温度”和“最大温度”。

### Attribute `name`

返回 NuHeat 恒温器的名称。

| Attribute type | Description |
| ---------------| ----------- |
| String | Name of the thermostat

### 属性`温度单位`

返回恒温器用于温度的测量单位。

| Attribute type | Description |
| ---------------| ----------- |
| String | Name of the temperature unit

### 属性`当前温度`

返回恒温器测量的当前温度。

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Currently measured temperature

### 属性`目标温度`

当恒温器处于工作状态时，返回恒温器的目标温度
不在自动操作模式下。

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Target temperature

### Attribute `preset_mode`

返回当前保持的温度（如果有）。

| Attribute type | Description |
| ---------------| ----------- |
| String | 'temperature', 'temporary_temperature', 'auto', etc.

### Attribute `hvac_action`

返回恒温器当前的 HVAC 模式。

| Attribute type | Description |
| ---------------| ----------- |
| String | 'heat', 'idle'

### Attribute `preset_modes`

返回可用预设模式的列表。

| Attribute type | Description |
| ---------------| ----------- |
| List of String | Available preset modes

### Attribute `min_temp`

返回恒温器支持的最低温度

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Minimum supported temperature

### Attribute `max_temp`

返回恒温器支持的最高温度

| Attribute type | Description |
| ---------------| ----------- |
| Integer | Maximum supported temperature

## Actions

NuHeat 恒温器提供以下操作：“set_temper”、“set_hvac_mode”、“set_preset_mode”。

### Action: Set HVAC mode

`climate.set_hvac_mode` 操作（[气候集成](/home-assistant/integrations/climate/)）设置 NuHeat 恒温器的 HVAC 模式。 NuHeat 恒温器没有关闭概念。将温度设置为“min_temp”并将模式更改为“加热”将导致设备进入“永久保持”预设，并阻止恒温器打开，除非您碰巧生活在寒冷的气候中。

### Action: Set temperature

`climate.set_Temperature` 操作（[气候集成](/home-assistant/integrations/climate/)）设置 NuHeat 恒温器的温度。如果恒温器处于自动模式，它会将恒温器暂时保持在给定温度。如果恒温器处于加热模式，则会将恒温器永久保持在给定温度。

### Action: Set preset mode

`climate.set_preset_mode` 操作（[气候集成](/home-assistant/integrations/climate/)）设置 NuHeat 恒温器的预设模式。可以使用以下预设：“运行计划”、“临时保留”、“永久保留”。