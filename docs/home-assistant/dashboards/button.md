---
title: 按钮卡片
description: '按钮卡片允许您添加按钮来执行任务。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 按钮卡片

按钮卡片允许您添加按钮来执行任务。

<p class='img'>
<img src='/home-assistant/images/dashboards/entity_button_card.png' alt='三个按钮卡片的截图'>
三个按钮卡片的截图。
</p>

要将按钮卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它不再自动更新。
     - 一旦您接管了控制权，您无法将此特定仪表盘恢复为自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard) 到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## 卡片设置

实体:
  description: 卡片交互的实体 ID，例如 `light.living_room`。
Name:
  description: 显示在卡片上的按钮名称。如果此字段留空且卡片与实体交互，按钮名称默认为实体名称。否则，不显示名称。
Icon:
  description: 显示在卡片上的图标。如果此字段留空且卡片与实体交互，图标默认为实体域图标。否则，不显示图标。
Icon Height:
  description: 图标的高度，以像素为单位。
Color:
  description: 图标的颜色。
Theme:
  description: 用于此卡片的任何已加载主题的名称。关于主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/)。
Show Name:
  description: 用于显示或隐藏按钮名称的切换开关。
Show State:
  description: 用于显示或隐藏实体状态的切换开关。
Show Icon:
  description: 用于显示或隐藏图标的切换开关。
Tap Action:
  description: 点击卡片时执行的动作。更多信息，请参阅[动作文档](/home-assistant/dashboards/actions/#tap-action)。
Hold Action:
  description: 长按卡片时执行的动作。更多信息，请参阅[动作文档](/home-assistant/dashboards/actions/#hold-action)。

## YAML 配置

当您使用 YAML 模式或在 UI 代码编辑器中更喜欢使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`button`"
  type: string
实体:
  required: false
  description: 卡片交互的实体 ID，例如 `light.living_room`。
  type: string
name:
  required: false
  description: 覆盖友好名称。可以是字符串或名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。仅当卡片与实体交互时，它默认为实体名称。否则，如果未配置，则不显示名称。
  type: [string, map, list]
  default: 实体名称
icon:
  required: false
  description: 显示在卡片上的图标。仅当卡片与实体交互时，它默认为实体域图标。否则，如果未配置，则不显示图标。
  type: string
  default: 实体域图标
show_name:
  required: false
  description: 如果为 false，按钮名称不会显示在卡片上。
  type: boolean
  default: "true"
show_icon:
  required: false
  description: 如果为 false，图标不会显示在卡片上。
  type: boolean
  default: "true"
show_state:
  required: false
  description: 显示状态。
  type: boolean
  default: "false"
icon_height:
  required: false
  description: 图标的高度。可以使用任何 CSS 值。
  type: string
  default: auto
color:
  required: false
  description: 设置图标的颜色。默认情况下，颜色基于实体的 `state`、`domain` 和 `device_class`。它接受[颜色令牌](/home-assistant/dashboards/button/#available-colors)或十六进制颜色代码。
  type: string
  default: 状态
tap_action:
  required: false
  description: 点击卡片时执行的动作。更多信息，请参阅[动作文档](/home-assistant/dashboards/actions/#tap-action)。
  type: map
hold_action:
  required: false
  description: 长按卡片时执行的动作。更多信息，请参阅[动作文档](/home-assistant/dashboards/actions/#hold-action)。
  type: map
double_tap_action:
  required: false
  description: 双击卡片时执行的动作。更多信息，请参阅[动作文档](/home-assistant/dashboards/actions/#double-tap-action)。
  type: map
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片所使用的主题。关于主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/)。
  type: string
action_name:
  required: false
  description: 覆盖按钮行的默认动作名称。
  type: string
  default: Run

### 示例

基本示例：

```yaml
type: button
entity: light.living_room
```

带有按钮名称和[脚本](/home-assistant/docs/scripts/)的按钮卡片，点击卡片时运行脚本：

<p class='img'>
<img src='/home-assistant/images/dashboards/entity_button_complex_card.png' alt='带有脚本动作的按钮卡片截图'>
带有脚本动作的按钮卡片截图。
</p>

```yaml
type: button
name: Turn Off Lights
show_state: false
tap_action:
  action: perform-action
  perform_action: script.turn_on
  data:
    entity_id: script.turn_off_lights
```

垂直堆叠卡片上 4 个按钮的示例：

<p class='img'>
<img src='/home-assistant/images/dashboards/buttons_on_vertical_stack_card.png' alt='带有 4 个按钮和实体选择器的垂直堆叠卡片截图'>
带有 4 个按钮和实体选择器的垂直堆叠卡片截图。
</p>

图片显示了一个垂直堆叠卡片，其中有 4 个按钮排列在水平堆叠卡片中，以及一个实体选择器。按钮使用切换动作来运行脚本，例如 Netflix 脚本，它会启动电视并打开 Netflix。要了解如何创建脚本，请参阅[脚本](/home-assistant/docs/scripts/)。

```yaml
type: vertical-stack
cards:
  - entities:
      - entity: input_select.living_room_scene
        name: Scene
    show_header_toggle: false
    type: entities
  - type: horizontal-stack
    cards:
      - name: Watch Netflix
        entity: script.netflix
        type: button
        tap_action:
          action: toggle
        hold_action:
          action: more-info
        show_name: true
        show_icon: true
      - name: Watch YouTube
        entity: script.youtube
        type: button
        tap_action:
          action: toggle
        hold_action:
          action: more-info
        show_name: true
        show_icon: true
      - name: Wake PC
        entity: script.wake_on_lan
        type: button
        tap_action:
          action: toggle
        icon: mdi:desktop-tower
        show_name: true
        show_icon: true
        show_state: false
      - name: Go to sleep
        entity: script.sleep
        type: button
        tap_action:
          action: toggle
        icon: mdi:sleep
        hold_action:
          action: more-info
        show_name: true
        show_icon: true
```

## 可用颜色

以下颜色可用于着色按钮卡片：`primary`、`accent`、`disabled`、`red`、`pink`、`purple`、`deep-purple`、`indigo`、`blue`、`light-blue`、`cyan`、`teal`、`green`、`light-green`、`lime`、`yellow`、`amber`、`orange`、`deep-orange`、`brown`、`grey`、`blue-grey`、`black`、`white`，或任何十六进制颜色代码（例如 `#93c47d`）。