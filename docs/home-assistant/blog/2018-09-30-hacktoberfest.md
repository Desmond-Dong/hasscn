---
title: 参与 Hacktoberfest
description: '十月将迎来 Hacktoberfest(https://hacktoberfest.digitalocean.com/)。为了庆祝并支持开源，DigitalOcean(https://www.digitalocean.com/)、Twilio(https://www.twilio.com/) 和。'
---
# 参与 Hacktoberfest

十月将迎来 [Hacktoberfest](https://hacktoberfest.digitalocean.com/)。为了庆祝并支持开源，[DigitalOcean](https://www.digitalocean.com/)、[Twilio](https://www.twilio.com/) 和 [GitHub](https://github.com/) 再次联合举办该活动。和过去两年一样，Home Assistant 也会参与其中。

我们建议优先关注这些仓库。浏览 bug 列表并修复一个，就能用相对轻松的方式开始参与开源项目：

- [Home Assistant 前端](https://github.com/home-assistant/home-assistant-polymer)
- [Hass.io](https://github.com/home-assistant/hassio)
- [HassOS](https://github.com/home-assistant/hassos)
- [Hass.io CLI](https://github.com/home-assistant/hassio-cli)

我们还为另外两个仓库整理了一批入门级 bug、功能和文档改进项。当前请优先处理已开放的 issue，我们会在十月持续补充：

- [Home Assistant Easyfix collection](https://github.com/home-assistant/home-assistant/projects/2)
- [Home Assistant 文档 Easyfix collection](https://github.com/home-assistant/home-assistant.io/projects/2)

如果你在十月提交了五（5）个 Pull Request，就可以获得限量版 Hacktoberfest T 恤；若 PR 提交到 Home Assistant 仓库，还会被写入我们的致谢名单！不用担心，哪怕你提交的 PR 数量不到五个，也同样会被列入名单。

**我们希望重点支持新贡献者，以及想开始参与开源项目的人。**

准备好了吗？[立即报名 Hacktoberfest](https://hacktoberfest.digitalocean.com/profile)！

<!--more-->

## Details

Hacktoberfest 会给我们带来大量工作。2017 年十月，我们仅在三个主要仓库就处理了 625 个 Pull Request，其他 Home Assistant 相关仓库还有更多。我们的资源仍然有限，所以本届 Hacktoberfest 我们制定了一些规则，既帮助我们协作，也尽量减少大家的挫败感。

### General

- 请完整填写 Pull Request 模板（如有）。
- 提交 Pull Request 前先跑一遍代码检查（lint 与单元测试）。
- 请保持 Pull Request 小而聚焦。一个 PR 做一件事，远比一个 PR 同时改 19 处功能更容易审查。
- 未通过 CI 的 Pull Request 通常会得到更少关注，甚至无人处理。
- 我们无法保证所有 Pull Request 都会在十月内处理，敬请谅解。
- 对于缺少必要内容（见模板中的 Checklist）、信息不足或提交后长期无响应的 Pull Request，我们保留关闭权利。你准备好后可随时补充并重新开启。

### Home Assistant 前端

- 可以先阅读 [Polymer 文档](https://www.polymer-project.org/)。
- 再看 [Home Assistant 前端文档](https://开发者.home-assistant.io/docs/前端)。

### Home Assistant

- 先熟悉我们的 [Style Guidelines](https://开发者.home-assistant.io/docs/development_guidelines) 和现有代码。
- 通读 [开发者文档](https://开发者.home-assistant.io)。
- 别忘了文档。很多改动都需要同步更新文档，尤其是新增集成。你知道怎么用，但用户不知道。
- [架构层改动](https://github.com/home-assistant/architecture)需先讨论再提变更；此外，这类 Pull Request 十月期间可能不会优先审查。
- 如果你更新依赖，请确保它确实可用，并提供配置示例及相关信息（使用设备、固件版本等）。

### Home Assistant 文档

- 先熟悉 [Markdown](https://www.markdownguide.org/cheat-sheet)。
- 了解我们的[文档标准与规范](https://开发者.home-assistant.io/docs/documenting/standards)。
- 小改动（如拼写修复、语义澄清）可直接用 GitHub 在线编辑器完成。
- 大改动强烈建议先搭建本地环境构建文档，再提交 Pull Request。
- 注意分支目标：`current` 用于现有文档更新，`next` 用于下个版本才会上线的新功能或集成。

## Improve our dependencies

对我们而言，Hacktoberfest 不只是提交 Pull Request，更关乎整个生态。Home Assistant 依赖很多 Python 模块，你也可以通过让其他项目更健壮、迁移到 asyncio、适配 Python 3.7 等方式间接帮助 Home Assistant。

记得与代码仓库 owner 或维护者沟通，确保你的贡献能计入 Hacktoberfest。

## Help us with the workload

如果你愿意帮忙审查其他 Pull Request，也会是巨大的帮助。这会提高你自己和他人 PR 被及时处理的概率。我们目前在大多数仓库都已有 PR 积压。

如果你觉得自己经验不足，也不用担心，社区里会有人协助你。先从容易发现的问题入手完全没问题，先指出最明显的问题，再逐步深入。多一双眼睛总是更有价值。

## Not a coder? Not a problem!

如果你不是开发者，也完全没问题！你可以[报告 bug](https://github.com/home-assistant/home-assistant/issues/new/choose)、反馈使用体验、向社区分享你的[酷炫设置](https://community.home-assistant.io/c/projects)、用 [Lovelace](/home-assistant/Lovelace) 打造[超赞前端](https://community.home-assistant.io/c/projects/前端)，或者在[论坛](https://community.home-assistant.io/)帮助其他用户。

