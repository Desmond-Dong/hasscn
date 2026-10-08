# Taps Aff

The **Taps Aff** integration provides the 'Taps Aff' status for a given location within the UK using [Taps Aff](https://www.taps-aff.co.uk/).

## Configuration

To enable this integration, add the following lines to your "`configuration.yaml`" file.
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: tapsaff
    location: glasgow
```

```yaml
location:
  description: The location for the Taps Aff. It must be configured with a UK postcode or city to work.
  required: true
  type: string
name:
  description: The name to use when displaying this sensor.
  required: false
  type: string
  default: Taps Aff
```
