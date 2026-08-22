---
author: Paul Bottein
authorURL: https://github.com/piitaya
title: "Entity state 颜色变更"
---

从 Home Assistant Core 2022.12 版本开始，当 entity 处于 active 状态时，我们按 domain 使用不同的颜色。以下 CSS 变量不再使用：

- `--paper-item-icon-active-color`
- `--state-icon-active-color`

这意味着任何之前覆盖过这些 CSS 变量的 theme 将使用内置的 active state 颜色。所有新颜色也都以 CSS 变量的形式提供。

:::caution
由于我们仅正式支持 theme 的 `primary-color` 和 `accent-color` 属性，某些颜色可能会在版本之间增加或删除。
:::

有关 theme 配置的更多详情请参见 [Home Assistant 文档](https://www.home-assistant.io/integrations/frontend/#defining-themes)。