---
title: 网格卡片
description: 网格卡片可让您以网格方式显示多张卡片。
---
网格卡片可让您以网格方式显示多张卡片。它会先填满列，并在需要时自动添加新行。

<p class='img'>
  <img src='/home-assistant/images/dashboards/grid.png' alt='网格卡片截图'>
  网格卡片截图。
</p>

要将网格卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦您接管了控制权，您将无法让这个特定仪表盘恢复自动更新。不过，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式，或只是更喜欢在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`grid`"
  type: string
title:
  required: false
  description: 网格标题。
  type: string
square:
  required: false
  description: 卡片是否以正方形显示。
  type: boolean
  default: true
columns:
  required: false
  description: 网格中的列数。
  type: integer
  default: 3
cards:
  required: true
  description: 卡片列表。
  type: list

## 示例

基本示例：

```yaml
type: grid
cards:
  - type: picture-entity
    entity: camera.demo_camera
    show_info: false
  - type: entities
    entities:
      - binary_sensor.movement_backyard
```

定义列数并禁用正方形选项：

```yaml
type: grid
title: Backyard
columns: 2
square: false
cards:
  - type: picture-entity
    entity: group.all_lights
    image: /local/house.png
  - type: horizontal-stack
    cards:
      - type: picture-entity
        entity: light.ceiling_lights
        image: /local/bed_1.png
      - type: picture-entity
        entity: light.bed_light
        image: /local/bed_2.png
```
