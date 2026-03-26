---
title: "开发清单"
sidebar_label: 介绍
---

在提交任何更改之前，请根据以下要求检查您的工作：

- 与外部 设备 或服务的所有通信都必须包装在托管于的外部 Python 库中[皮皮](https://pypi.org/).
  - 库必须有可用的源分发包；不允许依赖只有二进制分发包的包。
  - 必须为与外部 设备 或服务通信的外部 Python 库启用问题跟踪器。
  - 如果该库主要用于 Home Assistant 并且您是 集成 的代码所有者，则鼓励使用带有链接的问题模板选择器[Home Assistant Core 问题](https://github.com/home-assistant/core/issues)。例如：[zwave-js-server-python - 新问题](https://github.com/home-assistant-libs/zwave-js-server-python/issues/new/choose)
- 使用 `python3 -m script.gen_requirements_all` 将新依赖项添加到 `requirements_all.txt`（如果适用）
- 使用 `python3 -m script.hassfest` 将新代码所有者添加到 `CODEOWNERS`（如果适用）
- 如果 `.strict-typing` 文件提供了完整的类型提示源，则该文件会更新以包含您的代码。
- 该代码使用 Ruff (`ruff format`) 进行格式化。
- 文档的开发目的是[家庭助理.io](https://home-assistant.io/)
  - 参观[网站文档](/developers/documenting)有关贡献的更多信息[家庭助理.io](https://github.com/home-assistant/home-assistant.io).
