---
title: Azure Service Bus
description: Azure Service Bus 集成设置
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.102
ha_codeowners:
  - '@hfurubotten'
ha_domain: azure_service_bus
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Azure Service Bus** 集成允许您从 Home Assistant 内部向 [Azure Service Bus](https://azure.microsoft.com/products/service-bus/) 发送消息。

## 首次设置

假设您已有 Azure 账户。否则，请在[这里](https://azure.microsoft.com/free/)创建免费账户。

您需要创建一个 Service Bus 命名空间；您可以按照[此指南](https://learn.microsoft.com/azure/service-bus-messaging/service-bus-quickstart-portal#create-a-namespace-in-the-azure-portal)操作。

然后，您必须为 Service Bus 创建一个具有 `Send` 声明的共享访问策略，或使用命名空间中的 RootManageAccessKey（此密钥具有额外的声明，包括管理事件中心和监听，这些对于此目的不需要），有关 Service Bus 安全性的更多详细信息，请[访问这里](https://learn.microsoft.com/azure/service-bus-messaging/service-bus-authentication-and-authorization#shared-access-signature)。或者，您可以为仅一个队列或主题创建专用密钥，以将访问限制为仅该队列或主题。

一旦您拥有具有 `Send` 策略的连接字符串，您就可以设置集成本身。

:::important
您要发送到的队列或主题需要在 Home Assistant 中使用之前就存在于 Service Bus 命名空间中。请参阅[这里](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quickstart-portal)了解如何设置队列，以及[这里](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quickstart-topics-subscriptions-portal)了解如何设置主题和订阅。

:::
## 配置

将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
notify:
  - platform: azure_service_bus
    connection_string: !secret servicebus_connection_string
    topic: t-test
  - platform: azure_service_bus
    connection_string: !secret servicebus_connection_string
    queue: q-test
```

```yaml
name:
  description: 设置可选参数 `name` 允许创建多个通知器。通知器将绑定到 `notify.NOTIFIER_NAME` 动作。
  required: false
  type: string
  default: notify
connection_string:
  description: 在 Azure 门户中找到的连接字符串，密钥中包含 `send` 声明。
  required: true
  type: string
queue:
  description: 要在其上发送通知的队列。
  required: exclusive
  type: string
topic:
  description: 要在其上发送通知的主题。
  required: exclusive
  type: string
```

:::tip
如果您计划从 Home Assistant 内的一个或多个实体发送所有状态更改，您应该考虑使用 [Azure Event Hub](/home-assistant/integrations/azure_event_hub/) 集成代替。

:::
## 使用

通知服务将把给定的数据转换为 Service Bus 上的 JSON 对象。`message` 字段将始终设置，但 `target` 和 `title` 字段是可选的，只有在设置时才包含在 Service Bus 消息中。在 `data` 部分给出的任何输入将被扁平化到 JSON 对象的根目录，并遵循给定的结构。在 data 部分给出的所有输入都将包含在消息中。

请参阅下面的示例，了解自动化触发器如何转换为 Service Bus 上的消息。

```yaml
automation:
  - alias: "日落 Service Bus 消息"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: notify.test_queue
        data:
          message: "太阳下山了"
          title: "晚上好"
          data:
            sun_direction: "下"
            custom_field: 123
            custom_object:
              trigger_more: true
              explain: "天开始变黑了"
```

可以从队列或主题订阅检索的消息：

```json
{
  "message": "太阳下山了",
  "title": "晚上好",
  "sun_direction": "下",
  "custom_field": 123,
  "custom_object": {
    "trigger_more": true,
    "explain": "天开始变黑了"
  }
}
```