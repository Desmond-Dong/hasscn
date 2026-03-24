---
title: Synology Chat
description: 有关如何将 Synology Chat Bot 通知添加到 Home Assistant 的说明。
ha_iot_class: Cloud Push
ha_release: 0.65
ha_category:
  - Notifications
ha_domain: synology_chat
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Synology Chat** 集成允许您以 Synology Chat 机器人的方式，将通知发送到您的 [Synology Chat](https://www.synology.com/en-us/dsm/feature/chat) 实例。

要配置 Synology Chat 机器人，首先必须创建一个 [Synology Chat Integration Incoming Webhook](https://www.synology.com/en-us/knowledgebase/DSM/tutorial/Collaboration/How_to_configure_webhooks_and_slash_commands_in_Chat_Integration#t2.1)。完成后，您将获得一个 Webhook URL，这就是 Home Assistant 配置中需要用到的内容。

要在您的安装中启用 Synology Chat 通知，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
notify:
  - platform: synology_chat
    name: hass_synchat
    resource: https://example.your.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=1&token=ABCDEFG
```

```yaml
name:
  description: "设置参数 `name` 可创建多个通知器。该通知器会绑定到 `notify.NOTIFIER_NAME` 操作。"
  required: true
  type: string
verify_ssl:
  description: 是否关闭 HTTPS 资源的 SSL/TLS 验证（例如使用自签名证书时）。
  required: false
  type: boolean
  default: true
resource:
  description: 传入的 webhook URL。
  required: true
  type: string
```

有关如何使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。

完整操作示例：

```json
{"message": "This is a test message", 
 "data":{
     "file_url":"https://example.com/wp-content/uploads/sites/14/2011/01/cat.jpg"
     }
 }
```
