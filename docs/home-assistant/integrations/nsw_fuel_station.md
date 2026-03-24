---
title: NSW Fuel Station Price
description: "有关如何将新南威尔士州加油站价格集成到 Home Assistant 的说明。"

ha_category:
  - Car
ha_release: 0.72
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@nickw444'
ha_domain: nsw_fuel_station
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The **NSW Fuel Station Price** integration uses the [NSW Fuel Check App](https://www.fuelcheck.nsw.gov.au/app) data as a source for current fuel price data.

## Setup

要获取任何新南威尔士州加油站的加油站 ID，您需要：

- 访问[燃油检查应用程序](https://www.fuelcheck.nsw.gov.au/app)。
- 打开浏览器的开发者控制台（对于 Chrome，单击查看 -> 开发者 -> 开发者工具）。单击开发者控制台中的“网络”选项卡。
- 在燃油检查应用程序中，搜索您的邮政编码或单击“我附近的燃油”。
- 在开发者控制台中，您应该会看到对“/FuelCheckApp/v1/fuel/prices/bylocation”的请求。打开此请求并预览响应。找到您要添加的电台，然后复制“ServiceStationID”字段。

Alternatively:

- 选择您想要查找其 ID 的电台。
- 选择“报告该电台”。
- 在打开的新页面的 URL 中，找到“serviceStationId”。

## Configuration

To add the NSW fuel station price sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
sensor:
  - platform: nsw_fuel_station
    station_id: 291
```

```yaml
station_id:
  description: The ID of the station to track
  required: true
  type: string
fuel_types:
  description: A list of fuel types to track for the station. Must be one of `["E10", "U91", "E85", "P95", "P98", "DL", "PDL", "B20", "LPG", "CNG", "EV"]`. Descriptions of fuel types can be found [here](https://www.fuelcheck.nsw.gov.au/App/Home/FuelTypes).
  required: false
  default: "`['E10', 'U91']`"
  type: list
```
