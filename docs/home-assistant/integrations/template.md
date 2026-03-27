---
title: 模板
description: '模板集成允许创建从其他数据派生其值的实体。这是通过为实体的属性（例如名称或状态）指定 templates(/home-assistant/docs/configuration/templating/) 来完成的。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Alarm Control Panel
  - Binary sensor
  - Button
  - Cover
  - Event
  - Fan
  - Helper
  - Image
  - Light
  - Lock
  - Number
  - Select
  - Sensor
  - Switch
  - Update
  - Vacuum
  - Weather
ha_release: 0.12
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@Petro31'
  - '@home-assistant/core'
ha_domain: template
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - cover
  - event
  - fan
  - image
  - light
  - lock
  - number
  - select
  - sensor
  - switch
  - update
  - vacuum
  - weather
ha_integration_type: helper
ha_config_flow: true
related:
  - docs: /docs/configuration/
    title: 配置文件
  - docs: /docs/blueprint/
    title: 关于蓝图
---
# 模板

**模板**集成允许创建从其他数据派生其值的实体。这是通过为实体的属性（例如名称或状态）指定 [templates](/home-assistant/docs/configuration/templating/) 来完成的。

Home Assistant 目前支持以下设备类型：

- [报警控制面板](#alarm-control-panel)
- [二进制传感器](#binary-sensor)
- [按钮](#button)
- [盖板](#cover)
- [事件](#event)
- [风扇](#fan)
- [图像](#image)
- [灯光](#light)
- [锁](#lock)
- [数字](#number)
- [选择](#select)
- [传感器](#sensor)
- [开关](#switch)
- [更新](#update)
- [吸尘器](#vacuum)
- [天气](#weather)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::important
为了能够通过用户界面添加**[Helpers](https://my.home-assistant.io/redirect/helpers/)**，您的“`configuration.yaml`”中应该有`default_config:`。默认情况下它应该已经存在，除非您将其删除。

:::
:::note
使用我们的用户界面进行配置提供了更有限的选项子集，使这种集成更易于访问，同时涵盖了大多数用例。

如果你的示例需要更多特定功能，请参考本集成的手动 [YAML 配置章节](#yaml-configuration)。

:::
## YAML 配置

实体在 YAML 配置文件中的 `template:` 键下。您可以将多个配置块定义为一个列表。每块传感器/二进制传感器/数字/选择定义实体，并且可以包含可选的更新配置定义。

### 基于状态的模板实体

默认情况下，只要模板中引用的任何数据更新，模板实体就会更新。

例如，您可以有一个获取两个传感器平均值的模板。一旦任一源传感器更新，Home Assistant 就会更新您的模板传感器。


```yaml
template:
  - sensor:
      - name: "平均温度"
        unit_of_measurement: "°C"
        state: >
          {% set bedroom = states('sensor.bedroom_temperature') | float %}
          {% set kitchen = states('sensor.kitchen_temperature') | float %}

          {{ ((bedroom + kitchen) / 2) | round(1, default=0) }}
```


### 基于触发器的模板实体

<a id="trigger-based-template-sensors"></a>

如果您想更精确地控制实体更新时间，可以定义触发器。触发器使用与[自动化触发器][trigger-doc]相同的格式和工作方式。此功能非常适合根据 Webhook 数据（[示例](#trigger-based-sensor-and-binary-sensor-storing-webhook-information)）创建实体，或按计划更新实体。

每当触发器触发时，所有相关实体都会重新渲染，并可以在模板中访问[触发器数据](/home-assistant/docs/automation/templating/)。

当模板中引用的状态发生变化时，基于触发器的实体不会自动更新。你可以通过为每个需要触发更新的实体定义[状态触发器](/home-assistant/docs/automation/trigger/#state-trigger)来重新启用此行为。

当 Home Assistant 重新启动时，基于触发器的传感器和二进制传感器的状态（包括属性）将会恢复。其他基于触发器的模板实体的状态不会恢复。

:::note
按钮不支持使用 `trigger` 或 `action` 选项。

:::


```yaml
# 配置示例
template:
  - triggers:
      - trigger: time_pattern
        # 每晚更新一次
        hours: 0
        minutes: 0
    sensor:
      # 记录从某个日期开始过去了多少天
      - name: "Not smoking"
        state: '{{ ( ( as_timestamp(now()) - as_timestamp(strptime("06.07.2018", "%d.%m.%Y")) ) / 86400 ) | round(default=0) }}'
        unit_of_measurement: "Days"
```


### 配置参考

### Configuration variables for `trigger-based`
actions:
描述：定义触发器触发时要执行的操作（仅适用于基于触发器的实体）。评估实体模板时，可以使用操作脚本设置的变量。这可用于与任意操作进行交互，尤其是使用 [响应数据](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data) 的操作。参见[操作文档](/home-assistant/docs/automation/action)。
必填：假
类型：列表
conditions:
描述：定义在触发器触发后、执行任何操作或执行传感器更新之前必须满足的条件（仅适用于基于触发器的实体）。参见[条件文档](/home-assistant/docs/automation/condition)。
必填：假
类型：列表
triggers:
描述：定义一个或多个自动化触发器来更新实体。如果省略，则根据引用的实体进行更新。参见[触发器文档](/home-assistant/docs/automation/trigger)。
必填：假
类型：列表
unique_id:
描述：此配置块的唯一 ID。这是此块中所有实体的所有唯一 ID 的前缀。
必填：假
类型：字符串
variables:
描述：变量定义的键值对，可以在下面的模板中引用和使用（仅适用于基于触发器的实体）。主要由蓝图使用。对于基于状态的模板实体，只有在加载或重新加载配置时才会解析变量。基于触发器的模板实体解析触发器和操作之间的变量。
必填：假
类型： 地图
  keys:
“变量名：值”：
描述：变量名和对应的值。
必填：真实
类型：字符串


## 常用设备配置选项

每个实体平台都有自己的一组配置选项，但有一些可在所有实体平台上使用的通用选项。


```yaml
# configuration.yaml 示例
template:
  - binary_sensor:
      # 通用配置选项
    - default_entity_id: binary_sensor.my_alert
      unique_id: my_unique_sensor_id
      variables:
        my_entity: sensor.watts
      availability: "{{ my_entity | has_value }}"
      icon: "{{ 'mdi:flash-alert' if states(my_entity) | float > 100 else 'mdi:flash' }}"
      name: "{{ states(my_entity) }} Alert"
      # 实体专用配置选项
      state: "{{ states(my_entity) | float > 100}}"
      device_class: problem
```


### Configuration variables for `device`
  availability:
描述：定义一个模板来获取实体的`available`状态。如果模板无法渲染或返回 `True`、`"1"`、`"true"`、`"yes"`、`"on"`、`"enable"` 或非零数字，则实体为 `available`。如果模板返回任何其他值，则实体为 `unavailable`。如果未配置，实体始终为 `available`。请注意，字符串比较不区分大小写；允许使用 `"TrUe"` 和 `"yEs"`。
必填：假
类型：模板
默认值：true
  default_entity_id:
描述：使用 `default_entity_id` 代替 name 来自动生成实体 id。例如。 `sensor.my_awesome_sensor`。当在没有 `unique_id` 的情况下使用时，如果实体 ID 可用，则实体 ID 会在重新启动或重新加载期间更新。  如果实体 ID 已存在，则创建实体 ID，并在末尾添加数字。当与 `unique_id` 一起使用时，`default_entity_id` 仅在第一次添加实体时使用。如果实体被删除并再次添加，则设置此选项将覆盖用户自定义的实体 ID。
必填：假
类型：字符串
  icon:
描述：定义实体图标的模板。
必填：假
类型：模板
  picture:
描述：定义传感器实体图片的模板。
必填：假
类型：模板
  name:
描述：定义一个模板来获取实体的名称。
必填：假
类型：模板
  unique_id:
描述：唯一标识该实体的 ID。如果可用，它会与配置块的唯一 ID 相结合。这允许从 Web 界面更改 `name`、`icon` 和 `entity_id`。  从 Web 界面更改 `entity_id` 会覆盖 `default_entity_id` 中的值。
必填：假
类型：字符串
  variables:
描述：变量定义的键值对，可以在下面的模板中引用和使用（仅适用于基于触发器的实体）。主要由蓝图使用。对于基于状态的模板实体，只有在加载或重新加载配置时才会解析变量。基于触发器的模板实体解析触发器和操作之间的变量。
必填：假
类型： 地图
    keys:
“变量名：值”：
描述：变量名和对应的值。
必填：真实
类型：字符串


## 报警控制面板

模板警报控制面板平台允许您使用模板创建警报控制面板来定义状态和脚本来定义每个操作。

警报控制面板实体可以从前端的 Helpers 部分或通过 YAML 创建。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - alarm_control_panel:
      - name: "报警控制面板 1"
        state: "{{ states('input_select.panel_1_state') }}"
        arm_away:
          action: script.arm_panel_away
        arm_home:
          action: script.arm_panel_home
        disarm:
          action: script.disarm_panel
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id: input_select.panel_1_state
    alarm_control_panel:
      - name: "报警控制面板 1"
        state: "{{ states('input_select.panel_1_state') }}"
        arm_away:
          action: script.arm_panel_away
        arm_home:
          action: script.arm_panel_home
        disarm:
          action: script.disarm_panel
```


### Configuration variables for `alarm_control_panel`
alarm_control_panel:
描述：报警控制面板列表
必填：真实
类型： 地图
  keys:
    arm_away:
描述：定义当警报设置为离开模式时要运行的操作。
必填：假
类型：动作
    arm_custom_bypass:
描述：定义当警报设置为自定义旁路模式时要运行的操作。
必填：假
类型：动作
    arm_home:
描述：定义当警报设置为家庭模式时要运行的操作。
必填：假
类型：动作
    arm_night:
描述：定义当警报设置为夜间模式时要运行的操作。
必填：假
类型：动作
    arm_vacation:
描述：定义当警报设置为假期模式时要运行的操作。
必填：假
类型：动作
    code_arm_required:
描述：如果为真，则需要代码来布防警报。
必填：假
类型：布尔值
默认值：true
    code_format:
描述：`number`、`text` 或 `no_code` 之一。用于布防/撤防警报的代码格式。
必填：假
类型：字符串
默认值：数字
    disarm:
描述：定义警报解除时要运行的操作。
必填：假
类型：动作
    optimistic:
描述：定义报警控制面板是否工作在乐观模式的标志。启用后，当通过 UI 或操作选择新选项时，警报控制面板的状态会立即更新，而无需等待 `state` 中定义的模板更新。禁用（默认）时，报警控制面板仅在 `state` 模板返回新值时更新。
必填：假
类型：布尔值
默认值：假
    state:
描述：“定义一个模板来设置报警主机的状态。仅使用状态`armed_away`，`armed_home`，`armed_night`，`armed_vacation`，`arming`，`disarmed`，`pending`，`triggered`和`unavailable`。”
必填：假
类型：模板
    trigger:
描述：定义触发警报时要运行的操作。
必填：假
类型：动作

## 二进制传感器

模板二进制传感器平台允许您使用模板创建二进制传感器来定义状态和属性。

二进制传感器实体可以从前端的 Helpers 部分或通过 YAML 创建。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - binary_sensor:
      - name: Sun Up
        state: >
          {{ is_state("sun.sun", "above_horizon") }}
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
    - trigger: state
      entity_id: sun.sun
    binary_sensor:
      - name: Sun Up
        state: >
          {{ is_state("sun.sun", "above_horizon") }}
```


### Configuration variables for `binary-sensor`
binary_sensor:
描述：二进制传感器列表
必填：真实
类型：列表
  keys:
    attributes:
描述：定义实体属性的模板。
必填：假
类型： 地图
      keys:
“属性：模板”：
描述：属性和对应的模板。
必填：真实
类型：模板
    auto_off:
描述：“**需要触发器。**实体呈现“开启”后多长时间后应关闭。”
必填：假
类型：时间
    delay_off:
描述：在此传感器切换到 `off` 之前，必须***不满足***模板状态的时间量。这也可以是一个模板。
必填：假
类型：时间
    delay_on:
描述：在该传感器切换到 `on` 之前，必须***满足***模板状态的时间量（例如 `0:00:05`）。这也可以是一个模板。
必填：假
类型：时间
    device_class:
描述：设置设备的类别，更改设备状态和UI上显示的图标（见下文）。它不设置`unit_of_measurement`。
必填：假
类型：设备类
默认值：无
    state:
描述：如果模板计算结果为 `True`、`yes`、`on`、`enable` 或正数，则传感器为 `on`。如果模板评估为 `None`，则传感器为 `unknown`。任何其他值都会将其外观为 `off`。前面的实际外观（`Open`/`Closed`、`Detected`/`Clear` 等）受传感器的 device_class 值影响
必填：真实
类型：模板


### 基于状态的二进制传感器 - 洗衣机运行

此示例通过监控洗衣机创建“负载运行”传感器
连接到洗衣机的能量计。洗衣机在运行过程中，电能表波动剧烈，甚至在负载完成之前就经常达到零。通过利用 `delay_off`，我们可以让该传感器仅在 5 分钟内没有洗衣机活动时关闭。


```yaml
# configuration.yaml 示例
# 判断洗衣机何时正在运行。
template:
  - binary_sensor:
      - name: "洗衣机"
        delay_off:
          minutes: 5
        state: >
          {{ states('sensor.washing_machine_power')|float > 0 }}
```


### 基于状态的二进制传感器 - 有人在家吗

此示例根据设备跟踪和运动传感器的组合来确定是否有人在家。如果您的孩子/保姆/祖父母可能仍在您的房子里，但家庭助理中的可跟踪设备没有代表，那么它非常有用。这提供了基于 Wi-Fi 的设备跟踪和 Z-Wave 多传感器存在传感器的组合。


```yaml
# configuration.yaml 示例
template:
  - binary_sensor:
      - name: 家里有人
        state: >
          {{ is_state('device_tracker.sean', 'home')
             or is_state('device_tracker.susan', 'home')
             or is_state('binary_sensor.office_124', 'on')
             or is_state('binary_sensor.hallway_134', 'on')
             or is_state('binary_sensor.living_room_139', 'on')
             or is_state('binary_sensor.porch_ms6_1_129', 'on')
             or is_state('binary_sensor.family_room_144', 'on') }}
```


### 基于状态的二进制传感器 - 具有纬度和经度属性的设备跟踪器传感器

此示例演示如何组合非 GPS（例如 NMAP）和 GPS 设备跟踪器，同时仍包含纬度和经度属性


```yaml
# configuration.yaml 示例
template:
  - binary_sensor:
      - name: My Device
        state: >
          {{ is_state('device_tracker.my_device_nmap', 'home') or is_state('device_tracker.my_device_gps', 'home') }}
        device_class: "presence"
        attributes:
          latitude: >
            {% if is_state('device_tracker.my_device_nmap', 'home') %}
              {{ state_attr('zone.home', 'latitude') }}
            {% else %}
              {{ state_attr('device_tracker.my_device_gps', 'latitude') }}
            {% endif %}
          longitude: >
            {% if is_state('device_tracker.my_device_nmap', 'home') %}
              {{ state_attr('zone.home', 'longitude') }}
            {% else %}
              {{ state_attr('device_tracker.my_device_gps', 'longitude') }}
            {% endif %}
```


### 基于状态的二进制传感器 - 当状态改变时更改图标

此示例演示如何使用模板在图标状态更改时更改图标。该图标引用其自身的状态。


```yaml
# configuration.yaml 示例
template:
  - binary_sensor:
      - name: Sun Up
        state: >
          {{ is_state("sun.sun", "above_horizon") }}
        icon: >
          {% if is_state("binary_sensor.sun_up", "on") %}
            mdi:weather-sunset-up
          {% else %}
            mdi:weather-sunset-down
          {% endif %}
```


### 基于触发器的二进制传感器 - 收到自定义事件时更改状态和图标

更高级的用例可能是根据传感器自身的状态（如上所示）设置图标，但由事件触发。此示例演示了一个瞬时打开的二进制传感器，例如按下门铃按钮时。

当接收到适当的事件时，二进制传感器打开并设置匹配的图标。 5 秒后，二进制传感器自动关闭。为了确保图标得到更新，状态更改为关闭时必须有一个触发器。


```yaml
# configuration.yaml 示例
template:
  - triggers:
      - trigger: event
        event_type: YOUR_EVENT
      - trigger: state
        entity_id: binary_sensor.doorbell_rang
        to: "off"
    binary_sensor:
      name: doorbell_rang
      icon: "{{ (trigger.platform == 'event') | iif('mdi:bell-ring-outline', 'mdi:bell-outline') }}"
      state: "{{ trigger.platform == 'event' }}"
      auto_off:
        seconds: 5
```


## 按钮

模板按钮平台允许您使用脚本创建按钮实体来定义每个操作。

按钮实体可以从前端的 Helpers 部分或通过 YAML 创建。


```yaml
# configuration.yaml 示例
template:
  - button:
      - name: 快进
        press:
          action: remote.send_command
          target:
            entity_id: remote.living_room
          data:
            command: fast_forward
```


### Configuration variables for `button`
button:
描述：按钮列表
必填：真实
类型： 地图
  keys:
    press:
描述：定义按下按钮时要运行的操作。
必填：真实
类型：动作

## 盖板

模板封面平台允许您使用模板创建封面来定义状态和脚本来定义每个操作。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - cover:
      - name: 车库门
        state: "{{ states('sensor.garage_door')|float > 0 }}"
        device_class: garage
        open_cover:
          action: script.open_garage_door
        close_cover:
          action: script.close_garage_door
        stop_cover:
          action: script.stop_garage_door
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id: sensor.garage_door
    cover:
      - name: 车库门
        state: "{{ trigger.to_state.state|float(0) > 0 }}"
        device_class: garage
        open_cover:
          action: script.open_garage_door
        close_cover:
          action: script.close_garage_door
        stop_cover:
          action: script.stop_garage_door
```


### Configuration variables for `cover`
cover:
描述：封面的特点
类型： 地图
  keys:
    close_cover:
描述：定义关闭盖子的动作。
必填：包含
类型：动作
    device_class:
描述：设置[设备类别](/home-assistant/integrations/cover/)，更改前端显示的设备状态和图标。
必填：假
类型：字符串
    open_cover:
描述：定义打开盖子的动作。如果指定了 `open_cover`，则还必须指定 `close_cover`。必须至少指定 `open_cover` 和 `set_cover_position` 之一。
必填：包含
类型：动作
    optimistic:
描述：强制盖板位置使用[乐观模式](#cover-optimistic-mode)。
必填：假
类型：布尔值
默认值：假
    position:
描述：定义一个模板来获取封面的位置。合法值为 `0`（关闭）和 `100`（打开）之间的数字。如果模板生成 `None` 值，则当前位置设置为 `unknown`。
必填：假
类型：模板
    set_cover_position:
描述：定义一个设置为掩护位置的动作（在 `0` 和 `100` 之间）。变量 `position` 包含实体的设定位置。
必填：假
类型：动作
    set_cover_tilt_position:
描述：定义一个设置盖子倾斜度的动作（在 `0` 和 `100` 之间）。变量 `tilt` 包含实体的设置倾斜位置。
必填：假
类型：动作
    state:
描述：定义一个模板来获取盖板状态。模板的有效输出值为 `open`、`opening`、`closing` 和 `closed`，它们直接映射到相应状态。此外，`1`、`true`、`yes`、`on` 和 `enable` 可作为 `open` 的同义词，而 `0`、`false`、`no`、`off` 和 `disable` 可作为 `closed` 的同义词。如果同时指定了[`state` 和 `position` 模板](#combining-state-and-position-templates)，则仅 `opening` 和 `closing` 来自 `state` 模板。如果模板生成 `None` 值，则状态设置为 `unknown`。
必填：假
类型：模板
    stop_cover:
描述：定义停止封面的动作。
必填：假
类型：动作
    tilt:
描述：定义一个模板来获取盖子的倾斜状态。合法值为 `0`（关闭）和 `100`（打开）之间的数字。如果模板生成 `None` 值，则当前倾斜状态设置为 `unknown`。
必填：假
类型：模板
    tilt_optimistic:
描述：强制盖板倾斜位置使用[乐观模式](#cover-optimistic-mode)。
必填：假
类型：布尔值
默认值：假


### 覆盖乐观模式

在乐观模式下，掩体位置状态在内部维护。如果未指定 `state` 或 `position`，则自动启用此模式。请注意，如果没有一些反馈机制，这不太可能非常可靠，因为否则无法知道盖子是否正确移动。可以使用 `optimistic` 属性强制封面进入乐观模式。当未指定 `tilt` 或使用 `tilt_optimistic` 属性时，会启用 `tilt_position` 的等效模式。

### 组合 `state` 和 `position` 模板

如果同时指定了 `state` 和 `position`，则仅直接从 `state` 设置 `opening` 和 `closing` 状态。相反，`open` 和 `closed` 状态是从封面位置导出的。

| `value_template` 输出 | 结果 |
| --------------------- | ------------------------------------ |
|打开|由 `position_template` 定义的状态 |
|关闭 |由 `position_template` 定义的状态 |
| 真实 | 由 `position_template` 定义的状态 |
|假 |由 `position_template` 定义的状态 |
|开幕|状态设置为 `opening` |
|关闭|状态设置为 `closing` |
| <其他任意输出> |状态或位置没有变化 |

### 基于州的保险 - 车库门

此示例将带有可控开关和位置传感器的车库门转换为盖子。状况检查是可选的，但建议您使用相同的开关来打开和关闭车库。


```yaml
template:
  - cover:
      - name: 车库门
        device_class: garage
        position: "{{ states('sensor.garage_door') }}"
        open_cover:
          - condition: state
            entity_id: sensor.garage_door
            state: "off"
          - action: switch.turn_on
            target:
              entity_id: switch.garage_door
        close_cover:
          - condition: state
            entity_id: sensor.garage_door
            state: "on"
          - action: switch.turn_off
            target:
              entity_id: switch.garage_door
        stop_cover:
          action: switch.turn_on
          target:
            entity_id: switch.garage_door
        icon: >-
          {% if states('sensor.garage_door')|float > 0 %}
            mdi:garage-open
          {% else %}
            mdi:garage
          {% endif %}
```


### 基于状态的封面 - 带瞬时开关的乐观车库门

此示例使用瞬时开关改造车库门。


```yaml
template:
  - cover:
      - name: 车库门
        device_class: garage
        open_cover:
          - action: switch.turn_on
            target:
              entity_id: switch.garage_door
        close_cover:
          - action: switch.turn_on
            target:
              entity_id: switch.garage_door
        stop_cover:
          - action: switch.turn_on
            target:
              entity_id: switch.garage_door
```


## 事件

模板事件平台允许您使用模板创建事件来定义状态。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - event:
      - name: 场景控制器
        device_class: button
        event_type: "{{ states('input_select.scene_controller_button_press') }}"
        event_types: "{{ ['single', 'double', 'hold'] }}"
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: event
        event_type: zwave_js_notification
        event_data:
          node_id: 14
    event:
      - name: 锁操作
        event_type: "{{ trigger.event.data.event_label }}"
        event_types: "{{ ['Keypad lock operation', 'Keypad unlock operation'] }}"
```


### Configuration variables for `event`
event:
描述：事件列表
必填：真实
类型： 地图
  keys:
    device_class:
描述：设置[设备类别](/home-assistant/integrations/event/)，更改前端显示的设备状态和图标。
必填：假
类型：字符串
    event_type:
描述：事件最后触发的事件类型的模板。
必填：真实
类型：模板
    event_types:
描述：事件可用事件类型的模板。
必填：真实
类型：模板


## 风扇

模板粉丝平台允许您使用模板来定义状态和脚本来定义每个操作来创建粉丝。

粉丝实体可以从前端的 Helpers 部分或通过 YAML 创建。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - fan:
      - name: "Bedroom fan"
        state: "{{ states('input_boolean.state') }}"
        percentage: "{{ states('input_number.percentage') }}"
        preset_mode: "{{ states('input_select.preset_mode') }}"
        oscillating: "{{ states('input_select.osc') }}"
        direction: "{{ states('input_select.direction') }}"
        turn_on:
          action: script.fan_on
        turn_off:
          action: script.fan_off
        set_percentage:
          action: script.fans_set_speed
          data:
            percentage: "{{ percentage }}"
        set_preset_mode:
          action: script.fans_set_preset_mode
          data:
            preset_mode: "{{ preset_mode }}"
        set_oscillating:
          action: script.fan_oscillating
          data:
            oscillating: "{{ oscillating }}"
        set_direction:
          action: script.fan_direction
          data:
            direction: "{{ direction }}"
        speed_count: 6
        preset_modes:
          - 'auto'
          - 'smart'
          - 'whoosh'
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id:
          - input_boolean.state
          - input_number.percentage
          - input_select.preset_mode
          - input_select.osc
          - input_select.direction
    fan:
      - name: "Bedroom fan"
        state: "{{ states('input_boolean.state') }}"
        percentage: "{{ states('input_number.percentage') }}"
        preset_mode: "{{ states('input_select.preset_mode') }}"
        oscillating: "{{ states('input_select.osc') }}"
        direction: "{{ states('input_select.direction') }}"
        turn_on:
          action: script.fan_on
        turn_off:
          action: script.fan_off
        set_percentage:
          action: script.fans_set_speed
          data:
            percentage: "{{ percentage }}"
        set_preset_mode:
          action: script.fans_set_preset_mode
          data:
            preset_mode: "{{ preset_mode }}"
        set_oscillating:
          action: script.fan_oscillating
          data:
            oscillating: "{{ oscillating }}"
        set_direction:
          action: script.fan_direction
          data:
            direction: "{{ direction }}"
        speed_count: 6
        preset_modes:
          - 'auto'
          - 'smart'
          - 'whoosh'
```


### Configuration variables for `fan`
fan:
描述：粉丝列表
必填：真实
类型： 地图
  keys:
    direction:
描述：“定义一个模板来获取风扇的方向。有效值：`forward`，`reverse`。”
必填：假
类型：模板
    optimistic:
描述：定义风扇是否工作在乐观模式的标志。启用后，当通过 UI 或操作新选择选项时，风扇的状态会立即更新，而消耗等待 `state` 中定义的模板更新。（取消）时，默认风扇仅在 `state` 模板返回新值时更新。
必填：假
类型：布尔值
默认值：假
    oscillating:
描述：“定义一个模板来获取风扇的振荡状态。如果模板计算结果为 `1`、`true`、`yes`、`on` 或 `enable`，则风扇振荡。如果模板计算结果为 `0`、`false`、`no`、`off` 或 `disable`，则风扇不振荡。”
必填：假
类型：模板
    percentage:
描述：定义一个模板来获取风扇的转速百分比。
必填：假
类型：模板
    preset_mode:
描述：定义一个模板来获取风扇的预设模式。
必填：假
类型：模板
    preset_modes:
描述：风扇能够执行的预设模式列表。这是任意字符串列表，不得包含任何速度。
必填：假
类型：[字符串，列表]
默认： []
    set_percentage:
描述：定义当风扇收到速度百分比命令时要运行的操作。
必填：假
类型：动作
    set_preset_mode:
描述：定义当风扇收到预设命令时要运行的操作。
必填：假
类型：动作
    set_oscillating:
描述：定义当风扇收到振荡状态命令时要运行的操作。
必填：假
类型：动作
    set_direction:
描述：定义当风扇收到方向命令时要运行的操作。
必填：假
类型：动作
    speed_count:
描述：风扇支持的速度数。用于计算 `fan.increase_speed` 和 `fan.decrease_speed` 操作的百分比步长。
必填：假
类型：整数
默认值：100
    state:
描述：“定义一个模板来获取粉丝的状态。如果模板计算结果为 `1`、`true`、`yes`、`on` 或 `enable`，则粉丝为 `on`。如果模板计算结果为 `0`、`false`、`no`、`off` 或 `disable`，则粉丝为 `off`。如果模板计算结果为 `unknown`。 `None`。”
必填：真实
类型：模板
    turn_on:
描述：定义风扇打开时运行的操作。
必填：真实
类型：动作
    turn_off:
描述：定义风扇关闭时运行的操作。
必填：真实
类型：动作


### 从速度转换为百分比

当从旧风扇实体模型转换为 3 速风扇时，可以使用以下百分比：

0 - `off`
33 - `low`__
66 - `medium`__
100 - `high`__

### 州级粉丝-帮手粉丝

此示例使用 input_boolean 和 input_number 来模拟风扇，并且该示例显示了 `set_percentage` 的多个操作。


```yaml
template:
  - fan:
      - name: "Helper Fan"
        state: "{{ states('input_boolean.state') }}"
        turn_on:
          - action: input_boolean.turn_on
            target:
              entity_id: input_boolean.state
        turn_off:
          - action: input_boolean.turn_off
            target:
              entity_id: input_boolean.state
        speed_count: 6
        percentage: >
          {{ states('input_number.percentage') if is_state('input_boolean.state', 'on') else 0 }}
        set_percentage:
          - action: input_boolean.turn_{{ 'on' if percentage > 0 else 'off' }}
            target:
              entity_id: input_boolean.state
          - action: input_number.set_value
            target:
              entity_id: input_number.percentage
            data:
              value: "{{ percentage }}"
```


### 基于状态的风扇 - 具有预设模式的风扇

此示例仅使用一个百分比的现有风扇。它将百分比值扩展到可用的预设模式，而无需辅助实体。


```yaml
template:
  - fan:
      - name: "预设模式风扇示例"
        state: "{{ states('fan.percentage_fan') }}"
        turn_on:
          - action: fan.turn_on
            target:
              entity_id: fan.percentage_fan
        turn_off:
          - action: fan.turn_off
            target:
              entity_id: fan.percentage_fan
        percentage: >
          {{ state_attr('fan.percentage_fan', 'percentage') }}
        speed_count: 3
        set_percentage:
          - action: fan.set_percentage
            target:
              entity_id: fan.percentage_fan
            data:
              percentage: "{{ percentage }}"
        preset_modes:
          - "off"
          - "low"
          - "medium"
          - "high"
        preset_mode: >
          {% if is_state('fan.percentage_fan', 'on') %}
            {% if state_attr('fan.percentage_fan', 'percentage') == 100  %}
              high
            {% elif state_attr('fan.percentage_fan', 'percentage') == 66 %}
              medium
            {% else %}
              low
            {% endif %}
          {% else %}
            off
          {% endif %}
        set_preset_mode:
          - action: fan.set_percentage
            target:
              entity_id: fan.percentage_fan
            data:
              percentage: >-
                {% if preset_mode == 'high' %}
                  100
                {% elif preset_mode == 'medium' %}
                  66
                {% elif preset_mode == 'low' %}
                  33
                {% else %}
                  0
                {% endif %}
```


## 图像

模板图像平台允许您使用模板创建图像实体来定义图像 URL。

图像实体可以从前端的 Helpers 部分或通过 YAML 创建。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - image:
      - name: "My Image"
        url: "http://example.com/image.jpg"
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id:
          - input_boolean.state
    image:
      - name: "My Image"
        url: >
          {% if is_state('input_boolean.state', 'on') %}
            http://example.com/image_on.jpg
          {% else %}
            http://example.com/image_off.jpg
          {% endif %}
```


### Configuration variables for `image`
image:
描述：图像列表
必填：真实
类型： 地图
  keys:
    url:
描述：提供图像的 URL。
必填：真实
类型：模板
    verify_ssl:
描述：启用或禁止 SSL 证书验证。仅使用 http URL 设置为 false，或者您拥有自签名 SSL 证书但尚未安装 CA 证书来启用验证。
必填：假
类型：布尔值
默认值：true

## 灯光

模板灯光平台允许您使用模板创建灯光来定义状态和脚本来定义每个操作。

轻实体可以从前端的 Helpers 部分或通过 YAML 创建。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - light:
      - name: "影院灯光"
        level: "{{ state_attr('sensor.theater_brightness', 'lux')|int }}"
        state: "{{ state_attr('sensor.theater_brightness', 'lux')|int > 0 }}"
        temperature: "{{states('input_number.temperature_input') | int}}"
        hs: "({{states('input_number.h_input') | int}}, {{states('input_number.s_input') | int}})"
        effect_list: "{{ state_attr('light.led_strip', 'effect_list') }}"
        turn_on:
          action: script.theater_lights_on
        turn_off:
          action: script.theater_lights_off
        set_level:
          action: script.theater_lights_level
          data:
            brightness: "{{ brightness }}"
        set_temperature:
          action: input_number.set_value
          data:
            value: "{{ color_temp }}"
            entity_id: input_number.temperature_input
        set_hs:
          - action: input_number.set_value
            data:
              value: "{{ h }}"
              entity_id: input_number.h_input
          - action: input_number.set_value
            data:
              value: "{{ s }}"
              entity_id: input_number.s_input
          - action: light.turn_on
            data:
              entity_id:
                - light.led_strip
              transition: "{{ transition | float }}"
              hs_color:
                - "{{ hs[0] }}"
                - "{{ hs[1] }}"
        set_effect:
          - action: light.turn_on
            data:
              entity_id:
                - light.led_strip
              effect: "{{ effect }}"
        supports_transition: "{{ true }}"
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id:
        - sensor.theater_brightness
        - input_number.temperature_input
        - input_number.h_input
        - input_number.s_input
        - light.led_strip
    light:
      - name: "影院灯光"
        level: "{{ state_attr('sensor.theater_brightness', 'lux')|int }}"
        state: "{{ state_attr('sensor.theater_brightness', 'lux')|int > 0 }}"
        temperature: "{{states('input_number.temperature_input') | int}}"
        hs: "({{states('input_number.h_input') | int}}, {{states('input_number.s_input') | int}})"
        effect_list: "{{ state_attr('light.led_strip', 'effect_list') }}"
        turn_on:
          action: script.theater_lights_on
        turn_off:
          action: script.theater_lights_off
        set_level:
          action: script.theater_lights_level
          data:
            brightness: "{{ brightness }}"
        set_temperature:
          action: input_number.set_value
          data:
            value: "{{ color_temp }}"
            entity_id: input_number.temperature_input
        set_hs:
          - action: input_number.set_value
            data:
              value: "{{ h }}"
              entity_id: input_number.h_input
          - action: input_number.set_value
            data:
              value: "{{ s }}"
              entity_id: input_number.s_input
          - action: light.turn_on
            data:
              entity_id:
                - light.led_strip
              transition: "{{ transition | float }}"
              hs_color:
                - "{{ hs[0] }}"
                - "{{ hs[1] }}"
        set_effect:
          - action: light.turn_on
            data:
              entity_id:
                - light.led_strip
              effect: "{{ effect }}"
        supports_transition: "{{ true }}"
```


### Configuration variables for `light`
light:
描述：您的灯光列表。
必填：真实
类型： 地图
  keys:
    effect:
描述：定义一个模板来获得灯光的效果。
必填：包含
类型：模板
默认：乐观
    effect_list:
描述：定义一个模板来获取支持的效果列表。必须呈现一个列表。
必填：包含
类型：模板
默认：乐观
    hs:
描述：定义一个模板来获取灯光的HS颜色。必须渲染一个元组（色调、饱和度）。
必填：假
类型：模板
默认：乐观
    level:
描述：定义一个模板来获取灯光的亮度。
必填：假
类型：模板
默认：乐观
    min_mireds:
描述：定义一个模板来获取灯光的最小陷入值。
必填：假
类型：模板
默认：乐观
    max_mireds:
描述：定义一个模板来获取灯光的最大陷入值。
必填：假
类型：模板
默认：乐观
    optimistic:
描述：定义灯是否在乐观模式下工作的标志。启用后，当通过 UI 或操作选择新选项时，灯光的状态会立即更新，而消耗等待 `state` 中定义的模板更新。取消（默认）时，灯光仅在 `state` 模板返回新值时更新。
必填：假
类型：布尔值
默认值：假
    rgb:
描述：定义一个模板来获取灯光的RGB颜色。必须渲染元组或列表（红、绿、蓝）。
必填：假
类型：模板
默认：乐观
    rgbw:
描述：定义一个模板来获取灯光的RGBW颜色。必须渲染元组或列表（红、绿、蓝、白）。
必填：假
类型：模板
默认：乐观
    rgbww:
描述：定义一个模板来获取灯光的RGBWW颜色。必须渲染元组或列表（红、绿、蓝、冷白、暖白）。
必填：假
类型：模板
默认：乐观
    set_effect:
描述：定义了一组在向灯光发出效果命令运行时的操作（脚本）。仅当使用 `effect` 打开灯时，该脚本才能执行。 `set_effect` 脚本接收变量 `effect`。它还可以接收变量 `brightness` 和/或 `transition`。
必填：包含
类型：动作
    set_level:
描述：定义一组在给灯发出亮度命令时运行的操作（脚本）。仅当使用 `brightness`、`brightness_pct` 或 `transition` 打开灯时，该脚本才能执行。 `set_level` 脚本接收标记 `brightness` 和/或 `transition`。
必填：假
类型：动作
    set_temperature:
描述：定义一组在向灯光提供色温和命令时的操作（脚本）。仅当使用 `color_temp` 或 `color_temp_kelvin` 打开灯时，该脚本才会执行。该脚本接收变量 `color_temp` 和 `color_temp_kelvin`，并且还可以接收变量 `brightness` 和/或 `transition`。
必填：假
类型：动作
    set_hs:
描述：定义一组在给灯光提供 hs 颜色命令时运行的操作（脚本）。仅当使用 `hs_color` 打开灯时，该脚本才会执行。该脚本接收变量 `hs` 作为元组、`h` 和 `s`，并且还可以接收变量 `brightness` 和/或 `transition`。
必填：假
类型：动作
    set_rgb:
描述：定义一组在为灯光提供 RGB 颜色命令时运行的操作（脚本）。 仅当使用 `rgbw_color` 打开灯时，该脚本才能执行。该脚本接收变量 `rgb` 作为元组、`r`、`g` 和 `b`，并且还可以接收 `brightness` 和/或 `transition`。
必填：假
类型：动作
    set_rgbw:
描述：定义一组在灯光下提供 RGBW 颜色命令运行的操作（脚本）。 仅当使用 `rgbw_color` 打开灯时，该脚本才能执行。该脚本接收变量 `rgbw` 和 `rgb` 作为元组 `r`、`g`、`b` 和 `w`，并且还可以接收 `brightness` 和/或 `transition`。
必填：假
类型：动作
    set_rgbww:
描述：定义一组在向灯光提供 RGBWW 颜色命令运行时的操作（脚本）。 仅当使用 `rgbww_color` 打开灯时，该脚本才能执行。该脚本接收变量 `rgbww` 和 `rgb` 作为元组、`r`、`g`、`b`、`cw` 和 `ww`，并且还可以接收 `brightness` 和/或 `transition`。
必填：假
类型：动作
    state:
描述：定义一个模板来设置灯光的状态。如果未定义，则该灯乐观地假设所有命令均成功。如果模板计算结果为 `1`、`true`、`yes`、`on` 或 `enable`，则灯光为 `on`。如果模板计算结果为 `0`、`false`、`no`、`off` 或 `disable`，则灯光为 `0`、`false`、`no`、`off` 或 `disable`，则灯光为 `on`。 `off`。如果模板计算结果为`None`，则光为`unknown`。
必填：假
类型：模板
默认：乐观
    supports_transition:
描述：定义一个模板来获取灯光是否应该支持脚本。返回一个布尔值（True/False）。如果该值为 `True`，则 `turn on` 或 `turn off` 调用中的转换参数将作为所有脚本中的命名参数 `transition` 传递。
必填：假
类型：模板
默认值：假
    temperature:
描述：定义一个模板来获取灯光的色温。模板必须返回以沼泽为单位的色温。如果您使用其他来源的 `color_temp_kelvin` 属性，请通过将 1000000 除以 `color_temp_kelvin` 结果转换值陷入困境。
必填：假
类型：模板
默认：乐观
    turn_on:
描述：定义灯打开时要运行的动作。可以接收变量 `brightness` 和/或 `transition`。
必填：真实
类型：动作
    turn_off:
描述：定义灯关闭时运行的操作。可以接收变量 `transition`。
必填：真实
类型：动作


### 光注意事项

默认情况下，它作为配置参数 `transition` 提供 `turn_on`、`turn_off`、`brightness`、`color_temp`、`effect`、`hs_color`、`rgb_color`、`rgbw_color` 或 `rgbww_color` 脚本。如果相应的参数包含调用中，则将作为配置参数 `brightness` 提供`turn_on`、`color_temp`、`effect`、`hs_color`、`rgb_color`、`rgbw_color` 或 `rgbww_color` 脚本。在这种情况下，不会调用酒精脚本（`set_level`）。如果仅将亮度传递给 `light.turn_on` 操作，调用 `set_level` 脚本。

### 基于状态的灯光 - 剧院音量控制

此示例显示的灯光实际上是家庭影院的音量。这
集成使您可以灵活地提供您想要发送的任何内容
消费者的有效负载，包括您可能需要的任何规模转换
制作；[媒体播放器集成](/home-assistant/integrations/media_player/) 需要浮点
从 `0.0` 到 `1.0` 的点数百分比值。


```yaml
# configuration.yaml 示例
template:
  - light:
      - name: 接收器音量
        state: >-
          {% if is_state('media_player.receiver', 'on') %}
            {% if state_attr('media_player.receiver', 'is_volume_muted') %}
              off
            {% else %}
              on
            {% endif %}
          {% else %}
            off
          {% endif %}
        turn_on:
          action: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: false
        turn_off:
          action: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: true
        set_level:
          action: media_player.volume_set
          target:
            entity_id: media_player.receiver
          data:
            volume_level: "{{ (brightness / 255 * 100)|int / 100 }}"
        level: >-
          {% if is_state('media_player.receiver', 'on') %}
            {{ (state_attr('media_player.receiver', 'volume_level')|float * 255)|int }}
          {% else %}
            0
          {% endif %}
```


### 基于状态的光 - 为多段 WLED 灯创建全局光实体

此示例演示如何将来自同一 WLED 控制器的 2 个 RGBW 段组合成单个可用灯。


```yaml
template:
  - light:
        unique_id: 28208f257b54c44e50deb2d618d44710
        name: 多分段 WLED 控制
        state: "{{ states('light.wled_master') }}"
        level: "{{ state_attr('light.wled_master', 'brightness')|d(0,true)|int }}"
        rgbw: (
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[0]|d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[0]|d(0))/2 }},
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[1]|d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[1]|d(0))/2 }},
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[2]|d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[2]|d(0))/2 }},
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[3]|d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[3]|d(0))/2 }}
          )
        effect_list: "{{ state_attr('light.wled_segment_0', 'effect_list') }}"
        effect: "{{ state_attr('light.wled_segment_0', 'effect') if state_attr('light.wled_segment_0', 'effect') == state_attr('light.wled_segment_1', 'effect') else none }}"
        availability: "{{ not is_state('light.wled_master', 'unknown') }}"

        turn_on:
          action: light.turn_on
          entity_id: light.wled_segment_0, light.wled_segment_1, light.wled_master
        turn_off:
          action: light.turn_off
          entity_id: light.wled_master
        set_level:
          action: light.turn_on
          entity_id: light.wled_master
          data:
            brightness: "{{ brightness }}"
        set_rgbw:
          action: light.turn_on
          entity_id: light.wled_segment_0, light.wled_segment_1
          data:
            rgbw_color:
              - "{{ r }}"
              - "{{ g }}"
              - "{{ b }}"
              - "{{ w }}"
            effect: "Solid"
        set_effect:
          action: light.turn_on
          entity_id: light.wled_segment_0, light.wled_segment_1
          data:
            effect: "{{ effect }}"
```


## 锁

模板锁平台允许您使用模板创建锁​​来定义状态和脚本来定义每个操作。

可以从前端的 Helpers 部分或通过 YAML 创建锁定实体。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - lock:
      - name: 车库门
        state: "{{ is_state('sensor.door', 'on') }}"
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.door
        unlock:
          action: switch.turn_off
          target:
            entity_id: switch.door
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id: sensor.door
    lock:
      - name: 车库门
        state: "{{ trigger.to_state.state == 'on' }}"
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.door
        unlock:
          action: switch.turn_off
          target:
            entity_id: switch.door
```


### Configuration variables for `lock`
lock:
描述：锁列表
必填：真实
类型： 地图
  keys:
    code_format:
描述：定义一个模板来获取实体的 `code_format` 属性。该模板必须计算为有效的 [Python 正则表达式](https://docs.python.org/3/library/re.html#regular-expression-syntax) 或 `None`。如果计算结果不是 `None`，系统在执行锁相关操作时会提示你输入代码。输入代码会与正则表达式匹配，只有匹配成功时才会调用锁定/解锁操作。代码的实际有效性必须在这些操作中（或由这些操作调用的脚本中）进行校验。如果模板存在语法错误，该实体将不可用。如果模板因其他原因失败，或者正则表达式无法匹配，则不会接受任何代码，也不会调用锁定/解锁操作。
必填：假
类型：模板
默认值：无
    lock:
描述：定义锁被锁定时运行的操作。
必填：真实
类型：动作
    open:
描述：定义锁打开时要运行的操作。
必填：假
类型：动作
    optimistic:
描述：锁定定义是否工作在乐观模式的标志。启用后，当通过 UI 或操作新选择选项时，锁定的状态会立即更新，而消耗等待 `state` 中定义的模板更新。（取消）时，默认锁定仅在 `state` 模板返回新值时更新。
必填：假
类型：布尔值
默认值：假
    state:
描述：定义一个模板来设置锁定的状态。模板的有效输出值为 `locked`、`unlocked`、`open`、`locking`、`unlocking`、`opening` 和 `jammed`，它们直接映射到相应的状态。另外，`1`、`true`、`yes`、`on` 和 `enable` 可以作为​​ `locked` 的同义词，而`0`、`false`、`no`、`off` 和 `disable` 可作为​​ `unlocked` 的有效同义词。如果模板生成 `None` 值，则状态设置为 `unknown`。
必填：假
默认：乐观
类型：模板
    unlock:
描述：定义锁解锁时要运行的操作。
必填：真实
类型：动作

### 基于状态的锁 - 通过开关锁定

此示例显示了从交换机复制数据的锁。


```yaml
template:
  - lock:
      - name: 车库门
        state: "{{ is_state('switch.source', 'on') }}"
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.source
        unlock:
          action: switch.turn_off
          target:
            entity_id: switch.source
```


### 基于状态的锁 - 乐观模式

此示例显示了乐观模式下的锁。该锁在发出命令后立即更改状态，并且不等待来自传感器的状态更新。


```yaml
template:
  - lock:
      - name: 车库门
        state: "{{ is_state('sensor.skylight.state', 'on') }}"
        optimistic: true
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.source
        unlock:
          action: switch.turn_off
          target:
            entity_id: switch.source
```


### 基于状态的锁 - 传感器和两个开关

此示例显示了一个锁，它从传感器获取其状态，并使用两个瞬时开关来控制设备。


```yaml
template:
  - lock:
      - name: 车库门
        state: "{{ is_state('sensor.skylight.state', 'on') }}"
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        unlock:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_close
```


### 基于状态的锁 - 密码

示例显示了从交换机复制数据的锁。它需要定义为 [secret](/home-assistant/docs/configuration/secrets) 的 PIN 码才能解锁，用密码即可锁定。请注意，代码的实际效果检查是 `unlock` 操作的这一部分，并且应该始终在此处或从这些操作调用的脚本中进行。通过这种方式，您不仅可以静态针对值执行代码检查，还可以针对动态值执行代码检查（例如 TOTP）。


```yaml
template:
  - lock:
      - name: 车库门
        state: "{{ is_state('switch.source', 'on') }}"
        code_format: "{{ '\\d{4}' if is_state('switch.source', 'on') else None }}"
        lock:
          - action: switch.turn_on
            target:
              entity_id: switch.source
        unlock:
          - variables:
              pin: !secret garage_door_pin
          - condition: "{{ code|int == pin|int }}"
          - action: switch.turn_off
            target:
              entity_id: switch.source
```


在 `secrets.yaml` 中：


```yaml
garage_door_pin: "1234"
```


## 数字

模板数字平台允许您使用模板创建数字实体来定义状态和脚本来定义每个操作。

数字实体可以从前端的 Helpers 部分或通过 YAML 创建。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - number:
      - name: 书桌高度
        unit_of_measurement: "in"
        state: "{{ states('sensor.desk_height') }}"
        set_value:
          - action: script.set_desk_height
            data:
              value: "{{ value }}"
        step: 0.5
        min: 1
        max: 24
        icon: mdi:ruler
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id: sensor.desk_height
    number:
      - name: 书桌高度
        unit_of_measurement: "in"
        state: "{{ states('sensor.desk_height') }}"
        set_value:
          - action: script.set_desk_height
            data:
              value: "{{ value }}"
        step: 0.5
        min: 1
        max: 24
        icon: mdi:ruler
```


### Configuration variables for `number`
number:
描述：数字列表
必填：真实
类型： 地图
  keys:
    max:
描述：数字最大值的模板。
必填：假
类型：模板
默认值：100.0
    min:
描述：数字最小值的模板。
必填：假
类型：模板
默认值：0.0
    optimistic:
描述：定义该号码是否处于乐观模式下工作的标志。启用后，当通过 UI 或操作进行更改时，号码的状态会立即更新，而消耗等待 `state` 中定义的模板更新。取消（默认）时，仅当 `state` 模板返回新值时，数字才会更新。
必填：假
类型：布尔值
默认值：假
    set_value:
描述：定义当数值更改时要运行的操作。变量 `value` 包含输入的数字。
必填：真实
类型：动作
    state:
描述：数字当前值的模板。 快捷时，状态设置为 `set_value` 操作提供的 `value`。
必填：假
类型：模板
默认：乐观
    unit_of_measurement:
描述：定义数字的测量单位（如果有）。
必填：假
类型：字符串
默认值：无
    step:
描述：数字递增/递减步骤的模板。
必填：假
类型：模板
默认值：1.0


### 基于状态的数字 - 更改另一个数字的测量单位

此示例演示如何使用带有测量单位集的模板编号来更改另一个编号实体的无单位值。


```yaml
template:
  - number:
      - name: "切割高度"
        unit_of_measurement: "cm"
        unique_id: automower_cutting_height
        state: "{{ states('number.automower_cutting_height_raw')|int(0) * 0.5 + 1.5 }}"
        set_value:
          - action: number.set_value
            target:
              entity_id: number.automower_cutting_height_raw
            data:
              value: "{{ (value - 1.5) * 2 }}"
        step: 0.5
        min: 2
        max: 6
        icon: mdi:ruler
```


## 选择

模板选择平台允许您使用模板创建选择实体来定义状态和脚本来定义每个操作。

可以从 Helpers 部分的前端或通过 YAML 创建选择的实体。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - select:
      - name: 摄像头日夜模式
        state: "{{ state_attr('camera.porch', 'day_night_mode') }}"
        options: "{{ ['off', 'on', 'auto'] }}"
        select_option:
          - action: script.porch_camera_day_night_mode
            data:
              day_night_mode: "{{ option }}"
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id: camera.porch
        attribute: day_night_mode
    select:
      - name: 摄像头日夜模式
        state: "{{ state_attr('camera.porch', 'day_night_mode') }}"
        options: "{{ ['off', 'on', 'auto'] }}"
        select_option:
          - action: script.porch_camera_day_night_mode
            data:
              day_night_mode: "{{ option }}"
```


### Configuration variables for `select`
select:
描述：选择列表
必填：真实
类型： 地图
  keys:
    optimistic:
描述：定义是否选择在乐观模式下工作的标志。启用后，当通过 UI 或操作选择新选项时选择，的状态会立即更新，而消耗等待 `state` 中定义的模板更新。取消（默认）时，仅当 `state` 模板返回新值时，选择才会更新。
必填：假
类型：布尔值
默认值：假
    options:
描述：选择的可用选项的模板。
必填：真实
类型：模板
    select_option:
描述：定义要运行从 `options` 列表中选择选项的操作。变量 `option` 包含所选的选项。
必填：假
类型：动作
    state:
描述：选择当前值的模板。快捷时，状态设置为 `select_option` 操作提供的 `option`。
必填：假
类型：模板
默认：乐观

### 基于状态的选择 - 控​​制摄像机的日间/夜间模式

这显示了如何使用基于状态的模板选择来执行操作。


```yaml
template:
  select:
      - name: "门廊摄像头日夜模式"
      unique_id: porch_camera_day_night_mode
      state: "{{ state_attr('camera.porch_camera_sd', 'day_night_mode') }}"
      options: "{{ ['off', 'on', 'auto'] }}"
      select_option:
        - action: tapo_control.set_day_night_mode
          data:
            day_night_mode: "{{ option }}"
          target:
            entity_id: camera.porch_camera_sd
```


## 传感器

模板传感器平台允许您使用模板创建传感器来定义状态和属性。

传感器实体可以从前端的 Helpers 部分或通过 YAML 创建。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - sensor:
      - name: "Kettle"
        state: >
          {% if is_state('switch.kettle', 'off') %}
            off
          {% elif state_attr('switch.kettle', 'W')|float < 1000 %}
            standby
          {% elif is_state('switch.kettle', 'on') %}
            on
          {% else %}
            failed
          {% endif %}
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id: sensor.outside_temperature
        not_to:
        - unknown
        - unavailable
    sensor:
      - name: 室外温度
        device_class: temperature
        unit_of_measurement: °C
        state: "{{ (states('sensor.outside_temperature') | float - 32) * 5/9 }}"
```


### Configuration variables for `sensor`
sensor:
描述：传感器列表
必填：真实
类型：列表
  keys:
    attributes:
描述：定义实体属性的模板。
必填：假
类型： 地图
      keys:
“属性：模板”：
描述：属性和对应的模板。
必填：真实
类型：模板
    last_reset:
描述：“定义一个模板，描述传感器状态上次重置的时间。必须渲染为有效的 `datetime`。仅当 `state_class` 设置为 `total` 时可用”
必填：假
类型：模板
默认值：无
    state:
描述：“定义一个模板来获取传感器的状态。如果传感器是数字的，即有 `state_class` 或 `unit_of_measurement`，则状态模板必须渲染为数字或 `none`。状态模板不得渲染为字符串，包括 `unknown` 或 `unavailable`。可以定义 `availability` 来影响状态模板的渲染。”
必填：真实
类型：模板
    state_class:
描述：“传感器的 [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes)。这会根据用户的数字格式设置显示值，并影响历史可视化中图表按连续值显示。如果你希望将传感器纳入 长期统计，请包含此键并分配合适的值。”
必填：假
类型：字符串
默认值：无
    unit_of_measurement:
描述：“定义传感器的测量单位（如果有）。这还会根据用户配置文件数字格式设置显示值，并影响历史可视化中的图形呈现为连续值。”
必填：假
类型：字符串
默认值：无


### 基于状态的传感器 - 暴露的太阳角度

此示例显示前端的太阳角度。


```yaml
template:
  - sensor:
      - name: 太阳高度角
        unit_of_measurement: "°"
        state: "{{ '%+.1f'|format(state_attr('sun.sun', 'elevation')) }}"
```


### 基于状态的传感器 - 修改另一个传感器的输出

如果您不喜欢传感器输出的措辞，那么模板传感器也可以提供帮助。让我们以重命名 [太阳集成](/home-assistant/integrations/sun/) 的输出作为一个简单示例：


```yaml
template:
  - sensor:
      - name: "太阳状态"
        state: >
          {% if is_state('sun.sun', 'above_horizon') %}
            up
          {% else %}
            down
          {% endif %}
```


### 基于状态的传感器 - 更改另一个传感器的测量单位

使用模板传感器，如果测量单位不符合您的需求，可以轻松将给定值转换为其他值。
由于传感器对源传感器的状态进行数学计算并需要渲染为数值，因此使用可用性模板
如果源传感器没有有效的数字状态，则抑制状态模板的渲染。


```yaml
template:
  - sensor:
      - name: "Transmission 下载速度"
        unit_of_measurement: "kB/s"
        state: "{{ states('sensor.transmission_down_speed')|float * 1024 }}"
        availability: "{{ is_number(states('sensor.transmission_down_speed')) }}"

      - name: "Transmission 上传速度"
        unit_of_measurement: "kB/s"
        state: "{{ states('sensor.transmission_up_speed')|float * 1024 }}"
        availability: "{{ is_number(states('sensor.transmission_up_speed')) }}"
```


### 基于触发器的传感器 - 使用条件来控制更新

此示例演示如何存储温度传感器的最后一个有效值。只要源传感器具有有效（数字）状态，它就会更新。否则，模板传感器的状态保持不变。


```yaml
template:
  - triggers:
      trigger: state
      entity_id: sensor.outside_temperature
    conditions:
      - condition: template
        value_template: "{{ is_number(states('sensor.outside_temperature')) }}"
    sensor:
      - name: 室外温度最近已知值
        state: "{{ states('sensor.outside_temperature') }}"
```


## 开关

模板开关平台允许您使用模板创建开关来定义状态和脚本来定义每个操作。

可以从前端的 Helpers 部分或通过 YAML 创建开关实体。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - switch:
      - name: 天窗
        state: "{{ is_state('binary_sensor.skylight', 'on') }}"
        turn_on:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        turn_off:
          action: switch.turn_off
          target:
            entity_id: switch.skylight_close
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id: binary_sensor.skylight
    switch:
      - name: 天窗
        state: "{{ is_state('binary_sensor.skylight', 'on') }}"
        turn_on:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        turn_off:
          action: switch.turn_off
          target:
            entity_id: switch.skylight_close
```


### Configuration variables for `switch`
switch:
描述：开关列表
必填：真实
类型： 地图
  keys:
    optimistic:
描述：定义交换机是否工作在乐观模式的标志。启用后，当通过 UI 或操作新选择选项时，切换的状态会立即更新，而不再等待 `state` 中定义的模板更新。（取消）时，默认切换仅在 `state` 模板返回新值时更新。
必填：假
类型：布尔值
默认值：假
    state:
描述：定义一个模板来设置切换的状态。如果未定义，交换机乐观地假设所有命令都成功。如果模板计算结果为 `1`、`true`、`yes`、`on` 或 `enable`，则切换为 `on`。如果模板计算结果为 `0`、`false`、`no`、`off` 或 `disable`，则切换为 `off`。如果模板计算结果为 `0`、`false`、`no`、`off` 或 `disable`。 `None`，则开关为`unknown`。
必填：假
类型：模板
默认：乐观
    turn_off:
描述：定义开关关闭时要运行的操作或操作列表。
必填：真实
类型：动作
    turn_on:
描述：定义开关打开时要运行的操作或操作列表。
必填：真实
类型：动作


### 基于状态的开关 - 反转开关

此示例显示了一个与另一个开关相反的开关。


```yaml
template:
  - switch:
      - state: "{{ not is_state('switch.target', 'on') }}"
        availability: "{{ has_value('switch.target') }}"
        turn_on:
          action: switch.turn_off
          target:
            entity_id: switch.target
        turn_off:
          action: switch.turn_on
          target:
            entity_id: switch.target
```


### 基于状态的开关 - 拨动开关

此示例显示了一个从传感器获取状态并切换开关的开关。


```yaml
template:
  - switch:
      - name: "百叶窗"
        state: "{{ is_state_attr('switch.blind_toggle', 'sensor_state', 'on') }}"
        turn_on:
          action: switch.toggle
          target:
            entity_id: switch.blind_toggle
        turn_off:
          action: switch.toggle
          target:
            entity_id: switch.blind_toggle
```


### 基于状态的开关 - 传感器和两个开关

此示例显示了一个从传感器获取状态的开关，并使用两个
瞬时开关来控制设备。


```yaml
template:
  - switch:
      - name: "天窗"
        value_template: "{{ is_state('sensor.skylight', 'on') }}"
        turn_on:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        turn_off:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_close
```


### 基于状态的开关 - 乐观开关

此示例根据所执行的操作切换预设状态。该切换在 `turn_on`/`turn_off` 命令后立即更改状态。


```yaml
template:
  - switch:
      - name: "百叶窗"
        turn_on:
          action: switch.toggle
          target:
            entity_id: switch.blind_toggle
        turn_off:
          action: switch.toggle
          target:
            entity_id: switch.blind_toggle
```


## 更新

模板更新平台允许您使用模板创建更新实体来定义状态和脚本来定义安装操作。

可以从前端的 Helpers 部分或通过 YAML 创建更新实体。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - update:
      - name: Frigate 更新
        installed_version: "{{ states('sensor.installed_version') }}"
        latest_version: "{{ states('sensor.latest_version') }}"
        install:
          action: script.update_frigate
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: time
        at: "00:00:00"
    update:
      - name: Frigate 更新
        installed_version: "{{ states('sensor.installed_version') }}"
        latest_version: "{{ states('sensor.latest_version') }}"
        install:
          action: script.update_frigate
```


### Configuration variables for `vacuum`
update:
描述：更新实体列表
必填：真实
类型： 地图
  keys:
    backup:
默认值：假
描述：启用或禁用更新修复中的“更新前自动备份”选项。禁用后，`backup` 变量在 `install` 操作期间始终为 `False`，且不接受 `backup` 选项。
必填：假
类型：布尔值
    device_class:
描述：设置设备的类别，更改设备状态和 UI 上显示的图标。
必填：假
类型：设备类
默认值：无
    in_progress:
描述：定义一个模板来获取正在进行的状态。
必填：假
类型：模板
    install:
描述：定义安装更新时要运行的操作。启用时接收信号 `specific_version` 和 `backup`。
必填：假
类型：动作
    installed_version:
描述：定义一个模板来获取已安装的版本。当`installed_version`的值与`latest_version`的值匹配时，更新实体状态为`on`。
必填：真实
类型：模板
    latest_version:
描述：定义一个模板来获取最新版本。当`installed_version`的值与`latest_version`的值匹配时，更新实体状态为`on`。
必填：真实
类型：模板
    release_summary:
描述：定义一个模板来获取发布摘要。
必填：假
类型：模板
    release_url:
描述：定义获取发布URL的模板。
必填：假
类型：模板
    specific_version:
默认值：假
描述：启用或禁用将 `version` 器件与 `install` 操作一起使用。禁用时，`specific_version` 器件始终在 `install` 操作中提供 `None`。
必填：假
类型：布尔值
    title:
描述：定义一个模板来获取更新标题。
必填：假
类型：模板
    update_percent:
描述：定义获取更新完成百分比的模板。
必填：假
类型：模板

## 吸尘器

模板吸尘器平台允许你使用模板创建吸尘器实体，以定义状态，并使用脚本定义每个操作。

吸尘器实体可以从前端的 Helpers 部分或通过 YAML 创建。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - vacuum:
      - name: 客厅吸尘器
        start:
          action: script.vacuum_start
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id: sensor.living_room_vacuum_state
    vacuum:
      - name: 客厅吸尘器
        state: "{{ states('sensor.living_room_vacuum_state') }}"
        start:
          action: script.vacuum_start
```


### Configuration variables for `vacuum`
vacuum:
描述：真空实体列表
必填：真实
类型： 地图
  keys:
    attributes:
描述：定义实体属性的模板。
必填：假
类型： 地图
      keys:
“属性：模板”：
描述：属性和对应的模板。
必填：真实
类型：模板
    battery_level:
描述：“定义一个模板来获取真空吸尘器的电池电量。合法值是 `0` 和 `100` 之间的数字。”
必填：假
类型：模板
    clean_spot:
描述：定义当给真空吸尘器发出清洁点命令时要运行的操作。
必填：假
类型：动作
    fan_speed:
描述：定义一个模板来获取真空吸尘器的风扇速度。
必填：假
类型：模板
    fan_speeds:
描述：真空吸尘器支持的风扇速度列表。
必填：假
类型：[字符串，列表]
    locate:
描述：定义给真空吸尘器发出定位命令时要运行的操作。
必填：假
类型：动作
    optimistic:
描述：定义真空是否以乐观模式工作的标志。启用后，当通过 UI 或操作新选择选项时，真空吸尘器的状态会立即更新，而消耗等待 `state` 中定义的模板更新。取消（默认）时，真空仅模板在 `state` 返回新值时更新。
必填：假
类型：布尔值
默认值：假
    pause:
描述：定义真空暂停时要运行的操作。
必填：假
类型：动作
    return_to_base:
描述：定义当真空吸尘器收到返回基地命令时要运行的操作。
必填：假
类型：动作
    set_fan_speed:
描述：定义当真空吸尘器收到设置风扇速度的命令时要运行的操作。
必填：假
类型：动作
    start:
描述：定义真空启动时要运行的操作。
必填：真实
类型：动作
    state:
描述：“定义获取真空状态的模板。有效值：`docked`/`cleaning`/`idle`/`paused`/`returning`/`error`”
必填：假
默认：乐观
类型：模板
    stop:
描述：定义真空停止时要运行的操作。
必填：假
类型：动作

### 基于状态的吸尘器 - 使用 Harmony Hub 控制吸尘器

此示例展示了如何使用模板吸尘器来控制通过 [Harmony Hub 遥控器集成](/home-assistant/integrations/harmony) 操作的红外吸尘器。

```yaml
vacuum:
  - platform: template
    vacuums:
      living_room_vacuum:
        start:
          - action: remote.send_command
            target:
              entity_id: remote.harmony_hub
            data:
              command: Clean
              device: 52840686
        return_to_base:
          - action: remote.send_command
            target:
              entity_id: remote.harmony_hub
            data:
              command: Home
              device: 52840686
        clean_spot:
          - action: remote.send_command
            target:
              entity_id: remote.harmony_hub
            data:
              command: SpotCleaning
              device: 52840686
```

### 基于状态的吸尘器 - 自定义属性

此示例演示如何添加自定义属性。


```yaml
vacuum:
  - platform: template
    vacuums:
      living_room_vacuum:
        value_template: "{{ states('sensor.vacuum_state') }}"
        battery_level_template: "{{ states('sensor.vacuum_battery_level')|int }}"
        fan_speed_template: "{{ states('sensor.vacuum_fan_speed') }}"
        attribute_templates:
          status: >-
            {% if (states('sensor.robot_vacuum_robot_cleaner_movement') == "after" and states('sensor.robot_vacuum_robot_cleaner_cleaning_mode') == "stop")  %}
              充电后继续
            {% elif states('sensor.robot_vacuum_robot_cleaner_cleaning_mode') == "auto" %}
              清扫中
            {% else %}
              充电中
            {% endif %}
```


## 天气

模板天气平台允许您使用模板创建天气实体来定义状态和属性。

天气实体可以从前端的 Helpers 部分或通过 YAML 创建。


```yaml
# 基于状态的 configuration.yaml 示例
template:
  - weather:
      - name: "我的气象站"
        condition: "{{ states('weather.my_region') }}"
        temperature: "{{ states('sensor.temperature') | float }}"
        temperature_unit: "°C"
        humidity: "{{ states('sensor.humidity') | float }}"
        forecast_daily: "{{ state_attr('weather.my_region', 'forecast_data') }}"
```

```yaml
# 基于触发器的 configuration.yaml 示例
template:
  - triggers:
      - trigger: state
        entity_id:
        - weather.my_region
        - sensor.temperature
        - sensor.humidity
    weather:
      - name: "我的气象站"
        condition: "{{ states('weather.my_region') }}"
        temperature: "{{ states('sensor.temperature') | float }}"
        temperature_unit: "°C"
        humidity: "{{ states('sensor.humidity') | float }}"
        forecast_daily: "{{ state_attr('weather.my_region', 'forecast_data') }}"
```


### Configuration variables for `weather`
weather:
描述：天气实体列表
必填：真实
类型： 地图
  keys:
    apparent_temperature:
描述：当前的表观（感觉）温度。
必填：假
类型：模板
    cloud_coverage:
描述：当前的云覆盖范围。
必填：假
类型：模板
    condition:
描述：当前的天气状况。
必填：真实
类型：模板
    dew_point:
描述：当前露点。
必填：假
类型：模板
    forecast_daily:
描述：每日预测数据。
必填：假
类型：模板
    forecast_hourly:
描述：每小时预测数据。
必填：假
类型：模板
    forecast_twice_daily:
描述：每日两次预测数据。
必填：假
类型：模板
    humidity:
描述：当前湿度。
必填：真实
类型：模板
    ozone:
描述：当前臭氧水平。
必填：假
类型：模板
    precipitation_unit:
描述：降水输出单位。有效选项为 km、mi、ft、m、cm、mm、in、yd。
必填：假
类型：字符串
    pressure:
描述：当前气压。
必填：假
类型：模板
    pressure_unit:
描述：压力_模板输出的单位。有效选项包括 Pa、hPa、kPa、bar、cbar、mbar、mmHg、inHg、psi。
必填：假
类型：字符串
    temperature:
描述：当前温度。
必填：真实
类型：模板
    temperature_unit:
描述：温度_模板输出的单位。有效选项为 °C、°F 和 K。
必填：假
类型：字符串
    uv_index:
描述：当前的紫外线指数。
必填：假
类型：模板
    visibility:
描述：当前可见性。
必填：假
类型：模板
    visibility_unit:
描述：visibility_template 输出的单位。有效选项为 km、mi、ft、m、cm、mm、in、yd。
必填：假
类型：字符串
    wind_gust_speed:
描述：当前阵风速度。
必填：假
类型：模板
    wind_speed:
描述：当前风速。
必填：假
类型：模板
    wind_speed_unit:
描述：wind_speed_template 输出的单位。有效选项包括 m/s、km/h、mph、mm/d、in/d 和 in/h。
必填：假
类型：字符串
    wind_bearing:
描述：当前风向。
必填：假
类型：模板


### 天气预报数据

天气预报相关选项应返回一个字典列表。列表中的每个字典都包含对应时间段的[预报信息](https://www.home-assistant.io/integrations/weather/#action-weatherget_forecasts)。不同预测类型的数据要求不同：`hourly`、`daily` 和 `twice_daily`。

#### 每小时天气预报

`hourly` 预测应包含 24 个字典，每个字典表示接下来 24 小时中的 1 个小时。`hourly` 数据应从当前时间开始，覆盖之后 24 小时。每个字典中的 `datetime` 应表示你本地时区该小时的开始时间。

#### 每日天气预报

`daily` 预测应包含多个字典，每个字典表示所选时间范围中的某一天。`daily` 数据应从今天午夜开始，到所需时间范围的最后一天结束，并按 1 天递增。每个字典中的 `datetime` 应表示你本地时区当天的午夜。

#### 每日两次天气预报

`twice_daily` 预测应包含多个字典，每个字典表示所需时间范围内的 12 小时时段。`twice_daily` 数据应从最接近当前时间的 12 小时时段开始，到所需范围内最后一个 12 小时时段结束。每个字典中的 `datetime` 应表示你本地时区的午夜或中午。请记住，`twice_daily` 预测中的每个字典都可以使用 `is_daytime`。

### 基于触发器的天气 - 来自响应数据的天气预报

此示例演示如何通过 `action` 调用 [带响应数据的操作](/home-assistant/docs/scripts/perform-actions/#use-templates-to-handle-response-data)，并在模板中使用响应数据。


```yaml
template:
  - triggers:
      - trigger: time_pattern
        hours: /1
    actions:
      - action: weather.get_forecasts
        data:
          type: hourly
        target:
          entity_id: weather.home
        response_variable: hourly
    sensor:
      - name: 每小时天气预报
        unique_id: weather_forecast_hourly
        state: "{{ now().isoformat() }}"
        attributes:
          forecast: "{{ hourly['weather.home'].forecast }}"
```


#### 视频教程

本视频教程介绍了如何设置基于触发器的模板，该模板利用操作来检索天气预报（降水）。

<lite-youtube videoid="zrWqDjaRBf0" videotitle="如何在 Home Assistant 中创建基于操作的模板传感器" posterquality="maxresdefault"></lite-youtube>

## 组合多个模板实体

模板集成允许你定义多个配置块。

```yaml
# 含两个配置块的 configuration.yaml 示例
template:
  # 定义基于状态的模板实体
  - sensor:
      ...
  - binary_sensor:
      ...

  # 定义基于触发器的模板实体
  - triggers:
      ...
    sensor:
      ...
    binary_sensor:
      ...
```

[trigger-doc]: /docs/automation/trigger

<a id="trigger-based-sensor-and-binary-sensor-storing-webhook-information"></a>

### 基于触发器的传感器和二进制传感器：存储 Webhook 信息

你可以使用任意自动化触发器（包括 Webhook 触发器）来更新模板实体。基于触发器的模板实体非常适合把 Webhook 数据保存到实体状态中。


```yaml
template:
  - triggers:
      - trigger: webhook
        webhook_id: my-super-secret-webhook-id
    sensor:
      - name: "Webhook 温度"
        state: "{{ trigger.json.temperature }}"
        unit_of_measurement: °C

      - name: "Webhook 湿度"
        state: "{{ trigger.json.humidity }}"
        unit_of_measurement: %

    binary_sensor:
      - name: "Motion"
        state: "{{ trigger.json.motion }}"
        device_class: motion
```


你可以使用以下 `curl` 命令测试这些触发器实体：

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"temperature": 5, "humidity": 34, "motion": true}' \
  http://homeassistant.local:8123/api/webhook/my-super-secret-webhook-id
```

## 模板和操作变量

基于状态和基于触发器的模板实体，都可以在模板和操作中使用特殊变量 `this`。`this` 是该实体当前的 [状态对象](/home-assistant/docs/configuration/state_object)，可用于在模板或操作中进行 [自引用](#自引用)。基于触发器的实体还可以访问 [触发器数据](/home-assistant/docs/automation/templating/)。

:::note
在渲染模板并计算新状态之前，`this` 中包含的是实体的旧状态和旧属性。

:::
### 自引用

此示例演示如何在模板中使用 `this` 变量进行自引用。


```yaml
template:
  - sensor:
      - name: 测试
        state: "{{ this.attributes.test | default('缺失时的值') }}"
        # 不建议: "{{ state_attr('sensor.test', 'test') }}"
        attributes:
          test: "{{ now() }}"
```


## 乐观模式

对于可交互的模板实体（如 `number` 和 `select`），你可以将 `optimistic` 设置为 `true` 以启用乐观模式。这会影响实体状态的更新方式：

- **关闭乐观模式（默认）**：当你与实体交互时（如选择新选项或设置新数值），Home Assistant 中的实体状态只有在 `state` 模板返回新值后才会更新。

- **开启乐观模式**：当你与实体交互时，Home Assistant 中的实体状态会立即更新，不会等待 `state` 模板更新。这样 UI 响应更快，但如果操作失败或执行较慢，状态可能会暂时与真实设备状态不一致。

乐观模式在以下情况下特别有用：

- 底层系统不会立即反馈
- 你希望获得更灵敏的 UI 体验
- 你对操作成功率有较高信心

关闭乐观模式（默认）可以获得更高准确性，但 UI 响应速度可能更慢，因为实体要等到底层系统确认后才更新。

## 速率限制更新

当模板中未显式定义触发器时，只要模板引用的任意实体状态发生变化，模板就会重新渲染。为避免过度占用 Home Assistant 资源，系统会在检测到高频更新时自动施加速率限制。

:::tip
定义 <a href='#trigger-based-template-sensors'>触发器</a> 可以避免速率限制，并更精确地控制实体更新时间。

:::
当模板直接使用 `states` 遍历系统全部状态时，只要任意状态发生变化，模板都可能被重新渲染。若仅统计状态数量，则只会在系统新增或删除状态时重新渲染。在拥有大量实体、且每天有大量状态变更事件的系统中，这类模板的渲染频率可能会非常高。

在下面的示例中，重新渲染仅限于每分钟一次，因为我们迭代所有可用实体：


```yaml
template:
  - binary_sensor:
      - name: "存在不可用状态"
        state: "{{ states | selectattr('state', 'in', ['unavailable', 'unknown', 'none']) | list | count }}"
```


在下面的示例中，重新渲染仅限于每秒一次，因为我们迭代单个域（传感器）中的所有实体：


```yaml
template:
  - binary_sensor:
      - name: "存在不可用状态"
        state: "{{ states.sensor | selectattr('state', 'in', ['unavailable', 'unknown', 'none']) | list | count }}"
```


如果模板访问系统中的全部状态，会应用“每分钟一次”的速率限制。如果模板访问某个域下的全部状态，会应用“每秒一次”的速率限制。如果模板只访问特定实体状态、接收特定引用实体的更新事件，或使用 `homeassistant.update_entity` 操作，则不会应用速率限制。

## 注意事项

### 启动

如果你引用的平台实体在启动时可能暂不可用，模板传感器可能会得到 `unknown`。为避免这种情况，请在模板中使用 `states()`。例如，将 `{{ states.sensor.moon.state }}` 替换为 `{{ states('sensor.moon') }}`。

`is_state()` 也同理。应将 `{{ states.switch.source.state == 'on' }}` 替换为始终返回 `true`/`false` 的等效写法：


```yaml
{{ is_state('switch.source', 'on') }}
```


## 使用蓝图

如果你刚接触模板，建议先从模板蓝图开始。蓝图是社区提供的现成模板实体方案，你只需填写参数即可使用。

每个蓝图都描述了如何创建一种模板实体，但你可以基于同一个蓝图创建多个实体。

要基于蓝图创建第一个模板实体，请打开 `configuration.yaml` 并添加：

```yaml
# 基于 config/blueprints/homeassistant/inverted_binary_sensor.yaml 的 configuration.yaml 模板实体示例
template:
  - use_blueprint:
      path: homeassistant/inverted_binary_sensor.yaml # 相对于 config/blueprints/template/
      input:
        reference_entity: binary_sensor.foo
    name: Inverted foo
    unique_id: inverted_foo
```

查看蓝图定义可以发现，它声明了一个输入参数（`reference_entity`），需要 `binary_sensor` 实体 ID。基于此蓝图创建实体时，你需要为该参数提供具体实体。

### 导入蓝图

Home Assistant 可以从 Home Assistant 社区论坛、GitHub 和 GitHub Gist 导入蓝图。

1. 要导入蓝图，先[找到想要导入的蓝图][blueprint-forums]。
2. 如果你只是想练习导入，可以使用以下 URL：

      ```text
      https://github.com/home-assistant/core/blob/dev/homeassistant/components/template/blueprints/inverted_binary_sensor.yaml
      ```

3. 将文件下载到 `config/blueprints/template/<来源或作者>/<蓝图名称>.yaml`。
4. 使用与上面类似的配置，基于刚导入的蓝图创建新的模板实体。
5. 确保填写所有必填输入。

该蓝图现在可用于创建模板实体。

[blueprint-forums]: /get-blueprints

## `event_template_reloaded` 事件

当模板实体被重新加载，且实体可能已发生变化时，会触发 `event_template_reloaded` 事件。

此事件没有其他数据。

## 旧版模板弃用迁移指南

旧版模板实体已弃用，并计划在 Home Assistant 2026.6.0 移除。对于已弃用的模板实体，系统会生成修复项并引导你完成迁移。

### 将旧传感器迁移到新的模板部分

本示例演示如何将旧版模板传感器迁移到新语法。

以下以 `configuration.yaml` 为例。


```yaml
# configuration.yaml
sensor:
  # SNMP 配置
  - platform: snmp
    host: 192.168.1.32
    baseoid: 1.3.6.1.4.1.2021.10.1.3.1

  # 旧版模板配置
  - platform: template
    sensors:
      my_light_count:
        friendly_name: 开启的灯总数
        unique_id: sa892hfa9sdf8
        value_template: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
```


迁移步骤：

1. 从 `configuration.yaml` 的 `sensor:` 部分删除旧版模板定义。
2. 删除以下 YAML：


```yaml
# 旧版模板配置
- platform: template
  sensors:
    my_light_count:
      friendly_name: 开启的灯总数
      unique_id: sa892hfa9sdf8
      value_template: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
```


3. 保留 `sensor:` 下其他平台配置。修改后 `configuration.yaml` 如下：

```yaml
# configuration.yaml
sensor:
  # SNMP 配置
  - platform: snmp
    host: 192.168.1.32
    baseoid: 1.3.6.1.4.1.2021.10.1.3.1
```

4. 添加修复项提供的新语法。

修复项通常会提供如下 YAML：


```yaml
template:
  - sensor:
      - default_entity_id: sensor.my_light_count
        name: 开启的灯总数
        unique_id: sa892hfa9sdf8
        state: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
```


5. 将该 YAML 添加到 `configuration.yaml` 的 `template:` 部分。


```yaml
# configuration.yaml
sensor:
  # SNMP 配置
  - platform: snmp
    host: 192.168.1.32
    baseoid: 1.3.6.1.4.1.2021.10.1.3.1

template:
  # 迁移后的模板传感器
  - sensor:
      - default_entity_id: sensor.my_light_count
        name: 开启的灯总数
        unique_id: sa892hfa9sdf8
        state: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
```


如果要迁移多个模板实体，请确保只保留一个 `template:` 段，不要重复定义。


```yaml
# configuration.yaml
sensor:
  # SNMP 配置
  - platform: snmp
    host: 192.168.1.32
    baseoid: 1.3.6.1.4.1.2021.10.1.3.1

template:
  # 已迁移的传感器
  - sensor:
      - default_entity_id: sensor.my_light_count
        name: 开启的灯总数
        unique_id: sa892hfa9sdf8
        state: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"

  # 已迁移的盖板
  - cover:
      - default_entity_id: cover.garage
        name: 车库盖板
        state: "{{ is_state('binary_sensor.relay', 'on') }}"

  # 已迁移的灯光
  - light:
      - default_entity_id: light.skylight
        name: 天窗
        state: "{{ is_state('binary_sensor.crank', 'on') }}"
```


6. 通过 **设置** 右上角三点菜单选择 **重新启动 Home Assistant**，或前往 [**设置** > **开发者工具** > **YAML**](https://my.home-assistant.io/redirect/server_controls/)，选择 **模板实体** 的重新加载按钮。

### 将旧传感器迁移到现有模板部分

本示例演示如何把旧版模板传感器迁移到已有的 `template:` 段中。

以下以 `configuration.yaml` 为例。


```yaml
# configuration.yaml
sensor:
  # SNMP 配置
  - platform: snmp
    host: 192.168.1.32
    baseoid: 1.3.6.1.4.1.2021.10.1.3.1

  # 旧版模板配置
  - platform: template
    sensors:
      my_light_count:
        friendly_name: 开启的灯总数
        unique_id: sa892hfa9sdf8
        value_template: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"

template:
  # 现有新语法模板
  - binary_sensor:
      - name: 外面很亮
        state: "{{ states('sensor.lux_value') | float(0) > 10 }}"
```


迁移步骤：

1. 从 `configuration.yaml` 的 `sensor:` 部分删除旧版模板定义。
2. 删除以下 YAML：


    ```yaml
    # 旧版模板配置
    - platform: template
      sensors:
        my_light_count:
          friendly_name: 开启的灯总数
          unique_id: sa892hfa9sdf8
          value_template: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
      ```


3. 保留 `sensor:` 下其他平台配置。修改后 `configuration.yaml` 如下：


    ```yaml
    # configuration.yaml
    sensor:
      # SNMP 配置
      - platform: snmp
        host: 192.168.1.32
        baseoid: 1.3.6.1.4.1.2021.10.1.3.1

    template:
      # 现有新语法模板
      - binary_sensor:
          - name: 外面很亮
            state: "{{ states('sensor.lux_value') | float(0) > 10 }}"
    ```


4. 添加修复项提供的新语法。

修复项通常会提供如下 YAML：


    ```yaml
    template:
      - sensor:
          - default_entity_id: sensor.my_light_count
            name: 开启的灯总数
            unique_id: sa892hfa9sdf8
            state: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
    ```


5. 将该 YAML 添加到 `configuration.yaml` 的 `template:` 部分。


    ```yaml
    # configuration.yaml
    sensor:
      # SNMP 配置
      - platform: snmp
        host: 192.168.1.32
        baseoid: 1.3.6.1.4.1.2021.10.1.3.1

    template:
      # 现有新语法模板
      - binary_sensor:
          - name: 外面很亮
            state: "{{ states('sensor.lux_value') | float(0) > 10 }}"

      # 新增迁移后的模板传感器
      - sensor:
          - default_entity_id: sensor.my_light_count
            name: 开启的灯总数
            unique_id: sa892hfa9sdf8
            state: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
    ```


本示例中，`configuration.yaml` 已存在 `template:` 段。复制 YAML 时，请避免重复新增 `template:`。

6. 通过 **设置** 右上角三点菜单选择 **重新启动 Home Assistant**，或前往 [**设置** > **开发者工具** > **YAML**](https://my.home-assistant.io/redirect/server_controls/)，选择 **模板实体** 的重新加载按钮。

### 将传感器从包含文件迁移到模板包含文件

本示例演示当传感器定义位于 `sensors.yaml`（通过 `!include` 引入）时，如何迁移旧版模板传感器。

假设配置拆分为 3 个文件：`configuration.yaml`、`sensors.yaml` 和 `templates.yaml`。

```yaml
# configuration.yaml
sensor: !include sensors.yaml
template: !include templates.yaml
```


```yaml
# sensors.yaml

# SNMP 配置
- platform: snmp
  host: 192.168.1.32
  baseoid: 1.3.6.1.4.1.2021.10.1.3.1

# 旧版模板配置
- platform: template
  sensors:
    my_light_count:
      friendly_name: 开启的灯总数
      unique_id: sa892hfa9sdf8
      value_template: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
```


```yaml
# templates.yaml

# 现有新语法模板
- binary_sensor:
  - name: 外面很亮
    state: "{{ states('sensor.lux_value') | float(0) > 10 }}"
```


迁移步骤：

1. 从 `sensors.yaml` 删除旧版模板定义。
2. 删除以下 YAML：


    ```yaml
    # 旧版模板配置
    - platform: template
      sensors:
        my_light_count:
          friendly_name: 开启的灯总数
          unique_id: sa892hfa9sdf8
          value_template: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
      ```


3. 保留 `sensors.yaml` 中其他平台配置。修改后内容如下：


    ```yaml
    # sensors.yaml

    # SNMP 配置
    - platform: snmp
      host: 192.168.1.32
      baseoid: 1.3.6.1.4.1.2021.10.1.3.1
    ```

4. 添加修复项提供的新语法。

修复项通常会提供如下 YAML：

  
    ```yaml
    template:
      - sensor:
          - default_entity_id: sensor.my_light_count
            name: 开启的灯总数
            unique_id: sa892hfa9sdf8
            state: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
    ```

  

5. 将上述 YAML 添加到 `templates.yaml`。


    ```yaml
    # templates.yaml

    # 现有新语法模板
    - binary_sensor:
      - name: 外面很亮
        state: "{{ states('sensor.lux_value') | float(0) > 10 }}"

    # 新增迁移后的模板传感器
    - sensor:
      - default_entity_id: sensor.my_light_count
        name: 开启的灯总数
        unique_id: sa892hfa9sdf8
        state: "{{ states.light | selectattr('state', 'eq', 'on') | list | count }}"
    ```


本示例中，`configuration.yaml` 已包含 `template: !include templates.yaml`。复制 YAML 时，请不要在 `templates.yaml` 内再加一层 `template:`。

6. 通过 **设置** 右上角三点菜单选择 **重新启动 Home Assistant**，或前往 [**设置** > **开发者工具** > **YAML**](https://my.home-assistant.io/redirect/server_controls/)，选择 **模板实体** 的重新加载按钮。
