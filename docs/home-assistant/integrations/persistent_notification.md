---
title: Persistent Notification
description: 有关如何将持久通知集成到 Home Assistant 中的说明。
ha_category:
  - Other
ha_iot_class: Local Push
ha_release: 0.23
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: persistent_notification
ha_integration_type: system
---

**Persistent Notification** 集成可用于在前端显示必须由你手动关闭的通知。

<p class='img'>
  <img src='/home-assistant/images/screenshots/persistent-notification.png' />
</p>

## 自动化

持久通知[触发器](/home-assistant/docs/automation/trigger)可在持久通知更新时触发自动化。可通过为 `notification_id` 提供 ID 将触发器限制为特定通知；若省略该值，则自动化会对任意通知 ID 触发。若未提供 `update_type`，自动化会在以下更新类型时触发：`added`、`removed`、`updated` 或 `current`。若在 `update_type` 选项中提供其中一个或多个值，则仅在这些 `update_type` 事件发生时触发。

完整细节请参阅 [Home Assistant 自动化入门](/home-assistant/getting-started/automation/)指南或[自动化](/home-assistant/docs/automation/)文档。

[![Open **Settings** > **Automations & scenes** in your Home Assistant instance.](https://my.home-assistant.io/badges/automations.svg)](https://my.home-assistant.io/redirect/automations/)

YAML 中持久通知触发器示例如下：

```yaml
automation:
  - triggers:
      - trigger: persistent_notification
        # Optional. Possible values: added, removed, updated, current
        update_type:
          - added
          - removed
        # Optional.
        notification_id: invalid_config
```

可用于条件或动作的更多触发数据，请参阅[自动化触发器变量：Persistent Notification](/home-assistant/docs/automation/templating/#persistent-notification)。

### 动作：Create

`persistent_notification.create` 动作用于创建带有消息、标题和通知 ID 的持久通知。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | 通知正文。 |
| `title`                |      yes | 通知标题。 |
| `notification_id`      |      yes | 如果提供 `notification_id`，且已存在相同 ID 的通知，则会覆盖该通知。 |

下面是你的[自动化配置](/home-assistant/getting-started/automation/)中使用静态内容的[action](/home-assistant/docs/automation/action)示例。

```yaml
actions:
  - action: persistent_notification.create
    data:
      message: "Your message goes here"
      title: "Custom subject"
```

如果你想显示运行时信息，需要使用[模板](/home-assistant/docs/configuration/templating/)。


```yaml
actions:
  - action: persistent_notification.create
    data:
      title: >
        Thermostat is {{ state_attr('climate.thermostat', 'hvac_action') }}
      message: "Temperature {{ state_attr('climate.thermostat', 'current_temperature') }}"
```


`persistent_notification.dismiss` 动作需要提供 `notification_id`。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `notification_id`      |      no  | 必须提供 `notification_id` 以标识要移除的通知。 |

此动作允许你通过脚本或自动化移除通知。

```yaml
actions:
  - action: persistent_notification.dismiss
    data:
      notification_id: "1234"
```

`persistent_notification.dismiss_all` 动作允许你移除所有通知。

```yaml
actions:
  - action: persistent_notification.dismiss_all
```

### Markdown 支持

`message` 属性支持 [Markdown 格式语法](https://daringfireball.net/projects/markdown/syntax)。示例如下：

| 类型 | 消息 |
| ---- | ------- |
| 一级标题 | `# Headline` |
| 二级标题 | `## Headline` |
| 换行 | `\n` |
| 粗体 | `**My bold text**` |
| 斜体 | `*My italic text*` |
| 链接 | `[Link](https://home-assistant.io/)` |
| 图片 | `![image](/home-assistant/local/my_image.jpg)` |

:::note
此处的 `/local/` 指向 `.homeassistant/www/` 文件夹。

:::
### 创建持久通知

前往 [**设置** > **开发者工具** > **动作**](https://my.home-assistant.io/redirect/developer_services/)，然后在 **动作** 下拉框中选择 [`persistent_notification.create`](https://my.home-assistant.io/redirect/developer_services/?service=persistent_notification.create)。在 **data** 字段中输入类似下方示例的内容，并点击 **执行动作**。

```json
{
  "notification_id": "1234",
  "title": "Sample notification",
  "message": "This is a sample text."
}
```
这将创建上方所示的通知条目。

### 作为通知器使用

如果已加载 [Notify 集成](/home-assistant/integrations/notify/)，持久通知也可作为预配置通知器使用，对应实体为 `notify.persistent_notification`。这样即可用于需要通知器的功能，例如 [通知组](/home-assistant/integrations/group/#notify-groups) 或 [Alert 集成](/home-assistant/integrations/alert/)。

可在 `data` 中使用以下属性以扩展功能。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `notification_id`      |      yes | 如果提供 `notification_id`，且已存在相同 ID 的通知，则会覆盖该通知。 |
