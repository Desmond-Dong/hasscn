---
title: OwnTone
description: 关于如何将 OwnTone 服务器集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_release: '0.110'
ha_iot_class: Local Push
ha_domain: forked_daapd
ha_codeowners:
  - '@uvjustin'
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

**OwnTone** 集成允许您从 Home Assistant 控制 [OwnTone（以前称为 forked-daapd）](https://github.com/owntone/owntone-server) 服务器。此集成可以控制 OwnTone 输出（区域），具有有限的播放控制（播放/暂停、上一曲/下一曲）和媒体信息支持。不支持播放列表操作。

## 要求

OwnTone 集成需要启用 libwebsockets 构建的 OwnTone 服务器，版本 >= 27.0。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 输出

设置 OwnTone 集成后，输出将自动从服务器加载并实时添加到 Home Assistant 中。

## 管道

由于 OwnTone 支持通过管道播放音频输入，此集成支持将基本播放器控制（播放、暂停、下一曲、上一曲）直接转发到管道源。目前，仅支持 librespot-java 管道源。要使用此功能，请将您的 OwnTone 服务器配置为自动启动管道，并将您的 librespot-java 管道命名为"librespot-java"（OwnTone 也通过名为"librespot-java.metadata"的元数据管道支持附带的元数据）。OwnTone 集成将在数据库中找到 librespot-java 管道并将其设置为源。

## 播放列表

OwnTone 集成将数据库中的播放列表视为源。在集成配置选项中可以设置显示为源的播放列表数量。

## Spotify

OwnTone 集成通过 [Spotify 集成](/home-assistant/integrations/spotify) 支持媒体浏览。但是，要播放 Spotify 内容，您的 OwnTone 实例必须使用 Spotify 登录。这可以通过 OwnTone 自己的 Web 界面完成。有关更多详细信息，请参阅 [OwnTone 关于 Spotify 的说明](https://owntone.github.io/owntone-server/integrations/spotify/#spotify)。您应该在 OwnTone 服务器和 Home Assistant [Spotify 集成](/home-assistant/integrations/spotify) 中使用相同的 Spotify 账户登录。