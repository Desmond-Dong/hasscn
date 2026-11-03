# RESTful binary sensor

**RESTful 二值传感器**集成使用设备、应用程序或 Web 服务通过 [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) 提供的端点。该二值传感器支持 GET 和 POST 请求。

*提示：* 如果您想使用同一个端点创建多个 `sensors`，请参考 [RESTful](/home-assistant/integrations/rest.md) 配置说明。

如果端点返回以下值对之一：`0`/`1`、`"0"`/`"1"`、`FALSE`/`TRUE`、`false`/`true`、`off`/`on` 或 `closed`/`open`，则可以直接使用。如果返回值不同，请使用[模板](/home-assistant/docs/configuration/templating/index.md#processing-incoming-data)。如果端点返回内容类型为 `text/xml`、`application/xml` 或 `application/xhtml+xml` 的 XML，它将根据此[规范](https://www.xml.com/pub/a/2006/05/31/converting-between-xml-and-json.html)自动转换为 JSON。

```json
{
    "name": "Binary sensor",
    "state": {
        "open": "true",
        "timestamp": "2016-06-20 15:42:52.926733"
    }
}
```

## 配置

要启用此传感器，请将以下行添加到您的 "`configuration.yaml`" 文件中以进行 GET 请求：

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
```

或进行 POST 请求：

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
    method: POST
```

或基于模板的请求：

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rest
    resource_template: "http://IP_ADDRESS/{{ now().strftime('%Y-%m-%d') }}"
```

```yaml
resource:
  description: 包含值的资源或端点。
  required: true
  type: string
  default: string
resource_template:
  description: 包含值的资源或端点，支持模板。
  required: false
  type: template
method:
  description: 请求的方法。
  required: false
  type: string
  default: GET
name:
  description: REST 二值传感器的名称。
  required: false
  type: template
  default: REST Binary Sensor
icon:
  description: 定义实体图标的模板。
  required: false
  type: template
picture:
  description: 定义实体图片的模板。
  required: false
  type: template
availability:
  description: 定义实体状态是否可用的模板。
  required: false
  type: template
device_class:
  description: 设置[设备类别](/home-assistant/integrations/binary_sensor/#device-class)，更改前端显示的设备状态和图标。
  required: false
  type: string
value_template:
  description: >
    定义一个[模板](/home-assistant/docs/configuration/templating/#processing-incoming-data)来提取值。
  required: false
  type: template
payload:
  description: 使用 POST 请求发送的负载。通常以字典形式组成。
  required: false
  type: string
unique_id:
  description: 唯一标识此实体的 ID。这允许从 Web 界面更改 `name`、`icon` 和 `entity_id`。
  required: false
  type: string
verify_ssl:
  description: 验证端点的证书。
  required: false
  type: boolean
  default: true
timeout:
  description: 定义从端点等待数据的最大时间。
  required: false
  type: integer
  default: 10
authentication:
  description: "HTTP 认证类型。`basic` 或 `digest`。"
  required: false
  type: string
username:
  description: 访问 REST 端点的用户名。
  required: false
  type: string
password:
  description: 访问 REST 端点的密码。
  required: false
  type: string
headers:
  description: 请求的标头。
  required: false
  type: [list, template]
params:
  description: 请求的查询参数。
  required: false
  type: [list, template]
```

### Using templates

For incoming data, a value template translates incoming JSON or raw data into a valid payload.
Incoming payloads are rendered with possible JSON values, so when rendering, the `value_json` variable can be used to access attributes in a JSON-based payload. Otherwise, the `value` variable can be used for non-JSON payloads.

The `this` variable can also be used in the template. The `this` attribute refers to the current [entity state](/home-assistant/docs/configuration/state_object.md) of the entity.
Further information about the `this` variable can be found in the [template documentation](/home-assistant/integrations/template/index.md#template-and-action-variables).

:::note
**Example value template with JSON:**

With the following payload:

```json
{ "state": "ON", "temperature": 21.902 }
```

Template `{{ value_json.temperature | round(1) }}` renders to `21.9`.
:::

## 示例

在本节中，您将找到一些使用此传感器的实际示例。

### aREST 传感器

不使用 [aREST](/home-assistant/integrations/arest.md#binary-sensor) 二值传感器，您可以直接使用 REST 二值传感器检索支持 aREST 的设备的值。

```yaml
binary_sensor:
  - platform: rest
    resource: http://192.168.0.5/digital/9
    method: GET
    name: Light
    device_class: light
    value_template: '{{ value_json.return_value }}'
```

### 访问受 HTTP 认证保护的端点

REST 传感器支持 HTTP 认证和支持模板的自定义标头。

```yaml
binary_sensor:
  - platform: rest
    resource: http://IP_ADDRESS:5000/binary_sensor
    username: ha1
    password: test1
    authentication: basic
    headers:
      User-Agent: Home Assistant
      Content-Type: application/json
      X-Custom-Header: '{{ states("input_text.the_custom_header") }}'
```

标头将包含所有相关详细信息。这也使您能够访问受令牌保护的端点。

```bash
Content-Length: 1024
Host: IP_ADDRESS1:5000
Authorization: Basic aGExOnRlc3Qx
Accept-Encoding: identity
Content-Type: application/json
User-Agent: Home Assistant
```
