# 侧边栏视图

侧边栏视图有两列，一列较宽，右侧还有一列较窄。

<p class='img'>
<img src='/home-assistant/images/dashboards/sidebar_view.png' alt='侧边栏视图的截图'>
用于能量仪表盘的侧边栏视图截图。
</p>

要将卡片从主列移动到侧边栏（右侧），或反向移动，请选择卡片上的箭头 `[mdi:arrow-left-bold]` `[mdi:arrow-right-bold]` 按钮。

<p class='img'>
<img src='/home-assistant/images/dashboards/sidebar_view_move_card.png' alt='展示如何移动卡片的截图'>
展示箭头按钮如何移动卡片的截图。
</p>

在移动设备上，所有卡片都会按 YAML 配置中指定的顺序显示为单列。

1. 要查看 YAML 配置，请在视图选项卡中选择 `[mdi:pencil]` 图标以打开编辑视图。
2. 在配置对话框中，选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **在 YAML 中编辑**。

<p class='img'>
<img src='/home-assistant/images/dashboards/view_edit_config.png' alt='展示在哪里编辑视图配置的截图'>
展示在哪里编辑视图配置的截图。
</p>

## 视图配置

type:
required: true
description: "`sidebar`"
type: string

## 卡片配置

view\_layout.position:
required: false
description: "卡片的位置，可以是 `main` 或 `sidebar`"
type: string

### 示例

卡片的位置可通过 `view_layout` 选项使用 YAML 进行配置：

```yaml
type: sidebar
cards:
  - type: entities
    entities: 
      - media_player.lounge_room
    view_layout:
      position: sidebar
```
