---
title: "前端架构"
sidebar_label: "架构"
---

Home Assistant 前端使用 Web Components 构建。这是一项现代 Web 技术，允许我们将模板、样式和逻辑封装到单个文件中，并在浏览器中以 HTML 标签的形式暴露。这些组件可以自由组合，为我们的应用提供非常动态且强大的基础。

## 结构

Home Assistant 前端可以拆分为 4 个部分：

### Bootstrap

文件：`src/entrypoints/core.ts`

这是一个非常小的脚本，是页面中最先加载的内容。它负责检查认证凭据并建立与后端的 websocket 连接。

这个脚本让我们能够在下载其余 UI 的同时并行开始下载数据。

### App shell

文件：`src/entrypoints/app.ts`

这部分包含渲染侧边栏和处理路由所需的一切。

### Panels

文件夹：`src/panels/`

Home Assistant 中的每个页面都是一个 panel。组件可以注册额外的 panel 供用户使用。panel 的示例包括 "states"、"map"、"logbook" 和 "history"。

### Dialogs

文件夹：`src/dialogs`

某些信息展示和数据录入会以流程的形式呈现给用户。Dialogs 可以在任何页面触发。最常见的是实体 more info dialog，它允许用户深入查看实体的状态、历史和设置。

## 数据流

前端通过 [Websocket API](/developers/api/websocket) 和 [Rest API](/developers/api/rest) 与 Home Assistant 交互。

数据通过 `hass` 属性提供，并向下传递给每个组件。`hass` 属性包含核心状态，并带有调用 API 的方法。

组件可以订阅核心状态中不可用的信息。订阅通过 websocket API 进行，从而使数据与后端保持同步。

我们使用单向数据流。当你在后端进行更改时（例如打开一盏灯），`hass` 对象会在应用根部更新，并提供给每个需要它的组件。

## 路由

前端使用去中心化路由。每个组件只了解足以处理自己负责部分的路由信息。更深层的路由会继续沿组件树向下传递。

例如，`<home-assistant>` 主组件会查看 url 的第一部分来决定应加载哪个 panel。每个 panel 都可以定义自己从 url 到展示内容的映射关系。
