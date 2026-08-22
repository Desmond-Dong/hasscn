---
author: Michael Arthur
authorURL: https://github.com/mikey0000
title: LawnMowerActivity 中的新 returning 类型
---

从 Home Assistant Core 2024.9 起，实现了 `LawnMowerEntity` 的集成可以使用新的 `LawnMowerActivity.RETURNING` state 来指示其割草机正在返回 dock。

更多详情请参阅 [文档](/developers/core/entity/lawn-mower#activities)。

## 示例

```python
    async def async_dock(self) -> None:
        """开始 dock。"""
        self._attr_activity = LawnMowerActivity.RETURNING
        self.async_write_ha_state()
```

或者在您的 `lawn_mower` entity 的 activity 属性中返回 `LawnMowerActivity.RETURNING`。

```python
    @property
    def activity(self) -> LawnMowerActivity:
        """返回割草机的 state。"""
        mower = self.mower
        if mower.state is RETURNING:
            return LawnMowerActivity.RETURNING
        ...
```
