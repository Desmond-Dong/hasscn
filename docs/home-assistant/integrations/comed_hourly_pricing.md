---
title: ComEd Hourly Pricing
description: 'ComEd 分时定价计划是 ComEd 电力用户可选的一项方案。它会根据当前需求向客户收取浮动电价，而不是传统的固定费率。实时价格会发布在这里(https://hourlypricing.comed.com/live-prices/)，也可以通过 API(https://hourlypricing.comed。'
ha_category:
  - Energy
ha_release: '0.40'
ha_iot_class: Cloud Polling
ha_domain: comed_hourly_pricing
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---
# ComEd Hourly Pricing

ComEd 分时定价计划是 ComEd 电力用户可选的一项方案。它会根据当前需求向客户收取浮动电价，而不是传统的固定费率。实时价格会发布在[这里](https://hourlypricing.comed.com/live-prices/)，也可以通过 [API](https://hourlypricing.comed.com/hp-api/) 获取，您可以将其集成为 Home Assistant 中的传感器。

有两种价格数据源可用：5 分钟价格，以及当前小时的平均价格。

要在您的安装中使用此传感器，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: comed_hourly_pricing
    monitored_feeds:
      - type: five_minute
      - type: current_hour_average
```

```yaml
monitored_feeds:
  description: 要监控的数据源。
  required: true
  type: list
  keys:
    type:
      description: 数据源名称。
      required: true
      type: list
      keys:
        five_minute:
          description: 最新的 5 分钟价格（以美分为单位）。
        current_hour_average:
          description: 最新的当前小时平均价格（以美分为单位）。
    name:
      description: 传感器的自定义名称。
      required: false
      type: string
    offset:
      description: 定价数据源仅提供电力的 _供应_ 成本。`offset` 参数允许您提供一个固定常数，并将其添加到定价数据中，以更准确地表示每千瓦时的总电力成本。
      required: false
      default: 0.0
      type: float
```
