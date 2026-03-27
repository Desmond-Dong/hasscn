---
title: Google Pub/Sub
description: 'Google Pub/Sub 集成允许您挂钩到 Home Assistant 事件总线并将事件发送到 Google Cloud Pub/Sub(https://cloud.google.com/pubsub/docs/overview)。当前 GCP。'
ha_category:
  - History
ha_release: 0.88
ha_iot_class: Cloud Push
ha_domain: google_pubsub
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Google Pub/Sub

**Google Pub/Sub** 集成允许您挂钩到 Home Assistant 事件总线并将事件发送到 [Google Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/overview)。当前 GCP 的[免费层](https://cloud.google.com/free/)应该允许您平均每 2 秒同步约 1 个事件（每月 200 万次调用）。

## 首次设置

这假设您已经有一个 Google Cloud 项目。如果没有，请在 [Google Cloud Console](https://console.cloud.google.com/projectcreate) 中创建一个。

在 [Google Cloud API Console](https://console.cloud.google.com/cloudpubsub/topicList) 中创建一个 Google Pub/Sub 主题。主题名称将类似于 `projects/project-198373/topics/topic-name`。只记下最后一部分（您选择的名称）：`topic-name`。

接下来，您需要在 [Google Cloud API Console](https://console.cloud.google.com/apis/credentials/serviceaccountkey) 中创建一个服务账户密钥

- 选择一个新的"New Service Account"，给它一个名称，并将密钥类型保留为 JSON
- 选择角色：Pub/Sub Publisher

这将把服务账户 JSON 密钥下载到您的机器上。不要与任何人分享此文件。将此文件放在您的 Home Assistant 配置文件夹中。

## 配置

将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
google_pubsub:
  project_id: YOUR_PROJECT_ID
  topic_name: YOUR_TOPIC_NAME
  credentials_json: CREDENTIALS_FILENAME
```

```yaml
project_id:
  description: Google 控制台的项目 ID（看起来像 `words-2ab12`）。
  required: true
  type: string
topic_name:
  description: Pub/Sub [相对](https://cloud.google.com/pubsub/docs/admin#resource_names) 主题名称（看起来像 `hass`）。
  required: true
  type: string
credentials_json:
  description: Google 服务账户 JSON 文件的文件名。
  required: true
  type: string
filter:
  description: 为 Google Cloud Pub/Sub 过滤域和实体。（[配置过滤器](#configure-filter)）
  required: true
  type: map
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

:::important
不过滤域或实体会将每个事件发送到 Google PubSub，从而很快达到免费层限制。请务必填写此配置参数或为 Google Cloud 付费订阅。

:::
### 配置过滤器

默认情况下，不会排除任何实体。要限制哪些实体暴露给 `Google Pub/Sub`，您可以使用 `filter` 参数。

```yaml
# 示例过滤器，包含指定域并排除指定实体
google_pubsub:
  project_id: YOUR_PROJECT_ID
  topic_name: YOUR_TOPIC_NAME
  credentials_json: CREDENTIALS_FILENAME
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

### 使用 Google Cloud Function 保存数据

要自动将数据保存到 BigQuery，请按照[此处的说明](https://github.com/timvancann/home-assistant-pubsub-cloud-function)操作。当前 GCP 的[免费层](https://cloud.google.com/free/)应该允许存储多达 10GB 的数据。