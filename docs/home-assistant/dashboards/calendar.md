---
title: 日历卡片
description: '日历卡片以月、日和列表视图（7天）显示您的日历实体。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 日历卡片

日历卡片以月、日和列表视图（7天）显示您的日历实体。

<p class='img'>
  <img src='/home-assistant/images/dashboards/calendar_card.png' alt='日历卡片截图'>
  日历卡片截图。
</p>

要将日历卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它不再自动更新。
     - 一旦接管控制，您无法将此特定仪表盘恢复为自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中，选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard) 到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式或在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`calendar`"
  type: string
title:
  required: false
  description: 卡片的标题。
  type: string
initial_view:
  required: false
  description: "卡片加载到页面时首先显示的视图。选项有 `dayGridMonth`、`dayGridDay` 和 `listWeek`。请注意 `listWeek` 显示的是接下来的 7 天，而不是日历周。"
  type: string
实体:
  required: true
  description: 将在卡片中显示的日历实体列表。
  type: list
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片使用的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/)。
  type: string

### 示例

```yaml
type: calendar
entities:
  - calendar.calendar_1
  - calendar.calendar_2
```