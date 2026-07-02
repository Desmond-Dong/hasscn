# MQTT climate (HVAC)

**MQTT 气候** 集成可以让您控制支持 MQTT 的 HVAC 设备。

## 配置

要在你的安装中使用MQTT气候，请先[将 MQTT 设备作为子条目添加](/home-assistant/integrations/mqtt/index.md#configuration)，或者将以下内容添加到“`configuration.yaml`”文件中。
:::tip
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt:
  - climate:
      name: Study
      mode_command_topic: "study/ac/mode/set"
```

或者，你也可以使用更高级的方式：通过 [MQTT discovery](/home-assistant/integrations/mqtt/index.md#mqtt-discovery) 进行设置。

```yaml
action_template:
  description: 用于提供`action_topic`上接收到的值的模板。
  required: false
  type: template
action_topic:
  description: >-
    用于订阅当前操作更改的 MQTT 主题。如果设置了此项，气候图将使用收到的值作为数据源。“无”有效负载会重置当前操作状态。空的有效负载将被忽略。
    有效操作值：`off`、`heating`、`cooling`、`drying`、`idle`、`fan`。
  required: false
  type: string
availability:
  description: 订阅接收可用性（在线/离线）更新的 MQTT 主题列表。不得与`availability_topic`一起使用。
  required: false
  type: list
  keys:
    payload_available:
      description: 表示可用状态的有效负载。
      required: false
      type: string
      default: online
    payload_not_available:
      description: 表示不可用状态的负载。
      required: false
      type: string
      default: offline
    topic:
      description: 订阅 MQTT 主题以接收可用性（在线/离线）更新。
      required: true
      type: string
    value_template:
      description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以从 `topic` 中获取设备的可用性。为了确定设备的可用性，此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
      required: false
      type: template
availability_mode:
  description: 配置`availability`时，其控制实体设置为`available`所需的条件。有效边界为`all`、`any`和`latest`。如果设置为`all`，则在将天线标记为在线，必须在所有配置的可用性主题上接收`payload_available`。 `any`，则在将实体标记为在线之前，必须至少在一个已配置的可用性主题上接收 `payload_available`。如果设置为 `latest`，则在任何配置的可用性主题上收到的最后一个 `payload_available` 或 `payload_not_available` 控制可用性。
  required: false
  type: string
  default: latest
availability_template:
  description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以从 `availability_topic` 中获取设备的可用性。为了确定设备的可用性，此模板的结果将与 `payload_available` 和 `payload_not_available` 进行比较。"
  required: false
  type: template
availability_topic:
  description: 订阅 MQTT 主题以接收可用性（在线/离线）更新。不得与`availability`一起使用。
  required: false
  type: string
current_humidity_template:
  description: 将传送在 `current_humidity_topic` 上接收到的值的模板。
  required: false
  type: template
current_humidity_topic:
  description: 用于监听当前湿度的 MQTT 主题。收到的 `"None"` 值将重置当前湿度。空值 (`'''`) 将被忽略。
  required: false
  type: string
current_temperature_template:
  description: 将传送在 `current_temperature_topic` 上接收到的值的模板。
  required: false
  type: template
current_temperature_topic:
  description: 用于侦听当前温度的 MQTT 主题。收到的 `"None"` 值将重置当前温度。空值 (`'''`) 将被忽略。
  required: false
  type: string
default_entity_id:
  description: 使用 `default_entity_id` 名称代替来自动生成实体 ID。例如，`climate.foobar`。当在没有 `unique_id` 的情况下使用时，如果实体 ID 可用，实体 ID 将在重新启动或重新加载期间更新。如果实体 ID 已存在，则将创建实体 ID，并在队列添加数字。与 `unique_id` 一起使用时，仅在首次添加实体时使用`default_entity_id`。设置后，如果实体被删除并再次添加，这将覆盖用户自定义的实体ID。
  required: false
  type: string
device:
  description: '有关该 HVAC 设备的信息足以将其绑定到 [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html) 的部分。只有当设置 [`unique_id`](#unique_id) 时才有效。必须至少有标识符或连接才能识别设备之一。'
  required: false
  type: map
  keys:
    configuration_url:
      description: '可管理此设备配置的网页链接。可以是 `http://`、`https://` 或内部 `homeassistant://` URL。'
      required: false
      type: string
    connections:
      description: '设备与后面的连接列表，作为元组列表`[connection_type, connection_identifier]`。例如网络接口的MAC地址：`"connections": [["mac", "02:5b:26:a8:dc:12"]]`。'
      required: false
      type: list
    hw_version:
      description: 设备的硬件版本。
      required: false
      type: string
    identifiers:
      description: ' 唯一标识设备的 ID 列表。例如序列号。'
      required: false
      type: [list, string]
    manufacturer:
      description: "设备的制造商。"
      required: false
      type: string
    model:
      description: "设备的型号。"
      required: false
      type: string
    model_id:
      description: 设备的型号标识符。
      required: false
      type: string
    name:
      description: "设备的名称。"
      required: false
      type: string
    serial_number:
      description: "设备的序列号。"
      required: false
      type: string
    suggested_area:
      description: "如果设备尚未位于某个区域，请建议一个区域。"
      required: false
      type: string
    sw_version:
      description: "设备的固件版本。"
      required: false
      type: string
    via_device:
      description: '在该设备和 Home Assistant 之间路由消息的设备的标识符。此类设备的示例是集线器或子设备的父设备。这用于在 Home Assistant 中显示设备拓扑。'
      required: false
      type: string
enabled_by_default:
  description: 定义首次添加时是否应启用实体的标志。
  required: false
  type: boolean
  default: true
encoding:
  description: 接收和发布消息的有效负载的编码。设置为 `""` 以禁用传入有效负载的解码。
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: 实体的[category](https://developers.home-assistant.io/docs/core/entity#generic-properties)。
  required: false
  type: string
entity_picture:
  description: "该实体的图片URL。"
  required: false
  type: string
fan_mode_command_template:
  description: 用于发送到 `fan_mode_command_topic` 的值的模板。
  required: false
  type: template
fan_mode_command_topic:
  description: MQTT 主题发布命令以更改风扇模式。
  required: false
  type: string
fan_mode_state_template:
  description: 用于提供`fan_mode_state_topic`上接收到的值的模板。
  required: false
  type: template
fan_mode_state_topic:
  description: 用于订阅 HVAC 风扇模式更改的 MQTT 主题。如果未设置，风扇模式将以乐观模式工作（见下文）。“无”有效负载会重置风扇模式状态。空的有效负载将被忽略。
  required: false
  type: string
fan_modes:
  description: 支持的风扇模式列表。
  required: false
  default: ['auto', 'low', 'medium', 'high']
  type: list
initial:
  description: 设置最终目标温度。默认值取决于温度单位，为 21° 或 69.8°F。
  required: false
  type: float
icon:
  description: "[Icon](/home-assistant/docs/configuration/customizing-devices/#icon)为实体。"
  required: false
  type: icon
json_attributes_template:
  description: "定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以从 `json_attributes_topic` 收到的消息中提取 JSON 字典。使用示例可以在 [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) 文档中找到。"
  required: false
  type: template
json_attributes_topic:
  description: 订阅 MQTT 主题以接收 JSON 字典有效负载，然后设置为传感器属性。使用示例可以在 [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) 文档中找到。
  required: false
  type: string
max_humidity:
  description: 可设置的最大目标湿度百分比。
  required: false
  type: float
  default: 99
max_temp:
  description: 可用的最大设定点。默认值取决于温度单位，为 35°C 或 95°F。
  type: float
  required: false
min_humidity:
  description: 可设置的最小目标湿度百分比。
  required: false
  type: float
  default: 30
min_temp:
  description: 可用的最小设定点。默认值取决于温度单位，为 7°C 或 44.6°F。
  type: float
  required: false
mode_command_template:
  description: 用于发送到 `mode_command_topic` 的值的模板。
  required: false
  type: template
mode_command_topic:
  description: MQTT 主题发布命令以更改 HVAC 操作模式。
  required: false
  type: string
mode_state_template:
  description: 用于提供`mode_state_topic`上接收到的值的模板。
  required: false
  type: template
mode_state_topic:
  description: 用于订阅 HVAC 运行模式更改的 MQTT 主题。如果未设置，操作模式将工作在乐观模式（见下文）。“无”有效负载重置为 `unknown` 状态。空的有效负载将被忽略。
  required: false
  type: string
modes:
  description: 支持的模式列表。需要是默认值的子集。
  required: false
  default: ['auto', 'off', 'cool', 'heat', 'dry', 'fan_only']
  type: list
name:
  description: 暖通空调系统的名称。如果仅设备名称相关，则可以设置为`null`。
  required: false
  type: string
  default: MQTT HVAC
optimistic:
  description: 定义气候是否以乐观模式运行的标志
  required: false
  type: boolean
  default: "`true` if no state topic defined, else `false`."
payload_available:
  description: 表示可用状态的有效负载。
  required: false
  type: string
  default: online
payload_not_available:
  description: 表示不可用状态的负载。
  required: false
  type: string
  default: offline
payload_off:
  description: 发送以关闭设备的有效负载。
  required: false
  type: string
  default: "OFF"
payload_on:
  description: 发送用于打开设备的有效负载。
  required: false
  type: string
  default: "ON"
power_command_template:
  description: 用于发送到`power_command_topic`的值的模板。`value`参数是为`payload_on`或`payload_off`设置的有效负载。
  required: false
  type: template
power_command_topic:
  description: 用于更改 HVAC 电源状态的 MQTT 主题。如果通过 `climate.turn_on` 打开气候，则发送配置为 `payload_on` 的负载；如果通过 `climate.turn_off` 操作关闭气候，则发送配置为 `payload_off` 的负载。请注意，`climate.turn_on` 和 `climate.turn_off` 操作不支持 `optimistic`模式。当被调用时，这些操作将向设备发送电源命令，但不会乐观地更新气候实体的状态。气候设备应通过 `mode_state_topic` 报告其状态。
  required: false
  type: string
precision:
  description: 该设备所需的精度。可用于匹配您实际恒温器的精度。支持的值为 `0.1`、`0.5` 和 `1.0`。
  required: false
  type: float
  default: 0.1 for Celsius and 1.0 for Fahrenheit.
preset_mode_command_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) 以生成发送到 `preset_mode_command_topic` 的有效负载。
  required: false
  type: template
preset_mode_command_topic:
  description: MQTT 主题发布命令以更改默认模式。
  required: false
  type: string
preset_mode_state_topic:
  description: 订阅 MQTT 主题根据预设接收气候速度。当接收到预设“无”或 `None` 时，`preset_mode` 将被重置。
  required: false
  type: string
preset_mode_value_template:
  description: 定义[template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)以从`preset_mode_state_topic`上接收的有效负载中提取`preset_mode`值。
  required: false
  type: template
preset_modes:
  description: 气候支持的默认模式列表。常见示例包括 `eco`、`away`、`boost`、`comfort`、`home`、`sleep` 和 `activity`。
  required: false
  type: [list]
  default: []
qos:
  description: 接收和发布消息时使用最大的 QoS 级别。
  required: false
  type: integer
  default: 0
retain:
  description: 定义发布的消息是否应设置保留标志。
  required: false
  type: boolean
  default: false
swing_horizontal_mode_command_template:
  description: 用于发送到 `swing_horizontal_mode_command_topic` 的值的模板。
  required: false
  type: template
swing_horizontal_mode_command_topic:
  description: MQTT 主题发布命令以更改移动水平模式。
  required: false
  type: string
swing_horizontal_mode_state_template:
  description: 用于提供`swing_horizontal_mode_state_topic`上接收到的值的模板。
  required: false
  type: template
swing_horizontal_mode_state_topic:
  description: 订阅 HVAC 摆动水平模式变化的 MQTT 主题。如果未设置，则摆动水平模式将以乐观模式工作（见下文）。
  required: false
  type: string
swing_horizontal_modes:
  description: 支持的摆动水平模式列表。
  required: false
  default: ['on', 'off']
  type: list  
swing_mode_command_template:
  description: 用于发送到 `swing_mode_command_topic` 的值的模板。
  required: false
  type: template
swing_mode_command_topic:
  description: MQTT 主题发布命令以更改移动模式。
  required: false
  type: string
swing_mode_state_template:
  description: 用于提供`swing_mode_state_topic`上接收到的值的模板。
  required: false
  type: template
swing_mode_state_topic:
  description: 用于订阅 HVAC 摆动模式更改的 MQTT 主题。如果未设置，摆动模式将以乐观模式工作（见下文）。
  required: false
  type: string
swing_modes:
  description: 支持的摆动模式列表。
  required: false
  default: ['on', 'off']
  type: list
target_humidity_command_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt) 以生成发送到 `target_humidity_command_topic` 的有效负载。
  required: false
  type: template
