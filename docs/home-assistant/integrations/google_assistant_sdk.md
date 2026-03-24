---
title: Google Assistant SDK
description: 关于如何在 Home Assistant 中使用 Google Assistant SDK 的说明。
ha_category:
  - Notifications
  - Voice
ha_iot_class: Cloud Polling
ha_release: 2023.1
ha_config_flow: true
ha_domain: google_assistant_sdk
ha_codeowners:
  - '@tronikos'
ha_integration_type: service
ha_quality_scale: gold
ha_platforms:
  - diagnostics
  - notify
google_dev_console_link: https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview
api: Google Assistant API
api_link: https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview
---

**Google Assistant SDK** 集成允许 Home Assistant 与 Google Assistant 交互。如果你希望使用 Google Assistant（例如通过手机或 Google Home 设备）来控制 Home Assistant 管理的设备，那么你需要使用 [Google Assistant](/home-assistant/integrations/google_assistant) 集成。

此集成支持：

- 发送文本指令给 Google Assistant，以控制 Google Assistant 支持但 Home Assistant 不支持的设备。示例：
  - Start vacuuming
  - Stream front door on living room TV
  - Turn off kitchen TV
  - Play rain sounds on bedroom speaker
- 向 Google Assistant 音箱和显示设备广播消息，而不会打断音乐或视频播放。示例：
  - Coffee is ready
  - Someone is at the front door
  - Smoke detected in the master bedroom
  - Water leak detected in the master bathroom
- 在任意媒体播放器上播放 Google Assistant 对任意查询的语音回复。示例：
  - Tell me a joke
  - Say the ABC
  - Sing happy birthday
  - What does the elephant say?
- 通过 [conversation](/home-assistant/integrations/conversation/) 集成，使用文本或语音与 Google Assistant 进行对话。

<lite-youtube videoid="a-Is8GtLJCs" videotitle="Controlling Google Home With Home Assistant!" posterquality="maxresdefault"></lite-youtube>

## 前提条件

你需要配置开发者凭据，以允许 Home Assistant 访问你的 Google 账户。
这些凭据与 [Nest](/home-assistant/integrations/nest)、[Google Sheets](/home-assistant/integrations/google_sheets)、[YouTube](/home-assistant/integrations/youtube) 和 [Google Mail](/home-assistant/integrations/google_mail) 使用的是同一类凭据。

### 场景 1：你已经有凭据

这种情况下，你只需要启用 API：

