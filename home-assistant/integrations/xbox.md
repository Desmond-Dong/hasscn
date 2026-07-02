# Xbox

**Xbox** 集成可让您将 Home Assistant 连接到 **Xbox Network**。

## 关于 Xbox Network

Xbox Network 是微软面向 Xbox 主机和 Windows PC 的在线游戏与娱乐平台。您可以使用 Xbox Network 进行多人游戏。它提供好友、派对、云存档和数字游戏购买等社交与服务功能，还可访问应用和在线服务。该平台可连接玩家、管理资料，并为整个 Xbox 生态系统提供在线功能支持。

## 您可以如何使用此集成

Home Assistant Xbox 集成可让您监控和控制 Xbox One（及更新机型）主机，同时跟踪您在 Xbox Network 上关注的好友。它会公开主机状态和活动信息，并提供与好友在线状态及活动相关的数据，可用于仪表板和自动化。

## 前提条件

* 您必须使用**非儿童 Xbox 账户**（18 岁以上）登录。
* 要启用媒体播放器和遥控器实体，请确保已在 Xbox 上的 **Settings** > **Devices & connections** > **Remote features** 中开启 **remote features**。
* Home Assistant 通过 OAuth2 并借助 Home Assistant Cloud 的账户关联服务连接到 **Xbox Network**。要使用此功能，您的 `configuration.yaml` 必须包含 `cloud:` 或 `default_config:`。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 跟踪好友在线状态

