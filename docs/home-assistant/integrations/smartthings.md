---
title: SmartThings
description: 有关在 Home Assistant 中设置 SmartThings 的说明。
featured: true
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Event
  - Fan
  - Hub
  - Light
  - Lock
  - Media player
  - Number
  - Scene
  - Select
  - Sensor
  - Switch
  - Update
  - Vacuum
  - Valve
  - Water heater
ha_release: 0.87
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: smartthings
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - event
  - fan
  - light
  - lock
  - media_player
  - number
  - scene
  - select
  - sensor
  - switch
  - update
  - vacuum
  - valve
  - water_heater
ha_dhcp: true
ha_integration_type: hub
ha_codeowners:
  - '@joostlek'
ha_quality_scale: bronze
---

[SmartThings](https://www.samsung.com/smartthings/) 是一个可连接三星设备和第三方设备的家庭自动化平台。

## 前提条件

- 你需要一个 Samsung 账户及其登录凭据。
- 若要连接设备，需要在手机上安装 SmartThings 应用。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

SmartThings 将设备表示为一组[能力](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference)。SmartThings 集成会将这些能力映射为 Home Assistant 中的实体。一个设备可能会对应一个或多个实体。

- [Binary sensor](#binary-sensor)
- [Button](#button)
- [Climate](#climate)
- [Cover](#cover)
- [Event](#event)
- [Fan](#fan)
- [Light](#light)
- [Lock](#lock)
- [Media player](#media-player)
- [Number](#number)
- [Scene](#scene)
- [Select](#select)
- [Sensor](#sensor)
- [Switch](#switch)
- [Update](#update)
- [Vacuum](#vacuum)
- [Valve](#valve)
- [Water heater](#water-heater)

### 二值传感器

在 Home Assistant 中，以下每个 SmartThings capability 都会创建一个 binary sensor 实体：

| SmartThings capability                                                                                                          |
|---------------------------------------------------------------------------------------------------------------------------------|
| `accelerationSensor`                                                                                                            |
| [`contactSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#contactSensor)             |
| `custom.dryerWrinklePrevent`                                                                                                    |
| `custom.ovenCavityStatus`                                                                                                       |
| `custom.waterFilter`                                                                                                            |
| [`filterStatus`](https://developer.smartthings.com/docs/devices/capabilities/proposed#filterStatus)                             |
| [`gasDetector`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#gasDetector)                 |
| [`motionSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#motionSensor)               |
| [`presenceSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#presenceSensor)           |
| [`remoteControlStatus`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#remoteControlStatus) |
| `samsungce.doorState`                                                                                                           |
| `samsungce.kidsLock`                                                                                                            |
| `samsungce.steamClosetKeepFreshMode`                                                                                            |
| [`soundSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#soundSensor)                 |
| `switch`（仅适用于洗衣机、烘干机、洗碗机、灶台、微波炉和衣物护理机等家电类别） |
| [`tamperAlert`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#tamperAlert)                 |
| [`waterSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#waterSensor)                 |

### 按钮

SmartThings Button 平台提供以下按钮：

| SmartThings capability                                                                                                            | 按钮                  |
|-----------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| [`ovenOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#ovenOperatingState)     | 停止                  |
| `custom.waterFilter`                                                                                                              | 重置净水滤芯          |
| `samsungce.hoodFilter`                                                                                                            | 重置油烟机滤网        |

### 气候

SmartThings Climate 平台可用于控制具备空调、恒温器或热泵相关能力的设备。

#### 空调

若要将 SmartThings 空调表示为 climate 实体，它必须具备以下所有必需 capability。若缺少任意 capability，这些功能会在 Home Assistant 中以单独的传感器形式表示，而不是 climate 实体。

| SmartThings capability                                                                                                                                 | Related climate features in Home Assistant                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode) (required)                             | `hvac mode`                                                                                                                                                      |
| [`airConditionerFanMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerFanMode) (required)                       | `fan mode`                                                                                                                                                       |
| [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) (required)                                       | `turn on`, `turn off`                                                                                                                                            |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (required)       | `temperature`                                                                                                                                                    |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint) (required) | `target temp`                                                                                                                                                    |
| `custom.airConditionerOptionalMode`                                                                                                                    | `preset mode`                                                                                                                                                    |
| [`demandResponseLoadControl`](https://developer.smartthings.com/docs/devices/capabilities/proposed#demandResponseLoadControl)                          | `drlc_status_duration` (state attribute), `drlc_status_level` (state attribute), `drlc_status_override` (state attribute), `drlc_status_start` (state attribute) |
| [`fanOscillationMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#fanOscillationMode)                          | `swing mode`                                                                                                                                                     |

#### 恒温器

若要将 SmartThings 恒温器表示为 climate 实体，它必须具备所有必需 capability。若缺少任意 capability，这些功能会在 Home Assistant 中以单独的传感器形式表示，而不是 climate 实体。

| SmartThings capability                                                                                                                              | Related climate features in Home Assistant |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [`thermostatMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatMode) (required)                    | `hvac mode`                                |
| [`thermostatHeatingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatHeatingSetpoint) (required) | `target temp`, `target temp low`        |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (required)    | `temperature`                              |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint)         | `target temp`, `target temp high`          |
| [`thermostatOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatOperatingState)           | `hvac action`                              |
| [`thermostatFanMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatFanMode)                         | `fan mode`                                 |
| [`relativeHumidityMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#relativeHumidityMeasurement)     | `humidity` (state attribute)               |

#### 热泵分区

若要将 SmartThings 热泵分区表示为 climate 实体，它必须在 `INDOOR`、`INDOOR1` 或 `INDOOR2` 组件上具备所有必需 capability。

| SmartThings capability                                                                                                                                 | Related climate features in Home Assistant |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode) (required)                             | `hvac mode`                                |
| [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) (required)                                       | `turn on`, `turn off`                      |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (required)       | `temperature`                              |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint) (required) | `target temp`                              |
| `custom.thermostatSetpointControl` (required)                                                                                                          | `min temp`, `max temp`                     |

### 封盖

SmartThings Cover 平台可用于控制具备开合相关能力的设备。若要将设备表示为 cover 实体，它必须具备 `doorControl` 或 `windowShade` capability；否则，这些功能会在 Home Assistant 中以单独的传感器形式表示。

| SmartThings capability                                                                                                     | Related cover features in Home Assistant |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`doorControl`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#doorControl)            | `open` and `close`                       |
| [`windowShade`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#windowShade)            | `open` and `close`                       |
| [`switchLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switchLevel)            | `position`                               |
| [`windowShadeLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference/#windowShadeLevel) | `position`                               |
| [`battery`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#battery)                    | `battery_level` (state attribute)        |

### 事件

SmartThings Event 平台会为每个按钮创建实体，用于显示按钮按压事件，并允许你基于这些事件创建自动化。

### 风扇

SmartThings Fan 平台可用于控制具备风扇相关能力的设备。若要将 SmartThings 设备表示为 fan 实体，除了 [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) capability 之外，还必须具备以下一个或多个 capability。若设备同时具备 `fanSpeed` 或 `airConditionerFanMode` 以及 `thermostatCoolingSetpoint`，则会改为表示为 climate 实体。

| SmartThings capability                                                                                                                                  | Related fan features in Home Assistant |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [`fanSpeed`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#fanSpeed)                                               | `speed` (percentage)                   |
| [`airConditionerFanMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerFanMode)                                   | `preset mode`                          |
| `samsungce.hoodFanSpeed` (creates a separate hood fan entity for range hoods with smart fan speed support)                                              | `speed` (percentage), `preset mode`    |

### 灯光

SmartThings Light 平台可用于控制具备灯光相关能力的设备。若要将 SmartThings 设备表示为 light 实体，除了 [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) capability 之外，还必须具备以下一个或多个 capability。

| SmartThings capability                                                                                                    | Related light features in Home Assistant |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`switchLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switchLevel)           | `brightness` and `transition`            |
| [`colorControl`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#colorControl)         | `color`                                  |
| [`colorTemperature`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#colorTemperature) | `color_temp`                             |

### 门锁

SmartThings Lock 平台可用于控制具备 [`lock`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#lock) capability 的设备，可显示当前锁状态并支持上锁与解锁命令。

### 媒体播放器

SmartThings Media player 平台可用于控制具备媒体播放器相关能力的设备。若要将 SmartThings 设备表示为 media player 实体，它必须具备所有必需 capability。

| SmartThings capability                                                                                                            | Related media player features in Home Assistant                                       |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [`audioMute`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#audioMute) (required)            | `volume_mute`                                                                         |
| [`audioVolume`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#audioVolume) (required)        | `volume_up`, `volume_down`, `volume_set`                                              |
| [`audioTrackData`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#audioTrackData)             | `media_title` and `media_artist`                                                      |
| [`mediaPlayback`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#mediaPlayback)               | `media_play`, `media_pause`, `media_stop`, `media_next_track`, `media_previous_track` |
| [`mediaInputSource`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#mediaInputSource)         | `select_source`                                                                       |
| [`mediaPlaybackRepeat`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#mediaPlaybackRepeat)   | `repeat_set`                                                                          |
| [`mediaPlaybackShuffle`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#mediaPlaybackShuffle) | `shuffle_set`                                                                         |
| [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch)                             | `turn_on`, `turn_off`                                                                 |

### 数值

SmartThings Number 平台可用于控制以下 capability 的数值型设置：

| SmartThings capability                                                                                                                                 | Number entity                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `custom.washerRinseCycles`                                                                                                                             | Washer rinse cycles          |
| `samsungce.hoodFanSpeed` (on hood component)                                                                                                           | Hood fan speed               |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint) (on cooler, freezer, or onedoor components) | Refrigerator temperature |

### 场景

SmartThings Scene 平台可用于激活你在 SmartThings 中定义的场景。每个 SmartThings 场景都会创建一个 scene 实体。

### 选择

SmartThings Select 平台可用于配置设备选项。某些 capability 需要先在设备上启用远程控制，才能进行更改。

Select 实体支持以下 SmartThings capability：

| SmartThings capability                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------ |
| `custom.washerSoilLevel`                                                                                                                   |
| `custom.washerSpinLevel`                                                                                                                   |
| `custom.washerWaterTemperature`                                                                                                            |
| [`dishwasherOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#dishwasherOperatingState)  |
| [`dryerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#dryerOperatingState)            |
| `samsungce.autoDispenseDetergent`                                                                                                          |
| `samsungce.dishwasherWashingOptions`                                                                                                       |
| `samsungce.dustFilterAlarm`                                                                                                                |
| `samsungce.flexibleAutoDispenseDetergent`                                                                                                  |
| `samsungce.lamp`                                                                                                                           |
| [`washerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#washerOperatingState)          |

### 传感器

SmartThings Sensor 平台可用于查看具备传感器相关能力的设备。设备支持的每个属性（如下）都会创建一个 Sensor 实体。

| SmartThings capability                                                                                                                                        | Related entities in Home Assistant                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`activityLightingMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#activityLightingMode)                                           | Activity lighting mode                                                   |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode)                                               | Air conditioner mode                                                     |
| [`airQualitySensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#airQualitySensor)                                     | Air quality                                                              |
| [`alarm`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#alarm)                                                           | Alarm                                                                    |
| [`atmosphericPressureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#atmosphericPressureMeasurement)         | Atmospheric pressure                                                     |
| [`audioVolume`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#audioVolume)                                               | Volume                                                                   |
| [`battery`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#battery)                                                       | Battery                                                                  |
| [`bodyMassIndexMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#bodyMassIndexMeasurement)                                   | Body mass index                                                          |
| [`bodyWeightMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#bodyWeightMeasurement)                                         | Body weight                                                              |
| [`carbonDioxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#carbonDioxideMeasurement)                     | Carbon dioxide                                                           |
| [`carbonMonoxideDetector`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#carbonMonoxideDetector)                         | Carbon monoxide detector                                                 |
| [`carbonMonoxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#carbonMonoxideMeasurement)                                 | Carbon monoxide                                                          |
| `custom.cooktopOperatingState`                                                                                                                                | Cooktop operating state                                                  |
| `custom.waterFilter`                                                                                                                                          | Water filter usage                                                       |
| [`dishwasherOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dishwasherOperatingState)                                   | Machine state<br/>Job state<br/>Completion time                          |
| [`dryerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dryerMode)                                                                 | Dryer mode                                                               |
| [`dryerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#dryerOperatingState)                                             | Machine state<br/>Job state<br/>Completion time                          |
| [`dustHealthConcern`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#dustHealthConcern)                                   | PM10 health concern                                                      |
| [`dustSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#dustSensor)                                                 | PM10<br/>PM2.5                                                           |
| [`energyMeter`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#energyMeter)                                               | Energy                                                                   |
| [`equivalentCarbonDioxideMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#equivalentCarbonDioxideMeasurement) | Equivalent carbon dioxide                                                |
| [`fineDustHealthConcern`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#fineDustHealthConcern)                           | PM2.5 health concern                                                     |
| [`fineDustSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#fineDustSensor)                                         | PM2.5                                                                    |
| [`formaldehydeMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#formaldehydeMeasurement)                       | Formaldehyde                                                             |
| [`gasMeter`](https://developer.smartthings.com/docs/devices/capabilities/proposed#gasMeter)                                                                   | Gas meter<br/>Gas meter calorific<br/>Gas meter time<br/>Gas             |
| [`illuminanceMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#illuminanceMeasurement)                         | Illuminance                                                              |
| [`infraredLevel`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#infraredLevel)                                           | Infrared level                                                           |
| [`mediaInputSource`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaInputSource)                                                   | Media input source                                                       |
| [`mediaPlaybackRepeat`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaPlaybackRepeat)                                             | Media playback repeat                                                    |
| [`mediaPlaybackShuffle`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaPlaybackShuffle)                                           | Media playback shuffle                                                   |
| [`mediaPlayback`](https://developer.smartthings.com/docs/devices/capabilities/proposed#mediaPlayback)                                                         | Media playback status                                                    |
| [`odorSensor`](https://developer.smartthings.com/docs/devices/capabilities/proposed#odorSensor)                                                               | Odor sensor                                                              |
| [`ovenMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#ovenMode)                                                                   | Oven mode                                                                |
| [`ovenOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#ovenOperatingState)                                               | Machine state<br/>Job state<br/>Completion time                          |
| [`ovenSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/proposed#ovenSetpoint)                                                           | Set point                                                                |
| [`powerConsumptionReport`](https://developer.smartthings.com/docs/devices/capabilities/proposed#powerConsumptionReport)                                       | Energy difference<br/>Power energy<br/>Energy saved<br/>Power<br/>Energy |
| [`powerMeter`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#powerMeter)                                                 | Power                                                                    |
| [`powerSource`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#powerSource)                                               | Power source                                                             |
| `relativeBrightness`                                                                                                                                          | Brightness intensity                                                     |
| [`refrigerationSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/proposed#refrigerationSetpoint)                                         | Set point                                                                |
| [`relativeHumidityMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#relativeHumidityMeasurement)               | Humidity                                                                 |
| [`robotCleanerCleaningMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerCleaningMode)                                   | Cleaning mode                                                            |
| [`robotCleanerMovement`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerMovement)                                           | Movement                                                                 |
| [`robotCleanerTurboMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#robotCleanerTurboMode)                                         | Turbo mode                                                               |
| `samsungce.cooktopHeatingPower`                                                                                                                               | Manual level<br/>Heating mode                                            |
| `samsungce.ehsDiverterValve`                                                                                                                                  | Diverter valve position                                                  |
| `samsungce.hoodFilter`                                                                                                                                        | Hood filter usage                                                        |
| `samsungce.waterConsumptionReport`                                                                                                                            | Water consumption                                                        |
| [`signalStrength`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#signalStrength)                                         | Link quality<br/>Signal strength                                         |
| [`smokeDetector`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#smokeDetector)                                           | Smoke detector                                                           |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement)                         | Temperature                                                              |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint)                   | Cooling set point                                                        |
| [`thermostatFanMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatFanMode)                                   | Fan mode                                                                 |
| [`thermostatHeatingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatHeatingSetpoint)                   | Heating set point                                                        |
| [`thermostatMode`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatMode)                                         | Mode                                                                     |
| [`thermostatOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatOperatingState)                     | Operating state                                                          |
| [`thermostatSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/deprecated#thermostatSetpoint)                                             | Set point                                                                |
| [`threeAxis`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#threeAxis)                                                   | X coordinate<br/>Y coordinate<br/>Z coordinate                           |
| [`tvChannel`](https://developer.smartthings.com/docs/devices/capabilities/proposed#tvChannel)                                                                 | TV channel<br/>TV channel name                                           |
| [`tvocMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#tvocMeasurement)                                       | Volatile organic compounds                                               |
| [`ultravioletIndex`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#ultravioletIndex)                                     | UV index                                                                 |
| [`veryFineDustHealthConcern`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#veryFineDustHealthConcern)                   | PM1.0 health concern                                                     |
| [`veryFineDustSensor`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#veryFineDustSensor)                                 | PM1.0                                                                    |
| [`voltageMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#voltageMeasurement)                                 | Voltage                                                                  |
| [`washerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#washerMode)                                                               | Washer mode                                                              |
| [`washerOperatingState`](https://developer.smartthings.com/docs/devices/capabilities/proposed#washerOperatingState)                                           | Machine state<br/>Job state<br/>Completion time                          |

### 开关

SmartThings Switch 平台可用于控制具备 [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) capability、且尚未由更具体平台表示的设备。同时也会为以下 capability 创建 switch 实体：

| SmartThings capability                 |
|----------------------------------------|
| `custom.dryerWrinklePrevent`           |
| `samsungce.airConditionerBeep`         |
| `samsungce.airConditionerLighting`     |
| `samsungce.dishwasherWashingOptions`   |
| `samsungce.powerCool`                  |
| `samsungce.powerFreeze`               |
| `samsungce.sabbathMode`               |
| `samsungce.steamClosetAutoCycleLink`   |
| `samsungce.steamClosetKeepFreshMode`   |
| `samsungce.steamClosetSanitizeMode`    |
| `samsungce.washerBubbleSoak`           |

### 更新

SmartThings Update 平台可用于更新具备 [`firmwareUpdate`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#firmwareUpdate) capability 的设备固件。

### 吸尘器

SmartThings Vacuum 平台可用于控制具备 `samsungce.robotCleanerOperatingState` capability 的设备，可显示吸尘器状态并控制设备。

### 阀门

SmartThings Valve 平台可用于控制具备 [`valve`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#valve) capability 的设备，可显示阀门状态并执行打开/关闭操作。

### 热水器

SmartThings Water heater 平台可用于控制提供热水的热泵。若要将设备表示为 water heater 实体，它必须具备以下所有 capability：

| SmartThings capability                                                                                                                                 | Related water heater features in Home Assistant |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| [`switch`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#switch) (required)                                       | `turn on`, `turn off`                           |
| [`airConditionerMode`](https://developer.smartthings.com/docs/devices/capabilities/proposed#airConditionerMode) (required)                             | `operation mode`                                |
| [`temperatureMeasurement`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#temperatureMeasurement) (required)       | `temperature`                                   |
| `custom.thermostatSetpointControl` (required)                                                                                                          | `min temp`, `max temp`                          |
| [`thermostatCoolingSetpoint`](https://developer.smartthings.com/docs/devices/capabilities/capabilities-reference#thermostatCoolingSetpoint) (required) | `target temp`                                   |
| `samsungce.ehsThermostat` (required)                                                                                                                   |                                                 |
| `custom.outingMode` (required)                                                                                                                         | `away mode`                                     |

## 故障排查

### 启用调试日志

启用调试日志后，集成会在日志中显示接收到的所有事件。日志会捕获该设备 5 秒内的事件，并返回一个包含设备状态和事件的 JSON 文件。
调试日志有助于诊断状态更新问题，例如可先在界面中选择按钮，再手动操作设备进行验证。

- 若要启用调试日志，请按照[启用调试日志步骤](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)操作。

### 设备功能缺失

SmartThings 集成并不支持所有 SmartThings capability。仅支持本文档中列出的 capability。若你的设备某项功能未在 Home Assistant 中提供，可能有以下原因：

1. 想查看当前已实现的 capability，请参阅[支持的功能](#支持的功能)部分。
   - 你需要的 capability 可能尚未被此集成支持。
2. 想确认设备所需 capability 是否已在 API 中提供，请查看 [SmartThings Developer Portal](https://my.smartthings.com/advanced/devices)。
   - 某些设备功能仅在 SmartThings 应用中可用，不会通过 API 暴露。
3. 如果该 capability 已在 SmartThings API 中提供，但此集成尚未支持，你可以通过创建 [GitHub Discussion](https://github.com/orgs/home-assistant/discussions?discussions_q=is%3Aopen+label%3A%22integration%3A+smartthings%22) 来请求支持。
   - 功能请求请不要创建 GitHub Issue，因为 Issue 主要用于缺陷报告。

### 查看设备诊断信息

SmartThings 集成提供两个层级的诊断信息。若要下载诊断，请按照[下载诊断步骤](/home-assistant/docs/configuration/troubleshooting/#download-diagnostics)操作。

- **设备诊断**：包含单个设备的全部 capability 及其当前状态。排查特定设备问题时非常有用，因为它会准确展示该设备向 SmartThings API 暴露了哪些 capability、属性和属性值。
- **配置条目诊断**：包含你的 SmartThings 位置中所有 capability 和设备的信息，但不包含当前状态值。适合用来整体了解所有已连接设备可用的 capability。

## 删除集成

### 从 Home Assistant 中删除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，选择该集成卡片。
2. 在设备列表中，选择你要删除的集成实例。
3. 在对应条目旁点击三点 `[mdi:dots-vertical]` 菜单，然后选择 **删除**。
4. 打开 SmartThings 应用，并从 SmartThings 中删除 Home Assistant 应用。
