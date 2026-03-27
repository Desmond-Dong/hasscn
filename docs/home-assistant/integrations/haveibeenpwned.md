---
title: HaveIBeenPwned
description: 'HaveIBeenPwned 集成会创建传感器，用于检查 haveibeenpwned(https://haveibeenpwned.com) 上是否存在已泄露的邮箱账户。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Sensor
ha_release: 0.31
ha_iot_class: Cloud Polling
ha_domain: haveibeenpwned
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# HaveIBeenPwned

**HaveIBeenPwned** 集成会创建传感器，用于检查 [haveibeenpwned](https://haveibeenpwned.com) 上是否存在已泄露的邮箱账户。

## 配置

要使用此集成，您需要购买一个 API 密钥。请访问 HIBP 网站上的 [API key page](https://haveibeenpwned.com/API/Key) 进行购买。

## 配置

若要启用此传感器，请将以下内容添加到您的 `configuration.yaml` 文件中。它会将每个指定的邮箱地址显示为一个传感器，并展示该邮箱账户的泄露次数。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: haveibeenpwned
    email:
      - your_email1@domain.com
      - your_email2@domain.com
    api_key: API_KEY
```

```yaml
email:
  description: 邮箱地址列表。
  required: true
  type: list
api_key:
  description: HaveIBeenPwned API 密钥
  required: true
  type: string
```

## 泄露元数据

如果您的某个邮箱账户发生泄露，传感器将显示泄露元数据。它会列出该邮箱发生泄露的网站名称以及该泄露数据被添加的日期。这些数据会按降序显示，因此状态属性 `breach 1` 始终会包含该邮箱账户最近一次已知泄露的信息（如果检测到了泄露）。

<p class='img'>
  <img src='/home-assistant/images/integrations/haveibeenpwned/sensor.png' />
</p>

:::note
Home Assistant 启动时，传感器会扫描所有指定的邮箱地址，并在每次泄露数据请求之间间隔 5 秒。
完成首次启动扫描后，为防止滥用、避免频繁请求 “Have I been Pwned” 服务，传感器之后每 15 分钟只会扫描一个邮箱账户，因为这些泄露数据几乎不会变化。
:::
