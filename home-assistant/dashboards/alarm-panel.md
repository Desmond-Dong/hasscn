# 报警面板卡片

报警面板卡片允许您对[报警控制面板](/home-assistant/integrations/index.md#报警)进行设防和解除设防操作。

<p class='img'>
<img src='/home-assistant/images/dashboards/alarm_panel_card.gif' alt='报警面板卡片截图'>
报警面板卡片截图。
</p>

要将报警面板卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   * 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     * 通过编辑仪表盘，您将接管此仪表盘的控制权。
     * 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     * 一旦您接管了控制权，您将无法将此特定仪表盘恢复为自动更新。但是，您可以创建一个新的默认仪表盘。
     * 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式或在 UI 代码编辑器中偏好使用 YAML 时，可使用以下 YAML 选项。

type:
required: true
description: "`alarm-panel`"
type: string
实体:
required: true
description: `alarm_control_panel` 域的实体 ID。
type: string
name:
required: false
description: 覆盖友好名称。可以是字符串或名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。
type: \[string, map, list]
default: 报警实体的当前状态。
states:
required: false
description: 控制可用的状态。
type: list
default: "`arm_home, arm_away`"
keys:
arm\_home:
description: 在家设防
arm\_away:
description: 离家设防
arm\_night:
description: 夜间设防
arm\_custom\_bypass:
description: 自定义旁路设防
theme:
required: false
description: 使用任何已加载的主题覆盖此卡片的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/index.md)。
type: string

### 示例

标题示例：

```yaml
type: alarm-panel
name: House Alarm
entity: alarm_control_panel.alarm
```

<p class='img'>
<img src='/home-assistant/images/dashboards/alarm_panel_title_card.gif' alt='报警面板卡片截图'>
报警面板卡片截图。
</p>

定义状态列表：

```yaml
type: alarm-panel
name: House Alarm
entity: alarm_control_panel.alarm
states:
  - arm_home
  - arm_away
  - arm_night
  - armed_custom_bypass
```
