---
title: 图标
description: '<p class=''img'' <img src=''/home-assistant/images/frontend/mdi.png'' alt=''Material Design Icons'' / </p。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 图标

<p class='img'>
  <img src='/home-assistant/images/frontend/mdi.png' alt='Material Design Icons' />
</p>

Home Assistant 使用社区驱动的 [Material Design Icons](https://pictogrammers.com/library/mdi/)（MDI）项目作为前端图标。这个图标库是 Google 基础图标库的超集，包含数千个由社区制作的图标，覆盖非常具体的应用、行业和使用场景。

## 默认图标

Home Assistant 中的每个实体都有一个默认图标。数量太多无法在此一一列出，但您会在仪表盘中看到它们。您可以[自定义任何实体](/home-assistant/docs/configuration/customizing-devices/)来更改显示给您的图标。

## 查找图标

### 图标选择器

查找图标最常用的方法是使用 Home Assistant 内置的图标选择器。在自定义实体时选择**图标**字段并开始输入。列表将筛选出符合您搜索条件的图标。当字段为空时，您也可以滚动浏览所有可用的图标。

<p class='img'>
  <img src='/home-assistant/images/screenshots/icon-picker.png' alt='Home Assistant 中的图标选择器' />
</p>

:::tip
图标选择器会根据图标名称以及 MDI 项目为该图标设置的别名进行筛选。例如，输入 `user` 会显示大多数名称中包含 `account` 的图标。
:::

有关自定义实体（包括其图标）的更详细步骤，请参阅[自定义实体](/home-assistant/docs/configuration/customizing-devices/)。

### Material Design 图标选择器浏览器扩展

在 Home Assistant 之外浏览和查找图标最简单的方法是使用官方的 [Material Design Icons Picker](https://github.com/Pictogrammers/MaterialDesignIcons-Picker) 浏览器扩展。该扩展适用于 Chrome、Firefox 和 Edge，由 MDI 团队维护。

<p class='img'>
  <img src='/home-assistant/images/screenshots/mdi-picker.png' alt='Material Design Icons Picker' />
</p>

:::note
并非 MDI 选择器浏览器扩展中显示的所有图标都（尚未）在 Home Assistant 中可用！虽然浏览器扩展会随着 MDI 发布新包而更新，但 Home Assistant 可能会滞后直到下一次发布。
:::

### Pictogrammers 网站上的 Material Design 图标

浏览可用图标的最后一种方法是在 Pictogrammers 网站上查看图标库，[https://pictogrammers.com/library/mdi/](https://pictogrammers.com/library/mdi/)。选择您想使用的图标，然后选择"Home Assistant"查看其使用示例。

:::note
Pictogrammers 网站将始终显示最新发布的 Material Design 图标库。但是，您可能会发现一些（尚未）在 Home Assistant 中可用的图标。请关注 Home Assistant 发布说明，了解 Material Design Icons 库升级的公告。
:::

## 建议或贡献新图标

与 Home Assistant 一样，Material Design 图标库是开源的，始终接受建议和贡献以扩展图标库。

:::note
在建议或创建新图标之前，请务必先[搜索当前图标库](https://pictogrammers.com/library/mdi/)并在其 GitHub 上[搜索所有问题](https://github.com/Templarian/MaterialDesign/issues?q=is%3Aissue)，包括已开放和已关闭的。尝试使用可能表示相同含义的不同术语进行搜索。例如："user"、"person"或"account"。
:::

### 建议新图标

如果您有一个图标想法但目前不在图标库中，但您不想自己创建它，可以[提交新图标建议](https://github.com/Templarian/MaterialDesign/issues/new?assignees=&labels=Icon+Request&template=1_icon_request.yml)。

### 贡献新图标

如果您想向图标库贡献新图标，请先熟悉 Material Design 系统中的[系统图标指南](https://material.io/design/iconography/system-icons.html#design-principles)。然后创建您的图标，并[提交给 Pictogrammers 团队审核](https://github.com/Templarian/MaterialDesign/issues/new?assignees=&labels=Icon+Request%2CContribution&template=2_contribution.yml)。

#### 创建新图标的技巧

- 务必注意 [Material Design 指南](https://material.io/design/iconography/system-icons.html#design-principles)。
- 请记住，图标应该是表达语境的，而不是字面意思。
- 在细节方面，越少越好。
- 如果不确定，请在他们的 GitHub 上提出问题。他们非常乐意帮助您！
- 并非所有图标都能进入图标库，这没关系！

### 建议图标别名

有时图标已经存在，但您无法使用搜索的术语找到它。如果您遇到过这种情况，请[向 Pictogrammers 团队提交问题建议新别名](https://github.com/Templarian/MaterialDesign/issues/new?assignees=&labels=Alias&template=4_alias.yml)，这些别名可以添加到现有图标中。
