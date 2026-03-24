---
title: Xiaomi TV
description: 关于如何将小米电视集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_release: 0.64
ha_iot_class: Assumed State
ha_codeowners:
  - '@simse'
ha_domain: xiaomi_tv
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Xiaomi TV** 集成可让您控制 [Xiaomi TV](https://www.mi.com/global/mitv3s/65flat/)。
Xiaomi TV 集成仅支持运行 MIUI 的小米电视。

您需要确保电视已连接到网络，并且 Home Assistant 实例与电视位于同一网络中。

要将电视添加到安装环境中，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
media_player:
  - platform: xiaomi_tv
```

:::important
启动或重启 Home Assistant 时，请确保电视处于关闭状态。这是电视本身的一个缺陷。

:::
```yaml
host:
  description: "小米电视的 IP，例如 `192.168.0.10`。"
  required: false
  type: string
name:
  description: 在前端中显示的名称。
  required: false
  default: Xiaomi TV
  type: string
```

如果您未在配置文件中设置 `host`，系统会自动发现本地网络中的电视。

要手动添加电视，可以使用以下配置：

```yaml
# Example configuration.yaml entry
media_player:
  - platform: xiaomi_tv
    host: YOUR_TV_IP
    name: YOUR_TV_NAME
```

:::note
此平台不会真正关闭电视，而是让电视进入睡眠并再唤醒。这很有用，因为电视当前选择的输入源会保持不变。实际上，这会让您的电视更像一台传统电视。

:::
