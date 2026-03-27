---
title: Open-Meteo
description: 'Open-Meteo integration 可将 Open-Meteo(https://open-meteo.com) 提供的免费天气预报集成到 Home Assistant 中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Weather
ha_release: 2022.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: open_meteo
ha_platforms:
  - diagnostics
  - weather
ha_integration_type: service
---
# Open-Meteo

**Open-Meteo** integration 可将 [Open-Meteo](https://open-meteo.com) 提供的免费天气预报集成到 Home Assistant 中。

Open-Meteo 为开源开发者和非商业用途提供免费的天气预报 API。使用此服务不需要账户或 API 密钥。

Open-Meteo 与各国气象机构合作提供开放数据，分辨率为 1 到 11 公里。其高性能 API 会为您的位置选择最合适的天气模型。

## Configuration

To add the **Open-Meteo** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=open_meteo)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=open_meteo).
- From the list, select **Open-Meteo**.
- Follow the instructions on screen to complete the setup.

</details>
