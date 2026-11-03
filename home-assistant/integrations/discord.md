# Discord

[Discord 服务](https://discordapp.com/)是通知集成的一个平台。这允许集成使用 Discord 向用户发送消息。

## 先决条件

### 创建 Discord 应用程序

要创建机器人用户，需要 Discord 应用程序。前往 [Discord My Apps 页面](https://discordapp.com/developers/applications/me)创建一个新应用程序。

设置应用程序时，您可以使用这个[图标](/home-assistant/images/favicon-192x192-full.png)。

应用程序准备好后，创建一个[机器人](https://discordapp.com/developers/docs/topics/oauth2#bots)用户（**Create a Bot User**）。

从"General Information"部分检索 **Application ID** 和您机器人的（隐藏）**Token**，以备后用。

:::note
您在 [Discord My Apps 页面](https://discordapp.com/developers/applications/me)上为应用程序指定的名称将决定通知动作的名称。例如：如果您输入"Discord Chat"，动作将被命名为 `notify.discord_chat`。

:::

### 设置机器人

机器人可以向服务器和用户发送消息或附加本地可用的图片。要将机器人添加到您是管理员的服务器，请使用您在上面记录的 **Application ID**，可在 [Discord My Apps 页面](https://discordapp.com/developers/applications/me)找到。

![Discord 机器人配置截图](/home-assistant/images/screenshots/discord-bot.png)

接下来，决定您的机器人在服务器中将拥有什么权限。在"Bot"部分下，选择您要授予的权限，并从底部字段复制权限整数。

![Discord 机器人权限截图](/home-assistant/images/screenshots/discord-bot-permissions.png)

现在使用您的[应用程序](https://discordapp.com/developers/docs/topics/oauth2#bots)的 **Application ID** 和 **Permissions Integer** 访问 Discord 授权页面。

`https://discordapp.com/api/oauth2/authorize?client_id=[APPLICATION_ID]&scope=bot&permissions=[PERMISSIONS_INTEGER]`

![Discord 机器人授权截图](/home-assistant/images/screenshots/discord-auth.png)

等待确认，应该显示"Authorized"。

机器人添加到您的服务器后，获取您希望机器人操作的频道的频道 ID。打开 Discord 并前往 **用户设置** > **高级** > **启用开发者模式**。用户设置可以在 Discord 中您的用户名旁边找到。

![Discord 机器人创建提示截图](/home-assistant/images/screenshots/discord-api.png)

右键单击频道名称并复制频道 ID（**Copy ID**）。

此频道或用户 ID 必须在调用通知动作时用作目标。可以指定多个频道或用户 ID，跨多个服务器或私信。

## 将 Discord 集成添加到 Home Assistant

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

添加 Discord 集成时，系统会要求您输入 API 密钥。输入您机器人的隐藏 **Token**，将您的 Discord 集成链接到您创建的机器人，并允许 Home Assistant 以该机器人的身份发送消息。

## 设置消息条目

`message` 字段将所有输入视为字面文本，包括引号。

例如：`message: Hello, world!` 将完全按原样显示，而 `message: "Hello, world!"` 将在消息中包含引号。

## 根据需要设置频道 ID

`target` 字段用于消息应发送到的频道 ID。接受的数据类型为单个频道的 `string` 或多个频道的 `string[]`。

例如：`"someChannelID"` 或 `["someChannelID", "anotherChannelID"]`

## 在同一服务器中提及用户、角色或链接到其他频道

您可以使用标准 Discord 方法在服务器中提及用户、角色和频道。

| 类型      | 格式           |
| --------- | -------------- |
| `User`    | `<@userID>`    |
| `Role`    | `<@&roleID>`   |
| `Channel` | `<#channelID>` |

## Discord 动作数据

以下属性可以放置在动作的 `data` 键中以实现扩展功能：

| 属性         | 可选 | 描述                                                                                                     |
| ------------ | ---- | -------------------------------------------------------------------------------------------------------- |
| `images`     | 是   | 要附加到消息的文件。                                                                                     |
| `urls`       | 是   | 要从远程 URL 下载并附加到消息的文件。                                                                     |
| `verify_ssl` | 是   | 一个布尔值，用于确定在调用 `url` 属性中的远程 URL 时是否应验证 SSL 证书。默认为 `True`。                   |
| `embed`      | 是   | [Discord 嵌入](https://discordpy.readthedocs.io/en/latest/api.html#embed)数组。*注意*：如果使用 `embed`，仍然需要 `message`。 |

要包含带有嵌入的消息，请在 `embed` 键下使用这些属性：

| 属性         | 可选 | 描述                                                               |
| ------------ | ---- | ------------------------------------------------------------------ |
| `title`       | 是  | 嵌入的标题。                                                       |
| `description` | 是  | 嵌入的描述。                                                       |
| `color`       | 是  | 嵌入的颜色代码。此值是一个 *int*。                                  |
| `url`         | 是  | 嵌入的 URL。                                                       |
| `author`      | 是  | 设置嵌入内容的作者。                                               |
| `footer`      | 是  | 设置嵌入内容的页脚。                                               |
| `thumbnail`   | 是  | 设置嵌入内容的缩略图。                                             |
| `image`       | 是  | 设置嵌入内容的图片。                                               |
| `fields`      | 是  | 向嵌入对象添加字段。`name` 和 `value` 是 *必需的*，`inline` 默认为 *true*。 |

### 动作示例

```yaml
- action: notify.discord
  data:
    message: "来自 Home Assistant 的消息"
    target: ["1234567890", "0987654321"]
    data:
      images: 
      - "/tmp/garage_cam"
      - "/tmp/garage.jpg"
```

### 从远程 URL 获取附件的动作示例

```yaml
- action: notify.discord
  data:
    message: "来自 Home Assistant 的消息"
    target: ["1234567890", "0987654321"]
    data:
      verify_ssl: False
      urls: 
      - "https://example.com/image.jpg"
      - "https://example.com/video.mp4"
```

请注意，`verify_ssl` 默认为 `True`，并且任何远程主机都需要在您的 [`allowlist_external_urls`](/home-assistant/integrations/homeassistant/index.md#allowlist_external_urls) 列表中。Discord 将附件大小限制为 8MB，因此任何超过此大小的内容将被跳过并在错误日志中注明。

### 嵌入动作示例

```yaml
- action: notify.discord
  data:
    message: ""
    target: ["1234567890", "0987654321"]
    data:
      embed:
        title: '标题'
        description: '描述'
        url: 'https://www.home-assistant.io'
        color: 199363
        author:
          name: 'Author Home Assistant'
          url: 'https://www.home-assistant.io'
          icon_url: 'https://www.home-assistant.io/images/favicon-192x192-full.png'
        footer:
          text: '页脚文本'
          icon_url: 'https://www.home-assistant.io'
        thumbnail:
          url: 'https://www.home-assistant.io/images/favicon-192x192-full.png'
        image:
          url: 'https://www.home-assistant.io/images/favicon-192x192-full.png'
        fields:
          - name: '字段名1'
            value: '字段值1'
            inline: false
          - name: '字段名2'
            value: '字段值2'
          - name: '字段名3'
            value: '字段值3'
          - name: '字段名4'
            value: '字段值4'
            inline: false
```

## 注意事项

您可以通过在消息中使用用户 ID 来在频道中标记任何用户：`<@userid>`，将 `userid` 替换为您复制的 ID。要获取用户 ID，右键单击用户名复制 ID，就像您在上面为频道 ID 所做的那样。

有关创建和授权机器人的更多信息，请访问 [OAuth2 信息页面](https://discordapp.com/developers/docs/topics/oauth2)

要有效使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/index.md)。

图片在发送消息时上传到 Discord。因此，需要图片的本地路径（即 `/config/www/garage.jpg` 而不是 `/local/garage.jpg`），并且在消息中发送图片后更新图片不会更新 Discord 中的消息。
