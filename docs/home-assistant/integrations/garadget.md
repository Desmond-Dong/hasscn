---
title: Garadget
description: 'Garadget 集成可让您通过 Home Assistant 控制 Garadget(https://www.garadget.com/) 车库门控制设备。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Cover
ha_release: 0.32
ha_iot_class: Cloud Polling
ha_domain: garadget
ha_platforms:
  - cover
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Garadget

**Garadget** 集成可让您通过 Home Assistant 控制 [Garadget](https://www.garadget.com/) 车库门控制设备。

## 配置

若要在您的安装中启用 Garadget 车库门实体，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目

 cover:
  - platform: garadget
    covers:
      first_garage:
        device: 190028001947343412342341
        username: YOUR_USERNAME
        password: YOUR_PASSWORD
        name: first_garage
      second_garage:
        device: 4c003f001151353432134214
        access_token: df4cc785ff818f2b01396c44142342fccdef
        name: second_garage

```

```yaml
covers:
  description: 您的车库门列表。
  required: true
  type: list
  keys:
    device:
      description: 这是您在 Garadget 门户中的设备 ID。可在 Garadget 网站或移动应用的设置部分找到。
      required: true
      type: string
    username:
      description: 您的 Garadget 账户用户名。与 `password` 一起使用可自动获取 `access_token`。
      required: false
      type: string
    password:
      description: 您的 Garadget 账户密码。与 `username` 一起使用可自动获取 `access_token`。
      required: false
      type: string
    access_token:
      description: 从您的 Garadget 账户生成的 `access_token`。要获取 `access_token`，请在登录 Garadget 网站后，使用浏览器开发者工具的网络面板查看。当提供此项时，不再需要 `username` 和 `password`。
      required: false
      type: string
    name:
      description: 在前端中使用的名称，否则将使用 Garadget 中配置的名称。
      required: false
      default: Garadget
      type: string
```

## 示例

<p class='img'>
  <img src='/home-assistant/images/integrations/garadget/cover_garadget_details.png' />
</p>


```yaml
# Related configuration.yaml entry
cover:
  - platform: garadget
    covers:
      garadget:
        device: 190028001947343412342341
        access_token: !secret garadget_access_token
        name: Garage door

template:
  - sensor:
    - name: Garage door state
      state: "{{ states('cover.garage_door') }}"
    - name: Garage door state since
      state: "{{ state_attr('cover.garage_door', 'time_in_state') }}"
    - name: Garage door WiFi signal strength
      state: "{{ state_attr('cover.garage_door', 'wifi_signal_strength') }}"
      unit_of_measurement: "dB"

group:
  garage_door:
    name: Garage door
    entities:
      - cover.garage_door
      - sensor.garage_door_status
      - sensor.garage_door_time_in_state
      - sensor.garage_door_wifi_signal_strength

customize:
  sensor.garage_door_time_in_state:
    icon: mdi:timer-sand
  sensor.garage_door_wifi_signal_strength:
    icon: mdi:wifi
```


Garadget 的某些传感器可能会在 **Activity** 部分产生大量杂项记录。可在您的 `configuration.yaml` 中使用以下配置排除这些条目。

```yaml
logbook:
  exclude:
    entities:
      - sensor.garage_door_time_in_state
      - sensor.garage_door_wifi_signal_strength
```

从固件版本 1.17 开始，Garadget 设备原生支持 MQTT。用户可以将设备配置为“仅云端”、“云端和 MQTT”或“仅 MQTT”。

若要将 Garadget 配置为 MQTT cover：

```yaml
mqtt:
  cover:
    - name: "Garage Door"
      command_topic: "garadget/device_name/command"
      state_topic: "garadget/device_name/status"
      payload_open: "open"
      payload_close: "close"
      payload_stop: "stop"
      value_template: "{{ value_json.status }}"
  sensor:
    - name: "Garage Door Since"
      state_topic: "garadget/device_name/status"
      value_template: '{{ value_json.time }}'

    - name: "Large Garage Door Brightness"
      state_topic: "garadget/device_name/status"
      unit_of_measurement: '%'
      value_template: '{{ value_json.bright }}'

```

请将 `device_name` 替换为配置 Garadget 时提供的设备名称。
