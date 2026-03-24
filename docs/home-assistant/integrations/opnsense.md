---
title: OPNsense
description: "有关如何配置 OPNsense 集成的说明"

ha_category:
  - Hub
  - Presence detection
ha_release: 0.105
ha_codeowners:
  - '@mtreinish'
ha_domain: opnsense
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_quality_scale: legacy
---
[OPNsense](https://opnsense.org/) 是一个基于 FreeBSD 的开源防火墙
和路由平台。目前支持以下设备类型
在家庭助理中：

- [存在检测](#存在检测)

## Configuration

要配置 OPNsense 与 Home Assistant 的集成，请添加以下部分
到您的configuration.yaml：

```yaml
opnsense:
  url: https://router/api
  api_secret: API_SECRET
  api_key: API_KEY
```

其中“api_key”和“api_secret”值是从 OPNsense 获取的
使用网络界面的路由器。有关此过程的更多信息，请参阅
到 OPNsense [文档](https://docs.opnsense.org/development/how-tos/api.html#creating-keys)。

拥有 API 密钥的用户需要以下类型的权限：

- GUI 名称：诊断：ARP 表
- GUI 名称：诊断：网络洞察

:::important
OPNsense 25.7 及更高版本要求为 API 用户账户授予 **All Pages** 权限。

:::
```yaml
url:
  description: 路由器上 OPNsense API 端点的 URL。
  type: string
  required: true
api_key:
  description: 用于与 OPNsense API 端点进行身份验证的 API 密钥。
  type: string
  required: true
api_secret:
  description: 用于与 OPNsense API 端点进行身份验证的 API 密钥密文。
  type: string
  required: true
verify_ssl:
  description: 设为 `true` 以启用 OPNsense API SSL 验证。
  type: boolean
  required: false
  default: false
tracker_interfaces:
  description: 用于跟踪设备的 OPNsense 路由器接口列表。
  type: list
  required: false
  default: []
```

## 存在检测

该平台允许您通过查看连接到 OPNsense 路由器的设备来检测存在。
