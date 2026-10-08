# GeoSphere Austria

**GeoSphere Austria** 集成使用奥地利气象服务机构 [GeoSphere Austria](https://www.geosphere.at) 发布的气象数据。

通过此集成，您可以获取奥地利境内最多 228 个不同 GeoSphere 站点的气象站数据。此集成使用 [datahub-api](https://dataset.api.hub.geosphere.at/v1/docs/index.html)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

Home Assistant 目前支持以下设备类型：

* **Weather** - 显示当前温度、湿度、气压和风速，但不支持天气状况，而这通常是 `weather` 平台的关键功能。
* **[Sensor](#sensor)**

## 传感器

此集成提供以下传感器：

| 名称 | 说明 |
| ---- | ---- |
| Temperature | 温度，单位为 °C |
| Temperature Average | 平均温度，单位为 °C |
| Humidity | 湿度，单位为 % |
| Dew Point | 露点，单位为 °C |
| Dew Point Average | 平均露点，单位为 °C |
| Pressure | 站点气压，单位为 hPa |
| Pressure at Sea Level | 海平面气压，单位为 hPa |
| Wind Speed | 风速，单位为 km/h |
| Top Wind Speed | 最大风速，单位为 km/h |
| Wind Bearing | 风向，单位为 ° |
| Top Wind Bearing | 最大风速时的风向，单位为 ° |
| Sun Last 10 Minutes | 过去 10 分钟的日照时长，单位为秒 |
| Precipitation | 降水量，单位为 mm |
| Snow | 降雪量，单位为 cm |
| Global Radiation | 过去 10 分钟的总辐射，单位为 W/m² |

:::note
并非每个站点都支持所有传感器。

:::
