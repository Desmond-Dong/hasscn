# YAML 风格指南

除了通用的[文档规范](/developers/documenting/standards.md)之外，我们还为文档中的 YAML 片段制定了一套专门规范。本页介绍的规则适用于项目中所有基于 YAML 的代码示例，重点面向文档场景。

这些 YAML 规范旨在为终端用户提供一致的呈现方式、推荐实践，以及统一的问题解决思路。

## YAML

本节讨论 YAML 的基础用法，因此并不特定于 Home Assistant。

### 缩进

必须使用 2 个空格进行缩进。

```yaml
# Good
example:
  one: 1

# Bad
example:
    bad: 2
```

### 布尔值

应避免在 YAML 中使用模糊的 truthy 布尔值写法。这类写法很容易让刚接触 YAML 的用户感到困惑。因此，我们只允许使用小写的 `true` 和 `false` 表示布尔值。

这也与 YAML 1.2 规范保持一致，因为该版本已经移除了对多种未加引号 truthy 布尔值的支持，例如 `y`、`n`、`yes`、`no`、`on`、`off` 等。

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

为 YAML 代码块添加注释，通常能帮助读者更好理解示例。

注释的缩进级别必须与当前代码行保持一致。最好将注释放在所说明内容的上一行，否则在小屏设备上可能会影响可读性。

注释应以大写字母开头，并在注释符号 `#` 与正文之间保留一个空格。

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

YAML 中的 sequence 也常被称为 list 或 array。在 Home Assistant 的面向终端用户文档中，我们统一称其为 list。这一说法也与 Home Assistant Core 所使用的 Python 术语保持一致。

序列有两种写法：block style 和 flow style。我们优先使用 block style。

#### Block style 序列

block style 序列必须缩进到所属键名之下。

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

应尽量避免使用 flow style。虽然它在简单、短小的数据中看起来比较紧凑，但只要内容稍长，就会明显降低可读性。

如果确实要使用 flow style，则每个逗号 `,` 后都必须有一个空格，且首尾方括号内侧不能有空格：

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

YAML 中的 mapping 也常被称为 associative array、hash table、key/value pair、collection 或 dictionary。在 Home Assistant 面向终端用户的文档中，我们统一称其为 mapping。

映射也有多种写法，但我们只允许使用 block style mapping。不允许使用类似 JSON 的 flow style。

```yaml
# Good
example:
  one: 1
  two: 2

# Bad
example: { one: 1, two: 2 }
```

### 空值

空值应使用隐式写法，避免显式写成 `~` 或 `null`。

```yaml
# Good
example:

# Bad
example: ~
example: null
```

### 字符串

字符串优先使用双引号（`"`）包裹。

```yaml
# Good
example: "Hi there!"

# Avoid
example: Hi there!

# Bad
example: 'Hi there!'
```

#### 多行字符串

在 YAML 配置中，能不用 `\n` 或其他换行标记就尽量不用。同样，也应避免写成特别长的单行字符串。

请改用 literal style（保留换行）或 folded style（不保留换行）字符串。

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

以上示例中使用的是不带 chomping 的写法（`|`、`>`）。除非示例需要对末尾换行作特殊处理，否则优先采用这种方式。如果确有需要，也可以使用 strip 操作符（`|-`、`>-`：去掉末尾换行，并移除结尾多余空行）或 keep 操作符（`|+`、`>+`：保留末尾换行，并保留结尾额外空行）。

### 字符串补充说明

在后面的 Home Assistant YAML 一节中，我们还会补充说明在 Home Assistant 配置示例中如何处理字符串。

## Home Assistant YAML

在 Home Assistant 中，有些内容虽然都能符合上面的基础样式要求，但仍然可能存在多种写法。本节用于进一步统一这些场景的写法。

### 默认值

如果某个配置项本身已有默认值，通常不应出现在示例中，除非该示例就是专门为了讲解这个配置项。

例如，自动化中的 `condition` 是可选项，其默认值就是空列表 `[]`。

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

