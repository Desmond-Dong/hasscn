在 Home Assistant 2024.8 中，我们为 data update coordinator 引入了 `_async_setup` 方法。
此方法允许您运行异步代码来准备您的 `DataUpdateCoordinator` 实例，
或加载只需加载一次的数据。

您可以在 coordinator 中重写 `_async_setup`，它将在 `coordinator.async_config_entry_first_refresh()` 期间自动被调用。
它提供与 `_async_update_data` 相同的错误处理，并将相应地处理 `ConfigEntryError`
和 `ConfigEntryAuthFailed`。

## 示例

```python

class MyUpdateCoordinator(DataUpdateCoordinator[MyDataType]):

    prereq_data: SomeData

    def __init__(
        self,
        hass: HomeAssistant,
    ) -> None:
        """初始化 coordinator。"""
        super().__init__(hass, _LOGGER, name=DOMAIN, update_interval=SCAN_INTERVAL)
        self.my_api = MyApi()


    async def _async_setup(self) -> None:
        """执行初始化逻辑。"""
        self.prereq_data = await self.my_api.get_initial_data()

    async def _async_update_data(self) -> MyDataType:
        """执行通常的更新"""
        return await self.my_api.update(self.prereq_data)
```

## 避免检查初始化状态

此更改允许您重构那些在 `_async_update_data` 方法中通过检查初始化变量来加载初始数据的代码，例如

```python
async def _async_update_data(self) -> ...:
    if not self.something:
        self.something = self.client.fetch()
    return self.client.fetch_data()
```

重构为

```python
async def _async_setup(self) -> None:
    self.something = self.client.fetch()

async def _async_update_data(self) -> ...:
    return self.client.fetch_data()
```

## 更多信息

更多信息请阅读[文档](https://developers.home-assistant.io/docs/integration_fetching_data/)。
