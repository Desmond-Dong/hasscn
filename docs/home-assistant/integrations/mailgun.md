---
title: Mailgun
description: '要接收来自 Mailgun 的 webhook，您的 Home Assistant 实例必须能从公网访问，并且需要正确配置(/home-assistant/integrations/homeassistant/allowlistexternalurls)外部 URL。'
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.38
ha_config_flow: true
ha_domain: mailgun
ha_platforms:
  - notify
ha_integration_type: service
---
# Mailgun

要接收来自 Mailgun 的 webhook，您的 Home Assistant 实例必须能从公网访问，并且需要正确[配置](/home-assistant/integrations/homeassistant/#allowlist_external_urls)外部 URL。

要进行设置，请前往配置页面中的集成页面，找到 Mailgun，点击“配置”，然后按照屏幕上的说明完成配置。

您将获得一个如下格式的 URL：`https://<home-assistant-domain>/api/webhook/9940e99a26fae4dcf6fe0a478124b6b58b578ea4c55c9a584beb1c9f5057bb91`。要接收来自 Mailgun 的 webhook，您需要在 Mailgun 控制面板的 Webhooks 标签页中，将该 URL 作为回调 URL 提供给 Mailgun。

Home Assistant 目前支持以下设备类型：

- [通知](#notifications)。

## 配置

```yaml
# Example configuration.yaml entry
mailgun:
  domain: EXAMPLE.COM
  api_key: YOUR_API_KEY
```

```yaml
domain:
  description: 发送邮件时使用的域名。必须是您设置的第一个自定义域名。
  required: true
  type: string
api_key:
  description: 您在 Mailgun 账户中生成的 API 令牌。
  required: true
  type: string
sandbox:
  description: "（**已弃用**）是否对发出邮件使用沙盒域名。由于 `domain` 项是必需的，因此应直接将其设置为沙盒域名，所以此选项不再需要。"
  required: false
  default: false
  type: boolean
```

来自 Mailgun 的事件会在 Home Assistant 中以 `mailgun_message_received` 事件的形式触发。[Mailgun 定义的数据](https://documentation.mailgun.com/en/latest/api-events.html#event-structure)会作为事件数据提供。您可以使用此事件触发自动化。

然后，您可以通过以下自动化使用这些信息：

```yaml
automation:
  triggers:
    - trigger: event
      event_type: mailgun_message_received
      event_data:
        action: call_service
  actions:
    - action: light.turn_on
      target:
        entity_id: light.office
```

## 通知

Mailgun 通知操作允许您通过 Mailgun 的 REST API 发送电子邮件。它要求先完成 [Mailgun 组件](#configuration) 的设置。

### 通知配置

```yaml
# Example configuration.yaml entry
notify:
  - name: mailgun
    platform: mailgun
    recipient: CHANGE@EXAMPLE.COM
```

```yaml
name:
  description: "可选参数 `name` 允许创建多个通知器。通知器将绑定到 `notify.NOTIFIER_NAME` 操作。"
  required: false
  type: string
  default: notify
recipient:
  description: 收件人的电子邮件地址。
  required: true
  type: string
sender:
  description: 发件人的电子邮件地址。
  required: false
  default: "`hass@DOMAIN`, where `DOMAIN` is the outgoing mail domain, as defined by the `domain` configuration entry."
  type: string
```

### 自动化示例

以下自动化会在某个事件发生时发送一封带有两个附件的电子邮件。

```yaml
# Example automation using Mailgun notifications
automation:
  triggers:
    - trigger: event
      event_type: SPECIAL_EVENT
  actions:
    - action: notify.mailgun
      data:
        title: "Something special has happened"
        message: "This a test message from Home Assistant"
        data:
          images:
            - /home/pi/pic_test1.png
            - /home/pi/pic_test2.png
```
