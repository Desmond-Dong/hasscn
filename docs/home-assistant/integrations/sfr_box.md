---
title: SFR Box
description: 'The SFR Box integration offers integration with the SFR broadband router. 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_release: 2023.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@epenet'
ha_domain: sfr_box
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: silver
---
# SFR Box

The **SFR Box** integration offers integration with the **SFR** broadband router.

This integration provides the following platforms:

- Binary sensors - such as ADSL status.
- Buttons - such as reboot.
- Sensors - such as ADSL line status, attenuation, noise and data rate.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "The hostname, IP address, or full URL of your SFR device."
Username (optional):
  description: "The username for accessing your SFR box's web interface. The default is 'admin'."
Password (optional):
  description: "The password for accessing your SFR box's web interface. The default is the Wi-Fi security key found on the device label."
```

## Compatibility

The integration uses the REST API, which is known to be available on models `NB4`, `NB5`, `NB6`, `NB6V`, and `NB6VAC`.

However, `NCC` models do not appear to expose this REST API, and are therefore unsupported by the integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
