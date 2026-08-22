---
author: Zack Barett
authorURL: https://github.com/zsarnett
authorTwitter: zsarnett
title: "Lovelace：Custom View Layouts"
---

Custom Element 开发者现在可以创建用户可以加载和使用的 Custom View Layouts！

在 0.116 中，我们将更改在 Lovelace 中创建 Views 的方式。过去，我们有两种 views：default view 和 panel view。在讨论为 Lovelace 添加 Drag and Drop 时，我们决定可以做得更好，并开始允许自定义 view types。

Custom 开发者现在将能够创建一个接收以下 properties 的 view：

```ts
interface LovelaceViewElement {
  hass?: HomeAssistant;
  lovelace?: Lovelace;
  index?: number;
  cards?: Array<LovelaceCard | HuiErrorCard>;
  badges?: LovelaceBadge[];
  setConfig(config: LovelaceViewConfig): void;
}
```

Cards 和 Badges 将由 core code 创建和维护，并传递给 custom view。Custom views 旨于加载 cards 和 badges，并以自定义布局显示它们。

以下是示例：（注意：此示例没有包含所有 properties，但包含显示示例所必需的内容）

```js
class MyNewView extends LitElement {
  setConfig(_config) {}

  static get properties() {
    return { 
      cards: {type: Array, attribute: false}
    };
  }

  render() {
    if(!this.cards) {
      return html``;
    }
    return html`${this.cards.map((card) => html`<div>${card}</div>`)}`;
  }
}
```

你可以像在 Custom Element Registry 中定义 Custom Card 一样定义这个 element：

```js
customElements.define("my-new-view", MyNewView);
```

你可以在我们的 default view：`Masonry View` 中找到示例，位置在此：[frontend/src/panels/lovelace/views/hui-masonry-view.ts](https://github.com/home-assistant/frontend/blob/master/src/panels/lovelace/views/hui-masonry-view.ts)

下载并安装你的新 Custom View 的用户，可以通过编辑其 view 的 YAML 配置来使用它：

```yaml
- title: Home View
  type: custom:my-new-view
  badges: [...]
  cards: [...]
```

Custom 开发者可以为每个 card 添加一个 `layout` property，用于存储 key、位置信息、宽度、高度等：

```yaml
- type: weather-card
  layout:
    key: 1234
    width: 54px
  entity: weather.my_weather
```

### 破坏性变更

对于像这样使用以下代码的 Custom Card 开发者：

```js
const LitElement = Object.getPrototypeOf(customElements.get("hui-view"));
```

你将不再能够使用 `hui-view` element 来获取 LitElement，因为它已被更改为 `updatingElement`。相反，你可以使用：

```js
const LitElement = Object.getPrototypeOf(customElements.get("hui-masonry-view"));
```

但请注意！HA 不支持这种做法。未来，这可能无法再用来导入 LitElement。