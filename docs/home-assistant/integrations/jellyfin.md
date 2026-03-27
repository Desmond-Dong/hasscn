---
title: Jellyfin
description: 'Jellyfin 集成会将 Jellyfin(https://jellyfin.org/) 服务器作为媒体源公开到 Home Assistant 中。 当前仅支持音乐、电影和电视剧资料库。其他资料库不会显示在媒体浏览器中。此集成已在 Jellyfin server 10.6.4 及更高版本上测试通过。'
ha_category:
  - Media player
  - Media source
  - Remote
  - Sensor
ha_release: '2021.12'
ha_iot_class: Local Polling
ha_codeowners:
  - '@RunC0deRun'
  - '@ctalkington'
ha_config_flow: true
ha_domain: jellyfin
ha_platforms:
  - diagnostics
  - media_player
  - remote
  - sensor
ha_integration_type: service
---
# Jellyfin

**Jellyfin** 集成会将 [Jellyfin](https://jellyfin.org/) 服务器作为媒体源公开到 Home Assistant 中。
当前仅支持音乐、电影和电视剧资料库。其他资料库不会显示在媒体浏览器中。此集成已在 Jellyfin server 10.6.4 及更高版本上测试通过。

此外，此集成还会将每个连接到 Jellyfin 服务器的媒体会话设置为 Home Assistant 中的媒体播放器，以便为每个会话提供媒体控制。

在 Home Assistant 中以播放器上下文浏览媒体时，会显示所有 Movie 和 Series 类型的资料库。

如果客户端支持，此集成还会创建一个 `Remote` 实体，用于向客户端发送[遥控命令](https://github.com/jellyfin/jellyfin/blob/master/MediaBrowser.Model/Session/GeneralCommandType.cs)。例如，可以让客户端向右移动两次、向下移动一次，然后选择当前焦点项：

```yaml
jellyfin_remote_script:
  alias: "Jellyfin Remote Script"
  sequence:
    - action: remote.send_command
      target:
        entity_id: remote.jellyfin_client
      data:
        delay_secs: 1.5
        command:
          - MoveRight
          - MoveRight
          - MoveDown
          - Select
```


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
URL:
  description: Jellyfin 服务器的 URL。请提供包含协议和可选 webroot 的完整 URL，例如 `https://media.example.com`、`http://10.1.1.100:8096` 或 `http://home.example.com/jellyfin`。
Username:
  description: 您希望检索其资料库的 Jellyfin 用户。
Password:
  description: 所填用户的密码。
```

## Options

To define options for Jellyfin, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Jellyfin are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Audio Codec:
  description: 将音频编码编解码器设置为 Jellyfin API 支持的编解码器（aac、mp3、vorbis、wma）。
```

## 操作

### 浏览媒体

您可以使用 `media_player.browse_media` 操作逐步浏览 Jellyfin 资料库，以查找想要播放的媒体。

| Data attribute        | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| `entity_id`           | 媒体播放器的 `entity_id`                                                |
| `media_content_id`    | **（可选）** 您想要继续浏览的内容唯一标识符                             |

开始浏览时，不设置 `media_content_id` 即可浏览根节点。

#### 示例：
```yaml
action: media_player.browse_media
target:
  entity_id: media_player.jellyfin
data:
  media_content_id: a656b907eb3a73532e40e44b968d0225
```

#### 响应
```yaml
media_player.jellyfin:
  title: Series
  media_class: directory
  media_content_type: None
  media_content_id: a656b907eb3a73532e40e44b968d0225
  children_media_class: directory
  can_play: false
  can_expand: true
  can_search: false
  thumbnail: >-
    https://jellyfin
  not_shown: 0
  children:
    - title: "Tales of the Jedi"
      media_class: directory
      media_content_type: tvshow
      media_content_id: 34361f3855c9c0ac39b0f7503fe86be0
      children_media_class: null
      can_play: false
      can_expand: true
      can_search: false
      thumbnail: >-
        https://jellyfin
```

### 搜索媒体

您可以使用 `media_player.search_media` 操作查找想要播放的媒体。

| Data attribute        | Description                                       |
| --------------------- | ------------------------------------------------- |
| `entity_id`           | 媒体播放器的 `entity_id`                          |
| `search_query`        | 搜索词                                            |

#### 示例：

```yaml
action: media_player.search_media
target:
  entity_id:
    - media_player.jellyfin
data:
  search_query: star
```
#### 响应
```yaml
media_player.jellyfin:
  version: 1
  result:
    - title: Star Wars
      media_class: directory
      media_content_type: Video
      media_content_id: 895dc4e1066da92847d48f9be28eb77c
      children_media_class: null
      can_play: false
      can_expand: false
      can_search: false
      thumbnail: >-
        https://jellyfin
      not_shown: 0
      children: []
    - title: Star Trek
      media_class: directory
      media_content_type: Video
      media_content_id: 5ae55567cae75c26671a0a6b027bdd5b
      children_media_class: null
      can_play: false
      can_expand: false
      can_search: false
      thumbnail: >-
        https://jellyfin
      not_shown: 0
      children: []
```
### 播放媒体

要在任意播放器上播放媒体，您首先需要通过[浏览媒体](#浏览媒体)或[搜索媒体](#搜索媒体)找到想播放内容的 `media_content_id`。

| Data attribute        | Description                                       |
| --------------------- | ------------------------------------------------- |
| `entity_id`           | 媒体播放器的 `entity_id`                          |
| `media_content_id`    | 想播放内容的唯一标识符                            |
| `media_content_type`  | `movie` 或 `tvshow`                               |

#### 示例：

在支持播放的 Jellyfin 客户端上播放电影。

```yaml
action: media_player.play_media
target:
  entity_id:
    - media_player.jellyfin
data:
  media_content_id: a982a31451450daeda02c89952e6d7cf
  media_content_type: movie
```
