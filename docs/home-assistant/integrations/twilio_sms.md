---
title: Twilio SMS
description: 'Twilio SMS 集成可让你通过 Twilio(https://twilio.com) 发送短信通知。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Notifications
ha_release: '0.20'
ha_domain: twilio_sms
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
ha_quality_scale: legacy
---
# Twilio SMS

**Twilio SMS** 集成可让你通过 [Twilio](https://twilio.com) 发送短信通知。

前提是你已经设置好 [Twilio](/home-assistant/integrations/twilio/)。

## 配置

要在你的安装中使用此通知平台，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: twilio_sms
    from_number: E164_PHONE_NUMBER or SENDER_ID
```

```yaml
from_number:
  description: 按 [E.164](https://en.wikipedia.org/wiki/E.164) 格式填写的电话号码，如 +14151234567。更多信息请参阅 [Twilio 的电话号码格式指南](https://help.twilio.com/articles/223183008)。你也可以使用发送者 ID 代替电话号码。发送者 ID 必须符合 Twilio 的规范。更多信息请参阅 [Twilio 的发送者 ID 指南](https://help.twilio.com/articles/223181348-Getting-started-with-Alphanumeric-Sender-ID)。请注意，并非所有国家都支持发送者 ID。更多信息请参阅 [Twilio 的受支持国家页面](https://help.twilio.com/articles/223133767-International-support-for-Alphanumeric-Sender-ID)。
  required: true
  type: string
name:
  description: 设置可选参数 `name` 后，可以创建多个通知器。该通知器会绑定到 `notify.NOTIFIER_NAME` 操作。
  required: false
  default: "`notify`"
  type: string
```

### 用法

Twilio 是一个通知平台，因此可以像[这里所述](/home-assistant/integrations/notify/)那样通过调用 notify 操作来控制。它会向通知 **target** 中的所有 E.164 电话号码发送通知。有关电话号码格式的信息，请参阅上文中关于 `from_number` 配置变量的说明。你也可以使用 `whatsapp:+123456789` 向 WhatsApp 用户发送通知。

你可以通过设置可选的 `media_url` 变量，在消息中附带媒体内容。根据 Twilio 文档，仅支持 `.gif`、`.png` 和 `.jpeg` 内容，并且此功能[仅在美国和加拿大受支持][mms]。

[mms]: https://www.twilio.com/docs/sms/send-messages#include-media-in-your-messages

```yaml
# Example automation notification entry
automation:
  - alias: "The sun has set"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: notify.twilio_sms
        data:
          message: "The sun has set"
          target:
            - '+14151234567'
            - '+15105555555'
          data:
            media_url:
              - "https://www.home-assistant.io/images/supported_brands/home-assistant.png"
```
