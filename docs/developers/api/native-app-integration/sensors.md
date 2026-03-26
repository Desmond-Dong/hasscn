---
title: "传感器"
---

`mobile_app` 集成支持暴露自定义传感器，并且这些传感器可以完全由你的应用管理。

## 注册传感器

所有传感器都必须先注册，之后才能更新。与批量更新不同，注册时一次只能注册一个传感器。

要注册传感器，请向 webhook 发送如下请求：

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

有效键如下：

| 键 | 类型 | 必填 | 说明                                                                                                                                                                                                     |
|---------------------|-------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| attributes | object | 否 | 要附加到传感器上的 attributes。                                                                                                                                                                              |
| device_class | string | 否 | 有效的 device class 之一。参见 [Binary Sensor Classes](https://www.home-assistant.io/integrations/binary_sensor/#device-class)、[Sensor Classes](https://www.home-assistant.io/integrations/sensor/#device-class)。 |
| icon | Material Design Icon (string) | 否 | 必须以 `mdi:` 为前缀；未提供时默认值为 `mdi:cellphone`。                                                                                                                                      |
| name | string | 是 | 传感器名称。                                                                                                                                                                                          |
| state | bool, float, int, string | 是 | 传感器状态。                                                                                                                                                                                         |
| type | string | 是 | 传感器类型，必须是 `binary_sensor` 或 `sensor` 之一。                                                                                                                                              |
| unique_id | string | 是 | 当前应用安装实例内唯一的标识符，后续会用到。通常建议使用传感器名称的安全版本。                                                                          |
| unit_of_measurement | string | 否 | 传感器的计量单位。                                                                                                                                                                          |
| state_class | string | 否 | 实体的 [state class](/developers/core/entity/sensor)（仅适用于 sensors）。
| entity_category | string | 否 | 实体的 entity category。
| disabled | boolean | 否 | 实体应启用还是禁用。

传感器在注册后会立即出现。

## 更新传感器

传感器注册完成后，就需要对其进行更新。更新方式与注册非常类似，但你可以一次更新所有传感器。

例如，要更新上面注册的那个传感器，可以发送以下内容：

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

更新时只允许使用其中部分键：

| 键 | 类型 | 必填 | 说明                                                                                                                           |
|---------------------|-------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| attributes | object | 否 | 要附加到传感器上的 attributes。                                                                                                    |
| icon                | Material Design Icon (string) | No       | Must be prefixed `mdi:`                                                                                                               |
| state | bool, float, int, string | 是 | 传感器状态。                                                                                                               |
| type | string | 是 | 传感器类型，必须是 `binary_sensor` 或 `sensor` 之一。                                                                    |
| unique_id | string | 是 | 当前应用安装实例内唯一的标识符，后续会用到。通常建议使用传感器名称的安全版本。 |

更新传感器后的响应是一个字典，格式为 `unique_id => 更新结果`。

如果实体在 Home Assistant 内部已被禁用，那么成功更新的结果中会额外包含 `is_disabled` 键。这意味着应用可以停止向该传感器发送更新。

如果更新失败，则会返回错误信息。

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

## 保持传感器与 Home Assistant 同步

用户可以在 Home Assistant 中启用或禁用实体。即使集成提供了某个实体，只要它被禁用，就不会被加入 Home Assistant。因此，手机继续向这些未启用的实体发送数据就没有意义。

**当应用内启用或禁用某个传感器时**，应用应为该传感器发送一个 `register_sensor` webhook，并把 `disabled` 设为 `true` 或 `false`。

**当移动应用通过 `update_sensor_states` webhook 更新一个已被禁用实体的数据时**，更新结果会包含值为 `true` 的 `is_disabled` 键。这表示移动应用需要把 Home Assistant 中的启用状态同步回应用。

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

**当用户在 Home Assistant 中启用或禁用某个实体时，也需要把这一状态同步到移动应用。** `get_config` webhook 响应中包含 `entities` 键，它是一个把 `unique_id` 映射到 `{"disabled": boolean}` 的字典。移动应用应采用这些启用设置。

```json5
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
