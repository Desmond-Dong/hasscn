---
title: Input select
description: 'Input select 集成允许您定义一个可通过前端选择的值列表，并可在自动化条件中使用。当您选择新项目时，会生成状态变化事件。该状态事件可用作 automation 触发器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Automation
  - Helper
ha_release: 0.13
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_select
ha_integration_type: helper
---
# Input select

**Input select** 集成允许您定义一个可通过前端选择的值列表，并可在自动化条件中使用。当您选择新项目时，会生成状态变化事件。该状态事件可用作 `automation` 触发器。

配置输入选择的首选方式是通过用户界面：前往 **[Settings > Devices & services > Helpers](https://my.home-assistant.io/redirect/helpers/)**。选择添加按钮，然后选择 **[Dropdown](https://my.home-assistant.io/redirect/config_flow_start/?domain=input_select)** 选项。

要通过用户界面添加 **Helpers**，您的 "`configuration.yaml`" 中应包含 `default_config:`。除非您手动删除，否则默认情况下它已经存在。
如果您已从配置中移除了 `default_config:`，则必须先将 `input_select:` 添加到您的 `configuration.yaml` 中，然后才能使用 UI。

输入选择也可以通过 "`configuration.yaml`" 配置：

```yaml
# configuration.yaml 示例条目
input_select:
  who_cooks:
    name: Who cooks today
    options:
      - Paulus
      - Anne Therese
    initial: Anne Therese
    icon: mdi:panda
  living_room_preset:
    options:
      - Visitors
      - Visitors with kids
      - Home Alone
```

```yaml
  input_select:
    description: 输入的别名。允许多个条目。
    required: true
    type: map
    keys:
      options:
        description: 可供选择的选项列表。
        required: true
        type: list
      name:
        description: 输入的友好名称。
        required: false
        type: string
      initial:
        description: Home Assistant 启动时的初始值。
        required: false
        type: map
        default: options 的第一个元素
      icon:
        description: 在前端输入元素前显示的图标。
        required: false
        type: icon
```

:::note
由于 YAML 会将某些值视为等效的[布尔值](https://yaml.org/type/bool.html)，因此如果将 `On`、`Yes`、`Y`、`Off`、`No` 或 `N` 的任意大小写形式用作选项名称，除非用引号包裹，否则它们会被替换为 `True` 和 `False`。

:::
### 恢复状态

如果您为 `initial` 设置了有效值，此集成启动时会使用该值作为状态。否则，它会恢复 Home Assistant 停止前的状态。

### 操作

此集成提供多个操作来修改 `input_select` 的状态。

| Action          | Data                        | Description                                           |
| --------------- | --------------------------- | ----------------------------------------------------- |
| `select_option` | `option`                    | 可用于选择特定选项。                                  |
| `set_options`   | `options`<br>`entity_id(s)` | 设置特定 `input_select` 实体的选项。                  |
| `select_first`  |                             | 选择第一个选项。                                      |
| `select_last`   |                             | 选择最后一个选项。                                    |
| `reload`        |                             | 重新加载 `input_select` 配置                          |

#### Action `input_select.select_next`

选择下一个选项。

| Data attribute | Optional | Description                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------- |
| `cycle`                | yes      | 是否在最后一个值之后循环回到第一个值。默认值：`true`                |

#### Action `input_select.select_previous`

选择上一个选项。

| Data attribute | Optional | Description                                                          |
| ---------------------- | -------- | -------------------------------------------------------------------- |
| `cycle`                | yes      | 是否在第一个值之前循环到最后一个值。默认值：`true`                  |

### 场景

在 [Scene](/home-assistant/integrations/scene/) 中指定目标选项很简单：

```yaml
# configuration.yaml 示例条目
scene:
  - name: Example1
    entities:
      input_select.who_cooks: Paulus
```

选项列表也可以在 [Scene](/home-assistant/integrations/scene) 中设置。此时，您还需要指定新的状态值。

```yaml
# configuration.yaml 示例条目
scene:
  - name: Example2
    entities:
      input_select.who_cooks:
        options:
          - Alice
          - Bob
          - Paulus
        state: Bob
```


## 自动化示例

以下示例展示了如何在自动化中使用 `input_select.select_option` 操作：

```yaml
# configuration.yaml 示例条目
automation:
  - alias: "example automation"
    triggers:
      - trigger: event
        event_type: MY_CUSTOM_EVENT
    actions:
      - action: input_select.select_option
        target:
          entity_id: input_select.who_cooks
        data:
          option: "Paulus"
```

要动态设置 `input_select` 的选项，您可以在自动化中调用 `input_select.set_options`：

```yaml
# configuration.yaml 示例条目
automation:
  - alias: "example automation"
    triggers:
      - trigger: event
        event_type: MY_CUSTOM_EVENT
    actions:
      - action: input_select.set_options
        target:
          entity_id: input_select.who_cooks
        data:
          options: ["Item A", "Item B", "Item C"]
```

下面展示了一个双向使用 `input_select` 的示例：它既可由 MQTT 自动化操作设置，也可反过来控制 MQTT。


```yaml
# 在自动化操作中使用 `input_select` 的 configuration.yaml 示例条目
   
# 定义 input_select
input_select:
  thermostat_mode:
    name: Thermostat Mode
    options:
      - "auto"
      - "off"
      - "cool"
      - "heat"
    icon: mdi:target

# 自动化。
# 当通过 MQTT 保留主题 `thermostatMode` 收到值时，此自动化脚本会运行
# 它会设置界面中的值选择器。该选择器在值变化时也有自己的自动化。
- alias: "Set Thermostat Mode Selector"
  triggers:
    - trigger: mqtt
      topic: "thermostatMode"
   # entity_id: input_select.thermostat_mode
  actions:
    - action: input_select.select_option
      target:
        entity_id: input_select.thermostat_mode
      data:
        option: "{{ trigger.payload }}"

# 当温控器模式选择器发生变化时，此自动化脚本会运行。
# 它会将自己的值发布到同一个已订阅的 MQTT 主题。
- alias: "Set Thermostat Mode"
  triggers:
    - trigger: state
      entity_id: input_select.thermostat_mode
  actions:
    - action: mqtt.publish
      data:
        topic: "thermostatMode"
        retain: true
        payload: "{{ states('input_select.thermostat_mode') }}"
```


