---
title: Configuration
description: 关于如何为 Home Assistant 设置配置面板的说明。
ha_category:
  - Front end
ha_release: 0.39
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: config
ha_platforms:
  - scene
ha_integration_type: system
related:
  - docs: /docs/configuration/
    title: Configuration file
---

**Config** 集成旨在在前端显示 **设置** 面板，用于配置和管理 Home Assistant 的各个部分。

这是一个内部集成，默认启用。

**设置** 菜单提供对以下面板的访问：

### Home Assistant Cloud

使您能够连接到 [Home Assistant Cloud](https://support.nabucasa.com/hc/articles/26260474250269) 以使用安全远程访问、语音助手或备份云存储等功能。

### 设备与服务

使您能够在 Home Assistant 中管理 Philips Hue 和 Sonos 等设备的集成。

### 自动化与场景

使您能够在 Home Assistant 中创建和修改自动化、场景、脚本和蓝图。

### 区域、标签和地点

使您能够根据家中的物理或概念区域组织实体。

### Home Assistant 应用（原名附加组件）

使您能够安装和使用额外的独立第三方软件包。应用只能在 Home Assistant OS 上安装。

### 仪表板

使您能够添加新的 [仪表板](/home-assistant/dashboards) 并管理现有的仪表板。

### 语音助手

使您能够创建和管理 [语音助手](/home-assistant/voice_control/)。

### 标签

允许您设置 NFC 标签和二维码。

### 人员

允许您管理谁可以访问 Home Assistant 以及他们有权配置什么。

### 系统

允许您定义系统的时区和位置等内容，还可以查看日志、创建备份或添加外部网络存储。

### 关于

允许您查看 [版本信息](https://my.home-assistant.io/redirect/info/)。
