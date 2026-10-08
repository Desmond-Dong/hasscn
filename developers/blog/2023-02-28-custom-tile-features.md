在 Home Assistant Core 2022.3 版本中，我们为 [tile card](https://www.home-assistant.io/dashboards/tile/) 添加了自定义 features。如果您是自定义 card 的开发者，现在可以为 tile card 构建自己的 feature，而无需构建整个 card。

![Screenshot showing example of custom tile feature](/img/en/blog/2023-02-28-custom-tile-features/example.png)

```yaml
type: tile
entity: button.push
features:
  - type: custom:button-press-tile-feature
```

自定义 tile features 甚至可以使用与自定义 cards 类似的语法添加到 tile card editor 中，就像任何内置 tile feature 一样。

```js
window.customTileFeatures = window.customTileFeatures || [];
window.customTileFeatures.push({
  type: "button-press-tile-feature",
  name: "Button press",
});
```

更多详情请参见 [custom tile features](/developers/frontend/custom-ui/custom-card-feature.md) 文档。
