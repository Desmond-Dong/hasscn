---
title: Hayward Omnilogic
description: "有关如何配置 Hayward OmniLogic 集成的说明。"

ha_category:
  - Sensor
  - Switch
ha_release: 0.116
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: omnilogic
ha_platforms:
  - sensor
  - switch
ha_integration_type: hub
---
[Hayward OmniLogic](https://www.hayward-pool.com/shop/en/pools/omnilogic-i-auomni--1) 智能泳池和水疗技术控制。

Home Assistant 目前支持以下设备类型：

- ***传感器*** - 气温、水温、可变泵速、加氯器设置、盐度、pH 值和 ORP
- ***开关*** - 所有继电器、泵（单速、双速、变速）和基于继电器的灯。

## Configuration

To add the **Hayward Omnilogic** hub to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=omnilogic)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=omnilogic).
- From the list, select **Hayward Omnilogic**.
- Follow the instructions on screen to complete the setup.

</details>

## Known limitations

- 该平台仅支持当前版本的传感器和开关。未来的版本将包括用于控制 Colorlogic 灯和泳池加热器的灯/热水器。

## Debugging integration

如果您遇到集成问题，您可以将调试打印添加到日志中以帮助排除故障。

```yaml
logger:
  default: info
  logs:
    omnilogic: debug
    homeassistant.components.omnilogic: debug
```
