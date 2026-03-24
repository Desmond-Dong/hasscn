---
title: Pushsafer
description: 有关如何将 Pushsafer 通知添加到 Home Assistant 的说明。
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.39
ha_domain: pushsafer
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[Pushsafer 服务](https://www.pushsafer.com/)是 notify 集成的平台之一。它允许您通过 Pushsafer 向用户发送消息。

要获取 private key 或 alias key，您需要前往 [Pushsafer 网站](https://www.pushsafer.com) 注册。

要使用 Pushsafer 通知，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 配置示例
notify:
  - name: NOTIFIER_NAME
    platform: pushsafer
    private_key: YOUR_KEY
```

```yaml
name:
  description: 设置可选参数 `name` 可以创建多个 notifier。该 notifier 会绑定到 `notify.NOTIFIER_NAME` 动作。
  required: false
  default: notify
  type: string
private_key:
  description: 您的 private key 或 alias key。private key 会使用标准参数向所有设备发送通知；alias key 会使用预定义参数向别名中保存的设备发送通知。
  required: true
  type: string
```

## 示例

向两个设备发送带格式文本的消息。

```yaml
actions:
  - action: notify.notify
    data:
      title: "Test to 2 devices"
      message: "Attention [b]bold[/b] text[br][url=https://www.pushsafer.com]Link to Pushsafer[/url]"
      data:
        icon: "2"
        iconcolor: "#FF0000"
        sound: "2"
        vibration: "1"
        url: "https://www.home-assistant.io/"
        urltitle: "Open Home Assistant"
        time2live: "0"
```

向一个设备发送带格式文本并附带外部 URL 图片的消息。

```yaml
actions:
  - action: notify.notify
    data:
      title: "Test to 1 device with image from an url"
      message: "Attention [i]italic[/i] Text[br][url=https://www.home-assistant.io/]Testlink[/url]"
      data:
        icon: "14"
        iconcolor: "#FFFF00"
        sound: "22"
        vibration: "31"
        url: "https://www.home-assistant.io/"
        urltitle: "Open Home Assistant"
        time2live: "60"
        picture1:
          url: "https://www.home-assistant.io/images/integrations/alexa/alexa-512x512.png"
```

向两个设备和一个设备组发送带格式文本并附带本地图片的消息。

```yaml
actions:
  - action: notify.notify
    data:
      title: "Test to 3 devices with local image"
      message: "Attention [i]italic[/i] Text[br][url=https://www.home-assistant.io/]Testlink[/url]"
      target: ["1111","2222","gs3333"],
      data:
        icon: "20"
        iconcolor: "#FF00FF"
        sound: "33"
        vibration: "0"
        url: "https://www.home-assistant.io/"
        urltitle: "Open Home Assistant"
        time2live: "10"
        priority: "2"
        retry: "60"
        expire: "600"
        confirm: "10"
        answer: "1"
        answeroptions: "yes|no|maybe"
        answerforce: "1"
        picture1: {
          path: "C:\\Users\\Kevin\\AppData\\Roaming\\.homeassistant\\image-760-testimage.jpg"
```

如需自定义推送通知，请参阅 [Pushsafer API 说明](https://www.pushsafer.com/en/pushapi)。

设置应用时，您可以使用这个[图标](/home-assistant/images/favicon-192x192.png)。

要使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。
