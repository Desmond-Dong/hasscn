---
title: 媒体控制卡片
description: 媒体控制卡片用于显示媒体播放器实体，并提供易于使用的控制功能。
---

媒体控制卡片用于在界面中显示[媒体播放器](/home-assistant/integrations/#media-player)实体，并提供易于使用的控制功能。

<p class='img'>
<img src='/home-assistant/images/dashboards/mediaplayer.png' alt='媒体控制卡片截图'>
媒体控制卡片截图。
</p>

要将媒体控制卡片添加到您的界面：

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
  description: "`media-control`"
  type: string
entity:
  required: true
  description: "`media_player` 域中的实体 ID。"
  type: string
name:
  required: false
  description: 覆盖友好名称。可以是字符串，也可以是名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。
  type: [string, map, list]
  default: 实体名称。
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片所使用的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/)。
  type: string

### 示例

基本示例：

```yaml
type: media-control
entity: media_player.lounge_room
```
