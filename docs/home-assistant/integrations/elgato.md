---
title: Elgato Light
description: 关于如何将 Elgato Light 集成到 Home Assistant 的说明。
ha_category:
  - Light
ha_release: 0.104
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: elgato
ha_zeroconf: true
ha_platforms:
  - button
  - diagnostics
  - light
  - sensor
  - switch
ha_integration_type: device
---

[Elgato](https://www.elgato.com/) 灯光为高端工作室照明树立了标杆。这些 LED 灯专为流媒体和内容创作者设计和制造，其中许多人在 YouTube 和 Twitch 等平台上运营。

以下 Elgato 灯光产品已通过此集成测试：

- [Elgato Key Light](https://www.elgato.com/en/key-light)
- [Elgato Key Light Air](https://www.elgato.com/en/key-light-air)
- [Elgato Key Light Mini](https://www.elgato.com/en/key-light-mini)
- [Elgato Ring Light](https://www.elgato.com/en/ring-light)
- [Elgato Light Strip](https://www.elgato.com/en/light-strip)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 灯光

此集成将 Key Light 设备作为灯光添加到 Home Assistant 中，允许您控制色温、亮度及其开/关状态。

使用 Elgato Light Strip 时，颜色支持会自动检测并在 Home Assistant 中启用。

## 其他实体

除了上述灯光实体外，此集成还提供其他辅助实体，可用于监控和控制您的 Elgato 灯光。

### 传感器

如果您使用的是 Key Light Mini，Home Assistant 将提供一个额外的传感器，以百分比（%）显示电池电量。

### 开关

如果您使用的是 Key Light Mini，Home Assistant 将提供一个额外的开关，允许控制灯光的"工作室模式"。启用工作室模式时，将不会使用电池，而是直接供电。

## 动作

### 动作：识别

`elgato.identify` 动作允许您让 Elgato 灯光短暂闪烁。最初是作为一种识别您正在与哪盏灯通信的方式；它也可以用作创建视觉通知的动作。

此动作在灯光关闭时也可使用，识别序列完成后灯光将关闭。

[![Open **Settings** > **Developer tools** > **Actions** in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=elgato.identify)

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 是 | 字符串或 Elgato 灯光实体 ID 列表。

示例自动化，采用 YAML 格式，当二值传感器（门铃）被触发时触发视觉通知：

```yaml
- alias: "视觉门铃通知示例"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell
      to: "on"
  actions:
    - action: elgato.identify
      target:
        entity_id: light.elgato_key_light
```