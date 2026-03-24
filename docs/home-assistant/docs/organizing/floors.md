---
title: 楼层
description: 按楼层对区域进行分组
---

Home Assistant 中的楼层是一个逻辑分组，旨在与您家中的物理楼层相匹配。

设备和实体不能直接分配给楼层，而是分配给区域。楼层可以在自动化和脚本中作为动作的目标。例如，在您就寝时关闭楼下楼层的所有灯光。

## 创建楼层

按照以下步骤创建新楼层。

1. 进入 [**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/areas/)，然后选择 **创建楼层**。
2. 在对话框中，输入楼层详情：
   - 为楼层命名（必填）。
   - 添加楼层 **层级**。
     - 数字可以是负数。例如用于地下楼层。
     - 此数字稍后可用于排序。
    - 添加图标（我们使用 [Material 图标](https://pictogrammers.com/library/mdi/)）。
   - 添加 **别名**。
     - 别名是 [语音助手](/home-assistant/voice_control/aliases/) 中用于引用实体、区域或楼层的替代名称。

    ![创建楼层对话框](/home-assistant/images/organizing/create_floor_01.png)
3. 选择 **添加**。

   **结果**：新楼层已创建。

    ![创建楼层对话框](/home-assistant/images/organizing/create_floor_02.png)
4. 您现在可以[将区域分配给该楼层](/home-assistant/docs/organizing/areas/#assigning-areas-to-floors-and-add-labels)。

## 在内置仪表盘上重新排列楼层

按照以下步骤在内置仪表盘（如 **概览**、**灯光** 和 **安全**）上重新排列楼层和区域。

1. 进入 [**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/areas/)。
2. 有两个选项可以重新排列项目：
   - **选项 1**：使用拖放功能。
   - **选项 2**：在右上角选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **重新排列楼层和区域**。
     - 在对话框中，移动您想要重新排列的楼层或区域：

     ![重新排列楼层和区域](/home-assistant/images/organizing/reorder-areas-menu.png)

## 删除楼层

按照以下步骤删除楼层。分配给楼层的区域将变为未分配状态。使用楼层作为目标的自动化和脚本或语音助手将不再工作，因为它们不再有目标。

1. 进入 [**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/areas/)。
2. 在楼层旁边，选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **删除楼层**。

    ![显示删除楼层对话框的截图](/home-assistant/images/organizing/floor_delete.png)

3. 如果您有使用楼层作为目标的自动化、脚本或语音助手，您需要更新这些内容。
