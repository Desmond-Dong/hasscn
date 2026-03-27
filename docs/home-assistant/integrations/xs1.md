---
title: EZcontrol XS1
description: 'Home Assistant 的 EZcontrol XS1(http://www.ezcontrol.de/content/view/36/28/) 集成可让您查看并控制 XS1 Gateway 上配置的设备。有关此网关的使用方式，请参阅官方文档 Bedienungsanleitung。'
ha_category:
  - Climate
  - Hub
  - Sensor
  - Switch
ha_release: 0.88
ha_iot_class: Local Polling
ha_domain: xs1
ha_platforms:
  - climate
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# EZcontrol XS1

Home Assistant 的 [EZcontrol XS1](http://www.ezcontrol.de/content/view/36/28/) 集成可让您查看并控制 XS1 Gateway 上配置的设备。有关此网关的使用方式，请参阅官方文档 [Bedienungsanleitung v3.0.0.0](http://www.ezcontrol.de/support/downloads/XS1/xs1manual/Bedienungsanleitung_EZcontrol_XS1_3.0.0.0-2.pdf)。

## 配置

将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
xs1:
  host: "192.168.2.100"
```

此集成仅会在**初始化时**自动检测 XS1 Gateway 的配置，目前这意味着仅在 Home Assistant 启动时进行检测。当您更改 XS1 的配置后，目前仍需要重启 Home Assistant 才能看到变化。

```yaml
host:
  description: XS1 Gateway 的主机地址。
  required: true
  type: string
port:
  description: 如果您的网关运行在某种代理之后，可在此指定自定义端口。
  required: false
  type: integer
  default: 80
ssl:
  description: 定义 API 请求是否使用 `https`（仅能通过您自己的代理实现）。
  required: false
  type: boolean
  default: false
username:
  description: 用于访问 XS1 Web API 的用户名。
  required: false
  type: string
password:
  description: 用于访问 XS1 Web API 的密码。
  required: false
  type: string
```

## 支持的设备类型

:::note
此集成目前仅覆盖 XS1 网关支持的部分设备类型，不支持的类型会被直接忽略。

:::
### 传感器

支持任意类型的传感器。

:::note
If you are using climate devices the "current temp" sensor will be automatically used by the actuator (if named correctly). To make this work have a look at the actuator description below.

:::
### 执行器

| Type          | Supported | Notes                                                                             |
| ------------- | --------- | --------------------------------------------------------------------------------- |
| `switch`      | Yes       |                                                                                   |
| `dimmer`      | Partly    | Dimmers are currently handled like switches so actual dimming is not supported :( |
| `temperature` | Yes       |                                                                                   |

### Climate 执行器/传感器

Home Assistant 可以将温度传感器与 climate 执行器合并为单个设备。XS1 网关本身不支持这种方式，但您可以分别配置传感器和执行器。要让 Home Assistant 将它们识别为同一个 climate 设备，只需在 XS1 网关配置中让**传感器**名称以前缀形式包含执行器名称，例如：

- Actuator device name: "Bedroom_Temp"
- Sensor device name: "Bedroom_Temp_Sensor"

## 示例

本节提供了一些此集成的实际使用示例。

### 完整配置

此示例展示了如何使用可选配置项。

```yaml
# Example configuration.yaml entry
xs1:
  host: "192.168.2.100"
  port: 80
  ssl: false
  username: myuser
  password: 123totallySecure
```
