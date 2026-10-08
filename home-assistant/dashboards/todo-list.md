# 待办事项列表卡片

待办事项列表卡片允许您向待办事项列表中添加、编辑、勾选和清除项目。

<p class='img'>
<img src='/home-assistant/images/dashboards/todo-list_card_shopping-list.png' alt='待办事项列表卡片的截图'>
待办事项列表卡片的截图。
</p>

## 添加待办事项列表卡片

1. [使用 **添加卡片** 按钮添加卡片](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)。
   * 在 **按卡片** 对话框中，选择 **待办事项列表** 卡片。
2. 在 **实体** 下拉菜单中，选择您的列表类型。
   * 如果这是您第一次使用待办事项列表，菜单中通常只有 **购物清单**。
   * 它来自默认安装的[购物清单集成](/home-assistant/integrations/shopping_list/index.md)。
   * 这与 **待办事项列表** 仪表盘（可通过侧边栏访问）中的 **购物清单** 是同一个列表。
     ![待办事项卡片，列表实体](/home-assistant/images/dashboards/cards-todo.png).
3. 待办事项列表卡片可以显示来自不同[to-do list](/home-assistant/integrations/index.md#to-do-list) 集成的列表，例如 **Bring!** 或 **Todoist**。
   * 如果您没有看到想要的待办事项列表实体，您需要先添加对应的集成。
   * 添加待办事项列表集成后，这些列表也会出现在待办事项列表仪表盘中。

## YAML 配置

此卡片的所有选项都可以通过用户界面进行配置。

当您使用 YAML 模式，或只是更喜欢在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
required: true
description: "`todo-list`"
type: string
实体:
required: true
description: 要显示的待办事项实体。
type: string
title:
required: false
description: 待办事项列表的标题。
type: string
theme:
required: false
description: 使用任何已加载的主题覆盖此卡片所用的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/index.md)。
type: string
hide\_completed:
required: false
description: 隐藏卡片中的已完成项目区域。
type: boolean
default: "false"
hide\_create:
required: false
description: 隐藏卡片顶部用于创建新任务的文本框。
type: boolean
default: "false"
hide\_section\_headers:
required: false
description: 隐藏带有溢出菜单的“进行中”和“已完成”分区标题。
type: boolean
default: "false"
display\_order:
required: false
description: "可选地对待办事项列表中的项目进行排序后再显示。选项包括：`none`：按原始顺序显示列表。`alpha_asc`：按字母升序排序。`alpha_desc`：按字母降序排序。`duedate_asc`：按截止日期排序（最早到期优先）。`duedate_desc`：按截止日期倒序排序（最晚到期优先）。"
type: string
default: "none"
item\_tap\_action:
required: false
description: "定义单击项目内容时的行为。可选项为：`edit`（打开编辑对话框），`toggle`（将项目标记为已完成或未完成，并隐藏编辑对话框）。"
type: string
default: "edit"

### 示例

标题示例：

```yaml
type: todo-list
entity: todo.todo_list
title: Todo List
```
