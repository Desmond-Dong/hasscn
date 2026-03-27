---
title: MQTT room presence
description: 'MQTT room presence 集成允许您使用 MQTT 客户端检测设备在室内的位置。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Presence detection
ha_release: 0.27
ha_iot_class: Local Push
ha_domain: mqtt_room
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# MQTT room presence

**MQTT room presence** 集成允许您使用 MQTT 客户端检测设备在室内的位置。

## 配置

要在您的安装中使用此传感器，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mqtt_room
    device_id: 123testid
    state_topic: "espresense/devices/123testid"
```

```yaml
away_timeout:
  description: 如果在指定秒数内没有更新，则将状态设置为 `not_home`。`0` 表示禁用此检查。
  required: false
  default: 0
  type: integer
device_id:
  description: 此传感器要跟踪的设备 ID。
  required: true
  type: string
name:
  description: 传感器名称。
  required: false
  default: Room Sensor
  type: string
state_topic:
  description: 包含所有房间子主题的主题。
  required: true
  type: string
timeout:
  description: "经过指定秒数后，房间存在状态会被视为过期。例如：device1 在 scanner1 上被上报，距离为 1；随后 scanner1 不再发送更新。5 秒后 scanner2 上报 device1，距离为 2。由于超时时间已过，旧的位置信息会被丢弃，转而采用 scanner2 的新信息。"
  required: false
  default: 5
  type: integer
unique_id:
  description: "唯一标识此房间传感器的 ID。如果两个传感器具有相同的唯一 ID，Home Assistant 会抛出异常。"
  required: false
  type: string
```

## 用法

应发布到房间主题的 JSON 示例：

```json
{
  "id": "123testid",
  "name": "Test Device",
  "distance": 5.678
}
```

### 设置客户端

此集成可与任何按照给定格式发送数据的软件配合使用。每个客户端都应将发现到的设备发布到配置主题下各自的子主题中。
如果您不想自己开发应用，也可以使用以下现成客户端：

- [**ESPresense**](https://github.com/ESPresense/ESPresense): Fork of ESP32-MQTT-room w/ fingerprinting, tile support, Kalman filter, based on C++/Platformio
- [**ESP-32-BLE-Scanner for Home Assistant**](https://github.com/HeimdallMidgard/ESP-32-BLE-Scanner): ESP32 based BLE presence detection for Home Assistant with web GUI
- [**room-assistant**](https://github.com/mKeRix/room-assistant)：查找 Bluetooth LE 信标，基于 Node.js
- [**Happy Bubbles Presence Server**](https://github.com/happy-bubbles/presence)：为 Happy Bubbles BLE 扫描设备提供存在检测服务器，基于 Go
- [**ESP32-MQTT-room**](https://jptrsn.github.io/ESP32-mqtt-room/)：运行在 ESP32 上，用于查找 Bluetooth LE 设备，基于 C++/Arduino
- [**OpenMQTTGateway**](https://github.com/1technophile/OpenMQTTGateway)：使用 ESP32 蓝牙低功耗扫描 BLE 广播设备，例如智能手表/手环等，以获取传感器数值
