---
title: London Air
description: 'London Air 集成会查询(https://api.erg.kcl.ac.uk/AirQuality/Hourly/MonitoringIndex/GroupName=London/Json) Kings College London 提供的伦敦空气质量数据源(https://www.londonair。'
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: 0.52
ha_domain: london_air
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# London Air

**London Air** 集成会[查询](https://api.erg.kcl.ac.uk/AirQuality/Hourly/MonitoringIndex/GroupName=London/Json) Kings College London 提供的伦敦空气质量[数据源](https://www.londonair.org.uk/LondonAir/API/)。配置文件中每指定一个 `location`（[地方行政区或 borough](https://en.wikipedia.org/wiki/List_of_London_boroughs)），就会添加一个对应传感器。每个传感器的状态表示该 borough 的整体空气质量。请注意，32 个 borough 中只有 28 个提供数据。

Borough 内可能包含多个位于不同地理位置的监测站点，而每个站点最多可监测六种不同污染物。污染物说明请参阅[这里](https://api.erg.kcl.ac.uk/AirQuality/Information/Species/Json)，包括一氧化碳 ([CO](https://www.londonair.org.uk/LondonAir/guide/WhatIsCO.aspx))、二氧化氮 ([NO2](https://www.londonair.org.uk/LondonAir/guide/WhatIsNO2.aspx))、臭氧 ([O3](https://www.londonair.org.uk/LondonAir/guide/WhatIsO3.aspx))、二氧化硫 ([SO2](https://www.londonair.org.uk/LondonAir/guide/WhatIsSO2.aspx))，以及 PM2.5 与 PM10 [颗粒物](https://www.londonair.org.uk/LondonAir/guide/WhatIsPM.aspx)。每个站点的 `latitude` 和 `longitude` 可通过传感器的 `data` 属性访问，该属性还包含该站点所监测污染物的详细信息。传感器的 `sites` 属性表示该传感器覆盖了多少个监测站点。`updated` 属性表示数据最近一次发布时间。理论上数据每小时发布一次，但实际情况可能会有所变化。为限制请求数量，该集成每 30 分钟只发起一次 API 请求。

要为所有可用区域/borough 在 Home Assistant 中添加传感器，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: london_air
    locations:
      - Barking and Dagenham
      - Bexley
      - Brent
      - Camden
      - City of London
      - Croydon
      - Ealing
      - Enfield
      - Greenwich
      - Hackney
      - Haringey
      - Harrow
      - Havering
      - Hillingdon
      - Islington
      - Kensington and Chelsea
      - Kingston
      - Lambeth
      - Lewisham
      - Merton
      - Redbridge
      - Richmond
      - Southwark
      - Sutton
      - Tower Hamlets
      - Wandsworth
      - Westminster
```

```yaml
locations:
  description: 要监控的伦敦区域/borough。
  required: false
  default: 所有有可用数据的位置。
  type: list
```

如果要探索传感器 `data` 属性中的可用数据，请使用 Home Assistant 前端中的 `dev-template` 工具。`data` 包含一个监测站点列表，而站点数量由 `sites` 属性给出。如果某个传感器有四个站点，则可以通过 `data[3]` 访问第四个站点。每个站点都是一个包含多个字段的字典，其中包括该站点的 `latitude`、`longitude`、`pollution_status`、`site_code`、`site_name` 和 `site_type`。`number_of_pollutants` 字段表示监测了多少种污染物（最多六种），而 `pollutants` 字段会返回每种污染物的数据列表。要访问第 0 个站点的第一个污染物，可使用 `attributes.data[0].pollutants[0]`。`pollutants` 中的每个条目都是一个字典，包含污染物的 `code`、`description`、`index`、`quality` 和 `summary` 等字段。您随后可以添加 [Template sensors](/home-assistant/integrations/template) 来显示这些属性，例如：


```yaml
# 模板传感器示例
template:
  - sensor:
    - name: "Updated"
      state: "{{ state_attr('sensor.merton', 'updated') }}"
    - name: "Merton PM10"
      state: "{{ state_attr('sensor.merton', 'data')[0].pollutants[0].summary }}"
    - name: "Westminster S02"
      state: "{{ state_attr('sensor.westminster', 'data')[0].pollutants[3].summary }}"
```


