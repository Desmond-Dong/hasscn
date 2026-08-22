*在 Home Assistant 2021.5 中引入。*

Strategies 是生成自定义 dashboards 和/或 views 的 custom elements。你可以在 frontend 仓库中创建新的 strategies，也可以创建作为 dashboard resources 加载的 custom strategies。两者都可以像 [custom cards](/developers/frontend/custom-ui/custom-card.md) 一样访问 Home Assistant API。

一个 strategy 可以生成单个 view，也可以生成包含一个或多个 view 的完整 dashboard。

与 custom cards 一样，custom strategies 需要作为 resources 加载。有关如何将 strategies 作为 resources 包含的更多信息，请参见 [registering resources](/developers/frontend/custom-ui/registering-resources.md)。

如果你已经构建过 custom card，这套流程会让你感到熟悉。Strategies 的加载方式相同，但它们不是直接渲染单个卡片，而是生成 dashboard 内容。当需要时，它们也可以与 custom cards 配合使用。你可以像导入任何其他 resource/element 一样将 custom cards 导入到你的 strategy 中。

## 仪表盘

dashboard strategy 生成完整的 dashboard 配置。在大多数情况下，它从一个小型的 strategy config 开始，返回完整的 dashboard 结构。可以把它想成一个随后会被渲染成 dashboard 的 json/yaml 配置。内置的 dashboards 就是用 dashboard strategies 构建的。你可以在[这里](https://github.com/home-assistant/frontend/tree/dev/src/panels/lovelace/strategies)阅读内置 dashboards 的源代码。

### 在新的 dashboard 对话框中展示你的社区 dashboard

**在 Home Assistant 2026.5 中引入。**

如果你已经有一个 dashboard strategy，可以通过将其注册到 `window.customStrategies` 中来让人更容易添加。

一旦 resource 加载完毕，Home Assistant 就可以在新的 dashboard 对话框的 **Community dashboards** 部分中显示你的 dashboard。

该对象支持以下 key：

| Key                | Required | Description                                                                    |
| ------------------ | -------- | ------------------------------------------------------------------------------ |
| `type`             | Yes      | 不带 `custom:` 前缀的 strategy type。                                    |
| `strategyType`     | Yes      | 设为 `"dashboard"` 以注册一个 dashboard strategy。                    |
| `name`             | No       | 在选择器中显示的友好名称。                                       |
| `description`      | No       | 显示在名称下方的简短文本。                                         |
| `documentationURL` | No       | 指向你的文档的链接。目前在 strategy UI 中尚未显示。     |

示例：

```js
window.customStrategies = window.customStrategies || [];
window.customStrategies.push({
  type: "my-demo",
  strategyType: "dashboard",
  name: "My demo dashboard",
  description: "A starter dashboard generated from JavaScript.",
  documentationURL: "https://example.com/my-demo-dashboard",
});
```

### 在创建对话框中建议初始值

dashboard strategies 还可以为在用户选择 strategy 后打开的 dashboard 详情表单建议初始值。

为此，在 dashboard strategy element 中添加一个静态 `getCreateSuggestions(hass)` 方法。返回一个包含以下任意可选 key 的对象：

| Key     | Description                                |
| ------- | ------------------------------------------ |
| `title` | 建议的 dashboard 标题。                 |
| `icon`  | 建议的 dashboard 图标，如 `mdi:home`。 |

示例：

```js
class MyDemoDashboardStrategy extends HTMLElement {
  static getCreateSuggestions(_hass) {
    return {
      title: "My demo dashboard",
      icon: "mdi:view-dashboard",
    };
  }

  static async generate(config, hass) {
    // ...
  }
}
```

这些值只是对话框的默认值。用户仍然可以在创建 dashboard 之前更改它们。

### 示例

一个好的起点是 [home overview](https://github.com/home-assistant/frontend/tree/dev/src/panels/lovelace/strategies/home) dashboard 或 [energy dashboard](https://github.com/home-assistant/frontend/tree/dev/src/panels/lovelace/strategies/energy)。

或者，对于更简单的示例，可以是 [map dashboard strategy](https://github.com/home-assistant/frontend/blob/dev/src/panels/lovelace/strategies/map/map-dashboard-strategy.ts)，它导入了 map view strategy。而这反过来使用了 panel view 类型，该类型使用单个 map card。

#### Basic 示例

本示例可复制到 JavaScript 文件中并作为 module resource 加载。它包含了 strategy 注册以及在新的 dashboard 对话框中显示它所需的 metadata。

这是一个好的起点，但我们推荐使用 Lit 的 [ReactiveElement](https://lit.dev/docs/framework/concepts/reactive-element/) 代替 HTMLElement，并使用 TypeScript 或 JSDoc 进行类型标注。完整代码示例请参见 [frontend repo](https://github.com/home-assistant/frontend/tree/dev/src/panels/lovelace/strategies)。

```js
class MyDemoDashboardStrategy extends HTMLElement {
  static getCreateSuggestions(_hass) {
    return {
      title: "My demo dashboard",
      icon: "mdi:view-dashboard",
    };
  }

  static async generate(config, hass) {
    const title = config.title || "My demo dashboard";
    const locationName = hass.config.location_name || "Home Assistant";

    return {
      title,
      views: [
        {
          title: "Home",
          path: "home",
          cards: [
            {
              type: "markdown",
              content:
                `# ${locationName}\n\n` +
                "本 dashboard 由一个社区 dashboard strategy 生成。",
            },
            {
              type: "entities",
              entities: ["sun.sun"],
            },
          ],
        },
      ],
    };
  }
}

