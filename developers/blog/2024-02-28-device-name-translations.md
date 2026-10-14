现在可以为 device name 提供翻译了，包括支持使用静态值作为占位符。

一个带有已翻译 device name 的 sensor 示例：

```python
class TestEntity(SensorEntity):
    """示例 entity。"""

    _attr_has_entity_name = True

    def __init__(self) -> None:
        """初始化示例 entity。"""
        self._attr_device_info = DeviceInfo(
            translation_key="n_ch_power_strip",
            translation_placeholders={"number_of_sockets": "2"},
        )
```

`strings.json` 文件如下所示：

```json
{
  "device": {
    "n_ch_power_strip": {
      "name": "带有 {number_of_sockets} 个插座的电源排插"
    }
  }
}
```

生成的 device 将被称为 `Power strip with 2 sockets`。

当 device 缺少预期提供的翻译占位符时，会记录一条警告。
当这种情况发生在非稳定版本（dev、nightly 或 beta）的系统上时，会抛出错误，以便能够快速捕获错误。

请记得对您的翻译者保持友善，因为他们需要理解将从占位符名称中传入什么样的名称或值 ❤️。
