---
title: Monarch Money
description: 'Monarch Money(https://www.monarchmoney.com) is a personal finance aggregation and budgeting service that integrates with Plaid, MX, and FinCity。'

ha_category:
  - Finance
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '2024.10'
ha_codeowners:
  - '@jeeftor'
ha_domain: monarch_money
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---
# Monarch Money

[Monarch Money](https://www.monarchmoney.com) is a personal finance aggregation and budgeting service that integrates with Plaid, MX, and FinCity, the three major financial backends.

## Prerequisites

- You need a Monarch Money account to use this integration.
- You need account credentials. This integration supports both `username` and `password` login, as well as accounts configured with `MFA`.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### Accounts & devices

Each `account` is set up as a device in Home Assistant and contain the following sensors:

|Sensor|Description|
|-------|---------------|
|Balance|Account balance|
|Age| This sensor shows when the data was retrieved by Monarch's back end |
