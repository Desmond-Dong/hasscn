---
title: Syncthing
description: 'Syncthing(https://syncthing.net/) is a continuous file synchronization program. It synchronizes files between two or more computers in real-time。'
ha_category:
  - Downloading
  - Sensor
ha_release: 2021.6
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@zhulik'
ha_domain: syncthing
ha_platforms:
  - sensor
ha_integration_type: service
---
# Syncthing

[Syncthing](https://syncthing.net/) is a continuous file synchronization program. It synchronizes files between two or more computers 
in real-time, safely protected from prying eyes.

The Syncthing integration allows you to monitor states of your synced folders from within Home Assistant and set up automations based on the information.

## Prerequisites

To set up the monitoring you need to get an **API key**. Open the Syncthing web 
interface (e.g., `http://127.0.0.1:8384`) in the browser and go to **Actions** > **Settings**. You will find
the key on the right of the settings dialog.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
  
## Integration entities

The Syncthing integration adds one sensor per syncing folder:

![Syncthing Sensors](/home-assistant/images/integrations/syncthing/sensors.png)

![Syncthing Sensors](/home-assistant/images/integrations/syncthing/sensor.png)
