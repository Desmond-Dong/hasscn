---
title: Trenitalia ViaggiaTreno
description: 'Trenitalia ViaggiaTreno 集成会通过公开的 ViaggiaTreno(http://viaggiatreno.it) API，为您提供已配置列车 ID 和车站的信息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.58
ha_domain: viaggiatreno
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Trenitalia ViaggiaTreno

**Trenitalia ViaggiaTreno** 集成会通过公开的 [ViaggiaTreno](http://viaggiatreno.it) API，为您提供已配置列车 ID 和车站的信息。

要启用此集成，您至少需要两个参数：`train_id` 和 `station_id`。

前者可以直接在 [ViaggiaTreno](http://viaggiatreno.it/) 时刻表中查看，后者可以通过专用 API 端点获取：
`http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno/autocompletaStazione/<Station name>`
(e.g., `http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno/autocompletaStazione/ROMA` will list all station names (with ids) that starts with *ROMA*).

:::note
`station_id` 指的是列车的**始发站**。如果列车编号与车站 ID 不匹配，传感器将不会返回任何数据。

:::
然后将这些数据添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例
sensor:
  - platform: viaggiatreno
    train_id: 12279
    station_id: S08409
```

```yaml
train_id:
  description: 列车的 ID。
  required: true
  type: integer
station_id:
  description: 始发站的 ID。
  required: true
  type: integer
train_name:
  description: 传感器名称。默认为 `Train <train id> from <station id>`。
  required: false
  type: string
```

:::note
在未来的实现中，可能可以通过车站名称自动搜索最匹配的车站 ID，而无需手动指定。

:::
公开时刻表数据来自 [ViaggiaTreno](http://viaggiatreno.it)。

:::note
API 的说明文档（意大利语）可在以下地址找到：
https://github.com/bluviolin/TrainMonitor/wiki/API-del-sistema-Viaggiatreno

:::
