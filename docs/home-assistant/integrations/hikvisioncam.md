---
title: Hikvision
description: 关于如何将海康威视摄像头开关集成到 Home Assistant 的说明。
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_codeowners:
  - '@fbradyirl'
ha_domain: hikvisioncam
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Hikvision** 集成允许您控制 [海康威视](https://www.hikvision.com/) 摄像头上的移动检测设置。

:::important
目前仅支持使用默认 HTTPS 端口。

:::
要在您的系统中使用海康威视摄像头，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: hikvisioncam
    host: 192.168.1.32
```

在海康威视摄像头设置中，您还需要进行一些更改：
- 在摄像头菜单中，导航到 网络 >> 高级设置 >> 集成协议。勾选"启用 Hikvision-CGI"复选框，并将"Hikvision-CGI 认证"设置为"摘要/基本"。
- 确保摄像头用户有权更改参数设置。在菜单中导航到 系统设置 >> 用户管理 >> 用户管理。选择正确的用户，点击"修改"并勾选"远程：参数设置"复选框。

```yaml
host:
  description: 海康威视摄像头的 IP 地址，例如 `192.168.1.32`。
  required: true
  type: string
port:
  description: 连接到海康威视摄像头的端口。
  required: false
  default: 80
  type: integer
name:
  description: 此参数允许您覆盖摄像头的名称。
  required: false
  default: Hikvision Camera Motion Detection
  type: string
username:
  description: 访问海康威视摄像头的用户名。
  required: false
  default: admin
  type: string
password:
  description: 访问海康威视摄像头的密码。
  required: false
  default: 12345
  type: string
```