# 标签

<p class='img'>
<img src="/home-assistant/images/blog/2020-09-15-home-assistant-tags/tag-reader.jpg" alt="Tag Reader for Home Assistant">
<a href="https://github.com/adonno/tagreader">Tag Reader for Home Assistant</a>
</p>

Home Assistant 允许你用标签来自动化几乎任何事情。Home Assistant 兼容各种类型的标签。我们的移动应用开箱即用支持 NFC 标签，但任何能读取 ID 的设备都可以使用。

为了让家里任何人都能使用标签，你还可以使用兼容 Home Assistant 的[独立标签读取器](https://github.com/adonno/tagreader)。

## 写入你的第一个标签

开始使用标签最简单的方式，是配合官方 Home Assistant 移动应用使用 NFC 标签（[贴纸](https://www.amazon.com/dp/B07N38MMTT)、[卡片](https://www.amazon.com/dp/B074M9J5L3)）。将数据写入卡片后，只需把手机靠近即可扫描。

<lite-youtube videoid="Xc120lClUgA" videotitle="Writing a tag (iOS)" posterquality="maxresdefault"></lite-youtube>

:::important
仅 iPhone XS、XR、iPhone 11 及后续机型支持后台 NFC 标签读取。

::: <lite-youtube videoid="xE7wm1bxRLs" videotitle="Writing a tag (Android)" posterquality="maxresdefault"></lite-youtube>

## 管理标签

Home Assistant 提供了专门的面板来管理标签。你可以为标签命名、创建自动化，或删除标签。如果你在移动应用中打开标签仪表板，还可以直接写入标签。

![Tag user interface in Home Assistant](/home-assistant/images/blog/2020-09-15-home-assistant-tags/tag-ui.gif)

## 实体

每个标签都会自动创建一个 `tag` 实体。这在自动化中很有用，也可以放在仪表板上查看标签上次被扫描的时间。

其状态会以日期时间字符串显示标签上次被扫描的时间。例如：`2013-09-17T07:32:51.095+00:00`

### 属性

* **Tag ID**：创建标签时设置的标识符。
* **Last scanned by device ID**：上次扫描此标签的设备 ID。可在自动化中根据扫描设备执行不同操作。

## 构建 RFID 点唱机

标签最有趣的用途之一，就是在客厅中选择要播放的音乐。若想快速实现，可以使用下面的自动化：

```yaml
automation:
- alias: "Handle Tag Scan"
  # Hide warnings when triggered while in delay.
  max_exceeded: silent
  variables:
    # Map scanner device ID to media player entity ID
    media_players:
      0e19cd3cf2b311ea88f469a7512c307d: media_player.spotify_balloob
    # Map tag ID to content
    tags:
      A7-6B-90-5F:
        media_content_id: spotify:album:0h2knr6qpiAq0tV5ri5JMF
        media_content_type: album
      04-B1-C6-62-2F-64-80:
        media_content_id: spotify:playlist:0OtWh3u6fZrBJTQtVBQWge
        media_content_type: playlist
  triggers:
    - trigger: event
      event_type: tag_scanned
  conditions:
    # Test that we support this device and tag
    - "{{ trigger.event.data.tag_id in tags }}"
    - "{{ trigger.event.data.device_id in media_players }}"
  actions:
    - variables:
        media_player_entity_id: "{{ media_players[trigger.event.data.device_id] }}"
        media_content_id: "{{ tags[trigger.event.data.tag_id].media_content_id }}"
        media_content_type: "{{ tags[trigger.event.data.tag_id].media_content_type }}"
    - action: media_player.play_media
      target:
        entity_id: "{{ media_player_entity_id }}"
      data:
        media_content_id: "{{ media_content_id }}"
        media_content_type: "{{ media_content_type }}"
    - delay: 2 # timeout before we allow processing next scan
```

要找到扫描器的设备 ID，请打开 Developer tools -> Events -> Listen to events，并订阅 `tag_scanned`。
然后在读取器上扫描一个标签，记下 `data` 部分中的 `device_id`。

## 打印标签

NFC 标签有很多不同的形状和规格。[NFC 贴纸](https://www.amazon.com/dp/B07N38MMTT) 很适合贴在现有物品上供扫描，例如书本或照片。另一个有趣的用法是可打印的 NFC 卡片。这类卡片使用起来很方便，甚至约 1 岁的孩子也能使用。

要开始打印卡片，你需要以下硬件：

* [Canon TS702a Inkjet Printer](https://www.amazon.com/TS702a-Compact-Connected-Inkjet-Printer/dp/B09TG8F4YS/)
* [Compatible card printing tray](https://www.amazon.com/dp/B07T28MXMK)
* [Printable NFC cards](https://www.amazon.com/dp/B072FK4RZD)

上述托盘和卡片的卖家还提供了一个可生成打印 PDF 的 [ID 卡打印应用](https://brainstormidsupply.com/try-id-maker/)。它完全在浏览器中运行，不会将数据发送到其服务器。如果你使用的是上述设备，请在打印介质中选择 Canon MP 托盘。

祝你打印愉快！

![NFC Cards](/home-assistant/images/blog/2020-09-15-home-assistant-tags/cards.jpg)

## 标签扫描事件

扫描标签时会触发 `tag_scanned` 事件。该事件包含以下值：

| 值 | 描述 |
| - | - |
| `tag_id` | 标签标识符。可据此决定要执行的操作。 |
| `name` | 标签名称。名称不唯一，多个标签可以同名。 |
| `device_id` | 扫描该标签设备的设备注册表标识符。可据此决定在何处执行操作。 |
