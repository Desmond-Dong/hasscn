# Telegram

:::warning
**Telegram** 集成已被标记为弃用，未来将被移除。
请改用 [Telegram bot integration](/home-assistant/integrations/telegram_bot.md)。

:::
**Telegram** 集成使用 [Telegram](https://www.telegram.org) 将 Home Assistant 的通知发送到您的 Telegram 应用。

## 设置示例

要创建您的第一个 [Telegram bot](https://core.telegram.org/bots#how-do-i-create-a-bot)，请按以下步骤操作：

* 机器人不能主动联系用户。您需要先由要使用该机器人的用户向机器人发起首次联系。

1. 让 Telegram 为您创建机器人：
   * 在 Telegram 中与 @BotFather 开启聊天，并输入 `/newbot`。
   * 按照屏幕提示操作，并为机器人命名。
   * BotFather 会向您提供新机器人的链接和一个 HTTP API token。
     * 请将该 token 妥善保存。

2. 要获取 chat ID，请向 [GetIDs bot](https://t.me/getidsbot) 发送任意消息。
   * 然后输入 `/start`。
   * 该机器人会返回您的 chat ID 和用户名。

3. 在 Home Assistant 中创建一个 [Telegram bot](/home-assistant/integrations/telegram_bot.md)。

4. 创建通知器：
   * 将以下内容粘贴到配置文件中：
   * 用您的实际数据替换 `name` 和 `chat_id`。

     ```yaml
     # Notifier
     notify:
       - platform: telegram
         name: "sarah"
         chat_id: 44441111
     ```
   * 重启 Home Assistant。

5. 在与 BotFather 的对话中，点击链接打开与新机器人的聊天。

6. 在与新机器人的聊天中输入 `/start`。

7. 测试操作：
   * 前往 [**Settings** > **Developer tools** > **Actions** > **YAML mode**](https://my.home-assistant.io/redirect/developer_call_service/?service=homeassistant.turn_on)。
   * 将以下内容粘贴到 YAML 中：
   * 用您的实际数据替换 `service` 和 `message`。

     ```yaml
     action: notify.sarah
     data:
       message: "Yay! A message from Home Assistant."
     ```
   * 点击 **Perform action**。此时您应该会收到一条消息。

8. 您还可以做更多事情。请查看下面的配置说明和示例。

## 获取 `chat_id` 的方法

**方法 1：** 向 [GetIDs bot](https://t.me/getidsbot) 发送任意消息即可获取 `chat_id`。

**方法 2：** 在您向机器人发送消息**之后**，可访问 `https://api.telegram.org/bot<YOUR_API_TOKEN>/getUpdates`，或使用 `$ curl -X GET https://api.telegram.org/bot<YOUR_API_TOKEN>/getUpdates` 来获取 `chat_id`。请将 `<YOUR_API_TOKEN>` 替换为实际 token。

返回结果中会在 `chat` 部分包含您的 chat ID，对应字段为 `id`：

```json
{
	"ok": true,
	"result": [{
		"update_id": 254199982,
		"message": {
			"message_id": 27,
			"from": {
				"id": 123456789,
				"first_name": "YOUR_FIRST_NAME YOUR_NICK_NAME",
				"last_name": "YOUR_LAST_NAME",
				"username": "YOUR_NICK_NAME"
			},
			"chat": {
				"id": 123456789,
				"first_name": "YOUR_FIRST_NAME YOUR_NICK_NAME",
				"last_name": "YOUR_LAST_NAME",
				"username": "YOUR_NICK_NAME",
				"type": "private"
			},
			"date": 1678292650,
			"text": "test"
		}
	}]
}
```

**方法 3：** 另一种直接获取 chat ID 的方法如下。请从命令行启动 Python 解释器：

```bash
$ python3
>>> import telegram
>>> bot = telegram.Bot(token='YOUR_API_TOKEN')
>>> chat_id = bot.getUpdates()[-1].message.chat_id
>>> print(chat_id)
123456789
```

:::tip
如果您想新增 chat ID，则需要暂时禁用当前活动配置，这样才能在返回结果中实际看到这些 ID，否则您可能只会得到空结果数组。

:::
**方法 4：** 您也可以从 Home Assistant 日志中获取 chat ID。如果您已经设置好了机器人，可以用一个未授权的 ID 向机器人发送消息，日志中会出现包含该 ID 的错误条目。
[![Open your Home Assistant instance and show your Home Assistant logs.](https://my.home-assistant.io/badges/logs.svg)](https://my.home-assistant.io/redirect/logs/?)

## 配置

要在您的安装中启用 Telegram 通知，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Telegram Bot 的 configuration.yaml 示例条目
telegram_bot:
  - platform: polling
    api_key: YOUR_API_KEY
    allowed_chat_ids:
      - CHAT_ID_1 # 示例：123456789，用户的 chat_id
      - CHAT_ID_2 # 示例：-987654321，群组的 chat_id
      - CHAT_ID_3

# notifier 的 configuration.yaml 示例条目
notify:
  - platform: telegram
    name: NOTIFIER_NAME
    chat_id: CHAT_ID_1
    
  # 也可以通过其他 chat_id 添加多个通知器
  # 下面的示例展示了一个额外通知器，它会向已加入群组的机器人发送消息
  - platform: telegram
    name: NOTIFIER_NAME_OF_GROUP
    chat_id: CHAT_ID_2
```

有关 `telegram_bot` 的配置，请参阅 [Telegram chatbot 页面](/home-assistant/integrations/telegram_bot/index.md) 中提到的平台说明。

```yaml
name:
  description: 设置可选参数 `name` 可创建多个通知器。该通知器会绑定到 `notify.NOTIFIER_NAME` 操作。
  required: false
  default: notify
  type: string
chat_id:
  description: 用户或群组的 chat ID
  required: true
  type: integer
```

有关如何使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/index.md)。

### 文本消息

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "*Send a message*"
      message: "That's an example that _sends_ a *formatted* message with a custom inline keyboard."
      data:
        inline_keyboard:
          - 'Task 1:/command1, Task 2:/command2'
          - 'Task 3:/command3, Task 4:/command4'
```

```yaml
title:
  description: 将按 `%title\n%message` 的形式组合。
  required: false
  type: string
message:
  description: 消息文本。
  required: true
  type: string
keyboard:
  description: 用逗号分隔命令的多行列表，用于创建自定义键盘。
  required: false
  type: list
inline_keyboard:
  description: 用逗号分隔命令的多行列表，用于创建带回调数据按钮的自定义内联键盘。
  required: false
  type: list
```

### 图片支持

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
title: "Send an image"
      message: "That's an example that sends an image."
      data:
        photo:
          - url: http://192.168.1.28/camera.jpg
            username: "admin"
            password: "secret"
          - file: /tmp/picture.jpg
            caption: "Picture Title xy"
          - url: http://somebla.ie/video.png
            caption: "i.e., for a Title"
```

```yaml
url:
  description: 图片的远程路径。此项与 `file` 配置项二选一，至少需要一个。
  required: true
  type: string
file:
  description: 图片的本地路径。此项与 `url` 配置项二选一，至少需要一个。
  required: true
  type: string
caption:
  description: 图片标题。
  required: false
  type: string
username:
  description: 需要 HTTP 认证的 URL 所用用户名。
  required: false
  type: string
password:
  description: 需要 HTTP 认证的 URL 所用密码。
  required: false
  type: string
authentication:
  description: 设为 `digest` 以使用 HTTP digest 认证。
  required: false
  default: basic
  type: string
verify_ssl:
  description: 设为 false 可跳过服务器 SSL 证书验证。
  required: false
  default: true
  type: boolean
keyboard:
  description: 逗号分隔的命令行列表，用于创建自定义键盘。
  required: false
  type: list
inline_keyboard:
  description: 逗号分隔的命令行列表，用于创建带有回调数据按钮的自定义内联键盘。
  required: false
  type: list
```

:::important
自 Home Assistant 0.48 起，您必须将要包含在通知中的文件所在源文件夹加入 [allowlist\_external\_dirs](/home-assistant/integrations/homeassistant/index.md#allowlist_external_dirs) 白名单。

```yaml
configuration.yaml
...
homeassistant:
  allowlist_external_dirs:
    - /tmp
    - /home/kenji/data
```

:::

### 视频支持

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send a video"
      message: "That's an example that sends a video."
      data:
        video:
          - url: http://192.168.1.28/camera.mp4
            username: "admin"
            password: "secret"
          - file: /tmp/video.mp4
            caption: "Video Title xy"
          - url: http://somebla.ie/video.mp4
            caption: "i.e., for a Title"
```

```yaml
url:
  description: 视频的远程路径。此项与 `file` 配置项二选一，至少需要一个。
  required: true
  type: string
file:
  description: 视频的本地路径。此项与 `url` 配置项二选一，至少需要一个。
  required: true
  type: string
caption:
  description: 视频标题。
  required: false
  type: string
username:
  description: 需要 HTTP 认证的 URL 所用用户名。
  required: false
  type: string
password:
  description: 需要 HTTP 认证的 URL 所用密码。
  required: false
  type: string
authentication:
  description: 设为 `digest` 以使用 HTTP digest 认证。
  required: false
  default: basic
  type: string
verify_ssl:
  description: 设为 false 可跳过服务器 SSL 证书验证。
  required: false
  default: true
  type: boolean
keyboard:
  description: 逗号分隔的命令行列表，用于创建自定义键盘。
  required: false
  type: list
inline_keyboard:
  description: 逗号分隔的命令行列表，用于创建带有回调数据按钮的自定义内联键盘。
  required: false
  type: list
```

### 文档支持

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send a document"
      message: "That's an example that sends a document and a custom keyboard."
      data:
        document:
          file: /tmp/whatever.odf
          caption: "Document Title xy"
        keyboard:
          - '/command1, /command2'
          - '/command3, /command4'
```

```yaml
url:
  description: 文档的远程路径。此项与 `file` 配置项二选一，至少需要一个。
  required: true
  type: string
file:
  description: 文档的本地路径。此项与 `url` 配置项二选一，至少需要一个。
  required: true
  type: string
caption:
  description: 文档标题。
  required: false
  type: string
username:
  description: 需要 HTTP 认证的 URL 所用用户名。
  required: false
  type: string
password:
  description: 需要 HTTP 认证的 URL 所用密码。
  required: false
  type: string
authentication:
  description: 设为 `digest` 以使用 HTTP digest 认证。
  required: false
  default: basic
  type: string
verify_ssl:
  description: 设为 false 可跳过服务器 SSL 证书验证。
  required: false
  default: true
  type: boolean
keyboard:
  description: 逗号分隔的命令行列表，用于创建自定义键盘。
  required: false
  type: list
inline_keyboard:
  description: 逗号分隔的命令行列表，用于创建带有回调数据按钮的自定义内联键盘。
  required: false
  type: list
```

### 位置支持

```yaml
...

actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "Send location"
      message: "Location updated."
      data:
        location:
          latitude: 32.87336
          longitude: 117.22743
```

```yaml
latitude:
  description: 要发送的纬度。
  required: true
  type: float
longitude:
  description: 要发送的经度。
  required: true
  type: float
keyboard:
  description: 逗号分隔的命令行列表，用于创建自定义键盘。
  required: false
  type: list
inline_keyboard:
  description: 逗号分隔的命令行列表，用于创建带有回调数据按钮的自定义内联键盘。
  required: false
  type: list
```

### 额外数据属性支持

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      title: "*Send a message*"
      message: |-
        这是一个包含 message_tag、disable_notification 和 disable_web_page_preview 的消息示例。
        <a href="https://www.home-assistant.io/">HA site</a>
      data:
        parse_mode: html
        message_tag: "example_tag"
        disable_notification: True
        disable_web_page_preview: True
        message_thread_id: 123
```

```yaml
parse_mode:
  description: "消息文本的解析模式：`markdownv2`、`html` 或 `markdown`。"
  required: false
  type: string
disable_notification:
  description: True/false，表示是否静默发送消息。iOS 用户和 Web 用户不会收到通知；Android 用户会收到无声音通知。
  required: false
  default: false
  type: boolean
disable_web_page_preview:
  description: True/false，表示是否显示网页预览。
  required: false
  default: false
  type: boolean
message_tag:
  description: 已发送消息的标签。
  required: false
  type: string
message_thread_id:
  description: 将消息发送到指定主题或线程。
  required: false
  type: integer
```
