---
title: "前端设计"
sidebar_label: "设计"
---

我们在 [https://design.home-assistant.io](https://design.home-assistant.io) 维护一个设计门户，提供有关前端各个方面的信息，例如：

* 可以复用的 UI 组件。
* 各种配置和状态下的 Dashboard 卡片。
* 在浅色和深色主题之间对比组件和卡片的便捷方式。
* 关于 Home Assistant 中特定措辞的说明。

当向前端添加新组件或新功能时，需要将其添加到设计门户中。此门户页面说明了具体操作方法：[https://design.home-assistant.io/#design.home-assistant.io/editing](https://design.home-assistant.io/#design.home-assistant.io/editing)

:::note
虽然门户在公开命名上称为 "design"，但在前端仓库中被称为 "gallery"。因此，源代码位于 `gallery/src`，你可以使用 `yarn dev:gallery` 在本地运行 gallery（它是 `gallery/script/develop_gallery` 的一个包装器）。它通过 http://localhost:8100 提供服务，并接受与其他 dev server 相同的 [background lifecycle flags](/developers/frontend/development#managing-the-dev-server-in-the-background)。
:::
