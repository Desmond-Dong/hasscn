---
title: RMV
description: 'RMV 集成会为您提供 Rhein-Main 地区公共交通网络中下一个站点的下一班公交、有轨电车、地铁或火车的发车时间。线路编号和目的地等附加信息会显示在属性中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Transport
ha_release: 0.76
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@cgtobi'
ha_domain: rmvtransport
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# RMV

**RMV** 集成会为您提供 Rhein-Main 地区公共交通网络中下一个站点的下一班公交、有轨电车、地铁或火车的发车时间。线路编号和目的地等附加信息会显示在属性中。

## 设置

请访问 [RMV OpenData 网站](https://opendata.rmv.de) 查找有效站点 ID 列表。您需要使用其中的 `HAFAS_ID`。

## 配置

要启用此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: rmvtransport
    next_departure:
     - station: STATION_OR_STOP_ID
```

```yaml
timeout:
  description: 指定 API 调用的超时时间。
  required: false
  default: 10
  type: integer
next_departure:
  description: 一个或多个发车传感器。
  required: true
  type: list
  keys:
    name:
      description: 在前端中使用的名称。
      required: false
      default: 默认值为站点名称。
      type: string
    station:
      description: "站点或车站的 ID，例如 `3000010`。"
      required: true
      type: string
    destinations:
      description: "一个或多个终点站名称，例如 `Frankfurt (Main) Hauptbahnhof` 或 `['Frankfurt (Main) Hauptbahnhof','Frankfurt (Main) Stadion']`。可用于仅考虑特定方向的行程。"
      required: false
      type: [string]
    direction:
      description: "某个站点或车站的 ID，例如 `3000912`。可用于仅考虑特定方向的行程。"
      required: false
      type: [string]
    lines:
      description: "一个或多个线路编号，例如 `'S8'` 或 `['S8', 'RB33', '41']`"
      required: false
      type: [string, integer]
    products:
      description: "一种或多种交通方式 `['U-Bahn', 'Tram', 'Bus', 'S', 'RB', 'RE', 'EC', 'IC', 'ICE']`。"
      required: false
      default: ['U-Bahn', 'Tram', 'Bus', 'S', 'RB', 'RE', 'EC', 'IC', 'ICE']
      type: [string]
    time_offset:
      description: 不显示在该分钟数之内即将发车的班次。如果您距离站点还有几分钟路程，这项配置会很有用。
      required: false
      default: 0
      type: integer
    max_journeys:
      description: 指定返回的最大行程数量。
      required: false
      default: 5
      type: integer
```

## 示例

### 完整配置

下面的示例展示了一个完整配置，其中包含多个传感器，用于演示各种配置选项。

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: rmvtransport
    scan_interval: 120
    timeout: 10
    next_departure:
      - station: 3000010
        time_offset: 5
        destinations:
          - 'Frankfurt (Main) Flughafen Regionalbahnhof'
          - 'Frankfurt (Main) Stadion'
        products:
          - 'RB'
          - 'RE'
          - 'Bus'
          - 'S'
      - station: 3006907
        products: "Bus"
        destinations: ['Wiesbaden Dernsches Gelände', 'Mainz Hauptbahnhof']
        name: Destination
      - station: 3006904
        lines: "S8"
        max_journeys: 5
        products: "S"
      - station: 3001830
        time_offset: 15
        direction: 3000010
```

第一个传感器将返回从 Frankfurt Hauptbahnhof 发往 Frankfurt Airport 或 Stadium、且至少在 5 分钟后发车的 S-Bahn、公交、RB 和 RE 班次。

第二个传感器返回从 Wiesbaden Hauptbahnhof 出发、前往 Dernsches Gelände 和 Mainz Hauptbahnhof 的公交班次。若要获取第二班车的时间，可以使用 `state_attr('sensor.ENTITY_NAME', 'departures')[1].time`。

第三个传感器返回 Mainz Hauptbahnhof 的所有 S8 线路 S-Bahn 班次。

第四个传感器返回从 Niederrad Bahnhof 出发，前往或途经 Frankfurt Hauptbahnhof 的所有连接。
