# Om Luftkvalitet i Norge (Norway Air)

The **Norway Air** integration [queries](https://luftkvalitet.miljostatus.no/) the Norway air quality [data feed](https://api.met.no/weatherapi/airqualityforecast/0.1/documentation) provided by the Norwegian Meteorological Institute.

To add the air quality integration to your installation, add the following to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/index.md#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# Example configuration.yaml entry
air_quality:
  - platform: norway_air
```

```yaml
name:
  description: Additional name for the sensor.
  required: false
  type: string
  default: Air quality
forecast:
  description: If you want to get forecast data instead of the current data, set this to the number of hours that you want to look into the future.
  required: false
  type: integer
latitude:
  description: Manually specify latitude.
  required: false
  type: float
  default: Provided by Home Assistant configuration
longitude:
  description: Manually specify longitude.
  required: false
  type: float
  default: Provided by Home Assistant configuration
```
