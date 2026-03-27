---
title: Zodiac
description: 'Zodiac 集成会跟踪当前的黄道十二宫星座。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Environment
ha_iot_class: Calculated
ha_release: 0.116
ha_codeowners:
  - '@JulienTant'
ha_domain: zodiac
ha_platforms:
  - sensor
ha_integration_type: integration
ha_config_flow: true
---
# Zodiac

**Zodiac** 集成会跟踪当前的黄道十二宫星座。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

此集成提供一个传感器，其状态会返回以下值之一：
`aries`, `taurus`, `gemini`, `cancer`, `leo`, `virgo`, `libra`, `scorpio`, `sagittarius`, `capricorn`, `aquarius`, `pisces`.

该传感器还会公开以下属性：

- `element`：`fire`、`air`、`earth`、`water`
- `modality`：`cardinal`、`fixed`、`mutable`
