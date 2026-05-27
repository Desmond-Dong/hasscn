# 集成测试文件结构

每个集成的测试都存放在一个以集成域命名的目录中。例如，移动应用集成的测试应位于 `tests/components/mobile_app`。

该目录中的内容通常如下：

* `__init__.py`：`pytest` 需要它来发现测试。该文件可以只保留一行文档字符串，例如 `"""Tests for the Mobile App integration."""`。
* `conftest.py`：Pytest fixtures。
* `test_xxx.py`：用于测试集成的不同部分。`__init__.py` 中功能的测试（例如配置条目的设置、重新加载和卸载）应放在名为 `test_init.py` 的文件中。

## 与其他集成共享测试夹具

如果您的集成是实体类型集成，而其他集成会为其提供平台（例如 `light` 或 `sensor`），那么该集成可以提供可供其他集成复用的测试夹具。

例如，`light` 集成可以在 `tests/components/conftest.py` 中提供用于创建模拟灯实体的 fixture stub，并在 `tests/components/light/common.py` 中提供对应 fixture 的具体实现。
