---
title: Orvibo
description: '请注意，出于安全原因，产品 ORVIBO WIFI SMART SOCKET S20 (LGS-20) 已被欧洲主管部门召回。更多信息请参阅 RAPEX 信息(https://ec.europa.eu/consumers/consumerssafety/safetyproducts/rapex/alerts/。'
ha_category:
  - Switch
ha_iot_class: Local Push
ha_release: 0.8
ha_domain: orvibo
ha_platforms:
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---
# Orvibo

:::caution
请注意，出于安全原因，产品 ORVIBO WIFI SMART SOCKET S20 (LGS-20) 已被欧洲主管部门召回。更多信息请参阅 [RAPEX 信息](https://ec.europa.eu/consumers/consumers_safety/safety_products/rapex/alerts/?event=viewProduct&reference=A12/1577/15&lng=en)。

:::
**Orvibo** 集成可让您控制 Orvibo S20 WiFi 智能插座的开关状态。

## 配置

要自动发现您网络中的 Orvibo 插座，请使用以下配置：

```yaml
# Example configuration.yaml entry
switch:
  - platform: orvibo
```

如果要手动指定 Orvibo 插座并跳过自动发现，请使用以下配置：

```yaml
# Example configuration.yaml entry
switch:
  - platform: orvibo
    discovery: false
    switches:
      - host: IP_ADDRESS
        mac: MA:CA:DD:RE:SS:00
        name: "My Socket"
```

```yaml
discovery:
  description: 是否自动发现插座。
  required: false
  default: true
  type: boolean
switches:
  description: Orvibo 开关列表。
  required: false
  type: list
  keys:
    host:
      description: "插座的 IP 地址，例如 192.168.1.10。"
      required: true
      type: string
    mac:
      description: "插座的 MAC 地址，例如 `AA:BB:CC:DD:EE:FF`。如果插座连接到与运行 Home Assistant 的设备不同的子网，则必须填写此项。"
      required: false
      type: string
    name:
      description: 您为插座指定的名称。
      required: false
      default: Orvibo S20 Switch
      type: string
```
