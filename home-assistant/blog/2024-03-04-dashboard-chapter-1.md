# 家庭认可的仪表盘第 1 章：拖放、剖面视图和新的网格系统设计！

哇！终于！一切顺利，我们实验性的仪表盘拖放功能终于来了！ 🥲

Home Assistant致力于成为最好的智能家居平台，智能家居让居民能够自动化、控制、观察和预测家中的舒适度、安全性和各种便利。除了语音助手之外，仪表盘也是帮助用户做到这一点的好方法！

因此，我们一直在努力使仪表盘的定制和组织尽可能简单和直观，并创建一个开箱即用、更加有用、用户友好且相关的默认仪表盘。 [Matthias](https://github.com/matthiasdebaat) 和 [I](https://github.com/madelena) 在去年 4 月联手解决了这个问题，我们将目前仪表盘的这一系列改进称为“Project Grace”，以已故的颇具影响力和才华横溢的[Admiral Grace Hopper](https://www.nationalww2museum.org/war/articles/grace-hopper-woman-computer) 命名。

经过数月的用户研究和构思，确保我们的设计[“家庭认可”](https://building.open-home.io/open-home-approval-factor/#home-approval-factor) - 让您、您的家人、您的客人、您的室友等轻松直观地使用 - 我们很高兴在即将发布的 2024.3 版本中分享我们成功的第一个成果，这在 [Paul](https://github.com/piitaya) 以及出色的前期团队的帮助下。我们希望这些功能将帮助您更快、更轻松地将您和您家的梦想仪表盘从想法变为现实。

对于那些对这些功能及其背后的设计思维感到好奇的人，请继续阅读并观看我们上周的[特别直播](https://www.youtube.com/watch?v=XyBy0ckkiDU)。您还可以尝试我们更新的[演示](https://demo.home-assistant.io/#/Lovelace/home)并通过[加入Home Assistant用户测试组](http://home-assistant.io/join-research)参与其中！最后，感谢您【订阅Home Assistant云】(https://www.nabucasa.com)对我们工作的支持！

<p class='img'>
    <lite-youtube videoid="XyBy0ckkiDU" videotitle="A Home-Approved 仪表盘 - Chapter 1: What about Grace?"></lite-youtube>
</p>

享受吧！

～玛德琳娜🥳

<!--more-->

## 什么是恩典计划？

Grace 是我们在仪表盘框架 [Lovelace] 之上构建的一系列改进的代号。我们的目标是保留 Lovelace 的优势，例如灵活性和可扩展性，并弥补其弱点，例如陡峭的学习曲线、缺乏可扩展性以及布局响应能力差等。

## 三布局问题

<p class='img'>
    <img src='/home-assistant/images/blog/2024-03-dashboard-chapter-1/layout-types.png' alt='The three basic view layouts: 面板, 侧边栏, and Masonry'>
    三种基本视图布局：面板、侧边栏和砌体
</p>

我们的仪表盘默认有3种默认的[视图布局类型](https://www.home-assistant.io/dashboards/views/#type)： 面板，只是一个覆盖整个视图的布局； 侧边栏，是左右的两栏布局；和\[砖石]，这是其中最坚固的。虽然 Masonry 非常擅长创建紧凑的屏幕节省空间的仪表盘，但 Masonry 的布局逻辑对于许多用户来说可能无法立即清晰和可预测，这会导致创建和自定义布局的用户体验令人沮丧。由于布局逻辑取决于每个动作的高度，因此我们的仪表盘可用的动作高度变化既是福也是祸：即使高度相差 1 个像素，也意味着显示在最左边一列的动作会一直向右移动。

<p class='img'>
    <img src='/home-assistant/images/dashboards/masonry.png' alt='Image showing how masonry arranges 卡片 based on size.'>
    砌体根据尺寸排列配合。
</p>

更重要的是，与大多数其他智能家居应用程序不同，Home Assistant 以其选择而自豪。就仪表盘视图布局而言，选择意味着仪表盘应该能够显示在我们用户最方便的任何屏幕上——无论是手机、平板电脑、大显示器还是其他显示设备。虽然 Masonry 布局擅长制作整齐的调节墙，但顾名思义，它是一堵不关心砖块是否铺好的调节墙，因此每次仪表盘显示在另一个屏幕上时，用户记住调节位置的肌肉记忆就会丢失。

<p class='img'>
    <img src='/home-assistant/images/blog/2024-03-dashboard-chapter-1/layout-masonry-problem.png' alt='Masonry does not care about where exactly 卡片 are placed when the screen size changes.'>
    当屏幕尺寸改变时，Masonry 并不关心调整的具体位置。
</p>

在过去的几年里，我们试图创建一个更直观的解决方案来重新排列 Masonry 布局的动作，但最终这些解决方案并不能很好地适应多种屏幕尺寸。与此同时，我们的用户提出了自己的解决方案，其中许多人避免了我们的默认视图布局，以便他们可以创建更可预测和令人难忘的仪表盘。事实证明，“拖放”不仅仅是一个工程问题；更是一个工程问题。这也是一个设计问题。

为了解决布局中的这些问题，我们意识到 Masonry 布局、与多种屏幕尺寸的兼容性以及简单的“拖放”调整布局不能共存。在过去的一年里，我们构思并确定了一些解决方案，即：

1. [新的剖面视图布局](#the-new-sections-view)
2. [设计网格系统](#the-grid-system)，以及
3. [“Z-Grid”自动重新排列图案](#drag-and-drop-rearrangement-of-卡片-and-sections)。

让我们深入研究每个解决方案，并了解它们如何协同工作，使您的仪表盘更易于定制和使用！

## 新的部分视图

<p class='img'>
    <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-case-studies.png" alt="Case studies of our users' 仪表盘"/>
    我们用户仪表盘的案例研究
</p>

在整个项目中，我们研究了您创建的数十种不同的仪表盘，并将其发布在我们的讨论板上。我们注意到的一件事是，我们更高级的用户都自然地喜欢创建“部分”，即由组标题划分的不同动作组，手动使用 [grids](https://www.home-assistant.io/dashboards/grid/) 和 [markdown](https://www.home-assistant.io/dashboards/markdown/) 动作。Home Assistant仪表盘功能强大且信息丰富，我们的用户经常为各种按钮、开关、图表、指示器等放置数十个按钮。通过将关联分组为“部分”，我们的用户可以减少在查找特定关联时需要浏览的项目数量，因为他们将能够首先查找相关的组标题，然后缩小扫描该特定组以获取信息的范围。并且通过将某个部分中的关系打包到网格关系中，部分中的关系的相对位置不会受到屏幕尺寸变化的影响，因此保留了关系的空间记忆，从而带来更快、更省力的体验。

<p class='img'>
    <img width="66%" src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-section-example.png" alt="Example of a 仪表盘 section"/>
    仪表盘部分示例
</p>

对于我们的新剖面视图，我们将这些剖面作为视图的基本单元，并简化其创建和编辑过程。用户无需摆弄网格调整和降价调整来手动组装一个部分，而是一个部分现在配备了所有这些便利设施以及更多功能。

### 章节入门

:::警告
新的部分视图是实验性的！请不要在其上构建您的日常仪表盘！
:::

<p class='img'>
    <img width="66%" src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-create-new-view.png" alt="The Create New View 配置 screen"/>
    创建新视图配置屏幕
</p>

要开始使用新的“部分”视图，请在仪表盘上创建一个新视图，然后选择“**部分（实验）**”作为视图类型。我们目前还无法迁移您当前的仪表盘。

:::注意
如果您使用的是默认仪表盘，请阅读如何创建新仪表盘</a>。
:::

<p class='img'>
    <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-blank-sections-view.png" alt="A new 仪表盘 view laid out in Sections"/>
    章节中布置的新仪表盘视图
</p>

您将看到一个干净的新仪表盘视图，其中一个部分已经为您创建。

* 要添加新部分，请选择 **创建部分** 按钮。 <img height="56px" src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-add-section-button.png" alt="Add Section button"/>

* 要编辑部分的名称，请选择该部分右上角的 <img height="28px" src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/mdi-edit.png" alt="Edit icon"/> **编辑** 按钮。 （提示：您可以为您的部分添加任何描述性文本，包括表情符号！）当该部分没有名称时，部分标题将被隐藏。

* 要删除某个部分，请选择该部分右上角的 <img height="28px" src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/mdi-trash.png" alt="Delete icon"/> **删除** 按钮。系统将要求您确认删除。

### 填满

<p class='img'>
    <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-example-dashboard.png" alt="A fully populated 仪表盘 in Sections view layout"/>
    剖面视图布局中完全填充的仪表盘
</p>

有多种方法可以将关联添加到一个部分并填充您的仪表盘：

1. 添加调节最简单的方法是选择该部分中的“**添加调节**”\[按钮图标]按钮。

2. 出现添加配置对话框，有两个选项：

   * **按比例**
       <p class='img'>
           <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-add-card-by-card.png" alt="Add 卡片 by 卡片 type dialog"/>通过调节类型对话框添加调节
       </p>如果您很清楚要为实体使用什么动画，请浏览此屏幕上可用的动画列表。对于“部分”视图，我们建议使用“平铺反馈”，它现在固定在“建议反馈”部分的顶部。

   * **作者：实体**

       <p class='img'>
           <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-add-card-by-card.png" alt="Add 卡片 by 实体 dialog"/>由实体对话框添加动画
       </p>

     如果你想一次性添加一堆实体，请在该列表中选择一个或多个实体。

       <p class='img'>
           <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-add-card-suggestions.png" alt="卡片 suggestions"/>响应建议
       </p>
       Home Assistant 将显示要添加的调整的预览，该预览将显示在“平铺调整”中，作为“部分”视图的默认设置。点击“添加到仪表盘”按钮即可完成该过程。

<p class='img'>
    <img width="66%" src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-add-from-device-page.jpg" alt="Add to 仪表盘 feature on the 设备 page"/>设备页面添加仪表盘功能
</p>

添加属于同一设备的一组传感器或控件的另一种方便方法是从设备的页面添加它们。

1. 通过“设置”进入设备页面。

2. 点击屏幕上的**添加到仪表盘**按钮。

3. 系统将提示您选择要将它们添加到哪个仪表盘视图。如果您选择使用“部分”视图布局的视图，则传感器或控件将作为平铺按钮添加到新部分内。

### 响应式设计

新的“部分”视图的一大好处是，现在可以更轻松地构建适用于多种屏幕尺寸的仪表盘。

<p class='img'>
    <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/sections-responsive-design.png" alt="Sections view adapt nicely to different screen sizes."/>
    剖面视图可以很好地适应不同的屏幕尺寸。
</p>

该视图将根据水平可用空间量重新排列各个部分，而每个部分中的“关联”列数保持不变，从而保留您对“关联”所在位置的肌肉记忆。

## 网格系统

我们当前的仪表盘视图按不同高度的列进行组织，默认情况下采用砖石布局。由于关联的高度可能会有少量变化，因此当将关联移动到另一列时，或者当屏幕尺寸发生变化并移动所有关联时（例如在平板电脑上与移动设备上查看仪表盘时），很难预测关联将“落地”的位置。这会给仪表盘的定制体验带来摩擦。

输入网格系统，它是图形设计原理的堡垒。

<p class='img'>
    <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/grid-system-examples.png" alt="Examples of grid systems in use"/>
    正在使用的网格系统示例
</p>

印刷网格系统在现代平面设计和印刷出版中有着悠久的历史，始于20世纪初欧洲构成主义和几何艺术运动期间的兴起，它关注视觉图像背后隐藏的节奏。它们易于重复，因此可用于生成无限数量的页面，同时还能确保可打印内容的美观比例和一致性。它们还为页面带来秩序。它可以帮助用户了解页面上每个元素之间的关系以及一个元素是否属于另一个元素。

<p class='img'>
    <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/grid-system.gif" alt="The Home Assistant 仪表盘 grid system"/>
    Home Assistant仪表盘网格系统
</p>当用户界面采用结构化布局设计时，结构和组织的感觉会在用户的第一印象中体现出来。

通过引入具有规则行高和列宽倍数的比例的网格系统，我们可以帮助用户以可预测的方式更轻松地重新排列比例，使Home Assistant更轻松地适应不同的屏幕尺寸，当然，也使仪表盘看起来更整洁、更美观。

<p class='img'>
    <img width="66%" src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/grid-system-available-cards.png" alt="卡片 currently optimized for the grid system: 传感器 卡片, Tile 卡片, and Button 卡片"/>
    目前针对电网系统优化的开关：传感器开关、Tile开关、Button开关
</p>

为了实现网格系统，我们现在正在标准化我们的旋钮的宽度和高度，从 Tile 旋钮、Button 旋钮和传感器旋钮开始。这些关联将在网格中占据适当的空间，而其他关联目前默认会占据一个部分的整个宽度。

对于动作开发者，我们很快将提供有关如何使您的自定义动作适应网格系统的更多信息。

## 拖放式重新排列布局和部分

有了部分和网格系统，我们最终可以实现一种通过拖放直观地排列关系和部分的方法，可以预测如何重新排列关系，同时通过可视化信息层次结构而不干扰关系之间的空间关系，创建一个易于导航和记忆的仪表盘。用户不再需要祈祷和猜测当他们改变订单时，动作会落在哪里！

<p class='img'>
    <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/drag-and-drop-arrangement-methods-comparison.png" alt="Comparison of four 卡片 arrangement methods"/>
    四种配合排列方式比较
</p>

在整个设计过程中，我们研究了几种不同的布局方式。最终，我们选择“Z-Grid”作为默认解决方案，因为它简单、可预测且易于记忆，尽管它可能比其他解决方案占用更多空间。 Z 网格的工作原理很简单，即从左到右布置各个部分，并在该行已满时开始一个新行。行的高度由行上最高的部分决定，而列的宽度保持不变以实现响应式设计。

### 如何拖放

当您的仪表盘处于编辑模式时：

<p class='img'>
    <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/drag-and-drop-sections.gif" alt="Rearranging sections with drag-and-drop"/>
    通过拖放重新排列部分
</p>

* To rearrange sections, simply tap and hold the <img height="28px" src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/mdi-edit.png" alt="Edit icon"/> **Move** handle and then move your cursor or finger towards your desired location.其他部分将移至选定部分放置位置的位置。

<p class='img'>
    <img src="/home-assistant/images/blog/2024-03-dashboard-chapter-1/drag-and-drop-cards.gif" alt="Rearranging 卡片 with drag-and-drop"/>
    通过拖放重新排列部分
</p>

* 要重新排列关系，请点击并按住关系上的任意位置，然后将光标或手指移向所需位置。

（您不喜欢指令如此简短吗？简单！🦄）

## 接下来是什么？介入！具有拖放功能的新剖面视图只是家庭认可的仪表盘 Project Grace 的第一步。我们很清楚我们的设计和开发过程中下一步的发展方向，但我们希望在继续之前先听取您的意见，以便我们可以确定优先顺序并构建最能帮助您的产品。

为了获得您和您的家庭成员的反馈，我们决定提前以不完整的形式发布此内容，作为“实验”，供您尝试新的“部分”视图。对于那些好奇的人，请随时查看[我们更新的演示](https://demo.home-assistant.io/#/Lovelace/home) 来玩一玩，玩得开心！

我们希望确保新的默认仪表盘不仅适用于您，也适用于您家中的每个人。我们也很想听听他们的想法。请随时在下面留下您的评论！

### 加入Home Assistant用户测试组！

我们会不时地发送用户测试，以帮助我们做出我们发现的更困难的产品和设计决策。通过加入我们的用户测试小组，您将帮助引导我们产品的方向，并且还可以抢先了解正在进行的潜在设计。

请【填写此表】(http://home-assistant.io/join-research)加入Home Assistant用户测试组！

非常感谢所有加入我们接受用户采访的人，[来自 Everything Smart Home 的 Lewis](https://www.youtube.com/c/EverythingSmartHome) 为我们的案例研究分享了他的仪表盘宝库，当然还有出色的 [Nabu Casa](https://nabucasa.com) 团队。 💖

这就是现在的全部内容！感谢您的阅读。迫不及待地想向您展示接下来会发生什么！

〜马德莱娜

[Lovelace]: https://www.home-assistant.io/博客/2019/01/23/Lovelace-released/

[Masonry]: https://www.home-assistant.io/dashboards/masonry/
