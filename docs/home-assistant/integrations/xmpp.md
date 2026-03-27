---
title: Jabber (XMPP)
description: 'Jabber (XMPP) 集成可让您将 Home Assistant 的通知发送到 Jabber (XMPP)(https://xmpp.org/) 账户。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Notifications
ha_release: pre 0.7
ha_codeowners:
  - '@fabaff'
  - '@flowolf'
ha_domain: xmpp
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Jabber (XMPP)

**Jabber (XMPP)** 集成可让您将 Home Assistant 的通知发送到 [Jabber (XMPP)](https://xmpp.org/) 账户。

## 配置

要在安装环境中启用 Jabber 通知，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME  # e.g.,  jabber
    platform: xmpp
    sender: YOUR_JID
    password: YOUR_JABBER_ACCOUNT_PASSWORD
    recipient:
      - YOUR_RECIPIENT 1
      - YOUR_RECIPIENT 2
```

```yaml
name:
   description: "设置可选参数 `name` 后，可以创建多个通知器。默认值为 `notify`。该通知器将绑定到 `notify.NOTIFIER_NAME` 操作。"
  required: false
  type: string
  default: notify
sender:
   description: "作为消息发送方的 Jabber ID (JID)。请输入包含域名的完整 JID，例如 `your_name@jabber.org`。"
  required: true
  type: string
resource:
   description: "JID 的 resource 部分，例如 `your_name@jabber.org/HA-cabin`。"
  required: false
  type: string
  default: "`home-assistant`"
password:
   description: 您所提供 Jabber 账户的密码。
  required: true
  type: string
recipient:
   description: 默认接收通知的 Jabber ID (JID)。可以是单个 JID，也可以是多个收件人的 JID 列表。<br>当您在操作中未指定 target 时，通知默认会发送到这里。操作的 target 字段中指定的任意 JID 都会覆盖这里的 recipient 内容。
  required: true
  type: [string, list]
tls:
   description: 强制使用 TLS。
  required: false
  type: boolean
  default: true
verify:
   description: 允许禁用 SSL 证书有效性检查，例如用于自签名证书。
  required: false
  type: boolean
  default: true
room:
   description: "聊天室名称（例如 `example@conference.jabber.org`）。如果设置了该项，则消息会发送到聊天室，而不是 recipient。"
  required: false
  type: string
title:
   description: 默认消息标题。如需留空，请设为 `""`。
  required: false
  type: string
  default: "Home Assistant"
```

:::note
Pre Home Assistant 0.81 `sleekxmpp` was used to connect to XMPP servers. `sleekxmpp` as of version 1.3.2, does not support > TLS v1. If you are running your own XMPP server (e.g., Prosody, ejabberd) make sure to allow using TLS v1.
Home Assistant after 0.81 uses `slixmpp`, which also supports TLS v1.1 and TLS v1.2.

:::
所有 Jabber ID (JID) 都必须包含域名。请确保密码与 sender 提供的账户匹配。

您可以通过 Jabber 发送文本消息、图片以及其他文件。

### Jabber 文本消息

以下示例展示了如何设置可由自动化调用的脚本。

Number 1 shows a classical, text-only message. The Title is optional, although if omitted,
it will be set to the component's `title` configuration variable. To keep it empty, set it to `""`.

```yaml
# Example script.yaml entry
1_send_jabber_message:
  alias: "Text only Jabber message"
  sequence:
    - action: notify.jabber  # from notify.NOTIFIER_NAME
      data:
        title: "Optional Title"
        message: "My funny or witty message"
```

### Jabber 图片消息

You can send images or files from locally stored files or remote web locations via Jabber's HTTP Upload feature.
To send files and images, your jabber server must support [XEP_0363](https://xmpp.org/extensions/xep-0363.html).

:::note
Be aware that images are uploaded onto the Jabber server of your provider. They reside there un-encrypted and could be accessed by the server admins. Usually images are deleted after a few days.<br>
<br>
Home Assistant supports TLS encryption to ensure transport encryption. TLS is enforced by default. You can disable it  with the [`tls`](#tls) flag -- which is not recommended.

:::
Number 2 sends only an image, retrieved from the URL. The TLS connection to get the image is also not verified (use with caution).

```yaml
# Example script.yaml entry
2_send_jabber_message_with_image_url:
  alias: "Send Image via Jabber from website"
  sequence:
    - action: notify.jabber
      data:
        title: ""
        message: ""
        data:
          url: "https://www.graz.at:8443/webcam_neu/getimg.php"
          verify: false
```

Number 3 sends an image from a local path.

```yaml
# Example script.yaml entry
3_send_jabber_message_with_local_image_path:
  alias: "Send Image via Jabber from local file"
  sequence:
    - action: notify.jabber
      data:
        title: ""
        message: ""
        data:
          path: "/home/homeassistant/super_view.jpg"
```

### Jabber 文件消息


Number 4 sends a text-file, retrieved from GitHub, renamed to `Hass_Cheatsheet.txt` to be viewable on a mobile Android device, as most don't offer any application to view `.md` files. Optionally you can add a timeout for the HTTP upload in seconds.

```yaml      
# Example script.yaml entry
4_send_jabber_message_with_file:
  alias: "Send text file via Jabber"
  sequence:
    - action: notify.jabber
      data:
        title: ""
        message: ""
        data:
          url: "https://raw.githubusercontent.com/arsaboo/homeassistant-config/master/HASS%20Cheatsheet.md"
          path: "Hass_Cheatsheet.txt"
          timeout: 10
```

### 模板

Number 5 sends an image retrieved from a URL, and an additional text message with `title` and `message`.


```yaml
# Example script.yaml entry
5_send_jabber_message_with_image_and_text:
  alias: "Send Image and Text via Jabber"
  sequence:
    - action: notify.jabber
      data:
        title: "The Time is now"
        message: "{{ now() }}, templating works as well..."
        data:
          url: "https://github.com/home-assistant/home-assistant.io/raw/next/source/images/favicon-192x192.png"
```


Number 6 sends an image from a templated URL.


```yaml
# Example script.yaml entry
6_send_jabber_message_with_image_from_url_template:
  alias: "Send Image from template URL via Jabber"
  sequence:
    - action: notify.jabber
      data:
        title: ""
        message: ""
        data:
          url_template: "https://www.foto-webcam.eu/webcam/dornbirn/{{ now().year }}/{{ '%02d' % now().month }}/{{ '%02d' % now().day }}/{{ '%02d' % now().hour }}{{ (now().minute + 58) % 60 // 10}}0_hd.jpg"
```


文件可能的来源有优先级，且只会选择其中一个。`url_template` 优先级最高；其次是 `url`，然后是 `path_template`，如果这些都未定义，则使用 `path`。对于来自未知 URL 的下载，`path` 可用于避免猜测文件扩展名。出于隐私原因，Home Assistant 会将文件名改为随机字符串，因此只会保留文件扩展名。

如需了解更多通知相关信息，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。
