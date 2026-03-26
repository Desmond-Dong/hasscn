---
title: 天气实体
sidebar_label: 天气
---

平台实体派生自[`homeassistant.components.weather.WeatherEntity`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/weather/__init__.py)。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| cloud_coverage | int | `None` | 当前云覆盖率（%）。
| condition | string | **Required** | 当前的天气状况。
| humidity | float | `None` | 当前湿度（%）。
| native_apparent_temperature | float | `None` | 当前表观（感觉）温度，单位为 °C 或 °F。
| native_dew_point | float | `None` | 露点温度，单位为 °C 或 °F。
| native_precipitation_unit | string | `None` | 降水量单位；毫米或英寸。
| native_pressure | float | `None` | 当前气压，单位为 hPa、mbar、inHg 或 mmHg。
| native_pressure_unit | string | `None` | 气压单位；hPa、mbar、inHg 或 mmHg。如果设置了 `native_pressure`，则该属性为必填项。
| native_temperature | float | **Required** | 当前温度，单位为 °C 或 °F。
| native_temperature_unit | string | **Required** | 温度单位； °C 或 °F。
| native_visibility | float | `None` | 当前能见度（以公里或英里为单位）。
| native_visibility_unit | string | `None` | 能见度单位；公里或英里。如果设置了 `native_visibility`，则该属性为必填项。
| native_wind_gust_speed | float | `None` | 当前阵风速度，单位为 m/s、km/h、mi/h、ft/s 或 kn。
| native_wind_speed | float | `None` | 当前风速，单位为 m/s、km/h、mi/h、ft/s 或 kn。
| native_wind_speed_unit | string | `None` | 风速单位；m/s、km/h、mi/h、ft/s 或 kn。如果设置了 `native_wind_speed`，则该属性为必填项。
| ozone | float | `None` | 目前的臭氧水平。
| uv_index | float | `None` | 当前[紫外线指数](https://en.wikipedia.org/wiki/Ultraviolet_index)。
| wind_bearing | float or string | `None` | 当前风向的方位角（度）或 1-3 个字母的基本方向。

### 单位换算

属性必须遵循表中相应测量单位中提到的单位。

对于用户来说，属性将按照单位制呈现。这是通过在创建状态对象时自动转换单位来实现的。

对于每个天气实体，用户还可以选择覆盖表示单位，即状态对象中使用的单位。

### 状态和条件的推荐值

这些天气状况包含在我们的翻译文件中，并显示相应的图标。

| 条件 | 说明
| --------- | -----------
| clear-night | 晴夜
| cloudy | 多云
| exceptional | 极端天气
| fog | 有雾
| hail | 冰雹
| lightning | 闪电/雷暴
| lightning-rainy | 闪电/雷暴和降雨
| partlycloudy | 局部多云
| pouring | 倾盆大雨
| rainy | 雨
| snowy | 雪
| snowy-rainy | 雪和雨
| sunny | 晴朗
| windy | 风
| windy-variant | 多风有云

这意味着 `weather` 平台本身不需要处理语言本地化。

## 支持的功能

支持的功能通过使用 `WeatherEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `FORECAST_DAILY` | 该设备支持每日预报。 |
| `FORECAST_HOURLY` | 该设备支持每小时预报。 |
| `FORECAST_TWICE_DAILY` | 该设备支持每日两次预报。 |

## 天气预报

天气平台可以选择提供天气预报。通过设置正确的[支持的功能](#支持的功能)来表明支持天气预报。天气预报不是实体状态的一部分，而是通过单独的 API 提供；前端等消费者可以订阅天气预报更新。

### 预测数据

预测数据可以是每日、每小时或每日两次。集成可以提供其中任何一个或全部。

集成应实现下面记录的一种或多种异步方法 `async_forecast_daily`、`async_forecast_hourly` 和 `async_forecast_twice_daily` 来获取预测数据。

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| datetime | string | **Required** | RFC 3339 格式的 UTC 日期时间。
| is_daytime | bool | `None` | 这在 `async_forecast_twice_daily` 返回的预报数据中是强制性的，以指示白天或夜晚。
| cloud_coverage | int | `None` | 云覆盖率（%）。
| condition | string | `None` | 此时的天气状况。
| humidity | float | `None` | 湿度（%）。
| native_apparent_temperature | float | `None` | 表观（感觉）温度，单位为 °C 或 °F
| native_dew_point | float | `None` | 露点温度，单位为 °C 或 °F
| native_precipitation | float | `None` | 降水量以毫米或英寸为单位。
| native_pressure | float | `None` | 气压，单位为 hPa、mbar、inHg 或 mmHg。
| native_temperature | float | **Required** | 较高温度（°C 或 °F）
| native_templow | float | `None` | 每日较低温度（°C 或 °F）
| native_wind_gust_speed | int | `None` | 阵风速度，单位为 m/s、km/h、mi/h、ft/s 或 kn。
| native_wind_speed | int | `None` | 风速，单位为 m/s、km/h、mi/h、ft/s 或 kn。
| precipitation_probability | int | `None` | 降水概率（%）。
| uv_index | float | `None` | 紫外线指数。
| wind_bearing | float or string | `None` | 方位角（度）或 1-3 个字母基本方向的风向。

预测数据需要遵循与属性定义相同的测量单位（如果适用）。

### 获取天气预报的方法

调用这些方法是为了从 API 获取预测。

```python
class MyWeatherEntity(WeatherEntity):
    """Represent a Weather entity."""

    async def async_forecast_daily(self) -> list[Forecast] | None:
        """Return the daily forecast in native units.
        
        Only implement this method if `WeatherEntityFeature.FORECAST_DAILY` is set
        """

    async def async_forecast_twice_daily(self) -> list[Forecast] | None:
        """Return the twice daily forecast in native units.
        
        Only implement this method if `WeatherEntityFeature.FORECAST_TWICE_DAILY` is set
        """

    async def async_forecast_hourly(self) -> list[Forecast] | None:
        """Return the hourly forecast in native units.
        
        Only implement this method if `WeatherEntityFeature.FORECAST_HOURLY` is set
        """
```

### 更新天气预报

强烈建议天气实体缓存获取的天气预报，以避免不必要的 API 访问。

当更新的天气预报可用时，天气预报缓存应该失效，并且应该等待方法 `WeatherEntity.async_update_listeners` 来触发将更新的天气预报推送到任何活动订阅者。如果有活动监听器，`WeatherEntity.async_update_listeners` 将调用相应的 `async_forecast_xxx` 方法。如果没有活动侦听器，`WeatherEntity.async_update_listeners` 将不会调用 `async_forecast_xxx` 的任何方法。
