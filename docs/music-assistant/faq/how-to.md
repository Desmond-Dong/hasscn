---
title: 常见问题 - 我该如何...？
description: Music Assistant 的常见用途
---
# 我该如何...？

## 获取 URI？

对于播放列表、艺术家、专辑和广播，您可以直接使用名称。

对于音轨，您可以使用名称，但这可能导致模糊的响应，因此您可以使用艺术家名称进行限制，方法是使用 `Billy Joel - A Matter of Trust`。如果仍然模糊，则该操作有其他选项，您可以使用它们进一步限制搜索。例如：

``` yaml
data:
  media_type: track
  media_id: Running on Ice
  artist: Billy Joel
  album: The Bridge
```

同样，如果专辑名称模糊，您可以先指定艺术家名称（`Queen - Greatest Hits`）

您也可以使用 `music_assistant.search` 或 `music_assistant.get_library` 操作，URI 将显示在结果中。URI 也显示在项目视图底部的[提供商详情部分](/music-assistant/ui/#view-individual-artist)中，可以使用链接图标复制到剪贴板。

> [!NOTE]
> 以 `media-source://` 开头的 URI 是 HA URI，在针对 MA 播放器实体时不应使用。这样做将导致不一致的行为。

文件夹的 URI 需要以 `filesystem_id://folder/relative/path/to/folder` 的形式构造（例如 `filesystem_smb--5iJ4npRi://folder/ABBA`），filesystem_id 可以通过查看 `get_library` 操作的输出来获取。扫描键 `tracks.provider_mappings.provider_instance` 并找到显示 filesystem_id 的那个。话虽如此，如果只有一个文件系统提供商添加到 MA，则可以使用 `filesystem_smb`。

## 使用音量标准化？它是如何工作的？

在 MA 播放一次音轨后，数据被保留，以便在所有正在播放的音轨之间标准化音量。MA 中的设置是音量标准化的目标级别。MA 不会压缩动态范围（因为这对质量不好），而只是根据 EBU R128 标准测量的整体响度调整整个音轨的增益。更大的负值通常会使音轨听起来不那么响，但会留下很大的余量。然而，对于每个单独的音轨，增益可能会上升或下降，以确保所有播放音轨的整体响度处于所选级别。建议使用 -23 到 -17 LUFS 之间的值（-17 是默认起点）。**不要**设置得太高（接近零），因为由于削波，这可能会使您的音乐听起来失真。

更多详情[这里](/music-assistant/faq/tech-info/#volume-normalization)

## 更换房间时继续播放我的音乐

有三个选项。

1. 开始流式传输到包含您将在其间移动的所有房间的任何类型的群组。静音除您所在房间外的所有房间。当您移动房间时，只需静音和取消静音所需的播放器。

2. 使用打开动态成员选项的同步群组，或手动同步群组。当您更换房间时，将新房间加入现有群组。如何处理群组中的其他播放器取决于群组类型以及播放器是群组主播放器（同步群组）还是保存队列（手动同步）。选项是将播放器从群组中退出或静音它。有关更多信息，请阅读[群组](/music-assistant/faq/groups/)

3. 使用[传输队列](/music-assistant/faq/masstransfer/)操作。

## 随机播放 Spotify/播放列表/YouTube 等

您不是随机播放音乐提供商，而是在播放器的队列上启用随机播放，然后添加到队列的任何内容都会被随机播放。您可以通过在[播放器栏](/music-assistant/ui/#player-bar)上选择随机播放图标在 MA 中启用队列随机播放，或者您可以选择[正在播放视图](/music-assistant/ui/#now-playing-view)，然后右上角的上下文菜单，然后启用随机播放，或者您可以使用 yaml 如下：
``` yaml
action: media_player.shuffle_set
target:
  entity_id: media_player.mass_bath
data:
  shuffle: true
```

## 通过脚本或自动化将项目添加到队列

``` yaml
action: media_player.play_media
target:
  entity_id: media_player.mass_player_entity_goes_here
data:
  media_content_id: NameOfTheAlbumArtistOrPlaylistHere
  media_content_type: music
```

请参阅<a href="https://www.home-assistant.io/integrations/media_player/" target="_blank" rel="noopener noreferrer">入队选项</a>

另请参阅 [music_assistant.play_media 操作](/music-assistant/faq/massplaymedia/)

## 通过脚本启动播放列表

使用上面显示的 `media_player.play_media` 操作或 `music_assistant.play_media` 操作，如[这里](/music-assistant/faq/massplaymedia/)所述。

## 播放随机项目

使用 get_library 和这样的脚本/自动化：

``` yaml
sequence:
  - action: music_assistant.get_library
    data:
      media_type: track
      search: ARTISTNAME
      limit: 1
      order_by: random
    response_variable: random_track
  - action: music_assistant.play_media
    data:
      media_id: "{{ random_track['items'][0].uri }}"
      media_type: track
      enqueue: play
      radio_mode: true
    target:
      entity_id: media_player.ma_kitchen_speaker
```

如果您想要音轨队列：

``` yaml
sequence:
  - action: music_assistant.get_library
    data:
      media_type: track
      search: ARTISTNAME
      limit: 10
      order_by: random
    response_variable: random_tracks
  - repeat:
      count: "{{ random_tracks['items'] | length }}"
      sequence:
        - action: music_assistant.play_media
          data:
            media_id: "{{ random_tracks['items'][repeat.index - 1].uri }}"
            media_type: track
            enqueue: add
          target:
            entity_id: media_player.ma_kitchen_speaker
```

这可以针对其他项目类型进行修改（例如广播电台或播放列表）。

## 通过脚本或自动化清除队列

使用 HA 操作 `media_player.clear_playlist` 或新的 `music_assistant.play_media` 操作，如果想清除队列并播放其他内容，选择适当的入队选项。

## 将广播电台添加到 MA

如果您使用 [TuneIn 提供商](/music-assistant/music-providers/tunein/)，则您帐户中收藏的电台将出现。

如果您使用 [RadioBrowser 提供商](/music-assistant/music-providers/radio-browser/)，则浏览该提供商并为所需电台选择添加到库。

可以直接输入电台，方法是导航到广播视图并在右上角的菜单中选择从 URL 添加项目。
这也适用于本地托管的流，如来自 Icecast 的流。

> [!NOTE]
> 新添加的电台直到从右上角菜单手动刷新广播视图列表时才会出现。

## 通过自动化启动广播流

使用 `music_assistant.play_media` 操作并将 `media_id` 设置为电台名称。

## 通过脚本切换到下一个/上一个广播电台

创建一个 `input_select`，将各种广播电台作为选项。现在您可以使用下一个和上一个操作在电台之间切换。

要动态生成广播电台列表，请使用合适的自动化触发器和这样的脚本：
``` yaml
script:
  generate_station_list:  
    mode: queued
    alias: "生成电台列表"
    sequence:
      - action: music_assistant.get_library
        data:
          limit: 40
          config_entry_id: 01JMYCMQJ55CR9E7YZW3VKEA4F
          media_type: radio
          favorite: true
          order_by: name  
        response_variable: radio_stations
      - action: input_select.set_options
        target:
          entity_id: input_select.radio_station_list
        data:
          options: "{{ radio_stations['items'] | map(attribute='name') | list }}"    
```

## 创建播放列表或使用 M3U 文件

您可以从 MA UI 创建播放列表。添加项目也可以从 UI 完成。

如果想手动创建播放列表，可接受的格式是：
```
（文件与播放列表在同一文件夹中）：
05 Blue Christmas.flac

以及这个（文件在相对于播放列表文件的子文件夹中）：
Elvis Presley/Blue Christmas/05 Blue Christmas.flac

以及这个（文件有绝对路径）：
/Users/marcel/media/music/b05 Blue Christmas.flac

以及这个（完整 uri）：
spotify://track/12345
或
filesystem_smb://track/blah
```

相对于播放列表的路径（例如 `../Mariah Carey/Merry Christmas/02 All I Want for Christmas Is You.flac`）也有效。

支持 M3U、M3U8 和 PLS 播放列表。<a href="https://www.iptvx.info/?p=1002" target="_blank" rel="noopener noreferrer">VLC 可用于轻松创建</a> MA 可以使用的播放列表。

## 一段时间后停止音乐，又称睡眠定时器

``` yaml
sequence:
  - wait_for_trigger:
      - platform: state
        entity_id:
          - media_player.mass_all_rooms
        attribute: media_title
    continue_on_timeout: false
  - action: media_player.turn_off
    data: {}
    target:
      entity_id:
        - media_player.mass_all_rooms
mode: single
alias: 当前音轨后停止
```

感谢 <a href="https://github.com/Aasikki" target="_blank" rel="noopener noreferrer">AAsikki</a>，他在<a href="https://github.com/orgs/music-assistant/discussions/830#discussioncomment-3355921" target="_blank" rel="noopener noreferrer">这里</a>向我们展示了

## 将 MA 与 Mopidy 一起使用

请参阅这里 https://github.com/orgs/music-assistant/discussions/439

## 在我的内部网络上设置 SSL 时运行 MA？

尝试使用 SSL 运行 MA 不推荐。话虽如此，虽然您不能在 SSL 后面运行流服务，但您可以完全按照您的要求配置前端。默认情况下，前端在 HAOS 中受 Ingress 保护。对于使用 docker 的用户，可以在所需端口上托管 Web 服务器，然后运行（Ingress）反向代理。这些设置将不提供支持，我们建议您使用 HAOS。

## 在 HA 侧边栏中获取 MA 图标？

如果您在 HA 主机内运行 MA 应用程序，请转到设置>>插件>>MUSIC ASSISTANT 并选择"在侧边栏中显示"。

如果您使用的是 docker，则可以使用<a href="https://www.home-assistant.io/dashboards/iframe/" target="_blank" rel="noopener noreferrer">iframe 面板</a>，或者您可以使用另一个名为 <a href="https://github.com/lovelylain/hass_ingress" target="_blank" rel="noopener noreferrer">hass_ingress</a> 的自定义集成，它允许您向 Home Assistant 前端添加额外的 ingress 面板。

## 向 piCorePlayer 添加带按钮的旋转编码器

请参阅<a href="https://github.com/orgs/music-assistant/discussions/1123#discussioncomment-7945369" target="_blank" rel="noopener noreferrer">这里</a>

## 在 Nextcloud 上访问我的音乐？

<a href="https://apps.nextcloud.com/apps/music" target="_blank" rel="noopener noreferrer">Nextcloud Music App</a> 支持 [Subsonic](/music-assistant/music-providers/subsonic/)，因此您可以在 MA 中使用该提供商进行连接。

## 通过 URL 直接访问 MA 视图

如果身份验证成为某些设备的障碍，请通过 MA 设置 >> 配置文件创建长期访问令牌，并使用以下格式作为 URL
https://192.168.1.1:8095/?code=xxx#/home/?player=kitchen%20speaker&showFullscreenPlayer=true，其中 xxx 是令牌

## 播放器选择

打开视图时可以通过向主页 URL 添加 `player=` 来选择特定播放器（或最后已知的）。您可以使用 MA 播放器名称或 `true` 打开最后已知的。播放器名称不区分大小写。

示例

- http://192.168.1.1:8095/#/home?player=true
- http://192.168.1.1:8095/#/home?player=Livingroom

## 无框视图

显示相关视图，不带<a href="https://music-assistant.io/ui/#player-bar" target="_blank" rel="noopener noreferrer">播放器栏</a>或<a href="https://music-assistant.io/ui/#main-menu" target="_blank" rel="noopener noreferrer">主菜单</a>

示例

- http://192.168.1.1:8095/#/albums?frameless=true
- http://192.168.1.1:8095/#/playlists?player=kitchen%20speaker&frameless=true

## 正在播放视图

显示正在播放视图

示例

- http://192.168.1.1:8095/#/home?player=true&showFullscreenPlayer=true
- http://192.168.1.1:8095/#?player=true&showFullscreenPlayer=true
- http://192.168.1.1:8095/#/home?player=Livingroom&showFullscreenPlayer=true

## 以不同顺序播放播放列表（或任何项目）

播放列表将按创建顺序播放。更改显示顺序对播放顺序没有影响。如果希望按显示顺序播放，请在菜单栏中选择多选按钮，然后使用 CTRL-A 或手动选择音轨，然后在浮动的操作菜单中播放音轨。

## 在同一主机上创建多个 ShairportSync 实例

教程可在<a href="https://github.com/orgs/music-assistant/discussions/3562" target="_blank" rel="noopener noreferrer">这里</a>找到

