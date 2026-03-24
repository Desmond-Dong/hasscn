---
title: Xeoma
description: 关于如何在 Home Assistant 中集成来自 Xeoma 服务器的摄像头视频流的说明。
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 0.62
ha_domain: xeoma
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Xeoma** 集成可让您查看来自 [Xeoma](https://felenasoft.com/xeoma) 视频监控服务器的视频流。

## 配置

要启用 Xeoma 摄像头视频流，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
camera:
  - platform: xeoma
    host: http://localhost:10090
```

```yaml
host:
  description: Xeoma 服务器 Web 界面的 URL。
  required: true
  type: string
username:
  description: 用于访问 Xeoma 服务器 Web 界面的用户名。
  required: false
  type: string
password:
  description: 用于访问 Xeoma 服务器 Web 界面的密码。
  required: false
  type: string
new_version:
  description: 如果 Xeoma 服务器版本为 17.5 或更早版本，请设为 false。
  required: false
  type: boolean
  default: true
cameras:
  description: 各个 Xeoma 摄像头的自定义配置列表。
  required: false
  type: list
  keys:
    image_name:
      description: 此摄像头在 Xeoma 中配置的 JPEG 图像名称（不含 .jpg 扩展名）。
      required: true
      type: string
    name:
      description: 此摄像头在前端中显示的名称。
      required: false
      type: string
      default: 此摄像头的 `image_name`。
    hide:
      description: 不在 Home Assistant 中显示此摄像头。
      required: false
      type: boolean
      default: false
```

## 完整示例

```yaml
# Example configuration.yaml entry
camera:
  - platform: xeoma
    host: http://localhost:10090
    username: user
    password: secretpassword
    new_version: false
    cameras:
      - image_name: front_porch
        name: Front Porch
      - image_name: back_patio
        hide: true
```

要使用此平台，您必须在至少一条摄像头链路中启用 Xeoma Web Server 模块。

此平台会解析 Xeoma Web 界面，找出所有已启用的摄像头，并将它们全部添加到 Home Assistant。您可以使用平台配置隐藏个别摄像头。

每个摄像头的 `image_name` 配置值应与 Xeoma Web Server 配置中提供的名称一致（位于 _Path to access images_ 下），并去掉 _.jpg_ 扩展名。
