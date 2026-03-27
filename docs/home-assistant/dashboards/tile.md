---
title: 磁贴卡片
description: '磁贴卡片为您提供实体的快速概览。该卡片允许您添加点击操作和功能来控制实体。您也可以选择点击以打开更多信息对话框。某些实体（如温控(/home-assistant/integrations/climate)或人员(/home-assistant/integrations/person)实体）会显示徽章。'
---
# 磁贴卡片

磁贴卡片为您提供实体的快速概览。该卡片允许您添加点击操作和功能来控制实体。您也可以选择点击以打开**更多信息**对话框。某些实体（如[温控](/home-assistant/integrations/climate)或[人员](/home-assistant/integrations/person)实体）会显示徽章。

<p class='img'>
  <img src='/home-assistant/images/dashboards/tile_card_tap_action.webp' alt='磁贴卡片截图'>
  图标后的圆形背景表示有点击操作。
  "楼下"和"楼上"温控实体有徽章和底部对齐的功能。
</p>

要将磁贴卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   - 如果这是您第一次编辑仪表盘，会出现**编辑仪表盘**对话框。
     - 通过编辑仪表盘，您将接管该仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它不再自动更新。
     - 一旦您接管了控制权，您就无法让这个特定仪表盘恢复自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三点菜单 `[mdi:dots-vertical]`，然后选择**接管控制**。
2. [添加卡片并自定义操作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

## YAML 配置

当您使用 YAML 模式或在 UI 代码编辑器中更喜欢使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`tile`"
  type: string
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
  description: 覆盖实体图标。
  type: string
color:
  required: false
  description: 设置实体激活时的颜色。默认情况下，颜色基于实体的 `state`、`domain` 和 `device_class`。接受[颜色令牌](/home-assistant/dashboards/tile/#available-colors)或十六进制颜色代码。
  type: string
  default: 状态
show_实体_picture:
  required: false
  description: 如果实体有图片，将替换图标。
  type: boolean
  default: false
vertical:
  required: false
  description: 将图标显示在名称和状态上方。
  type: boolean
  default: false
hide_state:
  required: false
  description: 隐藏实体状态。
  type: boolean
  default: false
state_content:
  required: false
  description: >
    状态显示的内容。可以是 `state`、`last_changed`、`last_updated` 或实体的任何属性。可以是包含单个项目的字符串，也可以是字符串项目列表。默认值取决于实体域。
  type: [string, list]
tap_action:
  required: false
  description: 点击卡片时执行的操作。请参阅[操作文档](/home-assistant/dashboards/actions/#tap-action)。默认情况下，会显示"更多信息"对话框。
  type: map
hold_action:
  required: false
  description: 长按时执行的操作。请参阅[操作文档](/home-assistant/dashboards/actions/#hold-action)。
  type: map
double_tap_action:
  required: false
  description: 双击时执行的操作。请参阅[操作文档](/home-assistant/dashboards/actions/#double-tap-action)。
  type: map
icon_tap_action:
  required: false
  description: 点击图标时执行的操作。请参阅[操作文档](/home-assistant/dashboards/actions/#tap-action)。默认情况下，会切换实体（如果可能），否则显示"更多信息"对话框。
  type: map
icon_hold_action:
  required: false
  description: 长按图标时执行的操作。请参阅[操作文档](/home-assistant/dashboards/actions/#hold-action)。
  type: map
icon_double_tap_action:
  required: false
  description: 双击图标时执行的操作。请参阅[操作文档](/home-assistant/dashboards/actions/#double-tap-action)。
  type: map
features:
  required: false
  description: 用于控制实体的附加小部件。请参阅[可用功能](/home-assistant/dashboards/features)。
  type: list
features_position:
  required: false
  description: 磁贴卡片上功能的位置。可以是 `bottom` 或 `inline`。当选项设置为 `inline` 时，仅显示第一个功能。`inline` 与 `vertical` 选项不兼容。
  type: string
  default: bottom

## 示例

或者，可以使用 YAML 配置卡片：

```yaml
type: tile
entity: cover.kitchen_window
```

```yaml
type: tile
entity: light.bedroom
icon: mdi:lamp
color: yellow
```

```yaml
type: tile
entity: person.anne_therese
show_entity_picture: true
```

```yaml
type: tile
entity: person.anne_therese
vertical: true
hide_state: true
```

```yaml
type: tile
entity: light.living_room
state_content:
  - state
  - brightness
  - last-changed
```

```yaml
type: tile
entity: vacuum.ground_floor
features:
  - type: vacuum-commands
    commands:
      - start_pause
      - return_home
```

## 可用颜色

以下颜色可用于着色磁贴卡片：`primary`、`accent`、`disabled`、`red`、`pink`、`purple`、`deep-purple`、`indigo`、`blue`、`light-blue`、`cyan`、`teal`、`green`、`light-green`、`lime`、`yellow`、`amber`、`orange`、`deep-orange`、`brown`、`grey`、`blue-grey`、`black`、`white` 或任何十六进制颜色代码（例如 `#93c47d`）。
