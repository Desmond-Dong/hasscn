---
title: NOAA Tides
description: "将 NOAA 潮汐信息添加到 Home Assistant 的说明。"

ha_category:
  - Environment
ha_release: 0.75
ha_iot_class: Cloud Polling
ha_domain: noaa_tides
ha_codeowners:
  - '@jdelaney72'
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

**NOAA Tides** integration 使用 [NOAA Tides and Currents](https://tidesandcurrents.noaa.gov/api/) 的数据，为美国境内任意地点提供潮汐预报信息。

## 设置

此 integration 需要使用 NOAA 站点 ID。您可以在 [NOAA Tide Predictions](https://tidesandcurrents.noaa.gov/tide_predictions.html) 中搜索地点，并在配置中使用搜索结果中的 ID。或者，您也可以从 URL 中提取站点 ID。例如，以下 URL 中的 `8721164`：`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8721164`

## 配置

要使用此 integration，请将以下内容添加到您的 `configuration.yaml` 文件中。
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: noaa_tides
    station_id: 8721164
```

```yaml
station_id:
  description: 您希望追踪的站点在 <https://tidesandcurrents.noaa.gov/tide_predictions.html> 中对应的 ID。
  required: true
  type: string
name:
  description: 用户自定义的传感器名称。
  required: false
  default: NOAA Tides。
  type: string
time_zone:
  description: 用户选择的时区。
  required: false
  default: 本地标准时间/本地夏令时。
  type: list
  keys:
    gmt:
      description: 格林威治标准时间。
    lst:
      description: 本地标准时间，即请求站点所在的本地时间。
    lst_ldt:
      description: 本地标准时间/本地夏令时，即请求站点所在的本地时间。
unit_system:
  description: 指定单位制。使用 `metric`（摄氏度、米、厘米/秒）或 `english`（华氏度、英尺、节）。
  required: false
  default: 根据 Home Assistant 配置默认使用 `metric` 或 `imperial`。
  type: string
```
