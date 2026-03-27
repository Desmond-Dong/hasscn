---
title: Alpha Vantage
description: 'Alpha Vantage 集成使用 Alpha Vantage(https://www.alphavantage.co) 来监控股票市场。该平台还提供汇率详情。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Finance
ha_iot_class: Cloud Polling
ha_release: '0.60'
ha_domain: alpha_vantage
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Alpha Vantage

**Alpha Vantage** 集成使用 [Alpha Vantage](https://www.alphavantage.co) 来监控股票市场。该平台还提供汇率详情。

要启用 `alpha_vantage` 平台，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: alpha_vantage
    api_key: YOUR_API_KEY
    symbols:
      - symbol: GOOGL
        name: Google
    foreign_exchange:
      - name: USD_EUR
        from: USD
        to: EUR
```

必须配置股票代码或汇率，否则您将无法获取任何数据。

```yaml
api_key:
  description: "来自 [Alpha Vantage](https://www.alphavantage.co) 的 API 密钥。"
  required: true
  type: string
symbols:
  description: 给定公司的股票市场代码列表。
  required: false
  type: map
  keys:
    name:
      description: 用于前端的传感器名称。
      required: false
      type: string
    currency:
      description: 用于前端的传感器名称。
      required: false
      type: string
      default: USD
    symbol:
      description: 给定公司的股票市场代码。
      required: true
      type: string
foreign_exchange:
  description: 货币列表。
  type: map
  required: false
  keys:
    name:
      description: 用于前端的传感器名称。
      required: false
      type: string
    from:
      description: 源货币。
      required: true
      type: string
    to:
      description: 目标货币。
      required: true
      type: string
```

## API 信息

Alpha Vantage 提供两个级别的 API 密钥，一个是免费的，一个是付费的。如果您使用免费版本，每天将被限制为 25 次查询。传感器每 5 分钟轮询一次，因此您每天只能获取前两个小时的数据。可以使用 `scan_interval` 变量进行配置。要查找必要的股票代码，您可以使用 API 的搜索功能。例如，尝试 [这个 SYMBOL_SEARCH 查询](https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=<your-api-key>&keywords=IBM)。

付费版本从每分钟 75 次查询开始，大大增加了股票代码数量。

## 示例

在本节中，您可以找到一些如何使用此传感器的实际示例。

### Google 和比特币汇率

```yaml
sensor:
  - platform: alpha_vantage
    api_key: YOUR_API_KEY
    symbols:
      - name: Google
        currency: USD
        symbol: GOOGL
    foreign_exchange:
      - from: BTC
        to: USD
        name: Bitcoin
```
