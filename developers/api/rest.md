# REST API

import ApiEndpoint from '@site/static/js/api\_endpoint.jsx'

Home Assistant 在与 Web 前端相同的端口上提供 REST API（默认端口为 8123）。

如果你的配置中未使用 [`frontend`](https://www.home-assistant.io/integrations/frontend/)，则需要在 `configuration.yaml` 中添加 [`api` 集成](https://www.home-assistant.io/integrations/api/)。

* `http://IP_ADDRESS:8123/` 是控制 Home Assistant 的界面。
* `http://IP_ADDRESS:8123/api/` 是 REST API。

该 API 只接受并返回 JSON 编码对象。

所有 API 调用都必须带上 `Authorization: Bearer TOKEN` 请求头，其中 `TOKEN` 需替换为你的唯一访问令牌。你可以在浏览器登录前端后，进入 [个人资料](https://www.home-assistant.io/docs/authentication/#your-account-profile) 页面 `http://IP_ADDRESS:8123/profile` 获取该令牌（Long-Lived Access Token）。请注意完整复制整个密钥。

调用 Home Assistant REST API 有多种方式，其中一种是使用 `curl`：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  http://IP_ADDRESS:8123/ENDPOINT
```

另一种方式是使用 Python 与 [Requests](https://requests.readthedocs.io/en/latest/) 模块。

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

还可以在 Home Assistant 自动化或脚本中使用 [RESTful Command integration](https://www.home-assistant.io/integrations/rest_command/)。

```yaml
turn_light_on:
  url: http://localhost:8123/api/states/light.study_light
  method: POST
  headers:
    authorization: 'Bearer TOKEN'
    content-type: 'application/json'
  payload: '{"state":"on"}'
```

成功调用将返回状态码 200 或 201。还可能返回以下状态码：

* 400 (Bad Request)
* 401 (Unauthorized)
* 404 (Not Found)
* 405 (Method Not Allowed)

### 操作

该 API 支持以下操作：

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

注意：请确保包含末尾的 `/`，完整路径是 `/api/`，不是 `/api`。

</ApiEndpoint>

<ApiEndpoint path="/api/config" method="get">

以 JSON 形式返回当前配置。

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

返回当前已加载组件的列表。

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

返回事件对象数组。每个事件对象都包含事件名称和监听器数量。

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

返回服务对象数组。每个对象都包含所属 domain 以及它包含的服务。

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

返回过去一段时间内的状态变化数组。每个对象都包含对应实体的详细信息。

`<timestamp>`（`YYYY-MM-DDThh:mm:ssTZD`）是可选参数，默认为请求时间前 1 天，用于确定时间区间的起点。

以下参数为**必填**：

* `filter_entity_id=<entity_ids>`：按一个或多个实体过滤，多个实体使用逗号分隔。

你还可以传入以下可选 GET 参数：

* `end_time=<timestamp>`：以 URL 编码格式指定时间区间的结束时间（默认持续 1 天）。
* `minimal_response`：除首尾状态外，仅返回 `last_changed` 和 `state`（速度更快）。
* `no_attributes`：不返回数据库中的 attributes（速度更快）。
* `significant_changes_only`：仅返回显著状态变化。

不使用 `minimal_response` 的示例

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

使用 `minimal_response` 的示例

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
# History of the entity 'sensor.temperature' of the past day (default)
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  "http://localhost:8123/api/history/period?filter_entity_id=sensor.temperature"
```

```shell
# Minimal history of the entity 'sensor.temperature' and 'sensor.kitchen_temperature' of the past day where the beginning date is set manually to 2023-09-04
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  "http://localhost:8123/api/history/period/2023-09-04T00:00:00+02:00?filter_entity_id=sensor.temperature,sensor.kitchen_temperature&minimal_response"
```

```shell
# History of the entity 'sensor.temperature' during the period from 2021-09-04 to 2023-09-04
# Using URL encoded timestamps
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  "http://localhost:8123/api/history/period/2021-09-04T00%3A00%3A00%2B02%3A00?end_time=2023-09-04T00%3A00%3A00%2B02%3A00&filter_entity_id=sensor.temperature"
```

</ApiEndpoint>

<ApiEndpoint path="/api/logbook/<timestamp>" method="get">

返回日志簿条目数组。

`<timestamp>`（`YYYY-MM-DDThh:mm:ssTZD`）是可选参数，默认为请求时间前 1 天，用于确定时间区间的起点。

你还可以传入以下可选 GET 参数：

* `entity=<entity_id>`：按单个实体进行过滤。
* `end_time=<timestamp>`：以 URL 编码格式指定从 `<timestamp>` 开始这段时间范围的结束时间。

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

返回状态对象数组。每个状态都包含以下属性：`entity_id`、`state`、`last_changed` 和 `attributes`。

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

返回指定 `entity_id` 的状态对象；若不存在则返回 404。

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

以纯文本响应的形式获取 Home Assistant 当前会话期间记录的所有错误。

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

返回指定摄像头 `entity_id` 的数据（图像）。

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

返回日历实体列表。

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

返回指定日历 `entity_id` 在 `start` 与 `end` 之间（不含边界）的 [calendar events](/developers/core/entity/calendar.md#calendarevent) 列表。

响应中的事件会包含 `start` 和 `end` 字段；对于全天事件，其中会使用 `date`，否则使用 `dateTime`。

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

更新或创建一个状态。你可以创建任意状态，它不一定需要对应 Home Assistant 中的实际实体。

:::info
该端点仅会设置设备在 Home Assistant 中的表示状态，不会与真实设备通信。如需与设备通信，请使用 [POST /api/services/\<domain>/\<service>](#post-apiservicesltdomainltservice) 端点。
:::

请求体应为一个至少包含 `state` 属性的 JSON 对象：

```json
{
    "state": "below_horizon",
    "attributes": {
        "next_rising":"2016-05-31T03:39:14+00:00",
        "next_setting":"2016-05-31T19:16:42+00:00"
    }
}
```

如果实体已存在，则返回状态码 200；如果设置了一个新实体的状态，则返回 201。响应还会通过 `Location` 头返回新资源的 URL，响应体则包含 JSON 编码的 State 对象。

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

使用 [Requests](https://requests.readthedocs.io/en/master/) 模块的 Python 示例：

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

触发一个 `event_type` 对应的事件。请留意数据结构，并参考我们的 [Data Science portal](https://data.home-assistant.io/docs/events/#database-table) 文档。

你可以传入一个可选 JSON 对象，作为 `event_data`。

```json
{
    "next_rising":"2016-05-31T03:39:14+00:00",
}
```

成功时返回一条消息。

```json
{
    "message": "Event download_file fired."
}
```

</ApiEndpoint>

<ApiEndpoint path="/api/services/<domain>/<service>" method="post">

调用指定 domain 下的服务。服务执行完成后返回。

你可以传入一个可选 JSON 对象，作为 `service_data`。

```json
{
    "entity_id": "light.Ceiling"
}
```

返回服务执行期间发生变化的状态列表；如果该服务支持，还会额外返回响应数据。

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
结果中会包含服务执行期间发生变化的所有状态，即使这些变化实际上是由系统中的其他事件引起的。
:::

如果你调用的服务支持返回响应数据，可以在 URL 后加上 `?return_response`。这样响应中会同时包含变更实体列表和服务返回的数据。

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
有些服务不会返回数据，有些服务可选返回响应数据，还有些服务则始终返回响应数据。

如果调用一个必须返回数据的服务时未使用 `return_response`，API 会返回 400；同样地，如果对一个不返回数据的服务使用了 `return_response`，也会收到 400。
:::

示例 `curl` 命令：

打开灯光：

```shell
curl \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"entity_id": "switch.christmas_lights"}' \
  http://localhost:8123/api/services/switch/turn_on
```

使用 [Requests](https://requests.readthedocs.io/en/master/) 模块的 Python 示例：

打开灯光：

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

渲染一个 Home Assistant 模板。[更多信息见模板文档。](https://www.home-assistant.io/docs/configuration/templating)

```json
{
    "template": "Paulus is at {{ states('device_tracker.paulus') }}!"
}
```

以纯文本形式返回渲染后的模板。

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

触发对 `configuration.yaml` 的检查。该请求无需额外数据，但需要启用 config 集成。

检查成功时将返回：

```json
{
    "errors": null,
    "result": "valid"
}
```

检查失败时，对象中的 `errors` 属性会列出导致失败的原因，例如：

```json
{
    "errors": "Integration not found: frontend:",
    "result": "invalid"
}
```

</ApiEndpoint>

<ApiEndpoint path="/api/intent/handle" method="post">

处理一个意图。

你必须在 `configuration.yaml` 中添加 `intent:` 才能启用该端点。

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

删除指定 `entity_id` 的实体。

示例 `curl` 命令：

```shell
curl \
  -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  http://localhost:8123/api/states/sensor.kitchen_temperature
```

</ApiEndpoint>
