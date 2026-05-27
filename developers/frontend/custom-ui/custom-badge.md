# 自定义徽章

[Badges](https://www.home-assistant.io/dashboards/badges/) 是位于视图顶部、所有 cards 之上的小部件。我们提供内置 badge —— [entity badge](https://next.home-assistant.io/dashboards/badges/#entity-badge) —— 但你并不局限于这一种。你也可以构建并使用自己的 badge！

## 定义你的徽章

定义 badge 的方式与定义[custom card](/developers/frontend/custom-ui/custom-card.md)非常相似。

让我们创建一个基础 badge，在屏幕顶部显示自定义文本。
在你的 Home Assistant config 目录中创建新文件 `<config>/www/text-badge.js`，并填入以下内容：

```js

class TextBadge extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  set hass(hass) {
    this._hass = hass;
    this.updateContent();
  }

  // The user supplied configuration. Throw an exception and Home Assistant
  // will render an error badge.
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
    this.updateContent();
  }

  updateContent() {
    if (!this.config || !this._hass) return;

    const entityId = this.config.entity;
    const state = this._hass.states[entityId];
    const stateStr = state ? state.state : "unavailable";

    this.innerHTML = `<p>${stateStr}</p>`;
  }
}

customElements.define("text-badge", TextBadge);
```

## 引用你的新徽章

在示例 badge 中，我们定义了一个标签名为 `text-badge` 的 badge（见最后一行），因此 badge 类型会是 `custom:text-badge`。由于你是在 `<config>/www` 目录中创建了该文件，因此它将通过 `/local/` 这个 url 在浏览器中可访问（如果你最近刚添加了 www 文件夹，则需要重启 Home Assistant 才能识别这些文件）。

在你的 dashboard 配置中添加一个资源，URL 为 `/local/text-badge.js`，类型为 `module`（[resource docs](/developers/frontend/custom-ui/registering-resources.md)）。

然后你就可以在 dashboard 配置中使用该 badge：

```yaml
# Example dashboard configuration
views:
  - name: Example
    badges:
      - type: "custom:text-badge"
        entity: light.bedside_lamp
```

## API

Custom badges 被定义为 [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)。如何在元素内部渲染 DOM 由你决定。你可以使用 Polymer、Angular、Preact 或任何其他流行框架（React 除外——[这里有更多关于 React 的说明](https://custom-elements-everywhere.com/#react)）。

当配置发生变化时（较少见），Home Assistant 会调用 `setConfig(config)`。如果你在配置无效时抛出异常，Home Assistant 会渲染一个 error badge 来通知用户。

当 Home Assistant 状态发生变化时（很频繁），Home Assistant 会设置[`hass` 属性](/developers/frontend/data.md)。每当状态变化时，组件都必须更新自身以反映最新状态。

## 图形化徽章配置

你的 badge 可以定义一个 `getConfigElement` 方法，该方法返回一个用于编辑用户配置的 custom element。Home Assistant 会在 dashboard 的 badge editor 中显示该元素。

你的 badge 还可以定义一个 `getStubConfig` 方法，它以 json 形式返回一个默认 badge 配置（不包含 `type:` 参数），供 dashboard 中的 badge type picker 使用。

Home Assistant 会在初始化时调用配置元素的 `setConfig` 方法。
Home Assistant 会在状态变化时更新配置元素的 `hass` 属性，以及包含 dashboard 配置信息的 `lovelace` 元素。

配置变更会通过分发一个 `config-changed` 事件传回 dashboard，新配置位于其 detail 中。

若要让你的 badge 显示在 dashboard 的 badge picker dialog 中，请将描述它的对象添加到数组 `window.customBadges` 中。该对象的必需属性是 `type` 和 `name`（见下面示例）。

```js
import "./text-badge-editor.js";

class TextBadge extends HTMLElement {
  
  ...

  static getConfigElement() {
    return document.createElement("text-badge-editor");
  }

  static getStubConfig() {
    return { entity: "sun.sun" };
  }
}

customElements.define("text-badge", TextBadge);
```

```js
class TextBadgeEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
  }

  configChanged(newConfig) {
    const event = new Event("config-changed", {
      bubbles: true,
      composed: true,
    });
    event.detail = { config: newConfig };
    this.dispatchEvent(event);
  }
}

customElements.define("text-badge-editor", TextBadgeEditor);
window.customBadges = window.customBadges || [];
window.customBadges.push({
  type: "text-badge",
  name: "Text badge",
  preview: false, // Optional - defaults to false
  description: "A custom badge made by me!", // Optional
  documentationURL:
    "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-badge", // Adds a help link in the frontend badge editor
});
```
