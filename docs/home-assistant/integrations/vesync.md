---
title: VeSync
description: 关于如何在 Home Assistant 中设置 VeSync 设备的说明。
ha_category:
  - Fan
  - Light
  - Number
  - Switch
  - Update
ha_release: 0.66
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@markperdue'
  - '@webdjoe'
  - '@thegardenmonkey'
  - '@cdnninja'
  - '@iprak'
  - '@sapuseven'
ha_domain: vesync
ha_platforms:
  - binary_sensor
  - diagnostics
  - fan
  - humidifier
  - light
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: hub
ha_quality_scale: bronze
ha_dhcp: true
---

**VeSync** 集成让您可以控制连接到 VeSync App 的多种 Levoit 设备。目前，此集成支持大多数灯泡、风扇、空气净化器、开关、插座、加湿器，以及部分空气炸锅。

设备必须先添加到 VeSync App，此集成才能发现它们。

支持以下平台：

- **binary sensor**
- **fan**
- **humidifier**
- **light**
- **number**
- **sensor**
- **switch**
- **update**

## 支持的设备

此集成支持通过 VeSync App 控制的设备。以下列出了受支持的设备，但由于同类设备可能存在多个型号，因此该列表可能并不完整。

### Bulbs
- Etekcity WiFi Dimmable LED Bulb (ESL100)
- Etekcity WiFi Dimmable and Tunable White LED Bulb (ESL100CW)

### Wall switches

- Etekcity In Wall Smart Switch (EWSL01-USA)
- Etekcity Wifi Dimmer Switch (ESD16)
- Etekcity Wifi Dimmer Switch (ESWD16)

### Outlet plugs

- Etekcity 7 Amp US outlet - ESW01-USA (Round)
- Etekcity 10 Amp US outlet - ESW10-USA (Round)
- Etekcity 10 Amp EU outlet - ESW10-EU (Round)
- Etekcity 15 Amp US outlet - ESW15-USA (Rectangular)
- Etekcity 2 Plug Outdoor Outlet - ESO15-TB

### Fans

- Core 200S: Smart True HEPA Air Purifier
- Core 300S: Smart True HEPA Air Purifier
- Core 400S: Smart True HEPA Air Purifier
- Core 600S: Smart True HEPA Air Purifier
- EverestAir: Smart Air Purifier
- Vital 100S Smart True HEPA Air Purifier (LAP-V102S-WUS) 
- Vital 200S Smart True HEPA Air Purifier (LAP-V201S-WUS)
- LEVOIT Smart Wifi Air Purifier (LV-PUR131S)
- LEVOIT Smart Tower Fan (LTF-F422S-WUS)

### Humidifiers

- Classic200S: Classic 200S Smart Ultrasonic Cool Mist Humidifier
- Classic300S: Classic 300S Ultrasonic Smart Humidifier
- OasisMist 1000S Smart Ultrasonic Cool Mist Tower Humidifier (LUH-M101S-WUS)
- Superior6000S: Superior 6000S Smart Evaporative Humidifier

### Air Fryers

- Cosori 3.7 and 5.8 Quart Air Fryer

## 前提条件

在使用此集成之前，所有设备都必须先在 VeSync App 中完成注册。注册完成后，请继续按照下面“配置”部分中的步骤操作。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 移除集成

此集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 操作

| Action | Description |
|---------|-------------|
| `update_devices` | 轮询 VeSync 服务器以查找并添加新设备 |

## 功率与能耗传感器

许多 VeSync 插座支持功率与能耗监测。这些数据会以传感器实体的形式提供，与插座实体并列显示。请注意，旧版本集成会将这些数据作为插座开关实体的状态属性提供。

| Sensor                                    | Description                                                             | Example |
| ------------------------------------------|-------------------------------------------------------------------------|---------|
| `sensor.<outlet name>_current_power`      | 开关当前功耗，单位为瓦特 | 7.89    |
| `sensor.<outlet name>_energy_use_today`   | 过去 24 小时内开关消耗的千瓦时数 | 0.12    |
| `sensor.<outlet name>_voltage`            | 开关当前电压，单位为伏特，作为诊断传感器提供 | 120.32  |
| `sensor.<outlet name>_energy_use_weekly`  | 从周一 12:01AM 开始计算的本周总用电量，单位为 kWh | 14.74   |
| `sensor.<outlet name>_energy_use_monthly` | 从每月 1 日 12:01AM 开始计算的本月总用电量，单位为 kWh | 52.30   |
| `sensor.<outlet name>_energy_use_yearly`  | 从 1 月 1 日 12:01AM 开始计算的本年总用电量，单位为 kWh | 105.25  |

