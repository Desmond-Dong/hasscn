---
title: "如果互联网/设备/服务不可用，仅在不可用时记录一次，重新连接时记录一次"
sidebar_label: 🥈 log-when-unavailable
related_rules:
  - entity-unavailable
---
import RelatedRules from './_includes/related_rules.jsx'

## 理由

当设备或服务无法访问时，entities 通常会变为 unavailable。
为了允许用户了解原因，集成应在此发生时进行记录。
确保总共只记录一次，以避免日志刷屏。

当设备或服务再次可访问时，集成也应记录这一点。
这对于使用日志查找设备或服务何时不可用、何时恢复在线非常有用。

:::info
日志应使用 `info` 级别。
:::

## 示例实现

由于实现方式多种多样，我们只针对使用 coordinator 的集成和通过 `async_update` 更新的 entity 提供示例。

### 使用 coordinator 的集成示例

在此示例中，我们有一个使用 coordinator 获取数据的集成。
coordinator 内置了只记录一次的逻辑。
你在 coordinator 中唯一需要做的是，当设备或服务不可用时抛出 `UpdateFailed`。

`coordinator.py`
```python {18} showLineNumbers
class MyCoordinator(DataUpdateCoordinator[MyData]):
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
    
    async def _async_update_data(self) -> MyData:
        try:
            return await self.client.get_data()
        except MyException as ex:
            raise UpdateFailed(f"The device is unavailable: {ex}")
```

### 通过 `async_update` 更新的 entity 示例

在此示例中，我们有一个通过 `async_update` 更新其值的 sensor。
示例将在 sensor 不可用时记录，并在 sensor 重新上线时记录。
注意，使用实例属性来跟踪消息是否已记录，以避免日志刷屏。

`sensor.py`
```python {10-12,16-18} showLineNumbers
class MySensor(SensorEntity):

    _unavailable_logged: bool = False

    async def async_update(self) -> None:
        try:
            data = await self.client.get_data()
        except MyException as ex:
            self._attr_available = False
            if not self._unavailable_logged:
                _LOGGER.info("The sensor is unavailable: %s", ex)
                self._unavailable_logged = True
        else:
            self._attr_available = True
            self._attr_native_value = data.value
            if self._unavailable_logged:
                _LOGGER.info("The sensor is back online")
                self._unavailable_logged = False
```

## 更多资源

有关管理集成状态的更多信息，请参见[文档](/developers/integration_fetching_data)

## 例外

此规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
