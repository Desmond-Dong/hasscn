---
title: Transport NSW
description: 关于如何将新南威尔士州交通局（澳大利亚）时刻表数据集成到 Home Assistant 的说明。
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.81
ha_domain: transport_nsw
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

**Transport NSW** 集成可显示从新南威尔士州交通局站点出发的下一班公交、火车、轻轨或渡轮还有多久发车。

## 设置

前提条件是从 [Transport NSW](https://opendata.transport.nsw.gov.au/) 获取一个免费的 API 密钥。你需要注册一个账号，然后创建一个新应用，并将 `Trip Planner APIs` 添加到该应用中。Transport NSW 提供了[相关说明](https://opendata.transport.nsw.gov.au/developers/userguide)。

要查找站点 ID，请使用 [Transport NSW stop finder](https://transportnsw.info/stop#/) 搜索你的站点。URL 中会包含数字形式的站点 ID。

你也可以打开 Google 地图并点击任意公交 / 火车 / 渡轮站点。弹出窗口会在站点名称下方显示站点 ID。对于火车站，获取站台 stop id 最简单的方法是使用 [Transport NSW Info](https://transportnsw.info/)。

默认情况下，传感器会获取该站点 ID 的下一班出发交通工具。

## 配置

要启用该传感器，请将以下内容添加到你的 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: transport_nsw
    stop_id: "200024"
    api_key: "YOUR API KEY"
```

```yaml
api_key:
  description: 你的 Open Data Transport NSW API 密钥。
  required: true
  type: string
stop_id:
  description: 要获取信息的站点 ID。
  required: true
  type: string
route:
  description: 按站点的公交线路进行筛选。这与公交线路号相同，例如 `83`。
  required: false
  type: string
destination:
  description: 用于渡轮或火车站点，以筛选传感器的目的地，例如 `Circular Quay`。
  required: false
  type: string
name:
  description: 该传感器的友好名称。
  required: false
  type: string
```

公开信息由 [Transport NSW](https://opendata.transport.nsw.gov.au/) 提供。

## 示例

以下是公交和渡轮的更多配置示例。

```yaml
# 公交线路 configuration.yaml 示例条目
sensor:
  - platform: transport_nsw
    name: "Bus"
    stop_id: "209516"
    route:  '199'
    api_key: "YOUR API KEY"
```

```yaml
# 渡轮 configuration.yaml 示例条目
sensor:
  - platform: transport_nsw
    name: "Ferry"
    stop_id: "10102008"
    destination: "Circular Quay"
    api_key: "YOUR API KEY"
```

如果未来 24 小时内未找到任何站点事件，传感器将返回 `n/a`。你可以使用 `template` 传感器构建更有意义的显示文本。


```yaml
# template 传感器示例
template:
  - sensor:
    - name: "Bus monitor 199"
      state: >-
        {% if is_state_attr('sensor.bus', 'due', 'n/a') %}
          未找到时刻表
        {% else %}
          {{ state_attr('sensor.bus', 'route') }} in {{ state_attr('sensor.bus', 'due') }}m ({{ state_attr('sensor.bus', 'delay') }})
        {% endif %}
```


