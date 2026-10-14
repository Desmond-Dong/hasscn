`device_tracker` entity 组件的 `TrackerEntity` 类中 `location_accuracy` 属性（简写为 `_attr_location_accuracy`）的类型已从 `int` 更改为 `float`。

当源值为 `float` 时，不再需要类型转换。

### 示例

```python
class ExampleTrackerEntity(TrackerEntity):
    """Test tracker entity."""

    _attr_location_accuracy: float = 2.5

    @cached_property
    def location_accuracy(self) -> float:
        """Return the location accuracy of the device.

        Value in meters.
        """
        return self._attr_location_accuracy
```
