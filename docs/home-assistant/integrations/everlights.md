---
title: EverLights
description: 'EverLights(https://myeverlights.com/) 是安装在房屋檐槽或泛水板上的永久性圣诞灯。本集成可以将某个分区中的所有 LED 设置为同一种颜色，或者激活此前已保存到控制盒中的图案效果。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 0.87
ha_domain: everlights
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# EverLights

[EverLights](https://myeverlights.com/) 是安装在房屋檐槽或泛水板上的永久性圣诞灯。本集成可以将某个分区中的所有 LED 设置为同一种颜色，或者激活此前已保存到控制盒中的图案效果。

### 配置细节

要启用 EverLights，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
light:
  - platform: everlights
    hosts:
      - 192.168.1.123
      - 192.168.1.124
```

```yaml
hosts:
  description: EverLights 控制盒的 IP 地址列表。
  required: true
  type: list
```

### 效果

保存到控制盒中的 EverLights 图案可通过 `light.turn_on` 动作中的 effect 参数来激活。如果指定了 effect，则颜色和亮度设置会被忽略。

### 限制

EverLights 控制盒的状态只能表明某个分区是否处于活动状态，但不会指示当前颜色或图案。状态属性中的颜色和效果是根据最近一次执行 `light.turn_on` 的结果推断出来的。如果控制盒的计划任务或其他应用做出了变更，状态属性不会同步更新。
