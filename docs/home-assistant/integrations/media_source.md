---
title: Media source
description: 'Media source 集成平台允许其他集成公开媒体内容，以便在 Home Assistant 中通过媒体浏览器面板或 Google Cast 等受支持的媒体播放器使用。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Media source
ha_release: 0.115
ha_domain: media_source
ha_codeowners:
  - '@hunterjm'
ha_quality_scale: internal
ha_integration_type: system
---
# Media source

**Media source** 集成平台允许其他集成公开媒体内容，以便在 Home Assistant 中通过媒体浏览器面板或 Google Cast 等受支持的媒体播放器使用。

## 配置

如果启用了 `default_config`，或者其他集成实现了媒体源，此集成会自动配置。

如果您的配置中不包含上述任一项，可以将以下内容添加到配置文件中：

```yaml
# Example configuration.yaml entry
media_source:
```

## 本地媒体

默认情况下，此集成会在指定文件夹中查找媒体。
如果未声明其他 `media_dirs`，则例如在 Companion App 通知中需要使用 `/media/local` 路径。

该文件夹默认配置在 `/media` 路径下。

Home Assistant OS 用户可以通过例如 Samba 插件访问该文件夹。Home Assistant Container 用户则可以将任意卷挂载到 `/media`。

与从 `www` 提供的文件不同，从 `media` 提供的文件受 Home Assistant 身份验证保护。

## 使用自定义或额外的媒体文件夹

您也可以设置自定义或额外的媒体目录。为此，需要调整[核心配置][basic-configuration]。

以下示例将两个不同的文件夹提供给该集成使用：

```yaml
# Example configuration.yaml
homeassistant:
  media_dirs:
    local: /media
    recording: /mnt/recordings
```

:::tip
如果您想使用网络存储中的媒体，必须先连接该网络存储。请参阅[这些连接网络存储的说明](/home-assistant/common-tasks/os/#network-storage)。
连接后，网络存储中的媒体会自动添加到本地媒体浏览器中。

:::
## 播放来自媒体源的媒体

要通过操作播放媒体源中的媒体，请使用 URI 方案 `media-source://media_source/<media_dir>/<path>`。
默认的 `media_dir` 是 `local`。

:::note
Web 浏览器和 Google Cast 媒体播放器对视频封装格式和编解码器的支持都非常有限。Media source 集成不会对媒体进行转码，这意味着媒体文件必须被您的媒体播放器或 Web 浏览器原生支持（用于前端播放时也是如此）。

如果视频文件不被您的媒体播放器或 Web 浏览器支持，将无法播放。请查阅对应媒体播放器或 Web 浏览器的文档，了解支持的视频格式列表。

:::
示例：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.living_room_tv
data:
  media_content_type: "video/mp4"
  media_content_id: "media-source://media_source/local/videos/favourites/Epic Sax Guy 10 Hours.mp4"
```

[basic-configuration]: /integrations/homeassistant/#media_dirs

### 从媒体浏览器识别媒体源

如果您想在操作中使用 `media-source://` URI，并且该媒体已经可在媒体浏览器中访问（无论是存储在 Home Assistant 机器本地，还是通过网络存储映射），以下步骤可以帮助您确定 `media-source` URI。

1. 在侧边栏中选择 **媒体**。
2. 导航到包含您想播放媒体的文件夹。\
  *在本示例中，我们将进入 **我的媒体** > **NAS_Media**。该文件夹是一个网络共享，包含多个 `.mp3` 文件，其中一个名为 `my-music.mp3`。*
3. 从地址栏复制当前 URL。\
  *例如：`https://home-assistant.local/media-browser/browser/app%2Cmedia-source%3A%2F%2Fmedia_source/%2Cmedia-source%3A%2F%2Fmedia_source%2Flocal%2FNAS_Media`*
4. 搜索在线 URL 解码工具，粘贴复制的文本并进行解码。\
  *`https://home-assistant.local/media-browser/browser/app,media-source://media_source/,media-source://media_source/local/NAS_Media`*

最后一个媒体源，在本例中是 `media-source://media_source/local/NAS_Media`，构成了路径的第一部分，因此完整路径为：
`media-source://media_source/local/NAS_Media/my-music.mp3`
