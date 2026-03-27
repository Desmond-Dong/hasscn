---
title: ClickSend TTS
description: 'ClickSend TTS 集成使用 ClickSend(https://clicksend.com) 从 Home Assistant 发送文字转语音 (TTS) 通知。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.55
ha_domain: clicksend_tts
ha_platforms:
  - notify
ha_integration_type: integration
ha_quality_scale: legacy
---
# ClickSend TTS

**ClickSend TTS** 集成使用 [ClickSend](https://clicksend.com) 从 Home Assistant 发送文字转语音 (TTS) 通知。

创建账户后，您应该可以从[这里](https://dashboard.clicksend.com/account/subaccounts)获取 `username` 和 `api_key`。

要将 ClickSend 添加到您的安装中，请将以下内容添加到 Home Assistant 的 `configuration.yaml` 文件中：

```yaml
notify:
  - platform: clicksend_tts
    username: CLICKSEND_USERNAME
    api_key: CLICKSEND_API_KEY
    recipient: PHONE_NO
```

```yaml
name:
  description: "设置可选参数 name 允许创建多个通知器。通知器将绑定到 `notify.NOTIFIER_NAME` 动作。"
  required: false
  default: clicksend_tts
  type: string
username:
  description: 您的用户名（可能是您的电子邮件地址）。
  required: true
  type: string
api_key:
  description: 您的 API 密钥。
  required: true
  type: string
recipient:
  description: [E.164](https://en.wikipedia.org/wiki/E.164) 格式的电话号码，如 `+14151234567`。这是您要通过 TTS 拨打并通知的电话号码，更多信息请参阅 [ClickSend 文档](https://developers.clicksend.com/docs/messaging/voice-messaging/other/send-voice-message)。
  required: true
  type: string
language:
  description: 您希望用于将消息转换为音频的语言。可接受的值请参阅 [ClickSend 文档](https://developers.clicksend.com/docs/messaging/voice-messaging/other/send-voice-message)。
  required: false
  default: en-us
  type: string
voice:
  description: 用于向接收者播放消息的声音。允许的值为 `female` 或 `male`。
  required: false
  default: female
  type: string
```

### 用法

ClickSend 是一个通知平台，因此可以像[通知集成文档](/home-assistant/integrations/notify/)中所述那样通过调用通知操作来使用。它会向您配置在 **recipient** 中的 E.164 电话号码发送通知。

```yaml
alias: "太阳已落山"
triggers:
  - trigger: sun
    event: sunset
actions:
  - action: notify.clicksend_tts
    data:
      message: "太阳已落山"
```
