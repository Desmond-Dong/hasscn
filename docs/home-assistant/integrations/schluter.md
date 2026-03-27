---
title: Schluter
description: 'Schluter 集成允许您在 Home Assistant 中接入 Schluter-DITRA-HEAT-E-WiFi(https://www.schluter.com/schluter-us/enUS/ditra-heat-wifi) 电地暖恒温器。'
ha_category:
  - Climate
ha_release: 0.108
ha_iot_class: Cloud Polling
ha_domain: schluter
ha_codeowners:
  - '@prairieapps'
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Schluter

**Schluter** 集成允许您在 Home Assistant 中接入 [Schluter-DITRA-HEAT-E-WiFi](https://www.schluter.com/schluter-us/en_US/ditra-heat-wifi) 电地暖恒温器。

:::important
您需要创建 Schluter DITRA-HEAT 账户并将恒温器注册到该账户。此操作可通过恒温器触摸屏完成，系统会向您发送一封电子邮件以确认账户。

:::
## 配置

要使用此模块，您需要准备 Schluter 的登录信息（电子邮件和密码）。

要进行设置，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
schluter:
  username: YOUR_SCHLUTER_EMAIL
  password: YOUR_SCHLUTER_PASSWORD
```

```yaml
username:
  description: 用于访问 Schluter 账户的电子邮件地址。
  required: true
  type: string
password:
  description: 用于访问 Schluter 账户的密码。
  required: true
  type: string
```

Home Assistant 启动后，您将可以访问与该账户关联的所有恒温器。

### 支持的功能

当前此集成支持以下功能：

- 获取当前温度和目标温度
- 设置目标温度

当通过 Home Assistant 调整温度时，恒温器会进入“永久模式”，即忽略恒温器内部已编程的计划。您可以按下恒温器上的 “Return to Schedule” 按钮，恢复到计划模式。
