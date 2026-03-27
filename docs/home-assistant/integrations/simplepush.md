---
title: Simplepush
description: 'Simplepush 集成使用 Simplepush(https://simplepush.io/) 将来自 Home Assistant 的通知发送到您的 Android 或 iOS 设备。与类似应用不同，Simplepush 无需注册，并支持端到端加密。'
ha_category:
  - Notifications
ha_iot_class: Cloud Polling
ha_release: 0.29
ha_config_flow: true
ha_domain: simplepush
ha_platforms:
  - notify
ha_integration_type: service
ha_codeowners:
  - '@engrbm87'
---
# Simplepush

**Simplepush** 集成使用 [Simplepush](https://simplepush.io/) 将来自 Home Assistant 的通知发送到您的 Android 或 iOS 设备。与类似应用不同，Simplepush 无需注册，并支持端到端加密。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

要测试此服务是否正常工作，只需在命令行中使用 `curl` 发送一条消息。

```bash
curl 'https://simplepu.sh/YOUR_SIMPLEPUSH_KEY/message'
```

如果您在配置此集成时填写密码和 salt（按 Simplepush 应用设置中的定义），则通过此集成发送的所有通知都会进行端到端加密。

## 通知

Simplepush 可通过调用 [`notify` 操作](/home-assistant/integrations/notify/) 发送通知。

您可以在 `data` 键下指定 `event`。
事件可用于自定义通知行为。

也可以在 `data` 键下指定 `attachments`。
附件可以是可通过 URL 访问的图片、GIF 或视频文件。

有关如何使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。

## 示例

发送一条带标题和事件的通知。

```yaml
- action: notify.simplepush
    data:
      title: "This is the title"
      message: "This is the message"
      data:
        event: "event"
```

发送一条包含四个 URL 附件的通知。
附件可以是图片、GIF 或视频文件。

```yaml
- action: notify.simplepush
    data:
      message: "This is the message"
      data:
        attachments:
          - image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Sample_abc.jpg"
          - image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Newtons_cradle_animation_book_2.gif"
          - video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          - video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            thumbnail: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg"
```
