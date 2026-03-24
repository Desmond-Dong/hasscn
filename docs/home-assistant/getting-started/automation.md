---
title: Home Assistant 自动化
description: 快速入门：创建您的第一个自动化
---

设置好设备后，是时候锦上添花了：自动化。

我们将创建两个自动化：一个在日落时打开灯光，另一个在工作日前一天的晚上特定时间调暗灯光。

## 日落前打开灯光

### 前提条件

本教程假设以下条件：

- 您已经[安装了 Home Assistant](/home-assistant/installation/)
- 您已完成[初始设置步骤](/home-assistant/getting-started/onboarding/)
- 您已按照[添加集成](/home-assistant/getting-started/integration/)的步骤操作
- 您有一个已集成到 Home Assistant 的灯光
  - 如果您还没有灯光，不确定买什么，试试 [Philips Hue](/home-assistant/integrations/hue/)、[nanoleaf](/home-assistant/integrations/nanoleaf/) 或支持 [WLED](/home-assistant/integrations/wled/) 的产品

### 自动在日落前打开灯光

1. 转到 [**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automations/) 并选择 **创建自动化**。

    ![自动化编辑器](/home-assistant/images/getting-started/automation-editor.png)

   - 然后，选择 **创建新自动化**。这将打开一个空的自动化页面。

     ![新自动化开始](/home-assistant/images/getting-started/new-automation.png)

2. 第一步是定义什么应该触发自动化运行。
   - 在这种情况下，我们要使用日落事件来触发自动化。
   - 选择 **添加触发器**，输入 `sun` 并选择它。
   ![使用太阳作为触发器](/home-assistant/images/getting-started/sun-trigger.png)
3. 选择 **日落**。
   - 我们希望自动化在那之前一点触发，所以添加 `-00:30` 作为偏移。这表示自动化将在日落前 30 分钟触发。很棒！

    ![填写了太阳触发器的新自动化](/home-assistant/images/getting-started/new-trigger.png)

4. 定义触发器后，我们需要定义应该发生什么。
   - 选择 **添加动作**。
5. 输入 `light` 并选择 **打开灯光**。
   - 对于此自动化，我们将打开客厅的所有灯光，所以选择 **区域**。
   - 这只有在您的灯光分配到区域时才有效。
   - 要了解更多关于在区域中分组设备的信息，请参阅[区域文档](/home-assistant/docs/organizing/areas/)。

   ![设置了打开客厅灯光动作的新自动化](/home-assistant/images/getting-started/action.png)

6. 要保存自动化，选择 **保存**。给自动化命名，添加 **描述**，然后再次 **保存**。
   - 选择名称时，要具体，这样即使有很多自动化也能找到它。例如，`日落时打开客厅台灯`。
   - 现在等到日落前 30 分钟，看看您的自动化魔法！
   - 或者按照这些步骤立即[测试您的自动化](/home-assistant/docs/automation/troubleshooting/#testing-your-automation)。

## 工作日前一晚调暗灯光

此自动化在工作日前一天的特定时间调暗灯光。

### 前提条件

本教程假设以下条件：

- 您已经[安装了 Home Assistant](/home-assistant/installation/)
- 您已完成[初始设置步骤](/home-assistant/getting-started/onboarding/)
- 您已按照[添加集成](/home-assistant/getting-started/integration/)的步骤操作
- 您有一个已集成到 Home Assistant 的可调光灯光

### 工作日前一晚调暗灯光

1. 转到 [**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automations/) 并选择 **创建自动化**。

    ![自动化编辑器](/home-assistant/images/getting-started/automation-editor.png)

   - 然后，选择 **创建新自动化**。这将打开一个空的自动化页面。

     ![新自动化开始](/home-assistant/images/getting-started/new-automation.png)

2. 我们希望灯光在 21:45 开始变暗。这意味着我们需要一个由时间触发的自动化。
   - 选择 **添加触发器** > **时间和位置** > **时间**。
   - 选择 **固定时间** 并输入时间。

    ![填写了固定时间触发器的新自动化](/home-assistant/images/getting-started/automation_trigger_fixed_time.png)

3. 我们只想在明天是工作日时执行此操作。
   - 选择 **添加条件** > **实体** > **状态**。
   - 在 **实体** 下，输入 `workd` 并选择您的工作日传感器。
   - 在 **状态** 下，选择 **开启**。
4. 接下来，我们要确保只有在灯实际打开时才调暗。如果灯没打开，就没有必要这样做。
   - 为此，我们使用 **如果-那么** 动作。选择 **添加动作** > **构建块** > **如果-那么**。
   - 您现在会看到一个名为 **条件执行动作** 的块。从 **实体** 列表中，选择您的灯光。
   - 在 **如果** 下，选择 **添加条件** > **实体** > **状态**。
   - 在 **状态** 下，选择 **开启**。

    ![显示“如果-那么”动作中“如果”部分的截图](/home-assistant/images/getting-started/automation_if-then-action_if.png)

5. 现在我们要定义条件为真时（当灯打开时）执行的动作。
   - 在 **那么** 下，选择 **添加动作** > **打开灯光**。
   - 在 **实体** 下，选择您的灯光。
   - 定义灯光设置，如亮度、色温或颜色。可用设置取决于您的灯光。

    ![显示“如果-那么”动作中“那么”部分的截图](/home-assistant/images/getting-started/automation_if-then-action_then.png)

6. 要保存自动化，选择 **保存**。给自动化命名（例如，`工作日前一晚调暗客厅台灯`），添加 **描述**，然后再次 **保存**。
7. [测试您的自动化](/home-assistant/docs/automation/troubleshooting/#testing-your-automation)。

:::info [在场检测](/home-assistant/getting-started/presence-detection/)
:::

完成此入门后，如果您有兴趣阅读更多关于自动化的内容，我们推荐以下页面：

- [触发器](/home-assistant/docs/automation/trigger/)
- [条件](/home-assistant/docs/automation/condition/)
- [动作](/home-assistant/docs/automation/action/)

请注意，这些页面可能需要比您在本教程此时更多的 Home Assistant 经验。
