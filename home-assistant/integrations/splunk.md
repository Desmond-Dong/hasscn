# Splunk

[Splunk](https://www.splunk.com/) is a data platform for searching, monitoring, and analyzing machine-generated data. The **Splunk** integration sends all Home Assistant state changes to a Splunk instance using the [HTTP Event Collector (HEC)](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector) feature.

## Prerequisites

* A Splunk instance (version 6.3 or later) that is network-accessible from Home Assistant.
* The HTTP Event Collector (HEC) must be enabled and a token created. To set this up in Splunk:
  1. Go to **Settings** > **Data inputs**.
  2. Select **HTTP Event Collector**.
  3. Select **Global Settings** and ensure HEC is **Enabled**.
  4. Select **New Token** and follow the prompts to create a token for Home Assistant.
  5. Copy the generated token value for use in the configuration below.

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Token:
  description: "The HTTP Event Collector (HEC) token created in your Splunk instance."
Host:
  description: "The hostname or IP address of your Splunk instance."
Port:
  description: "The port of the HTTP Event Collector on your Splunk instance."
Use SSL:
  description: "Whether to use HTTPS to connect to your Splunk instance."
Verify SSL certificate:
  description: "Whether to verify the SSL certificate of your Splunk instance."
Name:
  description: "A friendly name to send to Splunk as the host, instead of the name of the HTTP Event Collector."
```

## Filters

Optionally, add the following lines to your "`configuration.yaml`" file for filtering which entities are sent to Splunk:

:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry with entity filter
splunk:
  filter:
    include_domains:
      - sensor
      - binary_sensor
```

```yaml
filter:
  description: Filters for entities to be included/excluded from Splunk. Default is to include all entities. ([Configuring a filter](#configuring-a-filter))
  required: false
  type: map
  keys:
    include_domains:
      description: Domains to be included.
      required: false
      type: list
    include_entity_globs:
      description: Include all entities matching a listed pattern (e.g., `sensor.weather_*`).
      required: false
      type: list
    include_entities:
      description: Entities to be included.
      required: false
      type: list
    exclude_domains:
      description: Domains to be excluded.
      required: false
      type: list
    exclude_entity_globs:
      description: Exclude all entities matching a listed pattern (e.g., `sensor.weather_*`).
      required: false
      type: list
    exclude_entities:
      description: Entities to be excluded.
      required: false
      type: list
```

### Configuring a filter

By default, no entity will be excluded. To limit which entities are exposed to Splunk, you can use the `filter` parameter.

```yaml
# Example filter to include specified domains and exclude specified entities
splunk:
  filter:
    include_domains:
      - alarm_control_panel
      - light
    include_entity_globs:
      - binary_sensor.*_occupancy
    exclude_entities:
      - light.kitchen_light
```

Filters are applied as follows:

1. No filter
   * All entities included
2. Only includes
   * Entity listed in entities include: include
   * Otherwise, entity matches domain include: include
   * Otherwise, entity matches glob include: include
   * Otherwise: exclude
3. Only excludes
   * Entity listed in exclude: exclude
   * Otherwise, entity matches domain exclude: exclude
   * Otherwise, entity matches glob exclude: exclude
   * Otherwise: include
4. Domain and/or glob includes (may also have excludes)
   * Entity listed in entities include: include
   * Otherwise, entity listed in entities exclude: exclude
   * Otherwise, entity matches glob include: include
   * Otherwise, entity matches glob exclude: exclude
   * Otherwise, entity matches domain include: include
   * Otherwise: exclude
5. Domain and/or glob excludes (no domain and/or glob includes)
   * Entity listed in entities include: include
   * Otherwise, entity listed in exclude: exclude
   * Otherwise, entity matches glob exclude: exclude
   * Otherwise, entity matches domain exclude: exclude
   * Otherwise: include
6. No Domain and/or glob includes or excludes
   * Entity listed in entities include: include
   * Otherwise: exclude

The following characters can be used in entity globs:

`*` - The asterisk represents zero, one, or multiple characters
`?` - The question mark represents zero or one character

## Removing the integration

To remove the Splunk integration:

1. Remove the `splunk:` section from your "`configuration.yaml`" file.
2. Restart Home Assistant.

Data already sent to your Splunk instance will remain there and can still be queried.
