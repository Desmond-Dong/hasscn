# 编辑仪表盘

仪表盘是可自定义的页面，用于显示智能家居设备的信息。

## 仪表盘、卡片和视图

截图显示了一个带有许多[卡片](/home-assistant/dashboards/cards/)的**概览**仪表盘，用于表示传感器值。例如，一些灯光的状态、媒体播放器和一些温度值。它还显示控制元素。例如，您可以更改通风、灯光颜色或打开智能电视并启动 YouTube。

### 视图

以下截图显示了使用[砌体视图](/home-assistant/dashboards/masonry/index.md)布局的完整仪表盘。顶部蓝色菜单栏中的图标每个代表不同的选项卡。每个选项卡包含一个[视图](/home-assistant/dashboards/views/)。

<p class='img'>
<img src='/home-assistant/images/getting-started/lovelace.png' alt='砌体视图中完整概览仪表盘截图'>
砌体视图布局中完整概览仪表盘截图。
</p>

以下截图显示了使用[分区视图](/home-assistant/dashboards/sections/index.md)布局的完整仪表盘。

<p class='img'>
    <img src="/home-assistant/images/dashboards/section_view.png" alt="分区视图布局中完整的仪表盘"/>
    分区视图布局中完整的仪表盘
</p>

### 不同的仪表盘类型

在左侧的侧边栏中，您可以看到不同仪表盘的名称。Home Assistant 开箱即支持[不同的仪表盘类型](/home-assistant/dashboards/dashboards/)。

* 概览
* 能源
* 地图
* 活动
* 历史
* 待办事项列表

## 初次接触概览仪表盘

**概览**[仪表盘](/home-assistant/dashboards/index.md)是您在[初始设置过程](/home-assistant/getting-started/onboarding.md)后看到的第一页。

如果您刚刚完成初始设置，您的仪表盘几乎为空。它使用[砌体视图](/home-assistant/dashboards/masonry/index.md)布局，并显示自动检测到的设备卡片。您的仪表盘可能看起来很不同，取决于您家中的设备。

<p class='img'>
<img src='/home-assistant/images/getting-started/onboarding_dashboard_raspi_bluetooth.png' alt='带有蓝牙设备的概览仪表盘截图'>
带有蓝牙设备的新概览仪表盘截图。
</p>

让我们看看检测到的设备以及用于在仪表盘上表示它们的卡片。

* 1 个 Sonos 扬声器：[媒体控制](/home-assistant/dashboards/media-control/index.md)卡片
* 1 个人（离开）：[实体](/home-assistant/dashboards/entity/index.md)卡片
* 1 个天气预报：[天气预报](/home-assistant/dashboards/weather-forecast/index.md)卡片
* 2 个温度传感器：[实体](/home-assistant/dashboards/entity/index.md)卡片

### Sonos 扬声器

如果您有连接到 Wi-Fi 的智能扬声器，例如，它可能会被检测到。

### 人员

初始设置后，这里显示的第一个人是 Home Assistant 所有者。在名称旁边，它显示该人**离开**。您可以跟踪一个人是否在场，并基于此创建自动化。例如，当每个人都离开家时调低暖气。有关基于在场的自动化更多信息，请从[在场检测](/home-assistant/getting-started/presence-detection/index.md)开始。

### 天气预报

如果您在初始设置期间提供了位置，天气预报卡片会自动显示。

### 温度传感器

温度传感器显示是因为这里使用的 Home Assistant 设备（树莓派）有内置蓝牙模块。在这个家中，有 2 个蓝牙温度传感器。如果您的 Home Assistant 还没有蓝牙模块，您家中的蓝牙设备不会自动显示。

如果您的 Home Assistant 有其他控制器，例如 [Zigbee](/home-assistant/integrations/zha/index.md) 或 [Z-Wave](/home-assistant/integrations/zwave_js/index.md) 控制器，并且您有 Zigbee 或 Z-Wave 设备，它们可能会被检测并显示在这里。但是，这些设备通常需要先配对。

## 创建新仪表盘

默认的**概览**仪表盘在您添加新设备时会自动更新。但是，一旦您开始编辑默认仪表盘，它就不再自动更新。因此，我们在这里从添加新仪表盘开始。这让我们保留默认的**概览**仪表盘。

