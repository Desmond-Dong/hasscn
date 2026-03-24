---
title: ATEN Rack PDU
description: 关于将 ATEN 机架 PDU 集成到 Home Assistant 的说明。
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 0.103
ha_codeowners:
  - '@mtdcr'
ha_domain: aten_pe
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**ATEN Rack PDU** 集成允许您从 Home Assistant 控制 [ATEN 机架 PDU](https://www.aten.com/eu/en/products/energy-intelligence-pduupsracks/rack-pdu/)。

为了使用它，必须在您的 PDU 上启用 SNMP。建议使用 SNMPv3 以保护您的凭据免受窃听。

已测试的设备：

- [PE8324G](https://www.aten.com/eu/en/products/energy-intelligence-pduupsracks/rack-pdu/pe8324/)

要设置它，请将以下信息添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
::: file:

```yaml
switch:
  - platform: aten_pe
    host: 192.168.0.60
```

```yaml
host:
  description: 要控制的 IP/主机。
  required: true
  type: string
port:
  description: 用于通信的端口。
  required: false
  type: string
  default: 161
community:
  description: 用于身份验证的 community 字符串（SNMP v1 和 v2c）。
  required: false
  type: string
  default: private
username:
  description: 用于身份验证的用户名。
  required: false
  type: string
  default: administrator
auth_key:
  description: 用于 SNMP v3 的身份验证密钥。
  required: false
  type: string
priv_key:
  description: 用于 SNMP v3 的隐私密钥。
  required: false
  type: string
```