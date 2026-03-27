---
title: Rocket.Chat
description: 'Rocket.Chat 集成允许您从 Home Assistant 向 Rocket.Chat(https://rocket.chat/) 实例发送消息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.56
ha_domain: rocketchat
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Rocket.Chat

**Rocket.Chat** 集成允许您从 Home Assistant 向 [Rocket.Chat](https://rocket.chat/) 实例发送消息。

## 配置

要将 Rocket.Chat 添加到您的安装中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
notify:
  - platform: rocketchat
    name: NOTIFIER_NAME
    url: https://rocketchat.example.com
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    room: YOUR_ROOM_NAME
```

- `name` (*可选*): 在前端中显示的名称。通知器会绑定到 `notify.NOTIFIER_NAME` 操作。
- `url` (*必填*): 您的 Rocket.Chat 实例 URL。
- `username` (*必填*): Rocket.Chat 用户名。
- `password` (*必填*): Rocket.Chat 密码。
- `room` (*必填*): 要发送消息的聊天室名称。

### 脚本示例

```yaml
rocketchat_notification:
  sequence:
  - action: notify.NOTIFIER_NAME
    data:
      message: "Message to Rocket.Chat from Home Assistant!"
      data:
        emoji: ":smirk:"
```

#### 消息变量

- **message** (*必填*): 要显示的消息。
- **data** (*可选*): 字典，包含 [Rocket.Chat 文档](https://developer.rocket.chat/apidocs/post-message)中定义的任意变量。

有关如何使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。
