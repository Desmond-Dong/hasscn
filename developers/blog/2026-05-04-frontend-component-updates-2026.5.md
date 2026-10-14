## 组件更新

### ha-progress-bar

一个新的 component 替换了我们 codebase 中的 `mwc-progress-bar`，并且完全可主题化。查看这个 [PR](https://github.com/home-assistant/frontend/pull/51489) 了解一个完全自定义的 progress bar。

新的 component 特定 tokens：

```css
--ha-progress-bar-indicator-color
--ha-progress-bar-indicator-background
--ha-progress-bar-track-color
--ha-progress-bar-track-height
--ha-progress-bar-border-radius
--ha-progress-bar-animation-duration
--ha-progress-bar-indicator-highlight-image
--ha-progress-bar-indicator-highlight-width
--ha-progress-bar-indicator-highlight-height
```

### ha-switch

`ha-switch` 已迁移到 webawesome。它现在有很多 CSS properties 以方便自定义。我们还移除了旧 switch 中的一些 tokens：

已移除的 tokens：

```css
--switch-unchecked-button-color
--switch-unchecked-track-color
--switch-unchecked-color
--switch-checked-button-color
--switch-checked-track-color
--switch-checked-color
```

新的 component 特定 tokens：

```css
--ha-switch-size
--ha-switch-thumb-size
--ha-switch-width
--ha-switch-background-color
--ha-switch-thumb-background-color
--ha-switch-background-color-hover
--ha-switch-thumb-background-color-hover
--ha-switch-checked-background-color
--ha-switch-checked-thumb-background-color
--ha-switch-checked-background-color-hover
--ha-switch-checked-thumb-background-color-hover
--ha-switch-border-color
--ha-switch-thumb-border-color
--ha-switch-thumb-border-color-hover
--ha-switch-checked-border-color
--ha-switch-checked-thumb-border-color
--ha-switch-checked-border-color-hover
--ha-switch-checked-thumb-border-color-hover
--ha-switch-thumb-box-shadow
--ha-switch-disabled-opacity
--ha-switch-required-marker
--ha-switch-required-marker-offset
```

### ha-checkbox

`ha-checkbox` 也已迁移到 webawesome，并获得了新的 CSS properties。你不再能为其使用 MDC tokens，但我们添加了一组 tokens 来自定义新的 checkbox。

新的 component 特定 tokens：

```css
--ha-checkbox-size
--ha-checkbox-border-color
--ha-checkbox-border-color-hover
--ha-checkbox-background-color
--ha-checkbox-background-color-hover
--ha-checkbox-checked-background-color
--ha-checkbox-checked-background-color-hover
--ha-checkbox-checked-icon-color
--ha-checkbox-checked-icon-scale
--ha-checkbox-border-radius
--ha-checkbox-border-width
--ha-checkbox-required-marker
--ha-checkbox-required-marker-offset
```

### ha-textarea

`ha-textarea` 已迁移到 webawesome，并获得了新的 CSS properties。你不再能为其使用 MDC tokens，但我们添加了一组 tokens 来自定义新的 textarea。

API 有细微变化。要使你的 textarea 自动增大尺寸，将 `resize` prop 设置为 `auto`。

### ha-adaptive-popover

你可能已经知道（比较新的）`ha-adaptive-dialog` component。它通过结合 dialog 和 bottom sheet 来实现，在桌面端显示 dialog，在移动端显示 bottom sheet。
我们添加了 `ha-adaptive-popover` 作为 adaptive dialog 的 popover 对应组件。它在桌面端显示 popover，在移动端显示 bottom sheet。它基于 `ha-adaptive-dialog`，目前用于 tile card 的 date picker 功能。

### 移除 ha-fab

`ha-fab` 已被移除，我们现在直接使用普通的 `ha-button`，因为 position 样式一直是由父级 component 完成的。

## 样式更新

### Box shadow 令牌

我们添加了新的全局 box shadow tokens：`--ha-box-shadow-s`、`--ha-box-shadow-m`、`--ha-box-shadow-l`

但我们也移除了旧的 box shadow tokens：

```css
--ha-color-shadow-light
--ha-color-shadow-dark
--ha-shadow-offset-x-...
--ha-shadow-blur-...
--ha-shadow-spread-..
```

### 表面颜色

在下一个版本中，我们计划改变处理 surface 背景颜色的方式。Tokens 现已引入，但目前仅用于 ha-tooltip。

新的 tokens：

```css
--ha-color-surface-default
--ha-color-surface-low
--ha-color-surface-lower
--ha-color-surface-default-inverted
--ha-color-surface-low-inverted
--ha-color-surface-lower-inverted
```
