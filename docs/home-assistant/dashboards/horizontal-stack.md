---
title: 水平堆叠卡片
description: '水平堆叠卡片可将多张卡片并排堆叠在同一列宽中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 水平堆叠卡片

水平堆叠卡片可将多张卡片并排堆叠在同一列宽中。

要将水平堆叠卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦您接管了控制权，您将无法让这个特定仪表盘恢复自动更新。不过，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

## YAML 配置

当您使用 YAML 模式，或只是更喜欢在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`horizontal-stack`"
  type: string
title:
  required: false
  description: 堆叠标题。
  type: string
cards:
  required: true
  description: 卡片列表。
  type: list

### 示例

```yaml
type: horizontal-stack
title: Lights
cards:
  - type: picture-entity
    image: /local/bed_1.png
    entity: light.ceiling_lights
  - type: picture-entity
    image: /local/bed_2.png
    entity: light.bed_light
```

<p class='img'>
  <img src='/home-assistant/images/dashboards/horizontal_stack.png' alt='水平堆叠卡片中的两张图片卡片'>
  水平堆叠卡片中的两张图片卡片。
</p>
