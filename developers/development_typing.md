# 在代码中添加类型提示

Python 中的类型提示是对变量和函数添加的静态注解，可以让代码更容易理解。请参阅标准库[文档](https://docs.python.org/3/library/typing.html)以及 PyCascades 2018 的这个[演讲](https://youtu.be/zKre4DKAB30)。

目前，Home Assistant 中的所有模块都还不强制要求类型提示，但我们的目标是尽可能提高覆盖率。
为了推动这一点，所有代码都会在持续集成流程中进行类型检查，并默认假设代码应接受类型检查，除非明确被排除在外。

给现有代码库补充类型提示可能是一项艰巨的工作。为了加快这一过程并帮助开发者完成它，Instagram 开发了 [`monkeytype`](https://pypi.org/project/MonkeyType/)。它会在运行时分析调用，并尝试为代码推断出合适的类型提示。

关于使用 MonkeyType 的工作流，请参阅[这篇 Instagram 博文](https://instagram-engineering.com/let-your-code-type-hint-itself-introducing-open-source-monkeytype-a855c7284881)。

我们提供了一个脚本，用来运行测试套件或测试模块，并让 `monkeytype` 对运行过程进行分析。

### 基本工作流程

1. 运行 `script/monkeytype tests/path/to/your_test_module.py`。
2. 运行 `monkeytype stub homeassistant.your_actual_module`。
3. 检查 MonkeyType 生成的类型 stub 输出。如果结果不算太离谱，就把这些 stub 应用到你的模块中。通常你仍然需要手动调整内容。
4. 运行 `monkeytype apply homeassistant.your_actual_module`。
5. 检查 diff，并按需手动修正。然后提交、推送分支并创建 PR。

**注意：**
将 MonkeyType 生成的 stub 应用到已经包含类型注解的模块时，可能会出错甚至无法正常工作。这个工具最适合完全没有类型注解的模块。

### 包括用于严格类型检查的模块

虽然我们鼓励使用类型提示，但目前并不强制所有集成都这样做。
默认情况下，我们的 CI 会对类型提示做静态检查。如果某个模块已经完成了完整类型标注，可以把它加入 Home Assistant Core 项目根目录下的 `.strict-typing` 文件，以启用严格检查。
