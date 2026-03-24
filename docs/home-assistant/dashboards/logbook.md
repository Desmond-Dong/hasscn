---
title: 日志卡片
description: 日志卡片显示特定实体、设备、区域和/或标签的活动记录。
---
日志卡片显示特定实体、设备、区域和/或标签的日志条目。

<p class='img'>
  <img src='/home-assistant/images/dashboards/activity-card.png' alt='日志卡片截图'>
  日志卡片截图。
</p>

要将日志卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦您接管了控制权，就无法让这个特定仪表盘恢复自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义操作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard) 到您的仪表盘。

## 卡片设置

Target:
  description: 要在卡片中显示日志条目的实体、设备、区域和标签。更多信息请参阅 [目标选择器](/home-assistant/docs/blueprint/selectors/#target-selector)。
Title:
  description: 显示在卡片顶部的标题。
Hours to show:
  description: 卡片中要追踪的过去小时数。
Theme:
  description: 用于此卡片的任何已加载主题的名称。关于主题的更多信息，请参阅 [前端文档](/home-assistant/integrations/frontend/)。
状态 filter:
  description: 仅显示指定状态的日志条目。

## YAML 配置

当您使用 YAML 模式或在 UI 的代码编辑器中更倾向于使用 YAML 时，可以使用以下 YAML 选项。日志（Activity）过去曾被称为 "logbook"，在 YAML 中仍称为 logbook。

type:
  required: true
  description: "`logbook`"
  type: string
target:
  required: true
  description: 卡片的目标对象。
  type: map
title:
  required: false
  description: 卡片的标题。
  type: string
hours_to_show:
  required: false
  description: 要追踪的过去小时数。最少为 1 小时。较大的值可能会导致渲染延迟，特别是当所选实体有大量状态变化时。
  type: integer
  default: 24
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片所使用的主题。关于主题的更多信息，请参阅 [前端文档](/home-assistant/integrations/frontend/)。
  type: string
state_filter:
  required: false
  description: 仅显示所选状态的日志条目。例如，`['on']` 列表将显示目标实体打开时的条目，但不显示关闭时的条目。
  type: list

### 示例

```yaml
type: logbook
target: 
  entity_id:
    - fan.ceiling_fan
    - fan.living_room_fan
    - light.ceiling_lights
hours_to_show: 24
```

```yaml
type: logbook
target:
  area_id: living_room
  device_id:
    - ff22a1889a6149c5ab6327a8236ae704
    - 52c050ca1a744e238ad94d170651f96b
  entity_id:
    - light.hallway
    - light.landing
  label_id:
    - lights
```