除了我们的通用[文档标准](/developers/documenting/standards.md)外，我们还有一套针对 YAML 片段文档化的标准。本页描述的标准适用于项目中的所有基于 YAML 的代码，主要关注文档部分。

我们的 YAML 标准为最终用户提供一致的外观、最佳实践以及统一的 YAML 问题解决方式。

## YAML

本节介绍基本的 YAML 用法，与 Home Assistant 无关。

### 缩进

必须使用 2 个空格的缩进。

```yaml
# Good
example:
  one: 1

# Bad
example:
    bad: 2
```

### 布尔值

应避免在 YAML 中使用 truthy 布尔值。它们往往会让人困惑，尤其是对 YAML 新手。因此，我们只允许使用小写的 `true` 和 `false` 作为布尔值。

这也保持了与 YAML 1.2 规范的兼容性，因为该版本取消了对多个未加引号的 truthy 布尔值的支持（例如 `y`、`n`、`yes`、`no`、`on`、`off` 等）。

```yaml
# Good
one: true
two: false

# Bad
one: True
two: on
three: yes
```

### 注释

在 YAML 块中添加注释，确实有助于读者更好地理解示例。

注释的缩进级别应与当前缩进级别一致。注释最好写在所描述行的上方，否则在较小显示屏上可能难以阅读。

注释应以大写字母开头，并在注释符 `#` 与注释内容之间加一个空格。

```yaml
# Good
example:
  # Comment
  one: true

# Acceptable, but prefer the above
example:
  one: true # Comment

# Bad
example:
# Comment
  one: false
  #Comment
  two: false
  # comment
  three: false
```

### 序列

YAML 中的 sequences 也称为列表或数组。在 Home Assistant 世界中，我们在面向最终用户的文档中称它们为列表。这源于 Home Assistant core 开发所基于的 Python 语言。

Sequences 有两种书写风格：block style 和 flow style。我们更倾向于使用 block style sequences。

#### Block style 序列

Block style sequences 必须缩进在其所属的 key 下方。

```yaml
# Good
example:
  - 1
  - 2
  - 3

# Bad
example:
- 1
- 2
- 3
```

#### Flow style 序列

应避免使用 flow style。虽然简洁、简短、干净，但数据较长时变得难以阅读。

如使用 flow style，每个逗号 `,` 后应有空格，且开闭括号前不应有空格：

```yaml
# Good
example: [1, 2, 3]

# Bad
example: [ 1,2,3 ]
example: [ 1, 2, 3 ]
example: [1,2,3]
example: ["light.living_room_window", "light.living_room_corner", "light.living_room_table"]
```

### 映射

YAML 中的 mappings 也称为关联数组、哈希表、key/value pairs、collections 或 dictionaries。在 Home Assistant 世界中，我们在面向最终用户的文档中称它们为 mappings。

Mappings 有多种书写风格，但我们只允许使用 block style mappings。Flow style（看起来像 JSON）不允许使用。

```yaml
# Good
example:
  one: 1
  two: 2

# Bad
example: { one: 1, two: 2 }
```

### Null 值

Null 值应隐式标记。应避免使用显式 null 值（`~` 和 `null`）。

```yaml
# Good
example:

# Bad
example: ~
example: null
```

### 字符串

字符串最好用双引号（`"`）引用。

```yaml
# Good
example: "Hi there!"

# Avoid
example: Hi there!

# Bad
example: 'Hi there!'
```

#### 多行字符串

在 YAML 配置中，应尽可能避免使用 `\n` 或其他换行符。同样，也应避免使用冗长的单行字符串。

改为使用 literal style（保留换行符）和 folded style（不保留换行符）字符串。

```yaml
# Good
literal_example: |
  This example is an example of literal block scalar style in YAML.
  It allows you to split a string into multiple lines.
folded_example: >
  This example is an example of a folded block scalar style in YAML.
  It allows you to split a string into multi lines, however, it magically
  removes all the new lines placed in your YAML.

# Bad
literal_example: "This example is an example of literal block scalar style in YAML.\nIt allows you to split a string into multiple lines.\n"
folded_example_same_as: "This example is an example of a folded block scalar style in YAML. It allows you to split a string into multi lines, however, it magically removes all the new lines placed in your YAML.\n"
```

上述示例中使用了 no chomping 操作符（`|`、`>`）。这是首选方式，除非示例需要对末尾换行符进行不同的处理。在这些情况下，可以使用 strip 操作符（`|-`、`>-`：无末尾换行符，并删除所有额外的末尾换行符）或 keep 操作符（`|+`、`>+`：保留末尾换行符，并保留所有额外的末尾换行符）。

### 额外的字符串指导

Home Assistant 的 YAML 部分提供了有关如何在 Home Assistant 配置示例中处理字符串的额外指导。

## Home Assistant YAML

在 Home Assistant 中，虽然仍遵循上述样式规则，但某些内容可以有多种方式处理。本节就是为了处理这些问题。

### 默认值

使用默认值的配置选项，不应包含在示例中。除非该示例是专门为说明该选项而编写的。

例如，automation 中的 `condition` 选项是可选的，默认为空列表 `[]`。

```yaml
# Good
- alias: "Test"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion

# Bad
- alias: "Test"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion
  condition: []
```

### 字符串（续）

如第一章所述，字符串最好用双引号引用。然而，以下值的类型不受此规则限制，因为这样可以使我们的示例更具可读性：

