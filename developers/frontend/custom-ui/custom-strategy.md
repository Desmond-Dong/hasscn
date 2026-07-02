# 自定义策略

*于 Home Assistant 2021.5 引入。*

Strategies 是用于生成 dashboard 配置的 JavaScript 函数。当用户尚未创建 dashboard 配置时，会显示一个自动生成的 dashboard。该配置由内置 strategy 生成。

开发者也可以创建自己的 strategies 来生成 dashboards。Strategies 可以使用 Home Assistant 的所有数据以及用户的 dashboard 配置来生成新的内容。

Strategy 可以应用于整个配置，也可以应用于特定视图。

Strategies 在 JavaScript 文件中定义为 custom element，并通过[dashboard resources](/developers/frontend/custom-ui/registering-resources.md)引入。Home Assistant 不会将其渲染为 custom element，而是会调用类上的静态函数。

## Dashboard 策略

Dashboard strategy 负责生成完整的 dashboard 配置。它既可以从零开始生成，也可以基于传入的现有 dashboard 配置生成。

会向 strategy 传入两个参数：

| Key | Description
| -- | --
| `config` | Dashboard strategy 配置。
| `hass` | Home Assistant 对象。

```ts
class StrategyDemo {
  static async generate(config, hass) {
    return {
      title: "Generated Dashboard",
      views: [
        {
          "cards": [
            {
              "type": "markdown",
              "content": `Generated at ${(new Date).toLocaleString()}`
            }
          ]
        }
      ]
    };
  }
}

customElements.define("ll-strategy-my-demo", StrategyDemo);
```

使用以下 dashboard 配置来使用这个 strategy：

```yaml
strategy:
  type: custom:my-demo
```

## View 策略

View strategy 负责生成特定 dashboard 视图的配置。该 strategy 会在用户打开该特定视图时被调用。

会向 strategy 传入两个参数：

| Key | Description
| -- | --
| `config` | View strategy 配置。
| `hass` | Home Assistant 对象。

```ts
class StrategyDemo {
  static async generate(config, hass) {
    return {
      "cards": [
        {
          "type": "markdown",
          "content": `Generated at ${(new Date).toLocaleString()}`
        }
      ]
    };
  }
}

customElements.define("ll-strategy-my-demo", StrategyDemo);
```

使用以下 dashboard 配置来使用这个 strategy：

```yaml
views:
- strategy:
    type: custom:my-demo
```

## 完整示例

建议 dashboard strategy 将尽可能多的工作交给 view strategies。这样 dashboard 就能尽快显示给用户。这可以通过让 dashboard 生成一个依赖其自身 strategy 的 views 配置来实现。

下面的示例会为每个 area 创建一个视图，并在每个视图中以网格形式显示该 area 内的所有 entities。

```ts
class StrategyDashboardDemo {
  static async generate(config, hass) {
    // Query all data we need. We will make it available to views by storing it in strategy options.
    const [areas, devices, entities] = await Promise.all([
      hass.callWS({ type: "config/area_registry/list" }),
      hass.callWS({ type: "config/device_registry/list" }),
      hass.callWS({ type: "config/entity_registry/list" }),
    ]);

    // Each view is based on a strategy so we delay rendering until it's opened
    return {
      views: areas.map((area) => ({
        strategy: {
          type: "custom:my-demo",
          area, 
          devices, 
          entities,
        },
        title: area.name,
        path: area.area_id,
      })),
    };
  }
}

class StrategyViewDemo {
  static async generate(config, hass) {
    const { area, devices, entities } = config;

    const areaDevices = new Set();

    // Find all devices linked to this area
    for (const device of devices) {
      if (device.area_id === area.area_id) {
        areaDevices.add(device.id);
      }
    }

    const cards = [];

    // Find all entities directly linked to this area
    // or linked to a device linked to this area.
    for (const entity of entities) {
      if (
        entity.area_id
          ? entity.area_id === area.area_id
          : areaDevices.has(entity.device_id)
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

customElements.define("ll-strategy-dashboard-my-demo", StrategyDashboardDemo);
customElements.define("ll-strategy-view-my-demo", StrategyViewDemo);
```

使用以下 dashboard 配置来使用这个 strategy：

```yaml
strategy:
  type: custom:my-demo
```
