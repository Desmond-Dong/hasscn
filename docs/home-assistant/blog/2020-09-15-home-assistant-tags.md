---
title: 家庭助理标签
description: '自从两年前@hoveeman(https://github.com/hoveeman)发表this video(https://www.youtube.com/watch?v=AvCseOQidSw)中他在家里播放音乐使用RFID以来，RFID标签就一直在我的家庭自动化关注范围内。'
  家庭助理。
---
# 家庭助理标签

![Photo of a Tag Reader](/home-assistant/images/blog/2020-09-15-home-assistant-tags/tag-reader.jpg)

自从两年前[@hoveeman](https://github.com/hoveeman)发表[this video](https://www.youtube.com/watch?v=AvCseOQidSw)中他在家里播放音乐使用RFID以来，RFID标签就一直在我的家庭自动化关注范围内。

从那时起，我们一直致力于让每个家庭助理用户轻松使用此功能。当 [@maddox](https://github.com/maddox) 发布 [Magic 卡片](https://github.com/maddox/magic-卡片) 时，它已经变得更加容易访问。但这仍然是一个独立的应用程序，除了家庭助理之外还必须运行，并且它需要一个单独的 RFID 读取器。

我们可以做得更好吗？我们可以。今天我们要介绍的是 <b>Home Assistant 标签</b>. 我们的 iOS、Android、前端、核心和硬件团队之间的合作。借助 Home Assistant 标签，我们使可扫描标签 (NFC/RFID) 成为 Home Assistant 中的一员。易于阅读、编写和自动化！

## 应用程序

官方家庭助理应用程序已更新，支持NFC。这大大降低了开始使用NFC标签实现房屋自动化的交通。您现在需要的只是标签！

现在，您可以从应用程序中向标签写入特殊的 Home Assistant URL。一旦您将手机暂停在这些标签之一上，它们就会破坏 Home Assistant 应用程序将标识符发送到您的 Home Assistant 实例进行处理。标签并不与写入标签的手机绑定，任何手机都可以扫描它们。

感谢 [@David-Development](https://github.com/david-development) 在 Android 应用程序中提供 NFC 支持，并感谢 [@zacwest](https://github.com/zacwest) 在 iOS 应用程序中提供 NFC 支持。

<div class="videoWrapper">
  <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/Xc120lClUgA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

：：：笔记
仅 iPhone XS、XR 和 iPhone 11 或更高版本支持后台 NFC 标签读取。
:::

## 独立标签阅读器

移动标签阅读器确实很棒，但还有更多！最初引起我兴趣的 RFID 自动点唱机与专用 RFID 读取器配合使用。这个 RFID 阅读器连接到一个树莓派，该树莓派正在运行脚本来读取标签并将其发送给家庭助手。

<p class="img">
  <img src="/home-assistant/images/blog/2020-09-15-home-assistant-tags/old-system.jpg" alt="Photo of the old system">
旧系统的照片。
</p>

这些解决方案效果很好，但体积庞大，需要硬件技能和技术技能来设置。构建单个阅读器的硬件成本可能约为 30 美元（RFID 阅读器 + 树莓派 0），但这只是 1 个房间的费用。如果你想要更多房间怎么办？这加起来很快。

[@adonno](https://github.com/adonno) 在 [@MagnusO](https://github.com/magnusoverli) 的帮助下，一直致力于基于 [ESPHome](https://www.esphome.io) 开发更小的标签读取器。它由 ESP8266 芯片和 PN532 NFC 模块供电。该外壳是 3D 打印的。

Because it's powered by ESPHome, setting up is a breeze. Once powered on, it will create an access point that allows you to add your WiFi 配置. After that Home Assistant will pick it up and you can start scanning tags.

![Photo of a tag reader with orange accents](/home-assistant/images/blog/2020-09-15-home-assistant-tags/orange-reader.jpg)

独立标签阅读器的好处是它们专用于一个房间。这意味着当扫描音乐反馈时，自动化知道在哪个房间进行操作，并可以选择正确的媒体播放器。这样就可以轻松实现适合每个房间的调节。

标签阅读器是开源的并且 [available on GitHub](https://github.com/adonno/tagreader)。您可以自己制作一个，也可以购买 Adonno [selling](https://adonno-crafts.myshopify.com/) 的预制套件或 DIY 套件之一。

## 在 Home Assistant 0.115 中管理标签

Home Assistant 0.115 将包含一个全新的标签管理器，这要归功于 [@bramkragten](https://github.com/bramkragten) 和 [@dmulcahey](https://github.com/dmulcahey)。在此屏幕上，您可以创建新标签，查看已扫描的标签，并可以轻松地为每个标签创建自动化。新的 UI 与移动应用程序紧密集成，让您只需点击按钮即可将现有 ID 写入新标签。

![Tag user interface in Home Assistant](/home-assistant/images/blog/2020-09-15-home-assistant-tags/tag-ui.gif)

## 构建RFID自动点唱机

之前的所有事情都为我们构建自己的点唱机做好了准备。我们只需使用 Home Assistant 0.115 中的一些很酷的新功能，只需几行 YAML 即可完成此操作：

```yaml
# Note, this is using new automation features introduced in Home Assistant 0.115
automation:
- id: handle_tag_scan
  alias: "Handle Tag Scan"
  mode: single
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
  trigger:
    platform: event
    event_type: tag_scanned
  condition:
    # Test that we support this device and tag
    - ""
    - ""
  action:
    - variables:
        media_player_entity_id: ""
        media_content_id: ""
        media_content_type: ""
    - service: media_player.play_media
      target:
        entity_id: ""
      data:
        media_content_id: ""
        media_content_type: ""
    - delay: 2 # timeout before we allow processing next scan
```

<p class='img'>
<img src='/home-assistant/images/blog/2020-09-15-home-assistant-tags/cards.jpg' alt='Photo of printed NFC 卡片'>
印刷 NFC 配合。 <a href="/home-assistant/integrations/tag/#printing-tags">Learn 如何制作它们</a>
</p>

## 是时候进行扫描了！

有了这些新功能，您将能够做很多很酷的事情。给自己一些 [NFC tags](https://www.amazon.com/dp/B07N38MMTT) 或 [NFC 卡片](https://www.amazon.com/dp/B074M9J5L3) 来开始吧。这里有一些灵感：

- NFC 配合播放音乐
- 书本上的NFC贴纸可以输入祖父母读书的角色
- NFC标签可激活房间内的场景
- NFC 开关可在厨房的屏幕上打开食谱
- NFC标签允许进入您的家

<div class="videoWrapper">
  <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/sF83ZK9kFL4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