customElements.define("ll-strategy-dashboard-my-demo", MyDemoDashboardStrategy);

window.customStrategies = window.customStrategies || [];
window.customStrategies.push({
  type: "my-demo",
  strategyType: "dashboard",
  name: "My demo dashboard",
  description: "A small starter dashboard generated from JavaScript.",
  documentationURL:
    "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-strategy",
});
```

使用以下 dashboard 配置来使用此 strategy：

```yaml
strategy:
  type: custom:my-demo
```

## 图形配置

你的 strategy 可以定义一个静态 `getConfigElement` 方法，返回一个用于编辑 strategy 配置的 custom element。Home Assistant 将把这个 element 显示在 dashboard 设置对话框中。

如果你的 strategy 需要配置才能工作，将 `configRequired` 设为 `true`。这样可以防止 Home Assistant 在首先显示配置编辑器之前就创建使用该 strategy 的 dashboard。

如果你的 strategy 不支持图形化配置，将 `noEditor` 设为 `true`。

```js
class MyDemoDashboardStrategy extends HTMLElement {

  static getConfigElement() {
    return document.createElement("my-demo-strategy-editor");
  }

  static configRequired = true;

  static async generate(config, hass) {
    return {
      views: [
        {
          cards: [
            {
              type: "iframe",
              url: config.url,
            },
          ],
        },
      ],
    };
  }

}

customElements.define("ll-strategy-dashboard-my-demo", MyDemoDashboardStrategy);
```

```js
class MyDemoStrategyEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
  }

  set hass(hass) {
    this._hass = hass;
  }

  configChanged(newConfig) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: true,
        composed: true,
        detail: { config: newConfig },
      })
    );
  }
}

customElements.define("my-demo-strategy-editor", MyDemoStrategyEditor);
```

Home Assistant 将在设置时调用 config element 的 `setConfig` 方法。状态变更时会更新 `hass` 属性。配置的变更通过派发一个 `config-changed` 事件传回，新配置包含在其 detail 中。

## 视图

view strategy 生成特定 dashboard view 的配置。如果需要，它们可以在 dashboard strategies 中复用，就像 custom cards 可以在 view strategies 中使用一样。

> 本节讨论的是 view strategies。如果你想构建自定义 view 布局 element，请参见 [custom views](/developers/frontend/custom-ui/custom-view.md)。

使用以下 dashboard 配置来使用此 strategy：

```yaml
views:
  - strategy:
      type: custom:my-demo
      title: Generated view
```

## Full strategy 示例

通常好的做法是让 dashboard strategy 创建 views 列表，然后让 view strategy 为每个 view 生成 cards。这样可以让首次 dashboard 加载量更小，并让 Home Assistant 仅在打开某个 view 时才构建它。

下面的示例为每个 area 创建一个 view。每个生成的 view 都会以 grid 显示该 area 的 entities。

```js
class MyAreaDashboardStrategy extends HTMLElement {
  static getCreateSuggestions(_hass) {
    return {
      title: "Area dashboard",
      icon: "mdi:floor-plan",
    };
  }

  static async generate(config, hass) {
    // 查询所需的所有数据。我们将通过将其存储在 strategy options 中使其对 views 可用。
    const [areas, devices, entities] = await Promise.all([
      hass.callWS({ type: "config/area_registry/list" }),
      hass.callWS({ type: "config/device_registry/list" }),
      hass.callWS({ type: "config/entity_registry/list" }),
    ]);

    return {
      title: config.title || "Area dashboard",
      views: areas.map((area) => ({
        title: area.name,
        path: area.area_id,
        strategy: {
          type: "custom:my-area-dashboard",
          area: area,
          devices: devices,
          entities: entities,
        },
      })),
    };
  }
}

class MyAreaViewStrategy extends HTMLElement {
  static async generate(config, hass) {
    const areaDevices = new Set();

    // 找出此 area 中的所有 devices。
    for (const device of config.devices) {
      if (device.area_id === config.area.area_id) {
        areaDevices.add(device.id);
      }
    }

    const cards = [];

    // 找出此 area 中或属于此 area 中某个 device 的所有 entities。
    for (const entity of config.entities) {
      if (
        entity.area_id === config.area.area_id ||
        (!entity.area_id && areaDevices.has(entity.device_id))
      ) {
        cards.push({
          type: "button",
          entity: entity.entity_id,
        });
      }
    }

    return {
      cards: [
        {
          type: "grid",
          cards,
        },
      ],
    };
  }
}

customElements.define(
  "ll-strategy-dashboard-my-area-dashboard",
  MyAreaDashboardStrategy,
);

customElements.define(
  "ll-strategy-view-my-area-dashboard",
  MyAreaViewStrategy,
);

window.customStrategies = window.customStrategies || [];
window.customStrategies.push({
  type: "my-area-dashboard",
  strategyType: "dashboard",
  name: "Area dashboard",
  description: "Build one view per area from the Home Assistant registries.",
  documentationURL:
    "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-strategy",
});
```

使用以下 dashboard 配置来使用此 strategy：

```yaml
strategy:
  type: custom:my-area-dashboard
```
