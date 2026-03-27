---
title: "如果互联网/设备/服务不可用，则在不可用时记录一次，在重新连接时记录一次"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
related_rules:
  - entity-unavailable
---
# 如果互联网/设备/服务不可用，则在不可用时记录一次，在重新连接时记录一次

import RelatedRules from './_includes/related_rules.jsx'

## 推理

当设备或服务不可访问时，实体通常会变得不可用。
为了让用户找出发生这种情况的原因，集成应该在发生这种情况时记录日志。
确保总共只记录一次，以避免垃圾邮件日志。

当设备或服务再次可访问时，集成也应记录该情况。
这对于使用日志来查明设备或服务何时不可用以及何时恢复在线非常有用。

:::info
日志记录应发生在 `info` 级别。
:::

## 实施示例

由于可以通过多种不同的方式来实现，因此我们将仅提供使用协调器进行集成以及通过 `async_update` 进行实体更新的示例。

### 使用协调器进行集成的示例

在此示例中，我们有一个使用协调器来获取数据的集成。
协调器一旦内置就有日志记录的逻辑。
您在协调器中唯一需要做的就是在设备或服务不可用时引发 `UpdateFailed`。

ZZ保护0ZZ
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

### 通过 `async_update` 更新实体的示例

在此示例中，我们有一个通过 `async_update` 更新其值的传感器。
该示例将在传感器不可用时进行记录，并在传感器重新联机时进行记录。
请注意，实例属性用于跟踪消息是否已被记录以避免垃圾邮件日志。

ZZ保护0ZZ
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

## 其他资源

有关管理集成状态的更多信息，请参阅 [documentation](/developers/integration_fetching_data)

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
