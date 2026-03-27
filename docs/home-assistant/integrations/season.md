---
title: Season
description: 'Season 集成会以传感器的形式提供当前的天文季节或气象季节（春、夏、秋、冬）。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.53
ha_quality_scale: internal
ha_domain: season
ha_config_flow: true
ha_platforms:
  - sensor
ha_codeowners:
  - '@frenck'
ha_integration_type: service
---
# Season

**Season** 集成会以传感器的形式提供当前的天文季节或气象季节（春、夏、秋、冬）。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
```yaml
季节定义类型:
    description: "选择季节的划分方式：按天文日期，或按气象月份。"
```

有关天文季节与气象季节区别的信息，请参阅以下链接：

- [https://www.ncei.noaa.gov/news/meteorological-versus-astronomical-seasons](https://www.ncei.noaa.gov/news/meteorological-versus-astronomical-seasons)

关于季节划分方式的资料均摘自 Wikipedia：

- [https://en.wikipedia.org/wiki/Season#Astronomical](https://en.wikipedia.org/wiki/Season#Astronomical)
- [https://en.wikipedia.org/wiki/Equinox](https://en.wikipedia.org/wiki/Equinox)
- [https://en.wikipedia.org/wiki/Solstice](https://en.wikipedia.org/wiki/Solstice)

简而言之，天文季节依据一年中白昼最长/最短的日期以及春分、秋分来划分，因此在北半球春季通常从 3 月 20 日开始。气象季节则按月份划分，因此在北半球春季从 3 月 1 日开始。
