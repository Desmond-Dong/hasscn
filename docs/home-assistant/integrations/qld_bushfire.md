---
title: Queensland Bushfire Alert
description: 'Queensland Bushfire Alert 集成可接入包含昆士兰州山火警报(https://www.qfes.qld.gov.au/Current-Incidents)的 GeoRSS feed。它会从 feed 中获取警报，并按照与 Home Assistant 位置的距离进行筛选后显示相关信息。'
ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.95
ha_codeowners:
  - '@exxamalte'
ha_domain: qld_bushfire
ha_platforms:
  - geo_location
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Queensland Bushfire Alert

**Queensland Bushfire Alert** 集成可接入包含昆士兰州[山火警报](https://www.qfes.qld.gov.au/Current-Incidents)的 GeoRSS feed。它会从 feed 中获取警报，并按照与 Home Assistant 位置的距离进行筛选后显示相关信息。

每次 feed 更新时，实体都会自动创建、更新和删除。每个实体都包含纬度和经度，并会自动显示在默认地图上，或者在地图卡片中通过定义来源 `qld_bushfire` 显示。每个实体的状态值为以公里为单位的距离。

<p class='img'>
  <img src='/home-assistant/images/screenshots/qld-bushfire-feed-map.png' />
</p>

数据每 5 分钟更新一次。

:::note
此集成使用的材料依据 [Creative Commons Attribution 4.0 许可协议](https://creativecommons.org/licenses/by/4.0/legalcode)提供。
这些材料仅为在 Home Assistant 中展示而进行了必要修改。
更多信息请参阅[原作者的版权声明](https://www.qfes.qld.gov.au/copyright)。

:::
## 配置

要接入 Queensland Bushfire Alert feed，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
geo_location:
  - platform: qld_bushfire
```

```yaml
categories:
  description: feed 中的类别名称列表。只有与这些类别之一匹配的警报才会被包含。有效类别包括 `Emergency Warning`、`Watch and Act`、`Advice`、`Notification` 和 `Information`。
  required: false
  type: list
radius:
  description: 围绕 Home Assistant 坐标、用于纳入山火警报的距离范围（单位：公里）。
  required: false
  type: float
  default: 20.0
latitude:
  description: 用于判定事件范围的坐标纬度。
  required: false
  type: string
  default: 配置中定义的纬度
longitude:
  description: 用于判定事件范围的坐标经度。
  required: false
  type: string
  default: 配置中定义的经度
```


## 状态属性

除标准属性外，每个实体还提供以下状态属性：

| 属性 | 说明 |
| ---------------- | -------------------------------------------------------------------------------- |
| latitude | 山火警报的纬度。 |
| longitude | 山火警报的经度。 |
| source | `qld_bushfire`，与 `geo_location` 自动化触发器配合使用。 |
| external_id | feed 中用于标识该山火警报的外部 ID。 |
| title | feed 中的原始标题。 |
| publication_date | 该警报首次发布的日期和时间。 |
| updated_date | 该警报最后更新的日期和时间。 |
| status | 警报状态，例如 `Patrolled`、`Going`、`Contained`。 |

## 完整配置

```yaml
# configuration.yaml 示例条目
geo_location:
  - platform: qld_bushfire
    radius: 30
    categories:
      - 'Emergency Warning'
      - 'Watch and Act'
    latitude: -24.85
    longitude: 152.35
```
