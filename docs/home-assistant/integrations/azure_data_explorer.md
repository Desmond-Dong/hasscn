---
title: Azure Data Explorer
description: 'Azure Data Explorer(https://azure.microsoft.com/en-us/services/data-explorer/) 是一款高性能时序数据库、查询引擎和仪表板工具。Home Assistant Azure Data Explorer 集成允许您接入 Home。'
ha_category:
  - History
ha_release: 2024.6
ha_config_flow: true
ha_iot_class: Cloud Push
ha_codeowners:
  - '@kaareseras'
ha_domain: azure_data_explorer
related:
  - docs: /docs/configuration/
ha_integration_type: service
---
# Azure Data Explorer

[Azure Data Explorer](https://azure.microsoft.com/en-us/services/data-explorer/) 是一款高性能时序数据库、查询引擎和仪表板工具。Home Assistant **Azure Data Explorer** 集成允许您接入 Home Assistant 事件总线并将事件转发到 Azure Data Explorer 进行分析和仪表板展示。从这里，数据可以在构建仪表板、PowerBi 和 Grafana 等工具中查看。

## 前提条件

在将 Azure Data Explorer 添加到 Home Assistant 之前，您需要设置 Azure 账户、创建服务主体、创建集群并添加数据库。

### 创建免费 Azure 账户

创建一个[免费 Azure 账户](https://azure.microsoft.com/)。系统会要求您提供信用卡信息，但此处创建的所有资源都是免费的。

### 创建服务主体（应用注册）

为了使 Home Assistant 能够与 Azure Data Explorer 进行身份验证，它需要一个*服务主体*。
1. 要创建服务主体，请按照[创建 Microsoft Entra 应用注册](https://docs.microsoft.com/en-us/azure/data-explorer/provision-azure-ad-app)指南中的步骤 1-7 操作。
2. 复制以下值以供后续使用：
   - 应用程序（客户端）ID：来自应用注册概览
   - 目录（租户）ID：来自应用注册概览
   - 密钥值：来自步骤 1.7 中创建密钥时

### 创建免费 Azure Data Explorer 集群和数据库

创建 Azure Data Explorer 集群有两种方式：**按需付费（PAYG）** 或 **免费**。
要创建付费集群，请按照 [Microsoft 快速入门指南](https://docs.microsoft.com/en-us/azure/data-explorer/create-cluster-database-portal)中的说明操作。
但是，Microsoft 已推出免费套餐，本指南介绍如何设置免费的 Azure Data Explorer 集群和数据库：

**PAYG** 和 **免费** 版本之间有一些区别：

| 功能         | PAYG 集群           | 免费集群                    |
| --------------- | ---------------------- | ------------------------------- |
| 数据引入       | 流式和队列 | 仅队列（目前）         |
| 集群大小    | 完全可扩展         | 4 vCPU，8 GB 内存，约 100 GB 数据 |

1. 访问 [aka.ms/kustofree](https://aka.ms/kustofree)。
2. 进入 **My Cluster**。
3. 选择 **Create Cluster**。
4. 为集群和数据库命名。
5. 复制**数据库名称**以供后续使用。
6. 阅读并勾选**条款和条件**，然后选择 **Create Cluster**。
   - 一分钟内，您就会拥有一个可用的 Azure Data Explorer 集群。
7. 数据库创建完成后，从页面顶部复制 **Data ingestion URI**。

### 创建 Azure 数据表

1. 访问 [aka.ms/kustofree](https://aka.ms/kustofree)。
2. 进入 **Query**。
3. 逐条编写并执行以下语句，将 <> 之间的占位符内容替换为复制的值（包括括号）。

```text
// 授予服务主体对数据库的写入权限
.add database ['<databasename>'] ingestors ('aadapp=<ApplicationID>;<DirectoryID>');

// 授予服务主体对数据库的读取权限（用于连接检查）
.add database ['<databasename>'] viewers ('aadapp=<ApplicationID>;<DirectoryID>');

// 创建用于接收数据的表（替换名称并复制插入的 *name* 以供后续使用）
.create table ['<name_to_be_replaced>'] (entity_id: string, state: string, attributes: dynamic, last_changed: datetime, last_updated: datetime, context: dynamic)

// 创建从传入 JSON 到刚创建的表和列的映射（将名称替换为上一步中的表名）
.create table ['<name_to_be_replaced>'] ingestion json mapping 'ha_json_mapping' '[{"column":"entity_id","path":"$.entity_id"},{"column":"state","path":"$.state"},{"column":"attributes","path":"$.attributes"},{"column":"last_changed","path":"$.last_canged"},{"column":"last_updated","path":"$.last_updated"},{"column":"context","path":"$.context"}]'
```

这是一个使用免费集群的示例供参考：

```text
.add database ['HomeAssistant'] ingestors ('aadapp=b5253d02-c8f4-1234-a0f0-818491ba2a1f;72f123bf-86f1-41af-91ab-2d7cd011db93');

.add database ['HomeAssistant'] viewers ('aadapp=b5253d02-c8f4-1234-a0f0-818491ba2a1f;72f123bf-86f1-41af-91ab-2d7cd011db93');

.create table ['raw'] (entity_id: string, state: string, attributes: dynamic, last_changed: datetime, last_updated: datetime, context: dynamic)

.create table ['raw'] ingestion json mapping 'ha_json_mapping' '[{"column":"entity_id","path":"$.entity_id"},{"column":"state","path":"$.state"},{"column":"attributes","path":"$.attributes"},{"column":"last_changed","path":"$.last_canged"},{"column":"last_updated","path":"$.last_updated"},{"column":"context","path":"$.context"}]'
```


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

如果使用免费集群，请在表单中勾选 **Use Queueing client**。

流程完成后，Home Assistant 将开始向 Azure Data Explorer 发送数据。

默认情况下，Home Assistant 会缓冲 5 秒后再发送，Azure Data Explorer 中的批处理策略将进一步按默认设置进行批处理。

## 过滤器

可以选择在您的 "configuration.yaml" 文件中添加以下行，以过滤输入到 Azure Data Explorer 的数据：

```yaml
# 示例 configuration.yaml 条目
azure_data_explorer:
  filter:
    include_domains:
    - homeassistant
    - light
    - media_player
```

```yaml
filter:
  description: 过滤进入 Data Explorer 的域和实体。（[配置过滤器](#配置过滤器)）
  required: true
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

:::warning
不过滤域或实体将把每个事件都发送到 Azure Data Explorer。

:::
### 配置过滤器

默认情况下，不会排除任何实体。要限制哪些实体被暴露给 `Azure Data Explorer`，您可以使用 `filter` 参数。

```yaml
# 示例过滤器：包含指定域并排除指定实体
azure_data_explorer:
  filter:
    include_domains:
      - alarm_control_panel
      - light
    include_entity_globs:
      - binary_sensor.*_occupancy
    exclude_entities:
      - light.kitchen_light
```

过滤器应用规则如下：

1. 没有包含或排除 - 通过所有实体。
2. 有包含，没有排除 - 仅包含指定的实体。
3. 有排除，没有包含 - 仅排除指定的实体。
4. 同时有包含和排除：
   - 指定了包含域和/或 glob 模式：
      - 如果域被包含，且实体未被排除或匹配排除 glob 模式，则通过。
      - 如果实体匹配包含 glob 模式，且实体不匹配任何排除条件（域、glob 模式或列表），则通过。
      - 如果域未被包含，glob 模式不匹配，且实体未被包含，则失败。
   - 指定了排除域和/或 glob 模式，且包含未列出域或 glob 模式
      - 如果域被排除且实体未被包含，则失败。
      - 如果实体匹配排除 glob 模式且实体未被包含，则失败。
      - 如果实体不匹配任何排除条件（域、glob 模式或列表），则通过。
   - 包含和排除都未指定域或 glob 模式
      - 如果实体被包含，则通过（如上面的 #2）。
      - 如果实体同时匹配包含和排除模式，则忽略实体排除。


## 使用 Azure Data Explorer

设置完成后，数据将发送到 Azure Data Explorer，您可以开始探索您的数据。
以下是一些帮助您学习如何使用 Azure Data Explorer 的资源：

- MS Learn: [https://aka.ms/learn.kql](https://aka.ms/learn.kql), [https://aka.ms/learn.adx](https://aka.ms/learn.adx)
- YouTube: [Microsoft Azure Data Explorer 官方 YouTube 频道](https://www.youtube.com/channel/UCPgPN-0DLaImaaDR_TtKR8A)
- 博客: [Microsoft Data Explorer 官方博客](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/bg-p/AzureDataExplorer)