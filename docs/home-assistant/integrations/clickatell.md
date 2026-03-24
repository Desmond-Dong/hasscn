---
title: Clickatell
description: 关于如何将 Clickatell 通知添加到 Home Assistant 的说明。
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.56
ha_domain: clickatell
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Clickatell** 集成使用 [Clickatell](https://www.clickatell.com) 从 Home Assistant 发送 SMS 通知。

## 设置

前往您的 [Clickatell SMS 平台门户](https://portal.clickatell.com/#/) 部分并创建一个新的 SMS 集成。创建集成需要三个信息屏幕。请确保以下内容：

1. 为新集成指定一个标识名称。
2. 确保设置为"生产"用途。
3. 选择"HTTP"作为您的 API 类型。
4. 确保您选择的消息类型为"单向消息"。
5. 注意国际号码格式选项，因为这会影响您提供的电话号码的结构。
6. 完成输入详细信息后，将生成 API 密钥。复制该 API 密钥。

## 配置

要将 Clickatell 添加到您的安装中，请将以下内容添加到您的 Home Assistant "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 示例条目
notify:
  - platform: clickatell
    name: USER_DEFINED_NAME
    api_key: CLICKATELL_API_KEY
    recipient: PHONE_NO
```

```yaml
name:
  description: 设置可选参数 name 允许创建多个通知器。通知器将绑定到 `notify.NOTIFIER_NAME` 动作。
  required: false
  default: clickatell
  type: string
api_key:
  description: 您的 Clickatell API 密钥。
  required: true
  type: string
recipient:
  description: 您的电话号码。这是您要发送通知 SMS 消息的地方。例如 `61444333444`。
  required: true
  type: string
```

要使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。
