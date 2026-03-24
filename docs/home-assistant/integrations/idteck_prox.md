---
title: IDTECK Proximity Reader
description: 关于如何使用 IDTECK 近距离读卡器的说明。
ha_category:
  - Other
ha_release: 0.85
ha_iot_class: Local Push
ha_domain: idteck_prox
ha_integration_type: integration
ha_quality_scale: legacy
---

[IDTECK](https://www.idteck.com/) 生产用于门禁控制和用户识别的身份识别系统。此集成适用于 [Proximity Readers](https://www.idteck.com/en/products/rfid-reader-__-card-%26-tag-__idteck-credential-format-(idc))（RFID 读卡器）。设备通过串口转以太网转换器（NPort）连接到 Home Assistant。

每当刷卡或输入按键序列时，都会触发 `idteck_prox_keycard` 事件。该事件包含 `card`（卡号或按键序列）和读卡器的 `name`。您可以将 `card` 与已知卡号比对，以此作为门禁控制系统或签到/签退系统的一部分。

## 配置

```yaml
# configuration.yaml 示例条目
idteck_prox:
  - host: host1.domain.com
    port: 4001
    name: "Lower Door"
  - host: host2.domain.com
    port: 4001
    name: "Upper Door"
```

```yaml
host:
  description: 连接到近距离读卡器的以太网转串口适配器的主机名或 IP 地址。假定该适配器已预先配置好。
  required: true
  type: string
port:
  description: 以太网转串口适配器的端口。
  required: true
  type: integer
name:
  description: 近距离读卡器的名称。
  required: true
  type: string
```
