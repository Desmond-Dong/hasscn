---
title: "REST API"
---
import ApiEndpoint from '@site/static/js/api_endpoint.jsx'

Home Assistant 在与 web frontend 相同的端口上提供了一个 RESTful API。Home Assistant OS 安装上默认为 80，否则为 8123，除非通过 `SETUP_PORT` 环境变量更改了端口。

如果你的配置中没有使用 [`frontend`](https://www.home-assistant.io/integrations/frontend/)，则需要在 `configuration.yaml` 文件中添加 [`api` 集成](https://www.home-assistant.io/integrations/api/)。

- `http://IP_ADDRESS:8123/` 是用于控制 Home Assistant 的接口。
- `http://IP_ADDRESS:8123/api/` 是一个 RESTful API。

API 只接受和返回 JSON 编码的对象。

所有 API 调用都必须附带 header `Authorization: Bearer TOKEN`，其中 `TOKEN` 应替换为你的唯一 access token。你可以使用 Web 浏览器登录 frontend，然后转到[你的 profile](https://www.home-assistant.io/docs/authentication/#your-account-profile) `http://IP_ADDRESS:8123/profile` 来获取一个 token（"Long-Lived Access Token"）。注意复制完整的 key。

有多种方式可以消费 Home Assistant Rest API。其中一种是使用 `curl`：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  http://IP_ADDRESS:8123/ENDPOINT
```

另一种选择是使用 Python 和 [Requests](https://requests.readthedocs.io/en/latest/) 模块。

```python
from requests import get

url = "http://localhost:8123/ENDPOINT"
headers = {
    "Authorization": "Bearer TOKEN",
    "content-type": "application/json",
}

response = get(url, headers=headers)
print(response.text)
```

另一种选择是在 Home Assistant 自动化或脚本中使用 [RESTful Command 集成](https://www.home-assistant.io/integrations/rest_command/)。

```yaml
turn_light_on:
  url: http://localhost:8123/api/states/light.study_light
  method: POST
  headers:
    authorization: 'Bearer TOKEN'
    content-type: 'application/json'
  payload: '{"state":"on"}'
```

成功的调用将返回状态码 200 或 201。还可能返回的其他状态码有：

- 400 (Bad Request)
- 401 (Unauthorized)
- 404 (Not Found)
- 405 (Method Not Allowed)

### 操作

API 支持以下 actions：

<ApiEndpoint path="/api/" method="get">

如果 API 正在运行，则返回一条消息。

```json
{
  "message": "API running."
}
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" http://localhost:8123/api/
```

注意：请确保包含末尾的 `/`，完整路径是 `/api/`，而不是 `/api`

</ApiEndpoint>

<ApiEndpoint path="/api/config" method="get">

以 JSON 形式返回当前的 configuration。

```json
{
   "components":[
      "sensor.cpuspeed",
      "frontend",
      "config.core",
      "http",
      "map",
      "api",
      "sun",
      "config",
      "discovery",
      "conversation",
      "recorder",
      "group",
      "sensor",
      "websocket_api",
      "automation",
      "config.automation",
      "config.customize"
   ],
   "config_dir":"/home/ha/.homeassistant",
   "elevation":510,
   "latitude":45.8781529,
   "location_name":"Home",
   "longitude":8.458853651,
   "time_zone":"Europe/Zurich",
   "unit_system":{
      "length":"km",
      "mass":"g",
      "temperature":"\u00b0C",
      "volume":"L"
   },
   "version":"0.56.2",
   "whitelist_external_dirs":[
      "/home/ha/.homeassistant/www",
      "/home/ha/.homeassistant/"
   ]
}
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" http://localhost:8123/api/config
```

</ApiEndpoint>

<ApiEndpoint path="/api/components" method="get">

返回当前已加载的 components 列表。

```
[
  "currentcost.sensor",
  "tapo.switch",
  "tuya_ble.sensor",
  "backup",
  "ble_monitor.binary_sensor",
  "localtuya.remote",
  "logger",
  "http",
  "hacs",
  "cast",
  "device_tracker",
  "upnp.binary_sensor",
  "notify",
  "person",
  ...
]
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" http://localhost:8123/api/components
```

</ApiEndpoint>

<ApiEndpoint path="/api/events" method="get">

返回一个 event 对象数组。每个 event 对象包含 event 名称和 listener 计数。

```json
[
    {
      "event": "state_changed",
      "listener_count": 5
    },
    {
      "event": "time_changed",
      "listener_count": 2
    }
]
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" http://localhost:8123/api/events
```

</ApiEndpoint>

<ApiEndpoint path="/api/services" method="get">

返回一个 service 对象数组。每个对象包含 domain 以及它所包含的 services。

```json
[
    {
      "domain": "browser",
      "services": [
        "browse_url"
      ]
    },
    {
      "domain": "keyboard",
      "services": [
        "volume_up",
        "volume_down"
      ]
    }
]
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" http://localhost:8123/api/services
```

</ApiEndpoint>

<ApiEndpoint path="/api/history/period/<timestamp>" method="get">

返回过去状态变化的数组。每个对象包含实体的更多详细信息。

`<timestamp>`（`YYYY-MM-DDThh:mm:ssTZD`）是可选的，默认为请求时间前 1 天。它决定了该期间的开始。

以下参数是**必需的**：

- `filter_entity_id=<entity_ids>` 按一个或多个 entities 过滤，以逗号分隔。

你可以传递以下可选 GET 参数：

- `end_time=<timestamp>` 以 URL 编码格式选择期间的结束时间（默认为 1 天）。
- `minimal_response` 仅对第一个和最后一个 state 以外的 states 返回 `last_changed` 和 `state`（快得多）。
- `no_attributes` 跳过从数据库返回 attributes（快得多）。
- `significant_changes_only` 仅返回重要的 state 变化。

不带 `minimal_response` 的示例

```json
[
    [
        {
            "attributes": {
                "friendly_name": "Weather Temperature",
                "unit_of_measurement": "\u00b0C"
            },
            "entity_id": "sensor.weather_temperature",
            "last_changed": "2016-02-06T22:15:00+00:00",
            "last_updated": "2016-02-06T22:15:00+00:00",
            "state": "-3.9"
        },
        {
            "attributes": {
                "friendly_name": "Weather Temperature",
                "unit_of_measurement": "\u00b0C"
            },
            "entity_id": "sensor.weather_temperature",
            "last_changed": "2016-02-06T22:15:00+00:00",
            "last_updated": "2016-02-06T22:15:00+00:00",
            "state": "-1.9"
        },
    ]
]
```

带 `minimal_response` 的示例

```json
[
    [
        {
            "attributes": {
                "friendly_name": "Weather Temperature",
                "unit_of_measurement": "\u00b0C"
            },
            "entity_id": "sensor.weather_temperature",
            "last_changed": "2016-02-06T22:15:00+00:00",
            "last_updated": "2016-02-06T22:15:00+00:00",
            "state": "-3.9"
        },
        {
            "last_changed": "2016-02-06T22:20:00+00:00",
            "state": "-2.9"
        },
        {
            "last_changed": "2016-02-06T22:22:00+00:00",
            "state": "-2.2"
        },
        {
            "attributes": {
                "friendly_name": "Weather Temperature",
                "unit_of_measurement": "\u00b0C"
            },
            "entity_id": "sensor.weather_temperature",
            "last_changed": "2016-02-06T22:25:00+00:00",
            "last_updated": "2016-02-06T22:25:00+00:00",
            "state": "-1.9"
        },
    ]
]
```

示例 `curl` 命令：

```shell
# 过去一天的实体 'sensor.temperature' 的历史（默认）
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  "http://localhost:8123/api/history/period?filter_entity_id=sensor.temperature"
```

```shell
# 过去一天中实体 'sensor.temperature' 和 'sensor.kitchen_temperature' 的最小历史，起始日期手动设置为 2023-09-04
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  "http://localhost:8123/api/history/period/2023-09-04T00:00:00+02:00?filter_entity_id=sensor.temperature,sensor.kitchen_temperature&minimal_response"
```

```shell
# 实体 'sensor.temperature' 在 2021-09-04 到 2023-09-04 期间的历史
# 使用 URL 编码的 timestamps
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  "http://localhost:8123/api/history/period/2021-09-04T00%3A00%3A00%2B02%3A00?end_time=2023-09-04T00%3A00%3A00%2B02%3A00&filter_entity_id=sensor.temperature"
```

</ApiEndpoint>

<ApiEndpoint path="/api/logbook/<timestamp>" method="get">

返回一个 logbook 条目数组。

`<timestamp>`（`YYYY-MM-DDThh:mm:ssTZD`）是可选的，默认为请求时间前 1 天。它决定了该期间的开始。

你可以传递以下可选 GET 参数：

- `entity=<entity_id>` 按单个 entity 过滤。
- `end_time=<timestamp>` 以 URL 编码格式选择从 `<timestamp>` 开始的期间结束时间。

示例
```json
[
  {
		"context_user_id": null,
		"domain": "alarm_control_panel",
		"entity_id": "alarm_control_panel.area_001",
		"message": "changed to disarmed",
		"name": "Security",
		"when": "2020-06-20T16:44:26.127295+00:00"
	},
	{
		"context_user_id": null,
		"domain": "homekit",
		"entity_id": "alarm_control_panel.area_001",
		"message": "send command alarm_arm_night for Security",
		"name": "HomeKit",
		"when": "2020-06-21T02:59:05.759645+00:00"
	},
	{
		"context_user_id": null,
		"domain": "alarm_control_panel",
		"entity_id": "alarm_control_panel.area_001",
		"message": "changed to armed_night",
		"name": "Security",
		"when": "2020-06-21T02:59:06.015463+00:00"
	}
]
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  http://localhost:8123/api/logbook/2016-12-29T00:00:00+02:00
```

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  "http://localhost:8123/api/logbook/2016-12-29T00:00:00+02:00?end_time=2099-12-31T00%3A00%3A00%2B02%3A00&entity=sensor.temperature"
```

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  "http://localhost:8123/api/logbook/2016-12-29T00:00:00+02:00?end_time=2099-12-31T00%3A00%3A00%2B02%3A00"
```

</ApiEndpoint>

<ApiEndpoint path="/api/states" method="get">

返回一个 state 对象数组。每个 state 具有以下 attributes：`entity_id`、`state`、`last_changed` 和 `attributes`。

```json
[
    {
        "attributes": {},
        "entity_id": "sun.sun",
        "last_changed": "2016-05-30T21:43:32.418320+00:00",
        "state": "below_horizon"
    },
    {
        "attributes": {},
        "entity_id": "process.Dropbox",
        "last_changed": "22016-05-30T21:43:32.418320+00:00",
        "state": "on"
    }
]
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" http://localhost:8123/api/states
```

</ApiEndpoint>

<ApiEndpoint path="/api/states/<entity_id>" method="get">

返回指定 `entity_id` 的 state 对象。如果未找到则返回 404。

```json
{
   "attributes":{
      "azimuth":336.34,
      "elevation":-17.67,
      "friendly_name":"Sun",
      "next_rising":"2016-05-31T03:39:14+00:00",
      "next_setting":"2016-05-31T19:16:42+00:00"
   },
   "entity_id":"sun.sun",
   "last_changed":"2016-05-30T21:43:29.204838+00:00",
   "last_updated":"2016-05-30T21:50:30.529465+00:00",
   "state":"below_horizon"
}
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  http://localhost:8123/api/states/sensor.kitchen_temperature
```

</ApiEndpoint>

<ApiEndpoint path="/api/error_log" method="get">

作为纯文本响应检索 Home Assistant 当前会话期间记录的所有错误。

```text
15-12-20 11:02:50 homeassistant.components.recorder: Found unfinished sessions
15-12-20 11:03:03 netdisco.ssdp: Error fetching description at http://192.168.1.1:8200/rootDesc.xml
15-12-20 11:04:36 homeassistant.components.alexa: Received unknown intent HelpIntent
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  http://localhost:8123/api/error_log
```

</ApiEndpoint>

<ApiEndpoint path="/api/camera_proxy/<camera entity_id>" method="get">

返回指定 camera `entity_id` 的数据（image）。

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -o image.jpg \
  "http://localhost:8123/api/camera_proxy/camera.my_sample_camera?time=1462653861261"
```

</ApiEndpoint>

<ApiEndpoint path="/api/calendars" method="get">

返回 calendar entities 列表。

```json
[
  {
    "entity_id": "calendar.holidays",
    "name": "National Holidays",
  },
  {
    "entity_id": "calendar.personal",
    "name": "Personal Calendar",
  }
]
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  http://localhost:8123/api/calendars
```

</ApiEndpoint>

<ApiEndpoint path="/api/calendars/<calendar entity_id>?start=<timestamp>&end=<timestamp>" method="get">

返回指定 calendar `entity_id` 在 `start` 和 `end` 时间（不含）之间的[calendar events](/developers/core/entity/calendar#calendarevent)列表。

响应中的 events 包含 `start` 和 `end`，全天事件的值为 `date`，其他事件为 `dateTime`。
```json
[
  {
    "summary": "Cinco de Mayo",
    "start": {
      "date": "2022-05-05"
    },
    "end": {
      "date": "2022-05-06"
    },
  },
  {
    "summary": "Birthday Party",
    "start": {
      "dateTime": "2022-05-06T20:00:00-07:00"
    },
    "end": {
      "dateTime": "2022-05-06T23:00:00-07:00"
    },
    "description": "Don't forget to bring balloons",
    "location": "Brian's House"
  }
]
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  "http://localhost:8123/api/calendars/calendar.holidays?start=2022-05-01T07:00:00.000Z&end=2022-06-12T07:00:00.000Z"
```

</ApiEndpoint>

<ApiEndpoint path="/api/states/<entity_id>" method="post">

更新或创建一个 state。你可以创建任何你想要的 state，它不需要由 Home Assistant 中的 entity 支持。

:::info
此 endpoint 设置设备在 Home Assistant 内部的表示，不会与实际设备通信。要与设备通信，请使用 [POST /api/services/&lt;domain>/&lt;service>](#post-api-services-domain-service) endpoint。
:::

期望一个 JSON 对象，至少包含一个 state 属性：

```json
{
    "state": "below_horizon",
    "attributes": {
        "next_rising":"2016-05-31T03:39:14+00:00",
        "next_setting":"2016-05-31T19:16:42+00:00"
    }
}
```

如果 entity 已存在，返回码为 200；如果是新 entity 的 state 被设置，返回码为 201。将返回一个包含新资源 URL 的 location header。响应体将包含一个 JSON 编码的 State 对象。

```json
{
    "attributes": {
        "next_rising":"2016-05-31T03:39:14+00:00",
        "next_setting":"2016-05-31T19:16:42+00:00"
    },
    "entity_id": "sun.sun",
    "last_changed": "2016-05-30T21:43:29.204838+00:00",
    "last_updated": "2016-05-30T21:47:30.533530+00:00",
    "state": "below_horizon"
}
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"state": "25", "attributes": {"unit_of_measurement": "°C"}}' \
  http://localhost:8123/api/states/sensor.kitchen_temperature
```

使用 [Requests](https://requests.readthedocs.io/en/master/) 模块的示例 `python` 命令：

```shell
from requests import post

url = "http://localhost:8123/api/states/sensor.kitchen_temperature"
headers = {"Authorization": "Bearer TOKEN", "content-type": "application/json"}
data = {"state": "25", "attributes": {"unit_of_measurement": "°C"}}

response = post(url, headers=headers, json=data)
print(response.text)
```

</ApiEndpoint>

<ApiEndpoint path="/api/events/<event_type>" method="post">

以 `event_type` 触发一个 event。请注意 [Data Science portal](https://data.home-assistant.io/docs/events/#database-table) 上记录的数据结构。

你可以传递一个可选的 JSON 对象作为 `event_data`。

```json
{
    "next_rising":"2016-05-31T03:39:14+00:00",
}
```

如果成功，则返回一条消息。

```json
{
    "message": "Event download_file fired."
}
```

</ApiEndpoint>

<ApiEndpoint path="/api/services/<domain>/<service>" method="post">

在特定 domain 内调用一个 service。将在 service 执行完毕后返回。

你可以传递一个可选的 JSON 对象作为 `service_data`。

```json
{
    "entity_id": "light.Ceiling"
}
```

返回 service 执行期间发生变化的 states 列表，以及（如果 service 支持）可选的 response data。

```json
[
    {
        "attributes": {},
        "entity_id": "sun.sun",
        "last_changed": "2016-05-30T21:43:32.418320+00:00",
        "state": "below_horizon"
    },
    {
        "attributes": {},
        "entity_id": "process.Dropbox",
        "last_changed": "22016-05-30T21:43:32.418320+00:00",
        "state": "on"
    }
]
```

:::tip
结果将包括 service 执行期间发生的所有 state 变化，即使这些变化是由系统中其他事件引起的。
:::

如果你调用的 service 支持返回 response data，你可以通过在 URL 中添加 `?return_response` 来获取它。你的响应随后将同时包含已变化 entities 列表和 service response data。

```json
{
    "changed_states": [
        {
            "attributes": {},
            "entity_id": "sun.sun",
            "last_changed": "2024-04-22T20:45:54.418320-04:00",
            "state": "below_horizon"
        },
        {
            "attributes": {},
            "entity_id": "binary_sensor.dropbox",
            "last_changed": "2024-04-22T20:45:54.418320-04:00",
            "state": "on"
        }
    ],
    "service_response": {
        "weather.new_york_forecast": {
            "forecast": [
                {
                    "condition": "clear-night",
                    "datetime": "2024-04-22T20:45:55.173725-04:00",
                    "precipitation_probability": 0,
                    "temperature": null,
                    "templow": 6.0
                },
                {
                    "condition": "rainy",
                    "datetime": "2024-04-23T20:45:55.173756-04:00",
                    "precipitation_probability": 60,
                    "temperature": 16.0,
                    "templow": 4.0
                }
            ]
        }
    }
}
```

:::note
一些 services 不返回数据，一些可选择性地返回 response data，还有一些总是返回 response data。

如果你调用一个必须返回数据的 service 但没有使用 `return_response`，API 将返回 400。同样，如果你调用一个不返回任何数据的 service 但使用了 `return_response`，也会收到 400。
:::

示例 `curl` 命令：

打开灯：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"entity_id": "switch.christmas_lights"}' \
  http://localhost:8123/api/services/switch/turn_on
```

使用 [Requests](https://requests.readthedocs.io/en/master/) 模块的示例 `python` 命令：

打开灯：

```shell
from requests import post

url = "http://localhost:8123/api/services/light/turn_on"
headers = {"Authorization": "Bearer TOKEN"}
data = {"entity_id": "light.study_light"}

response = post(url, headers=headers, json=data)
print(response.text)
```

发送 MQTT 消息：

```shell
curl \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"payload": "OFF", "topic": "home/fridge", "retain": "True"}' \
  http://localhost:8123/api/services/mqtt/publish
```

获取每日天气预报信息：

```shell
curl \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"entity_id": "weather.forecast_home", "type": "daily"}' \
  http://localhost:8123/api/services/weather/get_forecasts?return_response
```

</ApiEndpoint>

<ApiEndpoint path="/api/template" method="post">

渲染一个 Home Assistant template。[更多信息请参阅 template 文档。](https://www.home-assistant.io/docs/configuration/templating)

```json
{
    "template": "Paulus is at {{ states('device_tracker.paulus') }}!"
}
```

以纯文本形式返回渲染后的 template。

```text
Paulus is at work!
```

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"template": "It is {{ now() }}!"}' http://localhost:8123/api/template
```

</ApiEndpoint>

<ApiEndpoint path="/api/config/core/check_config" method="post">

触发对 `configuration.yaml` 的检查。此请求无需传递额外数据。需要启用 config 集成。

如果检查成功，将返回以下内容：

```json
{
    "errors": null,
    "result": "valid"
}
```

如果检查失败，对象中的 errors 属性将列出导致检查失败的原因。例如：

```json
{
    "errors": "Integration not found: frontend:",
    "result": "invalid"
}
```

</ApiEndpoint>

<ApiEndpoint path="/api/intent/handle" method="post">

处理一个 intent。

你必须在 `configuration.yaml` 中添加 `intent:` 才能启用此 endpoint。

示例 `curl` 命令：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{ "name": "SetTimer", "data": { "seconds": "30" } }' \
  http://localhost:8123/api/intent/handle
```

</ApiEndpoint>

<ApiEndpoint path="/api/states/<entity_id>" method="delete">

删除具有指定 `entity_id` 的 entity。

示例 `curl` 命令：

```shell
curl \
  -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  http://localhost:8123/api/states/sensor.kitchen_temperature
```

</ApiEndpoint>