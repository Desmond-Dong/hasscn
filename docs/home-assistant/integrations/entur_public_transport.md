---
title: Entur
description: 'Entur 集成为挪威任何公交站、汽车渡轮码头、火车站、机场和客运渡轮码头的下一次出发提供实时出发信息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Transport
ha_release: 0.84
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@hfurubotten'
  - '@SanderBlom'
ha_domain: entur_public_transport
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: legacy
---
# Entur

**Entur** 集成为挪威任何公交站、汽车渡轮码头、火车站、机场和客运渡轮码头的下一次出发提供实时出发信息。

对于配置中给出的每个站点，将为该站点安装一个传感器。它将在状态中显示到最近出发的剩余分钟数，但也会在属性中显示下次出发。还包括有关出发是否实时监控或来自计划时间的信息，以及延误多少分钟的信息。

实时数据从 [Entur](https://www.entur.no) 获取。Entur 是一个服务，根据[开源许可证](https://data.norge.no/nlod/no)收集和提供挪威所有公共交通信息。

:::note
请注意，底层 API 有速率限制，为避免您的实例被 Entur 阻止，传感器仅每 45 秒获取一次新信息。建议不要更频繁地安排更新。

:::
## 配置

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: entur_public_transport
    stop_ids:
      - 'STOP_ID_1'
      - 'STOP_ID_2'
```

```yaml
stop_ids:
  description: 要监控出发时间的站点或站台列表。
  required: true
  type: list
name:
  description: 覆盖传感器名称的部分。
  required: false
  type: string
  default: Entur
expand_platforms:
  description: 是否为站点下的每个站台创建额外的传感器。
  required: false
  type: boolean
  default: true
show_on_map:
  description: 是否将站台位置添加到传感器和地图中。
  required: false
  type: boolean
  default: false
line_whitelist:
  description: 应在结果传感器中列入白名单的线路列表，仅在定义的线路预期离开站台或车站时显示。您希望在任何传感器上显示的所有线路都应包含在列表中。
  required: false
  type: list
omit_non_boarding:
  description: 传感器是否应删除不接受新乘客或位于终点站的结果出发。
  required: false
  type: boolean
  default: true
number_of_departures:
  description: 应在传感器属性中显示的出发数量。最大 10，最小 2。
  required: false
  type: integer
  default: 2
```

## 示例用法

多个站点的示例，为车站下的每个站台扩展传感器，并将站台添加到地图中。

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: entur_public_transport
    name: Transport
    expand_platforms: true
    show_on_map: true
    stop_ids:
      - 'NSR:StopPlace:548'   # Bergen 火车站
      - 'NSR:StopPlace:737'   # Trondheim 机场
      - 'NSR:StopPlace:5850'  # Grorud T 公交站
      - 'NSR:StopPlace:58652' # Mortavika 渡轮
      - 'NSR:StopPlace:27639' # Sør-Hidle 码头
      - 'NSR:Quay:48550'      # Fiskepiren 公交站站台 1
```

每个站点一条线路白名单的示例。

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: entur_public_transport
    stop_ids:
      - 'NSR:Quay:7333'
      - 'NSR:Quay:48550'
      - 'NSR:StopPlace:596'
    line_whitelist:
      - 'RUT:Line:1'
      - 'KOL:Line:1000_236'
      - 'NSB:Line:59'
```

## 获取站点 ID

[Entur 的行程规划器](https://entur.no)有一个挪威所有使用的站点地图。使用地图找到您感兴趣的站点。当您找到其中一个站点时，点击它。

现在网络浏览器应该包含一个带有 ID 的 URL。像这样：

`https://entur.no/nearby-stop-place-detail?id=NSR:StopPlace:32376`

站点 ID 是 URL 中 `id=` 参数后面的内容。将其复制粘贴到配置中。

## 常见问题 - 故障排除

**问：** 我有多个站点 ID 并添加了线路白名单。现在有些站点显示 `unknown`。

**答：** 线路白名单会影响所有站点。因此您必须在所有站点上将您感兴趣的所有线路列入白名单。

---

**问：** 我添加了线路白名单，之前一切正常，但现在突然停止更新了。

**答：** 一些交通公司，如 Rogaland 的 Kolumbus，其线路 ID 末尾有运行编号。这些会定期更新，使白名单无效。需要再次添加新的线路 ID。大多数情况下它会增加一。

---

**问：** 我在哪里可以找到要添加到白名单的线路 ID？

**答：** 传感器会显示线路 ID，这是找到它的推荐方式，同时我们等待"Nasjonalt Stoppestedregister"公开。也可以在 [Entur 的行程规划器](https://en-tur.no)中查看流量时使用浏览器中的开发者工具查看线路 ID。