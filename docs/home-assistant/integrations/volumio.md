---
title: Volumio
description: 如何设置 Volumio 媒体播放器集成
ha_category:
  - Media player
ha_release: 0.41
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@OnFreund'
ha_domain: volumio
ha_zeroconf: true
ha_platforms:
  - media_player
ha_integration_type: device
---

**Volumio** 集成允许您通过 Home Assistant 控制 [Volumio](https://volumio.org/) 媒体播放器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
手动配置时，Volumio 2.799 及以下版本不会提供唯一 ID，因此您将无法重命名实体，也无法将设备分配到区域。如果自动发现对您无效，建议先升级 Volumio 再进行配置。

:::
