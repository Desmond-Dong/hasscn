---
title: FinTS
description: '通过 FinTS 集成，您可以从银行获取账户信息。这仅适用于支持 FinTS（也称 HBCI）标准的银行。许多德国银行都使用 FinTS 标准，因此如果您没有德国银行账户，这项集成大概率无法使用。要确认您的银行是否支持 FinTS，请查阅银行官网或联系其客服热线。'
ha_category:
  - Finance
ha_release: '0.70'
ha_iot_class: Cloud Polling
ha_domain: fints
ha_platforms:
  - sensor
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# FinTS

通过 **FinTS** 集成，您可以从银行获取账户信息。这仅适用于支持 FinTS（也称 HBCI）标准的银行。许多德国银行都使用 FinTS 标准，因此如果您没有德国银行账户，这项集成大概率无法使用。要确认您的银行是否支持 FinTS，请查阅银行官网或联系其客服热线。

## 配置

要获取您银行所需的配置信息，请查阅其官网或联系其客服热线。不要使用您在互联网上随意找到的信息。由于您需要将银行账户信息保存在 Home Assistant 配置中，请务必确保这些配置文件不会被他人访问。

您在该银行中的每个账户都会创建一个单独的传感器。如果您在同一家银行有多个账户，可以选择要显示哪些账户，也可以为这些账户指定名称。

要启用 FinTS，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fints
    bank_identification_number: ID_FOR_YOUR_BANK
    username: YOUR_FINTS_USERNAME
    pin: YOUR_PIN
    url: URL_FOR_YOUR_BANK
```

```yaml
name:
  description: 银行名称。
  required: false
  type: string
bank_identification_number:
  description: 银行识别号，多数情况下为 "Bankleitzahl"。
  required: true
  type: string
username:
  description: 您的 FinTS 用户名。
  required: true
  type: string
pin:
  description: 您的 FinTS PIN 或密码。
  required: true
  type: string
url:
  description: 您银行的 FinTS 服务器 URL。
  required: true
  type: string
accounts:
  description: 要显示余额的账户列表。如果未设置，则显示所有账户。
  required: false
  type: list
  keys:
    account:
      description: 余额账户的 IBAN。
      required: true
      type: string
    name:
      description: 使用此字段为账户指定一个有意义的名称。
      required: false
      type: string
holdings:
  description: 您银行中的持仓账户。如果未设置，则显示所有账户。
  required: false
  type: list
  keys:
    account:
      description: 传统账户号码。
      required: true
      type: string
    name:
      description: 使用此字段为账户指定一个有意义的名称。
      required: false
      type: string
```
