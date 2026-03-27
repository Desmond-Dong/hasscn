---
title: Environment Agency Flood Gauges
description: 'Environment Agency Flood Gauges 集成与 UK Environment Agency Flood Monitoring(https://environment.data.gov.uk/flood-monitoring/doc/reference) API 集成。'
ha_category:
  - Sensor
ha_release: 0.115
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Jc2k'
ha_domain: eafm
ha_platforms:
  - sensor
ha_integration_type: service
---
# Environment Agency Flood Gauges

**Environment Agency Flood Gauges** 集成与 [UK Environment Agency Flood Monitoring](https://environment.data.gov.uk/flood-monitoring/doc/reference) API 集成，为附近的水位提供传感器。结合 Home Assistant 通知，如果附近的河流可能淹没您当地的自行车道或村庄唯一的出路，您可以给自己一个警告。

:::important
英国环境署洪水监测仅为英格兰提供数据 - 北爱尔兰、苏格兰和威尔士有自己的洪水机构。 


:::
## 配置

Home Assistant 通过 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) > **Environment Agency Flood Gauges** 提供洪水监测集成。

系统将提示您选择一个监测站。您可以在洪水信息服务[网站](https://check-for-flooding.service.gov.uk/river-and-sea-levels)上找到附近监测站的名称。如果有多个同名的站点，您可以使用 ID 筛选到正确的站点。ID 可以在洪水信息服务 URL 的末尾找到，例如对于"Westminster"（`https://check-for-flooding.service.gov.uk/station/7389`），ID 将是 `7389`。

然后，该监测站的传感器应该会出现在您的 Home Assistant 实例中。