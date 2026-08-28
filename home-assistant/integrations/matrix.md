# Matrix

此集成可让你向 Matrix 房间发送消息，也可以对 Matrix 房间中的消息作出响应。对命令的响应方式是：当触发已配置的某个命令时，触发一个事件。

目前 Home Assistant 中支持以下设备类型：

* [Notifications](#notifications)

## 配置

要启用 Matrix 集成，请将以下内容添加到你的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
matrix:
  homeserver: https://matrix.org
  username: "@my_matrix_user:matrix.org"
  password: supersecurepassword
  rooms:
    - "#hasstest:matrix.org"
  commands:
    - word: my_command
      name: my_command
```

```yaml
username:
  description: "The matrix username that Home Assistant should use to log in. *Note*: You must specify a full matrix ID here, including the homeserver domain, e.g., '@my_matrix_bot:matrix.org'. Please note also that the '@' character has a special meaning in YAML, so this must always be given in quotes."
  required: true
  type: string
password:
  description: The password for your Matrix account.
  required: true
  type: string
homeserver:
  description: "The full URL for your homeserver. If you use the default matrix.org homeserver, this is 'https://matrix.org'."
  required: true
  type: string
verify_ssl:
  description: Verify the homeservers certificate.
  required: false
  type: string
  default: true
rooms:
  description: "The list of rooms that the bot should join and listen for commands (see below) in. While you can limit the list of rooms that a certain command applies to on a per-command basis (see below), you must still list all rooms here that commands should be received in. Rooms can be given either by their internal ID (e.g., '!cURbafjkfsMDVwdRDQ:matrix.org') or any of their aliases (e.g., '#matrix:matrix.org')."
  required: false
  type: [string]
  default: empty
commands:
  description: "A list of commands that the bot should listen for. If a command is triggered (via its *word* or *expression*, see below), an event is fired that you can handle using automations. Every command consists of these possible configuration options:"
  required: false
  type: map
  default: empty
  keys:
    word:
      description: "Specifies a word that the bot should listen for. If you specify 'my_command' here, the bot will handle any message starting with '!my_command'."
      required: false
      type: string
    expression:
      description: "Specifies a regular expression (in Python regexp syntax) that the bot should listen to. The bot will handle any message that matches the regular expression."
      required: false
      type: string
    reaction:
      description: "Specifies an emoji reaction that the bot should listen to. The bot will handle any message that is reacted to with this emoji."
      required: false
      type: string
    name:
      description: "The name of the command. This will be an attribute of the event that is fired when this command triggers."
      required: true
      type: string
    rooms:
      description: "A list of rooms that the bot should listen for this command in. If this is not given, the *rooms* list from the main configuration is used. Please note that every room in this list must also be in the main *room* configuration."
      required: false
      type: [string]
      default: empty
```

:::warning
In order to prevent infinite loops when reacting to commands, you have to use a separate account for the Matrix integration.

:::

### 事件数据

如果某个命令被触发，将触发一个 `matrix_command` 事件。该事件会在 `name` 字段中包含命令名称。

如果命令是单词命令，`data` 字段会包含该命令参数列表，也就是命令词后面的所有内容，并按空格拆分。如果命令是表达式命令，`data` 字段会包含与消息匹配的正则表达式的[分组字典](https://docs.python.org/3.6/library/re.html?highlight=re#re.match.groupdict)。

### 完整配置示例

此示例还使用了 [matrix `notify` 平台](#notifications)。

```yaml
# The Matrix integration
matrix:
  homeserver: https://matrix.org
  username: "@my_matrix_user:matrix.org"
  password: supersecurepassword
  rooms:
    - "#hasstest:matrix.org"
    - "#someothertest:matrix.org"
  commands:
    - word: testword
      name: testword
      rooms:
        - "#someothertest:matrix.org"
    - expression: "My name is (?P<name>.*)"
      name: introduction
    - reaction: 👍
      name: thumbsup

notify:
  - name: matrix_notify
    platform: matrix
    default_room: "#hasstest:matrix.org"

automation:
  - alias: "Respond to !testword"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: testword
    actions:
      - action: notify.matrix_notify
        data:
          message: "It looks like you wrote !testword"

  - alias: "Respond to an introduction"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: introduction
    actions:
      - action: notify.matrix_notify
        data:
          message: "Hello {{trigger.event.data.args['name']}}"

  - alias: "Respond to a reaction in a thread"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: thumbsup
    actions:
      - action: notify.matrix_notify
        data:
          message: "I saw that {{trigger.event.data.args['reaction']}} -- glad you appreciated this!"
          data:
            thread_id: "{{trigger.event.data.thread_parent}}"

  - alias: "React to a command"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: testword
    actions:
      - action: matrix.react
        data:
          reaction: "✅"
          room: "{{trigger.event.data.room}}"
          message_id: "{{trigger.event.data.event_id}}"
```

此配置将会：

* 仅在房间 `#someothertest:matrix.org` 中监听 `!testword`。如果检测到该消息，它会在 `#hasstest:matrix.org` 频道中回复 `It looks like you wrote !testword`，并对原消息添加一个 ✅ 反应。
* 在两个房间中监听所有匹配 `My name is <任意字符串>` 的消息，并在 `#hasstest:matrix.org` 中回复 `Hello <该字符串>`。
* 在两个房间中监听被添加 👍 反应的消息，并在线程中回复 `I saw that 👍 -- glad you appreciated this!`

## 通知

`matrix` 平台允许你将 Home Assistant 的通知发送到 [Matrix](https://matrix.org/) 房间。房间既可以是一对一私聊，也可以是群组聊天。

要在你的安装中启用 Matrix 通知，首先需要配置 [Matrix 集成](#configuration)。然后，将以下内容添加到你的 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: matrix
    default_room: ROOM_ID_OR_ALIAS
```

```yaml
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
default_room:
  description: The room all messages will be sent to, when no other target is given.
  required: true
  type: string
```

目标房间必须预先创建，房间 ID 可从房间设置对话框中获取。房间默认具有形如 `"!<randomid>:homeserver.tld"` 的规范 ID，也可以分配诸如 `"#roomname:homeserver.tld"` 的别名。请确保在 YAML 中用引号包裹房间 ID 或别名，以转义特殊字符（`!` 和 `#`）。根据各房间的策略不同，用于发送通知的账号可能需要先被邀请进入该房间。

如需使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/index.md)。

### 消息格式

Matrix 支持使用[有限的 HTML 子集](https://spec.matrix.org/v1.2/client-server-api/#mroommessage-msgtypes)发送消息。要指定消息格式，请在通知的 `data` 中添加对应设置。

支持的格式有：`text`（默认）和 `html`。

```yaml
# Example of notification as HTML
actions:
  - action: notify.matrix_notify
    data:
      message: >-
        <h1>Hello, world!</h1>
      data:
        format: "html"
```

### 通知中的图片

通知中可以附带图片。为此，请在通知的 `data` 中添加一个路径列表。

```yaml
# Example of notification with images
actions:
  - action: notify.matrix_notify
    data:
      message: "Test with images"
      data:
        images:
          - /path/to/picture.jpg
```

:::important
如果你需要在通知中包含外部文件夹中的文件，则必须先[将源文件夹加入允许列表](/home-assistant/integrations/homeassistant/index.md#allowlist_external_dirs)。

```yaml
configuration.yaml
...
homeassistant:
  allowlist_external_dirs:
    - /tmp
```

:::

### 在线程中回复

`matrix_command` 事件会包含一个 `event_id` 字段，表示收到消息的消息标识符。
它还会包含一个 `thread_parent` 字段，表示该线程父消息的消息标识符。
如果该消息位于线程内，`thread_parent` 将是该线程根消息的标识符。如果它
不在线程中，`thread_parent` 将与 `event_id` 相同。

要在线程中回复，请在发送回复消息时将线程根消息的正确消息标识符传入 `data.thread_id`。例如：

```yaml
action: notify.matrix_notify
data:
  message: "Reply message goes here"
  data:
    thread_id: "{{ trigger.event.data.thread_parent }}"
```

## 操作

该集成还提供以下操作：

### 发送消息

作为使用上述 notify 集成方式的替代方案，你也可以使用 `matrix.send_message` 向 Matrix 房间发送消息。

```yaml
action: matrix.send_message
data:
  message: "My cool message"
  target: "#hasstest:matrix.org"
  data:
    images:
      - /path/to/picture.jpg
    format: html
    thread_id: "$-abcdeghij_klmnopqrstuvwxyz123"
```

* **Data attribute**: `message`
  * **Description**: The message body to send
  * **Optional**: No
  * **Type**: String

* **Data attribute**: `target`
  * **Description**: The room to send the message to
  * **Optional**: No
  * **Type**: String

* **Data attribute**: `data`
  * **Description**: Additional options
  * **Optional**: Yes
  * **Type**: Map
  * **Sub-attributes**:
    * **Data attribute**: `images`
      * **Description**: One or more image paths to attach to the message
      * **Optional**: Yes
      * **Type**: List of strings
    * **Data attribute**: `format`
      * **Description**: The format of the message. Must be either `text` or `html`
      * **Optional**: Yes
      * **Default**: `text`
      * **Type**: String
    * **Data attribute**: `thread_id`
      * **Description**: The ID of the parent message to thread this reply under
      * **Optional**: Yes
      * **Type**: String

### 对消息添加反应

如果要对一条消息添加 emoji 反应，请使用 `matrix.react` 操作：

```yaml
action: matrix.react
data:
  reaction: "✅"
  room: "{{ trigger.event.data.room }}"
  message_id: "{{ trigger.event.data.event_id }}"
```

:::tip
反应内容不一定必须是 emoji，也可以是任何有效字符串。不过，emoji 是最常见、最传统的用法。

:::

* **Data attribute**: `reaction`
  * **Description**: The reaction to send
  * **Optional**: No
  * **Type**: String

* **Data attribute**: `room`
  * **Description**: The room to send the reaction in
  * **Optional**: No
  * **Type**: String

* **Data attribute**: `message_id`
  * **Description**: The ID of the message to apply the reaction to
  * **Optional**: No
  * **Type**: String
