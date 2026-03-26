---
title: "自定义视图布局"
---

默认情况下，Home Assistant 会尝试以 masonry 布局（类似 Pinterest）显示 cards。自定义视图布局允许开发者覆盖这一行为，并定义自己的布局机制（例如网格）。

## API

你可以将自定义视图定义为 [custom element](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements)。如何在元素内部渲染 DOM 由你决定。你可以使用 Lit Element、Preact 或任何其他流行框架（React 除外——[这里有更多关于 React 的说明](https://custom-elements-everywhere.com/#react)）。

自定义视图会接收到以下内容：

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

Cards 和 Badges 会由核心代码创建并维护，然后传递给 custom view。Custom views 的职责是加载这些 cards 和 badges，并以自定义布局显示它们。

## 示例

（注意：此示例并未包含所有属性，只保留了展示示例所需的最基本内容）

```js
import { LitElement, html } from "https://unpkg.com/@polymer/lit-element@^0.6.1/lit-element.js?module";

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

你可以像定义 Custom Card 一样，在 Custom Element Registry 中定义这个元素：

```js
customElements.define("my-new-view", MyNewView);
```

在视图定义中添加以下内容即可使用 custom view：

```yaml
- title: Home View
  type: custom:my-new-view
  badges: [...]
  cards: [...]
```

默认的 masonry view 就是一个布局元素示例。([source](https://github.com/home-assistant/frontend/blob/master/src/panels/lovelace/views/hui-masonry-view.ts))。

## 存储自定义数据

如果你的视图需要在 card 级别持久化数据，可以使用 card 配置中的 `view_layout` 来存储信息。例如：key、X 和 Y 坐标、宽度和高度等。当你需要为视图存储 card 的位置或尺寸时，这会很有用。

```yaml
- type: weather-card
  view_layout:
    key: 1234
    width: 54px
  entity: weather.my_weather
```

## 编辑、删除或添加卡片

如果你想调用核心前端 dialogs 来编辑、删除或添加 card，只需触发以下三个事件：

```
Event: "ll-delete-card"
Detail: { path: [number] | [number, number] }

Event: "ll-edit-card"
Detail: { path: [number] | [number, number] }

Event: "ll-create-card"
Detail: none
```

你可以这样触发事件：

```js
// Delete 4th card in the current view
this.dispatchEvent(new CustomEvent("ll-edit-card", { detail: { path: [3] } })) // this refers to the card element
```
