---
title: SolarEdge Local
description: 'SolarEdge Local 集成使用某些 SolarEdge 逆变器提供的本地 API，让你能够获取 SolarEdge 太阳能系统的详细信息，并将其集成到 Home Assistant 安装中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Energy
  - Sensor
ha_release: 0.95
ha_iot_class: Local Polling
ha_codeowners:
  - '@drobtravels'
  - '@scheric'
ha_domain: solaredge_local
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# SolarEdge Local

**SolarEdge Local** 集成使用某些 SolarEdge 逆变器提供的本地 API，让你能够获取 SolarEdge 太阳能系统的详细信息，并将其集成到 Home Assistant 安装中。

只有特定型号支持本地 API。本地 API 适用于没有 LCD 字符屏幕的逆变器。你也可以查阅数据表：如果在 `Additional Features` 部分的 `Inverter Commissioning` 小节中出现 `With the SetApp mobile application using built-in Wi-Fi access point for local connection` 这一行，则表示支持。这类逆变器的部件编号也会以 `4` 结尾，例如：`SEXXK-XXXXXBXX4` 或 `SEXXXXH-XXXXXBXX4`。

你可以通过查找逆变器的 IP 地址并在浏览器中访问它，来检查本地 API 是否可用。如果支持本地 API，你会看到一个带有 SolarEdge 标志和 `Commissioning` 菜单的 HTML 页面。

:::warning
Recent firmware updates have disabled the local API on many inverters. Please enter the IP address of your inverter in a browser before attempting to use this integration. If the local API is enabled, you'll see a web page with the SolarEdge logo and a "Commissioning" menu. See [this issue](https://github.com/jbuehl/solaredge/issues/124) and [this issue](https://github.com/drobtravels/solaredge-local/issues/24) for additional details.
  
If your inverter does not support the local API, you can use the [cloud based version](/home-assistant/integrations/solaredge/)


:::
## 配置

要在你的安装中使用 SolarEdge 集成，请将以下内容添加到 `configuration.yaml` 中

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: solaredge_local
    ip_address: IP_ADDRESS
```

```yaml
ip_address:
  description: 你的 SolarEdge 逆变器的 IP 地址。
  required: true
  type: string
name:
  description: 允许你在前端中覆盖设备名称。
  required: false
  default: SolarEdge
  type: string
```

### 完整配置示例

完整的配置条目如下所示。

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: solaredge_local
    name: SolarEdge
    ip_address: 192.168.1.123
```
