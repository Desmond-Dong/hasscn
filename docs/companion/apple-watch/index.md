---
title: "概览"
id: "apple-watch"
---

Home Assistant 与 Apple Watch 深度集成。您可以直接在表盘上以复杂功能的形式显示 Home Assistant 信息，并且从应用版本 2024.9 开始，可以运行脚本、激活场景和 iOS 操作。

## 主页

从 iOS 应用版本 2024.9 开始，您现在可以使用 `脚本`、`场景` 和 `iOS 操作` 来自定义您的 Home Assistant 手表体验。
使用您的 iPhone，打开伴侣应用设置，在 **Apple Watch** 部分下查找 **配置**。如果您已经创建了 **iOS 操作**，它们将迁移到配置屏幕中。选择 **保存** 并在您的手表上重新加载。

<img src='/companion-assets/ios/watch-config.png' alt="手表配置屏幕" />

:::info 要求
Apple Watch 集成需要 watchOS 8。要安装 watchOS 8，您必须拥有 Apple Watch Series 3 或更新机型。您可以在[这里](https://support.apple.com/HT204507)识别您的 Apple Watch 型号。
:::

## 复杂功能类型

Apple Watch 有多种表盘和复杂功能。参考[人机界面指南](https://developer.apple.com/design/human-interface-guidelines/complications)了解不同系列的示例以及特定复杂功能的显示方式很有帮助。您可以在复杂功能中放入 4 种主要类型的信息：

- 文本，可以渲染为[模板](https://www.home-assistant.io/docs/configuration/templating/)，根据模板类型以不同的字重和大小显示。
- 环形和仪表，显示为圆形线条。开放式变体显示为完整的圆，封闭式变体在图标中有具体的起始和结束位置。环形和仪表需要 `0.0`（空）到 `1.0`（满）之间的数值，并支持[模板](https://www.home-assistant.io/docs/configuration/templating/)。
- 图像可以从应用支持的 [Material Design Icons](http://materialdesignicons.com) 中选择。

:::info 支持的复杂功能类型
从 watchOS 9 开始，Apple 不再支持几种（旧版）复杂功能类型。以下复杂功能类型可用于 watchOS 9 及更高版本：图形圆形、图形角落、图形矩形和模块化大型。有关不同类型的更多详细信息，请参阅[人机界面指南](https://developer.apple.com/design/human-interface-guidelines/complications)。
:::

:::note 应用版本 
环形和仪表功能在 2020.7 之前的应用版本中不起作用。
:::