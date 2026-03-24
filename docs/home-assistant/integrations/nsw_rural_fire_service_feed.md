---
title: NSW Rural Fire Service Incidents
description: "有关如何将新南威尔士州农村消防服务事件源集成到 Home Assistant 的说明。"

ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.81
ha_codeowners:
  - '@exxamalte'
ha_domain: nsw_rural_fire_service_feed
ha_platforms:
  - geo_location
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **NSW Rural Fire Service Incidents** integration lets you integrate a GeoJSON feed provided by the [NSW Rural Fire Service](https://www.rfs.nsw.gov.au/fire-information/fires-near-me) with information about bush fires, grass fires, hazard reductions and more. It retrieves incidents from a feed and shows information of those incidents filtered by distance to Home Assistant's location.

<p 类='img'>
  <img src='/home-assistant/images/screenshots/nsw-rural-fire-service-feed-entities.png' />
</p>

每次更新时都会自动生成、更新和删除实体。每个实体定义纬度和经度，并将自动显示在地图上。以公里为单位的距离可作为每个实体的状态。

<p 类='img'>
  <img src='/home-assistant/images/screenshots/nsw-rural-fire-service-feed-map.png' />
</p>

例如，您可以使用实体的信息根据火灾事件的邻近程度和严重程度触发操作。您可以设置自动化来关闭窗户、启动洒水器或提醒自己在您所在区域发生火灾时清理排水沟。

数据每 5 分钟更新一次。

## Configuration

To integrate the NSW Rural Fire Service Incidents feed, add the following lines to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: nsw_rural_fire_service_feed
```

```yaml
radius:
  description: The distance in kilometers around Home Assistant's coordinates in which incidents are included.
  required: false
  type: float
  default: 20.0
categories:
  description: List of incident category names found in the feed. Only incidents from the feed that match any of these categories are included. Valid categories are 'Emergency Warning', 'Watch and Act', 'Advice', 'Not Applicable'.
  required: false
  type: list
  default: None. Any incident regardless of its category will be included.
latitude:
  description: Latitude of the coordinates around which events are considered.
  required: false
  type: string
  default: Latitude defined in your `configuration.yaml`
longitude:
  description: Longitude of the coordinates around which events are considered.
  required: false
  type: string
  default: Longitude defined in your `configuration.yaml`
```

## State Attributes

除了标准属性之外，每个实体还可以使用以下状态属性：

| Attribute          | Description                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| latitude           | Latitude of the incident.                                                                       |
| longitude          | Longitude of the incident.                                                                      |
| source             | `nsw_rural_fire_service_feed` to be used in conjunction with `geo_location` automation trigger. |
| external_id        | The external ID used in the feed to identify the incident in the feed.                          |
| category           | One of 'Emergency Warning', 'Watch and Act', 'Advice', 'Not Applicable'.                        |
| location           | Location details of where the incident takes place.                                             |
| publication_date   | Date and time when this incident was last updated.                                              |
| council_area       | Council area in which this incident takes place.                                                |
| status             | One of 'Under Control', 'Being Controlled', 'Out of Control'.                                   |
| type               | Incident type, for example 'Bush Fire', 'Grass Fire' or 'Hazard Reduction'.                     |
| fire               | `True` if this incident is a fire, `False` otherwise.                                           |
| size               | Size in hectare                                                                                 |
| responsible_agency | Agency responsible for this incident.                                                           |

## 高级配置示例

根据您关于丛林火灾风险的个人情况，您可能需要调整半径并定义您真正感兴趣的火灾警告类别。

```yaml
# Example configuration.yaml entry
geo_location:
  - platform: nsw_rural_fire_service_feed
    entity_namespace: "nsw_fire_service_feed"
    radius: 10
    categories:
      - 'Emergency Warning'
      - 'Watch and Act'
      - 'Advice'
```
