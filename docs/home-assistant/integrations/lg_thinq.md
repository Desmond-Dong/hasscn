---
title: LG ThinQ
description: 'LG ThinQ 集成可让您将 LG ThinQ 设备连接到 Home Assistant。此集成的功能包括：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Hub
ha_release: '2024.11'
ha_iot_class: Cloud Push
ha_code_owners:
  - '@LG-ThinQ-Integration'
ha_config_flow: true
ha_domain: lg_thinq
ha_platforms:
  - binary_sensor
  - climate
  - event
  - fan
  - humidifier
  - number
  - select
  - sensor
  - switch
  - vacuum
  - water_heater
ha_integration_type: hub
ha_codeowners:
  - '@LG-ThinQ-Integration'
ha_dhcp: true
---
# LG ThinQ

**LG ThinQ** 集成可让您将 LG ThinQ 设备连接到 Home Assistant。此集成的功能包括：

- 通过 LG ThinQ Connect API 将 LG 家电作为 Home Assistant 实体进行控制。

## 前提条件

- 此功能通过 LG ThinQ 云端运行，因此需要互联网连接。
- 需要一个 [personal access token](https://connect-pat.lgthinq.com) 才能使用 LG ThinQ Connect API。

### Personal Access Token (PAT)

1. 打开 **[personal access token](https://connect-pat.lgthinq.com)** 页面（需要 LG ThinQ 账户）。
2. 选择 **ADD NEW TOKEN**。
3. 输入新的令牌名称，并选择以下授权范围：
    - **Permission to view all devices**
    - **Permission to view all device statuses**
    - **All device control rights**
    - **All device event subscription rights**
    - **All device push notification permissions**
    - **Permission to inquiry device energy consumption**
4. 选择 **CREATE TOKEN**。
5. 完成以上步骤后，您会看到一个已生成的 **PAT**。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

1. 输入用于 LG ThinQ Connect API 的信息：
   - 通过 PAT 签发流程获得的 **Token Value**（必填）
   - 条目名称
2. 选择地区（国家）。

## 支持的设备

### 家电

当前支持以下 LG 家电：

- Air Conditioner
- Air Purifier
- Air Purifier Fan
- Ceiling Fan
- Cooktop
- Dehumidifier
- Dishwasher
- Dryer
- Home Brew
- Hood
- Humidifier
- Kimchi Refrigerator
- Microwave Oven
- Oven
- Plant Cultivator
- Refrigerator
- Robot Cleaner
- Stick Cleaner
- Styler
- System Boiler
- Washcombo Main
- Washcombo Mini
- Washer
- Washtower
- Washtower Dryer
- Washtower Washer
- Water Heater
- Water Purifier
- Wine Cellar
- Ventilator

## 数据更新

- 状态：设备状态发生变化时会发送事件。
- 状态（旧版传统型号）：由于设备状态变化无法实时聚合，因此每 5 分钟发送一次事件。
- 能耗：截至昨天的汇总使用数据会在每天早晨更新。

## 能耗

支持为单个设备提供历史能耗传感器：

- Energy last month (Wh)：上个月的能耗。
- Energy this month (Wh)：本月的能耗。
- Energy yesterday (Wh)：昨天的能耗。
  
## 平台

LG ThinQ 会将设备表示为一组属性，这些属性会映射为 Home Assistant 中的实体。

LG ThinQ 集成提供的实体平台如下：

- [Binary sensor](#binary-sensor)
- [Button](#button)
- [Climate](#climate)
- [Event](#event)
- [Fan](#fan)
- [Humidifier](#humidifier)
- [Number](#number)
- [Select](#select)
- [Sensor](#sensor)
- [Switch](#switch)
- [Vacuum](#vacuum)
- [Water heater](#water-heater)

### Binary sensor

只读且只有两个可切换状态的属性会表示为二进制传感器平台。

| Device | Property |
| ------ | -------- |
| Cooktop | Remote start |
| Dish Washer | Chime sound<br>Clean indicator light<br>Door<br>Machine clean reminder<br>Remote start<br>Rinse refill needed | 
| Hood | Power |
| Oven | Remote start |
| Refrigerator | Door<br>Eco friendly<br>Power saving mode<br>Sabbath |
| Kimchi Refrigerator | Fresh air filter |
| Dryer<br>Styler<br>Washer<br>Washcombo Main<br>Washcombo Mini<br>Washtower<br>Washtower Dryer<br>Washtower Washer | Remote start |
| Water Heater | Power |
| Wine Cellar | Sabbath |

### Button

A writable 且只有两个可切换状态的属性会表示为按钮平台。

| Device |Property |Action |
| ------ |-------- | ------ |
| Dish Washer | Operation | Start / Pause |
| Dryer<br>Styler<br>Washer<br>Washcombo Main<br>Washcombo Mini<br>Washtower<br>Washtower Dryer<br>Washtower Washer | Operation | Start / Pause |

### Climate

用于同时控制设备温度和风力强度的属性会表示为 climate 平台。

| Device | Property |
| ------ | -------- |
| Air Conditioner | Current temperature<br>Fan mode<br>Swing mode<br>Swing horizontal mode<br>HVAC mode<br>Preset mode<br>Temperature<br>Temperature cool<br>Temperature heat<br>Unit |
| System Boiler | Current temperature<br>HVAC mode<br>Temperature<br>Temperature cool<br>Temperature heat<br>Unit |

### Event

由服务器推送的通知消息会表示为 event 平台。**Notification codes** 显示完整支持范围，您也可以通过开发者工具查看自己设备支持的范围。

| Device | Property | Notification codes |
| ------ | -------- | ---------- |
| Air Conditioner | Notification | water_is_full |
| Air Purifier| Notification | lack_of_water, time_to_clean_filter, pollution_is_high, time_to_change_filter |
| Air Purifier Fan | Notification | time_to_change_filter |
| Dehumidifier | Notification | water_is_full |
| Dish Washer | Error<br>Notification | cleaning_is_complete, error_during_cleaning, water_leak_has_occurred, rinse_is_not_enough, salt_refill_is_needed |
| Humidifier | Notification | time_to_change_filter, lack_of_water |
| Kimchi Refrigerator | Notification | door_is_open |
| Microwave Oven | Notification | none |
| Oven | Notification | preheating_is_complete, cooking_is_complete, time_to_clean, error_has_occurred |
| Refrigerator | Notification | time_to_change_filter, time_to_change_water_filter, frozen_is_complete, door_is_open |
| Robot Cleaner | Error<br>Notification | - |
| Stick Cleaner | Notification | charging_is_complete, time_to_clean_filter |
| Washer<br>Dryer<br>Washcombo Main<br>Washcombo Mini<br>Washtower<br>Washtower Dryer<br>Washtower Washer | Error<br>Notification | washing_is_complete, error_during_washing, drying_is_complete, drying_failed |
| Styler | Error<br>Notification | styling_is_complete, error_has_occurred |
| Wine Cellar | Notification | door_is_open |

### Fan

用于控制设备风力强度的属性会表示为 fan 平台。

| Device | Property |
| ------ | -------- |
| Ceiling Fan | Power<br>Speed |

### Humidifier

用于控制设备目标湿度的属性会表示为 humidifier 平台。

| Device | Property |
| ------ | -------- |
| Dehumidifier | Power<br>Mode<br>Target humidity |
| Humidifier | Power<br>Mode<br>Target humidity |

### Number

可读写且具有数值的属性会表示为 number 平台。

| Device | Property |
| ------ | -------- |
| Air Conditioner | Schedule turn-off<br>Schedule turn-on<br>Sleep timer |
| Air Purifier Fan | Sleep timer<br>Wind temperature |
| Hood | Fan<br>Light |
| Humidifier | Sleep timer<br>Target humidity |
| Microwave Oven | Fan<br>Light |
| Oven | Temperature |
| Refrigerator | Temperature |
| Dryer<br>Styler<br>Washer<br>Washcombo Main<br>Washcombo Mini<br>Washtower<br>Washtower Dryer<br>Washtower Washer | Delayed start/end |
| Water Heater | Temperature |
| Wine Cellar | Light<br>Temperature |
| Ventilator | Sleep timer |

### Select

可写且具有可选值列表的属性会表示为 select 平台。

| Device |Property |
| ------ |-------- |
| Air Conditioner | Air purify<br>Air quality sensor |
| Air Purifier| Operating mode<br>Speed |
| Air Purifier Fan | Display brightness<br>Operating mode<br>Rotation<br>Speed |
| Dehumidifier | Speed<br>Operation |
| Dish Washer | Operation |
| Humidifier | Display brightness<br>Drying mode<br>Operating mode<br>Speed |
| Oven | Cook mode<br>Operation |
| Refrigerator | Fresh air filter |
| Dryer<br>Styler<br>Washer<br>Washcombo Main<br>Washcombo Mini<br>Washtower<br>Washtower Dryer<br>Washtower Washer | Operation |
| Water Heater | Operating mode |
| Wine Cellar | Light<br>Operating mode |
| Ventilator | Speed<br>Operating mode |

### Switch

可读写且只有两个可切换状态的属性会表示为 switch 平台。

| Device | Property |
| ------ | -------- |
| Air Conditioner | Power<br>Lighting<br>Energy saving<br>Air clean |
| Air Purifier | Power |
| Air Purifier Fan | Heating<br>Power<br>UVnano |
| Dehumidifier | Power |
| Dish Washer | Power |
| Dryer<br>Styler<br>Washer<br>Washcombo Main<br>Washcombo Mini<br>Washtower<br>Washtower Dryer<br>Washtower Washer | Power |
| Humidifier | Auto mode<br>Heating<br>Mood light<br>Power<br>Sleep mode |
| Refrigerator | Express mode<br>Express cool<br>Quick freeze |
| System Boiler | Power<br>Hot water |
| Wine Cellar | Ventilation |
| Ventilator | Power |

### Vacuum

用于控制设备清扫操作的属性会表示为 vacuum 平台。

| Device | Property |
| ------ | -------- |
| Robot Cleaner | Battery<br>Current status<br>Operation |

### Water heater

用于控制运行模式和温度的属性会表示为 water_heater 平台。

| Device | Property |
| ------ | -------- |
| Water heater | Mode<br>Current temperature<br>Temperature |

### Sensor

只读且具有状态值的属性会表示为 sensor 平台。

| Device | Property |
| ------ | -------- |
| Air Conditioner | Filter remaining<br>Humidity<br>Odor<br>Overall air quality<br>PM1<br>PM10<br>PM2.5<br>Schedule turn-off<br>Schedule turn-on<br>Sleep timer |
| Air Purifier| Humidity<br>Odor<br>Operating mode<br>Overall air quality<br>Personal mode<br>PM1<br>PM10<br>PM2.5<br>Filter remaining<br>Schedule turn-off<br>Schedule turn-on |
| Air Purifier Fan | Humidity<br>Odor<br>Overall air quality<br>PM1<br>PM10<br>PM2.5<br>Sleep timer<br>Temperature<br>Schedule turn-off<br>Schedule turn-on |
| Cooktop | Current status<br>Power level<br>Remaining time |
| Dehumidifier | Humidity<br>Operating mode |
| Dish Washer | Current cycle<br>Current status<br>Rinse aid dispenser level<br>Softening level<br>Delayed start<br>Remaining time<br>Total time |
| Home Brew| Brewing duration<br>Brewing period<br>Current status<br>First flavor<br>Second flavor<br>Homebrew recipe<br>First hop<br>Second hop<br>Recipe progress<br>Wort<br>Yeast |
| Humidifier | Humidity<br>Overall air quality<br>PM1<br>PM10<br>PM2.5<br>Schedule turn-off<br>Schedule turn-on<br>Sleep timer<br>Temperature |
| Kimchi Refrigerator | Fresh air filter<br>Temperature |
| Microwave Oven | Current status |
| Oven | Current status<br>Temperature |
| Plant Cultivator | Current status<br>Day growth temperature<br>Lighting duration<br>Lighting intensity<br>Lights on time<br>Mode<br>Night growth temperature<br>Temperature<br>Wind speed |
| Refrigerator | Fresh air filter<br>Water filter used |
| Robot Cleaner | Current status<br>Operating mode<br>Running time |
| Stick Cleaner | Battery<br>Current status<br>Operating mode |
| System Boiler | Indoor temperature<br>Inlet temperature<br>Outlet temperature |
| Water Purifier | High-temp sterilization<br>Type<br>UVnano|
| Dryer<br>Styler<br>Washer<br>Washcombo Main<br>Washcombo Mini<br>Washtower<br>Washtower Dryer<br>Washtower Washer | Current status<br>Delayed start/end<br>Remaining time<br>Total time<br>Cycles |
| Ventilator | Carbon dioxide<br>PM1<br>PM10<br>PM2.5<br>Sleep timer<br>Temperature<br>Schedule turn-off<br>Schedule turn-on |

## 自动化示例

### 通知、错误事件

> - 指南：[Automating on event](https://www.home-assistant.io/integrations/event/#automating-on-a-button-press)
> - 重点：请查看指南中的第 3、4 步
> - 您可以在第 4 步中选择想要作为触发器的状态变化


```yaml
alias: 缺水示例
description: 当空气净化器出现 lack_of_water 时切换开关
triggers:
  - trigger: state
    entity_id:
      - event.purifier_notification
actions:
  - condition: state
    entity_id: event.purifier_notification
    attribute: event_type
    state: lack_of_water
  - type: toggle
    device_id: xxxxxxxx
    entity_id: xxxxxxxx
    domain: switch
```


## 故障排除

### 设置

#### Aborted: The token is not valid

当 Personal Access Token (PAT) 无效或输入错误时，就会出现此错误。请访问 [Personal Access Token 页面](https://connect-pat.lgthinq.com) 检查令牌是否有效。

#### Aborted: The country is not supported

请在 **Choose the region / Country** 部分检查您的 PAT 对应的有效国家。

#### Error: The number of API calls has been exceeded

当使用该 PAT 发起的 API 调用次数异常过多时，就会出现此错误。
等待一段时间后，LG ThinQ 集成通常会恢复正常工作。

## 调试 / 问题报告

启用日志配置后，LG ThinQ 集成会显示更多附加信息。

1. [启用调试日志](/home-assistant/docs/configuration/troubleshooting/#enabling-debug-logging)。
   - 如果您将 **Enable** 切换为 **Disable**，日志会保存到下载文件夹。
2. 在报告问题时：
   - 提供设备配置的截图（包括设备名称、类型和实体）
   - 附上调试日志
   - 描述预期行为以及当前无法正常工作的部分
