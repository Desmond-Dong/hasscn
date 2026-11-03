# Input number

**Input number** 集成允许您定义可通过前端控制的数值，并可在自动化条件中使用。前端可以显示滑块或数字输入框。对滑块或数字输入框的修改会生成状态事件，这些状态事件同样可用作 `automation` 触发器。

配置输入数字的首选方式是通过用户界面：前往 **[Settings > Devices & services > Helpers](https://my.home-assistant.io/redirect/helpers/)**。选择添加按钮，然后选择 **[Number](https://my.home-assistant.io/redirect/config_flow_start/?domain=input_number)** 选项。

要通过用户界面添加 **Helpers**，您的 "`configuration.yaml`" 中应包含 `default_config:`。除非您手动删除，否则默认情况下它已经存在。
如果您已从配置中移除了 `default_config:`，则必须先将 `input_number:` 添加到您的 `configuration.yaml` 中，然后才能使用 UI。

输入数字也可以通过 "`configuration.yaml`" 配置：

```yaml
# configuration.yaml 示例条目
input_number:
  slider1:
    name: Slider
    initial: 30
    min: -20
    max: 35
    step: 1
  box1:
    name: Numeric Input Box
    initial: 30
    min: -20
    max: 35
    step: 1
    mode: box
```

```yaml
  input_number:
    description: 输入的别名。允许多个条目。
    required: true
    type: map
    keys:
      min:
        description: 最小值。
        required: true
        type: float
      max:
        description: 最大值。
        required: true
        type: float
      name:
        description: 输入的友好名称。
        required: false
        type: string
      initial:
        description: Home Assistant 启动时的初始值。
        required: false
        type: float
        default: 关闭时的值
      step:
        description: 步进值。最小值为 `0.001`。
        required: false
        type: float
        default: 1
      mode:
        description: 可指定为 `box` 或 `slider`。
        required: false
        type: string
        default: slider
      unit_of_measurement:
        description: 滑块值所表示的计量单位。
        required: false
        type: string
      icon:
        description: 在前端输入元素前显示的图标。
        required: false
        type: icon
```

### 操作

此集成提供以下操作以修改 `input_number` 的状态，并提供一个可在不重启 Home Assistant 本体的情况下重新加载配置的操作。

| Service     | Data                                      | Description                                                       |
| ----------- | ----------------------------------------- | ----------------------------------------------------------------- |
| `decrement` | `entity_id(s)`<br>`area_id(s)`            | 将特定 `input_number` 实体的值按 `step` 减少                     |
| `increment` | `entity_id(s)`<br>`area_id(s)`            | 将特定 `input_number` 实体的值按 `step` 增加                     |
| `reload`    |                                           | 重新加载 `input_number` 配置                                     |
| `set_value` | `value`<br>`entity_id(s)`<br>`area_id(s)` | 设置特定 `input_number` 实体的值                                 |

### 恢复状态

如果您为 `initial` 设置了有效值，此集成启动时会使用该值作为状态。否则，它会恢复 Home Assistant 停止前的状态。请注意，`initial` 仅适用于 YAML 配置，而不适用于 Home Assistant 用户界面。

### 场景

要在 [Scene](/home-assistant/integrations/scene/index.md) 中设置 input\_number 的值：

```yaml
# configuration.yaml 示例条目
scene:
  - name: Example Scene
    entities:
      input_number.example_number: 13
```

## 自动化示例

下面是一个在自动化中将 `input_number` 用作触发器的示例。

```yaml
# 在自动化中将 `input_number` 用作触发器的 configuration.yaml 示例条目
input_number:
  bedroom_brightness:
    name: Brightness
    initial: 254
    min: 0
    max: 254
    step: 1

automation:
  - alias: "Bedroom Light - Adjust Brightness"
    triggers:
      - trigger: state
        entity_id: input_number.bedroom_brightness
    actions:
      - action: light.turn_on
        target:
          entity_id: light.bedroom
        data:
          brightness: "{{ trigger.to_state.state | int }}"
```

下面是另一个使用 `input_number` 的代码示例，这次它用在自动化的操作中。

```yaml
# 在自动化操作中使用 `input_number` 的 configuration.yaml 示例条目
input_select:
  scene_bedroom:
    name: Scene
    options:
      - Select
      - Concentrate
      - Energize
      - Reading
      - Relax
      - 'OFF'
    initial: "Select"

input_number:
  bedroom_brightness:
    name: Brightness
    initial: 254
    min: 0
    max: 254
    step: 1

automation:
  - alias: "Bedroom Light - Custom"
    triggers:
      - trigger: state
        entity_id: input_select.scene_bedroom
        to: "CUSTOM"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.bedroom
        data:
          brightness: "{{ states('input_number.bedroom_brightness') | int }}"
```

下面展示了一个双向使用 `input_number` 的示例：它既可由 MQTT 自动化操作设置，也可反过来控制 MQTT。

```yaml
# 在自动化操作中使用 `input_number` 的 configuration.yaml 示例条目
input_number:
  target_temp:
    name: Target Heater Temperature Slider
    min: 1
    max: 30
    step: 1
    unit_of_measurement: step  
    icon: mdi:target

# 当通过 MQTT 保留主题 `setTemperature` 收到值时，此自动化脚本会运行
# 它会设置界面中的数值滑块。该滑块在值变化时也有自己的自动化。
automation:
  - alias: "Set temp slider"
    triggers:
      - trigger: mqtt
        topic: "setTemperature"
    actions:
      - action: input_number.set_value
        target:
          entity_id: input_number.target_temp
        data:
          value: "{{ trigger.payload }}"

# 当目标温度滑块被移动时，此第二个自动化脚本会运行。
# 它会将自己的值发布到同一个已订阅的 MQTT 主题。
  - alias: "Temp slider moved"
    triggers:
      - trigger: state
        entity_id: input_number.target_temp
    actions:
      - action: mqtt.publish
        data:
          topic: "setTemperature"
          retain: true
          payload: "{{ states('input_number.target_temp') | int }}"
```

下面是一个在自动化中将 `input_number` 用作延迟时间的示例。

```yaml
# 在自动化中将 `input_number` 用作延迟的 configuration.yaml 示例条目
input_number:
  minutes:
    name: minutes
    icon: mdi:clock-start
    initial: 3
    min: 0
    max: 6
    step: 1
    
  seconds:
    name: seconds
    icon: mdi:clock-start
    initial: 30
    min: 0
    max: 59
    step: 10
    
automation:
  - alias: "turn something off after x time after turning it on"
    triggers:
      - trigger: state
        entity_id: switch.something
        to: "on"
    actions:
      - delay: "00:{{ states('input_number.minutes') | int }}:{{ states('input_number.seconds') | int }}"
      - action: switch.turn_off
        target:
          entity_id: switch.something
```
