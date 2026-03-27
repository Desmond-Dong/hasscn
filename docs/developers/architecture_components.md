---
title: "集成架构"
description: 'Home Assistant Core 可以通过 集成 扩展。每个集成都负责 Home Assistant 中某个特定领域的功能。集成可以监听触发器或事件、提供操作并维护状态。一个集成通常由组件（基础逻辑）和平台（与其它集成对接的部分）组成。集成使用 Python 编写，因此可以充分利用 Python 生态。'
sidebar_label: "集成"
---
# 集成架构

Home Assistant Core 可以通过 **集成** 扩展。每个集成都负责 Home Assistant 中某个特定领域的功能。集成可以监听触发器或事件、提供操作并维护状态。一个集成通常由组件（基础逻辑）和平台（与其它集成对接的部分）组成。集成使用 Python 编写，因此可以充分利用 Python 生态。开箱即用时，Home Assistant 已经提供了大量[内置集成](https://www.home-assistant.io/integrations/)。

<img class='invertDark'
src='/developers/img/en/architecture/component-interaction.svg'
alt='显示集成和 Home Assistant Core 之间交互的图表。' />

在 UI 中，Home Assistant 区分以下几类集成：

## 定义物联网领域

这类集成在 Home Assistant 中定义具体的物联网设备类别，例如灯。`light` 集成定义了 Home Assistant 中这类数据的结构和格式，也提供控制灯的操作。

已定义领域的列表可参见[实体](/developers/core/entity)。

如果你想提议新增领域，请先到[architecture 仓库](https://github.com/home-assistant/architecture/discussions)发起讨论。请明确说明你提议的实体会包含哪些数据、如何控制，并提供多个品牌的示例。

## 与外部设备和服务交互

这类集成负责与外部设备或服务通信，并通过那些定义了 IoT 领域（例如 `light`）的集成将它们接入 Home Assistant。Philips Hue 就是典型示例：Hue 灯会在 Home Assistant 中以 `light` 实体的形式呈现。

与外部设备和服务交互的集成通常不应依赖其它集成中实体的状态，但可以使用来自其它来源的实体事件，例如区域事件，或者 `device_tracker` 实体的状态变化。

更多信息请参见[实体架构](/developers/architecture/devices-and-services)。

## 表示虚拟或计算得出的数据点

这类集成表示虚拟实体，或者基于已有数据计算得出的实体，例如 [`input_boolean` 集成](https://www.home-assistant.io/integrations/input_boolean/) 提供的虚拟开关；也包括根据 Home Assistant 中其它数据派生新数据的集成，例如 [`template` 集成](https://www.home-assistant.io/integrations/template/) 和 [`utility_meter` 集成](https://www.home-assistant.io/integrations/utility_meter/)。

## 由用户触发或响应事件的操作

这类集成提供家庭自动化逻辑，用于执行常见任务。最常见的是 [`automation` 集成](https://www.home-assistant.io/integrations/automation/)，它允许用户通过配置创建自动化。

也可以是更具体的集成，例如 [`flux` 集成](https://www.home-assistant.io/integrations/flux/)，它会根据太阳位置调整灯光设置。
