# RESTful Command

此集成可以将常规 REST 命令暴露为操作。操作可以从 [script] 或 [automation] 中调用。

[script]: /integrations/script/

[automation]: /getting-started/automation/

要使用此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
rest_command:
  example_request:
    url: "http://example.com/"
```

```yaml
service_name:
  description: 用于暴露该操作的名称。例如，在上方示例中，它将是 `rest_command.example_request`。
  required: true
  type: map
  keys:
    url:
      description: 发送请求的 URL（支持模板）。
      required: true
      type: template
    method:
      description: 要使用的 HTTP 方法（get、patch、post、put 或 delete）。
      required: false
      default: get
      type: string
    headers:
      description: 请求头。
      required: false
      type: map
    payload:
      description: 随请求发送的字符串/模板。
      required: false
      type: template
    authentication:
      description: HTTP 认证类型，可为 `basic` 或 `digest`。
      required: false
      type: string
      default: basic
    username:
      description: 用于 HTTP 认证的用户名。
      required: false
      type: string
    password:
      description: 用于 HTTP 认证的密码。
      required: false
      type: string
    timeout:
      description: 请求超时时间（秒）。
      required: false
      type: string
      default: 10
    content_type:
      description: 请求的内容类型。
      required: false
      type: string
    verify_ssl:
      description: 验证端点的 SSL 证书。
      required: false
      type: boolean
      default: true
    insecure_cipher:
      description: 允许请求使用不安全的加密套件。这对于不支持现代加密套件的旧服务器/设备很有用。
      required: false
      type: boolean
      default: false
    skip_url_encoding:
      description: 跳过内部 URL 规范化处理。默认情况下，这会使用 [IDNA](https://docs.aiohttp.org/en/stable/glossary.html#term-IDNA) 编码处理 _host_ 部分，并对 _path_ 和 _query_ 部分执行 [requoting](https://docs.aiohttp.org/en/stable/glossary.html#term-requoting)。
      required: false
      type: boolean
      default: false
```

## 示例

### 使用 PUT 方法和表单编码负载的基本示例

此示例实现了 2 个 REST 命令，用于为 iTunes 集成补充缺失的随机播放功能操作。

```yaml
rest_command:
  shuffle_on: 
    url: "http://YOUR_ITUNES-API_SERVER_IP:8181/shuffle"
    method: put
    content_type: "application/x-www-form-urlencoded"
    payload: "mode=songs"
  shuffle_off: 
    url: "http://YOUR_ITUNES-API_SERVER_IP:8181/shuffle"
    method: put
    content_type: "application/x-www-form-urlencoded"
    payload: "mode=off"
```

### 使用 digest 认证

此示例展示了如何在 REST 命令中使用 digest 认证：

```yaml
rest_command:
  secured_command:
    url: "http://example.com/api/secure-endpoint"
    method: post
    authentication: digest
    username: "your_username"
    password: "your_password"
    payload: '{"data": "example"}'
    content_type: "application/json"
```

### 在自动化中使用 REST 命令响应

REST 命令会以字典形式返回操作响应，其中包含 `status`（HTTP 响应码）、`content`（文本或 JSON 格式的响应体）以及 `headers`（响应头）。
在自动化中，您可以使用 [`response_variable`](/home-assistant/docs/scripts/perform-actions.md#use-templates-to-handle-response-data) 访问该响应。

以下示例展示了如何在自动化中使用 REST 命令响应。在这个场景中，用它检查 [Traefik API](https://doc.traefik.io/traefik/operations/api/) 是否存在错误。

```yaml
# Create a ToDo notification based on file contents
automation:
  - alias: "Check API response"
    triggers:
      - ...
    actions:
      - action: rest_command.traefik_get_rawdata
        response_variable: traefik_response
      - if: "{{ traefik_response['status'] == 200 }}"
        then:
          - alias: "Parse data"
            variables:
              routers: "{{ traefik_response['content']['routers'] }}"
              router_errors: >
                {%- for router in routers -%}
                  {%- if 'error' in routers[router] -%}
                    {{router}}: {{ routers[router]['error'] }}
                  {% endif -%}
                {%- endfor -%}
              got_errors: "{{ router_errors|length > 0 }}"
          - if: "{{ got_errors }}"
            then:
              - action: notify.mobile_app_iphone
                data:
                  title: "Traefik errors"
                  message: "{{ router_errors }}"
        else:
          - action: notify.mobile_app_iphone
            data:
              title: "Could not reach Traefik"
              message: "HTTP code: {{ traefik_response['returncode'] }}"

rest_command:
  traefik_get_rawdata:
    url: http://127.0.0.1:8080/api/rawdata
    method: GET
```

### 使用模板根据实体变化调整负载

这些命令可以是动态的，您可以使用模板插入其他实体的值。操作支持变量，以便配合模板完成此类用法。

此示例使用 [templates](/home-assistant/docs/configuration/templating/index.md) 构造动态参数。

```yaml
# Example configuration.yaml entry
rest_command:
  my_request:
    url: https://slack.com/api/users.profile.set
    method: POST
    headers:
      authorization: !secret rest_headers_secret
      accept: "application/json, text/html"
      user-agent: 'Mozilla/5.0 {{ useragent }}'
    payload: '{"profile":{"status_text": "{{ status }}","status_emoji": "{{ emoji }}"}}'
    content_type:  'application/json; charset=utf-8'
    verify_ssl: true
```

### 如何测试新的 REST 命令

可以在侧边栏的 [developer tools](/home-assistant/docs/tools/dev-tools/index.md) 中调用这个新操作，并传入如下 `data`：

```json
{
  "status":"My Status Goes Here",
  "emoji":":plex:"
}
```

### 在自动化中将 REST 命令作为操作使用

```yaml
automation:
- alias: "Arrive at Work"
  triggers:
    - trigger: zone
      entity_id: device_tracker.my_device
      zone: zone.work
      event: enter
  actions:
    - action: rest_command.my_request
      data:
        status: "At Work"
        emoji: ":calendar:"
```
