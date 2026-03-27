---
title: Atome Linky
description: 'Atome Linky 集成从 Direct Energy Atome 电表(https://total.direct-energie.com/particuliers/electricite/compteur-linky/atome)获取您家庭的用电消耗数据。'
ha_release: 0.99
ha_category:
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@baqs'
ha_domain: atome
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Atome Linky

**Atome Linky** 集成从 [Direct Energy Atome 电表](https://total.direct-energie.com/particuliers/electricite/compteur-linky/atome)获取您家庭的用电消耗数据。
这个特殊的小设备连接到 Linky 电表，并将实时数据发送到云平台。

由于没有官方的 API 文档，该集成从 Atome 移动应用程序使用的 API 获取数据，[托管在此](https://esoftlink.esoftthings.com/)。

## 配置

要使用它，您需要直接从 "Total Direct Energie" 移动应用程序订购该设备。然后您需要按照安装说明进行操作（在 Atome 应用程序中介绍）。
配置（见下文）需要您在初始化 Atome 设备时创建的 Atome 用户名和密码。

接下来，将 Atome 传感器添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: atome
    username: YOUR_ATOME_USERNAME
    password: YOUR_ATOME_PASSWORD
```

```yaml
username:
  description: Atome 账户用户名。
  required: true
  type: string
password:
  description: Atome 账户密码。
  required: true
  type: string
```