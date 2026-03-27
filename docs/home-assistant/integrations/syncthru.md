---
title: Samsung SyncThru Printer
description: 'The Samsung SyncThru Printer integration allows Home Assistant to read current data from a local Samsung printer. 本页属于 Home Assistant 中文文档。'
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_release: 0.66
ha_config_flow: true
ha_codeowners:
  - '@nielstron'
ha_domain: syncthru
ha_ssdp: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: device
---
# Samsung SyncThru Printer

The **Samsung SyncThru Printer** integration allows Home Assistant to read current data from a local Samsung printer.  

Depending on device abilities, the following separate sensors are created if supported:

- Whether the printer is online
- Whether the printer is in an error state
- Black, cyan, magenta and yellow toner fill level
- Black, cyan, magenta and yellow drum state
- First to fifth paper input tray state
- First to sixth paper output tray state

In order for a device to be discovered automatically, SSPD / UPnP (under Network settings) must be enabled.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
