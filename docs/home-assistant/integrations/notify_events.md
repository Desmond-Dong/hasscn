---
title: Notify.Events
description: 'The Notify.Events service(https://notify.events/) is an integration for the notify integration. 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_release: 0.112
ha_category:
  - Notifications
ha_domain: notify_events
ha_codeowners:
  - '@matrozov'
  - '@papajojo'
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Notify.Events

## Description

The [Notify.Events service](https://notify.events/) is an integration for the **notify** integration. 

该平台允许您快速配置不同收件人之间的消息分发，无论他们习惯如何接收通知：

- [电报](https://telegram.org/)
- [Viber](https://viber.com/)
- [Slack](https://slack.com/)
- [Rocket.Chat](https://rocket.chat/)
- [Discord](https://discordapp.com/)
- 贾伯/XMPP
- 网页推送
- 短信
- 语音通话

您可以在[此处](https://notify.events/features)找到完整支持的信使列表。

## Setting up

To start getting notifications, you need to follow those simple steps:
 
1. Sign up to [Notify.Events](https://notify.events/) and create a Channel
2. Add **Home Assistant** source to this channel and get your **token**
3. Add the Notify.Events integration to your installation by adding the following to your `configuration.yaml` file:

```yaml
notify_events:
  token: YOUR_TOKEN
```

```yaml
token:
  description: Your channel source token.
  required: true
  type: string
```

Now you can use notify_events integration as a platform for your **notify service**, add the following to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.:

```yaml
# Example configuration.yaml entry

notify:
  - name: NOTIFIER_NAME (e.g. "events")
    platform: notify_events
```

```yaml
name:
  description: "The optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action."
  required: false
  type: string
  default: notify
```

### That's it!

现在，您可以使用 Home Assistant 中的“notify.events”操作来：
- 发送任何通知或警报
- 按“级别”和“优先级”分配事件
- 附加**文件**和**图像**（本地或远程）
- ..并继续使用您最喜欢的信使来接收它们！

### Example action

```yaml
- action: notify.events
  data:
    message: "Backyard motion detected!"
    data:
      level: "warning"
      priority: "high"
      images:
        - name: "local_photo.jpg"
          path: "/tmp/backyard_cam/motion.jpg"
        - name: "remote_photo.jpg"
          url: "https://i.ibb.co/Jt1845X/motion.jpg"
```

### 消息可选参数

以下属性可以放置在“data”中以实现扩展功能。

| Attribute  | Description                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`    | Message title.                                                                                                                                                                                   |
| `level`    | For recipients who have differences in the display of messages at different levels, this level will be applied.<br>Available values: `verbose`, `info`, `notice`, `warning`, `error`, `success`. |
| `priority` | For recipients which supports priority, the message will be highlighted accordingly.<br>Available values: `lowest`, `low`, `normal`, `high`, `highest`.                                          |
| `images`   | Array of images to attach (see item properties below).                                                                                                                                           |
| `files`    | Array of files to attach (see item properties below).                                                                                                                                            |
| `token`    | Notify.Events channel token (in case you want to override the channel to get this message to).                                                                                                   |

每一项图像和文件都具有以下属性：

| Property                     | Required | Description      |
| ---------------------------- | -------- | ---------------- |
| `path` or `url` or `content` | True     | File source.     |
| `name`                       | False    | Result file name |
| `mime_type`                  | False    | File MIME-type   |

要有效地使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。