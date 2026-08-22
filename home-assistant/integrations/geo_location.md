# Geolocation

地理位置感知实体通常与 Home Assistant 所在位置附近的现实世界事件有关，例如天气事件、丛林火灾或地震。

实体可以带有关联的地理坐标（纬度和经度），从而显示在地图上。还可以使用实体坐标与 Home Assistant 位置之间的距离进行筛选。

:::note Building block integration
This geolocation is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this geolocation building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the geolocation building block offers.
:::

## 地理位置触发器

[Geolocation trigger](/home-assistant/docs/automation/trigger/index.md#geolocation-trigger) 可用于基于地理位置实体进入或离开区域而触发的自动化。根据管理这些实体的平台不同，触发器中的 `source` 必须使用以下值：

| Platform                                              | Source                        |
|-------------------------------------------------------|-------------------------------|
| GeoJSON Events                                        | `geo_json_events`             |
| GeoNet New Zealand Quakes                             | `geonetnz_quakes`             |
| Global Disaster Alert and Coordination System (GDACS) | `gdacs`                       |
| IGN Sismología                                        | `ign_sismologia`              |
| NSW Rural Fire Service Incidents                      | `nsw_rural_fire_service_feed` |
| Queensland Bushfire Alert                             | `qld_bushfire`                |
| U.S. Geological Survey Earthquake Hazards Program     | `usgs_earthquakes_feed`       |

还可以使用条件进一步筛选实体，例如检查它们的状态属性。

## 地理位置通知示例

下面的自动化示例会在预定义的丛林火灾警报区域内报告出被分类为 `Bush Fire` 的火情时，在屏幕上创建一条通知：

```yaml
geo_location:
  - platform: nsw_rural_fire_service_feed
    categories:
      - 'Emergency Warning'
      - 'Watch and Act'
      - 'Advice'

zone:
  - name: Bush Fire Alert Zone
    latitude: -36.666667
    longitude: 149.833333
    radius: 15000
    passive: true

automation:
  - alias: "Bush Fire Alert"
    triggers:
      - trigger: geo_location
        source: nsw_rural_fire_service_feed
        zone: zone.bush_fire_alert_zone
        event: enter
    conditions:
      - condition: template
        value_template: "{{ trigger.to_state.attributes.type == 'Bush Fire' }}"
    actions:
      - action: persistent_notification.create
        data:
          message: "{{ trigger.to_state.name }} - {{ trigger.to_state.attributes.status }}"
          title: "Bush Fire Alert"
```
