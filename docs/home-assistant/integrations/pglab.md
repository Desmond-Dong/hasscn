---
title: PG LAB Electronics
description: 'The PG LAB Electronics integrations allows you to control PG LAB Electronics(https://www.pglab.dev/) devices in Home Assistant. 本页属于 Home Assistant 中文文档。'
ha_category:
  - Cover
  - Sensor
  - Switch
ha_release: '2025.3'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@pglab-electronics'
ha_domain: pglab
ha_platforms:
  - cover
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---
# PG LAB Electronics

The **PG LAB Electronics** integrations allows you to control [PG LAB Electronics](https://www.pglab.dev/) devices in Home Assistant.

## Supported devices

- [E-BOARD](https://www.pglab.dev/shop/p/e-board): Controller board to interface I2C devices by a local LAN connection.
- [E-RELAY](https://www.pglab.dev/shop/p/e-relay): 8 Channels relay board controlled by I2C connection.
- [E-SWITCH]: Coming soon

Each E-BOARD device can be connected to a maximum of 8 E-RELAY boards. E-BOARD can control
up to 64 relays or 32 shutters or a mixed configuration.

## Prerequisites

- MQTT broker and the [MQTT integration](/home-assistant/integrations/mqtt/) set up in Home Assistant.
- PG LAB Electronics devices MQTT setting configured to communicate with the MQTT broker.

Once the device is connected to your MQTT broker, it should be discovered by Home Assistant.
Add PG LAB Electronics integration.

### Device configuration

Configure each PG LAB Electronics devices following these steps:

1. Power the device and connect it to your local network.
2. From your router, get the IP address of your device (for example: 192.168.1.7).
3. Connect to the internal device web server with a web browser (**don't** use 'https://...', instead, connect to 'http://192.168.1.7').
4. Change the default device name. Use a unique, meaningful name such as E_Board_Office, or E_Board_Garden.
    - **Note:** Every device **MUST** have a unique name.
5. Set up the MQTT broker address, port number, username, and password.
6. Save the configuration and restart the device.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Supported features

PG LAB Electronics relays, sensors, and switches are supported.

- PG LAB Relays will be added as Home Assistant `switch` entities.
- PG LAB Shutters will be added as Home Assistant `cover` entities.
- PG LAB Sensors will be added as Home Assistant `sensor` entities.
- The integration will also create diagnostic status sensors, with device different information.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
