---
title: Sinch SMS
description: 'Sinch SMS 集成使用 Sinch(https://www.sinch.com/products/apis/messaging/sms/) 发送来自 Home Assistant 的通知。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Notifications
ha_release: 0.101
ha_codeowners:
  - '@bendikrb'
ha_domain: sinch
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Sinch SMS

**Sinch SMS** 集成使用 [Sinch](https://www.sinch.com/products/apis/messaging/sms/) 发送来自 Home Assistant 的通知。

## 前提条件

前往 [Sinch Dashboard](https://dashboard.sinch.com/sms/api/rest) 并点击 `Add new REST API`。随后您即可获取 `service_plan_id` 和 `api_key`。

## 配置

要在您的安装中添加 Sinch，请将以下内容添加到 Home Assistant 的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
notify:
  - platform: sinch
    service_plan_id: SINCH_SERVICE_PLAN_ID
    api_key: SINCH_API_KEY
```

```yaml
name:
  description: "设置可选参数 `name` 可创建多个通知器。默认值为 `Sinch`。该通知器会绑定到 `notify.NOTIFIER_NAME` 操作。"
  required: false
  type: string
service_plan_id:
  description: 您的 Sinch Service Plan ID。
  required: true
  type: string
api_key:
  description: 您的 API Token。
  required: true
  type: string
default_recipient:
  description: "一个或多个电话号码。默认情况下（即在操作中未指定 `target` 时），短信通知会发送到这里，例如 `09171234567` 或 `[09171234567, 09177654321]`。"
  required: false
  type: [string, list]
sender:
  description: 发送方名称或号码。
  required: false
  type: string
  default: 'Home Assistant'
```

有关如何使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。

### 完整配置示例

```yaml
# Example configuration.yaml entry
notify:
  - platform: sinch
    name: Sinch
    service_plan_id: SINCH_SERVICE_PLAN_ID
    api_key: SINCH_API_KEY
    default_recipient: [PHONE_NO1, PHONE_NO2]
    sender: Home Assistant
```
