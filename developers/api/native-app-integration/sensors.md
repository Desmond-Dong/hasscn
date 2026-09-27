`mobile_app` 集成支持暴露自定义 sensors，这些 sensors 可以通过你的应用完全管理。

## 注册 sensor

所有 sensors 在获得更新之前都必须先注册。与更新 sensors 不同，你一次只能注册一个 sensor。

要注册 sensor，请像这样向 webhook 发送请求：

```json
{
  "data": {
    "attributes": {
      "foo": "bar"
    },
    "device_class": "battery",
    "icon": "mdi:battery",
    "name": "Battery State",
    "state": "12345",
    "type": "sensor",
    "unique_id": "battery_state",
    "unit_of_measurement": "%",
    "state_class": "measurement",
    "entity_category": "diagnostic",
    "disabled": true
  },
  "type": "register_sensor"
}
```

有效的 key 如下：

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| attributes | object | No | 附加到 sensor 的 attributes |
| device\_class | string | No | 有效的 device classes 之一。[Binary Sensor Classes](https://www.home-assistant.io/integrations/binary_sensor/#device-class), [Sensor Classes](https://www.home-assistant.io/integrations/sensor/#device-class) |
| icon | Material Design Icon (string) | No | 必须以 `mdi:` 为前缀。如果未提供，默认值为 `mdi:cellphone` |
| name | string | Yes | sensor 的名称 |
| state | bool, float, int, string | Yes | sensor 的 state |
| type | string | Yes | sensor 的类型。必须是 `binary_sensor` 或 `sensor` 之一 |
| unique\_id | string | Yes | 对该应用的此安装唯一的标识符。你稍后会用到它。通常最好使用 sensor 名称的安全版本 |
| unit\_of\_measurement | string | No | sensor 的测量单位 |
| state\_class | string | No | entity 的[state class](/developers/core/entity/sensor.md#available-state-classes)（仅适用于 sensors） |
| entity\_category | string | No | entity 的 category |
| disabled | boolean | No | 该 entity 是否应启用或禁用。 |

Sensors 在注册后就会立即出现。

## 更新 sensor

一旦 sensor 已注册，你需要更新它。这与注册它非常相似，但你可以同时更新所有的 sensors。

例如，要更新上述注册的 sensor，你需要发送以下内容：

```json
{
  "data": [
    {
      "attributes": {
        "hello": "world"
      },
      "icon": "mdi:battery",
      "state": 123,
      "type": "sensor",
      "unique_id": "battery_state"
    }
  ],
  "type": "update_sensor_states"
}
```

更新期间仅允许部分 key：

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| attributes | object | No | 附加到 sensor 的 attributes |
| icon | Material Design Icon (string) | No | 必须以 `mdi:` 为前缀 |
| state | bool, float, int, string | Yes | sensor 的 state |
| type | string | Yes | sensor 的类型。必须是 `binary_sensor` 或 `sensor` 之一 |
| unique\_id | string | Yes | 对该应用的此安装唯一的标识符。你稍后会用到它。通常最好使用 sensor 名称的安全版本 |

更新 sensor 的响应是一个以 unique\_id => 更新结果为映射的字典。

如果 entity 在 Home Assistant 内部被禁用，成功的更新将添加 key `is_disabled`。这意味着应用可以停止向该 sensor 发送更新。

如果更新不成功，将返回错误。

```json
{
  "battery_state": {
    "success": true
  },
  "battery_level": {
    "success": true,
    "is_disabled": true
  },
  "battery_charging": {
    "success": false,
    "error": {
      "code": "not_registered",
      "message": "Entity is not registered",
    }
  },
  "battery_charging_state": {
    "success": false,
    "error": {
      "code": "invalid_format",
      "message": "Unexpected value for type",
    }
}
```

## 保持 sensors 与 Home Assistant 同步

用户可以在 Home Assistant 中启用和禁用 entities。禁用的 entity 不会被添加到 Home Assistant，即使集成提供了它。这意味着手机继续向未在 Home Assistant 中启用的 entities 发送数据是没有意义的。

**当 sensor 在应用中启用/禁用时**，应用应为此 sensor 发送 `register_sensor` webhook，并将 `disabled` 设置为 `true` 或 `false`。

**当 mobile app 发送 `update_sensor_states` webhook 以更新被禁用的 entity 的数据时**，更新结果将包含 key `is_disabled`，其值为 `true`。这是 mobile app 需要将 Home Assistant 中的启用状态同步到 mobile app 的指示器。

```json
{
  "battery_level": {
    "success": true,
  },
  "battery_charging": {
    "success": true,
    "is_disabled": true
  }
}
```

**当用户在 Home Assistant 中启用/禁用 entity 时，需要将其同步到 mobile app。** `get_config` webhook 响应包含 key `entities`。这是一个将 `unique_id` 映射到 `{"disabled": boolean}` 的字典。mobile app 应采用这些启用设置。

```json
{
  // ...
  "entities": {
    "battery_level": {
      "disabled": false
    },
    "battery_charging": {
      "disabled": true
    },
  }
}
```
