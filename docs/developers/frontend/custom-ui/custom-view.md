---
title: "Custom views"
---

默认情况下，Home Assistant 会尝试以 masonry 布局（类似 Pinterest）显示卡片。Custom view 布局允许开发者覆盖此行为并定义布局机制（如 grid）。

## API

你将自定义 view 定义为 [custom element](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements)。如何渲染你的 element 内部的 DOM 由你决定。你可以使用 Lit Element、Preact 或其他任何主流框架（React 除外 – [更多信息请看这里](https://custom-elements-everywhere.com/#react)）。

Custom Views 会接收以下内容：

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

Cards 和 Badges 将由核心代码创建和维护，并交给 custom view。Custom views 的目的是加载这些 cards 和 badges，并以自定义布局显示它们。

## 示例

（注意：此示例不包含所有 properties，但包含展示示例所需的基本内容）

```js
import {
  LitElement,
  html,
} from "https://unpkg.com/@polymer/lit-element@^0.6.1/lit-element.js?module";

class MyNewView extends LitElement {
  setConfig(_config) {}

  static get properties() {
    return {
      cards: { type: Array, attribute: false },
    };
  }

  render() {
    if (!this.cards) {
      return html``;
    }

    return html`${this.cards.map((card) => html`<div>${card}</div>`)}`;
  }
}
```

你可以在 Custom Element Registry 中像定义 Custom Card 一样定义此 element：

```js
customElements.define("my-new-view", MyNewView);
```

可以在你的 view 定义中添加以下内容来使用 custom view：

```yaml
- title: Home View
  type: custom:my-new-view
  badges: [...]
  cards: [...]
```

默认的 masonry view 就是一个 layout element 的示例。（[source](https://github.com/home-assistant/frontend/blob/master/src/panels/lovelace/views/hui-masonry-view.ts)）。

## 存储自定义数据

如果你的 view 需要以卡片级别持久化数据，卡片配置中的 `view_layout` 可用于存储信息。例如：Key、X 和 Y 坐标、宽度和高度等。当你需要为 view 存储卡片的位置或尺寸时，这会很有用。

```yaml
- type: weather-card
  view_layout:
    key: 1234
    width: 54px
  entity: weather.my_weather
```

## 编辑、删除或添加卡片

要调用核心 frontend 的对话框来编辑、删除或添加卡片，只需调用以下三个事件：

```
Event: "ll-delete-card"
Detail: { path: [number] | [number, number] }

Event: "ll-edit-card"
Detail: { path: [number] | [number, number] }

Event: "ll-create-card"
Detail: none
```

调用事件的方法：

```js
// 删除当前 view 中的第 4 张卡片（this 指向该 card element）
this.dispatchEvent(
  new CustomEvent("ll-edit-card", {
    detail: { path: [3] },
  }),
);
```
