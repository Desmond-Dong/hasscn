---
title: "模板"
description: "关于如何使用 Home Assistant 模板功能的说明。"
---

这是 Home Assistant 的一项高级功能。你需要对以下内容有基本了解：

- [Home Assistant 架构](/home-assistant/developers/architecture/)，尤其是状态相关概念。
- [状态对象](/home-assistant/topics/state_object/)。

模板是一项强大的功能，可让您控制进出系统的信息。它用于：

- 例如，在 [notify](/home-assistant/integrations/notify/) 平台和 [Alexa](/home-assistant/integrations/alexa/) 集成中格式化输出消息。
- 处理来自原始数据源的数据，例如 [MQTT](/home-assistant/docs/configuration/templating/#using-templates-with-the-mqtt-integration)、[`rest` 传感器](/home-assistant/integrations/rest/) 或 [`command_line` 传感器](/home-assistant/integrations/sensor.command_line/)。
- [自动化模板](/home-assistant/docs/automation/templating/)。

## 模板基础

Home Assistant 中的模板由 [Jinja2](https://palletsprojects.com/p/jinja) 模板引擎提供支持。这意味着你需要使用 Jinja2 语法，同时也可以使用 Home Assistant 在渲染过程中额外提供的一些自定义功能。Jinja2 支持多种操作：

- [数学运算](https://jinja.palletsprojects.com/en/latest/templates/#math)
- [比较运算](https://jinja.palletsprojects.com/en/latest/templates/#comparisons)
- [逻辑运算](https://jinja.palletsprojects.com/en/latest/templates/#logic)

这里不再重复讲解语法基础，因为 Jinja2 官方的[模板文档](https://jinja.palletsprojects.com/en/latest/templates/)已经写得很好。

可以使用模板编辑器来开发和调试模板。前往 [**Settings** > **Developer tools** > **Template**](https://my.home-assistant.io/redirect/developer_template/)，在 **模板编辑器** 中输入模板，并查看右侧结果。

模板可以很快变大。为了保持清晰的概览，请考虑使用 YAML 多行字符串来定义模板：


```yaml
script:
  msg_who_is_home:
    sequence:
      - action: notify.notify
        data:
          message: >
            {% if is_state('device_tracker.paulus', 'home') %}
              Ha, Paulus is home!
            {% else %}
              Paulus is at {{ states('device_tracker.paulus') }}.
            {% endif %}
```


### 重要的模板规则

向 YAML 添加模板时需要记住一些非常重要的规则：

1. 你**必须**使用双引号 (`"`) 或单引号 (`'`) 包裹单行模板。
2. 建议使用 `if ... is not none`、[`default` 过滤器](https://jinja.palletsprojects.com/en/latest/templates/#jinja-filters.default)，或两者结合，来处理未定义变量。
3. 在比较数字时，建议使用相应的[过滤器](https://jinja.palletsprojects.com/en/latest/templates/#list-of-builtin-filters)将值转换为 [`float`](https://jinja.palletsprojects.com/en/latest/templates/#jinja-filters.float) 或 [`int`](https://jinja.palletsprojects.com/en/latest/templates/#jinja-filters.int)。
4. 虽然 [`float`](https://jinja.palletsprojects.com/en/latest/templates/#jinja-filters.float) 和 [`int`](https://jinja.palletsprojects.com/en/latest/templates/#jinja-filters.int) 过滤器支持在转换失败时使用默认值，但它们不能捕获未定义变量。

记住这些简单的规则将帮助您在使用自动化模板时避免许多令人头疼的问题和无尽的挫败感。

### 启用 Jinja 扩展

Jinja 支持一组语言扩展，可为模板语言添加额外功能。
为了改善 Jinja 模板的使用体验，Home Assistant 启用了以下扩展：

- [Loop Controls](https://jinja.palletsprojects.com/en/stable/extensions/#loop-controls)（`break` 和 `continue`）
- [Expression Statement](https://jinja.palletsprojects.com/en/stable/extensions/#expression-statement)（`do`）

### 重复使用模板

你可以把 Jinja 模板放到配置目录下的 `custom_templates` 文件夹中，以编写可复用模板。所有模板文件都必须使用 `.jinja` 扩展名，且大小不得超过 5 MiB。

该文件夹中的模板会在启动时加载。如果不想重启 Home Assistant，也可以调用 [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_call_service/?service=homeassistant.reload_custom_templates) 中的重新加载操作。

模板加载后，Jinja 的 [includes](https://jinja.palletsprojects.com/en/3.0.x/templates/#include) 和 [imports](https://jinja.palletsprojects.com/en/3.0.x/templates/#import) 会以 `config/custom_templates` 作为基础目录。

例如，您可以在 `config/custom_templates/formatter.jinja` 模板中定义宏：


```jinja
{% macro format_entity(entity_id) %}
{{ state_attr(entity_id, 'friendly_name') }} - {{ states(entity_id) }}
{% endmacro %}
```


在您的自动化中，您可以通过导入来重用该宏：


```jinja
{% from 'formatter.jinja' import format_entity %}
{{ format_entity('sensor.temperature') }}
```


Home Assistant 还允许你编写返回非字符串值的宏。做法是让宏接收一个名为 `returns` 的命名参数，并用它返回结果。之后，再把该宏传给 `as_function` 过滤器即可使用返回值：


```jinja
{%- macro macro_is_switch(entity_name, returns) -%}
  {%- do returns(entity_name.startswith('switch.')) -%}
{%- endmacro -%}
{%- set is_switch = macro_is_switch | as_function -%}
{{ "It's a switch!" if is_switch("switch.my_switch") else "Not a switch!" }}
```


通过这种方式，你可以导出返回标量值或复杂值的实用函数，而不仅仅是渲染为字符串的宏。

## Home Assistant 模板扩展

这些扩展允许模板访问所有 Home Assistant 特定状态，并提供额外的便捷函数和过滤器。

### 有限模板

某些[触发器](/home-assistant/docs/automation/trigger/)和 `trigger_variables` 中的模板只支持 Home Assistant 模板扩展的一个子集，这个子集称为“有限模板”。

### `this`

基于状态的模板实体和基于触发器的模板实体，都可以在模板和动作中使用特殊模板变量 `this`。更多细节和示例，请参阅 [Template 集成文档](/home-assistant/integrations/template)。

### `states`

`states` 在 [有限模板](#有限模板) 中不受支持。

- 迭代`states`将产生每个状态对象。
- 迭代`states.domain`将产生该域的每个状态对象。
- `states.sensor.temperature` 返回`sensor.temperature` 的状态对象（疑难解答，请参见下面的注释）。
- `states` 也可以调用函数，`states(entity_id, rounded=False, with_unit=False)`，它返回给定实体的状态字符串（不是状态对象），如果不存在则返回`unknown`，如果对象存在但不可用则返回`unavailable`。
  - 可选参数`rounded`和`with_unit`控制传感器状态字符串的格式，请参见下面的[examples](#formatting-sensor-states)。
- `states.sensor.temperature.state_with_unit` 的结果与调用 `states('sensor.temperature', rounded=True, with_unit=True)` 相同。
- `is_state` 用于测试给定实体的状态是否与指定状态或状态列表匹配，并返回 `True` 或 `False`。例如，`is_state('device_tracker.paulus', 'home')` 会测试实体是否处于指定状态；`is_state('device_tracker.paulus', ['home', 'work'])` 会测试实体是否处于列表中的任一状态。
- `state_attr('device_tracker.paulus', 'battery')` 会返回该属性的值；如果属性不存在，则返回 `None`。
- `is_state_attr('device_tracker.paulus', 'battery', 40)` 会测试给定实体属性是否为指定值。在本例中，属性值是数字。请注意，属性可能为 `None`；如果要判断它是否为 `None`，请使用 `state_attr('sensor.my_sensor', 'attr') is none` 或 `state_attr('sensor.my_sensor', 'attr') == None`。
- `has_value('sensor.my_sensor')` 用于测试给定实体是否既不是 `unknown` 也不是 `unavailable`。它既可以作为过滤器使用，也可以作为测试使用。

:::warning
避免使用 `states.sensor.temperature.state`，请改用 `states('sensor.temperature')`。强烈建议优先使用 `states()`、`is_state()`、`state_attr()` 和 `is_state_attr()`，这样可以避免在实体尚未准备好时（例如 Home Assistant 启动期间）产生错误消息。

:::
#### 状态示例

如果状态存在，接下来的两个语句将产生相同的值。如果状态不存在，第二个将导致错误。


```text
{{ states('device_tracker.paulus') }}
{{ states.device_tracker.paulus.state }}
```


打印出所有传感器状态的列表：


```text
{% for state in states.sensor %}
  {{ state.entity_id }}={{ state.state }},
{% endfor %}
```


打印出按`entity_id`排序的所有传感器状态的列表：


```text
{% for state in states.sensor | sort(attribute='entity_id') %}
  {{ state.entity_id }}={{ state.state }},
{% endfor %}
```


实体位于：


```text
{{ ['light.kitchen', 'light.dining_room'] | select('is_state', 'on') | list }}
```


其他状态示例：


```text
{% if is_state('device_tracker.paulus', 'home') %}
  Ha, Paulus is home!
{% else %}
  Paulus is at {{ states('device_tracker.paulus') }}.
{% endif %}

#check sensor.train_departure_time state
{% if states('sensor.train_departure_time') in ("unavailable", "unknown") %}
  {{ ... }}

{% if has_value('sensor.train_departure_time') %}
  {{ ... }}


{% set state = states('sensor.temperature') %}{{ state | float + 1 if is_number(state) else "invalid temperature" }}

{% set state = states('sensor.temperature') %}{{ (state | float * 10) | round(2) if is_number(state)}}

{% set state = states('sensor.temperature') %}
{% if is_number(state) and state | float > 20 %}
  It is warm!
{% endif %}

{{ as_timestamp(states.binary_sensor.garage_door.last_changed) }}

{{ as_local(states.binary_sensor.garage_door.last_changed) }}

{{ as_timestamp(now()) - as_timestamp(states.binary_sensor.garage_door.last_changed) }}

{{ as_local(states.sensor.time.last_changed) }}

{{ states('sensor.expires') | as_datetime }}

# Make a list of states
{{ ['light.kitchen', 'light.dining_room'] | map('states') | list }}
```


#### 格式化传感器状态

下面的示例显示了温度传感器的输出，其中状态`20.001`、单位`°C`和用户配置的表示舍入设置为1位小数。

以下示例生成数字`20.001`：


```text
{{ states('sensor.temperature') }}
```


以下示例生成字符串`"20.0 °C"`：


```text
{{ states('sensor.temperature', with_unit=True) }}
```


以下示例生成字符串`"20.001 °C"`：


```text
{{ states('sensor.temperature', with_unit=True, rounded=False) }}
```


以下示例生成数字`20.0`：


```text
{{ states('sensor.temperature', rounded=True) }}
```


以下示例生成数字`20.001`：


```text
{{ states.sensor.temperature.state }}
```


以下示例生成字符串`"20.0 °C"`：


```text
{{ states.sensor.temperature.state_with_unit }}
```


### 属性

[limited templates](#limited-templates) 中不支持。

如果定义了状态，则可以使用`state_attr` 打印属性。

#### 属性示例


```text
{% if states.device_tracker.paulus %}
  {{ state_attr('device_tracker.paulus', 'battery') }}
{% else %}
  ??
{% endif %}
```


带字符串：


```text
{% set tracker_name = "paulus"%}

{% if states("device_tracker." + tracker_name) != "unknown" %}
  {{ state_attr("device_tracker." + tracker_name, "battery")}}
{% else %}
  ??
{% endif %}
```


友好名称列表：


```text
{{ ['binary_sensor.garage_door', 'binary_sensor.front_door'] | map('state_attr', 'friendly_name') | list }}
```


亮度为 255 的亮灯列表：


```text
{{ ['light.kitchen', 'light.dining_room'] | select('is_state', 'on') | select('is_state_attr', 'brightness', 255) | list }}
```


### 状态翻译

[limited templates](#limited-templates) 中不支持。

`state_translated` 函数使用[general settings](https://my.home-assistant.io/redirect/general/) 中当前配置的语言返回实体的翻译状态。

#### 状态翻译示例


```text
{{ states("sun.sun") }}             # below_horizon
{{ state_translated("sun.sun") }}   # Below horizon
{{ "sun.sun" | state_translated }}  # Below horizon
```

```text
{{ states("binary_sensor.movement_backyard") }}             # on
{{ state_translated("binary_sensor.movement_backyard") }}   # Detected
{{ "binary_sensor.movement_backyard" | state_translated }}  # Detected
```


### 与组配合

[limited templates](#limited-templates) 中不支持。

`expand` 函数和过滤器可用于展开组并对实体排序。它会输出一个已排序且不重复的实体集合。

#### 展开示例


```text
{% for tracker in expand('device_tracker.paulus', 'group.child_trackers') %}
  {{ state_attr(tracker.entity_id, 'battery') }}
  {%- if not loop.last %}, {% endif -%}
{% endfor %}
```


同样的事情也可以表示为过滤器：


```text
{{ expand(['device_tracker.paulus', 'group.child_trackers'])
  | selectattr("attributes.battery", 'defined')
  | join(', ', attribute="attributes.battery") }}
```


```text
{% for energy in expand('group.energy_sensors') if is_number(energy.state) %}
  {{ energy.state }}
  {%- if not loop.last %}, {% endif -%}
{% endfor %}
```


同样的事情也可以表示为测试：


```text
{{ expand('group.energy_sensors')
  | selectattr("state", 'is_number') | join(', ') }}
```


### 实体

- `is_hidden_entity(entity_id)`返回实体是否已被隐藏。也可以开始测试。

### 实体示例


```text
{{ area_entities('kitchen') | reject('is_hidden_entity') }} # Gets a list of visible entities in the kitchen area
```


### 设备

- `device_entities(device_id)`返回与给定设备ID关联的实体列表。也可设置过滤器。
- `device_attr(device_or_entity_id, attr_name)`返回给定设备或实体ID的`attr_name`值。也可设置过滤器。[limited templates](#limited-templates)中不支持。
- `is_device_attr(device_or_entity_id, attr_name, attr_value)`返回给定设备或实体ID的`attr_name`值是否与`attr_value`匹配。也可以初始化测试。[limited templates](#limited-templates)中不支持。
- `device_id(entity_id)` 返回给定实体ID 或设备名称的设备ID。也可启动过滤器。
- `device_name(lookup_value)` 返回给定设备ID 或实体ID 的设备名称。也可设置过滤器。

#### 设备示例


```text
{{ device_attr('deadbeefdeadbeefdeadbeefdeadbeef', 'manufacturer') }}  # Sony
```

```text
{{ is_device_attr('deadbeefdeadbeefdeadbeefdeadbeef', 'manufacturer', 'Sony') }}  # true
```

```text
{{ device_id('sensor.sony') }}  # deadbeefdeadbeefdeadbeefdeadbeef
```

```text
{{ device_name('deadbeefdeadbeefdeadbeefdeadbeef') }}  # Sony speaker
{{ device_name('sensor.sony') }}  # Sony speaker
```


### 配置条目

- `config_entry_id(entity_id)`返回给定实体ID的配置入口ID。也可设置过滤器。
- `config_entry_attr(config_entry_id, attr)`返回给定实体ID的配置入口的`attr`值。也可启动过滤器。使用以下属性：`domain`、`title`、`state`、`source`、`disabled_by`、`pref_disable_polling`。[limited templates](#limited-templates)中不支持。

#### 配置条目示例


```text
{{ config_entry_id('sensor.sony') }}  # deadbeefdeadbeefdeadbeefdeadbeef
```

```text
{{ config_entry_attr(config_entry_id('sensor.sony'), 'title') }}  # Sony Bravia TV
```


### 楼层

- `floors()`返回楼层ID的完整列表。
- `floor_id(lookup_value)` 返回给定楼层名称或别名、区域名称或别名、实体ID或设备ID的楼层ID。也可设置过滤器。
- `floor_name(lookup_value)`返回给定设备ID、实体ID、区域ID或楼层ID的楼层名称。也可设置过滤器。
- `floor_areas(floor_name_or_id)`名称返回与给定楼层ID或相关的区域ID列表。也可默认过滤器。
- `floor_entities(floor_name_or_id)`返回与给定楼层ID或名称相关的实体ID列表。也可设置过滤器。

#### 楼层示例


```text
{{ floors() }}  # ['floor_id']
```

```text
{{ floor_id('First floor') }}  # 'first_floor'
```

```text
{{ floor_id('First floor alias') }}  # 'first_floor'
```

```text
{{ floor_id('my_device_id') }}  # 'second_floor'
```

```text
{{ floor_id('sensor.sony') }}  # 'first_floor'
```

```text
{{ floor_name('first_floor') }}  # 'First floor'
```

```text
{{ floor_name('my_device_id') }}  # 'Second floor'
```

```text
{{ floor_name('sensor.sony') }}  # 'First floor'
```

```text
{{ floor_areas('first_floor') }}  # ['living_room', 'kitchen']
```


### 区域

- `areas()`返回区域ID的完整列表
- `area_id(lookup_value)` 返回给定区域名称或别名、实体ID 或设备ID 的区域ID。也可设置过滤器。
- `area_name(lookup_value)` 返回给定设备ID、实体ID 或区域ID 的区域名称。也可设置过滤器。
- `area_entities(area_name_or_id)` 返回与给定区域ID或名称相关的实体ID列表。也可设置过滤器。
- `area_devices(area_name_or_id)` 返回与给定区域ID或名称相关的设备ID列表。也可默认过滤器。

#### 领域示例


```text
{{ areas() }}  # ['area_id']
```

```text
{{ area_id('Living Room') }}  # 'deadbeefdeadbeefdeadbeefdeadbeef'
```

```text
{{ area_id('Living Room Alias') }}  # 'deadbeefdeadbeefdeadbeefdeadbeef'
```

```text
{{ area_id('my_device_id') }}  # 'deadbeefdeadbeefdeadbeefdeadbeef'
```

```text
{{ area_id('sensor.sony') }}  # 'deadbeefdeadbeefdeadbeefdeadbeef'
```

```text
{{ area_name('deadbeefdeadbeefdeadbeefdeadbeef') }}  # 'Living Room'
```

```text
{{ area_name('my_device_id') }}  # 'Living Room'
```

```text
{{ area_name('sensor.sony') }}  # 'Living Room'
```

```text
{{ area_entities('deadbeefdeadbeefdeadbeefdeadbeef') }}  # ['sensor.sony']
```

```text
{{ area_devices('Living Room') }}  # ['my_device_id']
```


### 集成实体

- `integration_entities(integration)`返回与给定集成关联的实体列表，例如`hue` 或`zwave_js`。
- `integration_entities(config_entry_title)` 如果某个集成配置了多个条目，也可以传入该条目的标题来查找对应实体。

如果存在多个具有相同标题的条目，则将返回所有匹配条目的实体，即使这些条目用于不同的集成。无法搜索未命名集成的实体。

#### 集成示例


```text
{{ integration_entities('hue') }}  # ['light.hue_light_upstairs', 'light.hue_light_downstairs']
```

```text
{{ integration_entities('Hue bridge downstairs') }}  # ['light.hue_light_downstairs']
```


### 标签

- `labels()` 返回标签ID的完整列表，或者给定区域ID、设备ID或实体ID的标签ID的完整列表。
- `label_id(lookup_value)` 返回给定标签名称的标签ID。
- `label_name(lookup_value)`返回给定标签ID的标签名称。
- `label_description(lookup_value)` 返回给定标签ID的标签描述。
- `label_areas(label_name_or_id)` 返回与给定标签ID或名称相关的区域ID列表。
- `label_devices(label_name_or_id)` 返回与给定标签ID或名称关联的设备ID列表。
- `label_entities(label_name_or_id)` 返回与给定标签ID或名称关联的实体ID列表。

每个标签模板函数也可以用作过滤器。

#### 标签示例


```text
{{ labels() }}  # ['christmas_decorations', 'energy_saver', 'security']
```

```text
{{ labels("living_room") }}  # ['christmas_decorations', 'energy_saver']
```

```text
{{ labels("my_device_id") }}  # ['security']
```

```text
{{ labels("light.christmas_tree") }}  # ['christmas_decorations']
```

```text
{{ label_id('Energy saver') }}  # 'energy_saver'
```

```text
{{ label_name('energy_saver') }}  # 'Energy saver'
```

```text
{{ label_areas('security') }}  # ['driveway', 'garden', 'porch']
```

```text
{{ label_devices('energy_saver') }}  # ['deadbeefdeadbeefdeadbeefdeadbeef']
```

```text
{{ label_entities('security') }}  # ['camera.driveway', 'binary_sensor.motion_garden', 'camera.porch']
```


### 问题

- `issues()` 将所有未解决的问题作为 (domain, issues_id) 元组到问题对象的映射返回。
- `issue(domain, issue_id)` 返回所提供的域和 issues_id 的特定问题。

#### 问题示例


```text
{{ issues() }}  # { ("homeassistant", "deprecated_yaml_ping"): {...}, ("cloud", "legacy_subscription"): {...} }
```

```text
{{ issue('homeassistant', 'python_version') }}  # {"breaks_in_ha_version": "2024.4", "domain": "homeassistant", "issue_id": "python_version", "is_persistent": False, ...}
```


### 立即 if（iif）

常见的情况是根据另一个值有条件地返回一个值。
例如，当灯打开或关闭时返回“是”或“否”。

这可以写成：


```text
{% if is_state('light.kitchen', 'on') %}
  Yes
{% else %}
  No
{% endif %}
```


或者使用更短的语法：


```text
{{ 'Yes' if is_state('light.kitchen', 'on') else 'No' }}
```


此外，你还可以使用 `iif` 函数/过滤器，也就是“立即 if”。

语法：`iif(condition, if_true, if_false, if_none)`

如果条件为真，则 `iif` 返回 `if_true` 的值；如果为假值（falsy），则返回 `if_false` 的值；如果为 `None`，则返回 `if_none` 的值。
空字符串、空映射和空列表都属于假值，详见 [Python 文档](https://docs.python.org/3/library/stdtypes.html#truth-value-testing)。

`if_true` 是可选参数，省略时在条件为真时返回 `True`。
`if_false` 是可选参数，省略时在条件为假时返回 `False`。
`if_none` 是可选参数，省略时若条件为 `None`，则返回 `if_false` 的值。

使用`iif`的示例：


```text
{{ iif(is_state('light.kitchen', 'on'), 'Yes', 'No') }}

{{ is_state('light.kitchen', 'on') | iif('Yes', 'No') }}

{{ (states('light.kitchen') == 'on') | iif('Yes', 'No') }}
```


:::warning
`iif` 过滤器的行为不像普通条件语句那样会短路。`if_true`、`if_false` 和 `if_none` 表达式都会被求值，过滤器只会返回其中一个结果值。这意味着你不能用它来阻止会报错的表达式执行。

例如，如果你想在基于平台的自动化中从 `trigger` 里选择一个字段，可能会写成：`trigger.platform == 'event' | iif(trigger.event.data.message, trigger.to_state.state)`。但这样是行不通的，因为两个表达式都会被求值，其中一个会因字段不存在而报错。正确写法应为：`trigger.event.data.message if trigger.platform == 'event' else trigger.to_state.state`。这种表达式会短路；如果平台是 `event`，`trigger.to_state.state` 就不会被计算，也不会出错。

:::
### 时间

[limited templates](#limited-templates) 不支持`now()`、`time_since()`、`time_until()`、`today_at()` 和`utcnow()`。

- `now()`返回一个日期时间对象，表示您所在时区的当前时间。
  - 您还可以使用：`now().second`、`now().minute`、`now().hour`、`now().day`、`now().month`、`now().year`、`now().weekday()` 和`now().isoweekday()` 以及其他[`datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime) 属性和函数。
  - 使用`now()`将导致模板在每新分钟开始时刷新。
- `utcnow()` 返回 UTC 时区当前时间的日期时间对象。
  - 对于特定值：`utcnow().second`、`utcnow().minute`、`utcnow().hour`、`utcnow().day`、`utcnow().month`、`utcnow().year`、`utcnow().weekday()` 和`utcnow().isoweekday()`。
  - 使用`utcnow()`将导致模板在每新分钟开始时刷新。
- `today_at(value)`将包含24小时时间格式的字符串转换为日期时间对象，其中包含您所在时区的今天日期。默认为午夜(`00:00`)。

  - 使用`today_at()`将导致模板在每新分钟开始时刷新。

  

  ```text
  # Is the current time past 10:15?
  {{ now() > today_at("10:15") }}
  ```

  

- `as_datetime(value, default)` 会将输入转换为日期时间对象。如果转换失败，则返回 `default`。如果未提供 `default` 且输入是无法转换的字符串，则返回 `None`；对于其他无法转换的输入（如列表、字典或某些数值），则会报错。如果输入本身已经是日期时间对象，则原样返回；如果输入是 `datetime.date` 对象，则会补上午夜时间。此函数也可作为过滤器使用。
- `as_timestamp(value, default)` 会将日期时间对象或字符串转换为 UNIX 时间戳。如果失败，则返回 `default`；如果省略 `default`，则会报错。此函数也可作为过滤器使用。
- `as_local()` 会将日期时间对象转换为本地时间。此函数也可作为过滤器使用。
- `strptime(string, format, default)` 会根据 [format](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior) 解析字符串并返回日期时间对象。如果失败，则返回 `default`；如果省略 `default`，则会报错。
- `relative_time` 会将日期时间对象转换为人类可读的“经过时间”字符串。结果可能是秒、分钟、小时、天、月或年，但只会显示最大的那个单位。例如，若时间差为 2 天 3 小时，则返回“2 天”。请注意，它只适用于 _过去_ 的日期。
  - 使用`relative_time()`将导致模板在每新分钟开始时刷新。
- `time_since(datetime, precision)` 会将日期时间对象转换为人类可读的时间字符串。结果可能包含秒、分钟、小时、天、月和年。`precision` 使用整数来指定返回多少个单位，最后一个单位会进行四舍五入。例如：`precision = 1` 可能返回“2 年”，而 `precision = 2` 可能返回“1 年 11 个月”。此函数也可作为过滤器使用。
如果日期时间是将来的日期，则返回 0 秒。
精度 0 返回所有可用单位，默认值为 1。
- `time_until(datetime, precision)` 会将日期时间对象转换为人类可读的剩余时间字符串。结果可能包含秒、分钟、小时、天、月和年。`precision` 使用整数来指定返回多少个单位，最后一个单位会进行四舍五入。例如：`precision = 1` 可能返回“2 年”，而 `precision = 2` 可能返回“1 年 11 个月”。此函数也可作为过滤器使用。
如果日期时间是过去的时间，则返回 0 秒。
精度 0 返回所有可用单位，默认值为 1。
- `timedelta` 返回一个 timedelta 对象，它表示持续时间（两个日期时间之间的时间量）。它接受与 Python `datetime.timedelta` 函数相同的参数——天、秒、微秒、毫秒、分钟、小时、周。

  

  ```text
  # 77 minutes before current time.
  {{ now() - timedelta( hours = 1, minutes = 17 ) }}
  ```

  

- `as_timedelta(string)` 会将字符串转换为 `timedelta` 对象，用于表示持续时间。支持的格式包括 `DD HH:MM:SS.uuuuuu`、`DD HH:MM:SS,uuuuuu`、ISO 8601 持续时间格式（例如 `P4DT1H15M20S`，即 `4 1:15:20`），以及 PostgreSQL 的 interval 格式（例如 `3 days 04:05:06`）。此函数也可作为时间过滤器使用。

  

  ```text
  # Renders to "00:10:00"
  {{ as_timedelta("PT10M") }}
  ```

  

- 过滤器`timestamp_local(default)`将UNIX时间转换为ISO格式字符串表示形式，即本地时区中的日期/时间。如果失败，则返回`default`值，如果简单，则引发错误。如果字符串自定义需要字符串格式，请改用`timestamp_custom`。
- 过滤器`timestamp_utc(default)`将UNIX时间转换为ISO格式字符串表示形式，即UTC时区中的日期/时间。如果失败，则返回`default`值，如果格式化，则引发错误。如果字符串中需要自定义字符串格式，请改用`timestamp_custom`。
- 过滤器`timestamp_custom(format_string, local=True, default)`将UNIX时间转换自定义格式的字符串表示形式，默认使用本地时区。如果失败，则返回`default`值，如果格式化，则引发错误。标准支持[Python time formatting options](https://docs.python.org/3/library/time.html#time.strftime)。

:::tip
[UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time) 是自 1970 年 1 月 1 日 00:00:00 UTC 以来经过的秒数。因此，如果使用函数的参数，则可以用 Number（`int` 或`float`）替换它。

:::
:::important
如果您的模板返回的是前置显示的时间（例如带有 `device_class: timestamp` 的传感器事件），则必须确保它是 ISO 8601 格式（这意味着它在日期和时间部分之间有“T”分隔符）。否则，macOS 和 iOS 设备上的模拟渲染将出现错误。以下值的模板会导致此类错误：


`{{ states.sun.sun.last_changed }}` => `2023-07-30 20:03:49.253717+00:00`（缺少“T”分隔符）


要修复此问题，请通过`isoformat()`执行强制ISO转换：


`{{ states.sun.sun.last_changed.isoformat() }}` => `2023-07-30T20:03:49.253717+00:00`（包含“T”分隔符）


:::


```text
{{ 120 | timestamp_local }}
```


### 到/从 JSON

`to_json` 过滤器会将对象序列化为 JSON 字符串。在某些场景下，你可能需要把 JSON 字符串用于 webhook、命令行工具或其他应用的参数。手动处理转义会很麻烦，而 `to_json` 会自动帮你完成这些工作。

`to_json` 还接受布尔参数 `pretty_print`，会使用 2 个空格缩进美化输出；`sort_keys` 会对 JSON 对象的键进行排序，确保相同输入生成一致的结果字符串。

如果您需要生成供不支持 Unicode 字符的解析器使用的 JSON，则可以添加 `ensure_ascii=True` 以便 `to_json` 在字符串中生成 Unicode 转义序列。

`from_json` 过滤器则相反，用于把 JSON 字符串反序列化回对象。


### 往返 JSON 示例

#### 模板


```text
{% set temp = {'temperature': 25, 'unit': '°C'} %}
stringified object: {{ temp }}
object|to_json: {{ temp|to_json(sort_keys=True) }}
```


#### 输出


```text
stringified object: {'temperature': 25, 'unit': '°C'}
object|to_json: {"temperature": 25, "unit": "°C"}
```


相反，`from_json`可用于将JSON字符串反序列化回对象，以便轻松获取可用数据。

#### 模板


```text
{% set temp = '{"temperature": 25, "unit": "°C"}'|from_json %}
The temperature is {{ temp.temperature }}{{ temp.unit }}
```


#### 输出


```text
The temperature is 25°C
```


`from_json(default)` 函数将尝试将输入转换为`json`。如果失败，则返回`default`值，如果简单，则引发错误。

#### 模板


```text
{% set result = 'not json'|from_json('not json') %}
The value is {{ result }}
```


#### 输出


```text
The value is not json
```


### 已定义

有时，模板只应在定义了值或对象时返回，如果未定义，则应返回提供的默认值。这对于验证 JSON 负载非常有用。
如果未定义值或对象，`is_defined`过滤器允许发送错误。

使用`is_defined` 解析 JSON 负载的示例：


```text
{{ value_json.val | is_defined }}
```


如果 JSON 负载没有 `val` 属性，这将引发错误 `UndefinedError: 'value_json' is undefined`。

### 版本

- `version()` 返回内部给定值的[AwesomeVersion object](https://github.com/ludeeus/awesomeversion)。
  - 这也可以安装过滤器(`| version`)。

示例：


- `{{ version("2099.9.9") > "2000.0.0" }}` 将返回`True`
- `{{ version("2099.9.9") < "2099.10" }}` 将返回`True`
- `{{ "2099.9.9" | version < "2099.10" }}` 将返回`True`
- `{{ (version("2099.9.9") - "2100.9.10").major }}` 将返回`True`
- `{{ (version("2099.9.9") - "2099.10.9").minor }}` 将返回`True`
- `{{ (version("2099.9.9") - "2099.9.10").patch }}` 将返回`True`


### 距离

[limited templates](#limited-templates) 中不支持。

- `distance()`测量家、实体或坐标之间的距离。测量单位（公里或英里）取决于系统的配置设置。
- `closest()`找到最近的实体。

#### 距离示例

如果仅确定一个位置，家庭助理将测量距家的距离。


```text

Using Lat Lng coordinates: {{ distance(123.45, 123.45) }}

Using State: {{ distance(states.device_tracker.paulus) }}

These can also be combined in any combination:
{{ distance(123.45, 123.45, 'device_tracker.paulus') }}
{{ distance('device_tracker.anne_therese', 'device_tracker.paulus') }}
```


#### 最接近的例子

最近的函数和过滤器将找到距离 Home Assistant 位置最近的实体：


```text
Query all entities: {{ closest(states) }}
Query all entities of a specific domain: {{ closest(states.device_tracker) }}
Query all entities in group.children: {{ closest('group.children') }}
Query all entities in group.children: {{ closest(states.group.children) }}
```


查找最接近坐标或另一个实体的实体。之前的所有参数仍然适用于第二个参数。


```text
Closest to a coordinate: {{ closest(23.456, 23.456, 'group.children') }}
Closest to an entity: {{ closest('zone.school', 'group.children') }}
Closest to an entity: {{ closest(states.zone.school, 'group.children') }}
```


由于最接近返回一个状态，我们也可以将它与距离结合起来。


```text
{{ closest(states).name }} is {{ distance(closest(states)) }} kilometers away.
```


最接近函数的最后一个参数有一个隐式`expand`，并且可以采用状态或实体ID的任何可迭代序列，并且将扩展组：


```text
Closest out of given entities:
    {{ closest(['group.children', states.device_tracker]) }}
Closest to a coordinate:
    {{ closest(23.456, 23.456, ['group.children', states.device_tracker]) }}
Closest to some entity:
    {{ closest(states.zone.school, ['group.children', states.device_tracker]) }}
```


它还可以用作可迭代实体组或组的过滤器：


```text
Closest out of given entities:
    {{ ['group.children', states.device_tracker] | closest }}
Closest to a coordinate:
    {{ ['group.children', states.device_tracker] | closest(23.456, 23.456) }}
Closest to some entity:
    {{ ['group.children', states.device_tracker] | closest(states.zone.school) }}
```


### 包含

Jinja 默认提供 [`in` 运算符](https://jinja.palletsprojects.com/en/latest/templates/#other-operators)，用于判断某个元素是否存在于列表中，并返回 `True` 或 `False`。
Home Assistant 额外提供了 `contains` 测试和过滤器，可用于判断列表中是否包含某个值。这在 `select` 或 `selectattr` 过滤器中尤其有用，也常用于检查设备属性、`supported_color_modes`，或灯是否支持某个特定效果。

一些例子：


- 如果灯光具有`rainbow`效果，`{{ state_attr('light.dining_room', 'effect_list') | contains('rainbow') }}`将返回`true`。
- `{{ expand('light.office') | selectattr("attributes.supported_color_modes", 'contains', 'color_temp') | list }}`将返回office组中所有支持color_temp的灯光。
- ```text
  {% set current_month = now().month %}
  {% set extra_ambiance = [
    {'name': 'christmas', 'month': [10, 11, 12]},
    {'name': 'halloween', 'month': [10]}
  ] %}
  {% set to_add = extra_ambiance | selectattr('month', 'contains', current_month) | map(attribute='name') | list %}
  {% set to_remove = extra_ambiance | map(attribute='name') | reject('in', to_add) | list %}
  {{ (state_attr('input_select.light_theme', 'options') + to_add) | unique | reject('in', to_remove) | list }}
  ```
这个更复杂的示例使用 `contains` 过滤器将当前月份与列表进行匹配。在本例中，它用于生成要提供给 `Input select: Set options` 操作的浅色主题列表。


### 数字函数和过滤器

其中一些函数也可以在 [filter](https://jinja.palletsprojects.com/en/latest/templates/#id11) 中使用。这意味着它们可以充当普通函数，如`sqrt(2)`，或作为过滤器的一部分，如`2|sqrt`。

:::note
如果输入不是有效数字，数字函数和过滤器会引发错误，可以选择指定默认值，该值将被返回。 `is_number` 函数和过滤器可用于检查值是否为有效数字。 `default` 过滤器可以捕获错误。


- `{{ float("not_a_number") }}` - 模板将无法渲染
- `{{ "not_a_number" | sin }}` - 模板将无法渲染
- `{{ float("not_a_number", default="Invalid number!") }}` - 呈现为`"Invalid number!"`
- `{{ "not_a_number" | sin(default="Invalid number!") }}` - 呈现为`"Invalid number!"`


:::
- `float(value, default)` 函数将尝试将输入转换为`float`。如果失败，则返回 `default` 值，如果省略，则会引发错误。
- `float(default)` 过滤器将尝试将输入转换为`float`。如果失败，则返回 `default` 值，如果省略，则会引发错误。
- 如果输入可以被Python的`float`函数解析并且解析的输入不是`inf`或`nan`，`is_number`将返回`True`，在所有其他情况下返回`False`。请注意，Python `bool` 将返回`True`，但字符串`"True"` 和`"False"` 都将返回`False`。可用作过滤器。
- `int(value, default)` 函数与`float` 类似，但转换为`int`。与`float` 一样，它具有过滤器形式，如果省略`default` 值，则会引发错误。小数部分被丢弃：`int("1.5")` 是`1`。
- `bool(value, default)` 函数将值转换为`true` 或`false`。
以下值被视为`true`：布尔值`true`、非零`int`s 和`float`s，以及字符串`"true"`、`"yes"`、`"on"`、`"enable"` 和`"1"`（不区分大小写）。 `false` 返回相反的值：布尔值 `false`、整数或浮点 `0` 以及字符串 `"false"`、`"no"`、`"off"`、`"disable"` 和 `"0"`（也不区分大小写）。
如果此处未列出该值，则该函数将返回 `default` 值，如果省略，则会引发错误。
此函数旨在用于[binary sensors](/home-assistant/integrations/binary_sensor/)、[switches](/home-assistant/integrations/switch/)或类似实体的状态，因此其行为与Python内置`bool`转换不同，后者会将`"on"`、`"off"`和`"unknown"`等值视为`true`，但`""`视为`false`；如果需要，请使用 `not not value` 或类似的构造。
与`float` 和`int` 一样，`bool` 也有过滤器形式。使用 `none` 作为默认值与 [immediate if filter](#immediate-if-iif) 结合使用特别有用：它可以在一行中处理所有三种可能的情况。

- `log(value, base, default)` 将取输入的对数。当省略底数时，默认为 `e` - 自然对数。如果`value` 或`base` 无法转换为`float`，则返回`default` 值，或者如果省略则引发错误。也可用作过滤器。
- `sin(value, default)` 将返回输入的正弦值。输入值以弧度为单位。如果`value` 无法转换为`float`，则返回`default` 值，或者如果省略则引发错误。可用作过滤器。
- `cos(value, default)` 将返回输入的余弦值。输入值以弧度为单位。如果`value` 无法转换为`float`，则返回`default` 值，或者如果省略则引发错误。可用作过滤器。
- `tan(value, default)` 将返回输入的正切值。输入值以弧度为单位。如果`value` 无法转换为`float`，则返回`default` 值，或者如果省略则引发错误。可用作过滤器。
- `asin(value, default)` 将返回输入的反正弦值。返回值以弧度为单位。如果`value` 无法转换为`float`，则返回`default` 值，或者如果省略则引发错误。可用作过滤器。
- `acos(value, default)` 将返回输入的反余弦。返回值以弧度为单位。如果`value` 无法转换为`float`，则返回`default` 值，或者如果省略则引发错误。可用作过滤器。
- `atan(value, default)` 将返回输入的反正切值。返回值以弧度为单位。如果`value` 无法转换为`float`，则返回`default` 值，或者如果省略则引发错误。可用作过滤器。
- `atan2(y, x, default)` 将返回 y / x 的四象限反正切值。返回值以弧度为单位。如果`y` 或`x` 无法转换为`float`，则返回`default` 值，或者如果省略则引发错误。可用作过滤器。
- `sqrt(value, default)` 将返回输入的平方根。如果`value` 无法转换为`float`，则返回`default` 值，或者如果省略则引发错误。可用作过滤器。
- `max([x, y, ...])` 将获得序列中最大的项。使用与内置 [max](https://jinja.palletsprojects.com/en/latest/templates/#jinja-filters.max) 过滤器相同的参数。
- `min([x, y, ...])` 将获得序列中最小的项目。使用与内置 [min](https://jinja.palletsprojects.com/en/latest/templates/#jinja-filters.min) 过滤器相同的参数。
- `average([x, y, ...], default)` 将返回序列的平均值。如果列表为空或包含非数字值，则返回`default` 值，或者如果省略则引发错误。可用作过滤器。
- `median([x, y, ...], default)` 将返回序列的中值。如果列表为空或包含非数字值，则返回`default` 值，或者如果省略则引发错误。可用作过滤器。
- `statistical_mode([x, y, ...], default)`将返回序列的统计模式值（最频繁出现的）。如果列表为空，则返回 `default` 值，如果省略，则会引发错误。它可以用作过滤器。
- `clamp(v, min, max)` 将值`v` 限制在`min` 和`max`、[clamping at the edges](https://en.wikipedia.org/wiki/Clamp_(function) 之间。如果任何参数无法转换为浮点型，则会引发错误。可用作过滤器。
- `wrap(v, min, max)` 将值限制在最小值和最大值之间，将值包裹在边缘。用数学术语来说，这是[modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic)，有时称为“钟面数学”。如果`v`、`min` 或`max` 无法转换为数字，则会引发错误。可用作过滤器。
- `remap(v, in_min, in_max, out_min, out_max, *, [steps], [edges])` 将值`v` 从`in_min`..`in_max` 范围重新映射到`out_min`..`out_max` 范围。
如果任何值 `v`、`in_min`、`in_max`、`out_min`、`out_max` 无法转换为数字，则会引发错误。可用作过滤器。
  - 您可以选择设置 `edges` 参数来控制如何处理越界输入值：
    - `edges='clamp'`（默认）将输出限制在最小/最大输出范围内。
    - `edges='wrap'` 将在重新映射之前将输入值环绕在输入范围内。
    - `edges='mirror'` 会在重新映射之前在输入范围内来回弹跳输入值。
  - 您可以选择将 `steps` 参数设置为正整数，以将输出量化为多个离散步骤。
- `e`数学常数，大约为2.71828。
- `pi` 数学常数，大约为 3.14159。
- `tau` 数学常数，大约为 6.28318。
- 过滤器 `round(precision, method, default)` 会将输入转换为数字，并将其四舍五入为 `precision` 小数。回合有四种模式，默认模式（未指定模式）为[round-to-even](https://en.wikipedia.org/wiki/Rounding#Roundhalfto_even)。如果输入值无法转换为`float`，则返回`default` 值，或者如果省略则引发错误。
  - `round(precision, "floor", default)` 将始终向下舍入为 `precision` 小数
  - `round(precision, "ceil", default)` 将始终四舍五入为`precision` 小数
  - `round(1, "half", default)` 将始终四舍五入到最接近的 0.5 值。对于此模式，`precision` 应为 1
- 过滤器`value_one|bitwise_and(value_two)` 对两个值执行按位与(&) 运算。
- 过滤器`value_one|bitwise_or(value_two)` 对两个值执行按位或(\|) 运算。
- 过滤器`value_one|bitwise_xor(value_two)` 对两个值执行按位异或(\^) 运算。
- 过滤器 `ord` 将为长度为 1 的字符串返回一个整数，当参数是 Unicode 对象时，表示字符的 Unicode 代码点；或者当参数是 8 位字符串时，返回字节值。
- 过滤器`multiply(arg)`会将输入转换为数字并将其乘以`arg`。在与 `map` 结合的列表操作中很有用。
- 过滤器`add(arg)`会将输入转换为数字并将其添加到`arg`。在与 `map` 结合的列表操作中很有用。

### 复杂类型检查

除了字符串和数字之外，Python（和 Jinja）还支持列表、集合和字典。为了帮助您测试这些类型，您可以使用以下测试：

- `x is list` 将返回`x` 是否为`list`（例如，`[1, 2] is list` 将返回`True`）。
- `x is set` 将返回`x` 是否为`set`（例如，`{1, 2} is set` 将返回`True`）。
- `x is tuple` 将返回`x` 是否为`tuple`（例如，`(1, 2) is tuple` 将返回`True`）。
- `x is datetime` 将返回`x` 是否为`datetime`（例如，`datetime(2020, 1, 1, 0, 0, 0) is datetime` 将返回`True`）。
- `x is string_like` 将返回 `x` 是否是字符串、字节或字节数组对象。

请注意，在 Home Assistant 中，Jinja 内置了 `boolean` (`True`/`False`)、`callable`（任何函数）、`float`（带小数的数字）、`integer`（不带小数的数字）、`iterable`（可迭代的值，例如 `list`、`set`、`string` 或生成器）、`mapping`（主要是`dict`，但也支持其他类似字典的类型）、`number`（`float` 或`int`）、`sequence`（可以迭代和索引的值，例如`list` 和`string`）和`string`。

### 类型转换

虽然 Jinja 本身支持将迭代转换为 `list`，但它不支持转换为 `tuple` 或 `set`。为了帮助您使用这些类型，您可以使用以下函数：

- `set(x)` 会将任何可迭代的 `x` 转换为 `set`（例如，`set([1, 2]) == {1, 2}`）
- `tuple(x)` 会将任何可迭代的 `x` 转换为 `tuple`（例如，`tuple("abc") == ("a", "b", "c")`）

请注意，在 Home Assistant 中，要将值转换为 `list`、`string`、`int` 或 `float`，Jinja 具有内置函数，其名称与每种类型相对应。

### 迭代多个对象

`zip()` 函数可用于在一次操作中迭代多个集合。


```text
{% set names = ['Living Room', 'Dining Room'] %}
{% set entities = ['sensor.living_room_temperature', 'sensor.dining_room_temperature'] %}
{% for name, entity in zip(names, entities) %}
{{ name }} 温度为 {{ states(entity) }}
{% endfor %}
```


`zip()` 也可以解压缩列表。


```text
{% set information = [
  ('客厅', 'sensor.living_room_temperature'),
  ('餐厅', 'sensor.dining_room_temperature')
] %}
{% set names, entities = zip(*information) %}
名字是 {{ names | join(', ') }}
这些实体是 {{ entities | join(', ') }}
```


### 处理原始数据的函数和过滤器

这些函数用于将 `bytes` 格式的原始值处理为本机 Python 类型的值，反之亦然。
`pack` 和 `unpack` 函数也可以用作过滤器。他们使用 Python 3 `struct` 库。
参见：[Python struct library documentation](https://docs.python.org/3/library/struct.html)

- 过滤器`value | pack(format_string)`会将本机类型转换为`bytes`类型对象。这将调用函数`struct.pack(format_string, value)`。如果发生错误或`format_string` 无效，则返回`None`。
- 函数`pack(value, format_string)` 会将本机类型转换为`bytes` 类型对象。这将调用函数`struct.pack(format_string, value)`。如果发生错误或`format_string` 无效，则返回`None`。
- 过滤器`value | unpack(format_string, offset=0)`将尝试将`bytes`对象转换为本机Python对象。 `offset` 参数定义从基于输入 `bytes` 的缓冲区开始处的偏移位置（以字节为单位）。这将调用函数`struct.unpack_from(format_string, value, offset=offset)`。如果发生错误或`format_string` 无效，则返回`None`。请注意，过滤器 `unpack` 将仅返回第一个 `bytes` 对象，尽管函数 `struct.unpack_from` 支持返回多个对象（例如，`format_string` 为 `">hh"`。
- 函数`unpack(value, format_string, offset=0)`将尝试将`bytes`对象转换为本机Python对象。 `offset` 参数定义从基于输入 `bytes` 的缓冲区开始处的偏移位置（以字节为单位）。这将调用函数`struct.unpack_from(format_string, value, offset=offset)`。如果发生错误或`format_string` 无效，则返回`None`。请注意，函数`unpack`将仅返回第一个`bytes`对象，尽管函数`struct.unpack_from`支持返回多个对象（例如，`format_string`为`">hh"`。

:::note
一些例子：


- `{{ 0xDEADBEEF | pack(">I") }}` - 呈现为`b"\xde\xad\xbe\xef"`
- `{{ pack(0xDEADBEEF, ">I") }}` - 呈现为`b"\xde\xad\xbe\xef"`
- `{{ "0x%X" % 0xDEADBEEF | pack(">I") | unpack(">I") }}` - 呈现为`0xDEADBEEF`
- `{{ "0x%X" % 0xDEADBEEF | pack(">I") | unpack(">H", offset=2) }}` - 呈现为`0xBEEF`


:::
### 字符串过滤器

- 过滤器 `urlencode` 将对象转换为百分比编码的 ASCII 文本字符串（例如，用于使用 `application/x-www-form-urlencoded` 的 HTTP 请求）。
- 过滤器 `slugify(separator="_")` 会将给定的字符串转换为“slug”。
- 过滤器`ordinal` 将整数转换为定义序列中位置的数字（例如`1st`、`2nd`、`3rd` 或`4th`）。
- 过滤器 `value | from_hex` 将十六进制字符串解码为原始字节。
- 过滤器 `value | base64_encode` 将字符串或字节编码为 Base 64 字符串。
- 过滤器 `value | base64_decode` 会将 Base64 字符串解码为字符串，默认使用 UTF-8 编码。
- 过滤器 `value | base64_decode("ascii")` 使用 ASCII 编码将 Base 64 字符串解码为字符串。
- 过滤器 `value | base64_decode(None)` 将 Base 64 字符串解码为原始字节。

<div class='note'>

一些例子：

- `{{ "homeassistant" | base64_encode }}` - 呈现为`aG9tZWFzc2lzdGFudA==`
- `{{ "aG9tZWFzc2lzdGFudA==" | base64_decode }}` - 呈现为`homeassistant`
- `{{ "aG9tZWFzc2lzdGFudA==" | base64_decode(None) }}` - 呈现为`b'homeassistant'`
- `{{ "0F010003" | from_hex }}` - 呈现为`b'\x0f\x01\x00\x03'`
- `{{ "0F010003" | from_hex | base64_encode }}` - 呈现为`DwEAAw==`


</div>

### 散列

模板引擎包含一些过滤器和函数来散列字符串
数据。支持一些非常常见的哈希算法：`md5`、`sha1`、
`sha256`和`sha512`。

一些例子：


- `{{ md5("Home Assistant") }}` - 呈现为`f3f2b8b3b40084aa87e92b7ffb02ed13885fea2d07`
- `{{ "Home Assistant" | md5 }}` - 呈现为`f3f2b8b3b40084aa87e92b7ffb02ed13885fea2d07`

- `{{ sha1("Home Assistant") }}` - 呈现为`14bffd017c73917bfda2372aaf287570597b8e82`
- `{{ "Home Assistant" | sha1 }}` - 呈现为`14bffd017c73917bfda2372aaf287570597b8e82`

- `{{ sha256("Home Assistant") }}` - 呈现为`a18f473c9d3ed968a598f996dcf0b9de84de4ee04c950d041b61297a25bcea49`
- `{{ "Home Assistant" | sha256 }}` - 呈现为`a18f473c9d3ed968a598f996dcf0b9de84de4ee04c950d041b61297a25bcea49`

- `{{ sha512("Home Assistant") }}` - 呈现为`f251e06eb7d3439e1a86d6497d6a4531c3e8c809f538be62f89babf147d7d63aca4e77ae475b94c654fd38d8f543f778ce80007d6afef379d8a0e5d3ddf7349d`
- `{{ "Home Assistant" | sha512 }}` - 呈现为`f251e06eb7d3439e1a86d6497d6a4531c3e8c809f538be62f89babf147d7d63aca4e77ae475b94c654fd38d8f543f778ce80007d6afef379d8a0e5d3ddf7349d`


### 正则表达式

有关正则表达式的更多信息
参见：[Python regular expression operations](https://docs.python.org/3/library/re.html)

- 测试 `string is match(find, ignorecase=False)` 将使用正则表达式匹配字符串开头的查找表达式。
- 测试 `string is search(find, ignorecase=False)` 将使用正则表达式匹配字符串中任意位置的查找表达式。
- 过滤器 `string|regex_replace(find='', replace='', ignorecase=False)` 将使用正则表达式将查找表达式替换为替换字符串。可以使用`'\\1'`、`'\\2'` 等访问`replace` 中的匹配组。
- 过滤器`value | regex_findall(find='', ignorecase=False)`将查找`value`中查找表达式的所有正则表达式匹配，并返回匹配数组。
- 过滤器`value | regex_findall_index(find='', index=0, ignorecase=False)`将执行与`regex_findall`相同的操作并返回索引处的匹配项。

### 洗牌

模板引擎包含一个过滤器和用于随机排列列表的函数。

洗牌可以随机发生，也可以使用种子重复发生。使用种子时
它总是会为相同的种子返回相同的打乱列表。

一些例子：


- `{{ [1, 2, 3] | shuffle }}` - 渲染为 `[3, 1, 2]` (_random_)
- `{{ shuffle([1, 2, 3]) }}` - 渲染为 `[3, 1, 2]` (_random_)
- `{{ shuffle(1, 2, 3) }}` - 渲染为 `[3, 1, 2]` (_random_)

- `{{ [1, 2, 3] | shuffle("random seed") }}` - 渲染为 `[2, 3, 1] (_reproducible_)
- `{{ shuffle([1, 2, 3], seed="random seed") }}` - 渲染为 `[2, 3, 1] (_reproducible_)
- `{{ shuffle([1, 2, 3], "random seed") }}`- 呈现为 `[2, 3, 1] (_可重现_)
- `{{ shuffle(1, 2, 3, seed="random seed") }}` - 渲染为 `[2, 3, 1] (_reproducible_)


### 展平列表列表

模板引擎提供了一个过滤器来展平列表列表：`flatten`。

它将获取一个列表列表并返回一个包含所有元素的列表。
压平的深度可以使用`levels`参数来控制。
展平过程是递归的，因此它将展平所有嵌套列表，直到
已达到级别数（如果指定）。

一些例子：


- `{{ flatten([1, [2, [3]], 4, [5 , 6]]) }}` - 呈现为`[1, 2, 3, 4, 5, 6]`
- `{{ [1, [2, [3]], 4, [5 , 6]] | flatten }}` - 呈现为`[1, 2, 3, 4, 5, 6]`

- `{{ flatten([1, [2, [3]]], levels=1) }}` - 呈现为`[1, 2, [3]]`
- `{{ [1, [2, [3]]], flatten(levels=1) }}` - 呈现为`[1, 2, [3]]`

- `{{ flatten([1, [2, [3]]], 1) }}` - 呈现为`[1, 2, [3]]`
- `{{ [1, [2, [3]]], flatten(1) }}` - 呈现为`[1, 2, [3]]`


### 查找列表之间的共同元素

模板引擎提供了一个过滤器来查找两个列表之间的公共元素：`intersect`。

此函数返回一个列表，其中包含两个输入列表中存在的所有元素。

一些例子：


- `{{ intersect([1, 2, 5, 3, 4, 10], [1, 2, 3, 4, 5, 11, 99]) }}` - 呈现为`[1, 2, 3, 4, 5]`
- `{{ [1, 2, 5, 3, 4, 10] | intersect([1, 2, 3, 4, 5, 11, 99]) }}` - 呈现为`[1, 2, 3, 4, 5]`
- `{{ intersect(['a', 'b', 'c'], ['b', 'c', 'd']) }}` - 呈现为`['b', 'c']`
- `{{ ['a', 'b', 'c'] | intersect(['b', 'c', 'd']) }}` - 呈现为`['b', 'c']`


### 查找第一个列表中而不是第二个列表中的元素

模板引擎提供了一个过滤器来查找第一个列表中但不在第二个列表中的元素：`difference`。
此函数返回一个列表，其中包含第一个列表中存在但第二个列表中不存在的所有元素。

一些例子：


- `{{ difference([1, 2, 5, 3, 4, 10], [1, 2, 3, 4, 5, 11, 99]) }}` - 呈现为`[10]`
- `{{ [1, 2, 5, 3, 4, 10] | difference([1, 2, 3, 4, 5, 11, 99]) }}` - 呈现为`[10]`
- `{{ difference(['a', 'b', 'c'], ['b', 'c', 'd']) }}` - 呈现为`['a']`
- `{{ ['a', 'b', 'c'] | difference(['b', 'c', 'd']) }}` - 呈现为`['a']`


### 查找在任一列表中但不在两个列表中的元素

模板引擎提供了一个过滤器来查找位于两个输入列表中但不在两个输入列表中的元素：`symmetric_difference`。
此函数返回一个列表，其中包含第一个列表或第二个列表中存在的所有元素，但不是两个列表中都存在。

一些例子：


- `{{ symmetric_difference([1, 2, 5, 3, 4, 10], [1, 2, 3, 4, 5, 11, 99]) }}` - 呈现为`[10, 11, 99]`
- `{{ [1, 2, 5, 3, 4, 10] | symmetric_difference([1, 2, 3, 4, 5, 11, 99]) }}` - 呈现为`[10, 11, 99]`
- `{{ symmetric_difference(['a', 'b', 'c'], ['b', 'c', 'd']) }}` - 呈现为`['a', 'd']`
- `{{ ['a', 'b', 'c'] | symmetric_difference(['b', 'c', 'd']) }}` - 呈现为`['a', 'd']`


### 合并两个列表中的所有唯一元素

模板引擎提供了一个过滤器来组合两个列表中的所有唯一元素：`union`。
此函数返回一个列表，其中包含第一个列表或第二个列表中存在的所有唯一元素。

一些例子：


- `{{ union([1, 2, 5, 3, 4, 10], [1, 2, 3, 4, 5, 11, 99]) }}` - 呈现为`[1, 2, 3, 4, 5, 10, 11, 99]`
- `{{ [1, 2, 5, 3, 4, 10] | union([1, 2, 3, 4, 5, 11, 99]) }}` - 呈现为`[1, 2, 3, 4, 5, 10, 11, 99]`
- `{{ union(['a', 'b', 'c'], ['b', 'c', 'd']) }}` - 呈现为`['a', 'b', 'c', 'd']`
- `{{ ['a', 'b', 'c'] | union(['b', 'c', 'd']) }}` - 呈现为`['a', 'b', 'c', 'd']`


### 组合字典

模板引擎提供了合并多个字典的功能和过滤器：`combine`。

它将需要多个字典并将它们合并成一个字典。当用作过滤器时，
过滤器值用作第一字典。可选的`recursive`参数决定
是否应合并嵌套字典（默认为`False`）。

一些例子：


- `{{ {'a': 1, 'b': 2} | combine({'b': 3, 'c': 4}) }}` - 呈现为`{'a': 1, 'b': 3, 'c': 4}`
- `{{ combine({'a': 1, 'b': 2}, {'b': 3, 'c': 4}) }}` - 呈现为`{'a': 1, 'b': 3, 'c': 4}`

- `{{ combine({'a': 1, 'b': {'x': 1}}, {'b': {'y': 2}, 'c': 4}, recursive=True) }}` - 呈现为`{'a': 1, 'b': {'x': 1, 'y': 2}, 'c': 4}`
- `{{ combine({'a': 1, 'b': {'x': 1}}, {'b': {'y': 2}, 'c': 4}) }}` - 呈现为`{'a': 1, 'b': {'y': 2}, 'c': 4}`


### 使用宏

Home Assistant 提供了两个附加功能，使宏变得更加强大。


- `apply` 既是一个过滤器又是一个测试，允许您在任何地方使用任何可调用的（宏或函数）
您可以使用其他过滤器和测试。 `apply` 还将任何附加参数传递给该函数。
例如，如果您有一个名为 `double` 的函数，您可以调用
`{{ [1, 2, 3, 4] | map('apply', double) | list }}`，将呈现为`[2, 4, 6, 8]`。
或者，如果您有一个名为 `is_multiple_of` 的函数，您可以调用
`{{ [1, 2, 3, 4] | select('apply', is_multiple_of, 2) | list }}`，将呈现为`[2, 4]`。
- `as_function` 是一个过滤器，它采用具有名为 `returns` 的命名参数的宏。宏可以
然后调用`{%- do returns(return_value) -%}`。将此宏传递给`as_function`后，得到的结果
函数直接返回返回值，保留底层数据类型而不是渲染
一个字符串。您可以返回字典、数字、`True`/`False`（允许您在以下情况下编写自己的测试）
与 `apply` 一起使用），或您的代码可能产生的任何其他值。


## 合并操作响应

使用操作响应，我们可以同时从各个实体收集信息。
使用`merge_response` 模板，我们可以将多个响应合并到一个列表中。

| Variable       | Description                                     |
| -------------- | ----------------------------------              |
| `value`        | The incoming value (must be an action response). |

`entity_id` 键被附加到模板输出列表中的每个字典中作为来源引用。如果输入字典已包含 `entity_id` 键，则模板将失败。

如果原始服务调用提供字典列表（例如`calendar.get_events` 或`weather.get_forecasts`），`value_key` 键将附加到模板输出列表中的每个字典作为源引用。

这两个键的示例可以在 [example merge calendar action response](#example-merge-calendar-action-response) 模板输出中看到。


### 例子

```yaml


{% set combined_forecast = merge_response(response) %}
{{combined_forecast[0].降水|漂浮（0）|循环(1) }}


```

### 示例如何排序

可以使用 Jinja 的 `sort` 过滤器直接根据特定键对列表中的字典进行排序。

```yaml


{{ merge_response(calendar_response) | 排序（属性='开始'）| ... }}


```

### 合并日历操作响应示例

```json
{
“日历.体育”：{
“事件”：[
      {
"开始": "2024-02-27T17:00:00-06:00",
“结束”：“2024-02-27T18:00:00-06:00”，
"summary": "篮球 vs. 火箭",
“描述”： ””，
      }
    ]
  },
"calendar.local_furry_events": {"events": []},
“calendar.yap_house_schedules”：{
“事件”：[
      {
"开始": "2024-02-26T08:00:00-06:00",
“结束”：“2024-02-26T09:00:00-06:00”，
"summary": "阿普特博士",
“描述”： ””，
      },
      {
"开始": "2024-02-28T20:00:00-06:00",
“结束”：“2024-02-28T21:00:00-06:00”，
"summary": "烤蛋糕",
“描述”：“好东西”，
      }
    ]
  },
}
```

```yaml

{{ merge_response(response_variable) }}

```

```json
[
  {
“描述”： ””，
“结束”：“2024-02-27T18:00:00-06:00”，
"entity_id": "日历.体育",
"开始": "2024-02-27T17:00:00-06:00",
"summary": "篮球 vs. 火箭",
"value_key": "事件"
  },
  {
“描述”： ””，
“结束”：“2024-02-26T09:00:00-06:00”，
"entity_id": "calendar.yap_house_schedules",
"开始": "2024-02-26T08:00:00-06:00",
"summary": "阿普特博士",
"value_key": "事件"
  },
  {
“描述”：“好东西”，
“结束”：“2024-02-28T21:00:00-06:00”，
"entity_id": "calendar.yap_house_schedules",
"开始": "2024-02-28T20:00:00-06:00",
"summary": "烤蛋糕",
"value_key": "事件"
  }
]
```

### 非列表操作响应示例

```json
{
“vacuum.deebot_n8_plus_1”：{
“标题”：{
“版本”：“0.0.1”，
    },
“有效负载类型”：“j”，
“响应”：{
“身体”： {
“消息”：“好的”，
      },
    },
  },
“vacuum.deebot_n8_plus_2”：{
“标题”：{
“版本”：“0.0.1”，
    },
“有效负载类型”：“j”，
“响应”：{
“身体”： {
“消息”：“好的”，
      },
    },
  },
}
```

```yaml

{{ merge_response(response_variable) }}

```

```json
[
  {
"entity_id": "vacuum.deebot_n8_plus_1",
“标题”：{
“版本”：“0.0.1”，
    },
“有效负载类型”：“j”，
“响应”：{
“身体”： {
“消息”：“好的”，
      },
    },
  },
  {
"entity_id": "vacuum.deebot_n8_plus_2",
“标题”：{
“版本”：“0.0.1”，
    },
“有效负载类型”：“j”，
“响应”：{
“身体”： {
“消息”：“好的”，
      },
    },
  },
]
```

## 处理传入数据

模板化的另一部分是处理传入的数据。它允许您修改传入数据并仅提取您关心的数据。这仅适用于在其文档中提到对此支持的平台和集成。

这取决于每个集成或平台，但通常能够使用 `value_template` 配置键定义模板。当新值到达时，您的模板将被渲染，同时可以在通常的 Home Assistant 扩展之上访问以下值：

| Variable     | Description                        |
| ------------ | ---------------------------------- |
| `value`      | The incoming value.                |
| `value_json` | The incoming value parsed as JSON. |

这意味着如果传入值类似于下面的示例：

```json
{
“上”：“真”，
“温度”：21
}
```

`on` 的模板为：


```yaml
“{{value_json.on}}”
```


还支持响应中的嵌套 JSON：

```json
{
“传感器”： {
“类型”：“空气”，
“id”：“12345”
  },
“价值观”：{
“温度”：26.09，
“嗡嗡声”：56.73
  }
}
```

只需使用“方括号表示法”即可获取值。


```yaml
“{{ value_json['values']['temp'] }}”
```


以下概述包含几个获取所需值的选项：


```text
# 传入值：
{“素数”：[2,3,5,7,11,13]}

# 提取第一个素数
{{ value_json.primes[0] }}

# 格式化输出
{{“%+.1f”|值_json }}

# 数学
{{ value_json | 浮动 * 1024 如果 is_number(value_json) }}
{{ float(value_json) * (2**10) if is_number(value_json) }}
{{ value_json | 记录 if is_number(value_json) }}
{{ 日志(1000, 10) }}
{{ 罪（pi / 2） }}
{{ cos(tau) }}
{{ tan(pi) }}
{{ sqrt(e) }}

# 时间戳
{{ value_json.tst | 本地计时器 }}
{{ value_json.tst | 计时器_UTC }}
{{ value_json.tst | timestamp_custom('%Y', True) }}
```


要评估响应，请转到[**Settings** > **Developer tools** > **Template**](https://my.home-assistant.io/redirect/developer_template/)，在**模板编辑器**中创建输出，然后检查结果。


```yaml
{% 设置 value_json=
{"name":"室外",
"device":"天气哈",
“数据”：
{“温度”：“24C”，
“哼”：“35%”
         } }%}

{{value_json.data.hum[:-1]}}
```


### 使用模板与 MQTT 集成

[MQTT integration](/home-assistant/integrations/mqtt/) 严重依赖模板。模板用于将传入的有效负载（值模板）转换为状态更新或将传入的操作（命令模板）转换为配置 MQTT 设备的有效负载。

#### 将值模板与 MQTT 结合使用

值模板将接收到的 MQTT 负载转换为有效状态或属性。
接收到的 MQTT 在 `value` 模板变量中可用，如果接收到的 MQTT 负载是有效的 JSON，则在 `value_json` 模板变量中可用。

此外，模板变量`entity_id`、`name` 和`this` 可用于MQTT 实体值模板。 `this` 属性指的是 MQTT 项的[entity state](/home-assistant/docs/configuration/state_object)。

:::note
值模板示例：

对于给定的有效负载：

```json
{“状态”：“开”，“温度”：21.902，“湿度”：空}
```

模板`{{ value_json.temperature | round(1) }}` 渲染到`21.9`。

模板`{{ value_json.humidity }}` 渲染到`None`。


:::
#### 将命令模板与 MQTT 结合使用

对于操作，定义命令模板以将传出 MQTT 负载格式化为远程设备支持的格式。当执行一个动作时，除非文档中另有说明，大多数情况下模板变量`value`都具有动作数据。

此外，模板变量`entity_id`、`name` 和`this` 可用于MQTT 实体命令模板。 `this` 属性指的是 MQTT 项的[entity state](/home-assistant/docs/configuration/state_object)。

:::note
**带有 JSON 数据的命令模板示例：**

使用给定值 `21.9` 模板`{"temperature": {{ value }} }` 渲染到：

```json
{
“温度”：21.9
}
```


:::
**带有原始数据的示例命令模板：**

当命令模板呈现为有效的 `bytes` 文字时，MQTT 会将此数据作为原始数据发布。在其他情况下，将发布字符串表示形式。所以：

- 模板`{{ "16" }}` 渲染为有效负载编码字符串`"16"`。
- 模板`{{ 16 }}` 渲染为有效负载编码字符串`"16"`。
- 模板 `{{ pack(0x10, ">B") }}` 呈现为原始 1 字节有效负载 `0x10`。

### 确定类型

使用模板时，确定模板的类型可能很有用
有时是方法的返回值或变量的类型。

为此，Home Assistant 提供了 `typeof()` 模板功能和过滤器，
其灵感来自[JavaScript](https://en.wikipedia.org/wiki/JavaScript)
`typeof` 运算符。它揭示了给定值的类型。

当您调试或使用模板时，这非常有用
Home Assistant 的开发者工具。然而，它在某些情况下可能有用
其他情况也是如此。

一些例子：


- `{{ typeof(42) }}` - 呈现为`int`
- `{{ typeof(42.0) }}` - 呈现为`float`
- `{{ typeof("42") }}` - 呈现为`str`
- `{{ typeof([1, 2, 3]) }}` - 呈现为`list`
- `{{ typeof({"key": "value"}) }}` - 呈现为`dict`
- `{{ typeof(True) }}` - 呈现为`bool`
- `{{ typeof(None) }}` - 呈现为`NoneType`

- `{{ 42 | typeof }}` - 呈现为`int`
- `{{ 42.0 | typeof }}` - 呈现为`float`
- `{{ "42" | typeof }}` - 呈现为`str`
- `{{ [1, 2, 3] | typeof }}` - 呈现为`list`
- `{{ {"key": "value"} | typeof }}` - 呈现为`dict`
- `{{ True | typeof }}` - 呈现为`bool`
- `{{ None | typeof }}` - 呈现为`NoneType`

- `{{ some_variable | typeof }}` - 呈现`some_variable` 的类型
- `{{ states("sensor.living_room") | typeof }}` - 呈现`states()`函数结果的类型


## 还有一些需要记住的事情

### `entity_id` 以数字开头

如果您的模板使用以数字开头的`entity_id`（例如：`states.device_tracker.2008_gmc`），则必须使用方括号语法以避免因渲染`entity_id` 不当而导致错误。在给出的示例中，设备跟踪器的正确语法为：`states.device_tracker['2008_gmc']`

### 运营商优先级

运算符的默认优先级是过滤器 (`|`) 优先于除括号之外的所有内容。这意味着：


```text
{{ 状态('传感器.温度') |浮动/10 |回合(2) }}
```


将`10`四舍五入到小数点后两位，然后将`states('sensor.temperature')`除以`10`（四舍五入到小数点后两位，即10.00）。这种行为可能不是预期的，但优先级规则暗示了这一点。
