# 测试你的代码

如[开发规范](/developers/development_guidelines.md)中所述，请检查所有代码，确认以下事项：

* 所有单元测试均通过
* 所有代码都通过 lint 工具检查

本地测试使用 [pytest](https://docs.pytest.org/)，linter 则通过 [prek](https://prek.j178.dev/) 运行。执行 `script/setup` 时，它们会一并安装到[虚拟环境](/developers/development_environment.md)中。

在运行测试前，需要先安装 Python 测试依赖。这可以通过 VS Code devcontainer 及相应任务完成。关于如何运行这些任务，请参阅[开发容器文档](/developers/development_environment.md#tasks)。

要在完整的代码库上运行我们的 linter，请运行以下命令：

```shell
prek run --all-files
```

要运行完整测试套件，需要安装比 devcontainer 默认环境更多的依赖。请先激活虚拟环境，再执行以下命令安装全部依赖：

```shell
uv pip install -r requirements_test_all.txt
```

或者，在 Visual Studio Code 中启动 **Install all test requirements** 任务。

要运行完整测试套件，请激活虚拟环境并执行以下命令：

```shell
pytest tests
```

或者，在 Visual Studio Code 中启动 **Pytest** 任务。

根据你的发行版或操作系统，可能还需要额外安装一些软件包：

* Fedora：`sudo dnf -y install systemd-devel gcc-c++`
* Ubuntu：`sudo apt-get install libudev-dev`

:::info Important
在创建 PR 之前先运行 `pytest` 和 `prek`，可以避免很多来回修补。
当提交更改时，`prek` 将被 git 自动调用。
:::

:::note
运行完整的 `pytest` 测试套件会花不少时间，因此作为提交 PR 的最低要求，至少请运行与本次改动相关的测试（下面会介绍具体方法）。创建 PR 后，在合并前 CI 也会运行完整测试套件。
:::

运行 `pytest` 将针对本地可用的 Python 版本运行单元测试。我们在 CI 中针对所有支持的 Python 版本运行测试。

### 向测试环境添加新的依赖项

如果你正在为某个集成编写测试，并且修改了依赖，请运行 `script/gen_requirements_all.py` 脚本来更新所有依赖文件。
然后，你可以通过以下命令更新开发环境中的全部依赖：

```shell
uv pip install -r requirements_test_all.txt
```

或者，在 Visual Studio Code 中启动 **Install all test requirements** 任务。

### 运行部分测试

你可以给 `pytest` 传递参数，只运行单个测试套件或测试文件。
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

如果你只想测试自己的集成，并生成覆盖率报告，推荐使用以下命令：

```shell
pytest ./tests/components/<your_component>/ --cov=homeassistant.components.<your_component> --cov-report term-missing -vv
```

或者，在 Visual Studio Code 中启动“代码覆盖率”任务。

### 防止 linter 错误

执行 `script/setup` 时，多个 linter 会被配置为在提交时自动运行。

您还可以手动运行这些 linter：

```shell
prek run --show-diff-on-failure
```

或者，在 Visual Studio Code 中启动 **Prek** 任务。

linter 也可以直接单独运行，你可以只检查某个文件：

```shell
ruff check homeassistant/core.py
pylint homeassistant/core.py
```

### 关于 PyLint 和 PEP8 检查的说明

如果某个 PyLint 警告确实无法避免，请使用 `# pylint: disable=YOUR-ERROR-NAME` 注释来禁用该行的检查。一个典型例子是 PyLint 错误地报告某个对象缺少某个成员。

### 为集成编写测试

* 确保集成测试不要直接依赖任何集成内部实现细节。遵循这种模式，测试在面对集成内部改动时会更稳健。
  * 如果集成支持配置条目，可使用 Core 接口 [`async_setup_component`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/setup.py#L44-L46) 或 [`hass.config_entries.async_setup`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/config_entries.py#L693) 来设置集成。
  * 通过 Core 状态机 [`hass.states`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/core.py#L887) 断言实体状态。
  * 通过 Core 服务注册表 [`hass.services`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/core.py#L1133) 调用服务操作。
  * 通过[设备注册表](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/helpers/device_registry.py#L101)断言 `DeviceEntry` 状态。
  * 通过[实体注册表](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/helpers/entity_registry.py#L120)断言 `RegistryEntry` 状态。
  * 通过配置条目接口 [`hass.config_entries`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/config_entries.py#L570) 修改 `ConfigEntry`。
  * 通过 [`ConfigEntry.state`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/homeassistant/config_entries.py#L169) 属性断言配置条目状态。
  * 通过 `MockConfigEntry` 类模拟配置条目，参考 [`tests/common.py`](https://github.com/home-assistant/core/blob/4cce724473233d4fb32c08bd251940b1ce2ba570/tests/common.py#L658)。

### 快照测试

Home Assistant 支持快照测试（也称 approval testing），这类测试会把结果与已保存的参考值（快照）进行比较。

快照测试不同于常规的功能测试，也不能替代功能测试，但它非常适合校验体量较大的输出。
例如，在 Home Assistant 中，它们可以用于：

* 确保实体状态输出符合预期并保持不变。
* 确保注册表中的区域、配置、设备、实体或问题条目符合预期并持续保持一致。
* 确保诊断转储的输出符合预期并保持不变。
* 确保 FlowResult 符合预期并保持不变。

还有更多具有大量输出的情况，例如 JSON、YAML 或 XML 结果。

快照测试与常规测试的最大区别在于：结果需要先通过一种特殊模式运行测试并保存为快照。之后每次运行测试时，都会把当前结果与快照比较；如果结果不同，测试就会失败。

Home Assistant 的快照测试构建在 [syrupy](https://github.com/tophat/syrupy) 之上，因此编写测试时也可以参考它的文档。下面是一个对实体状态输出进行快照断言的示例：

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

第一次运行这个测试时，它会失败，因为快照文件还不存在。
要创建（或更新）快照，请使用以下命令运行测试，并加上
`--snapshot-update` 标志：

```shell
pytest tests/components/example/test_sensor.py --snapshot-update
```

或者，在 Visual Studio Code 中启动 **Update syrupy snapshots** 任务。

这会在 `tests/components/example/snapshots` 中创建一个快照文件。快照文件会以测试文件命名，在本例中是 `test_sensor.ambr`，并且内容是可读的。该文件必须提交到仓库中。

当测试再次运行时（不带更新标志），它会把结果与已保存的快照进行比较；如果没有变化，测试就会通过。

当测试结果发生变化时，测试会失败，此时需要重新更新快照。

请谨慎使用快照测试。由于创建快照很容易，你可能会想把所有内容都改成快照断言；但请记住，它不能替代功能测试。

例如，当你要测试设备不可用时实体是否会变为不可用，最好直接断言你真正关心的变化：也就是实体状态变成 `unavailable`。相比对整个实体状态做快照，这样的功能测试更清晰，也更能准确表达预期行为。
