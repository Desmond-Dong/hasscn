# 锁定实体

锁实体能够被锁定和解锁。可以选择使用用户代码来保护锁定和解锁。有些锁还允许打开闩锁，这也可以使用用户代码进行保护。平台实体派生自[`homeassistant.components.lock.LockEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/lock/__init__.py)。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| changed\_by | string | None | 描述最后一次更改是由什么触发的。
| code\_format | string | None | 代码格式的正则表达式或无（如果不需要代码）。
| is\_locked | bool | None | 指示锁当前是否已锁定。用于确定 `state`。
| is\_locking | bool | None | 指示锁当前是否处于锁定状态。用于确定 `state`。
| is\_unlocking | bool | None | 指示锁当前是否正在解锁。用于确定 `state`。
| is\_jammed | bool | None | 指示锁当前是否被卡住。用于确定 `state`。
| is\_opening | bool | None | 指示锁当前是否正在打开。用于确定 `state`。
| is\_open | bool | None | 指示锁当前是否打开。用于确定 `state`。

### 状态

状态是通过设置上述属性来定义的。结果状态是使用 `LockState` 枚举返回以下成员之一。

| 值 | 说明 |
|-------------|--------------------------------------------------------------------|
| `LOCKED` | 锁已上锁。 |
| `LOCKING` | 锁正在上锁。 |
| `UNLOCKING` | 锁正在解锁。 |
| `UNLOCKED` | 锁已解锁。 |
| `JAMMED` | 目前锁被卡住。 |
| `OPENING` | 锁正在打开。 |
| `OPEN` | 锁是开着的。 |

## 支持的功能

支持的功能通过使用 `LockEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| ------ | ------------------------------------------ |
| `OPEN` | 该锁支持打开门闩。 |

## 方法

### 锁

```python
class MyLock(LockEntity):

    def lock(self, **kwargs):
        """Lock all or specified locks. A code to lock the lock with may optionally be specified."""

    async def async_lock(self, **kwargs):
        """Lock all or specified locks. A code to lock the lock with may optionally be specified."""
```

### 开锁

```python
class MyLock(LockEntity):

    def unlock(self, **kwargs):
        """Unlock all or specified locks. A code to unlock the lock with may optionally be specified."""

    async def async_unlock(self, **kwargs):
        """Unlock all or specified locks. A code to unlock the lock with may optionally be specified."""
```

### 打开

仅当设置了标志 `SUPPORT_OPEN` 时才实现此方法。

```python
class MyLock(LockEntity):

    def open(self, **kwargs):
        """Open (unlatch) all or specified locks. A code to open the lock with may optionally be specified."""

    async def async_open(self, **kwargs):
        """Open (unlatch) all or specified locks. A code to open the lock with may optionally be specified."""
```
