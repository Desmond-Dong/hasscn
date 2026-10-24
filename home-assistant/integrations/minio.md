# Minio

此集成添加了与 [Minio](https://min.io) 交互的能力。
它还支持监听存储桶通知：[参阅文档](https://docs.min.io/docs/minio-client-complete-guide.html#watch)

要下载或上传文件，相关文件夹必须添加到 [allowlist\_external\_dirs](/home-assistant/integrations/homeassistant/index.md#allowlist_external_dirs) 中。

## 配置

要在您的安装中启用 Minio 集成，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
minio:
  host: localhost
  port: 9000
  access_key: ACCESS_KEY
  secret_key: SECRET_KEY
  secure: false
```

```yaml
host:
  description: Minio 服务器主机名
  required: true
  type: string
port:
  description: Minio 服务器端口
  required: true
  type: integer
access_key:
  description: Minio 服务器访问密钥
  required: true
  type: string
secret_key:
  description: Minio 服务器密钥
  required: true
  type: string
secure:
  description: 是否使用 HTTP 或 HTTPS 连接
  required: true
  type: boolean
  default: false
listen:
  description: 要监听事件的配置列表
  required: false
  default: []
  type: list
  keys:
    bucket:
      description: 要使用的存储桶
      required: true
      type: string
    prefix:
      description: 用于过滤文件事件的前缀
      required: false
      type: string
      default: ""
    suffix:
      description: 用于过滤文件事件的文件后缀
      required: false
      type: string
      default: ".*"
    events:
      description: 要监听的事件类型
      required: false
      type: string
      default: "s3:ObjectCreated:*"
```

## 自动化

当 Minio 服务器上创建新文件时，可以触发自动化。

```yaml
#Automatically upload new local files
automation:
- alias: "Upload camera snapshot"
  triggers:
    - trigger: event
      event_type: folder_watcher
      event_data:
        event_type: created
  actions:
    - delay: "00:00:01"
    - action: minio.put
      data:
        file_path: "{{ trigger.event.data.path }}"
        bucket: "camera-image-object-detection"
        key: "input/{{ now().year }}/{{ (now().month | string).zfill(2) }}/{{ (now().day | string).zfill(2) }}/{{ trigger.event.data.file }}"
    - delay: "00:00:01"
    - action: shell_command.remove_file
      data:
        file: "{{ trigger.event.data.path }}"

- alias: "Download new Minio file"
  triggers:
    - trigger: event
      event_type: minio

  conditions: []
  actions:
    - action: minio.get
      data:
        bucket: "{{trigger.event.data.bucket}}"
        key: "{{trigger.event.data.key}}"
        file_path: "/tmp/{{ trigger.event.data.file_name }}"
```

## 操作

提供以下操作：

* `get`
* `put`
* `remove`

### 操作：Get

`minio.get` 操作用于从 Minio 存储中下载文件。

| Data attribute | Required | Description                        |
| ---------------------- | -------- | ---------------------------------- |
| `bucket`               | yes      | 要使用的存储桶                     |
| `key`                  | yes      | 文件的对象键                       |
| `file_path`            | yes      | 本地文件系统中的文件路径           |

### 操作：Put

`minio.put` 操作用于将文件上传到 Minio 存储。

| Data attribute | Required | Description                        |
| ---------------------- | -------- | ---------------------------------- |
| `bucket`               | yes      | 要使用的存储桶                     |
| `key`                  | yes      | 文件的对象键                       |
| `file_path`            | yes      | 本地文件系统中的文件路径           |

### 操作：Remove

`minio.remove` 操作用于从 Minio 存储中删除文件。

| Data attribute | Required | Description            |
| ---------------------- | -------- | ---------------------- |
| `bucket`               | yes      | 要使用的存储桶         |
| `key`                  | yes      | 文件的对象键           |
