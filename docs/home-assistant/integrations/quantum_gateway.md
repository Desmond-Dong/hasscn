---
title: Quantum Gateway
description: 'Quantum Gateway 集成通过检查连接到 Verizon Fios 网关的设备来提供在家状态检测。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.81
ha_codeowners:
  - '@cisasteelersfan'
ha_domain: quantum_gateway
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Quantum Gateway

**Quantum Gateway** 集成通过检查连接到 Verizon Fios 网关的设备来提供在家状态检测。

该集成已在 Verizon Fios-G1100 和 G3100 Quantum Gateway 上测试通过。

## 配置

要在您的安装中使用 Verizon Fios Quantum Gateway，请将以下内容添加到 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
device_tracker:
  - platform: quantum_gateway
    host: 192.168.1.1
    password: YOUR_PASSWORD
```

```yaml
host:
  description: 路由器的 IP 地址，例如 `192.168.1.1`。
  required: false
  type: string
  default: myfiosgateway.com
password:
  description: `admin` 用户的密码。默认密码可能印在网关设备本体上。
  required: true
  type: string
ssl:
  description: 连接网关时使用 HTTPS。较新的固件可能要求使用 HTTPS，而较旧的固件可能需要将此项设为 `False`。
  required: false
  type: boolean
  default: True
```

有关如何配置要跟踪的人员，请参阅[设备跟踪器集成页面](/home-assistant/integrations/device_tracker/)。
