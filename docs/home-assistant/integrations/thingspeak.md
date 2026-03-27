---
title: ThingSpeak
description: 'ThingSpeak 集成让 Home Assistant 可以与 ThingSpeak API(https://thingspeak.mathworks.com/) 通信。 目前它一次只能记录一个实体，这很适合测试用途。如需长期存储，建议使用 InfluxDB。'
ha_category:
  - History
ha_iot_class: Cloud Push
ha_release: 0.32
ha_domain: thingspeak
ha_integration_type: integration
ha_quality_scale: legacy
---
# ThingSpeak

**ThingSpeak** 集成让 Home Assistant 可以与 [ThingSpeak API](https://thingspeak.mathworks.com/) 通信。
目前它一次只能记录一个实体，这很适合测试用途。如需长期存储，建议使用 [InfluxDB 集成](/home-assistant/integrations/influxdb/)。

## 配置

您需要在 ThingSpeak 上创建一个 [新频道](https://thingspeak.mathworks.com/channels/new)，并从要使用的频道的 "API Keys" 选项卡中获取 Write API Key。

要在您的安装中设置 ThingSpeak 集成，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
thingspeak:
  api_key: MY_API_KEY
  id: 1337
  whitelist: sensor.yr_temperature
```

```yaml
api_key:
  description: 您的 ThingSpeak 频道 Write API 密钥。
  required: true
  type: string
id:
  description: 您要使用的 ThingSpeak 频道 ID。
  required: true
  type: integer
whitelist:
  description: 其状态应发送到该频道的实体名称。
  required: true
  type: string
```