按照[创建新仪表盘](/home-assistant/dashboards/dashboards/#creating-a-new-dashboard)中的步骤操作。

## 在新仪表盘中编辑卡片

1. 打开您的新仪表盘，在屏幕右上角选择铅笔按钮。

2. 通过编辑仪表盘，您将接管此仪表盘的控制权。
   * 这意味着当新的仪表盘元素可用时，它不再自动更新。
   * 要继续，在对话框中选择三点菜单，然后选择 **接管控制**。
   * 阅读并接受后继续。
   * 您无法让这个特定仪表盘恢复自动更新。但是，您可以创建新的默认仪表盘。

3. 您的仪表盘可能还没有太多内容。

   * 如果您家中有智能家居设备，一些可能已经自动连接。
   * 在此示例中，一些蓝牙温度传感器和 AV 接收器自动连接。
   * 一些卡片是默认的，例如天气、设置系统的人的卡片和文字转语音服务。

   ![新设备初始设置后的仪表盘](/home-assistant/images/getting-started/onboarding_dashboard_01.png)

4. 接下来，我们要编辑天气卡片。

   * 选择天气卡片。
   * 然后，选择齿轮图标。

   ![天气详情](/home-assistant/images/getting-started/weather_card_details_01.png)

5. 如果您愿意，更改任何单位。
   * 不要更改 **实体 ID**。
   * 完成后，选择 **更新**。
     ![天气详情](/home-assistant/images/getting-started/onboarding_card_settings_01.png)

6. 接下来，我们要为此天气设备添加新卡片。
   * 再次选择天气卡片，选择三点菜单，然后 **设备信息**。
   * 在 **传感器** 下，选择 **添加到仪表盘**，然后 **选择不同卡片**。
     ![仪表盘 - 更改卡片类型](/home-assistant/images/getting-started/onboarding_pick_different_card_01.png)

7. 从列表中，选择 **显示当前天气和预报**。

8. 选择要在卡片上显示的详细信息。
   ![仪表盘 - 更改卡片详细信息](/home-assistant/images/getting-started/onboarding_card_settings_02.png)
   * 选择 **保存**。
   * 您现在可以看到仪表盘上的预报卡片。

9. 现在让我们删除另一个天气卡片。
   * 在右上角，选择铅笔。
     ![仪表盘 - 编辑仪表盘](/home-assistant/images/getting-started/onboarding_edit_dashboard_01.png)
   * 在卡片上，选择三点菜单并选择 **删除**。
     ![仪表盘 - 删除卡片](/home-assistant/images/getting-started/onboarding_dashboard_delete_card.png)

10. 最后，我们要将天气卡片移动到左上角。
    * 在卡片底部，选择数字或使用减号按钮输入 `1`。
    * 如果要移动其他卡片，请对其他卡片重复此操作。
    * 完成后，在右上角选择 **完成**。

11. 如果要更改任何其他卡片，选择卡片上的 **编辑** 按钮。

12. 恭喜！您已完成第一个仪表盘自定义。

13. 当您的仪表盘还小时，这是[将其迁移到分区视图](/home-assistant/dashboards/views/#migrating-a-view-into-a-sections-view)的好时机。
    * 分区视图提供拖放、自定义列数和宽度以及更多标题选项等功能。
    * 要了解更多信息，请转到[分区视图](/home-assistant/dashboards/sections/index.md)文档。

## 了解更多关于仪表盘

如果您想了解更多关于仪表盘、视图和卡片的信息，请查看以下主题：

1. 查看[仪表盘介绍](/home-assistant/dashboards/index.md)并了解[仪表盘类型](/home-assistant/dashboards/dashboards)。
2. 了解更多关于[视图类型](/home-assistant/dashboards/views/)
3. 学习如何[添加卡片](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到视图。

## 下一步：集成

要继续本教程，选择下面的按钮了解集成。

:::info [集成](/home-assistant/getting-started/integration/index.md)
:::

## 相关主题

* [仪表盘](/home-assistant/dashboards/index.md)
* [视图](/home-assistant/dashboards/views/)
* [向视图添加卡片](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)
