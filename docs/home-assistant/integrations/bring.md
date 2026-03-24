---
title: Bring!
description: 关于如何将 Bring! 待办事项列表集成到 Home Assistant 的说明。
ha_category:
  - To-do list
ha_iot_class: Cloud Polling
ha_release: 2024.2
ha_config_flow: true
ha_codeowners:
  - '@miaucl'
  - '@tr4nt0r'
ha_domain: bring
ha_integration_type: service
ha_platforms:
  - diagnostics
  - event
  - sensor
  - todo
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - url: https://www.getbring.com/
    title: Bring!
ha_quality_scale: platinum
---

**Bring!** 集成允许您将 [Bring!](https://www.getbring.com/) 购物清单与 Home Assistant 同步。

## 关于 Bring!  

**Bring!** 是一款杂货购物清单应用，允许用户创建共享清单，并与家人、伴侣或室友一起组织杂货购物。  

可通过 [Google Play for Android](https://play.google.com/store/apps/details?id=ch.publisheria.bring) 和 [App Store for iOS](https://apps.apple.com/app/id580669177) 下载移动应用。**Bring!** 还在 [web.getbring.com](https://web.getbring.com) 提供网页版本。  

## 如何使用此集成

- **自动通知**：当必需物品添加到您的清单或物品数量达到设定值时，在手机上接收提醒。
- **基于事件的清单更新**：当电器用品不足（如洗碗机盐）或需要日常维护（如洗衣机清洁剂）时，自动将物品添加到您的购物清单。
- **语音控制**：使用 [Assist](/home-assistant/voice_control/)（Home Assistant 的语音助手）将物品添加到您的 **Bring!** 购物清单。
- **地理围栏**：当您靠近特定商店并需要取货时，根据您的位置接收提醒。

## 前提条件

对于身份验证，集成需要您 **Bring!** 账户的 `email` 和 `password`。如果您没有账户，可以通过移动应用或网页版本注册。

如果您使用 **Apple ID**、**Google Sign-in** 或 **Facebook Login** 注册，则需要创建密码才能使用此集成。

- 在移动端：打开 Bring! 应用并转到 **Profile** > **More settings** > **Change password**。  
- 在网页端：访问 **Settings** > **Reset password** 或直接访问 [Reset Password](https://web.getbring.com/app/settings/resetpassword)。

之后您仍然可以使用现有的身份验证方法登录。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 配置参数

```yaml
Email:
  description: "与您的 Bring! 账户关联的电子邮件地址。"
Password:
  description: "登录您的 Bring! 账户的密码。"
```

## 传感器

- **Urgent**：显示购物清单上带有 **Urgent** 标记的物品数量。已完成的物品不包括在内。
- **On occasion**：显示带有 **If convenient** 标记的物品数量。
- **Discount only**：显示带有 **Offer** 标记的物品数量。
- **Region & Language**：该传感器可用于诊断。如果设置正确，它将显示购物清单的所选区域。如果显示 **Unknown**，则表示在 **Bring!** 应用中未正确设置区域。
- **List access**：指示购物清单是 **personal**（私有）还是 **shared**（其他人可访问）。

## 事件

- **Activities:** 事件实体显示 Bring! 购物清单上的最新活动，包括活动类型和执行活动的用户头像。有三种活动类型：*Items added*（用户向清单添加物品时）、*Items removed*（用户移除物品时）和 *Items changed*（用户修改物品详情或数量时）。事件属性提供更多详细信息，包括添加、移除或修改的物品列表、用户名称和活动的确切时间。

## 动作

您可以使用 [待办事项列表](/home-assistant/integrations/todo/) 的动作来创建、更新或删除您的 Bring! 购物清单上的物品。

### 通知

**Bring!** 集成提供一个动作，用于向共享购物清单的其他成员的 Bring! 移动应用发送推送通知。Bring! 移动应用有 4 种预定义的通知类型。

:::note
如果您想接收这些通知，必须使用专用账户，如[已知限制](#known-limitations)中所述。


:::
| 数据属性         | 可选 | 描述                                                                                                                             |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `target`               |       否 | 应通知其成员的目标 Bring! 清单。                                                                                 |
| `message`              |       否 | 要发送给清单成员的推送通知类型。请参阅[通知类型](#available-notification-types)。                             |
| `item`                 |      是 | `urgent_message` 必需。消息中要包含的物品。例如：*注意！注意！- 我们仍然急需：香菜*。 |

#### 可用的通知类型

| 通知类型   | 通知名称                                           |
| ------------------- | -------------------------------------------------------------- |
| `going_shopping`    | 我要去购物了！- 最后调整机会              |
| `changed_list`      | 我更改了清单！- 看看物品                 |
| `shopping_done`     | 购物完成！- 冰箱已装满             |
| `urgent_message`    | 注意！注意！- 我们仍然急需：`[物品]`      |

:::note
清单成员收到的通知与 Bring! 应用中显示的标签不同。这种变化不仅取决于收件人的语言设置，还取决于发送者的个人资料名称。此外，通知可能随新应用更新而更改。以下是一些示例通知：

- `name` 正在为"`购物清单名称`"购物！最后修改机会
- `name` 已为"`购物清单名称`"购物！冰箱已装满
- `name` 更新了清单"`购物清单名称`"！看看物品
- 注意，缺东西了！请紧急购买 `item`


:::
<details>
<summary>示例 YAML 配置</summary>


#### 发送要去购物通知

```yaml
...
actions:
  - action: bring.send_message
    target:
      entity_id: todo.bring_shoppinglist
    data:
      message: going_shopping 
```

#### 发送紧急消息通知

请注意，对于通知类型 `urgent_message`，属性 `item` 是**必需的**。

```yaml
...
actions:
  - action: bring.send_message
    target:
      entity_id: todo.bring_shoppinglist
    data:
      message: urgent_message
      item: 香菜
```


</details>

### 动作：发送反应

**Bring!** 中的反应让用户可以用表情符号快速确认购物清单更新。Home Assistant 中的 `bring.send_reaction` 动作允许向[活动实体](#events)的最新事件发送 👍 或 ❤️ 等反应。

| 数据属性         | 可选 | 描述                                                                                                  |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `entity_id`            |       否 | 要对其最新活动做出反应的 Bring! Activities 实体。例如，event.shopping_list_activities。   |
| `reaction`             |       否 | 作为对清单成员活动回应发送的反应。                                                |

#### 可用的反应

| 反应   | 表情符号 |
|------------|-------|
| `THUMBS_UP`| 👍🏼    |
| `MONOCLE`  | 🧐    |
| `DROOLING` | 🤤    |
| `HEART`    | ❤️     |

<details>
<summary>示例 YAML 配置</summary>


```yaml
...
actions:
  - action: bring.send_reaction
    data:
      reaction: HEART
    target:
      entity_id: event.shoppinglist_activities
```


</details>

## 自动化

从这些 **Bring!** 自动化示例开始，每个都包含可直接使用的蓝图！

### 杂货购物提醒 🛒

当该去杂货购物时收到通知。当您的购物清单达到设定阈值或添加紧急物品时会发送通知。

[![Open **Import blueprint** in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fcommunity.home-assistant.io%2Ft%2Fbring-grocery-shopping-reminder%2F843123)

<details>
<summary>示例 YAML 配置</summary>


```yaml
triggers:
  - trigger: numeric_state
    entity_id: todo.shopping_list
    above: 10
    id: shopping list too long
  - trigger: numeric_state
    entity_id: sensor.shopping_list_urgent
    above: 0
    id: shopping is urgent
actions:
  - choose:
      - conditions:
          - condition: trigger
            id: shopping list too long
        sequence:
          - action:
              - action: notify.notify
                data:
                  message: >-
                    清单变长了，计划这几天去杂货店
                  title: 很快需要购物 🛒
      - conditions:
          - condition: trigger
            id: shopping is urgent
        sequence:
          - action:
              - action: notify.notify
                data:
                  title: 🚨 该去购物了！🛒
                  message: 需要紧急购买杂货！拿起购物袋出发吧！
  - delay:
      hours: 1
mode: single
alias: "Bring!: 杂货购物提醒 🛒"
description: "当该去杂货购物时收到通知。当您的购物清单达到设定阈值或添加紧急物品时会发送通知。"
```


</details>

## 数据更新  

此集成通过每 90 秒轮询 **Bring!** 服务或在 Home Assistant 中执行操作（如添加物品）后立即同步您的清单。如果您希望更新频率较低，也可以定义**自定义轮询间隔**——有关详细信息，请参阅[定义自定义轮询间隔](/home-assistant/common-tasks/general/#defining-a-custom-polling-interval)。

## 已知限制

- 在 Home Assistant 中所做的更改会立即反映在 **Bring!** 应用中，而 Bring! 应用中的更改可能会因轮询间隔而延迟最多 90 秒。
- 要在 Home Assistant 中添加或移除物品时在 **Bring!** 应用中接收推送通知，或通过 `bring.send_message` 动作触发时，建议在设置集成时使用专用账户（例如 `email:name+ha@example.com`）。

## 故障排除

**Bring!** 集成依赖活动的互联网连接与 Bring! 通信。如果您遇到问题，请验证您的网络连接是否稳定。此外，Bring! 服务本身可能会遇到停机，无论是意外的还是由于计划维护。

- **502 - Bad Gateway** 错误（`aiohttp.client_exceptions.ClientResponseError: 502, message='Bad Gateway'`）已知会偶尔发生（每天 1-2 次），但通常是暂时的。集成将在 90 秒后自动重试，因此无需采取行动。

无论如何，报告问题时，请启用[调试日志](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)，重启集成，问题再次出现后立即停止调试日志（调试日志文件将自动开始下载）。此外，如果仍有可能，请同时下载[诊断](/home-assistant/integrations/diagnostics)数据。如果您已收集调试日志和诊断数据，请将其与问题报告一起提供。

## 移除集成

可以按照以下步骤移除此集成：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.