---
title: Pencom
description: 如何使用 Pencom Designs 8 通道继电器板。
ha_category:
  - Switch
ha_release: 0.85
ha_iot_class: Local Polling
ha_domain: pencom
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[Pencom Design](https://www.pencomdesign.com/) 是一家面向商业和工业应用制造计算机控制继电器、I/O 和定制板卡的厂商。这个面向 [Pencom 继电器控制板](https://www.pencomdesign.com/relay-boards)的接口设计为通过以太网转串口适配器（NPort）工作。每个开关（继电器）都可以打开或关闭，并且可以读取继电器状态。

## 配置

Pencom 继电器可以串接，最多支持 8 块板卡。要在您的安装中启用 Pencom，请将其添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 配置示例
switch:
  - platform: pencom
    host: host.domain.com
    port: 4001
    boards: 2
    relays:
      - name: "Irrigation"
        addr: 0
      - name: "Upper Entry Door"
        addr: 1
      - name: "Fountain"
        addr: 0
        board: 2
```

```yaml
host:
  description: 以太网转串口适配器的 IP 地址。假定该适配器已预先配置完成。
  required: true
  type: string
port:
  description: 以太网转串口适配器的端口。
  required: true
  type: integer
boards:
  description: 串接在一起的板卡数量（默认为 1）。
  required: false
  type: integer
relays:
  description: 继电器列表。
  required: true
  type: list
  keys:
    name:
      description: 开关（组件）的名称。
      required: true
      type: string
    addr:
      description: 板卡上的继电器编号，从 0 开始。
      required: true
      type: integer
    board:
      description: 板卡编号（默认为 1）。
      required: false
      type: integer
```
