---
title: Västtrafik
description: 关于如何将 Västtrafik 公共交通数据集成到 Home Assistant 的说明。
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: '0.30'
ha_domain: vasttrafik
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Västtrafik** 集成会通过 [Västtrafik](https://vasttrafik.se/) 公共交通服务，为您提供瑞典哥德堡大区的出行详情。

您必须在[这里](https://developer.vasttrafik.se/applications)创建一个应用，以获取 `key` 和 `secret`。同时请确保点击 `Prenumerera på nytt API` 订阅 API，并选择 `Planera Resa v4`。

请将这些数据添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例
sensor:
  - platform: vasttrafik
    key: YOUR_API_KEY
    secret: YOUR_API_SECRET
    departures:
      - from: Musikvägen
```

```yaml
key:
  description: 用于访问 Västtrafik 账户的 API key。
  required: true
  type: string
secret:
  description: 用于访问 Västtrafik 账户的 API secret。
  required: true
  type: string
departures:
  description: 出行路线列表。
  required: true
  type: list
  keys:
    name:
      description: 路线名称。
      required: false
      type: string
    from:
      description: 出发站名称或 ID。
      required: true
      type: string
    heading:
      description: 目的地站点名称或 ID。
      required: false
      type: string
    lines:
      description: 仅考虑这些线路。
      required: false
      type: [list, string]
    delay:
      description: 延迟分钟数。
      required: false
      type: string
      default: 0
```

数据来自 [Västtrafik](https://vasttrafik.se/)。

完整配置示例如下：

```yaml
# configuration.yaml 示例
sensor:
  - platform: vasttrafik
    key: YOUR_API_KEY
    secret: YOUR_API_SECRET
    departures:
      - name: Mot järntorget
        from: Musikvägen
        heading: Järntorget
        lines:
          - 7
          - GRÖN
        delay: 10
```

## 解决站点选择错误的问题

您可以在 `from` / `heading` 中使用站点全名，例如 `Musikvägen, Göteborg`。

如果系统选择了错误的站点，也可以改为提供站点 ID。为此，您需要先通过 Västtrafik 的 [API-konsole](https://developer.vasttrafik.se/apis/13/v4)（使用 `GET /locations/by-text`）或使用 `curl` 获取站点 ID。

若要使用 `curl` 获取 ID：

1. 登录 Västtrafik API，并前往 ["Applikationer"](https://developer.vasttrafik.se/applications)
2. 选择 `* Generera accesstoken`，然后选择 `Kopiera`
3. 执行以下 `curl` 命令，并按需替换 `<ACCESS_TOKEN>` 和 `<STATION_NAME>`：

   ```bash
      curl -H "Authorization: Bearer <ACCESS_TOKEN>" "https://ext-api.vasttrafik.se/pr/v4/locations/by-text?q=<STATION_NAME>"
   ```

4. 在输出中找到名为 `results` 的键，在该键下您会看到一组站点列表。复制目标站点的 ID（`gid`），并将其用于配置。

```yaml
# 使用站点 ID 作为出发点、站点名称作为目的地的 configuration.yaml 示例
sensor:
  - platform: vasttrafik
    key: YOUR_API_KEY
    secret: YOUR_API_SECRET
    departures:
      - name: To the Iron Square \o/
        from: 9021014004870000
        heading: Järntorget
        delay: 0
```