target_humidity_command_topic:
  description: 用于发布命令以更改目标湿度的 MQTT 主题。
  required: false
  type: string
target_humidity_state_topic:
  description: 订阅 MQTT 主题以接收目标湿度。如果未设置，目标湿度将保持乐观模式工作（见下文）。收到的 `"None"` 值将重置目标湿度。空值 (`'''`) 将被忽略。
  required: false
  type: string
target_humidity_state_template:
  description: 定义 [template](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt) 以实现气候 `target_humidity` 状态的值。
  required: false
  type: template
temperature_command_template:
  description: 用于发送到 `temperature_command_topic` 的值的模板。
  required: false
  type: template
temperature_command_topic:
  description: 用于发布命令以更改目标温度的 MQTT 主题。
  required: false
  type: string
temperature_high_command_template:
  description: 用于发送到 `temperature_high_command_topic` 的值的模板。
  required: false
  type: template
temperature_high_command_topic:
  description: 用于发布命令以更改上限目标温度的 MQTT 主题。
  required: false
  type: string
temperature_high_state_template:
  description: 用于发送`temperature_high_state_topic`上接收到的值的模板。收到的`"None"`值将重置上限温度设定点。空值(`""'`)将被忽略。
  required: false
  type: template
temperature_high_state_topic:
  description: 用于订阅上限目标温度变化的 MQTT 主题。如果未设置，则上限目标温度将以乐观模式工作（见下文）。
  required: false
  type: string
