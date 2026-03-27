---
title: RESTful
description: 'RESTful 集成用于消费某个给定端点，该端点由设备、应用程序或 Web 服务通过 RESTful API(https://en.wikipedia.org/wiki/Representationalstatetransfer) 暴露。该传感器支持 GET 和 POST 请求。'
ha_category:
  - Binary sensor
  - Sensor
ha_release: 0.7.4
ha_iot_class: Local Polling
ha_domain: rest
ha_platforms:
  - binary_sensor
  - notify
  - sensor
  - switch
ha_integration_type: service
---
# RESTful

**RESTful** 集成用于消费某个给定端点，该端点由设备、应用程序或 Web 服务通过 [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) 暴露。该传感器支持 GET 和 POST 请求。

如果每个端点只有一个传感器，也可以将 [RESTful Sensor](/home-assistant/integrations/sensor.rest) 和 [RESTful Binary Sensor](/home-assistant/integrations/binary_sensor.rest) 作为平台进行设置。

```yaml
# Example configuration.yaml entry
rest:
  - authentication: basic
    username: "admin"
    password: "password"
    scan_interval: 60
    resource: http://192.168.1.12/status.xml
    sensor:
      - name: "Adult Pool Data System"
        json_attributes_path: "$.response.system"
        value_template: "OK"
        json_attributes:
          - "runstate"
          - "model"
          - "opmode"
          - "freeze"
          - "time"
          - "sensor1"
          - "sensor2"
          - "sensor3"
          - "sensor4"
          - "sensor5"
          - "version"
      - name: "Adult Pool Data Equipment"
        json_attributes_path: "$.response.equipment"
        value_template: "OK"
        json_attributes:
          - "circuit1"
          - "circuit2"
          - "circuit3"
          - "circuit4"
          - "circuit5"
          - "circuit6"
          - "circuit7"
          - "circuit8"
      - name: "Adult Pool Data Temp"
        json_attributes_path: "$.response.temp"
        value_template: "OK"
        json_attributes:
          - "htstatus"
          - "poolsp"
          - "spasp"
          - "pooltemp"
          - "spatemp"
          - "airtemp"
  - authentication: basic
    username: "admin"
    password: "password"
    scan_interval: 60
    resource: "http://192.168.1.13/status.xml"
    sensor:
      - name: "Kiddie Pool Data System"
        json_attributes_path: "$.response.system"
        value_template: "OK"
        json_attributes:
          - "runstate"
          - "model"
          - "opmode"
          - "freeze"
          - "time"
          - "sensor1"
          - "sensor2"
          - "sensor3"
          - "sensor4"
          - "version"
      - name: "Kiddie Pool Data Equipment"
        json_attributes_path: "$.response.equipment"
        value_template: "OK"
        json_attributes:
          - "circuit1"
          - "circuit2"
          - "circuit3"
          - "circuit4"
          - "circuit5"
          - "circuit6"
          - "circuit7"
          - "circuit8"
      - name: "Kiddie Pool Data Temp"
        json_attributes_path: "$.response.temp"
        value_template: "OK"
        json_attributes:
          - "htstatus"
          - "poolsp"
          - "spasp"
          - "pooltemp"
          - "spatemp"
          - "airtemp"
```

```yaml
resource:
  description: 包含数值的资源或端点。
  required: true
  type: string
resource_template:
  description: 支持模板的资源或端点，用于提供数值。
  required: true
  type: template
method:
  description: 请求方法，可为 `POST` 或 `GET`。
  required: false
  type: string
  default: GET
payload:
  description: 随 POST 请求发送的负载。具体取决于服务，但通常为 JSON 格式。
  required: false
  type: string
payload_template:
  description: 支持模板的 POST 请求负载。具体取决于服务，但通常为 JSON 格式。
  required: false
  type: template
verify_ssl:
  description: 是否验证端点的 SSL 证书。
  required: false
  type: boolean
  default: True
ssl_cipher_list:
  description: 从该端点接受的 SSL 加密套件列表。可选 `python_default`（_默认_）、`modern` 或 `intermediate`（_灵感来自 [Mozilla Security/Server Side TLS](https://wiki.mozilla.org/Security/Server_Side_TLS)_）。
  required: false
  type: string
  default: default
timeout:
  description: 等待端点返回数据的最长时间（秒）。如果超时，传感器将变为 `unavailable`。
  required: false
  type: integer
  default: 10
authentication:
  description: HTTP 认证类型。可选 `basic` 或 `digest`。
  required: false
  type: string
username:
  description: 用于访问 REST 端点的用户名。
  required: false
  type: string
password:
  description: 用于访问 REST 端点的密码。
  required: false
  type: string
headers:
  description: 请求头。
  required: false
  type: [list, template]
params:
  description: 请求的查询参数。
  required: false
  type: [list, template]
scan_interval:
  description: 调用 REST 端点的频率（秒）。
  required: false
  type: integer
  default: 30
encoding:
  description: 如果共享数据的响应头中未提供编码，则使用的字符编码。
  required: false
  type: string
  default: UTF-8
sensor:
  description: 从共享数据中创建的传感器列表。凡是上方未列出但 [RESTful Sensor](/home-assistant/integrations/sensor.rest#configuration-variables) 支持的配置项，也可在此使用。
  required: false
  type: list
binary_sensor:
  description: 从共享数据中创建的二进制传感器列表。凡是上方未列出但 [RESTful Binary Sensor](/home-assistant/integrations/binary_sensor.rest#configuration-variables) 支持的配置项，也可在此使用。
  required: false
  type: list
```

:::important
请使用 `resource` 或 `resource_template` 其中之一。

:::
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
