---
title: SMTP
description: 'SMTP 集成可让您将 Home Assistant 的通知发送给电子邮件收件人。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: pre 0.7
ha_domain: smtp
ha_platforms:
  - notify
ha_integration_type: integration
ha_quality_scale: legacy
---
# SMTP

**SMTP** 集成可让您将 Home Assistant 的通知发送给电子邮件收件人。

要在您的安装中启用电子邮件通知，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
notify:
  - name: "NOTIFIER_NAME"
    platform: smtp
    sender: "YOUR_SENDER"
    recipient: "YOUR_RECIPIENT"
```

请查看您的电子邮件提供商配置或帮助页面，以获取正确的 SMTP 设置。要使配置更改生效，需要重新启动 Home Assistant。

```yaml
name:
  description: 设置可选参数 `name` 可创建多个通知器。该通知器将绑定到 `notify.NOTIFIER_NAME` 操作。
  required: false
  type: string
  default: notify
sender:
  description: 发件人的电子邮件地址。
  required: true
  type: string
recipient:
  description: 通知收件人的默认电子邮件地址。可以是单个收件人地址，也可以是多个收件人的地址列表。<br>这是您默认发送电子邮件通知的目标地址（即未在操作中指定 `target` 时）。如果在操作的 `target` 字段中指定了任何电子邮件地址，将覆盖这里的收件人内容。
  required: true
  type: [list, string]
server:
  description: 用于发送通知的 SMTP 服务器。
  required: false
  type: string
  default: localhost
port:
  description: SMTP 服务器使用的端口。
  required: false
  type: integer
  default: 587
timeout:
  description: SMTP 服务器使用的超时时间（秒）。
  required: false
  type: integer
  default: 5
username:
  description: SMTP 帐户的用户名。
  required: false
  type: string
password:
  description: 与给定用户名对应的 SMTP 服务器密码。请确保用双引号将其括起来，例如 `"MY_PASSWORD"`。
  required: false
  type: string
encryption:
  description: 设置加密模式，可选 `starttls`、`tls` 或 `none`。
  required: false
  type: string
  default: starttls
sender_name:
  description: "在电子邮件头中设置自定义的‘发件人名称’（*From*: Custom name <example@mail.com>）。"
  required: false
  type: string
debug:
  description: 启用调试，例如 `true` 或 `false`。
  required: false
  type: boolean
  default: false
verify_ssl:
  description: 是否需要验证服务器的 SSL 证书。
  required: false
  type: boolean
  default: true
```

### 用法

系统会使用不含空格的名称创建一个 notify 集成。在上面的示例中，它将名为 `notify.NOTIFIER_NAME`。要使用 SMTP 通知，请像下面这样在自动化或脚本中引用它：

```yaml
- alias: "Send E-Mail Every Morning"
  triggers:
    - platform: time
      at: "08:00:00"
  actions:
    - action: notify.NOTIFIER_NAME
      data:
          title: "Good Morning"
          message: "Rise and shine"
          target:
            - "morning@example.com"
```

可选的 `target` 字段用于为此特定操作指定收件人。当未使用 `target` 字段时，这条消息将发送给在 `configuration.yaml` 中 smtp 通知器的 `recipient` 部分指定的默认收件人。您可以在邮件正文中使用 `\r\n` 添加换行，例如 `message: "Rise and shine\r\n\r\nIt's a brand new day!"`

下面是另一个在脚本中附加本地图像的示例：

```yaml
burglar:
  alias: "Burglar Alarm"
  sequence:
    - action: shell_command.snapshot
    - delay:
          seconds: 1
    - action: notify.NOTIFIER_NAME
      data:
          title: "Intruder alert"
          message: "Intruder alert at apartment!!"
          target:
            - "my_intruder_alert@example.com"
          data:
              images:
                  - /home/pi/snapshot1.jpg
                  - /home/pi/snapshot2.jpg
