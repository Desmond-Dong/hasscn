---
title: aREST
description: '目前 Home Assistant 支持以下设备类型：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - DIY
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.9
ha_domain: arest
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# aREST

目前 Home Assistant 支持以下设备类型：

- [二值传感器](#binary-sensor)
- [传感器](#sensor)
- [开关](#switch)

## 二值传感器

`arest` 二值传感器平台允许您从运行 [aREST](https://arest.io/) RESTful 框架的设备（如带有以太网/Wi-Fi 连接的 Arduino、ESP8266 和 Raspberry Pi）获取所有数据。

要在您的安装中使用 aREST 二值传感器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  - platform: arest
    resource: http://IP_ADDRESS
    pin: 8
```

```yaml
resource:
  description: 暴露 aREST API 的设备的 IP 地址和协议，例如 `http://192.168.1.10`。
  required: true
  type: string
pin:
  description: 要监控的引脚编号。
  required: true
  type: integer
name:
  description: 让您覆盖设备的名称。默认使用设备中的 *name*。
  required: false
  type: string
```

访问 URL `http://IP_ADDRESS/digital/PIN_NUMBER` 应该在 JSON 响应中作为 `return_value` 给您引脚的状态。

```bash
$ curl -X GET http://192.168.0.5/digital/9
{"return_value": 0, "id": "office1", "name": "Office", "connected": true}
```

受上面命令启发的引脚 9 示例如下：

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  - platform: arest
    resource: http://192.168.0.5/digital/9
    pin: 9
    name: Office
```

:::note
此传感器不适用于快速状态变化，因为在两个更新周期之间发生变化的概率很高。

:::
## 传感器

`arest` 传感器平台允许您从运行 [aREST](https://arest.io/) RESTful 框架的设备（如带有以太网/Wi-Fi 连接的 Arduino、ESP8266 和 Raspberry Pi）获取所有数据。

要在您的安装中使用启用 aREST 的设备，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: arest
    resource: https://IP_ADDRESS
    monitored_variables:
      temperature:
        name: temperature
    pins:
      A0:
        name: Pin 0 analog
```

```yaml
resource:
  description: "暴露 aREST API 的设备的 IP 地址和协议，例如 `https://192.168.1.10`。"
  required: true
  type: string
name:
  description: 让您覆盖设备的名称。
  required: false
  default: aREST sensor
  type: string
pins:
  description: 要监控的引脚列表。模拟引脚的引脚号需要前导 **A**。
  required: false
  type: list
  keys:
    pin:
      description: 要使用的引脚号。
      required: true
      type: list
      keys:
        name:
          description: 您希望监控的变量名称。
          required: true
          type: string
        unit_of_measurement:
          description: 定义传感器的测量单位（如果有）。
          required: false
          type: string
        value_template:
          description: 定义一个[模板](/home-assistant/docs/configuration/templating/#processing-incoming-data)以从负载中提取值。
          required: false
          type: template
monitored_variables:
  description: 暴露变量列表。
  required: false
  type: list
  keys:
    variable:
      description: 要监控的变量名称。
      required: true
      type: list
      keys:
        name:
          description: 用于前端的名称。
          required: false
          type: string
        unit_of_measurement:
          description: 定义传感器的测量单位（如果有）。
          required: false
          type: string
        value_template:
          description: 定义一个[模板](/home-assistant/docs/configuration/templating/#processing-incoming-data)以从负载中提取值。
          required: false
          type: template
```

`monitored_variables` 数组中的变量必须在设备的响应中可用。作为起点，您可以使用示例草图之一（例如，带有以太网屏蔽的 Arduino 的 [Ethernet](https://raw.githubusercontent.com/marcoschwartz/aREST/master/examples/Ethernet/Ethernet.ino)）。在这些草图中有两个变量（`temperature` 和 `humidity`）可用，它们将作为端点。

访问其中一个端点（例如 `http://192.168.1.10/temperature`）将在 JSON 响应中给您值。

```json
{"temperature": 23, "id": "sensor01", "name": "livingroom", "connected": true}
```

根目录将给您一个 JSON 响应，其中包含所有变量及其当前值以及一些设备详细信息。

```json
{
   "variables" : {
      "temperature" : 23,
      "humidity" : 82
   },
   "id" : "sensor01",
   "name" : "livingroom",
   "connected" : true
}
```

`return_value` 在给定引脚的 JSON 响应中包含传感器数据（例如 `http://192.168.1.10/analog/2/` 或 `http://192.168.1.10/digital/7/`）。

```json
{"return_value": 34, "id": "sensor02", "name": "livingroom", "connected": true}
```

## 开关

`arest` 开关平台允许您切换运行 [aREST](https://arest.io/) RESTful 框架的设备（如带有以太网/Wi-Fi 连接的 Arduino 板、基于 ESP8266 的设备和 Raspberry Pi）的引脚。

要在您的安装中使用带有引脚的启用 aREST 的设备，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: arest
    resource: http://IP_ADDRESS
    pins:
      11:
        name: Fan
      13:
        name: Switch
        invert: true
```

如果您想使用自定义函数，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: arest
    resource: http://IP_ADDRESS
    name: Office
    functions:
      function1:
        name: Light Desk
```

```yaml
resource:
  description: 暴露 aREST API 的设备的 IP 地址和协议，例如 `http://192.168.1.10`（无尾随斜杠）
  required: true
  type: string
name:
  description: 让您覆盖设备的名称。默认使用设备中的 *name*。
  required: false
  type: string
pins:
  description: 包含所有使用引脚的数组。
  required: false
  type: map
  keys:
    name:
      description: 在前端使用的引脚名称。
      required: true
      type: string
    invert:
      description: 是否应反转开/关的逻辑。
      required: false
      type: boolean
      default: false
functions:
  description: 包含所有使用函数的数组。
  required: false
  type: map
  keys:
    name:
      description: 在前端使用的名称。
      required: true
      type: string
```

您仍然可以使用 Web 浏览器或命令行工具切换您的引脚。使用 URL `http://192.168.1.10/digital/8/1` 将引脚 8 设置为高/开，JSON 响应将给您反馈。

```json
{"message": "Pin D8 set to 1", "id": "sensor02", "name": "livingroom", "connected": true}
```