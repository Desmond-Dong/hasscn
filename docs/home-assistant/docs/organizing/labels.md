---
title: 标签
description: 为您的区域、设备、实体、自动化、脚本和助手添加标签。然后，按标签筛选或在所有带有该标签的实体上运行自动化。
---

Home Assistant 中的标签允许对元素进行分组，而不受其物理位置或类型的限制。标签可以分配给区域、设备、实体、自动化、场景、脚本和助手。标签可以在自动化和脚本中用作动作的目标。标签也可以用于筛选数据。

例如，您可以筛选设备列表，仅显示带有 `heavy energy usage` 标签的设备，或者在太阳能不足时关闭这些设备。

## 创建标签

按照以下步骤从**标签**视图创建新标签。

1. 前往 [**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/labels/)，在顶部选择**标签**选项卡。
2. 选择**创建标签**按钮。
3. 在对话框中，输入标签详情：
   - 为标签命名（必填）。
   - 添加图标（我们使用 [Material 图标](https://pictogrammers.com/library/mdi/)）。
   - 添加**颜色**。

    ![创建标签对话框](/home-assistant/images/organizing/create_label_01.png)
4. 选择**创建**。

   **结果**：新标签已创建。

## 应用标签

按照以下步骤应用标签。

1. 为区域应用标签：
    - 前往 [**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/areas/)。
   - 在区域卡片上，选择编辑 `[mdi:edit]` 按钮。
   - 选择一个或多个标签，或选择**添加新标签**来创建新标签。
2. 为设备、实体或助手应用标签：
   - 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并打开相应的选项卡。
   - 选择 `[mdi:order-checkbox-ascending]` 按钮。
   - 从列表中选择所有要应用标签的项目。
   - 在右上角，选择**添加标签**。然后，从列表中选择标签。

    ![应用标签](/home-assistant/images/organizing/labels_add_05.png)
3. 为自动化、场景或脚本应用标签：
   - 前往 [**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automation/) 并打开相应的选项卡。
   - 选择 `[mdi:order-checkbox-ascending]` 按钮。
   - 从列表中选择所有要应用标签的项目。
   - 在右上角，选择三个点 `[mdi:dots-vertical]` 菜单，然后选择**添加标签**。然后，从列表中选择标签。

## 删除标签

按照以下步骤删除标签。标签将从所有应用了该标签的项目中移除。
如果您在自动化或脚本中将此标签用作目标，则需要调整它们。

1. 前往 [**设置** > **区域、标签和楼层**](https://my.home-assistant.io/redirect/labels/)，在顶部选择**标签**选项卡。
2. 在标签列表中，找到要删除的标签，选择三个点 `[mdi:dots-vertical]` 菜单。
3. 选择**删除**。
4. 如果您在自动化或脚本中将此标签用作目标，则需要调整它们。

## 移除标签

1. 前往包含要移除标签元素的数据表：
   - 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并打开相应的选项卡。
   - 或前往 [**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automation/) 并打开相应的选项卡。
2. 选择 `[mdi:order-checkbox-ascending]` 按钮。
   - 从列表中选择所有要移除标签的项目。
   - 在右上角，选择三个点 `[mdi:dots-vertical]` 菜单，然后选择**添加标签**。
   - 然后，取消勾选要移除的标签。
