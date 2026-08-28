Image 实体可以显示静态图像。从 [`homeassistant.components.image.ImageEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/image/__init__.py) 派生平台实体。

Image 实体是 [`camera`](/developers/core/entity/camera.md) 实体的简化版本，支持提供静态图像或可获取的图像 URL。

实现可以提供 URL，图像将从该 URL 自动获取，也可以提供 `bytes` 类型的图像数据。提供 URL 时，获取的图像将缓存在 `self._cached_image` 中；将 `self._cached_image` 设置为 `None` 以使缓存失效。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称               | 类型                              | 默认值      | 描述                                                                                              |
| -------------------| --------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| content\_type       | str                               | `image/jpeg` | 图像的 content-type，如果 image 实体提供了 URL 则自动设置。                     |
| image\_last\_updated | `datetime.datetime \| None` | `None`       | 图像上次更新的时间戳。用于确定 `state`。前端在此值变更后会调用 `image` 或 `async_image`。 |
| image\_url          | `str \| None`      | `UNDEFINED`  | 可选的 URL，应从该 URL 获取图像。                                                     |

## 方法

### 图像

如果你的实体返回图像的 bytes 而不是提供 URL，请实现 `async_image` 或 `image`。前端将调用 `async_image` 或 `image` 来获取图像。如果图像是从远程获取的，应缓存图像数据，并在 `image_last_updated` 更改时使缓存失效。

注意：

* image 实体的 `async_image` 或 `image` 方法仅在前端获取图像时调用。
* 前端将会：
  * 当加载包含 image 实体的页面时获取一次图像
  * 当 image 实体通过更改 `image_last_updated` 改变状态时重新获取图像

这意味着在 `async def async_image` 中递增 `image_last_updated` 属性是不正确的。相反，image 实体应在图像更新可用时或定期（如果图像需要过一段时间后重新获取）更新 `image_last_updated` 时间戳。例如，这可以发生在 entity coordinator 更新的过程中。

```python
class MyImage(ImageEntity):
    # 实现以下方法之一。

    def image(self) -> bytes | None:
        """Return bytes of image."""

    async def async_image(self) -> bytes | None:
        """Return bytes of image."""
```
