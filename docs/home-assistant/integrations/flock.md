---
title: Flock
description: 关于如何将 Flock 通知添加到 Home Assistant 的说明。
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.71
ha_domain: flock
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Flock** 集成使用 [Flock.com](https://flock.com) 传递来自 Home Assistant 的通知。

＃＃ 设置

转到 [Flock.com Admin website](https://admin.flock.com/#!/webhooks) 并创建一个新的“传入 Webhooks”。选择要将 Home Assistant 的通知发送到的频道，指定名称并按*保存并生成 URL*。

<p class='img'>
<img src='/home-assistant/images/integrations/flock/flock-webhook.png' />
</p>

您将需要 URL 的最后部分，即您房间的 `access_token`。

<p class='img'>
<img src='/home-assistant/images/integrations/flock/new-webhook.png' />
</p>

＃＃ 配置

要将 Flock 通知添加到您的安装中，请将以下内容添加到您的“`configuration.yaml`”文件中。
：：：提示
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: flock
    access_token: YOUR_ROOM_TOKEN
```

```yaml
姓名：
描述：“可选参数 `name` 允许创建多个通知程序。通知程序将绑定到 `notify.NOTIFIER_NAME` 操作。”
必填：假
类型：字符串
默认：通知
访问令牌：
描述：Webhook URL 的最后部分。
必填：真实
类型：字符串
```

要使用通知，请参阅 [getting started with automation page](/home-assistant/getting-started/automation/)。
