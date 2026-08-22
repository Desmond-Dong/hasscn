---
title: "将通用模式放在通用模块中"
sidebar_label: 🥉 common-modules
---

## 理由

Home Assistant 的代码库中有一些随时间积累而来的通用模式。
例如，大多数新集成都使用一个 coordinator 来集中处理数据获取。
coordinator 应放置在 `coordinator.py` 中。
这提高了集成之间的一致性，并更容易找到某个特定集成的 coordinator。

第二个通用模式是 base entity。
由于很多集成会提供多种类型的 entity，使用 base entity 可以有效减少代码重复。
base entity 应放置在 `entity.py` 中。

为提高集成之间一致性所做的努力，对代码库的质量和开发者体验都有积极影响。

## 示例实现

在本示例中，我们有一个存储在 `coordinator.py` 中的 coordinator，以及一个存储在 `entity.py` 中的 base entity。

`coordinator.py`
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

`entity.py`
```python showLineNumbers
class MyEntity(CoordinatorEntity[MyCoordinator]):
    """Base entity for MyIntegration."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: MyCoordinator) -> None:
        """Initialize the entity."""
        super().__init__(coordinator)
        self._attr_device_info = ...
```

## 例外

本规则没有例外。
