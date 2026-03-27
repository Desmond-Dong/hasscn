---
title: Lidarr
description: 'Lidarr 集成会从指定的 Lidarr(https://lidarr.audio/) 实例拉取数据。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Downloading
ha_release: '2022.10'
ha_iot_class: Local Polling
ha_domain: lidarr
ha_config_flow: true
ha_codeowners:
  - '@tkdrob'
ha_platforms:
  - sensor
ha_integration_type: service
---
# Lidarr

**Lidarr** 集成会从指定的 [Lidarr](https://lidarr.audio/) 实例拉取数据。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

要获取 API 密钥，请打开 Lidarr Web 界面，前往 **Settings**，然后打开 **General** 选项卡。您的 Lidarr API Key 会显示在该页面的 **Security** 部分。

## 传感器

Lidarr 集成会添加以下传感器：

- 每个根文件夹的可用磁盘空间
- 队列中的曲目数量
- 仍在等待下载的专辑数量
