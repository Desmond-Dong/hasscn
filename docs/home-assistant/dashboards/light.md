---
title: 灯光卡片
description: 灯光卡片允许您更改灯光的亮度。
---
灯光卡片允许您更改灯光的亮度。

<p class='img'>
<img src='/home-assistant/images/dashboards/light_card.png' alt='灯光卡片截图'>
灯光卡片截图。
</p>

要将灯光卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   - 如果这是您第一次编辑仪表盘，会出现**编辑仪表盘**对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它不再自动更新。
     - 一旦接管控制，您无法让此特定仪表盘恢复自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点菜单 `[mdi:dots-vertical]`，然后选择**接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`light`"
  type: string
实体:
  required: true
  description: "`light` 域的实体 ID。"
  type: string
name:
  required: false
  description: "覆盖友好名称。可以是字符串，或名称配置对象。参见[命名文档](/home-assistant/dashboards/naming/)。"
  type: [string, map, list]
  default: 实体名称
icon:
  required: false
  description: "覆盖图标。"
  type: string
  default: 实体域图标
theme:
  required: false
  description: "使用任何已加载的主题覆盖此卡片使用的主题。有关主题的更多信息，请参见[前端文档](/home-assistant/integrations/frontend/)。"
  type: string
hold_action:
  required: false
  description: "长按卡片时执行的动作。参见[动作文档](/home-assistant/dashboards/actions/#hold-action)。"
  type: map
double_tap_action:
  required: false
  description: "双击卡片时执行的动作。参见[动作文档](/home-assistant/dashboards/actions/#double-tap-action)。"
  type: map

### 示例

基本示例：

```yaml
type: light
entity: light.bedroom
```

覆盖名称示例：

```yaml
type: light
entity: light.bedroom
name: Kids Bedroom
```

```yaml
type: light
entity: light.office
name: My Office
```

<p class='img'>
<img src='/home-assistant/images/dashboards/light_complex_card.png' alt='灯光卡片截图'>
灯光卡片名称截图。
</p>