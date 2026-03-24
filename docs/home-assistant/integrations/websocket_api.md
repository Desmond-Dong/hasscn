---
title: Home Assistant WebSocket API
description: 关于如何在 Home Assistant 中设置 WebSocket API 的说明。
ha_category:
  - Other
ha_release: 0.34
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: websocket_api
ha_platforms:
  - sensor
ha_integration_type: system
---

**Home Assistant WebSocket API** 集成会设置一个 WebSocket API，让您能够与以无界面模式运行的 Home Assistant 实例交互。此集成依赖于 [`http` 集成](/home-assistant/integrations/http/)。

## 配置

```yaml
# Example configuration.yaml entry
websocket_api:
```

有关如何使用 WebSocket API 的详细信息，请参阅 [WebSocket API 文档](https://developers.home-assistant.io/docs/api/websocket)。

## 跟踪当前连接

WebSocket API 提供了一个传感器，用于跟踪当前已连接客户端的数量。您可以将以下内容添加到配置中来启用它：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: websocket_api
```

这会创建一个名为 `sensor.connected_clients` 的传感器，其值为当前连接的客户端总数。
