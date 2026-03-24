---
title: Logentries
description: 将事件发送到 Logentries。
ha_category:
  - History
ha_iot_class: Cloud Push
ha_release: 0.13
ha_domain: logentries
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Logentries** 集成可让您通过 Logentries Webhook 端点，将所有状态变更记录到 [Logentries](https://logentries.com)。

打开 **Add a Log** 页面并选择 **Manual**。在 **Log Name** 中输入日志名称，在 **Select Log Set** 中添加分组，选择 **Token TCP - logs are identified by a token.**，然后选择 **Create Log Token**。生成的令牌将用于 Home Assistant 配置。

要在您的安装中使用 **Logentries** 集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
logentries:
  token: TOKEN
```

```yaml
token:
  description: 要使用的日志令牌。
  required: true
  type: string
```
