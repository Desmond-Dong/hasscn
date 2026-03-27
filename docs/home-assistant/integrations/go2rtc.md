---
title: go2rtc
description: 'go2rtc 是一个开源项目，提供支持 RTSP、WebRTC、HomeKit、FFmpeg、RTMP 等格式的摄像头流媒体应用。go2rtc 集成会连接到 go2rtc 实例，并为您的所有摄像头提供 WebRTC 代理。要了解更多 go2rtc 信息。'
ha_category:
  - Camera
ha_release: 2024.11
ha_iot_class: Local Polling
ha_codeowners:
  - '@home-assistant/core'
ha_domain: go2rtc
ha_integration_type: system
related:
  - docs: /installation/
ha_quality_scale: internal
---
# go2rtc

go2rtc 是一个开源项目，提供支持 RTSP、WebRTC、HomeKit、FFmpeg、RTMP 等格式的摄像头流媒体应用。**go2rtc** 集成会连接到 go2rtc 实例，并为您的所有摄像头提供 WebRTC 代理。要了解更多 go2rtc 信息，请参阅[项目的 GitHub 页面](https://github.com/AlexxIT/go2rtc/)。

如果您使用 [`default_config`](/home-assistant/integrations/default_config/)，并且通过以下任一安装类型运行 Home Assistant，则 go2rtc 集成会自动设置，您无需执行任何操作：

- Home Assistant Operating System
- Home Assistant Container

## 配置

此集成属于 [`default_config`](/home-assistant/integrations/default_config/) 的一部分。

可用的 YAML 选项如下：

```yaml
debug_ui:
  required: false
  description: 启用 go2rtc 的 UI，用于帮助调试 WebRTC 问题。`debug_ui` 仅应在调试期间启用，因为它会暴露 11984 端口。
  default: false
  type: boolean
username:
  required: false
  description: 访问调试 UI 时用于身份验证的用户名。启用 `debug_ui` 时必填。
  type: string
password:
  required: false
  description: 访问调试 UI 时用于身份验证的密码。启用 `debug_ui` 时必填。
  type: string
url:
  required: false
  description: 自托管 [go2rtc](https://github.com/AlexxIT/go2rtc/) 服务器的 URL
  type: string
```

如果您使用的是由 Home Assistant 管理的 go2rtc 服务器，请注意，为避免端口冲突，所有端口都会在默认端口设置前加上 `1`：
- API 端口 `1984` 会变为 `11984`
- WebRTC 端口 `8555` 会变为 `18555`

:::warning
`debug_ui` 仅应在调试期间启用，因为它会暴露 11984 端口。
调试结束后请立即禁用 `debug_ui`。
:::

### 示例

使用自托管实例：

```yaml
go2rtc:
  url: http://my-go2rtc-instance:1984
```

启用带身份验证的调试 UI：

```yaml
go2rtc:
  debug_ui: true
  username: your_username
  password: your_password
```
