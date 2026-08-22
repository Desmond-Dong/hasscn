## 组件更新

### ha-radio updates

`ha-radio` 已从我们的 codebase 中移除，我们现在使用基于 webawesome 的 `ha-radio-group` 配合 `ha-radio-option`。不再需要在 `ha-radio` 周围使用 `ha-formfield`，你可以使用新的 CSS properties 自定义 radio group 和 options。

新的 component 特定 tokens：

```css
--ha-radio-group-required-marker
--ha-radio-group-required-marker-offset

--ha-radio-option-active-color
--ha-radio-option-heigh
--ha-radio-option-toggle-size
--ha-radio-option-border-width
--ha-radio-option-border-color
--ha-radio-option-border-color-hover
--ha-radio-option-background-color
--ha-radio-option-background-color-hover
--ha-radio-option-checked-background-color
--ha-radio-option-checked-icon-color
--ha-radio-option-checked-icon-scale
--ha-radio-option-control-margin
```

### ha-drawer updates

`ha-drawer` 已更新为使用 webawesome drawer component。API 基本相同，只是现在使用 `--ha-sidebar-width` 而不是 `--mdc-drawer-width`。

### top bar

* `ha-top-app-bar` 已被完全移除。
* `ha-top-app-bar-fixed` 已从 MWC 迁移到纯 Lit。
* `ha-two-pane-top-app-bar-fixed` 已重写为扩展新实现，而不是 Material base code。
* `ha-header-bar` 已从 Material top-app-bar 样式包装器重写为原生 Lit component。

`--ha-top-app-bar-width` token 替换了 `--mdc-top-app-bar-width`。

## 新装饰器

### @consumeLocalize

继上个版本介绍的 [context entry decorators](/developers/blog/2026-05-04-frontend-context-groups-decorators.md) 之后，我们为从 `internationalizationContext` 读取最常见的单个字段——`localize` 函数——添加了一个快捷方式。

之前：

```ts
@state()
@consume({ context: internationalizationContext, subscribe: true })
@transform<HomeAssistantInternationalization, LocalizeFunc>({
  transformer: ({ localize }) => localize,
})
private _localize!: LocalizeFunc;
```

之后：

```ts
@state()
@consumeLocalize()
private _localize!: LocalizeFunc;
```

当 component 只需要 `localize` 函数时，使用 `@consumeLocalize()`。对于从 `internationalizationContext` 读取的其他单字段（例如 `locale`、`language`），继续使用 `@consume` + `@transform`。
