# WeatherflowCloud

**WeatherFlow Cloud** 集成可访问云端提供的 Tempest 气象站天气预报数据。要访问您的气象站，您需要使用 [API Key](https://weatherflow.github.io/Tempest/api/) 配置此集成。

### 我该使用哪个集成

WeatherFlow 设备有两个集成可用，您不必只选择其中一个。

* [WeatherFlow](/home-assistant/integrations/weatherflow.md) 是一个*仅限本地*、基于 `UDP` 的集成，会直接从设备读取数据。此集成要求 Home Assistant 服务器和 WeatherFlow 设备位于同一子网。

* [WeatherFlow Cloud](/home-assistant/integrations/weatherflow_cloud.md) 是一个基于*云端*的集成，与 WeatherFlow Tempest 移动应用中的数据非常接近。由于它同时提供 **Forecast** 和 **Sensor** 数据，因此通常是大多数用户不错的起点。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 温度传感器

| Sensor | Description |
| --- | --- |
| Dew point | 空气冷却到水汽饱和时的温度 |
| Feels like | 结合温度和湿度得出的体感温度指标 |
| Heat index | 将相对湿度与实际气温结合后表示“感觉有多热”的指标 |
| Temperature | 当前区域中的温度 |
| Wet bulb globe temperature | 用于估算温度、湿度、风速和太阳辐射对人体影响的综合温度 |
| Wet bulb temperature | 在当前环境条件下，仅通过水分蒸发所能达到的最低温度 |
| Wind chill | 低温空气流动导致人体感受到的体温下降 |

### 空气传感器

| Sensor | Description |
| --- | --- |
| Air density | 地球大气单位体积的质量 |
| Pressure barometric | 大气在地表施加的压力 |
| Pressure sea level | 平均海平面处的大气压力 |
| Pressure station | 气象站所在高度处的大气压力 |

### 闪电传感器

| Sensor | Description |
| --- | --- |
| Lightning count | 闪电总次数 |
| Lightning count last 1 hr | 过去 1 小时内的闪电次数 |
| Lightning count last 3 hr | 过去 3 小时内的闪电次数 |
| Lightning last | 最近一次闪电事件 |
| Lightning last distance | 最近一次闪电的距离 |

## 天气图标

Home Assistant 支持的天气状况与 Tempest 提供的天气图标之间并不存在完全一一对应的映射，因此您可能会看到 Tempest 应用中的显示与 Home Assistant 中的显示有所不同。

| Weather Flow icon | Home Assistant icon |
|-------------------|----------------------|
| clear-day | sunny |
| clear-night | clear-night |
| cloudy | cloudy |
| foggy | fog |
| partly-cloudy-day | partlycloudy |
| partly-cloudy-night | partlycloudy |
| possibly-rainy-day | rainy |
| possibly-rainy-night | rainy |
| possibly-sleet-day | snowy-rainy |
| possibly-sleet-night | snowy-rainy |
| possibly-snow-day | snowy |
| possibly-snow-night | snowy |
| possibly-thunderstorm-day | lightning-rainy |
| possibly-thunderstorm-night | lightning-rainy |
| rainy | rainy |
| sleet | snowy-rainy |
| snow | snowy |
| thunderstorm | lightning |
| windy | windy |
