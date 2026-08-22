---
title: "集成测试文件结构"
sidebar_label: "测试文件结构"
---

每个集成的测试都存储在一个以其集成 domain 命名的目录中。例如，mobile app 集成的测试应存储在 `tests/components/mobile_app` 中。

该文件夹的内容如下：

- `__init__.py`：`pytest` 需要它来找到测试，可以将此文件限制为一段介绍集成测试的 docstring，例如 `"""Tests for the Mobile App integration."""`。
- `conftest.py`：Pytest 测试 fixtures
- `test_xxx.py`：测试集成对应部分的测试文件。`__init__.py` 中功能的测试（例如设置、重新加载和卸载 config entry），应该在名为 `test_init.py` 的文件中。

## 与其他集成共享 test fixtures

如果你的集成是一个实体集成（其他集成在它上面有 platforms），例如 `light` 或 `sensor`，则该集成可以提供其他集成编写测试时可使用的 test fixtures。

例如，`light` 集成可以通过向 `tests/components/conftest.py` 添加 fixture stubs，并在 `tests/components/light/common.py` 中实现这些 fixtures 的实际代码，来提供用于创建 mocked light 实体的 fixtures。
