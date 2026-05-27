# IGN Sismología

**IGN Sismologia** 集成可让您接入由西班牙 [Instituto Geografico Nacional](https://www.ign.es/) 提供的 GeoRSS 订阅源，其中包含伊比利亚半岛和加那利群岛地震等地震事件的信息。它会从订阅源中获取事件，并按与 Home Assistant 位置的距离过滤后显示这些事件的信息。

每次订阅源更新时，实体都会自动创建、更新和删除。每个实体都定义了纬度和经度，并会自动显示在默认地图上，或者在地图卡片中通过定义来源 `ign_sismologia` 来显示。每个实体的状态值为以千米为单位的距离。

<p class='img'>
  <img src='/home-assistant/images/screenshots/ign-sismologia-feed-map.png' />
</p>

数据每 5 分钟更新一次。

## 配置

要集成 IGN Sismologia 订阅源，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
geo_location:
  - platform: ign_sismologia
```

```yaml
minimum_magnitude:
  description: 要纳入的地震最小震级。
  required: false
  type: float
  default: 0.0
radius:
  description: 围绕 Home Assistant 坐标、纳入地震事件的半径距离（单位为千米）。
  required: false
  type: float
  default: 50.0
latitude:
  description: 用于判断附近事件的坐标纬度。
  required: false
  type: string
  default: 在您的 `configuration.yaml` 中定义的纬度
longitude:
  description: 用于判断附近事件的坐标经度。
  required: false
  type: string
  default: 在您的 `configuration.yaml` 中定义的经度
```

## 状态属性

除标准属性外，每个实体还提供以下状态属性：

| Attribute        | Description                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| latitude         | 地震的纬度。                                                                                                          |
| longitude        | 地震的经度。                                                                                                          |
| source           | `ign_sismologia`，可与 `geo_location` 自动化触发器配合使用。                                                           |
| external\_id      | 订阅源中用于标识该地震事件的外部 ID。                                                                                 |
| title            | 订阅源中的原始标题。                                                                                                  |
| region           | 事件附近已命名地理区域的文字描述。                                                                                    |
| magnitude        | 上报的地震震级。                                                                                                      |
| publication\_date | 该事件发生的日期和时间。                                                                                              |
| image\_url        | 订阅源中提供的地图 URL，用于标记事件位置。例如可用于通知。                                                            |

## 完整配置

```yaml
# configuration.yaml 示例条目
geo_location:
  - platform: ign_sismologia
    radius: 100
    minimum_magnitude: 2.0
    latitude: 37.39
    longitude: -5.99
```
