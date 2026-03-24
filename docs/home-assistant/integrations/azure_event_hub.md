---
title: Azure Event Hub
description: Azure Event Hub 集成设置
ha_category:
  - History
ha_release: 0.94
ha_iot_class: Cloud Push
ha_codeowners:
  - '@eavanvalkenburg'
ha_domain: azure_event_hub
ha_config_flow: true
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
---

**Azure Event Hub** 集成允许您接入 Home Assistant 事件总线，并将事件发送到 [Azure Event Hub](https://azure.microsoft.com/products/event-hubs/) 或 [Azure IoT Hub](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-messages-read-builtin)。

## 首次设置

假设您已有 Azure 账户。否则，请在[这里](https://azure.microsoft.com/free/)创建免费账户。

您需要创建一个 Event Hub 命名空间和该命名空间中的一个 Event Hub，您可以按照[此指南](https://learn.microsoft.com/azure/event-hubs/event-hubs-create)操作。或者，您可以直接从[这里](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.eventhub/event-hubs-create-event-hub-and-consumer-group)部署包含命名空间和 Event Hub 的 ARM 模板。

然后，您必须为 Event Hub 创建一个具有"发送"声明的共享访问策略，或使用命名空间中的 RootManageAccessKey（此密钥具有额外的声明，包括管理事件中心和监听，这些对于此目的不需要），有关 Event Hub 安全性的更多详细信息，请[访问这里](https://learn.microsoft.com/azure/event-hubs/authenticate-shared-access-signature)。

一旦您拥有命名空间、实例、共享访问策略和该策略密钥的名称，您就可以设置集成本身。

另一种方法是使用连接字符串和实例名称，这可以以与共享访问策略相同的方式检索，也可以从 IoT Hub 中的设备获取（Event Hub 兼容的连接字符串）。在 IoT Hub 的情况下，您需要将设备 ID 作为实例名称。

最后需要考虑的是您希望集成多久以批处理方式向您的中心发送消息，这通过 `send_interval` 设置，默认为 5 秒。由于此组件以异步方式运行，无法保证发送完全按时发生，而且由于您的 Home Assistant 可能因大量事件发生而非常繁忙，它可能会丢弃超过 20 秒加上 `send_interval` 的旧事件。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

您可以通过 "`configuration.yaml`" 设置[过滤器](#filter-configuration)。

:::warning
不过滤域或实体将把每个事件发送到 Azure Event Hub，从而占用大量空间和带宽。

:::
:::note
Event Hub 的保留时间最多为 7 天，如果您不捕获或使用事件，它们将自动从 Event Hub 中删除，默认保留期为 1 天。

:::
### 过滤器配置

默认情况下，不会排除任何实体。要限制哪些实体被暴露给 `Azure Event Hub`，您可以使用 `filter` 参数。

```yaml
# 示例过滤器：包含指定域并排除指定实体
azure_event_hub:
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

```yaml
filter:
  description: Event Hub 的域和实体过滤器。
  required: false
  type: map
  default: 包含所有域的所有实体
  keys:
    include_domains:
      description: 要包含的域列表（例如 `light`）。
      required: false
      type: list
    exclude_domains:
      description: 要排除的域列表（例如 `light`）。
      required: false
      type: list
    include_entity_globs:
      description: 包含所有匹配列出模式的实体（例如 `sensor.weather_*`）。
      required: false
      type: list
    exclude_entity_globs:
      description: 排除所有匹配列出模式的实体（例如 `sensor.weather_*`）。
      required: false
      type: list
    include_entities:
      description: 要包含的实体列表（例如 `light.attic`）。
      required: false
      type: list
    exclude_entities:
      description: 要排除的实体列表（例如 `light.attic`）。
      required: false
      type: list
```

## 在 Azure 中使用数据

有多种方式可以将进入 Event Hub 的数据流式传输到 Azure 的存储中，最简单的方法是使用内置的捕获功能，这允许您将数据捕获到 Azure Blob Storage 或 Azure Data Lake store，[详细信息在这里](https://learn.microsoft.com/azure/event-hubs/event-hubs-capture-overview)。

Azure（及外部）的其他存储可以通过 [Azure Stream Analytics 作业](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-define-inputs#stream-data-from-event-hubs)实现，例如 [Cosmos DB](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-documentdb-output)、[Azure SQL DB](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-sql-output-perf)、[Azure Table Storage](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-define-outputs)、自定义写入 [Azure Blob Storage](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-custom-path-patterns-blob-storage-output) 和 [Topic 及 Queues](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-quick-create-portal#configure-job-output)。

在分析方面，Event Hub 可以直接输入到 [Azure Databricks Spark](https://learn.microsoft.com/azure/databricks/structured-streaming/streaming-event-hubs)、[Azure Time Series Insights](https://learn.microsoft.com/azure/time-series-insights/how-to-ingest-data-event-hub) 和 [Microsoft Power BI](https://learn.microsoft.com/azure/stream-analytics/stream-analytics-real-time-fraud-detection)。

在 Azure 中使用数据的最后一种方法是使用 [Event Hub 触发器绑定](https://learn.microsoft.com/azure/azure-functions/functions-bindings-event-hubs)将 Azure Function 连接到 Event Hub。