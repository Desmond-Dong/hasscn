# Traccar Server

Traccar 使用 GPS 进行追踪，并支持 1500 多种不同类型的设备。你可以使用 Traccar Server 集成与自己的 [Traccar Server](https://www.traccar.org/server/) 通信，它也提供为 [Home Assistant 插件](https://my.home-assistant.io/redirect/supervisor_addon/?addon=a0d7b954_traccar)。

:::tip
如果你想查看如何在 Home Assistant 中使用 webhook 设置 Traccar Client，请参阅 [Traccar Client](/home-assistant/integrations/traccar/index.md) 集成文档。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 事件

Traccar Server 集成的选项允许你定义想要监听的事件列表。这些事件会作为 [events](/home-assistant/docs/configuration/events/index.md) 发送到 Home Assistant。

所有事件都会以 `traccar_` 作为前缀，后面跟上事件名称的 snake\_case 形式。
例如：

* `deviceMoving` 会在 Home Assistant 中触发为 `traccar_device_moving`。
* `geofenceExit` 会在 Home Assistant 中触发为 `traccar_geofence_exit`。
* `alarm` 会在 Home Assistant 中触发为 `traccar_alarm`。

所有事件还会包含以下数据：

```yaml
Device ID:
  description: (`device_traccar_id`) This will be the device ID that the event is related to.
Device name:
  description: (`device_name`) This will be the name of the device that the event is related to.
Type:
  description: (`type`) This will be the type of the event.
Server time:
  description: (`serverTime`) This will be the time the event was received by the Traccar Server.
Attributes:
  description: (`attributes`) This will be a dictionary of attributes related to the event.
```

<details>
<summary>示例</summary>

```json
{
    "device_traccar_id": 24,
    "device_name": "My Device",
    "type": "alarm",
    "serverTime": "1970-01-01T00:00:00.000Z",
    "attributes": {
      "custom_attribute": "value"
    },
}
```

</details>

## 设备

Traccar Server 集成会为 Traccar Server 中已注册且至少有一次位置更新的每台设备创建对应设备。

这些设备在 Home Assistant 中会关联相应的[实体](#entities)，你可以在[自动化](/home-assistant/docs/automation.md)、[脚本](/home-assistant/docs/scripts.md)中使用它们，也可以将其显示在[仪表板](/home-assistant/dashboards.md)上。

## 实体

Traccar Server 集成会创建以下域中的实体：

* [Binary Sensor](/home-assistant/integrations/binary_sensor.md)
* [Device Tracker](/home-assistant/integrations/device_tracker.md)
* [Sensor](/home-assistant/integrations/sensor.md)

更多细节请参阅下方各节。

### 二进制传感器 - 移动状态

Traccar Server 集成会为 Traccar Server 中注册的每台设备创建一个 [binary\_sensor](/home-assistant/integrations/binary_sensor.md) 实体，用于显示 Traccar Server 上报的运动状态。

该实体默认处于禁用状态。

```yaml
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server, followed by the term "Motion". If your device is named "Millennium Falcon", this will be "Millennium Falcon Motion".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `position_attributes_motion`.
State:
  description: This will be `Moving` if the Traccar Server reports that the device is moving, if not this will be `Stopped`.
```

该实体没有任何属性。

### 二进制传感器 - 在线状态

Traccar Server 集成会为 Traccar Server 中注册的每台设备创建一个 [binary\_sensor](/home-assistant/integrations/binary_sensor.md) 实体，用于显示 Traccar Server 上报的在线状态。

该实体默认处于禁用状态。

```yaml
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by the term "Status". If your device is named "Millennium Falcon", this will be "Millennium Falcon Status".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `device_status`.
State:
  description: This will be `Online` if the Traccar Server reports that the device is online. This will be `Offline` if it reports it being offline, or `Unknown` if it is not sure.
```

该实体没有任何属性。

### 设备追踪器

Traccar Server 集成会为 Traccar Server 中注册的每台设备创建一个 [device tracker](/home-assistant/integrations/device_tracker.md) 实体。

```yaml
Name:
  description: The name of the device tracker will be set to what you have named it in Traccar Server.
Entity ID:
  description: This will be a slugified version of the name of the device tracker.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server.
State:
  description: As a device tracker, the state will be `home` or `not_home`.
```

<details>
<summary>属性</summary>

除了你在 Traccar Server 集成选项中定义的自定义属性外，device tracker 实体还会包含以下属性：

```yaml
Category:
  description: The category of the device in Traccar if defined.
Traccar ID:
  description: The ID of the device in Traccar.
Tracker:
  description: Just a string that says `traccar_server`.
```

</details>

### 传感器 - 地址

Traccar Server 集成会为 Traccar Server 中注册的每台设备创建一个 [sensor](/home-assistant/integrations/sensor.md) 实体，用于显示 Traccar Server 上报的地址。

该实体默认处于禁用状态。

```yaml
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by Address. If your device is named "Millennium Falcon", this will be "Millennium Falcon Address".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `position_address`.
State:
  description: This will be the address reported by the Traccar Server, if geo detection is not configured this will be unknown`.
```

该实体没有任何属性。

### 传感器 - 海拔

Traccar Server 集成会为 Traccar Server 中注册的每台设备创建一个 [sensor](/home-assistant/integrations/sensor.md) 实体，用于显示 Traccar Server 上报的海拔。

该实体默认处于禁用状态。

```yaml
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by Altitude. If your device is named "Millennium Falcon", this will be "Millennium Falcon Altitude".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `position_altitude`.
State:
  description: This will be the altitude in meters. You can select a different unit in the entity options if you want.
```

该实体没有任何属性。

### 传感器 - 电池

Traccar Server 集成会为 Traccar Server 中注册的每台设备创建一个 [sensor](/home-assistant/integrations/sensor.md) 实体，用于显示 Traccar Server 上报的剩余电池百分比。

该实体默认处于禁用状态。

```yaml
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by Battery. If your device is named "Millennium Falcon", this will be "Millennium Falcon Battery".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `position_attributes.batteryLevel`.
State:
  description: This will be the battery percentage (level) as reported by the tracked device, if the device does not have a battery this will be unknown.
```

该实体没有任何属性。

### 传感器 - 地理围栏

Traccar Server 集成会为 Traccar Server 中注册的每台设备创建一个 [sensor](/home-assistant/integrations/sensor.md) 实体，用于显示 Traccar Server 上报的地理围栏。

该实体默认处于禁用状态。

```yaml
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by Geofence. If your device is named "Millennium Falcon", this will be "Millennium Falcon Geofence".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `geofence_geofence`.
State:
  description: This will be geofence that the device is in, if you have overlapping geofences it will show the first one as reported by the Traccar Server.
```

该实体没有任何属性。

### 传感器 - 速度

Traccar Server 集成会为 Traccar Server 中注册的每台设备创建一个 [sensor](/home-assistant/integrations/sensor.md) 实体，用于显示 Traccar Server 上报的速度。

该实体默认处于禁用状态。

```yaml
Name:
  description: The name of the sensor will be set to what you have named it in Traccar Server followed by Speed. If your device is named "Millennium Falcon", this will be "Millennium Falcon Speed".
Entity ID:
  description: This will be a slugified version of the name.
Unique ID:
  description: This will be the unique ID of the device tracker in Traccar Server followed by `position_speed`.
State:
  description: This will be the speed of the device in knots. You can select a different unit in the entity options if you want.
```

该实体没有任何属性。

## 示例

所以，你已经设置好了集成，并且所有设备也都已同步进来。接下来能做什么？下面给出一些示例，展示如何利用 Traccar Server 集成提供的数据。

### 自动化示例

本节提供一些自动化示例，帮助你快速开始使用 Traccar Server 集成。

#### 设备进入地理围栏时执行操作

这个示例可让你在设备“Millennium Falcon”进入指定地理围栏时执行某些操作。

[![Open Import blueprint in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fwww.home-assistant.io%2Fblueprints%2Fintegrations%2Ftraccar_server_device_enter_geofence.yaml)

<details>
<summary>查看 YAML</summary>

```yaml
triggers:
  - trigger: state
    entity_id: sensor.millennium_falcon_geofence
    to: 'Tatooine'
actions:
  ...
```

</details>

#### 设备超速时执行操作

这个示例可让你在设备“Millennium Falcon”超过设定速度时执行某些操作。

[![Open Import blueprint in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fwww.home-assistant.io%2Fblueprints%2Fintegrations%2Ftraccar_server_device_speed_limit.yaml)

<details>
<summary>查看 YAML</summary>

```yaml
triggers:
  - trigger: numeric_state
    entity_id: sensor.millennium_falcon_speed
    above: 1337
actions:
  ...
```

如果你想在通知中包含速度，可以使用 `{{ trigger.to_state.state }}` 模板。

部分示例：

```yaml
triggers:
  ...
actions:
  - action: notify.notify
    data:
      message: "The current speed of the Millennium falcon is {{ trigger.to_state.state }}!"
```

</details>
