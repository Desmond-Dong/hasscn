---
title: 安装 Methods & Community Guides Wiki
description: '我们最近曾宣布，打算弃用通用版 Home Assistant 安装器。后来我们发现，这种安装方式比预期中更受欢迎，因此暂时搁置了这个计划。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# 安装 Methods & Community Guides Wiki

我们最近曾宣布，打算弃用通用版 Home Assistant 安装器。后来我们发现，这种安装方式比预期中更受欢迎，因此暂时搁置了这个计划。

针对这次公告，社区反馈中还提到：推荐安装方式的文档并不够完善，而且 home-assistant.io 上还存在许多其他安装指南，让人容易混淆。其中有些写得很好，有些则已经过时、不再准确，甚至内容缺失。

今天我想稍微退一步，从整体角度重新梳理安装方式：作为一个项目，我们究竟支持哪些安装方式？而“支持”又具体意味着什么？

## 文档现状

如果你看看我们目前的文档，就会发现内容有些分散。你可以在 Docker、虚拟机、NAS，或者各种 Linux 发行版上安装 Home Assistant。

之所以会有这么多指南，是因为从 Home Assistant 网站建立之初，我们就一直欢迎社区提交各种贡献，让 Home Assistant 能运行在尽可能多的平台上。平台越多越好！

但软件世界里没有什么是一成不变的。所有软件都会更新，以修复 Bug、堵住安全漏洞、提升性能，或者加入新功能。一个软件项目必须持续演进，否则就会停留在不安全的状态里。

随着 Home Assistant 不断成长和演进，一些安装指南逐渐过时，甚至已经无法使用。很多时候，只有当用户提交问题反馈时，我们才知道某篇指南坏掉了。可一旦出了问题，如果联系不到最初的贡献者，我们往往也不知道该如何修复。

这确实会令人沮丧。官网上的任何一篇指南，都应该能帮助用户搭建出一个可用的系统，而且不仅今天能用，明天也应该能继续用。在这件事上，我们做得还不够好，我想为此道歉。

## “官方支持的安装方式”定义

今天，我们正式引入“官方支持”和“社区支持”这两种分类。在 Home Assistant 的语境下，所谓“官方支持的安装方式”指的是：

_“一种由 Home Assistant 项目官方支持的安装与运行方式。这意味着该安装方式会在官方文档中得到记录并经过测试。使用这种受支持的方式运行 Home Assistant，能够在现在和未来都提供最佳的用户体验。”_

Home Assistant 团队不会阻止你使用非官方方式来运行 Home Assistant。但如果你在此过程中遇到问题，我们无法提供支持。对于提升社区支持方式兼容性的贡献，我们依然欢迎；前提是这些改动不能影响官方支持方式，不能引入大量特殊分支代码，也不能给 Home Assistant 开发团队带来明显的长期维护负担。

## 受支持的安装方式

目前官方支持以下四种安装方式：

  - **Home Assistant**<br>
    Full 安装 of our all-inclusive home 自动化 system. Best in class home 自动化 is complemented with a UI for configuring your system, making 备份 and safe updates with automatic rollback.

    This method was previously known as “Hass.io”, and includes our Operating System (HassOS), the Supervisor, and 插件. It can be run on various single-board computers or in a virtual machine.

  - **Home Assistant 容器**<br>
    Run just the Home Assistant 核心 application on a native OCI compatible containerization system (like Docker). It does not provide the full Supervisor experience, and thus does not provide the Supervisor 面板 and 插件.

    This method has a new name, and was previously known as “Home Assistant 核心 on Docker”.

  - **Home Assistant 受监管模式**<br>
    The full Home Assistant experience on a regular Linux operating system. This method was previously known as “Hass.io on generic Linux”, 已安装 on top of, e.g., Debian.

  - **Home Assistant 核心**<br>
    Run the Home Assistant 核心 application directly on Python. It does not provide the full Supervisor experience, and thus does not provide the Supervisor 面板 and 插件.

如你所见，Home Assistant 受监管模式不会被取消。

不过，上述各项方式目前还缺少一些更细化的说明，比如受监管模式支持哪些操作系统，或者完整 Home Assistant 安装支持哪些硬件。我们希望很快补上这些细节。

## Community Guides Wiki

Home Assistant 是一个开源项目，因此即使某种用法不在官方支持范围内，你依然可以按自己的方式使用它。我们欢迎这些替代性方案，也已经为社区建立了一个空间，方便大家提供、分享并共同维护额外文档。

我们在论坛中新增了一个名为 “[Community Guides]” 的分区。每篇帖子都会自动转成 wiki 文章，方便其他成员一起维护，也可以直接在文章下方展开讨论。这个分区不仅适用于安装方式，也适用于任何指南、操作说明或教程。

我们已经把若干原本位于官方文档中的指南迁移到了社区指南中。这些内容原本就被标记为“社区提供”，或者只面向非常特定的使用场景。

## 最后想说

今天这篇博文，一方面是想更清楚地说明我们对受监管模式安装的立场；另一方面，也想补充说明我们当前正在面对的问题，以及正在推进的解决方案。清理并重新组织官方文档，是这项工作的第一步，而且非常重要。

考虑到我们还没有把每种安装方式的具体细节全部整理完，你可能仍然会担心：自己当前的安装方案以后是否还会继续被支持。这些细节说明很快就会补充出来。我们无意阻止 Home Assistant 继续运行在社区支持的方式之上。

感谢热情的社区成员积极发声并提供反馈。我们会在不久之后分享更具体的细节，敬请关注。

Paulus

[Community Guides]: https://community.home-assistant.io/c/community-guides/
