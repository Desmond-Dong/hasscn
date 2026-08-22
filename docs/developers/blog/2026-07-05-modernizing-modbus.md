---
author: Paulus Schoutsen
authorURL: https://github.com/balloob
title: "在 Home Assistant 中现代化 Modbus"
---

:::info Update — 2026 年 7 月 16 日
我们正在重新评估本文中描述的方法的 Home Assistant 方面。基础保持不变：一切仍将围绕 [`modbus-connection`](https://home-assistant-libs.github.io/modbus-connection/) PyPI 包构建，基于它构建的设备库仍然是正确的投资。我们重新思考的是连接在 Home Assistant 本身内部的呈现方式，我们希望专注于能够产生更好的用户体验。如果你正在开发设备集成，请暂缓将其连接到下面描述的 `modbus_connection` 集成——我们将很快在此分享更新后的方法。
:::

Modbus 无处不在地出现在现代家庭中：太阳能逆变器、电表、热泵以及各种进入室内的工业设备。Home Assistant 长期以来通过基于 YAML 的 `modbus` 集成来支持这些设备，用户在其中手写 register maps 配置。该集成不会消失，现有配置将继续工作。但手写 register maps 将理解设备协议的负担加在了每个用户身上，而且它不符合 Home Assistant 其他部分所采取的 config-flow、UI 优先方向。

因此我们添加了一种使用 Modbus 的新方式：基于集成的方法，设备集成拥有设备特定知识，用户只需在 UI 中选择设备，就像任何其他集成一样。

## 共享连接

Modbus 连接是一个单一的、独占的资源：同一时间只能有一方在总线上通信。一个串行（RS-485）总线，或一个 TCP-to-serial 网关，可以同时承载多个设备，有时来自不同的制造商。如果两个集成各自向同一总线打开自己的连接，它们就会争夺总线，而从历史上看，Home Assistant 完全不支持在集成之间共享总线。

新的 [`modbus_connection`](https://github.com/home-assistant/core/tree/dev/homeassistant/components/modbus_connection) 集成通过将连接变成设备集成路由通过而不是拥有的东西来解决这个问题。用户在 UI 中设置一次连接，`modbus_connection` 保持其打开并管理其生命周期，包括在断线后重新连接。设备集成则从该共享连接中借用所需内容，而不是管理自己的连接。我们重新编写了 [Modbus 开发者文档](/developers/modbus/introduction) 来介绍其工作原理，并附带示例代码。

## 独立库

`modbus_connection` 底层的连接抽象位于 [`modbus-connection`](https://home-assistant-libs.github.io/modbus-connection/)，这是我们为此目的设计并发布在 PyPI 上的新库。它不绑定于 Home Assistant，可以在任何 Python 项目中独立使用。它提供一个通用的、与后端无关的接口，因此设备库作者无需考虑底层 Modbus 实现，只需针对一个 API 编写代码，它随附设备建模框架和 `pytest` 插件，使构建和测试设备库变得简单。

这将关注点保持在它们所属的位置。设备库是一个普通的 PyPI 包，知道如何与特定设备通信，而 Home Assistant 中的消费方集成将该库连接到共享连接并暴露 entities。两者都可以独立开发和测试。

更多背景，请参阅我们的[研究](https://gist.github.com/balloob/b9fa91ba1a0914a9787f8f6ceb637b83)。

## 开始构建

有了这些新的构建模块，现在可以将一组 Modbus 的 YAML 配置转换为可以通过 UI 设置的制造商特定集成。如果你（对）这项工作感兴趣，请到 [Home Assistant Discord 的 #modbus 频道](https://discord.com/channels/330944238910963714/1347329854495916044) 看看，我们很乐意提供帮助。

如果你正在使用 AI agent，可以给它以下 prompt：

> 我想使用新的 Modbus Connection 集成为 Home Assistant 创建一个新集成，文档如下：https://developers.home-assistant.io/docs/modbus/introduction
> 
> 我们想要转换为设备库的 YAML 可以在这里找到：*TODO INSERT LOCATION OF MODBUS YAML!*
>
> 本任务的交付物将是 3 个文件夹：
> 
> - 首先基于 YAML 创建设备库。以 https://github.com/Tom-Bom-badil/trovis-modbus/ 作为确切示例，包括如何使用 component models、所有 GitHub Actions、helper scripts 和 README。该库作为独立设备库，不应提及 Home Assistant。查看 modbus_connection 的源码以了解所有支持的字段。
> 
> - 创建一个可以贡献给 Home Assistant core 的集成，遵循这个示例：https://github.com/home-assistant/core/tree/trovis557x-integration/homeassistant/components/trovis557x
> 
> - 创建一个自定义集成版本，将设备库 vendorize，使其可以通过 HACS 由社区测试。遵循此模板 https://github.com/ludeeus/integration_blueprint
