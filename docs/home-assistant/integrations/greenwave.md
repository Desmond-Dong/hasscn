---
title: Greenwave Reality
description: 关于如何在 Home Assistant 中设置 Greenwave Reality 灯的说明。
ha_category:
  - Light
ha_release: 0.61
ha_iot_class: Local Polling
ha_domain: greenwave
ha_platforms:
  - light
ha_integration_type: integration
ha_quality_scale: legacy
---

此集成通过与 Greenwave Reality（TCP Connected）网关通信，让您可以控制所有已注册到该网关的灯泡和灯具。灯泡和灯具可以在适用于 Android 和 iOS 的 TCP Lighting App 中创建和修改。

此集成已在以下固件版本上完成测试：

- 2.0.105

若要配置与网关的连接，请将以下内容添加到您的 `configuration.yaml` 文件中：

```yaml
light:
  - platform: greenwave
    host: XXX.XXX.XXX.XXX
    version: 3
```
`version` 选项表示固件的主版本号，应为 2 或 3。如果您使用的是版本 2，则无需额外步骤。如果您使用的是版本 3，则必须在首次启动 Home Assistant 之前按下网关上的 Sync 按钮，以便获取令牌。Home Assistant 启动后，您可以再次按下 Sync 按钮，或者等待其手动超时。

```yaml
host:
  description: 网关的 IP 地址
  required: true
  type: string
version:
  description: 网关固件的主版本号
  required: true
  type: integer
```
