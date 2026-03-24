---
title: 历史图表卡片
description: 历史图表卡片允许您为列出的每个实体显示图表。
---
历史图表卡片允许您为最多八个实体分别显示图表。

<p class='img'>
<img src='/home-assistant/images/dashboards/history_graph.png' alt='没有 unit_of_measurement 的实体的历史图表卡片截图'>
没有定义 `unit_of_measurement` 的传感器的历史图表卡片截图。
</p>

<p class='img'>
<img src='/home-assistant/images/dashboards/history_graph_lines.png' alt='有 unit_of_measurement 的实体的历史图表卡片截图'>
定义了 `unit_of_measurement` 的传感器的历史图表卡片截图。
</p>

要将卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它不会再自动更新。
     - 一旦您接管了控制权，您无法让此特定仪表盘恢复自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard) 到您的仪表盘。

只有 y 轴和对数刻度设置可以通过用户界面进行配置。要配置此卡片的其他选项，您需要编辑 YAML 配置。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中偏好使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: history-graph
  type: string
实体:
  required: true
  description: "实体 ID 列表或 `entity` 对象，见下方说明。"
  type: list
hours_to_show:
  required: false
  description: 图表中显示的小时数。最少为 1 小时。较大的值可能导致渲染延迟，特别是当选定的实体有大量状态变化时。
  type: integer
  default: 24
title:
  required: false
  description: 卡片标题。
  type: string
show_names:
  required: false
  description: 如果为 false，卡片中不显示实体名称。
  type: boolean
  default: true
logarithmic_scale:
  required: false
  description: 如果为 true，Y 轴上的数值将以对数刻度显示。
  type: boolean
  default: false
min_y_axis:
  required: false
  description: Y 轴范围的下限。
  type: float
max_y_axis:
  required: false
  description: Y 轴范围的上限。
  type: float
fit_y_data:
  required: false
  description: 如果为 true，配置的 Y 轴边界将自动扩展（但不会收缩）以适应数据。
  type: boolean
  default: false
expand_legend:
  required: false
  description: 如果为 true，图例最初将显示所有项目
  type: boolean
  default: false

### 实体选项

如果您将实体定义为对象而不是字符串，您可以添加更多自定义和配置：

实体:
  required: true
  description: 实体 ID。
  type: string
name:
  required: false
  description: 覆盖友好名称。可以是字符串或名称配置对象。参见 [命名文档](/home-assistant/dashboards/naming/)。
  type: [string, map, list]

### 长期统计

如果实体的 state_class 为 measurement、total 或 total_increasing，Home Assistant 会为其保存长期统计数据。对于长期统计，会从传感器历史中存储每小时聚合数据。长期统计永远不会被清除。

在历史图表卡片中，如果显示小时数变量设置为高于记录器保留期的数值，长期统计将回填历史图表的较旧部分，而记录器中较新的实际传感器值则以粗体显示。

### 示例

```yaml
type: history-graph
title: 'My Graph'
entities:
  - sensor.outside_temperature
  - entity: media_player.lounge_room
    name: Main player
```

或者使用更长的时间范围，并在一个图表中显示多个实体（只要它们共享相同的 unit_of_measurement）：

```yaml
type: history-graph
title: "Temperatures in the last 48 hours"
hours_to_show: 48
entities:
  - sensor.outside_temperature
  - entity: sensor.lounge_temperature
    name: "Lounge"
  - entity: sensor.attic_temperature
    name: "Attic"
```