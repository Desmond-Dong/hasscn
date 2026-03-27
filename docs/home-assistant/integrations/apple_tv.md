---
title: Apple TV
description: 'Apple TV 集成允许您控制 Apple TV（任何一代）。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Media player
  - Multimedia
  - Remote
ha_iot_class: Local Push
ha_release: 0.49
ha_domain: apple_tv
ha_codeowners:
  - '@postlund'
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - media_player
  - remote
ha_integration_type: device
---
# Apple TV

**Apple TV** 集成允许您控制 Apple TV（任何一代）。

目前 Apple TV 设备内支持以下实体：

- [媒体播放器](#media-player)
- [远程控制](#remote)
- [键盘焦点](#keyboard-focused) `binary_sensor`


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 媒体播放器

Apple TV 媒体播放器平台将为网络上发现的每台 Apple TV 创建一个媒体播放器实体。
该实体将显示活动应用程序和播放控制。

### 启动应用程序

您可以使用 `media_player.select_source` 动作或媒体浏览器中的"应用程序"文件夹启动应用程序。

使用 `media_player.play_media` 动作，您还可以使用 `Deep Links` 在应用程序中启动特定内容。

热门应用程序的一些 `Deep Links` 示例：

| 应用程序  | URL                                                                   |
| --------- | --------------------------------------------------------------------- |
| YouTube   | youtube://www.youtube.com/watch?v=dQw4w9WgXcQ                         |
| Netflix   | https://www.netflix.com/title/80234304                                |
| Disney+   | https://www.disneyplus.com/series/the-beatles-get-back/7DcWEeWVqrkE   |
| Apple TV+ | https://tv.apple.com/show/severance/umc.cmc.1srk2goyh2q2zdxcx605w8vtx |

查找有用的 `Deep Links` 的最简单方法是使用 App 的 iOS 或 macOS 版本中的"分享"功能。分享表通常有"复制"或"复制链接"功能。对于有网页版的应用程序，从浏览器复制的链接通常也可以使用。如果开发人员维护单独的 iOS 和 tvOS 应用程序，此类链接可能无法使用。发现应用程序支持的链接的更多方法可以在 [pyatv 文档](https://pyatv.dev/development/apps/#app-deep-links)中找到。

示例：

```yaml
# 在 Netflix 应用程序中打开特定标题
action: media_player.play_media
data:
  media_content_type: url
  media_content_id: https://www.netflix.com/title/80234304
target:
  entity_id: media_player.living_room_apple_tv
```

```yaml
# 打开特定的 YouTube 视频：
action: media_player.play_media
data:
  media_content_type: url
  media_content_id: youtube://www.youtube.com/watch?v=dQw4w9WgXcQ
target:
  entity_id: media_player.living_room_apple_tv
```

## 远程控制

Apple TV 远程控制平台将自动为您的 Home Assistant 实例上配置的每台 Apple TV 创建一个远程控制实体。
这些实体允许您打开/关闭设备并发送控制命令。

目前支持以下命令：

- `wakeup`
- `suspend`
- `home`
- `top_menu`
- `menu`
- `select`
- `play`
- `pause`
- `up`
- `down`
- `left`
- `right`
- `volume_up`
- `volume_down`
- `previous`
- `next`
- `skip_backward`
- `skip_forward`

**注意：** 并非所有 Apple TV 版本都支持所有命令。

### 动作 `send_command`

| 动作数据<br>属性 | 可选 | 描述                                                                                                                   |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`               | 否       | Apple TV 的 `entity_id`                                                                                                   |
| `command`                 | 否       | 要发送的命令或命令列表                                                                                       |
| `num_repeats`             | 是      | 重复命令的次数                                                                                        |
| `delay_secs`              | 是      | 一次发送与另一次发送之间的间隔（秒） <br> 这是一个 `float` 值，例如 1、1.2 等。                                |
| `hold_secs`               | 是      | 按住按钮的秒数。 <br> 这是一个 `float` 值，但请使用 0 表示不按住，1 表示按住按钮 |

### 示例

创建一个脚本，根据应用程序图标在主屏幕上的固定位置调用 Netflix 应用程序：

```yaml
lounge_appletv_netflix:
  alias: "选择 Netflix"
  sequence:
    - action: remote.send_command
      target:
        entity_id: remote.lounge_appletv
      data:
        delay_secs: 1.5
        command:
          - top_menu
          - home
          - right
          - select
```

使用快捷操作菜单让 Apple TV 进入睡眠并关闭媒体播放器的脚本：

```yaml
apple_tv_sleep:
  alias: "让 Apple TV 进入睡眠"
  sequence:
    - action: remote.send_command
      target:
        entity_id: remote.lounge_appletv
      data:
        command:
          - suspend
    - action: media_player.turn_off
      target:
        entity_id: media_player.lounge_appletv
```

发送 3 个 `left` 命令，每个命令之间有延迟：

```yaml
action: remote.send_command
target:
  entity_id: remote.apple_tv
data:
  num_repeats: 3
  delay_secs: 2.5
  command:
    - left
```

## 键盘焦点

Apple TV 远程控制平台将自动为您的 Home Assistant 实例上配置的每台 Apple TV 创建一个二值传感器实体，以确定屏幕键盘是否处于活动状态。

### 示例

创建一个自动化，每当屏幕键盘激活时清除搜索文本：

```yaml
description: "始终以清除 Apple TV 搜索文本开始"
mode: single
triggers:
  - trigger: state
    entity_id:
      - binary_sensor.my_apple_tv_keyboard_focused
    from: "off"
    to: "on"
actions:
  - action: apple_tv.clear_search_text
    target:
      entity_id: remote.my_apple_tv_remote
```

## 常见问题

### 当我在前端按下开/关时，我的 Apple TV 没有开/关

这是正确的；它只在 Home Assistant 中切换电源状态。请参阅上面的示例使用快捷操作菜单。这可以在运行 tvOS 14.0 或更高版本的 Apple TV 上使用。

### 是否可以在不与设备交互的情况下查看设备是否开启

不可以

### 添加新设备时，请求输入 PIN 码，但屏幕上没有显示任何内容

如果在配对 AirPlay 协议时访问设置错误，可能会发生这种情况。在您的 Apple TV 上，导航到设置，找到 AirPlay 菜单，确保访问设置设置为"同一网络上的所有人"，然后重试。

### 按钮（播放、暂停等）不起作用

tvOS 应用程序本身决定它们支持哪些命令以及何时支持它们。很可能，您使用的应用程序不支持您尝试执行的操作。在撰写有关此问题的问题之前，请验证在 iOS 的 Remote 应用程序中是否可以执行相同的操作。如果是这种情况，请在 [pyatv](https://github.com/postlund/pyatv/issues/new?assignees=&labels=bug&template=bug_report.yml) 中提交错误，并包含日志（请参阅下面的调试）。

### 在我的 Apple TV 上设置音量不起作用

音量控制功能取决于 Apple TV 的设置方式。如果 Apple TV 连接到 HomePod 或 HomePod 立体声组合，所有音量控制应该都可以工作。如果 Apple TV 连接到电视扬声器并通过 HDMI CEC 进行音量控制（设置 -> 遥控器和设备 -> 音量控制），则只有音量增大/减小控制可以工作。如果音量控制是通过 IR 进行的，则无法通过 Apple TV 远程控制音量，但您可以直接集成您的电视或条形音箱。

### 我正在尝试通过 AirPlay 播放流，但不起作用

Apple TV 在播放哪些格式方面相当挑剔。最好的选择是 MP4。如果不起作用，很可能是因为媒体格式。

## 调试

如果您有任何问题并打算提交问题，请确保包含相关日志。对于此集成，您可以像这样启用它们：

```yaml
logger:
  logs:
    pyatv: debug
    homeassistant.components.apple_tv: debug
```

通过在创建问题时直接提供日志，您可能会更快地获得帮助。