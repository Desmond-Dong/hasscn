---
title: Monoprice Blackbird 矩阵切换器
description: 关于如何将 Monoprice Blackbird 4k 8x8 HDBaseT 矩阵切换器集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_release: 0.68
ha_iot_class: Local Polling
ha_domain: blackbird
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Monoprice Blackbird 矩阵切换器

**Monoprice Blackbird 矩阵切换器** 集成允许您通过串口或 IP 连接控制 [Monoprice Blackbird 矩阵切换器](https://www.monoprice.com/product?p_id=21819)（8x8），此集成不支持 4x4 矩阵切换器。

要将 Blackbird 8x8 设备添加到您的安装中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
media_player:
  - platform: blackbird
    port: /dev/ttyUSB0
    zones:
      1:
        name: 客厅
    sources:
      3:
        name: 蓝光
```

```yaml
port:
  description: Blackbird 矩阵切换器连接的串口。[`port`](#port) 和 [`host`](#host) 不能同时指定。
  required: exclusive
  type: string
host:
  description: Blackbird 矩阵切换器的 IP 地址。[`port`](#port) 和 [`host`](#host) 不能同时指定。
  required: exclusive
  type: string
zones:
  description: 可用区域列表。有效区域为 1、2、3、4、5、6、7、8。每个区域必须分配一个名称。
  required: true
  type: map
  keys:
    ZONE_NUMBER:
      description: 区域的名称。
      type: string
sources:
  description: 可用源列表。有效源编号为 1、2、3、4、5、6、7、8。每个源编号对应 Blackbird 矩阵切换器上的输入编号。与区域类似，每个源必须分配一个名称。
  required: true
  type: map
  keys:
    ZONE_NUMBER:
      description: 源的名称。
      type: string
```

### 动作 `blackbird.set_all_zones`

将所有区域设置为相同的输入源。此动作允许您立即同步家中的所有电视。无论提供什么 `entity_id`，所有区域都会更新。

| 数据属性 | 可选 | 描述                                     |
| ---------------------- | -------- | ----------------------------------------------- |
| `entity_id`            | 是      | 指向区域 `entity_id` 的字符串。 |
| `source`               | 否       | 要激活的源名称字符串。              |