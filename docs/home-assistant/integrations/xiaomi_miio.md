---
title: Xiaomi Home
description: 关于如何在 Home Assistant 中使用小米集成来集成小米设备的说明。
ha_category:
  - Alarm
  - Fan
  - Health
  - Hub
  - Light
  - Presence detection
  - Remote
  - Vacuum
ha_iot_class: Local Polling
ha_release: 0.51
ha_codeowners:
  - '@rytilahti'
  - '@syssi'
  - '@starkillerOG'
ha_domain: xiaomi_miio
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - air_quality
  - alarm_control_panel
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - fan
  - humidifier
  - light
  - number
  - remote
  - select
  - sensor
  - switch
  - vacuum
ha_integration_type: hub
---

**Xiaomi Home** 集成支持以下设备：

- [Xiaomi Gateway](#xiaomi-gateway)
- [Xiaomi 设备追踪器（Xiaomi Mi WiFi Repeater 2）](#xiaomi-device-tracker-xiaomi-mi-wifi-repeater-2)
- [Xiaomi 空气净化器、加湿器与落地扇](#xiaomi-air-purifier-air-humidifier-and-standing-fan)
- [Xiaomi 空气质量监测器](#xiaomi-air-quality-monitor)
- [Xiaomi 红外遥控器](#xiaomi-ir-remote)
- [Xiaomi 米家扫地机器人](#xiaomi-mi-robot-vacuum)
- [Xiaomi Philips 灯具](#xiaomi-philips-light)
- [Xiaomi 智能 WiFi 插座与智能排插](#xiaomi-smart-wifi-socket-and-smart-power-strip)

## 先决条件

大多数 Xiaomi Home 设备支持通过 Home Assistant UI 进行配置，
但 [Xiaomi device tracker](#xiaomi-device-tracker-xiaomi-mi-wifi-repeater-2)
和 [Xiaomi IR Remote](#xiaomi-ir-remote) 例外。请阅读对应章节以获取更多信息。

设备需要通过 Mi Home 应用进行设置，而不是厂商专用应用（例如 Roborock）。

:::note
对于更复杂的网络配置（如 VLAN），可参考[以下文档](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#discover-devices-across-subnets)获取更多信息。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

建议在配置时提供你的小米账号凭据，
以便自动连接你的设备。你需要指定
你在 Xiaomi Home 应用中使用的服务器区域（首次配置设备时所选）。目前有
6 个服务器：`cn`、`de`、`i2`、`ru`、`sg` 和 `us`；请参阅
[此页面](https://www.openhab.org/addons/bindings/miio/#country-servers)了解
各国家/地区应使用的服务器。

## 故障排查

最常见的问题包括：

- Xiaomi Home 设备在跨子网/VLAN 时可能无法通信，原因是 UDP 数据包源地址不属于设备所在子网，[更多信息与解决方案](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#discover-devices-across-subnets)。
- Roborock 吸尘器需要连接到 Xiaomi Home 应用，而不是 Roborock 应用，[更多信息](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#roborock-vacuum-not-detected)。
- 阻断设备网络访问已知会导致间歇性连接问题，原因是设备内部软件可能卡死并被看门狗重启，[更多信息](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#intermittent-connection-issues-timeouts-xiaomi-vacuum)。

## Xiaomi 网关

Xiaomi Home 集成允许你控制网关及其连接的子设备。

### 支持的 Xiaomi 网关型号

下表列出了网关名称、型号、Zigbee ID 以及该型号在 Home Assistant 中是否受支持。

- **中国版**
  - 型号： DGNWG02LM
  - Zigbee ID： lumi.gateway.v3
  - 支持：是

- **欧洲版**
  - 型号： ZHWG11LM-763 / DGNWQ05LM
  - Zigbee ID： lumi.gateway.mieu01
  - 支持：是（需要 Xiaomi Home 账号凭据）

- **Aqara 网关**
  - 型号： ZHWG11LM
  - Zigbee ID： lumi.gateway.aqhm01
  - 支持：是

- **米家 Zigbee 3.0**
  - 型号： ZNDMWG03LM
  - Zigbee ID： lumi.gateway.mgl03
  - 支持：是

- **Aqara 空调伴侣**
  - 型号： KTBL01LM
  - Zigbee ID： lumi.acpartner.v1
  - 支持：未测试

- **米家空调伴侣**
  - 型号： KTBL02LM
  - Zigbee ID： lumi.acpartner.v2
  - 支持：未测试

- **Aqara 空调伴侣**
  - 型号： KTBL11LM
  - Zigbee ID： lumi.acpartner.v3
  - 支持：是

部分网关（lumi.gateway.mieu01）不支持在本地获取已连接的子设备。对于这些网关，可在配置流程中填写 Xiaomi Home 账号凭据，并在选项流程中启用“使用 Xiaomi Home 服务获取已连接子设备”（完成集成后，在侧边栏点击“配置”，再点击“集成”，然后在已配置的 Xiaomi Home 集成上点击“选项”）。之后已连接子设备将从 Xiaomi Home（互联网）获取，而这些子设备的控制和状态更新仍通过本地网络连接进行。当尚未提供账号凭据且该网关型号需要凭据时，系统可能触发重新认证流程。

### 网关功能

- 网关警报控制（开/关；状态包括 `armed_away`、`disarmed`、`arming`）
- 网关灯光控制（开/关；调整亮度；调整颜色；查看状态）
- 网关照度传感器读数（照度值，单位 lux）

尚未实现（但可支持）的功能：

- 网关网络电台（仅中文电台）
- 网关铃声/提示音

### 支持的子设备

以下子设备已在 Home Assistant 中完整实现：

- **温湿度传感器 (WSDCGQ01LM)**
   - Zigbee ID： `lumi.sensor_ht`
   - 功能：读取 `temperature` 和 `humidity`
- **温湿度传感器 (WSDCGQ11LM)**
   - Zigbee ID： `lumi.weather.v1`
   - 功能：读取 `temperature`、`humidity` 和 `pressure`
- **单键墙壁开关 (QBKG11LM)**
   - Zigbee ID： `lumi.ctrl_ln1`
   - 功能：`load_power`、`status`、`turn_on`、`turn_off`、`toggle`
- **单键墙壁开关 (QBKG11LM)**
   - Zigbee ID： `lumi.ctrl_ln1.aq1`
   - 功能：`load_power`、`status`、`turn_on`、`turn_off`、`toggle`
- **单键墙壁开关（无零线）(QBKG04LM)**
   - Zigbee ID： `lumi.ctrl_neutral1.v1`
   - 功能：`status`、`turn_on`、`turn_off`、`toggle`
- **双键墙壁开关 (QBKG12LM)**
   - Zigbee ID： `lumi.ctrl_ln2`
   - 功能：`load_power`、`status`、`turn_on`、`turn_off`、`toggle`
- **双键墙壁开关 (QBKG12LM)**
   - Zigbee ID： `lumi.ctrl_ln2.aq1`
   - 功能：`load_power`、`status`、`turn_on`、`turn_off`、`toggle`
- **双键墙壁开关（无零线）(QBKG03LM)**
   - Zigbee ID： `lumi.ctrl_neutral2`
   - 功能：`status`、`turn_on`、`turn_off`、`toggle`
- **D1 三键墙壁开关 (QBKG26LM)**
   - Zigbee ID： `lumi.switch.n3acn3`
   - 功能：`load_power`、`status`、`turn_on`、`turn_off`、`toggle`
- **D1 三键墙壁开关（无零线）(QBKG25LM)**
   - Zigbee ID： `lumi.switch.l3acn3`
   - 功能：`load_power`、`status`、`turn_on`、`turn_off`、`toggle`
- **墙壁插座 (QBCZ11LM)**
   - Zigbee ID： `lumi.ctrl_86plug.v1`
   - 功能：`status`、`turn_on`、`turn_off`、`toggle`
- **墙壁插座 (QBCZ11LM)**
   - Zigbee ID： `lumi.ctrl_86plug.aq1`
   - 功能：`load_power`、`status`、`turn_on`、`turn_off`、`toggle`
- **智能插头 (ZNCZ02LM)**
   - Zigbee ID： `lumi.plug`
   - 功能：`load_power`、`status`、`turn_on`、`turn_off`、`toggle`
- **继电器 (LLKZMK11LM)**
   - Zigbee ID： `lumi.relay.c2acn01`
   - 功能：`load_power`、`status`、`turn_on`、`turn_off`、`toggle`
- **智能灯泡 E27 (ZNLDP12LM)**
   - Zigbee ID： `lumi.light.aqcn02`
   - 功能：开/关、亮度、色温
- **IKEA 智能灯泡 E27 白光 (LED1545G12)**
   - Zigbee ID： `ikea.light.led1545g12`
   - 功能：开/关、亮度、色温
- **IKEA 智能灯泡 E27 白光 (LED1546G12)**
   - Zigbee ID： `ikea.light.led1546g12`
   - 功能：开/关、亮度、色温
- **IKEA 智能灯泡 E12 白光 (LED1536G5)**
   - Zigbee ID： `ikea.light.led1536g5`
   - 功能：开/关、亮度、色温
- **IKEA 智能灯泡 GU10 白光 (LED1537R6)**
   - Zigbee ID： `ikea.light.led1537r6`
   - 功能：开/关、亮度、色温
- **IKEA 智能灯泡 E27 白光 (LED1623G12)**
   - Zigbee ID： `ikea.light.led1623g12`
   - 功能：开/关、亮度、色温
- **IKEA 智能灯泡 GU10 白光 (LED1650R5)**
   - Zigbee ID： `ikea.light.led1650r5`
   - 功能：开/关、亮度、色温
- **IKEA 智能灯泡 E12 白光 (LED1649C5)**
   - Zigbee ID： `ikea.light.led1649c5`
   - 功能：开/关、亮度、色温

### 已识别的子设备（尚未实现）

这些子设备已被 python-miio 识别，但仍在开发中（尚未实现）。

列表展示了设备名称、型号和 Zigbee ID。

- **按钮** (WXKG01LM): `lumi.sensor_switch`
- **按钮** (WXKG11LM 2015): `lumi.sensor_switch.aq2`
- **按钮** (WXKG12LM): `lumi.sensor_switch.aq3`
- **按钮** (WXKG11LM 2018): `lumi.remote.b1acn01`
- **魔方控制器** (MFKZQ01LM): `lumi.sensor_cube.v1`
- **魔方控制器** (MFKZQ01LM): `lumi.sensor_cube.aqgl01`
- **人体传感器** (RTCGQ01LM): `lumi.sensor_motion`
- **人体传感器** (RTCGQ11LM): `lumi.sensor_motion.aq2`
- **门磁传感器** (MCCGQ01LM): `lumi.sensor_magnet`
- **门磁传感器** (MCCGQ11LM): `lumi.sensor_magnet.aq2`
- **振动传感器** (DJT11LM): `lumi.vibration.aq1`
- **Honeywell 烟雾报警器** (JTYJ-GD-01LM/BW): `lumi.sensor_smoke`
- **Honeywell 天然气报警器** (JTQJ-BF-01LM/BW): `lumi.sensor_natgas`
- **漏水传感器** (SJCGQ11LM): `lumi.sensor_wleak.aq1`
- **单键无线开关** (WXKG03LM 2016): `lumi.sensor_86sw1.v1`
- **单键无线开关** (WXKG03LM 2018): `lumi.remote.b186acn01`
- **D1 单键无线开关** (WXKG06LM): `lumi.remote.b186acn02`
- **双键无线开关** (WXKG02LM 2016): `lumi.sensor_86sw2.v1`
- **双键无线开关** (WXKG02LM 2018): `lumi.remote.b286acn01`
- **D1 双键无线开关** (WXKG07LM): `lumi.remote.b286acn02`
- **窗帘电机** (ZNCLDJ11LM): `lumi.curtain`
- **窗帘电机** (ZNGZDJ11LM): `lumi.curtain.aq2`
- **窗帘电机 B1** (ZNCLDJ12LM): `lumi.curtain.hagl04`
- **门锁 S1** (ZNMS11LM): `lumi.lock.aq1`
- **门锁 S2** (ZNMS12LM): `lumi.lock.acn02`
- **门锁 S2 Pro** (ZNMS13LM): `lumi.lock.acn03`
- **Vima 圆柱锁** (A6121): `lumi.lock.v1`
- **温控器 S2** (KTWKQ03ES): `lumi.airrtc.tcpecn02`

## Xiaomi 设备追踪器（Xiaomi Mi WiFi Repeater 2）

设备追踪器平台会监测你的 Xiaomi Mi WiFi Repeater 2，并上报所有关联的 WiFi 客户端。

请按照[获取访问令牌](/home-assistant/integrations/xiaomi_miio/#retrieving-the-access-token)中的说明获取 API 令牌。

要将 Xiaomi Mi WiFi Repeater 设备追踪器添加到你的系统中，请在 "`configuration.yaml`" 文件中加入以下内容：

```yaml
device_tracker:
  - platform: xiaomi_miio
    host: 192.168.130.73
    token: YOUR_TOKEN
```

```yaml
host:
  description: 你的 Xiaomi 设备 IP 地址。
  required: true
  type: string
token:
  description: 你的 Xiaomi 设备 API 令牌。
  required: true
  type: string
```

## Xiaomi 空气净化器、加湿器与落地扇

空气净化器、加湿器和落地扇使用多个平台实体，以便你设置设备的控制模式和参数。

支持的设备：

列表包含设备名称、型号编号（如有）以及 model。

- **Air Purifier**: `zhimi.airpurifier.v1`
- **Air Purifier 2** (FJY4006CN): `zhimi.airpurifier.v2`
- **Air Purifier V3**: `zhimi.airpurifier.v3`
- **Air Purifier V5**: `zhimi.airpurifier.v5`
- **Air Purifier Pro**: `zhimi.airpurifier.v6`
- **Air Purifier Pro V7**: `zhimi.airpurifier.v7`
- **Air Purifier 2 (mini)**: `zhimi.airpurifier.m1`
- **Air Purifier (mini)**: `zhimi.airpurifier.m2`
- **Air Purifier MA1**: `zhimi.airpurifier.ma1`
- **Air Purifier MA2**: `zhimi.airpurifier.ma2`
- **Air Purifier 2S**: `zhimi.airpurifier.mc1`
- **Air Purifier Super**: `zhimi.airpurifier.sa1`
- **Air Purifier Super 2**: `zhimi.airpurifier.sa2`
- **Air Purifier 3 (2019) (AC-M6-SC)**: `zhimi.airpurifier.ma4`
- **Air Purifier 3H (2019)**: `zhimi.airpurifier.mb3`
- **Air Purifier Pro H**: `zhimi.airpurifier.va1`
- **Air Purifier Pro H EU**: `zhimi.airpurifier.vb2`
- **Air Purifier 3C**: `zhimi.airpurifier.mb4`
- **Air Purifier 3C**: `zhimi.airp.mb4a`
- **Air Purifier ZA1**: `zhimi.airpurifier.za1`
- **Air Purifier 4 (AC-M16-SC)**: `zhimi.airp.mb5`
- **Air Purifier 4 PRO (AC-M15-SC)**: `zhimi.airp.vb4`
- **Air Fresh A1 (MJXFJ-150-A1)**: `dmaker.airfresh.a1`
- **Air Fresh VA2**: `zhimi.airfresh.va2`
- **Air Fresh VA4**: `zhimi.airfresh.va4`
- **Air Fresh T2017 (MJXFJ-300-G1)**: `dmaker.airfresh.t2017`
- **Air Humidifier**: `zhimi.humidifier.v1`
- **Air Humidifier CA1**: `zhimi.humidifier.ca1`
- **Air Humidifier CA4**: `zhimi.humidifier.ca4`
- **Air Humidifier CB1**: `zhimi.humidifier.cb1`
- **Air Humidifier JSQ**: `deerma.humidifier.jsq`
- **Air Humidifier JSQ1**: `deerma.humidifier.jsq1`
- **Air Humidifier MJJSQ**: `deerma.humidifier.mjjsq`
- **Standing Fan 1X**: `dmaker.fan.p5`
- **Inverter Pedestal Fan**: `zhimi.fan.za1`
- **Standing Fan 2**: `zhimi.fan.za3`
- **Standing Fan 2S**: `zhimi.fan.za4`
- **Standing Fan**: `zhimi.fan.sa1`
- **DC Pedestal Fan**: `zhimi.fan.v2`
- **DC Pedestal Fan**: `zhimi.fan.v3`
- **Standing Fan 1C**: `dmaker.fan.1c`
- **Tower Fan**: `dmaker.fan.p9`
- **Standing Fan 2**: `dmaker.fan.p10`
- **Standing Fan Pro**: `dmaker.fan.p11`
- **Standing Fan 2**: `dmaker.fan.p18`
- **Standing Fan 3**: `zhimi.fan.za5`

- 电源（开/关）
- 运行模式（自动、静音、最爱、待机）
- 属性（fan 平台）
  - `model`
  - `mode`
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `turbo_mode_supported`
  - `use_time`
  - `button_pressed`
  - `sleep_mode`
- Number 实体

| Number         | 说明            |
| -------------- | ---------------------- |
| Favorite Level | 设置最爱档位 |

- Sensor 实体

- **Filter Lifetime Remaining**: 滤网剩余寿命。默认启用。
- **Filter Use**: 滤网使用时长（小时）。默认启用。
- **Humidity**: 当前测得湿度。默认启用。
- **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
- **PM2.5**: 当前测得 PM2.5。默认启用。
- **Purify Volume**: 净化空气体积（立方米）。默认禁用。
- **Temperature**: 当前测得温度。默认启用。
- **Use Time**: 设备累计使用秒数。默认禁用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |
| Learn Mode | 打开/关闭学习模式 |
| LED        | 打开/关闭 LED        |

### Air Purifier Pro (zhimi.airpurifier.v6)

- 电源（开/关）
- 运行模式 (Auto, Silent, Favorite)
- 属性（fan 平台）
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `turbo_mode_supported`
  - `auto_detect`
  - `use_time`
  - `button_pressed`
- Number 实体

| Number         | 说明            |
| -------------- | ---------------------- |
| Favorite Level | 设置最爱档位 |
| Volume         | 设置音量         |

- Sensor 实体
  - **Filter Life Remaining**: 滤网剩余寿命。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Humidity**: 当前测得湿度。默认启用。
  - **Illuminance**: 当前测得照度。默认启用。
  - **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。
  - **Purify Volume**: 净化空气体积（立方米）。默认禁用。
  - **Second Motor Speed**: 当前测得第二电机转速（rpm）。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Child Lock | 打开/关闭童锁 |
| Learn Mode | 打开/关闭学习模式 |
| LED        | 打开/关闭 LED        |

### Air Purifier Pro V7 (zhimi.airpurifier.v7)

- 电源（开/关）
- 运行模式 (Auto, Silent, Favorite)
- 属性（fan 平台）
  - `extra_features`
  - `turbo_mode_supported`
  - `button_pressed`
- Number 实体

| Number         | 说明            |
| -------------- | ---------------------- |
| Favorite Level | 设置最爱档位 |
| Volume         | 设置音量         |

- Sensor 实体
  - **Filter Lifetime Remaining**: 滤网剩余寿命。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Humidity**: 当前测得湿度。默认启用。
  - **Illuminance**: 当前测得照度。默认启用。
  - **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。
  - **Second Motor Speed**: 当前测得第二电机转速（rpm）。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Child Lock | 打开/关闭童锁 |
| Learn Mode | 打开/关闭学习模式 |
| LED        | 打开/关闭 LED        |

### Air Purifier MA2 (zhimi.airpurifier.ma2)

- 电源（开/关）
- 运行模式 (Auto, Silent, Favorite)
- 属性（fan 平台）
  - `extra_features`
  - `turbo_mode_supported`
  - `button_pressed`
  - `preset_modes`
  - `preset_mode`
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `use_time`
  - `sleep_mode`
  - `friendly_name`
  - `supported_features`

| Number         | 说明            |
| -------------- | ---------------------- |
| Favorite Level | 设置最爱档位 |

- Sensor 实体
  - **Filter Lifetime Remaining**: 滤网剩余寿命。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Humidity**: 当前测得湿度。默认启用。
  - **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Illuminance**: 设备顶部当前测得照度（0-200 lux）。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |
| Learn Mode | 打开/关闭学习模式 |
| LED        | 打开/关闭 LED        |

### Air Purifier 2S (zhimi.airpurifier.mc1)

- 电源（开/关）
- 运行模式 (Auto, Silent, Favorite)
- 属性（fan 平台）
  - `extra_features`
  - `turbo_mode_supported`
  - `button_pressed`
- Number 实体

| Number         | 说明            |
| -------------- | ---------------------- |
| Favorite Level | 设置最爱档位 |

- Sensor 实体
  - **Filter Lifetime Remaining**: 滤网剩余寿命。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Humidity**: 当前测得湿度。默认启用。
  - **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |
| Learn Mode | 打开/关闭学习模式 |
| LED        | 打开/关闭 LED        |

### Air Purifier 3/3H (2019) (zhimi.airpurifier.ma4, zhimi.airpurifier.mb3)

该型号使用较新的 MiOT 通信协议。

- 电源（开/关）
- 运行模式 (Auto, Silent, Favorite, Fan)
- 属性（fan 平台）
  - `use_time`
- Number 实体

| Number         | 说明            |
| -------------- | ---------------------- |
| Fan Level      | 设置风速档位      |
| Favorite Level | 设置最爱档位 |

- Select 实体

| Select         | 说明                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | 控制 LED 亮度（亮、暗、关） |

- Sensor 实体
  - **Filter Lifetime Remaining**: 滤网剩余寿命。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Humidity**: 当前测得湿度。默认启用。
  - **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。
  - **Purify Volume**: 净化空气体积（立方米）。默认禁用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |

### Air Purifier Pro H, Pro H EU (zhimi.airpurifier.va1, zhimi.airpurifier.vb2)

- 电源（开/关）
- 运行模式 (Auto, Silent, Favorite, Fan)
- 属性（fan 平台）
  - `use_time`
- Number 实体

| Number         | 说明            |
| -------------- | ---------------------- |
| Fan Level      | 设置风速档位      |
| Favorite Level | 设置最爱档位 |

- Select 实体

| Select         | 说明                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | 控制 LED 亮度（亮、暗、关） |

- Sensor 实体
  - **Filter Lifetime Remaining**: 滤网剩余寿命。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Humidity**: 当前测得湿度。默认启用。
  - **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。
  - **Purify Volume**: 净化空气体积（立方米）。默认禁用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |

### Air Purifier 3C (zhimi.airpurifier.mb4, zhimi.airp.mb4a)

- 电源（开/关）
- 运行模式 (Auto, Silent, Favorite)
- Number 实体

| Number               | 说明                  |
| -------------------- | ---------------------------- |
| Favorite Motor Speed | 设置最爱电机转速 |
| LED Brightness       | 设置 LED 亮度       |

- Sensor 实体
  - **Filter Lifetime Remaining**: 滤网剩余寿命。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |

### Air Purifier ZA1 (zhimi.airpurifier.za1)

- 电源（开/关）
- 运行模式 (Auto, Silent, Favorite)
- Number 实体

| Number         | 说明            |
| -------------- | ---------------------- |
| Favorite Level | 设置最爱档位 |

- Sensor 实体
  - **Filter Lifetime Remaining**: 滤网剩余寿命。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Humidity**: 当前测得湿度。默认启用。
  - **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **TVOC**: 当前总挥发性有机化合物浓度。默认启用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |

- Select 实体

| Select         | 说明                                               |
| -------------- | --------------------------------------------------------- |
| LED Brightness | 控制显示亮度（亮、暗、关） |

### Air Purifier V3 (zhimi.airpurifier.v3)

- 电源（开/关）
- 运行模式 (Auto, Silent, Favorite, Idle, Medium, High, Strong)
- 属性（fan 平台）
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `use_time`
  - `button_pressed`

- Sensor 实体
  - **Filter Lifetime Remaining**: 滤网剩余寿命。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Illuminance**: 当前测得照度。默认启用。
  - **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。
  - **Purify Volume**: 净化空气体积（立方米）。默认禁用。
  - **Second Motor Speed**: 当前测得第二电机转速（rpm）。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |
| LED        | 打开/关闭 LED        |

### Air Purifier 4/4 PRO (zhimi.airp.mb5, zhimi.airp.vb4)

这些型号使用较新的 MiOT 通信协议。

- 电源（开/关）
- 运行模式 (Auto, Silent, Favorite, Fan)
- 属性（fan 平台）
- Number 实体

| Number         | 说明            |
| -------------- | ---------------------- |
| Fan Level      | 设置风速档位      |
| Favorite Level | 设置最爱档位 |

- Select 实体

| Select         | 说明                                               |
| -------------- | --------------------------------------------------------- |
| LED Brightness | 控制显示亮度（亮、暗、关） |

- Sensor 实体
  - **Filter Lifetime Remaining**: 滤网剩余寿命（%）。默认启用。
  - **Filter Time Left**: 滤网剩余寿命（天）。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Humidity**: 当前测得湿度。默认启用。
  - **Motor Speed**: 当前测得电机转速（rpm）。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。
  - **PM10**: 当前测得 PM10（仅 4 PRO）。默认启用。
  - **Purify Volume**: 净化空气体积（立方米）。默认禁用。
  - **Temperature**: 当前测得温度。默认启用。

- Switch 实体

| Switch     | 说明                            |
| ---------- | -------------------------------------- |
| Buzzer     | 打开/关闭蜂鸣器                 |
| Child Lock | 打开/关闭童锁             |
| Ionizer    | 打开/关闭负离子发生器 |

### Air Fresh A1 (dmaker.airfresh.a1)

- 电源（开/关）
- 运行模式 (Auto, Sleep, Favorite)
- Binary sensor 实体

| Binary sensor         | 说明                            |
| --------------------- | -------------------------------------- |
| Auxiliary Heat Status | 指示加热器是否实际开启 |

- Button 实体

| Button            | 说明                                             |
| ----------------- | ------------------------------------------------------- |
| Reset Dust Filter | 重置除尘滤网寿命和使用量 |

- Sensor 实体

| Sensor                              | 说明                                 |
| ----------------------------------- | ------------------------------------------- |
| Carbon Dioxide                      | 当前二氧化碳浓度（ppm）           |
| Dust filter lifetime remaining      | 滤网剩余寿命        |
| Dust filter lifetime remaining days | 滤网剩余寿命（天） |
| PM2.5                               | 当前 PM2.5          |
| Temperature                         | 当前室外温度             |
| Control Speed                       | 当前电机转速（rpm）              |
| Favorite Speed                      | 最爱电机转速（rpm）             |

- Switch 实体

| Switch         | 说明              |
| -------------- | ------------------------ |
| Buzzer         | 打开/关闭 `buzzer`     |
| Child Lock     | 打开/关闭 `child lock` |
| Display        | 打开/关闭 `display`    |
| Auxiliary Heat | 打开/关闭 `heater`     |

### Air Fresh VA2

- 电源（开/关）
- 运行模式 (Auto, Silent, Interval, Low, Middle, Strong)
- 属性（fan 平台）
  - `use_time`
  - `extra_features`
- Sensor 实体|
  - **Carbon Dioxide**: 当前测得二氧化碳浓度（ppm）。默认启用。
  - **Filter Lifetime Remaining**: 滤网剩余寿命。默认启用。
  - **Filter Use**: 滤网使用时长（小时）。默认启用。
  - **Humidity**: 当前测得湿度。默认启用。
  - **PM2.5**: 当前测得 PM2.5。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。

- Select 实体

| Select         | 说明                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | 控制 LED 亮度（亮、暗、关） |

- Switch 实体

| Switch     | 说明              |
| ---------- | ------------------------ |
| Buzzer     | 打开/关闭 `buzzer`     |
| Child Lock | 打开/关闭 `child lock` |
| LED        | 打开/关闭 `led`        |

### Air Fresh VA4

- 电源（开/关）
- 运行模式 (Auto, Silent, Interval, Low, Middle, Strong)
- 属性（fan 平台）
  - `use_time`
  - `extra_features`
- Sensor 实体

| Sensor                    | 说明                                                   | 默认启用 |
| ------------------------- | ------------------------------------------------------------- | ------------------ |
| Carbon Dioxide            | 当前测得二氧化碳浓度（ppm）                    | True               |
| Filter Lifetime Remaining | 滤网剩余寿命                          | True               |
| Filter Use                | 滤网使用时长（小时）                                    | True               |
| Humidity                  | 当前测得湿度                                 | True               |
| PM2.5                     | 当前测得 PM2.5                   | True               |
| Temperature               | 当前测得温度                              | True               |
| Use Time                  | 设备累计使用秒数 | False              |

- Select 实体

| Select         | 说明                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | 控制 LED 亮度（亮、暗、关） |

- Switch 实体

| Switch         | 说明              |
| -------------- | ------------------------ |
| Buzzer         | 打开/关闭 `buzzer`     |
| Child Lock     | 打开/关闭 `child lock` |
| LED            | 打开/关闭 `led`        |
| Auxiliary Heat | 打开/关闭 `heater`     |

### Air Fresh T2017 (dmaker.airfresh.t2017)

- 电源（开/关）
- 运行模式 (Auto, Sleep, Favorite)
- Binary sensor 实体
  - **Auxiliary Heat Status**: 指示加热器是否实际开启

- Button 实体
  - **Reset Dust Filter**: 重置除尘滤网寿命和使用量
  - **Reset Upper Filter**: 重置上层滤网寿命和使用量

- Select 实体
  - **Auxiliary Heat Level**: 控制加热器档位（低、中、高）
  - **Display Orientation**: 控制显示方向（前、左、右）

- Sensor 实体
  - **Carbon Dioxide**: 当前二氧化碳浓度（ppm）
  - **Dust filter lifetime remaining**: 除尘滤网剩余寿命
  - **Dust filter lifetime remaining days**: 除尘滤网剩余寿命（天）
  - **Upper filter lifetime remaining**: 上层滤网剩余寿命
  - **Upper filter lifetime remaining days**: 上层滤网剩余寿命（天）
  - **PM2.5**: 当前 PM2.5
  - **Temperature**: 当前室外温度
  - **Control Speed**: 当前电机转速（rpm）
  - **Favorite Speed**: 最爱电机转速（rpm）

- Switch 实体

| Switch         | 说明              |
| -------------- | ------------------------ |
| Buzzer         | 打开/关闭 `buzzer`     |
| Child Lock     | 打开/关闭 `child lock` |
| Display        | 打开/关闭 `display`    |
| Auxiliary Heat | 打开/关闭 `heater`     |

### Air Humidifier (zhimi.humidifier.v1)

- 开、关
- 运行模式 (Silent, Medium, High, Strong)
- 目标湿度 (30, 40, 50, 60, 70, 80)
- 属性（humidifier 平台）

| Attribute         | 说明                               |
| ----------------- | ----------------------------------------- |
| `available_modes` | 可用运行模式列表 |
| `humidity`        | 当前目标湿度               |
| `max_humidity`    | 可设置的最大目标湿度      |
| `min_humidity`    | 可设置的最小目标湿度      |
| `mode`            | 当前选中的运行模式       |

- Binary sensor 实体

| Binary sensor | 说明                                          |
| ------------- | ---------------------------------------------------- |
| Water Tank    | 指示水箱是否已连接 |

- Select 实体

| Select         | 说明                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | 控制 LED 亮度（亮、暗、关） |

- Sensor 实体
  - **Humidity**: 当前测得湿度。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。
  - **Water Level**: 当前测得水位百分比。默认启用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |

### Air Humidifier CA (zhimi.humidifier.ca1)

- 开、关
- 运行模式 (Silent, Medium, High, Auto)
- 目标湿度 (30, 40, 50, 60, 70, 80)
- 属性（humidifier 平台）

| Attribute         | 说明                               |
| ----------------- | ----------------------------------------- |
| `available_modes` | 可用运行模式列表 |
| `humidity`        | 当前目标湿度               |
| `max_humidity`    | 可设置的最大目标湿度      |
| `min_humidity`    | 可设置的最小目标湿度      |
| `mode`            | 当前选中的运行模式       |

- Binary sensor 实体

| Binary sensor | 说明                                          |
| ------------- | ---------------------------------------------------- |
| Water Tank    | 指示水箱是否已连接 |

- Select 实体

| Select         | 说明                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | 控制 LED 亮度（亮、暗、关） |

- Sensor 实体
  - **Humidity**: 当前测得湿度。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。
  - **Water Level**: 当前测得水位百分比。默认启用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |
| Dry Mode   | 打开/关闭干燥模式   |

### Air Humidifier CA (zhimi.humidifier.ca4)

- 开、关
- 运行模式 (Auto, Low, Medium, High)
- 目标湿度 (30 - 80)
- 属性（humidifier 平台）

| Attribute         | 说明                               |
| ----------------- | ----------------------------------------- |
| `available_modes` | 可用运行模式列表 |
| `humidity`        | 当前目标湿度               |
| `max_humidity`    | 可设置的最大目标湿度      |
| `min_humidity`    | 可设置的最小目标湿度      |
| `mode`            | 当前选中的运行模式       |

- Binary sensor 实体

| Binary sensor | 说明                                          |
| ------------- | ---------------------------------------------------- |
| Water Tank    | 指示水箱是否已连接 |

- Number 实体

| Number      | 说明         |
| ----------- | ------------------- |
| Motor Speed | 设置电机转速 |

- Select 实体

| Select         | 说明                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | 控制 LED 亮度（亮、暗、关） |

- Sensor 实体
  - **Actual Speed**: 当前测得电机转速（rpm）。默认启用。
  - **Humidity**: 当前测得湿度。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。
  - **Water Level**: 当前测得水位百分比。默认启用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |
| Clean Mode | 打开/关闭清洁模式 |
| Dry Mode   | 打开/关闭干燥模式   |

:::note
仅当设备开启时才能设置清洁模式和电机转速。

:::
### Air Humidifier CB (zhimi.humidifier.cb1)

- 开、关
- 运行模式 (Silent, Medium, High, Auto)
- 目标湿度 (30, 40, 50, 60, 70, 80)
- 属性（humidifier 平台）

| Attribute         | 说明                               |
| ----------------- | ----------------------------------------- |
| `available_modes` | 可用运行模式列表 |
| `humidity`        | 当前目标湿度               |
| `max_humidity`    | 可设置的最大目标湿度      |
| `min_humidity`    | 可设置的最小目标湿度      |
| `mode`            | 当前选中的运行模式       |

- Binary sensor 实体

| Binary sensor | 说明                                          |
| ------------- | ---------------------------------------------------- |
| Water Tank    | 指示水箱是否已连接 |

- Select 实体

| Select         | 说明                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | 控制 LED 亮度（亮、暗、关） |

- Sensor 实体
  - **Humidity**: 当前测得湿度。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。
  - **Water Level**: 当前测得水位百分比。默认启用。

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |
| Dry Mode   | 打开/关闭干燥模式   |

### Air Humidifier JSQ/JSQ1/MJJSQ (deerma.humidifier.jsq, deerma.humidifier.jsq1, deerma.humidifier.mjjsq)

- 开、关
- 运行模式 (low, medium, high, humidity)
- 目标湿度 (30, 40, 50, 60, 70, 80)
- 属性（humidifier 平台）

| Attribute         | 说明                               |
| ----------------- | ----------------------------------------- |
| `available_modes` | 可用运行模式列表 |
| `humidity`        | 当前目标湿度               |
| `max_humidity`    | 可设置的最大目标湿度      |
| `min_humidity`    | 可设置的最小目标湿度      |
| `mode`            | 当前选中的运行模式       |

- Binary sensor 实体

| Binary sensor    | 说明                                          |
| ---------------- | ---------------------------------------------------- |
| Water Tank       | 指示水箱是否已连接 |
| Water Tank Empty | 指示水箱是否为空     |

- Sensor 实体|
  - **Humidity**: 当前测得湿度。默认启用。
  - **Temperature**: 当前测得温度。默认启用。
  - **Use Time**: 设备累计使用秒数。默认禁用。

- Switch 实体

| Switch | 说明            |
| ------ | ---------------------- |
| Buzzer | 打开/关闭蜂鸣器 |
| LED    | 打开/关闭 LED    |

### Standing Fan 1X (dmaker.fan.p5)

- 电源（开/关）
- 运行模式 (Normal, Nature)
- 摆头（开/关）
- Number 实体

| Number              | 说明                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | 设置延时关闭倒计时（分钟） |
| Oscillation Angle   | 设置摆头角度（度）   |

- Switch 实体

| Switch     | 说明              |
| ---------- | ------------------------ |
| Buzzer     | 打开/关闭 `buzzer`     |
| Child Lock | 打开/关闭 `child lock` |
| LED        | 打开/关闭 `led`        |

### Standing Fan (zhimi.fan.za1, zhimi.fan.za3, zhimi.fan.za4, zhimi.fan.sa1)

- 电源（开/关）
- 运行模式 (Normal, Nature)
- 摆头（开/关）
- Number 实体

| Number              | 说明                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | 设置延时关闭倒计时（分钟） |
| Oscillation Angle   | 设置摆头角度（度）   |

- Select 实体

| Select         | 说明                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | 控制 LED 亮度（亮、暗、关） |

- Switch 实体

| Switch     | 说明              |
| ---------- | ------------------------ |
| Buzzer     | 打开/关闭 `buzzer`     |
| Child Lock | 打开/关闭 `child lock` |

### DC Pedestal Fan (zhimi.fan.v2, zhimi.fan.v3)

- 电源（开/关）
- 运行模式 (Normal, Nature)
- 摆头（开/关）
- Number 实体

| Number              | 说明                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | 设置延时关闭倒计时（分钟） |
| Oscillation Angle   | 设置摆头角度（度）   |

- Select 实体

| Select         | 说明                                            |
| -------------- | ------------------------------------------------------ |
| LED Brightness | 控制 LED 亮度（亮、暗、关） |

- Sensor 实体

| Sensor      | 说明                             |
| ----------- | --------------------------------------- |
| Battery     | 当前电池电量百分比 |
| Humidity    | 当前测得湿度           |
| Temperature | 当前测得温度        |

- Switch 实体

| Switch     | 说明              |
| ---------- | ------------------------ |
| Buzzer     | 打开/关闭 `buzzer`     |
| Child Lock | 打开/关闭 `child lock` |

### Standing Fan 1C (dmaker.fan.1c)

- 电源（开/关）
- 运行模式 (Normal, Nature)
- 摆头（开/关）
- Number 实体

| Number              | 说明                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | 设置延时关闭倒计时（分钟） |

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |
| LED        | 打开/关闭 LED        |

### Tower Fan/Standing Fan 2/Standing Fan Pro (dmaker.fan.p9, dmaker.fan.p10, dmaker.fan.p11, dmaker.fan.p18)

- 电源（开/关）
- 运行模式 (Normal, Nature)
- 摆头（开/关）
- Number 实体

| Number              | 说明                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | 设置延时关闭倒计时（分钟） |
| Oscillation Angle   | 设置摆头角度（度）   |

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |
| LED        | 打开/关闭 LED        |

### Standing Fan 3 (zhimi.fan.za5)

- 电源（开/关）
- 运行模式 (Normal, Nature)
- 摆头（开、关）
- Binary sensor 实体

| Binary sensor | 说明                                            |
| ------------- | ------------------------------------------------------ |
| Power Supply  | 指示电源是否已连接 |

- Number 实体

| Number              | 说明                            |
| ------------------- | -------------------------------------- |
| Delay Off Countdown | 设置延时关闭倒计时（分钟） |
| LED Brightness      | 设置 LED 亮度                 |
| Oscillation Angle   | 设置摆头角度（度）   |

- Sensor 实体

| Sensor      | 说明                      |
| ----------- | -------------------------------- |
| Humidity    | 当前测得湿度    |
| Temperature | 当前测得温度 |

- Switch 实体

| Switch     | 说明                |
| ---------- | -------------------------- |
| Buzzer     | 打开/关闭蜂鸣器     |
| Child Lock | 打开/关闭童锁 |
| Ionizer    | 打开/关闭负离子    |

### 动作

### 动作：设置湿度

`humidifier.set_humidity` 动作用于设置目标湿度。

| 数据属性 | 可选 | 说明                                           |
| ---------------------- | -------- | ----------------------------------------------------- |
| `entity_id`            | 否       | 仅对指定 Xiaomi 加湿器实体执行。      |
| `humidity`             | 否       | 目标湿度                                       |

### 动作：设置加湿器模式

`humidifier.set_mode` 动作用于设置加湿器运行模式。

| 数据属性 | 可选 | 说明                                           |
| ---------------------- | -------- | ----------------------------------------------------- |
| `entity_id`            | 否       | 仅对指定 Xiaomi 加湿器实体执行。      |
| `mode`                 | 否       | 加湿器运行模式                         |

| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | 否       | 仅对指定 Xiaomi 风扇实体执行。      |
| `percentage`           | 否       | 风速。百分比速度设置            |

### 动作：设置风扇预设模式

`fan.set_preset_mode` 动作用于设置风扇运行模式。

| 数据属性 | 可选 | 说明                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | 否       | 仅对指定 Xiaomi 风扇实体执行。      |
| `preset_mode`          | 否       | 风扇运行模式                         |

### 动作：重置滤网（仅 Air Purifier 2）

`xiaomi_miio.fan_reset_filter` 动作用于重置滤网寿命和使用量。

| 数据属性 | 可选 | 说明                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | 否       | 仅对指定 Xiaomi 风扇实体执行。      |

### 动作：设置额外功能（仅空气净化器）

`xiaomi_miio.fan_set_extra_features` 动作用于设置额外功能。

| 数据属性 | 可选 | 说明                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | 否       | 仅对指定 Xiaomi 风扇实体执行。      |
| `features`             | 否       | 整数，已知可用值为 0 和 1。             |

## Xiaomi 空气质量监测器

`xiaomi_miio` 空气质量监测器平台可监测你的 Xiaomi Mi Air Quality Monitor (PM2.5)，并上报空气质量指数及其他数值。

当前支持以下功能：

- 空气质量指数 (AQI)
- PM2.5（细颗粒物）
- 属性
  - power
  - charging
  - battery
  - time_stat
  - carbon_dioxide_equivalent
  - total_volatile_organic_compounds
  - temperature
  - humidity

## Xiaomi IR Remote

`remote` 平台允许你通过 Xiaomi IR Remote (ChuangmiIr) 发送红外命令。

### 设置

请按照[获取访问令牌](/home-assistant/integrations/xiaomi_miio/#retrieving-the-access-token)章节中的说明，获取用于 "`configuration.yaml`" 的 API 令牌。

### 配置平台

要将 Xiaomi IR Remote 添加到你的安装中，请将以下内容添加到 "`configuration.yaml`" 文件：

```yaml
remote:
  - platform: xiaomi_miio
    host: 192.168.42.42
    token: YOUR_TOKEN
```

```yaml
host:
  description: 遥控器的 IP 地址。
  required: true
  type: string
token:
  description: 遥控器的 API 令牌。
  required: true
  type: string
name:
  description: 遥控器名称。
  required: false
  type: string
slot:
  description: 用于保存学习命令的槽位。
  required: false
  type: integer
  default: 1
timeout:
  description: 学习新命令的超时时间。
  required: false
  type: integer
  default: 30
commands:
  description: 命令列表
  required: false
  type: map
  keys:
    command:
      description: 作为 [raw（学习命令）](/home-assistant/integrations/xiaomi_miio/#raw) 或 [Pronto 十六进制码](/home-assistant/integrations/xiaomi_miio/#pronto-hex-code) 的命令列表。
      required: true
      type: list
```

### 完整配置

```yaml
remote:
  - platform: xiaomi_miio
    name: "bathroom remote"
    host: 192.168.42.42
    token: YOUR_TOKEN
    slot: 1
    timeout: 30
    commands:
      activate_towel_heater:
        command:
          - raw:base64:[optional_frequency]
      read_bad_poem:
        command:
          - raw:base64:[optional_frequency]
          - pronto:pronto_hex:[optional_repeat]
```

### 作为实体按钮添加命令到仪表板

```yaml
type: entity-button
tap_action:
  action: call-service
  service: remote.send_command
  data:
    command: activate_towel_heater
    entity_id: remote.xiaomi_miio_ir
hold_action:
  action: more-info
show_icon: true
show_name: true
entity: remote.xiaomi_miio_ir
icon: "mdi:radiator"
name: Activate Towel Heater
```

### 使用命名命令创建 UI 按钮

```yaml
script:
  towel_heater:
    sequence:
      - action: remote.send_command
        target:
          entity_id: "remote.bathroom_remote"
        data:
          command:
            - "activate_towel_heater"
  please_cover_your_ears:
    sequence:
      - action: remote.send_command
        target:
          entity_id: "remote.bathroom_remote"
        data:
          command:
            - "read_bad_poem"
```

### 命令类型

Xiaomi IR Remote 平台目前支持两种 IR 码格式。

### 原始码

原始码命令是通过 [`xiaomi_miio.remote_learn_command`](/home-assistant/integrations/xiaomi_miio/#xiaomi_miioremote_learn_command) 学习得到的命令。

原始码命令格式如下例所示：

```bash
raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=
```

最后还可以附加一个可选的频率参数：

```bash
raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=:38400
```

### Pronto 十六进制码

Pronto 十六进制码是设备制造商常提供的一种十六进制编码。

Pronto 十六进制码格式如下例所示：

```bash
pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E
```

最后还可以附加一个可选的重复次数参数（某些设备必需）：

```bash
pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E:2
```

请注意，Xiaomi IR Remote (ChuangmiIr) 至少有 4 个版本，可通过默认主机名识别：

- `chuangmi.ir.v2`
- `chuangmi.remote.h102a03`
- `chuangmi.remote.v2`
- `chuangmi.remote.h102c01`

目前，Pronto 十六进制码仅在第一个版本（`chuangmi.ir.v2`）上可用。

### 动作

Xiaomi IR Remote 平台注册了 4 个动作。

### `remote.send_command`

允许通过命令标识符发送已命名命令，或按[命令类型](/home-assistant/integrations/xiaomi_miio/#command-types)中定义的两种格式之一发送命令。

### `xiaomi_miio.remote_learn_command`

用于学习新命令。

使用 Xiaomi IR Remote 的 entity_id 来启动学习流程。

可以指定 `slot` 和 `timeout`，即使同一槽位中的命令被覆盖，仍可通过 [`remote.send_command`](/home-assistant/integrations/xiaomi_miio/#remotesend_command) 发送已学习的多个命令。

学习完成后，可在概览中的通知里找到 base64 字符串；可在字符串上左键并选择复制。

### `xiaomi_miio.remote_set_led_on`

用于打开遥控器蓝色 LED。

### `xiaomi_miio.remote_set_led_off`

用于关闭遥控器蓝色 LED。

## Xiaomi 米家扫地机器人

`xiaomi_miio` 吸尘器平台允许你控制 [Xiaomi Mi Robot Vacuum](https://www.mi.com/roomrobot/) 的状态。

当前支持的动作包括：

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `clean_spot`
- `set_fan_speed`
  风速可选：`Silent`、`Standard`、`Medium`、`Turbo` 和 `Gentle`（仅拖地模式）。
- `xiaomi_clean_zone`
- `xiaomi_clean_segment`
- `xiaomi_goto`
- `remote_control_*`（你的机器人遥控动作）

### 动作

除 `vacuum` 集成提供的全部动作（`start`、`pause`、`stop`、`return_to_base`、`locate`、`set_fan_speed` 和 `send_command`）外，`xiaomi_miio` 平台还提供访问机器人遥控模式的专用动作：

- `xiaomi_miio.vacuum_clean_zone`
- `xiaomi_miio.vacuum_clean_segment`
- `xiaomi_miio.vacuum_goto`
- `xiaomi_miio.vacuum_remote_control_start`
- `xiaomi_miio.vacuum_remote_control_stop`
- `xiaomi_miio.vacuum_remote_control_move`
- `xiaomi_miio.vacuum_remote_control_move_step`

### 动作：区域清扫

`xiaomi_miio.vacuum_clean_zone` 动作用于在指定区域按指定次数开始清扫。

- **数据属性**: `entity_id`
  - **说明**: 仅对指定机器人执行。
  - **可选**: 否。

- **数据属性**: `zone`
  - **说明**: 区域列表。每个区域为包含 4 个整数值的数组，表示两组 x、y 坐标，用于定义矩形清扫区的起点和终点。例如 `[[23510,25311,25110,26361]]` 会创建一个从坐标 `(23510,25311)` 到 `(25110,26361)` 的矩形区域。
  - **可选**: 否。

- **数据属性**: `repeats`
  - **说明**: 每个区域的重复清扫次数，范围 1 到 3。
  - **可选**: 否。

`xiaomi_miio.vacuum_clean_zone` 使用示例：

内联数组：


```yaml
automation:
  - alias: "Test vacuum zone3"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_zone
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          repeats: "{{states('input_number.vacuum_passes')|int}}"
          zone: [[30914, 26007, 35514, 28807], [20232, 22496, 26032, 26496]]
```


包含内联分区的数组：


```yaml
automation:
  - alias: "Test vacuum zone3"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_zone
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          repeats: "{{states('input_number.vacuum_passes')|int}}"
          zone:
            - [30914, 26007, 35514, 28807]
            - [20232, 22496, 26032, 26496]
```


数组模式：

```yaml
automation:
  - alias: "Test vacuum zone3"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_zone
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          repeats: 1
          zone:
            - - 30914
              - 26007
              - 35514
              - 28807
            - - 20232
              - 22496
              - 26032
              - 26496
```

### 动作：分区清扫

`xiaomi_miio.vacuum_clean_segment` 动作会清扫指定分区/房间。房间通过数字 ID 标识。有关如何查找有效房间号及其对应房间，请参见 [获取房间编号](#retrieving-room-numbers)。

- **数据属性**: `entity_id`
  - **说明**: 仅对指定机器人执行。
  - **可选**: 否。
- **数据属性**: `segments`
  - **说明**: 分区编号列表，或单个分区编号。
  - **可选**: 否。

`xiaomi_miio.vacuum_clean_segment` 使用示例：

多个分区：

```yaml
automation:
  - alias: "Vacuum kitchen and living room"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_segment
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          segments: [1, 2]
```

单个分区：

```yaml
automation:
  - alias: "Vacuum kitchen"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_segment
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          segments: 1
```

小米吸尘器原厂应用支持房间重复清扫，你可以通过重复分区编号实现同样效果：

```yaml
automation:
  - alias: "Vacuum kitchen"
    triggers:
      - trigger: homeassistant
        event: start
    actions:
      - action: xiaomi_miio.vacuum_clean_segment
        target:
          entity_id: vacuum.xiaomi_vacuum
        data:
          segments: [1, 1]
```

### 动作：前往坐标

`xiaomi_miio.vacuum_goto` 动作会将吸尘器移动到指定坐标。

- **数据属性**: `entity_id`
  - **说明**: 仅对指定机器人执行。
  - **可选**: 否。
- **数据属性**: `x_coord`
  - **说明**: X 坐标，整数。充电座位于 x=25500。
  - **可选**: 否。
- **数据属性**: `y_coord`
  - **说明**: Y 坐标，整数。充电座位于 y=25500。
  - **可选**: 否。

注意：如果吸尘器正在移动且对 `xiaomi_miio.vacuum_goto` 无响应，请先调用 `vacuum.pause` 或 `vacuum.stop`。

### 动作：启动遥控

`xiaomi_miio.vacuum_remote_control_start` 动作用于启动机器人的遥控模式。之后可使用 `remote_control_move` 移动机器人；完成后调用 `remote_control_stop`。

| 数据属性 | 可选 | 说明                  |
| -------------- | -------- | ---------------------------- |
| `entity_id`    | 否       | 仅对指定机器人执行           |

### 动作：停止遥控

`xiaomi_miio.vacuum_remote_control_stop` 动作用于退出机器人的遥控模式。

| 数据属性 | 可选 | 说明                  |
| -------------- | -------- | ---------------------------- |
| `entity_id`    | 否       | 仅对指定机器人执行           |

### 动作：遥控移动

`xiaomi_miio.vacuum_remote_control_move` 动作用于遥控机器人。请先用 `remote_control_start` 进入遥控模式。

- `entity_id`：仅对指定机器人执行。必填。
- `velocity`：速度，范围 -0.29 到 0.29。必填。
- `rotation`：旋转角度，范围 -179 到 179 度。必填。
- `duration`：机器人移动时长（毫秒）。必填。

### 动作：遥控步进移动

`xiaomi_miio.vacuum_remote_control_move_step` 动作会进入遥控模式、执行一次移动、停止并退出遥控模式。

- **entity_id**：仅对指定机器人执行。必填。
- **velocity**：速度，范围 -0.29 到 0.29。必填。
- **rotation**：旋转角度，范围 -179 到 179 度。必填。
- **duration**：机器人移动时长（毫秒）。必填。

### 按钮

| 按钮               | 说明                                  |
| ------------------ | -------------------------------------------- |
| 重置主刷寿命       | 重置主刷剩余寿命                              |
| 重置边刷寿命       | 重置边刷剩余寿命                              |
| 重置滤网寿命       | 重置滤网剩余寿命                              |
| 重置传感器清洁提示 | 重置传感器脏污状态（下次需要清洁前的剩余时间） |

### 传感器

```yaml
免打扰开始时间*:
  description: 下一次 DnD（免打扰）周期开始时间戳
免打扰结束时间*:
  description: 当前或下一次 DnD（免打扰）周期结束时间戳
总时长*:
  description: 总清扫时长（秒）
累计清扫面积*:
  description: 总清扫面积（平方米）
累计清扫次数*:
  description: 累计清扫次数
累计集尘次数*:
  description: 累计集尘次数
滤网剩余寿命*:
  description: 滤网剩余可用时长（秒）
主刷剩余寿命*:
  description: 主刷剩余可用时长（秒）
传感器剩余寿命*:
  description: 传感器剩余可用时长（秒）
当前清扫时长:
  description: 当前清扫时长。如果吸尘器当前未清扫，此传感器值与 “Last Clean Duration” 相同。
当前清扫面积:
  description: 当前已清扫面积。如果吸尘器当前未清扫，此传感器值与 “Last Clean Area” 相同。
上次清扫面积*:
  description: 上一次清扫面积（平方米）
上次清扫时长\*:
  description: 上一次清扫时长（秒）
上次清扫结束时间:
  description: 上一次清扫结束时间戳
上次清扫开始时间:
  description: 上一次清扫开始时间戳
拖布已安装**:
  description: 是否安装拖布
水箱已安装**:
  description: 是否安装水箱
水量不足\*\*:
  description: 水箱是否缺水
```

:::note
\* 添加集成后需要手动启用。<br>
\*\* 仅在吸尘器支持拖布时启用。

:::
### 属性

`xiaomi` 平台的吸尘器不会暴露除 [`vacuum` 集成](/home-assistant/integrations/vacuum/#attributes) 已提供属性以外的额外属性。

### 示例：如何清扫指定房间

使用 [`vacuum.send_command`](/home-assistant/integrations/vacuum/) 清扫指定房间的脚本示例：

```yaml
vacuum_kitchen:
  alias: "Clean the kitchen"
  sequence:
    - action: vacuum.send_command
      target:
        entity_id: vacuum.xiaomi_vacuum_cleaner
      data:
        command: app_segment_clean
        params: [18]
```

其中 `params` 用于指定房间编号。清扫多个房间时，可写成 `[17,18]`。有关如何查找有效房间号及对应关系，请参见 [获取房间编号](#retrieving-room-numbers)。

### 示例：如何重置维护工时（刷子、滤网、传感器）

吸尘器实体会保存刷子、滤网与传感器需要清洁或更换的属性值（`main_brush_left`、`side_brush_left`、`filter_left` 和 `sensor_dirty_left`），单位为小时。清洁或更换对应部件后，你可以在吸尘器上重置这些值。下面示例展示了如何使用 [`vacuum.send_command`](/home-assistant/integrations/vacuum/) 重置主刷工时：

```yaml
reset_main_brush_left:
  alias: "Reset hours for main brush replacement"
  sequence:
    - action: vacuum.send_command
      target:
        entity_id: vacuum.xiaomi_vacuum_cleaner
      data:
        command: reset_consumable
        params: ["main_brush_work_time"]
```

`reset_consumable` 命令允许的 `params`：

- `['main_brush_work_time']`
- `['side_brush_work_time']`
- `['filter_work_time']`
- `['sensor_dirty_time']`

### 获取分区清扫坐标

### 使用 FloleVac（Android）

1. 下载 [FloleVac](https://play.google.com/store/apps/details?id=de.flole.xiaomi)
2. 使用你的小米账号登录
3. 打开地图（确保你与吸尘器处于同一网络）
4. 选择 “Zone cleanup” 并框选要清扫的区域
5. 长按 “Cleanup”，区域坐标会复制到剪贴板

### 使用 RoboRock Control Center（需要 Valetudo 固件）

[RRCC](https://github.com/LazyT/rrcc) 同时支持已 root 与未 root 的吸尘器，可作为 Mi Home 的本地替代方案，且基本不依赖云端。如果你安装了 root 固件 [Valetudo](https://github.com/Hypfer/Valetudo)，即可通过 SSH 登录吸尘器并启用 MQTT，同时使用地图功能而无需云端。

使用地图编辑器可获取分区清扫所需坐标。以下是分区清扫脚本示例：

```yaml
vacuum_kitchen:
  alias: "vacuum kitchen"
  sequence:
    - action: vacuum.send_command
      target:
        entity_id: "vacuum.xiaomi_vacuum_cleaner"
      data:
        command: app_zoned_clean
        params: [[23084, 26282, 27628, 29727, 1]]
```

### 获取房间编号

可使用 miio 命令行工具获取有效房间编号：

```bash
miiocli roborockvacuum --ip <ip of the vacuum> --token <your vacuum token> get_room_mapping
```

该命令会返回房间编号与用户自定义名称的完整映射（以 `(number,name)` 元组列表形式）。
你也可以直接用某个编号测试 `clean_segment` 动作，观察实际清扫的是哪个房间。

通常情况下，1..15 是吸尘器自动初始分区的编号，16 及以上为用户手动编辑后的房间编号。

## Xiaomi Philips Light

Xiaomi Home 灯光平台允许你控制以下设备状态：Xiaomi Philips LED 球泡灯、Xiaomi Philips Zhirui LED E14 蜡烛灯、Xiaomi Philips Zhirui 筒灯、Xiaomi Philips LED 吸顶灯、Xiaomi Philips 护眼灯 2、Xiaomi Philips 月光床头灯和 Philips Zhirui 台灯。

### 功能

### Philips LED 球泡灯、Philips Zhirui LED 蜡烛灯与 Philips Zhirui 筒灯

支持型号：`philips.light.bulb`、`philips.light.candle`、`philips.light.candle2`、`philips.light.downlight`

- 电源（开/关）
- 亮度
- 色温（175...333 mired）
- 场景（1、2、3、4）
- 延时关闭（精度为秒）
- 属性
  - model
  - scene
  - delayed_turn_off

### Philips LED 吸顶灯

支持型号：`philips.light.ceiling`、`philips.light.zyceiling`

- 电源（开/关）
- 亮度
- 色温（175...370 mired）
- 场景（1、2、3、4）
- 夜灯模式（开/关）
- 延时关闭（精度为秒）
- 属性
  - model
  - scene
  - delayed_turn_off
  - night_light_mode
  - automatic_color_temperature

### Philips 护眼智能台灯 2

支持型号：`philips.light.sread1`

- 护眼灯（开/关）
- 氛围灯（开/关）
- 亮度（每个灯独立）
- 场景（1、2、3、4）
- 夜灯模式（开/关）
- 延时关闭（精度为秒）
- 用眼疲劳提醒/通知（开/关）
- 护眼模式（开/关）
- 属性
  - model
  - scene
  - delayed_turn_off
  - night_light_mode
  - reminder
  - eyecare_mode

### Philips Zhirui 台灯

支持型号：`philips.light.mono1`

- 电源（开/关）
- 亮度
- 场景（1、2、3、4）
- 延时关闭（精度为秒）
- 属性
  - model
  - scene
  - delayed_turn_off

### Philips 月光床头灯

支持型号：`philips.light.moonlight`

- 电源（开/关）
- 亮度
- 颜色
- 色温（153...588 mired）
- 场景（1、2、3、4、5、6）
- 属性
  - model
  - scene
  - sleep_assistant
  - sleep_off_time
  - total_assistant_sleep_time
  - brand_sleep
  - brand

### 动作

### 动作：设置场景

`xiaomi_miio.light_set_scene` 动作用于设置 4 个固定场景中的一个。

| 数据属性 | 可选 | 说明                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | 否       | 仅对指定小米灯光实体执行。                        |
| `scene`                | 否       | 场景编号，范围为 1 到 4。                         |

### 动作：设置延时关闭

`xiaomi_miio.light_set_delayed_turn_off` 动作用于设置延时关闭。

| 数据属性 | 可选 | 说明                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | 否       | 仅对指定小米灯光实体执行。                        |
| `time_period`          | 否       | 延时关闭的时间段。                                |

### 动作：开启提醒（仅 Eyecare Smart Lamp 2）

`xiaomi_miio.light_reminder_on` 动作用于启用用眼疲劳提醒/通知。

| 数据属性 | 可选 | 说明                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | 否       | 仅对指定小米灯光实体执行。                        |

### 动作：关闭提醒（仅 Eyecare Smart Lamp 2）

`xiaomi_miio.light_reminder_off` 动作用于关闭用眼疲劳提醒/通知。

| 数据属性 | 可选 | 说明                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | 否       | 仅对指定小米灯光实体执行。                        |

### 动作：开启夜灯模式（仅 Eyecare Smart Lamp 2）

`xiaomi_miio.light_night_light_mode_on` 动作用于开启智能夜灯模式。

| 数据属性 | 可选 | 说明                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | 否       | 仅对指定小米灯光实体执行。                        |

### 动作：关闭夜灯模式（仅 Eyecare Smart Lamp 2）

`xiaomi_miio.light_night_light_mode_off` 动作用于关闭智能夜灯模式。

| 数据属性 | 可选 | 说明                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | 否       | 仅对指定小米灯光实体执行。                        |

### 动作：开启护眼模式（仅 Eyecare Smart Lamp 2）

`xiaomi_miio.light_eyecare_mode_on` 动作用于开启护眼模式。

| 数据属性 | 可选 | 说明                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | 否       | 仅对指定小米灯光实体执行。                        |

### 动作：关闭护眼模式（仅 Eyecare Smart Lamp 2）

`xiaomi_miio.light_eyecare_mode_off` 动作用于关闭护眼模式。

| 数据属性 | 可选 | 说明                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `entity_id`            | 否       | 仅对指定小米灯光实体执行。                        |

## Xiaomi 智能 WiFi 插座与智能排插

Xiaomi Home 开关平台允许你控制 Xiaomi Smart WiFi 插座（Plug）、Xiaomi Smart Power Strip 以及 Xiaomi Chuangmi Plug V1 的状态。

### 功能

### Xiaomi 智能 WiFi 插座

支持型号：`chuangmi.plug.m1`、`chuangmi.plug.m3`、`chuangmi.plug.v2`、`chuangmi.plug.hmi205`、`chuangmi.plug.hmi206`

- 电源（开/关）
- 属性
  - 温度

### Xiaomi Chuangmi 插座 V1

支持型号：`chuangmi.plug.v1`、`chuangmi.plug.v3`、`chuangmi.plug.hmi208`

- 电源（开/关）
- USB（开/关）
- 属性
  - 温度

### Xiaomi 智能排插

支持型号：`qmi.powerstrip.v1`、`zimi.powerstrip.v2`

- 电源（开/关）
- Wi-Fi LED（开/关）
- 电价（0...999）
- 供电模式（green、normal）（仅 Power Strip V1）
- 属性
  - 温度
  - 电流
  - 负载功率
  - Wi-Fi LED 状态
  - 模式（仅 Power Strip V1）

### Xiaomi 空调伴侣 V3

支持型号：`lumi.acpartner.v3`（`acpartner.v1` 和 `v2` 的插座不可切换！）

- 电源（开/关）
- 属性
  - 负载功率

### 动作

### 动作：开启 WiFi LED（仅 Power Strip）

`xiaomi_miio.switch_set_wifi_led_on` 动作用于打开 Wi-Fi LED。

| 数据属性 | 可选 | 说明                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | 否       | 仅对指定小米开关实体执行。                         |

### 动作：关闭 WiFi LED（仅 Power Strip）

`xiaomi_miio.switch_set_wifi_led_off` 动作用于关闭 Wi-Fi LED。

| 数据属性 | 可选 | 说明                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | 否       | 仅对指定小米开关实体执行。                         |

### 动作：设置电价（仅 Power Strip）

`xiaomi_miio.switch_set_power_price` 动作用于设置电价。

| 数据属性 | 可选 | 说明                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | 否       | 仅对指定小米开关实体执行。                         |
| `price`                | 否       | 电价，范围 0 到 999。                              |

### 动作：设置供电模式（仅 Power Strip V1）

`xiaomi_miio.switch_set_power_mode` 动作用于设置供电模式。

| 数据属性 | 可选 | 说明                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `entity_id`            | 否       | 仅对指定小米开关实体执行。                         |
| `mode`                 | 否       | 供电模式，可选值为 `normal` 和 `green`。           |

## 获取访问令牌

不推荐手动获取令牌。为了更轻松地设置，建议在配置流程中直接填写小米账号凭据。
但如果你是手动设置设备，也可以通过以下方式获取令牌。

### Xiaomi 云端令牌提取工具

有一位 Home Assistant 用户编写了令牌提取工具，这是目前获取小米账号下所有设备令牌最简单的方法。
[该仓库](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor)提供了 Windows 可执行文件，也提供了可在任意平台运行的 Python 脚本。如果你不想运行可执行文件，可以直接使用源代码：

1. 安装依赖：

```bash
pip3 install pycryptodome pybase64 requests
```

2. 运行脚本

```bash
python3 token_extractor.py
```

3. 输入小米账号邮箱或用户名、密码，以及账号所在国家/地区（常见如 CN - 中国大陆、DE - 德国等）
4. 脚本会输出该账号下所有设备的 IP 地址和令牌，可直接用于 Home Assistant。

### Xiaomi Home 应用（Xiaomi Aqara Gateway，Android 和 iOS）

1. 安装 Xiaomi Home 应用。
2. 登录或注册账号。
3. 在设置 -> Region 中将地区设为 Mainland China（通常是中文字符最长的一项，语言后续可改为英文）。
4. 在 Xiaomi Home 应用中选择你的网关。
5. 选择屏幕右上角的三个点。
6. 选择 About。
7. 连续点击页面底部版本号（截至 2020 年 1 月，插件版本是 2.77.1；iOS 上显示为空白区域而不是版本号）。
8. 现在应会出现两个额外选项（Android 为英文，iOS 仍可能是中文），表示已启用开发者模式。（若没有出现，请重试全部步骤。）
9. Android：在 “Hub info” 下可看到 JSON 文本，包含你需要的 `token`。
   iOS：多数选项仍是中文，你需要从上往下第 4 项。

注意：如果你有多个设备都需要令牌（如 Xiaomi Mi Robot Vacuum 和 Xiaomi IR Remote），上述方法可能无效。Xiaomi Home 应用会显示一个令牌，但可能并非正确值。可改用 “Mi Home v5.4.49” 方法获取正确令牌。

### 使用 Get Mi Home Devices Token 应用

如果你使用 Windows 或 macOS，可以使用 [Get MiHome devices token](https://github.com/Maxmudjon/Get_MiHome_devices_token/releases) 应用获取令牌。打开链接并下载对应系统版本，输入登录信息后即可提取访问令牌。

### 其他方法

:::note
如果使用 Android 设备获取访问令牌，目前仅确认 Mi Home `v5.4.49` 可用（2019 年 12 月）。使用 `v5.4.49` 在 `Smarthome/logs` 文件夹下查找保存 32 位令牌的文本文件。该目录通常会有多个文本文件，请在所有文件中搜索 `token`。请注意，最新版本 Mi Home 不会以明文存储令牌。
<br/> <br/>
iPhone 应用在 `v4.23.4`（2019 年 11 月 17 日）时仍会将令牌存储在 SQLite 数据库中。
<br/> <br/>
重置小米扫地机器人 Wi-Fi 设置后会生成新的访问令牌，因此需要重新执行这些步骤。
<br/> <br/>
这些说明适用于 Mi Home 应用，不适用于新版 RoboRock 应用。
<br/> <br/>
这个令牌（32 位十六进制字符）是 Xiaomi Mi Robot Vacuum、Mi Robot 2 (Roborock) Vacuum、Xiaomi Philips 灯具和 Xiaomi IR Remote 所必需的。


:::
### Android（未 root）

> 如果使用 Android 设备获取访问令牌，目前仅确认 Mi Home `v5.4.49` 可用（2019 年 12 月）。

1. 首先，像平常一样在你的主 Android 设备上使用最新版 Mi Home 完成 Robovac 配置。
2. 如果 Robovac 已经配置过，你需要重置其 Wi-Fi 设置以生成新令牌。
3. 使用 Mi Home `v5.4.49` 在 `Smarthome/logs` 文件夹中查找存放 32 位令牌的文本文件。
4. 该目录通常有多个文本文件，请在所有文件中搜索 `token`。请注意，最新版 Mi Home 不会以明文存储令牌。

### Linux 与已 root 的 Android

1. 首先，像平常一样在你的主 Android 设备上使用最新版 Mi Home 完成 Robovac 配置。
2. 确保设备在最新版 Mi Home 中运行正常，并在路由器或局域网环境中为吸尘器分配静态 IP。
3. 在已 root 的 Android 设备上安装 Mi Home `v5.4.54` 并登录（同一设备不能同时安装两个版本 Mi Home）。
4. 确保每次都使用相同服务器。
5. 确保在 5.4.54 下运行正常（`locate` 是一个简单测试）。
6. 接下来使用 adb 从已 root 的手机中提取令牌。
7. 使用 `adb shell` 连接设备并切换为 root（如果使用 Magisck root，可执行 `adb shell -> su -> whoami` 确认 root 权限）。
8. 然后执行 `grep -R '"token"' /data/data/com.xiaomi.smarthome` 获取令牌。

### iOS

1. 使用 Mi Home 应用配置机器人。请确保选择正确地区，因为小米会针对不同地区使用不同产品名。注意：该方法目前不支持新版 RoboRock 应用。
2. 使用 iTunes 为 iPhone 创建未加密备份。macOS 10.15 起不再提供 iTunes，请改用 Finder。连接 iOS 设备后，你应能在 Finder 左侧菜单看到它。
3. 安装 [iBackup Viewer](https://www.imactools.com/iphonebackupviewer/)，打开并加载你的备份。
4. 打开 “Raw Data” 模块。
5. 进入 `com.xiaomi.mihome`。
6. 查找类似 `123456789_mihome.sqlite` 的文件（注意：`_mihome.sqlite` _不是_ 正确文件。通常可在 `Documents` 文件夹中找到）。
7. 将该文件保存到本地文件系统。
8. 安装 [DB Browser for SQLite](https://sqlitebrowser.org/)。
9. 打开 DB Browser，加载你从备份中导出的 `.sqlite` 文件。
10. 打开 `Execute SQL` 选项卡。
11. 输入并执行以下查询（根据设备类型选择合适的 SELECT 语句，比如 Vacuum、Powerstrip 或 Plug）：

    ```sql
    -- Execute to retrieve token for Vacuum
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%vacuum%"

    -- Execute to retrieve token for Smart Powerstrip
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%powerstrip%"

    -- Execute to retrieve token for Smart Plug
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%plug%"
    ```

12. 将返回的 96 位十六进制字符串复制到剪贴板。
13. 打开 `Terminal` 并执行以下命令：

    ```bash
    echo '0: <YOUR HEXADECIMAL STRING>' | xxd -r -p | openssl enc -d -aes-128-ecb -nopad -nosalt -K 00000000000000000000000000000000
    ```

14. 将输出的 32 位字符串作为令牌使用。（在 Mac 的终端会话中查看）

### Bluestacks

1. 使用 Mi-Home 应用配置机器人。请确保选择正确地区，因为小米会针对不同地区使用不同产品名。注意：该方法目前不支持新版 RoboRock 应用。
2. 安装 [BlueStacks](https://www.bluestacks.com)。
3. 在 BlueStacks 中安装 [Mi Home 5.4.49](https://www.apkmirror.com/apk/xiaomi-inc/mihome/mihome-5-4-49-release/) 并登录，同步设备。
4. 在 `More Apps` 菜单中打开文件管理器。
5. 在左侧选择 `Explore`，进入 `sdcard/SmartHome/logs/plug_DeviceManager`。
6. 选择左下角 `Export to Windows`，将一个或多个文件导出到本地磁盘。
7. 搜索 `"token":"<yourTokenHere>"`。

### Miio 命令行工具

应在吸尘器连接到 Xiaomi Home 之前使用 Miio。如果你已在应用中完成连接，需要先删除设备，再连接吸尘器创建的临时 Wi-Fi 网络。如果吸尘器已配对，此方法通常只会返回 `???`。

发现当前网络中的设备：

```bash
npx miio discover
```

该命令会列出与电脑处于同一网络的设备。请让命令运行一段时间，以便发现全部设备，因为有些设备可能需要 1 到 2 分钟才会响应。

命令会按以下格式输出每个设备：

```text
Device ID: 48765421
Model info: zhimi.airpurifier.m1
Address: 192.168.100.9
Token: token-as-hex-here via auto-token
Support: At least basic
```

输出信息说明如下：

- `Device ID` - 设备唯一标识，重置后也不会变化。
- `Model ID` - 设备型号 ID（如果可识别），用于指示设备类型。
- `Address` - 设备在网络中的 IP 地址。
- `Token` - 设备令牌；若无法自动识别，则显示 `???`。

### Xiaomi 云端令牌提取工具

另一种可一次性获取全部设备令牌的方法。请参阅这份[说明](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor)。
