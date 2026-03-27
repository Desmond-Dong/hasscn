---
title: IMAP
description: 'IMAP 集成会监视你的 IMAP 服务器(https://en.wikipedia.org/wiki/InternetMessageAccessProtocol)。它可以报告未读邮件数量，并发送可用于触发自动化的自定义事件。你也可以使用其他搜索条件，下面的示例中有展示。'
ha_category:
  - Mailbox
ha_release: 0.25
ha_iot_class: Cloud Push
ha_domain: imap
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@jbouwh'
ha_config_flow: true
---
# IMAP

**IMAP** 集成会监视你的 [IMAP 服务器](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol)。它可以报告未读邮件数量，并发送可用于触发自动化的自定义事件。你也可以使用其他搜索条件，下面的示例中有展示。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 使用应用专用密码的 IMAP 服务

### Microsoft 365 和 Live IMAP 服务

微软已移除在未使用现代验证时，通过应用专用密码直接访问 IMAP 的支持。你仍然可以创建应用专用密码，但只有经微软授权、支持 OAUTH2 的邮件客户端，或通过 Microsoft Entra ID（学校或企业）中的应用注册，才允许访问。

IMAP 集成不支持 OAUTH2 认证流程。这意味着 Home Assistant 的 IMAP 集成目前无法用于学校和企业版 Microsoft 365 IMAP 服务，也无法用于免费的个人 Microsoft Live IMAP 服务。

### Google Gmail IMAP 服务

