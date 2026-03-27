---
title: UPC Connect Box
description: 'UPC Connect Box 集成可通过检查连接到 Liberty Global(https://www.libertyglobal.com) Connect Box(https://www.upc.ch/en/internet/learn-about-internet/) 的设备来实现在家检测。'
ha_category:
  - Presence detection
ha_release: 0.36
ha_codeowners:
  - '@pvizeli'
  - '@fabaff'
ha_domain: upc_connect
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# UPC Connect Box

**UPC Connect Box** 集成可通过检查连接到 [Liberty Global](https://www.libertyglobal.com) [Connect Box](https://www.upc.ch/en/internet/learn-about-internet/) 的设备来实现在家检测。Liberty Global 是一家互联网服务提供商，在瑞士（也称 UPC Cablecom）、奥地利、荷兰（Ziggo）、匈牙利（Vodafone）和波兰（PLAY）提供服务。

:::important
此集成通过使用密码登录路由器来工作。路由器任意时刻只能有一个活动会话，因此如果您想访问路由器设置，请先停止 Home Assistant。

:::
要在您的安装中使用 Connect Box，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例
device_tracker:
  - platform: upc_connect
    password: PASSWORD
```

```yaml
password:
  description: 路由器的密码。
  required: true
  type: string
host:
  description: 路由器的 IP 地址。
  required: false
  default: 192.168.0.1
  type: string
```

有关如何配置要跟踪的人员，请参阅 [device tracker 集成页面](/home-assistant/integrations/device_tracker/)。

已知还可与以下设备配合使用：

- Irish Virgin Media Super Hub 3.0
- Unitymedia Connect Box (DE)
- Ziggo Connectbox (NL)
- Compal CH7465LG ED 3.0 - Connect box (UPC / Vodafone CZ / Vodafone HU)
