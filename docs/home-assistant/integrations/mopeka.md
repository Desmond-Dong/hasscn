---
title: Mopeka
description: 'Integrates Mopeka(https://www.mopekaiot.com/) devices into Home Assistant. 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2023.2
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: mopeka
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---
# Mopeka

Integrates [Mopeka](https://www.mopekaiot.com/) devices into Home Assistant.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

The Mopeka integration will automatically discover devices once the [Bluetooth](/home-assistant/integrations/bluetooth) integration is enabled and functional.

When setting up or changing options for a device, a medium, the substance the sensor measures, such as propane, can be chosen. The sensor needs to use the type of medium to adjust the coefficients used in the ultrasonic sensor calculations.

## Supported Mediums

- Propane (default)
- Air (for unpressurized top-down sensors like water tanks)
- Fresh Water (for bottom-up sensors)
- Waste Water
- Live Well
- Black Water
- Raw Water
- Gasoline
- Diesel
- LNG
- Oil
- Hydraulic Oil

## Supported devices

- [Pro Plus](https://www.mopekaiot.com/product/mopeka-pro-plus-sensor) (M1015)
- [Pro Check](https://www.mopekaiot.com/product/mopeka-pro-check-sensor-aluminum-lpg-cylinders-w-collar) (M1017)
- Pro-200
- [Pro H2O](https://www.mopekaiot.com/product/mopeka-pro-check-water-sensor-bottom-mount-w-collar)
- [Lippert BottleCheck](https://store.lci1.com/lippert-propane-tank-sensor-2021130655)
- [TD40](https://www.mopekaiot.com/product/mopeka-td40)
- TD200
- [Pro Check Universal](https://www.mopekaiot.com/procheckuniversal)
