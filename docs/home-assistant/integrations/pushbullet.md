---
title: Pushbullet
description: 有关如何在 Home Assistant 中读取用户推送的说明
ha_category:
  - Notifications
  - Sensor
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_domain: pushbullet
ha_platforms:
  - notify
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@engrbm87'
ha_config_flow: true
---

当前在 Home Assistant 中支持以下设备类型：

- [Sensor](#sensors)
- [Notifications](#notifications)

:::note
免费套餐每月[限制](https://docs.pushbullet.com/#push-limit)为 500 次推送。

:::
## 前提条件

Notification Mirroring 允许您在电脑上查看 Android 设备的通知。必须先在应用中启用该功能，并且目前仅支持 Android 平台。更多信息请参阅 Pushbullet 博客中的[这篇公告](https://blog.pushbullet.com/2013/11/12/real-time-notification-mirroring-from-android-to-your-computer/)。

前往 [https://www.pushbullet.com/#settings/account](https://www.pushbullet.com/#settings/account) 获取 API 密钥或访问令牌。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

设置此集成后，会创建以下传感器：

- Application name: 发送推送的应用名称。
- Body: 通知消息正文。
- Notification ID: 通知的 ID。
- Tag: 通知标签（如果发送应用支持）。
- Package name: 发送方应用包名。
- Receiver Email: 推送目标的邮箱地址。
- Sender Email: 发送方邮箱地址。
- Sender device ID: 发送方设备 ID。
- Title: 推送标题。
- Type: 推送类型。

默认启用的是 `Body` 和 `Title`。其余项可在 UI 中启用。

## 通知

Pushbullet 通知平台会将消息发送到 [Pushbullet](https://www.pushbullet.com/)。Pushbullet 是一项免费服务，可在您的手机、浏览器和好友之间传递信息。免费套餐每月[限制](https://docs.pushbullet.com/#push-limit)为 500 次推送。

### 用法

Pushbullet 是一个 notify 平台，因此可以像[这里所述](/home-assistant/integrations/notify/)那样通过调用 notify 动作来控制。它会向 Pushbullet 账户中注册的所有设备发送通知。您也可以通过可选的 **target** 参数指定特定账户设备、联系人或频道。

| Type    | Prefix     | Suffix                  | Example                   |
| ------- | ---------- | ----------------------- | ------------------------- |
| Device  | `device/`  | Device nickname         | `device/iphone`           |
| Channel | `channel/` | Channel tag             | `channel/my_home`         |
| Email   | `email/`   | Contact's email address | `email/email@example.com` |
| SMS     | `sms/`     | Contact's phone number  | `sms/0612345678`          |

如果使用 `target`，您自己账户的邮箱地址表示“发送到所有设备”。除电子邮件外，所有目标在发送前都会进行存在性验证。

#### 动作负载示例

```yaml

  message: A message for many people
  target: 
    - device/telephone
    - email/hello@example.com
    - channel/my_home
    - sms/0612345678

```

要使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。

### URL 支持

```yaml
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send URL"
      message: "This is an url"
      data:
        url: "google.com"
```

- `url`（*必填*）：要通过 Pushbullet 发送的页面 URL。

### 文件支持

```yaml
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send file"
      message: "This is a file"
      data:
        file: /path/to/my/file
```

- `file`（*必填*）：要通过 Pushbullet 发送的文件。

### 文件 URL 支持

```yaml
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send file"
      message: "This is a file URL"
      data:
        file_url:  https://cdn.pixabay.com/photo/2014/06/03/19/38/test-361512_960_720.jpg
```

- `file_url`（*必填*）：要通过 Pushbullet 发送的文件 URL。

### 单个目标

```yaml
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send to one device"
      message: "This only goes to one specific device"
      target: device/DEVICE_NAME
```

- `target`：接收通知的 Pushbullet 设备。

:::important
别忘了[允许外部目录](/home-assistant/integrations/homeassistant/#allowlist_external_dirs)，这样 Home Assistant 才能访问这些目录。

:::
