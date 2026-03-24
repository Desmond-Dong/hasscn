---
title: Vilfo Router
description: 关于如何将 Vilfo 路由器集成到 Home Assistant 的说明。
ha_release: '0.106'
ha_category:
  - Network
  - Sensor
  - System monitor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ManneW'
ha_domain: vilfo
ha_platforms:
  - sensor
ha_integration_type: device
---

**Vilfo Router** 集成允许您在 Home Assistant 中查看 [Vilfo Router](https://www.vilfo.com) 的状态。

目前它支持上报设备当前负载百分比，以及以分钟为单位的当前运行时间。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 获取访问令牌

API 的访问令牌可以通过 Vilfo Web UI 中名为 “general” 的面板获取。有关如何找到令牌的更多信息，请参阅[官方 API 文档](https://www.vilfo.com/apidocs/#header-authorization)。

:::important
在 Vilfo 固件 1.0.13 版本中，当有新的 Web UI 登录发生时，访问令牌会失效。为了避免 Web UI 登录干扰 API 调用，您可以专门为 API 创建一个独立用户，并使用该用户的访问令牌。

:::
