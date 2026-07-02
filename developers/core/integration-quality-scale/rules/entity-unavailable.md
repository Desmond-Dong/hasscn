# 如果适用，将实体标记为不可用

import RelatedRules from './\_includes/related\_rules.jsx'

## 推理

如果我们无法从设备或服务获取数据，我们应该将其标记为不可用。
我们这样做是为了反映更好的状态，而不仅仅是显示最后一个已知的状态。

如果我们能够成功获取数据，但暂时丢失了一些数据，我们应该将实体状态标记为未知。

## 实施示例

由于可以通过多种不同的方式来实现，因此我们将仅提供使用协调器进行集成以及通过 `async_update` 进行实体更新的示例。

### 使用协调器进行集成的示例

在此示例中，我们有一个使用协调器来获取数据的集成。
协调器与 `CoordinatorEntity` 结合使用时具有内置的可用性逻辑。
如果需要任何额外的可用性逻辑，请务必合并 `super().available` 值。
在示例中的传感器中，当更新失败或该设备的数据丢失时，我们将实体标记为不可用。

ZZ保护0ZZ

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

ZZ保护0ZZ

```python {6} showLineNumbers
class MySensor(SensorEntity, CoordinatorEntity[MyCoordinator]):

    @property
    def available(self) -> bool:
        """Return True if entity is available."""
        return super().available and self.identifier in self.coordinator.data
```

### 作者:`async_update` 更新实体的恐怖

在此示例中，我们有一个通过 `async_update` 更新其传感器值。
如果我们无法获取数据，我们会使用速记符号将实体设置为不可用。
如果我们可以获取数据，我们将实体设置为可用并更新值。

ZZ保护0ZZ

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

## 其他资源

有关管理集成状态的更多信息，请参阅 [documentation](/developers/integration_fetching_data.md)。

## 例外情况

如果集成可以通过用户定义的自动化触发或自动辅助控制通道（例如，使用 LAN 唤醒或红外发射器）来打开设备，则当该设备出现对主通道的状态报告（例如 TCP）且无响应时，应将其报告为 `off`。如果不存在此类方法，则设备处于当前状态无法下控制，应将其报告为 `unavailable`。

一个示例场景，对于进入待机模式并且只能使用外部设备（例如红外发射器）打开的媒体播放器:

* 首次添加到Home Assistant且没有活动连接时，设备将显示为`unavailable`。
* 如果用户配置自动化（例如，使用红外发射器）来打开它，则设备在接下来的状态下将显示为 `off`。
* 一旦通过外部方法打开并建立主连接，状态将更新为`on`。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
