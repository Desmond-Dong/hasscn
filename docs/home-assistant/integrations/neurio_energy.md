---
title: Neurio energy
description: "有关如何将 Neurio 集成到 Home Assistant 中的说明。"

ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 0.14
ha_domain: neurio_energy
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
将您的 [Neurio](https://neur.io/) 仪表信息集成到 Home Assistant 中。要获取 API 密钥和密码，请登录您的 [Neurio 帐户](https://my.neur.io/#settings/applications/register) 并注册应用程序。请注意，主页 URL 和回调 URL 是可选的。

To enable this integration in your installation, add the following to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# Example configuration.yaml entry
sensor:
  platform: neurio_energy
  api_key: "CLIENT_ID"
  api_secret: "CLIENT_SECRET"
  sensor_id: "SENSOR_ID"
```

将使用以下名称创建四个传感器：

### Consumption

- **能源使用量**：当前的有功功率使用量（以瓦为单位）。每 10 秒更新一次。
- **每日能源使用量**：每日用电量（以千瓦时为单位）。每2.5分钟更新一次。

### Production

- **能源生产**：当前太阳能/发电功率（瓦）。每 10 秒更新一次。
- **每日能源生产**：每日太阳能/发电量（千瓦时）。每2.5分钟更新一次。

生产传感器可用于监控连接到 Neurio 仪表的太阳能电池板或其他能源。

```yaml
api_key:
  description: The API key for your account/application.
  required: true
  type: string
api_secret:
  description: The API secret for your account/application.
  required: true
  type: string
sensor_id:
  description: "The sensor ID, a hex number as shown on the [PWRView webpage](https://mypwrview.generac.com/#settings/sensors), e.g., `0x0000XXXXXXXXXXXX`."
  required: true
  type: string
```
