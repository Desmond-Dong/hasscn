---
title: 执行动作
description: '各种集成允许在特定事件发生时执行动作。最常见的是在自动化触发时执行动作。但动作也可以从脚本、仪表盘或通过 Amazon Echo 等语音命令设备调用。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 执行动作

各种集成允许在特定事件发生时执行动作。最常见的是在自动化触发时执行动作。但动作也可以从脚本、仪表盘或通过 Amazon Echo 等语音命令设备调用。

执行动作的配置选项在所有集成中都是相同的，并在此页面上进行说明。

本页面上的示例将作为自动化集成配置的一部分给出，但其他集成也可以使用不同的方法。

:::tip
使用 [**设置** > **开发者工具** > **动作**](https://my.home-assistant.io/redirect/developer_services/) 下的 **动作** 标签页来发现可用的动作。
:::

### 基础知识

对实体 `group.living_room` 执行动作 `homeassistant.turn_on`。这将打开 `group.living_room` 的所有成员。你也可以使用 `entity_id: all`，它将打开所有可能的实体。

```yaml
action: homeassistant.turn_on
target:
  entity_id: group.living_room
```

### 目标区域和设备

除了针对实体，你还可以针对区域或设备。或者这些的组合。
这通过 `target` 键完成。

`target` 是一个映射，包含以下至少一项：`area_id`、`device_id`、`entity_id`。
每一项都可以是一个列表。值应为小写。

以下示例使用单个动作打开客厅区域、2 个额外的灯光设备和 2 个额外的灯光实体：

```yaml
action: light.turn_on
target:
  area_id: living_room
  device_id:
    - ff22a1889a6149c5ab6327a8236ae704
    - 52c050ca1a744e238ad94d170651f96b
  entity_id:
    - light.hallway
    - light.landing
```

### 向动作传递数据

除了要针对的实体之外，你还可以指定其他参数。例如，`light.turn_on` 动作允许指定亮度。

```yaml
action: light.turn_on
target:
  entity_id: group.living_room
data:
  brightness: 120
  rgb_color: [255, 0, 0]
```

动作参数的完整列表可以在每个集成的文档页面上找到，就像 `light.turn_on` [动作](/home-assistant/integrations/light/#action-lightturn_on) 一样。

### 使用模板决定要执行的动作

你可以使用 [模板][templating] 支持来动态选择要执行的动作。例如，你可以根据灯光是否开启来执行特定动作。

```yaml
action: >
  {% if states('sensor.light_level')|float < 10 %}
    switch.turn_on
  {% else %}
    switch.turn_off
  {% endif %}
entity_id: switch.ac
```

### 使用动作开发者工具

你可以使用 **动作** 开发者工具来测试要传递给动作的数据。
例如，你可以测试打开或关闭一个"组"（详见 [群组](/home-assistant/integrations/group/)）

要打开或关闭一个组，传递以下信息：

- 域：`homeassistant`
- 动作：`turn_on`
- 动作数据：`{ "entity_id": "group.kitchen" }`

### 使用模板确定属性

模板也可用于传递给动作的数据。

```yaml
action: thermostat.set_temperature
target:
  entity_id: >
    {% if is_state('sensor.upstairs_occupied', 'true') %}
      thermostat.upstairs
    {% else %}
      thermostat.downstairs
    {% endif %}
data:
  temperature: "{{ states('sensor.target_temp') }}"
```

你也可以使用返回原生字典的模板，这在要设置的属性取决于情况时非常有用。

```yaml
action: climate.set_temperature
data: >
  {% if states('sensor.upstairs_occupied') == 'true' %}
    {"hvac_mode": "heat", "temperature": 19 }
  {% else %}
    {"hvac_mode": "auto" }
  {% endif %}
```

### 使用模板处理响应数据

某些动作可能会响应可在自动化中使用的数据。此数据称为_动作响应数据_。动作响应数据通常用于动态或较大的数据，这些数据可能不适合用于实体状态。
动作响应数据的示例包括下周的日历事件或详细的驾驶路线。

模板也可用于处理响应数据。动作可以指定一个 `response_variable`。这是包含响应数据的[变量](/home-assistant/docs/scripts/#variables)。你可以为 `response_variable` 定义任何名称。此示例执行一个动作并将响应存储在名为 `agenda` 的变量中。

```yaml
action: calendar.get_events
target:
  entity_id: calendar.school
data:
  duration:
    hours: 24
response_variable: agenda
```

然后，你可以在同一脚本中的另一个动作中使用变量 `agenda` 中的响应数据。以下示例使用响应数据发送通知。

:::important
动作中可以使用哪些数据字段取决于所使用的通知类型。
:::

```yaml
action: notify.gmail_com
data:
  target: "gduser1@workspacesamples.dev"
  title: "{{ now().date() }} 的每日日程"
  message: >-
    您今天的日程：
    <p>
    {% for event in agenda['calendar.school'].events %}
      {{ event.start }}: {{ event.summary }}<br>
    {% endfor %}
    </p>
```

### `homeassistant` 动作

有四个 `homeassistant` 动作不绑定到任何单一域，它们是：

- `homeassistant.turn_on` - 打开一个实体（支持被打开），如 `automation` 或 `switch`。
- `homeassistant.turn_off` - 关闭一个实体（支持被关闭），如 `automation` 或 `switch`。
- `homeassistant.toggle` - 关闭一个已打开的实体，或打开一个已关闭的实体（支持被打开和关闭）
- `homeassistant.update_entity` - 请求实体的更新，而不是等待下一个计划更新，例如 [Google 行程时间][Google travel time] 传感器、[模板传感器][template sensor] 或 [灯光]

完整的动作详细信息和示例可以在 [Home Assistant integrations][homeassistant-integrations-动作] 页面上找到。

[templating]: /docs/configuration/templating/
[Google 行程时间]: /integrations/google_travel_time/
[模板传感器]: /integrations/template/
[灯光]: /integrations/light/
[homeassistant-integrations-动作]: /integrations/homeassistant#actions
