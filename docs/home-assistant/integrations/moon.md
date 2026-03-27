---
title: Moon
description: 'The Moon integration tracks the phases of the moon. 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Environment
ha_iot_class: Calculated
ha_release: 0.38
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
  - '@frenck'
ha_domain: moon
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: service
---
# Moon

The **Moon** integration tracks the phases of the moon.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

The sensor provided by this integration will return one of the following values:

- `new_moon`
- `waxing_crescent`
- `first_quarter`
- `waxing_gibbous`
- `full_moon`
- `waning_gibbous`
- `last_quarter`
- `waning_crescent`

<p class='img'>
<img src='/home-assistant/images/screenshots/more-info-dialog-moon.png' />
</p>
