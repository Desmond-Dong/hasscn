---
title: Open Exchange Rates
description: "有关如何在 Home Assistant 中集成 https://openexchangerates.org 的汇率的说明。"

ha_category:
  - Finance
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 0.23
ha_domain: openexchangerates
ha_platforms:
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@MartinHjelmare'
---
# Open Exchange Rates

**Open Exchange Rates** integration 会显示来自 [Open Exchange Rates](https://openexchangerates.org) 的当前汇率。该服务为 [170 种货币](https://openexchangerates.org/currencies)提供实时汇率。

免费账户仅支持将 USD 用作基础货币，每月允许 1000 次请求，并且每小时更新一次。

[此处](https://openexchangerates.org/signup) 获取您的 API 密钥

## Configuration

To add the **Open Exchange Rates** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=openexchangerates)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=openexchangerates).
- From the list, select **Open Exchange Rates**.
- Follow the instructions on screen to complete the setup.

</details>
