> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

# Google Air Quality

**Google Air Quality** 集成通过 Google Air Quality API 提供空气质量数据。

## 前提条件

您需要一个 API 密钥。请按照 [Google 开发者文档](https://developers.google.com/maps/documentation/air-quality/get-api-key)中的说明创建 API 密钥。
此外，您还需要创建一&#x4E2A;_&#x8BA1;费账户_。在编写本文档时，Google 每月允许免费调用 API 10,000 次。

:::warning
此集成每 60 分钟轮询一次。以下是不同坐标数量下每月 API 调用次数的概览：

| Coordinates | API calls per month |
| ----------- | ------------------- |
| 1           | 800                 |
| 2           | 1,600               |
| 3           | 2,400               |
| 4           | 3,200               |
| 5           | 4,000               |
| 10          | 8,000               |
| 12          | 9,600               |

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

- **Universal Air Quality Index (UAQI)**\
  _Google 提供的全球空气质量指数。范围从 0（最差）到 100（最佳）。_

- **UAQI Category**\
  _UAQI 的描述性分类。可能值包括：Excellent air quality、Good air quality、Moderate air quality、Low air quality、Poor air quality。_

- **UAQI Dominant Pollutant**\
  _对 UAQI 数值影响最大的污染物。可能值包括：PM2.5、PM10、Ozone (O₃)、Nitrogen Dioxide (NO₂)、Sulphur Dioxide (SO₂)、Carbon Monoxide (CO)。_

- **Local Air Quality Index**\
  _按区域校准后的 AQI 值。_

- **Local Category**\
  _本地 AQI 的描述性分类。其取值可能与 UAQI Category 不同。_

- **Local Dominant Pollutant**\
  _对本地 AQI 影响最大的污染物。其取值可能与 UAQI Dominant Pollutant 不同。_

- **Ammonia (CH₃)**\
  _氨浓度。_

- **Benzene (C₆H₆)**\
  _苯浓度。_

- **Carbon Monoxide (CO)**\
  _一氧化碳浓度。_

- **Nitrogen Dioxide (NO₂)**\
  _二氧化氮浓度。_

- **Nitrogen Monoxide (NO)**\
  _一氧化氮浓度。_

- **Non-methane hydrocarbons (NMHC)**\
  _非甲烷烃浓度。_

- **Ozone (O₃)**\
  _近地面臭氧浓度。_

- **PM2.5**\
  _直径小于 2.5 µm 的颗粒物。_

- **PM10**\
  _直径小于 10 µm 的颗粒物。_

- **Sulphur Dioxide (SO₂)**\
  _二氧化硫浓度。_

## 删除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
