# Activity

<img src='/home-assistant/images/screenshots/activity-panel.png' style='margin-left:10px; float: right;' height="100" />

**Activity** 集成会以不同的视角呈现您家庭的历史记录：它会按时间倒序显示家中发生的所有变化。

它依赖 [`recorder`](/home-assistant/integrations/recorder/index.md) 集成来存储数据。这意味着如果 [`recorder`](/home-assistant/integrations/recorder/index.md) 集成已配置为使用 MySQL 或 PostgreSQL 等数据存储，那么 `activity` 集成也不会使用默认的 SQLite 数据库存储数据。

此集成默认启用，除非您在 `configuration.yaml` 文件中禁用了或删除了 [`default_config:`](/home-assistant/integrations/default_config/index.md) 这一行。如果是这种情况，您可以像下面这样手动启用此集成：

```yaml
# Example configuration.yaml entry
logbook:
```

```yaml
exclude:
   description: "配置哪些集成**不应**跟踪活动。([配置过滤器](#configure-filter))"
  required: false
  type: map
  keys:
    entities:
       description: 要从活动跟踪中排除的实体 ID 列表。
      required: false
      type: list
    entity_globs:
       description: 从活动跟踪中排除匹配所列模式的所有实体（例如 `sensor.weather_*`）。
      required: false
      type: list
    domains:
       description: 要从活动跟踪中排除的域列表。
      required: false
      type: list
include:
   description: 配置哪些集成应跟踪活动。([配置过滤器](#configure-filter))
  required: false
  type: map
  keys:
    entities:
       description: 在活动跟踪中要包含的实体 ID 列表。
      required: false
      type: list
    entity_globs:
       description: 在活动跟踪中包含匹配所列模式的所有实体（例如 `sensor.weather_*`）。
      required: false
      type: list
    domains:
       description: 在活动跟踪中要包含的域列表。
      required: false
      type: list
```

## 配置过滤器

默认情况下，Activity 会使用与 recorder 相同的过滤器。要限制哪些实体会显示到 `Logbook` 中，您可以使用 `include` 和 `exclude` 参数。

```yaml
# 包含指定域并排除指定实体的过滤器示例
logbook:
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

### 常见过滤示例

如果您想从活动跟踪中排除某些实体或域的消息，只需像下面这样添加 `exclude` 参数：

```yaml
# 从活动跟踪中排除域和实体的示例（以前称为 logbook）
logbook:
  exclude:
    entities:
      - sensor.last_boot
      - sensor.date
    entity_globs:
      - sensor.weather_*
    domains:
      - sun
```

如果您只想查看某些特定实体或域的消息，请使用 `include` 配置：

```yaml
# 仅跟踪所列域和实体活动的示例
logbook:
  include:
    domains:
      - sensor
      - switch
      - media_player
```

您也可以使用 `include` 列表，再通过 `exclude` 列表过滤掉某些实体或域。通常，这种做法适合在 `include` 侧按域进行定义，再排除其中某些特定实体。

```yaml
# 组合使用 include 和 exclude 配置活动跟踪的示例
logbook:
  include:
    domains:
      - sensor
      - switch
      - media_player
  exclude:
    entities:
      - sensor.last_boot
      - sensor.date
    entity_globs:
      - sensor.weather_*
```

### 排除事件

如果您使用 `sensor.date` 在 UI 中显示当前日期，但不希望每天都为该传感器记录活动，则可以将其排除。

要排除这些实体，只需将它们添加到活动跟踪配置中的 `exclude` > `entities` 列表中。

要排除整个域中的所有事件，请将其添加到 `exclude` > `domain` 列表中。例如，如果您使用 `sun` 域只是为了根据 `azimuth` 属性触发自动化，那么您可能并不关心日出和日落的活动记录。

被排除的实体仍会占用数据库空间，因此也许更适合直接在 `recorder` 中将其排除。

### 自定义条目

您可以通过脚本集成触发事件，从而向活动跟踪中添加自定义条目。

```yaml
# configuration.yaml 示例条目
script:
  add_logbook_entry:
    alias: "Add activity"
    sequence:
      - action: logbook.log
        data:
          name: Kitchen
          message: is being used
          # Optional
          entity_id: light.kitchen
          domain: light
```

:::important
调用 `logbook.log` 操作时，如果未提供 `domain` 或 `entity_id`，条目会以 `logbook` 域添加。如果您希望这些条目显示在 **Activity** 面板中，请确保 `logbook` 域未被过滤掉。

:::
:::note
已分配单位的传感器实体（例如带有 `unit_of_measurement` 属性）会被视为频繁变化，因此这些传感器会自动从活动跟踪中排除。

:::
