---
title: "创建自定义面板"
sidebar_label: "自定义面板"
---

Panels 是在 Home Assistant 中展示信息并可能允许对其进行控制的页面。Panels 通过 sidebar 链接，并全屏渲染。它们通过 JavaScript 可实时访问 Home Assistant 对象。应用中的 panels 示例包括 dashboards、Map、Logbook 和 History。

除了 component 注册 panels 之外，用户还可以使用 `panel_custom` component 注册 panels。这使得用户可以快速构建自己的 Home Assistant 自定义界面。

## 简介

Panels 被定义为 custom element。你可以使用任何你喜欢的框架，只要将其包装为 custom element。要快速开始构建一个 panel，创建新文件 `<config>/www/example-panel.js` 并放入以下内容

```js
import "https://unpkg.com/wired-card@2.1.0/lib/wired-card.js?module";
import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class ExamplePanel extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
    };
  }

  render() {
    return html`
      <wired-card elevation="2">
        <p>共有 ${Object.keys(this.hass.states).length} 个 entities。</p>
        <p>屏幕${this.narrow ? "" : " 不是"}narrow 的。</p>
        配置的 panel 参数
        <pre>${JSON.stringify(this.panel.config, undefined, 2)}</pre>
        当前 route
        <pre>${JSON.stringify(this.route, undefined, 2)}</pre>
      </wired-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        background-color: #fafafa;
        padding: 16px;
        display: block;
      }
      wired-card {
        background-color: white;
        padding: 16px;
        display: block;
        font-size: 18px;
        max-width: 600px;
        margin: 0 auto;
      }
    `;
  }
}
customElements.define("example-panel", ExamplePanel);
```

然后在你的 `configuration.yaml` 中添加：

```yaml
panel_custom:
  - name: example-panel
    # 每个 panel_custom 配置，url_path 必须唯一
    url_path: redirect-server-controls
    sidebar_title: Example Panel
    sidebar_icon: mdi:server
    module_url: /local/example-panel.js
    config:
      # 你想让 panel 使用的数据
      hello: world
```

## API 参考

Home Assistant 前端会通过在你的 custom element 上设置 properties 来向你的 panel 传递信息。以下 properties 会被设置：

| Property | Type | Description
| -------- | ---- | -----------
| hass     | object | Home Assistant 当前状态
| narrow   | boolean | 指示 panel 是否应以 narrow 模式渲染
| panel    | object | Panel 信息。配置可通过 `panel.config` 访问。

## JavaScript 版本

Home Assistant 用户界面目前以 modern JavaScript 和较旧的 JavaScript（ES5）两种方式向浏览器提供服务。较旧的版本具有更广泛的浏览器兼容性，但代价是更大的体积和更低的性能。

如果你确实需要以 ES5 支持运行，在定义你的 element 之前，需要加载 ES5 custom elements adapter：

```javascript
window.loadES5Adapter().then(function() {
  customElements.define('my-panel', MyCustomPanel)
});
```
