---
title: Browser
description: 'Browser 集成提供一个动作，用于在主机的默认浏览器中打开 URL。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Utility
ha_release: pre 0.7
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: browser
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Browser

**Browser** 集成提供一个动作，用于在主机的默认浏览器中打开 URL。

## 配置

要加载此集成，请将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
browser:
```

### 动作

加载后，`browser` 平台将公开可以调用以执行各种动作的动作。

可用动作：`browser/browse_url`。

| 数据属性 | 可选 | 描述      |
| ---------------------- | -------- | ---------------- |
| `url`                  | 否       | 要打开的 URL。 |

### 使用

要使用此动作，请前往 [**设置** > **开发者工具** > **动作**](https://my.home-assistant.io/redirect/developer_services/)。从**动作**列表中选择动作 *browser/browse_url*，在**数据**字段中输入 URL，然后选择**执行动作**。

```json
{"url": "http://www.google.com"}
```

这将在主机上打开给定的 URL。
