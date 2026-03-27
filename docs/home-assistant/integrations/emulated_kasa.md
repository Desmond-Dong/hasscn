---
title: Emulated Kasa
description: 'Emulated Kasa 集成模拟 TP-Link Kasa 智能插座，并向本地网络上任何可能请求的设备公布配置设备的功率使用情况。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Energy
ha_iot_class: Local Push
ha_release: 0.115
ha_codeowners:
  - '@kbickar'
ha_domain: emulated_kasa
ha_quality_scale: internal
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Emulated Kasa

**Emulated Kasa** 集成模拟 TP-Link Kasa 智能插座，并向本地网络上任何可能请求的设备公布配置设备的功率使用情况。

例如，[Sense Energy Monitor](/home-assistant/integrations/sense) 可以使用此功能来识别功率使用情况。

配置包括要公开的实体列表，以及发布名称和当前功率使用的属性。
如果实体是传感器，该值将被报告为当前功率使用，除非定义了 power 字段。
power 字段可以包含硬编码值、传感器或模板（参见配置示例）。

:::note
提供的功率单位必须是当前功率使用（瓦特）。`kW` 值可以转换，但不能使用 `kWh` 值。

:::
## 配置

此集成需要在 "`configuration.yaml`" 文件中列出要公开的实体。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
emulated_kasa:
  entities:
    light.dining_room:
      power: 40.2
```

```yaml
entities:
  description: 要公开的实体列表。
  required: true
  type: map
  keys:
    name:
      description: 外部设备可见的名称。
      required: false
      type: string
    power:
      description: 当前功率使用（瓦特）。可以设置为静态值或模板。
      required: false
      type: [integer,float,template]
    power_entity:
      description: 测量当前功率使用（瓦特）的传感器。
      required: false
      type: string
```

完整的配置示例如下所示。


```yaml
# 示例 configuration.yaml 条目
emulated_kasa:
  entities:
    # 使用传感器状态值
    sensor.power_meter:
      name: "Power Meter"
    # 使用静态值
    light.dining_room:
      name: "Dining Room Lights"
      power: 40.2
    # 使用基于设备状态的模板
    fan.ceiling_fan:
      power: >-
                {% if is_state_attr('fan.ceiling_fan','speed', 'low') %} 2
                {% elif is_state_attr('fan.ceiling_fan','speed', 'medium') %} 12
                {% elif is_state_attr('fan.ceiling_fan','speed', 'high') %} 48
                {% endif %}
    # 使用来自第三方传感器的值
    light.wled:
      name: "Strip Lights"
      power_entity: sensor.light_power_w
    # 使用模板将设备状态转换为瓦特
    sensor.ups_kw:
      name: UPS Power
      power: "{{ float(states('sensor.ups_kw')) * 1000 }}"
```

