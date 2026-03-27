---
title: Discogs
description: 'Discogs 集成允许您查看 Discogs(https://www.discogs.com) 收藏中当前的唱片数量。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Multimedia
ha_release: 0.61
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@thibmaek'
ha_domain: discogs
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Discogs

**Discogs** 集成允许您查看 [Discogs](https://www.discogs.com) 收藏中当前的唱片数量。

## 设置

首先，您需要从您的 Discogs 账户获取个人访问令牌。
您可以从个人资料的[开发者设置](https://www.discogs.com/settings/developers)生成令牌。

## 配置

要启用此传感器，请将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: discogs
    token: YOUR_TOKEN
```

监控条件可以创建一个传感器，显示当前收藏和/或心愿单中的唱片数量，以及一个从您的收藏中随机挑选唱片的选项。

```yaml
token:
  description: 用于标识并获取您收藏的 Discogs API 令牌。
  required: true
  type: string
name:
  description: 在前端使用的名称。
  required: false
  type: string
monitored_conditions:
  description: 要包含的传感器列表。
  required: false
  type: list
  keys:
    collection:
      description: 显示用户收藏中的唱片数量。
    wantlist:
      description: 显示用户心愿单中的唱片数量。
    random_record:
      description: 从收藏中随机推荐一张唱片播放。
```