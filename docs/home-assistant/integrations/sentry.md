---
title: Sentry
description: 将错误记录到 Sentry。
ha_category:
  - System monitor
ha_iot_class: Cloud Polling
ha_release: 0.104
ha_config_flow: true
ha_codeowners:
  - '@dcramer'
  - '@frenck'
ha_domain: sentry
ha_integration_type: service
---

:::important
Sentry 免费账户每月允许 5000 个事件。根据发送到 Sentry 的事件数量，您可能需要升级 Sentry 账户，否则会出现一段时间 Home Assistant 无法继续向 Sentry 发送数据。

:::
Home Assistant 中的 **Sentry** 集成可与 [Sentry](https://sentry.io/) 对接，用于捕获 Home Assistant 中记录的错误以及未处理的异常。

## 准备工作

在配置 Sentry 集成之前，您需要准备好 Sentry 账户和 DSN。

按照以下步骤获取 DSN：

1. 前往 **Projects**。
2. 选择 **Create project**。
3. 填写 **Give your project a name** 和 **Assign a Team** 字段，然后选择 **Create project**。
4. 选择页面顶部的 **Get your DSN** 链接。
   - 此时您就能看到 DSN，格式类似于 <https://sdasdasdasdsadsadas@sentry.io/sdsdfsdf>。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 选项

Sentry 集成提供以下设置：

- 为您的实例设置环境名称。
- 限制触发事件上报的日志级别，以及面包屑记录的日志级别。
- 是否发送已被处理的错误事件。
- 是否发送由自定义集成引发的事件。
- 是否发送来源于第三方 Python 包的事件。
- 启用性能追踪并调整所使用的追踪采样率。

要更改这些设置，请前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，选择 **Sentry** 集成，然后选择 **Options**。

更改 Sentry 设置后，您需要重启 Home Assistant 才能使其生效。
