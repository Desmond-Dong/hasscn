---
title: 概念与术语
description: Home Assistant 基础概念说明
---

现在您已经进入 Home Assistant，让我们了解最重要的概念。

## 集成

集成是允许 Home Assistant 连接其他软件和平台的软件组件。例如，飞利浦的 Hue 产品使用 Philips Hue 集成，让 Home Assistant 能够与 Hue Bridge 硬件控制器通信。任何连接到 Hue Bridge 的 Home Assistant 兼容设备都会在 Home Assistant 中显示为[设备](#设备)。

![集成](/home-assistant/images/getting-started/integrations.png)

某些集成卡片会显示图标：

- 云图标 <img height="28px" src="/home-assistant/images/getting-started/cloud-icon.png" alt="云图标"/> 表示此集成依赖云服务。
- 文件图标 <img height="28px" src="/home-assistant/images/getting-started/config-file_icon.png" alt="配置文件图标"/> 表示此集成不是通过 UI 设置的。您可能在 **`configuration.yaml`** 文件中设置，或者它是另一个集成的依赖项。如果要配置它，需要在 **`configuration.yaml`** 文件中进行。
- 自定义图标 <img height="28px" src="/home-assistant/images/getting-started/custom-icon.png" alt="自定义图标"/> 表示这不是官方 Home Assistant 集成，而是自定义的。它可能来自其他来源，例如从 HACS 下载。

有关兼容集成的完整列表，请参阅[集成](/home-assistant/integrations/)文档。

添加集成后，硬件和/或数据会在 Home Assistant 中表示为[设备和实体](#设备)。

## 设备

设备是一个或多个实体的逻辑分组。设备可以代表一个物理设备，该设备可能有一个或多个传感器。传感器显示为与设备关联的实体。例如，运动传感器表示为一个设备。它可能提供运动检测、温度和光照水平作为实体。实体有状态，例如检测到运动时为 *已检测到*，没有运动时为 *清除*。

![Home Assistant 设备](/home-assistant/images/getting-started/home-assistant-device_01.png)

设备和实体在整个 Home Assistant 中使用。举几个例子：

- [仪表盘](/home-assistant/getting-started/onboarding_dashboard/) 可以显示实体状态。例如，灯是开还是关。
- [自动化](#自动化) 可以由实体状态变化触发。例如，运动传感器实体检测到运动并触发打开灯光。
- 灯光的预定义颜色和亮度设置保存为[场景](#场景)。

![Home Assistant 设备](/home-assistant/images/getting-started/home-assistant-device_02.png)

## 实体

实体是 Home Assistant 中保存数据的基本构建块。实体代表 Home Assistant 中的传感器、执行器或功能。实体用于监控物理属性或控制其他实体。实体通常是设备或集成的一部分。实体有状态。

<p class='img'><img src='/home-assistant/images/getting-started/entities.png' style='border: 0;box-shadow: none;' alt="实体表格截图">实体表格截图。每行代表一个实体。</p>

## 区域

Home Assistant 中的区域是设备和实体的逻辑分组，用于匹配现实世界中的区域（或房间）：您的家。例如，`客厅`区域将客厅中的设备和实体分组。区域允许您对整组设备调用服务。例如，关闭客厅的所有灯光。

您家中的位置，如客厅、舞池等。区域可以分配给设备。

区域也可用于自动生成的卡片，如[区域卡片](/home-assistant/dashboards/area/)。

## 自动化

一组可重复的动作，可以设置为自动运行。自动化由三个关键组件组成：

1. **触发器** - 启动自动化的事件。例如，日落或运动传感器被激活。
2. **条件** - 自动化运行前必须满足的可选测试。例如，如果有人在家。
3. **动作** - 与设备交互，例如打开灯。

要了解自动化的基础知识，请参阅[自动化基础](/home-assistant/docs/automation/basics/)页面或尝试[创建自动化](/home-assistant/getting-started/automation)。

![自动化编辑器](/home-assistant/images/getting-started/automation-editor.png)

## 脚本

与自动化类似，脚本是可运行的可重复动作。自动化和脚本的区别在于脚本没有触发器。这意味着脚本不能自动运行，除非在自动化中使用。如果您在不同的自动化中执行相同的动作，或从仪表盘触发它们，脚本特别有用。有关如何创建脚本的信息，请参阅[脚本](/home-assistant/integrations/script/)文档。

![脚本](/home-assistant/images/getting-started/script_01.png)

## 场景

场景允许您为设备创建预定义设置。类似于手机上的驾驶模式或汽车中的驾驶员配置文件，它可以改变环境以适合您。例如，您的*看电影*场景可能会调暗灯光、打开电视并增加音量。这可以保存为场景并使用，而无需每次都设置单独的设备。

要了解如何使用场景，请参阅[场景](/home-assistant/integrations/scene/)文档。

![场景](/home-assistant/images/getting-started/scene_02.png)

## 应用

应用是提供 Home Assistant 附加功能的第三方应用程序。应用直接在 Home Assistant 旁运行，而集成将 Home Assistant 连接到其他应用。应用仅在 **Home Assistant 操作系统** 中[受支持](/home-assistant/installation/#advanced-installation-methods)。

应用从应用商店安装，位于[**设置** > **应用**](https://my.home-assistant.io/redirect/supervisor/)。如果您现在好奇并想安装每个看起来有趣的应用：请注意，应用可能会占用相当多的资源，包括磁盘空间、内存和处理器负载。

最常用的应用之一是提供 Home Assistant 中[文件访问和编辑文件](/home-assistant/docs/configuration/#to-set-up-access-to-the-files-and-prepare-an-editor)的应用。

<p class='img'><img src='/home-assistant/images/getting-started/app-store.png' style='border: 0;box-shadow: none;' alt="应用商店截图，显示所有可安装的应用">应用商店截图，显示所有可安装的应用。</p>

:::info [编辑仪表盘](/home-assistant/getting-started/onboarding_dashboard/)
:::
