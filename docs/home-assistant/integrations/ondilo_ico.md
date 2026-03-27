---
title: Ondilo ICO
description: 'Ondilo(https://ondilo.com/en/) 的 ICO 是一个小型连接设备，您只需将其放入泳池或水疗中心即可。 ICO 持续分析您的泳池/水疗中心的水质并通过其应用程序通知您。 ICO提供个性化推荐，以便您在正确的时间以正确的比例使用正确的产品。'

ha_category:
  - Sensor
ha_release: 2021.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@JeromeHXP'
ha_domain: ondilo_ico
ha_platforms:
  - sensor
ha_integration_type: hub
---
# Ondilo ICO

[Ondilo](https://ondilo.com/en/) 的 ICO 是一个小型连接设备，您只需将其放入泳池或水疗中心即可。 ICO 持续分析您的泳池/水疗中心的水质并通过其应用程序通知您。 ICO提供个性化推荐，以便您在正确的时间以正确的比例使用正确的产品。

Home Assistant 目前支持以下信息：

- 水温
- 氧化还原电位（ORP/氧化还原）
- 酸碱度
- TDS（总溶解固体）或盐
- 电池
- 接收信号强度指示

将为所有这些数据创建传感器。

## Prerequisites

- Password from the **Ondilo mobile app**.
   - The password used to log in to the Ondilo website usually does not work for the Home Assistant/API authentication, as it is not linked to the API.
## Configuration

To add the **Ondilo ICO** hub to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=ondilo_ico)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=ondilo_ico).
- From the list, select **Ondilo ICO**.
- Follow the instructions on screen to complete the setup.

</details>

## Known limitations

- 尚不支持推荐。