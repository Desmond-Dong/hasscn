---
title: Bitcoin
description: 'Bitcoin 集成显示关于 Bitcoin(https://bitcoin.org) 网络的各种详细信息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Finance
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_domain: bitcoin
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Bitcoin

**Bitcoin** 集成显示关于 [Bitcoin](https://bitcoin.org) 网络的各种详细信息。

要将 Bitcoin 传感器添加到系统中，请在 `configuration.yaml` 文件中选择要显示的可用选项。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: bitcoin
    display_options:
      - exchangerate
      - trade_volume_btc
```

```yaml
currency:
  description: 要兑换的货币，例如 CHF、USD、EUR 等。
  required: false
  type: string
  default: USD
display_options:
  description: 要在前端显示的选项。
  required: true
  type: list
  keys:
    exchangerate:
      description: 1 BTC 的兑换汇率
    trade_volume_btc:
      description: 交易量
    miners_revenue_usd:
      description: 矿工收入
    btc_mined:
      description: 挖出的 BTC
    trade_volume_usd:
      description: 以美元计的交易量
    difficulty:
      description: 难度
    minutes_between_blocks:
      description: 区块之间的时间（分钟）
    number_of_transactions:
      description: 交易数量
    hash_rate:
      description: 哈希率（PH/s）
    timestamp:
      description: 时间戳
    mined_blocks:
      description: 已挖区块
    blocks_size:
      description: 区块大小
    total_fees_btc:
      description: 以 BTC 计的总费用
    total_btc_sent:
      description: 以 BTC 计的总发送量
    estimated_btc_sent:
      description: 以 BTC 计的估计发送量
    total_btc:
      description: BTC 总量
    total_blocks:
      description: 总区块数
    next_retarget:
      description: 下次难度调整
    estimated_transaction_volume_usd:
      description: 以美元计的估计交易量
    miners_revenue_btc:
      description: 以 BTC 计的矿工收入
    market_price_usd:
      description: 以美元计的市场价格
```
