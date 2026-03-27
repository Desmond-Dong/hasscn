---
title: 实体卡片
description: '实体卡片可让您快速概览实体的状态。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 实体卡片

实体卡片可让您快速概览实体的状态。

<p class='img'>
  <img src='/home-assistant/images/dashboards/entity_card.png' alt='实体卡片截图'>
  实体卡片截图。
</p>

要将实体卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦您接管了控制权，您将无法让这个特定仪表盘恢复自动更新。不过，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式，或只是更喜欢在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

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
  description: 覆盖友好名称。可以是字符串，也可以是名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。
  type: [string, map, list]
  default: 实体名称。
icon:
  required: false
  description: 覆盖图标。
  type: string
state_color:
  required: false
  description: 设置为 `true` 时，当实体处于活动状态时图标会着色。
  type: boolean
  default: false
attribute:
  required: false
  description: 与 `entity` 关联的属性。
  type: string
unit:
  required: false
  description: 数据的计量单位。
  type: string
  default: 实体提供的计量单位。
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片所使用的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/)。
  type: string
tap_action:
  required: false
  description: 点击卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-actions)。
  type: map
hold_action:
  required: false
  description: 点击并按住卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#hold-actions)。
  type: map
double_tap_action:
  required: false
  description: 双击卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#double-tap-actions)。
  type: map
footer:
  required: false
  description: 要渲染的页脚组件。请参阅[页脚文档](/home-assistant/dashboards/header-footer/)。
  type: map

### 示例

```yaml
- type: entity
  entity: cover.kitchen_window
- type: entity
  entity: light.bedroom
  attribute: brightness
  unit: "%"
- type: entity
  entity: vacuum.downstairs
  name: Vacuum
  icon: "mdi:battery"
  attribute: battery_level
  unit: "%"
```
