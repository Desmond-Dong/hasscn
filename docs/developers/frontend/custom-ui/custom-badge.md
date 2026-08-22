---
title: "自定义 badge"
---

[Badges](https://www.home-assistant.io/dashboards/badges/) 是位于 view 顶部、所有卡片上方的小部件。我们提供了一个内置的 badge，即 [entity badge](https://next.home-assistant.io/dashboards/badges/#entity-badge)，但你并不局限于这一种。你可以构建并使用自己的 badge！

## 定义你的 badge

定义 badge 的方式与定义 [custom card](/developers/frontend/custom-ui/custom-card) 非常相似。

让我们创建一个基本的 badge，在屏幕顶部显示自定义文本。
在你的 Home Assistant config 目录下创建新文件 `<config>/www/text-badge.js`，并放入以下内容：

```js

class TextBadge extends HTMLElement {
  // 每当 state 变更时，会设置一个新的 `hass` 对象。使用它来
  // 更新你的内容。
  set hass(hass) {
    this._hass = hass;
    this.updateContent();
  }

  // 用户提供的配置。如果抛出异常，Home Assistant
  // 将渲染一个错误 badge。
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

## 引用你的新 badge

在我们的示例 badge 中，我们定义了一个 tag 为 `text-badge` 的 badge（见最后一行），因此我们的 badge type 将是 `custom:text-badge`。由于你把文件创建在 `<config>/www` 目录下，它可以通过 URL `/local/` 在浏览器中访问（如果你最近新增了 www 文件夹，需要重启 Home Assistant 才能识别文件）。

在你的 dashboard 配置中添加一个 resource，URL 为 `/local/text-badge.js`，type 为 `module`（[resource 文档](/developers/frontend/custom-ui/registering-resources)）。

然后你可以在 dashboard 配置中使用你的 badge：

```yaml
# 示例 dashboard 配置
views:
  - name: Example
    badges:
      - type: "custom:text-badge"
        entity: light.bedside_lamp
```

## API

Custom badges 被定义为 [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)。如何在你自己的 element 内部渲染 DOM 由你决定。你可以使用 Polymer、Angular、Preact 或任何其他主流框架（React 除外——[此处了解更多关于 React 的信息](https://custom-elements-everywhere.com/#react)）。

Home Assistant 会在配置变更时（较少见）调用 `setConfig(config)`。如果配置无效而抛出异常，Home Assistant 会渲染一个错误 badge 来通知用户。

Home Assistant 会在 state 变更时（频繁）设置 [the `hass` property](/developers/frontend/data)。每当 state 变更时，该组件都必须更新自身以反映最新的 state。

## 图形化 badge 配置

你的 badge 可以定义一个 `getConfigElement` 方法，返回一个用于编辑用户配置的 custom element。Home Assistant 会在 dashboard 的 badge 编辑器中显示该 element。

你的 badge 还可以定义一个 `getStubConfig` 方法，返回一个默认的 badge 配置（不含 `type:` 参数），以 json 形式供 dashboard 中的 badge type 选择器使用。

Home Assistant 会在初始化时调用 config element 的 `setConfig` 方法。
state 变更时，Home Assistant 会更新 config element 的 `hass` 属性，以及包含 dashboard 配置信息的 `lovelace` element。

配置的变更通过派发一个 `config-changed` 事件传回 dashboard，新配置包含在该事件的 detail 中。

若要让你的 badge 显示在 dashboard 的 badge 选择对话框中，请将描述它的对象添加到数组 `window.customBadges` 中。该对象的必填属性是 `type` 和 `name`（见下方示例）。

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
  preview: false, // 可选 - 默认为 false
  description: "A custom badge made by me!", // 可选
  documentationURL:
    "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-badge", // 在 frontend badge 编辑器中添加帮助链接
});
```