temperature_low_command_template:
  description: 用于发送到 `temperature_low_command_topic` 的值的模板。
  required: false
  type: template
temperature_low_command_topic:
  description: MQTT 主题发布命令以更改下限目标温度。
  required: false
  type: string
temperature_low_state_template:
  description: 用于发送`temperature_low_state_topic`上接收到的值的模板。收到的`"None"`值将重置较低的温度设定点。空值(`""`)将被忽略。
  required: false
  type: template
temperature_low_state_topic:
  description: 订阅下限目标温度变化的 MQTT 主题。如果未设置，较低目标温度将处于乐观模式下工作（见下文）。
  required: false
  type: string
temperature_state_template:
  description: 用于提供`temperature_state_topic`上接收到的值的模板。
  required: false
  type: template
temperature_state_topic:
  description: 用于订阅目标温度变化的 MQTT 主题。如果未设置，目标温度将以乐观模式工作（见下文）。收到的 `"None"` 值将重置温度设定点。空值 (`'''`) 将被忽略。
  required: false
  type: string
temperature_unit:
  description: 定义器件的温度单位 `C` 或 `F`。如果未设置，则温度单位设置为系统温度单位。
  required: false
  type: string
temp_step:
  description: 温度设定点的步长。
  type: float
  required: false
  default: 1
