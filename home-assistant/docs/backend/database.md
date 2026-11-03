# 数据库

Home Assistant 使用数据库来存储历史记录和跟踪的数据及参数。默认使用的数据库是 [SQLite](https://www.sqlite.org/)。

数据库文件存储在您的[配置目录](/home-assistant/docs/configuration/index.md#to-find-the-configuration-directory)中（例如，`<path to config dir>/home-assistant_v2.db`）；但是，也可以使用其他数据库。如果您更喜欢运行数据库服务器（如 PostgreSQL），请使用 [`recorder`](/home-assistant/integrations/recorder/index.md) 集成。

要从命令行手动操作 SQLite 数据库，您需要[安装](https://www.sqlitetutorial.net/download-install-sqlite/) `sqlite3`。或者，[DB Browser for SQLite](https://sqlitebrowser.org/) 提供了一个查看器来浏览数据库数据，以及一个编辑器来执行 SQL 命令。

首先使用 `sqlite3` 加载数据库：

```bash
$ sqlite3 home-assistant_v2.db
SQLite version 3.13.0 2016-05-18 10:57:30
Enter ".help" for usage hints.
sqlite>
```

设置一些选项可以使输出更易读：

```bash
sqlite> .header on
sqlite> .mode column
```

您也可以先启动 `sqlite3`，稍后再附加数据库。不确定您正在使用哪个数据库？检查一下，特别是当您要删除数据时。

```bash
sqlite> .databases
seq  name             file
---  ---------------  ----------------------------------------------------------
0    main             /home/fab/.homeassistant/home-assistant_v2.db
```

### 数据库结构

从当前 Home Assistant 数据库获取所有可用的表：

```bash
sqlite> SELECT sql FROM sqlite_master;

-------------------------------------------------------------------------------------
CREATE TABLE event_data (
        data_id INTEGER NOT NULL,
        hash BIGINT,
        shared_data TEXT,
        PRIMARY KEY (data_id)
)

CREATE TABLE event_types (
        event_type_id INTEGER NOT NULL,
        event_type VARCHAR(64),
        PRIMARY KEY (event_type_id)
)

CREATE TABLE state_attributes (
        attributes_id INTEGER NOT NULL,
        hash BIGINT,
        shared_attrs TEXT,
        PRIMARY KEY (attributes_id)
)

CREATE TABLE states_meta (
        metadata_id INTEGER NOT NULL,
        entity_id VARCHAR(255),
        PRIMARY KEY (metadata_id)
)

CREATE TABLE statistics_meta (
        id INTEGER NOT NULL,
        statistic_id VARCHAR(255),
        source VARCHAR(32),
        unit_of_measurement VARCHAR(255),
        has_mean BOOLEAN,
        has_sum BOOLEAN,
        name VARCHAR(255), mean_type INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (id)
)

CREATE TABLE recorder_runs (
        run_id INTEGER NOT NULL,
        start DATETIME NOT NULL,
        "end" DATETIME,
        closed_incorrect BOOLEAN NOT NULL,
        created DATETIME NOT NULL,
        PRIMARY KEY (run_id)
)

CREATE TABLE schema_changes (
        change_id INTEGER NOT NULL,
        schema_version INTEGER,
        changed DATETIME NOT NULL,
        PRIMARY KEY (change_id)
)

CREATE TABLE statistics_runs (
        run_id INTEGER NOT NULL,
        start DATETIME NOT NULL,
        PRIMARY KEY (run_id)
)

CREATE TABLE events (
        event_id INTEGER NOT NULL,
        event_type CHAR(0),
        event_data CHAR(0),
        origin CHAR(0),
        origin_idx SMALLINT,
        time_fired CHAR(0),
        time_fired_ts FLOAT,
        context_id CHAR(0),
        context_user_id CHAR(0),
        context_parent_id CHAR(0),
        data_id INTEGER,
        context_id_bin BLOB,
        context_user_id_bin BLOB,
        context_parent_id_bin BLOB,
        event_type_id INTEGER,
        PRIMARY KEY (event_id),
        FOREIGN KEY(data_id) REFERENCES event_data (data_id),
        FOREIGN KEY(event_type_id) REFERENCES event_types (event_type_id)
)

CREATE TABLE states (
        state_id INTEGER NOT NULL,
        entity_id CHAR(0),
        state VARCHAR(255),
        attributes CHAR(0),
        event_id SMALLINT,
        last_changed CHAR(0),
        last_changed_ts FLOAT,
        last_updated CHAR(0),
        last_updated_ts FLOAT,
        old_state_id INTEGER,
        attributes_id INTEGER,
        context_id CHAR(0),
        context_user_id CHAR(0),
        context_parent_id CHAR(0),
        origin_idx SMALLINT,
        context_id_bin BLOB,
        context_user_id_bin BLOB,
        context_parent_id_bin BLOB,
        metadata_id INTEGER, last_reported_ts FLOAT,
        PRIMARY KEY (state_id),
        FOREIGN KEY(old_state_id) REFERENCES states (state_id),
        FOREIGN KEY(attributes_id) REFERENCES state_attributes (attributes_id),
        FOREIGN KEY(metadata_id) REFERENCES states_meta (metadata_id)
)

CREATE TABLE statistics (
        id INTEGER NOT NULL,
        created CHAR(0),
        created_ts FLOAT,
        metadata_id INTEGER,
        start CHAR(0),
        start_ts FLOAT,
        mean FLOAT,
        min FLOAT,
        max FLOAT,
        last_reset CHAR(0),
        last_reset_ts FLOAT,
        state FLOAT,
        sum FLOAT, mean_weight FLOAT,
        PRIMARY KEY (id),
        FOREIGN KEY(metadata_id) REFERENCES statistics_meta (id) ON DELETE CASCADE
)

CREATE TABLE statistics_short_term (
        id INTEGER NOT NULL,
        created CHAR(0),
        created_ts FLOAT,
        metadata_id INTEGER,
        start CHAR(0),
        start_ts FLOAT,
        mean FLOAT,
        min FLOAT,
        max FLOAT,
        last_reset CHAR(0),
        last_reset_ts FLOAT,
        state FLOAT,
        sum FLOAT, mean_weight FLOAT,
        PRIMARY KEY (id),
        FOREIGN KEY(metadata_id) REFERENCES statistics_meta (id) ON DELETE CASCADE
)

CREATE TABLE sqlite_stat1(tbl,idx,stat)

CREATE INDEX ix_event_data_hash ON event_data (hash)

CREATE UNIQUE INDEX ix_event_types_event_type ON event_types (event_type)

CREATE INDEX ix_state_attributes_hash ON state_attributes (hash)

CREATE UNIQUE INDEX ix_states_meta_entity_id ON states_meta (entity_id)

CREATE UNIQUE INDEX ix_statistics_meta_statistic_id ON statistics_meta (statistic_id)

CREATE INDEX ix_recorder_runs_start_end ON recorder_runs (start, "end")

CREATE INDEX ix_statistics_runs_start ON statistics_runs (start)

CREATE INDEX ix_events_data_id ON events (data_id)

CREATE INDEX ix_events_event_type_id_time_fired_ts ON events (event_type_id, time_fired_ts)

CREATE INDEX ix_events_time_fired_ts ON events (time_fired_ts)

CREATE INDEX ix_events_context_id_bin ON events (context_id_bin)

CREATE INDEX ix_states_context_id_bin ON states (context_id_bin)

CREATE INDEX ix_states_attributes_id ON states (attributes_id)

CREATE INDEX ix_states_last_updated_ts ON states (last_updated_ts)

CREATE INDEX ix_states_metadata_id_last_updated_ts ON states (metadata_id, last_updated_ts)

CREATE INDEX ix_states_old_state_id ON states (old_state_id)

CREATE INDEX ix_statistics_start_ts ON statistics (start_ts)

CREATE UNIQUE INDEX ix_statistics_statistic_id_start_ts ON statistics (metadata_id, start_ts)

CREATE UNIQUE INDEX ix_statistics_short_term_statistic_id_start_ts ON statistics_short_term (metadata_id, start_ts)

CREATE INDEX ix_statistics_short_term_start_ts ON statistics_short_term (start_ts)

CREATE TABLE migration_changes (
        migration_id VARCHAR(255) NOT NULL,
        version SMALLINT NOT NULL,
        PRIMARY KEY (migration_id)
)
```

如果只想显示关于 `states` 表的详细信息（因为我们在接下来的示例中会用到这个表）：

```bash
sqlite> SELECT sql FROM sqlite_master WHERE type = 'table' AND tbl_name = 'states';
```

### 查询

既然已经确认了表中可用的列，我们现在可以开始编写查询。下面列出更新次数最多的 10 个实体：

```bash
sqlite> .width 30, 10,
sqlite> SELECT states_meta.entity_id, COUNT(*) as count FROM states INNER JOIN states_meta ON states.metadata_id = states_meta.metadata_id GROUP BY states_meta.entity_id ORDER BY count DESC LIMIT 10;
entity_id                       count
------------------------------  ----------
sensor.cpu                      28874
sun.sun                         21238
sensor.time                     18415
sensor.new_york                 18393
cover.kitchen_cover             17811
switch.mystrom_switch           14101
sensor.internet_time            12963
sensor.solar_angle1             11397
sensor.solar_angle              10440
group.all_switches              8018
```

### 删除

如果您不想保留某些实体，可以使用 [Recorder 提供的动作](/home-assistant/integrations/recorder/index.md#action-purge_entities) 永久删除它们。

如需更交互式地操作数据库，请查看 [Data Science Portal](https://data.home-assistant.io/)。
