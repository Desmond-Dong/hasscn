---
title: StatsD
description: 在 StatsD 中记录事件。
ha_category:
  - History
ha_iot_class: Local Push
ha_release: 0.12
ha_domain: statsd
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**StatsD** 集成可将所有状态变化传输到外部 [StatsD](https://github.com/etsy/statsd) 实例。

要在您的安装中使用 `statsd` 集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
statsd:
```

```yaml
host:
  description: "StatsD 主机的 IP 地址，例如 `192.168.1.10`。"
  required: true
  default: localhost
  type: string
port:
  description: 使用的端口。
  required: false
  default: 8125
  type: integer
prefix:
  description: 使用的前缀。
  required: false
  default: "`hass`"
  type: string
rate:
  description: 采样率。
  required: false
  default: 1
  type: integer
log_attributes:
  description: 记录状态和属性变化。启用后会改变默认的统计路径。
  required: false
  default: false
  type: boolean
value_mapping:
  description: 将非数值映射为数值。
  required: false
  type: list
```

完整示例：

```yaml
# configuration.yaml 示例条目
statsd:
  prefix: home
  rate: 5
  value_mapping:
    cooling: 1
    heating: 10
```

StatsD 支持多种 [backends](https://github.com/etsy/statsd/blob/master/docs/backend.md)。