**Xbox 集成**允许您跟踪好友的在线状态、活动及其他信息。要添加好友，请前往 [**Settings** > **Devices & services** > **Xbox**](https://my.home-assistant.io/redirect/integration/?domain=xbox) 并选择 **`[mdi:plus]` Add friend**。

添加后，将出现一个新设备，并提供与您自己 Xbox 账户相同的一组实体，以便您跟踪好友活动。

## 支持的设备

* Xbox One (S/X)
* Xbox Series S/X

## 媒体播放器

Xbox 媒体播放器平台会为与您的 Microsoft 账户关联的每台主机创建媒体播放器实体。这些实体会显示当前活动应用和播放控制项，并提供媒体浏览器功能，让您能够启动任意已安装的应用。

### 操作：播放媒体

`play_media` 操作会使用应用的 product ID 在 Xbox 主机上启动应用。也支持使用 `Home` 跳转到仪表板主页。

您可以在 [**Settings** > **Developer tools** > **Events**](https://my.home-assistant.io/redirect/developer_events/) 选项卡中监听 `call_service` 事件来查找 Product ID。在新的浏览器标签页中打开主机的媒体浏览器，并选择某个应用或游戏，即可在事件中看到对应的 product ID。

| Data attribute         | Description                           |
| ---------------------- | --------------------------------------|
| `entity_id`            | `entity_id` of the Xbox media player  |
| `media_content_id`     | "Home"/{product\_id}                   |
| `media_content_type`   | Any Value                             |

#### 示例

```yaml
entity_id: media_player.xboxone
media_content_type: ""
media_content_id: "Home"
```

```yaml
entity_id: media_player.xboxone
media_content_type: ""
media_content_id: "9WZDNCRFJ3TJ" # Netflix
```

## 遥控器

Xbox 遥控器平台会为与您的 Microsoft 账户关联的每台主机创建 Remote 实体。这些实体允许您开关机，并向主机发送手柄指令或文本输入。

### 操作：发送命令

`send_command` 操作用于向 Xbox 主机发送手柄命令或文本输入。

| Data attribute | Optional | Description                                                       |
| ---------------------- | -------- | --------------------------------------------------------- |
| `entity_id`            | no       | `entity_id` of the Xbox remote.                           |
| `command`              | no       | List of the controller commands or text input to be sent. |
| `num_repeats`          | yes      | Number of times to repeat the commands.                   |
| `delay_secs`           | yes      | Interval in seconds between one send and another.         |

**可用命令**：`A`、`B`、`X`、`Y`、`Up`、`Down`、`Left`、`Right`、`Menu`、`View`、`Nexus`、`WakeUp`、`TurnOff`、`Reboot`、`Mute`、`Unmute`、`Play`、`Pause`、`Next`、`Previous`、`GoHome`、`GoBack`、`ShowGuideTab`、`ShowGuide`

#### 示例

```yaml
entity_id: remote.xboxone
command: "A"
```

```yaml
entity_id: remote.xboxone
command: "A"
num_repeats: 20
```

```yaml
entity_id: remote.xboxone
command:
  - Right
  - Right
  - A
delay_sec: 0.1
```

### 图片元素卡片

下面是一个可添加到仪表板中的图片元素卡片示例，它可在前端提供 Xbox 手柄界面。它使用了上文介绍的服务。请将 `remote.xboxone` 和 `media_player.xboxone` 替换为您自己的实体名称即可。示例由 [@SeanPM5](https://github.com/SeanPM5) 和 [@hunterjm](https://github.com/hunterjm) 提供。

<p class='img'>
  <img src='/home-assistant/images/integrations/xbox/xbox_picture_entity.png' alt='Screenshot showing Xbox Controller in a dashboard.'>
  Screenshot showing Xbox Controller in a dashboard.
</p>

<details>
<summary>查看 YAML 配置</summary>

```yaml
type: picture-elements
image: >-
  data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjEwIiBoZWlnaHQ9IjkwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogPG1ldGFkYXRhPgogIDxyZGY6UkRGPgogICA8Y2M6V29yayByZGY6YWJvdXQ9IiI+CiAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgIDxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz4KICAgIDxkYzp0aXRsZS8+CiAgIDwvY2M6V29yaz4KICA8L3JkZjpSREY+CiA8L21ldGFkYXRhPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGlkPSJjYW52YXNfYmFja2dyb3VuZCIgeD0iLTEiIHk9Ii0xIiB3aWR0aD0iODAyIiBoZWlnaHQ9IjYwMiIgZmlsbD0ibm9uZSIvPgogPC9nPgogPGNpcmNsZSBjeD0iOTkuMTgiIGN5PSIyMCIgcj0iMTQiIGZpbGw9IiNmZmYiLz4KIDxjaXJjbGUgY3g9IjE0OC4xOCIgY3k9IjU0IiByPSIxMC41IiBmaWxsPSIjMzMzIiBzdHJva2U9IiNmZmYiLz4KIDxwYXRoIGQ9Im0xNTMuMTYgNTkuMzVjLTAuMTEgMC4yMDYtMC4zNCAwLjMyNS0wLjYyNyAwLjMyNWgtMS4zNjhjLTAuNDU1IDAtMC45ODQtMC4yODktMS4yMy0wLjY3MmwtMS43MDEtMi42NTdjLTAuMDMtMC4wNDUtMC4wNTUtMC4wNjItMC4wNjItMC4wNjQgNGUtMyAyZS0zIC0wLjAyMSAwLjAxOC0wLjA1MSAwLjA2NWwtMS43MDkgMi42NTdjLTAuMjQ3IDAuMzgzLTAuNzc2IDAuNjcxLTEuMjMgMC42NzFoLTEuMzUzYy0wLjI4OCAwLTAuNTE2LTAuMTE4LTAuNjI4LTAuMzI0LTAuMTExLTAuMjA2LTAuMDg1LTAuNDYzIDAuMDczLTAuNzAzbDIuOTc2LTQuNTQ1YTAuNzA0IDAuNzA0IDAgMCAwIDJlLTMgLTAuNjc2bC0yLjY0LTQuMDc0Yy0wLjE1NS0wLjI0MS0wLjE4LTAuNDk4LTAuMDY5LTAuNzA0IDAuMTEzLTAuMjA2IDAuMzQyLTAuMzI0IDAuNjMtMC4zMjRoMS4yODZjMC40NTcgMCAwLjk4NCAwLjI5MiAxLjIyNSAwLjY4bDEuNDkgMi4zODVhMC4yMyAwLjIzIDAgMCAwIDAuMDQ4IDAuMDU3YzNlLTMgLThlLTMgMC4wMi0wLjAyNCAwLjA0LTAuMDU3bDEuNDU1LTIuMzhjMC4yMzktMC4zOSAwLjc2NC0wLjY4NSAxLjIyMi0wLjY4NWgxLjI2N2MwLjI4NyAwIDAuNTE2IDAuMTE4IDAuNjI4IDAuMzI0IDAuMTEzIDAuMjA2IDAuMDg5IDAuNDYyLTAuMDY3IDAuNzA0bC0yLjY1OCA0LjE1YTAuNjk5IDAuNjk5IDAgMCAwIDVlLTMgMC42NzVsMi45NyA0LjQ3YzAuMTU5IDAuMjQgMC4xODcgMC40OTYgMC4wNzYgMC43MDJ6IiBmaWxsPSIjMmQ4OWVmIi8+CiA8Y2lyY2xlIGN4PSIxNjguMTgiIGN5PSI3NCIgcj0iMTAuNSIgZmlsbD0iIzMzMyIgc3Ryb2tlPSIjZmZmIi8+CiA8cGF0aCBkPSJtMTczLjU3IDc5LjM2MmMtMC4xMzQgMC4yLTAuMzY4IDAuMzE0LTAuNjQyIDAuMzE0aC0xLjExM2MtMC40OCAwLTAuOTc1LTAuMzQtMS4xNDctMC43ODlsLTAuNDktMS4yNzVhMC42NDIgMC42NDIgMCAwIDAtMC41MzItMC4zNjVoLTMuMDM2YTAuNjIgMC42MiAwIDAgMC0wLjUyIDAuMzY0bC0wLjQ2IDEuMjY3Yy0wLjE2MyAwLjQ0Ny0wLjY2MyAwLjc5OC0xLjE0IDAuNzk4aC0xLjA1M2MtMC4yNzMgMC0wLjUwOC0wLjExNS0wLjY0NC0wLjMxMy0wLjEzNi0wLjE5OS0wLjE1Ny0wLjQ1OS0wLjA1OC0wLjcxM2wzLjcxNi05LjU0YTEuMjkzIDEuMjkzIDAgMCAxIDEuMTUtMC43ODZoMS4wNDdjMC40OCAwIDAuOTc2IDAuMzM2IDEuMTU0IDAuNzgxbDMuODIgOS41NDVjMC4xMDQgMC4yNTMgMC4wODUgMC41MTMtMC4wNSAwLjcxMnptLTUuNDY3LTcuMjU3LTAuOTI2IDIuNTQyYy0wLjAyIDAuMDU1LTAuMDE4IDAuMDk1LThlLTMgMC4xMDkgMC4wMSAwLjAxMyAwLjA0NiAwLjAzIDAuMTA0IDAuMDNoMS42ODFjMC4wNjcgMCAwLjA5Ny0wLjAxOCAwLjEwMy0wLjAyOCA3ZS0zIC0wLjAxMSAwLjAxNC0wLjA0NS0wLjAxLTAuMTA3eiIgZmlsbD0iIzVkYzIxZSIvPgogPGNpcmNsZSBjeD0iMTg4LjE4IiBjeT0iNTQiIHI9IjEwLjUiIGZpbGw9IiMzMzMiIHN0cm9rZT0iI2ZmZiIvPgogPHBhdGggZD0ibTE5My41NCA1OC4xMThhMy40MiAzLjQyIDAgMCAxLTEuMTEgMS4zMThjLTAuNDY3IDAuMzI3LTEuMDQ2IDAuNTMzLTEuNzIyIDAuNjA3LTAuNDE1IDAuMDQzLTEuMzc1IDAuMDctMi44NTUgMC4wOGgtMy4yNzZjLTAuNTUxIDAtMS0wLjQ0OC0xLTF2LTEwLjI0NWMwLTAuNTUyIDAuNDQ5LTEgMS0xaDMuOTYyYzAuOTQ1IDAgMS42MzQgMC4wMzkgMi4xMDYgMC4xMTkgMC40OTYgMC4wODQgMC45NDcgMC4yNjMgMS4zNCAwLjUzIDAuMzk4IDAuMjc1IDAuNzMgMC42MzYgMC45ODYgMS4wNzQgMC4yNjcgMC40NTQgMC40MDIgMC45NjcgMC40MDIgMS41MjMgMCAwLjYwNi0wLjE2NSAxLjE2OS0wLjQ5MSAxLjY3M2EzLjA2IDMuMDYgMCAwIDEtMC42OTIgMC43NThsLTAuMDIzIDAuMDE3IDAuMDE4IDAuMDFjMC40NTQgMC4yMjQgMC44MyAwLjUyOSAxLjEyIDAuOTA1IDAuNDIyIDAuNTUzIDAuNjM3IDEuMjA3IDAuNjM3IDEuOTQ4YTMuNzkgMy43OSAwIDAgMS0wLjQwMSAxLjY4NHptLTMuNDM3LTIuODk2Yy0wLjE5NS0wLjA2OS0wLjY5NC0wLjE1LTEuOTY4LTAuMTVoLTEuMjJhMC4zNCAwLjM0IDAgMCAwLTAuMzQgMC4zNHYxLjc1OWMwIDAuMTg4IDAuMTUzIDAuMzQgMC4zNCAwLjM0aDEuNDk3YzEuMDE4IDAgMS4zOTgtMC4wMzQgMS41MzctMC4wNjMgMC4yODQtMC4wNTMgMC41MDItMC4xNyAwLjY3Mi0wLjM2IDAuMTYzLTAuMTg0IDAuMjQzLTAuNDM1IDAuMjQzLTAuNzYzIDAtMC4yODMtMC4wNjMtMC41MS0wLjE5My0wLjY5OWExLjEwNyAxLjEwNyAwIDAgMC0wLjU2OC0wLjQwNHptLTMuMTg4LTIuNzM4aDAuODY1YzAuODk1IDAgMS40NTQtMC4wMTMgMS42NjEtMC4wMzcgMC4zMjItMC4wMzggMC41NzQtMC4xNDcgMC43NDktMC4zMiAwLjE2Ni0wLjE2NyAwLjI0Ny0wLjM4NyAwLjI0Ny0wLjY3MiAwLTAuMTM2LTAuMDE3LTAuMjYtMC4wNTItMC4zNjctMC4wNTEtMC4xNi0wLjI5LTAuNDIyLTAuNDQ3LTAuNDg4LTAuMTEtMC4wNDctMC4yNC0wLjA4LTAuMzktMC4wOTgtMC4yMTMtMC4wMjUtMC44NzMtMC4wMzctMS45NTgtMC4wMzdoLTAuNjc0YTAuMzQgMC4zNCAwIDAgMC0wLjM0IDAuMzR2MS4zMzljMCAwLjE4OCAwLjE1MiAwLjM0IDAuMzQgMC4zNHoiIGZpbGw9IiNlMTEiLz4KIDxjaXJjbGUgY3g9IjE2OC4xOCIgY3k9IjM0IiByPSIxMC41IiBmaWxsPSIjMzMzIiBzdHJva2U9IiNmZmYiLz4KIDxwYXRoIGQ9Im0xNzMuMTMgMjkuMzUzLTMuMjY5IDUuMTZjLTAuMTQ5IDAuMjM2LTAuMjggMC42ODctMC4yOCAwLjk2NXYzLjI0OWEwLjk1IDAuOTUgMCAwIDEtMC45NDggMC45NDhoLTAuOTE2YTAuOTUgMC45NSAwIDAgMS0wLjk0OS0wLjk0OHYtMy4yNjRjMC0wLjI3OS0wLjEzLTAuNzI5LTAuMjgtMC45NjRsLTMuMjU0LTUuMTQ2Yy0wLjE1Mi0wLjI0My0wLjE3Ni0wLjUtMC4wNjItMC43MDUgMC4xMTMtMC4yMDUgMC4zNDMtMC4zMjMgMC42MjktMC4zMjNoMS4yOTNjMC40NiAwIDAuOTgzIDAuMjk3IDEuMjE5IDAuNjkybDEuODgzIDMuMTY3YzAuMDEzIDAuMDIgMC4wMjMgMC4wMzUgMC4wMzMgMC4wNDUgNGUtMyAtMC4wMSAwLjAxMy0wLjAyNCAwLjAyNS0wLjA0NGwxLjg0NC0zLjE2M2MwLjIzMi0wLjM5OCAwLjc1NC0wLjY5NyAxLjIxNS0wLjY5N2gxLjI1MmMwLjI4NyAwIDAuNTE2IDAuMTE4IDAuNjI5IDAuMzI0IDAuMTE0IDAuMjA1IDAuMDkgMC40NjItMC4wNjQgMC43MDR6IiBmaWxsPSIjZmZjNDBkIi8+CiA8ZyBmaWxsPSIjMzMzIj4KICA8cGF0aCBkPSJtMzYuMzk3IDQ2LjY5YzAgMC42MDQgMC40OSAxLjA5NCAxLjA5MyAxLjA5NGgxMi4xOXYxMi40MzJoLTEyLjE5Yy0wLjYwMyAwLTEuMDkzIDAuNDktMS4wOTMgMS4wOTN2MTIuMTkxaC0xMi40MzR2LTEyLjE5YzAtMC42MDQtMC40OS0xLjA5NC0xLjA5My0xLjA5NGgtMTIuMTl2LTEyLjQzMmgxMi4xOWMwLjYwMyAwIDEuMDkzLTAuNDkgMS4wOTMtMS4wOTN2LTEyLjE5MWgxMi40MzR6IiBzdHJva2U9IiNmZmYiLz4KICA8cGF0aCBkPSJtMTA0LjY0IDguMjQ1Yy0zLjA3NSAwLjE4NC01LjA5OCAxLjQ5OC01LjU4OCAxLjg0OC0wLjQ3My0wLjM0My0yLjQyNS0xLjU5Ny01LjM4My0xLjgyNSAxLjY3OC0wLjc5MiAzLjUzMi0xLjI2OCA1LjUwOC0xLjI2OCAxLjk2IDAgMy43OTcgMC40NjYgNS40NjQgMS4yNDV6bS01LjU4NyA4LjdjNi43ODggNS4yNDIgOC44ODggOS42MjIgOS41MzUgMTEuOTczLTIuMzcxIDIuNTAzLTUuNzAyIDQuMDgyLTkuNDEyIDQuMDgyLTMuODEzIDAtNy4yMTQtMS42OC05LjU5NS00LjMwMyAwLjcxOC0yLjQwMiAyLjg5MS02LjY3MSA5LjQ3Mi0xMS43NTN6bTguMzYxLTYuOTJjMi44ODQgMi4zODggNC43NjIgNS45NDcgNC43NjMgOS45NzUgMCAyLjc5Ny0wLjkwOSA1LjM3Ni0yLjQxOCA3LjQ5OSAwLjMyNS02LjYzNy03LjA2Ny0xMy44MzgtNy4wNjctMTMuODM4IDAuMjY4LTEuNDc2IDIuOTc4LTIuODA3IDQuNzIyLTMuNjM2em0tMTYuNTY1IDAuMDc3YzEuNzQ0IDAuODMyIDQuMzA3IDIuMTM0IDQuNTY4IDMuNTY1IDAgMC03LjEzMyA2Ljk1Ni03LjA3MyAxMy40OTdhMTIuOTI2IDEyLjkyNiAwIDAgMS0yLjE2Ny03LjE2MWMwLTMuOTg3IDEuODM4LTcuNTE2IDQuNjcyLTkuOXoiLz4KICA8cGF0aCBkPSJtOTkuNzYxIDY1LjIzMmgtMS41MzY0djcuNjgyMmgxLjUzNjR2LTcuNjgyMm0zLjcxMDUgMS42NjctMS4wOTA5IDEuMDkwOWMxLjI1OTkgMS4wMTQgMS45ODk3IDIuNTQyOCAxLjk4OTcgNC4xNTYxYTUuMzc3NSA1LjM3NzUgMCAwIDEtNS4zNzc1IDUuMzc3NWMtMi45NjUzIDAtNS4zNzc1LTIuMzk2OC01LjM3NzUtNS4zNzc1IDAtMS42MDU2IDAuNzI5ODEtMy4xNDIgMS45ODItNC4xNjM3bC0xLjA4MzItMS4wODMyYy0yLjkxMTUgMi40NzM3LTMuMjY0OSA2LjgzNzEtMC43OTEyNiA5Ljc0ODcgMi40NzM3IDIuOTAzOSA2LjgzNzEgMy4yNTcyIDkuNzQ4NyAwLjc4MzU4IDEuNTUxOC0xLjMxMzYgMi40MzUyLTMuMjQ5NiAyLjQzNTItNS4yODUzIDAtMi4wMjA0LTAuODkxMTMtMy45NDEtMi40MzUyLTUuMjQ2OXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii43NjgyMiIgc3R5bGU9InBhaW50LW9yZGVyOnN0cm9rZSBmaWxsIG1hcmtlcnMiLz4KIDwvZz4KPC9zdmc+Cg==
elements:
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: Up
    style:
      top: 45.35%
      left: 14.3%
      width: 6.2%
      height: 15%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: Down
    style:
      top: 74.7%
      left: 14.3%
      width: 6.2%
      height: 15%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: Left
    style:
      top: 60%
      left: 8.05%
      height: 14.4%
      width: 6.4%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: Right
    style:
      top: 60%
      left: 20.65%
      height: 14.4%
      width: 6.4%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: "A"
    style:
      top: 82.5%
      left: 80.05%
      width: 10.5%
      height: 24.4%
      border-radius: 100%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: "X"
    style:
      top: 60.0%
      left: 70.6%
      width: 10.5%
      height: 24.4%
      border-radius: 100%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: "B"
    style:
      top: 60.0%
      left: 89.5%
      width: 10.5%
      height: 24.4%
      border-radius: 100%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: "Y"
    style:
      top: 37.9%
      left: 80.05%
      width: 10.5%
      height: 24.4%
      border-radius: 100%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.toggle
    service_data:
      entity_id: remote.xboxone
    style:
      top: 80.2%
      left: 47.2%
      width: 7%
      height: 16%
      border-radius: 100%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: Nexus
    style:
      top: 22.2%
      left: 47.2%
      width: 13.4%
      height: 31.2%
      border-radius: 100%
      overflow: hidden
```

</details>

## 二进制传感器

**Xbox 二进制传感器平台**会自动跟踪您自己账户以及好友的在线状态和活动情况。

| Entity Name                      | Description                                                            |
| -------------------------------- | ---------------------------------------------------------------------- |
| (*Gamertag* )                    | Shows the online status of your friend. The entity’s attributes provide extra information, including real name and bio. |
| **In game**                      | Shows if your friend is currently playing a game.                      |
| **Subscribed to Xbox Game Pass** | Indicates whether the friend is currently subscribed to Xbox Game Pass.|

## 传感器

与二进制传感器类似，**Xbox 传感器平台**会监控您的账户和好友，并提供其活动与成就的详细信息。

| Entity Name      | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| **Status**       | Shows the text status of your friend as it appears in your friends list.   |
| **Gamerscore**   | Friend's Gamerscore.                                                       |
| **Friends**      | Displays the number of mutual friend relationships of the account.         |
| **Follower**     | Displays the number of people following the account.                       |
| **Following**    |  Displays the number of people the account is following.                   |
| **Last online**  | Displays the last time the friend was active online.                       |
| **In party**     | Shows the number of people in the user’s party chat if they are currently in one. |
| **Now playing**  | Shows the title of the game currently being played. Additional details such as a short description, genre, developer, age rating, and achievement progress are available in the entity's attributes. |

### 存储传感器

这些传感器用于跟踪您自己的 **Xbox 主机**及其连接存储设备的存储空间情况。

| Entity Name      | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| **Total space: *{name}*** | Reports the total storage capacity of the device. A separate sensor is created for each Xbox console and connected internal and external storage device. |
| **Free space: *{name}*** | Reports the available (unused) storage space on the device. A separate sensor is created for each Xbox console and connected internal and external storage device. |

## 图像

对于您的账户以及每位好友，都提供了多个图像实体：

| Entity Name      | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Avatar**       | Shows the classic Xbox avatar for you or your friend, if available. You can create or customize your own avatar using the [Xbox Original Avatars app](https://apps.microsoft.com/detail/9nblgggz5qdq?ocid=webpdpshare). |
| **Gamerpic**     | Shows the current **Gamerpic** that represents you or your friend across the Xbox Network. |
| **Now playing**  | Displays the cover art of the game you or your friends are currently playing.          |

## 媒体源

Xbox 媒体源平台允许您通过媒体浏览器面板浏览自己的和社区的游戏片段、截图，以及您玩过游戏的宣传图片。与其他媒体源集成一样，您也可以将这些内容发送到 Chromecast 等受支持的媒体播放器。

## 手动 OAuth2 配置

:::warning
这些步骤并非必需，如果因此遇到问题，也不属于支持范围。

:::
如果您不想使用 Home Assistant 账户关联服务，并且您的实例已通过 HTTPS 对外公开访问，则可以按照以下步骤手动配置本地实现：

* Register a new application in [Azure AD](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
  * Name your app
  * Select "Personal Microsoft accounts only" under supported account types
  * For Redirect URI, add: `https://my.home-assistant.io/redirect/oauth`
* Copy your Application (client) ID for later use
* On the App Page, navigate to "Certificates & secrets"
  * Generate a new client secret and save for later use

You may then add the credentials to [Application Credentials](/home-assistant/integrations/application_credentials/index.md) and then setup the integration.

<details>
<summary>已手动禁用 My Home Assistant</summary>

If you don't have [My Home Assistant](/home-assistant/integrations/my.md) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`.

</details>

## 数据更新

此集成每 10 分钟将您的主机与 Xbox Network 同步一次。主机状态（包括电源状态和当前播放的媒体）每 10 秒刷新一次。在线状态信息每 30 秒更新一次。

## 已知限制

* 当 Xbox 主机处于 **energy saving** 模式时，无法通过 Home Assistant 将其唤醒。Xbox 关机后最终会自动进入节能模式。若要通过 Home Assistant 远程唤醒，必须在电源选项中将主机设置为 **sleep mode**。请注意，与 **shutdown (energy saving) mode** 相比，这种模式会消耗更多电能。更多详情请参阅 [Xbox documentation on power modes](https://support.xbox.com/en-US/help/hardware-network/power/learn-about-power-modes)。

## 故障排除

**Xbox** 集成依赖可用的互联网连接与 **Xbox Network** 通信。如果您遇到问题，请确认网络连接稳定。Xbox Network 服务本身也可能出现不可用情况，可能是突发故障，也可能是计划维护所致。

在报告问题时，请启用 [debug logging](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)。重启集成，并在问题再次出现后立即关闭调试日志。调试日志文件会自动下载。

## 删除集成

此集成可按以下步骤删除：

### 从 Home Assistant 中移除集成实例

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
