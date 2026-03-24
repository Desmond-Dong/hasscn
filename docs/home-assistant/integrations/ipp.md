---
title: Internet Printing Protocol (IPP)
description: 关于如何将支持互联网打印协议 (IPP) 的打印机集成到 Home Assistant 的说明。
ha_category:
  - System monitor
ha_release: 0.108
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ctalkington'
ha_domain: ipp
ha_platforms:
  - diagnostics
  - sensor
ha_zeroconf: true
ha_integration_type: device
---

**Internet Printing Protocol (IPP)** 集成允许您从支持 [Internet Printing Protocol](https://www.pwg.org/ipp/everywhere.html) 的联网打印机读取当前数据。

它会提供打印机状态和剩余墨量等信息。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
