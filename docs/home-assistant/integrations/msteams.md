---
title: Microsoft Teams
description: 'Microsoft Teams 集成允许您将通知从 Home Assistant 发送到 Microsoft Teams(https://www.microsoft.com/microsoft-teams/group-chat-software) 的团队频道。'

ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.101
ha_codeowners:
  - '@peroyvind'
ha_domain: msteams
ha_platforms:
  - notify
ha_integration_type: integration
ha_quality_scale: legacy
---
# Microsoft Teams

**Microsoft Teams** 集成允许您将通知从 Home Assistant 发送到 [Microsoft Teams](https://www.microsoft.com/microsoft-teams/group-chat-software) 的团队频道。

:::note
请注意，Microsoft 已宣布将在 Microsoft Teams 中停用 Office 365 连接器。现有连接器将[持续工作至 2025 年 12 月](https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/)。


:::
## 设置

要向 Teams 发送通知，您需要将 Incoming Webhook 应用添加到团队频道。添加后，您会获得一个 webhook URL，需要将其添加到 `configuration.yaml` 中。


## 配置

要在您的安装中添加 Microsoft Teams 平台，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
notify:
  - platform: msteams
    url: https://outlook.office.com/webhook/<ID>
```

```yaml
name:
  description: 设置此参数可创建多个通知器。通知器将绑定到 `notify.NOTIFIER_NAME` 操作。
  required: false
  type: string
  default: "notify"
url:
  description: 在设置步骤中创建的 webhook URL。
  required: true
  type: string
```

### Microsoft Teams 服务数据

以下属性可放入 `data` 中，以启用扩展功能。

| Data attribute | Optional | Description                     |
| ---------------------- | -------- | ------------------------------- |
| `image_url`            | yes      | 为消息附加一张图片。 |

图片必须是 HTTPS URL，并且根据 Microsoft [文档](https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#common-properties-for-all-cards)的说明，该图片必须位于可公开访问的位置。

使用 URL 发布文件的示例：

```yaml
title: Title of the message.
message: Message that will be added.
data:
  image_url: URL_OF_IMAGE
```
