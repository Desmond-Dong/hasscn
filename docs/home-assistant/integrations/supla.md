---
title: SUPLA
description: 'SUPLA 集成允许您在 Home Assistant 中使用 SUPLA(https://supla.org/) 设备。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 0.92
ha_category:
  - Cover
  - Hub
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@mwegrzynek'
ha_domain: supla
ha_platforms:
  - cover
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---
# SUPLA

**SUPLA** 集成允许您在 Home Assistant 中使用 [SUPLA](https://supla.org/) 设备。

SUPLA-DEV 是一个适用于 Raspberry Pi、Arduino 或基于 ESP8266 设备的开源家庭自动化系统。它拥有自己的协议、固件以及商用设备，例如 [Zamel](https://supla.zamel.com/en/) 生产的产品。

目前仅支持 cover（在 SUPLA 中称为 shutters）、大门、车库门和开关，但由于其 REST API 完整且通用，扩展更多设备相对容易。

目前无法手动添加设备，所有设备都将从 SUPLA-CLOUD 的服务器或您自己的服务器中发现。

如果您想获得基于 MQTT 自动发现的更完整 Home Assistant 支持，可考虑通过设置界面将 Supla 设备切换到 MQTT，或使用 [Supla Cloud](https://cloud.supla.org/integrations/mqtt-broker) 提供的 MQTT broker。

:::important
Supla Cloud MQTT broker 需要将[默认 MQTT 协议设置](https://www.home-assistant.io/integrations/mqtt/#broker-configuration)更改为 3.1 版本。


:::
## 配置

要在您的安装中使用 SUPLA 设备，请将以下内容添加到您的 "`configuration.yaml`" 中：

```yaml
supla:
  servers:
    - server: "svr1.supla.org"
      access_token: "YOUR_ACCESS_TOKEN"
```

```yaml
servers:
  description: 服务器配置列表。
  requires: true
  type: list
  keys:
    server:
      description: SUPLA-CLOUD 服务器地址（IP 地址或 DNS 名称）；可以是[官方云托管](https://cloud.supla.org)实例，也可以是[自托管](https://github.com/SUPLA/supla-cloud)实例。
      required: true
      type: string
    access_token:
      description: 用于 REST API 配置的访问令牌。在 **Scopes** > **Channels** 下，至少需要启用 **Read** 和 **Action execution** 权限。令牌可在 SUPLA-CLOUD 的安全设置中 [Personal Access Token](https://cloud.supla.org/security/personal-access-tokens) 页面获取，也可以从您自己的自托管实例中获取。
      required: true
      type: string
```
