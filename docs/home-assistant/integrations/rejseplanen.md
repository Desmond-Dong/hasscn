---
title: Rejseplanen
description: 'Rejseplanen 集成会使用 Rejseplanen(https://www.rejseplanen.dk/) 的时刻表数据，为您提供丹麦公共交通的出行信息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.88
ha_domain: rejseplanen
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Rejseplanen

**Rejseplanen** 集成会使用 [Rejseplanen](https://www.rejseplanen.dk/) 的时刻表数据，为您提供丹麦公共交通的出行信息。

## 配置

请在您的 "`configuration.yaml`" 文件中添加一个传感器。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: rejseplanen
    stop_id: "YOUR_STOP_ID"
```

```yaml
stop_id:
  description: 公共交通站点的 ID。
  required: true
  type: string
name:
  description: "传感器名称。传感器的实体 ID 将根据此名称生成。例如，Glostrup St 会变成 `sensor.glostrup_st`。该项是可选的，但如果您定义了多个传感器，建议填写。"
  required: false
  type: string
  default: "Next departure"
route:
  description: 路线名称列表。
  required: false
  type: [string, list]
direction:
  description: 用于过滤的方向列表。
  required: false
  type: [string, list]
departure_type:
  description: 用于过滤的发车类型列表。
  required: false
  type: [string, list]
```

## stop_id

可通过以下步骤获取 `stop_id`：

- 前往 [https://www.openstreetmap.org](https://www.openstreetmap.org)
- 搜索并填写您要查找的位置。
- URL 看起来会像这样：[https://www.openstreetmap.org/#map=18/56.15756/10.20674](https://www.openstreetmap.org/#map=18/56.15756/10.20674)
- 然后将该位置的坐标填入这个 URL 中，在此示例中会是：[http://xmlopen.rejseplanen.dk/bin/rest.exe/stopsNearby?coordX=56.15756&coordY=10.20674&](http://xmlopen.rejseplanen.dk/bin/rest.exe/stopsNearby?coordX=56.15756&coordY=10.20674&)
- 之后您将看到距离该位置最近的 30 个站点。

您会看到如下输出：

```text
"StopLocation":[{
    "name":"Engdalsvej/Århusvej (Favrskov Kom)",
    "x":"10078598",
    "y":"56243456",
    "id":"713000702"
```

在列表中找到您的站点名称，其中的 `id` 就是您要填写给 `stop_id:` 的值。

## Direction

如果您使用 `direction` 过滤器，务必填写正确的终点站名称，否则传感器将完全无法工作。
`direction` 必须是对应 `Departure type` 的计划终点方向，***而不是您想下车的站点***。

- 将 YOUR_STOP_ID 替换为您的站点 ID，然后访问 [http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=YOUR_STOP_ID](http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=YOUR_STOP_ID)
- `direction` 字段下的值就是您需要填写到 `direction` 中的内容。请确保使用完全一致的名称，并添加所有适用项。

您会看到如下输出：

```text
<Departure name="Bus 200" type="BUS" stop="Engdalsvej/Århusvej (Favrskov Kom)" time="10:15" date="06.05.20" id="713000701" line="200" messages="0" finalStop="Bjergegårdsvej/Rylevej (Favrskov Kom)" direction="Hinnerup">
<JourneyDetailRef ref="http://xmlopen.rejseplanen.dk/bin/rest.exe/journeyDetail?ref=248868%2F117643%2F641354%2F237721%2F86%3Fdate%3D06.05.20" />
</Departure>
<Departure name="Bus 200" type="BUS" stop="Engdalsvej/Århusvej (Favrskov Kom)" time="10:25" date="06.05.20" id="713000702" line="200" messages="0" finalStop="Skanderborg Busterminal (Skanderborg Kom)" direction="Skanderborg Busterminal (Skanderborg Kom)">
<JourneyDetailRef ref="http://xmlopen.rejseplanen.dk/bin/rest.exe/journeyDetail?ref=512592%2F205637%2F693742%2F176008%2F86%3Fdate%3D06.05.20" />
</Departure>
```

下面是一个使用 `direction` 的可用示例：

```yaml
# 使用 direction 的 configuration.yaml 示例条目
sensor:
  - platform: rejseplanen
    stop_id: "713000702"
    direction:
      - 'Bjergegårdsvej/Rylevej (Favrskov Kom)'
      - 'Skanderborg Busterminal (Skanderborg Kom)'
```

## Route

如果您使用 `route` 过滤器，务必填写正确的路线名称，否则传感器将完全无法工作。

- 将 YOUR_STOP_ID 替换为您的站点 ID，然后访问 [http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=YOUR_STOP_ID](http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=YOUR_STOP_ID)
- `Departure name` 下的值就是您需要填写到 `route` 中的内容。请确保使用完全一致的名称。

您会看到如下输出：

```text
<Departure name="Bus 1A" type="BUS" stop="Elmegade (Nørrebrogade)" time="10:19" date="06.05.20" id="45739" line="1A" messages="0" rtTime="10:21" rtDate="06.05.20" finalStop="Avedøre St." direction="Avedøre St.">
<JourneyDetailRef ref="http://xmlopen.rejseplanen.dk/bin/rest.exe/journeyDetail?ref=138234%2F58362%2F751742%2F329795%2F86%3Fdate%3D06.05.20" />
</Departure>
<Departure name="Bus 5C" type="BUS" stop="Elmegade (Nørrebrogade)" time="10:22" date="06.05.20" id="45739" line="5C" messages="0" rtTime="10:23" rtDate="06.05.20" finalStop="Husum Torv, Sløjfen (Sløjfen)" direction="Husum Torv">
<JourneyDetailRef ref="http://xmlopen.rejseplanen.dk/bin/rest.exe/journeyDetail?ref=899547%2F321443%2F654384%2F27343%2F86%3Fdate%3D06.05.20" />
</Departure>
```

## 示例

下面是一个更完整的传感器使用示例：

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: rejseplanen
    name: "Elmegade 350S"
    stop_id: "000045740"
    route: "Bus 350S"
    direction:
      - 'Herlev St.'
      - 'Ballerup St.'
```

该传感器可以按一条或多条路线、方向和类型过滤时刻表。已知类型如下表所示。

| 发车类型 | 说明 |
| -------------- | ----------------------- |
| BUS            | 普通公交              |
| EXB            | 快速公交             |
| TB             | 港口巴士             |
| LET            | 轻轨                |
| M              | 地铁                   |
| S              | S-train                 |
| REG            | 区域列车          |
| IC             | 城际列车         |
| LYN            | 城际特快列车 |
| TOG            | 其他列车            |

## 属性

| 属性         | 说明 |
| ----------------- | -------------------------------------------------------------------------------- |
| `due_in`          | 距离发车还有多少分钟 |
| `due_at`          | 发车日期和时间 |
| `scheduled_at`    | 计划发车日期和时间 |
| `real_time_at`    | 实际发车日期和时间（与计划时间不同的情况下） |
| `type`            | 交通类型 |
| `route`           | 路线代码 |
| `direction`       | 目的站 |
| `final_stop`      | 终点站（如果该班次未直达目的站） |
| `stop`            | 发车站点 |
| `stop_id`         | 发车站点 ID |
| `track`           | 发车站台（如可用） |
| `attribution`     | 归属说明（数据源要求） |
| `next_departures` | 后续发车列表 |

### `next_departures`

| 属性      | 说明 |
| -------------- | -------------------------------------------------------------------------------- |
| `due_in`       | 距离发车还有多少分钟 |
| `due_at`       | 发车日期和时间 |
| `scheduled_at` | 计划发车日期和时间 |
| `real_time_at` | 实际发车日期和时间（与计划时间不同的情况下） |
| `type`         | 交通类型 |
| `route`        | 路线代码 |
| `direction`    | 目的站 |
| `final_stop`   | 终点站（如果该班次未直达目的站） |
| `stop`         | 发车站点 |
| `track`        | 发车站台（如可用） |
