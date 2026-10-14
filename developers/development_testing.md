如[风格指南部分](/developers/development_guidelines.md)所述，所有代码都会进行检查，以验证以下内容：

* 所有单元测试通过
* 所有代码通过 linting 工具的检查

本地测试使用 [pytest](https://docs.pytest.org/) 进行，并使用 [prek](https://prek.j178.dev/) 来运行 linting 工具，它已在[虚拟环境](/developers/development_environment.md)中运行 `script/setup` 时安装。

在运行测试之前，需要先安装 Python 测试依赖。可以通过使用 VScode devcontainer 及相应的任务来实现。请查看 [devcontainer 文档](/developers/development_environment.md#tasks) 了解运行任务的指导。

要在整个代码库上运行 linting 工具，请执行以下命令：

```shell
prek run --all-files
```

要启动测试并运行完整的测试套件，激活虚拟环境并运行以下命令：

```shell
pytest tests
```

或者，在 Visual Studio Code 中，启动 **Pytest** 任务。

根据你的发行版/操作系统，可能需要安装额外的包：

* Fedora: `sudo dnf -y install systemd-devel gcc-c++`
* Ubuntu: `sudo apt-get install libudev-dev`

:::info Important
在创建 pull request 之前运行 `pytest` 和 `prek`，以避免令人烦恼的修复。
`prek` 会在 git 提交更改时自动调用。
:::

:::note
运行完整的 `pytest` 测试套件需要相当长的时间，因此作为 pull request 的最低要求，请至少运行与你的代码更改相关的测试（见下文了解如何操作）。完整的测试套件无论如何都会在创建 pull request 之后、合并之前由 CI 运行。
:::

运行 `pytest` 会在本地可用的 Python 版本上运行单元测试。我们会在 CI 中针对所有受支持的 Python 版本运行测试。

### 向测试环境添加新依赖

如果你正在为某个集成编写测试并更改了依赖项，请运行 `script/gen_requirements_all.py` 脚本来更新所有需求文件。
接下来，可以通过运行以下命令更新开发环境中的所有依赖项：

```shell
uv pip install -r requirements_all.txt -r requirements_test.txt
```

或者，在 Visual Studio Code 中，启动 **Install all (test & production) Requirements** 任务。

### 运行有限的测试套件

可以向 `pytest` 传递参数，以运行单个测试套件或测试文件。
以下是一些有用的命令：

```shell
# Stop after the first test fails
$ pytest tests/test_core.py -x

# Run test with specified name
$ pytest tests/test_core.py -k test_split_entity_id

# Fail a test after it runs for 2 seconds
$ pytest tests/test_core.py --timeout 2

# Show the 10 slowest tests
$ pytest tests/test_core.py --duration=10
```

如果你只想测试你的集成，并包含测试覆盖率报告，建议使用以下命令：

```shell
pytest ./tests/components/<your_component>/ --cov=homeassistant.components.<your_component> --cov-report term-missing -vv
```

或者，在 Visual Studio Code 中，启动 **Code Coverage** 任务。

### 防止 linter 错误

多个 linting 工具已配置为在尝试提交时自动运行，作为在[虚拟环境](/developers/development_environment.md)中运行 `script/setup` 的一部分。

也可以手动运行这些 linting 工具：

```shell
prek run --show-diff-on-failure
```

或者，在 Visual Studio Code 中，启动 **Prek** 任务。

linting 工具也直接可用，可以对单个文件运行测试：

```shell
ruff check homeassistant/core.py
pylint homeassistant/core.py
```

### 关于 PyLint 和 PEP8 验证的注意事项

如果无法避免某个 PyLint 警告，请添加注释，使用 `# pylint: disable=YOUR-ERROR-NAME` 禁用该行的 PyLint 检查。一个无法避免的示例是，当 PyLint 错误报告某个对象没有某个成员时。

### 为集成编写测试

* 确保在集成的测试中不要与集成的内部细节交互。遵循此模式将使测试在面对集成变更时更加健壮。
  * 使用核心接口，通过 [`async_setup_component`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/setup.py#L44-L46) 或（如果该集成支持 config entries）[`hass.config_entries.async_setup`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/config_entries.py#L693) 来设置集成。
  * 通过核心 state machine [`hass.states`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/core.py#L887) 断言 entity 状态。
  * 通过核心 service registry [`hass.services`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/core.py#L1133) 执行 service action 调用。
  * 通过 [device registry](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/helpers/device_registry.py#L101) 断言 `DeviceEntry` 状态。
  * 通过 [entity registry](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/helpers/entity_registry.py#L120) 断言 entity registry `RegistryEntry` 状态。
  * 通过 config entries 接口 [`hass.config_entries`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/config_entries.py#L570) 修改 `ConfigEntry`。
  * 通过 [`ConfigEntry.state`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/config_entries.py#L169) 属性断言 config entry 的状态。
  * 通过 [`tests/common.py`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/tests/common.py#L658) 中的 `MockConfigEntry` 类来 mock 一个 config entry。

### 快照测试

Home Assistant 支持一种称为 snapshot testing（也称为 approval tests）的测试概念，即通过将值与存储的引用值（snapshot）进行断言的测试。

snapshot 测试不同于常规（功能性）测试，也不能取代功能性测试，但对于测试较大的测试输出非常有用。在 Home Assistant 中，它们可以用于：

* 确保 entity 状态的输出符合预期并保持不变。
* 确保 registry 中的 area、config、device、entity 或 issue entry 符合预期并保持不变。
* 确保诊断 dump 的输出符合预期并保持不变。
* 确保 FlowResult 符合预期并保持不变。

以及更多具有较大输出的情况，如 JSON、YAML 或 XML 结果。

snapshot 测试与常规测试的主要区别在于，结果是通过以特殊模式运行测试来捕获并创建 snapshot 的。随后测试的每次顺序运行都会将结果与 snapshot 进行比较。如果结果不同，测试将失败。

Home Assistant 中的 snapshot testing 建立在 [Syrupy](https://github.com/tophat/syrupy) 之上，因此编写 Home Assistant 测试时可以适用其文档。以下是一个断言 entity 状态输出的 snapshot 测试：

```python
# tests/components/example/test_sensor.py
from homeassistant.core import HomeAssistant
from syrupy.assertion import SnapshotAssertion


async def test_sensor(
    hass: HomeAssistant,
    snapshot: SnapshotAssertion,
) -> None:
    """Test the sensor state."""
    state = hass.states.get("sensor.whatever")
    assert state == snapshot
```

首次运行此测试时，它会失败，因为不存在 snapshot。
要创建（或更新）snapshot，请使用 `--snapshot-update` 标志运行测试：

```shell
pytest tests/components/example/test_sensor.py --snapshot-update
```

或者，在 Visual Studio Code 中，启动 **Update syrupy snapshots** 任务。

这会在 `tests/components/example/snapshots` 中创建一个 snapshot 文件。snapshot 文件以测试文件命名，在本例中为 `test_sensor.ambr`，并且是人工可读的。snapshot 文件必须提交到仓库中。

再次运行测试时（不带更新标志），会将结果与存储的 snapshot 进行比较，一切应该通过。

当测试结果发生变化时，测试会失败，需要再次更新 snapshot。

请谨慎使用 snapshot testing！因为创建 snapshot 非常容易，容易让人倾向于对一切内容进行 snapshot 断言。然而，请记住，它不是功能性测试的替代品。

例如，在测试 device 返回错误时 entity 是否会变为 unavailable，更好的做法是断言你期望的特定变更：断言该 entity 的状态变为 `unavailable`。这种功能性测试比使用 snapshot 断言该 entity 的完整状态要好，因为后者假设其按预期工作（在创建 snapshot 时）。
