# General Transit Feed Specification (GTFS)

**GTFS** 集成可为您提供公共交通车站/站点的下一班发车时间及相关数据。这些数据来自您选择的公共交通机构，并采用 [General Transit Feed Specification](https://developers.google.com/transit/gtfs/) 格式，通常简称为 GTFS。

您需要找到一个有效的 GTFS 数据集，通常可以通过互联网搜索找到。大多数公共交通机构都会提供 GTFS 数据，因为如果它们希望显示在 Google Maps 上，Google 要求其提供这些数据。您也可以尝试在 [Mobility Database](https://mobilitydatabase.org/) 中查找数据。

以下是一些示例：

* [Bay Area Rapid Transit (BART)](https://www.bart.gov/schedules/developers/gtfs) - The rapid transit system for the San Francisco Bay Area.
* [Metropolitan Transit Authority of New York City (MTA)](http://web.mta.info/developers/) - Provides separate data feeds for subway, bus, LIRR and Metro-North of the greater New York City metropolitan region.
* [Official Timetable Switzerland](https://opentransportdata.swiss/en/dataset/timetable-2019-gtfs) - The official timetable data for Switzerland in 2019.

您需要下载 GTFS ZIP 文件，并将其放入配置目录中名为 `gtfs` 的文件夹。为了便于使用，建议将文件重命名为机构/数据源名称（例如使用 `bart.zip`，而不是 `google_transit_20160328_v1.zip`）。您也可以先解压，再将文件夹放入 `gtfs` 文件夹中。

数据会被转换为可查询的格式，并以 SQLite3 数据库形式保存在源数据旁边。传感器会在每次启动时检查该 SQLite3 数据是否存在；如果不存在，则会重新导入 ZIP 文件/文件夹。

若要更新数据，请删除 SQLite3 文件并重启 Home Assistant。

若要查找站点 ID，请打开 ZIP 文件或解压后文件夹中的 `stops.txt` 文件。不同交通机构的 ID 格式各不相同，但它总会是某一行中的第一“列”（也就是第一个逗号前的字符串）。

传感器属性将包含该行程的所有相关信息，例如机构信息、起点和终点站点信息、起终点站时间以及路线信息。

实际表现可能会因所使用的交通机构而异。大多数机构都遵循 GTFS 格式，但有些可能会做一些特殊处理，例如添加额外列或使用不同的数据格式。如果您遇到特定数据问题，请向 [PyGTFS](https://github.com/jarondl/pygtfs) 项目反馈，因为 GTFS 传感器正是使用它来解析数据的。

**请注意**：这是一个*静态*数据源。由于 Python 3 中解析 protocol buffer 格式存在相关问题，目前此传感器尚不支持 GTFS Realtime。待这些问题修复后，将会加入 Realtime 支持。加入后，传感器将按需检查延误和公告，并在传感器中报告它们。

若要启用 GTFS 集成，您需要将其添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: gtfs
    origin: STOP_ID
    destination: STOP_ID
    data: DATA_SOURCE
```

```yaml
origin:
  description: 起始站点的站点 ID。
  required: true
  type: string
destination:
  description: 目标站点的站点 ID。
  required: true
  type: string
data:
  description: 包含 GTFS 数据的 ZIP 文件或文件夹名称。它必须位于配置目录中的 `gtfs` 文件夹内。
  required: true
  type: string
name:
  description: 在前端中使用的名称。
  required: false
  default: GTFS Sensor
  type: string
offset:
  description: "要查找的最小时延。如果某次发车距离现在少于 `offset`，则会被忽略。可将该值设置为秒（`integer`），或使用以下 `time` 格式之一：`offset: 'HH:MM:SS'`、`offset: 'HH:MM'`。"
  required: false
  default: 0
  type: [integer, time]
include_tomorrow:
  description: 如果今天已无更多发车班次，则同时搜索明天的时刻表。
  required: false
  default: false
  type: boolean
```
