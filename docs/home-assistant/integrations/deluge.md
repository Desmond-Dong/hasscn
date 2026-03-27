---
title: Deluge
description: 'Home Assistant 目前支持以下设备类型：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Downloading
  - Sensor
  - Switch
ha_release: 0.57
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: deluge
ha_platforms:
  - sensor
  - switch
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
---
# Deluge

Home Assistant 目前支持以下设备类型：

- [传感器](#sensor)
- [开关](#switch)

## 前提条件

要能够使用此集成，您需要执行以下操作：

1. 在 deluge 设置中启用以下选项：守护程序 > 允许远程连接
2. 设置完成后，守护程序有一个名为 localclient 的账户。请参阅[此处](https://dev.deluge-torrent.org/wiki/UserGuide/Authentication)获取本地客户端的密码，或在 auth 文件中添加一行包含您自己的用户名和密码。使用其中的凭据之一来验证集成与守护程序的连接。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

`deluge` 平台允许您在 Home Assistant 中监控您的 [Deluge](https://deluge-torrent.org/) 下载，并根据信息设置自动化。

## 开关

`deluge` 开关平台允许您从 Home Assistant 中控制您的 [Deluge](https://deluge-torrent.org/) 客户端。该平台使您能够暂停所有种子，然后取消暂停它们。