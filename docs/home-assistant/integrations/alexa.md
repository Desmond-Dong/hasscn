---
title: Amazon Alexa
description: '使用 Home Assistant Cloud(/home-assistant/cloud/)，您只需简单点击几下即可将 Home Assistant 实例连接到 Amazon Alexa。使用 Home Assistant Cloud，您无需处理动态 DNS、SSL 证书或在路由器上打开端口。'
ha_category:
  - Voice
ha_iot_class: Cloud Push
featured: true
ha_release: '0.10'
ha_codeowners:
  - '@home-assistant/cloud'
  - '@ochlocracy'
  - '@jbouwh'
ha_domain: alexa
ha_integration_type: system
ha_platforms:
  - diagnostics
---
# Amazon Alexa

## 通过 Home Assistant Cloud 自动设置

使用 [Home Assistant Cloud](/home-assistant/cloud/)，您只需简单点击几下即可将 Home Assistant 实例连接到 Amazon Alexa。使用 Home Assistant Cloud，您无需处理动态 DNS、SSL 证书或在路由器上打开端口。只需通过用户界面登录，即可建立与云端的安全连接。Home Assistant Cloud 在 30 天免费试用后需要付费订阅。

对于 Home Assistant Cloud 用户，文档可以在[这里](https://www.nabucasa.com/config/amazon_alexa/)找到。

## 手动设置

有几种方法可以将 Amazon Alexa 和 Home Assistant 结合使用。

- [创建 Alexa 智能家居技能来控制灯光等](/home-assistant/integrations/alexa.smart_home/)
  - 支持无需技能名称的语音指令，例如"Alexa，把灯关掉。"
  - 支持通过 Alexa 例程控制设备。
  - 支持使用 Alexa 移动应用程序查看和控制设备。
- [创建自定义 Alexa 技能来构建自定义命令](/home-assistant/integrations/alexa.intent/)
- [创建新的简报来源](/home-assistant/integrations/alexa.flash_briefings/)
- 替代方案：使用 [模拟 Hue 集成](/home-assistant/integrations/emulated_hue) 欺骗 Alexa，使其认为 Home Assistant 是一个 Philips Hue 网关。

### 要求

与 Amazon Alexa 的集成手动设置有几个要求：

- Amazon 开发者账户。您可以[在这里][amazon-dev-console]注册。
- 构建自定义命令和简报需要您的 Home Assistant 实例可以从互联网访问，并使用端口 443 上的 HTTPS。
- 如果您想使用智能家居技能 API，则需要一个 [AWS 账户](https://aws.amazon.com/free/)。您的智能家居技能的一部分将托管在 [AWS Lambda](https://aws.amazon.com/lambda/pricing/) 上。但是，您无需担心费用；AWS Lambda 每月最多可免费处理 100 万次请求和 1GB 出站数据传输。
- 智能家居 API 还需要您的 Home Assistant 实例可以从互联网访问。

[amazon-dev-console]: https://developer.amazon.com
[emulated-hue-integration]: /integrations/emulated_hue/