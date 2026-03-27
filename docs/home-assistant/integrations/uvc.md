---
title: Ubiquiti UniFi Video
description: 'Ubiquiti UniFi Video 集成允许您将 UniFi Video Camera (UVC)(https://www.ui.com/products/unifivideo) 接入 Home Assistant。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Camera
ha_release: 0.13
ha_iot_class: Local Polling
ha_domain: uvc
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Ubiquiti UniFi Video

**Ubiquiti UniFi Video** 集成允许您将 [UniFi Video Camera (UVC)](https://www.ui.com/products/#unifivideo) 接入 Home Assistant。

该平台会连接到 [UniFi NVR 软件](https://www.ui.com/download/unifi-video)，并自动发现和添加所有连接到 NVR 的摄像头。

## 设置

建议您在 NVR 软件中专门为此集成创建一个新用户，并且只授予其运行所需的权限。

- API 密钥可在 NVR 软件的 `User` -> `My account` -> `API Access` 中找到。
- 摄像头密码可在 NVR 软件的 `Settings` -> `Camera Settings` -> `Camera Password` 中找到。

## 配置

要在您的安装中使用此集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例
camera:
  - platform: uvc
    nvr: IP_ADDRESS
    key: API_KEY
```

```yaml
nvr:
  description: NVR（网络视频录像机）服务器的 IP 地址或主机名。
  required: true
  type: string
port:
  description: 用于访问 NVR 的端口号。
  required: false
  type: integer
  default: 7080
key:
  description: 可从 NVR Web 界面获取的 API 密钥。
  required: true
  type: string
password:
  description: 摄像头密码。
  required: false
  type: string
  default: ubnt
ssl:
  description: 是否使用 SSL/TLS 连接到 NVR。
  required: false
  type: boolean
  default: false
```

:::important
使用 `API_KEY` 访问由 Ubiquiti NVR 软件管理的摄像头时，关联用户账户必须在 NVR 软件中至少具备管理员权限，才能将新摄像头添加到 Home Assistant。实体创建完成后，您可以再降低该用户账户的权限。

:::
