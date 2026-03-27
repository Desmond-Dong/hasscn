---
title: Configurator
description: 'Configurator。本页属于 Home Assistant 中文文档，适合查阅安装部署、集成配置、自动化、仪表盘与日常使用说明。'
ha_category:
  - Other
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: configurator
ha_integration_type: system
---
# Configurator

:::caution
此集成面向开发者。

:::
**Configurator** 集成允许集成向用户请求信息。目前它作为最小可行产品实现：

- 支持向用户显示文本、图像和按钮。
- 输入字段可以定义描述和可选类型。
- 当按钮被按下时将触发回调。

[演示](https://demo.home-assistant.io/) 中的 Hue 集成和 Plex 是使用配置器实现的。有关简单示例，请参阅 [演示集成的源代码](https://github.com/home-assistant/home-assistant/tree/dev/homeassistant/components/demo)。

有关如何使用配置器集成的更多详细信息，请参阅 [源代码](https://github.com/home-assistant/home-assistant/tree/dev/homeassistant/components/configurator)。
