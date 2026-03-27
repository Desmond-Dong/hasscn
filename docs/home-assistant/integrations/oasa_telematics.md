---
title: OASA Telematics
description: 'OASA Telematics 集成会使用 OASA Telematics(https://telematics.oasa.gr/en/) 的实时数据，为您提供希腊雅典公共交通的公交车和无轨电车到站时间。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.92
ha_domain: oasa_telematics
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# OASA Telematics

**OASA Telematics** 集成会使用 [OASA Telematics](https://telematics.oasa.gr/en/) 的实时数据，为您提供希腊雅典公共交通的公交车和无轨电车到站时间。

## 配置

将此集成添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 配置示例
sensor:
  - platform: oasa_telematics
    route_id: YOUR_ROUTE_ID
    stop_id: "YOUR_STOP_ID"
```

您可以先通过以下链接查找所需线路的 `LineCode`，以获取 `route_id`：

<__PROTECTED_13__>

然后通过以下链接获取 `RouteCode`：

`http://telematics.oasa.gr/api/?act=webGetRoutes&p1=LINE_CODE`（将 `LINE_CODE` 替换为您从第一个链接复制的 `LineCode`），找到所需线路并复制 `RouteCode` 字段。

接下来，通过以下链接获取 `stop_id`：

`http://telematics.oasa.gr/api/?act=webGetStops&p1=ROUTE_CODE`（将 `ROUTE_CODE` 替换为您上一步获取的 `RouteCode`），找到所需站点并复制 `StopID` 字段。该线路必须经过此站点，传感器才能正常工作。

```yaml
route_id:
  description: 公共交通线路的 ID。
  required: true
  type: integer
stop_id:
  description: 公共交通站点的 ID。
  required: true
  type: string
name:
  description: 此传感器的友好名称。
  required: false
  default: OASA Telematics
  type: string
```

## 示例

以下是一个更完整的传感器使用示例：

```yaml
# `configuration.yaml` 配置示例
sensor:
  - platform: oasa_telematics
    route_id: 1965
    stop_id: "090006"
```
