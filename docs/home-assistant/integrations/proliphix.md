---
title: Proliphix
description: 有关如何将 Proliphix 恒温器集成到 Home Assistant 中的说明。
ha_category:
  - Climate
ha_release: 0.11
ha_iot_class: Local Polling
ha_domain: proliphix
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: legacy
---

**Proliphix** 集成可让您在 Home Assistant 中控制 Proliphix 恒温器。

当前已支持并测试的恒温器：

- NT10e

要进行设置，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
climate:
  - platform: proliphix
    host: IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

```yaml
host:
  description: 恒温器地址，例如 192.168.1.32。
  required: true
  type: string
username:
  description: 恒温器用户名。
  required: true
  type: string
password:
  description: 恒温器密码。
  required: true
  type: string
```

Proliphix NT Thermostat 系列是通过以太网连接的恒温器。它们提供基于 OID 值 get/set 的本地 HTTP 接口。
完整 API 说明可参阅这份 [API documentation](https://github.com/sdague/thermostat.rb/blob/master/docs/PDP_API_R1_11.pdf)。
