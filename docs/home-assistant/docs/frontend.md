---
title: Home Assistant 前端
description: 了解 Home Assistant 前端界面、仪表盘及相关设置。
---

Home Assistant 的[前端集成](/home-assistant/integrations/frontend/)提供图形用户界面，让您可以浏览和控制家中的状态，并管理自动化和配置。

<p class='img'>
  <img src='/home-assistant/images/frontend/ui2022.png' alt='Home Assistant 前端界面示例' />
</p>

Home Assistant 自带内置仪表盘，您也可以创建并自定义自己的仪表盘。

## 创建和自定义仪表盘

要了解如何创建和自定义自己的仪表盘，请参阅以下主题：

- [仪表盘概览](/home-assistant/dashboards/)
- [仪表盘卡片类型](/home-assistant/dashboards/)
- [主题](/home-assistant/integrations/frontend/)
- [图标](/home-assistant/docs/frontend/icons/)

## 组织和筛选数据

要了解如何在现有仪表盘中组织和筛选数据，请参阅以下主题：

- [组织 Home Assistant](/home-assistant/docs/organizing/)
- [区域](/home-assistant/docs/organizing/areas/)
- [楼层](/home-assistant/docs/organizing/floors/)
- [标签](/home-assistant/docs/organizing/labels/)
- [分类](/home-assistant/docs/organizing/categories/)
- [表格筛选](/home-assistant/docs/organizing/tables)

## 用户设置、浏览器设置和常规设置

### 用户设置和浏览器设置

部分前端设置取决于当前用户，另一些设置则取决于所使用的客户端。这样，您可以为不同用户设置不同语言，也可以为不同设备设置不同显示偏好。

要更改这些设置，请在左下角选择您的用户名，打开 [**用户资料**](https://my.home-assistant.io/redirect/profile/)。

- 要更改语言、数字格式、时间格式和主题等通用设置，请使用 **用户设置**。
- 要更改侧边栏行为等与浏览器相关的设置，请使用 **浏览器设置**。

### 主题

主题按用户分别设置。在 [**用户资料**](https://my.home-assistant.io/redirect/profile/) 中，您可以定义主题设置，例如选择浅色或深色主题。更详细的主题设置需要通过 YAML 配置。请参阅[前端集成](/home-assistant/integrations/frontend/)文档。

### 常规设置

某些设置，如位置和货币，会在初始引导过程中定义。您可以在 [**设置** > **系统** > **常规**](https://my.home-assistant.io/redirect/general/) 中更改它们。更多信息请参阅[设置基本信息](/home-assistant/docs/configuration/basic/)。

## Android 和 iOS 应用

如果您正在查找 Home Assistant Android 或 iOS 应用的相关信息，请参阅 [Companion Apps 文档](https://companion.home-assistant.io/)。
