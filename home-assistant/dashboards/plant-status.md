# 植物状态卡片

植物状态卡片是为所有可爱的植物爱好者准备的。

<p class='img'>
<img src='/home-assistant/images/dashboards/plant_card.png' alt='植物状态卡片截图'>
植物状态卡片截图。
</p>

要将植物状态卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   * 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     * 通过编辑仪表盘，您将接管此仪表盘的控制权。
     * 这意味着当新的仪表盘元素可用时，它不再自动更新。
     * 一旦您接管了控制权，您将无法让此特定仪表盘恢复自动更新。但是，您可以创建一个新的默认仪表盘。
     * 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard) 到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中更喜欢使用 YAML 时，可以使用以下 YAML 选项。

type:
required: true
description: "`plant-status`"
type: string
实体:
required: true
description: "`plant` 域的实体 ID。更多信息，请参阅 [`plant` 集成](/home-assistant/integrations/plant.md)。"
type: string
name:
required: false
description: 覆盖友好名称。可以是字符串或名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。
type: \[string, map, list]
default: 实体名称
theme:
required: false
description: 使用任何已加载的主题覆盖此卡片所使用的主题。关于主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/index.md)。
type: string

### 示例

基本示例：

```yaml
type: plant-status
entity: plant.bonsai
```
