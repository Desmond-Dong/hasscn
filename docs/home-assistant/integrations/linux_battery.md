---
title: Linux Battery
description: 'Linux Battery 集成会使用您本地 Linux 系统中 /sys/class/powersupply/ 存储的信息，来显示当前电池状态的详细信息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - System monitor
ha_release: 0.28
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: linux_battery
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Linux Battery

**Linux Battery** 集成会使用您本地 Linux 系统中 `/sys/class/power_supply/` 存储的信息，来显示当前电池状态的详细信息。

要在您的安装中设置电池传感器，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: linux_battery
```

```yaml
name:
  description: 在前端中使用的友好名称。
  required: false
  default: Battery
  type: string
battery:
  description: 电池编号。
  required: false
  default: 1
  type: integer
system:
  description: "本地系统类型。支持 `linux` 和 `android`。"
  required: false
  default: "`linux`"
  type: string
```
