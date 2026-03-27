---
title: MQTT Eventstream
description: 'MQTT Eventstream 集成可通过 MQTT 连接两个 Home Assistant 实例。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Other
ha_release: 0.11
ha_iot_class: Local Polling
ha_domain: mqtt_eventstream
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# MQTT Eventstream

**MQTT Eventstream** 集成可通过 MQTT 连接两个 Home Assistant 实例。

## 配置

要将 MQTT Eventstream 集成到 Home Assistant 中，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt_eventstream:
  publish_topic: MyServerName
  subscribe_topic: OtherHaServerName
```

```yaml
publish_topic:
  description: 用于发布本地事件的主题。
  required: false
  type: string
subscribe_topic:
  description: 用于接收远程服务器事件的主题。
  required: false
  type: string
ignore_event:
  description: 不会通过 MQTT 发送的[事件](/home-assistant/docs/configuration/events/)列表。
  required: false
  type: list
```

## 多实例

来自多个实例的事件可以通过父实例订阅通配符主题的方式，汇总到单个父实例中。

```yaml
# Example parent instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: parent/topic
  subscribe_topic: child/#
  ignore_event:
    - call_service
    - state_changed
```

在多实例设置中，每个子实例都应发布到各自的主题。

```yaml
# Example child instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: child/upstairs
  subscribe_topic: parent/topic
```

```yaml
# Example child instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: child/downstairs
  subscribe_topic: parent/topic
```
