# Zabbix

**Zabbix** 集成是通过 Zabbix API 连接到 [Zabbix](https://www.zabbix.com/) 监控实例的主集成。

您可以将 Home Assistant 的状态变化发布到 Zabbix。在 Zabbix 中，需要先创建一个主机，用于以独立条目的形式保存 Home Assistant 状态。这些条目会通过 Zabbix Low-Level Discovery (LLD) 自动创建。为了简化 Zabbix 中的设置，您可以为该主机使用这个[模板](/home-assistant/assets/integrations/zabbix/zbx_template_home_assistant.xml)。

Home Assistant 目前还支持以下设备类型：

* [Sensor](#sensor)

## 配置

要设置 Zabbix 集成，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
zabbix:
  host: IP_ADDRESS
```

```yaml
host:
  description: 您的 Zabbix 服务器。
  required: true
  type: string
path:
  description: Zabbix 安装路径。
  required: false
  type: string
  default: "`/zabbix/`"
ssl:
  description: 如果您的 Zabbix 安装使用 SSL，请设为 `true`。
  required: false
  type: boolean
  default: false
username:
  description: 您的 Zabbix 用户名。
  required: false
  type: string
password:
  description: 您的 Zabbix 密码。
  required: false
  type: string
publish_states_host:
  description: 用于接收 Home Assistant 状态变化的主机。需要先在 Zabbix 中手动创建，并关联上文所述模板。
  required: false
  type: string
publish_string_states:
  description: 同时发布字符串状态，也就是无法转换为数值的状态。
  required: false
  type: boolean
  default: false
exclude:
  type: list
  description: 配置哪些集成应排除，不发布到 Zabbix。([配置过滤器](#configure-filter))
  required: false
  keys:
    entities:
      type: [string, list]
      description: 要排除、不发布到 Zabbix 的实体 ID 列表。
      required: false
    entity_globs:
      type: [string, list]
      description: 排除所有匹配所列模式的实体。
      required: false
    domains:
      type: [string, list]
      description: 要排除、不发布到 Zabbix 的域列表。
      required: false
include:
  type: list
  description: 配置哪些集成应包含并发布到 Zabbix。如果设置了此项，其他所有实体都不会发布到 Zabbix。([配置过滤器](#configure-filter))
  required: false
  keys:
    entities:
      type: [string, list]
      description: 要包含并发布到 Zabbix 的实体 ID 列表。
      required: false
    entity_globs:
      type: [string, list]
      description: 包含所有匹配所列模式的实体。
      required: false
    domains:
      type: [string, list]
      description: 要包含并发布到 Zabbix 的域列表。
      required: false
```

### 完整配置

```yaml
# Example configuration.yaml entry
zabbix:
  host: ZABBIX_HOST
  path: ZABBIX_PATH
  ssl: false
  username: USERNAME
  password: PASSWORD
  publish_states_host: homeassistant
  publish_string_states: true
  exclude:
    domains:
      - device_tracker
    entities:
      - sun.sun
      - sensor.time
```

## 配置过滤器

默认情况下，不会排除任何实体。要限制哪些实体会发布到 Zabbix，您可以使用 `include` 和 `exclude` 参数。

```yaml
# Example filter to include specified domains and exclude specified entities
zabbix:
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

## 传感器

`zabbix` 传感器平台可让您监控 [Zabbix](https://www.zabbix.com/) 实例中当前活动触发器的数量。

:::important
您必须先配置 <a href="#configuration">Zabbix 集成</a>，才能使用这些传感器。

:::
要设置它，请将以下内容添加到您的 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zabbix
    triggers:
      name: Important Hosts Trigger Count
      hostids: [10051,10081,10084]
      individual: true
```

```yaml
triggers:
  description: 指定此传感器用于 Zabbix 的 `triggers`。未来还会有其他 Zabbix 传感器。
  required: true
  type: string
name:
  description: 允许您指定传感器名称，否则将使用 Zabbix 中保存的主机名。当您将多个 hostid 作为单个计数进行监控时，这会很有用。
  required: false
  type: string
hostids:
  description: 要用于筛选计数的 Zabbix hostid 列表。
  required: false
  type: string
individual:
  description: 用 `true`/`false` 指定在提供 hostid 列表时是否显示单独的传感器。如果为 false，则传感器状态将是指定主机的所有触发器数量之和（如果未提供 hostid，则统计整个 Zabbix 实例中的所有主机）。
  required: false
  type: boolean
  default: false
```
