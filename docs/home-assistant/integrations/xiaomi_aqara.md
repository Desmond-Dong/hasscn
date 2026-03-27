---
title: Xiaomi Gateway (Aqara)
description: '小米网关（Xiaomi Gateway (Aqara)） 集成可让你将 Xiaomi(https://www.mi.com/en/) Aqara 兼容设备集成到 Home Assistant 中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Hub
ha_release: 0.57
ha_iot_class: Local Push
ha_codeowners:
  - '@danielhiversen'
  - '@syssi'
ha_domain: xiaomi_aqara
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - cover
  - light
  - lock
  - sensor
  - switch
ha_integration_type: hub
---
# Xiaomi Gateway (Aqara)

**小米网关（Xiaomi Gateway (Aqara)）** 集成可让你将 [Xiaomi](https://www.mi.com/en/) Aqara 兼容设备集成到 Home Assistant 中。

:::note
该网关有两个版本：v1 和 v2。

- v1 可直接与 Home Assistant 配合使用，没有明显问题。
- v2 在启用本地 API 时可能没有那么直接，甚至可能需要拆开设备。小米曾表示正在推进这项支持。如果你使用的是 Hub 2 并遇到问题，请查看[故障排除](#troubleshooting)部分。

:::
## 支持的设备

- Aqara Air Conditioning Companion (lumi.acpartner.v3)
- Aqara Intelligent Door Lock (lock.aq1)
- Aqara Wall Switch (Double)
- Aqara Wall Switch (Single)
- Aqara Wall Switch LN (Double)
- Aqara Wall Switch LN (Single)
- Aqara Wireless Switch (Double)
- Aqara Wireless Switch (Single)
- Battery
- Button 1st generation (Single, Double, Long Click)
- Button 2nd generation (Single, Double)
- Cube
- Door and Window Sensor (1st and 2nd generation)
- Gas Leak Detector (reports alarm and density)
- Gateway (Light, Illumination Sensor, Ringtone play)
- Intelligent Curtain
- Motion Sensor (1st and 2nd generation)
- Plug aka Socket (Zigbee version, reports power consumed, power load, state and if the device is in use)
- Smoke Detector (reports alarm and density)
- Temperature and Humidity Sensor (1st and 2nd generation)
- Vibration Sensor
- Wall Plug (reports power consumed, power load, and state)
- Water Leak Sensor
- Xiaomi Mijia Gateway (lumi.gateway.v2, lumi.gateway.v3)

## 不支持的设备

- Xiaomi Aqara Gateway (lumi.gateway.aqhm01)，因为无法在米家 App 中启用开发者模式。
- Gateway Radio
- Gateway Button
- Xiaomi Mi Air Conditioning Companion (lumi.acpartner.v2)
- Aqara Intelligent Air Conditioner Controller Hub (lumi.acpartner.v1)
- Aqara 墙壁开关（单键和双键）的解耦模式
- 燃气和烟雾探测器的额外报警事件：模拟报警、电池故障报警（仅烟雾探测器）、灵敏度故障报警、I2C 通信故障

## 设置

请使用手机和米家应用完成设置流程。完成后，你可以按照[本教程](https://www.domoticz.com/wiki/Xiaomi_Gateway_(Aqara)#Adding_the_Xiaomi_Gateway_to_Domoticz)从应用中获取密钥（密码）。

要在你的安装环境中启用 **Xiaomi Gateway (Aqara)**，请前往 **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)**。Xiaomi Aqara 网关通常会被自动发现，并显示在概览中。选择**配置**，并按步骤填写可选设置。如果 Aqara 网关没有自动出现，请选择右下角的 + 图标，然后选择 [**Xiaomi Gateway (Aqara)**](https://my.home-assistant.io/redirect/config_flow_start/?domain=xiaomi_aqara) 进入设置流程。若要配置多个网关，只需重复设置流程即可。

```yaml
interface:
  description: 要使用的网络接口。
  required: false
  type: string
  default: any
key:
  description: 网关的密钥。*如果只使用传感器和/或二进制传感器，则为可选。*
  required: false
  type: string
name:
  description: 网关名称
  required: false
  type: string
```

## 实体

Xiaomi Gateway (Aqara) 集成支持以下实体。

### 盖板

cover 实体可让你控制已连接的 Aqara 窗帘设备。你可以执行以下操作：

- 打开窗帘
- 关闭窗帘
- 停止窗帘移动
- 将窗帘移动到指定位置
- 查看窗帘当前位置

### 灯光

light 实体可让你控制 Xiaomi 网关的内部灯光。该实体名称为 `light.gateway_light_28ffffffffff`。你可以执行以下操作：

- 打开和关闭灯光
- 设置亮度
- 使用 HS 或 RGB 颜色编码设置颜色

前提是你已经完成 [Xiaomi Gateway (Aqara)](/home-assistant/integrations/xiaomi_aqara/) 的设置。

### 门锁

Aqara 门锁无法通过 Home Assistant 直接控制。不过，lock 实体可让你查看以下数据：

- `changed_by` 属性提供上一次成功解锁的用户/钥匙 ID。

- 如果有人尝试解锁设备但连续失败超过 3 次，`verified_wrong_times` 属性会递增。成功解锁后，该计数器会重置。

### 二进制传感器

binary sensor 实体可让你读取 [Xiaomi](https://www.mi.com/en/) 二进制传感器的数据。

#### 支持的二进制传感器类型

以下是受支持的二进制传感器列表，并包含这些属性（如适用）：名称、型号、Zigbee 实体、状态、事件、事件键以及事件值。

- **Motion Sensor (1st gen)**
  - Model no.: RTCGQ01LM
  - Zigbee entity: motion
  - States: on, off
  - Event: `xiaomi_aqara.motion`

- **Motion Sensor (2nd gen)**
  - Model no.: RTCGQ11LM
  - Zigbee entity: sensor_motion.aq2
  - States: on, off
  - Event: `xiaomi_aqara.motion`

- **Xiaomi Door and Window Sensor (1st gen)**
  - Model no.: MCCGQ01LM
  - Zigbee entity: magnet
  - States: on, off

- **Aqara Door and Window Sensor (2nd gen)**
  - Model no.: MCCGQ11LM
  - Zigbee entity: sensor_magnet.aq2
  - States: on, off

- **Smoke Detector**
  - Model no.: JTYJ-GD-01LM/BW
  - Zigbee entity: smoke
  - States: on, off

- **Gas Leak Detector**
  - Model no.: JTQJ-BF-01LM/BW
  - Zigbee entity: natgas
  - States: on, off

- **Water Leak Sensor**
  - Model no.: SJCGQ11LM
  - Zigbee entity: sensor_wleak.aq1
  - States: on, off

- **Button (1st gen)**
  - Model no.: WXKG01LM
  - Zigbee entity: switch
  - States: on (through long_click_press), off
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `long_click_press`, `hold`, `single`, `double`

- **Button (2nd gen)**
  - Model no.: WXKG11LM
  - Zigbee entity: sensor_switch.aq2, remote.b1acn01
  - States: on (through long_click_press), off
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`, `double`, `long_click_press`, `hold`

- **Button (2nd gen, model b)**
  - Model no.: WXKG12LM
  - Zigbee entity: sensor_switch.aq3
  - States: off (always)
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`, `double`, `long_click_press`, `shake`

- **Aqara Wireless Switch (Single)**
  - Model no.: WXKG03LM
  - Zigbee entity: 86sw1
  - States: off (always)
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`

- **Aqara Wireless Switch (Double)**
  - Model no.: WXKG02LM
  - Zigbee entity: 86sw2
  - States: off (always)
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`, `both`

- **Aqara Wireless Switch (Single) (2nd gen)**
  - Model no.: WXKG03LM
  - Zigbee entity: remote.b186acn01
  - States: off (always)
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`, `double`, `long`

- **Aqara Wireless Switch (Double) (2nd gen)**
  - Model no.: WXKG02LM
  - Zigbee entity: remote.b286acn01
  - States: off (always)
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`, `double`, `long`, `both`, `double_both`, `long_both`

- **Cube**
  - Model no.: MFKZQ01LM
  - Zigbee entity: cube
  - States: off (always)
  - Event: `xiaomi_aqara.cube_action`
  - Event key: `action_type`, `action_value` (rotate)
  - Event values: `flip90`, `flip180`, `move`, `tap_twice`, `shake_air`, `swing`, `alert`, `free_fall`, `rotate` (degrees at action_value)

- **Vibration Sensor**
  - Model no.: DJT11LM
  - Zigbee entity: vibration
  - States: off (always)
  - Event: `xiaomi_aqara.movement`
  - Event key: `movement_type`
  - Event values: `vibrate`, `tilt`, `free_fall`

#### 二进制传感器自动化示例

##### 运动

```yaml
- alias: "If there is motion and it's dark turn on the gateway light"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion_sensor_158d000xxxxxc2
      from: "off"
      to: "on"
  conditions:
    - condition: numeric_state
      entity_id: sensor.illumination_34ce00xxxx11
      below: 300
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_34ce00xxxx11
      data:
        brightness: 5
    - action: automation.turn_on
      target:
        entity_id: automation.MOTION_OFF
- alias: "If there no motion for 5 minutes turn off the gateway light"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion_sensor_158d000xxxxxc2
      from: "on"
      to: "off"
      for:
        minutes: 5
  actions:
    - action: light.turn_off
      target:
        entity_id: light.gateway_light_34ce00xxxx11
    - action: automation.turn_off
      target:
        entity_id: automation.Motion_off
```

##### 门和/或窗二进制传感器

```yaml
- alias: "If the window is open turn off the radiator"
  triggers:
    - trigger: state
      entity_id: binary_sensor.door_window_sensor_158d000xxxxxc2
      from: "off"
      to: "on"
  actions:
    - action: climate.set_operation_mode
      target:
        entity_id: climate.livingroom
      data:
        operation_mode: "Off"
- alias: "If the window is closed for 5 minutes turn on the radiator again"
  triggers:
    - trigger: state
      entity_id: binary_sensor.door_window_sensor_158d000xxxxxc2
      from: "on"
      to: "off"
      for:
        minutes: 5
  actions:
    - action: climate.set_operation_mode
      target:
        entity_id: climate.livingroom
      data:
        operation_mode: "Smart schedule"
- alias: "Notify if door is opened when away"
  triggers:
    - trigger: state
      entity_id: binary_sensor.door_window_sensor_15xxxxxxc9xx6b
      from: "off"
      to: "on"
  conditions:
    - condition: state
      entity_id: group.family
      state: "not_home"
  actions:
    - action: notify.notify_person
      data:
        message: "The door has been opened"
```

#### 烟雾

```yaml
- alias: "Send notification on fire alarm"
  triggers:
    - trigger: state
      entity_id: binary_sensor.smoke_sensor_158d0001574899
      from: "off"
      to: "on"
  actions:
    - action: notify.html5
      data:
        title: "Fire alarm!"
        message: "Fire/Smoke detected!"
    - action: xiaomi_aqara.play_ringtone
      data:
        gw_mac: xxxxxxxxxxxx
        ringtone_id: 2
        ringtone_vol: 100
```

#### 燃气


```yaml
- alias: "Send notification on gas alarm"
  triggers:
    - trigger: state
      entity_id: binary_sensor.natgas_sensor_158dxxxxxxxxxx
      from: "off"
      to: "on"
  actions:
    - action: notify.html5
      data:
        title: "Gas alarm!"
        message: "Gas with a density of {{ state_attr('binary_sensor.natgas_sensor_158dxxxxxxxxxx', 'density') }} detected."
```


#### Xiaomi 无线按钮

Xiaomi 无线按钮有 3 个版本：

- 圆形按钮支持的事件有 `single`、`double`、`hold`、`long_click_press` 和 `long_click_release`。
- Aqara 品牌按钮为方形。型号 WXKG11LM 仅支持 `single`、`double`、`long_click_press` 和 `hold` 事件。WXKG12LM 支持 `single`、`double`、`long_click_press` 和 `shake` 事件。

对于 Aqara 版本，触发双击所需的两次点击间隔必须比圆形按钮更长。点击过快会触发单击事件。

```yaml
- alias: "Toggle dining light on single press"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: single
  actions:
    - action: switch.toggle
      target:
        entity_id: switch.wall_switch_left_158d000xxxxx01
- alias: "Toggle couch light on double click"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: double
  actions:
    - action: switch.toggle
      target:
        entity_id: switch.wall_switch_right_158d000xxxxx01
- alias: "Let a dog bark on long press"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: long_click_press
  actions:
    - action: xiaomi_aqara.play_ringtone
      data:
        gw_mac: xxxxxxxxxxxx
        ringtone_id: 8
        ringtone_vol: 8
```

##### Xiaomi Cube

支持的事件有 `flip90`、`flip180`、`move`、`tap_twice`、`shake_air`、`swing`、`alert`、`free_fall` 和 `rotate`。此集成会将最后一次动作保存为 `last_action` 属性。

```yaml
- alias: "Cube event flip90"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.cube_action
      event_data:
        entity_id: binary_sensor.cube_15xxxxxxxxxxxx
        action_type: flip90
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "springgreen"
- alias: "Cube event flip180"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.cube_action
      event_data:
        entity_id: binary_sensor.cube_15xxxxxxxxxxxx
        action_type: flip180
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "darkviolet"
- alias: "Cube event move"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.cube_action
      event_data:
        entity_id: binary_sensor.cube_15xxxxxxxxxxxx
        action_type: move
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "gold"
- alias: "Cube event tap_twice"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.cube_action
      event_data:
        entity_id: binary_sensor.cube_15xxxxxxxxxxxx
        action_type: tap_twice
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "deepskyblue"
- alias: "Cube event shake_air"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.cube_action
      event_data:
        entity_id: binary_sensor.cube_15xxxxxxxxxxxx
        action_type: shake_air
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "blue"
```

##### Aqara 无线开关

Aqara 无线开关有单键版和双键版。每个按键的行为都类似于 Wireless Button，但仅支持 `single` 点击事件。双键版还会额外提供第三个设备 `binary_sensor.wall_switch_both_158xxxxxxxxx12`，当两个按键同时按下时，它会报告一个名为 `both` 的点击事件。


```yaml
- alias: "Decrease brightness of the gateway light"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.wall_switch_left_158xxxxxxxxx12
        click_type: single
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_34xxxxxxxx13
      data:
        brightness: >-
          {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') %}
            {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') - 60 >= 10 %}
              {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') - 60}}
            {% else %}
              {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness')}}
            {% endif %}
          {% else %}
            10
          {% endif %}

- alias: "Increase brightness of the gateway light"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.wall_switch_right_158xxxxxxxxx12
        click_type: single
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_34xxxxxxxx13
      data:
        brightness: >-
          {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') %}
            {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') + 60 <= 255 %}
              {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') + 60}}
            {% else %}
              {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness')}}
            {% endif %}
          {% else %}
            10
          {% endif %}

- alias: "Turn off the gateway light"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.wall_switch_both_158xxxxxxxxx12
        click_type: both
  actions:
    - action: light.turn_off
      target:
        entity_id: light.gateway_light_34xxxxxxxx13
```


#### 振动传感器

此自动化会在检测到振动或倾斜时切换客厅灯的状态。

```yaml
- alias: "Turn on Living Room Lamp on vibration"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.movement
      event_data:
        entity_id: binary_sensor.vibration_xxxx000000
        movement_type: vibrate
  actions:
    - action: light.toggle
      target:
        entity_id: light.living_room_lamp
- alias: "Turn on Living Room Lamp on tilt"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.movement
      event_data:
        entity_id: binary_sensor.vibration_xxxx000000
        movement_type: tilt
  actions:
    - action: light.toggle
      target:
        entity_id: light.living_room_lamp
```

### 传感器

sensor 实体可让你读取 [Xiaomi](https://www.mi.com/en/) 传感器的数据。

支持以下传感器类型：

- 电池电量（百分比）
- 床铺活动 / 振动（微米）
- 坐标
- 湿度（百分比）
- 光照度（lux）
- 耗电量（kWh）
- 功率负载（W）
- 气压（hPa）
- 温度（取决于 UI 设置，摄氏或华氏）
- 倾斜角度

## 开关

switch 实体可让你读取 [Xiaomi aqara](https://www.mi.com/en/) 开关的数据，并切换其状态。

## 动作

该网关提供以下动作：

### 动作：播放铃声

`xiaomi_aqara.play_ringtone` 动作用于播放指定铃声。网关固件版本至少需要为 `1.4.1_145`。请参见下面的示例。

| Data attribute | Optional | Description                             |
| -------------- | -------- | --------------------------------------- |
| `gw_mac`       | no       | Xiaomi Aqara Gateway 的 MAC 地址 |
| `ringtone_id`  | no       | 允许的铃声 ID 之一 |
| `ringtone_vol` | yes      | 音量百分比 |

`ringtone_id` 的允许值包括：

- 警报声
  - 0 - Police car 1
  - 1 - Police car 2
  - 2 - Accident
  - 3 - Countdown
  - 4 - Ghost
  - 5 - Sniper rifle
  - 6 - Battle
  - 7 - Air raid
  - 8 - Bark
- 门铃声
  - 10 - Doorbell
  - 11 - Knock at a door
  - 12 - Amuse
  - 13 - Alarm clock
- 闹钟铃声
  - 20 - MiMix
  - 21 - Enthusiastic
  - 22 - GuitarClassic
  - 23 - IceWorldPiano
  - 24 - LeisureTime
  - 25 - ChildHood
  - 26 - MorningStreamLiet
  - 27 - MusicBox
  - 28 - Orange
  - 29 - Thinker
- 自定义铃声（通过米家应用上传），从 10001 开始

### 动作：停止铃声

`xiaomi_aqara.stop_ringtone` 动作会立即停止当前播放的铃声。

| Data attribute | Optional | Description                             |
| -------------- | -------- | --------------------------------------- |
| `gw_mac`       | no       | Xiaomi Aqara Gateway 的 MAC 地址 |

### 动作：添加设备

`xiaomi_aqara.add_device` 动作会为 Xiaomi Aqara Gateway 开启 30 秒的入网许可。之后按一次配对按钮即可添加新设备。

| Data attribute | Optional | Description                             |
| -------------- | -------- | --------------------------------------- |
| `gw_mac`       | no       | Xiaomi Aqara Gateway 的 MAC 地址 |

### 动作：移除设备

`xiaomi_aqara.remove_device` 动作用于移除指定设备。如果某个设备需要与另一个网关配对，则必须先执行移除。

| Data attribute | Optional | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `gw_mac`       | no       | Xiaomi Aqara Gateway 的 MAC 地址 |
| `device_id`    | no       | 要移除设备的硬件地址 |

## 示例

### 第一代智能按钮长按

此示例会在按住按钮时播放狗叫声，并在单击按钮时停止播放。仅适用于第一代圆形按钮。

*注意：声音播放结束后会自动停止。*

```yaml
- alias: "Let a dog bark on long press"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: long_click_press
  actions:
    - action: xiaomi_aqara.play_ringtone
      data:
        gw_mac: xxxxxxxxxxxx
        ringtone_id: 8
        ringtone_vol: 8

- alias: "Stop barking immediately on single click"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: single
  actions:
    - action: xiaomi_aqara.stop_ringtone
      data:
        gw_mac: xxxxxxxxxxxx
```

### 智能按钮双击

此示例会在双击按钮时切换客厅灯的状态。

```yaml
- alias: "Double Click to toggle living room lamp"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: double
  actions:
    - action: light.toggle
      target:
        entity_id: light.living_room_lamp
```

## 故障排除

### 初始设置问题

如果你在使用应用初始化网关时遇到问题，请尝试更换另一部手机。例如，它在 OnePlus 3 上可能无法工作，但在 Nexus 5 上可以。

### 连接问题

```bash
2017-08-20 16:51:19 ERROR (SyncWorker_0) [homeassistant.components.xiaomi] No gateway discovered
2017-08-20 16:51:20 ERROR (MainThread) [homeassistant.setup] Setup failed for xiaomi: Component failed to initialize.
```

这意味着 Home Assistant 没有从你的 Xiaomi 网关收到任何响应。问题可能出在本地网络或防火墙。

- 确保你已[启用局域网访问](https://www.domoticz.com/wiki/Xiaomi_Gateway_(Aqara)#Adding_the_Xiaomi_Gateway_to_Domoticz)。
- 关闭运行 Home Assistant 的系统上的防火墙。
- 确保你的路由器支持组播，因为这是 Xiaomi Gateway 的要求。
- 尝试先禁用再重新启用局域网访问。
- 对网关执行硬重置：按住网关按钮 30 秒，然后从头重新开始设置。
- 如果你在 [Docker](/home-assistant/docs/installation/docker/) 中运行 Home Assistant，请确保使用 `--net=host`。
- 如果你在尝试控制网关灯时，在日志中收到 `{"error":"Invalid key"}`
  - 你应使用 Android 手机重新生成密钥，或者使用 [bluestacks](https://www.bluestacks.com) 之类的模拟器。某些情况下，使用 iOS 应用生成的密钥会有问题。
  - 你还需要确保网络支持组播。如果你在虚拟机中运行 Home Assistant（例如 Proxmox），可尝试在宿主机上执行 `echo 0 >/sys/class/net/vmbr0/bridge/multicast_snooping`，然后重启服务或重启宿主机。

如果你的网关 MAC 地址以 `04:CF:8C` 或 `7C:49:EB` 开头，那么很可能网关上的必要端口 `9898` 是关闭的，因此这种方法无法使用。网上有一些替代方案，但通常需要焊接并接触电路操作。
