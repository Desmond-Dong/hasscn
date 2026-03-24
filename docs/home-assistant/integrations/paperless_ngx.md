---
title: Paperless-ngx
description: 如何将 Paperless-ngx 集成到 Home Assistant 中的说明
ha_release: 2025.6
ha_category:
  - Sensor
  - Update
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: paperless_ngx
ha_codeowners:
  - '@fvgarrel'
ha_integration_type: service
ha_quality_scale: platinum
related:
  - url: https://docs.paperless-ngx.com/
    title: Paperless-ngx
ha_platforms:
  - diagnostics
  - sensor
  - update
---

**Paperless-ngx** 集成允许您将 [Paperless-ngx](https://docs.paperless-ngx.com/) 实例连接到 Home Assistant，并监控其状态和活动。

## 前提条件

:::important
此集成仅在 **Paperless-ngx 2.15 或更高版本**上获得完整支持。更早版本不受支持。

:::
为确保此集成具备完整功能，您必须对所有与文档相关的资源拥有**读取权限**，包括文档、标签、文档类型和通讯对象。

如需监控诊断传感器，您必须拥有**管理员权限**。如果没有管理员权限，将无法访问特定 API 端点，相应传感器状态也不会可用。

<details>
<summary>创建访问令牌</summary>


1. 登录您的 **Paperless-ngx** 实例。
2. 在右上角选择您的个人资料图标。
3. 选择 **My Profile**。
4. 在 **API Auth Token** 下，选择文本框右侧的 **Refresh** 按钮以生成新令牌，并用 **yes** 确认。
5. 复制该令牌，并在 Home Assistant 中设置集成时使用它。


</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
URL:
  description: "用于连接 Paperless-ngx 实例的 URL。"
API key:
  description: "用于连接 Paperless-ngx API 的 API 密钥。"
Verify SSL certificate:
  description: "验证 Paperless-ngx 实例的 SSL 证书。如果您使用的是自签名证书，请禁用此选项。"
```

## 使用场景

该集成可用于构建自动化，帮助您发现并提醒您 paperless 实例中的新文档。

如果有新的 Paperless-ngx 版本可用，更新传感器也可以通知您。

## 支持的功能

Paperless-ngx 集成为 Home Assistant 提供统计类和诊断类实体。

以下是这些实体及其作用的概览。

## 传感器

此集成为 Paperless-ngx 提供以下信息对应的传感器：

| Sensor                   | Description                                                                    |
|--------------------------|--------------------------------------------------------------------------------|
| **Correspondents**       | 表示已定义通讯对象的总数。 |
| **Document types**       | 表示已定义文档类型的总数。 |
| **Documents in inbox**   | 表示当前收件箱中的文档数量。 |
| **Tags**                 | 表示已定义标签的总数。 |
| **Total characters**     | 表示从所有文档中提取出的总字符数。 |
| **Total documents**      | 表示已存储文档的总数。 |
| **Total storage**        | 表示 Paperless-ngx 已使用的总磁盘空间。 |
| **Available storage**    | 表示 Paperless-ngx 剩余可用的磁盘空间。 |
| **Status database**      | 表示数据库是否可访问且运行正常。 |
| **Status index**         | 表示文档索引服务是否正常运行。 |
| **Status classifier**    | 表示文档分类服务是否正常运行。 |
| **Status Celery**        | 表示 Celery 任务队列是否处于活动状态并正在处理任务。 |
| **Status Redis**         | 表示用于任务排队的 Redis 服务是否可用。 |
| **Status sanity**        | 表示 Paperless-ngx 文档的一致性状态。 |
| **Software**             | 表示是否有新的 Paperless-ngx 更新可用。 |

## 自动化示例

<details>
<summary>当有新文档可用时发送推送通知</summary>


```yaml
alias: New document push notification
description: Sends a push notification if a new document is available
triggers:
  - entity_id: sensor.paperless_documents_inbox
    to: null
    trigger: state
conditions:
  - condition: template
    value_template: |
      {% if trigger.from_state is not none and trigger.to_state is not none %}
        {{ trigger.to_state.state > trigger.from_state.state }}
      {% else %}
        false
      {% endif %}
actions:
  - action: notify.mobile_app_iphone
    metadata: {}
    data:
      message: A new document is available.
```


</details>

## 数据更新

此集成使用拉取式机制获取数据。

- **统计传感器**每 **120 秒** 拉取一次  
- **诊断传感器**每 **300 秒** 拉取一次  
- 用于检测新 Paperless-ngx 版本的**更新检查**每 **24 小时**执行一次

## 已知限制

此集成存在以下已知限制：

- 此集成仅在 **Paperless-ngx 2.15 或更高版本**上获得完整支持。更早版本不受支持。
- 如需监控诊断传感器，您必须拥有**管理员权限**。如果没有管理员权限，将无法访问特定 API 端点，相应传感器状态也不会可用。

## 故障排除

<details>
<summary>消息：'Invalid hostname or IP address'</summary>


如果您看到 **Invalid hostname or IP address** 消息，请尝试以下步骤：

1. 确保输入的是完整 URL，例如 `https://paperless.example.com` 或 `https://192.168.178.11:8011`。

2. 默认启用 SSL。如果您使用未加密连接，必须在 URL 中明确使用 `http://` 而不是 `https://`。

3. 如果您使用自签名证书，请禁用 **Verify SSL certificate** 选项。


</details>

<details>
<summary>消息：'The token does not have permission to access the API'</summary>


如果您看到 **The token does not have permission to access the API** 消息，请尝试以下步骤：

1. 确认该令牌仍然有效，并且已正确分配给对应用户。

2. 使用 `https://paperless.example.com/api/schema/view/` 提供的 Swagger 界面测试该令牌。
   - 在 Swagger UI 中选择 **Authorize**，然后在 **tokenAuth (apiKey)** 中输入令牌。
   - 然后尝试访问 `/api/statistics/` 等相关端点，确认其响应符合预期。

3. 如果 Swagger 中一切正常，但集成仍然失败，请检查反向代理（例如 NGINX）是否返回了 **HTTP 403 错误**。如果是，集成也可能将其报告为权限问题。


</details>
