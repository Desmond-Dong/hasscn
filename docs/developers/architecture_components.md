---
title: "集成架构"
sidebar_label: "集成"
---

Home Assistant Core 可以通过**集成**进行扩展。每个集成负责 Home Assistant 中的一个特定域。集成可以监听或触发事件，提供 action，并维护状态。集成由一个 component（基础逻辑）和 platforms（与其他集成集成的部分）组成。集成使用 Python 编写，可以利用 Python 提供的所有优势。开箱即用，Home Assistant 提供了大量[内置集成](https://www.home-assistant.io/integrations/)。

<img class='invertDark'
src='/img/en/architecture/component-interaction.svg'
alt='图表展示集成与 Home Assistant 核心之间的交互。' />

Home Assistant 区分以下集成类型：

## 定义物联网域

这些集成在 Home Assistant 中定义特定的物联网设备类别，比如 light。由 `light` 集成来定义在 Home Assistant 中有哪些可用数据以及以什么格式。它还提供了控制灯的 action。

有关已定义域的列表，请参见 [entities](./core/entity.md)。

如需建议一个新域，请在 [架构仓库](https://github.com/home-assistant/architecture/discussions) 中发起讨论。务必展示你提议的 entity 将包含哪些数据，以及它如何被控制。包含多个品牌的示例。

## 与外部设备和服务交互

这些集成与外部设备和服务交互，并通过定义 IoT 域（如 `light`）的集成使其在 Home Assistant 中可用。此类集成的一个示例是 Philips Hue。Philips Hue 灯在 Home Assistant 中作为 light entity 提供。

与外部设备和服务交互的集成通常不允许消耗来自其他集成的 entity 状态，例外情况是具有位置的来自其他集成的 entity，例如 zone 和 device_tracker entity 的状态。

更多信息请参见 [entity 架构](architecture/devices-and-services.md)。

## 表示虚拟/计算数据点

这些集成基于虚拟数据来表示 entity，例如 [`input_boolean` 集成](https://www.home-assistant.io/integrations/input_boolean/)，一个虚拟开关。或者它们基于 Home Assistant 中其他可用数据来派生自己的数据，例如 [`template` 集成](https://www.home-assistant.io/integrations/template/) 或 [`utility_meter` 集成](https://www.home-assistant.io/integrations/utility_meter/)。

## 用户可触发或响应事件的 action

这些集成提供小的家庭自动化逻辑片段，在房屋内执行常见任务。最受欢迎的是 [`automation` 集成](https://www.home-assistant.io/integrations/automation/)，允许用户通过配置格式创建自动化。

它也可以更具体，例如 [`flux` 集成](https://www.home-assistant.io/integrations/flux/)，根据太阳位置控制灯光。
