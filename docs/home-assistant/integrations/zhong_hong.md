---
title: ZhongHong
description: 关于如何在 Home Assistant 中集成中弘支持温控器的说明。
ha_category:
  - Climate
ha_release: 0.72
ha_iot_class: Local Push
ha_domain: zhong_hong
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: legacy
---

**ZhongHong** 集成可让您通过 Home Assistant 控制 Zhonghong HVAC Gateway Controller 温控器。

要进行设置，请将以下内容添加到您的 `configuration.yaml` 文件中：

```yaml
climate:
  - platform: zhong_hong
    host: GATEWAY_IP
```

```yaml
host:
  description: 控制器的 IP 地址。
  required: true
  type: string
port:
  description: 控制器的端口。
  required: false
  default: 9999
  type: integer
gateway_address:
  description: 网关地址（在控制器本身中设置）。
  required: false
  default: 1
  type: integer
```

找到网关后，所有 HVAC 设备都会自动配置。
