# GeoRSS

**GeoRSS** 集成会从 GeoRSS feed 中获取事件，并根据与 Home Assistant 位置的距离进行筛选，再按类别分组显示这些事件的信息。

如果住宅附近发生了突发事件，而 GeoRSS feed 中又包含大量距离较远且无关的条目，那么此集成会特别有用。典型示例包括丛林火灾警报或地震。

<p class='img'>
  <img src='/home-assistant/images/screenshots/geo-rss-incidents-group-screenshot.png' />
</p>

用于比较距离的参考点默认由基础配置中的 `latitude` 和 `longitude` 定义。

只有在 feed 中以 *georss.org* 格式将位置定义为 `point` 或 `polygon`，或以 *WGS84 latitude/longitude* 形式提供位置的条目，才会被纳入考虑。

数据每 5 分钟更新一次。

## 配置

若要启用 GeoRSS 事件传感器，请将以下内容添加到您的 `configuration.yaml` 文件中。
以下示例配置展示了新南威尔士州乡村消防局的丛林火灾事件。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: geo_rss_events
    name: NSW Fire Service
    url: https://www.rfs.nsw.gov.au/feeds/majorIncidents.xml
    unit_of_measurement: "Incidents"
    categories:
      - 'Emergency Warning'
      - 'Watch and Act'
      - 'Advice'
```

```yaml
url:
  description: GeoRSS feed 的完整 URL。
  required: true
  type: string
name:
  description: 用于生成实体 ID 的传感器名称。
  required: false
  type: string
  default: Event Service
latitude:
  description: 用于判断事件范围的参考坐标纬度。
  required: false
  type: string
  default: 在您的 `configuration.yaml` 中定义的纬度
longitude:
  description: 用于判断事件范围的参考坐标经度。
  required: false
  type: string
  default: 在您的 `configuration.yaml` 中定义的经度
radius:
  description: 以 Home Assistant 坐标为中心、纳入事件的距离范围（单位：公里）。
  required: false
  type: string
  default: 20km
categories:
  description: GeoRSS feed 中的事件类别名称列表。每个定义的类别都会创建一个单独的传感器。
  required: false
  type: list
  default: 默认会将所有类别的事件合并到一个 `Any` 类别中。
unit_of_measurement:
  description: GeoRSS feed 中事件的类型。
  required: false
  type: string
  default: Events
```

## 示例 Feed

### 丛林火灾警报

```yaml
sensor:
  - platform: geo_rss_events
    name: Qld Fire and Emergency Services
    url: https://www.qfes.qld.gov.au/data/alerts/bushfireAlert.xml
    unit_of_measurement: "Alerts"
  - platform: geo_rss_events
    name: TasALERT
    url: https://alert.tas.gov.au/data/incidents-and-alerts.xml
    unit_of_measurement: "Alerts"
  - platform: geo_rss_events
    name: WA Department of Fire and Emergency Services
    url: https://www.emergency.wa.gov.au/data/incident_FCAD.rss
  - platform: geo_rss_events
    name: ACT Emergency Services Agency
    url: https://www.esa.act.gov.au/feeds/currentincidents.xml
```

### 地震警报

```yaml
sensor:
  - platform: geo_rss_events
    name: USGS All Earthquakes
    url: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.atom
    categories:
      - 'Past Hour'
      - 'Past Day'
  - platform: geo_rss_events
    name: BGS Worldwide Earthquakes
    url: http://earthquakes.bgs.ac.uk/feeds/WorldSeismology.xml
    categories:
      - 'EQMH'
  - platform: geo_rss_events
    name: Recent significant earthquake reports (Canada)
    url: https://www.earthquakescanada.nrcan.gc.ca/cache/earthquakes/canada-en.atom
    categories:
      - 'Earthquake Report'
```
