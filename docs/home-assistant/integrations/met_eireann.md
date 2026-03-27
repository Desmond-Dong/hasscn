---
title: Met Éireann
description: 'Met Éireann 集成使用 Met Éireann(https://met.ie)（爱尔兰气象局）的公共天气预报 API，为指定位置提供当前天气和天气预报数据。此集成与 Met Éireann 没有任何隶属关系，也未获得其认可。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Weather
ha_release: 2021.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@DylanGore'
ha_domain: met_eireann
ha_platforms:
  - weather
ha_integration_type: service
---
# Met Éireann

**Met Éireann** 集成使用 [Met Éireann](https://met.ie)（爱尔兰气象局）的公共天气预报 API，为指定位置提供当前天气和天气预报数据。此集成与 Met Éireann 没有任何隶属关系，也未获得其认可。

:::note
Met Éireann API 仅提供爱尔兰、英国以及法国北部一小部分地区的数据。有关具体覆盖范围，请参阅[此处](https://data.gov.ie/dataset/met-eireann-forecast-api/resource/027da6d5-d819-48d1-9b16-331dba169bd1)提供的 API 说明文档。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 数据许可

Met Éireann 提供的数据采用 Met Éireann 开放数据自定义许可协议授权（类似于 Creative Commons CC BY 4.0 许可）。许可摘要和完整许可文本可在[此处](https://data.gov.ie/dataset/met-eireann-forecast-api/resource/027da6d5-d819-48d1-9b16-331dba169bd1)查看。简而言之，如果您分发、广播或在公共互联网上提供 Met Éireann 数据，您必须注明数据来源为 Met Éireann，并显示其天气预警。

## 数据变更

对从 API 获取的数据所做的唯一修改，是将天气状况描述映射为 Home Assistant 支持的天气条件。
