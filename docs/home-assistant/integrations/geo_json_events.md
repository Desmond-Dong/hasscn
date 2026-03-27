---
title: GeoJSON
description: 'GeoJSON 集成可让您导入 GeoJSON feed 中的事件。它会从 feed 中获取事件，并根据与 Home Assistant 位置的距离筛选后显示这些事件的信息。 GeoJSON feed 中的所有条目都必须定义 geometry，通常是带有地理坐标的点或多边形。'
ha_category:
  - Geolocation
ha_iot_class: Cloud Polling
ha_release: 0.79
ha_config_flow: true
ha_codeowners:
  - '@exxamalte'
ha_domain: geo_json_events
ha_platforms:
  - geo_location
ha_integration_type: service
---
# GeoJSON

**GeoJSON** 集成可让您导入 GeoJSON feed 中的事件。它会从 feed 中获取事件，并根据与 Home Assistant 位置的距离筛选后显示这些事件的信息。
GeoJSON feed 中的所有条目都必须定义 `geometry`，通常是带有地理坐标的点或多边形。此外，此平台会在条目的 `properties` 中查找 `title` 键，并将其用作实体名称。

每次 GeoJSON feed 更新时，实体都会自动创建、更新和删除。每个实体都定义了纬度和经度，并会自动显示在地图上。以公里为单位的距离将作为每个实体的状态提供。

数据每 5 分钟更新一次。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 状态属性

除标准属性外，每个实体还具有以下状态属性：

| Attribute   | Description                                                                         |
|-------------|-------------------------------------------------------------------------------------|
| latitude    | 事件的纬度。                                                                        |
| longitude   | 事件的经度。                                                                        |
| source      | `geo_json_events`，与 `geo_location` 自动化触发器配合使用。                         |
| external_id | feed 中用于标识该事件的外部 ID。                                                    |
