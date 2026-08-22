---
title: Remote 实体
sidebar_label: Remote
---

Remote 实体可以表示两种不同类型的设备：

1. 发送命令的物理设备。
2. Home Assistant 中的虚拟设备，向另一个物理设备（如电视）发送命令。

从 [`homeassistant.components.remote.RemoteEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/remote/__init__.py) 派生实体平台。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 描述 |
| ---- | ---- | ------- | ----------- |
| is_on | boolean | `None` | 设备当前是开启还是关闭。 |
| current_activity | str | `None` | 返回当前活动的 activity。 |
| activity_list | list | `None` | 返回可用的 activity 列表。 |

### 活动

Activity 是一个预定义的 activity 或宏，将 remote 置于特定状态。例如，"Watch TV" activity 可能会打开多个设备并将频道更改为特定频道。

## 支持的功能

支持的功能通过使用 `RemoteEntityFeature` 枚举中的值来定义，并使用按位或（`|`）运算符进行组合。

| 值            | 描述                                   |
| ---------------- | --------------------------------------------- |
| `LEARN_COMMAND`  | 实体允许从设备学习命令。 |
| `DELETE_COMMAND` | 实体允许从设备删除命令。 |
| `ACTIVITY`       | 实体支持 activity。                   |

## 方法

### 开启命令

```python
class MyRemote(RemoteEntity):

    def turn_on(self, activity: str | None = None, **kwargs: Any) -> None:
         """Send the power on command."""

    async def async_turn_on(self, activity: str | None = None, **kwargs: Any) -> None:
         """Send the power on command."""
```

### 关闭命令

```python
class MyRemote(RemoteEntity):

    def turn_off(self, activity: str | None = None, **kwargs: Any) -> None:
         """Send the power off command."""

    async def async_turn_off(self, activity: str | None = None, **kwargs: Any) -> None:
         """Send the power off command."""
```

### 切换命令

```python
class MyRemote(RemoteEntity):

    def toggle(self, activity: str | None = None, **kwargs: Any) -> None:
         """Toggle a device."""

    async def async_toggle(self, activity: str | None = None, **kwargs: Any) -> None:
         """Toggle a device."""
```

### 发送命令

```python
class MyRemote(RemoteEntity):

    def send_command(self, command: Iterable[str], **kwargs: Any) -> None:
        """Send commands to a device."""

    async def async_send_command(self, command: Iterable[str], **kwargs: Any) -> None:
        """Send commands to a device."""
```

### 学习命令

仅当设置了 `RemoteEntityFeature.LEARN_COMMAND` 标志时实现此方法。

```python
class MyRemote(RemoteEntity):

    def learn_command(self, **kwargs: Any) -> None:
        """Learn a command from a device."""

    async def async_learn_command(self, **kwargs: Any) -> None:
        """Learn a command from a device."""
```

### 删除命令

仅当设置了 `RemoteEntityFeature.DELETE_COMMAND` 标志时实现此方法。

```python
class MyRemote(RemoteEntity):

    def delete_command(self, **kwargs: Any) -> None:
        """Delete a command from a device."""

    async def async_delete_command(self, **kwargs: Any) -> None:
        """Delete a command from a device."""
```
