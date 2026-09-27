Home Assistant 对所有提交的代码都强制执行严格的 [PEP8 style](https://peps.python.org/pep-0008/) 和 [PEP 257 (Docstring Conventions)](https://peps.python.org/pep-0257/) 规范。

我们使用 [Ruff](https://docs.astral.sh/ruff/) 进行代码格式化。每个 pull request 都会作为 linting 过程的一部分自动进行检查，我们不会合并不符合规范的提交。

相关要点摘要：

* 注释应为完整的句子，并以句号结尾。
* [Imports](https://peps.python.org/pep-0008/#imports) 应按顺序排列。
* 常量以及列表和字典的内容应按字母顺序排列。

建议调整 IDE 或编辑器设置以符合这些要求。

## 我们的建议

对于某些情况，[PEPs](https://peps.python.org/) 并没有明确规定。本节涵盖了我们关于代码风格的建议。这些要点来自现有代码，并基于贡献者和开发者最常使用的实践。这基本上是一个多数决定，因此你可能并不认同。但我们希望鼓励你遵循这些建议，以保持代码的一致性。

### 文件头部

文件头部 docstring 应描述该文件的作用。

```python
"""Support for MQTT lights."""
```

### 日志消息

无需在日志消息中附加平台或组件名称，这会自动完成。与 `syslog` 消息一样，末尾不应有句号。一种广泛使用的风格如下所示，但你可以自由组合消息内容。

```python
_LOGGER.error("No route to device: %s", self._resource)
```

```log
2017-05-01 14:28:07 ERROR [homeassistant.components.sensor.arest] No route to device: 192.168.0.18
```

不要打印 API keys、tokens、用户名或密码（即使它们有误）。
谨慎使用 `_LOGGER.info`，对于不面向用户的内容，请使用 `_LOGGER.debug`。

### 使用新式字符串格式化

优先使用 [f-strings](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)，而不是 `%` 或 `str.format`。

```python
# New
f"{some_value} {some_other_value}"
# Old, wrong
"{} {}".format("New", "style")
"%s %s" % ("Old", "style")
```

一个例外是日志记录，它使用百分比格式化。这是为了在日志消息被抑制时避免格式化。

```python
_LOGGER.info("Can't connect to the webservice %s at %s", string1, string2)
```

### Typing

我们鼓励完全为你的代码添加类型注解。这有助于在我们代码库中发现/防止问题和 bug，也有助于其他贡献者在未来对你代码进行调整。

默认情况下，Home Assistant 会在自动化 CI 流程中进行静态类型检查。
如果 Python 模块已经完成了完整的类型标注，可以通过在 Home Assistant Core 项目根目录的 `.strict-typing` 文件中添加条目，将其纳入严格检查。

#### 使用 `assert` 缩小类型范围

有时候类型检查器无法确定代码中某一点的变量确切类型，即使你明确知道它的类型更具体。在这种情况下，可以在 `TYPE_CHECKING` 代码块中使用 `assert` 语句来帮助类型检查器缩小类型范围。这些 assert 语句**只能**用于 `TYPE_CHECKING` 代码块中，使其仅对类型检查器有效，不影响运行时行为。

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    assert something is not None

something.do_work()
```

### 函数 docstring 约定

类型注解通常用于记录函数参数。

当你需要更详细的文档时，请使用 [Google style](https://google.github.io/styleguide/pyguide.html#383-functions-and-methods) 编写 docstring，记录参数、返回值或异常。在这些情况下，参数和返回值的类型信息应该已经在类型注解中指定，并从 docstring 中省略。

```python
def some_method(self, param1: str, param2: str) -> int:
    """Example Google-style docstring.

    Args:
        param1: The first parameter.
        param2: The second parameter.

    Returns:
        An integer result.

    Raises:
        KeyError: If the key doesn't exist.
    """
    return 0
```
