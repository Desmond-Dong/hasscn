---
title: CPU Speed
description: 'CPU Speed 集成允许您监控当前 CPU 速度。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - System monitor
ha_release: pre 0.7
ha_iot_class: Local Push
ha_codeowners:
  - '@fabaff'
ha_domain: cpuspeed
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
---
# CPU Speed

**CPU Speed** 集成允许您监控当前 CPU 速度。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 已知问题和限制

并非所有 CPU 都受支持。例如，已知某些 [ARM CPU](https://github.com/workhorsy/py-cpuinfo/#cpu-support)
无法与此集成一起工作。