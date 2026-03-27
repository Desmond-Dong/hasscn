---
title: Dexcom
description: 'Dexcom 集成允许您在 Home Assistant 中查看来自 Dexcom(https://www.dexcom.com/) 的 CGM 数据。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_release: 0.113
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gagebenne'
ha_domain: dexcom
ha_platforms:
  - sensor
ha_integration_type: service
---
# Dexcom

**Dexcom** 集成允许您在 Home Assistant 中查看来自 [Dexcom](https://www.dexcom.com/) 的 CGM 数据。

## 前提条件

您需要在 Dexcom [G6](https://provider.dexcom.com/education-research/cgm-education-use/videos/setting-dexcom-share-and-follow) 或 [G7](https://www.dexcom.com/faqs/how-do-i-share-my-dexcom-g7-glucose-data-with-followers) 应用程序中设置 Dexcom Share 功能才能使用此集成。启用 Dexcom Share 服务需要至少设置一个关注者。集成将使用 Dexcom 用户的凭据，而不是关注者的凭据。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Username:
    description: "用户名、电子邮件地址或电话号码。电话号码格式为 `+` 加上国家代码，然后是电话号码。"
Region:
    description: "Dexcom Share API 端点，可选 US（美国）、Outside of US（美国以外）或 Japan（日本）。"
```

## 故障排除

通过登录您所在区域的 Dexcom 账户管理网站来验证您的 Dexcom 账户凭据：

美国用户：[uam1.dexcom.com](uam1.dexcom.com)。
美国以外用户：[uam2.dexcom.com](uam2.dexcom.com)。
日本用户：[uam.dexcom.jp](uam.dexcom.jp)。

## 传感器

如果您有一个传感器会话正在运行，并且您已启用 Dexcom 集成，您应该能看到以下传感器：

- 血糖值传感器
- 血糖趋势传感器

## 示例自动化

```yaml
- alias: "Overnight low kitchen lights"
  description: "如果我的血糖在夜间降低，打开厨房的灯光"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.dexcom_YOUR_USERNAME_glucose_value
      below: 65
  conditions:
    - condition: time
      after: "22:00:00"
      before: "06:00:00"
  actions:
    - action: light.turn_on
        target:
          entity_id: light.kitchen
```