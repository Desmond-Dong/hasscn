# 前端数据

前端会传递同一个 `hass` 对象。这个对象包含最新状态，允许你向服务器发送命令，并提供用于格式化实体状态的辅助方法。

每当状态发生变化时，所有发生变化的对象都会创建一个新版本。因此你可以通过严格相等判断轻松看出某个东西是否变了：

```js
const changed = newVal !== oldVal;
```

为了查看 `hass` 对象中可用的数据，请在你喜欢的浏览器中访问 HomeAssistant 前端并打开浏览器开发者工具。在元素面板中，选中 `<home-assistant>` 元素，或任何带有 `hass` 属性的其他元素，然后在控制台面板中运行以下命令：

```js
$0.hass
```

这种读取 `hass` 对象的方式应仅作为参考。为了在代码中与 `hass` 交互，请确保它已正确传递到你的代码中。

## 数据

### `hass.states`

一个包含 Home Assistant 中所有实体状态的对象。key 是 entity\_id，value 是状态对象。

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

所有以 `call` 开头的方法都是异步方法。这意味着它们会返回一个 `Promise`，并在调用结果可用时 resolve。

### `hass.callService(domain, service, data)`

调用后端中的服务操作。

```js
hass.callService('light', 'turn_on', {
  entity_id: 'light.kitchen'
});
```

### `hass.callWS(message)`

调用后端的 WebSocket 命令。

```js
this.hass.callWS({
  type: 'config/auth/create',
  name: 'Paulus',
}).then(userResponse =>
  console.log("Created user", userResponse.user.id));
```

### `hass.callApi(method, path, data)`

调用 Home Assistant 服务器上的 API。例如，如果你想通过向 `/api/hassio/backups` 发起 GET 请求来获取所有 Home Assistant 备份：

```js
hass.callApi('get', 'hassio/backups')
  .then(backups => console.log('Received backups!', backups));
```

如果你需要传入数据，请传第三个参数：

```js
hass.callApi('delete', 'notify.html5', { subscription: 'abcdefgh' });
```

:::info
我们正在逐步减少 API 调用，并将所有内容迁移到 `hass.callWS(message)` 调用。
:::

## 实体状态格式化

这些方法允许你格式化实体的状态和属性。值会根据用户资料设置（语言、数字格式、日期格式、时区）以及计量单位进行本地化。

### `hass.formatEntityState(stateObj, state)`

格式化实体状态。你需要传入实体状态对象。

```js
hass.formatEntityState(hass.states["light.my_light"]); // "On"
```

你可以使用第二个可选参数强制指定状态值。

```js
hass.formatEntityState(hass.states["light.my_light"], 'off'); // "Off"
```

### `hass.formatEntityAttributeValue(stateObj, attribute, value)`

格式化实体的属性值。你需要传入实体状态对象和属性名称。

```js
hass.formatEntityAttributeValue(hass.states["climate.thermostat"], "current_temperature"); // "20.5 °C"
```

你可以使用第三个可选参数强制指定状态值。

```js
hass.formatEntityAttributeValue(hass.states["climate.thermostat"], "current_temperature", 18); // "18 °C"
```

### `hass.formatEntityAttributeName(stateObj, attribute)`

格式化实体的属性名称。你需要传入实体状态对象和属性名称。

```js
hass.formatEntityAttributeName(hass.states["climate.thermostat"], "current_temperature"); // "Current temperature"
```
