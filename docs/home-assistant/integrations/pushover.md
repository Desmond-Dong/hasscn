---
title: Pushover
description: 'Pushover 动作(https://pushover.net/)是 notify 集成的平台之一。它允许各个集成通过 Pushover 向用户发送消息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Notifications
ha_release: pre 0.7
ha_config_flow: true
ha_iot_class: Cloud Push
ha_domain: pushover
ha_platforms:
  - notify
ha_integration_type: service
ha_codeowners:
  - '@engrbm87'
---
# Pushover

[Pushover 动作](https://pushover.net/)是 notify 集成的平台之一。它允许各个集成通过 Pushover 向用户发送消息。

## 配置

要获取 API 密钥，您需要在 Pushover 网站上[注册一个应用](https://pushover.net/apps/clone/home_assistant)。您的 Pushover 用户密钥可以在 [Pushover 仪表板](https://pushover.net/dashboard)中找到。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

自动化示例：

```yaml
- action: notify.entity_id
  data:
    message: "This is the message"
    title: "Title of message"
    data:
      url: "https://www.home-assistant.io/"
      sound: pianobar
      priority: 0
      attachment: "local/image.png"
```

嵌套 `data` 部分中的集成专用参数均为可选项。

可通过 `attachment` 参数添加图片附件，该参数必须是本地文件引用（例如 `/tmp/image.png`）。

如需指定某个 Pushover 设备，请使用 `target`。如果输入的某个设备不存在，或在您的 Pushover 账户中被禁用，则消息会发送到您的所有设备。若要发送到所有设备，只需省略 `target` 属性。

```yaml
- action: notify.entity_id
  data:
    message: "This is the message"
    title: "Title of message"
    target:
      - pixel3
      - pixel4a
    data:
      sound: pianobar
      priority: 0
```
通过 `ttl` 参数，可以让消息在一段时间后自动删除。这对于过一段时间就不再有意义的消息很有用。`ttl` 参数表示消息的生存时间，单位为秒。在下面的示例中，消息会在 6 小时后从目标设备上自动删除。

```yaml
  - action: notify.pushover
    data:
      message: "This is the message"
      title: "Title of message"
      target:
        - pixel9
        - johnsmith
      data:
        ttl: 21600 
```

如需使用最高优先级通知，它会在 `expire` 指定的总时长内，每隔 `retry` 指定的秒数重复通知一次。您**必须**同时指定这两个参数。`retry` 的最小值是 30 秒，`expire` 的最大值是 10800 秒（3 小时）。如果您面向多个设备发送通知，请确保在应用中启用高级选项 **Notification dismissal sync**，以便可以同时在所有设备上清除该提醒。

```yaml
- action: notify.entity_id
  data:
    message: "This is the message"
    title: "Title of message"
    target:
      - iphone11pro
    data:
      priority: 2
      sound: "siren"
      expire: 300
      retry: 30
```

要使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。

发送通知时，也可以根据 Pushover [API 文档](https://pushover.net/api)设置其他可选参数。

下面展示了一个由 Alexa 集成中的 intent 触发的通知示例，同时还在消息中使用了[自动化模板](/home-assistant/getting-started/automation-templating/)：


```yaml
# `configuration.yaml` 配置示例
alexa:
  intents:
    LocateIntent:
      action:
        action: notify.notify
        data:
          message: "The location of {{ User }} has been queried via Alexa."
          title: "Home Assistant"
          target: pixel
          data:
            sound: falling
            url: "https://www.home-assistant.io/"
            attachment: "/tmp/image.png"
```


