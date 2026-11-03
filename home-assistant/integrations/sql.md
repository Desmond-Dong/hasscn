# SQL

**SQL** 集成允许你使用 [sqlalchemy](https://www.sqlalchemy.org) 库所支持的 [SQL](https://en.wikipedia.org/wiki/SQL) 数据库中的值，来填充传感器状态（及其属性）。
如果搭配 `recorder` 集成数据库使用，它可以用于展示 Home Assistant 传感器的统计信息；也可以用于外部数据源。

**此集成既可通过配置流程设置，也可通过 YAML 配置。**

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 通过 YAML 配置

要配置此传感器，请在 `configuration.yaml` 中定义数据库连接参数和查询列表。每条查询都会创建一个传感器。

要启用它，请将以下内容添加到 `configuration.yaml`。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml
sql:
  - name: Sun state
    query: >
      SELECT
        states.state
      FROM
        states
        LEFT JOIN state_attributes ON (
          states.attributes_id = state_attributes.attributes_id
        )
      WHERE
        metadata_id = (
          SELECT
            metadata_id
          FROM
            states_meta
          where
            entity_id = 'sun.sun'
        )
      ORDER BY
        state_id DESC
      LIMIT
        1;
    column: "state"
```

```yaml
sql:
  description: Integration.
  required: true
  type: map
  keys:
    db_url:
      description: The URL which points to your database. See [supported engines](/home-assistant/integrations/recorder/#custom-database-engines).
      required: false
      default: "Defaults to the recorder `db_url`."
      type: string
    name:
      description: The name of the sensor.
      required: true
      type: template
    query:
      description: An SQL QUERY string, should return 1 result at most.
      required: true
      type: template
    column:
      description: The field name to select.
      required: true
      type: string
    unit_of_measurement:
      description: Defines the units of measurement of the sensor, if any.
      required: false
      type: string
    value_template:
      description: Defines a template to extract a value from the payload.
      required: false
      type: template
    unique_id:
      description: Provide a unique id for this sensor.
      required: false
      type: string
    device_class:
      description: "Provide [device class](/home-assistant/integrations/sensor#device-class) for this sensor."
      required: false
      type: string
    state_class:
      description: "Provide [state class](https://developers.home-assistant.io/docs/core/entity/sensor/#available-state-classes) for this sensor."
      required: false
      type: string
    icon:
      description: "Defines a template for the icon of the entity."
      required: false
      type: template
    picture:
      description: "Defines a template for the entity picture of the entity."
      required: false
      type: template
    availability:
      description: "Defines a template if the entity state is available or not."
      required: false
      type: template
```

## 数据更新

默认情况下，该集成每 30 秒执行一次 SQL 查询以更新传感器。
如果你希望使用不同的更新频率，可以在集成的系统选项中关闭自动刷新（**Enable polling for updates**），然后通过自动化自行设置轮询频率。

如需更详细的自定义间隔设置步骤，请参考下方流程。

### 自定义轮询间隔

如果你想指定设备的数据轮询间隔，可以关闭默认轮询，并创建自己的轮询自动化。

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/), and select your integration.
2. On the integration entry, select `[mdi:dots-vertical]`.
   * Then, select **System options** and toggle the button to disable polling.
     ![Disable polling for updates](/home-assistant/images/screenshots/custom_polling_01.png)
3. To define your custom polling interval, create an automation.
   * Go to [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations/) and create a new automation.
   * Define any trigger and condition you like.
   * Select **Add action**, then select **Other actions**.
   * Select **Perform action**, and from the list, select the [`homeassistant.update_entity` action](/home-assistant/integrations/homeassistant/index.md#action-homeassistantupdate_entity).
   * Choose your targets by selecting the **Choose area**, **Choose device**, **Choose entity**, or **Choose label** buttons.
     ![Update entity](/home-assistant/images/screenshots/custom_polling_02.png)
4. Save your new automation to poll for data.

## 操作

### 操作：SQL 查询

`sql.query` 操作会对数据库执行任意只读的 `SELECT` 查询，并返回结果。

* **Data attribute**: `query`
  * **Description**: The `SELECT` query to execute. Only `SELECT` statements are allowed.
  * **Optional**: No
* **Data attribute**: `db_url`
  * **Description**: The URL of the database to connect to. If not provided, the default Home Assistant recorder database will be used.
  * **Optional**: Yes

The `sql.query` action returns a list of rows, where each row is a dictionary of column names to values.

#### 数据类型转换

The data returned by the database is converted to be compatible with the action response. The following conversions are applied:

* `Decimal` types are converted to floats.
* `Date` and `Datetime` objects are converted to ISO 8601 formatted strings.
* `bytes` and `bytearray` are converted to a hexadecimal string prefixed with `0x`.
* All other basic types (string, integer, float, boolean) are returned as is.

#### 示例

##### Example of calling the `sql.query` action in an automation:

```yaml
action: sql.query
data:
  query: |-
    SELECT
      states.state,
      last_updated_ts
    FROM
      states
      INNER JOIN states_meta ON
        states.metadata_id = states_meta.metadata_id
    WHERE
      states_meta.entity_id = 'sun.sun'
    ORDER BY
      last_updated_ts DESC
    LIMIT
      3;
response_variable: sun_history
```

This would return a result similar to this, which will be stored in the `sun_history` variable:

```yaml
result:
  - state: below_horizon
    last_updated_ts: 1760634101.8498254
  - state: below_horizon
    last_updated_ts: 1760633981.849044
  - state: below_horizon
    last_updated_ts: 1760633861.848531
```

## 说明

See [supported engines](/home-assistant/integrations/recorder/index.md#custom-database-engines) for which you can connect with this integration.

The SQL integration will connect to the Home Assistant Recorder database if "Database URL" has not been specified.

There is no explicit configuration required for attributes. The integration will set all columns returned by the query as attributes.

Note that in all cases only the first row returned will be used.

### 使用模板

For incoming data, a value template translates incoming JSON or raw data into a valid payload.
Incoming payloads are rendered with possible JSON values, so when rendering, the `value_json` variable can be used to access attributes in a JSON-based payload. Otherwise, the `value` variable can be used for non-JSON payloads.

The `this` variable can also be used in the template. The `this` attribute refers to the current [entity state](/home-assistant/docs/configuration/state_object.md) of the entity.
Further information about the `this` variable can be found in the [template documentation](/home-assistant/integrations/template/index.md#template-and-action-variables).

:::note
**Example value template with JSON:**

With the following payload:

```json
{ "state": "ON", "temperature": 21.902 }
```

Template `{{ value_json.temperature | round(1) }}` renders to `21.9`.
:::

## 示例

In this section, you find some real-life examples of how to use this sensor.

### 实体的当前状态

This example shows the previously *recorded* state of the sensor `sensor.temperature_in`.

```yaml
sensor:
  - platform: random
    name: Temperature in
    unit_of_measurement: "°C"
```

The query will look like this:

```sql
SELECT
  states.state
FROM
  states
WHERE
  metadata_id = (
    SELECT
      metadata_id
    FROM
      states_meta
    WHERE
      entity_id = 'sensor.temperature_in'
  )
ORDER BY
  state_id DESC
LIMIT
  1;
```

Use `state` as column for value.

### 使用模板统计状态变化次数

This example shows the amount of state changes of the sensor `sensor.temperature_in`
using another sensor's state to provide the time window.

```yaml
sensor:
  - platform: random
    name: Temperature in
    unit_of_measurement: "°C"
```

The query will look like this:

```sql
SELECT
  count(state) as changes
FROM
  (
    SELECT
      states.state
    FROM
      states
    WHERE
      metadata_id = (
        SELECT
          metadata_id
        FROM
          states_meta
        WHERE
          entity_id = 'sensor.temperature_in'
      )
      AND last_updated_ts >= strftime('%s','{{ states("sensor.datetime_helper") }}')
  )
```

Use `changes` as column for value.

### 实体的上一个状态

Based on previous example with temperature, the query to get the former state is :

```sql
SELECT
  states.state
FROM
  states
WHERE
  state_id = (
    SELECT
      states.old_state_id
    FROM
      states
    WHERE
      metadata_id = (
        SELECT
          metadata_id
        FROM
          states_meta
        WHERE
          entity_id = 'sensor.temperature_in'
      )
      AND old_state_id IS NOT NULL
    ORDER BY
      last_updated_ts DESC
    LIMIT
      1
  );
```

Use `state` as column for value.

### 实体在 x 时间前的状态

If you want to extract the state of an entity from a day, hour, or minute ago, the query is:

```sql
SELECT 
  states.state
FROM 
  states 
  INNER JOIN states_meta ON 
    states.metadata_id = states_meta.metadata_id
WHERE 
  states_meta.entity_id = 'sensor.temperature_in' 
  AND last_updated_ts <= strftime('%s', 'now', '-1 day')
ORDER BY 
  last_updated_ts DESC 
LIMIT
  1;
```

Replace `-1 day` with the target offset, for example, `-1 hour`.
Use `state` as column for value.

Keep in mind that, depending on the update frequency of your sensor and other factors, this may not be a 100% accurate reflection of the actual situation you are measuring. Since your database won’t necessarily have a value saved exactly 24 hours ago, use “>=” or “<=” to get one of the closest values.

#### MariaDB

On MariaDB the following where clause can be used to compare the timestamp:

```sql
...
  AND last_updated_ts <= UNIX_TIMESTAMP(NOW() - INTERVAL 1 DAY)
...
```

Replace `- INTERVAL 1 DAY` with the target offset, for example, `- INTERVAL 1 HOUR`.

### 数据库大小

#### Postgres

```sql
SELECT pg_database_size('dsmrreader')/1024/1024 as db_size;
```

Use `db_size` as column for value.
Replace `dsmrreader` with the correct name of your database.

:::tip
The unit of measurement returned by the above query is `MiB`, please configure this correctly.

Set the device class to `Data size` so you can use UI unit conversion.

:::

#### MariaDB/MySQL

Change `table_schema="homeassistant"` to the name that you use as the database name, to ensure that your sensor will work properly.

```sql
SELECT table_schema "database", Round(Sum(data_length + index_length) / POWER(1024,2), 1) "value" FROM information_schema.tables WHERE table_schema="homeassistant" GROUP BY table_schema;
```

Use `value` as column for value.

:::tip
The unit of measurement returned by the above query is `MiB`, please configure this correctly.

Set the device class to `Data size` so you can use UI unit conversion.

:::

#### SQLite

If you are using the `recorder` integration then you don't need to specify the location of the database. For all other cases, add `sqlite:////path/to/database.db` as Database URL.

```sql
SELECT ROUND(page_count * page_size / 1024 / 1024, 1) as size FROM pragma_page_count(), pragma_page_size();
```

Use `size` as column for value.

:::tip
The unit of measurement returned by the above query is `MiB`, please configure this correctly.

Set the device class to `Data size` so you can use UI unit conversion.

:::
