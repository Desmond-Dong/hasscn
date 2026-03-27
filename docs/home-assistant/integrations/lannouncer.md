---
title: LANnouncer
description: 'LANnouncer 集成可让您在运行 Lannouncer(https://play.google.com/store/apps/details?id=com.keybounce.lannouncer&hl=enUS) 的 Android 设备上播放语音消息（TTS）或声音。'
ha_category:
  - Notifications
ha_iot_class: Local Push
ha_release: 0.36
ha_domain: lannouncer
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# LANnouncer

**LANnouncer** 集成可让您在运行 [Lannouncer](https://play.google.com/store/apps/details?id=com.keybounce.lannouncer&hl=en_US) 的 Android 设备上播放语音消息（TTS）或声音。当您有壁挂式 Android 平板，或一台长期通电并保持开启的 Android 设备，并希望用它来播放通知时，这会很有帮助。

要在您的安装中启用 Lannouncer 通知，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
notify:
  - name: NOTIFIER_NAME
    platform: lannouncer
    host: HOSTNAME_OR_IP
```

```yaml
name:
  description: 设置可选参数 `name` 后，可创建多个通知器。该通知器会绑定到 `notify.NOTIFIER_NAME` 操作。
  required: false
  default: notify
  type: string
host:
  description: 运行 Lannouncer 的 Android 设备主机名或 IP 地址。
  required: true
  type: string
port:
  description: Lannouncer 运行的端口。
  required: false
  default: 1035
  type: integer
```

### 安装

您需要安装 Lannouncer 应用，并启用 *Network (TCP) Listener* 和 *Auto-Start Network Listener*。由于此集成不会使用它们，您可以禁用 *GCM (Google Cloud) and WAN Messaging* 以及 *SMS Listener*。

Lannouncer 使用 Android 默认的 TTS 语音。您可以在 Android 设置中调整，也可以从 Play Store 安装其他 TTS 引擎。您可能还需要在应用设置中调高音量，因为实际音量表现取决于硬件设备。

更多信息请参阅[这里](https://web.archive.org/web/20200928053944/https://www.keybounce.com/lannouncer/configuring-lannouncer/)（归档网站）。

### 发送消息

Lannouncer 支持两种类型的消息。

语音消息是默认方式（`speak`）。您只需使用以下 JSON 调用 `notify` 操作，设备就会朗读指定消息。

```json
{
  "message": "I'm sorry, I cannot do that Dave."
}
```

第二种方式是播放通知音（`alarm`）。内置 4 种声音：`chime`、`doorbell`、`alarm` 和 `siren`。

```json
{
  "message": "chime",
  "data": {
    "method": "alarm"
  }
}
```

您还可以请求播放已配置的额外声音文件（`FILE1`、`FILE2`、`FILE3`、`FILE4` 或 `FILE5`）。这些文件可在应用设置中配置。

```json
{
  "message": "FILE1",
  "data": {
    "method": "alarm"
  }
}
```

:::note
免费版只支持一个额外声音文件。

:::
如需使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。
