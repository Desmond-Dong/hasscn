---
title: Media extractor
description: 'Media extractor 集成会获取流媒体 URL 并将其发送给媒体播放器实体。如果配置得当，此集成还可以提取特定于实体的流媒体。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Media player
ha_iot_class: Calculated
ha_release: 0.49
ha_quality_scale: internal
ha_domain: media_extractor
ha_integration_type: integration
ha_codeowners:
  - '@joostlek'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---
# Media extractor

**Media extractor** 集成会获取流媒体 URL 并将其发送给媒体播放器实体。如果配置得当，此集成还可以提取特定于实体的流媒体。

:::note
Media extractor 不会对流进行转码，它只是尝试找到与请求查询匹配的流。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 播放媒体操作

前往 **开发者工具** 中的 **操作** 选项卡。从 **操作** 下拉菜单中选择 `media_extractor.play_media`，然后点击页面底部的“填充示例数据”按钮。使用“实体 ID”下拉菜单选择您的媒体播放器，然后点击 **执行操作** 按钮。

这会从给定 URL 下载文件。

| Data attribute | Optional | Description                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `entity_id`            | yes      | 要在其上播放媒体的实体名称，例如 `media_player.living_room_chromecast`。默认为全部。       |
| `media_content_id`     | no       | 要播放内容的 ID。取决于平台。                                                        |
| `media_content_type`   | no       | 要播放内容的类型。必须是 MUSIC、TVSHOW、VIDEO、EPISODE、CHANNEL 或 PLAYLIST MUSIC 之一。 |

### 提取媒体 URL 操作

还有一个操作会在操作响应中直接返回该 URL。

| Data attribute | Optional | Description                                            |
| ---------------------- | -------- | ------------------------------------------------------ |
| `url`                  | no       | 要提取的媒体 URL。                       |
| `format_query`         | yes      | 用于选择正确媒体的查询。 |

### 格式查询

查询可用于选择正确的媒体。
查询示例及说明：

- **bestvideo**：最佳纯视频流
- **best**：最佳视频 + 音频流
- **bestaudio[ext=m4a]**：最佳 M4A 格式音频流
- **worst**：最差视频 + 音频流
- **bestaudio[ext=m4a]/bestaudio[ext=ogg]/bestaudio**：优先最佳 M4A 音频，否则最佳 OGG 音频，最后退回到任意最佳音频

有关查询的更多信息请参见[这里](https://github.com/ytdl-org/youtube-dl#format-selection)。

### Cookies

某些受支持的视频服务在您登录后会提供更好的体验。例如，如果您使用 Twitch Turbo 或订阅了某位 Twitch 主播，登录后视频流就不会在广告播放期间显示“An ad is currently playing. Come back after the break.”的提示。另一个例子是某些私密或已购买的 YouTube 视频，这些内容只有在登录状态下才能观看。
您可以在 Home Assistant 配置目录中添加一个 Netscape 格式的 cookie 文件。每次加载流时都会读取该 cookie 文件：

`config/media_extractor/cookies.txt`

要生成 cookie 文件，您可以使用浏览器扩展（例如 [Get Cookies.txt LOCALLY](https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc)）。如果您想手动创建，请遵循此规范：[https://curl.se/rfc/cookie_spec.html](https://curl.se/rfc/cookie_spec.html)。
