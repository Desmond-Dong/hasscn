---
title: AirVisual Cloud
description: 关于在 Home Assistant 中使用 AirVisual 数据的说明
ha_category:
  - Health
ha_release: 0.53
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bachya'
ha_domain: airvisual
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

**AirVisual Cloud** 集成会查询 [AirVisual](https://www.iqair.com) 云 API 以获取空气质量数据。可以通过纬度/经度或城市/州或省/国家来收集数据。

## 使用 AirVisual Cloud API

您可以在[这里](https://dashboard.iqair.com/personal/api-keys)获取 AirVisual API 密钥。请注意，此平台是基于 “Community” 套餐设计的；“Startup” 和 “Enterprise” 套餐的密钥通常也能继续使用，但实际结果可能会有所不同，甚至可能完全无法使用。

Community API 密钥有效期为 12 个月，到期后会失效。届时，您需要回到 AirVisual 网站，删除旧密钥，按相同步骤创建新密钥，并使用新密钥更新配置。

:::note
“Community” API 密钥每月最多可调用 10,000 次。为了支持在多个地理位置共用同一个 API 密钥，`airvisual` 集成会自动重新调整 API 调用间隔，以避免超出调用上限。

例如：

- 一个集成实例：每 5 分钟调用一次 API
- 两个集成实例：每 10 分钟调用一次 API
- 依此类推


:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 确定城市/州或省/国家

除了使用经纬度外，AirVisual 集成还可以配置为使用城市/州或省/国家的组合。要快速确定某个位置对应的正确值，请使用 [AirVisual 区域目录](https://www.iqair.com/world-air-quality)。找到目标城市后，请记下页面上的面包屑标题，其格式为 `country > state/region > city`。

例如，巴西圣保罗的面包屑标题显示为 `Brazil > Sao Paulo > Sao Paulo`。因此，在 UI 中应使用以下值：

- City：`Sao Paulo`
- State：`Sao Paulo`
- Country：`Brazil`

## 传感器类型

配置完成后，平台会为每种空气质量标准创建三个传感器：

### 空气质量指数

- **描述：** 此传感器显示数值形式的空气质量指数（AQI），用于衡量空气整体“健康状况”。
- **示例传感器名称：** `sensor.chinese_air_quality_index`
- **示例传感器值：** `32`
- **说明：**

AQI | Status | Description
------- | :----------------: | ----------
0 - 50  | **Good** | 空气质量令人满意，空气污染几乎不构成风险
51 - 100  | **Moderate** | 空气质量可以接受；但对极少数对空气污染异常敏感的人来说，某些污染物可能带来中等程度的健康影响
101 - 150 | **Unhealthy for Sensitive Groups** | 敏感人群可能会受到健康影响。普通公众通常不会受到影响
151 - 200 | **Unhealthy** | 所有人都可能开始受到健康影响；敏感人群可能会出现更严重的健康影响
201 - 300 | **Very unhealthy** | 表示紧急状况的健康警告。整个人群更可能受到影响
301+ | **Hazardous** | 健康警报：所有人都可能受到更严重的健康影响

### 空气污染等级

- **描述：** 此传感器显示当前 AQI 对应的 `Status`（见上表）。
- **示例传感器名称：** `sensor.us_air_pollution_level`
- **示例传感器值：** `Moderate`

### 主要污染物

- **描述：** 此传感器显示当前数值最高的污染物。
- **示例传感器名称：** `sensor.us_main_pollutant`
- **示例传感器值：** `PM2.5`
- **说明：**

Pollutant | Symbol | More Info
------- | :----------------: | ----------
颗粒物（<= 2.5 微米） | PM2.5 | [EPA: Particulate Matter (PM) Pollution](https://www.epa.gov/pm-pollution)
颗粒物（<= 10 微米） | PM10 | [EPA: Particulate Matter (PM) Pollution](https://www.epa.gov/pm-pollution)
臭氧 | O | [EPA: Ozone Pollution](https://www.epa.gov/ozone-pollution)
二氧化硫 | SO2 | [EPA: Sulfur Dioxide (SO2) Pollution](https://www.epa.gov/so2-pollution)
一氧化碳 | CO | [EPA: Carbon Monoxide (CO) Pollution in Outdoor Air](https://www.epa.gov/co-pollution)
