在 Home Assistant 2024.2 中，集成有了提供 icons 的新方式。为了支持这一新功能，`ha-state-icon` 组件的 properties 已发生变更。

[在我们的文档中了解更多关于 icon 翻译的内容](/developers/core/entity.md#icons)。

如果你是使用此组件的自定义卡片开发者，你必须调整传递给组件的 properties，以避免在自定义卡片中显示错误的 icons。

### 2024.2 之前

```html
<ha-state-icon .state=${stateObj}></ha-state-icon>
```

### 2024.2 之后

```html
<ha-state-icon .hass=${hass} .stateObj=${stateObj}></ha-state-icon>
```

### 向后兼容

如果你想同时支持 Home Assistant 的旧版和新版，可以传递所有 properties。

```html
<ha-state-icon
  .hass=${hass}
  .stateObj=${stateObj}
  .state=${stateObj}
></ha-state-icon>
```