* Entity IDs（例如 `binary_sensor.motion`）
* Entity attributes（例如 `temperature`）
* Device IDs
* Area IDs
* Platform types（例如 `light`、`switch`）
* Condition types（例如 `numeric_state`、`state`）
* Trigger types（例如 `state`、`time`）
* Action 名称（例如 `light.turn_on`）
* Device classes（例如 `problem`、`motion`）
* Event 名称
* 接受有限的可能值（硬编码）的值。例如 automation 中的 `mode`。

```yaml
# Good
actions:
  - action: notify.frenck
    data:
      message: "Hi there!"
  - action: light.turn_on
    target:
      entity_id: light.office_desk
      area_id: living_room
    data:
      transition: 10

# Bad
actions:
  - action: "notify.frenck"
    data:
      message: Hi there!
```

### Service action 目标

如果想针对 entity ID 触发 service action 调用（例如打开灯），可以通过三种方式实现。

Entity ID 可以作为 service action target 中的 entity 指定，作为 action 级别的属性，或作为 service action 调用中发送的数据的一部分。

Service action target 是最现代的方式，允许针对 entity、device 或 area 触发 service action 调用。因此，target 是可用选项中最灵活的，应当使用它。

```yaml
# Good
actions:
  # Service action target is an entity
  - action: light.turn_on
    target:
      entity_id: light.living_room
  # Service action target is an area
  - action: light.turn_on
    target:
      area_id: light.living_room
  # Service action target is an area plus an entity plus a device
  - action: light.turn_on
    target:
      area_id: living_room
      entity_id: light.office_desk
      device_id: 21349287492398472398

# Bad
actions:
  - action: light.turn_on
    entity_id: light.living_room
  - action: light.turn_on
    data:
      entity_id: light.living_room
```

### 接受标量或标量列表的属性

Home Assistant 有很多地方既可以接受标量值，也可以接受标量值列表。此外，有时它甚至接受以逗号分隔的字符串值作为列表。

在接受单个值或标量值列表时，遵循以下规则：

* 不得将多个值放入单个标量值中（逗号分隔的字符串）。
* 如果使用列表，必须使用 block style。
* 不应使用只包含单个标量值的列表。
* 允许使用单个标量值。

```yaml
# Good
entity_id: light.living_room
entity_id:
  - light.living_room
  - light.office

# Bad
entity_id: light.living_room, light.office
entity_id: [light.living_room, light.office]
entity_id:
  - light.living_room
```

### 接受 mapping 或 mapping 列表的属性

Home Assistant 有可以接受 mapping 或 mapping 列表的属性。常见的例子有：`condition`、`action`、`sequence`。

当属性接受单个 mapping 或 mapping 列表时，必须使用 mapping 列表，即使只传入一个 mapping。

这样更容易理解可以添加更多项目，也更容易将单个项目复制粘贴到自己的代码中。

```yaml
# Good
actions:
  - action: light.turn_on
    target:
      entity_id: light.living_room

# Bad
actions:
  action: light.turn_on
  target:
    entity_id: light.living_room
```

### 模板

Home Assistant 的 templates 功能强大，但可能非常令人困惑或难以理解。因此，如果存在纯 YAML 版本，应避免使用 templates。

```yaml
# Good
conditions:
  - condition: numeric_state
    entity_id: sun.sun
    attribute: elevation
    below: 4

# Bad
conditions:
  - condition: template
    value_template: "{{ state_attr('sun.sun', 'elevation') < 4 }}"
```

#### 引号风格

Templates 是字符串，因此使用双引号。因此，template 内部应使用单引号。

```yaml
# Good
example: "{{ 'some_value' == some_other_value }}"

# Bad
example: '{{ "some_value" == some_other_value }}'
```

#### Template 字符串长度

应避免模板中的长行，并将其拆分为多行，以便更清楚地了解发生了什么，并保持可读性。

有关多行字符串格式的更多信息，请参见上文关于字符串的章节。

```yaml
# Good
value_template: >-
  {{
    is_state('sensor.bedroom_co_status', 'Ok')
    and is_state('sensor.kitchen_co_status', 'Ok')
    and is_state('sensor.wardrobe_co_status', 'Ok')
  }}

# Bad
value_template: "{{ is_state('sensor.bedroom_co_status', 'Ok') and is_state('sensor.kitchen_co_status', 'Ok') and is_state('sensor.wardrobe_co_status', 'Ok') }}"
```

#### 简写 style condition 语法

优先使用 shorthand style templates 而非 verbose format，因为它提供 cleaner 的语法。

```yaml
# Good
conditions: "{{ some_value == some_other_value }}"

# Bad
conditions:
  - condition: template
    value_template: "{{ some_value == some_other_value }}"
```

#### 过滤器

过滤器管道标记 `|` 两侧的空格是必需的。如果这导致可读性不清楚，建议使用额外的括号。

```yaml
# Good
conditions:
  - "{{ some_value | float }}"
  - "{{ some_value == (some_other_value | some_filter) }}"

# Bad
conditions:
  - "{{ some_value == some_other_value|some_filter }}"
  - "{{ some_value == (some_other_value|some_filter) }}"
```

#### 访问 state 与 state 属性

如果有 helper 方法可用，不允许直接使用 states 对象。

例如，不要使用 `states.sensor.temperature.state`，而应使用 `states('sensor.temperature')`。

```yaml
# Good
one: "{{ states('sensor.temperature') }}"
two: "{{ state_attr('climate.living_room', 'temperature') }}"

# Bad
one: "{{ states.sensor.temperature.state }}"
two: "{{ states.climate.living_room.attributes.temperature }}"
```

此规则适用于 `states()`、`is_state()`、`state_attr()` 和 `is_state_attr()`，以避免在 entity 尚未就绪时（例如 Home Assistant 启动期间）出现错误和错误消息。
