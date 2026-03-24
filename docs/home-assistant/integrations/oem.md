---
title: OpenEnergyMonitor WiFi Thermostat
description: "有关如何将 OpenEnergyMonitor 恒温器与 Home Assistant 集成的说明。"

ha_category:
  - Climate
ha_release: 0.39
ha_iot_class: Local Polling
ha_domain: oem
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

此 integration 支持由 [OpenEnergyMonitor](https://web.archive.org/web/20220426080315/https://shop.openenergymonitor.com/wifi-mqtt-relay-thermostat/) 销售的基于 ESP8266 的 “WiFi MQTT Relay / Thermostat”（归档页面，现已停售）。其底层[库](https://oemthermostat.readthedocs.io/)仅支持该[原始设备](https://harizanov.com/2014/12/wifi-iot-3-channel-relay-board-with-mqtt-and-http-api-using-esp8266/)的单继电器版本。

该平台会在“手动”模式下控制恒温器的设定温度。

要进行设置，请将以下内容添加到您的 `configuration.yaml` 文件中。
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# `configuration.yaml` 配置示例
climate:
  - platform: oem
    host: 192.168.0.100
```

```yaml
host:
  description: 恒温器的 IP 地址或主机名。
  required: true
  type: string
port:
  description: Web 界面的端口。
  required: false
  default: 80
  type: integer
name:
  description: 在前端中显示的名称。
  required: false
  default: Thermostat
  type: string
username:
  description: 如果已设置，用于 Web 界面的用户名。
  required: inclusive
  type: string
password:
  description: 如果已设置，用于 Web 界面的密码。
  required: inclusive
  type: string
```
