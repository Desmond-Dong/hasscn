---
title: ThermoWorks Smoke
description: 'ThermoWorks Smoke 集成会拉取您的 ThermoWorks Smoke Thermometer(https://www.thermoworks.com/Smoke) 的数据。 这需要一个已连接互联网的 Smoke WiFi Gateway(https://www.thermoworks.com。'
ha_category:
  - Sensor
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_domain: thermoworks_smoke
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---
# ThermoWorks Smoke

**ThermoWorks Smoke** 集成会拉取您的 [ThermoWorks Smoke Thermometer](https://www.thermoworks.com/Smoke) 的数据。
这需要一个已连接互联网的 [Smoke WiFi Gateway](https://www.thermoworks.com/Smoke-Gateway)。

您需要先通过移动应用将 Smoke 设备注册到您的账户，并在此传感器的配置中提供您注册时使用的电子邮箱和密码，以便连接并拉取数据。

## 配置

要将这些传感器添加到您的安装中，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thermoworks_smoke
    email: "your email here"
    password: !secret thermoworks_pass
```

```yaml
email:
  description: 在 ThermoWorks Smoke 移动应用中注册该设备时使用的电子邮箱地址。
  required: true
  type: string
password:
  description: 在 ThermoWorks Smoke 移动应用中注册时使用的密码。
  required: true
  type: string
monitored_conditions:
  description: 要添加的传感器。默认为 `probe1` 和 `probe2`。完整列表为 `probe1`、`probe2`、`probe1_min`、`probe1_max`、`probe2_min`、`probe2_max`。
  required: false
  type: list
exclude:
  description: 要忽略的设备序列号。
  required: false
  type: list
```

## 示例

本节包含一些使用此传感器的示例。

### 仅使用 Probe 1

这将仅显示 Probe 1 及其最小值和最大值数据。

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thermoworks_smoke
    email: "your email here"
    password: !secret thermoworks_pass
    monitored_conditions:
    - probe1
    - probe1_min
    - probe1_max
```

### 忽略一个设备

这将排除某个设备，不为其创建设备传感器。请将 `"00:00:00:00:00:00"` 替换为您设备的序列号。

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thermoworks_smoke
    email: "your email here"
    password: !secret thermoworks_pass
    exclude:
    - "00:00:00:00:00:00"
```

### 当 Probe 1 超过某个温度时发送通知

这会使用自动化，在 Probe 1 超过存储在 `input_number` 变量中的温度时触发通知。
默认情况下，您的 Smoke 在应用中名为 "My Smoke"。如果您修改过名称，则需要将传感器名称从 `my_smoke_probe_1` 改为 `your_name_probe_1`。


```yaml
# Example configuration.yaml entry
sensor:
  - platform: thermoworks_smoke
    email: "your email here"
    password: !secret thermoworks_pass

input_number:
  smoke_probe_1_threshold:
    name: Smoke Probe 1 Threshold
    min: -40
    max: 500
    step: 0.5
    unit_of_measurement: "°F"
    icon: mdi:thermometer

automation:
  - alias: "Alert when My Smoke Probe 1 is above threshold"
    triggers:
      - trigger: template
        value_template: >-
          {% if (states("sensor.my_smoke_probe_1") | float) > (states("input_number.smoke_probe_1_threshold") | float) %}
            True
          {% else %}
            False
          {% endif %}
    actions:
      - action: notify.all
        data:
          message: >
            {{- state_attr('sensor.my_smoke_probe_1','friendly_name') }} is above
            {{- ' '+states("input_number.smoke_probe_1_threshold") -}}
            {{- state_attr('sensor.my_smoke_probe_1','unit_of_measurement') }} at
            {{- ' '+states("sensor.my_smoke_probe_1") -}}
            {{- state_attr('sensor.my_smoke_probe_1','unit_of_measurement') }}
```


