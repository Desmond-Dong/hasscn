---
title: "RESTful Sensor"
description: 有关如何将 REST 传感器集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_release: 0.7.4
ha_iot_class: Local Polling
ha_domain: rest
---

**RESTful 传感器** 集成正在使用由设备、应用程序或 Web 服务的 [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) 公开的给定端点。传感器支持 GET 和 POST 请求。

_提示：_ 如果你想使用同一端点创建多个 `sensors`，请使用 [RESTful](/home-assistant/integrations/rest) 的配置说明。

要启用此传感器，请将以下行添加到“`configuration.yaml`”文件中以获取 GET 请求：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
```

或者对于 POST 请求：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
    method: POST
    payload: '{ "device" : "heater" }'
```

或基于模板的请求：


```yaml
# Example configuration.yaml entry
sensor:
  - platform: rest
    resource_template: http://IP_ADDRESS/{{ now().strftime('%Y-%m-%d') }}
    headers:
      Authorization: >
        Bearer {{ states("input_text.my_access_token") }}
    params:
      start_date: >
        {{ (now() - timedelta(days = 1)).strftime('%Y-%m-%d') }}
```


```yaml
authentication:
  description:  HTTP 身份验证的类型。 `basic` 或 `digest`。
  required: false
  type: string
availability:
  description: 定义实体状态是否可用的模板。
  required: false
  type: template
device_class:
  description: 设置 [class of the device](/home-assistant/integrations/sensor#device-class)，更改前端显示的设备状态和图标。
  required: false
  type: string
encoding:
  description: 如果共享数据的标头中未提供字符编码，则使用该字符编码。
  required: false
  type: string
  default: UTF-8
force_update:
  description: 即使值未更改，也会发送更新事件。如果您想在历史中获得有意义的价值图表，这很有用。
  required: false
  type: boolean
  default: false
headers:
  description: 请求的标头。
  required: false
  type: [template, list]
icon:
  description: 定义 REST 传感器图标的模板。
  required: false
  type: template
json_attributes:
  description: "从 JSON 字典结果中提取值然后设置为传感器属性的键列表。如果端点返回 `text/xml`、`application/xml` 或 `application/xhtml+xml` 内容类型的 XML，它将根据此 [specification](https://www.xml.com/pub/a/2006/05/31/converting-between-xml-and-json.html) 自动转换为 JSON"
  required: false
  type: [string, list]
json_attributes_path:
  description: 引用 JSON 内容中 `json_attributes` 位置的 [JSONPath](https://goessner.net/articles/JsonPath/)。
  required: false
  type: string
method:
  description: 请求的方法。 `POST` 或 `GET`。
  required: false
  type: string
  default: GET
name:
  description: 定义 REST 传感器名称的模板。
  required: false
  type: template
  default: REST Sensor
params:
  description: 请求的查询参数。
  required: false
  type: [template, list]  
password:
  description: 用于访问 REST 端点的密码。
  required: false
  type: string
payload:
  description: 通过 POST 请求发送的负载。取决于服务，但通常形成为 JSON。
  required: false
  type: string
picture:
  description: 定义REST传感器实体图片的模板。
  required: false
  type: template
resource:
  description: 包含该值的资源或端点。
  required: true
  type: string
resource_template:
  description: 包含具有模板支持的值的资源或端点。
  required: true
  type: template
scan_interval:
  description: 调用 REST 端点的频率（以秒为单位）。
  required: false
  type: integer
  default: 30
state_class:
  description: 传感器的[state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes)。
  required: false
  type: string
timeout:
  description: 定义在传感器标记为 `unavailable` 之前等待来自端点的数据的最长时间（以秒为单位）。
  required: false
  type: integer
  default: 10
unique_id:
  description: 唯一标识该实体的 ID。这允许从 Web 界面更改 `name`、`icon` 和 `entity_id`。
  required: false
  type: string
unit_of_measurement:
  description: 定义传感器的测量单位（如果有）。
  required: false
  type: string
username:
  description: 用于访问 REST 端点的用户名。
  required: false
  type: string
value_template:
  description: "定义 [template](/home-assistant/docs/configuration/templating/#processing-incoming-data) 来提取值。"
  required: false
  type: template
verify_ssl:
  description: 验证端点的 SSL 证书。
  required: false
  type: boolean
  default: True
```

:::important
使用 `resource` 或 `resource_template`。

