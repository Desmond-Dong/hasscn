---
title: 区域
description: 'Home Assistant 中的区域是设备和实体的逻辑分组，旨在匹配您家中物理世界的区域（或房间）。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 区域

Home Assistant 中的区域是设备和实体的逻辑分组，旨在匹配您家中物理世界的区域（或房间）。

例如，"客厅"区域将您客厅中的设备和实体分组在一起。区域允许您通过动作对整组设备进行操作。例如，关闭客厅中的所有灯光。
区域可以分配给楼层。区域还可用于自动生成卡片，例如[区域卡片](/home-assistant/dashboards/area/)。

## 创建区域

按照以下步骤从**区域**视图创建新区域。

1. 前往[**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/areas/)并选择**创建区域**。
2. 在对话框中，输入区域详情：
   - 为区域命名（必填）。
   - 添加图标（我们使用 [Material 图标](https://pictogrammers.com/library/mdi/)）。
   - 将区域分配给楼层。
     - 如果您尚未创建楼层，可以[创建新楼层](/home-assistant/docs/organizing/floors/#creating-a-floor)。
     - 数字可以为负数。例如地下楼层。
     - 此数字稍后可用于排序。
   - 添加代表该区域的图片。
   - 添加**别名**。
     - 别名是[语音助手](/home-assistant/voice_control/aliases/)中用于引用区域、实体或楼层的替代名称。

    ![创建区域对话框](/home-assistant/images/organizing/create_area_01.png)
3. 选择**添加**。

   **结果**：新区域已创建。

## 将区域分配给楼层并添加标签

如果区域尚未分配给楼层，它会显示在**未分配区域**部分。按照以下步骤将区域分配给楼层。

1. 前往[**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/areas/)并选择相应区域。
2. 在区域卡片上，选择编辑 `[mdi:edit]` 按钮。
3. 在对话框中，选择楼层并根据需要添加标签。

## 将区域分配给多个项目

您可以在自动化、脚本、场景和设备页面中一次性将区域分配给多个项目。

1. 根据您要分配的内容，前往以下页面之一：
   - 对于自动化、脚本或场景，前往[**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automation/)并打开相应的标签页。
   - 对于设备，前往[**设置** > **设备与服务** > **设备**](https://my.home-assistant.io/redirect/devices/)。
2. 在列表中，[选择所有要分配给区域的项目](/home-assistant/docs/organizing/tables#selecting-multiple-items-in-a-table)。

    ![截图显示如何将多个设备分配给区域](/home-assistant/images/organizing/area_assign_devices.png)

3. 在右上角，选择**移动到区域**并从列表中选择目标区域。

## 编辑区域

按照以下步骤编辑区域。

1. 前往[**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/areas/)，在区域卡片上选择编辑 `[mdi:edit]` 按钮。
2. 在对话框中，调整您要更改的区域详情：
   - 编辑区域**名称**。
   - 添加图标（我们使用 [Material 图标](https://pictogrammers.com/library/mdi/)）。
   - 将区域分配给楼层。
     - 如果您尚未创建楼层，可以[创建新楼层](/home-assistant/docs/organizing/floors/#creating-a-floor)。
     - 数字可以为负数。例如地下楼层。
     - 此数字稍后可用于排序。
   - 添加代表该区域的图片。
   - 添加**别名**。
     - 别名是[语音助手](/home-assistant/voice_control/aliases/)中用于引用区域、实体或楼层的替代名称。

## 在内置仪表盘上重新排列区域

按照以下步骤在内置仪表盘（如**概览**、**灯光**和**安全**）上重新排列楼层和区域。

1. 前往[**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/areas/)。
2. 有两种重新排列项目的选项：
   - **选项 1**：使用拖放。
   - **选项 2**：在右上角，选择三个点 `[mdi:dots-vertical]` 菜单并选择**重新排列楼层和区域**。
     - 在对话框中，移动您要重新排列的楼层或区域：

     ![重新排列楼层和区域](/home-assistant/images/organizing/reorder-areas-menu.png)

## 删除区域

按照以下步骤删除区域。它将从所有分配的楼层中移除。所有分配给此区域的设备将变为未分配状态。
如果您在自动化或脚本中将此区域用作目标，或与语音助手一起使用，这些将不再工作。

1. 前往[**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/areas/)并选择区域卡片。
2. 在右上角，选择三个点 `[mdi:dots-vertical]` 菜单。然后选择**删除**。

    ![删除区域](/home-assistant/images/organizing/area_delete.png)

3. 如果您在自动化或脚本中将此区域用作目标，或与语音助手一起使用，它们将不再工作。
   - 您可以调整或删除相关的脚本或自动化。
4. 如果该区域中仍有设备，它们将不再分配给任何房间。
   - 如果您已移动设备，现在可以将它们重新分配给新区域。
