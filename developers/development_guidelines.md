# 开发规范

Home Assistant 对所有提交的代码都严格要求遵循 [PEP 8 风格指南](https://peps.python.org/pep-0008/) 和 [PEP 257（文档字符串约定）](https://peps.python.org/pep-0257/)。

我们使用 [Ruff](https://docs.astral.sh/ruff/) 进行代码格式化。作为 lint 流程的一部分，每个 PR 都会自动接受检查，我们不会合并不符合要求的提交。

最相关点的摘要：

* 注释应该是完整的句子并以句号结尾。
* [import](https://peps.python.org/pep-0008/#imports) 应按规范排序。
* 常量以及列表和字典的内容应按字母顺序排列。

建议调整 IDE 或编辑器设置以匹配这些要求。

## 我们的建议

对于某些情况，[PEP](https://peps.python.org/) 并没有给出明确建议。本节介绍我们在代码风格方面的补充建议。这些做法来自现有代码中的常见模式，也是贡献者和开发者最常采用的写法。它们本质上代表了多数人的选择，你未必完全认同，但我们仍鼓励你遵循这些建议，以保持代码风格一致。

### 文件头

文件头中的文档字符串应该描述文件的内容。

```python
"""Support for MQTT lights."""
```

### 记录消息

无需在日志消息中重复添加平台或组件名称，系统会自动补上。和 `syslog` 消息一样，日志末尾不应加句号。下面展示的是一种广泛使用的写法，不过你也可以根据需要组织措辞。

```python
_LOGGER.error("No route to device: %s", self._resource)
```

```log
2017-05-01 14:28:07 ERROR [homeassistant.components.sensor.arest] No route to device: 192.168.0.18
```

不要输出 API 密钥、令牌、用户名或密码，即使它们是错误的也不行。
`_LOGGER.info` 应只用于用户需要看到的信息，其他面向调试的内容请使用 `_LOGGER.debug`。

### 使用新样式的字符串格式

优先使用 [f-string](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)，而不是 `%` 或 `str.format`。

```python
# New
f"{some_value} {some_other_value}"
# Old, wrong
"{} {}".format("New", "style")
"%s %s" % ("Old", "style")
```

一个例外是使用百分比格式的日志记录。这是为了避免在日志消息被抑制时对其进行格式化。

```python
_LOGGER.info("Can't connect to the webservice %s at %s", string1, string2)
```

### 类型标注

我们鼓励尽可能编写完整类型标注的代码。这有助于在代码库中发现并预防问题，也能帮助其他贡献者在未来更轻松地维护你的代码。

默认情况下，Home Assistant 会在自动化 CI 流程中静态检查类型提示。
如果某个 Python 模块已经完成完整类型标注，可以把它加入 Home Assistant Core 项目根目录下的 `.strict-typing` 文件，以启用严格检查。

#### 使用 `assert` 缩小类型

有时，类型检查器无法推断代码中某个变量在某一处的确切类型，即使你很清楚它实际上更具体。在这种情况下，可以在 `TYPE_CHECKING` 代码块中使用 `assert` 语句，帮助类型检查器缩小类型范围。这些断言应**仅**出现在 `TYPE_CHECKING` 块内，因此它们只服务于类型检查，不会影响运行时行为。

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    assert something is not None

something.do_work()
```

### 函数文档字符串约定

类型注解通常已经覆盖了函数参数信息。

当你需要补充更多文档时，请遵循[Google 风格](https://google.github.io/styleguide/pyguide.html#383-functions-and-methods)来编写参数、返回值或异常的文档字符串。在这种情况下，参数和返回值的信息通常已经在类型注解中说明，因此应从文档字符串中省略。

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
