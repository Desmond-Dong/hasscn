---
title: "前端数据"
sidebar_label: "数据"
---

前端传递单个 `hass` 对象。此对象包含最新状态，允许你向后端发送命令，并提供用于格式化实体状态的辅助方法。

只需要这些数据中一部分的组件，应改为使用相关的 [context](#context)。

每当状态发生变化时，都会创建发生变化的对象的新版本。因此，你只需进行一次严格相等性检查，即可轻松判断某项内容是否发生了变化：

```js
const changed = newVal !== oldVal;
```

如需查看 `hass` 对象中可用的数据，请使用你喜欢的浏览器打开 Home Assistant 前端，然后打开浏览器的开发者工具。在 elements 面板中，选择 `<home-assistant>` 元素，或者任何带有 `hass` 属性的元素，然后在 console 面板中运行以下命令：

```js
$0.hass
```

读取 `hass` 对象的此方法仅应作为参考。要在代码中与 `hass` 交互，请确保它被正确地传递到你的代码中。

## 数据

### 上下文

组件获取 Home Assistant 特定部分数据的方式是消费可用的 Lit context 之一。你也可以创建本地 context，用于在组件树内传递数据。

使用 Lit 的 `@consume` 装饰器向 context provider 注册。provider 会发送初始值，当设置 `subscribe: true` 时，会在值发生变化时发送更新。

#### 可用的 contexts

contexts 从 `src/data/context/index.ts` 导出：

- `statesContext`：所有实体的 states
- `servicesContext`：可用的 service actions
- `registriesContext`：entity、device、area 和 floor registries
- `entitiesContext`、`devicesContext`、`areasContext` 和 `floorsContext`：单个 registry 数据
- `internationalizationContext`：本地化、locale 设置、translation metadata 和 translation loaders
- `apiContext`：HTTP 和 WebSocket API 方法
- `connectionContext`：WebSocket 连接状态
- `uiContext`：themes、panels、sidebar 设置以及其他全局 UI 状态
- `configContext`：Home Assistant 配置、认证和用户数据
- `formattersContext`：实体状态、属性和名称的格式化方法
- `narrowViewportContext`：主 viewport 是否使用窄布局

某些 contexts 仅在组件首次消费时加载。这些包括 `labelsContext`、`fullEntitiesContext`、`configEntriesContext`、`manifestsContext`、`triggerDescriptionsContext` 和 `conditionDescriptionsContext`。它们的后端订阅会在最后一个订阅组件断开后移除。

#### 在 Lit 中消费 context

```ts
@consume({ context: labelsContext, subscribe: true })
@state()
private _labels?: LabelRegistryEntry[];
```


### `hass.states`

一个包含 Home Assistant 中所有实体状态的对象。键为 entity_id，值为 state object。

```json
{
  "sun.sun": {
    "entity_id": "sun.sun",
    "state": "above_horizon",
    "attributes": {
      "next_dawn": "2018-08-18T05:39:19+00:00",
      "next_dusk": "2018-08-17T18:28:52+00:00",
      "next_midnight": "2018-08-18T00:03:51+00:00",
      "next_noon": "2018-08-18T12:03:58+00:00",
      "next_rising": "2018-08-18T06:00:33+00:00",
      "next_setting": "2018-08-17T18:07:37+00:00",
      "elevation": 60.74,
      "azimuth": 297.69,
      "friendly_name": "Sun"
    },
    "last_changed": "2018-08-17T13:46:59.083836+00:00",
    "last_updated": "2018-08-17T13:49:30.378101+00:00",
    "context": {
      "id": "74c2b3b429c844f18e59669e4b41ec6f",
      "user_id": null
    },
  },
  "light.ceiling_lights": {
    "entity_id": "light.ceiling_lights",
    "state": "on",
    "attributes": {
      "min_mireds": 153,
      "max_mireds": 500,
      "brightness": 180,
      "color_temp": 380,
      "hs_color": [
        56,
        86
      ],
      "rgb_color": [
        255,
        240,
        35
      ],
      "xy_color": [
        0.459,
        0.496
      ],
      "white_value": 200,
      "friendly_name": "Ceiling Lights",
      "supported_features": 151
    },
    "last_changed": "2018-08-17T13:46:59.129248+00:00",
    "last_updated": "2018-08-17T13:46:59.129248+00:00",
    "context": {
      "id": "2c6bbbbb66a84a9dae097b6ed6c93383",
      "user_id": null
    },
  }
}
```

### `hass.user`

当前登录的用户。

```json
{
  "id": "758186e6a1854ee2896efbd593cb542c",
  "name": "Paulus",
  "is_owner": true,
  "is_admin": true,
  "credentials": [
    {
      "auth_provider_type": "homeassistant",
      "auth_provider_id": null
    }
  ]
}
```

## 方法

所有以 `call` 开头的方法都是异步方法。这意味着它们将返回一个 `Promise`，该 Promise 会在调用结果产生时 resolve。

### `hass.callService(domain, service, data)`

在后端调用一个 service action。

```js
hass.callService('light', 'turn_on', {
  entity_id: 'light.kitchen'
});
```

### `hass.callWS(message)`

在后端调用一个 WebSocket 命令。

```js
this.hass.callWS({
  type: 'config/auth/create',
  name: 'Paulus',
}).then(userResponse =>
  console.log("Created user", userResponse.user.id));
```

### `hass.callApi(method, path, data)`

在 Home Assistant 服务器上调用 API。例如，如果你想通过向 `/api/hassio/backups` 发送 GET 请求来获取所有 Home Assistant 备份：

```js
hass.callApi('get', 'hassio/backups')
  .then(backups => console.log('Received backups!', backups));
```

如果需要传入数据，请传递第三个参数：

```js
hass.callApi('delete', 'notify.html5', { subscription: 'abcdefgh' });
```

:::info
我们正在逐步远离 API 调用，并将所有内容迁移到 `hass.callWS(message)` 调用。
:::

## 实体状态格式化

这些方法允许你对实体的状态和属性进行格式化。该值会根据用户个人档案设置（语言、数字格式、日期格式、时区）和计量单位进行本地化。

### `hass.formatEntityState(stateObj, state)`

格式化实体的状态。你需要传入 entity state object。

```js
hass.formatEntityState(hass.states["light.my_light"]); // "On"
```

你可以使用第二个可选参数强制指定状态值。

```js
hass.formatEntityState(hass.states["light.my_light"], 'off'); // "Off"
```

### `hass.formatEntityAttributeValue(stateObj, attribute, value)`

格式化实体的属性值。你需要传入 entity state object 和属性名。

```js
hass.formatEntityAttributeValue(hass.states["climate.thermostat"], "current_temperature"); // "20.5 °C"
```

你可以使用第三个可选参数强制指定状态值。

```js
hass.formatEntityAttributeValue(hass.states["climate.thermostat"], "current_temperature", 18); // "18 °C"
```

### `hass.formatEntityAttributeName(stateObj, attribute)`

格式化实体的属性名。你需要传入 entity state object 和属性名。

```js
hass.formatEntityAttributeName(hass.states["climate.thermostat"], "current_temperature"); // "Current temperature"
```

### `hass.formatEntityName(stateObj, name, options)`

_自 Home Assistant 2026.4 起可用。_

根据实体的 registry context（entity、device、area、floor）格式化实体的显示名称。这是内置卡片（tile、entity rows 等）所使用的同一辅助方法，因此自定义卡片可以生成一致的标签。

`name` 参数可以是：

- 一个普通的 `string` —— 按原样返回。用于尊重用户提供的自定义值。
- 单个名称项，例如 `{ type: "entity" }`。
- 名称项数组，通过分隔符连接。项可以引用 registry 数据（`entity`、`device`、`area`、`floor`），也可以是字面量 `text`。
- `undefined` —— 回退到实体的 friendly name。

```ts
type EntityNameItem =
  | { type: "entity" | "device" | "area" | "floor" }
  | { type: "text"; text: string };

interface EntityNameOptions {
  separator?: string; // 默认为 " "
}
```

以下示例假设 `sensor.living_room_thermostat_temperature` 是一个 thermostat device 的温度传感器，其中：

- entity name: `Temperature`
- device name: `Thermostat`
- area: `Living room`
- floor: `Ground floor`

```js
const stateObj = hass.states["sensor.living_room_thermostat_temperature"];

// Friendly name 回退
hass.formatEntityName(stateObj, undefined); // "Thermostat Temperature"

// 用户提供的自定义值
hass.formatEntityName(stateObj, "Indoor temperature"); // "Indoor temperature"

// 单个 registry 项
hass.formatEntityName(stateObj, { type: "entity" }); // "Temperature"
hass.formatEntityName(stateObj, { type: "area" }); // "Living room"

// 使用自定义分隔符的组合显示
hass.formatEntityName(
  stateObj,
  [{ type: "device" }, { type: "entity" }],
  { separator: " · " }
); // "Thermostat · Temperature"

// 混合使用字面文本和 registry 项
hass.formatEntityName(
  stateObj,
  [{ type: "text", text: "Floor:" }, { type: "floor" }]
); // "Floor: Ground floor"
```

#### 在自定义卡片中使用

一种常见模式是在卡片配置中接受 `name` 选项，并将其直接传递给 `formatEntityName`。这样用户既可以提供字符串，也可以使用结构化形式来组合 registry 数据。

```yaml
type: custom:my-card
entity: sensor.living_room_thermostat_temperature
name:
  - type: area
  - type: entity
```

在卡片类内部：

```js
setConfig(config) {
  if (!config.entity) {
    throw new Error("You need to define an entity");
  }
  this._config = config;
}

render() {
  const stateObj = this.hass.states[this._config.entity];
  const name = this.hass.formatEntityName(stateObj, this._config.name);
  return html`<div>${name}</div>`;
}
```

#### 在可视化编辑器中编辑

前端自带一个 `entity_name` selector，它生成的值符合 `formatEntityName` 所接受的格式。在使用 [内置表单编辑器](/developers/frontend/custom-ui/custom-card#using-the-built-in-form-editor) 的卡片中，通过 `context` 引用 entity 字段，这样 selector 就能知道针对哪个实体来解析 registry context：

```js
{
  name: "name",
  selector: {
    entity_name: {},
  },
  context: {
    entity: "entity",
  },
}
```

selector 生成的值与 `formatEntityName` 所接受的格式一致：要么是一个普通字符串（自由格式的自定义名称），要么是一个或多个 `EntityNameItem` 条目（由 registry 数据组合而成）。selector UI 允许用户在两种模式之间切换。

selector 接受两个选项：

- `entity_id`：硬编码用于预览名称的 entity（覆盖 `context.entity`）。
- `default_name`：字段为空时显示的值。接受与 `string | EntityNameItem | EntityNameItem[]` 相同的格式。
