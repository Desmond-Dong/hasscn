---
title: laundrify
description: '使用 laundrify(https://laundrify.de/) WiFi 电源插头，在 Home Assistant 中监控洗衣机或烘干机的状态。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
ha_release: 2022.6
ha_iot_class: Cloud Polling
ha_domain: laundrify
ha_platforms:
  - binary_sensor
  - sensor
ha_codeowners:
  - '@xLarry'
ha_config_flow: true
ha_integration_type: hub
---
# laundrify

使用 [laundrify](https://laundrify.de/) WiFi 电源插头，在 Home Assistant 中监控洗衣机或烘干机的状态。

此集成当前支持以下平台/实体：

- Binary sensor
  - 洗涤周期（_running_/_not running_）
- Sensor
  - 功率（最近一次测量值，单位为 _W_）
  - 能耗（总耗电量，单位为 _kWh_）

## 生成 Auth Code

*请注意，启用 Home Assistant 集成需要 laundrify App v1.12.0。*

此集成需要使用 Auth Code 完成账户关联。打开 laundrify App，轻点 `Home Assistant -> Integration aktivieren` 以生成您的代码。

<p class='img'>
  <img src='/home-assistant/images/integrations/laundrify/generate-code.png' alt='Screenshot: generate an Auth Code in the laundrify App'>
</p>

代码会在激活后 60 分钟内过期，请及时完成集成配置。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Code:
  description: "可在 laundrify App 中获取的 Auth Code（见上文），例如 `123-456`。"
```
