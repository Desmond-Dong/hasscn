---
title: "iOS 小部件"
id: ios-widgets
---

# iOS 小部件

iOS 应用自带几个内置小部件。从 iOS 应用版本 2025.3 开始，现在有一个"自定义小部件"（测试版）选项可以创建自定义的瓷砖卡片式小部件。

每个小部件都有一些选项。要配置，点击小部件进入编辑模式。

iOS、iPadOS 和 macOS 有不同的小部件尺寸可用：
- 系统
  - 小
  - 中
  - 大
  - 超大 **(macOS)**
- 附件 **(iOS 和 iPadOS 锁屏)**
  - 圆形
  - 内联
  - 矩形

### 应用内助手

应用内助手小部件允许您使用您喜欢的管道在应用内打开助手。要编辑小部件选项，请将小部件添加到主屏幕并再次点击它。

***可用于***

<table>
  <tr>
    <td>系统小</td>
    <td>附件圆形</td>
  </tr>
</table>
<table>
  <tr>
    <td><img src='/companion-assets/ios/assist-in-app-widget.jpeg' alt="应用内助手小部件" height="300"/></td>
    <td><img src='/companion-assets/ios/assist-in-app-widget-config.jpeg' alt="应用内助手小部件配置" height="300"/></td>
  </tr>
</table>

### 脚本

**脚本**小部件允许您执行脚本。
要在脚本执行后接收通知，请在其配置对话框中启用该选项。

***可用于***

<table>
  <tr>
    <td>系统小</td>
    <td>系统中</td>
    <td>系统大</td>
    <td>系统超大 (macOS)</td>
    <td>附件圆形</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src='/companion-assets/ios/scripts-widget.jpeg' alt="脚本小部件" height="300"/></td>
    <td><img src='/companion-assets/ios/scripts-widget-config.jpeg' alt="脚本小部件配置" height="300"/></td>
  </tr>
</table>


### 传感器

**传感器**小部件显示传感器值，使用 iOS 允许的最小更新间隔（约 15 分钟）。不要使用此小部件显示应该实时显示更新的数据。

***可用于***

<table>
  <tr>
    <td>系统小</td>
    <td>系统中</td>
    <td>系统大</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src='/companion-assets/ios/sensors-widget.jpeg' alt="传感器小部件" height="300"/></td>
    <td><img src='/companion-assets/ios/sensors-widget-config.jpeg' alt="传感器小部件配置" height="300"/></td>
  </tr>
</table>

### 打开页面

**打开页面**小部件允许您打开任何 Home Assistant 侧边栏页面。
***可用于***

<table>
  <tr>
    <td>系统小</td>
    <td>系统中</td>
    <td>系统大</td>
    <td>系统超大 (macOS)</td>
    <td>附件圆形</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src='/companion-assets/ios/open-page-widget.jpeg' alt="打开页面小部件" height="300"/></td>
    <td><img src='/companion-assets/ios/open-page-widget-config.jpeg' alt="打开页面小部件配置" height="300"/></td>
  </tr>
</table>

### 仪表小部件（高级）

**仪表**小部件允许您使用 Home Assistant 模板创建仪表表示 **（用户需要是管理员才能使用此功能）**，决定最小值、最大值和当前值，以及小部件中心和底部的显示文本（或表情符号 🥳）。

***可用于***

<table>
  <tr>
    <td>附件圆形</td>
  </tr>
</table>

对于仪表类型"普通"：
- **值模板：** 用于显示仪表图表的当前值。
- **值标签模板：** 将显示在小部件中心的文本/表情符号
- **最小标签模板：** 将显示在左下角的最小值
- **最大标签模板：** 将显示在右下角的最大值

对于仪表类型"普通（单个标签）"：
- **值模板：** 用于显示仪表图表的当前值。
- **值标签模板：** 将显示在小部件中心的文本/表情符号
- **标签模板：** 将显示在底部中心的文本/表情符号

对于仪表类型"容量"：
- **值模板：** 用于显示仪表图表的当前值。
- **值标签模板：** 将显示在小部件中心的文本/表情符号

还有一个运行 iOS 旧版操作的选项，这将很快转换为"运行脚本"。
<table>
  <tr>
    <td><img src='/companion-assets/ios/gauge-widget.jpeg' alt="仪表小部件" height="300"/></td>
    <td><img src='/companion-assets/ios/gauge-widget-config.jpeg' alt="仪表小部件配置" height="300"/></td>
  </tr>
</table>


### 详情（高级）

**详情**小部件允许您使用 Home Assistant 模板显示最多 3 行信息 **（用户需要是管理员才能使用此功能）**。

***可用于***

<table>
  <tr>
    <td>附件内联</td>
    <td>附件圆形</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src='/companion-assets/ios/details-widget.jpeg' alt="详情小部件" height="300"/></td>
    <td><img src='/companion-assets/ios/details-widget-config.jpeg' alt="详情小部件配置" height="300"/></td>
  </tr>
</table>

### 自定义小部件（测试版）

最可定制的小部件，您可以在应用内通过 **伴侣应用设置 > 小部件 > 创建** 创建其配置，决定显示哪些实体、选择它们的图标、图标颜色、显示文本、文本颜色、背景颜色、"点击时"操作以及是否在运行前需要确认。

**"点击时"操作选项有：**
- 默认（对于大多数实体会切换它们，如果不可能则只会刷新小部件）
- 导航：与"打开页面小部件"相同的功能，但具有定义任何导航路径的灵活性。
- 运行脚本
- 助手
- 无（它刷新小部件但不执行其他操作）

**在小部件配置对话框中（从主屏幕访问的那个），您有 3 个选项：**
- 小部件：选择您在应用内创建的小部件
- 显示上次更新时间：这在小部件底部显示上次更新的时间，因为我们无法在 iOS 小部件中显示实时信息。
- 显示状态：您可以决定是否显示实体状态，目前显示处于测试版状态，因为我们无法保证始终是最新状态。启用时，它也可能会延迟小部件 UI 从确认状态（如果启用了"需要确认"）转换回默认视图。

**更频繁更新状态的解决方法：**

在 iOS 中，我们有小部件可以更新的次数的有限预算，即使当我们请求此更新（在后台）时，也不能保证它会发生，iOS 会考虑用户对应用的使用、屏幕是否开启/关闭、小部件是否可见以及几个其他因素。
要增加刷新次数，您可以[发送带有"update_widgets"命令的无声推送通知](/companion/notifications/commands)，您甚至可以创建一个自动化在特定实体状态更改时发送此推送。

***可用于***

<table>
  <tr>
    <td>系统小</td>
    <td>系统中</td>
    <td>系统大</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src='/companion-assets/ios/custom-widget.jpeg' alt="自定义小部件" height="300"/></td>
    <td><img src='/companion-assets/ios/custom-widget-config.jpeg' alt="自定义小部件配置" height="300"/></td>
  </tr>

  <tr>
    <td><img src='/companion-assets/ios/custom-widget-create.jpeg' alt="自定义小部件创建视图" height="650"/></td>
    <td><img src='/companion-assets/ios/custom-widget-create-2.jpeg' alt="自定义小部件项目自定义视图" height="650"/></td>
  </tr>
</table>