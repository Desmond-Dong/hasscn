---
title: Ankuoo REC Switch
description: 有关如何将 Ankuoo REC Switch 集成到 Home Assistant 的说明。
ha_release: 0.81
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_domain: recswitch
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Ankuoo REC Switch** 集成允许您控制 Ankuoo REC Switch 设备。

支持的设备（已测试）：

- Ankuoo RecSwitch MS6126
- Lumitek CSW201 NEO WiFi
- MALMBERGS CSW201

## 配置

要启用此开关，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
switch:
  - platform: recswitch
    host: "IP_ADDRESS"
    mac: "MAC_ADDRESS"
```

```yaml
host:
  description: 设备的 IP 地址或主机名。
  required: true
  type: string
mac:
  description: 设备的 MAC 地址。
  required: true
  type: string
name:
  description: 在前端中使用的名称。
  required: false
  type: string
```
