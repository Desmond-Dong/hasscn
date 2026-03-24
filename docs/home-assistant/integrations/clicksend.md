---
title: ClickSend SMS
description: 关于如何将 ClickSend 通知添加到 Home Assistant 的说明。
ha_category:
  - Notifications
ha_release: 0.48
ha_domain: clicksend
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**ClickSend SMS** 集成使用 [ClickSend](https://clicksend.com) 从 Home Assistant 发送通知。

## 前提条件

前往您的 [ClickSend 仪表板](https://dashboard.clicksend.com) 部分并创建您的新项目。创建项目后，您现在应该能够获取您的 `username` 和 `api_key`。

## 配置

要将 ClickSend 添加到您的安装中，请将以下内容添加到您的 Home Assistant "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 示例条目
notify:
  - platform: clicksend
    name: ClickSend
    username: CLICKSEND_USERNAME
    api_key: CLICKSEND_API_KEY
    recipient: PHONE_NO
    
# 多个接收者
notify:
  - platform: clicksend
    name: ClickSend
    username: CLICKSEND_USERNAME
    api_key: CLICKSEND_API_KEY
    recipient: [PHONE_NO1, PHONE_NO2]
```

```yaml
name:
  description: "设置可选参数 name 允许创建多个通知器。默认值为 `ClickSend`。通知器将绑定到 `notify.NOTIFIER_NAME` 动作。"
  required: false
  type: string
username:
  description: 您的 ClickSend 用户名。
  required: true
  type: string
api_key:
  description: 您的 ClickSend API 密钥。
  required: true
  type: string
recipient:
  description: "一个或多个电话号码。这是您要发送 SMS 通知消息的地方，例如 `09171234567` 或 `[09171234567, 09177654321]`。"
  required: true
  type: [string, list]
sender:
  description: 发送者的名称或号码。（限制为 11 个字符。）
  required: false
  type: string
  default: "`hass`"
```

要使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。
