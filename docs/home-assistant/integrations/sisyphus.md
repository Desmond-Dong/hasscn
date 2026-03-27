---
title: Sisyphus
description: 'Home Assistant 的 Sisyphus(https://sisyphus-industries.com/) 集成可让您查看并控制 Sisyphus 动能艺术桌。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Hub
  - Light
  - Media player
ha_release: 0.75
ha_iot_class: Local Push
ha_codeowners:
  - '@jkeljo'
ha_domain: sisyphus
ha_platforms:
  - light
  - media_player
ha_integration_type: integration
ha_quality_scale: legacy
---
# Sisyphus

Home Assistant 的 [Sisyphus](https://sisyphus-industries.com/) 集成可让您查看并控制 Sisyphus 动能艺术桌。

Home Assistant 目前支持以下设备类型：

- **Light** - 可用于让桌子休眠/唤醒，或调整桌灯亮度。
- **Media player** - 可用于让桌子休眠/唤醒、播放/暂停、切换曲目，或开关随机播放。“音量”控制用于调节桌子的运行速度。

如果已配置 Sisyphus 集成，系统会自动为您的每张 Sisyphus 桌子添加 light 和 media player 实体。

此集成有两种配置方式。若要自动发现您的桌子，请将以下内容添加到 `configuration.yaml`：

```yaml
# 这会自动检测本地网络中的所有 Sisyphus 桌子。
sisyphus:
```

自动检测可能稍慢，因此如果您的桌子具有固定 IP 地址或主机名，也可以在 `configuration.yaml` 中直接添加桌子列表。例如：

```yaml
# 这会跳过自动检测，仅添加下方列出的桌子
sisyphus:
  - name: 'TABLE_NAME'
    host: "TABLE_IP_OR_HOSTNAME"
  - name: 'ANOTHER_TABLE_NAME'
    host: "ANOTHER_TABLE_IP_OR_HOSTNAME"
```

```yaml
name:
  description: 该桌子在 Home Assistant 中显示的名称
  required: true
  type: string
host:
  description: 该桌子的主机名或 IP 地址
  required: true
  type: string
```
