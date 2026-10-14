# SendGrid

**SendGrid** 集成通过 [SendGrid](https://sendgrid.com/) 这一成熟的云端电子邮件平台发送邮件通知。

## 设置

您需要一个来自 SendGrid 的 [API key](https://app.sendgrid.com/settings/api_keys)。

## 配置

要在您的安装中启用通过 SendGrid 发送通知邮件，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
notify:
  - name: NOTIFIER_NAME
    platform: sendgrid
    api_key: YOUR_API_KEY
    sender: SENDER_EMAIL_ADDRESS
    recipient: YOUR_RECIPIENT
```

```yaml
name:
  description: 设置可选参数 `name` 可创建多个通知器。该通知器会绑定到 `notify.NOTIFIER_NAME` 操作。
  required: false
  default: notify
  type: string
api_key:
  description: 您的 SendGrid API 密钥。
  required: true
  type: string
sender:
  description: 发件人的电子邮件地址。
  required: true
  type: string
sender_name:
  description: 发件人名称。若未设置，默认为 "Home Assistant"。
  required: false
  type: string
recipient:
  description: 通知的收件人。
  required: true
  type: string
```

有关如何使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/index.md)。
