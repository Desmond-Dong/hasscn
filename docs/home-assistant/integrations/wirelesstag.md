---
title: Wireless Sensor Tags
description: 关于如何在 Home Assistant 中集成无线标签传感器的说明。
ha_category:
  - Binary sensor
  - Hub
  - Sensor
  - Switch
ha_iot_class: Cloud Push
ha_release: 0.68
ha_domain: wirelesstag
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_codeowners:
  - '@sergeymaysak'
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Wireless Sensor Tags** 集成可让您在 Home Assistant 中接入 [wirelesstag.net](https://wirelesstag.net/) 传感器标签。

Home Assistant 目前支持以下设备类型：

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)

## 配置

要启用已在 [wirelesstag.net](https://wirelesstag.net/) 账户中设置好的标签，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
wirelesstag:
  username: you@example.com
  password: secret
```

```yaml
username:
  description: 您的 wirelesstag.net 账户用户名。
  required: true
  type: string
password:
  description: 您的 wirelesstag.net 账户密码。
  required: true
  type: string
```

## Binary sensor

要为您的标签启用二进制传感器平台，请将以下内容添加到您的 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: wirelesstag
    monitored_conditions:
      - presence
      - door
      - battery
```

```yaml
monitored_conditions:
  description: 要监控的条件类型。
  required: true
  type: list
  keys:
    presence:
      description: On 表示在范围内，Off 表示超出范围。
    motion:
      description: 检测到移动时为 On，清除后为 Off。
    door:
      description: 门打开时为 On，门关闭时为 Off。
    cold:
      description: On 表示温度过低，Off 表示正常。
    heat:
      description: On 表示过热，Off 表示正常。
    dry:
      description: On 表示过于干燥（湿度过低），Off 表示正常。
    wet:
      description: On 表示过于潮湿（湿度过高），Off 表示正常。
    light:
      description: On 表示检测到光线，Off 表示无光线。
    moisture:
      description: On 表示检测到湿度（湿），Off 表示无湿度（干）。
    battery:
      description: On 表示标签电量低，Off 表示正常。
```

## Sensor

要为您的标签启用传感器平台，请将以下内容添加到您的 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: wirelesstag
    monitored_conditions:
      - temperature
      - humidity
```

```yaml
monitored_conditions:
  description: 要监控的指标类型。
  required: true
  type: list
  keys:
    temperature:
      description: 数值单位为摄氏度或华氏度（取决于您在 Tag Manager 中的设置）。
    humidity:
      description: "Humidity level in %."
    moisture:
      description: "Water level/soil moisture in % (applicable for Water Tag only)."
    light:
      description: 亮度，单位为 lux（如果标签支持）。
    ambient_temperature:
      description: 如果您的设备是带环境温度功能的 Outdoor Probe，请使用此传感器。
```

## Switch

要为您的标签启用开关平台，请将以下内容添加到您的 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
switch:
  - platform: wirelesstag
    monitored_conditions:
      - motion
      - humidity
```

```yaml
monitored_conditions:
  description: 要控制的指标类型。
  required: true
  type: list
  keys:
    temperature:
      description: 控制温度监控的布防/撤防。
    humidity:
      description: 控制湿度监控的布防/撤防。
    motion:
      description: 控制移动和开关门事件监控的布防/撤防。
    light:
      description: 控制对光线变化的监控。
    moisture:
      description: 控制水位/土壤湿度传感器的监控。
```

要接收移动和门状态的二进制传感器事件，必须对 motion 开关进行布防/撤防。
其他开关仅在您希望根据温度、湿度、光线或湿度变化范围接收标签推送通知时才需要。
