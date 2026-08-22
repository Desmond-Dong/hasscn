---
author: Zack Barett
authorURL: https://github.com/zsarnett
title: "Paper Elements 正在被移除"
---

在 Home Assistant Core 2022.3 版本中，我们正在 Frontend Repository 中移除所有 `paper-dropdown-menu` 和 `paper-input` elements。这意味着任何之前在卡片或卡片编辑器中使用这些 elements 的 custom card 将无法正确渲染，需要更新其代码库。

使用 Home Assistant Frontend 中 elements 的 Custom Cards 从未被支持。

## 为什么这么做？

我们正在将代码库从已弃用的 `paper` elements 转换为 Google 的新 [Material Web Components](https://github.com/material-components/material-components-web-components)。这是为了使我们的前端保持与最新组件和功能同步。

## Custom cards 应该怎么做？

我们的建议是使用 [Scoped Custom Element Registry](https://github.com/lit/lit/tree/main/packages/labs/scoped-registry-mixin) 在你的 custom card 中打包 Material Web Components。从 Home Assistant 2022.3 版本开始，Home Assistant Frontend 加载了为此所需的[polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/scoped-custom-element-registry)。

这将允许任何 custom card 利用 Lovelace Editors 中使用的相同 MWC elements。你可以在 [Boilerplate Card](https://github.com/custom-cards/boilerplate-card) 中看到这种用法的示例。其他 HA elements（如图标选择器 `<ha-icon-picker>`）不支持以同样的方式使用。

更多信息请参见[这篇旧博客文章](https://developers.home-assistant.io/blog/2020/10/02/lazyMoreInfo#what-about-external-elements)。
