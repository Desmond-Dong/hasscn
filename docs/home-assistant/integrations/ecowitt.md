---
title: Ecowitt
description: 关于在 Home Assistant 中集成 Ecowitt 气象站的说明。
ha_category:
  - Binary sensor
  - Sensor
  - Weather
ha_release: 2022.9
ha_iot_class: Local Push
ha_domain: ecowitt
ha_config_flow: true
ha_codeowners:
  - '@pvizeli'
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: device
---

**Ecowitt** 集成允许您将 [Ecowitt](https://www.ecowitt.com/) 设备集成到 Home Assistant 中。

## 支持的设备

以下设备已报告可与 **Ecowitt** 集成一起使用：

### 网关/集线器

- GW1200 Wi-Fi 网关
- GW2000 以太网和 Wi-Fi 网关
- GW3000 带数据存储的以太网和 Wi-Fi 网关

### 传感器

- WH51 无线土壤湿度传感器
- WH40 无线自动排空雨量计传感器
- WH57 户外无线闪电检测传感器
- WS90 无线七合一气象传感器

## 前提条件

- 您的气象站已设置并连接传感器，功能正常。

- 您的网关已通过 Wi-Fi 或以太网连接到本地网络。您可以使用以下方法之一配置网络连接：

  - **Ecowitt 移动应用程序**（需要创建 Ecowitt 账户）

  - **嵌入式 Web 界面**，通过连接到设备的 Wi-Fi 热点并在浏览器中打开 `192.168.4.1`（无需账户）
- 您的 Home Assistant 实例可通过 HTTP 访问。Ecowitt 设备不支持 HTTPS 连接。如果您的实例仅接受 HTTPS，请参阅 [TLS/SSL 限制](#tlsssl-limitations)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Ecowitt 气象站配置

**Ecowitt** 集成的工作原理是首先在您的 Home Assistant 实例上创建一个回调端点，然后将此配置添加到 Ecowitt 控制台，以便它开始发送数据。

集成将显示服务器 IP/主机名、路径和端口。您可以通过以下两种方式之一将其输入到 Ecowitt 配置中：

**选项 1**：使用 Ecowitt 应用程序（在手机上）：

1. 在左上角，选择菜单图标（`[mdi:menu]`）并选择 **设备**。
   - 在 **我的设备** 下，选择您的 Ecowitt 站。
2. 在右上角，选择省略号图标（`[mdi:dots-horizontal]`）。
   - 从列表中选择 **其他**。
   - 选择 **DIY 上传服务器** 按钮，从 **支持的服务器列表** 中选择 **自定义**。
   - 从 **协议类型同** 列表中选择 **Ecowitt**。
   - 输入集成中的服务器 IP/主机名、路径和端口。
     - 路径必须匹配！从路径中删除第一个正斜杠，因为应用程序会添加一个。
3. 保存您的设置。

**选项 2**：在浏览器中导航到站点 IP 地址的 Ecowitt Web UI：

1. 选择 **天气服务**，然后向下滚动到 **自定义** 部分。
2. 在 **自定义** 下，选择 🔘 启用和 **协议类型同** 🔘 Ecowitt。
3. 输入集成中的服务器 IP/主机名、路径和端口。
4. 保存您的设置。

## 支持的功能

**Ecowitt** 集成提供以下实体。可用实体取决于连接到气象站的传感器。

### 二值传感器

- **电池状态**：指示无线传感器的低电量状态。
- **漏水传感器**：使用兼容的漏水检测传感器检测漏水。
- **下雨状态**：指示当前是否正在下雨。

### 传感器

#### 空气质量

- **CO2**：二氧化碳浓度（ppm）。
- **PM1**：超细颗粒物 1.0 浓度（µg/m³）。
- **PM2.5**：细颗粒物 2.5 浓度（µg/m³）。
- **PM4**：颗粒物 4.0 浓度（µg/m³）。
- **PM10**：粗颗粒物 10 浓度（µg/m³）。

#### 闪电检测

- **闪电计数**：检测到的闪电总数。
- **闪电距离**：到最后一次检测到的闪电的距离（km 或 mi）。

#### 电源和诊断

- **电池电量**：无线传感器的电池百分比。
- **电池电压**：连接传感器的电池电压（V）。
- **信号强度**：无线传感器的信号质量指示器，以百分比表示。

#### 降水量

- **降雨速率**：当前降雨强度（mm/h 或 in/h）。
- **降雨量**：总降雨累积量（mm 或 in）。
- **日降雨量**：当天的降雨量（mm 或 in）。
- **周降雨量**：本周的降雨量（mm 或 in）。
- **月降雨量**：本月的降雨量（mm 或 in）。
- **年降雨量**：今年的降雨量（mm 或 in）。

#### 土壤

- **土壤湿度**：连接的土壤湿度传感器的土壤湿度百分比。
- **土壤温度**：土壤温度传感器的温度读数（°C 或 °F）。

#### 太阳能和紫外线

- **光照强度**：照度测量（lx）。勒克斯测量落在表面上的光量。
- **太阳辐射**：太阳辐照度（W/m²）。
- **紫外线指数**：当前紫外线指数值。紫外线指数是来自太阳的紫外线辐射强度的标准化测量。
  - 值范围从 0-2（低风险）、3-5（中等）、6-7（高）、8-10（很高）到 11+（极高）。

#### 天气

- **大气压力**：大气压（hPa 或 inHg）。
- **露点**：计算出的露点温度（°C 或 °F）。
- **湿度**：室内和室外湿度百分比。
- **温度**：室内和室外温度测量（°C 或 °F）。

#### 风

- **风向**：风向（度）。
- **阵风**：最大阵风速度（km/h 或 mph）。
- **风速**：当前风速（km/h 或 mph）。

## TLS/SSL 限制

Ecowitt 设备不支持 TLS/SSL 连接（HTTPS）。如果您的 Home Assistant 实例配置为仅使用 HTTPS，Ecowitt 集成将无法正常工作。您必须确保您的 Home Assistant 实例可通过 HTTP（非安全）访问，以便 Ecowitt 设备成功发送数据。

如果您为 Home Assistant 实例使用 SSL/TLS，则需要配置您的设置以同时接受安全（HTTPS）和非安全（HTTP）连接。这通常可以通过调整反向代理配置或使用可以同时处理 HTTP 和 HTTPS 流量的 Home Assistant NGINX 应用程序来完成。

## 移除集成

此集成遵循标准的集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.