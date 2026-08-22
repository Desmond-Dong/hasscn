---
title: "在适当情况下标记 entity 为不可用"
sidebar_label: 🥈 entity-unavailable
related_rules:
  - log-when-unavailable
---
import RelatedRules from './_includes/related_rules.jsx'

## 理由

如果我们无法从设备或服务获取数据，应将其标记为不可用。
这样做的目的是反映更准确的状态，而不是仅仅显示上一次已知状态。

如果我们能成功获取数据，但暂时缺少部分数据，则应将 entity 状态标记为 unknown。

## 示例实现

由于实现方式多种多样，我们只针对使用 coordinator 的集成以及通过 `async_update` 更新状态的 entity 提供示例。

### 使用 coordinator 的集成示例

在本示例中，我们有一个使用 coordinator 获取数据的集成。
coordinator 与 `CoordinatorEntity` 结合使用时，具备内置的可用性逻辑。
如果需要额外的可用性逻辑，请务必纳入 `super().available` 的值。
在示例的 sensor 中，当更新失败或该设备的数据缺失时，我们将 entity 标记为不可用。

`coordinator.py`
```python {18} showLineNumbers
class MyCoordinator(DataUpdateCoordinator[dict[str, MyDevice]]):
    """Class to manage fetching data."""

    def __init__(self, hass: HomeAssistant, client: MyClient) -> None:
        """Initialize coordinator."""
        super().__init__(
            hass,
            logger=LOGGER,
            name=DOMAIN,
            update_interval=timedelta(minutes=1),
        )
        self.client = client

    async def _async_update_data(self) -> dict[str, MyDevice]:
        try:
            return await self.client.get_data()
        except MyException as ex:
            raise UpdateFailed(f"The service is unavailable: {ex}")
```

`sensor.py`
```python {6} showLineNumbers
class MySensor(SensorEntity, CoordinatorEntity[MyCoordinator]):

    @property
    def available(self) -> bool:
        """Return True if entity is available."""
        return super().available and self.identifier in self.coordinator.data
```

### 通过 `async_update` 更新的 entity 示例

在本示例中，我们有一个通过 `async_update` 更新值的 sensor。
如果无法获取数据，我们通过简写方式将 entity 设置为不可用。
如果能获取数据，则将 entity 设置为可用并更新值。

`sensor.py`
```python {7,9} showLineNumbers
class MySensor(SensorEntity):

    async def async_update(self) -> None:
        try:
            data = await self.client.get_data()
        except MyException as ex:
            self._attr_available = False
        else:
            self._attr_available = True
            self._attr_native_value = data.value
```

## 附加资源

有关管理集成状态的更多信息，请参阅[文档](/developers/integration_fetching_data)。

## 例外

如果集成可以打开设备（无论是通过用户定义的自动化 trigger，还是通过自动创建辅助控制通道，例如使用 Wake-on-LAN 或红外发射器），则当设备处于待机状态且对主通道（例如 TCP）无响应时，应报告为 `off`。如果不存在此类方法，并且设备在当前状态下无法被控制，则应报告为 `unavailable`。

以下是一个示例场景：一个进入待机模式且只能通过外部设备（例如红外发射器）打开的媒体播放器：

- 当首次添加到 Home Assistant 且没有活动连接时，设备显示为 `unavailable`。
- 如果用户配置自动化（例如使用红外发射器）来打开它，设备在待机时将显示为 `off`。
- 一旦通过外部方法打开且主连接建立，状态将更新为 `on`。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