1. 前往 Google Developers Console 的 [Google Assistant API](https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview) 页面。
2. 确认项目后，为该 API 选择 **Enable**。
3. 继续按照[配置](#configuration)部分中的步骤进行。

### 场景 2：你还没有设置凭据

这种情况下，你需要先生成客户端密钥：

<details>
<summary>生成客户端 ID 和客户端密钥</summary>

本节说明如何在 [Google Developers Console](https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview) 中生成客户端 ID 和客户端密钥。

1. 首先，前往 Google Developers Console 启用 [Google Assistant API](https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview)。
2. 选择 **Create project**，输入项目名称，然后选择 **Create**。
3. 启用 Google Assistant API。
4. 前往 **APIs & Services** > [Credentials](https://console.cloud.google.com/apis/credentials)。
5. 在左侧边栏中选择 **OAuth consent screen**。
6. 完成应用信息并创建同意屏幕。
7. 在 **Publishing status** > **Testing** 下，选择 **Publish app**。
8. 在左侧边栏中选择 **Clients**，并创建一个 **Web application** 类型的客户端。
9. 将 `https://my.home-assistant.io/redirect/oauth` 添加到 **Authorized redirect URIs**，然后选择 **Create**。
10. 在关闭对话框前，复制 **Client ID** 和 **Client Secret**。

</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

接下来，集成设置流程会引导你填写 [应用凭据](/home-assistant/integrations/application_credentials/)（OAuth Client ID 与 Client Secret），并授权 Home Assistant 访问你的 Google Assistant API。

<details>
<summary>授权步骤</summary>


1. 继续完成选择要授权账户的步骤。

2. 如果您的 Google 账户设置为 SDK 不支持的语言（可通过 Google 授权页面显示为该语言判断），授权会失败且不会给出明确错误。将错误页面底部的语言切换为 SDK [支持](https://developers.google.com/assistant/sdk/reference/rpc/languages) 的语言后，即可继续进入 Home Assistant 的关联页面。

:::note
您可能会看到一条提示，说明该应用尚未通过验证，您需要确认后才能继续。

:::
3. 此时您会看到正在授权 Home Assistant 访问的内容详情，页面底部有两个选项。请选择 **Continue**。

4. 页面现在会显示 _Link account to Home Assistant?_，请注意其中的 _Your instance URL_。如果这里不正确，请参阅 [My Home Assistant](/home-assistant/integrations/my)。确认无误后，选择 **Link Account**。

5. 您现在可以关闭窗口并返回 Home Assistant，此时应能看到来自 Home Assistant 的 _Success!_ 消息。


</details>

## 启用个性化结果（高级用户）

本指南说明如何启用个性化命令，例如“提醒我明晚 9 点去倒垃圾”。

本指南仅适用于高级用户。你需要创建桌面应用类型的 OAuth 客户端 ID，在桌面或笔记本电脑上运行 Python 程序，将生成的凭据复制到 Home Assistant 配置文件中，并且很可能还需要运行 Android 模拟器。

 ### 前提条件
 
- 已成功安装 Google Assistant 集成。

<details>
<summary>创建凭据</summary>


1. 前往 [Google Developers Console > Credentials](https://console.cloud.google.com/apis/credentials)。
2. 在左上角下拉菜单中选择你之前创建的项目。
3. 选择 **Create credentials**（页面顶部），然后选择 **OAuth client ID**。
4. 将 Application type 设为 **Desktop app**，并为这组凭据命名（例如 “Home Assistant Desktop Credentials”）。
5. 选择 **Create**。
6. 在 OAuth 客户端创建成功的页面中，选择 **Download JSON**。
7. 将下载的文件重命名为 `client_secret.json`。
8. 在你的 Windows、Linux 或 Mac 设备上，如果尚未安装 Python，请先下载安装。
9. 打开终端（在 Windows 上，选择 **Start**，然后输入 `cmd`）。
10. 在终端中运行以下命令（最好在 Python 虚拟环境中执行）：
11. `python -m pip install --upgrade google-auth-oauthlib[tool]`
  - Under Windows: `google-oauthlib-tool --scope https://www.googleapis.com/auth/assistant-sdk-prototype --scope https://www.googleapis.com/auth/gcm --save --client-secrets %userprofile%\Downloads\client_secret.json`
  - Under Linux: `google-oauthlib-tool --scope https://www.googleapis.com/auth/assistant-sdk-prototype --scope https://www.googleapis.com/auth/gcm --save --client-secrets ~/Downloads/client_secret.json`
  - **结果**：浏览器会打开一个窗口，要求你选择用于继续访问之前所创建云项目的账户。
12. 选中正确的账户后，勾选以下两个复选框：
  - **Use your Google Assistant: broad access to your Google account**
  - **Send information to your Android device**
13. 选择 **Continue**。
  - **结果**：如果一切顺利，浏览器中会显示 **The authentication flow has completed. You may close this window** 消息。
  - 终端中会显示凭据保存的路径。例如：`credentials saved: C:\Users\user\AppData\Roaming\google-oauthlib-tool\credentials.json`
14. 用文本编辑器打开 `credentials.json`。请保持该文件打开，因为你需要从中复制多个值。
15. 在 Home Assistant 的文件编辑器中（通常是 http://homeassistant.local:8123/core_configurator），打开 `/homeassistant/.storage/application_credentials`。
  - 找到 `google_assistant_sdk` 对应条目，并将 `client_id` 和 `client_secret` 修改为 `credentials.json` 中的值。
  - 保存文件。
16. 打开 `/homeassistant/.storage/core.config_entries`。
  - 找到 `google_assistant_sdk` 对应条目，并将 `refresh_token` 修改为 `credentials.json` 中的值。
  - 保存文件。
17. 重启 Home Assistant。


</details>

<details>
<summary>启用个性化结果</summary>


1. 前往 [**设置** > **开发者工具** > **操作**](https://my.home-assistant.io/redirect/developer_services/)，发送一个需要个性化结果的查询，例如调用 `google_assistant_sdk.send_text_command` 并设置 `command: "what is my name"`。
2. 你的手机上应该会收到一条通知：**Allow personal answers** **Allow Google Assistant to answer your questions about your calendar, trips, and more**。
3. 不要点按 **ALLOW**（在你输入设备名称之前，这不会生效）。请改为点按通知文本本身。
4. 如果应用没有打开，你需要换到运行 Android 12 的设备上重试。如果你没有这样的设备，可以使用 Android 模拟器。
5. 点按 **Device Name**，输入任意设备名称（例如 Home Assistant），然后点按 **OK**。
6. 只有在设备名称非空后，才能启用 **Personal results** 旁边的复选框。


</details>

## 故障排除

如果你的凭据有问题，可以在 [应用凭据](/home-assistant/integrations/application_credentials/) 用户界面中删除它们。

如果命令不起作用，尝试去掉多余的词，例如 “the”。比如用 “play rain sounds on bedroom speaker”，而不是 “play rain sounds on the bedroom speaker”。

如果针对某个特定设备的命令失败（例如将摄像头画面投到 Google TV），你可能需要在该设备本身上启用 “Personal Results”。例如，在 Google TV 或 Chromecast with Google TV 上，这个设置可能位于 `Settings > Privacy > Google Assistant > Personal Results`。除了在 Google Home 应用中启用之外，这一步也可能是必需的。

如果广播功能不起作用，请确认：扬声器没有处于免打扰模式，并且 Home Assistant 服务器与扬声器位于同一网络中。

检查集成是否正常工作的最简单方式，是前往 [My Google Activity](https://myactivity.google.com/myactivity) 查看已发送的命令及其响应。

## 限制与已知问题

- 不支持多个 Google 账户。
- 如果你能在 [My Google Activity](https://myactivity.google.com/myactivity) 中看到已发送的命令，说明集成本身工作正常。如果命令没有产生预期结果，请不要在 Home Assistant Core 项目或其[底层库](https://github.com/tronikos/gassist_text)中提交 issue。你应当直接向 Google [这里](https://github.com/googlesamples/assistant-sdk-python/issues) 报告问题。以下是一些已知的 Google Assistant API 问题：
  - Media playback commands (other than play news, play podcast, play white noise, or play rain sounds) don't work.
  - Routines don't work.
  - Google Assistant automations that use `assistant.event.OkGoogle` as a starter cannot be triggered.
  - Broadcast to specific rooms often doesn't work for non-English languages.
  - Commands that need to verify your identity through voice match do not work.

## 配置

在配置页面中，你可以设置与 Google Assistant 交互时使用的语言代码。如果未配置，集成会根据 Home Assistant 当前设置的语言和国家自动选择。支持的语言列表请参见[这里](https://developers.google.com/assistant/sdk/reference/rpc/languages)。

## 操作

### 发送文本指令

你可以使用 `google_assistant_sdk.send_text_command` 操作向 Google Assistant 发送命令。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `command`              | no       | Command(s) to send to Google Assistant. |
| `media_player`         | yes      | Name(s) of media player entities to play the Google Assistant's audio response on. This does **not** target the device for the command itself. |

示例：

```yaml
action: google_assistant_sdk.send_text_command
data:
  command: "turn off kitchen TV"
```

```yaml
# Say a joke on the living room speaker. The `media_player` entity receives the audio response.
action: google_assistant_sdk.send_text_command
data:
  command: "tell me a joke"
  media_player: media_player.living_room_speaker
```

```yaml
# Stream a camera to a Chromecast-enabled TV or display.
# The target device ("living room tv") must be part of the command itself.
action: google_assistant_sdk.send_text_command
data:
  command: "show the front door camera on the living room tv"
```

注意：要控制特定设备，比如将摄像头画面投到电视上，你必须在文本 `command` 中包含该设备的名称（以 Google Assistant 识别的名称为准）。`media_player` 参数仅用于播放 Google Assistant 的语音响应，不会决定视频流的目标设备。

你可以在同一会话上下文中发送多条命令，这对于解锁门锁或打开需要 PIN 码的遮阳帘等场景很有用。示例：

```yaml
action: google_assistant_sdk.send_text_command
data:
  command:
    - "open the garage door"
    - "1234"
```

你还可以获取响应。示例：

```yaml
action: google_assistant_sdk.send_text_command
data:
  command:
    - "tell me a joke"
    - "tell me another one"
```

返回结果：

```yaml
responses:
  - text: |-
      What do you call a belt made of watches?
      A waist of time 👖 🕝
  - text: |-
      What's the most musical part of the turkey?
      The drumsticks 🍗
```

### 操作：广播消息

`notify.google_assistant_sdk` 操作允许你向 Google Assistant 扬声器和显示设备广播消息，而不会打断音乐或视频播放。

| Data attribute | Optional | Description                 | Example                      |
| ---------------------- | -------- | --------------------------- | ---------------------------- |
| `message`              | no       | Message to broadcast.       | someone is at the front door |
| `target`               | yes      | Rooms (in Google Assistant) | bedroom                      |

向所有扬声器广播的示例：

```yaml
action: notify.google_assistant_sdk
data:
  message: time for dinner
```

向指定房间中的扬声器广播的示例：

```yaml
action: notify.google_assistant_sdk
data:
  message: time for dinner
  target:
    - bedroom
    - basement
```

## 对话代理

你可以添加一个助手，并将对话代理设置为 “Google Assistant SDK”。
相关设置说明请参见[这里](/home-assistant/voice_control/voice_remote_local_assistant/)的 assistant 设置部分。
然后，你就可以通过点按仪表板右上角的 Assist 图标来与 Google Assistant 对话：

![Screenshot Conversation](/home-assistant/images/integrations/google_assistant_sdk/conversation.png)

或者通过调用 `conversation.process` 操作。

注意：由于 Google Assistant API 的一个问题，并非所有响应都包含文本，尤其是像“打开灯”这样的家庭控制命令。这类情况会显示为 `<empty response>`。这是因为 Google Assistant 返回的是 HTML，而 Home Assistant 集成[不允许](https://github.com/home-assistant/architecture/blob/master/adr/0004-webscraping.md)解析 HTML。


## 删除集成

### 从 Home Assistant 中删除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择该集成卡片。
2. 在设备列表中，选择你要删除的集成实例。
3. 在该条目旁选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **删除**。
