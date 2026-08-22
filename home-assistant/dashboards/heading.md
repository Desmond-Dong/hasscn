# 标题卡片

标题卡片通过提供标题、图标和导航来组织您的仪表盘。此卡片支持[动作](/home-assistant/dashboards/actions/)。

<p class='img'>
  <img src='/home-assistant/images/dashboards/heading_card.png' alt='标题卡片截图'>
  带有实体徽章和按钮徽章的标题卡片截图。
</p>

```yaml
type: heading
heading: Kitchen
icon: mdi:fridge
badges:
  - type: entity
    entity: sensor.kitchen_temperature
  - type: entity
    entity: sensor.kitchen_humidity
```

type:
required: true
description: "`heading`"
type: string
heading:
required: false
description: 标题文字。
type: string
heading\_style:
required: false
description: 标题样式。可选值为 `title` 或 `subtitle`。
type: string
default: title
icon:
required: false
description: 显示在标题文字前的图标。
type: string
tap\_action:
required: false
description: 点击卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-actions)。默认不执行任何操作。如果配置了动作，标题文字旁会显示一个箭头。
type: map
badges:
required: false
description: 用于显示实体信息的额外小徽章。请参阅[标题徽章](/home-assistant/dashboards/heading/index.md#heading-badges)。
type: list

## 标题徽章

除了标题文字外，每张标题卡片还可以显示小徽章。它们比普通[徽章](/home-assistant/dashboards/badges/)更小，且没有背景。标题徽章可以用紧凑、简洁的方式显示传感器信息或动作按钮。标题徽章也支持[动作](/home-assistant/dashboards/actions/)。

标题卡片可使用以下徽章类型：

### 实体徽章

实体徽章可让您在标题卡片中显示实体的状态。

```yaml
type: entity
entity: light.living_room
```

type:
required: true
description: "`entity`"
type: string
entity:
required: true
description: 实体 ID。
type: string
name:
required: false
description: 覆盖实体名称。仅当 `state_content` 包含 `name` 标记时才会显示名称。
type: string
icon:
required: false
description: 覆盖实体图标。
type: string
color:
required: false
description: 当实体处于活动状态时设置颜色。默认不着色。也可以设置为特殊标记 `state`，根据实体的 `state`、`domain` 和 `device_class` 动态为图标着色。还支持[颜色令牌](/home-assistant/dashboards/tile/index.md#available-colors)或十六进制颜色代码。
type: string
default: none
show\_icon:
required: false
description: 显示图标。
type: boolean
default: "true"
show\_state:
required: false
description: 显示状态。
type: boolean
default: "false"
state\_content:
required: false
description: >
要显示的状态内容。可以是 `state`、`name`、`last_changed`、`last_updated`，或实体的任意属性。可以是单个字符串，也可以是字符串列表。默认值取决于实体域。
type: \[string, list]
tap\_action:
required: false
description: 点击卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-actions)。默认不执行任何操作。
type: map
hold\_action:
required: false
description: 长按卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#hold-actions)。默认不执行任何操作。
type: map
double\_tap\_action:
required: false
description: 双击卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#double-tap-actions)。默认不执行任何操作。
type: map

### 按钮徽章

按钮徽章可让您显示一个可自定义的按钮，支持图标和文字，或仅显示其中之一。这适合执行快速操作，比如关闭灯光、触发自动化，或打开仪表盘。

```yaml
type: button
icon: mdi:lightbulb-off
text: Turn off lights
color: yellow
```

您也可以创建仅图标按钮或仅文字按钮：

```yaml
badges:
  - type: button
    icon: mdi:play
    color: green
  - type: button
    text: Run automation
    color: blue
```

type:
required: true
description: "`button`"
type: string
icon:
required: false
description: 要显示的图标。
type: string
text:
required: false
description: 要显示在按钮上的文字标签。
type: string
color:
required: false
description: 徽章颜色。支持[颜色令牌](/home-assistant/dashboards/tile/index.md#available-colors)或十六进制颜色代码。
type: string
tap\_action:
required: false
description: 点击卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-actions)。默认不执行任何操作。
type: map
hold\_action:
required: false
description: 长按卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#hold-actions)。默认不执行任何操作。
type: map
double\_tap\_action:
required: false
description: 双击卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#double-tap-actions)。默认不执行任何操作。
type: map
