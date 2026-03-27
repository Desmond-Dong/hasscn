---
title: Mythic Beasts DNS
description: '通过 Mythic Beasts DNS 集成，您可以自动更新 Mythic Beasts(https://www.mythic-beasts.com/) 上的动态 DNS 记录。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Network
ha_release: 0.85
ha_iot_class: Cloud Push
ha_domain: mythicbeastsdns
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Mythic Beasts DNS

通过 **Mythic Beasts DNS** 集成，您可以自动更新 [Mythic Beasts](https://www.mythic-beasts.com/) 上的动态 DNS 记录。

## 配置

要在您的安装中使用此集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mythicbeastsdns:
  host: YOUR_HOST
  domain: YOUR_DOMAIN
  password: YOUR_API_KEY
```

```yaml
  host:
    description: 您希望设为动态更新的第一部分，也就是子域名。
    required: true
    type: string
  domain:
    description: 您的域名，例如 `example.com`。
    required: true
    type: string
  password:
    description: 您域名的密码。您可以在域名页面点击 "DNS API" 进行设置。
    required: true
    type: string
```
