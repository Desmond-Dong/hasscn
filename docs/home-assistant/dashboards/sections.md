---
title: 分区视图
description: 分区视图让您可以在网格中的多个分区里整理卡片。
---
分区视图让您可以在网格中的多个分区里整理卡片。
您无需使用水平堆叠或垂直堆叠卡片，也能对卡片进行分组。

<p class='img'>
    <img src="/home-assistant/images/dashboards/section_view.png" alt="分区视图布局下的完整仪表盘"/>
    分区视图布局下的完整仪表盘
</p>

## 创建分区视图

1. 如果您有多个仪表盘，请在左侧边栏中选择要添加分区视图的那个仪表盘。
2. 按照[添加新视图](/home-assistant/dashboards/views/#adding-a-view-to-a-dashboard)中的步骤操作。
   - 在 **视图类型** 下，选择 **分区**。
3. 在 **最大分区宽度** 下，选择您希望新分区视图显示的最大列数。
4. 在 **紧凑分区放置** 下，选择是否允许自动排列卡片，以填补卡片之间的空隙。
   - 这样可以减少一些空白，但同时也意味着您对卡片顺序的控制会更少。
   - 请注意，只有当您使用了宽度超过一列的分区时，这项设置才会影响横向空隙。
5. 完成后，选择 **保存**。
   - 系统现在会显示一个新的空白视图。
   - 如果您选择了背景图片，页面会以该图片作为背景。
6. 创建分区视图后，您就可以开始整理内容：
   - [添加分区和卡片](#adding-sections-and-cards-to-a-sections-view)。
   - [重新排列](#rearranging-sections-and-cards)，以及[按条件显示或隐藏分区](#show-or-hide-section-conditionally)。
   - [添加带有标题和徽章的仪表盘页眉](#editing-the-header)。

## 编辑页眉

<p class='img'>
  <img src="/home-assistant/images/dashboards/sections_view_header_edit.png" alt="编辑页眉"/>
  编辑页眉
</p>

1. 要添加标题，请选择 **添加标题** 按钮。标题支持 [Markdown](https://commonmark.org/help/) 和[模板](/home-assistant/docs/configuration/templating/)。
2. 要添加徽章，请选择 **添加徽章** 按钮。请按照[添加徽章步骤](/home-assistant/dashboards/badges)查看不同的可用选项。
3. 要更改标题和徽章的排列方式，请选择编辑 `[mdi:edit]` 按钮以进入页眉设置。

![编辑视图标题分区按钮](/home-assistant/images/dashboards/sections_view_header_editor.png)

## 向分区视图添加分区和卡片

此视图默认带有一个分区，您可以直接向其中添加卡片。

1. 要添加卡片，请选择 **添加卡片** 按钮。
   - 按照[添加卡片步骤](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)操作。

   ![添加分区按钮](/home-assistant/images/dashboards/sections_view_add-card-or-section.png)

2. 要添加新分区，请选择 **创建分区** 按钮。
3. 系统会自动在分区顶部添加一张[标题卡片](/home-assistant/dashboards/heading)。
   - 要编辑它，请选择这张卡片。
   - 如果您不想在分区顶部显示标题，可以删除这张卡片。
   - 以后也可以像添加其他卡片一样重新添加标题。
4. 如果您希望此分区仅对特定用户可见，或仅在特定条件下显示，您可以定义这些条件：
   - 在 **可见性** 选项卡上，选择 **添加条件**。
   - 选择条件类型，并输入参数。
   - 如果您定义了多个条件，则只有在所有条件都满足时才会显示该分区。
   - 如果您没有定义任何条件，则该分区始终会向所有用户显示。

## 删除分区

1. 要删除分区，请前往仪表盘，然后在右上角选择编辑 `[mdi:edit]` 按钮。
2. 打开包含要删除分区的视图。
3. 选择删除 `[mdi:trash]` 按钮。

## 重新排列分区和卡片

在分区视图中，您可以通过拖动来重新排列分区和卡片。其他视图目前还不支持此功能。

1. 要编辑仪表盘，请在右上角选择编辑 `[mdi:edit]` 按钮。
2. 要重新排列分区，按住移动 `[mdi:cursor-move]` 按钮并移动卡片。

    <p class='img'>
      <img src="/home-assistant/images/dashboards/section_view_rearrange_sections.gif" alt="通过拖动重新排列分区"/>
      通过拖动重新排列分区
    </p>

3. 要重新排列卡片，点按并按住卡片，然后将其移动到所需位置。

    <p class='img'>
      <img src="/home-assistant/images/dashboards/section_view_rearrange_cards.gif" alt="通过拖动重新排列卡片"/>
      通过拖动重新排列卡片
    </p>

## 按条件显示或隐藏分区

您可以根据不同条件选择显示或隐藏某些分区。[可用条件](/home-assistant/dashboards/conditional/#card-conditions) 与条件卡片所使用的条件相同。

要编辑分区的可见性条件，请选择编辑 `[mdi:edit]` 按钮，然后打开 **可见性** 选项卡。

## 查看演示

查看 3 月仪表盘直播中的演示。

<lite-youtube videoid="XyBy0ckkiDU" videoStartAt="2047" videotitle="A Home-Approved 仪表盘 - Chapter 1: What about Grace?" posterquality="maxresdefault"></lite-youtube>

## 关于分区视图布局

如需详细了解分区视图所采用的设计决策和网格布局，请参阅[仪表盘第一章博客文章](/home-assistant/blog/2024/03/04/dashboard-chapter-1/)。

## YAML 配置

type:
  required: false
  description: "`sections`"
  type: string

## 页眉 YAML 配置

layout:
  required: false
  description: 不同元素的布局。可以是 `start`、`center` 或 `responsive`。`responsive` 在移动设备上与 `start` 相同，在桌面端会将徽章和标题并排放置。
  type: string
  default: center
badges_position:
  required: false
  description: 徽章的位置。可以是 `bottom` 或 `top`。
  type: string
  default: bottom
卡片:
  required: true
  description: 用作标题的卡片。如果您使用可视化编辑器配置视图，则这里使用的是 [Markdown 卡片](/home-assistant/dashboards/markdown) 的配置。
  type: map
