---
title: "将通用模式放置在通用模块中"
---

## 推理

Home Assistant 代码库有一些随着时间的推移而产生的常见模式。
例如，大多数新集成都使用协调器来集中数据获取。
协调器应放置在 `coordinator.py` 中。
这提高了集成之间的一致性，并且更容易找到特定集成的协调员。

第二个常见模式是基本实体。
由于许多集成提供了更多类型的实体，因此基本实体对于减少代码重复非常有用。
基础实体应放置在`entity.py`中。

为提高集成之间的一致性所做的努力对代码库的质量和开发人员体验产生了积极的影响。

## 实施示例

示例中，我们有一个存储在 `coordinator.py` 中的协调器和一个存储在 `entity.py` 中的基本实体。

ZZ保护0ZZ
```python showLineNumbers
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
```

ZZ保护0ZZ
```python showLineNumbers
class MyEntity(CoordinatorEntity[MyCoordinator]):
    """Base entity for MyIntegration."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: MyCoordinator) -> None:
        """Initialize the entity."""
        super().__init__(coordinator)
        self._attr_device_info = ...
```

## 例外情况

这条规则没有例外。

