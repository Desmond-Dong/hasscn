---
title: Zehnder ComfoAir Q
description: 关于如何将 Zehnder ComfoAir Q350/450/600 通风系统集成到 Home Assistant 的说明。
ha_category:
  - Fan
  - Sensor
ha_release: 0.48
ha_iot_class: Local Push
ha_codeowners:
  - '@michaelarnauts'
ha_domain: comfoconnect
ha_platforms:
  - fan
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---
# Zehnder ComfoAir Q

**Zehnder ComfoAir Q** 集成允许您从 Home Assistant 控制 Zehnder ComfoAir [Q350](https://products.zehnder-systems.com/en/product/zehnder-comfoair-q350-tr)/[Q450](https://products.zehnder-systems.com/en/product/zehnder-comfoair-q450-tr)/[Q600](https://products.zehnder-systems.com/en/product/zehnder-comfoair-q600-st) 通风设备。您需要一个 [ComfoConnect LAN C](https://www.zehnder.co.uk/products-and-systems/comfortable-indoor-ventilation/ms-comfoair-q/ideal-control#node-21233) 网桥将设备连接到您的本地网络。

官方提供了 iPhone 和 Android 应用，可用于配置和控制您的设备。此平台通过非官方的 [pycomfoconnect](https://github.com/michaelarnauts/comfoconnect) 库进行连接。

该集成提供了一个风扇平台，用于查看和控制通风速度；同时还提供了一个传感器平台，用于读取室外温度和湿度、室内温度和湿度，以及排风和送风流量（单位为立方米/小时）。

要设置它，请将以下信息添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
comfoconnect:
  host: IP_ADDRESS
```

```yaml
host:
  description: ComfoConnect LAN C 网桥的 IP 地址或主机名。
  required: true
  type: string
name:
  description: 您希望在 Home Assistant 中看到的设备名称。
  required: false
  default: ComfoAirQ
  type: string
token:
  description: 注册设备时要使用的令牌。这是一个随机的 32 字符十六进制字符串。
  required: false
  default: "`00000000000000000000000000000001`"
  type: string
user_agent:
  description: 注册设备时要提供的名称。
  required: false
  default: "`Home Assistant`"
  type: string
pin:
  description: 注册时使用的 PIN 码。只有在您更改了出厂默认 PIN 时才需要更改此项。
  required: false
  default: "`0000`"
  type: integer
```

要注册传感器，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
sensor:
  - platform: comfoconnect
    resources:
      - air_flow_exhaust
      - air_flow_supply
      - bypass_state
      - current_humidity
      - current_rmot
      - current_temperature
      - days_to_replace_filter
      - exhaust_fan_duty
      - exhaust_fan_speed
      - exhaust_humidity
      - exhaust_temperature
      - outside_humidity
      - outside_temperature
      - power_total
      - power_usage
      - preheater_power_total
      - preheater_power_usage
      - supply_fan_duty
      - supply_fan_speed
      - supply_humidity
      - supply_temperature
```

上面的列表列出了所有受支持的传感器。建议您只包含实际需要的传感器。

:::note
请注意，ComfoConnect LAN C 网桥版本 >= U1.2.6 才支持多个连接到网桥。
在较早版本中，无法同时建立多个到网桥的连接。此集成将保持连接打开，如果您打开应用程序，它会要求您断开 Home Assistant。如果您再次关闭应用程序，Home Assistant 将自动重新连接。

:::
