---
title: Signal Messenger
description: 有关如何将 Signal Messenger 集成到 Home Assistant 中的说明。
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.104
ha_codeowners:
  - '@bbernhard'
ha_domain: signal_messenger
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Signal Messenger** 集成使用 [Signal Messenger REST API](https://github.com/bbernhard/signal-cli-rest-api)，将 Home Assistant 的通知发送到您的 Android 或 iOS 设备。

## 设置

要求如下：

- 您需要先设置好 Signal Messenger REST API。
- 您需要一个可用于注册 Signal Messenger 服务的备用手机号。

请按照这些[说明](https://github.com/bbernhard/signal-cli-rest-api/blob/master/doc/HOMEASSISTANT.md)设置 Signal Messenger REST API。

## 配置

要让 Home Assistant 发送 Signal Messenger 通知，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Signal Messenger 的 configuration.yaml 示例条目
notify:
  - name: signal
    platform: signal_messenger
    url: "http://127.0.0.1:8080" # Signal Messenger REST API 监听的 URL
    number: "YOUR_PHONE_NUMBER" # 发送方号码
    recipients: # 一个或多个默认接收者（可在单条消息中覆盖）
      - "RECIPIENT1"
```

默认 `recipients` 列表中既可以添加电话号码，也可以添加 Signal Messenger 群组。
但是，单个通知器中不能同时混用电话号码和 Signal Messenger 群组。
如果您希望默认 `recipients` 列表中同时包含个人电话号码和 Signal Messenger 群组，
则需要分别创建多个通知器。

要获取 Signal Messenger 群组 ID，请参考[这份指南](https://github.com/bbernhard/signal-cli-rest-api/blob/master/doc/HOMEASSISTANT.md)。

```yaml
name:
  description: 设置可选参数 `name` 可创建多个通知器。该通知器会绑定到 `notify.NOTIFIER_NAME` 操作。
  required: false
  type: string
  default: notify
url:
  description: Signal Messenger REST API 监听传入请求的 URL。
  required: true
  type: string
number:
  description: 发送方号码。
  required: true
  type: string
recipients:
  description: 默认接收者列表（电话号码或 Signal Messenger 群组 ID）。可在单条消息中覆盖。
  required: true
  type: list
  items:
    type: string
```


## 通知操作

### Examples

以下是一些在自动化中使用此集成发送通知的示例。

#### 文本消息

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      message: "That's an example that sends a simple text message to the recipients specified in the configuration.yaml. If text mode is 'styled', you can use *italic*, **bold** or ~strikethrough~ ."
      # optional: custom recipients list
      target:
        - '+4917011111111'
      # optional: formatted mode
      data:
        text_mode: styled
```

| Attribute | Optional   | Default                                         | Description                                                                                                       |
|-----------|------------|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| target    | *optional* | as configured via `recipients` for the `notify` | a list of strings, containing either fully qualified phone numbers (including country prefix) or Signal group IDs |

| Data Attribute | Optional | Default |Description                                                                                                                                                                                          |
|----------------| -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text_mode`    | *optional* | normal | Accepted values are `normal` or `styled`. If set to `styled`, additional text formatting is enabled (*`*italic*`*, **`**bold**`**, and ~~`~strikethrough~`~~). |

#### 带附件的文本消息

本示例假设您已在 Home Assistant Operating System 默认的 `www` 文件夹中存放了一张图片。

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      message: "Alarm in the living room!"
      data:
        attachments:
          - "/config/www/surveillance_camera.jpg"
        text_mode: styled
```

| Data attribute   | Optional | Default |Description                                                                                                                                                                                          |
| ----------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `attachments` | **required** | -  | List of paths of files to be attached. |
| `text_mode` | *optional* | normal | Accepted values are `normal` or `styled`. If set to `styled`, additional text formatting is enabled (*`*italic*`*, **`**bold**`**, and ~~`~strikethrough~`~~). |

#### 带 URL 附件的文本消息

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      message: "Person detected on Front Camera!"
      data:
        verify_ssl: false
        urls:
          - "http://homeassistant.local/api/frigate/notifications/<event-id>/thumbnail.jpg"
        text_mode: styled
```

| Data attribute   | Optional | Default |Description                                                                                                                                                                                          |
| ----------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `urls` | **required** | -  | List of URLs of files to be attached. |
| `verify_ssl` | *optional* | true  | Accepted values are `true`, `false`. You can set it to `false` to ignore SSL errors. |
| `text_mode` | *optional* | normal | Accepted values are `normal` or `styled`. If set to `styled`, additional text formatting is enabled (*`*italic*`*, **`**bold**`**, and ~~`~strikethrough~`~~). |

**注意：**

- 要附加 Home Assistant 外部的文件，这些 URL 必须可访问，并加入 [`allowlist_external_urls`](/home-assistant/integrations/homeassistant/#allowlist_external_urls) 列表。

- 通过 URL 获取的附件大小上限为 50MB。

## 发送消息到 Signal 以触发事件

您可以将 Signal Messenger REST API 用作 Home Assistant 的触发器。在下面的示例中，我们会构建一个简单的聊天机器人。如果您向绑定到 Signal Messenger REST API 的 Signal 账户发送任意消息，只要号码（属性 `source`）匹配，自动化就会被触发，并回发一条内容为 `Message received!` 的 Signal 通知。

为实现这一点，请确保插件的 `mode` 参数设置为 `native` 或 `normal`，然后编辑 Home Assistant 配置，按如下方式添加一个 [RESTful resource](/home-assistant/integrations/rest/)：

```yaml
- resource: "http://127.0.0.1:8080/v1/receive/<number>"
  headers:
    Content-Type: application/json
  sensor:
    - name: "Signal message received"
      value_template: "{{ value_json[0].envelope.dataMessage.message }}" # 这会提取消息内容
      json_attributes_path: $[0].envelope
      json_attributes:
        - source # 使用属性可获取额外信息，这里是手机号。
  ```

您可以像下面这样创建自动化：

```yaml
...
triggers:
  - trigger: state
    entity_id:
      - sensor.signal_message_received
    attribute: source
    to: "<yournumber>"
actions:
  - action: notify.signal
    data:
      message: "Message received!"
```

**NOTE** 如果插件的 `mode` 参数设置为 `json-rpc`，则可在 Home Assistant 配置中使用 [signal-api-receiver](https://github.com/kalbasit/signal-api-receiver) 按如下方式接收来自 Signal 的消息：

```yaml
- resource: "http://127.0.0.1:8105/receive/pop"
  sensor:
    - name: "Signal message received"
      value_template: >
        {{ value_json['envelope']['dataMessage']['message'] }}
      json_attributes_path: envelope
      json_attributes:
        - source
        - sourceNumber
        - sourceUuid
        - sourceDevice
        - timestamp
```
