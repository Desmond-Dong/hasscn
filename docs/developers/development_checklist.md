---
title: "开发检查清单"
sidebar_label: 简介
---

在你提交任何更改之前，请对照以下要求检查工作成果：

- 与外部设备或服务的所有通信都必须封装在一个托管于 [pypi](https://pypi.org/) 的外部 Python 库中。
  - 该库必须提供 source distribution 包；不允许依赖只有 binary distribution 包的包。
  - 与外部设备或服务通信的外部 Python 库必须启用 issue tracker。
  - 如果该库主要用于 Home Assistant，且你是该集成的 code owner，鼓励使用带链接到 [Home Assistant Core Issues](https://github.com/home-assistant/core/issues) 的 issue template picker。例如：[zwave-js-server-python - New Issue](https://github.com/home-assistant-libs/zwave-js-server-python/issues/new/choose)
- 新依赖项已添加到 `requirements_all.txt`（如适用），使用 `python3 -m script.gen_requirements_all`
- 新 codeowners 已添加到 `CODEOWNERS`（如适用），使用 `python3 -m script.hassfest`
- `.strict-typing` 文件已更新以包含你的代码（如果它提供了完全类型标注的源代码）。
- 代码已使用 Ruff 格式化（`ruff format`）。
- 任何删除或更改现有行为的内容都遵循[废弃流程](/developers/deprecating)。
- 已为 [home-assistant.io](https://home-assistant.io/) 开发文档
  - 访问[网站文档](/developers/documenting)以获取更多有关为 [home-assistant.io](https://github.com/home-assistant/home-assistant.io) 做贡献的信息。
