---
title: AirNow
description: 关于在 Home Assistant 中集成 AirNow 的说明。
ha_category:
  - Health
ha_release: 2021.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@asymworks'
ha_domain: airnow
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

**AirNow** integration 使用 [AirNow](https://www.airnow.gov/) 网络服务作为您所在位置的空气质量数据来源。

## 设置

要生成 AirNow API 密钥，请访问 [AirNow Developer Tools](https://docs.airnowapi.org/account/request/) 页面。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 故障排除

EPA AirNow API 通常不稳定，有时会针对特定位置不返回任何结果。这将阻止集成添加到 Home Assistant，但这种情况通常是暂时的，稍后会自行解决。

如果集成继续报告"该位置未找到结果"并且无法添加到 Home Assistant，请在提交错误报告之前执行以下操作。

首先，导航到 [AirNow Current Observations By Lat/Lon](https://docs.airnowapi.org/CurrentObservationsByLatLon/query) 页面，输入相同的纬度/经度和站点半径，选择 `application/json` 作为输出格式，选择"Build"然后"Run"。

如果查询返回的结果不是 `[]`，请提交错误报告并包含查询结果（您可以清理数据以删除您的纬度和经度，但请不要删除任何字段）。此信息将大大有助于找出问题的根源。

:::note
AirNow API 每小时允许 500 次数据更新，但由于观测数据仅每小时更新一次，默认更新率设置为每小时 2 次，不应触发速率限制。如果您将此 API 密钥用于其他目的，请确保总请求率不超过每小时 500 次。

:::
