---
title: InfluxDB
description: 'InfluxDB 集成可将所有状态变更传输到外部 InfluxDB(https://influxdata.com/) 数据库。该集成支持：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - History
  - Sensor
ha_release: 0.9
ha_iot_class: Local Push
ha_codeowners:
  - '@mdegat01'
  - '@Robbie1221'
ha_domain: influxdb
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
ha_config_flow: true
---
# InfluxDB

**InfluxDB** 集成可将所有状态变更传输到外部 [InfluxDB](https://influxdata.com/) 数据库。该集成支持：

- [InfluxDB 3 Core](https://docs.influxdata.com/influxdb3/core/) 和 [InfluxDB 3 Enterprise](https://docs.influxdata.com/influxdb3/enterprise/) - 最新版 InfluxDB，兼容 v1 和 v2 写入 API。传感器查询使用 InfluxQL。SQL 请使用外部工具查询。
- [InfluxDB 2.x](https://docs.influxdata.com/influxdb/v2/) - 包括 [InfluxDB Cloud](https://cloud2.influxdata.com/signup)。传感器查询使用 Flux。
- [InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/) - 传感器查询使用 InfluxQL。

有关 InfluxDB 配置的更多信息，请参阅下方的 [InfluxDB 配置](#influxdb-configuration) 部分。

目前 Home Assistant 中支持以下设备类型：

- [Sensor](#sensor)

:::note
`influxdb` 数据库集成与 Home Assistant 数据库并行运行，并不会替代后者。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

如果你已有 YAML 配置，它会被自动导入为配置条目。实体过滤器、标签、measurement 属性等附加选项仍通过 YAML 配置。详情请参阅下方的[附加选项](#additional-options)部分。

### InfluxDB 1.x 配置选项

```yaml
URL:
    description: "你的 InfluxDB 主机 URL。"
Username:
    description: "具有读写权限的数据库用户名。"
Password:
    description: "数据库用户的密码。"
Database:
    description: "数据库名称。必须先创建该数据库，才能向其中写入数据。"
Verify SSL:
    description: "验证 HTTPS 请求使用的 SSL 证书。"
SSL CA Certificate:
    description: "可选上传一个用于 SSL 校验的 CA 证书。支持格式：`.pem`、`.crt`、`.cer`、`.der`。"
```

### InfluxDB 2.x 和 3.x 配置选项

```yaml
URL:
    description: "你的 InfluxDB 主机 URL。"
Organization:
    description: "组织 ID。InfluxDB 2.x 可在安装 URL 的 `/orgs` 后找到；InfluxDB 3 中该值为必填，但不会校验，可填写任意值。"
Bucket:
    description: "InfluxDB 2.x 中为 bucket 名称；InfluxDB 3 中对应数据库名称。"
Token:
    description: "具有写入权限的认证令牌。"
Verify SSL:
    description: "验证 HTTPS 请求使用的 SSL 证书。"
SSL CA Certificate:
    description: "可选上传一个用于 SSL 校验的 CA 证书。支持格式：`.pem`、`.crt`、`.cer`、`.der`。"
```

### 附加选项

附加选项可通过 YAML 配置。

:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
max_retries:
  type: integer
  description: 设置后，当传输数据时发生网络错误，集成会自动重试。
  required: false
  default: 0
precision:
  type: string
  description: 设置发送到 InfluxDB 的时间精度。更粗的精度有助于 InfluxDB 更好地压缩数据。未设置时默认为 ns。
  required: false
  default: ns
measurement_attr:
  type: string
  description: "State object attribute(s) to use as measurement name. Possible values: `unit_of_measurement`, `domain__device_class` or `entity_id`."
  required: false
  default: unit_of_measurement
default_measurement:
  type: string
  description: 当 `measurement_attr` 对应的状态属性不存在时使用的 measurement 名称，例如实体没有计量单位时。
  required: false
  default: uses the entity id of the entity
override_measurement:
  type: string
  description: 用于替代 `measurement_attr` 或默认 measurement 的名称。这样会将所有数据点存储到同一个 measurement 中。
  required: false
exclude:
  type: list
  description: 配置哪些集成应排除，不记录到 InfluxDB 中。（[配置过滤器](#configure-filter)）
  required: false
  keys:
    entities:
      type: [string, list]
      description: 要排除、不记录到 InfluxDB 的实体 ID 列表。
      required: false
    entity_globs:
      type: [string, list]
      description: 排除所有匹配所列模式的实体。
      required: false
    domains:
      type: [string, list]
      description: 要排除、不记录到 InfluxDB 的域列表。
      required: false
include:
  type: list
  description: 配置哪些集成应包含并记录到 InfluxDB 中。设置后，其余所有实体都不会记录到 InfluxDB。（[配置过滤器](#configure-filter)）
  required: false
  keys:
    entities:
      type: [string, list]
      description: 要包含并记录到 InfluxDB 的实体 ID 列表。
      required: false
    entity_globs:
      type: [string, list]
      description: 包含所有匹配所列模式的实体。
      required: false
    domains:
      type: [string, list]
      description: 要包含并记录到 InfluxDB 的域列表。
      required: false
tags:
  type: [string, list]
  description: 用于标记数据的标签。
  default: 0
tags_attributes:
  type: [string, list]
  description: 应作为标签而非字段写入 InfluxDB 的属性名列表。例如，若设为 `friendly_name`，则除了按实体 ID 分组外，也可以按实体的友好名称分组。
  required: false
  default: 0
ignore_attributes:
  type: [string, list]
  description: 上报到 InfluxDB 时要忽略的属性名列表。可借此过滤那些不会变化或你并不关心的属性，以减少 InfluxDB 中存储的数据量。请注意 InfluxDB 底层会将非字符串属性转为字符串，并在属性名后追加 `_str` 后缀。因此，若你想忽略 InfluxDB 中显示的 `icon_str` 属性，需要在 `ignore_attributes` 中填写 `icon`。
  required: false
component_config:
  type: string
  required: false
  description: This attribute contains integration-specific override values. See [Customizing devices and services](/home-assistant/getting-started/customizing-devices/) for format.
  keys:
    override_measurement:
      type: string
      description: Measurement name to use instead of a unit or default measurement. This will store all data points in a single measurement.
      required: false
    ignore_attributes:
      type: [string, list]
      description: The list of attribute names to ignore when reporting to InfluxDB. Will be merged with the default `ignore_attributes` list when processing a state change event for a particular entity.
      required: false
component_config_domain:
  type: string
  required: false
  description: This attribute contains domain-specific integration override values. See [Customizing devices and services](/home-assistant/getting-started/customizing-devices/) for format.
  keys:
    override_measurement:
      type: string
      description: Measurement name to use instead of a unit or default measurement. This will store all data points in a single measurement.
      required: false
    ignore_attributes:
      type: [string, list]
      description: The list of attribute names to ignore when reporting to InfluxDB. Will be merged with the default `ignore_attributes` list when processing a state change event for a particular entity.
      required: false
component_config_glob: 
  type: string
  required: false
  description: This attribute contains integration-specific override values. See [Customizing devices and services](/home-assistant/getting-started/customizing-devices/) for format.
  keys:
    override_measurement:
      type: string
      description: Measurement name to use instead of unit or default measurement. This will store all data points in a single measurement.
      required: false
    ignore_attributes:
      type: [string, list]
      description: The list of attribute names to ignore when reporting to InfluxDB. Will be merged with the default `ignore_attributes` list when processing a state change event for a particular entity.
      required: false
```

### 配置过滤器

默认情况下，不会排除任何实体。若要限制哪些实体会暴露给 InfluxDB，可以使用 `include` 和 `exclude` 参数。

```yaml
# Example filter to include specified domains and exclude specified entities
influxdb:
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

过滤规则的应用顺序如下：

1. 无过滤器
    - 包含所有实体
2. 仅有 include
    - 实体在 entities include 列表中：包含
    - 否则，实体匹配 domain include：包含
    - 否则，实体匹配 glob include：包含
    - 否则：排除
3. 仅有 exclude
    - 实体在 exclude 列表中：排除
    - 否则，实体匹配 domain exclude：排除
    - 否则，实体匹配 glob exclude：排除
    - 否则：包含
4. 有 domain 和/或 glob 的 include（也可能同时有 exclude）
    - 实体在 entities include 列表中：包含
    - 否则，实体在 entities exclude 列表中：排除
    - 否则，实体匹配 glob include：包含
    - 否则，实体匹配 glob exclude：排除
    - 否则，实体匹配 domain include：包含
    - 否则：排除
5. 有 domain 和/或 glob 的 exclude（没有 domain 和/或 glob 的 include）
    - 实体在 entities include 列表中：包含
    - 否则，实体在 exclude 列表中：排除
    - 否则，实体匹配 glob exclude：排除
    - 否则，实体匹配 domain exclude：排除
    - 否则：包含
6. 没有 domain 和/或 glob 的 include 或 exclude
    - 实体在 entities include 列表中：包含
    - 否则：排除

实体通配模式中可使用以下字符：

`*` - 星号表示零个、一个或多个字符
`?` - 问号表示零个或一个字符

### 示例

#### 示例 1

```yaml
influxdb:
  max_retries: 3
  default_measurement: state
  exclude:
    entities:
      - entity.id1
      - entity.id2
    domains:
      - automation
  include:
    entities:
      - entity.id3
      - entity.id4
  tags:
    instance: prod
    source: hass
```

#### 示例 2

```yaml
influxdb:
  tags:
    source: HA
  tags_attributes:
    - friendly_name
  default_measurement: units
  exclude:
    entities:
      - zone.home
    domains:
      - persistent_notification
      - person
  include:
    domains:
      - sensor
      - binary_sensor
      - sun
    entities:
      - weather.home
```

### InfluxDB 配置

#### 身份验证

- **InfluxDB 3**：身份验证可选（默认启用）。可通过 InfluxDB 生成令牌。
- **InfluxDB 2.x**：需要身份验证。可通过 InfluxDB 生成令牌。
- **InfluxDB 1.x**：身份验证可选（默认关闭）。如果与 Home Assistant 在同一主机上使用默认设置运行，可将用户名和密码留空。

对于 InfluxDB 1.x，你必须先[创建一个名为](https://docs.influxdata.com/influxdb/v1/introduction/get-started/#creating-a-database) `home_assistant` 的数据库。InfluxDB 2.x 和 3.x 会自动创建 bucket/数据库。

#### InfluxDB 3（Core 和 Enterprise）

请参阅以下内容开始使用 InfluxDB 3：

- **[InfluxDB 3 Core](https://docs.influxdata.com/influxdb3/core/get-started/)**：免费、开源，针对近期数据查询进行了优化。
- **[InfluxDB 3 Enterprise](https://docs.influxdata.com/influxdb3/enterprise/get-started/)**：增加了面向历史查询的压缩功能。包含适用于非商业用途的免费 [At-Home license](https://docs.influxdata.com/influxdb3/enterprise/admin/license/)。

##### 写入 API 兼容性

InfluxDB 3 Core 和 Enterprise 提供 [InfluxDB v1 与 v2 写入 API 兼容性](https://docs.influxdata.com/influxdb3/core/write-data/http-api/compatibility-apis/)，因此你可以使用 `api_version: 2` 写入数据。

##### 查询 API 兼容性

InfluxDB 3 支持 [v1 查询 API](https://docs.influxdata.com/influxdb3/core/query-data/execute-queries/influxdb-v1-api/)（InfluxQL）和 [v3 查询 API](https://docs.influxdata.com/influxdb3/core/query-data/execute-queries/influxdb-v3-api/)（SQL 与 InfluxQL）。不支持 v2 查询 API（Flux）。

:::note
**查询工具：** 可使用 [InfluxDB 3 Explorer](https://docs.influxdata.com/influxdb3/explorer/get-started/) 或 [Grafana](https://docs.influxdata.com/influxdb3/core/visualize-data/grafana/) 等外部工具，通过 SQL 或 InfluxQL 查询 InfluxDB 3。

:::
可使用 [`influxdb3` CLI](https://docs.influxdata.com/influxdb3/core/admin/tokens/create/) 或 [InfluxDB 3 Explorer](https://docs.influxdata.com/influxdb3/explorer/) 生成令牌。

## 传感器

`influxdb` 传感器允许你从 InfluxDB 数据库中查询数值，并将其填充为传感器状态。你可以用它把来自 `influxdb` 历史集成或外部数据源的统计数据呈现为 Home Assistant 传感器。

:::note
**InfluxDB 3 传感器支持：** InfluxDB 3 支持 [v1 查询 API](https://docs.influxdata.com/influxdb3/core/query-data/execute-queries/influxdb-v1-api/)（InfluxQL），因此使用 `queries:` 的 1.x 传感器可能可用。不支持 v2 查询 API（Flux），因此 `queries_flux:` 传感器无法在 InfluxDB 3 中使用。

**查询工具：** 可使用 [InfluxDB 3 Explorer](https://docs.influxdata.com/influxdb3/explorer/get-started/) 或 [Grafana](https://docs.influxdata.com/influxdb3/core/visualize-data/grafana/) 等外部工具，通过 SQL 或 InfluxQL 查询 InfluxDB 3。

:::
:::important
你必须先配置 `influxdb` 历史集成，才能创建 `influxdb` 传感器。如果你想为外部 InfluxDB 数据库创建传感器但不向其中写入数据，请排除所有实体：

```yaml
influxdb:
  exclude:
    entity_globs: "*"
```


:::
### 传感器配置

在 `configuration.yaml` 文件中定义传感器连接变量和查询。每条查询都会创建一个传感器。

#### InfluxDB 1.x 传感器（InfluxQL）

```yaml
sensor:
  - platform: influxdb
    queries:
      - name: mean value of foo
        where: '"name" = ''foo'''
        measurement: '"°C"'
```

#### InfluxDB 2.x 传感器（Flux）

InfluxDB 2.x 要求使用 [Flux](https://docs.influxdata.com/flux/v0/) 查询。可在 InfluxDB UI 中使用查询构建器生成查询：

```yaml
sensor:
  - platform: influxdb
    api_version: 2
    organization: RANDOM_16_DIGIT_HEX_ID
    token: GENERATED_AUTH_TOKEN
    queries_flux:
      - group_function: mean
        imports:
          - strings
        name: "Mean humidity reported from past day"
        query: >
          filter(fn: (r) => r._field == "value" and r.domain == "sensor" and strings.containsStr(v: r.entity_id, substr: "humidity"))
          |> keep(columns: ["_value"])
        range_start: "-1d"
```

### 传感器配置变量

```yaml
api_version:
  type: string
  description: API version to use. Valid values are `1` or `2`.
  default: "1"
ssl:
  type: boolean
  description: Use HTTPS instead of HTTP. Defaults to `true` for 2.x, `false` for 1.x.
  required: false
  default: false
host:
  type: string
  description: IP address or domain of your database host. For InfluxDB Cloud, defaults to `us-west-2-1.aws.cloud2.influxdata.com`.
  required: false
  default: localhost
port:
  type: integer
  description: Port to use.
  required: false
  default: 8086
path:
  type: string
  description: Path to use if InfluxDB is behind a reverse proxy.
  required: false
username:
  type: string
  description: 1.x only - Database username with read privileges.
  required: inclusive
password:
  type: string
  description: 1.x only - Password for the database user. Required with `username`.
  required: inclusive
database:
  type: string
  description: 1.x only - Database name. Individual sensors can override this.
  required: false
  default: home_assistant
verify_ssl:
  type: boolean
  description: 1.x only - Verify SSL certificate. For 2.x, SSL verification is always enabled.
  required: false
  default: true
token:
  type: string
  description: 2.x only - Auth token with read access to your Organization and Bucket.
  required: inclusive
organization:
  type: string
  description: 2.x only - Organization ID. Find this in your InfluxDB URL after `/orgs`.
  required: inclusive
bucket:
  type: string
  description: 2.x only - Bucket name. Individual sensors can override this.
  required: false
  default: Home Assistant
queries:
  type: list
  description: 1.x only - List of sensors using InfluxQL queries.
  required: true
  keys:
    name:
      type: string
      description: The name of the sensor.
      required: true
    unique_id:
      type: string
      description: The unique ID for this query. This allows changing the name, icon and entity_id from the web interface.
      required: false
    unit_of_measurement:
      type: string
      description: Defines the units of measurement of the sensor, if any.
      required: false
    measurement:
      type: string
      description: Defines the measurement name in InfluxDB (the FROM clause of the query).
      required: true
    where:
      type: template
      description: Defines the data selection clause (the where clause of the query). This supports [templates](/home-assistant/docs/configuration/templating/#building-templates).
      required: true
    value_template:
      type: template
      description: Defines a [template](/home-assistant/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
      required: false
    database:
      type: string
      description: Name of the database to use.
      required: false
      default: home_assistant
    group_function:
      type: string
      description: The group function to be used.
      required: false
      default: mean
    field:
      type: string
      description: The field name to select.
      required: true
      default: value
queries_flux:
  type: list
  description: 2.x only - List of sensors using Flux queries.
  required: true
  keys:
    name:
      type: string
      description: The name of the sensor.
      required: true
    unique_id:
      type: string
      description: The unique ID for this query. This allows changing the name, icon and entity_id from the web interface.
      required: false
    unit_of_measurement:
      type: string
      description: Defines the units of measurement of the sensor, if any.
      required: false
    range_start:
      type: string
      description: "Duration or time value to start range from. All Flux queries require a `range` filter, one is automatically added to the beginning of your Flux query in the form of `range(start: {range_start}, stop: {range_stop})`."
      required: false
      default: -15m
    range_stop:
      type: string
      description: Duration or time value to stop range at. See `range_start` above for how this is used in query.
      required: false
      default: now()
    query:
      type: template
      description: "One or more flux filters used to get to the data you want. These should limit resultset to one table, or any beyond the first will be ignored. Your query should not begin or end with a pipe (`|>`). This supports [templates](/home-assistant/docs/configuration/templating/#building-templates)."
      required: true
    group_function:
      type: string
      description: "The group function to be used. If provided, adds `{group_function}(column: \"_value\")` to your query. Unlike 1.x queries, this does not default to mean. If omitted, `limit(n: 1)` is added instead."
      required: false
    value_template:
      type: template
      description: Defines a [template](/home-assistant/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload. Note that `value` will be set to the value of the `_value` field in your query output.
      required: false
    bucket:
      type: string
      description: Name of the bucket within your Organization to read from.
      required: false
      default: Home Assistant
    imports:
      type: [string, list]
      description: Libraries to import in order to execute your query. Ex. `strings`, `date`, `experimental/query`, etc.
      required: false
```

## 示例

### InfluxDB 1.x 完整配置

下面的示例配置会向本地 InfluxDB 实例发起两个请求，一个访问数据库 `db1`，另一个访问 `db2`：

- `select last(value) as value from "°C" where "name" = "foo"`
- `select min(tmp) as value from "%" where "entity_id" = ''salon'' and time > now() - 1h`


```yaml
sensor:
  - platform: influxdb
    host: localhost
    username: home-assistant
    password: password
    queries:
      - name: last value of foo
        unit_of_measurement: °C
        value_template: '{{ value | round(1) }}'
        group_function: last
        where: '"name" = ''foo'''
        measurement: '"°C"'
        field: value
        database: db1
      - name: Min for last hour
        unit_of_measurement: "%"
        value_template: '{{ value | round(1) }}'
        group_function: min
        where: '"entity_id" = ''salon'' and time > now() - 1h'
        measurement: '"%"'
        field: tmp
        database: db2
```


### InfluxDB 2.x 完整配置


```yaml
sensor:
  - platform: influxdb
    api_version: 2
    token: GENERATED_AUTH_TOKEN
    organization: RANDOM_16_DIGIT_HEX_ID
    bucket: BUCKET_NAME
    queries_flux:
      - range_start: "-1d"
        name: "How long have I been here"
        query: >
          filter(fn: (r) => r._domain == "person" and r._entity_id == "me" and r._value != "{{ states('person.me') }}")
          |> map(fn: (r) => ({ _value: r._time }))
        value_template: "{{ relative_time(strptime(value, '%Y-%m-%d %H:%M:%S %Z')) }}"
      - range_start: "-1d"
        name: "Cost of my house today across all power sensor"
        query: >
          filter(fn: (r) => r.domain == "sensor" and r._field == "value" and regexp.matchRegexpString(r: /_power$/, v: r.entity_id))
          |> keep(columns: ["_value", "_time"])
          |> sort(columns: ["_time"], desc: false)
          |> integral(unit: 5s, column: "_value")
        imports: regexp
        value_template: "{{ value|float / 24.0 / 1000.0 * states('sensor.current_cost_per_kwh')|float }}"
      - range_start: "-1d"
        bucket: Glances Bucket
        name: "Average CPU temp today"
        query: "filter(fn: (r) => r._field == \"value\" and r.entity_id == \"glances_cpu_temperature\")"
        group_function: mean
```


请注意，使用 Flux 查询时，结果集会被拆分为多个表，你可以在 UI 的 Data Explorer 中看到其工作方式。如果你操作的是由 InfluxDB 历史集成生成的数据，这通常意味着默认情况下，每个实体以及每个实体的每个属性（除 `unit_of_measurement` 和你提升为 tag 的其他属性外）都会对应一张表。

与 1.x 查询相比，这会产生更多表；在 1.x 中，所有实体会按 `unit_of_measurement` 汇总成表。你仍然可以跨多个传感器创建聚合指标。如上所示，可使用 [keep](https://docs.influxdata.com/flux/v0/stdlib/universe/keep/) 或 [drop](https://docs.influxdata.com/flux/v0/stdlib/universe/drop/) 过滤器。当你移除关键列后，InfluxDB 会将 `_value` 结构相同的表合并为一张表。

## 在 Influx 中查询数据

### 传感器

对于定义了计量单位的传感器，计量单位会被用作 measurement 名称，条目则会使用 `entity_id` 的后半部分作为 tag。因此你需要在查询中添加 WHERE 子句来筛选数值。

例如，对 `sensor.multi_sensor_battery_level` 这个 `%` 电池传感器的查询：

```sql
SELECT * FROM "%" WHERE time > now() - 12h AND "entity_id" = 'multi_sensor_battery_level';
```

或者，对于以 `°C` 表示的温度：

```sql
SELECT * FROM "°C" WHERE time > now() - 1h;
```

### 其他实体

其他所有实体都可以使用其 `entity_id` 作为 measurement 名称进行查询。

```sql
SELECT * FROM "binary_sensor.front_doorbell" WHERE time > now() - 24h;
```

```sql
SELECT "temperature" FROM "climate.kitchen" WHERE time > now() - 24h;
```
