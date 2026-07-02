# 创建自定义面板

Panels 是在 Home Assistant 中显示信息并允许进行控制的页面。它们从侧边栏链接进入，并以全屏形式渲染。它们可以通过 JavaScript 实时访问 Home Assistant 对象。应用中的 panel 示例包括 dashboards、Map、Logbook 和 History。

除了组件可以注册 panels 之外，用户也可以使用 `panel_custom` 组件注册 panels。这使用户能够快速为 Home Assistant 构建自己的自定义界面。

## 介绍

Panels 被定义为 custom elements。你可以使用任何你想要的框架，只要最终将其封装为 custom element。为了快速开始创建 panel，请创建一个新文件 `<config>/www/example-panel.js`，内容如下

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
        <p>There are ${Object.keys(this.hass.states).length} entities.</p>
        <p>The screen is${this.narrow ? "" : " not"} narrow.</p>
        Configured panel config
        <pre>${JSON.stringify(this.panel.config, undefined, 2)}</pre>
        Current route
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

然后将以下内容添加到你的 `configuration.yaml`：

```yaml
panel_custom:
  - name: example-panel
    # url_path needs to be unique for each panel_custom config
    url_path: redirect-server-controls
    sidebar_title: Example Panel
    sidebar_icon: mdi:server
    module_url: /local/example-panel.js
    config:
      # Data you want to make available to panel
      hello: world
```

## API 参考

Home Assistant 前端会通过给你的 custom element 设置属性来向 panel 传递信息。会设置以下属性：

| Property | Type | Description
| -------- | ---- | -----------
| hass     | object | 当前 Home Assistant 状态
| narrow   | boolean | panel 是否应以窄屏模式渲染
| panel    | object | Panel 信息。配置可通过 `panel.config` 获取。

## JavaScript 版本

Home Assistant 用户界面当前会以现代 JavaScript 和较旧的 JavaScript（ES5）形式提供给浏览器。旧版本拥有更广泛的浏览器支持，但代价是体积和性能。

如果你确实需要支持 ES5，则需要在定义元素之前先加载 ES5 custom elements adapter：

```javascript
window.loadES5Adapter().then(function() {
  customElements.define('my-panel', MyCustomPanel)
});
```
