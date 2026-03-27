---
title: YouLess
description: 'Home Assistant 的 YouLess 集成可让您读取由 YouLess(https://www.youless.nl/home.html) 创建的传感器中的计量值。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2021.8
ha_domain: youless
ha_codeowners:
  - '@gjong'
ha_platforms:
  - sensor
ha_integration_type: device
---
# YouLess

Home Assistant 的 **YouLess** 集成可让您读取由 [YouLess](https://www.youless.nl/home.html) 创建的传感器中的计量值。

此集成已针对以下 YouLess 设备完成测试和验证：

- LS110
- LS120 running PVOutput firmware
- LS120 running Enologic firmware


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

此集成会创建以下传感器：

- 当前用电功率
- 燃气表读数
- 水表读数
- 当前电表读数（包括高峰和低谷）
- 太阳能回送电量读数
