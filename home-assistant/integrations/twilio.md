# Twilio

**Twilio** 集成支持通过 [Twilio](https://twilio.com) 发送短信通知和发起电话呼叫。

[Twilio](https://twilio.com) 网站提供免费试用账户，可免费呼叫已验证的电话号码。
试用账户的通话时长限制为 10 分钟，并会在您的消息播放前插入一段简短的试用提示。升级后的账户则没有此限制。

## 配置

要在您的安装中使用此通知集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# Example configuration.yaml entry
twilio:
  account_sid: ACCOUNT_SID_FROM_TWILIO
  auth_token: AUTH_TOKEN_FROM_TWILIO
```

```yaml
account_sid:
  description: "您的 Twilio Account SID，可在您的 [console](https://www.twilio.com/console) 中找到。它以 `AC` 开头。"
  required: true
  type: string
auth_token:
  description: "您的 Twilio AUTH TOKEN，可在您的 [console](https://www.twilio.com/console) 中找到。它通常位于 `account_sid` 下方。"
  required: true
  type: string
```

### 用法

配置好基础 Twilio 集成后，您可以添加并配置 [Twilio SMS](/home-assistant/integrations/twilio_sms.md) 和/或 [Twilio Phone](/home-assistant/integrations/twilio_call.md) 集成，以使用通知功能。

要接收来自 Twilio 的事件，您的 Home Assistant 实例需要可从互联网访问，并且您需要在 Home Assistant 中[配置](/home-assistant/integrations/homeassistant/index.md#external_url)外部 URL。

要进行设置，请前往配置页面中的集成页，找到 Twilio，选择配置，并按照屏幕上的说明完成设置。

您将获得一个如下格式的 URL：`https://<home-assistant-domain>/api/webhook/9940e99a26fae4dcf6fe0a478124b6b58b578ea4c55c9a584beb1c9f5057bb91`。要生成传入事件，您需要在 [Twilio 中配置 webhook](https://www.twilio.com/docs/glossary/what-is-a-webhook)：

* 前往您的 Twilio [console](https://www.twilio.com/console)。
* 进入 **phone numbers** > **manage** > **active numbers** > （选择号码）> **configure**。
* 将您的 URL 粘贴到 **A call comes in** 和 **A message comes in** 的 webhook URL 输入框中并保存。

来自 Twilio 的传入事件会在 Home Assistant 中作为事件提供，并以 `twilio_data_received` 触发。Twilio 提供的数据会作为事件数据提供，您可以使用该事件来触发自动化。

示例如下：

```yaml
automation:
  triggers:
    - trigger: event
      event_type: twilio_data_received
      event_data:
        From: '+1XXXXXXXXXXX'
        To: '+1YYYYYYYYYYY'
        CallStatus: ringing
        Direction: inbound
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.garage_door
```

上述示例会在号码 `+1XXXXXXXXXXX` 呼叫 `+1YYYYYYYYYYY` 时打开车库门（前提是 `+1YYYYYYYYYYY` 是您在 Twilio 中注册的号码之一）。

短信处理器示例如下：

```yaml
alias: "Twilio incoming"
triggers:
  - trigger: event
    event_type: twilio_data_received
actions:
  - variables:
      sender: |
        {{ trigger.event.data.From }}
      message: |
        {{ trigger.event.data.Body }}
  - action: notify.persistent_notification
    data:
      message: |
        incoming twilio message from {{sender}}: {{ message }}
        all event data: {{ trigger.event.data }}
```
