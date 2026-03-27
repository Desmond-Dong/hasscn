---
title: Snapcast
description: 'Snapcast 集成允许您在 Home Assistant 中控制 Snapcast(https://github.com/badaix/snapcast)。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Media player
ha_release: 0.13
ha_iot_class: Local Push
ha_domain: snapcast
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: hub
ha_codeowners:
  - '@luar123'
---
# Snapcast

**Snapcast** 集成允许您在 Home Assistant 中控制 [Snapcast](https://github.com/badaix/snapcast)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 操作

Snapcast 集成提供了一些注册在 `media_player` 集成下的操作。

### 操作：Snapshot

`snapcast.snapshot` 操作用于保存一个或多个扬声器当前播放内容的快照。如果您想播放门铃声或通知音，并在之后恢复播放，此操作以及下面的操作会很有用。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 要保存快照的扬声器。 |

### 操作：Restore

`snapcast.restore` 操作用于恢复先前为一个或多个扬声器保存的快照。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | 需要恢复快照的 `entity_id` 字符串或列表。 |

### 操作：Set latency

`snapcast.set_latency` 操作用于设置扬声器的延迟。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 需要调整延迟的 `entity_id` 字符串或列表。 |
| `latency` | 否 | 延迟值，单位为毫秒。 |
