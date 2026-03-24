---
title: De Lijn
description: 关于如何将 De Lijn（佛兰德斯公共交通公司）发车时间集成到 Home Assistant 的说明。
ha_release: 0.97
ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bollewolle'
  - '@Emilv2'
ha_domain: delijn
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**De Lijn** 集成将为您提供佛兰德斯（比利时）De Lijn 公共交通网络特定站点的下一班公交、有轨电车或地铁的发车时间。

## 设置

在 [De Lijn Open Data portal](https://data.delijn.be/) 创建开发者账户以获取免费的 API 订阅密钥。
要获取有效的站点 ID，请查看物理站点的 6 位数字或访问 De Lijn 网站的 [stops page](https://www.delijn.be/en/haltes/)。

## 配置

要启用此传感器，请将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: delijn
    api_key: "API_SUBSCRIPTION_KEY"
    next_departure:
    - stop_id: 'STOP_ID'
```

```yaml
api_key:
  description: "访问 De Lijn API 所需的 API 订阅密钥。"
  required: true
  type: string
next_departure:
  description: 一个或多个发车传感器。
  required: true
  type: list
  keys:
    stop_id:
      description: "站点 ID，例如 `200552`。"
      required: true
      type: string
    number_of_departures:
      description: "指定要检索的站点最大发车/通过次数"
      required: false
      default: 5
      type: integer
```

## 示例

### 完整配置

下面的示例显示了包含两个传感器的完整配置，只需将 abcdefg 替换为实际的 API 订阅密钥。第一个 stop_id 将返回默认的下 5 次通过，第二个 stop_id 被强制返回下 20 次通过。

```yaml
# 示例 configuration.yaml 条目
sensor:
  # De Lijn 公共交通
  - platform: delijn
    api_key: "abcdefg"
    next_departure:
    - stop_id: '200018'
    - stop_id: '201169'
      number_of_departures: 20
```

## 自定义仪表板卡片

与以下自定义仪表板卡片配合使用效果最佳：<https://github.com/bollewolle/delijn-card>