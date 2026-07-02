# 远程实体

远程实体可以代表两种不同类型的设备：

1. 发送命令的物理设备。
2. Home Assistant中的虚拟设备，用于向另一个物理设备（例如电视）发送命令。

平台实体派生自[`homeassistant.components.remote.RemoteEntity`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/remote/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------- | ----------- |
| is\_on | boolean | `None` | 设备当前是否打开或关闭。 |
| current\_activity | str | `None` | 返回当前活动的活动。 |
| activity\_list | list | `None` | 返回可用活动的列表。 |

### 活动

活动是指将遥控器置于特定状态的预定义活动或宏。例如，“看电视”活动可能会打开多个设备并将频道更改为特定频道。

## 支持的功能

支持的功能通过使用 `RemoteEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| ---------------- | --------------------------------------------- |
| `LEARN_COMMAND` | 实体允许从设备学习命令。 |
| `DELETE_COMMAND` | 实体允许从设备删除命令。 |
| `ACTIVITY` | 实体支持活动。 |

## 方法

### 打开命令

```python
class MyRemote(RemoteEntity):

    def turn_on(self, activity: str = None, **kwargs):
         """Send the power on command."""

    async def async_turn_on(self, activity: str = None, **kwargs):
         """Send the power on command."""
```

### 关闭命令

```python
class MyRemote(RemoteEntity):

    def turn_off(self, activity: str = None, **kwargs):
         """Send the power off command."""

    async def async_turn_off(self, activity: str = None, **kwargs):
         """Send the power off command."""
```

### 切换命令

```python
class MyRemote(RemoteEntity):

    def toggle(self, activity: str = None, **kwargs):
         """Toggle a device."""

    async def async_toggle(self, activity: str = None, **kwargs):
         """Toggle a device."""
```

### 发送命令

```python
class MyRemote(RemoteEntity):

    def send_command(self, command: Iterable[str], **kwargs):
        """Send commands to a device."""

    async def async_send_command(self, command: Iterable[str], **kwargs):
        """Send commands to a device."""
```

### 学习命令

仅当设置了标志 `SUPPORT_LEARN_COMMAND` 时才实现此方法。

```python
class MyRemote(RemoteEntity):

    def learn_command(self, **kwargs):
        """Learn a command from a device."""

    async def async_learn_command(self, **kwargs):
        """Learn a command from a device."""
```

### 删除命令

仅当设置了标志 `SUPPORT_DELETE_COMMAND` 时才实现此方法。

```python
class MyRemote(RemoteEntity):

    def delete_command(self, **kwargs):
        """Delete a command from a device."""

    async def async_delete_command(self, **kwargs):
        """Delete a command from a device."""
```
