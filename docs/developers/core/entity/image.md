---
title: 图像实体
description: '图像实体可以显示静态图像。平台实体派生自homeassistant.components.image.ImageEntity(https://github.com/home-assistant/core/blob/dev/homeassistant/components/image/init.py)。'
sidebar_label: 图像
---
# 图像实体

图像实体可以显示静态图像。平台实体派生自[`homeassistant.components.image.ImageEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/image/__init__.py)。

图像实体是[`camera`](/developers/core/entity/camera)实体的简化版本，用于提供静态图像或可拉取的图像 URL。

实现可以提供用于获取图像的 URL，或直接返回 `bytes` 形式的图像数据。提供 URL 时，获取到的图像会缓存在 `self._cached_image` 中；将 `self._cached_image` 设为 `None` 可使缓存失效。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| -------------------| --------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| content_type | str | `image/jpeg` | 图像的内容类型，如果图像实体提供 URL，则自动设置。 |
| image_last_updated | <code>datetime.datetime &#124; None</code> | `None` | 上次更新图像的时间戳。用于确定 `state`。更改后前端将调用 `image` 或 `async_image`。 |
| image_url | <code>str &#124; None</code> | `UNDEFINED` | 可选。用于获取图像的 URL。 |

## 方法

### 图像

如果您的实体返回图像字节而不是提供 URL，请实现 `async_image` 或 `image`。前端将调用 `async_image` 或 `image` 来获取图像。如果远程获取图像，则应缓存图像数据，并且当 `image_last_updated` 更改时缓存会失效。

注意：
- 仅当前端获取图像时才会调用图像实体的 `async_image` 或 `image` 方法。
- 前端将：
  - 当加载带有图像实体的页面时获取图像一次
- 当图像实体因 `image_last_updated` 发生变化而导致状态变化时重新获取图像

这意味着在 `async def async_image` 内更改 `image_last_updated` 属性是不正确的。相反，当更新的图像可用时，或者如果在一段时间后应重新获取图像时，图像实体应该定期更新 `image_last_updated` 时间戳。例如，这可以作为实体协调器更新的一部分发生。

```python
class MyImage(ImageEntity):
    # Implement one of these methods.

    def image(self) -> bytes | None:
        """Return bytes of image."""

    async def async_image(self) -> bytes | None:
        """Return bytes of image."""
```
