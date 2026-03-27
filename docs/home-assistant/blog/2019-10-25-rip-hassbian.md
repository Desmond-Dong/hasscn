---
title: R.I.P Hassbian
description: '曾经最简单的 Home Assistant 安装方式，是时候退出历史舞台了。 本页属于 Home Assistant 中文博客与更新记录，适合了解版本演进、功能变更与社区动态。'
---
# R.I.P Hassbian

曾经最简单的 Home Assistant 安装方式，是时候退出历史舞台了。

## R.I.P Hassbian

你可能会想知道为什么 Hassbian 要停止维护，我会尽量说明白。
第一个原因是老生常谈的 **时间**。作为 Hassbian 的主要开发者，我已经无法投入它所需的时间和精力，其他持续推进项目的人也不多。唯一的例外是 [@ludeeus]，在镜像改造为使用正式 apt 包和仓库时，他承担了大部分工作。
第二个原因是：对大多数人来说，它已经不再是最佳安装方式。Hass.io 在我能想到的几乎所有方面都已经超过 Hassbian。

## Hassbian 的下一步

Hassbian 已经存在了很长时间，很多用户并不希望它消失。为了让过渡尽可能平滑，计划如下。

- 托管 Hassbian 项目文件的 [pi-gen] 和 [hassbian-脚本] 仓库将迁移到新的组织下。
- 我会在 2019 年第四季度中期发布最后一个版本。该镜像将托管在 [pi-gen] 仓库。
- [pi-gen] 仓库会调整为基于标准 [raspbian] 镜像做少量修改，方便任何人制作自己的 “类 Hassbian” 镜像。这一直都可行，只是当前仓库与新版 Raspbian 镜像结构有些脱节。
- [hassbian-脚本] 包会有最后一次发布，并继续托管在 Gitlab。我们也会做一些小改动来适配项目的新状态。

## Hassbian 用户的下一步

Hassbian 镜像一直以来都以“手动安装 Raspbian Lite 并额外添加一些软件包”为目标。
所以对 Hassbian 用户来说，实际上不会有太大变化；相关文档请参考[在树莓派上手动安装]方案。

## Alternatives

如果你想继续使用类似方案，可以查看[在树莓派上手动安装]，因为 Hassbian 就是基于它发展而来。
而对其他人，我真心推荐 Hass.io，因为我自己现在也在用它（它就是当年我希望 Hassbian 成为的样子，而且更好）。

## 最后

最后，感谢所有以任何方式为 Hassbian 项目和镜像做出贡献的人。

[@ludeeus]: https://github.com/ludeeus
[pi-gen]: https://github.com/Hassbian/pi-gen
[hassbian-脚本]: https://github.com/Hassbian/hassbian-脚本
[manual 安装 on a 树莓派]: /docs/installation/raspberry-pi/
[raspbian]: https://www.raspberrypi.org/downloads/raspbian/
