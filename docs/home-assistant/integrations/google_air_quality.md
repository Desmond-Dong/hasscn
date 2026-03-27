---
title: Google Air Quality
description: 'Google Air Quality 集成通过 Google Air Quality API 提供空气质量数据。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_release: 2025.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Thomas55555'
ha_platforms:
  - sensor
ha_integration_type: service
ha_domain: google_air_quality
ha_quality_scale: bronze
---
# Google Air Quality

**Google Air Quality** 集成通过 Google Air Quality API 提供空气质量数据。

## 前提条件

您需要一个 API 密钥。请按照 [Google 开发者文档](https://developers.google.com/maps/documentation/air-quality/get-api-key)中的说明创建 API 密钥。
此外，您还需要创建一个*计费账户*。在编写本文档时，Google 每月允许免费调用 API 10,000 次。

:::warning
此集成每 60 分钟轮询一次。以下是不同坐标数量下每月 API 调用次数的概览：

Coordinates | API calls per month
----------- | -------------------
1           | 800
2           | 1,600
3           | 2,400
4           | 3,200
5           | 4,000
10          | 8,000
12          | 9,600

请注意，Home Assistant 每次重启都会对每个坐标/条目额外产生一次 API 调用。

您可以为计费账户设置[预算](https://cloud.google.com/billing/docs/how-to/budgets)。这不会限制您的费用，但可以在达到预算时收到提醒。
您也可以考虑设置[通过通知禁用计费](https://cloud.google.com/billing/docs/how-to/disable-billing-with-notifications)。但从产生费用到收到预算通知之间，仍可能继续产生费用。

请务必监控费用。如果请求过多，您将被收取费用。此集成无法替您监控这些情况。
:::


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

### 传感器

如果所选区域支持，此集成将创建以下传感器。
有关本地空气质量的更多详情，请参阅[这里](https://developers.google.com/maps/documentation/air-quality/laqis)。

- **Universal Air Quality Index (UAQI)**  
  *Google 提供的全球空气质量指数。范围从 0（最差）到 100（最佳）。*

- **UAQI Category**  
  *UAQI 的描述性分类。可能值包括：Excellent air quality、Good air quality、Moderate air quality、Low air quality、Poor air quality。*

- **UAQI Dominant Pollutant**  
  *对 UAQI 数值影响最大的污染物。可能值包括：PM2.5、PM10、Ozone (O₃)、Nitrogen Dioxide (NO₂)、Sulphur Dioxide (SO₂)、Carbon Monoxide (CO)。*

- **Local Air Quality Index**  
  *按区域校准后的 AQI 值。*

- **Local Category**  
  *本地 AQI 的描述性分类。其取值可能与 UAQI Category 不同。*

- **Local Dominant Pollutant**  
  *对本地 AQI 影响最大的污染物。其取值可能与 UAQI Dominant Pollutant 不同。*

- **Ammonia (CH₃)**  
  *氨浓度。*

- **Benzene (C₆H₆)**  
  *苯浓度。*

- **Carbon Monoxide (CO)**  
  *一氧化碳浓度。*

- **Nitrogen Dioxide (NO₂)**  
  *二氧化氮浓度。*

- **Nitrogen Monoxide (NO)**  
  *一氧化氮浓度。*

- **Non-methane hydrocarbons (NMHC)**  
  *非甲烷烃浓度。*

- **Ozone (O₃)**  
  *近地面臭氧浓度。*

- **PM2.5**  
  *直径小于 2.5 µm 的颗粒物。*

- **PM10**  
  *直径小于 10 µm 的颗粒物。*

- **Sulphur Dioxide (SO₂)**  
  *二氧化硫浓度。*


## 删除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
