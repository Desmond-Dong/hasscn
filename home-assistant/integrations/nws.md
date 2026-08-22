# National Weather Service (NWS)

The **NWS** integration uses the [National Weather Service](https://www.weather.gov) web API as a source for meteorological data for your location.

## Configuration

To add the **National Weather Service (NWS)** service to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nws)

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nws).
* From the list, select **National Weather Service (NWS)**.
* Follow the instructions on screen to complete the setup.

</details>

根据[API文档](https://www.weather.gov/documentation/services-web-api/)，API密钥需要一个字符串，建议在字符串中包含电子邮件地址。

提供 METAR 站点代码是可选的，如果未提供，将选择最接近纬度和经度的站点。如果没有提供电台，附近电台的列表将以“DEBUG”级别打印到日志中。也可以在[NOAA网站](https://www.cnrfc.noaa.gov/metar.php)上找到站点。仅包含三个字符的代码（例如“ADW”）应以字母 K、“KADW”作为前缀。

为配置中的每个条目创建一个天气实体。通过 [`weather.get_forecasts` 操作](/home-assistant/integrations/weather.md#action-weatherget_forecasts) 提供每小时和日/夜预报。为每个预测提供的时间是预测的开始时间。传感器在配置后也会被创建为禁用实体，并且可由用户启用。

## 操作 `nws.get_forecasts_extra`

`nws.get_forecasts_extra` 以类似于 `weather.get_forecasts` 的形式提供额外数据。请参阅 [`weather.get_forecasts` 文档](/home-assistant/integrations/weather.md#action-weatherget_forecasts)。

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `type` | no | The type of forecast, must be either `twice_daily` or `hourly`. | `twice_daily` |

```yaml
action: nws.get_forecasts_extra
target:
  entity_id:
    - weather.khou
data:
  type: twice_daily
response_variable: weather_forecast
```

响应数据字段是被调用目标实体的映射，每个目标实体都包含“预测”字段。
“forecast”是给定时间点的预测条件列表，这些条件不是从“weather.get\_forecasts”返回的。  仍为上下文提供“datetime”和“is\_daytime”属性。

| Response data | Description | Example |
| ---------------------- | ----------- | -------- |
| `datetime` | The time of the forecasted conditions. | 2023-02-17T14:00:00+00:00 |
| `is_daytime` | Only set for `twice_daily` forecasts. | True |
| `detailed_description` | Only set for `twice_daily` forecasts. | 50% Chance of rain, otherwise partly cloudy with a high of 75F. |
| `short_description` | Short weather condition | Partly Sunny then Slight Chance Showers And Thunderstorms |

## Details

有关 API 的详细信息，请参阅 [NWS API 文档](https://www.weather.gov/documentation/services-web-api)。 [pynws](https://github.com/MatthewFlamm/pynws) 库用于检索数据。
