---
title: Last.fm
description: 'Last.fm 集成可让您查看用户何时开始记录播放、播放总次数、最近播放的歌曲，以及在 Last.fm(https://www.last.fm/) 上播放次数最多的歌曲。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Social
ha_iot_class: Cloud Polling
ha_release: '0.20'
ha_domain: lastfm
ha_platforms:
  - sensor
ha_integration_type: service
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
---
# Last.fm

**Last.fm** 集成可让您查看用户何时开始记录播放、播放总次数、最近播放的歌曲，以及在 [Last.fm](https://www.last.fm/) 上播放次数最多的歌曲。

## 前提条件

要获取 API 密钥，您需要创建一个 [API 账户](https://www.last.fm/api/account/create)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
