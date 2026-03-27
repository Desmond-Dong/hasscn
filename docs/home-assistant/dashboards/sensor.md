---
title: 传感器卡片
description: '传感器卡片为您提供传感器的快速状态概览，并可选择图表来可视化随时间的变化。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 传感器卡片

传感器卡片为您提供传感器的快速状态概览，并可选择图表来可视化随时间的变化。

<p class='img'>
  <img src='/home-assistant/images/dashboards/sensor.png' alt='传感器卡片截图'>
  传感器卡片截图。
</p>

要将传感器卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管该仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦您接管了控制权，就无法让这个特定的仪表盘恢复自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard) 到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中倾向于使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`sensor`"
  type: string
实体:
  required: true
  description: "`sensor` 域的实体 ID。"
  type: string
icon:
  required: false
  description: 卡片图标。
  type: string
name:
  required: false
  description: 覆盖友好名称。可以是字符串，或名称配置对象。参见 [命名文档](/home-assistant/dashboards/naming/)。
  type: [string, map, list]
graph:
  required: false
  description: 图表类型（`none` 或 `line`）。
  type: string
unit:
  required: false
  description: 计量单位。
  type: string
detail:
  required: false
  description: 图表详细程度 `1` 或 `2`（`1` = 每小时一个点，`2` = 每小时六个点）。
  type: integer
  default: 1
hours_to_show:
  required: false
  description: 图表中显示的小时数。最少为 1 小时。较大的值可能会导致渲染延迟，特别是当所选实体有大量状态变化时。
  type: integer
  default: 24
limits:
  required: false
  description: 图表 Y 轴的限制。
  type: map
  keys:
    min:
      description: 图表 Y 轴的最小值。
      type: float
      required: false
      default: 显示值中的最小样本值。
    max:
      description: 图表 Y 轴的最大值。
      type: float
      required: false
      default: 显示值中的最大样本值。
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片所使用的主题。关于主题的更多信息，请参见 [前端文档](/home-assistant/integrations/frontend/)。
  type: string

:::note
`hours_to_show` 选项控制图表中显示的历史数据的时间范围。可用的历史数据量取决于记录器的 `purge_keep_days` 设置。默认情况下，记录器会清除超过 10 天的数据。更多信息请参见 [记录器集成文档](/home-assistant/integrations/recorder/#purge_keep_days)。
:::

### 示例

基本传感器卡片：

```yaml
type: sensor
entity: sensor.illumination
name: Illumination
```

带有历史数据图表的传感器卡片：

```yaml
type: sensor
entity: sensor.my_temperature
graph: line
hours_to_show: 720 # 仅当此sensor存在历史记录时才显示 30 天的历史数据
```