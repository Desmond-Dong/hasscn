---
title: Heatmiser
description: 'Heatmiser 集成可让您控制 Heatmiser DT/DT-E/PRT/PRT-E(https://www.heatmisershop.co.uk/room-thermostats/) 恒温器。该模块目前通过 RS232 - RS485 转换器工作，因此使用 IP 连接。'
ha_category:
  - Climate
ha_release: '0.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@andylockran'
ha_domain: heatmiser
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: legacy
---
# Heatmiser

**Heatmiser** 集成可让您控制 [Heatmiser DT/DT-E/PRT/PRT-E](https://www.heatmisershop.co.uk/room-thermostats/) 恒温器。该模块目前通过 RS232 -> RS485 转换器工作，因此使用 IP 连接。

若要通过 Wi-Fi 连接，还需要额外开发；不过当前使用的 HeatmiserV3 Python 模块已完整实现 V3 协议。

如需进行设置，请将以下内容添加到 "`configuration.yaml`" 文件中：

```yaml
climate:
  - platform: heatmiser
    host: YOUR_IP_ADDRESS
    port: YOUR_PORT
    tstats:
      - id: THERMOSTAT_ID
        name: THERMOSTAT_NAME
```

单个接口最多可处理 32 个已连接设备。

```yaml
host:
  description: 接口的 IP 地址。
  required: true
  type: string
port:
  description: 接口监听的端口。
  required: true
  type: string
tstats:
  description: 网关上已启用的恒温器列表。
  required: true
  type: list
  keys:
    id:
      description: 在设备本身配置的恒温器 ID。
      required: true
      type: string
    name:
      description: 恒温器的友好名称。
      required: true
      type: string
```
