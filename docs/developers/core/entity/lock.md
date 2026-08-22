---
title: Lock 实体
sidebar_label: Lock
---

Lock 实体可以被锁定和解锁。锁定和解锁可以选择用用户代码来保护。一些锁还允许打开 latch，这也可能用用户代码来保护。从 [`homeassistant.components.lock.LockEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/lock/__init__.py) 派生平台实体。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 描述
| ---- | ---- | ------- | -----------
| changed_by | string | None | 描述上次更改是由什么触发的。
| code_format | string | None | 用于验证传递给 lock、unlock 和 open 操作的代码的 Regex，如果不需代码则为 None。
| is_locked | bool | None | 锁是否已锁定。用于确定 `state`。
| is_locking | bool | None | 锁是否正在锁定过程中。用于确定 `state`。
| is_unlocking | bool | None | 锁是否正在解锁过程中。用于确定 `state`。
| is_open | bool | None | 锁是否已解锁并释放了 latch。仅对支持 `LockEntityFeature.OPEN` 的锁有意义。用于确定 `state`。
| is_opening | bool | None | 锁是否正在释放 latch 的过程中。用于确定 `state`。
| is_jammed | bool | None | 锁尝试移动但在完成前卡住。用于确定 `state`。

### 状态

状态从上述属性派生，是以下 `LockState` 枚举成员之一：

| 值       | 描述                                                        |
|-------------|--------------------------------------------------------------------|
| `LOCKED`    | 锁已锁定。                                                                 |
| `LOCKING`   | 锁正在锁定过程中。                        |
| `UNLOCKED`  | 锁未锁定。                                                       |
| `UNLOCKING` | 锁正在解锁过程中。                      |
| `OPEN`      | 锁未锁定并已释放 latch。                |
| `OPENING`   | 锁正在释放 latch 的过程中。                 |
| `JAMMED`    | 锁尝试移动但在完成前卡住。           |

:::note

`OPEN` 状态和 `is_open` 属性要求锁既未锁定**又**已释放 latch。在锁仍锁定时释放 latch 并不是 open 状态。

:::

当多个状态属性被设置时，它们按固定的优先级顺序评估，第一个匹配项决定状态：

1. `is_jammed` → `JAMMED`
2. `is_opening` → `OPENING`
3. `is_locking` → `LOCKING`
4. `is_open` → `OPEN`
5. `is_unlocking` → `UNLOCKING`
6. `is_locked` → `LOCKED`（当为 `True` 时），`UNLOCKED`（当为 `False` 时）

如果 `is_locked` 为 `None`，且没有其他状态属性为真值，则状态为 `unknown`。

## 支持的功能

支持的功能通过使用 `LockEntityFeature` 枚举中的值来定义，并使用按位或（`|`）运算符进行组合。

| 值  | 描述                                |
| ------ | ------------------------------------------ |
| `OPEN` | 此锁支持打开门 latch。 |

## 方法

### 锁定

```python
class MyLock(LockEntity):

    def lock(self, **kwargs: Any) -> None:
        """Lock all or specified locks. A code to lock the lock with may optionally be specified."""

    async def async_lock(self, **kwargs: Any) -> None:
        """Lock all or specified locks. A code to lock the lock with may optionally be specified."""
```

### 解锁

```python
class MyLock(LockEntity):

    def unlock(self, **kwargs: Any) -> None:
        """Unlock all or specified locks. A code to unlock the lock with may optionally be specified."""

    async def async_unlock(self, **kwargs: Any) -> None:
        """Unlock all or specified locks. A code to unlock the lock with may optionally be specified."""
```

### 打开

仅当设置了 `LockEntityFeature.OPEN` 标志时实现此方法。

```python
class MyLock(LockEntity):

    def open(self, **kwargs: Any) -> None:
        """Open (unlatch) all or specified locks. A code to open the lock with may optionally be specified."""

    async def async_open(self, **kwargs: Any) -> None:
        """Open (unlatch) all or specified locks. A code to open the lock with may optionally be specified."""
```
