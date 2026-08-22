---
author: Wendelin Peleska
authorURL: https://github.com/wendevlin
title: "Frontend component updates 2026.4"
---

:::info
我们不官方支持或鼓励自定义卡片开发者使用我们内置的 components。这些 component APIs 随时可能变更，你应该将你的卡片构建为独立组件。
:::

## ha-input

我们持续将基于 Material Design 的 components 迁移到基于 Web Awesome。这次我们迁移了 input 组件，这导致了 API 变更，但视觉效果暂时保持不变。

- `ha-input` 是 `ha-textfield` 的继任者
  - `ha-textfield` 的 API 保持不变，但组件已迁移为内部使用 `ha-input`，并将在 2026.5 中移除
  - 同时替换 `ha-outlined-text-field`
- `ha-input-search` 替换 `search-input` 和 `search-input-outlined`
- `ha-input-multi` 替换 `ha-multi-textfield`
- `ha-input-copy` 替换 `copy-textfield`

此组件还引入了新的表单背景语义化 theme 变量：

```css
--ha-color-form-background: var(--ha-color-neutral-95);
--ha-color-form-background-hover: var(--ha-color-neutral-90);
--ha-color-form-background-disabled: var(--ha-color-neutral-80);
```

## 日期选择器

我们终于通过用 [Cally](https://wicky.nillia.ms/cally/) 替换 date 和 date range picker 移除了 Vue 2 依赖。
