---
title: Nightscout
description: "有关如何将 Nightscout CGM 数据集成到 Home Assistant 的说明。"

ha_category:
  - Sensor
ha_release: 0.115
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@marciogranzotto'
ha_domain: nightscout
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Nightscout** integration allows you to view your CGM data from [Nightscout](http://www.nightscout.info/) in Home Assistant.

## Configuration

To add the **Nightscout** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nightscout)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nightscout).
- From the list, select **Nightscout**.
- Follow the instructions on screen to complete the setup.

</details>

如果您的 Nightscout 实例需要身份验证才能访问 API，您还需要在配置表单中输入 API Key。

### Sensor

如果您正在运行传感器会话，并且启用了 Nightscout 集成，您应该会看到“sensor.blood_glucose”实体。

图标发生变化以指示葡萄糖读数的方向或趋势。
该状态是 Nightscout 的最后一次读数，您可以在传感器的属性中查看有关读数的其他信息。

### Example automation

```yaml
- alias: "overnight_low_kitchen_lights"
  description: Turn on the lights in the kitchen if my blood sugar drops low overnight
  triggers:
  - trigger: numeric_state
    entity_id: sensor.blood_glucose
    below: "65" 
  conditions:
    - condition: time
      after: "22:00:00"
      before: "06:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.kitchen
```
