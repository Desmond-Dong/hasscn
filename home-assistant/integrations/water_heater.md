# Water heater

**Water heater** 集成用于控制和监控热水器。

要启用此集成，请选择一个平台，并将其添加到 `configuration.yaml` 中：

```yaml
# Example configuration.yaml entry
water_heater:
  platform: demo
```

:::warning
热水器自动化配置错误可能会使水温降到 25°C 至 45°C（77°F 至 113°F）之间，这一温度范围会促进军团菌生长。这可能带来严重的健康风险，包括因军团病导致死亡。为确保细菌安全，请将水温保持在 ≥ 60°C（140°F）。

:::

## 热水器实体的状态

热水器实体可以具有以下状态：

* **Eco**：节能模式，兼顾节能和快速加热。
* **Electric**：纯电模式。此模式耗能最高。
* **Performance**：高性能模式。
* **High demand**：在热水器容量偏小时满足高需求。
* **Heat pump**：热泵模式加热最慢，但能耗更低。
* **Gas**：纯燃气模式。此模式耗能最高。
* **Off**：热水器已关闭。
* **Unavailable**：实体当前不可用。
* **Unknown**：状态尚未知晓。

## 操作

### 热水器控制操作

可用操作：`water_heater.set_temperature`、`water_heater.turn_away_mode_on`、`water_heater.turn_away_mode_off`、`water_heater.set_operation_mode`、`water_heater.turn_on`、`water_heater.turn_off`

:::tip
并非所有热水器操作都适用于你的平台。请前往 [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_services/) 查看 Home Assistant 已启用的可用操作。

:::

### 操作：设置温度

`water_heater.set_temperature` 操作用于设置热水器设备的目标温度。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的热水器设备 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可定位全部设备。 |
| `temperature` | no | 热水器的新目标温度 |
| `operation_mode` | yes | 要设置温度的运行模式。如果未设置或设置错误，默认使用 `current_operation` 模式。有关可用模式列表，请参阅对应集成文档。 |

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: water_heater.set_temperature
      target:
        entity_id: water_heater.demo
      data:
        temperature: 24
        operation_mode: eco
```

### 操作：设置运行模式

`water_heater.set_operation_mode` 操作用于设置热水器设备的运行模式。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的热水器设备 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可定位全部设备。 |
| `operation_mode` | no | 新的运行模式值。有关可用模式列表，请参阅对应集成文档。 |

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: water_heater.set_operation_mode
      target:
        entity_id: water_heater.demo
      data:
        operation_mode: eco
```

### 操作：设置离家模式

`water_heater.set_away_mode` 操作用于为热水器设备开启或关闭离家模式。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 指向要控制的热水器设备 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可定位全部设备。 |
| `away_mode` | no | 离家模式的新值。`on`/`off` 或 `true`/`false` |

#### 自动化示例

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: water_heater.set_away_mode
      target:
        entity_id: water_heater.demo
      data:
        away_mode: true
```

### 操作：开启

`water_heater.turn_on` 操作用于开启热水器设备。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 用于指定要控制的热水器设备实体 ID 的字符串或字符串列表。要定位所有热水器设备，请使用 `all`。 |

### 操作：关闭

`water_heater.turn_off` 操作用于关闭热水器设备。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | 用于指定要控制的热水器设备实体 ID 的字符串或字符串列表。要定位所有热水器设备，请使用 `all`。 |
