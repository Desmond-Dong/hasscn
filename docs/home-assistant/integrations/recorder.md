---
title: Recorder
description: 有关如何为 Home Assistant 配置数据记录器的说明。
ha_category:
  - History
ha_release: pre 0.7
ha_quality_scale: internal
ha_domain: recorder
ha_iot_class: Local Push
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

**Recorder** 集成默认作为 [`history`](/home-assistant/integrations/history/) 集成的依赖项启用。

:::important
此集成会持续保存数据。如果你使用默认配置，数据将保存在 Home Assistant 所安装的存储介质上。如果是在使用 SD 卡的 Raspberry Pi 上，这可能会影响系统响应速度以及存储介质（SD 卡）的寿命。因此，建议你将 [commit_interval](/home-assistant/integrations/recorder#commit_interval) 设为更高的值，比如 30 秒，限制存储的数据量（例如排除部分设备），或将数据存储到其他位置（例如另一台系统）。

:::
Home Assistant 使用 [SQLAlchemy](https://www.sqlalchemy.org/)，它是一个对象关系映射器（ORM）。因此可以支持多种数据库方案。

支持的数据库方案包括：
- [MariaDB](https://mariadb.org/) ≥ 10.3
- [MySQL](https://www.mysql.com/) ≥ 8.0
- [PostgreSQL](https://www.postgresql.org/) ≥ 12
- [SQLite](https://www.sqlite.org/) ≥ 3.40.1

虽然 SQLAlchemy 还支持 Home Assistant 官方支持范围之外的数据库，但它在不同数据库上的行为并不完全一致，而 recorder 所依赖的某些功能在不同数据库上可能表现不同，甚至完全不可用。

默认且推荐的数据库引擎是 [SQLite](https://www.sqlite.org/)，它无需任何配置。数据库文件存储在你的 Home Assistant 配置目录（`/config/`）中，文件名为 `home-assistant_v2.db`。

:::caution
更改 recorder 使用的数据库可能会导致你丢失现有历史记录。不支持迁移数据。

:::
## 磁盘空间要求

最低要求是：任何时候都至少保留与数据库当前大小相同的可用临时空间。表重建、修复或重打包可能随时发生，这些操作会在磁盘上临时复制一份数据。在版本升级期间尤其必须满足这一最低要求，因为模式结构可能发生变化，而这种操作几乎总是需要临时复制数据库的一部分。

例如，如果你的数据库在磁盘上占用 1.5&nbsp;GiB，那么你必须始终至少保留 1.5&nbsp;GiB 的可用空间。

## 高级配置

要更改安装环境中 `recorder` 集成的默认设置，请将以下内容添加到你的 "`configuration.yaml`" 文件中：

```yaml
# Example configuration.yaml entry
recorder:
```

```yaml
recorder:
  description: 启用 recorder 集成。只能配置一次。
  required: true
  type: map
  keys:
    db_url:
      description: 指向你的数据库的 URL。示例可参见[此处](#custom-database-engines)。
      required: false
      type: string
    db_max_retries:
      description: recorder 重试连接数据库的最大次数。
      required: false
      default: 10
      type: integer
    db_retry_wait:
      description: recorder 尝试连接数据库失败后等待的秒数。
      required: false
      default: 3
      type: integer 
    auto_purge:
      description: 每天本地时间 04:12 自动清理数据库。清理可以防止数据库无限增长，否则会占用磁盘空间并拖慢 Home Assistant。如果你禁用 `auto_purge`，建议创建自动化来定期调用 [`recorder.purge`](#action-purge)。
      required: false
      default: true
      type: boolean
    auto_repack:
      description: 在每月第二个星期日的自动清理之后自动重打包数据库。如果不进行重打包，即使清理后数据库大小也可能不会减小，这会占用磁盘空间并拖慢 Home Assistant。如果你禁用 `auto_repack`，建议创建自动化来定期调用 [`recorder.purge`](#action-purge)。如果禁用了 `auto_purge`，此选项不会生效。
      required: false
      default: true
      type: boolean
    purge_keep_days:
      description: 指定清理后在 recorder 数据库中保留多少天的历史数据。
      required: false
      default: 10
      type: integer
    commit_interval:
      description: 事件和状态变化写入数据库的频率（秒）。默认值 `5` 可让事件几乎立即写入，同时避免在事件风暴发生时频繁冲击磁盘。增大该值可减少磁盘 I/O，并可能延长磁盘（SD 卡）寿命，但代价是数据库中的数据会有延迟（活动和历史不会延迟，因为变更会立即流式传输到它们）。如果设为 `0`，则会在事件处理后尽快提交。
      required: false
      default: 5
      type: integer
    exclude:
      description: 配置哪些集成应从记录中排除。([配置筛选器](#configure-filter))
      required: false
      type: map
      keys:
        domains:
          description: 要从记录中排除的 domain 列表。
          required: false
          type: list
        entity_globs:
          description: 从记录中排除所有匹配所列模式的实体（例如 `sensor.weather_*`）。
          required: false
          type: list
        entities:
          description: 要从记录中排除的实体 ID 列表。
          required: false
          type: list
        event_types:
          description: 要从记录中排除的事件类型列表。
          required: false
          type: list
    include:
      description: 配置哪些集成应包含在记录中。如果设置了此项，则不会记录其他实体。([配置筛选器](#configure-filter))
      required: false
      type: map
      keys:
        domains:
          description: 要包含在记录中的 domain 列表。
          required: false
          type: list
        entity_globs:
          description: 将所有匹配所列模式的实体包含到记录中（例如 `sensor.weather_*`）。
          required: false
          type: list
        entities:
          description: 要包含在记录中的实体 ID 列表。
          required: false
          type: list
```

### 配置筛选器

默认情况下，不会排除任何实体。若要限制哪些实体会暴露给 `recorder`，可以使用 `include` 和 `exclude` 参数。

```yaml
# 示例：包含指定 domain 并排除指定实体的筛选器
recorder:
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

如果你只是想让事件不显示在 **Activity** 面板中，请查看 [Activity 集成](/home-assistant/integrations/logbook/)。但如果你对某些事件有隐私顾虑，或希望它们既不出现在历史记录中，也不出现在活动中，那么你应使用 `recorder` 集成的 `exclude` / `include` 选项。这样这些数据甚至不会写入数据库，你也可以通过排除某些高频记录事件（如 `sensor.last_boot`）来减少存储占用并保持数据库精简。

#### 常见筛选示例

当你对当前记录内容基本满意，只想移除少量实体或 domain 时，使用 `exclude`（也就是阻止列表）来定义要排除的 domain 和实体会更方便。

```yaml
# 带有 exclude 的 configuration.yaml 示例
recorder:
  purge_keep_days: 5
  db_url: sqlite:////home/user/.homeassistant/test
  exclude:
    domains:
      - automation
      - update
    entity_globs:
      - sensor.sun*
      - weather.*
    entities:
      - sensor.date
      - sensor.last_boot # Comes from 'systemmonitor' sensor platform
      - sun.sun # Don't record sun data
    event_types:
      - my_custom_event
```

如果你的系统中实体很多，而 `exclude` 列表可能会非常大，那么使用 `include` 配置（也就是允许列表）来定义要记录的 domain 或实体会更方便。

```yaml
# 带有 include 的 configuration.yaml 示例
recorder:
  include:
    domains:
      - sensor
      - switch
      - media_player
```

你也可以使用 `include` 列表定义要记录的 domain 或实体，再在 `exclude` 列表中排除其中一部分。例如，你想包含整个 `sensor` domain，但又不想记录其中某些特定传感器，这时就无需把每个传感器都单独加入 `include` 的 `entities` 列表，只需包含 `sensor` domain，再排除你不关心的那些传感器即可。

```yaml
# 同时使用 include 和 exclude 的 configuration.yaml 示例
recorder:
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

## 动作

### 动作：清理

`recorder.purge` 动作会启动清理任务，根据 `keep_days` 动作数据删除早于指定天数的事件和状态。请注意，清理不会立即减少磁盘占用，但会显著减缓数据库后续增长速度。

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                                                             |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keep_days`            | yes      | 在 recorder 数据库中保留的历史天数（默认使用集成配置中的 `purge_keep_days`） |
| `repack`               | yes      | 使用 SQLite 或 PostgreSQL 时会重写整个数据库。使用 MySQL 或 MariaDB 时会优化或重建事件和状态表。这是一个开销较大的操作，执行期间可能导致变慢并临时增加磁盘占用。仅支持 SQLite、PostgreSQL、MySQL 和 MariaDB。 |
| `apply_filter`         | yes      | 除基于时间的清理外，再应用 `entity_id` 和 `event_type` 筛选。适合结合 `include` / `exclude` 筛选器来移除误加入的状态和事件。可与 `repack: true` 一起使用以减小数据库体积。 |

### 动作：清理实体

`recorder.purge_entities` 动作会启动一个任务，从 recorder 数据库中清理匹配指定 `entity_id`、`domains` 或 `entity_globs` 字段的事件和状态。这三个筛选条件中至少要提供一个。

| Data attribute | Optional | Description                                                                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | 要从 recorder 数据库中清理的实体 ID 列表。 |
| `domains`              | yes      | 要从 recorder 数据库中清理的 domain 列表。 |
| `entity_globs`         | yes      | 用于识别需要从 recorder 数据库清理的实体的正则表达式列表。 |
| `keep_days`            | yes      | 对匹配记录在数据库中保留的历史天数。默认值 0 表示删除所有匹配记录。 |

#### 移除特定实体数据行的自动化示例

下面的自动化会在每天 `04:15:00` 删除 `sensor.power_sensor_0` 中早于 5 天的历史数据。

```yaml
alias: "Purge noisy power sensors"
triggers:
  - trigger: time
    at: "04:15:00"
actions:
  - action: recorder.purge_entities
    data:
      keep_days: 5
      entity_id: sensor.power_sensor_0
```

### 动作：禁用

`recorder.disable` 动作会停止将事件和状态保存到数据库。

### 动作：启用

`recorder.enable` 动作会重新开始将事件和状态保存到数据库。这与 `recorder.disable` 相反。

### 动作：获取统计信息

`recorder.get_statistics` 动作用于从 recorder 数据库中获取一个或多个实体的统计信息。对于需要访问历史统计数据（如平均值、最小值、最大值或总和）的自动化或脚本来说，这个动作很有用，尤其适用于像传感器这样受支持的实体。

:::note
统计信息仅适用于存储了 Long-term statistics 的实体。

:::
| Data attribute | Optional | Description |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `statistic_ids`| no      | 要获取统计信息的实体 ID 或统计 ID。 |
| `start_time`   | no      | 统计查询的开始时间。 |
| `end_time`     | yes      | 统计查询的结束时间。如果省略，则返回从开始时间起的所有统计数据。 |
| `period`       | no      | 统计分组的时间粒度（`5minute`、`hour`、`day`、`week` 或 `month`）。 |
| `types`        | no      | 要返回的统计值类型（`change`、`last_reset`、`max`、`mean`、`min`、`state` 或 `sum`）。 |
| `units`        | yes      | 可选的单位转换映射。它是一个对象，键为[设备类别](https://www.home-assistant.io/integrations/sensor#device-class)，值为目标单位。这样可以按不同于数据库存储单位的方式获取转换后的统计数据。 |

#### 使用 get_statistics 的示例

```yaml
action: recorder.get_statistics
data:
  statistic_ids:
    - sensor.energy_meter
    - sensor.water_usage
  start_time: "2025-06-10 00:00:00"
  end_time: "2025-06-11 23:00:00"
  period: hour
  types:
    - sum
    - mean
  units:
    energy: kWh
    volume: L
response_variable: consumption_stats
```

## 处理磁盘损坏和硬件故障

在使用 SQLite 时，如果系统遇到无法恢复的磁盘损坏，它会将现有数据库移开，并创建一个新数据库以保持系统在线。在这种情况下，至少保留相当于数据库大小 2.5 倍的可用磁盘空间至关重要。创建新数据库是系统最后的恢复手段，通常由闪存存储故障、电源不足、异常关机或其他硬件故障引起。

发生这种情况时，你也许可以按照 [SQLite 恢复指南](https://www.sqlite.org/recovery.html) 恢复旧数据库。

## 自定义数据库引擎

:::warning
SQLite 是测试最充分的方案，而且较新的 Home Assistant 版本已经针对 SQLite 做了大量优化，可获得良好性能。

如果你选择其他方案，就需要能够承担数据库管理员的职责，包括备份外部数据库。

:::
下面是可与 [`db_url`](#db_url) 配置项一起使用的示例。

```yaml
SQLite:
  description: >
    `sqlite:////PATH/TO/DB_NAME`
MariaDB (omit pymysql):
  description: >
    `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4`
MariaDB (omit pymysql, using TLS encryption):
  description: >
    `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4;ssl=true`
MariaDB (omit pymysql, Socket):
  description: >
    `mysql://user:password@SERVER_IP/DB_NAME?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4`
MySQL:
  description: >
    `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4`
MySQL (using TLS encryption):
  description: >
    `mysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4;ssl=true`
MySQL (Socket):
  description: >
    `mysql://user:password@localhost/DB_NAME?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4`
MariaDB:
  description: >
    `mysql+pymysql://user:password@SERVER_IP/DB_NAME?charset=utf8mb4`
MariaDB (Socket):
  description: >
    `mysql+pymysql://user:password@localhost/DB_NAME?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4`
PostgreSQL:
  description: >
    `postgresql://user:password@SERVER_IP/DB_NAME`
PostgreSQL (Socket):
  description: >
    `postgresql://@/DB_NAME`
PostgreSQL (Custom socket dir):
  description: >
    `postgresql://@/DB_NAME?host=/path/to/dir`
```

:::note
某些 MariaDB/MySQL 安装环境可能需要在 SERVER_IP 中添加 `ALTERNATE_PORT`（例如第三方托管服务或并行安装），例如：`mysql://user:password@SERVER_IP:ALTERNATE_PORT/DB_NAME?charset=utf8mb4`。

:::
:::note
使用 MariaDB 或 MySQL 服务器时，在 URL 中添加 `+pymysql` 会使用纯 Python 的 MySQL 库，速度较慢，但在 C 版 MySQL 库不可用时可能是必须的。

使用官方 Docker 镜像时，C 版 MySQL 库始终可用。`pymysql` 最常见于使用 `venv` 的环境，因为那里通常没有安装 C 版 MySQL 库。

:::
:::tip
如果数据库与 `recorder` 实例运行在同一主机上（也就是 `localhost`），Unix Socket 连接始终比 TCP 连接更有性能优势。

:::
:::note
如果你想在 PostgreSQL 中使用 Unix Socket，需要修改 `pg_hba.conf`。参见 [PostgreSQL](#postgresql)。

:::
### 数据库启动

如果你的数据库服务器实例与 Home Assistant 运行在同一台服务器上，那么你必须确保数据库服务先于 Home Assistant 启动。对于运行 Systemd 的 Linux 系统（如 Raspberry Pi、Debian、Ubuntu 等），你应编辑服务文件。
为帮助处理这一点，增加了 `db_max_retry` 和 `db_retry_wait` 变量，以确保 recorder 会重试足够多次，让数据库有时间完成启动。

```bash
sudo nano /etc/systemd/system/home-assistant@homeassistant.service
```

然后为数据库添加启动依赖，例如 PostgreSQL：

```text
[Unit]
Description=Home Assistant
After=network.target postgresql.service
```

保存文件后，重新加载 `systemctl`：

```bash
sudo systemctl daemon-reload
```

## 安装说明

并非所有所选数据库引擎的 Python 绑定都能直接安装。本节提供了一些额外说明，帮助你完成配置。

### MariaDB 和 MySQL

:::warning
低于 10.5.17、10.6.9、10.7.5 和 10.8.4 的 MariaDB 版本存在性能回退问题，可能导致系统在查询历史数据或清理数据库时过载。

:::
请确保数据库服务器的默认字符集设置为 `utf8mb4`（参见 [MariaDB 文档](https://mariadb.com/kb/en/setting-character-sets-and-collations/#example-changing-the-default-character-set-to-utf-8)）。
如果你使用的是虚拟环境，请不要忘记在安装下面提到的 `mysqlclient` Python 包之前先激活环境。

```bash
pi@homeassistant:~ $ sudo -u homeassistant -H -s
homeassistant@homeassistant:~$ source /srv/homeassistant/bin/activate
(homeassistant) homeassistant@homeassistant:~$ pip3 install mysqlclient
```

对于 MariaDB，你可能需要安装一些依赖。如果你使用的是 MariaDB 10.3，还必须安装 `libmariadb-dev-compat` 包。请根据你的 MariaDB 版本安装正确的软件包。

在 Python 侧，我们使用 `mysqlclient`：

```bash
sudo apt-get install libmariadbclient-dev libssl-dev
pip3 install mysqlclient
```

对于 MySQL，你可能也需要安装一些依赖。你可以在 `pymysql` 和 `mysqlclient` 之间选择：

```bash
sudo apt-get install default-libmysqlclient-dev libssl-dev
pip3 install mysqlclient
```

安装依赖后，你需要手动创建数据库。启动时，Home Assistant 会查找 `db_url` 中指定的数据库。如果数据库不存在，它不会自动帮你创建。

数据库引擎必须为 `InnoDB`，因为不支持 `MyIASM`。

```bash
SET GLOBAL default_storage_engine = 'InnoDB';
CREATE DATABASE DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
```
其中 `DB_NAME` 是你的数据库名称。

一旦 Home Assistant 找到该数据库，并且权限级别正确，所需的全部数据表就会自动创建，并开始写入相应数据。

### PostgreSQL

请使用 `utf8` 编码创建 PostgreSQL 数据库。PostgreSQL 的默认编码是 `SQL_ASCII`。在 `postgres` 用户账户下执行：
```bash
createdb -E utf8 DB_NAME
```
其中 `DB_NAME` 是你的数据库名称。

如果正在使用的数据库不是 `utf8` 编码，在 `db_url` 后添加 `?client_encoding=utf8` 可能可以解决相关问题。

对于 PostgreSQL，你可能也需要安装一些依赖：

```bash
sudo apt-get install postgresql-server-dev-X.Y
pip3 install psycopg2
```

如果要使用 Unix Socket，首先请在 `postgres` 用户账户下创建你的用户：
```bash
createuser USER_NAME
```
其中 `USER_NAME` 是运行 Home Assistant 实例的用户名（参见[保护你的安装](/home-assistant/docs/configuration/securing/)）。

然后在你的 [`pg_hba.conf`](https://www.postgresql.org/docs/current/static/auth-pg-hba-conf.html) 中添加以下一行：

`local  DB_NAME USER_NAME peer`

其中 `DB_NAME` 是你的数据库名称，`USER_NAME` 是运行 Home Assistant 实例的用户名（参见[保护你的安装](/home-assistant/docs/configuration/securing/)）。

之后重新加载 PostgreSQL 配置：
```bash
$ sudo -i -u postgres psql -c "SELECT pg_reload_conf();"
 pg_reload_conf
----------------
 t
(1 row)
```
重启服务也可以达到同样效果。
