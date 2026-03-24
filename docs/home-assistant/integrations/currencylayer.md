---
title: currencylayer
description: 关于在 Home Assistant 中集成 currencylayer.com 汇率的说明。
ha_category:
  - Finance
ha_iot_class: Cloud Polling
ha_release: 0.32
ha_domain: currencylayer
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Currencylayer** 集成将显示 [Currencylayer](https://currencylayer.com/) 提供的当前汇率，该服务为 [170 种货币](https://currencylayer.com/currencies) 提供实时汇率。免费账户仅限于以美元为基础货币，每月允许 250 次请求，每日更新。

## 设置

从[这里](https://currencylayer.com/product)获取您的 API 密钥。

## 配置

要启用此传感器，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: currencylayer
    api_key: YOUR_API_KEY
    base: USD
    quote:
      - EUR
      - INR
```

```yaml
api_key:
  description: "来自 [Currencylayer](https://currencylayer.com/) 的 API 密钥。"
  required: true
  type: string
quote:
  description: 报价或目标货币的符号。
  required: false
  type: [string, list]
  default: 汇率
base:
  description: 基础货币的符号。
  required: false
  type: string
  default: USD
```