## 风扇与空气质量传感器
所有 VeSync 空气净化器都会提供滤芯剩余寿命，其中部分设备还会提供空气质量测量值。

| Sensor                  | Description                                                                            | Example   |
| ----------------------- | -------------------------------------------------------------------------------------- | --------- |
| `filter_life`           | 滤芯剩余百分比。（LV-PUR131S、Core200S/300s/400s/600s/EverestAir） | 142       |
| `air_quality`           | 当前空气质量读数。（LV-PUR131S、Core300s/400s/600s） | excellent |
| `pm2_5`                 | 当前空气质量读数。（Core300s/400s/600s/EverestAir） | 8         |

| Switch                  | Description                                                                        | Example   |
| ----------------------- | ---------------------------------------------------------------------------------- | --------- |
| `display`               | 显示屏开或关 | On        |

## 风扇公开属性

VeSync 空气净化器会根据型号支持的功能公开以下详细信息：

| Attribute               | Description                                                                       | Example         |
| ----------------------- | --------------------------------------------------------------------------------- | --------------- |
| `mode`                  | 设备当前模式。（LV-PUR131S、Core200S/300s/400s） | manual          |
| `speed`                 | 设备当前速度设置。（LV-PUR131S、Core200S/300s/400s） | high            |
| `speed_list`            | 设备支持的可用速度列表。（LV-PUR131S） | high            |
| `oscillating`           | 风扇当前是否正在摆动 | True            |
| `active_time`           | 设备处于非关闭模式后的累计秒数。（LV-PUR131S） | 1598            |
| `screen_status`         | 屏幕当前状态。（LV-PUR131S） | on              |
| `night_light`           | 小夜灯当前状态。（Core200S/Core400s） | off             |
| `child_lock`            | 儿童锁当前状态。（Core200S/300s/400s） | off             |

| Select                  | Description                                                                        | Example   |
| ----------------------- | ---------------------------------------------------------------------------------- | --------- |
| `night_light_level`     | 小夜灯亮度级别（取值：off、dim、on） | off       |

## 加湿器

VeSync 加湿器公开的传感器和设置。

| Sensor                  | Description                                                                        | Example   |
| ----------------------- | ---------------------------------------------------------------------------------- | --------- |
| `humidity`              | 当前湿度（百分比） | 35        |

| Number                  | Description                                                                        | Example   |
| ----------------------- | ---------------------------------------------------------------------------------- | --------- |
| `mist_level`            | 雾量强度（范围：1-9，步长：1）。仅在手动模式下可用。 | 1         |

| Select                  | Description                                                                        | Example   |
| ----------------------- | ---------------------------------------------------------------------------------- | --------- |
| `night_light_level`     | 小夜灯亮度级别（取值：off、dim、bright） | off       |

| Switch                  | Description                                                                        | Example   |
| ----------------------- | ---------------------------------------------------------------------------------- | --------- |
| `display`               | 显示屏开或关 | On        |
| `auto_off_config`       | 当湿度超过目标值时自动关闭，低于目标值时恢复运行 | On        |


## 二进制传感器

| Binary Sensor           | Description                                                                        | Example   |
| ----------------------- | ---------------------------------------------------------------------------------- | --------- |
| `water_lacks`           | 指示设备是否需要加水 | false     |
| `water_tank_lifted`     | 水箱是否被提起 | false     |

## 空气炸锅

VeSync 空气炸锅公开的传感器和设置。

| Sensor                  | Description                                                                            | Example   |
| ----------------------- | -------------------------------------------------------------------------------------- | --------- |
| `cook_status`           | 炸锅当前状态 | cooking   |
| `current_temp`          | 炸锅当前内部温度；关闭时为 Unknown。 | 150C      |
| `cook_set_temp`         | 目标烹饪温度 | 165C      |
| `cook_set_time`         | 烹饪分钟数 | 15        |
| `remaining_time`        | 烹饪或预热剩余分钟数 | 8         |
| `preheat_set_time`      | 预热分钟数 | 10        |


## 提取属性数据

如果您想获取受支持设备的属性读数，比如插座电压或风扇属性，则需要创建一个 [template sensor](/home-assistant/integrations/template#state-based-template-sensors/)。

在下面的示例中，请将所有 `vesync_switch` 替换为您自己设备的实体 ID。

示例改编自 [TP-Link 集成](https://www.home-assistant.io/integrations/tplink/#plugs)。


```yaml
template:
  - sensor:
    - name: "Vesync voltage"
      state: "{{ state_attr('switch.vesync_switch', 'voltage') | float(default=0) }}"
      unit_of_measurement: "V"
```