如果你要使用 Gmail，必须先为 Gmail 帐号启用两步验证。启用后，你需要创建一个[应用专用密码](https://support.google.com/mail/answer/185833)。

1. 前往你的 [Google Account](https://myaccount.google.com/)
2. 选择 **Security**。
3. 在 “How you sign into Google” 下选择 **2-Step Verification**。
4. 登录你的 Google 帐号。
5. 在两步验证页面底部，点击 **App Passwords**。
6. 为应用取一个你能识别的名称（例如 `Home Assistant IMAP`）。
7. 点击 **Create**，记下生成的 16 位应用专用密码妥善保存（保存时请去掉空格）。
8. 点击 **Done**。
9. 使用上方的 My 按钮将 IMAP 集成添加到你的 Home Assistant 实例中，并按需填写以下信息：

    - 用户名：你的 Gmail 邮箱登录名
    - 密码：你的 16 位应用专用密码（不含空格）
    - 服务器：`imap.gmail.com`
    - 端口：`993`

10. 点击 **Submit**。
11. 如有需要，可将该集成分配到某个“区域”，然后点击 **Finish**。

完成后，你就拥有了一个用于统计 Gmail 帐号未读邮件数量的传感器。之后，你还可以基于检测到新邮件时通过事件总线传来的数据，创建额外的传感器。

### 配置 IMAP 搜索

默认情况下，此集成会统计未读邮件。通过配置搜索字符串，你也可以统计其他结果，例如：

- `ALL`：统计某个文件夹中的所有邮件
- `FROM`、`TO`、`SUBJECT`：在文件夹中查找符合条件的邮件（所有标准选项参见 [IMAP RFC](https://tools.ietf.org/html/rfc3501#section-6.4.4)）
- [Gmail 的 IMAP 扩展](https://developers.google.com/gmail/imap/imap-extensions)支持原生 Gmail 搜索，例如 `X-GM-RAW "in: inbox older_than:7d"` 可显示收件箱中超过一周的邮件。请注意，原生 Gmail 搜索会忽略你的文件夹配置，直接搜索帐户中的所有邮件。


### 选择 IMAP 服务器支持的字符集

某些 IMAP 服务（如 Yahoo）要求显式配置 `US-ASCII` 字符集。

### 选择要包含在 IMAP 事件中的邮件数据（高级模式）

默认情况下，IMAP 事件不会包含 `text` 或 `headers` 邮件数据。如果你希望事件中包含它们（`text`、`headers` 或两者），需要在选项流程中手动选择。
处理 `text` 数据的另一种方式是使用 `imap.fetch` 操作。在这种情况下，`text` 不会受到大小限制。

### 选择备用 SSL 密码套件列表或禁用 SSL 验证（高级模式）

如果默认的 IMAP 服务器设置无法正常工作，你可以尝试设置备用的 SSL 密码套件列表。
SSL 密码套件列表选项允许你选择此端点可接受的 SSL 密码套件列表：`default`（_系统默认_）、`modern` 或 `intermediate`（_参考 [Mozilla Security/Server Side TLS](https://wiki.mozilla.org/Security/Server_Side_TLS)_）。

如果你使用的是自签名证书，可以关闭 SSL 验证。

:::important
SSL 密码套件列表和验证 SSL 都属于高级设置。只有启用高级模式后，这些选项才会显示（参见用户设置）。

:::
### 启用 IMAP Push

如果你的 IMAP 服务器支持，IMAP Push 会默认启用。如果你使用的 IMAP 服务不稳定，偶尔会断开连接并导致问题，可以考虑关闭 IMAP Push。关闭后将回退为轮询 IMAP 服务器。

:::important
强制轮询选项属于高级设置。只有启用高级模式后，此选项才会显示（参见用户设置）。

:::
### 故障排查

邮件服务提供商可能会限制可报告的邮件数量。即使你通过 `IMAP search` 缩小了结果范围，返回数量仍可能低于其上限（例如 Yahoo 至少为 10,000 封）。如果你没有收到预期事件，又不想清理收件箱或当前配置的文件夹，建议为特定发件人设置邮件过滤规则，将邮件转入新的文件夹。然后创建新的配置条目，或把现有条目改为使用该目标文件夹。

### 使用事件

当有新邮件到达，或在已定义搜索命令范围内有邮件被移除时，`imap` 集成会发送一个可用于触发自动化的自定义[event](/home-assistant/docs/automation/trigger/#event-trigger)。
你也可以基于[event 数据](/home-assistant/docs/automation/templating/#event)创建模板 [`binary_sensor` 或 `sensor`](/home-assistant/integrations/template/#trigger-based-template-binary-sensors-buttons-numbers-selects-and-sensors)。

下表展示了 `trigger.event.data` 中包含的属性。该数据是一个字典，包含下方所示的各个键。

表中展示的属性也可作为自定义事件数据模板中的变量使用。[示例](/home-assistant/integrations/imap/#example---custom-event-data-template)展示了如何将其用作事件过滤器。

:::important
自定义事件数据模板属于高级功能。只有启用高级模式后，此选项才会显示（参见用户设置）。当 `text` 作为模板变量使用时，不受大小限制。

:::
```yaml
server:
  description: IMAP 服务器名称
username:
  description: IMAP 用户名
search:
  description: IMAP 搜索配置
folder:
  description: IMAP 文件夹配置
text:
  description: 邮件正文的 `text` 内容。默认仅提供正文前 2048 字节，其余部分会被截断。你可以增大正文文本的最大长度，但不建议这样做，也无法保证能拿到完整正文。更好的做法是使用自定义事件数据模板（高级设置）解析整封邮件，这种方式不受大小限制。渲染结果会作为 `custom` 属性加入事件数据中，用于自动化。只有在选项流程中显式选择后，`text` 才会被包含。
sender:
  description: 邮件的 `sender`（发件人）
subject:
  description: 邮件的 `subject`（主题）
date:
  description: 邮件发送时间的 `datetime` 对象
headers:
  description: 邮件的 `headers`，以字典形式提供。由于同一个请求头可能出现多次，因此其值可迭代。只有在选项流程中显式选择后，`headers` 才会被包含。
custom:
  description: 保存自定义事件数据[模板](/home-assistant/docs/configuration/templating)的结果。所有属性都可作为模板中的变量使用。
initial:
  description: 如果这是最近一封收到邮件的首次事件，则返回 `True`。当搜索范围内的邮件被删除，而最近收到的那封邮件本身没有变化时，仍会生成一个 `imap_content` 事件，此时 `initial` 为 `False`。注意：如果触发邮件没有 `Message-ID` 头，则 `initial` 始终为 `True`。
parts:
  description: 返回一个字典，列出多部分邮件中可用的各个部分。字典键可通过 `part` 选项传给 `fetch` 动作，以获取邮件指定部分的内容。
uid:
  description: 邮件最新的 `uid`。
```

自定义事件的 `event_type` 应设置为 `imap_content`。下面的配置展示了如何在模板 `sensor` 中使用事件数据。

如果事件中使用的默认最大消息大小（2048 字节）不能满足需求，可以调大该上限。要进行此设置，你需要将个人资料切换为 _advanced_ 模式。

:::warning
增大默认最大消息大小（2048 字节）可能会影响性能，因为事件数据也会被 `recorder` 记录。如果事件总数据大小超过最大事件限制（32168 字节），该事件将被跳过。

:::


```yaml
template:
  - trigger:
      - trigger: event
        event_type: "imap_content"
        id: "custom_event"
    sensor:
      - name: imap_content
        state: "{{ trigger.event.data['subject'] }}"
        attributes:
          Entry: "{{ trigger.event.data['entry_id'] }}"
          UID: "{{ trigger.event.data['uid'] }}"
          Message: "{{ trigger.event.data['text'] }}"
          Server: "{{ trigger.event.data['server'] }}"
          Username: "{{ trigger.event.data['username'] }}"
          Search: "{{ trigger.event.data['search'] }}"
          Folder: "{{ trigger.event.data['folder'] }}"
          Sender: "{{ trigger.event.data['sender'] }}"
          Date: "{{ trigger.event.data['date'] }}"
          Subject: "{{ trigger.event.data['subject'] }}"
          Initial: "{{ trigger.event.data['initial'] }}"
          To: "{{ trigger.event.data['headers'].get('Delivered-To', ['n/a'])[0] }}"
          Return-Path: "{{ trigger.event.data['headers'].get('Return-Path',['n/a'])[0] }}"
          Received-first: "{{ trigger.event.data['headers'].get('Received',['n/a'])[0] }}"
          Received-last: "{{ trigger.event.data['headers'].get('Received',['n/a'])[-1] }}"
```


### 后处理操作

IMAP 集成提供了一些用于邮件后处理的操作。这些操作通常用于自动化中，作为 `imap_content` 事件之后的动作。它们需要 IMAP 的 `entry_id` 以及邮件事件数据中的 `uid`。你可以为 `entry_id` 和 `uid` 使用模板。当该操作被设置为触发动作时，你可以在 UI 中轻松选择正确的条目。在 YAML 模式下可以找到 `entry_id`。强烈建议按 `entry_id` 过滤事件。

#### 动作 `seen` - 将邮件标记为已读

| 数据属性 | 类型 | 可选 | 说明 |
| -- | -- | -- | -- |
| `entry_id` | string | no | IMAP 配置条目 ID。 |
| `uid` | string |  no | 要标记为“已读”的邮件 `uid`，可在该邮件的事件数据中找到。 |

#### 动作 `move` - 移动 IMAP 邮件

| 数据属性 | 类型 | 可选 | 说明 |
| -- | -- | -- | -- |
| `entry_id` | string | no | IMAP 配置条目 ID。 |
| `uid` | string |  no | 要处理的邮件 `uid`，可在该邮件的事件数据中找到。 |
| `target_folder` | string | no | 目标文件夹名称，例如 `INBOX/Trash`（旧系统中也可能是 `INBOX.Trash`），邮件会被移动到这里。 |
| `seen` | boolean | yes | 若设为 `true`，同时会将该邮件标记为“已读”。 |

:::important
请确保使用正确的 IMAP 文件夹分隔符。下表列出了常见 IMAP 服务器使用的文件夹分隔符：

| 邮件服务器 | 分隔符 |
|-----------|--------|
| Gmail | / |
| Dovecot | .（但通常也可用 /） |
| Courier IMAP | . |
| Cyrus IMAP | / |
| Microsoft Exchange | / |
| Zimbra | / |
| Yahoo Mail | / |

:::
#### 动作 `delete` - 删除 IMAP 邮件

| 数据属性 | 类型 | 可选 | 说明 |
| -- | -- | -- | -- |
| `entry_id` | string | no | IMAP 配置条目 ID。 |
| `uid` | string | no | 要删除的邮件 `uid`，可在该邮件的事件数据中找到。 |

:::caution
当这些动作用于自动化时，请务必正确设置触发器和过滤条件。邮件一旦被删除、移动或修改，将无法恢复。若配置了多个 IMAP 条目，还应同时按 `entry_id` 过滤邮件，以确保处理的是正确邮件。除非你明确知道自己在做什么，否则不要使用这些动作。

:::
#### 动作 `fetch` - 获取一封 IMAP 邮件

获取邮件正文文本，并读取 IMAP 邮件内部各部分的元数据。

| 数据属性 | 类型 | 可选 | 说明 |
| -- | -- | -- | -- |
| `entry_id` | string | no | IMAP 配置条目 ID。 |
| `uid` | string |  no | 要获取的邮件 `uid`，可在该邮件的事件数据中找到。 |

##### `fetch` 动作的返回值

```yaml
text:
  description: 获取到的邮件纯文本内容。
subject:
  description: 获取到的邮件主题。
sender:
  description: 获取到的邮件发件人地址。
uid:
  description: 邮件的 UID。
parts:
  description: 在多部分邮件场景下，包含一个字典，列出邮件中各可用部分的元数据。这样可进一步获取并处理完整文本部分，不受大小限制。
  type: map
  keys:
    content_type:
      description: 邮件部分的 MIME 内容类型，例如 `image/jpeg`
    content_transfer_encoding:
      description: 返回的邮件部分所使用的编码。
    filename:
      description: 邮件部分的文件名；仅在该信息存在时可用。
```

##### 多部分邮件返回变量中 `parts` 数据示例：

```json
{
    "0,0": {
        "content_type": "text/plain",
        "content_transfer_encoding": "7bit"
    },
    "0,1": {
        "content_type": "text/html",
        "content_transfer_encoding": "7bit"
    },
    "1": {
        "content_type": "text/plain",
        "filename": "Text attachment content.txt",
        "content_transfer_encoding": "base64"
    },
}
```

#### 动作 `fetch_part` - 获取 IMAP 邮件中的某个部分或附件

| 数据属性 | 类型 | 可选 | 说明 |
| -- | -- | -- | -- |
| `entry_id` | string | no | IMAP 配置条目 ID。 |
| `uid` | string |  no | 要获取的邮件 `uid`，可在该邮件的事件数据中找到。 |
| `part` | string |  no | 要返回的邮件部分索引。可从事件数据或 `fetch` 动作返回值中的 `part` 信息获取可用部分列表。 |

##### `fetch_part` 动作的返回值

```yaml
part_data:
  description: 获取到的邮件部分编码数据。
content_type:
  description: 邮件部分的 MIME 内容类型，例如 `image/jpeg`。
content_transfer_encoding:
  description: `part_data` 中数据的编码方式。
file_name:
  description: 邮件部分的文件名；若该部分是附件则通常会有此值，未设置时为 `null`。
uid:
  description: 邮件的 UID。
part:
  description: 部分索引。
```

## 示例 - 后处理

下面的示例会按 `entry_id` 过滤事件触发器，抓取邮件并将其存入 `message_text`。随后，它会将事件中的邮件标记为已读，最后再创建一条以邮件主题为内容的通知。`seen` 操作中的 `entry_id` 可以是模板，也可以是字面量字符串。在 UI 模式下，你也可以从列表中选择所需条目。


```yaml
alias: "imap fetch and seen example"
description: "Fetch and mark an incoming message as seen"
triggers:
  - trigger: event
    event_type: imap_content
    event_data:
      entry_id: 91fadb3617c5a3ea692aeb62d92aa869
conditions:
  - condition: template
    value_template: "{{ trigger.event.data['sender'] == 'info@example.com' }}"
actions:
  - action: imap.fetch
    data:
      entry: 91fadb3617c5a3ea692aeb62d92aa869
      uid: "{{ trigger.event.data['uid'] }}"
    response_variable: message_text
  - action: imap.seen
    data:
      entry: 91fadb3617c5a3ea692aeb62d92aa869
      uid: "{{ trigger.event.data['uid'] }}"
  - action: persistent_notification.create
    data:
      message: "{{ message_text['subject'] }}"
```


如果你想处理邮件的某个部分，请使用 `fetch_part` 操作，并指定 `part` 选项。


```yaml
alias: "imap fetch and seen example"
description: "Fetch and mark an incoming message as seen"
triggers:
  - trigger: event
    event_type: imap_content
    event_data:
      entry_id: 91fadb3617c5a3ea692aeb62d92aa869
conditions:
  - condition: template
    value_template: "{{ trigger.event.data['sender'] == 'info@example.com' }}"
  - condition: template
    value_template: "{{ trigger.event.data['parts'].get('1') }}"
  - condition: template
    value_template: "{{ trigger.event.data['parts']['1'].get('content_type') == 'text/plain' }}"
actions:
  - action: imap.fetch_part
    data:
      entry: 91fadb3617c5a3ea692aeb62d92aa869
      uid: "{{ trigger.event.data['uid'] }}"
      part: "1"
    response_variable: message_text
  - action: imap.seen
    data:
      entry: 91fadb3617c5a3ea692aeb62d92aa869
      uid: "{{ trigger.event.data['uid'] }}"
  - action: persistent_notification.create
    data:
      message: "{{ message_text['part_data'] | base64_decode }}"
```


## 示例 - 关键词识别

下面的示例展示了如何使用 IMAP 邮件内容传感器扫描邮件主题中的文本。本例中使用的是来自 APC SmartConnect 服务的邮件，用于判断 UPS 当前是否处于电池供电状态。


```yaml
template:
  - trigger:
      - trigger: event
        event_type: "imap_content"
        id: "custom_event"
        event_data:
          sender: "no-reply@smartconnect.apc.com"
          initial: true
    sensor:
      - name: house_electricity
        state: >-
          {% if 'UPS On Battery' in trigger.event.data["subject"] %}
            power_out
          {% elif 'Power Restored' in trigger.event.data["subject"] %}
            power_on
          {% endif %}
```


## 示例 - 使用模板传感器从邮件中提取结构化文本

这个示例展示了如何从邮件中提取数字或其他格式化数据，并将模板传感器的值更新为邮件中解析出的结果。本例会从一封来自 Georgia Power 的邮件中提取能耗、费用和账单金额，并基于已配置好的 IMAP 邮件传感器写入多个模板传感器。示例邮件正文如下：

```text
Yesterday's Energy Use:                             76 kWh
Yesterday's estimated energy cost:                  $8
Monthly Energy use-to-date for 23 days:             1860 kWh
Monthly estimated energy cost-to-date for 23 days:  $198

To view your account for details about your energy use, please click here.
```

下面的模板传感器会从 IMAP 邮件传感器（名为 `sensor.energy_email`）中的邮件正文提取信息，并生成 3 个传感器，分别表示能耗、每日费用和账单周期总额。


```yaml
template:
  - trigger:
      - trigger: event
        event_type: "imap_content"
        id: "custom_event"
        event_data:
          sender: "no-reply@smartconnect.apc.com"
    sensor:
      - name: "Previous Day Energy Use"
        unit_of_measurement: "kWh"
        state: >
        {{ trigger.event.data["text"]
          | regex_findall_index("\*Yesterday's Energy Use:\* ([0-9]+) kWh") }}
      - name: "Previous Day Cost"
        unit_of_measurement: "$"
        state: >
          {{ trigger.event.data["text"]
            | regex_findall_index("\*Yesterday's estimated energy cost:\* \$([0-9.]+)") }}
      - name: "Billing Cycle Total"
        unit_of_measurement: "$"
        state: >
          {{ trigger.event.data["text"]
            | regex_findall_index("\ days:\* \$([0-9.]+)") }}
```


只需对上面的正则表达式做少量修改，就可以用同样的结构从其他邮件正文中解析出不同类型的数据。

## 示例 - 自定义事件数据模板

我们可以定义自定义事件数据模板来帮助过滤事件。例如，当你希望允许多个发件人时，这会非常方便。
下面的模板会在 `sender` 中包含 `@example.com` 时返回 true：


```jinja
{{ "@example.com" in sender }}
```


如果发件人符合条件，模板将渲染为 `True`。结果会作为 `trigger.event.data["custom"]` 加入事件数据。

下面的示例仅在发件人地址匹配时，才会把模板传感器的状态设置为邮件主题。


```yaml
template:
  - trigger:
      - trigger: event
        event_type: "imap_content"
        id: "custom_event"
        event_data:
          custom: True
    sensor:
      - name: event filtered by template
        state: '{{ trigger.event.data["subject"] }}'
```


## 移除 IMAP 服务

此集成遵循标准配置条目移除流程。

### 从 Home Assistant 中移除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择该集成卡片。
2. 在设备列表中，选择你想移除的集成实例。
3. 在对应条目旁，选择三点菜单 `[mdi:dots-vertical]`，然后选择 **删除**。
