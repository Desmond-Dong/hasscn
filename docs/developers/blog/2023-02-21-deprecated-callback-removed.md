---
author: Jan Bouwhuis
authorURL: https://twitter.com/jbouwh
title: 已移除 MQTT subscribe 的弃用 callback 签名
---

Home Assistant 的 MQTT 集成[不再支持](https://github.com/home-assistant/core/pull/88543)
用于 MQTT subscribe 的弃用 callback 签名。

如果自定义集成仍在使用弃用的 callback 签名进行 MQTT subscribe 的 callback 函数，则会因未更新而中断。如果检测到不支持的 callback 类型，将抛出异常。

以下是不再工作的弃用 callback 函数示例：

```python
async def async_deprecated_callback1(topic: str, payload: ReceivePayloadType, qos: int) -> None:
    """Deprecated async callback example 1."""
    ...


@callback
def async_deprecated_callback2(topic: str, payload: ReceivePayloadType, qos: int) -> None:
    """Deprecated async callback example 2."""
    ...
```

以下是一个正确的 callback 签名示例：

```python
@callback
def async_correct_callback(msg: ReceiveMessage) -> None:
    """Callback example 1."""
    ...
```