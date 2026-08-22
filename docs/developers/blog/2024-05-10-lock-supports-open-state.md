---
author: G Johansson
authorURL: https://github.com/gjohansson-ST
title: "LockEntity 支持 open/opening state"
---

最近我们为 `LockEntity` 添加了 `open` 和 `opening` state。

如果您拥有能够区分 `unlocked`（未锁定但已闩锁）state 和 `open`（未锁定且闩锁已拉开）state 的锁，这将非常有用。

`LockEntity` 通过实现 feature flag `LockEntityFeature.OPEN` 已经支持 [`open` 方法](/developers/core/entity/lock#open)。

示例（默认实现）：

```python
class MyLock(LockEntity):

    @property
    def is_opening(self) -> bool:
        """如果锁已打开则返回 true。"""
        return self._state == STATE_OPENING

    @property
    def is_open(self) -> bool:
        """如果锁已打开则返回 true。"""
        return self._state == STATE_OPEN

    async def async_open(self, **kwargs: Any) -> None:
        """打开门的闩锁。"""
        self._state = STATE_OPEN
        self.async_write_ha_state()

```
