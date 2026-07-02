# U.S. Geological Survey Earthquake Hazards (USGS)

**U.S. Geological Survey Earthquake Hazards (USGS)** 集成允许您接入由 [U.S. Geological Survey](https://earthquake.usgs.gov/) 提供的 GeoJSON 信息流，其中包含地震等地震事件的信息。它会从信息流中获取事件，并根据与 Home Assistant 位置的距离筛选后显示这些事件的信息。

<p class='img'>
  <img src='/home-assistant/images/screenshots/usgs-earthquake-hazards-program-feed-entities.png' />
</p>

每次信息流更新时，实体都会被自动创建、更新或移除。每个实体都包含纬度和经度，并会自动显示在地图上。实体状态值为与 Home Assistant 的距离，单位是千米。

<p class='img'>
  <img src='/home-assistant/images/screenshots/usgs-earthquake-hazards-program-feed-map.png' />
</p>

数据每 5 分钟更新一次。

## 配置

要接入 U.S. Geological Survey Earthquake Hazards Program 信息流，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例
geo_location:
  - platform: usgs_earthquakes_feed
    feed_type: "past_day_all_earthquakes"
```

```yaml
feed_type:
  description: U.S. Geological Survey Earthquake Hazards Program 提供 20 个涵盖不同时间范围和震级的信息流。您必须从下方列表中选择一种信息流类型。
  type: string
  required: true
minimum_magnitude:
  description: 要纳入的最小地震震级。
  required: false
  type: float
  default: 0.0
radius:
  description: 以 Home Assistant 坐标为中心、纳入地震事件的距离范围，单位为千米。
  required: false
  type: float
  default: 50.0
latitude:
  description: 用于筛选事件的中心坐标纬度。
  required: false
  type: string
  default: 在 `configuration.yaml` 中定义的纬度
longitude:
  description: 用于筛选事件的中心坐标经度。
  required: false
  type: string
  default: 在 `configuration.yaml` 中定义的经度
```

### 支持的信息流类型

| Description                            | Feed Type                            |
| -------------------------------------- | ------------------------------------ |
| Past Hour - Significant Earthquakes    | `past_hour_significant_earthquakes`  |
| Past Hour - M4.5+ Earthquakes          | `past_hour_m45_earthquakes`          |
| Past Hour - M2.5+ Earthquakes          | `past_hour_m25_earthquakes`          |
| Past Hour - M1.0+ Earthquakes          | `past_hour_m10_earthquakes`          |
| Past Hour - All Earthquakes            | `past_hour_all_earthquakes`          |
| Past Day - Significant Earthquakes     | `past_day_significant_earthquakes`   |
| Past Day - M4.5+ Earthquakes           | `past_day_m45_earthquakes`           |
| Past Day - M2.5+ Earthquakes           | `past_day_m25_earthquakes`           |
| Past Day - M1.0+ Earthquakes           | `past_day_m10_earthquakes`           |
| Past Day - All Earthquakes             | `past_day_all_earthquakes`           |
| Past 7 Days - Significant Earthquakes  | `past_week_significant_earthquakes`  |
| Past 7 Days - M4.5+ Earthquakes        | `past_week_m45_earthquakes`          |
| Past 7 Days - M2.5+ Earthquakes        | `past_week_m25_earthquakes`          |
| Past 7 Days - M1.0+ Earthquakes        | `past_week_m10_earthquakes`          |
| Past 7 Days - All Earthquakes          | `past_week_all_earthquakes`          |
| Past 30 Days - Significant Earthquakes | `past_month_significant_earthquakes` |
| Past 30 Days - M4.5+ Earthquakes       | `past_month_m45_earthquakes`         |
| Past 30 Days - M2.5+ Earthquakes       | `past_month_m25_earthquakes`         |
| Past 30 Days - M1.0+ Earthquakes       | `past_month_m10_earthquakes`         |
| Past 30 Days - All Earthquakes         | `past_month_all_earthquakes`         |

## 状态属性

除标准属性外，每个实体还提供以下状态属性：

| Attribute   | Description                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------- |
| latitude    | 地震发生位置的纬度。 |
| longitude   | 地震发生位置的经度。 |
| source      | `usgs_earthquakes_feed`，可与 `geo_location` 自动化触发器配合使用。 |
| external\_id | 信息流中用于标识该地震事件的外部 ID。 |
| place       | 事件附近已命名地理区域的文字描述。 |
| magnitude   | 上报的地震震级。 |
| time        | 该事件发生的日期和时间。 |
| updated     | 该事件最近一次更新的日期和时间。 |
| status      | 指示事件是否已由人工审核：`automatic`、`reviewed`、`deleted` |
| type        | 地震事件类型：`earthquake` 或 `quarry`。 |

## 完整配置

```yaml
# configuration.yaml 示例
geo_location:
  - platform: usgs_earthquakes_feed
    feed_type: "past_month_all_earthquakes"
    radius: 50
    minimum_magnitude: 0.0
    latitude: 35.899722
    longitude: -120.432778
```

## 卡片示例

假设您使用 `feed_type: past_week_all_earthquakes` 配置此服务，则可以在仪表板中通过以下卡片创建对应的地图卡片：

```yaml
type: map
geo_location_sources:
  - usgs_earthquakes_feed
entities:
  - zone.home
title: Nearby Earthquakes Last Week
```
