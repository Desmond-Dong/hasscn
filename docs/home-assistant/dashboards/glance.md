---
title: 概览卡片
description: '概览卡片用于将多个传感器分组显示在紧凑的概览中。请注意，它可以与实体过滤器卡片(/home-assistant/dashboards/entity-filter/)一起使用来创建动态卡片。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 概览卡片

概览卡片用于将多个传感器分组显示在紧凑的概览中。请注意，它可以与[实体过滤器卡片](/home-assistant/dashboards/entity-filter/)一起使用来创建动态卡片。

<p class='img'>
<img src='/home-assistant/images/dashboards/glance_card.png' alt='概览卡片截图'>
概览卡片截图。
</p>

要将卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它不再自动更新。
     - 一旦您接管了控制权，您将无法让此仪表盘恢复自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义操作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard) 到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中偏好使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`glance`"
  type: string
实体:
  required: true
  description: "实体 ID 列表或 `entity` 对象，见下文。"
  type: list
title:
  required: false
  description: 卡片标题。
  type: string
show_name:
  required: false
  description: 显示实体名称。
  type: boolean
  default: "true"
show_icon:
  required: false
  description: 显示实体图标。
  type: boolean
  default: "true"
show_state:
  required: false
  description: 显示实体状态文本。
  type: boolean
  default: "true"
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/)。
  type: string
columns:
  required: false
  description: 要显示的列数。如果未指定，数量将自动设置。
  type: integer
state_color:
  required: false
  description: 设置为 `true` 可在实体处于活动状态时为图标着色。
  type: boolean
  default: true

### 实体选项

如果您将实体定义为对象而不是字符串，可以添加更多自定义和配置：

实体:
  required: true
  description: 实体 ID。
  type: string
name:
  required: false
  description: 覆盖友好名称。可以是字符串或名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。
  type: [string, map, list]
icon:
  required: false
  description: 覆盖图标。
  type: string
image:
  required: false
  description: 覆盖实体图片。
  type: string
show_last_changed:
  required: false
  description: 用上次更改以来的相对时间覆盖状态显示。
  type: boolean
  default: false
show_state:
  required: false
  description: 显示实体状态文本。
  type: boolean
  default: true
tap_action:
  required: false
  description: 点击卡片时执行的操作。请参阅[操作文档](/home-assistant/dashboards/actions/#tap-action)。
  type: map
hold_action:
  required: false
  description: 长按卡片时执行的操作。请参阅[操作文档](/home-assistant/dashboards/actions/)。
  type: map
double_tap_action:
  required: false
  description: 双击卡片时执行的操作。请参阅[操作文档](/home-assistant/dashboards/actions/#double-tap-action)。
  type: map

### 示例

基本示例：

```yaml
type: glance
title: Glance card sample
entities:
  - binary_sensor.movement_backyard
  - light.bed_light
  - binary_sensor.basement_floor_wet
  - sensor.outside_temperature
  - light.ceiling_lights
  - switch.ac
  - lock.kitchen_door
```

<p class='img'>
<img src='/home-assistant/images/dashboards/glance_card.png' alt='带有自定义标题的概览卡片截图'>
带有自定义标题的概览卡片截图。
</p>

将实体定义为对象并应用自定义名称：

```yaml
type: glance
title: Better names
entities:
  - entity: binary_sensor.movement_backyard
    name: Movement?
  - light.bed_light
  - binary_sensor.basement_floor_wet
  - sensor.outside_temperature
  - light.ceiling_lights
  - switch.ac
  - lock.kitchen_door
  - entity: switch.wall_plug_switch
    tap_action:
      action: toggle
```