---
title: 通知实体
description: '通知实体是可以向设备或服务发送消息但从 Home Assistant 角度来看保持无状态的实体。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: 通知
---
# 通知实体

通知实体是可以向设备或服务发送消息但从 Home Assistant 角度来看保持无状态的实体。

通知实体源自[`homeassistant.components.notify.NotifyEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/notify/__init__.py)，
并且可以帮助发送通知消息，如（但不限于）：

- 一条短信
- 一封电子邮件
- 直接消息或聊天
- 设备 LCD 显示屏上的屏幕消息

## 状态

通知实体的状态是时间戳，表示最后发送消息的日期和时间。
与 `text` 实体不同，`notify` 实体没有可设置的状态。

如果您想要表示具有可以更改的文本值（因此具有实际状态）的内容，则应该使用 `text` 实体。

## 特性

由于此集成是无状态的，因此它本身不提供任何特定属性。
所有实体共有的其他属性（例如 `icon` 和 `name` 等）仍然适用。

## 方法

### 发送消息

发送消息方法用于向设备或服务发送消息。

```python
class MyNotifier(NotifyEntity):
    # Implement one of these methods.

    def send_message(self, message: str, title: str | None = None) -> None:
        """Send a message."""

    async def async_send_message(self, message: str, title: str | None = None) -> None:
        """Send a message."""
```

### 记录通知

某些集成提供自定义操作以及扩展的集成特定功能，用于发送通知或以其他方式从 Home Assistant 内触发通知。要跟踪通知的发送时间，集成可以调用 `_async_record_notification` 或 `_record_notification`。

:::important
只有来自 Home Assistant 内部的通知才应记录在通知实体上。不得记录外部生成的通知。请使用事件实体来代替。
:::

```python
class MyNotifier(NotifyEntity):

    # Default method to send notification via notify.send_message action
    async def async_send_message(self, message: str, title: str | None = None) -> None:
        """Send a message."""
        await self._publish(message=message, title=title)

    # Integration implements a custom entity action to send notifications
    async def publish(self, message: str, title: str | None = None, priority: int | None = None) -> None:
        """Send a message with priority."""
        await self._publish(message=message, title=title, priority=priority)
        # Record that a notification was sent
        self._async_record_notification()
```