```

可选的 `html` 字段可创建自定义的文本/HTML 多部分消息，您可以通过定义 HTML 内容，自由发送富文本 HTML 电子邮件。如果需要包含图片，可以同时传入这两个参数（`html` 和 `images`）。图片会以文件的基础名称作为附件名，因此可以在 HTML 页面中通过 `src="cid:image_name.ext"` 引用它们。

可选的 `images` 字段会向电子邮件中添加图片附件。如果定义了 `html`，则需要像上面所述那样将图片以内联方式添加到消息中（如下例所示）。如果未定义 `html`，图片将作为单独附件添加。

:::important
添加图片时，请确保包含这些附件的文件夹已加入 `allowlist_external_dirs`。<br>请参阅：[基础设置文档](/home-assistant/integrations/homeassistant/#allowlist_external_dirs)

:::
```yaml
burglar:
  alias: "Burglar Alarm"
  sequence:
    - action: shell_command.snapshot
    - delay:
          seconds: 1
    - action: notify.NOTIFIER_NAME
      data:
          message: "Intruder alert at apartment!!"
          data:
            images:
              - /home/pi/snapshot1.jpg
              - /home/pi/snapshot2.jpg
            html: >
              <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
                  <head>
                      <meta charset="UTF-8">
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Intruder alert</title>
                      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css">
                      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
                      <style type="text/css">
                          @font-face {
                            font-family: 'Open Sans';
                            font-style: normal;
                            font-weight: 300;
                            src: local('Open Sans Light'), local('OpenSans-Light'), url(http://fonts.gstatic.com/s/opensans/v13/DXI1ORHCpsQm3Vp6mXoaTZS3E-kSBmtLoNJPDtbj2Pk.ttf) format('truetype');
                          }
                          h1,h2,h3,h4,h5,h6 {
                              font-family:'Open Sans',Arial,sans-serif;
                              font-weight:400;
                              margin:10px 0
                          }
                      </style>
                  </head>
                  <body>
                    <div class="jumbotron jumbotron-fluid" style="background-color: #f00a2d; color: white;">
                        <div class="container py-0">
                            <h1>Intruder alert at apartment!!</h1>
                        </div>
                    </div>
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-xs-12 col-md-6 px-0">
                          <img class="rounded" style="width: 100%;"
                              alt="snapshot1" src="cid:snapshot1.jpg" />
                        </div>
                        <div class="col-xs-12 col-md-6 px-0">
                          <img class="rounded" style="width: 100%;"
                              alt="snapshot2" src="cid:snapshot2.jpg" />
                        </div>
                      </div>
                      <br>
                    </div>
                  </body>
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" integrity="sha384-6ePHh72Rl3hKio4HiJ841psfsRJveeS+aLoaEf3BWfS+gTF0XdAqku2ka8VddikM" crossorigin="anonymous"></script>
                  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/js/bootstrap.min.js" integrity="sha384-BLiI7JTZm+JWlgKa0M0kGRpJbF2J8q+qreVrKBC47e3K6BW78kGLrCkeRX6I9RoK" crossorigin="anonymous"></script>
              </html>
```

要进一步了解如何在自动化中使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。

## 特定电子邮件提供商配置

下面列出了一些针对特定电子邮件提供商的配置示例。
如果您不确定所需的 SMTP 设置，请查看电子邮件提供商的配置或帮助页面，以获取有关其特定 SMTP 配置的更多信息。

### Google Mail

Google Mail 的示例配置条目。

```yaml
# Example configuration.yaml entry for Google Mail.
notify:
  - name: "NOTIFIER_NAME"
    platform: smtp
    server: "smtp.gmail.com"
    port: 587
    timeout: 15
    sender: "YOUR_USERNAME@gmail.com"
    encryption: starttls
    username: "YOUR_USERNAME@gmail.com"
    password: "YOUR_APP_PASSWORD"
    recipient:
      - "RECIPIENT_1@example.com"
      - "RECIPIENT_N@example.com"
    sender_name: "SENDER_NAME"
```

Google 提供了一些需要特别注意的额外保护层。您必须在通知配置中使用[应用专用密码](https://support.google.com/mail/answer/185833)。

如果满足以下任一条件，您将无法创建应用密码：

- 您的帐户未启用两步验证。
- 您已启用两步验证，但仅添加了安全密钥作为身份验证方式。
- 您的 Google 帐户已加入 Google 的[高级保护计划](https://landing.google.com/advancedprotection/)。
- 您的 Google 帐户属于已禁用此功能的 Google Workspace。学校、企业或其他组织拥有的帐户都属于 Google Workspace 帐户。
