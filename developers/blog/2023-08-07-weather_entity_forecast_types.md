`WeatherEntity` 现在允许单个 weather entity 支持不同的预报类型，这意味着不再需要为同一地点创建多个 entity，例如一个提供每日预报的 entity 和另一个提供每小时预报的 entity。

提供 `weather` entities 的集成应进行更新，以实现一个或多个新的 async 方法 `async_forecast_daily`、`async_forecast_hourly` 和 `async_forecast_twice_daily`。

对于即将到来的 Home Assistant Core 2024.3 版本，集成应移除已弃用的 `forecast` 属性，并移除为提供多种预报而添加的任何重复 weather entities。

请参阅[`weather` 开发者文档](/developers/core/entity/weather.md#weather-forecasts)，了解如何实现新的预报方法。

"Weather Forecast Card" 已更新，如果集成使用了新方法，将为用户提供选择要显示的偏好预报的选项。
