---
title: HVV Departures
description: 'HVV Departures 集成会显示汉堡的公交、火车和轮渡出发信息。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.112
ha_config_flow: true
ha_codeowners:
  - '@vigonotion'
ha_domain: hvv_departures
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: service
---
# HVV Departures

**HVV Departures** 集成会显示汉堡的公交、火车和轮渡出发信息。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::


需要 API 凭据？请参阅[如何获取 API 凭据](#how-to-get-the-api-credentials)。

## Options

菜单路径：*Configuration* > *Integrations* > *Select your new integration* > *Press the cog in the upper left corner*

- **select lines**：按线路筛选车站出发信息，仅显示所选线路。
- **offset**：如果您希望显示未来若干分钟后的出发信息，可设置该项，例如您距离车站有 10 分钟路程。
- **use realtime data**：启用后将包含延误和取消信息。

## Departure sensors

此集成会为所选车站的出发信息创建一个传感器。

### States

状态值是一个时间戳，表示下一班次的计划出发时间，不含延误。

### Attributes

| Attribute   | Description                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `line`      | 下一班次的线路编号                                                                                                        |
| `origin`    | 该交通工具的始发站                                                                                                        |
| `direction` | 该交通工具的终点站                                                                                                        |
| `type`      | 交通类型，例如 `Bus` 或 `S`                                                                                               |
| `id`        | 线路的唯一标识符。在大多数情况下，`line` 已足够识别线路                                                                   |
| `delay`     | 交通工具延误的实时数据（秒）。将其加到出发时间上可得到实际出发时间                                                         |
| `next`      | 即将出发班次的列表。每个元素包含上述属性以及带有时间戳的 `departure`                                                       |

## Elevator sensors

如果所选车站有电梯，将提供二元传感器。

### States

- OK (`off`)：电梯运行正常。
- Problem (`on`)：电梯故障。更多信息请参见 cause 属性。

### Attributes

| Attribute       | Description                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `cabin_width`   | 电梯轿厢宽度                                                                                                                                |
| `cabin_length`  | 电梯轿厢长度                                                                                                                                |
| `door_width`    | 电梯门宽度                                                                                                                                  |
| `elevator_type` | 电梯类型                                                                                                                                   |
| `button_type`   | 电梯按钮类型，可为以下之一：<br/><ul><li>`BRAILLE`</li><li>`ACUSTIC`</li><li>`COMBI`</li><li>`UNKNOWN`</li>                                |
| `cause`         | 当传感器状态为 `on`（"Problem"）时，`cause` 属性可能包含故障原因的更多信息                                                                 |
| `lines`         | 使用该电梯可到达的线路列表                                                                                                                   |

## How to get the API credentials

您需要通过 HVV 网站申请凭据。官方指南见[此处](https://www.hvv.de/de/fahrplaene/abruf-fahrplaninfos/datenabruf)（该页面仅提供德语）。

在邮件中说明您将把 API 凭据用于 Home Assistant。随后他们会在后续回复中发送您的 API 凭据。
## Data

数据由 [HVV](https://www.hvv.de/) 提供。
