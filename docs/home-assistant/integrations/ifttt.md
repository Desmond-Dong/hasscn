---
title: IFTTT
description: 'IFTTT(https://ifttt.com) 是一项 Web 服务，可让您创建由简单条件语句组成的链式自动化，也就是所谓的“Applets”。借助 IFTTT 集成，您可以通过 "Webhooks" 服务（此前称为 "Maker" 渠道）触发 applet。'
ha_category:
  - Automation
ha_iot_class: Cloud Push
ha_release: 0.8
ha_config_flow: true
ha_domain: ifttt
ha_platforms:
  - alarm_control_panel
ha_integration_type: integration
---
# IFTTT

[IFTTT](https://ifttt.com) 是一项 Web 服务，可让您创建由简单条件语句组成的链式自动化，也就是所谓的“Applets”。借助 IFTTT 集成，您可以通过 **"Webhooks"** 服务（此前称为 **"Maker"** 渠道）触发 applet。这需要 [Pro 方案](https://ifttt.com/plans)或更高版本。

## 先决条件

要接收来自 IFTTT 的事件，您的 Home Assistant 实例需要能从互联网访问，并且您需要已[配置](/home-assistant/integrations/homeassistant/#allowlist_external_urls)外部 URL，或者使用 IFTTT 集成中提供的 Nabu Casa 账户 webhook URL。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 从 IFTTT 接收事件

来自 IFTTT 的事件会作为 Home Assistant 事件提供，并以 `ifttt_webhook_received` 触发。您在 IFTTT 配方 Body 部分中指定的数据会作为事件数据传入。您可以使用该事件来触发自动化。请求方法请使用 POST。

例如，将 IFTTT webhook 的 body 设置为：

```json
{ "action": "call_service", "service": "light.turn_on", "entity_id": "light.living_room" }
```

然后，您需要使用以下自动化处理这些传入信息：


```yaml
automation:
- alias: "The optional automation alias"
  triggers:
    - trigger: event
      event_type: ifttt_webhook_received
      event_data:
        action: call_service  # the same action 'name' you used in the Body section of the IFTTT recipe
  actions:
    - action: '{{ trigger.event.data.service }}'
      target:
        entity_id: '{{ trigger.event.data.entity_id }}'
    
```


## 向 IFTTT 发送事件

```yaml
# configuration.yaml 示例条目
ifttt:
  key: YOUR_API_KEY
```

`key` 是您的 API 密钥，可在 [Webhooks applet](https://ifttt.com/maker_webhooks/settings) 的 **Settings** 中查看。它是 URL 的最后一部分（例如 https://maker.ifttt.com/use/MYAPIKEY），您可以在 **My Applets** > **Webhooks** > **Settings** 中找到。
![Property screen of the Maker Channel.](/home-assistant/images/integrations/ifttt/finding_key.png)

将 key 添加到您的 "`configuration.yaml`" 文件后，重启 Home Assistant 实例。这会加载 IFTTT 集成，并提供一个可用于触发 IFTTT 事件的操作。

:::important
After restarting the server, be sure to watch the console for any logging errors that show up in red, white or yellow.

:::
### 多个 IFTTT 密钥

如果您有多个 IFTTT 用户，可以像下面这样指定多个 IFTTT key：

```yaml
# configuration.yaml 示例条目
ifttt:
  key: 
    YOUR_KEY_NAME1: YOUR_API_KEY1
    YOUR_KEY_NAME2: YOUR_API_KEY2
```

### 测试您的触发器

您可以使用 **Developer tools** 来测试 [Webhooks](https://ifttt.com/maker_webhooks) 触发器。前往 [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_services/)，选择 `IFTTT: Trigger` 作为操作，然后填写以下值：

```yaml
event:
  description: 要发送的事件名称。
value1:
  description: 通过事件发送数据的通用字段。
value2:
  description: 通过事件发送数据的通用字段。
value3:
  description: 通过事件发送数据的通用字段。
```

当您的界面类似下图时，选择 **Perform action** 按钮。

![Testing action.](/home-assistant/images/integrations/ifttt/testing_service.png)

默认情况下，触发器会发送到 "`configuration.yaml`" 中的所有 API key。如果您想将触发器发送到某个特定 key，请使用 `target` 字段：

| Field   | Value                                                                         |
| --------| ----------------------------------------------------------------------------- |
| domain  | `ifttt`                                                                       |
| service | `trigger`                                                                     |
| data    | `{"event": "EventName", "value1": "Hello World", "target": "YOUR_KEY_NAME1"}` |

`target` 字段可以包含单个 key 名称，也可以是 key 名称列表。

### 设置 applet

选择 *Create* 按钮，然后在 **If This** 中选择 *Add*。搜索 *Webhooks*。
![Create applet.](/home-assistant/images/integrations/ifttt/create_applet.png)

选择 *Webhooks* 服务。
![Choose "Webhooks" service.](/home-assistant/images/integrations/ifttt/setup_service.png)

选择 *Receive a web request*。
![Receive a web request.](/home-assistant/images/integrations/ifttt/choose_webhook_trigger.png)

您需要为发送到 IFTTT 的每个事件设置唯一的触发器。
![You need to setup a unique trigger for each event you sent to IFTTT.](/home-assistant/images/integrations/ifttt/setup_trigger.png)

添加 *Then That* 操作。下方示例会向 IFTTT 移动应用发送通知，并将 `value1` 添加到消息中：
![Example notification "then that" action.](/home-assistant/images/integrations/ifttt/setup_then_that.png)


```yaml
# configuration.yaml 自动化示例条目
automation:
  alias: "Startup Notification"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: ifttt.trigger
      data: {"event":"TestHA_Trigger", "value1":"Hello World!"}
```


IFTTT 也可用于脚本和模板。以下将上面的自动化拆分为一个自动化和一个脚本，并结合变量与模板来使用。


```yaml
# configuration.yaml 自动化示例条目
automation:
  alias: "Startup Notification"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: script.ifttt_notify
      data:
        value1: "HA Status:"
        value2: "{{ trigger.event.data.entity_id.split('_')[1] }} is "
        value3: "{{ trigger.event.data.to_state.state }}"
```


```yaml
# 向 IFTTT 发送 TestHA_Trigger 的脚本示例，并附带其他数据（homeassistant UP）
ifttt_notify:
  sequence:
    - action: ifttt.trigger
      data: {"event":"TestHA_Trigger", "value1":"{{ value1 }}", "value2":"{{ value2 }}", "value3":"{{ value3 }}"}
```