unique_id:
   description: 唯一标识此 HVAC 设备的 ID。如果两个 HVAC 设备具有相同的唯一 ID，Home Assistant 将引发异常。与基于设备的发现一起使用时需要。
   required: false
   type: string
value_template:
  description: 用于在*所有* `*_state_topic` 上负载有效负载的默认模板。
  type: template
  required: false
```

## 乐观模式

当某个属性工作在*乐观模式*下（即未设置的状态主题时），Home Assistant会询问发布到命令主题的状态变更立即更新成功内部状态。若不在工作乐观模式下，只有内部状态在设备状态确认更新后才会改变。你可以将 `optimistic` 选项设为 `true` 来强制启用模式。启用后，即使定义了乐观模式，内部状态也不断更新。

## 使用模板

对于所有 `*_state_topic`，你都可以指定接收模板来渲染这些主题的负载。你也可以通过 `value_template` 指定一个评估所有状态主题的默认模板。如果接收到的负载是 JSON 等格式，这很有可能用。在 JSON 中，被返回包裹的字符串（例如 `"foo"`）本质上就是字符串，这也可以用于负载。

例如，你通过 `mode_state_topic` 收到运行模式 `"auto"`，但实际模式名称应为 `auto`，你可以这样处理：

```yaml
mqtt:
  - climate:
      name: Study
      modes:
        - "off"
        - "heat"
        - "auto"
      mode_command_topic: "study/ac/mode/set"
      mode_state_topic: "study/ac/mode/state"
      mode_state_template: "{{ value_json }}"
```

这样就收到的`"auto"`按JSON解析，结果为`auto`。当然，在下面这个场景你也可以直接设置`value_template: "{{ value_json }}"`。

同样地，对于 `*_command_topic` 也可以指定模板来渲染发往这些主题的负载。

## 示例

完整配置示例如下。

```yaml
# Full example configuration.yaml entry
mqtt:
  - climate:
      name: Study
      modes:
        - "off"
        - "cool"
        - "fan_only"
      swing_horizontal_modes:
        - "on"
        - "off"
      swing_modes:
        - "on"
        - "off"
      fan_modes:
        - "high"
        - "medium"
        - "low"
      preset_modes:
        - "eco"
        - "sleep"
        - "activity"
      power_command_topic: "study/ac/power/set"
      preset_mode_command_topic: "study/ac/preset_mode/set"
      mode_command_topic: "study/ac/mode/set"
      mode_command_template: "{{ value if value=="off" else "on" }}"
      temperature_command_topic: "study/ac/temperature/set"
      fan_mode_command_topic: "study/ac/fan/set"
      swing_horizontal_mode_command_topic: "study/ac/swingH/set"
      swing_mode_command_topic: "study/ac/swing/set"
      precision: 1.0
```
