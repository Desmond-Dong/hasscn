---
title: Russound RNET
description: 'Russound RNET 集成允许您控制使用 RNET 协议的 Russound 设备。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Media player
ha_release: 0.25
ha_iot_class: Local Polling
ha_domain: russound_rnet
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
ha_codeowners:
  - '@noahhusby'
---
# Russound RNET

**Russound RNET** 集成允许您控制使用 RNET 协议的 Russound 设备。

该集成最初是在带有 6 个分区和 6 个音源的 Russound CAV6.6 设备上测试的。它同样适用于 Russound CAA66，但请务必使用 null-modem 线缆。如果您通过 RNET link 端口连接了多个控制器，则每增加 6 个分区就映射到对应的控制器 ID。

连接 Russound 设备只能通过 TCP 进行；您可以使用诸如 [tcp_serial_redirect](https://github.com/pyserial/pyserial/blob/master/examples/tcp_serial_redirect.py) 之类的 TCP 转串口网关。

## 支持的设备

此集成允许您连接以下控制器：

- Russound CAS44
- Russound CAA66
- Russound CAM6.6
- Russound CAV6.6

要将此集成添加到您的安装中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
media_player:
  - platform: russound_rnet
    host: 192.168.1.10
    port: 1337
    name: Russound
    zones:
      1:
        name: Main Bedroom
      2:
        name: Living Room
      3:
        name: Kitchen
      4:
        name: Bathroom
      5:
        name: Dining Room
      6:
        name: Guest Bedroom
      # controller 2 - zone 1 (connected via RNET link ports)
      7:
        name: Basement Recroom
    sources:
      - name: Sonos
      - name: Sky+
```

```yaml
host:
  description: TCP 网关的 IP 地址。
  required: true
  type: string
port:
  description: TCP 网关的端口。
  required: true
  type: integer
name:
  description: 设备名称。
  required: true
  type: string
zones:
  description: 可用分区列表。
  required: true
  type: integer
sources:
  description: 可用音源列表，顺序必须与它们连接到设备的顺序一致。
  required: true
  type: list
```
