---
title: "添加类型提示"
---

Python 中的 type hints 是对变量和函数的静态标注，便于人类更容易理解代码。请参见标准库 [docs](https://docs.python.org/3/library/typing.html) 以及这场 PyCascades 2018 的 [演讲](https://youtu.be/zKre4DKAB30)。

目前在 Home Assistant 中，并非所有模块都要求 type hints，但我们的目标是尽可能实现完整的覆盖。
为了改进和鼓励这一点，所有代码都会在我们的持续集成流程中进行类型检查，并假设所有内容都已进行类型检查，除非被明确排除在类型检查之外。

为现有代码库添加 type hints 可能是一项艰巨的任务。为了加快这一过程并帮助开发者，Instagram 制作了 [`monkeytype`](https://pypi.org/project/MonkeyType/) 程序。它会在运行时分析调用情况，并尝试为代码分配正确的 type hints。

参见 [这篇 Instagram 博客文章](https://instagram-engineering.com/let-your-code-type-hint-itself-introducing-open-source-monkeytype-a855c7284881) 了解使用 monkeytype 程序所涉及的工作流程。

我们添加了一个脚本，用于启动测试套件或测试模块的运行，并告诉 `monkeytype` 程序分析该运行。

### 基本工作流程

1. 运行 `script/monkeytype tests/path/to/your_test_module.py`。
2. 运行 `monkeytype stub homeassistant.your_actual_module`。
3. 查看 monkeytyped typing stub 的输出。如果结果不太糟糕，则将 stub 应用到你的模块。在最后一部通常需要手动编辑类型标注。
4. 运行 `monkeytype apply homeassistant.your_actual_module`。
5. 检查 diff，并在需要时手动纠正类型标注。提交、推送分支并创建 PR。

**注意：**
将 monkeytyped stub 应用到已有类型标注的模块可能会出错且无法工作。该工具对完全未标注类型的模块最有用。

### 包含用于严格类型检查的模块

虽然我们鼓励使用 type hints，但目前我们不要求集成必须使用。
默认情况下，我们的 CI 会进行静态类型检查。如果某个模块已经完全标注类型，可以通过将其添加到位于 Home Assistant Core 项目根目录的 `.strict-typing` 文件中，将其标记为启用严格检查。
