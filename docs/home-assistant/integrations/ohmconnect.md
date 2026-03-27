---
title: OhmConnect
description: 'OhmConnect integration 会根据给定的 OhmConnect ID 显示当前的 OhmConnect(https://www.ohmconnect.com/) 状态。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 0.26
ha_codeowners:
  - '@robbiet480'
ha_domain: ohmconnect
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# OhmConnect

**OhmConnect** integration 会根据给定的 OhmConnect ID 显示当前的 [OhmConnect](https://www.ohmconnect.com/) 状态。

OhmConnect 监控电网的实时状况。当肮脏且不可持续的发电厂启动时，我们的用户会收到节能通知。通过那时的节约能源，加利福尼亚州不必打开额外的发电厂，并且加利福尼亚州能源当局会为此付费。

## Configuration

您可以在 [OhmConnect API 设置页面](https://login.ohmconnect.com/api/v2/settings) 上找到您的 OhmConnect ID。它是 URL 中最后一个“/”之后的字符串，例如，对于 URL“https://login.ohmconnect.com/verify-ohm-hour/AbCd1e”，您的 ID 是“AbCd1e”。

要启用 OhmConnect integration，请将以下内容添加到您的 `configuration.yaml` 文件中。
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# `configuration.yaml` 配置示例
sensor:
  - platform: ohmconnect
    id: YOUR_OHMCONNECT_ID
```

```yaml
id:
  description: 您的 OhmConnect ID。
  required: true
  type: string
name:
  description: 传感器上显示的名称。
  required: false
  default: OhmConnect Status
  type: string
```
