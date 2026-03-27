---
title: MQTT Statestream
description: 'MQTT Statestream 集成会将 Home Assistant 中的状态变化发布到各自独立的 MQTT 主题中。MQTT 集成(/home-assistant/integrations/mqtt/) 是 MQTT Statestream 正常工作的前提条件。'

ha_category:
  - Other
ha_release: 0.54
ha_iot_class: Local Push
ha_domain: mqtt_statestream
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# MQTT Statestream

**MQTT Statestream** 集成会将 Home Assistant 中的状态变化发布到各自独立的 MQTT 主题中。[MQTT 集成](/home-assistant/integrations/mqtt/) 是 MQTT Statestream 正常工作的前提条件。

## 配置

要在 Home Assistant 中启用 MQTT Statestream，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt_statestream:
  base_topic: homeassistant
  publish_attributes: true
  publish_timestamps: true
```

```yaml
base_topic:
  description: 用于生成实际发布主题的基础主题。
  required: true
  type: string
publish_attributes:
  description: 除状态外，同时发布实体的属性。
  required: false
  default: false
  type: boolean
publish_timestamps:
  description: 发布实体的 `last_changed` 和 `last_updated` 时间戳。
  required: false
  default: false
  type: boolean
exclude:
  description: 配置哪些实体应从发布中排除。([配置过滤器](#configure-filter))
  required: false
  type: list
  keys:
    entities:
      description: 要从发布中排除的实体 ID 列表。
      required: false
      type: list
    entity_globs:
      description: 从发布中排除所有匹配指定模式的实体（例如 `sensor.weather_*`）。
      required: false
      type: list
    domains:
      description: 要从发布中排除的域列表。
      required: false
      type: list
include:
  description: 配置哪些实体应包含在发布中。如果设置了该项，其他所有实体都不会被发布。([配置过滤器](#configure-filter))
  required: false
  type: list
  keys:
    entities:
      description: 要包含在发布中的实体 ID 列表。
      required: false
      type: list
    entity_globs:
      description: 在发布中包含所有匹配指定模式的实体（例如 `sensor.weather_*`）。
      required: false
      type: list
    domains:
      description: 要包含在发布中的域列表。
      required: false
      type: list
```

### 配置过滤器

默认情况下，不会排除任何实体。要限制哪些实体暴露给 `MQTT Statestream`，可以使用 `include` 和 `exclude` 参数。

```yaml
# Example filter to include specified domains and exclude specified entities
mqtt_statestream:
  base_topic: homeassistant
  include:
    domains:
      - alarm_control_panel
      - light
    entity_globs:
      - binary_sensor.*_occupancy
  exclude:
    entities:
      - light.kitchen_light
```

Filters are applied as follows:

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

The following characters can be used in entity globs:

`*` - The asterisk represents zero, one, or multiple characters
`?` - The question mark represents zero or one character

### 常见过滤示例

```yaml
# Example of excluding entities
mqtt_statestream:
  base_topic: homeassistant
  exclude:
    domains:
      - switch
    entities:
      - sensor.nopublish
```

在上面的示例中，除了 *switch.x* 和 *sensor.nopublish* 之外的所有实体都会发布到 MQTT。

```yaml
# Example of excluding entities
mqtt_statestream:
  base_topic: homeassistant
  include:
    domains:
      - sensor
    entities:
      - lock.important
```

在这个示例中，只有 *sensor.x* 和 *lock.important* 会被发布。

```yaml
# Example of excluding entities
mqtt_statestream:
  base_topic: homeassistant
  include:
    domains:
      - sensor
  exclude:
    entities:
      - sensor.noshow
```

在这个示例中，除了 *sensor.noshow* 之外的所有传感器都会被发布。

## 工作原理

当任意 Home Assistant 实体发生变化时，此集成都会将该变化发布到 MQTT。

每个实体对应的主题都不同，因此您可以让其他系统只订阅自己感兴趣的实体。
主题格式为 `base_topic/domain/entity/state`。

例如，使用上述示例配置时，如果名为 `light.master_bedroom_dimmer` 的实体被打开，此集成会将 `on` 发布到 `homeassistant/light/master_bedroom_dimmer/state`。

如果该实体还有一个名为 `brightness` 的属性，集成还会将该属性值发布到 `homeassistant/light/master_bedroom_dimmer/brightness`。

所有状态和属性在发布前都会经过 JSON 序列化。**请注意**，这会导致字符串带上引号（例如字符串 `on` 会被发布为 `"on"`）。在很多场景中，您可以使用 `value_json` 而不是 `value` 来访问 JSON 反序列化后的值（以及未加引号的字符串）。

实体的 `last_updated` 和 `last_changed` 值会分别发布到 `homeassistant/light/master_bedroom_dimmer/last_updated` 和 `homeassistant/light/master_bedroom_dimmer/last_changed`。时间戳采用 ISO 8601 格式，例如 `2017-10-01T23:20:30.920969+00:00`。
