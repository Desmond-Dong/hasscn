---
title: Prosegur Alarm
description: 有关如何将 Prosegur 智能警报集成到 Home Assistant 的说明。
ha_category:
  - Alarm
  - Camera
ha_release: 2021.8
ha_codeowners:
  - '@dgomes'
ha_iot_class: Cloud Polling
ha_domain: prosegur
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - camera
  - diagnostics
ha_integration_type: hub
---

[Prosegur](https://www.prosegur.com/) 智能警报可集成到 Home Assistant。

Prosegur 是一家提供入侵防护与检测系统的公司，业务覆盖伊比利亚半岛、南美和南非，旨在保障家庭安全。

Prosegur 提供一系列可联网的报警系统，可通过云服务进行远程控制。此集成通过接入其云服务 API，提供与官方移动应用类似的功能。

目前在 Home Assistant 中支持以下设备类型：
- Alarm
- Camera


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 动作 `camera.request_image`

此动作会让 Prosegur 云服务向您的本地摄像头执行“Request image（请求图像）”。该动作应尽量少用，因为 Prosegur 往往会对该动作进行长时间限流，可能导致此集成和 Prosegur 手机应用都出现错误。