如前文所述，字符串通常优先使用双引号。但以下几类值可以不加引号，因为这样能让示例更易读：

* Entity IDs (e.g., `binary_sensor.motion`)
* Entity attributes (e.g., `temperature`)
* Device IDs
* Area IDs
* Platform types (e.g., `light`, `switch`)
* Condition types (e.g., `numeric_state`, `state`)
* Trigger types (e.g., `state`, `time`)
* Action names (e.g., `light.turn_on`)
* Device classes (e.g., `problem`, `motion`)
* Event names
* Values that accept a limited set of possible, hardcoded values.
  For example, `mode` in automations.

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

### 服务动作目标

如果你要针对某个 entity ID 发起服务动作调用（例如打开一盏灯），可以有三种写法。

entity ID 可以写在 action 层级属性中，也可以写在服务动作调用发送的数据里，或者写在服务动作的 target 中。

其中，service action target 是目前最现代的写法，它允许将动作目标指定为 entity、device 或 area。因此，`target` 是最灵活的方案，也是推荐使用的写法。

```yaml
# Good
actions:
  - action: light.turn_on
    target:
      entity_id: light.living_room
  - action: light.turn_on
    target:
      area_id: light.living_room
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

### 同时接受标量或标量列表的属性

Home Assistant 中有很多属性既支持单个标量值，也支持标量列表。有些场景甚至还接受逗号分隔的字符串作为列表。

如果某个属性支持单个值或标量列表，请遵循以下规则：

* 不要把多个值塞进一个标量字符串中（例如逗号分隔写法）。
* 如果使用列表，必须使用 block style。
* 如果只有一个值，不要写成单元素列表。
* 允许直接使用单个标量值。

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

### 同时接受映射或映射列表的属性

Home Assistant 中有些属性既接受单个 mapping，也接受 mapping 列表。常见示例包括：`condition`、`action`、`sequence`。

如果某个属性既支持单个 mapping，也支持 mapping 列表，那么即使只传一个 mapping，也必须写成 mapping 列表。

这样更容易让读者意识到后续可以继续追加条目，也更方便他们把单个条目复制到自己的代码中。

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

Home Assistant 模板功能很强大，但对经验较少的用户来说也可能比较难理解。因此，只要存在纯 YAML 写法，就应尽量避免使用模板。

此外，模板在文档中还需要额外转义，以避免网站把它误判为 Liquid 语法。整体上减少模板使用，也能减少这类额外处理。

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

模板本质上是字符串，因此外层应使用双引号；相应地，模板内部应使用单引号。

```yaml
# Good
example: "{{ 'some_value' == some_other_value }}" 

# Bad
example: '{{ "some_value" == some_other_value }}'
```

#### 模板字符串长度

应避免把模板写成超长单行。请拆成多行，以便读者更清楚地看出逻辑，也能提升可读性。

关于多行字符串的更多说明，请参考前文字符串章节。

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

#### 条件简写语法

相比展开写法，优先使用简写模板语法，因为它更简洁。

```yaml
# Good
conditions: "{{ some_value == some_other_value }}" 

# Bad
conditions:
  - condition: template
    value_template: "{{ some_value == some_other_value }}"
```

#### 过滤器

过滤器管道符 `|` 两侧必须保留空格。如果这样仍然不够清晰，建议额外加上括号来增强可读性。

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

#### 访问状态与状态属性

只要有对应的辅助函数，就不允许直接使用 `states` 对象。

例如，不要使用 `states.sensor.temperature.state`，应改用 `states('sensor.temperature')`。

```yaml
# Good
one: "{{ states('sensor.temperature') }}"
two: "{{ state_attr('climate.living_room', 'temperature') }}"

# Bad
one: "{{ states.sensor.temperature.state }}"
two: "{{ states.climate.living_room.attributes.temperature }}"
```

这一规则适用于 `states()`、`is_state()`、`state_attr()` 和 `is_state_attr()`，以避免在实体尚未就绪时（例如 Home Assistant 启动期间）产生错误或报错信息。
