---
title: 使用表格
description: '在使用表格时，您可以选择多个项目来应用动作。如果您通过将项目分配到楼层、区域、标签或分类来进行分组(/home-assistant/docs/organizing/)，您也可以相应地筛选数据。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 使用表格

在使用表格时，您可以选择多个项目来应用动作。如果您通过将项目分配到楼层、区域、标签或分类来进行[分组](/home-assistant/docs/organizing/)，您也可以相应地筛选数据。

## 在表格中选择多个项目

1. 在表格中，选择 `[mdi:order-checkbox-ascending]` 按钮。

   ![截图指出 Home Assistant 表格工具栏中的启用选择模式按钮](/home-assistant/images/blog/2024-04/enable-selection-mode.png)

2. 在列表中，选择感兴趣的项目。

   ![在列表中选择多个元素](/home-assistant/images/organizing/multiselect_01.png)

3. 您现在可以对所有选中的元素应用更改，例如[应用标签](/home-assistant/docs/organizing/labels/)或[启用或禁用实体和自动化](/home-assistant/common-tasks/general/)。

## 在表格中筛选项目

您可以筛选表格，以便只显示符合特定条件的项目。

要筛选表格中的项目，请按照以下步骤操作：

1. 在表格左上角，选择**筛选**按钮。

    ![选择筛选按钮](/home-assistant/images/organizing/filters_01.png)

2. 在筛选面板中，选择您的筛选条件。
   - 如果您之前定义了[楼层](/home-assistant/docs/organizing/floors/)、[区域](/home-assistant/docs/organizing/areas/)、[标签](/home-assistant/docs/organizing/labels/)和[类别](/home-assistant/docs/organizing/categories/)，可以按这些进行筛选。
   - 可用的条件列表取决于表格的类型。

    ![截图显示表格中的筛选面板，方便您快速找到所需内容](/home-assistant/images/organizing/filter-panel.png)

## 在表格中分组和排序项目

您可以根据特定条件对表格中的项目进行分组。显示的项目数量保持不变。不会隐藏任何项目。

要对表格中的项目进行分组，请按照以下步骤操作：

1. 在表格右上角，选择**分组依据**按钮。
2. 项目将根据您选择的条件进行分组。
   - 可用的条件列表取决于表格的类型。
     - 示例显示了一个设备列表，按制造商分组。
     - 相比之下，实体表格不允许按制造商分组，但可以按实体域分组。

    ![选择分组依据按钮](/home-assistant/images/organizing/table_group_01.png)

3. 要对项目进行排序，选择**排序依据**按钮。
4. 要获得更好的概览，您可以折叠列表中的分组。

    ![折叠分组](/home-assistant/images/organizing/table_group_collapse.png)

## 自定义列

您可以显示或隐藏列并更改顺序。您自定义的列存储在浏览器中，因此您只需设置一次，下次访问页面时会记住您的设置。

要自定义列，请按照以下步骤操作：

1. 在表格右上角，选择齿轮图标。
2. 要隐藏列，取消选择它。
3. 要重新排列顺序，拖动列并将其移动到新位置。
4. 要排序，选择感兴趣的列标题。

   ![屏幕录像显示如何显示、隐藏和重新排列列](/home-assistant/images/organizing/customize_columns.webp)
