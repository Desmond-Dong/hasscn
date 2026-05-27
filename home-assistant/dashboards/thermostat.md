# 温控器卡片

温控器卡片可让您控制[温控](/home-assistant/integrations/index.md#climate)或[热水器](/home-assistant/integrations/index.md#water_heater)实体，允许您更改实体的温度和模式。

<p class='img'>
  <img src='/home-assistant/images/dashboards/thermostat_card.png' alt='温控器卡片截图'>
  温控器卡片截图。
</p>

要将卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   * 如果这是您第一次编辑仪表盘，会出现**编辑仪表盘**对话框。
     * 通过编辑仪表盘，您将接管此仪表盘的控制权。
     * 这意味着当新的仪表盘元素可用时，它不再自动更新。
     * 一旦接管控制权，您无法将此特定仪表盘恢复为自动更新。但是，您可以创建一个新的默认仪表盘。
     * 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择**接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
required: true
description: "`thermostat`"
type: string
entity:
required: true
description: "`climate` 或 `water_heater` 域的实体 ID。"
type: string
name:
required: false
description: "覆盖友好名称。可以是字符串或名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。"
type: \[string, map, list]
default: 实体名称
theme:
required: false
description: "使用任何已加载的主题覆盖此卡片使用的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/index.md)。"
type: string
show\_current\_as\_primary:
required: false
description: "将当前温度显示为主要信息，而不是目标温度。目标温度将显示为次要信息。"
type: boolean
default: false
features:
required: false
description: "用于控制实体的附加组件。请参阅[可用功能](/home-assistant/dashboards/features)。仅支持温控或热水器相关功能。"
type: list

### 示例

```yaml
type: thermostat
entity: climate.nest
```
