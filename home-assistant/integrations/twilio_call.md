# Twilio Call

**Twilio Call** 集成支持通过 [Twilio](https://twilio.com) 使用语音发送通知。
收到的消息会由文本转语音服务朗读。

前提是您已设置好 [Twilio](/home-assistant/integrations/twilio/index.md)。

## 配置

要在您的安装中使用此通知平台，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: twilio_call
    from_number: E164_PHONE_NUMBER
```

```yaml
from_number:
  description: "采用 [E.164](https://en.wikipedia.org/wiki/E.164) 格式的电话号码，例如 +14151234567。更多信息请参阅 [Twilio 的电话号码格式指南](https://www.twilio.com/help/faq/phone-numbers/how-do-i-format-phone-numbers-to-work-internationally)。"
  required: true
  type: string
name:
  description: 设置可选参数 `name` 可创建多个通知器。该通知器将绑定到 `notify.NOTIFIER_NAME` 操作。
  required: false
  default: "`notify`"
  type: string
```

### 用法

Twilio 是一个通知平台，因此您可以像[此处所述](/home-assistant/integrations/notify/index.md)那样，通过调用通知操作来控制它。它会向通知 `target` 中列出的所有 E.164 电话号码发送通知。有关电话号码格式的更多信息，请参阅上文关于 `from_number` 配置变量的说明。

```yaml
# Example automation notification entry
automation:
  - alias: "The sun has set"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: notify.twilio_call
        data:
          message: "The sun has set"
          target:
            - +14151234567
            - +15105555555
```
