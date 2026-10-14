## 组件更新

### ha-split-panel

我们添加了 `ha-split-panel`，它是对 Web Awesome split panel component 的 Home Assistant 包装。

当 Home Assistant 的 page、dialog 或 tool 需要可调整大小的双窗格布局时使用它。自定义卡片作者可以使用 Home Assistant frontend components，但 Home Assistant 内部 UI APIs 可能会变更。

```html
<ha-split-panel position="40" snap="50%">
  <div slot="start">Editor</div>
  <div slot="end">Preview</div>
</ha-split-panel>
```

新的 component-specific tokens：

```css
--ha-split-panel-divider-width
--ha-split-panel-divider-hit-area
--ha-split-panel-min
--ha-split-panel-max
--ha-split-panel-grip-display
```

### ha-tile-info updates

`ha-tile-info` 为自定义卡片和 tile-like surfaces 获得更多 layout 控制。

新的 component-specific tokens：

```css
--ha-tile-info-gap
--ha-tile-info-min-height
--ha-tile-info-primary-min-height
--ha-tile-info-primary-line-clamp
```

当 primary 文本需要换行到多行时使用 `--ha-tile-info-primary-line-clamp`，并使用 min-height tokens 在部分 tiles 有 secondary 文本而另一些没有时保持 rows 对齐。

## Form 和 selector 更新

### 条件 ha-form 字段

`ha-form` schemas 现在支持通过 `visible` 实现条件字段可见性。

```ts
[
  {
    name: "advanced",
    selector: { boolean: {} },
  },
  {
    name: "advanced_name",
    visible: { field: "advanced", value: true },
    selector: { text: {} },
  },
]
```

支持的 operators 是：

```ts
"eq"
"not_eq"
"in"
"not_in"
"exists"
"not_exists"
```

你也可以用 `and`、`or` 和 `not` 组合条件。

隐藏字段不会被渲染，并在验证期间被跳过，因此当 form 字段依赖于另一个值时，请使用 `visible` 而不是自定义的仅 frontend 隐藏逻辑。

### Selector 新增

Text selector 现在支持 HTML pattern 验证：

```ts
{
  text: {
    pattern: "[a-z0-9_]+",
    validation_message: "Use lowercase letters, numbers, and underscores",
  },
}
```

这对单值和多值 text selectors 都适用。

Entity selectors 现在可以通过 entity 的 device 属性进行筛选：

```ts
{
  entity: {
    filter: {
      domain: "sensor",
      device: {
        manufacturer: "Home Assistant",
        model: "Connect ZBT-1",
      },
    },
  },
}
```

还添加了一个新的 `ui_clock_date_format` selector，用于 clock card 的 date format editor。

## Lovelace 更新

### state\_color 正在迁移到 color

`entities` 和 `glance` cards 现在支持 `color` 作为 `state_color` 的替代。

之前：

```yaml
type: entities
state_color: true
entities:
  - light.kitchen
```

之后：

```yaml
type: entities
color: state
entities:
  - light.kitchen
```

用 `color: state` 对应旧的 `state_color: true` 行为，用 `color: none` 对应 `state_color: false`。

## Custom panels 和 apps

### Safe-area 处理

Custom panels 和 add-on app iframes 现在默认获得 safe-area padding，因此内容保持在 notches、状态栏和主屏指示符之外。

已经自行处理 safe areas 的 custom panels 可以选择退出：

```yaml
panel_custom:
  - name: my-panel
    module_url: /local/my-panel.js
    handle_safe_area: true
```

对于基于 iframe 的 custom panels，Home Assistant 将解析后的 safe-area 值作为 CSS variables 转发到 iframe document：

```css
--safe-area-inset-top
--safe-area-inset-right
--safe-area-inset-bottom
--safe-area-inset-left
```

Add-on app iframes 在订阅 Home Assistant properties 时也可以选择自行管理 safe area：

```js
window.parent.postMessage(
  {
    type: "home-assistant/subscribe-properties",
    handleSafeArea: true,
  },
  "*"
);
```

Properties message 随后会包含 `safeAreaInsets`。

## Context 和 editor 基础设施

### 全局 dirty state

`DirtyStateProviderMixin` 现在还会发布全局 dirty state。

当任何连接的 dirty-state provider 有未保存的变更时，会设置 `window.isDirtyState`，Home Assistant 会触发 `dirty-state-changed` event。

```ts
window.addEventListener("dirty-state-changed", (ev) => {
  console.log(ev.detail.isDirty);
});
```

这对于需要避免干扰具有未保存变更的活动 editors 或 dialogs 的共享基础设施非常有用。
