从 [`homeassistant.components.weather.WeatherEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/weather/__init__.py) 派生 entity platforms。

## 属性

:::tip
Properties 应始终只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| cloud\_coverage | int | `None` | 当前的 cloud coverage（%）。
| condition | string | **必需** | 当前的 weather condition。
| humidity | float | `None` | 当前的 humidity（%）。
| native\_apparent\_temperature | float | `None` | 当前的 apparent（体感）temperature，单位为 °C 或 °F。
| native\_dew\_point | float | `None` | 当前的 dew point temperature，单位为 °C 或 °F。
| native\_precipitation\_unit | string | `None` | 降水计量单位；mm 或 in。
| native\_pressure | float | `None` | 当前的 air pressure，单位为 hPa、mbar、inHg 或 mmHg。
| native\_pressure\_unit | string | `None` | Air pressure 单位；hPa、mbar、inHg 或 mmHg。如果设置了 native\_pressure，则为必需。
| native\_temperature | float | **必需** | 当前的 temperature，单位为 °C 或 °F。
| native\_temperature\_unit | string | **必需** | Temperature 单位；°C 或 °F。
| native\_visibility | float | `None` | 当前的 visibility，单位为 km 或 mi。
| native\_visibility\_unit | string | `None` | Visibility 单位；km 或 mi。如果设置了 native\_visibility，则为必需。
| native\_wind\_gust\_speed | float | `None` | 当前的 wind gust speed，单位为 Beaufort、m/s、km/h、mi/h、ft/s 或 kn。
| native\_wind\_speed | float | `None` | 当前的 wind speed，单位为 Beaufort、m/s、km/h、mi/h、ft/s 或 kn。
| native\_wind\_speed\_unit | string | `None` | Wind speed 单位；Beaufort、m/s、km/h、mi/h、ft/s 或 kn。如果设置了 native\_wind\_speed，则为必需。
| ozone | float | `None` | 当前的 ozone 浓度。
| uv\_index | float | `None` | 当前的 [UV index](https://en.wikipedia.org/wiki/Ultraviolet_index)。
| wind\_bearing | float or string | `None` | 当前的 wind bearing，表示为 azimuth angle（度数）或 1-3 字母的 cardinal direction。

### 单位转换

Properties 必须遵循表中各自计量单位所提及的单位。

对于用户，properties 将根据 unit system 进行呈现。这是通过创建 state objects 时自动转换单位来实现的。

对于每个 weather entity，用户还可以选择覆盖 presentation units，即 state objects 中使用的单位。

### state 和 condition 的推荐值

以下 weather conditions 已包含在我们的 translation files 中，并会显示相应的 icon。

| Condition | Description
| --------- | -----------
| clear-night | 晴朗的夜空
| cloudy | 多云
| exceptional | 极端天气
| fog | 雾
| hail | 冰雹
| lightning | 雷电 / 雷暴
| lightning-rainy | 雷电 / 雷暴并伴随降雨
| partlycloudy | 少云
| pouring | 倾盆大雨
| rainy | 下雨
| snowy | 下雪
| snowy-rainy | 雨夹雪
| sunny | 晴天
| windy | 有风
| windy-variant | 有风并伴随云层

这意味着 `weather` platforms 不需要自己支持各种语言。

## 支持的功能

Supported features 通过使用 `WeatherEntityFeature` enum 中的值来定义，
并使用按位或（`|`）运算符组合。

| Value | Description |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `FORECAST_DAILY` | Device 支持 daily forecast。 |
| `FORECAST_HOURLY` | Device 支持 hourly forecast。 |
| `FORECAST_TWICE_DAILY` | Device 支持 twice-daily forecast。 |

## 天气预报

Weather platform 可以选项性地提供 weather forecasts。对 weather forecasts 的支持通过设置正确的 [supported feature](#supported-features) 来指示。Weather forecasts 不属于 entity 的 state，而是通过单独的 API 提供。Consumer（例如 frontend）可以订阅 weather forecast updates。

### 预报数据

Forecast data 可以是 daily、hourly 或 twice\_daily。集成可以提供其中任意一种或全部。

集成应实现下面文档中说明的一个或多个异步方法 `async_forecast_daily`、`async_forecast_hourly` 和 `async_forecast_twice_daily` 来获取 forecast data。

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| datetime | string | **必需** | UTC datetime，格式为 RFC 3339。
| is\_daytime | bool | `None` | `async_forecast_twice_daily` 返回的 forecast data 中必需，用于指示是白天还是夜晚。
| cloud\_coverage | int | `None` | Cloud coverage（%）。
| condition | string | `None` | 该 time point 的 weather condition。
| humidity | float | `None` | Humidity（%）。
| native\_apparent\_temperature | float | `None` | Apparent（体感）temperature，单位为 °C 或 °F。
| native\_dew\_point | float | `None` | Dew point temperature，单位为 °C 或 °F。
| native\_precipitation | float | `None` | 降水量，单位为 mm 或 in。
| native\_pressure | float | `None` | Air pressure，单位为 hPa、mbar、inHg 或 mmHg。
| native\_temperature | float | **必需** | 较高 temperature，单位为 °C 或 °F。
| native\_templow | float | `None` | 日间较低 temperature，单位为 °C 或 °F。
| native\_wind\_gust\_speed | int | `None` | Wind gust speed，单位为 Beaufort、m/s、km/h、mi/h、ft/s 或 kn。
| native\_wind\_speed | int | `None` | Wind speed，单位为 Beaufort、m/s、km/h、mi/h、ft/s 或 kn。
| precipitation\_probability | int | `None` | 降水概率（%）。
| uv\_index | float | `None` | UV index。
| wind\_bearing | float or string | `None` | Wind bearing，表示为 azimuth angle（度数）或 1-3 字母的 cardinal direction。

Forecast data 在适用的情况下，需要遵循与 properties 定义相同的计量单位。

### 获取天气预报的方法

调用这些 methods 以从 api 获取 forecasts。

```python
class MyWeatherEntity(WeatherEntity):
    """Represent a Weather entity."""

    async def async_forecast_daily(self) -> list[Forecast] | None:
        """返回 daily forecast，使用 native units。

        仅在设置了 `WeatherEntityFeature.FORECAST_DAILY` 时实现此方法
        """

    async def async_forecast_twice_daily(self) -> list[Forecast] | None:
        """返回 twice daily forecast，使用 native units。

        仅在设置了 `WeatherEntityFeature.FORECAST_TWICE_DAILY` 时实现此方法
        """

    async def async_forecast_hourly(self) -> list[Forecast] | None:
        """返回 hourly forecast，使用 native units。

        仅在设置了 `WeatherEntityFeature.FORECAST_HOURLY` 时实现此方法
        """
```

### 更新天气预报

强烈建议 weather entity 缓存获取到的 weather forecasts，以避免不必要的 API 访问。

当有新的 weather forecast 可用时，应使 weather forecast cache 失效，并 `await` `WeatherEntity.async_update_listeners` 方法，以触发将更新后的 weather forecast 推送到所有 active subscribers。如果有 active listeners，`WeatherEntity.async_update_listeners` 将调用相应的 `async_forecast_xxx` methods。如果没有 active listeners，`WeatherEntity.async_update_listeners` 不会调用任何 `async_forecast_xxx` methods。
