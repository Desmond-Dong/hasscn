---
title: Prometheus
description: 'Prometheus 集成会以 Prometheus(https://prometheus.io/) 可读取的格式暴露指标。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - History
ha_release: 0.49
ha_iot_class: Assumed State
ha_domain: prometheus
ha_codeowners:
  - '@knyar'
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Prometheus

**Prometheus** 集成会以 [Prometheus](https://prometheus.io/) 可读取的格式暴露指标。

## 配置

要在你的安装中使用 `prometheus` 集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
prometheus:
```

```yaml
namespace:
  description: The "namespace" that will be assigned to all the Prometheus metrics. This is the prefix of the metric name. E.g., having `myhass` as the namespace will cause the device tracker metrics to be `myhass_device_tracker_state`, the switch metrics to be `myhass_switch_state` and so on. The default is to not add any prefix to the metrics name. (available in version 0.73.0 and later)
  required: false
  type: string
filter:
  description: Filtering directives for the integrations which should be included or excluded from recording. ([Configure Filter](#configure-filter))
  required: false
  type: list
  keys:
    exclude_entities:
      description: The list of entity ids to be excluded from recording.
      required: false
      type: list
    exclude_entity_globs:
      description: Exclude all entities matching a listed pattern (e.g., `sensor.weather_*`).
      required: false
      type: list
    exclude_domains:
      description: The list of domains to be excluded from recording.
      required: false
      type: list
    include_entities:
      description: The list of entity ids to be included from recordings. If set, all other entities will not be recorded. Values set by the **exclude_*** option will prevail.
      required: false
      type: list
    include_entity_globs:
      description: Include all entities matching a listed pattern (e.g., `sensor.weather_*`). If set, all other entities will not be recorded. Values set by the **exclude_*** option will prevail.
      required: false
      type: list
    include_domains:
      description: The list of domains to be included from recordings. If set, all other entities will not be recorded. Values set by the **exclude_*** option will prevail.
      required: false
      type: list
default_metric:
  type: string
  description: Metric name to use when an entity doesn't have a unit.
  required: false
  default: uses the entity id of the entity
override_metric:
  type: string
  description: Metric name to use instead of unit or default metric. This will store all data points in a single metric.
  required: false
component_config:
  type: string
  required: false
  description: This attribute contains integration-specific override values. See [Customizing devices and services](/home-assistant/getting-started/customizing-devices/) for format.
  keys:
    override_metric:
      type: string
      description: Metric name to use instead of unit or default metric. This will store all data points in a single metric.
      required: false
component_config_domain:
  type: string
  required: false
  description: This attribute contains domain-specific integration override values. See [Customizing devices and services](/home-assistant/getting-started/customizing-devices/) for format.
  keys:
    override_metric:
      type: string
      description: Metric name to use instead of unit or default metric. This will store all data points in a single metric.
      required: false
component_config_glob:
  type: string
  required: false
  description: This attribute contains integration-specific override values. See [Customizing devices and services](/home-assistant/getting-started/customizing-devices/) for format.
  keys:
    override_metric:
      type: string
      description: Metric name to use instead of unit or default metric. This will store all data points in a single metric.
      required: false
requires_auth:
  type: boolean
  description: "This makes authentication optional for the `/api/prometheus` endpoint."
  required: false
  default: true
```

### 配置过滤器

默认情况下，不会排除任何实体。若要限制哪些实体会暴露给 `Prometheus`，可以使用 `filter` 参数。

```yaml
# Example filter to include specified domains and exclude specified entities
prometheus:
  filter:
    include_domains:
      - alarm_control_panel
      - light
    include_entity_globs:
      - binary_sensor.*_occupancy
    exclude_entities:
      - light.kitchen_light
```

过滤规则的应用顺序如下：

1. No filter
    - All entities included
2. Only includes
    - Entity listed in entities include: include
    - Otherwise, entity matches domain include: include
    - Otherwise, entity matches glob include: include
    - Otherwise: exclude
3. Only excludes
    - Entity listed in exclude: exclude
    - Otherwise, entity matches domain exclude: exclude
    - Otherwise, entity matches glob exclude: exclude
    - Otherwise: include
4. Domain and/or glob includes (may also have excludes)
    - Entity listed in entities include: include
    - Otherwise, entity listed in entities exclude: exclude
    - Otherwise, entity matches glob include: include
    - Otherwise, entity matches glob exclude: exclude
    - Otherwise, entity matches domain include: include
    - Otherwise: exclude
5. Domain and/or glob excludes (no domain and/or glob includes)
    - Entity listed in entities include: include
    - Otherwise, entity listed in exclude: exclude
    - Otherwise, entity matches glob exclude: exclude
    - Otherwise, entity matches domain exclude: exclude
    - Otherwise: include
6. No Domain and/or glob includes or excludes
    - Entity listed in entities include: include
    - Otherwise: exclude

实体通配模式中可使用以下字符：

`*` - The asterisk represents zero, one, or multiple characters
`?` - The question mark represents zero or one character

## 完整示例

高级配置示例：

```yaml
# Advanced configuration.yaml entry
prometheus:
  namespace: hass
  component_config_glob:
    sensor.*_hum:
      override_metric: humidity_percent
    sensor.*_temp:
      override_metric: temperature_c
    sensor.temperature*:
      override_metric: temperature_c
    sensor.*_bat:
      override_metric: battery_percent
  filter:
    include_domains:
      - sensor
    exclude_entity_globs:
      - sensor.weather_*
```

然后，你可以在 Prometheus 的 `scrape_configs` 配置中加入以下内容，以便从 Home Assistant 抓取指标。

```yaml
# Example Prometheus scrape_configs entry
  - job_name: "hass"
    scrape_interval: 60s
    metrics_path: /api/prometheus

    # Legacy api password
    params:
      api_password: ['PASSWORD']

    # Long-Lived Access Token
    bearer_token: "your.longlived.token"

    scheme: https
    static_configs:
      - targets: ['HOSTNAME:8123']
```

请将 `your.longlived.token` 替换为 Home Assistant [生成的令牌](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token)。

Prometheus 2.26 起 bearer token 的配置格式已发生变化，因此如果你使用的是较新版本，可以使用以下配置示例：

```yaml
# Example Prometheus scrape_configs entry (For version 2.26+
  - job_name: "hass"
    scrape_interval: 60s
    metrics_path: /api/prometheus

    # Long-Lived Access Token
    authorization:
      credentials: "your.longlived.token"

    scheme: https
    static_configs:
      - targets: ['HOSTNAME:8123']
```

在 Prometheus 侧查看指标时，你会看到：

- 所有 Home Assistant 域的指标；如果设置了统一的 **namespace** 前缀，会更容易查找。
- 由 [client library](https://github.com/prometheus/client_python) 提供的指标，包括一组 **process_\*** 指标，以及一个伪指标 **python_info**，其中包含的不是数值而是标签形式的客户端 Python 版本信息，也就是 Home Assistant 所使用的 Python 解释器信息。

通常你只会关心第一组指标。

## unavailable 或 unknown 状态下的指标

当 Prometheus 导出器启动时（通常也就是 Home Assistant 启动时），所有未被排除且处于 unavailable 或 unknown 状态的实体都不会被导出，直到其变为可用且状态明确。

如果一个原本可用的实体进入 unavailable 或 unknown 状态，它会自动停止导出；当其重新变为可用且状态明确时，又会自动恢复导出。

:::note
若要过滤掉这些陈旧值，可以在查询或 recording rule 中使用 `entity_available`。例如：

```yaml
- record: "known_temperature_c"
  expr: "temperature_c unless entity_available == 0"
```

这种 `unless` 用法（计算起来可能较慢）现在已经不再是必需的，但仍然可以正常使用。

:::
## 支持的指标

仅会为以下域导出指标：

`alarm_control_panel`, `automation`, `binary_sensor`, `climate`, `cover`, `counter`, `device_tracker`, `fan`, `humidifier`, `input_boolean`, `input_number`, `light`, `lock`, `number`, `person`, `sensor`, `switch`, `update`
