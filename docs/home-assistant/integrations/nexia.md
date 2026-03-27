---
title: Nexia/American Standard/Trane
description: 'The Nexia/American Standard/Trane integration allows you to integrate your Nexia(https://mynexia.com/) (Trane) thermostats or American。'

ha_category:
  - Binary sensor
  - Climate
  - Scene
  - Sensor
  - Switch
ha_release: 0.108
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: nexia
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - number
  - scene
  - sensor
  - switch
ha_integration_type: hub
---
# Nexia/American Standard/Trane

The **Nexia/American Standard/Trane** integration allows you to integrate your [Nexia](https://mynexia.com/) (Trane) thermostats or [American Standard](https://asairhome.com/) thermostats into Home Assistant.

Home Assistant 目前支持以下设备类型：

- [二进制传感器](#binary-sensor)
- [气候](#climate)
- [传感器](#传感器)
- [场景](#场景)
- [开关](#开关)

## Configuration

To add the **Nexia/American Standard/Trane** hub to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nexia)

Nexia/American Standard/Trane can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nexia).
- From the list, select **Nexia/American Standard/Trane**.
- Follow the instructions on screen to complete the setup.

</details>

### Binary sensor

为每个恒温器添加以下二进制传感器：

- Blower Active

### Sensor

为每个恒温器添加以下传感器：

- 空气净化器模式
- 当前压缩机速度
- 要求的压缩机速度
- 室外温度
- 相对湿度
- 系统状态

为每个恒温器区域添加以下传感器：

- 区域温度
- 区域设定点状态
- 区域状态

### Climate

气候平台可让您控制恒温器。

支持以下特灵恒温器：`XL1050`、`XL850`、`XL824`

据报告，以下美国标准恒温器可以工作：“AZONE1050”、“AZONE850”、“ACONT824”

不支持以下恒温器：`XL624`、`XL950`、`AZONE950`、`AZEMT500`、`AZEMT400B`

其他恒温器可能会工作，但尚未经过测试。

### Number

数字平台可让您在支持变速风扇的系统上调整风扇速度。

### Scene

场景平台可让您激活 nexia 自动化。

### Switch

为每个恒温器添加以下启用/禁用开关：

- 紧急加热（如果设备支持）

为每个恒温器区域添加以下启用/禁用开关：

- Hold mode

The following include/exclude switch is added for each RoomIQ sensor (if the device supports
[RoomIQ](https://support.asairhome.com/hc/en-us/articles/360045784651-RoomIQ-Overview-and-Usage)).

- 包含“YOUR_SENSOR_NAME”（带有您的传感器名称）

这些开关允许您选择将哪些 RoomIQ 传感器包含在区域的平均温度中。
要更改您选择的传感器，请设置每个开关来代表您的选择。
最后一次此类更改后几秒钟，选择将发送到制造商的 Web 服务。
通常需要 10-15 秒才能完成，具体取决于 Web 服务。
必须至少选择一个传感器。
如果排除所有传感器，开关将恢复显示区域的设置。

### 操作 `nexia.set_aircleaner_mode`

设置空气净化器模式。选项包括“自动”、“快速”和 
“过敏”。此设置将影响同一恒温器上的所有区域。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of climate devices to control.
| `aircleaner_mode` | no | 'auto', 'quick', or 'allergy'

### 操作 `nexia.set_humidify_setpoint`

设置加湿设定点。此设置将影响同一恒温器上的所有区域。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of climate devices to control.
| `humidity` | no | Humidify setpoint level, from 35 to 65.