:::
`curl` 可以帮助您识别要在 Home Assistant 前端显示的变量。下面的示例显示了运行 [aREST](https://arest.io/) 的设备的 JSON 响应。

```bash
$ curl -X GET http://192.168.1.31/temperature/
{"temperature": 77, "id": "sensor02", "name": "livingroom", "connected": true}
```

响应预计是一个字典或一个以字典作为第 0 个元素的列表。

### Using templates

For incoming data, a value template translates incoming JSON or raw data into a valid payload.
Incoming payloads are rendered with possible JSON values, so when rendering, the `value_json` variable can be used to access attributes in a JSON-based payload. Otherwise, the `value` variable can be used for non-JSON payloads.

The `this` variable can also be used in the template. The `this` attribute refers to the current [entity state](/home-assistant/docs/configuration/state_object) of the entity.
Further information about the `this` variable can be found in the [template documentation](/home-assistant/integrations/template/#template-and-action-variables).

:::note
**Example value template with JSON:**

With the following payload:

```json
{ "state": "ON", "temperature": 21.902 }
```

Template `{{ value_json.temperature | round(1) }}` renders to `21.9`.
:::

## 示例

在本节中，您将找到一些如何使用该传感器的现实示例。

### 外部IP地址

您可以使用 IPv4 和 IPv6 的 [ipify](https://www.ipify.org) 服务找到您的外部 IP 地址。


```yaml
sensor:
  - platform: rest
    name: "External IP"
    resource: "https://api.ipify.org/?format=json"
    value_template: "{{ value_json.ip }}"

  - platform: rest
    name: "External IPv6"
    resource: "https://api6.ipify.org/?format=json"
    value_template: "{{ value_json.ip }}"
```


### 来自本地 Glances 实例的单个值

[glances](/home-assistant/integrations/glances) 传感器对所有暴露的值执行完全相同的操作。


```yaml
sensor:
  - platform: rest
    resource: http://IP_ADRRESS:61208/api/2/mem/used
    name: Used mem
    value_template: "{{ value_json.used| multiply(0.000000954) | round(0) }}"
    unit_of_measurement: MB
```


### 来自另一个 Home Assistant 实例的值

家庭助理 [API](/home-assistant/developers/rest_api/) 公开来自连接的传感器的数据。如果您正在运行多个未连接的 Home Assistant 实例，您仍然可以从中获取信息。

如果资源变量中的 Home Assistant 实例受 API 密码保护，您可以将 `?api_password=YOUR_PASSWORD` 附加到资源 URL 来进行身份验证或使用 `headers:`。


```yaml
sensor:
  - platform: rest
    resource: http://IP_ADDRESS:8123/api/states/sensor.weather_temperature
    name: Temperature
    value_template: "{{ value_json.state }}"
    unit_of_measurement: "°C"
```


### 访问受 HTTP 身份验证保护的端点

REST 传感器支持 HTTP 身份验证和自定义标头。

```yaml
sensor:
  - platform: rest
    resource: http://IP_ADDRESS:5000/sensor
    username: ha1
    password: test1
    authentication: basic
    headers:
      User-Agent: Home Assistant
      Content-Type: application/json
```

标题将包含所有相关详细信息。这还将使您能够访问受令牌保护的端点。

```bash
Content-Length: 1024
Host: IP_ADDRESS1:5000
Authorization: Basic aGExOnRlc3Qx
Accept-Encoding: identity
Content-Type: application/json
User-Agent: Home Assistant
```

如果您要访问受 `Authorization` 标头中的 `Bearer` 令牌保护的资源，则可以将该令牌放入传感器配置的标头字段中（不推荐），或者将该令牌存储在 [`secrets.yaml`](/home-assistant/docs/configuration/secrets/) 文件中。在这种情况下，请务必在 `secrets` 文件中包含单词 `Bearer`。

```yaml
sensor:
  - platform: rest
    resource: http://IP_ADDRESS:5000/sensor
    headers:
      Authorization: !secret my_sensor_secret_token
```

`secrets.yaml` 文件的示例条目：

```yaml
my_sensor_secret_token: Bearer gh_DHQIXKVf6Pr4H8Yqz8uhApk_mnV6Zje6Pr4H8Yqz8A8nCxz6SBghQdS51
```

### 使用 GitHub 获取最新版本的 Home Assistant

此示例与 [`updater`](/home-assistant/integrations/updater/) 集成非常相似，但信息是从 GitHub 接收的。


```yaml
sensor:
  - platform: rest
    resource: https://api.github.com/repos/home-assistant/home-assistant/releases/latest
    username: YOUR_GITHUB_USERNAME
    password: YOUR_GITHUB_ACCESS_TOKEN
    authentication: basic
    value_template: "{{ value_json.tag_name }}"
    headers:
      Accept: application/vnd.github.v3+json
      Content-Type: application/json
      User-Agent: Home Assistant REST sensor
```


### 获取多个 JSON 属性并将它们呈现为值

[JSON Test](https://www.jsontest.com/) 返回自 [http://date.jsontest.com/](http://date.jsontest.com/) 纪元以来的当前时间、日期和毫秒数。


```yaml
rest:
  - resource: "http://date.jsontest.com/"
    sensor:
      - name: "Time"
        value_template: "{{ value_json.time }}"

      - name: "Date"
        value_template: "{{ value_json.date }}"

      - name: "Milliseconds"
        value_template: "{{ value_json.milliseconds_since_epoch }}"
```


[JSONPlaceholder](https://jsonplaceholder.typicode.com/)提供示例JSON数据用于测试。在下面的示例中，JSONPath 查找 JSON 文档中的属性。 [JSONPath Online Evaluator](https://jsonpath.com/) 提供了一个测试 JSONPath 的工具。如果端点返回 XML，则在搜索属性之前将使用 `xmltodict` 将其转换为 JSON。您可能会发现此 [XML to JSON Converter](https://www.freeformatter.com/xml-to-json-converter.html) 对于测试 XML 如何转换为 JSON 很有帮助。


```yaml
sensor:
  - platform: rest
    name: JSON users
    json_attributes_path: "$.[0].address"
    json_attributes:
      - street
      - suite
      - city
      - zipcode
    resource: https://jsonplaceholder.typicode.com/users
    value_template: "{{ value_json[0].name }}"
```


此示例从 [OpenWeatherMap](https://openweathermap.org/) 获取天气报告，将结果数据映射到 RESTful 传感器的属性，然后创建一组 [template](/home-assistant/integrations/template) 传感器来监视属性并以可用的形式显示值。


```yaml
rest:
  - resource: "https://api.openweathermap.org/data/2.5/weather?zip=80302,us&APPID=VERYSECRETAPIKEY"
    sensor:
      - name: "Report"
        value_template: "{{ value_json['weather'][0]['description'].title() }}"
        picture: "{{ 'https://openweathermap.org/img/w/' + value_json['weather'][0]['icon'].lower() + '.png' }}"

      - name: "Outside temp"
        value_template: "{{ value_json['main']['temp'] - 273.15 }}"
        unit_of_measurement: "°C"

      - name: "Outside pressure"
        value_template: "{{ value_json['main']['pressure'] }}"
        unit_of_measurement: "hP"

      - name: "Outside humidity"
        value_template: "{{ value_json['main']['humidity'] }}"
        unit_of_measurement: "%"
```


此配置展示了如何从字典中提取多个值。此方法可避免 REST 服务泛滥，因为结果仅请求一次。根据该单个请求，可以使用模板传感器创建多个传感器。


```json
{
    "bedroom1": {
        "temperature": 15.79,
        "humidity": 55.78,
        "battery": 5.26,
        "timestamp": "2019-02-27T22:21:37Z"
    },
    "bedroom2": {
        "temperature": 18.99,
        "humidity": 49.81,
        "battery": 5.08,
        "timestamp": "2019-02-27T22:23:44Z"
    },
    "bedroom3": {
        "temperature": 18.58,
        "humidity": 47.95,
        "battery": 5.15,
        "timestamp": "2019-02-27T22:21:22Z"
    }
}
```


```yaml
rest:
    resource: "http://<address_to_rest_service>"
    sensor:
      - name: "Bedroom1 Temperature"
        value_template: "{{ value_json['bedroom1']['temperature'] }}"
        device_class: temperature
        unit_of_measurement: "°C"
      - name: "Bedroom1 Humidity"
        value_template: "{{ value_json['bedroom1']['humidity'] }}"
        device_class: humidity
        unit_of_measurement: "%"
      - name: "Bedroom1 Battery"
        value_template: "{{ value_json['bedroom1']['battery'] }}"
        device_class: battery
        unit_of_measurement: "V"
      - name: "Bedroom2 Temperature"
        value_template: "{{ value_json['bedroom2']['temperature'] }}"
        device_class: temperature
        unit_of_measurement: "°C"
```


下面的示例展示了如何从 Steamist Steambath Wi-Fi 接口的 XML 文件中的字典中提取多个值。这些值用于创建多个传感器，而无需多次轮询端点。


```yaml
rest:
  # Steam Controller
  - resource: "http://192.168.1.105/status.xml"
    scan_interval: 15
  
    sensor:
      - name: "Steam Temp"
        value_template: "{{ value_json['response']['temp0'] | regex_findall_index('([0-9]+)XF') }}"
        unit_of_measurement: "°F"

       steam_time_remaining:
      - name: "Steam Time Remaining"
        value_template: "{{ value_json['response']['time0'] }}"
        unit_of_measurement: "minutes"

rest_command:  
  set_steam_led:
    url: http://192.168.1.105/leds.cgi?led={{ led }}
```


作为参考，上面示例中端点的 XML 内容如下：

```xml
<?xml version="1.0" encoding="utf-8"?>

 <response>
 	<scan>0</scan>
	<ver>12556</ver>
	<count>48</count>
	<ssid>alexander</ssid>
	<bss>
		<valid>0</valid>
		<name>0</name>
		<privacy>0</privacy>
		<wlan>0</wlan>
		<strength>0</strength>
	</bss>
	<led0>0</led0>
	<led1>0</led1>
	<led2>0</led2>
	<led3>0</led3>
	<led4>0</led4>
	<led5>0</led5>
	<led6>0</led6>
	<led7>0</led7>
	<btn0>up</btn0>
	<btn1>up</btn1>
	<btn2>up</btn2>
	<btn3>up</btn3>
	<pot0>0</pot0>
	<usr0>0</usr0>
	<temp0>0x73XF0x73XF</temp0>
	<time0> 0</time0>
 </response>
```
