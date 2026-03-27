---
title: Notifications
description: 'The Notify integration makes it possible to send notifications to a wide variety of platforms. To use it, you have to set up at least one notification。'

ha_category:
  - Notifications
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: notify
ha_integration_type: entity
---
# Notifications

The **Notify** integration makes it possible to send notifications to a wide variety of platforms. To use it, you have to set up at least one notification target (notifier). Check the [integrations list](/home-assistant/integrations/#notifications) for one that fits your use case.

如果您想向 Home Assistant 网页界面发送通知，您可以使用[持久通知集成](/home-assistant/integrations/persistent_notification/)。它可以作为自动配置的通知程序使用。有关更多详细信息，请参阅[其文档](/home-assistant/integrations/persistent_notification/)。

:::note Building block integration
This notifications is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this notifications building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the notifications building block offers.
:::

## 通知实体的状态

通知实体的状态是上次发送消息的日期和时间。

<p 类='img'>
<img src='/home-assistant/images/integrations/notify/state_notify.png' alt='显示开发人员工具中通知实体状态的屏幕截图' />
显示开发人员工具中通知实体状态的屏幕截图。
</p>

此外，实体可以具有以下状态：

- **不可用**：该实体当前不可用。
- **未知**：状态未知。

## Action

旧的“notify”平台将公开一个通用的“notify”操作，可以调用该操作来发送通知。

| Data attribute | Optional | Description                                                                                                                |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `message`      | no       | Body of the notification.                                                                                                  |
| `title`        | yes      | Title of the notification.                                                                                                 |
| `target`       | yes      | Some platforms allow specifying a recipient that will receive the notification. See your platform page if it is supported. |
| `data`         | yes      | On platforms who have extended functionality. See your platform page if it is supported.                                   |

## Usage

The different **Notify** integrations you have set up will each show up as a different automation action that you can use.

自动包含一个通知集成，即持久通知，它在 Home Assistant Web 界面的侧边栏中创建通知。可以通过名为“通知：发送持久通知”的操作来选择此操作，该操作使用“notify.persistent_notification”操作。

## Notify action

集成还可以实现通知实体平台。实体平台实现将及时取代旧的通知操作。有一个实体平台操作“send_message”，它允许您向多个通知实体发送通知消息。

| Data attribute | Optional | Description                |
| -------------- | -------- | -------------------------- |
| `message`      | no       | Body of the notification.  |
| `title`        | yes      | Title of the notification. |

## 配套应用程序通知

常见的通知集成是通过适用于 Android 或 iPhone 的 Home Assistant Companion 应用程序进行的。可以通过“通过 mobile_app_your_phone_name 发送通知”操作来选择此操作，该操作使用“notify.mobile_app_your_phone_name”操作。有关大量自定义选项，请参阅[配套应用程序文档](https://companion.home-assistant.io/docs/notifications/notifications-basic)。

对于任何这些集成，自动化编辑器中输入的“消息”数据都是将发送的主要文本。其他字段是可选的，并且某些集成支持额外的“数据”或“目标”信息来自定义操作。有关更多详细信息，请参阅他们的集成文档。

请注意，“notify.notify”操作是系统可以找到的第一个通知操作的简写。它可能无法按预期工作。选择特定操作以确保您的消息到达正确的位置。

还可以使用[通知组](https://www.home-assistant.io/integrations/group/#notify-groups)发送通知。这些允许您通过一次调用将通知发送到多个设备，或者仅通过在一个位置更改来更新通知的设备。

###测试是否有效

After you set up a [notifier](/home-assistant/integrations/#notifications), a simple way to test if you have set up your notify platform correctly is to open [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_services/) tab from the sidebar. Choose your action from the **Action** dropdown menu depending on the integration you want to test, such as **Notifications: Send a persistent notification** or **Notifications: Send a notification via mobile_app_your_phone_name**. Enter your message into the **message** field, and select the **Perform action** button.

要测试实体平台操作，请选择“notify.send_message”操作，然后选择“entity”、“device”、“area”或“label”中的一项或多项。然后，提供一条“消息”。

### 实体平台通知操作示例

Under [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_services/), select the **Notifications: Send a notification message** action. Select some target entities using the entity selectors, enter a message and test sending it.

If you switch to view the YAML data under **Developer tools**, it will appear as below. The same action can be chosen in automation. The YAML will appear the same:


```yaml
action: notify.send_message
data:
  entity_id: notify.my_direct_message_notifier
  message: "You have an update!"
  title: "Status changed"
```


通知集成支持指定[模板](/home-assistant/docs/configuration/templating/)。这将允许您在通知中使用 Home Assistant 中实体的当前状态，或使用更复杂的逻辑来决定发送的消息。


```yaml
actions:
  action: notify.send_message
  data:
    entity_id: notify.my_direct_message_notifier
    message: "You have {{ states('todo.shopping_list') }} items on your shopping list."
```


### 旧通知操作的示例

在 **开发人员工具** 的 **操作** 选项卡上，选择 **通知：发送持久通知** 操作。输入消息并测试发送。

If you switch to view the YAML data under **Developer tools**, it will appear as below. The same action can be chosen in automation actions, whose YAML will appear the same:


```yaml
action: notify.persistent_notification
data:
  message: "Can you hear me now?"
```


通知集成支持指定[模板](/home-assistant/docs/configuration/templating/)。这将允许您在通知中使用 Home Assistant 中实体的当前状态，或使用更复杂的逻辑来决定发送的消息。


```yaml
actions:
  - action: notify.persistent_notification
    data:
      message: "You have {{ states('todo.shopping_list') }} items on your shopping list."
```


```yaml
actions:
  - action: notify.persistent_notification
    data:
      message: "The sun is {% if is_state('sun.sun', 'above_horizon') %}up{% else %}down{% endif %}!"
```


