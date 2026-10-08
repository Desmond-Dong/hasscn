# Apache Kafka

**Apache Kafka** 集成会将所有状态变更发送到 [Apache Kafka](https://kafka.apache.org/) 主题。

Apache Kafka 是一个用于读写实时数据流的平台。它会将数据安全地存储在分布式、可复制且具备容错能力的集群中。

要在您的 Home Assistant 实例中使用 **Apache Kafka** 集成，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
apache_kafka:
  ip_address: localhost
  port: 9092
  topic: home_assistant_1
```

```yaml
ip_address:
  description: Apache Kafka 集群的 IP 地址或主机名。
  required: true
  type: string
port:
  description: 要使用的端口。
  required: true
  type: integer
username:
  description: Apache Kafka 集群用于 SASL 认证的用户名。仅在使用 `SASL_SSL` 安全协议时需要。
  required: false
  type: string
password:
  description: Apache Kafka 集群用于 SASL 认证的密码。仅在使用 `SASL_SSL` 安全协议时需要。
  required: false
  type: string
security_protocol:
  description: 与代理通信时使用的安全协议。使用 `SSL` 建立安全连接，或使用 `SASL_SSL` 建立带 SASL 身份验证的安全连接。（仅支持 `SASL_PLAINTEXT` 机制）
  required: false
  default: PLAINTEXT
  type: string
topic:
  description: 要发送数据的 Kafka 主题。
  required: true
  type: string
filter:
  description: 要包含/排除的实体过滤器。（[配置过滤器](#configure-filter)）
  required: false
  type: map
  keys:
    include_domains:
      description: 要包含的域。
      required: false
      type: list
    include_entity_globs:
      description: 包含所有匹配所列模式的实体。
      required: false
      type: list
    include_entities:
      description: 要包含的实体。
      required: false
      type: list
    exclude_domains:
      description: 要排除的域。
      required: false
      type: list
    exclude_entity_globs:
      description: 排除所有匹配所列模式的实体。
      required: false
      type: list
    exclude_entities:
      description: 要排除的实体。
      required: false
      type: list
```

## 配置过滤器

默认情况下，不会排除任何实体。要限制哪些实体会发送到 `Apache Kafka`，可以使用 `filter` 参数。

```yaml
# 示例过滤器：包含指定域并排除指定实体
apache_kafka:
  ip_address: localhost
  port: 9092
  topic: home_assistant_1
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
