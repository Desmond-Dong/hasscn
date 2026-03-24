---
title: 统计图表卡片
description: 统计图表卡片允许您为列出的每个实体显示统计数据图表。
---
统计图表卡片允许您为列出的每个实体显示统计数据图表。

<p class='img'>
<img src='/home-assistant/images/dashboards/statistics_graph_line.png' alt='电力实体统计图表卡片的截图'>
未使用计量实体且 `chart_type` 为 `line` 时的统计图表卡片截图。
</p>

<p class='img'>
<img src='/home-assistant/images/dashboards/statistics_graph_bar.png' alt='能量实体统计图表卡片的截图'>
使用计量实体且 `chart_type` 为 `bar` 时的统计图表卡片截图。
</p>

对于状态类为 measurement、total 或 total_increasing 的传感器，系统会每 5 分钟收集一次统计数据，并每小时再汇总一次。5 分钟级统计数据会按[记录器配置](/home-assistant/integrations/recorder/#purge_keep_days)中设置的时长保留，而小时级统计数据会无限期保留。它会为特定小时保留传感器数值的 <abbr title="Minimum">`min`</abbr>、<abbr title="Maximum">`max`</abbr> 和 <abbr title="Average">`mean`</abbr>，或者为计量实体保留 <abbr title="Total">`sum`</abbr>。

如果您的传感器无法使用统计功能，请查看[这篇说明](/home-assistant/more-info/statistics/)。

要将统计图表卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管该仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦您接管了控制权，就无法让这个特定的仪表盘恢复自动更新。不过，您可以创建一个新的默认仪表盘。
     - 要继续，请在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [向仪表盘添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式，或只是更喜欢在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: statistics-graph
  type: string
实体:
  required: true
  description: "实体 ID 或 `entity` 对象的列表（见下文），也可以是外部统计 ID"
  type: list
days_to_show:
  required: false
  description: 图表中显示的天数。最少为 1 天。
  type: integer
  default: 30
chart_type:
  required: false
  description: 图表应渲染为 `bar` 柱状图还是 `line` 折线图。
  type: string
stat_types:
  required: false
  description: 要渲染的统计类型。`min`、`max`、`mean`、`sum`、`state`、`change`
  type: list
title:
  required: false
  description: 卡片标题。
  type: string
period:
  required: false
  description: 渲染图表的时间粒度。可以是 `5minute`、`hour`、`day`、`week`、`month` 或 `year`。如果 `energy_date_selection` 为 true 且未定义 `period`，图表时间粒度会根据所选日期范围在 month、day 和 hour 之间自动选择。
  type: string  
hide_legend:
  required: false
  description: 如果为 true，则隐藏图例。
  type: boolean  
  default: false
logarithmic_scale:
  required: false
  description: 如果为 true，则 Y 轴上的数值会以对数刻度显示。
  type: boolean
  default: false
min_y_axis:
  required: false
  description: Y 轴范围的下界。
  type: float
max_y_axis:
  required: false
  description: Y 轴范围的上界。
  type: float
fit_y_data:
  required: false
  description: 如果为 true，则已配置的 Y 轴边界会自动扩展（但不会收缩）以适配数据。
  type: boolean
  default: false
expand_legend:
  required: false
  description: 如果为 true，则图例初始会显示所有项目。
  type: boolean
  default: false
energy_date_selection:
  required: false
  description: 如果为 true，则图表日期范围会跟随同一视图中的 `energy-date-selection` 卡片所选日期，类似能量卡片的行为。
  type: boolean  
  default: false
collection_key:
  required: false
  description: 如果使用 `energy_date_selection`，您可以设置一个自定义键，以匹配 `energy-date-selection` 卡片的可选键。这通常不是必需的，但如果同一视图中使用了多个日期选择卡片，会很有帮助。
  type: string

### 实体的选项

如果您将实体定义为对象而不是字符串，还可以添加更多自定义和配置：

实体:
  required: true
  description: 实体 ID。
  type: string
name:
  required: false
  description: 覆盖友好名称。可以是字符串，或名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。
  type: [string, map, list]

### 示例

```yaml
type: statistics-graph
title: 'My Graph'
entities:
  - sensor.outside_temperature
  - entity: sensor.inside_temperature
    name: Inside
```
