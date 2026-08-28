Home Assistant [现已支持 snapshot testing](https://github.com/home-assistant/core/pull/88323)
用于 Python 代码库。

Snapshot testing（也称为 approval tests）是将值与
存储的参考值（snapshot）进行断言的测试，
确保代码的输出随时间保持一致。

Snapshot 测试不同于常规的（功能）测试，不能替代
功能测试，但对于测试较大的输出非常有用。
在 Home Assistant 中，例如可用于测试 entity states、device
或 entity registry 条目，或诊断 dump 的输出。

以下是一个诊断测试示例，它使用 snapshot 来断言
诊断 dump 的输出：

```python
# tests/components/example/test_diagnostics.py
async def test_diagnostics(
    hass: HomeAssistant,
    hass_client: ClientSessionGenerator,
    init_integration: MockConfigEntry,
    snapshot: SnapshotAssertion,
) -> None:
    """Test diagnostics."""
    assert (
        await get_diagnostics_for_config_entry(hass, hass_client, init_integration)
        == snapshot
    )
```

首次运行此测试时将会失败，因为不存在 snapshot。
要创建（或更新）snapshot，请运行带 `--snapshot-update` 标志的 pytest，
这将在该组件的 `snapshots` 目录中创建 snapshot 文件。

Snapshot 文件以测试文件命名，在本例中为：
`tests/components/example/snapshots/test_diagnostics.ambr`。Snapshot 文件
是人类可读的，必须提交到仓库中。

随后的测试运行会将结果与
snapshot 进行比较。如果结果不同，测试将失败。

Snapshot 是一种确保代码输出随时间保持不变的简便方法，
可以大幅减少所需的测试代码量（同时提供）
对完整输出的完整断言。

Home Assistant 中的 snapshot testing 基于 [Syrupy](https://github.com/tophat/syrupy) 构建，
并进行了扩展以处理 Home Assistant 特定的数据结构。

有关测试集成的更多信息，
请参见[我们的文档](/developers/development_testing.md)。
