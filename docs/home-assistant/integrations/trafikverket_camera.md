---
title: Trafikverket Camera
description: 'Retrieve camera feed from Trafikverket(https://www.trafikverket.se/). 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Camera
  - Sensor
ha_release: 2023.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: trafikverket_camera
ha_platforms:
  - binary_sensor
  - camera
  - sensor
ha_integration_type: service
---
# Trafikverket Camera

Retrieve camera feed from [Trafikverket](https://www.trafikverket.se/).

The input provided will be used to search for both the name and the location of the camera. See examples and look for your camera [here](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=0%2F650778%2F7200000%2F&Layers=TrafficCameras%2B=).

When more than one camera has the same name, use the more precise location in your search. Example: If searching for ["Hisingsleden"](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=12%2F312855%2F6401262.65%2F&Layers=TrafficCameras%2B=), then use the more detailed location in your search, for example "Hisingsleden norrut".

## Prerequisites

Please click [here](https://api.trafikinfo.trafikverket.se/) and register to obtain the API key.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Binary sensor

- Active

## Sensors

- Active
- Direction (degree of angle the camera is pointing towards)
- Modified (date and time when the record last changed)
- Photo time
- Photo URL
- Status
- Camera type

## Additional attributes available on camera

- Location (placement of camera)
- Description (free text description)
- Type (Type of camera)
