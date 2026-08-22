---
title: "前端架构"
sidebar_label: "架构"
---

Home Assistant 前端基于 web components 构建。这是一种现代 web 技术，使我们能够将模板、样式和逻辑封装到一个文件中，并在浏览器中将其暴露为一个 HTML 标签。这些组件是可组合的，为我们应用程序提供了一个非常动态且功能强大的基础。

## 结构

Home Assistant 前端可以分为 4 个部分：

### 引导

文件：`src/entrypoints/core.ts`

这是一个非常小的脚本，是页面上最先加载的内容。它负责检查认证凭据，并与后端建立 websocket 连接。

该脚本允许我们在下载其余 UI 的同时并行开始下载数据。

### 应用外壳

文件：`src/entrypoints/app.ts`

此入口点加载 `<home-assistant>` 根元素和全局样式。根元素的实现在 `src/layouts/home-assistant.ts` 中。它初始化应用程序状态，处理顶层导航，并渲染 `src/layouts/home-assistant-main.ts`。

主布局渲染侧边栏，并将当前路由传递给面板解析器，由后者加载并显示所请求的面板。

### 面板

文件夹：`src/panels/`

Home Assistant 中的每个页面都是一个 panel。组件可以注册额外的 panel 以展示给用户。panel 的示例包括"states"、"map"、"logbook"和"history"。

### 对话框

文件夹：`src/dialogs`

某些信息和数据录入以流程的形式呈现给用户。dialog 可在任何页面触发。最常见的是 entity more info dialog，它允许用户深入了解某个实体的状态、历史记录和设置。

## 数据流

前端利用 [WebSocket API](/developers/api/websocket) 和 [REST API](/developers/api/rest) 与 Home Assistant 交互。

数据通过 `hass` 属性提供，并向下传递给每个组件。`hass` 属性包含核心状态，并拥有调用 API 的方法。

只需要 Home Assistant 部分状态的组件，应改为使用相关的 [Lit context](data.md#context)。

组件可以订阅核心状态中不可用的信息。订阅通过 websocket API 运行，从而保持数据与后端同步。

我们使用单向数据流。当你在后端做出更改时（例如打开一盏灯），`hass` 对象会在应用程序根部更新，并可供每个需要它的组件使用。

## 路由

前端采用去中心化路由。每个组件只需要了解足够的路由信息，以知道如何处理它负责的部分。进一步的路由则沿组件树向下传递。

例如，`<home-assistant>` 主组件会查看 URL 的第一部分，以决定应加载哪个 panel。每个 panel 可以自行定义 URL 与显示内容之间的映射。
