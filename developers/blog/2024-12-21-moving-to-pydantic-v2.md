Pydantic 是 Python 中广泛使用的数据验证库。2023 年 6 月 30 日，Pydantic v2 发布，引入了与 Pydantic v1 不向后兼容的重大变更。

从 Home Assistant Core 2025.1 起，Pydantic v2 将取代 v1。如果你的自定义集成使用了 Pydantic，则必须更新以支持 Pydantic v2，才能在即将发布的版本中继续工作。

在过去一年中，我们的社区努力确保 Home Assistant Core 使用的库与 Pydantic v1 和 v2 都兼容。这种双重兼容性帮助我们尽可能顺畅地过渡到 Pydantic v2。

如需快速迁移，你可以使用 Pydantic v2 中内置的 Pydantic v1 shims。关于在 v1/v2 环境中使用这些 shims 的详细信息，请参阅 [Pydantic migration guide](https://docs.pydantic.dev/latest/migration/#using-pydantic-v1-features-in-a-v1v2-environment)。
