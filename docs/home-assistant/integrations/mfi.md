---
title: Ubiquiti mFi mPort
description: 'Home Assistant 目前支持以下设备类型：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Network
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.13
ha_domain: mfi
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Ubiquiti mFi mPort

Home Assistant 目前支持以下设备类型：

- [Sensor](#sensor)
- [Switch](#switch)

## Sensor

`mfi` sensor 集成可让您监控 [mFi mPort 接口和传感器](https://www.ubnt.com/mfi/mport/)。

要将此集成添加到您的安装中，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mfi
    host: IP_ADDRESS_OF_CONTROLLER
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

```yaml
host:
  description: 您的 mFi 控制器的 IP 地址或主机名。
  required: true
  type: string
port:
  description: 您的 mFi 控制器端口。
  required: false
  default: 6080 (6443 for TLS)
  type: integer
username:
  description: mFi 管理员用户名。
  required: true
  type: string
password:
  description: mFi 管理员用户的密码。
  required: true
  type: string
ssl:
  description: 如果为 `true`，则使用 SSL/TLS 连接 mFi 控制器。
  required: false
  default: true
  type: boolean
verify_ssl:
  description: 如果您的 mFi 控制器使用自签名证书，请将此项设为 `false`。
  required: false
  default: true
  type: boolean
```

## Switch

`mfi` switch 平台可让您控制 [mFi 可控电源插座](https://www.ubnt.com/mfi/mpower/)。

要将此平台添加到您的安装中，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
switch:
  - platform: mfi
    host: IP_ADDRESS_OF_CONTROLLER
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

```yaml
host:
  description: 您的 mFi 控制器的 IP 地址或主机名。
  required: true
  type: string
port:
  description: 您的 mFi 控制器端口。
  required: false
  default: 6443
  type: integer
username:
  description: mFi 管理员用户名。
  required: true
  type: string
password:
  description: mFi 管理员密码。
  required: true
  type: string
ssl:
  description: 如果为 `true`，则使用 SSL/TLS 连接 mFi 控制器。
  required: false
  default: true
  type: boolean
verify_ssl:
  description: 如果您的 mFi 控制器使用自签名证书，请将此项设为 `false`。
  required: false
  default: true
  type: boolean
```
