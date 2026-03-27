---
title: Epion
description: '将 Epion Air 传感器集成到 Home Assistant 中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Environment
  - Sensor
ha_release: '2024.2'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@lhgravendeel'
ha_config_flow: true
ha_domain: epion
ha_platforms:
  - sensor
ha_integration_type: hub
---
# Epion

将 Epion Air 传感器集成到 Home Assistant 中。

[Epion](https://www.epion.nl/) 帮助您了解空气质量，人人皆可轻松使用。

需要已配置的 Epion Air 设备和有权访问此设备的 Epion 账户。

## 前提条件

Epion API 令牌设置。

1. 登录 [Epion](https://www.epion.nl/)。
2. 在左侧菜单中选择 [Integrations](https://epion.nl/dashboard/integrations)。
3. 要创建新令牌（如果您还没看到），请选择 **Generate new Token**。
4. 复制您生成的令牌。该令牌是一组由连字符分隔的字母数字字符。它以"a/"开头。

现在可以使用此 API 令牌激活 Epion 集成。

所有连接的设备将显示二氧化碳（CO2）浓度、温度、相对湿度和大气压力的实体。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::