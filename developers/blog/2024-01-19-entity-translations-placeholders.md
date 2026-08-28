现在可以使用 placeholders 为 entity translation 提供静态值。
你可以通过 entity 的 `translation_placeholders` 属性传递 placeholders。

一个 sensor 示例：

```python
class TestEntity(SensorEntity):
    """Example entity."""

    _attr_has_entity_name = True
    _attr_translation_key = "temperature"

    def __init__(self) -> None:
        """Initialize example entity."""
        self._attr_translation_placeholders = {"channel_id": "2"}
        self._attr_device_info = DeviceInfo(
            name="Example device"
        )
```

`strings.json` 文件将如下所示：

```json
{
  "entity": {
    "sensor": {
      "temperature": {
        "name": "Temperature channel {channel_id}"
      }
    }
  }
}
```

最终生成的 entity 将被称为 `Example device Temperature channel 2`。

当预期存在 translation placeholder 但 entity 未提供时，会记录一次警告。
在不是稳定版本的系统上（dev、nightly 或 beta），发生此情况时会抛出错误，以便能够迅速捕获问题。

请记住对你的翻译人员友善，因为他们需要理解 placeholder 名称中传入的是什么类型的名称或值 ❤️。
