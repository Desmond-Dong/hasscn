---
title: Skybeacon
description: 有关如何将 MiFlora BLE 植物传感器与 Home Assistant 集成的说明。
ha_category:
  - DIY
ha_release: 0.37
ha_iot_class: Local Polling
ha_domain: skybeacon
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Skybeacon** 集成支持由 [CR2477](https://cnsky9.en.alibaba.com/) 供电、带有温度/湿度传感器模块的 [iBeacon](https://en.wikipedia.org/wiki/IBeacon)/Eddystone 传感器。

## 配置

要在您的安装中使用 Skybeacon 集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: skybeacon
    mac: "xx:xx:xx:xx:xx:xx"
    monitored_conditions:
      - temperature
      - humidity
```

```yaml
mac:
  description: "您的传感器 MAC 地址。可通过命令行运行 `hcitool lescan` 查找。"
  required: true
  type: string
name:
  description: Skybeacon 传感器名称。
  required: false
  type: string
  default: Skybeacon
monitored_conditions:
  description: 需要监控的参数。
  required: false
  type: list
  keys:
    temperature:
      description: 传感器所在位置的温度。
    humidity:
      description: 传感器所在位置的湿度。
```
