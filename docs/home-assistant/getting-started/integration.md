---
title: 添加集成
description: '让我们从添加第一个集成开始。在本教程中，我们将使用 Workday 集成。它可用于基于工作日、休息日或节假日进行自动化。本教程不需要智能设备。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 添加集成

让我们从添加第一个集成开始。在本教程中，我们将使用 **Workday** 集成。它可用于基于工作日、休息日或节假日进行自动化。本教程不需要智能设备。

## 前提条件

本教程假设您已经[安装了 Home Assistant](/home-assistant/installation/) 并至少完成了[初始设置步骤](/home-assistant/getting-started/onboarding/)。

## 添加集成

1. 转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
   - 集成页面显示您已安装的所有集成。其中一些是自动安装的。
   - 如果在您的网络中发现了设备，您会在 **已发现** 部分看到它们。

   ![集成页面截图，显示已发现的设备](/home-assistant/images/getting-started/integrations_page_discovered.png)

2. 如果为您发现了任何设备，您现在可以添加它们。
   - 在 **已发现** 下，选择集成，然后选择 **添加**。
   - 如果需要额外配置，请按照 UI 中的步骤操作。
   - 如果没有发现设备，不用担心，我们将在下一步中添加集成。
3. 在右下角，选择 **添加集成**。
4. 输入 `workd` 并选择 **工作日** 集成。

   ![添加集成对话框截图](/home-assistant/images/getting-started/add_workday_integration.png)

5. 给它一个名称，例如 `明天工作日`，然后选择国家。
   - 国家用于确定本地节假日。
   - 选择 **提交**，然后选择 **完成**。
6. 配置选项。
    - 例如，如果星期一不是您的工作日，选择 "x" 将其移除。
    - 要检查明天是否是工作日，在 **偏移** 下输入 `1`。
    - 根据需要填写所有其他选项。至少定义 **节假日** 和 **语言**。
    - 选择 **提交**。

   ![配置选项截图](/home-assistant/images/getting-started/workday_configure.png)
7. 选择集成，例如办公室，然后选择 **完成**。
8. 您现在可以看到列表中的 **工作日** 集成。
   - 恭喜！您已添加了第一个集成。任务完成。

   ![集成页面上的 workday 集成截图](/home-assistant/images/getting-started/workday_select_integration.png)

## 查看集成详情

1. 选择集成。

   ![集成页面上的 workday 集成截图](/home-assistant/images/getting-started/workday_select_integration.png)

   - 这将打开集成实体页面。

2. 选择一个实体。

   ![workday 集成实体列表截图](/home-assistant/images/getting-started/workday_entity_list.png)

   - 您会看到此集成有两个实体。
   - 相关自动化、脚本和场景的列表。
   - 与实体相关的更新/更改活动。

   ![workday 集成详情页面截图](/home-assistant/images/getting-started/workday_sensor_details.png)

## 修改集成

1. 要更改名称，选择右上角的铅笔图标。

2. 您还可以添加另一个工作日集成。例如，如果您想知道您的同事何时休假。
   - 返回集成实体页面。
   - 选择 **添加条目**，给它一个名称并定义您的选项。
   - 选择感兴趣的国家。
3. 就是这样！
   - 您已经了解了集成页面的概述，知道在哪里找到集成详情页面、传感器信息页面和实体表格。
   - 您已经学会了重命名、修改和删除集成。
   - 如果您想找到更多集成，请查看[集成文档](/home-assistant/integrations/workday/)。
   - 我们现在准备在自动化中使用 **工作日**。

:::info [自动化](/home-assistant/getting-started/automation/)
:::
