---
title: JustNimbus
description: 关于如何在 Home Assistant 中配置 JustNimbus 集成的说明
ha_category:
  - Environment
ha_release: 2022.9
ha_iot_class: Cloud Polling
ha_domain: justnimbus
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
ha_codeowners:
  - '@kvanzuijlen'
---

**JustNimbus** 集成会查询 JustNimbus 网页仪表板使用的 JustNimbus API。
此集成允许您收集并保存数据，以查看储水袋使用情况的历史概览。

## 先决条件

要配置并使用此集成，您需要拥有一个 [JustNimbus 储水袋](https://justnimbus.com/regenwatersysteem/)（荷兰语），并订阅网页仪表板功能。配置时，您需要从 URL 中获取客户端 ID 和邮政编码。例如：`https://dashboard.justnimbus.com/user/view.php?system=<client_id>&zip=<zip_code>`。如需更多帮助，请参阅 [JustNimbus 帮助页面](https://dashboard.justnimbus.com/user/view.php)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器类型

配置完成后，此集成会为每个已配置的客户端 ID 创建七个传感器：

- 泵压，单位为 `bar`
- 泵类型，`text`
- 储水箱温度，单位为 `°C`
- 储水箱水量，单位为 `L`（升）
- 储水箱容量，单位为 `L`（升）
- 节省的用水量，单位为 `L`（升）
- 已使用的水量，单位为 `L`（升）
