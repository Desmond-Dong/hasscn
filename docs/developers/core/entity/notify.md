---
title: Notify 实体
sidebar_label: Notify
---

Notify 实体是一种可以向设备或服务发送消息的实体，但从 Home Assistant 的角度来看是无状态的。

Notify 实体派生自 [`homeassistant.components.notify.NotifyEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/notify/__init__.py)，
在发送通知消息方面可能有所帮助（但不限于）：

- 短信 (SMS)
- 电子邮件
- 直接消息或聊天
- 设备 LCD 显示屏上的屏幕消息

## 状态

Notify 实体的状态是一个时间戳，代表最后发送消息的日期和时间。
与 `text` 实体不同，`notify` 实体没有可以设置的状态。

如果你想表示一个可以更改的文本值（从而有实际状态），应使用 `text` 实体。

## 属性

由于此集成是无状态的，它不为其自身提供任何特定属性。
所有实体共有的其他属性（如 `icon`、`name` 等）仍然适用。

## 方法

### 发送消息

发送消息方法用于向设备或服务发送消息。

```python
class MyNotifier(NotifyEntity):
    # 实现以下方法之一。

    def send_message(self, message: str, title: str | None = None) -> None:
        """Send a message."""

    async def async_send_message(self, message: str, title: str | None = None) -> None:
        """Send a message."""
```

### 记录通知

一些集成为发送通知提供带有扩展的、集成特定功能的自定义操作，或以其他方式在 Home Assistant 内部触发通知。为了跟踪通知发送的时间，集成可以调用 `_async_record_notification` 或 `_record_notification`。

:::important
仅应记录源自 Home Assistant 内部的通知。外部生成的通知不得记录。对此应改用 event 实体。
:::

```python
class MyNotifier(NotifyEntity):

    # 默认通过 notify.send_message 操作发送通知的方法
    async def async_send_message(self, message: str, title: str | None = None) -> None:
        """Send a message."""
        await self._publish(message=message, title=title)

    # 集成为发送通知实现了自定义实体操作
    async def publish(self, message: str, title: str | None = None, priority: int | None = None) -> None:
        """Send a message with priority."""
        await self._publish(message=message, title=title, priority=priority)
        # 记录已发送通知
        self._async_record_notification()
```
