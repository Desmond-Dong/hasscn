---
title: Blockchain.com
description: 关于如何在 Home Assistant 中集成 Blockchain.com 数据的说明。
ha_category:
  - Finance
ha_release: 0.47
ha_iot_class: Cloud Polling
ha_domain: blockchain
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Blockchain.com** 集成显示来自 [blockchain.com](https://blockchain.com) 的 Bitcoin 钱包余额。

要将 Blockchain 传感器添加到您的系统中，请在 "`configuration.yaml`" 文件中指定要监控的比特币地址列表。
:::tip
更改配置后需要重启 Home Assistant。
:::。传感器状态将是列出的所有地址余额的总和。

目前，支持原始 Bitcoin 地址格式。
例如，较新的 Segwit 和 Taproot 格式不受支持。

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: blockchain
    addresses:
      - '1BMsHFczb2vY1BMDvFGWgGU8mkWVm5fupp'
      - '183J5pXWqYYsxZ7inTVw9tEpejDXyMFroe'
```

```yaml
addresses:
  description: 要监控的比特币钱包地址列表。
  required: true
  type: [string, list]
```
