---
title: Home Assistant 中的能源管理
description: 监控你的能源使用情况，转向可持续能源，并节省开支。
---

_TL; DR: 我们正在添加能源管理功能，而且[效果很棒](https://demo.home-assistant.io/#/energy)。我们还打造了两款用于读取电表数据的产品：[SlimmeLezer](https://www.slimmelezer.nl) 适用于 P1 端口，[Home Assistant Glow](https://github.com/klaasnicolaas/home-assistant-glow) 适用于活动指示灯。我们也升级了大多数[现有的能源集成](/home-assistant/integrations/#energy)，让它们可以兼容。_

<img src='/home-assistant/images/blog/2021-08-energy/social.png' style='border: 0;box-shadow: none;'>

世界正处于气候危机之中。全球变暖是现实，天气也变得越来越难以预测。我们的生活方式需要在各个层面发生改变。我担心的是，世界会太晚才开始尝试解决这场气候危机，而那时一些不可逆的损害可能已经发生。

因此，在 Home Assistant 中，我们希望尽自己的一份力量来应对气候危机，也帮助你做到这一点。应对气候危机的一部分，就是确保我们的家庭具备能源效率，并使用低碳能源。

从今天开始，Home Assistant 正式支持家庭能源管理。我们的能源管理功能将帮助你监控能源使用情况、转向可持续能源，并节省开支。

<p class='img'>
<img src='/home-assistant/images/blog/2021-08-energy/architecture.png' alt='展示家庭自动化和能源管理如何使用同一数据的图示。'>
家庭自动化和能源管理都建立在了解设备运行情况的基础之上
</p>

## 能源管理与 Home Assistant 的背景

Bill Gates 最近接受了 Marques Brownlee（MKBHD）的采访，谈到了为什么智能家庭是建设智慧城市所必需的一环，以及这一切如何从家庭中的能源管理开始。这段采访只有 3 分钟，很值得一看：

<div class="videoWrapper">
  <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/ccnlAVDXd7k?start=978" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

当谈到能源管理时，Home Assistant 并不会立刻给出所有答案。但我们具备两个关键优势，这让我们成为你进行能源管理的理想平台。

第一，我们是完全开放的。这意味着，任何人都可以使用 Home Assistant 的[源代码](https://github.com/home-assistant/核心)或[所收集的数据](https://data.home-assistant.io/)，并基于它构建任何东西。我们已经看到了这样的实践：[欧洲公民能源合作社联合会](https://www.rescoop.eu/) 正在使用 Home Assistant，打造[面向社区的定制化能源管理软件](https://www.rescoopvpp.eu/博客/presenting-the-cofy-box)。我们是一个丰富生态系统的一部分，其中有许多不同的方法，而 Home Assistant 将它们连接在一起。

第二，我们拥有一个充满热情、遍布全球的社区，大家都希望把自己的家打造到最好。这个社区围绕着自行构建和分享硬件与软件而运转，以实现自己的目标。通过不断实验和迭代，我们能够持续改进能源管理，让它更适合我们的需要，而且我们不需要迎合投资人的要求。

在你的家里，Home Assistant 是管理家庭、弄清楚哪些方法有效、哪些方法无效的最佳平台。

<!--more-->

## 能源仪表盘

今天发布的 [Home Assistant 核心 2021.8](/home-assistant/blog/2021/08/04/release-20218/) 带来了全新的能源仪表盘（[演示](https://demo.home-assistant.io/#/energy)）。它的目标是让你能够非常轻松地了解自己的能源使用情况。这个仪表盘经过精心设计，让你一眼就能看出今天的整体情况，同时还能按小时拆分，查看某个时间段发生了什么。它还包含一些指标，帮助你识别自己对电网的依赖程度，以及增加储能是否会对你有帮助。

<p class='img'>
<img src='/home-assistant/images/blog/2021-08-energy/sidebar-widgets.png'>
（上）从不同角度查看用电情况，可以帮助你更好地理解自己的能源使用<br>
（下）能源使用图会按小时显示你从电网用了多少电、你生产了多少电，以及其中有多少回馈到了电网。
<img src='/home-assistant/images/blog/2021-08-energy/energy-usage.png'>
</p>

你将能够一眼看出家中使用了哪些能源来源。这项洞察还包括从电网获取电力时的碳强度数据，这得益于 [electricityMap](https://www.electricitymap.org/)。

如果你有太阳能板，可以设置 [Forecast.Solar](https://www.forecast.solar) 集成，这样你就能快速查看今天的发电情况。这让你可以更好地安排何时为电动车充电，或者提前多加热一些热水。

<img src='/home-assistant/images/blog/2021-08-energy/solar-production.png' style='border: 0;box-shadow: none;'><br>

能源管理本身比较复杂，因此我们尽可能让能源设置简单易用。与此同时，我们还提供了[文档](/home-assistant/docs/energy/)，进一步解释不同概念。

你可以配置自己的消耗和产出，剩下的就交给 Home Assistant。Home Assistant 可以从任何受支持的硬件中获取能源数据，例如智能电表、逆变器、电流互感器、脉冲监视器，以及智能插头。

<p class='img'>
<img src='/home-assistant/images/blog/2021-08-energy/config-dialogs.png'>
配置被划分为不同的部分。
</p>

## 硬件

Home Assistant 与厂商无关，也不存在厂商锁定。你可以使用自己想要的任何硬件。我们已经升级了许多[现有的能源监测集成](/home-assistant/integrations/#energy)，让它们能够开箱即用地配合能源管理功能。

除了支持现有集成，我们还打造了两个开源硬件项目，帮助你把能源数据接入 Home Assistant。

### Slimme Lezer

荷兰、比利时和卢森堡的大多数电表都带有 P1 端口。这个端口可以提供实时使用统计数据。

我们与 [Marcel Zuidwijk](https://www.zuidwijk.com) 一起设计并开发了 [SlimmeLezer](https://www.slimmelezer.nl)。这款基于 [ESPHome](https://esphome.io) 的产品，可以让所有 P1 数据立即在 Home Assistant 中可用。使用 DSMR v5 协议的 P1 端口还能够直接为这台设备供电，因此你不需要外接充电器。SlimmeLezer 的固件完全开源。

[购买 SlimmeLezer](https://www.slimmelezer.nl)

[GitHub 上的 SlimmeLezer](https://www.github.com/zuidwijk/dsmr/)

![连接在智能电表上的 SlimmeLezer 照片](/home-assistant/images/docs/energy/slimmelezer.jpg)

### Home Assistant Glow

大多数电表在消耗固定数量的电能时，都会闪烁一个小灯。Home Assistant Glow 会监测这个灯光，并把它作为一个消耗传感器带入 Home Assistant。

Home Assistant Glow 由 [ESPHome](https://esphome.io) 驱动。固件和外壳都完全开源，而且借助附带的指南，自己制作一个也相对直接。

Home Assistant Glow 由 [Klaas Schoute](https://github.com/klaasnicolaas) 在 [Nabu Casa](https://www.nabucasa.com) 实习期间设计并开发。

[GitHub 上的 Home Assistant Glow](https://github.com/klaasnicolaas/home-assistant-glow)

![连接在电表上的 Home Assistant Glow 照片](/home-assistant/images/docs/energy/home-assistant-glow.jpg)

### 这只是开始

今天，我们在 Home Assistant 2021.8 中发布了能源管理的第一个版本。接下来几次发布中，我们还会加入许多想法。

如果你有兴趣一起参与，欢迎来到[我们的 Discord 服务器](/home-assistant/join-chat)中的全新 `#devs_energy` 频道。

### 面向高级用户的新可能性

每个家庭都不一样，每个人的需求也不同。Home Assistant 中的能源管理功能是基于现有的 Home Assistant 构建模块打造的：Lovelace 和数据存储。这意味着，高级用户可以选择构建自己的仪表盘，并使用[能源仪表盘](/home-assistant/dashboards/energy/)中的部分组件。

除此之外，高级用户还可以访问 Home Assistant 新增的[长期统计](/home-assistant/dashboards/statistics-graph/)。这些数据让你能够在较长时间范围内轻松监控大多数传感器数据，而不仅仅是能源数据。

### 感谢社区

我们的家庭能源管理功能已经开发了超过六个月，来自世界各地的许多人和公司都为它的成功做出了贡献。

我们升级了 Home Assistant 的数据存储方式、图表渲染方式，并增强了许多其他部分。我们还扩展了 ESPHome 中的传感器模型，并新增了一些功能，以便创建能够与能源管理开箱即用的设备。这是一项许多人共同完成的大工程，我为我们取得的成果感到非常自豪。

这再次证明了开源是可行的：当一群人因为热爱某件事而走到一起时，就能创造出伟大的成果。

我想特别感谢 [Klaas Schoute](https://github.com/klaasnicolaas)。他在 [Nabu Casa](https://www.nabucasa.com) 实习期间启动了最初的研究工作。他研究了现有方案，打造了自己的解决方案（[Home Assistant Glow](https://github.com/klaasnicolaas/home-assistant-glow)），对 20 位 Home Assistant 用户进行了深入访谈，完成了仪表盘的最初几轮设计，并把新的数据源集成进 Home Assistant（[forecast.solar](/home-assistant/integrations/forecast_solar/)）。谢谢你，Klaas！

![Klaas 的一张草图](/home-assistant/images/blog/2021-08-energy/klaas-prototype.png)

### 支持我们的工作

如果你喜欢我们正在做的事情，并希望帮助资助我们的工作，请订阅 [Home Assistant Cloud](https://www.nabucasa.com)。
