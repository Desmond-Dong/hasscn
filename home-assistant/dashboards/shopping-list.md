# 购物清单卡片

注意：购物清单卡片已无法再通过用户界面直接添加。请改用[待办事项列表卡片](/home-assistant/dashboards/todo-list/index.md)。

购物清单卡片允许您向购物清单中添加、编辑、勾选和清除项目。

<p class='img'>
<img src='/home-assistant/images/dashboards/todo-list_card_shopping-list.png' alt='购物清单卡片的截图'>
购物清单卡片的截图。
</p>

使用此卡片前，需要先设置[购物清单集成](/home-assistant/integrations/shopping_list/index.md)。

要将购物清单卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   * 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     * 通过编辑仪表盘，您将接管该仪表盘的控制权。
     * 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     * 一旦您接管了控制权，就无法让这个特定的仪表盘恢复自动更新。不过，您可以创建一个新的默认仪表盘。
     * 要继续，请在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [向仪表盘添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式，或只是更喜欢在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
required: true
description: "`shopping-list`"
type: string
title:
required: false
description: 购物清单的标题。
type: string
theme:
required: false
description: 使用任何已加载的主题覆盖此卡片所用的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/index.md)。
type: string

### 示例

标题示例：

```yaml
type: shopping-list
title: shopping list
```
