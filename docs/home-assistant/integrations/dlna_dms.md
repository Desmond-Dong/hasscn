---
title: DLNA Digital Media Server
description: 关于使用 Home Assistant 访问存储在 DLNA DMS 设备上的媒体的说明。
ha_category:
  - Media source
ha_release: 2022.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@chishm'
ha_domain: dlna_dms
ha_ssdp: true
ha_integration_type: service
---

**DLNA Digital Media Server** 集成允许您浏览和播放来自 [DLNA Digital Media Server](https://www.dlna.org/) 的媒体。配置的 DMS 设备充当[媒体源](/home-assistant/integrations/media_source/)，可以在媒体面板中浏览。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 重命名

DMS 设备的名称/标题与配置条目的标题相同。可以在集成配置页面中通过三点 `[mdi:dots-vertical]` 菜单进行更改。

## 媒体源 URI

DLNA DMS 的媒体源 URI 格式为 `media-source://dlna_dms/<source_id>/<media_identifier>`。

其中 `<source_id>` 是 DMS 设备名称的 slug 化形式。例如，"DLNA Server" 变为 "dlna_server"。如果多个 DMS 设备具有相同的名称，则会在其中一些名称的末尾附加下划线和唯一编号，例如 "server"、"server_1"、"server_2"。

`<media_identifier>` 可以有三种形式：

- `path/to/file` 或 `/path/to/file`：通过内容目录的斜杠分隔路径。这必须引用唯一的媒体项。
- `:ObjectID`：冒号后跟服务器分配的对象 ID。
- `?query`：问号后跟要搜索的查询字符串，语法请参阅 [DLNA ContentDirectory SearchCriteria](https://openconnectivity.org/wp-content/uploads/2015/11/UPnP-av-ContentDirectory-v4-Service.pdf)（第 65 页的 5.3.16 节"A_ARG_TYPE_SearchCriteria"和第 269 页的 D.5 节"Searching"）。将使用找到的第一个结果。

浏览时生成的 URI 看起来像上面的对象 ID 形式。但是，所有三种形式都可以与 [media_player.play_media](/home-assistant/integrations/media_player/#action-media_playerplay_media) 操作一起使用。

### 示例

使用路径 URI：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.living_room_tv
data:
  media_content_id: "media-source://dlna_dms/my_server/videos/favourites/Epic Sax Guy 10 Hours.mp4"
```

使用查询 URI：

```yaml
action: media_player.play_media
target:
  entity_id: media_player.living_room_tv
data:
  media_content_id: 'media-source://dlna_dms/my_server/?dc:title="Big Buck Bunny"'
```