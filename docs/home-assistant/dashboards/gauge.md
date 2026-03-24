---
title: 仪表卡片
description: 仪表卡片是一种基础卡片，可以直观地显示传感器数据。
---
仪表卡片是一种基础卡片，可以直观地显示传感器数据。

<p class='img'>
<img src='/home-assistant/images/dashboards/gauge_card.gif' alt='仪表卡片截图'>
仪表卡片截图。
</p>

<p class='img'>
<img src='/home-assistant/images/dashboards/gauge_needle_card.png' alt='指针模式下的仪表卡片截图'>
指针模式下的仪表卡片截图。
</p>

将卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   - 如果这是您第一次编辑仪表盘，会出现**编辑仪表盘**对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它不再自动更新。
     - 一旦接管控制，您无法让此特定仪表盘恢复自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三点菜单 `[mdi:dots-vertical]`，然后选择**接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`gauge`"
  type: string
实体:
  required: true
  description: 要显示的实体 ID。
  type: string
attribute:
  required: false
  description: 要显示的所选实体的属性
  type: string
name:
  required: false
  description: 覆盖友好名称。可以是字符串，或名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。
  type: [string, map, list]
  default: 实体名称
unit:
  required: false
  description: 赋予数据的计量单位。
  type: string
  default: 实体提供的计量单位
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片使用的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/)。
  type: string
min:
  required: false
  description: 图表的最小值。
  type: integer
  default: 0
max:
  required: false
  description: 图表的最大值。
  type: integer
  default: 100
needle:
  required: false
  description: 将仪表显示为指针式仪表。如果使用分段，则需要设置为 true。
  type: boolean
  default: false
severity:
  required: false
  description: 允许为不同数值设置颜色。
  type: map
  keys:
    green:
      required: true
      description: 绿色开始的数值。
      type: integer
    yellow:
      required: true
      description: 黄色开始的数值。
      type: integer
    red:
      required: true
      description: 红色开始的数值。
      type: integer
segments:
  required: false
  description: 颜色及其对应起始值的列表。分段将覆盖严重性设置。needle 必须为 true。
  type: list
  keys:
    from:
      required: true
      description: 颜色开始的数值。
      type: integer
    color:
      required: true
      description: 分段的颜色，可以是任何 CSS 颜色声明，如 "red"、"#0000FF" 或 "rgb(255, 120, 0)"。
      type: string
    label:
      required: false
      description: 分段的标签。这将代替数值显示。
      type: string
tap_action:
  required: false
  description: 点击卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-action)。
  type: map
hold_action:
  required: false
  description: 长按卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#hold-action)。
  type: map
double_tap_action:
  required: false
  description: 双击卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#double-tap-action)。
  type: map

### 示例

标题和计量单位：

```yaml
type: gauge
name: CPU Usage
unit: '%'
entity: sensor.cpu_usage
```

<p class='img'>
<img src='/home-assistant/images/dashboards/gauge_card.gif' alt='带有自定义标题和计量单位的仪表卡片截图'>
带有自定义标题和计量单位的仪表卡片截图。
</p>

定义严重性映射：

```yaml
type: gauge
name: With Severity
unit: '%'
entity: sensor.cpu_usage
severity:
  green: 0
  yellow: 45
  red: 85
```

多个分段：

<p class='img'>
<img src='/home-assistant/images/dashboards/gauge_segments.png' alt='带有多个颜色分段的仪表卡片截图'>
带有多个颜色分段的仪表卡片截图。
</p>

```yaml
type: gauge
entity: sensor.kitchen_humidity
needle: true
min: 20
max: 80
segments:
  - from: 0
    color: '#db4437'
  - from: 35
    color: '#ffa600'
  - from: 40
    color: '#43a047'
  - from: 60
    color: '#ffa600'
  - from: 65
    color: '#db4437'
```

可以使用 CSS 变量（代替 CSS '#rrggbb'）作为默认仪表分段颜色：

- `var(--success-color)` 用于绿色
- `var(--warning-color)` 用于黄色
- `var(--error-color)` 用于红色
- `var(--info-color)` 用于蓝色

因此，前面的示例也可以定义为：

```yaml
type: gauge
entity: sensor.kitchen_humidity
needle: true
min: 20
max: 80
segments:
  - from: 0
    color: var(--error-color)
  - from: 35
    color: var(--warning-color)
  - from: 40
    color: var(--success-color)
  - from: 60
    color: var(--warning-color)
  - from: 65
    color: var(--error-color)
```

显示实体的属性而非状态：

```yaml
type: gauge
entity: sensor.back_door_info
attribute: battery_level
unit: '%'
max: 100
```

在此示例中，卡片显示 `sensor.back_door_info` 实体的 `battery_level` 属性。